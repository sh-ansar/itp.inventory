const AUTH_BASE = 'uos/auth/'
const LOGIN = AUTH_BASE + 'login'
const LOGOUT = AUTH_BASE + 'logout'
const USER_INFO = 'uos/rest/user-info'
// Sync Settings
const GET_SYNC_SETTINGS = 'uos/sync/get-sync-config'
const SAVE_SYNC_SETTINGS = 'uos/sync/save-sync-config'
const GET_ITEMS = 'uos/items/get'
const ADD_ITEM = 'uos/items/add'
const UPDATE_ITEM = 'uos/items/update-item'
const SET_UTILIZATION_STATUS = 'uos/items/set-utilization-status'
const GET_START_MANUAL_SYNC = 'uos/sync/manual-sync'
const GET_ITEMS_COUNT = 'uos/items/get-count'
const GET_ITEM_CHANGES = 'uos/items/get-item-changes'
const GET_INVENTORIZATIONS = 'uos/inventory-check/get'
const SET_INV_COMPLETE_STATUS = 'uos/inventory-check/set-complete-status'
const GET_LOCATIONS = 'uos/locations/get'
const GET_LOCATIONS_FOR_FEW_COMPANIES = 'uos/locations/get-locations-for-few-companies'
const DELETE_LOCATION = 'uos/locations/delete-location'
const GET_RESPONSIBLE_PERSONS = 'uos/responsible-persons/get'
const ADD_RESPONSIBLE_PERSON = 'uos/responsible-persons/add'
const UPDATE_RESPONSIBLE_PERSON = 'uos/responsible-persons/update'
const CREATE_INVENTORY_CHECK = 'uos/inventory-check/create'
const GET_INVENTORY_CHECK_ITEMS = 'uos/inventory-check-items/get'
const FORM_REPORT = 'uos/inventory-check/generate-report'
const UPLOAD_REPORT_FILE = 'uos/inventory-check/upload-report-file'
const UPLOAD_UTIL_ORDER_FILE = 'uos/items/upload-util-order'
// Locations fact
const GET_LOCATIONS_FACT = 'uos/locations/get-as-tree'
const ADD_LOCATIONS_FACT = 'uos/locations/add-location'
const SAVE_LOCATIONS_FACT = 'uos/locations/update-location'
// Companies
const GET_COMPANIES = 'uos/companies/get'
const ADD_COMPANY = 'uos/companies/add-company'
const GET_COMPANIES_WITH_SYNC_INFO = 'uos/companies/get-companies-with-sync-info'

const GET_CURRENT_SYNC_STATUS = 'uos/sync/get-current-status'
const GET_SYNCS = 'uos/sync/get-syncs'
const GET_SYNC_CHANGES = 'uos/sync/get-sync-changes'

// Charts
const GET_LINE_CHARTS = 'uos/charts/get-line-chart-data'
const GET_WHITE_PILLOWS_DATA = 'uos/charts/get-white-pillows-data'
const GET_INVS_STATUS = 'uos/charts/get-invs-status'

// Roles
const GET_USERS_WITH_ROLES = 'uos/admin/get-managers'
const GET_GUEST_USERS = 'uos/admin/get-guests'
const UPDATE_GUEST_ROLE = 'uos/admin/update-guest-role'
const UPDATE_ROLE = 'uos/admin/update-role'

// User Preferences
const LOAD_USER_PREFERENCES = 'uos/user-preferences/load-preferences'
const SAVE_USER_PREFERENCES = 'uos/user-preferences/save-preferences'
const CLEAR_USER_PREFERENCES = 'uos/user-preferences/clear-preferences'

const GET_QR_CODES = 'uos/items/get-qr-codes'

export {
  LOGIN,
  LOGOUT,
  USER_INFO,
  GET_SYNC_SETTINGS,
  GET_GUEST_USERS,
  UPDATE_GUEST_ROLE,
  GET_USERS_WITH_ROLES,
  UPDATE_ROLE,
  SAVE_SYNC_SETTINGS,
  FORM_REPORT,
  UPLOAD_REPORT_FILE,
  UPLOAD_UTIL_ORDER_FILE,
  GET_START_MANUAL_SYNC,
  GET_COMPANIES_WITH_SYNC_INFO,
  GET_ITEMS,
  GET_ITEM_CHANGES,
  ADD_ITEM,
  UPDATE_ITEM,
  ADD_RESPONSIBLE_PERSON,
  UPDATE_RESPONSIBLE_PERSON,
  SET_UTILIZATION_STATUS,
  GET_LOCATIONS_FACT,
  ADD_LOCATIONS_FACT,
  SAVE_LOCATIONS_FACT,
  GET_ITEMS_COUNT,
  GET_INVENTORIZATIONS,
  SET_INV_COMPLETE_STATUS,
  GET_LOCATIONS,
  GET_LOCATIONS_FOR_FEW_COMPANIES,
  DELETE_LOCATION,
  GET_COMPANIES,
  ADD_COMPANY,
  GET_RESPONSIBLE_PERSONS,
  CREATE_INVENTORY_CHECK,
  GET_INVENTORY_CHECK_ITEMS,
  GET_CURRENT_SYNC_STATUS,
  GET_SYNCS,
  GET_SYNC_CHANGES,
  GET_LINE_CHARTS,
  GET_WHITE_PILLOWS_DATA,
  GET_INVS_STATUS,
  LOAD_USER_PREFERENCES,
  SAVE_USER_PREFERENCES,
  CLEAR_USER_PREFERENCES,
  GET_QR_CODES,
}
