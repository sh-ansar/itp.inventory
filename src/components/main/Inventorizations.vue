<template>
  <div class="row row-equal inventory-page">
    <div class="flex xl12 xs12">
      <div class="row">
        <div
         class="flex xs12 sm12"
        >
          <va-card
           :title="$t('app.pages.inventories.initiation')"
           class="inventory-create-card"
           v-if="canManager"
          >
            <input type="file" style="display: none" id="fileUploader">
            <va-button
             small
             slot="actions"
             color="primary"
             class="mr-0"
             @click="createInventorization"
            >
              {{ $t('main.inventorizations.initiate') }}
            </va-button>
<!--            <div class="row">-->
<!--              <div class="flex xs4">-->
<!--                <va-select-->
<!--                 :label="$t('main.inventorizations.inventory_by')"-->
<!--                 v-model="invTypeModel"-->
<!--                 textBy="description"-->
<!--                 :options="invTypeOptions"-->
<!--                />-->
<!--              </div>-->
<!--              <div class="flex xs4">-->
<!--                <va-select-->
<!--                 :label="$t('main.inventorizations.belongs')"-->
<!--                 v-model="currentFilterItem"-->
<!--                 textBy="name"-->
<!--                 :options="filterItems"-->
<!--                />-->
<!--              </div>-->
<!--              <div class="flex xs4">-->
<!--                <va-button icon="va-icon ion ion-ios-list" @click="showItemsModal = true"> {{ $t('main.inventorizations.items_list') }}</va-button>-->
<!--              </div>-->
<!--            </div>-->
            <div class="row inventory-create-grid">
              <div class="flex xs12 md4">
                <va-multiple-select
                 :label="$t('app.pages.inventories.company')"
                 v-model="company"
                 max-height="400px"
                 searchable
                 textBy="name"
                 multiple
                 :options="companies"
                >
                </va-multiple-select>
<!--                <multiselect-->
<!--                  tabindex="5"-->
<!--                  v-model="company"-->
<!--                  :options="companies"-->
<!--                />-->
              </div>
              <div class="flex xs12 md4 align--center">
                <va-select
                 :label="$t('main.inventorizations.inventory_by')"
                 v-model="invTypeModel"
                 :disabled="company.length === 0"
                 textBy="description"
                 :options="invTypeOptions"
                />
              </div>
              <div class="flex xs12 md4 align--center">
                <va-multiple-select
                 :label="$t('main.inventorizations.belongs')"
                 v-model="currentFilterItem"
                 :disabled="company.length === 0"
                 max-height="400px"
                 searchable
                 multiple
                 textBy="name"
                 :options="filterItems"/>
<!--                <va-select-->
<!--                 :label="$t('main.inventorizations.belongs')"-->
<!--                 v-model="currentFilterItem"-->
<!--                 :disabled="company.length === 0"-->
<!--                 textBy="name"-->
<!--                 :options="filterItems"/>-->
              </div>
              <div class="flex xs12 inventory-create-actions">
                <va-button @click="updateItems">{{ $t('app.pages.inventories.refreshList') }}</va-button>
                <va-button
                  icon="va-icon ion ion-ios-list"
                  @click="showItemsModal = true"
                  :disabled="items.length === 0"
                >
                  {{ $t('main.inventorizations.items_list') }}
                </va-button>
              </div>
            </div>
          </va-card>
        </div>
      </div>
    </div>
    <div class="flex xl12 xs12">
      <div class="row">
        <div class="flex xl12 xs12">
          <va-card :title="$t('app.pages.inventories.inventories')" class="inventory-list-card data-table-card">
