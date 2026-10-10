<template>
  <div class="row row-equal">
    <div class="flex xl12 xs12">
      <div class="row">
        <div class="flex xl12 xs12">
          <va-card :title="$t('app.pages.sync.currentStatus')">
            <div :class="[currentStatus.color]">
              {{ localizedStatus(currentStatus.status) }}
            </div>
          </va-card>
        </div>
        <div class="flex xl12 xs12">
          <va-card
           :title="$t('app.pages.sync.synchronize')"
           v-if="canManager"
          >
            <va-select
             :label="$t('app.pages.sync.company')"
             v-model="currentCompany"
             max-height="400px"
             searchable
             textBy="name"
             :options="companies"
            />
            <va-button
             small
             slot="actions"
             color="primary"
             class="mr-0"
             @click="sync"
            >
              {{ $t('app.pages.sync.start') }}
            </va-button>
          </va-card>
        </div>
        <div class="flex xl12 xs12">
          <va-card :title="$t('app.pages.sync.history')" class="data-table-card">
            <ClearPreferencesButton table_id="sync"></ClearPreferencesButton>
            <dx-data-grid
             :data-source="syncs"
             :remote-operations="false"
             :allow-column-reordering="true"
             :allow-column-resizing="true"
             :show-row-lines="true"
             :summary="{
                groupItems: [{
                  column: 'id',
                  summaryType: 'count'
                }]
             }"
             :row-alternation-enabled="true"
             :show-borders="true"
            >
              <dx-group-panel :visible="false"/>
              <dx-grouping :auto-expand-all="false"/>
              <DxPager
               :show-page-size-selector="true"
               :allowed-page-sizes="pageSizes"
               :show-info="true"
              />
              <dx-column-chooser
               :enabled="true"
              />
              <DxStateStoring
               :enabled="true"
               type="custom"
               :custom-save="customSaveSyncs"
               :custom-load="customLoadSyncs"
              />
              <dx-paging :page-size="5"/>
              <dx-header-filter :visible="true"></dx-header-filter>
              <dx-filter-row
               :visible="true"
              />
              <dx-column
               cell-template="cellTemplate"
               :caption="$t('app.common.number')"
              />
              <template #cellTemplate="cell">
                {{cell.data.row.rowIndex + 1}}
              </template>
              <dx-column
               data-field="date_time"
               :caption="$t('app.pages.sync.syncTime')"
              />
              <dx-column
               data-field="initiator"
               :caption="$t('app.pages.sync.initiator')"
              />
              <dx-column
               data-field="company"
               :caption="$t('app.pages.sync.company')"
              />
              <dx-column
               data-field="status"
               :caption="$t('app.pages.sync.status')"
               cell-template="status-cell"
              />
              <dx-column
               data-field="changes"
               :caption="$t('app.pages.sync.changesCount')"
              />
              <template #status-cell="{ data }">
                <va-chip
                 color="primary"
                 v-if="data.value == 'Завершенно'"
                >
                  {{ localizedStatus(data.value) }}
                </va-chip>
                <va-chip
                 color="warning"
                 v-else-if="data.value == 'В процессе'"
                >
                  {{ localizedStatus(data.value) }}
                </va-chip>
                <va-chip
                 color="danger"
                 v-else
                >
                  {{ localizedStatus(data.value) }}
                </va-chip>
              </template>
              <dx-column
               type="buttons"
              >
                <dx-button
                 :hint="$t('app.pages.sync.changesList')"
                 icon="orderedlist"
                 :on-click="showChanges"
                />
              </dx-column>
            </dx-data-grid>
          </va-card>
        </div>
      </div>
    </div>
    <va-modal
     v-model="showChangesModal"
     size="large"
     :title="$t('app.pages.sync.changes')"
     max-width="100%"
     :okText=" $t('main.inventorizations.modal.confirm') "
     :cancelText=" $t('main.inventorizations.modal.cancel') "
    >
      <ClearPreferencesButton table_id="sync_data"></ClearPreferencesButton>
      <div class="row row-equal">
        <div class="flex md12">
          <dx-data-grid
           :data-source="syncChanges"
           ref="itemsGrid"
           :remote-operations="false"
           :allow-column-reordering="true"
           :allow-column-resizing="true"
           :show-row-lines="true"
           :summary="{
                groupItems: [{
                  column: 'id',
                  summaryType: 'count'
                }]
             }"
           :row-alternation-enabled="false"
           :show-borders="true"
           @row-prepared="rowPrepared"
          >
            <dx-group-panel :visible="false"/>
            <dx-grouping :auto-expand-all="false"/>
            <DxPager
             :show-page-size-selector="true"
             :allowed-page-sizes="pageSizes"
             :show-info="true"
            />
            <dx-column-chooser
             :enabled="true"
            />
            <DxStateStoring
             :enabled="true"
             type="custom"
             :custom-save="customSaveSyncData"
             :custom-load="customLoadSyncData"
            />
            <dx-header-filter :visible="true"></dx-header-filter>
            <dx-filter-row
             :visible="true"
            />
            <dx-paging :page-size="10"/>
            <dx-column
             cell-template="cellTemplate"
             :caption="$t('app.common.number')"
            />
            <template #cellTemplate="cell">
              {{cell.data.row.rowIndex + 1}}
            </template>
            <dx-column
             data-field="name"
             :caption="$t('app.pages.sync.assetName')"
            />
            <dx-column
             data-field="company"
             :caption="$t('app.pages.sync.company')"
            />
            <dx-column
             data-field="code"
             :caption="$t('app.pages.sync.uniqueCode')"
             :visible="false"
            />
            <dx-column
             data-field="inventory_number"
             :caption="$t('app.pages.sync.inventoryNumber')"
             data-type="string"
            />
            <dx-column
             data-field="change_type"
             :caption="$t('app.pages.sync.changeType')"
            />
            <dx-column
             data-field="change_column"
             :caption="$t('app.pages.sync.changedField')"
            />
            <dx-column
             data-field="old_value"
             :caption="$t('app.pages.sync.oldValue')"
            />
            <dx-column
             data-field="new_value"
             :caption="$t('app.pages.sync.newValue')"
            />
            <dx-column
             data-field="date_change"
             :caption="$t('app.pages.sync.changedAt')"
            />
            <dx-column
             data-field="event"
             :caption="$t('app.pages.sync.oneCChangeType')"
            />
            <dx-column
              data-field="location"
              :caption="$t('app.pages.sync.currentLocation')"
            />
          </dx-data-grid>
        </div>
      </div>
    </va-modal>
  </div>
