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
</style>
