<template>
  <div class="row row-equal dashboard-charts">
    <div class="flex xs12 xl6">
      <va-card :title="$t('app.dashboard.syncDynamics')" class="dashboard-panel dashboard-panel--chart">
        <div class="dashboard-panel__caption">
          {{ $t('app.dashboard.syncDynamicsCaption') }}
        </div>
        <va-chart class="chart" :data="lineChartData" type="line"/>
      </va-card>
    </div>

    <div class="flex xs12 md6 xl3">
      <va-card :title="$t('app.dashboard.assetStatus')" class="dashboard-panel">
        <div class="dashboard-panel__caption">
          {{ $t('app.dashboard.assetStatusCaption') }}
        </div>
        <va-chart class="chart chart--donut" :data="donutChartData" type="donut"/>
      </va-card>
    </div>

    <div class="flex xs12 md6 xl3">
      <va-card :title="$t('app.dashboard.inventories')" class="dashboard-panel dashboard-panel--inventory">
        <va-button
          flat
          small
          slot="actions"
          class="mr-0"
          @click="$router.push({ path: '/main/inventorization' })"
        >
          {{ $t('app.common.showAll') }}
        </va-button>

        <div class="dashboard-panel__caption">
          {{ $t('app.dashboard.inventoriesCaption') }}
        </div>

        <div
          class="inventory-progress"
          v-for="(progress, idx) in progressData"
          :key="idx"
        >
          <div class="inventory-progress__meta">
            <span>{{ progress.textKey ? $t(progress.textKey) : progress.text }}</span>
            <strong>{{ Math.round(getPercent(progress.value, progress.maxvalue)) }}%</strong>
          </div>
          <va-progress-bar
            :value="getPercent(progress.value, progress.maxvalue)"
            :color="progress.color"
          />
          <p class="inventory-progress__count">
            {{ progress.value }} / {{ progress.maxvalue }} {{ $t('app.dashboard.checked') }}
          </p>
        </div>
      </va-card>
    </div>
  </div>
</template>

<script>
import { GET_INVS_STATUS, GET_ITEMS_COUNT, GET_LINE_CHARTS } from '../../consts/urls'
import { hex2rgb } from '../../services/color-functions'
import { mapGetters } from 'vuex'
import { mockDashboard } from '../../data/mockDashboardData'