</template>

<script>
import {
  GET_COMPANIES,
  GET_CURRENT_SYNC_STATUS,
  GET_START_MANUAL_SYNC,
  GET_SYNC_CHANGES,
  GET_SYNCS, LOAD_USER_PREFERENCES, SAVE_USER_PREFERENCES,
} from '../../consts/urls'
import {
  DxDataGrid,
  DxColumn,
  DxPager,
  DxColumnChooser,
  DxHeaderFilter,
  DxStateStoring,
  DxGroupPanel,
  DxGrouping,
  DxFilterRow,
  DxPaging,
  DxButton,
} from 'devextreme-vue/data-grid'
import { mapGetters } from 'vuex'
import ClearPreferencesButton from '../ClearPreferencesButton'
export default {
  name: 'Sync',
  components: {
    ClearPreferencesButton,
    DxDataGrid,
    DxColumn,
    DxPager,
    DxColumnChooser,
    DxGroupPanel,
    DxGrouping,
    DxStateStoring,
    DxHeaderFilter,
    DxFilterRow,
    DxPaging,
    DxButton,
  },
  data () {
    return {
      currentStatus: {},
      syncs: [],
      companies: [],
      currentCompany: [],
      syncChanges: [],
      pageSizes: [5, 10, 20, 50, 100, 200, 500],
      showChangesModal: false,
    }
  },
  computed: {
    ...mapGetters(['canAdmin', 'canManager']),
  },
  methods: {
    localizedStatus (status) {
      if (status === 'Завершенно' || status === 'Завершено' || status === 'Completed') {
        return this.$t('app.status.completed')
      }
      if (status === 'В процессе' || status === 'In progress') {
        return this.$t('app.status.inProgress')
      }
      if (status === 'Система готова к синхронизации') {
        return this.$t('app.status.ready')
      }
      return status || this.$t('app.status.ready')
    },
    async customLoad (tableId) {
      let state = await this.$http.get(LOAD_USER_PREFERENCES, {
        params: {
          table_id: tableId,
        },
      })
      return JSON.parse(state.data)
    },
    customSave (state, tableId) {
      let stateStr = JSON.stringify(state)
      this.$http.post(SAVE_USER_PREFERENCES, {
        table_id: tableId,
        json_string: stateStr,
      })
    },
    async customLoadSyncs () {
      return this.customLoad('sync')
    },
    customSaveSyncs (state) {
      this.customSave(state, 'sync')
    },
    async customLoadSyncData () {
      return this.customLoad('sync_data')
    },
    customSaveSyncData (state) {
      this.customSave(state, 'sync_data')
    },
    rowPrepared (e) {
      if (e.rowType === 'data') {
        switch (e.data.change_type_id) {
          case '1':
            e.rowElement.style.backgroundColor = 'rgba(83, 237, 106, 0.5)'
            break
          case '2':
            e.rowElement.style.backgroundColor = 'rgba(240, 89, 91, 0.5)'
            break
          case '3':
            e.rowElement.style.backgroundColor = 'rgba(128, 83, 252, 0.5)'
            break
        }
      }
    },
    updateData () {
      this.$http.get(GET_CURRENT_SYNC_STATUS)
        .then((response) => {
          this.currentStatus = response.data
        })
      this.$http.get(GET_SYNCS)
        .then((response) => {
          this.syncs = response.data
        })
      this.$http.get(GET_COMPANIES, {
        params: {
          is_deleted: 0,
          is_self_added: 0,
        },
      })
        .then((response) => {
          this.companies = response.data
        })
    },
    showChanges (e) {
      this.syncChanges = []
      this.$http.get(GET_SYNC_CHANGES, {
        params: {
          sync_id: e.row.data.id,
        },
      })
        .then((response) => {
          this.syncChanges = response.data
          this.showChangesModal = true
        })
    },
    sync () {
      if (this.currentCompany.id !== undefined) {
        this.$swal({
          title: this.$t('app.common.areYouSure'),
          text: this.$t('app.pages.sync.confirmStart'),
          icon: 'info',
          showCancelButton: true,
          cancelButtonText: this.$t('app.common.cancel'),
          confirmButtonText: this.$t('app.common.confirm'),
        })
          .then((result) => {
            if (result.value) {
              return this.$http.get(GET_START_MANUAL_SYNC, {
                params: {
                  companyId: this.currentCompany.id,
                },
              })
            }
          })
          .then((response) => {
            if (response) {
              this.$swal(this.$t('app.common.success'), this.$t('app.pages.sync.createdSuccessfully'), 'success')
              this.updateData()
            }
          })
      } else {
        this.$swal(this.$t('app.common.error'), this.$t('app.pages.sync.companyRequired'), 'error')
      }
    },
  },
  beforeMount () {
    this.updateData()
  },
}
</script>

<style scoped>
  .yellow{
    color: yellow;
  }
  .green{
    color: green;
  }
  .red{
    color: red;
  }
  .default{
    color: #84fab0;
  }
</style>
