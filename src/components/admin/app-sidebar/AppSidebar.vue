<template>
  <va-sidebar :minimized="minimized">
    <template slot="menu">
      <template v-for="(item, key) in items">
        <va-sidebar-link-group
          :key="key"
          :minimized="minimized"
          :icon="[ 'sidebar-menu-item-icon vuestic-iconset', item.meta.iconClass ]"
          v-if="item.children && checkPrivilege(item)"
          :title="$t(item.displayName)"
          :children="item.children"
        >
          <va-sidebar-link
            v-for="(subMenuItem, key) in visibleChildren(item)"
            :key="key"
            :to="{ name: subMenuItem.name }"
            :title="$t(subMenuItem.displayName)"
          />
        </va-sidebar-link-group>
        <va-sidebar-link
          v-else-if="checkPrivilege(item)"
          :key="key"
          :minimized="minimized"
          :activeByDefault="item.name === $route.name"
          :icon="[ 'sidebar-menu-item-icon vuestic-iconset', item.meta.iconClass ]"
          :to="{ name: item.name }">
          <span slot="title">{{ $t(item.displayName) }}</span>
        </va-sidebar-link>
      </template>
    </template>
  </va-sidebar>
</template>

<script>
import { navigationRoutes } from './NavigationRoutes'
import { mapGetters } from 'vuex'

export default {
  name: 'app-sidebar',
  components: {
  },
  props: {
    minimized: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      items: navigationRoutes.routes,
    }
  },
  computed: {
    ...mapGetters([
      'canAdmin', 'canManager',
    ]),
    checkPrivilege () {
      return (item) => {
        if (item.meta && item.meta.roles) {
          let val = false
          item.meta.roles.forEach(el => {
            if (this[el]) {
              val = true
            }
          })
          return val
        } else {
          return true
        }
      }
    },
  },
  methods: {
    visibleChildren (item) {
      return (item.children || []).filter(this.checkPrivilege)
    },
  },
}

</script>
