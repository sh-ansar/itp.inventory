<template>
  <div class="dashboard-summary">
    <div class="row">
      <div class="flex xs12 sm4" @click="showDetailedData(1)">
        <va-card class="kpi-card kpi-card--success">
          <div class="kpi-card__accent"></div>
          <div class="kpi-card__content">
            <div>
              <p class="kpi-card__value">{{ count.on_balance }}</p>
              <p class="kpi-card__label">{{ $t('app.dashboard.onBalance') }}</p>
              <p class="kpi-card__hint">{{ $t('app.dashboard.onBalanceHint') }}</p>
            </div>
            <div class="kpi-card__icon">
              <span class="fa fa-check"></span>
            </div>
          </div>
        </va-card>
      </div>

      <div class="flex xs12 sm4" @click="showDetailedData(2)">
        <va-card class="kpi-card kpi-card--info">
          <div class="kpi-card__accent"></div>
          <div class="kpi-card__content">
            <div>
              <p class="kpi-card__value">{{ count.written_off }}</p>
              <p class="kpi-card__label">{{ $t('app.dashboard.offBalance') }}</p>
              <p class="kpi-card__hint">{{ $t('app.dashboard.offBalanceHint') }}</p>
            </div>
            <div class="kpi-card__icon">
              <span class="fa fa-exchange"></span>
            </div>
          </div>
        </va-card>
      </div>

      <div class="flex xs12 sm4" @click="showDetailedData(3)">
        <va-card class="kpi-card kpi-card--danger">
          <div class="kpi-card__accent"></div>
          <div class="kpi-card__content">
            <div>
              <p class="kpi-card__value">{{ count.removed }}</p>
              <p class="kpi-card__label">{{ $t('app.dashboard.utilized') }}</p>
              <p class="kpi-card__hint">{{ $t('app.dashboard.utilizedHint') }}</p>
            </div>
            <div class="kpi-card__icon">
              <span class="fa fa-archive"></span>
            </div>
          </div>
        </va-card>
      </div>
    </div>

    <div class="row">
      <div class="flex xs12">
        <va-card class="activity-card">
          <div class="activity-card__header">
            <div>
              <p class="activity-card__eyebrow">{{ $t('app.dashboard.activity') }}</p>
              <h3>{{ $t('app.dashboard.latestOperations') }}</h3>
            </div>
          </div>

          <div class="activity-grid">
            <div class="activity-metric activity-metric--primary">
              <strong>{{ whitePillows.syncs }}</strong>
              <span>{{ $t('app.dashboard.syncs') }}</span>
            </div>
            <div class="activity-metric activity-metric--primary">
              <strong>{{ whitePillows.added }}</strong>
              <span>{{ $t('app.dashboard.added') }}</span>
            </div>
            <div class="activity-metric activity-metric--info">
              <strong>{{ whitePillows.changed }}</strong>
              <span>{{ $t('app.dashboard.changed') }}</span>
            </div>
            <div class="activity-metric activity-metric--warning">
              <strong>{{ whitePillows.ones }}</strong>
              <span>{{ $t('app.dashboard.oneCEvents') }}</span>
            </div>
            <div class="activity-metric activity-metric--danger">
              <strong>{{ whitePillows.utilized }}</strong>
              <span>{{ $t('app.dashboard.utilized') }}</span>
            </div>
            <div class="activity-metric activity-metric--success">
              <strong>{{ whitePillows.outbalanced }}</strong>
              <span>{{ $t('app.dashboard.movedOffBalance') }}</span>
            </div>
          </div>
        </va-card>
      </div>
    </div>

    <va-modal
      v-model="showInfoTable"
      size="large"
      max-width="100%"
      :title="$t('app.dashboard.assetStatus')"
      :hide-default-actions="true"
    >
      <va-button
        slot="actions"
        color="primary"
        @click="showInfoTable = false"
      >
        {{ $t('app.common.close') }}
      </va-button>
      <StatusInfoTableComponent :status="status" v-if="showInfoTable"/>
    </va-modal>
  </div>
</template>

<script>
import { GET_ITEMS_COUNT, GET_WHITE_PILLOWS_DATA } from '../../consts/urls'
import { mapGetters } from 'vuex'
import StatusInfoTableComponent from './StatusInfoTableComponent'
import { mockDashboard } from '../../data/mockDashboardData'

