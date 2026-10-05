<template>
  <div id="app" class="app">
    <vue-progress-bar></vue-progress-bar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    this.$Progress.finish()
    this.filterOnEnter()
  },
  created () {
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {
      this.$store.commit('setLoading', true)
      this.$Progress.start()
      next()
    })

    this.$router.afterEach((to, from) => {
      this.$store.commit('setLoading', false)
      this.$Progress.finish()
      const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)

      const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)
      // const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

      if (nearestWithTitle) document.title = nearestWithTitle.meta.title

      Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

      if (!nearestWithMeta) return

      nearestWithMeta.meta.metaTags.map(tagDef => {
        const tag = document.createElement('meta')

        Object.keys(tagDef).forEach(key => {
          tag.setAttribute(key, tagDef[key])
        })

        tag.setAttribute('data-vue-router-controlled', '')

        return tag
      })
        .forEach(tag => document.head.appendChild(tag))
    })
  },
  methods: {
    filterOnEnter () {
      document.onkeydown = (event) => {
        if (event.key && event.key === 'Enter') {
          if (document.activeElement.tagName === 'INPUT' && document.activeElement.className === 'dx-texteditor-input') {
            document.querySelectorAll("[title='Применить фильтр']").forEach(el => {
              el.click()
            })
          }
        }
      }
    },
  },
}
</script>

<style lang="scss">
@import "../sass/main.scss";

body {
  height: 100%;

  #app {
    height: 100%;
  }
}
.va-navbar__logo{
  width: auto!important;
  height: 100%!important;
}
.dx-command-select {
  width: 20px!important;
  min-width: 20px!important;
}
.dx-datagrid .dx-header-filter, .dx-treelist .dx-header-filter {
  color: red!important;
}
.dx-datagrid .dx-header-filter-empty, .dx-treelist .dx-header-filter-empty {
  color: rgba(149, 149, 149, 0.5)!important;
}
</style>
