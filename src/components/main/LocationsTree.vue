<template>
  <dx-drop-down-box
    :ref="dropDownBoxRefName"
    :drop-down-options="dropDownOptions"
    :data-source="dataSource"
    :value.sync="currentValue"
    @option-changed="optionChanged"
    :show-clear-button="true"
    display-expr="name"
    value-expr="id"
    content-template="contentTemplate"
  >
    <template #contentTemplate="{}">
      <DxTreeList
        :data-source="dataSourceTree"
        :show-row-lines="true"
        :show-borders="true"
        :column-auto-width="true"
        :allow-column-reordering="true"
        :allow-column-resizing="true"
        :on-selection-changed="onSelectionChanged"
        items-expr="children"
        key-expr="id"
        data-structure="tree"
      >
        <DxScrolling
          mode="standard"
        />
        <dx-header-filter :visible="true"></dx-header-filter>
        <dx-filter-row
          :visible="true"
          apply-filter="onClick"
        />
        <dx-column
          cell-template="cellTemplate"
          caption="№"
        />
        <template #cellTemplate="cell">
          {{cell.data.row.rowIndex + 1}}
        </template>
        <DxColumn
          data-field="name"
          caption="Название"
        />
        <DxPaging
          :enabled="true"
          :page-size="10"
        />
        <DxColumn
          data-field="company"
          caption="Компания"
        />
        <DxSelection mode="single"/>
      </DxTreeList>
    </template>
  </dx-drop-down-box>
</template>

<script>
import DxDropDownBox from 'devextreme-vue/drop-down-box'
import { DxTreeList, DxColumn, DxEditing, DxStateStoring, DxPaging, DxPager, DxScrolling, DxHeaderFilter, DxFilterRow, DxSelection } from 'devextreme-vue/tree-list'
const dropDownBoxRefName = 'dropDownBoxRef'

export default {
  name: 'LocationsTree',
  components: {
    DxDropDownBox,
    DxTreeList,
    DxPaging,
    DxPager,
    DxColumn,
    DxStateStoring,
    DxScrolling,
    DxEditing,
    DxHeaderFilter,
    DxFilterRow,
    DxSelection,
  },
  props: {
    value: {
      type: Number,
      default: null,
    },
    onValueChanged: {
      type: Function,
      default: () => function () {},
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    dataSourceTree: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      currentValue: this.value,
      dropDownOptions: { width: 500 },
      dropDownBoxRefName,
    }
  },
  methods: {
    onSelectionChanged (selectionChangedArgs) {
      this.currentValue = selectionChangedArgs.selectedRowKeys[0]
      this.onValueChanged(this.currentValue)
      if (selectionChangedArgs.selectedRowKeys.length > 0) {
        this.$refs[dropDownBoxRefName].instance.close()
      }
    },
    optionChanged (e) {
      if (e.name === 'value' && e.value == null) {
        this.onValueChanged(null)
      }
    },
  },
}
</script>

<style scoped>

</style>
