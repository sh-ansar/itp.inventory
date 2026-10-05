<template>
  <div>
    <ClearPreferencesButton table_id="dash_info_blocks"></ClearPreferencesButton>
    <dx-data-grid
     :data-source="items"
     ref="itemsGrid"
     :remote-operations="false"
     :allow-column-reordering="true"
     key-expr="id"
     :summary="{
                groupItems: [{
                  column: 'id',
                  summaryType: 'count'
                }]
             }"
     :allow-column-resizing="true"
     :show-row-lines="true"
     :row-alternation-enabled="false"
     :show-borders="true"
    >
      <DxStateStoring
       :enabled="true"
       type="custom"
       :custom-load="customLoad"
       :custom-save="customSave"
      />
      <dx-selection
       :deffered="true"
       mode="multiple"
      />
      <DxExport
       :enabled="true"
       :allow-export-selected-data="true"
       file-name="Items"
      >
      </DxExport>
      <DxPaging :page-size="10"/>
      <DxPager
       :show-page-size-selector="true"
       :allowed-page-sizes="pageSizes"
       :show-info="true"
      />
      <dx-header-filter :visible="true"></dx-header-filter>
      <dx-column
       cell-template="cellTemplate"
       :allow-editing="false"
       :caption="$t('app.common.number')"
      />
      <dx-column
       data-field="name"
       :caption="$t('item.name')"/>
      <dx-column
       data-field="location_id"
       :header-filter="{
                  dataSource: getFilteredLocations
               }"
       :caption="$t('item.location')"
      >
        <DxLookup
         :data-source="locations"
         display-expr="name"
         value-expr="id"
        />
      </dx-column>
      <dx-column
       data-field="responsible_person_iin"
       :allow-editing="false"
       :caption="$t('app.pages.items.responsibleIin')"
      />
      <dx-column
       data-field="responsible_person_inn"
       :caption="$t('item.responsiblePerson')"
       :visible="false"
      >
        <DxLookup
         :data-source="persons"
         display-expr="name"
         value-expr="iin"
        />
      </dx-column>
      <dx-column
       data-field="status"
       :caption="$t('item.status')"
      >
<!--        <DxLookup-->
<!--         :data-source="[-->
<!--                  {-->
<!--                    id:'1',-->
<!--                    name:'На балансе'-->
<!--                  },-->
<!--                  {-->
<!--                    id:'2',-->
<!--                    name:'За балансом'-->
<!--                  },-->
<!--                  {-->
<!--                    id:'3',-->
<!--                    name:'Удалён'-->
<!--                  }-->
<!--                 ]"-->
<!--         display-expr="name"-->
<!--         value-expr="id"-->
<!--        />-->
      </dx-column>
      <dx-column
       data-field="company_id"
       :caption="$t('app.pages.items.company')"
      >
        <DxLookup
         :data-source="companies"
         display-expr="name"
         value-expr="id"
        />
      </dx-column>
      <dx-column
       data-field="code"
       :caption="$t('app.pages.items.uniqueCode')"
       :allow-editing="false"
       :visible="true"
      />
      <dx-column
       data-field="inventory_number"
       :caption="$t('item.inventoryNumber')"
       :visible="true"
      />
      <dx-column
       data-field="account"
       data-type="number"
       :caption="$t('item.account')"
       :visible="false"
      />
      <dx-column
       data-field="purchase_date"
       data-type="date"
       :caption="$t('item.purchaseDate')"
       :visible="false"
      />
      <dx-column
       data-field="purchase_cost"
       data-type="number"
       :caption="$t('item.purchaseCost')"
       :visible="false"
      />
      <dx-column
       data-field="date_utilized"
       :allow-editing="false"
       :caption="$t('app.pages.items.utilizationDate')"
       :visible="false"
      />
      <dx-column
       data-field="current_cost"
       data-type="number"
       :caption="$t('item.currentCost')"
       :visible="false"
      />
      <dx-column
       data-field="factory_number"
       data-type="number"
       :caption="$t('item.factoryNumber')"
       :visible="false"
      />
      <template #cellTemplate="cell">
        {{cell.data.row.rowIndex + 1}}
      </template>
      <dx-column
       data-field="passport_number"
       data-type="number"
       :caption="$t('item.passportNumber')"
       :visible="false"
      />
      <dx-column
       data-field="description"
       :caption="$t('app.pages.items.description')"
       css-class="color-green"
      />
      <dx-column
       data-field="source"
       :caption="$t('app.pages.items.manual')"
       data-type="boolean"
       :allow-editing="false"
      />
      <DxColumn
       data-field="fact_location_id"
       :caption="$t('app.pages.items.actualLocation')"
       css-class="color-green"
      >
        <DxLookup
         :data-source="locations"
         display-expr="name"
         value-expr="id"
        />
      </DxColumn>
      <DxColumn
       data-field="fact_responsible_person_iin"
       :caption="$t('app.pages.items.actualResponsible')"
       css-class="color-green"
      >
        <DxLookup
         :data-source="persons"
         display-expr="name"
         value-expr="iin"
        />
      </DxColumn>
      <dx-filter-row
       :visible="true"
       apply-filter="onClick"
      />
      <dx-column-chooser
       :enabled="true"
      />
      <dx-group-panel :visible="true"/>
      <dx-search-panel
       :visible="true"
       :highlight-case-sensitive="true"
      />
      <dx-grouping :auto-expand-all="false"/>
      <dx-paging :page-size="10"/>
      <dx-column
       data-field="write_off_date"
       :allow-editing="false"
       :caption="$t('item.writeOffDate')"
       :visible="status == 2"
      />
