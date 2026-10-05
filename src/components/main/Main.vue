<template>
  <div class="row row-equal operational-page">
    <div class="flex xl12 xs12">
      <div class="row operational-kpis">
        <div class="flex xs12 sm4">
          <va-card class="asset-kpi asset-kpi--success">
            <div class="asset-kpi__accent"></div>
            <div>
              <p class="asset-kpi__value">{{ count.on_balance }}</p>
              <p class="asset-kpi__label">{{ $t('app.pages.items.onBalance') }}</p>
            </div>
            <span class="asset-kpi__icon fa fa-check"></span>
          </va-card>
        </div>
        <div class="flex xs12 sm4">
          <va-card class="asset-kpi asset-kpi--info">
            <div class="asset-kpi__accent"></div>
            <div>
              <p class="asset-kpi__value">{{ count.written_off }}</p>
              <p class="asset-kpi__label">{{ $t('app.pages.items.offBalance') }}</p>
            </div>
            <span class="asset-kpi__icon fa fa-exchange"></span>
          </va-card>
        </div>
        <div class="flex xs12 sm4">
          <va-card class="asset-kpi asset-kpi--danger">
            <div class="asset-kpi__accent"></div>
            <div>
              <p class="asset-kpi__value">{{ count.removed }}</p>
              <p class="asset-kpi__label">{{ $t('app.pages.items.utilized') }}</p>
            </div>
            <span class="asset-kpi__icon fa fa-archive"></span>
          </va-card>
        </div>
      </div>
    </div>
    <div class="flex xl12 xs12">
      <div class="row">
        <div class="flex xl12 xs12">
          <va-card :title="$t('menu.items')" class="operational-table-card">
            <va-button
             small
             slot="actions"
             color="danger"
             class="mr-0"
             @click="generateQRs"
            >
              {{ $t('app.pages.items.generateQr') }}
            </va-button>
            <ClearPreferencesButton table_id="main_items"></ClearPreferencesButton>
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
             @row-inserted="createItem"
             @row-updated="saveUpdatedData"
             @row-updating="beforeSave"
             @editor-preparing="editorPreparing"
             :row-alternation-enabled="false"
             :show-borders="true"
            >
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
              <dx-editing
               :allow-updating="canManager"
               :allow-adding="canManager"
               :use-icons="true"
               mode="cell"
              />
              <DxStateStoring
                :enabled="true"
                type="custom"
                :custom-load="customLoad"
                :custom-save="customSave"
              />

              <!-- <DxPaging :page-size="10"/>
              <DxPager
               :show-page-size-selector="true"
               :allowed-page-sizes="pageSizes"
               :show-info="true"
              /> -->
              <dx-header-filter :visible="true"></dx-header-filter>
              <dx-column
               cell-template="cellTemplate"
               :allow-editing="false"
               data-type="number"
               :caption="$t('app.common.number')"
              />
              <dx-column
               data-field="name"
               :allow-editing="canManager"
               data-type="string"
               :caption="$t('item.name')"/>
              <dx-column
               data-field="location_id"
               :allow-editing="canManager"
               :header-filter="{
                  dataSource: getFilteredLocationsRoot
               }"
               :caption="$t('item.location')"
              >
                <DxLookup
                 :data-source="locationsRoot"
                 display-expr="name"
                 value-expr="id"
                />
              </dx-column>
              <dx-column
               data-field="responsible_person_iin"
               data-type="string"
               :allow-editing="false"
               :caption="$t('app.pages.items.responsibleIin')"
              />
              <dx-column
               data-field="responsible_person_inn"
               :caption="$t('item.responsiblePerson')"
               :visible="false"
               :allow-editing="canManager"
              >
                <DxLookup
                 :data-source="persons"
                 display-expr="name"
                 value-expr="iin"
                />
              </dx-column>
              <dx-column
               data-field="status_id"
               :allow-editing="canManager"
               :caption="$t('item.status')"
              >
                <DxLookup
                 :data-source="statusOptions"
                 display-expr="name"
                 value-expr="id"
                />
              </dx-column>
              <dx-column
               data-field="company_id"
               :allow-editing="canManager"
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
               data-type="string"
               :caption="$t('app.pages.items.uniqueCode')"
               :allow-editing="false"
               :visible="true"
              />
