<template>
  <va-page-layout
    @toggleSidebar="toggleSidebar"
    :mobileWidth="mobileWidth"
  >
    <app-navbar
      :minimized.sync="minimized"
    />
    <app-sidebar
      :minimized="minimized"
    />
    <main
      slot="content"
      id="content"
      class="layout gutter--xl fluid"
      :class="{'app-layout__main--full-width-sidebar': !minimized}"
      role="main"
    >
      <router-view/>
    </main>
  </va-page-layout>
</template>

<script>
import VaPageLayout from './VaPageLayout'
import AppNavbar from './app-navbar/AppNavbar'
import AppSidebar from './app-sidebar/AppSidebar'
import { mapGetters } from 'vuex'

export default {
  name: 'app-layout',
  components: {
    VaPageLayout,
    AppNavbar,
    AppSidebar,
  },
  data () {
    return {
      minimized: false,
      mobileWidth: 991,
    }
  },
  computed: {
    ...mapGetters([
      'isLoading',
    ]),
  },
  methods: {
    toggleSidebar (minimized) {
      this.minimized = minimized
    },
  },
}
</script>

<style lang="scss">
.app-layout {
  &__main {
    &--full-width-sidebar {
      @include media-breakpoint-down(xs) {
        display: none;
      }
    }
  }
}

.va-page-layout {
  > .va-sidebar {
    position: fixed !important;
    top: 72px !important;
    bottom: 0 !important;
    height: auto !important;
    min-height: calc(100vh - 72px) !important;
    overflow-y: auto;
    background: #102033;
    z-index: 100;
  }

  .content-wrap {
    min-height: calc(100vh - 72px);
    background: #f3f6f9;
  }
}

@media (max-width: 767px) {
  .va-page-layout {
    > .va-sidebar {
      top: 116px !important;
      bottom: 0 !important;
      height: auto !important;
      min-height: calc(100vh - 116px) !important;
    }

    .content-wrap {
      min-height: calc(100vh - 116px);
    }
  }
}

@media (max-width: 640px) {
  .va-page-layout {
    > .va-sidebar.va-sidebar--minimized {
      width: 0 !important;
      min-width: 0 !important;
      max-width: 0 !important;
      overflow: hidden !important;
      transform: translateX(-100%);
      pointer-events: none;
      box-shadow: none !important;
    }

    > .va-sidebar:not(.va-sidebar--minimized) {
      width: min(280px, 82vw) !important;
      max-width: 82vw !important;
      box-shadow: 12px 0 32px rgba(15, 31, 49, .18);
    }

    .content-wrap {
      width: 100% !important;
      max-width: 100% !important;
      margin-left: 0 !important;
      overflow-x: hidden;
    }
  }
}
</style>
