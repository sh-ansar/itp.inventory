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
  color: #a8b4c2 !important;
}

/* Shared ITP.Inventory visual language for operational pages */
body {
  margin: 0;
  color: #26384d;
  background: #f3f6f9;
  font-family: "Open Sans", Arial, sans-serif;
}

.layout.gutter--xl {
  padding: 1.35rem 1.5rem 2rem;
}

.layout .va-card {
  border: 1px solid #e4eaf1;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(17, 29, 45, .055);
  overflow: hidden;
}

.layout .va-card__header {
  min-height: 52px;
  padding: 1rem 1.2rem .7rem;
  color: #173047;
  font-size: .82rem;
  font-weight: 800;
  letter-spacing: .075em;
  text-transform: uppercase;
}

.layout .va-card__body {
  padding: .85rem 1.15rem 1.15rem;
}

.layout .va-button {
  border-radius: 10px;
  box-shadow: none;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
}

.layout .dx-datagrid,
.layout .dx-treelist {
  color: #33485e;
  background: #fff;
  border: 1px solid #e4eaf1;
  border-radius: 12px;
  font-family: "Open Sans", Arial, sans-serif;
  font-size: 12.5px;
  overflow: hidden;
}

.layout .dx-datagrid-headers,
.layout .dx-treelist-headers {
  color: #617287;
  background: #f6f8fb;
  border-bottom: 1px solid #e2e8ef;
  font-weight: 700;
}

.layout .dx-datagrid-headers .dx-row > td,
.layout .dx-treelist-headers .dx-row > td {
  min-height: 44px;
  padding: 10px 9px;
  border-color: #e8edf3;
  vertical-align: middle;
}

.layout .dx-datagrid-rowsview .dx-row > td,
.layout .dx-treelist-rowsview .dx-row > td {
  min-height: 42px;
  padding: 9px 9px;
  border-color: #edf1f5;
  vertical-align: middle;
}

.layout .dx-datagrid-rowsview .dx-row-alt > td,
.layout .dx-treelist-rowsview .dx-row-alt > td {
  background: #fbfcfe;
}

.layout .dx-datagrid-rowsview .dx-row:hover > td,
.layout .dx-treelist-rowsview .dx-row:hover > td {
  background: #f3f8fd;
}

.layout .dx-datagrid-filter-row > td,
.layout .dx-treelist-filter-row > td {
  padding: 5px 7px !important;
  background: #fbfcfe;
}

.layout .dx-texteditor,
.layout .dx-datagrid-search-panel {
  border-color: #dce4ed;
  border-radius: 9px;
  background: #fff;
}

.layout .dx-datagrid-search-panel {
  width: 220px !important;
  height: 38px;
}

.layout .dx-toolbar {
  padding: .25rem 0 .65rem;
  background: transparent;
}

.layout .dx-toolbar .dx-button {
  border-color: #dde5ed;
  border-radius: 9px;
  background: #f8fafc;
}

.layout .dx-datagrid-group-panel,
.layout .dx-treelist-group-panel {
  min-height: 36px;
  padding: 6px 8px;
  color: #8a98aa;
  background: transparent;
  border: 0;
  font-size: 11.5px;
}

.layout .dx-pager {
  padding: 10px 6px 4px;
  color: #75869a;
  border-top: 1px solid #edf1f5;
}

.layout .dx-pager .dx-page,
.layout .dx-pager .dx-page-size {
  border-radius: 7px;
}

.layout .dx-pager .dx-selection {
  color: #1f70bd !important;
  background: #eaf4fe !important;
}

.layout .dx-datagrid .dx-header-filter,
.layout .dx-treelist .dx-header-filter {
  color: #aab6c4 !important;
}

.layout .dx-datagrid .dx-header-filter:hover,
.layout .dx-treelist .dx-header-filter:hover {
  color: #258df1 !important;
}

.layout .dx-command-edit .dx-link {
  margin: 0 4px;
  color: #2780c9;
}

.layout .color-green {
  color: #2e654d !important;
  background: #e8f6ee !important;
}

.layout .color-green.dx-editor-cell,
.layout .color-green.dx-focused {
  background: #f1fbf5 !important;
}

.layout a {
  color: #1976c9;
}

