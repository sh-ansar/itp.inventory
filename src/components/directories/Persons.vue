<template>
  <div class="row row-equal">
    <div class="flex xl12 xs12">
      <va-card :title="$t('app.pages.directories.personsTitle')" class="data-table-card">
        <va-button
          small
          slot="actions"
          color="primary"
          class="mr-0"
          @click="getResponsiblePersons"
        >
          {{ $t('app.common.refreshData') }}
        </va-button>

        <ClearPreferencesButton table_id="resp_persons" />

        <dx-data-grid
          :data-source="persons"
          ref="itemsGrid"
          key-expr="id"
          :remote-operations="false"
          @row-updated="rowUpdated"
          @row-inserted="rowInserted"
          :allow-column-reordering="true"
          :allow-column-resizing="true"
          :show-row-lines="true"
          :row-alternation-enabled="true"
          :show-borders="true"
        >
          <DxStateStoring
            :enabled="true"
            type="custom"
            :custom-save="customSave"
            :custom-load="customLoad"
          />

          <dx-editing
            :allow-updating="allowUpdating"
            :allow-adding="canManager"
            :use-icons="true"
            mode="row"
          />

          <dx-column
            cell-template="cellTemplate"
            :caption="$t('app.common.number')"
            width="60"
            alignment="center"
          />
          <dx-column
            data-field="name"
            :caption="$t('app.pages.directories.fullName')"
          />
          <dx-column
            data-field="iin"
            :caption="$t('app.pages.directories.iin')"
          />
          <dx-column
            data-field="is_self_added"
            :caption="$t('app.pages.directories.manuallyAdded')"
            :allow-editing="false"
            data-type="boolean"
          />

          <template #cellTemplate="cell">
            {{ cell.data.row.rowIndex + 1 }}
          </template>

          <dx-filter-row :visible="true" />
          <dx-search-panel
            :visible="true"
            :highlight-case-sensitive="false"
          />
          <DxPaging :page-size="5" />
          <DxPager
            :show-page-size-selector="true"
            :allowed-page-sizes="pageSizes"
            :show-info="true"
          />
        </dx-data-grid>
      </va-card>
    </div>
  </div>
</template>

<script>
import {
  ADD_RESPONSIBLE_PERSON,
  GET_RESPONSIBLE_PERSONS,
  LOAD_USER_PREFERENCES,
  SAVE_USER_PREFERENCES,
  UPDATE_RESPONSIBLE_PERSON,
} from '../../consts/urls'
import { mapGetters } from 'vuex'
import {
  DxDataGrid,
  DxColumn,
  DxPager,
  DxEditing,
  DxStateStoring,
  DxPaging,
  DxSearchPanel,
  DxFilterRow,
} from 'devextreme-vue/data-grid'
import ClearPreferencesButton from '../ClearPreferencesButton'

export default {
  name: 'Persons',
  components: {
    ClearPreferencesButton,
    DxDataGrid,
    DxColumn,
    DxPager,
    DxEditing,
    DxStateStoring,
    DxPaging,
    DxSearchPanel,
    DxFilterRow,
  },
  data () {
    return {
      persons: [],
      pageSizes: [5, 10, 20, 50, 100, 200, 500],
    }
  },
  computed: {
    ...mapGetters(['canAdmin', 'canManager']),
  },
  methods: {
    getResponsiblePersons () {
      this.$http.get(GET_RESPONSIBLE_PERSONS)
        .then((response) => {
          this.persons = response.data
        })
    },
    async customLoad () {
      try {
        const state = await this.$http.get(LOAD_USER_PREFERENCES, {
          params: {
            table_id: 'resp_persons',
          },
        })
        return state.data ? JSON.parse(state.data) : null
      } catch (e) {
        return null
      }
    },
    allowUpdating (e) {
      return e.row.data.is_self_added && this.canManager
    },
    customSave (state) {
      const stateStr = JSON.stringify(state)
      this.$http.post(SAVE_USER_PREFERENCES, {
        table_id: 'resp_persons',
        json_string: stateStr,
      }).catch(() => {})
    },
    rowUpdated (e) {
      const params = {}
      Object.keys(e.data).forEach((prop) => {
        if (e.data[prop] !== undefined && e.data[prop] !== null) {
          params[prop] = e.data[prop]
        }
      })

      this.$http.post(UPDATE_RESPONSIBLE_PERSON, params)
        .then(() => {
          this.$swal(
            this.$t('app.common.success'),
            this.$t('app.common.savedSuccessfully'),
            'success',
          )
          this.getResponsiblePersons()
        })
    },
    rowInserted (e) {
      const params = {}
      Object.keys(e.data).forEach((prop) => {
        if (e.data[prop] !== undefined && e.data[prop] !== null) {
          params[prop] = e.data[prop]
        }
      })

      this.$http.post(ADD_RESPONSIBLE_PERSON, params)
        .then(() => {
          this.$swal(
            this.$t('app.common.success'),
            this.$t('app.common.addedSuccessfully'),
            'success',
          )
          this.getResponsiblePersons()
        })
    },
  },
  beforeMount () {
    this.getResponsiblePersons()
  },
}
</script>

<style scoped>
</style>
