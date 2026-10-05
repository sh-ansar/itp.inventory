const config = state => state.app.config
const palette = state => state.app.config.palette
const isLoading = state => state.app.isLoading
const isAuthenticated = state => !!state.auth.token
const authStatus = state => state.auth.status
const userInfo = state => state.auth.userInfo
const getCompanies = state => state.app.companies
const getCompany = state => {
  if(state.app.company === '') {
    return null;
  } else {
    return state.app.company.id;
  }
}

const canAdmin = state => {
  if(state.auth.userInfo && state.auth.userInfo.roles) {
    return state.auth.userInfo.roles.uosAdmin;
  } else {
    return false;
  }
}

const canManager = state => {
  if(state.auth.userInfo && state.auth.userInfo.roles) {
    return state.auth.userInfo.roles.uosManager;
  } else {
    return false;
  }
}

export {
  config,
  palette,
  isLoading,
  getCompanies,
  getCompany,
  isAuthenticated,
  canAdmin,
  canManager,
  authStatus,
  userInfo
}