<!--      <dx-column-->
<!--       data-field="deleted_date"-->
<!--       :allow-editing="false"-->
<!--       caption="Дата удаления"-->
<!--       :visible="status == 3"-->
<!--      />-->
    </dx-data-grid>
  </div>
</template>

<script>
import ClearPreferencesButton from '../ClearPreferencesButton'
import {
  GET_COMPANIES,
  GET_ITEMS,
  GET_LOCATIONS,
  GET_RESPONSIBLE_PERSONS,
  LOAD_USER_PREFERENCES, SAVE_USER_PREFERENCES,
} from '../../consts/urls'
import {
  DxDataGrid,
  DxStateStoring,
  DxColumn,
  DxGrouping,
  DxHeaderFilter,
  DxGroupPanel,
  DxLookup,
  DxPager,
  DxPaging,
  DxExport,
  DxSearchPanel,
  DxColumnChooser,
  DxFilterRow,
  DxButton,
  DxSelection,
} from 'devextreme-vue/data-grid'
import QrcodeVue from 'qrcode.vue'
import { mapGetters } from 'vuex'

export default {
  props: ['status'],
  name: 'StatusInfoTableComponent',
  components: {
    DxDataGrid,
    DxColumn,
    DxGrouping,
    DxHeaderFilter,
    DxStateStoring,
    DxGroupPanel,
    DxLookup,
    DxPager,
    DxPaging,
    DxSearchPanel,
    DxColumnChooser,
    DxFilterRow,
    DxExport,
    DxButton,
    QrcodeVue,
    DxSelection,
    ClearPreferencesButton,
  },
  data () {
    return {
      items: [],
      pageSizes: [5, 10, 20, 50, 100, 200, 500],
      companies: [],
      locations: [],
      persons: [],
    }
  },
  computed: {
    ...mapGetters(['getCompany']),
  },
  methods: {
    async customLoad () {
      let state = await this.$http.get(LOAD_USER_PREFERENCES, {
        params: {
          table_id: 'dash_info_blocks',
        },
      })
      return JSON.parse(state.data)
    },
    getFilteredLocations (options) {
      var dataSourceConfiguration = {
        store: this.locations,
      }
      var countryIds = options.component.columnOption('company_id', 'filterValues')
      if (countryIds) {
        var filter = []
        for (var index = 0; index < countryIds.length; index++) {
          var countryId = countryIds[index]
          filter.push(['company_id', '=', countryId])
          filter.push('or')
        }
        filter.pop()
        dataSourceConfiguration.filter = filter
      }
      options.dataSource = dataSourceConfiguration
    },
    customSave (state) {
      state.selectedRowKeys = []
      let stateStr = JSON.stringify(state)
      this.$http.post(SAVE_USER_PREFERENCES, {
        table_id: 'dash_info_blocks',
        json_string: stateStr,
      })
    },
    updateData () {
      if (this.status != null) {
        this.$http.get(GET_COMPANIES)
          .then(response => {
            this.companies = response.data
          })
        this.$http.get(GET_LOCATIONS, {
          params: {
            company_deleted: 0,
          },
        })
          .then(response => {
            this.locations = response.data
          })
        this.$http.get(GET_RESPONSIBLE_PERSONS)
          .then(response => {
            this.persons = response.data
          })
        let params = {
          is_utilized: 0,
          company_deleted: 0,
          status_id: this.status,
        }
        if (this.status === 3) {
          params.is_utilized = 1
          delete params.status_id
        }
        if (this.getCompany) {
          params.company_id = this.getCompany
        }
        this.$http.get(GET_ITEMS, {
          params,
        })
          .then((response) => {
            this.items = response.data
          })
      }
    },
  },
  mounted () {
    this.updateData()
  },
}
</script>

<style scoped>

</style>
