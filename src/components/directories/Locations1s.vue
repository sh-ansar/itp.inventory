<template>
  <div class="row row-equal">
    <div class="flex xl12 xs12">
      <va-card :title="$t('app.pages.directories.locations1cTitle')">
        <va-button
          small
          slot="actions"
          color="primary"
          class="mr-0"
          @click="getLocations"
        >
          {{ $t('app.common.refreshData') }}
        </va-button>

        <ClearPreferencesButton table_id="locations_1c" />

        <dx-data-grid
          :data-source="locations"
          ref="itemsGrid"
          @row-updated="rowUpdated"
          @row-inserted="rowInserted"
          :remote-operations="false"
          :allow-column-reordering="true"
          :allow-column-resizing="true"
          :show-row-lines="true"
          :row-alternation-enabled="true"
          :show-borders="true"
        >
          <dx-editing
            :allow-updating="allowUpdating"
            :allow-adding="canManager"
            :use-icons="true"
            mode="row"
          />
          <DxPager
            :show-page-size-selector="true"
            :allowed-page-sizes="pageSizes"
            :show-info="true"
          />
          <DxStateStoring
            :enabled="true"
            type="custom"
            :custom-save="customSave"
            :custom-load="customLoad"
          />

          <dx-column
            cell-template="cellTemplate"
            :caption="$t('app.common.number')"
            width="60"
            alignment="center"
          />
          <template #cellTemplate="cell">
            {{ cell.data.row.rowIndex + 1 }}
          </template>

          <dx-column
            data-field="name"
            :caption="$t('app.pages.directories.name')"
          />

          <DxColumn
            data-field="company_id"
            :caption="$t('app.pages.directories.company')"
            :allow-editing="true"
          >
            <DxLookup
              :data-source="companies"
              display-expr="name"
              value-expr="id"
            />
          </DxColumn>

          <dx-column
            data-field="is_1c"
            :caption="$t('app.pages.directories.from1c')"
            :allow-editing="false"
            data-type="boolean"
          />

          <dx-grouping :auto-expand-all="false" />
          <dx-group-panel :visible="true" />
          <dx-header-filter :visible="true" />
          <dx-filter-row :visible="true" />
          <dx-search-panel
            :visible="true"
            :highlight-case-sensitive="false"
          />
          <dx-paging :page-size="10" />
        </dx-data-grid>
      </va-card>
    </div>
  </div>
</template>

<script>
import {
  ADD_LOCATIONS_FACT,
  GET_COMPANIES,
  GET_LOCATIONS,
  LOAD_USER_PREFERENCES,
  SAVE_LOCATIONS_FACT,
  SAVE_USER_PREFERENCES,
} from '../../consts/urls'
import { mapGetters } from 'vuex'
import {
  DxDataGrid,
  DxColumn,
  DxPager,
  DxEditing,
  DxLookup,
  DxGrouping,
  DxHeaderFilter,
  DxStateStoring,
  DxGroupPanel,
  DxPaging,
  DxSearchPanel,
  DxFilterRow,
} from 'devextreme-vue/data-grid'
import ClearPreferencesButton from '../ClearPreferencesButton'

export default {
  name: 'Locations1s',
  components: {
    ClearPreferencesButton,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxLookup,
    DxGrouping,
    DxHeaderFilter,
    DxStateStoring,
    DxGroupPanel,
    DxPager,
    DxPaging,
    DxSearchPanel,
    DxFilterRow,
  },
  data () {
    return {
      locations: [],
      companies: [],
      pageSizes: [5, 10, 20, 50, 100, 200, 500],
    }
  },
  computed: {
    ...mapGetters(['canAdmin', 'canManager']),
  },
  methods: {
    getLocations () {
      this.$http.get(GET_LOCATIONS)
        .then((response) => {
          this.locations = response.data
        })
    },
    async customLoad () {
      try {
        const state = await this.$http.get(LOAD_USER_PREFERENCES, {
          params: {
            table_id: 'locations_1c',
          },
        })
        return state.data ? JSON.parse(state.data) : null
      } catch (e) {
        return null
      }
    },
    customSave (state) {
      const stateStr = JSON.stringify(state)
      this.$http.post(SAVE_USER_PREFERENCES, {
        table_id: 'locations_1c',
        json_string: stateStr,
      }).catch(() => {})
    },
    allowUpdating (e) {
      return !e.row.data.is_1c && this.canManager
    },
    getCompanies () {
      this.$http.get(GET_COMPANIES)
        .then((response) => {
          this.companies = response.data
        })
    },
    rowUpdated (e) {
      const params = {}
      Object.keys(e.data).forEach((prop) => {
        if (e.data[prop] !== undefined && e.data[prop] !== null) {
          params[prop] = e.data[prop]
        }
      })

      this.$http.post(SAVE_LOCATIONS_FACT, params)
        .then(() => {
          this.$swal(
            this.$t('app.common.success'),
            this.$t('app.common.savedSuccessfully'),
            'success',
          )
          this.getLocations()
        })
    },
    rowInserted (e) {
      const params = {}
      Object.keys(e.data).forEach((prop) => {
        if (e.data[prop] !== undefined && e.data[prop] !== null) {
          params[prop] = e.data[prop]
        }
      })

      this.$http.post(ADD_LOCATIONS_FACT, params)
        .then(() => {
          this.$swal(
            this.$t('app.common.success'),
            this.$t('app.common.addedSuccessfully'),
            'success',
          )
          this.getLocations()
        })
    },
  },
  beforeMount () {
    this.getCompanies()
    this.getLocations()
  },
}
</script>

<style scoped>
</style>
