<template>
  <template>
    <dx-column
     cell-template="cellTemplate"
     :allow-editing="false"
     :caption="$t('app.common.number')"
    />
    <dx-column
     data-field="name"
     :allow-editing="canManager"
     :caption="$t('item.name')"/>
    <dx-column
     data-field="location_id"
     :allow-editing="canManager"
     :header-filter="{
                  dataSource: getFilteredLocations
               }"
     :caption="$t('item.location')"
    >
      <DxLookup
       :data-source="locations"
       display-expr="name"
       value-expr="id"
      />
    </dx-column>
    <dx-column
     data-field="responsible_person_iin"
     :allow-editing="false"
     :caption="$t('app.pages.items.responsibleIin')"
    />
    <dx-column
     data-field="responsible_person_inn"
     :caption="$t('item.responsiblePerson')"
     :visible="false"
     :allow-editing="canManager"
    >
      <DxLookup
       :data-source="persons"
       display-expr="name"
       value-expr="iin"
      />
    </dx-column>
    <dx-column
     data-field="status_id"
     :allow-editing="canManager"
     :caption="$t('item.status')"
    >
      <DxLookup
       :data-source="statusOptions"
       display-expr="name"
       value-expr="id"
      />
    </dx-column>
    <dx-column
     data-field="company_id"
     :allow-editing="canManager"
     :caption="$t('app.pages.items.company')"
    >
      <DxLookup
       :data-source="companies"
       display-expr="name"
       value-expr="id"
      />
    </dx-column>
    <dx-column
     data-field="code"
     :caption="$t('app.pages.items.uniqueCode')"
     :allow-editing="false"
     :visible="true"
    />
    <!--              <dx-column-->
    <!--               data-field="order_number"-->
    <!--               :allow-editing="false"-->
    <!--               :caption="$t('item.orderNumber')"-->
    <!--               :visible="false"-->
    <!--              />-->
    <dx-column
     data-field="inventory_number"
     :allow-editing="canManager"
     :caption="$t('item.inventoryNumber')"
     :visible="true"
    />
    <dx-column
     data-field="account"
     data-type="number"
     :allow-editing="canManager"
     :caption="$t('item.account')"
     :visible="false"
    />
    <dx-column
     data-field="purchase_date"
     data-type="date"
     :allow-editing="canManager"
     :caption="$t('item.purchaseDate')"
     :visible="false"
    />
    <dx-column
     data-field="purchase_cost"
     data-type="number"
     :allow-editing="canManager"
     :caption="$t('item.purchaseCost')"
     :visible="false"
    />
    <dx-column
     data-field="date_utilized"
     :allow-editing="false"
     :caption="$t('app.pages.items.utilizationDate')"
     :visible="false"
    />
    <dx-column
     data-field="current_cost"
     data-type="number"
     :allow-editing="canManager"
     :caption="$t('item.currentCost')"
     :visible="false"
    />
    <dx-column
     data-field="factory_number"
     data-type="number"
     :allow-editing="canManager"
     :caption="$t('item.factoryNumber')"
     :visible="false"
    />
    <template #cellTemplate="cell">
      {{cell.data.row.rowIndex + 1}}
    </template>
    <dx-column
     data-field="passport_number"
     data-type="number"
     :allow-editing="canManager"
     :caption="$t('item.passportNumber')"
     :visible="false"
    />
    <!--              <dx-column-->
    <!--               data-field="start_cost"-->
    <!--               :allow-editing="false"-->
    <!--               :caption="$t('item.startCost')"-->
    <!--               :visible="false"-->
    <!--              />-->
    <dx-column
     data-field="description"
     :caption="$t('app.pages.items.description')"
     :allow-editing="canManager"
     css-class="color-green"
    />
    <dx-column
     data-field="source"
     :caption="$t('app.pages.items.manual')"
     data-type="boolean"
     :allow-editing="false"
    />
    <DxColumn
     data-field="fact_location_id"
     :caption="$t('app.pages.items.actualLocation')"
     :allow-editing="canManager"
     css-class="color-green"
    >
      <DxLookup
       :data-source="locations"
       display-expr="name"
       value-expr="id"
      />
    </DxColumn>
    <DxColumn
     data-field="fact_responsible_person_iin"
     :caption="$t('app.pages.items.actualResponsible')"
     :allow-editing="canManager"
     css-class="color-green"
    >
      <DxLookup
       :data-source="persons"
       display-expr="name"
       value-expr="iin"
      />
    </DxColumn>
    <dx-column
     type="buttons"
     :buttons="editButtons"
    >
      <!--                <dx-button-->
      <!--                 hint="Утилизировать"-->
      <!--                 icon="clear"-->
      <!--                 :visible="isNotUtilized"-->
      <!--                 :on-click="utilize"-->
      <!--                />-->
      <!--                <dx-button-->
      <!--                 hint="Вернуть из утилизации"-->
      <!--                 icon="check"-->
      <!--                 :visible="isUtilized"-->
      <!--                 :on-click="utilize"-->
      <!--                />-->
      <!--                <dx-button-->
      <!--                 hint="Показать QR"-->
      <!--                 icon="smalliconslayout"-->
      <!--                 :on-click="showQR"-->
      <!--                />-->
    </dx-column>
    <dx-filter-row
     :visible="true"
     apply-filter="onClick"
    />
  </template>
</template>

<script>
  import {
    DxDataGrid,
    DxColumn,
    DxGrouping,
    DxHeaderFilter,
    DxGroupPanel,
    DxEditing,
    DxLookup,
    DxStateStoring,
    DxPager,
    DxPaging,
    DxExport,
    DxSearchPanel,
    DxColumnChooser,
    DxFilterRow,
    DxButton,
    DxSelection
  } from 'devextreme-vue/data-grid'
  import ClearPreferencesButton from "../ClearPreferencesButton";
  import QrcodeVue from "qrcode.vue";
  import {mapGetters} from "vuex";
  export default {
    name: "ItemColumns",
    props: [''],
    components: {
      DxDataGrid,
      DxColumn,
      DxGrouping,
      DxHeaderFilter,
      ClearPreferencesButton,
      DxGroupPanel,
      DxEditing,
      DxLookup,
      DxStateStoring,
      DxPager,
      DxPaging,
      DxSearchPanel,
      DxColumnChooser,
      DxFilterRow,
      DxExport,
      DxButton,
      QrcodeVue,
      DxSelection
    },
    computed: {
      ...mapGetters(['canAdmin','canManager','getCompany'])
    },
  }
</script>

<style scoped>

</style>
