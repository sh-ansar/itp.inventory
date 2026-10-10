const BASE_URL = process.env.VUE_APP_BASE_URL || ''
const UPLOADS = process.env.VUE_APP_UPLOADS || process.env.VUE_APP_BASE_UPLOADS || ''
const IS_MOCK_MODE = process.env.VUE_APP_USE_MOCKS === 'true' || !BASE_URL
const QR_APPDX = 'test_'

const GET_COMPANIES_ACTION = 'get_companies'
const SET_COMPANIES = 'set_companies'
const SET_COMPANY = 'set_company'

export {
  BASE_URL,
  UPLOADS,
  IS_MOCK_MODE,
  GET_COMPANIES_ACTION,
  SET_COMPANIES,
  SET_COMPANY,
  QR_APPDX,
}
