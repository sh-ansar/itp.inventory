<template>
  <div class="dashboard">
    <section class="dashboard-hero">
      <div>
        <p class="dashboard-hero__eyebrow">{{ $t('app.dashboard.eyebrow') }}</p>
        <h1 class="dashboard-hero__title">{{ $t('app.dashboard.title') }}</h1>
        <p class="dashboard-hero__subtitle">{{ $t('app.dashboard.subtitle') }}</p>
      </div>

      <div class="dashboard-hero__status">
        <span class="dashboard-hero__status-dot"></span>
        <div>
          <span class="dashboard-hero__status-label">
            {{ $t('app.dashboard.systemState') }}
          </span>
          <strong>{{ $t('app.dashboard.autoUpdate') }}</strong>
        </div>
      </div>
    </section>

    <dashboard-charts />
    <dashboard-info-block />

    <div class="row">
      <div class="flex xs12">
        <DashboardCompaniesTable />
      </div>
    </div>
  </div>
</template>

<script>
import DashboardCharts from './DashboardCharts'
import DashboardInfoBlock from './DashboardInfoBlock'
import DashboardCompaniesTable from './DashboardCompaniesTable'

export default {
  name: 'dashboard',
  components: {
    DashboardCharts,
    DashboardInfoBlock,
    DashboardCompaniesTable,
  },
}
</script>

<style lang="scss">
.dashboard {
  padding-bottom: 2rem;

  .row-equal .flex {
    .va-card {
      height: 100%;
    }
  }

  .va-card {
    margin-bottom: 0 !important;
    border: 1px solid #e7edf4;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(17, 29, 45, .06);
    overflow: hidden;
  }

  .va-card__header {
    letter-spacing: .02em;
  }
}

.dashboard-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin: 0 0 1.25rem;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f5f9fd 100%);
  border: 1px solid #e7edf4;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(17, 29, 45, .05);

  &__eyebrow {
    margin: 0 0 .35rem;
    color: #1aa6c8;
    font-size: .72rem;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  &__title {
    margin: 0;
    color: #182a3f;
    font-size: 1.75rem;
    line-height: 1.15;
    font-weight: 700;
  }

  &__subtitle {
    margin: .45rem 0 0;
    color: #748398;
    font-size: .95rem;
  }

  &__status {
    display: flex;
    align-items: center;
    gap: .75rem;
    min-width: 270px;
    padding: .8rem 1rem;
    background: #fff;
    border: 1px solid #e7edf4;
    border-radius: 12px;
    color: #26384d;

    strong {
      display: block;
      margin-top: .1rem;
      font-size: .88rem;
      font-weight: 600;
    }
  }

  &__status-label {
    display: block;
    color: #8b98a8;
    font-size: .72rem;
  }

  &__status-dot {
    width: 10px;
    height: 10px;
    flex: 0 0 10px;
    background: #2ebd75;
    border-radius: 50%;
    box-shadow: 0 0 0 5px rgba(46, 189, 117, .12);
  }
}

@media (max-width: 767px) {
  .dashboard-hero {
    align-items: flex-start;
    flex-direction: column;

    &__status {
      width: 100%;
      min-width: 0;
    }
  }
}

@media (max-width: 640px) {
  .dashboard {
    width: 100%;
    min-width: 0;
  }

  .dashboard-hero {
    gap: .9rem;
    margin-bottom: .85rem;
    padding: 1rem;

    &__title {
      font-size: 1.45rem;
      line-height: 1.18;
    }

    &__subtitle {
      font-size: .84rem;
      line-height: 1.45;
    }

    &__status {
      padding: .72rem .8rem;

      strong {
        font-size: .81rem;
        line-height: 1.3;
      }
    }
  }
}
</style>