@media (max-width: 991px) {
  .layout.gutter--xl {
    padding: 1rem;
  }

  .layout .dx-datagrid,
  .layout .dx-treelist {
    font-size: 12px;
  }

  .operational-table-card .va-card__body,
  .inventory-list-card .va-card__body,
  .company-sync-card .va-card__body {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .operational-table-card .dx-datagrid,
  .inventory-list-card .dx-datagrid {
    min-width: 980px;
    max-width: none;
  }

  .company-sync-card .company-sync-grid {
    min-width: 900px;
    max-width: none;
  }
}

@media (max-width: 575px) {
  html,
  body,
  #app {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  .layout.gutter--xl {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
    padding: .7rem .65rem 1.35rem;
    overflow-x: hidden;
  }

  .layout .row {
    width: 100%;
    max-width: 100%;
    margin-left: 0 !important;
    margin-right: 0 !important;
    box-sizing: border-box;
  }

  .layout .flex {
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
  }

  .layout .flex.xs12 {
    width: 100%;
    flex-basis: 100%;
  }

  .layout .dashboard,
  .layout .operational-page,
  .layout .inventory-page {
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }

  .layout .va-card {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .layout .va-card__header {
    min-width: 0;
    padding-left: .9rem;
    padding-right: .9rem;
    flex-wrap: wrap;
    row-gap: .45rem;
  }

  .layout .va-card__header-inner {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    min-width: 0;
    gap: .5rem;
  }

  .layout .va-card__header-title {
    min-width: 0;
    flex: 1 1 100%;
  }

  .layout .va-card__header-actions {
    display: flex;
    flex: 1 1 100%;
    max-width: 100%;
    margin-left: 0 !important;
    justify-content: flex-start;
  }

  .layout .va-card__header-actions .va-button {
    max-width: 100%;
  }

  .layout .va-card__body {
    min-width: 0;
    padding: .75rem .8rem .9rem;
    box-sizing: border-box;
  }

  .layout .dx-datagrid-search-panel {
    width: 180px !important;
    max-width: 56vw;
  }

  .operational-table-card .va-card__body,
  .inventory-list-card .va-card__body,
  .company-sync-card .va-card__body {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .operational-table-card .dx-datagrid,
  .inventory-list-card .dx-datagrid {
    min-width: 900px;
    max-width: none;
  }

  .company-sync-card .company-sync-grid {
    min-width: 820px;
    max-width: none;
  }

  .layout .dx-toolbar {
    min-width: max-content;
  }

  .layout .dx-pager {
    min-width: 520px;
  }
}

/* Unified business tables: clean desktop styling + usable touch layout */
.layout .data-table-card .va-card__body {
  padding-top: .7rem;
}

.layout .data-table-card .clear-preferences-button {
  margin: 0 0 .72rem !important;
}

.layout .data-table-card .dx-datagrid,
.layout .data-table-card .dx-treelist {
  border-color: #dfe7ef;
  border-radius: 12px;
  box-shadow: inset 0 0 0 1px rgba(228, 234, 241, .3);
}

.layout .data-table-card .dx-datagrid-headers,
.layout .data-table-card .dx-treelist-headers {
  color: #52667c;
  background: #f5f8fb;
}

.layout .data-table-card .dx-datagrid-headers .dx-row > td,
.layout .data-table-card .dx-treelist-headers .dx-row > td {
  height: 42px;
  padding: 9px 9px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .01em;
}

.layout .data-table-card .dx-datagrid-rowsview .dx-row > td,
.layout .data-table-card .dx-treelist-rowsview .dx-row > td {
  height: 43px;
  padding: 9px;
  color: #344a61;
  background-clip: padding-box;
}

.layout .data-table-card .dx-datagrid-rowsview .dx-data-row:nth-child(even) > td,
.layout .data-table-card .dx-treelist-rowsview .dx-data-row:nth-child(even) > td {
  background-color: #fbfcfe;
}

.layout .data-table-card .dx-datagrid-rowsview .dx-selection > td,
.layout .data-table-card .dx-treelist-rowsview .dx-selection > td {
  color: #173d63 !important;
  background-color: #edf6ff !important;
}

.layout .data-table-card .dx-datagrid-rowsview .dx-row:hover > td,
.layout .data-table-card .dx-treelist-rowsview .dx-row:hover > td {
  background-color: #f2f7fc;
}

.layout .data-table-card .dx-toolbar {
  margin: 0;
  padding: .25rem 0 .65rem;
  background: #fff;
}

.layout .data-table-card .dx-toolbar .dx-button {
  width: 36px;
  height: 36px;
  border: 1px solid #dbe4ed;
  border-radius: 9px;
  background: #f8fafc;
}

.layout .data-table-card .dx-toolbar .dx-button:hover {
  border-color: #c9d9e8;
  background: #eef6fd;
}

.layout .data-table-card .dx-datagrid-search-panel,
.layout .data-table-card .dx-treelist-search-panel {
  height: 36px;
  border: 1px solid #dbe4ed;
  border-radius: 9px;
  background: #fff;
}

.layout .data-table-card .dx-filter-row > td {
  background: #fbfcfe;
}

.layout .data-table-card .dx-pager {
  min-height: 46px;
  padding: 9px 8px 5px;
  background: #fff;
}

.layout .data-table-card .dx-page,
.layout .data-table-card .dx-page-size {
  min-width: 30px;
  min-height: 30px;
  padding: 6px 9px !important;
  border-radius: 8px;
}

.layout .data-table-card .dx-command-edit .dx-link {
  width: 28px;
  height: 28px;
  margin: 0 2px;
  border-radius: 7px;
}

@media (max-width: 991px) {
  .layout .data-table-card .va-card__body {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-inline: contain;
    scrollbar-width: thin;
    scrollbar-color: #b7c4d1 transparent;
  }

  .layout .data-table-card .va-card__body::-webkit-scrollbar {
    height: 6px;
  }

  .layout .data-table-card .va-card__body::-webkit-scrollbar-thumb {
    background: #b7c4d1;
    border-radius: 999px;
  }

  .layout .data-table-card .dx-datagrid,
  .layout .data-table-card .dx-treelist {
    min-width: 900px;
    max-width: none;
  }

  .layout .data-table-card .dx-datagrid-header-panel,
  .layout .data-table-card .dx-treelist-header-panel {
    position: sticky;
    left: 0;
    z-index: 5;
    width: min(640px, calc(100vw - 120px)) !important;
    max-width: min(640px, calc(100vw - 120px)) !important;
    background: #fff;
  }

  .layout .data-table-card .dx-toolbar {
    width: 100% !important;
    min-width: 0 !important;
    margin: 0 !important;
    padding: .2rem 0 .55rem !important;
  }

  .layout .data-table-card .dx-toolbar-items-container {
    display: flex !important;
    align-items: center;
    width: 100% !important;
    min-height: 38px;
  }

  .layout .data-table-card .dx-toolbar-before,
  .layout .data-table-card .dx-toolbar-center,
  .layout .data-table-card .dx-toolbar-after {
    position: static !important;
    float: none !important;
    margin: 0 !important;
  }

  .layout .data-table-card .dx-toolbar-before,
  .layout .data-table-card .dx-toolbar-center {
    width: auto !important;
  }

  .layout .data-table-card .dx-toolbar-after {
    display: flex !important;
    align-items: center;
    gap: 5px;
    width: 100% !important;
    padding: 0 !important;
  }

  .layout .data-table-card .dx-toolbar-item {
    position: static !important;
    display: block !important;
    flex: 0 0 auto;
    padding: 0 !important;
  }

  .layout .data-table-card .dx-toolbar-item:last-child {
    min-width: 0;
    flex: 1 1 auto;
  }

  .layout .data-table-card .dx-datagrid-search-panel,
  .layout .data-table-card .dx-treelist-search-panel {
    width: 220px !important;
    min-width: 150px;
    max-width: 100%;
    margin: 0 !important;
  }

  .layout .data-table-card .dx-toolbar .dx-button {
    width: 36px;
    min-width: 36px;
    height: 36px;
  }
}

@media (max-width: 575px) {
  .layout .data-table-card {
    border-radius: 15px;
  }

  .layout .data-table-card .va-card__header {
    min-height: 0;
    padding: .75rem .9rem .45rem;
  }

  .layout .data-table-card .va-card__header-inner {
    min-height: 0;
    padding: 0 !important;
    gap: .4rem;
    align-items: flex-start;
  }

  .layout .data-table-card .va-card__header-title {
    line-height: 1.25;
  }

  .layout .data-table-card .va-card__header-actions {
    min-height: 0;
    padding: 0;
  }

  .layout .data-table-card .va-card__header-actions .va-button {
    margin: 0 !important;
  }

  .layout .data-table-card .va-card__body {
    padding: .65rem .7rem .8rem !important;
  }

  .layout .data-table-card .clear-preferences-button {
    margin: 0 0 .65rem !important;
    font-size: .78rem;
  }

  .layout .data-table-card .dx-datagrid,
  .layout .data-table-card .dx-treelist {
    min-width: 860px;
    font-size: 12px;
  }

  .layout .data-table-card .dx-datagrid-header-panel,
  .layout .data-table-card .dx-treelist-header-panel {
    width: calc(100vw - 56px) !important;
    max-width: calc(100vw - 56px) !important;
  }

  .layout .data-table-card .dx-toolbar {
    padding: 0 0 .45rem !important;
  }

  .layout .data-table-card .dx-toolbar-after {
    gap: 4px;
  }

  .layout .data-table-card .dx-datagrid-search-panel,
  .layout .data-table-card .dx-treelist-search-panel {
    width: 100% !important;
    min-width: 124px;
    max-width: 170px;
  }

  .layout .data-table-card .dx-toolbar .dx-button {
    width: 34px;
    min-width: 34px;
    height: 34px;
  }

  .layout .data-table-card .dx-datagrid-headers .dx-row > td,
  .layout .data-table-card .dx-treelist-headers .dx-row > td {
    height: 40px;
    padding: 8px;
    font-size: 11.5px;
  }

  .layout .data-table-card .dx-datagrid-rowsview .dx-row > td,
  .layout .data-table-card .dx-treelist-rowsview .dx-row > td {
    height: 42px;
    padding: 8px;
  }

  .layout .data-table-card .dx-pager {
    min-width: 460px;
    padding-top: 7px;
  }
}

</style>
