<template>
  <div class="row row-equal">
    <div class="flex xl12 xs12">
      <va-card :title="$t('menu.utilized-items')">
        <va-button
         small
         slot="actions"
         color="danger"
         class="mr-0"
         @click="generateQRs"
        >
          {{ $t('app.pages.items.generateQr') }}
        </va-button>
        <input type="file" style="display: none" id="fileUploader">
        <ClearPreferencesButton table_id="main_items_util"></ClearPreferencesButton>
        <dx-data-grid
         :data-source="items"
         ref="itemsGrid"
         :remote-operations="false"
         :allow-column-reordering="true"
         key-expr="id"
         :allow-column-resizing="true"
         :show-row-lines="true"
         @row-updated="saveUpdatedData"
         :row-alternation-enabled="false"
         :show-borders="true"
        >
          <dx-selection
           :deffered="true"
           mode="multiple"
          />
          <dx-editing
           :allow-updating="canManager"
           :allow-adding="false"
           :use-icons="true"
           mode="cell"
          />
          <DxStateStoring
            :enabled="true"
            type="custom"
            :custom-save="customSave"
            :custom-load="customLoad"
          />
          <DxExport
           :enabled="true"
           :allow-export-selected-data="true"
           file-name="Items"
          >
          </DxExport>
          <DxPaging :page-size="10"/>
          <DxPager
           :show-page-size-selector="true"
           :allowed-page-sizes="pageSizes"
           :show-info="true"
          />
          <dx-header-filter :visible="true"></dx-header-filter>
          <dx-column
           cell-template="cellTemplate"
           :allow-editing="false"
           :caption="$t('app.common.number')"
          />
          <template #cellTemplate="cell">
            {{cell.data.row.rowIndex + 1}}
          </template>
          <dx-column
           data-field="name"
           :allow-editing="false"
           :caption="$t('item.name')"/>
          <dx-column
           data-field="location"
           :allow-editing="false"
           :caption="$t('item.location')"
          />
          <dx-column
           data-field="responsible_person"
           :allow-editing="false"
           :caption="$t('item.responsiblePerson')"
          />
          <dx-column
           data-field="responsible_person_inn"
           :allow-editing="false"
           :caption="$t('item.responsiblePersonInn')"
           :visible="false"
          />
          <dx-column
           data-field="status"
           :allow-editing="false"
           :caption="$t('item.status')"
           :calculate-cell-value="localizedUtilizedStatus"
          />
          <dx-column
           data-field="company"
           :allow-editing="false"
           :caption="$t('app.pages.items.company')"
          />
          <dx-column
           data-field="code"
           :allow-editing="false"
           :caption="$t('app.pages.items.uniqueCode')"
           :visible="true"
          />
          <dx-column
           data-field="order_number"
           :allow-editing="false"
           :caption="$t('item.orderNumber')"
           :visible="false"
          />
          <dx-column
           data-field="inventory_number"
           :allow-editing="false"
           :caption="$t('item.inventoryNumber')"
           :visible="true"
          />
          <dx-column
           data-field="account"
           :allow-editing="false"
           :caption="$t('item.account')"
           :visible="false"
          />
          <dx-column
           data-field="purchase_date"
           :allow-editing="false"
           :caption="$t('item.purchaseDate')"
           :visible="false"
          />
          <dx-column
           data-field="purchase_cost"
           :allow-editing="false"
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
           :allow-editing="false"
           :caption="$t('item.currentCost')"
           :visible="false"
          />
          <dx-column
           data-field="factory_number"
           :allow-editing="false"
           :caption="$t('item.factoryNumber')"
           :visible="false"
          />
          <dx-column
           data-field="passport_number"
           :allow-editing="false"
           :caption="$t('item.passportNumber')"
           :visible="false"
          />
          <dx-column
           data-field="start_cost"
           :allow-editing="false"
           :caption="$t('item.startCost')"
           :visible="false"
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
           data-field="util_order_file_name"
           :allow-editing="false"
           :caption="$t('app.pages.items.orderDocument')"
           cell-template="fileCellTemplate"
          />
          <template #fileCellTemplate="data">
            <a :href="uploadsPath+'/'+data.data.data.util_order_file_hashname" :title="data.data.value" target="_blank">{{data.data.value}}</a>
          </template>
          <dx-column
           type="buttons"
          >
            <dx-button
             :hint="$t('app.pages.items.utilizeHint')"
             icon="clear"
             :visible="isNotUtilized"
             :on-click="utilize"
            />
            <dx-button
             :hint="$t('app.pages.items.restoreHint')"
             icon="check"
             :visible="isUtilized"
             :on-click="utilize"
            />
            <dx-button
             :hint="$t('app.pages.items.attachOrder')"
             icon="exportselected"
             :visible="canManager"
             :on-click="uploadFile"
            />
            <dx-button
             :hint="$t('app.pages.items.showQrHint')"
             icon="smalliconslayout"
             :on-click="showQR"
            />
          </dx-column>
          <dx-filter-row
           :visible="true"
           apply-filter="onClick"
          />
          <dx-column-chooser
           :enabled="true"
          />
          <dx-group-panel :visible="true"/>
          <dx-search-panel
           :visible="true"
           :highlight-case-sensitive="true"
          />
          <dx-grouping :auto-expand-all="false"/>
          <dx-paging :page-size="10"/>
        </dx-data-grid>
      </va-card>
      <va-modal
       v-model="showQRModal"
       size="large"
       :title="$t('app.pages.items.qrTitle')"
       :okText=" $t('main.inventorizations.modal.confirm') "
       :cancelText=" $t('main.inventorizations.modal.cancel') "
       :hide-default-actions="true">
        <va-button
         slot="actions"
         color="primary"
         @click="showQRModal = false"
        >
          {{ $t('app.common.close') }}
        </va-button>
        <div class="row row-equal" style="justify-content: center">
          <div>
            <qrcode-vue :value="qrvalue" size="250"/>
          </div>
        </div>
      </va-modal>
    </div>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxGrouping,
  DxHeaderFilter,
  DxEditing,
  DxGroupPanel,
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
import QrcodeVue from 'qrcode.vue'
import * as COMMON_CONSTS from '../../consts/common'
import {QR_APPDX} from "../../consts/common";
import {UPLOADS} from "../../consts/common";
import {
  GET_ITEMS,
  GET_ITEMS_COUNT, GET_LOCATIONS,
  GET_QR_CODES, GET_RESPONSIBLE_PERSONS,
  LOAD_USER_PREFERENCES, SAVE_USER_PREFERENCES,
  SET_UTILIZATION_STATUS, UPDATE_ITEM, UPLOAD_UTIL_ORDER_FILE
} from "../../consts/urls";
import { mapGetters } from 'vuex';
import ClearPreferencesButton from "../ClearPreferencesButton";
export default {
  name: "UtilizedItems",
  components: {
    ClearPreferencesButton,
    DxDataGrid,
    DxColumn,
    DxGrouping,
    DxHeaderFilter,
    DxGroupPanel,
    DxStateStoring,
    DxLookup,
    DxEditing,
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
  data() {
    return {
      items: [],
      pageSizes: [5, 10, 20, 50, 100, 200, 500],
      showQRModal: false,
      qrvalue: '',
      locations: [],
      persons: [],
      uploadsPath: UPLOADS,
      chosenItems: [],
    };
  },
  methods: {
    localizedUtilizedStatus () {
      return this.$t('app.status.utilized')
    },
    saveUpdatedData(e) {
      console.log(e);
      this.$http.post(UPDATE_ITEM,{
        item_id: e.data.id,
        fact_location_id: e.data.fact_location_id,
        fact_responsible_person_iin: e.data.fact_responsible_person_iin
      })
        .then(response => {
          this.$swal(this.$t('app.common.success'), this.$t('app.common.savedSuccessfully'), 'success');
        }).finally(() => {
          this.updateData();
        });
    },
    uploadFile(e) {
      let data = {};
      data.item_id = e.row.data.id;
      let fileInput = document.getElementById('fileUploader');
      fileInput.click();
      fileInput.onchange = (e) => {
        if(e.target.files.length !== 0) {
          console.log(e.target.files);
          this.$swal({
            title: this.$t('app.common.areYouSure'),
            text: this.$t('app.common.attachFileConfirm') + ' ' + e.target.files[0].name,
            icon: 'info',
            showCancelButton: true,
            cancelButtonText: this.$t('app.common.cancel')
          }).then((result) => {
            if(result.value){
              data.order_file = e.target.files[0];
              this.$http.post(UPLOAD_UTIL_ORDER_FILE,data,{
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
                .then((response) => {
                  this.$swal(this.$t('app.common.success'), this.$t('app.common.savedSuccessfully'), 'success');
                  this.updateData();
                });
            }
            return false;
          }).then((response) => {
            if(response) {
              this.$swal(this.$t('app.common.success'), this.$t('app.common.completedSuccessfully'), 'success');
              this.updateData();
            }
          });
        }
      };
    },
    updateData() {
      this.$http.get(GET_LOCATIONS, {
        params: {
          company_deleted: 0
        }
      })
        .then(response => {
          this.locations = response.data;
        });
      this.$http.get(GET_RESPONSIBLE_PERSONS)
        .then(response => {
          this.persons = response.data;
        });
      let params = {
        is_utilized: 1,
        company_deleted: 0
      };
      if (this.getCompany) {
        params.company_id = this.getCompany;
      }
      this.$http.get(GET_ITEMS, {
        params
      })
        .then((response) => {
          this.items = response.data;
        })
      this.$http.get(GET_ITEMS_COUNT, {
        params
      })
        .then((response) => {
          this.count = response.data;
        })
    },
    async customLoad() {
      let state = await this.$http.get(LOAD_USER_PREFERENCES,{
        params: {
          table_id: 'main_items_util'
        }
      });
      return JSON.parse(state.data);
    },
    customSave(state) {
      state.selectedRowKeys = [];
      let stateStr = JSON.stringify(state);
      this.$http.post(SAVE_USER_PREFERENCES,{
        table_id: 'main_items_util',
        json_string: stateStr
      });
    },
    isUtilized(e) {
      if(e.row.data.is_utilized === '1') {
        return true && this.canManager;
      }
      return false;
    },
    isNotUtilized(e) {
      if(e.row.data.is_utilized === '1') {
        return false;
      }
      return true && this.canManager;
    },
    utilize(e) {
      if(e.row.data.is_utilized === '1') {
        this.$swal({
          title: this.$t('app.common.areYouSure'),
          text: this.$t('app.common.utilizationConfirm'),
          icon: 'info',
          showCancelButton: true,
          cancelButtonText: this.$t('app.common.cancel')
        }).then((result) => {
          if(result.value) {
            let data = {
              id: e.row.data.id,
              is_utilized: '0'
            };
            return this.$http.post(SET_UTILIZATION_STATUS, data);
          }
          return false;
        }).then((response) => {
          if(response) {
            this.$swal(this.$t('app.common.success'), this.$t('app.common.statusChangedSuccessfully'), 'success');
            this.updateData();
          }
        });
      } else {
        this.$swal({
          title: this.$t('app.common.areYouSure'),
          text: this.$t('app.common.utilizationConfirm'),
          icon: 'info',
          showCancelButton: true,
          cancelButtonText: this.$t('app.common.cancel')
        }).then((result) => {
          if(result.value) {
            let data = {
              id: e.row.data.id,
              is_utilized: '1'
            };
            return this.$http.post(SET_UTILIZATION_STATUS, data);
          }
          return false;
        }).then((response) => {
          if(response) {
            this.$swal(this.$t('app.common.success'), this.$t('app.common.statusChangedSuccessfully'), 'success');
            this.updateData();
          }
        })
      }
    },
    showQR(e) {
      this.qrvalue = QR_APPDX + e.row.data.id
      this.showQRModal = true
    },
    generateQRs() {
      this.chosenItems = []
      let itemsObj = this.$refs.itemsGrid.instance.getSelectedRowsData()
      itemsObj.forEach((element) => {
        this.chosenItems.push(element.id)
      })
      window.open(COMMON_CONSTS.BASE_URL + GET_QR_CODES + this.generateItemsList(this.chosenItems),'_blank')
    },
    generateItemsList(items){
      let params = ''
      items.forEach((item) => {
        params += '&items[]=' + item
      })
      return params
    }
  },
  computed: {
    ...mapGetters(['canAdmin','canManager','getCompany'])
  },
  watch: {
    getCompany() {
      this.updateData();
    }
  },
  beforeMount() {
    this.updateData()
  }
}
</script>

<style>
  .color-green {
    background-color: #afe5b1;
    color: #ffffff;
  }
</style>