export default {
  name: 'DashboardInfoBlock',
  components: { StatusInfoTableComponent },
  data () {
    return {
      status: null,
      showInfoTable: false,
      whitePillows: {
        syncs: 0,
        added: 0,
        removed: 0,
        changed: 0,
        ones: 0,
        utilized: 0,
        outbalanced: 0,
      },
      count: {
        on_balance: 0,
        written_off: 0,
        removed: 0,
      },
    }
  },
  computed: {
    ...mapGetters(['getCompany']),
  },
  methods: {
    showDetailedData (status) {
      this.status = status
      this.showInfoTable = true
    },
    useMockCounts () {
      this.count = { ...mockDashboard.counts }
    },
    useMockActivity () {
      this.whitePillows = { ...mockDashboard.activity }
    },
    getPillowData () {
      const params = {}

      if (this.getCompany) {
        params.company_id = this.getCompany
      }

      this.$http.get(GET_ITEMS_COUNT, { params })
        .then((response) => {
          if (response.data && typeof response.data.on_balance !== 'undefined') {
            this.count = response.data
          } else {
            this.useMockCounts()
          }
        })
        .catch(() => {
          this.useMockCounts()
        })
    },
    getWhitePillowsData () {
      this.$http.get(GET_WHITE_PILLOWS_DATA)
        .then((response) => {
          if (response.data && typeof response.data.syncs !== 'undefined') {
            this.whitePillows = response.data
          } else {
            this.useMockActivity()
          }
        })
        .catch(() => {
          this.useMockActivity()
        })
    },
  },
  watch: {
    getCompany () {
      this.getPillowData()
    },
  },
  beforeMount () {
    this.getPillowData()
    this.getWhitePillowsData()
  },
}
</script>

<style lang="scss">
.dashboard-summary {
  .kpi-card {
    position: relative;
    min-height: 154px;
    cursor: pointer;
    transition: transform .18s ease, box-shadow .18s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(17, 29, 45, .1);
    }

    &__accent {
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
    }

    &__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: .35rem .2rem;
    }

    &__value {
      margin: 0;
      color: #17283d;
      font-size: 2rem;
      line-height: 1;
      font-weight: 700;
    }

    &__label {
      margin: .55rem 0 .2rem;
      color: #26384d;
      font-size: 1rem;
      font-weight: 600;
    }

    &__hint {
      margin: 0;
      color: #8a97a8;
      font-size: .76rem;
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 46px;
      height: 46px;
      flex: 0 0 46px;
      border-radius: 12px;
      font-size: 1rem;
    }

    &--success {
      .kpi-card__accent { background: #2ebd75; }
      .kpi-card__icon { color: #20965c; background: rgba(46, 189, 117, .12); }
    }

    &--info {
      .kpi-card__accent { background: #22b3c1; }
      .kpi-card__icon { color: #168a95; background: rgba(34, 179, 193, .12); }
    }

    &--danger {
      .kpi-card__accent { background: #ee5a5a; }
      .kpi-card__icon { color: #c54141; background: rgba(238, 90, 90, .11); }
    }
  }

  .activity-card {
    margin-top: 0 !important;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1rem;

      h3 {
        margin: .1rem 0 0;
        color: #24364b;
        font-size: 1rem;
        font-weight: 600;
      }
    }

    &__eyebrow {
      margin: 0;
      color: #1aa6c8;
      font-size: .68rem;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
    }
  }

  .activity-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    border: 1px solid #e9eef4;
    border-radius: 12px;
    overflow: hidden;
  }

  .activity-metric {
    position: relative;
    min-width: 0;
    padding: 1rem .75rem;
    background: #fff;
    text-align: center;

    & + .activity-metric {
      border-left: 1px solid #e9eef4;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 24%;
      right: 24%;
      height: 3px;
      border-radius: 0 0 3px 3px;
      background: #2b7cff;
      opacity: .8;
    }

    strong {
      display: block;
      margin-bottom: .35rem;
      color: #17283d;
      font-size: 1.45rem;
      line-height: 1;
    }

    span {
      display: block;
      color: #77869a;
      font-size: .76rem;
      white-space: nowrap;
    }

    &--info::before { background: #22b3c1; }
    &--warning::before { background: #e2a62b; }
    &--danger::before { background: #ee5a5a; }
    &--success::before { background: #2ebd75; }
  }
}

@media (max-width: 991px) {
  .dashboard-summary {
    .activity-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .activity-metric:nth-child(4) {
      border-left: 0;
      border-top: 1px solid #e9eef4;
    }

    .activity-metric:nth-child(5),
    .activity-metric:nth-child(6) {
      border-top: 1px solid #e9eef4;
    }
  }
}

@media (max-width: 575px) {
  .dashboard-summary {
    .activity-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .activity-metric:nth-child(odd) {
      border-left: 0;
    }

    .activity-metric:nth-child(n+3) {
      border-top: 1px solid #e9eef4;
    }
  }
}
</style>
