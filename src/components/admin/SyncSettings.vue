<template>
  <div class="row row-equal">
    <div class="flex xl12 xs12">
      <div class="row">
        <div class="flex xl12 xs12">
          <va-card :title="$t('app.pages.settings.title')" class="data-table-card">
<!--            <va-button-->
<!--             small-->
<!--             slot="actions"-->
<!--             color="danger"-->
<!--             class="mr-0"-->
<!--            >-->
<!--              {{ $t('dashboard.charts.deleteSection') }}-->
<!--            </va-button>-->
            <ClearPreferencesButton table_id="sync_settings"></ClearPreferencesButton>
            <dx-data-grid
             :data-source="companies"
             :remote-operations="false"
             :allow-column-reordering="true"
             :allow-column-resizing="true"
             :show-row-lines="true"
             :row-alternation-enabled="true"
             @row-updated="rowUpdated"
             @row-inserted="rowInserted"
             :show-borders="true"
            >
              <DxStateStoring
               :enabled="true"
               type="custom"
               :custom-save="customSave"
               :custom-load="customLoad"
              />
              <dx-editing
               :allow-updating="canManager"
               :allow-adding="canManager"
               :use-icons="true"
               mode="row"
              />
              <dx-column
               cell-template="cellTemplate"
               :caption="$t('app.common.number')"
              />
              <template #cellTemplate="cell">
                {{cell.data.row.rowIndex + 1}}
              </template>
              <dx-column
               data-field="name"
               :allow-editing="true"
               :caption="$t('app.pages.settings.company')"
              >
                <dx-string-length-rule
                 :min="5"
                 :max="255"
                />
                <dx-required-rule/>
              </dx-column>
              <dx-column
               data-field="days"
               :caption="$t('app.pages.settings.days')"
              >
                <dx-numeric-rule/>
                <dx-range-rule
                 :min="1"
                 :max="60"
                />
              </dx-column>
<!--              <dx-column-->
<!--               data-field="hours"-->
<!--               caption="Периодичность(часы)"-->
<!--              >-->
<!--                <dx-numeric-rule/>-->
<!--                <dx-range-rule-->
<!--                 :min="1"-->
<!--                 :max="24"-->
<!--                />-->
<!--              </dx-column>-->
<!--              <dx-column-->
<!--               data-field="minutes"-->
<!--               caption="Периодичность(минуты)"-->
<!--              >-->
<!--                <dx-numeric-rule/>-->
<!--                <dx-range-rule-->
<!--                 :min="1"-->
<!--                 :max="60"-->
<!--                />-->
<!--              </dx-column>-->
              <dx-column
               data-field="url"
               :allow-editing="false"
               :caption="$t('app.pages.settings.url')"
              />
              <dx-column
               data-field="is_deleted"
               data-type="boolean"
               :caption="$t('app.pages.settings.deleted')"
              />
              <dx-column
               data-field="is_self_added"
               data-type="boolean"
               :allow-editing="false"
               :caption="$t('app.pages.settings.manuallyAdded')"
              />
            </dx-data-grid>
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ADD_COMPANY,
  GET_SYNC_SETTINGS,
  LOAD_USER_PREFERENCES,
  SAVE_SYNC_SETTINGS,
  SAVE_USER_PREFERENCES,
} from '../../consts/urls'
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxStateStoring,
  DxRequiredRule,
  DxStringLengthRule,
  DxRangeRule,
  DxNumericRule,
} from 'devextreme-vue/data-grid'
import { mapGetters } from 'vuex'
import ClearPreferencesButton from '../ClearPreferencesButton'
export default {
  name: 'SyncSettings',
  components: {
    ClearPreferencesButton,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxStateStoring,
    DxRequiredRule,
    DxStringLengthRule,
    DxRangeRule,
    DxNumericRule,
  },
  data () {
    return {
      companies: [],
    }
  },
  computed: {
    ...mapGetters(['canAdmin', 'canManager']),
  },
  methods: {
    async customLoad () {
      let state = await this.$http.get(LOAD_USER_PREFERENCES, {
        params: {
          table_id: 'sync_settings',
        },
      })
      return JSON.parse(state.data)
    },
    customSave (state) {
      let stateStr = JSON.stringify(state)
      this.$http.post(SAVE_USER_PREFERENCES, {
        table_id: 'sync_settings',
        json_string: stateStr,
      })
    },
    getCompanies () {
      this.$http.get(GET_SYNC_SETTINGS)
        .then((resp) => {
          this.companies = resp.data
        })
    },
    rowUpdated (e) {
      let params = {}
      for (let prop in e.data) {
        if (e.data[prop] !== undefined && e.data[prop] !== null) {
          params[prop] = e.data[prop]
        }
      }
      this.$http.post(SAVE_SYNC_SETTINGS, params)
        .then((response) => {
          this.$swal(this.$t('app.common.success'), this.$t('app.common.savedSuccessfully'), 'success')
          this.getCompanies()
        })
    },
    rowInserted (e) {
      let params = {}
      for (let prop in e.data) {
        if (e.data[prop] !== undefined && e.data[prop] !== null) {
          params[prop] = e.data[prop]
        }
      }
      this.$http.post(ADD_COMPANY, params)
        .then((response) => {
          this.$swal(this.$t('app.common.success'), this.$t('app.common.addedSuccessfully'), 'success')
          this.getCompanies()
        })
    },
  },
  mounted () {
    this.getCompanies()
  },
}
</script>

<style scoped>

</style>