<!--              <dx-column-->
<!--               data-field="order_number"-->
<!--               :allow-editing="false"-->
<!--               :caption="$t('item.orderNumber')"-->
<!--               :visible="false"-->
<!--              />-->
              <dx-column
               data-field="inventory_number"
               data-type="string"
               :allow-editing="canManager"
               :caption="$t('item.inventoryNumber')"
               :visible="true"
              />
              <dx-column
               data-field="account"
               data-type="string"
               :allow-editing="canManager"
               :caption="$t('item.account')"
               :visible="false"
              />
              <dx-column
               data-field="purchase_date"
               data-type="date"
               :allow-editing="canManager"
               :caption="$t('item.purchaseDate')"
               :visible="false"
              />
              <dx-column
               data-field="purchase_cost"
               data-type="number"
               :allow-editing="canManager"
               :caption="$t('item.purchaseCost')"
               :visible="false"
              />
              <dx-column
               data-field="date_utilized"
               data-type="date"
               :allow-editing="false"
               :caption="$t('app.pages.items.utilizationDate')"
               :visible="false"
              />
              <dx-column
               data-field="current_cost"
               data-type="number"
               :allow-editing="canManager"
               :caption="$t('item.currentCost')"
               :visible="false"
              />
              <dx-column
               data-field="factory_number"
               data-type="number"
               :allow-editing="canManager"
               :caption="$t('item.factoryNumber')"
               :visible="false"
              />
              <template #cellTemplate="cell">
                {{$refs.itemsGrid.instance.pageIndex() * $refs.itemsGrid.instance.pageSize() + cell.data.row.rowIndex + 1}}
              </template>
              <dx-column
               data-field="passport_number"
               data-type="number"
               :allow-editing="canManager"
               :caption="$t('item.passportNumber')"
               :visible="false"
              />
              <dx-scrolling
                mode="virtual"
              />
<!--              <dx-column-->
<!--               data-field="start_cost"-->
<!--               :allow-editing="false"-->
<!--               :caption="$t('item.startCost')"-->
<!--               :visible="false"-->
<!--              />-->
              <dx-column
                data-field="description"
                data-type="string"
                :caption="$t('app.pages.items.description')"
                :allow-editing="canManager"
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
               :allow-editing="canManager"
               :header-filter="{
                  dataSource: getFilteredLocations
               }"
               css-class="color-green"
               edit-cell-template="locationsTree"
              >
                <DxLookup
                 :data-source="locations"
                 :allow-clearing="true"
                 display-expr="name"
                 value-expr="id"
                />
              </DxColumn>
              <template #locationsTree="{ data: cellInfo }">
                <LocationsTree
                  :value="cellInfo.value"
                  :on-value-changed="cellInfo.setValue"
                  :data-source-tree="locationsTree"
                  :data-source="locations"
                />
              </template>
              <DxColumn
               data-field="fact_responsible_person_iin"
               :caption="$t('app.pages.items.actualResponsible')"
               :allow-editing="canManager"
               css-class="color-green"
              >
                <DxLookup
                 :data-source="persons"
                 :allow-clearing="true"
                 display-expr="name"
                 value-expr="iin"
                />
              </DxColumn>
              <dx-column
               type="buttons"
               :buttons="editButtons"
              />
              <dx-filter-row
               :visible="false"
               apply-filter="onClick"
              />
              <dx-column-chooser
               :enabled="true"
              />
              <dx-group-panel :visible="false"/>
              <dx-search-panel
               :visible="true"
               :highlight-case-sensitive="false"
              />
              <dx-grouping :auto-expand-all="false"/>
              <dx-paging :page-size="10"/>
            </dx-data-grid>
          </va-card>
        </div>
      </div>
    </div>
    <va-modal
     v-model="historyModal"
     size="large"
     :title="$t('app.pages.items.historyTitle')"
     :hide-default-actions="true">
      <va-button
       slot="actions"
       color="primary"
       @click="historyModal = false"
      >
        OK
      </va-button>
      <div>
        <dx-data-grid
         :data-source="history"
         ref="historyItemsGrid"
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
          <dx-column
           data-field="date_change"
           :caption="$t('app.pages.items.eventDate')"
           data-type="date"
           format="yyyy-MM-dd"
          />
          <dx-column
           data-field="event"
           :caption="$t('app.pages.items.event')"
          />
          <DxPager
           :show-page-size-selector="true"
           :allowed-page-sizes="pageSizes"
           :show-info="true"
          />
          <dx-header-filter :visible="true"></dx-header-filter>
          <dx-paging :page-size="10"/>
        </dx-data-grid>
      </div>
    </va-modal>
    <va-modal
     v-model="showQRModal"
     size="large"
     :title="$t('app.pages.items.qrTitle')"
     :okText=" $t('main.inventorizations.modal.confirm') "
     :cancelText=" $t('main.inventorizations.modal.cancel') "
     :hide-default-actions="true">
    <va-button
     slot="actions"
     color="primary"
     @click="showQRModal = false"
    >
      {{ $t('app.common.close') }}
    </va-button>
      <div class="row row-equal" style="justify-content: center">
        <div>
          <qrcode-vue :value="qrvalue" size="250"/>
        </div>
      </div>
    </va-modal>
  </div>
