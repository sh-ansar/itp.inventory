<template>
  <va-card :title="$t('app.dashboard.latestCompanySyncs')" class="company-sync-card data-table-card">
    <va-button
      small
      slot="actions"
      color="primary"
      class="mr-0"
      @click="$router.push({ path:'/admin/sync' })"
    >
      {{ $t('app.common.toSynchronizations') }}
    </va-button>

    <div class="company-sync-card__intro">
      <p>{{ $t('app.dashboard.latestCompanySyncsCaption') }}</p>
    </div>

    <div class="company-sync-card__toolbar">
      <ClearPreferencesButton table_id="last_syncs_by_company"></ClearPreferencesButton>
    </div>

    <dx-data-grid
      :data-source="items"
      ref="itemsGrid"
      :remote-operations="false"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :show-row-lines="true"
      :row-alternation-enabled="false"
      :show-borders="false"
      class="company-sync-grid"
    >
      <dx-column-chooser :enabled="true" />
      <DxPager
        :show-page-size-selector="true"
        :allowed-page-sizes="pageSizes"
        :show-info="true"
      />
      <dx-column
        cell-template="cellTemplate"
        caption="№"
        width="54"
        alignment="center"
      />
      <DxStateStoring
        :enabled="true"
        type="custom"
        :custom-save="customSave"
        :custom-load="customLoad"
      />

      <template #cellTemplate="cell">
        {{cell.data.row.rowIndex + 1}}
      </template>

      <dx-column
        data-field="name"
        :caption="$t('app.dashboard.company')"
        min-width="160"
      />
      <dx-column
        data-field="date_time"
        :caption="$t('app.dashboard.dateTime')"
        alignment="center"
        min-width="145"
      />
      <dx-column
        data-field="status"
        :caption="$t('app.dashboard.status')"
        cell-template="status-cell"
        alignment="center"
        min-width="115"
      />
      <dx-column
        data-field="created"
        :caption="$t('app.dashboard.added')"
        cell-template="created-cell"
        alignment="center"
      />
      <dx-column
        data-field="changed"
        :caption="$t('app.dashboard.changed')"
        cell-template="changed-cell"
        alignment="center"
      />
      <dx-column
        data-field="ones"
        :caption="$t('app.dashboard.oneCEvents')"
        cell-template="neutral-cell"
        alignment="center"
      />
      <dx-column
        data-field="utilized"
        :caption="$t('app.dashboard.utilized')"
        cell-template="danger-cell"
        alignment="center"
      />
      <dx-column
        data-field="outbalanced"
        :caption="$t('app.dashboard.movedOffBalance')"
        cell-template="neutral-cell"
        alignment="center"
      />

      <dx-header-filter :visible="true"></dx-header-filter>
      <dx-search-panel
        :visible="true"
        :highlight-case-sensitive="false"
        :placeholder="$t('app.dashboard.searchTable')"
        width="210"
      />
      <dx-paging :page-size="10"/>

      <template #status-cell="{ data }">
        <span
          class="sync-status"
          :class="statusClass(data.value)"
        >
          <span class="sync-status__dot"></span>
          {{ localizedStatus(data.value) }}
        </span>
      </template>

      <template #created-cell="{ data }">
        <span class="metric-pill metric-pill--primary">{{ data.value }}</span>
      </template>

      <template #changed-cell="{ data }">
        <span class="metric-pill metric-pill--info">{{ data.value }}</span>
      </template>

      <template #neutral-cell="{ data }">
        <span class="metric-pill">{{ data.value }}</span>
      </template>

      <template #danger-cell="{ data }">
        <span class="metric-pill metric-pill--danger">{{ data.value }}</span>
      </template>
    </dx-data-grid>
  </va-card>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxPager,
  DxPaging,
  DxColumnChooser,
  DxStateStoring,
  DxHeaderFilter,
  DxSearchPanel,
} from 'devextreme-vue/data-grid'
import {
  GET_COMPANIES_WITH_SYNC_INFO,
  LOAD_USER_PREFERENCES,
  SAVE_USER_PREFERENCES,
} from '../../consts/urls'
import ClearPreferencesButton from '../ClearPreferencesButton'
import { mockDashboard } from '../../data/mockDashboardData'

