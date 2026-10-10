// Polyfills
import 'es6-promise/auto'
import 'babel-polyfill'

import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import App from './App'
import { ColorThemePlugin } from '../services/ColorThemePlugin'
import store from '../store/index'
import router from '../router/index'
import VuesticPlugin from 'vuestic-ui/src/components/vuestic-plugin'
import '../i18n/index'
import YmapPlugin from 'vue-yandex-maps'
import VueProgressBar from 'vue-progressbar'
import VueClipboard from 'vue-clipboard2'
import VeeValidate from 'vee-validate'
import https from 'https'
import { BASE_URL, GET_COMPANIES_ACTION } from '../consts/common'

import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import '../metrics'

import Axios from 'axios'
import { AUTH_LOGOUT, AUTH_USER_INFO } from '../consts/auth'
import { getMockApiData } from '../data/mockApiFallback'

const useLocalMockFallback = (
  !BASE_URL ||
  process.env.VUE_APP_USE_MOCKS === 'true'
)

const axios = Axios.create({
  baseURL: BASE_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
})

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('user-token') || sessionStorage.getItem('user-token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  const data = config.data

  if (data && config.method === 'post' && !(data instanceof FormData)) {
    const formData = new FormData()

    for (const prop in data) {
      if (data[prop] instanceof Array) {
        data[prop].forEach((element) => {
          formData.append(prop + '[]', element)
        })
      } else {
        formData.append(prop, data[prop])
      }
    }

    config.data = formData
  }

  return config
}, function (error) {
  return Promise.reject(error)
})


const publicRoutes = ['login', 'signup', 'recover-password']

async function ensureUserInfo () {
  if (store.getters.userInfo) {
    return true
  }

  try {
    await store.dispatch(AUTH_USER_INFO)
    return true
  } catch (e) {
    return false
  }
}

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('user-token') || sessionStorage.getItem('user-token')
  const isPublicRoute = publicRoutes.includes(to.name)

  if (!useLocalMockFallback && !token && !isPublicRoute) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  if (!useLocalMockFallback && token && to.name === 'login') {
    next({ name: 'dashboard' })
    return
  }

  const requiredRoles = to.matched.reduce((roles, route) => {
    if (route.meta && Array.isArray(route.meta.roles)) {
      return roles.concat(route.meta.roles)
    }
    return roles
  }, [])

  if (requiredRoles.length) {
    const hasUserInfo = await ensureUserInfo()

    if (!hasUserInfo) {
      next(useLocalMockFallback ? { name: 'dashboard' } : { name: 'login' })
      return
    }

    const isAllowed = requiredRoles.some(role => !!store.getters[role])

    if (!isAllowed) {
      next({ name: 'dashboard' })
      return
    }
  }

  next()
})

axios.interceptors.response.use(function (response) {
  if (useLocalMockFallback) {
    const mockData = getMockApiData(response.config)

    if (mockData !== undefined) {
      response.data = mockData
    }
  }

  return response
}, function (error) {
  if (useLocalMockFallback && error.config) {
    const mockData = getMockApiData(error.config)

    if (mockData !== undefined) {
      return Promise.resolve({
        data: mockData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: error.config,
      })
    }
  }

  const status = error.response && error.response.status

  if (status === 401) {
    store.dispatch(AUTH_LOGOUT)
    router.push('/auth/login')
  } else if (status === 400) {
    const message = (
      error.response &&
      error.response.data &&
      error.response.data.errors &&
      error.response.data.errors[0]
    ) || 'Некорректный запрос'

    Vue.swal('Ошибка', message, 'error')
  } else if (status === 500) {
    Vue.swal('Ошибка', 'Произошла ошибка сервера', 'error')
  }

  return Promise.reject(error)
})

export { axios }

store.dispatch(AUTH_USER_INFO)
  .then(() => {
    store.dispatch(GET_COMPANIES_ACTION)
  })
  .catch(() => {
    if (useLocalMockFallback) {
      store.dispatch(GET_COMPANIES_ACTION)
    }
  })

Vue.prototype.$http = axios

Vue.use(VeeValidate, { fieldsBagName: 'formFields' })

Vue.use(VueProgressBar, {
  color: 'rgb(52, 181, 229)',
  failedColor: 'red',
  height: '2px',
})

Vue.use(VuesticPlugin)
Vue.use(YmapPlugin)
Vue.use(VueClipboard)
Vue.use(VueSweetalert2)

Vue.use(ColorThemePlugin, null)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