export default {
  name: 'dashboard-charts',
  data () {
    return {
      lineChartData: {},
      donutChartData: {},
      progressData: [],
      colors: ['success', 'info', 'warning', 'danger'],
    }
  },
  computed: {
    ...mapGetters(['getCompany']),
  },
  watch: {
    getCompany () {
      this.getLineChartData()
      this.getPieChartData()
      this.getInvsStatusData()
    },
    '$themes.primary' () {
      this.colorChanged()
    },
    '$themes.info' () {
      this.colorChanged()
    },
    '$themes.danger' () {
      this.colorChanged()
    },
    '$themes.success' () {
      this.colorChanged()
    },
    '$themes.warning' () {
      this.colorChanged()
    },
    '$store.state' () {
      this.localizeCharts()
    },
  },
  methods: {
    getPercent (val, max) {
      if (!max) {
        return 0
      }
      return Math.min(100, (val / max) * 100)
    },
    chartDatasetLabel (index) {
      const keys = [
        'app.dashboard.added',
        'app.dashboard.changed',
        'app.dashboard.oneCEvents',
      ]
      return this.$t(keys[index] || keys[0])
    },
    decorateLineChart (chartData) {
      if (!chartData || !Array.isArray(chartData.datasets)) {
        return {}
      }

      return {
        ...chartData,
        datasets: chartData.datasets.map((dataset, idx) => {
          const themeName = this.colors[idx % this.colors.length]
          const color = this.$themes[themeName] || this.$themes.primary
          return {
            ...dataset,
            label: this.chartDatasetLabel(idx),
            backgroundColor: hex2rgb(color, 0.12).css,
            borderColor: color,
            pointBackgroundColor: color,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5,
            borderWidth: 2,
            fill: false,
            lineTension: 0.32,
          }
        }),
      }
    },
    buildDonutData (count) {
      return {
        labels: [
          this.$t('app.dashboard.onBalance'),
          this.$t('app.dashboard.offBalance'),
          this.$t('app.dashboard.utilized'),
        ],
        datasets: [{
          label: this.$t('app.dashboard.assetStatus'),
          backgroundColor: [
            this.$themes.success,
            this.$themes.info,
            this.$themes.danger,
          ],
          borderWidth: 0,
          data: [count.on_balance, count.written_off, count.removed],
        }],
      }
    },
    useMockLineChart () {
      this.lineChartData = this.decorateLineChart(mockDashboard.lineChart)
    },
    useMockDonut () {
      this.donutChartData = this.buildDonutData(mockDashboard.counts)
    },
    useMockInventories () {
      this.progressData = mockDashboard.inventories.map(item => ({ ...item }))
    },
    localizeCharts () {
      if (this.lineChartData && Array.isArray(this.lineChartData.datasets)) {
        this.lineChartData = this.decorateLineChart(this.lineChartData)
      }
      if (
        this.donutChartData &&
        Array.isArray(this.donutChartData.datasets) &&
        this.donutChartData.datasets[0]
      ) {
        const data = [...this.donutChartData.datasets[0].data]
        this.donutChartData = this.buildDonutData({
          on_balance: data[0] || 0,
          written_off: data[1] || 0,
          removed: data[2] || 0,
        })
      }
    },
    colorChanged () {
      this.localizeCharts()
    },
    getLineChartData () {
      const params = {}
      if (this.getCompany != null) {
        params.company_id = this.getCompany
      }

      this.$http.get(GET_LINE_CHARTS, { params })
        .then((response) => {
          if (
            response.data &&
            Array.isArray(response.data.datasets) &&
            response.data.datasets.length
          ) {
            this.lineChartData = this.decorateLineChart(response.data)
          } else {
            this.useMockLineChart()
          }
        })
        .catch(() => {
          this.useMockLineChart()
        })
    },
    getPieChartData () {
      const params = {}
      if (this.getCompany != null) {
        params.company_id = this.getCompany
      }

      this.$http.get(GET_ITEMS_COUNT, { params })
        .then((response) => {
          if (response.data && typeof response.data.on_balance !== 'undefined') {
            this.donutChartData = this.buildDonutData(response.data)
          } else {
            this.useMockDonut()
          }
        })
        .catch(() => {
          this.useMockDonut()
        })
    },
    getInvsStatusData () {
      const params = {}
      if (this.getCompany != null) {
        params.company_id = this.getCompany
      }

      this.$http.get(GET_INVS_STATUS, { params })
        .then((response) => {
          if (Array.isArray(response.data) && response.data.length) {
            this.progressData = response.data
          } else {
            this.useMockInventories()
          }
        })
        .catch(() => {
          this.useMockInventories()
        })
    },
  },
  mounted () {
    this.$root.$on('app-language-changed', this.localizeCharts)
    this.getLineChartData()
    this.getPieChartData()
    this.getInvsStatusData()
  },
  beforeDestroy () {
    this.$root.$off('app-language-changed', this.localizeCharts)
  },
}
</script>

<style lang="scss">
.dashboard-charts {
  .dashboard-panel {
    min-height: 405px;

    &__caption {
      margin: -.2rem 0 1rem;
      color: #8a97a8;
      font-size: .76rem;
    }

    &--inventory {
      .va-card__body {
        padding-bottom: 1rem;
      }
    }
  }

  .chart {
    height: 315px;

    &--donut {
      max-height: 300px;
    }
  }

  .inventory-progress {
    padding: .85rem 0;

    & + .inventory-progress {
      border-top: 1px solid #edf1f5;
    }

    &__meta {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: .7rem;
      margin-bottom: .55rem;

      span {
        color: #394b61;
        font-size: .79rem;
        line-height: 1.3;
      }

      strong {
        color: #1f3146;
        font-size: .78rem;
      }
    }

    &__count {
      margin: .4rem 0 0;
      color: #96a2b1;
      font-size: .69rem;
    }
  }
}

@media (max-width: 640px) {
  .dashboard-charts {
    margin-left: 0 !important;
    margin-right: 0 !important;

    .flex {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }

    .dashboard-panel {
      min-height: auto;
      margin-bottom: .8rem !important;

      .va-card__body {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        overflow: hidden;
        box-sizing: border-box;
      }

      &__caption {
        margin-bottom: .7rem;
      }
    }

    .chart {
      width: 100% !important;
      max-width: 100% !important;
      min-width: 0 !important;
      height: 255px;
      overflow: hidden;

      canvas {
        display: block;
        width: 100% !important;
        max-width: 100% !important;
      }

      &--donut {
        height: 235px;
        max-height: 235px;
      }
    }

    .inventory-progress {
      padding: .72rem 0;
    }
  }
}
</style>