export default {
  name: 'DashboardCompaniesTable',
  components: {
    ClearPreferencesButton,
    DxDataGrid,
    DxColumn,
    DxPager,
    DxColumnChooser,
    DxStateStoring,
    DxHeaderFilter,
    DxPaging,
    DxSearchPanel,
  },
  data () {
    return {
      items: [],
      pageSizes: [5, 10, 20],
    }
  },
  methods: {
    useMockData () {
      this.items = mockDashboard.companySyncs.map(item => ({ ...item }))
    },
    statusClass (status) {
      if (status === 'Завершено' || status === 'Завершенно' || status === 'Completed') {
        return 'sync-status--success'
      }
      if (status === 'В процессе' || status === 'In progress') {
        return 'sync-status--warning'
      }
      return 'sync-status--danger'
    },
    localizedStatus (status) {
      if (status === 'Завершено' || status === 'Завершенно' || status === 'Completed') {
        return this.$t('app.dashboard.completed')
      }
      if (status === 'В процессе' || status === 'In progress') {
        return this.$t('app.dashboard.inProgress')
      }
      return status
    },
    getData () {
      this.$http.get(GET_COMPANIES_WITH_SYNC_INFO)
        .then((response) => {
          if (Array.isArray(response.data) && response.data.length) {
            this.items = response.data
          } else {
            this.useMockData()
          }
        })
        .catch(() => {
          this.useMockData()
        })
    },
    async customLoad () {
      try {
        const state = await this.$http.get(LOAD_USER_PREFERENCES, {
          params: {
            table_id: 'last_syncs_by_company',
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
        table_id: 'last_syncs_by_company',
        json_string: stateStr,
      }).catch(() => {})
    },
  },
  beforeMount () {
    this.getData()
  },
}
</script>

<style lang="scss">
.company-sync-card {
  margin-top: .1rem;

  &__intro {
    margin: -.25rem 0 .85rem;

    p {
      margin: 0;
      color: #8a97a8;
      font-size: .76rem;
    }
  }

  &__toolbar {
    margin-bottom: .7rem;

    .va-button {
      border-radius: 9px;
      box-shadow: none;
    }
  }

  .company-sync-grid {
    border: 1px solid #e7edf4;
    border-radius: 12px;
    overflow: hidden;

    .dx-datagrid {
      color: #36485e;
      font-family: "Open Sans";
    }

    .dx-datagrid-headers {
      color: #617186;
      background: #f7f9fc;
      border-bottom: 1px solid #e7edf4;
      font-weight: 600;
    }

    .dx-datagrid-rowsview .dx-row {
      border-color: #edf1f5;
    }

    .dx-row-alt > td {
      background: #fbfcfe;
    }

    .dx-datagrid-search-panel {
      border-radius: 8px;
    }
  }
}

.sync-status {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  padding: .3rem .55rem;
  color: #536377;
  background: #f4f6f8;
  border-radius: 999px;
  font-size: .72rem;
  font-weight: 600;

  &__dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #9aa5b3;
  }

  &--success {
    color: #238454;
    background: rgba(46, 189, 117, .11);

    .sync-status__dot { background: #2ebd75; }
  }

  &--warning {
    color: #a56f0a;
    background: rgba(226, 166, 43, .13);

    .sync-status__dot { background: #e2a62b; }
  }

  &--danger {
    color: #bd4141;
    background: rgba(238, 90, 90, .11);

    .sync-status__dot { background: #ee5a5a; }
  }
}

.metric-pill {
  display: inline-block;
  min-width: 32px;
  padding: .24rem .48rem;
  color: #607084;
  background: #f1f4f7;
  border-radius: 7px;
  font-size: .72rem;
  font-weight: 600;

  &--primary {
    color: #246ccf;
    background: rgba(43, 124, 255, .1);
  }

  &--info {
    color: #168a95;
    background: rgba(34, 179, 193, .11);
  }

  &--danger {
    color: #bd4141;
    background: rgba(238, 90, 90, .1);
  }
}
</style>
