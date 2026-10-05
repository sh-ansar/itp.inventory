<template>
  <div class="row row-equal">
    <div class="flex xl12 xs12">
      <va-card :title="$t('app.pages.directories.actualLocationsTitle')" class="data-table-card">
        <ClearPreferencesButton table_id="locations_fact" />

        <DxTreeList
          :data-source="items"
          :show-row-lines="true"
          :show-borders="true"
          :column-auto-width="true"
          :allow-column-reordering="true"
          :allow-column-resizing="true"
          items-expr="children"
          key-expr="id"
          data-structure="tree"
          @row-inserted="inserted"
          @row-updated="updated"
          @row-removed="removed"
        >
          <DxScrolling mode="standard" />
          <dx-header-filter :visible="true" />
          <dx-filter-row
            :visible="true"
            apply-filter="onClick"
          />
          <DxEditing
            :allow-updating="isAllowedUpdating"
            :allow-deleting="isAllowedDeleting"
            :allow-adding="isAllowedAdding"
            :use-icons="true"
            mode="row"
          />
          <DxStateStoring
            :enabled="true"
            type="custom"
            :custom-save="customSave"
            :custom-load="customLoad"
          />

          <dx-column
            cell-template="cellTemplate"
            :caption="$t('app.common.number')"
            width="60"
            alignment="center"
          />
          <template #cellTemplate="cell">
            {{ cell.data.row.rowIndex + 1 }}
          </template>

          <DxColumn
            data-field="name"
            :caption="$t('app.pages.directories.name')"
          />
          <DxColumn
            data-field="company"
            :caption="$t('app.pages.directories.company')"
          />

          <DxPaging
            :enabled="true"
            :page-size="10"
          />
          <DxPager
            :show-page-size-selector="true"
            :allowed-page-sizes="pageSizes"
            :show-info="true"
          />
        </DxTreeList>
      </va-card>
    </div>
  </div>
</template>

<script>
import {
  DxTreeList,
  DxColumn,
  DxEditing,
  DxStateStoring,
  DxPaging,
  DxPager,
  DxScrolling,
  DxHeaderFilter,
  DxFilterRow,
} from 'devextreme-vue/tree-list'
import {
  ADD_LOCATIONS_FACT,
  DELETE_LOCATION,
  GET_LOCATIONS_FACT,
  LOAD_USER_PREFERENCES,
  SAVE_LOCATIONS_FACT,
  SAVE_USER_PREFERENCES,
} from '../../consts/urls'
import { mapGetters } from 'vuex'
import ClearPreferencesButton from '../ClearPreferencesButton'

function findItem (items, key, withIndex) {
  let item

  for (let i = 0; i < items.length; i++) {
    item = items[i]

    if (item.id === key) {
      return withIndex ? { item, items, index: i } : item
    }

    item = item.items && findItem(item.items, key, withIndex)

    if (item) {
      return item
    }
  }
}

export default {
  name: 'LocationsFact',
  components: {
    ClearPreferencesButton,
    DxTreeList,
    DxPaging,
    DxPager,
    DxColumn,
    DxStateStoring,
    DxScrolling,
    DxEditing,
    DxHeaderFilter,
    DxFilterRow,
  },
  data () {
    return {
      items: [],
      pageSizes: [5, 10, 20, 50, 100, 200, 500],
    }
  },
  computed: {
    ...mapGetters(['getCompany', 'canAdmin', 'canManager']),
  },
  methods: {
    async customLoad () {
      try {
        const state = await this.$http.get(LOAD_USER_PREFERENCES, {
          params: {
            table_id: 'locations_fact',
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
        table_id: 'locations_fact',
        json_string: stateStr,
      }).catch(() => {})
    },
    isAllowedAdding () {
      return this.canManager
    },
    isAllowedDeleting (e) {
      if (e.row.data.is_1c || e.row.node.hasChildren) {
        return false
      }
      return this.canManager
    },
    isAllowedUpdating (e) {
      if (e.row.data.is_1c) {
        return false
      }
      return this.canManager
    },
    getData () {
      const params = {}

      if (this.getCompany !== null) {
        params.company_id = this.getCompany
      }

      this.$http.get(GET_LOCATIONS_FACT, { params })
        .then((response) => {
          this.items = {
            key: 'id',
            load: function () {
              return response.data
            },
            insert: function (values) {
              const parentItem = findItem(response.data, values.parentId)
              delete values.parentId

              if (!parentItem) {
                response.data.push(values)
              } else {
                parentItem.items = parentItem.items || []
                parentItem.items.push(values)
              }
            },
            update: function (key, values) {
              const item = findItem(response.data, key)

              if (item) {
                Object.assign(item, values)
              }
            },
            remove: function () {},
          }
        })
    },
    inserted (e) {
      const parentId = e.key.parentKey
      const data = {
        name: e.data.name,
      }

      if (parentId !== 0) {
        data.parent_id = parentId
      }

      this.$http.post(ADD_LOCATIONS_FACT, data)
        .then(() => {
          this.getData()
        })
    },
    updated (e) {
      const data = {
        id: e.key,
        name: e.data.name,
      }

      this.$http.post(SAVE_LOCATIONS_FACT, data)
        .then(() => {
          this.getData()
        })
    },
    removed (e) {
      const id = e.key

      this.$http.post(DELETE_LOCATION, { id })
        .then(() => {
          this.$swal(
            this.$t('app.common.success'),
            this.$t('app.common.deletedSuccessfully'),
            'success',
          )
          this.getData()
        })
    },
  },
  watch: {
    getCompany () {
      this.getData()
    },
  },
  beforeMount () {
    this.getData()
  },
}
</script>

<style>
.dx-treelist-header-panel {
  display: none;
}
</style>