</template>

<script>
import ClearPreferencesButton from '../ClearPreferencesButton'
import {
  DxDataGrid,
  DxColumn,
  DxGrouping,
  DxScrolling,
  DxHeaderFilter,
  DxGroupPanel,
  DxEditing,
  DxLookup,
  DxStateStoring,
  DxPager,
  DxPaging,
  DxExport,
  DxSearchPanel,
  DxColumnChooser,
  DxFilterRow,
  DxButton,
  DxSelection,
} from 'devextreme-vue/data-grid'
import * as COMMON_CONSTS from '../../consts/common'
import QrcodeVue from 'qrcode.vue'
import {
  ADD_ITEM,
  GET_COMPANIES, GET_ITEM_CHANGES,
  GET_ITEMS,
  GET_ITEMS_COUNT, GET_LOCATIONS, GET_LOCATIONS_FACT,
  GET_QR_CODES, GET_RESPONSIBLE_PERSONS,
  LOAD_USER_PREFERENCES, SAVE_USER_PREFERENCES,
  SET_UTILIZATION_STATUS, UPDATE_ITEM,
} from '../../consts/urls'
import { QR_APPDX } from '../../consts/common'
import { mapGetters } from 'vuex'
import LocationsTree from '@/components/main/LocationsTree'
export default {
  name: 'Main',
  components: {
    LocationsTree,
    DxDataGrid,
    DxColumn,
    DxGrouping,
    DxHeaderFilter,
    DxScrolling,
    ClearPreferencesButton,
    DxGroupPanel,
    DxEditing,
    DxLookup,
    DxStateStoring,
    DxPager,
    DxPaging,
    DxSearchPanel,
    DxColumnChooser,
    DxFilterRow,
    DxExport,
    DxButton,
    QrcodeVue,
    DxSelection,
  },
  data () {
    return {
      pageSizes: [5, 10, 20, 50, 100, 200, 500],
      infoTiles: [{
        color: 'success',
        value: '803',
        text: 'new',
        icon: '',
      }, {
        color: 'danger',
        value: '57',
        text: 'existing',
        icon: '',
      }, {
        color: 'info',
        value: '5',
        text: 'not_existing',
        icon: '',
      }, {
        color: 'warning',
        value: '5',
        text: 'written_off',
        icon: '',
      }],
      items: [],
      showQRModal: false,
      qrvalue: '',
      editButtons: [
        'edit',
        {
          hint: this.$t('app.pages.items.utilizeHint'),
          icon: 'clear',
          visible: this.isNotUtilized,
          onClick: this.utilize,
        },
        {
          hint: this.$t('app.pages.items.restoreHint'),
          icon: 'check',
          visible: this.isUtilized,
          onClick: this.utilize,
        },
        {
          hint: this.$t('app.pages.items.showQrHint'),
          icon: 'smalliconslayout',
          onClick: this.showQR,
        },
        {
          hint: this.$t('app.pages.items.historyHint'),
          icon: 'bookmark',
          onClick: this.showHistory,
        },
      ],
      companies: [],
      chosenItems: [],
      count: {},
      locations: [],
      locationsRoot: [],
      locationsTree: [],
      persons: [],
      historyModal: false,
      history: [],
    }
  },
  computed: {
    ...mapGetters(['canAdmin', 'canManager', 'getCompany']),
    statusOptions () {
      return [
        { id: '1', name: this.$t('app.pages.items.onBalance') },
        { id: '2', name: this.$t('app.pages.items.offBalance') },
        { id: '3', name: this.$t('app.pages.items.utilized') },
      ]
    },
  },
  methods: {
    editorPreparing (e) {
      let disCols = [
        'location_id',
        'responsible_person_inn',
        'company_id',
        'inventory_number',
        'purchase_date',
        'purchase_cost',
        'current_cost',
        'factory_number',
        'passport_number',
        'name',
        'status_id',
        'account',
      ]
      if (e.row && e.row.data.source != null && e.row.data.source != undefined && !e.row.data.source) {
        if (disCols.includes(e.dataField)) {
          e.editorOptions.disabled = true
        }
      }
    },
    showHistory (e) {
      let id = e.row.data.id
      this.history = []
      this.historyModal = true
      this.$http.get(GET_ITEM_CHANGES, {
        params: { item_id: id },
      })
        .then(response => {
          this.history = response.data
        })
    },
    createItem (e) {
      let params = {}
      for (let prop in e.data) {
        if (e.data[prop]) {
          params[prop] = e.data[prop]
        }
      }
      this.$http.post(ADD_ITEM, params)
        .then((response) => {
          this.$swal(this.$t('app.common.success'), this.$t('app.common.addedSuccessfully'), 'success')
          this.updateData()
        })
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
    getFilteredLocationsRoot (options) {
      var dataSourceConfiguration = {
        store: this.locationsRoot,
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
    beforeSave (e) {
      e.cancel = new Promise((resolve, reject) => {
        this.$swal({
          title: this.$t('app.common.areYouSure'),
          text: this.$t('app.common.changeValueConfirm'),
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: this.$t('app.common.change'),
        }).then(result => {
          resolve(!result.value)
        })
      })
    },
    saveUpdatedData (e) {
      let params = {}
      for (let prop in e.data) {
        if (e.data[prop]) {
          params[prop] = e.data[prop]
        }
      }
      params.item_id = e.data.id
      this.$http.post(UPDATE_ITEM, params)
        .then(response => {
          this.$swal(this.$t('app.common.success'), this.$t('app.common.savedSuccessfully'), 'success')
        }).finally(() => {
        // this.updateData();
        })
    },
    updateInitialData () {
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
          this.locationsRoot = this.locations.filter(location => location.parent_id == null)
        })
      this.$http.get(GET_LOCATIONS_FACT, {
        params: {
          company_deleted: 0,
        },
      })
        .then(response => {
          this.locationsTree = response.data
        })
      this.$http.get(GET_RESPONSIBLE_PERSONS)
        .then(response => {
          this.persons = response.data
        })
    },
    updateData () {
      let params = {
        is_utilized: 0,
        company_deleted: 0,
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
      this.$http.get(GET_ITEMS_COUNT, {
        params,
      })
        .then((response) => {
          this.count = response.data
        })
    },
    isUtilized (e) {
      if (e.row.data.is_utilized === '1') {
        return true && this.canManager
      }
      return false
    },
    isNotUtilized (e) {
      if (e.row.data.is_utilized === '1') {
        return false
      }
      return true && this.canManager
    },
    utilize (e) {
      if (e.row.data.is_utilized === '1') {
        this.$swal({
          title: this.$t('app.common.areYouSure'),
          text: this.$t('app.common.utilizationConfirm'),
          icon: 'info',
          showCancelButton: true,
          cancelButtonText: this.$t('app.common.cancel'),
        }).then((result) => {
          if (result.value) {
            let data = {
              id: e.row.data.id,
              is_utilized: '0',
            }
            return this.$http.post(SET_UTILIZATION_STATUS, data)
          }
          return false
        }).then((response) => {
          if (response) {
            this.$swal(this.$t('app.common.success'), this.$t('app.common.statusChangedSuccessfully'), 'success')
            this.updateData()
          }
        })
      } else {
        this.$swal({
          title: this.$t('app.common.areYouSure'),
          text: this.$t('app.common.utilizationConfirm'),
          icon: 'info',
          showCancelButton: true,
          cancelButtonText: this.$t('app.common.cancel'),
        }).then((result) => {
          if (result.value) {
            let data = {
              id: e.row.data.id,
              is_utilized: '1',
            }
            return this.$http.post(SET_UTILIZATION_STATUS, data)
          }
          return false
        }).then((response) => {
          if (response) {
            this.$swal(this.$t('app.common.success'), this.$t('app.common.statusChangedSuccessfully'), 'success')
            this.updateData()
          }
        })
      }
    },
    showQR (e) {
      this.qrvalue = QR_APPDX + e.row.data.id
      this.showQRModal = true
    },
    async customLoad () {
      let state = await this.$http.get(LOAD_USER_PREFERENCES, {
        params: {
          table_id: 'main_items',
        },
      })
      return JSON.parse(state.data)
    },
    customSave (state) {
      state.selectedRowKeys = []
      let stateStr = JSON.stringify(state)
      this.$http.post(SAVE_USER_PREFERENCES, {
        table_id: 'main_items',
        json_string: stateStr,
      })
    },
    generateQRs () {
      this.chosenItems = []
      let itemsObj = this.$refs.itemsGrid.instance.getSelectedRowsData()
      if (itemsObj.length <= 100) {
        itemsObj.forEach((element) => {
          this.chosenItems.push(element.id)
        })
        window.open(COMMON_CONSTS.BASE_URL + GET_QR_CODES + this.generateItemsList(this.chosenItems), '_blank')
      } else {
        this.$swal(this.$t('app.common.error'), this.$t('app.common.qrLimit'), 'warning')
      }
    },
    generateItemsList (items) {
      let params = ''
      items.forEach((item) => {
        params += '&items[]=' + item
      })
      return params
    },
  },
  watch: {
    getCompany () {
      this.updateData()
    },
  },
  beforeMount () {
    this.updateInitialData()
    this.updateData()
  },
}
</script>

<style>
.operational-page {
  padding-bottom: 2rem;
}

.operational-kpis {
  margin-bottom: .3rem;
}

.asset-kpi {
  position: relative;
  min-height: 126px;
  overflow: hidden;
}

.asset-kpi .va-card__body {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 126px;
  padding: 1.25rem 1.3rem !important;
}

.asset-kpi__accent {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 5px;
}

.asset-kpi__value {
  margin: 0;
  color: #17283d;
  font-size: 2rem;
  line-height: 1;
  font-weight: 700;
}

.asset-kpi__label {
  margin: .55rem 0 0;
  color: #42566d;
  font-size: .92rem;
  font-weight: 600;
}

.asset-kpi__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  margin-right: .25rem;
  border-radius: 12px;
}

.asset-kpi--success .asset-kpi__accent { background: #2ebd75; }
.asset-kpi--success .asset-kpi__icon { color: #20965c; background: rgba(46, 189, 117, .12); }
.asset-kpi--info .asset-kpi__accent { background: #22b3c1; }
.asset-kpi--info .asset-kpi__icon { color: #168a95; background: rgba(34, 179, 193, .12); }
.asset-kpi--danger .asset-kpi__accent { background: #ee5a5a; }
.asset-kpi--danger .asset-kpi__icon { color: #c54141; background: rgba(238, 90, 90, .11); }

.operational-table-card {
  margin-top: .35rem;
}

.color-green {
  color: #2e654d !important;
  background-color: #e8f6ee !important;
}

.dx-command-select {
  width: 28px !important;
  min-width: 28px !important;
}

@media (max-width: 640px) {
  .operational-page {
    width: 100%;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .operational-page > .flex,
  .operational-page > .flex > .row > .flex {
    min-width: 0;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .operational-page > .flex > .row,
  .operational-kpis {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .operational-kpis {
    gap: .65rem;
  }

  .asset-kpi,
  .asset-kpi .va-card__body {
    min-height: 104px;
  }

  .asset-kpi .va-card__body {
    padding: 1rem 1.05rem !important;
  }

  .asset-kpi__value {
    font-size: 1.7rem;
  }

  .asset-kpi__label {
    margin-top: .4rem;
    font-size: .84rem;
  }

  .asset-kpi__icon {
    width: 40px;
    height: 40px;
    flex-basis: 40px;
    margin-right: 0;
  }
}
</style>