<!--            <va-button-->
<!--             small-->
<!--             slot="actions"-->
<!--             color="danger"-->
<!--             class="mr-0"-->
<!--            >-->
<!--              {{ $t('dashboard.charts.deleteSection') }}-->
<!--            </va-button>-->
            <ClearPreferencesButton table_id="invs"></ClearPreferencesButton>
            <dx-data-grid
             class="inventory-grid"
             :data-source="inventorizations"
             :remote-operations="false"
             :allow-column-reordering="true"
             :allow-column-resizing="true"
             :show-row-lines="true"
             :row-alternation-enabled="true"
             :show-borders="true"
            >
              <DxStateStoring
               :enabled="true"
               type="custom"
               :custom-save="customSaveInv"
               :custom-load="customLoadInv"
              />
              <dx-column
               cell-template="cellTemplate"
               :caption="$t('app.common.number')"
              />
              <template #cellTemplate="cell">
                {{cell.data.row.rowIndex + 1}}
              </template>
              <dx-column-chooser
               :enabled="true"
              />
              <dx-column
               data-field="date"
               :caption="$t('app.pages.inventories.initiatedAt')"
              />
              <dx-column
               data-field="author"
               :caption="$t('app.pages.inventories.initiator')"
              />
              <dx-column
               data-field="status"
               :caption="$t('app.pages.inventories.status')"
               :calculate-cell-value="localizedInventoryStatus"
              />
              <dx-column
               data-field="companies"
               :caption="$t('app.pages.inventories.company')"
              />
              <dx-column
               data-field="persons"
               :caption="$t('app.pages.inventories.responsible')"
              />
              <dx-column
               data-field="locations"
               :caption="$t('app.pages.inventories.location')"
              />
              <dx-column
               data-field="completed"
               :caption="$t('app.pages.inventories.completed')"
               data-type="boolean"
              />
              <dx-column
               data-field="date_completed"
               :caption="$t('app.pages.inventories.completedAt')"
              />
              <dx-column
               data-field="file_name"
               :caption="$t('app.pages.inventories.report')"
               cell-template="fileCellTemplate"
              />
              <template #fileCellTemplate="data">
                <a :href="uploadsPath+'/'+data.data.data.file_hashname" :title="data.data.value" target="_blank">{{data.data.value}}</a>
              </template>
              <dx-column
               type="buttons"
              >
                <dx-button
                 :hint="$t('app.pages.inventories.generateReport')"
                 icon="exportxlsx"
                 :on-click="formReport"
                />
                <dx-button
                 :hint="$t('app.pages.inventories.cancelCompletion')"
                 icon="clear"
                 :visible="isCompleted"
                 :on-click="changeCompleteStatus"
                />
                <dx-button
                 :hint="$t('app.pages.inventories.complete')"
                 icon="check"
                 :visible="isNotCompleted"
                 :on-click="changeCompleteStatus"
                />
                <dx-button
                 :hint="$t('app.pages.inventories.viewItems')"
                 icon="orderedlist"
                 :on-click="showInventoryCheckItems"
                />
                <dx-button
                 :hint="$t('app.pages.inventories.attachReport')"
                 icon="exportselected"
                 :visible="canManager"
                 :on-click="uploadFile"
                />
              </dx-column>
              <dx-paging :page-size="5"/>
              <DxPager
               :show-page-size-selector="true"
               :allowed-page-sizes="pageSizes"
               :show-info="true"
              />
              <dx-group-panel :visible="false"/>
              <dx-search-panel
               :visible="true"
               :highlight-case-sensitive="false"
               width="220"
              />
              <dx-grouping :auto-expand-all="false"/>
            </dx-data-grid>
          </va-card>
        </div>
      </div>
    </div>
    <va-modal
     v-model="showItemsModal"
     size="large"
     max-width="100%"
     @ok="confirmItems"
     :title=" $t('main.inventorizations.modal.title') "
     :okText=" $t('main.inventorizations.modal.confirm') "
     :cancelText=" $t('main.inventorizations.modal.cancel') "
    >
      <ClearPreferencesButton table_id="inv_list"></ClearPreferencesButton>
      <div class="row row-equal">
        <div class="flex md12">
          <dx-data-grid
           :data-source="items"
           ref="itemsGrid"
           :remote-operations="false"
           key-expr="id"
           :allow-column-reordering="true"
           :show-row-lines="true"
           :row-alternation-enabled="true"
           :allow-column-resizing="true"
           :show-borders="true"
          >
            <dx-selection
             :deffered="true"
             mode="multiple"
            />
            <DxStateStoring
             :enabled="true"
             type="custom"
             :custom-save="customSaveInvList"
             :custom-load="customLoadInvList"
            />
            <dx-column
             cell-template="cellTemplate"
             :caption="$t('app.common.number')"
            />
            <template #cellTemplate="cell">
              {{cell.data.row.rowIndex + 1}}
            </template>
            <dx-column
             data-field="name"
             :caption="$t('item.name')"/>
            <dx-column
             data-field="location"
             :caption="$t('item.location')"
            />
            <dx-column
             data-field="responsible_person"
             :caption="$t('item.responsiblePerson')"
            />
            <dx-column
             data-field="code"
             :caption="$t('app.pages.inventories.uniqueCode')"
             :visible="true"
            />
            <dx-column
             data-field="responsible_person_inn"
             :caption="$t('item.responsiblePersonInn')"
             :visible="false"
            />
            <dx-column
             data-field="status"
             :caption="$t('item.status')"
             :calculate-cell-value="localizedAssetStatus"
            />
            <dx-column
             data-field="order_number"
             :caption="$t('item.orderNumber')"
             :visible="false"
            />
            <dx-column
             data-field="inventory_number"
             :caption="$t('item.inventoryNumber')"
             :visible="true"
            />
            <dx-column
             data-field="account"
             :caption="$t('item.account')"
             :visible="false"
            />
            <dx-column
             data-field="purchase_date"
             :caption="$t('item.purchaseDate')"
             :visible="false"
            />
            <dx-column
             data-field="purchase_cost"
             :caption="$t('item.purchaseCost')"
             :visible="false"
            />
            <dx-column
             data-field="current_cost"
             :caption="$t('item.currentCost')"
             :visible="false"
            />
            <dx-column
             data-field="factory_number"
             :caption="$t('item.factoryNumber')"
             :visible="false"
            />
            <dx-column
             data-field="passport_number"
             :caption="$t('item.passportNumber')"
             :visible="false"
            />
            <dx-column
             data-field="start_cost"
             :caption="$t('item.startCost')"
             :visible="false"
            />
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
            <DxPager
             :show-page-size-selector="true"
             :allowed-page-sizes="pageSizes"
             :show-info="true"
            />
          </dx-data-grid>
        </div>
      </div>
    </va-modal>
    <va-modal
     v-model="showItemsListModal"
     size="large"
     max-width="100%"
     :title=" $t('main.inventorizations.modal.title') "
     :okText=" $t('main.inventorizations.modal.confirm') "
     :cancelText=" $t('main.inventorizations.modal.cancel') "
    >
      <ClearPreferencesButton table_id="inv_selection_list"></ClearPreferencesButton>
      <div class="row row-equal">
        <div class="flex md12">
          <dx-data-grid
           :data-source="itemsList"
           ref="itemsGrid"
           :remote-operations="false"
           :allow-column-reordering="true"
           :show-row-lines="true"
           :row-alternation-enabled="true"
           :allow-column-resizing="true"
           :show-borders="true"
          >
            <dx-column
             cell-template="cellTemplate"
             :caption="$t('app.common.number')"
            />
            <DxStateStoring
             :enabled="true"
             type="custom"
             :custom-save="customSaveSelectionList"
             :custom-load="customLoadSelectionList"
            />
            <dx-column-chooser
             :enabled="true"
            />
            <dx-column
             data-field="name"
             :caption="$t('item.name')"/>
            <dx-column
             data-field="location"
             :caption="$t('item.location')"
            />
            <dx-column
             data-field="responsible_person"
             :caption="$t('item.responsiblePerson')"
            />
            <dx-column
             data-field="checked"
             :caption="$t('main.inventorizations.checked')"
             data-type="boolean"
            />
            <dx-column
             data-field="datetime_checked"
             :caption="$t('main.inventorizations.datetime_checked')"
            />
            <dx-column
             data-field="code"
             :caption="$t('app.pages.inventories.uniqueCode')"
            />
            <dx-column
             data-field="inventory_number"
             :caption="$t('app.pages.inventories.inventoryNumber')"
            />
            <dx-column
             data-field="commentary"
             :caption="$t('app.pages.inventories.note')"
            />
            <dx-column
             data-field="fact_location"
             :caption="$t('app.pages.inventories.actualLocation')"
            />
            <template #cellTemplate="cell">
              {{cell.data.row.rowIndex + 1}}
            </template>
            <dx-group-panel :visible="true"/>
            <dx-search-panel
             :visible="true"
             :highlight-case-sensitive="true"
            />
            <dx-grouping :auto-expand-all="false"/>
            <dx-paging :page-size="10"/>
            <DxPager
             :show-page-size-selector="true"
             :allowed-page-sizes="pageSizes"
             :show-info="true"
            />
          </dx-data-grid>
        </div>
      </div>
    </va-modal>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxGrouping,
  DxGroupPanel,
  DxPager,
  DxStateStoring,
  DxPaging,
  DxSearchPanel,
  DxColumnChooser,
  DxButton,
  DxFilterRow,
  DxSelection
} from 'devextreme-vue/data-grid'
import Multiselect from 'vue-multiselect'
import { mapGetters } from 'vuex'
import 'devextreme/data/odata/store'
import VaMultipleSelect from "../ui/select/VaMultipleSelect";
import {
  CREATE_INVENTORY_CHECK, FORM_REPORT, GET_COMPANIES,
  GET_INVENTORIZATIONS, GET_INVENTORY_CHECK_ITEMS,
  GET_ITEMS,
  GET_LOCATIONS, GET_LOCATIONS_FOR_FEW_COMPANIES,
  GET_RESPONSIBLE_PERSONS, LOAD_USER_PREFERENCES, SAVE_USER_PREFERENCES, SET_INV_COMPLETE_STATUS, UPLOAD_REPORT_FILE
} from "../../consts/urls";
import {UPLOADS} from "../../consts/common";
import ClearPreferencesButton from "../ClearPreferencesButton";
export default {
  name: 'Inventorizations',
  components: {
    ClearPreferencesButton,
    DxDataGrid,
    DxColumn,
    DxButton,
    DxGrouping,
    Multiselect,
    VaMultipleSelect,
    DxGroupPanel,
    DxStateStoring,
    DxPager,
    DxPaging,
    DxSearchPanel,
    DxColumnChooser,
    DxFilterRow,
    DxSelection
  },
  data (){
    return {
      invTypeModel: '',
      showItemsModal: false,
      showItemsListModal: false,
      uploadsPath: UPLOADS,
      inventorizations: [],
      filterItems: [],
      currentFilterItem: [],
      pageSizes: [5, 10, 20, 50, 100, 200, 500],
      items: [],
      itemsList: [],
      companies: [],
      company: [],
      chosenItems: []
    }
  },
  methods: {
    localizedInventoryStatus (row) {
      const value = String((row && row.status) || '').toLowerCase()
      const completed = row && (row.completed === true || row.completed === 1 || row.completed === '1')
      return completed || /заверш|completed|დასრულ/.test(value)
        ? this.$t('app.status.completed')
        : this.$t('app.status.inProgress')
    },
    localizedAssetStatus (row) {
      const value = String((row && row.status) || '').toLowerCase()
      if ((row && (row.is_utilized === true || row.is_utilized === 1 || row.is_utilized === '1')) || /утилиз|disposed|უტილ/.test(value)) {
        return this.$t('app.status.utilized')
      }
      if (/забал|off balance|ბალანსგარეშე/.test(value)) {
        return this.$t('app.status.offBalance')
      }
      return this.$t('app.status.onBalance')
    },
    uploadFile(e) {
      let data = {};
      data.inv_check_id = e.row.data.id;
      let fileInput = document.getElementById('fileUploader');
      fileInput.click();
      fileInput.onchange = (e) => {
        if(e.target.files.length !== 0) {
          this.$swal({
            title: this.$t('app.common.areYouSure'),
            text: this.$t('app.common.attachFileConfirm') + ' ' + e.target.files[0].name,
            icon: 'info',
            showCancelButton: true,
            cancelButtonText: this.$t('app.common.cancel')
          }).then((result) => {
            if(result.value){
              data.report_file = e.target.files[0];
              this.$http.post(UPLOAD_REPORT_FILE,data,{
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
    async customLoad(table_id) {
      let state = await this.$http.get(LOAD_USER_PREFERENCES,{
        params: {
          table_id: table_id
        }
      });
      return JSON.parse(state.data);
    },
    customSave(state, table_id) {
      if(state.selectedRowKeys !== undefined) {
        state.selectedRowKeys = [];
      }
      let stateStr = JSON.stringify(state);
      this.$http.post(SAVE_USER_PREFERENCES,{
        table_id: table_id,
        json_string: stateStr
      });
    },
    async customLoadInv() {
      return await this.customLoad('invs');
    },
    customSaveInv(state) {
      this.customSave(state, 'invs');
    },
    async customLoadInvList() {
      return await this.customLoad('inv_list');
    },
    customSaveInvList(state) {
      this.customSave(state, 'inv_list');
    },
    async customLoadSelectionList() {
      return await this.customLoad('inv_selection_list');
    },
    customSaveSelectionList(state) {
      this.customSave(state, 'inv_selection_list');
    },
    formReport(e) {
      let params = {};
      params.inv_check_id = e.row.data.id;
      this.$http.get(FORM_REPORT,{params})
        .then((response) => {
          window.open(UPLOADS + '/' + response.data,'_blank');
        });
    },
    updateData() {
      this.$http.get(GET_INVENTORIZATIONS)
        .then((response) => {
          this.inventorizations = response.data;
        });
      this.$http.get(GET_COMPANIES, {
        params: {
          is_deleted: 0
        }
      })
        .then((response) => {
          this.companies = response.data;
        });
      // this.$http.get(GET_ITEMS)
      //   .then((response) => {
      //     this.items = response.data;
      //   });
    },
    changeCompleteStatus(e) {
      if(e.row.data.completed) {
        this.$swal({
          title: this.$t('app.common.areYouSure'),
          text: this.$t('app.common.uncompleteInventoryConfirm'),
          icon: 'info',
          showCancelButton: true,
          cancelButtonText: this.$t('app.common.cancel')
        }).then((result) => {
          if(result.value){
            let data = {
              id: e.row.data.id,
              is_completed: '0'
            };
            return this.$http.post(SET_INV_COMPLETE_STATUS,data);
          }
          return false;
        }).then((response) => {
          if(response) {
            this.$swal(this.$t('app.common.success'), this.$t('app.common.completedSuccessfully'), 'success');
            this.updateData();
          }
        });
      } else {
        this.$swal({
          title: this.$t('app.common.areYouSure'),
          text: this.$t('app.common.completeInventoryConfirm'),
          icon: 'info',
          showCancelButton: true,
          cancelButtonText: this.$t('app.common.cancel')
        }).then((result) => {
          if(result.value){
            let data = {
              id: e.row.data.id,
              is_completed: '1'
            };
            return this.$http.post(SET_INV_COMPLETE_STATUS,data);
          }
          return false;
        }).then((response) => {
          if(response) {
            this.$swal(this.$t('app.common.success'), this.$t('app.common.completedSuccessfully'), 'success');
            this.updateData();
          }
        });
      }
    },
    isCompleted(e) {
      if(e.row.data.completed) {
        return true && this.canManager;
      }
      return false;
    },
    isNotCompleted(e) {
      if(e.row.data.completed) {
        return false;
      }
      return true && this.canManager;
    },
    showInventoryCheckItems(e){
      let checkId = e.row.data.id;
      this.chosenItems = [];
      this.$http.get(GET_INVENTORY_CHECK_ITEMS,{
        params: {
          inv_check_id: checkId
        }
      })
        .then((response) => {
          this.itemsList = response.data
          this.showItemsListModal = true
        })
    },
    confirmItems(){
      let itemsObj = this.$refs.itemsGrid.instance.getSelectedRowsData()
      itemsObj.forEach((element) => {
        this.chosenItems.push(element.id)
      })
    },
    createInventorization() {
      if(this.chosenItems.length > 0){
        this.$swal({
          title: this.$t('app.common.areYouSure'),
          text: this.$t('app.common.createInventoryConfirm'),
          icon: 'info',
          showCancelButton: true,
          cancelButtonText: this.$t('app.common.cancel')
        })
          .then((result) => {
            if(result.value){
              let params = {};
              params.items = this.chosenItems;
              if(this.company.length > 0) {
                params.companies = [];
                this.company.forEach(e => {
                  params.companies.push(e.id);
                });
              }
              if(this.invTypeModel) {
                params.inv_type_model = this.invTypeModel.id;
              }
              if(this.currentFilterItem.length > 0) {
                params.current_filter_item = [];
                this.currentFilterItem.forEach(e => {
                  params.current_filter_item.push(e.id);
                });
              }
              return this.$http.post(CREATE_INVENTORY_CHECK, params);
              // return this.$http.post(CREATE_INVENTORY_CHECK, {
              //   items: this.chosenItems,
              //   company_id: this.company.id,
              //   inv_type_model: this.invTypeModel.id,
              //   current_filter_item: this.currentFilterItem.id
              // })
            }
            return false;
          })
          .then((response) => {
            if(response) {
              this.$swal(this.$t('app.common.success'), this.$t('app.common.inventoryCreatedSuccessfully'), 'success');
              this.updateData();
            }
          }).finally(() => {
              this.chosenItems = [];
          });
      }else{
        this.$swal(this.$t('app.common.error'), this.$t('app.common.selectAssetsWarning'), 'warning');
        this.chosenItems = [];
      }
    },
    updateItems() {
      if(this.company.length > 0) {
        let params = {};
        params.companies = [];
        params.is_utilized = 0;
        this.company.forEach(e => {
          params.companies.push(e.id);
        });
        if(this.invTypeModel) {
          if(this.invTypeModel.id === 1){
            params.persons = [];
            this.currentFilterItem.forEach(e => {
              params.persons.push(e.id);
            });
          } else if (this.invTypeModel.id === 2){
            params.locations = [];
            this.currentFilterItem.forEach(e => {
              params.locations.push(e.id);
            });
          }
        }
        this.$http.get(GET_ITEMS,{
          params: params
        })
          .then((response) => {
            this.items = response.data
          })
      }
    }
  },
  computed: {
    ...mapGetters([
      'canAdmin', 'canManager'
    ]),
    invTypeOptions () {
      return [
        { id: 1, description: this.$t('app.common.mol') },
        { id: 2, description: this.$t('app.common.location') },
      ]
    },
  },
  watch: {
    company() {
      this.invTypeModel = '';
      this.items = [];
    },
    invTypeModel(){
      this.filterItems = [];
      this.items = [];
      this.currentFilterItem = [];
      if(!this.invTypeModel){
        return false;
      }
      if(this.invTypeModel.id === 1){
        this.$http.get(GET_RESPONSIBLE_PERSONS)
          .then((response) => {
            this.filterItems = response.data;
          });
      }else if(this.invTypeModel.id === 2){
        let params = {};
        if(this.company.length > 0) {
          let companies = [];
          this.company.forEach(e => {
            companies.push(e.id);
          });
          params.companies = companies;
        }
        this.$http.get(GET_LOCATIONS_FOR_FEW_COMPANIES, {
          params
        })
          .then((response) => {
            this.filterItems = response.data;
          });
      }/*else{
        this.$http.get(GET_COMPANIES)
          .then((response) => {
            this.filterItems = response.data;
          });
      }*/
    },
    currentFilterItem(){
      this.items = [];
      // if((this.currentFilterItem.length > 0) && this.invTypeModel && (this.company.length > 0)){
      //   let params = {};
      //   params.company_id = this.company.id;
      //   params.is_utilized = 0;
      //   if(this.invTypeModel.id === 1){
      //     params.resp_person_id = this.currentFilterItem.id;
      //   } else if (this.invTypeModel.id === 2){
      //     params.location_id = this.currentFilterItem.id;
      //   }/* else {
      //     params.company_id = this.currentFilterItem.id;
      //   }*/
      //   this.$http.get(GET_ITEMS,{
      //     params: params
      //   })
      //     .then((response) => {
      //       this.items = response.data
      //     })
      // } else {
      //   this.updateData();
      // }
    }
  },
  beforeMount() {
    this.updateData()
  }
}
</script>

<style scoped>
.inventory-page {
  padding-bottom: 2rem;
}
.inventory-create-card,
.inventory-list-card {
  border: 1px solid #e5ebf2;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(17, 29, 45, .055);
  overflow: hidden;
}
.inventory-create-grid {
  align-items: flex-end;
  row-gap: .25rem;
}
.inventory-create-actions {
  display: flex;
  justify-content: flex-end;
  gap: .65rem;
  padding-top: .45rem;
}
.inventory-create-actions .va-button {
  min-width: 150px;
  border-radius: 10px;
  box-shadow: none;
}
.inventory-grid {
  margin-top: .6rem;
  border: 1px solid #e6ebf1;
  border-radius: 12px;
  overflow: hidden;
}
.inventory-page >>> .dx-datagrid {
  color: #31465c;
  font-size: 13px;
}
.inventory-page >>> .dx-datagrid-headers {
  color: #5f6f82;
  background: #f7f9fc;
  font-weight: 600;
}
.inventory-page >>> .dx-datagrid-rowsview .dx-row > td,
.inventory-page >>> .dx-datagrid-headers .dx-row > td {
  padding-top: 10px;
  padding-bottom: 10px;
  border-color: #edf1f5;
}
.inventory-page >>> .dx-datagrid-search-panel {
  height: 38px;
  border-radius: 9px;
}
.inventory-page >>> .dx-pager {
  padding-top: 10px;
  padding-bottom: 6px;
}
@media (max-width: 767px) {
  .inventory-create-actions {
    justify-content: stretch;
    flex-direction: column;
  }
  .inventory-create-actions .va-button {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .inventory-page {
    width: 100%;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .inventory-page > .flex,
  .inventory-page > .flex > .row > .flex {
    min-width: 0;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .inventory-page > .flex > .row,
  .inventory-create-grid {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .inventory-create-grid > .flex {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .inventory-create-card,
  .inventory-list-card {
    width: 100%;
    max-width: 100%;
  }

  .inventory-create-actions {
    gap: .5rem;
    padding-top: .65rem;
  }

  .inventory-create-actions .va-button {
    min-width: 0;
    min-height: 42px;
  }

  .inventory-page >>> .va-card__header {
    flex-wrap: wrap;
    row-gap: .45rem;
  }

  .inventory-page >>> .dx-datagrid-search-panel {
    width: 180px !important;
    max-width: 56vw;
  }
}
</style>
