<template>
  <div class="row row-equal">
    <div class="flex xl12 xs12">
      <va-card :title="$t('menu.manage-guests')">
        <ClearPreferencesButton table_id="manage_guest_roles"></ClearPreferencesButton>
        <dx-data-grid
         :data-source="users"
         ref="itemsGrid"
         :remote-operations="false"
         :allow-column-reordering="true"
         :allow-column-resizing="true"
         :show-row-lines="true"
         :row-alternation-enabled="true"
         :show-borders="true"
         @row-updated="updateData"
        >
          <DxPager
           :show-page-size-selector="true"
           :allowed-page-sizes="pageSizes"
           :show-info="true"
          />
          <DxStateStoring
           :enabled="true"
           type="custom"
           :custom-save="customSave"
           :custom-load="customLoad"
          />
          <DxEditing
           :allow-updating="canAdmin"
           :allow-deleting="false"
           :allow-adding="false"
           :use-icons="true"
           mode="row"
          />
          <dx-column
           cell-template="cellTemplate"
           :caption="$t('app.common.number')"
          />
          <template #cellTemplate="cell">
            {{cell.data.row.rowIndex + 1}}
          </template>
          <dx-column
           data-field="fio"
           :allow-editing="false"
           :caption="$t('app.pages.roles.fullName')"/>
          <dx-column
           data-field="is_guest"
           data-type="boolean"
           :caption="$t('app.pages.roles.guest')"
          />
          <dx-header-filter :visible="true"></dx-header-filter>
          <dx-filter-row
           :visible="true"
          />
          <dx-search-panel
           :visible="true"
           :highlight-case-sensitive="false"
          />
          <dx-paging :page-size="10"/>
        </dx-data-grid>
      </va-card>
    </div>
  </div>
</template>

<script>
  import {GET_GUEST_USERS, LOAD_USER_PREFERENCES, SAVE_USER_PREFERENCES, UPDATE_GUEST_ROLE} from "../../consts/urls";
import {
  DxDataGrid,
  DxColumn,
  DxPager,
  DxHeaderFilter,
  DxStateStoring,
  DxEditing,
  DxPaging,
  DxSearchPanel,
  DxFilterRow,
} from "devextreme-vue/data-grid";
import { mapGetters } from 'vuex';
  import ClearPreferencesButton from "../ClearPreferencesButton";

export default {
  name: "ManageGuestRoles",
  components: {
    ClearPreferencesButton,
    DxDataGrid,
    DxColumn,
    DxPager,
    DxEditing,
    DxStateStoring,
    DxHeaderFilter,
    DxPaging,
    DxSearchPanel,
    DxFilterRow,
  },
  data() {
    return {
      users: [],
      pageSizes: [5, 10, 20]
    };
  },
  computed: {
    ...mapGetters(['canAdmin','canManager'])
  },
  methods: {
    async customLoad() {
      let state = await this.$http.get(LOAD_USER_PREFERENCES,{
        params: {
          table_id: 'manage_guest_roles'
        }
      });
      return JSON.parse(state.data);
    },
    customSave(state) {
      let stateStr = JSON.stringify(state);
      this.$http.post(SAVE_USER_PREFERENCES,{
        table_id: 'manage_guest_roles',
        json_string: stateStr
      });
    },
    getData() {
      this.$http.get(GET_GUEST_USERS)
        .then((response) => {
          this.users = response.data;
        });
    },
    updateData(e) {
      let updInfo = {
        id: e.data.id,
        is_guest: e.data.is_guest
      };

      this.$http.post(UPDATE_GUEST_ROLE, updInfo)
        .then((response) => {
          this.$swal(this.$t('app.common.success'), this.$t('app.common.savedSuccessfully'), 'success');
        })
        .catch((response) => {
          this.$swal(this.$t('app.common.error'), this.$t('app.pages.roles.dataError'), 'error');
        })
        .finally(() => {
          this.getData();
        });
    }
  },
  beforeMount() {
    this.getData();
  }
}
</script>

<style scoped>

</style>
