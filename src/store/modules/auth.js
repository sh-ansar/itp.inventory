import * as AUTH_CONSTS from '../../consts/auth'
import {LOGIN, LOGOUT, USER_INFO} from '../../consts/urls'
import { axios } from '../../app/main'
import {AUTH_USER_INFO} from "../../consts/auth";
const state = {
  token: localStorage.getItem('user-token') || sessionStorage.getItem('user-token') || '',
  status: '',
  userInfo: null
}

const mutations = {
  [AUTH_CONSTS.AUTH_LOGOUT]: (state) => {
    state.token = ''
    state.userInfo = null
  },
  [AUTH_CONSTS.AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_CONSTS.AUTH_SUCCESS]: (state, token) => {
    state.status = 'success'
    state.token = token
  },
  [AUTH_CONSTS.AUTH_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_CONSTS.AUTH_SET_USER_INFO]: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  [AUTH_CONSTS.AUTH_USER_INFO]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      axios.get(USER_INFO)
        .then(resp => {
          commit(AUTH_CONSTS.AUTH_SET_USER_INFO, resp.data)
          resolve(resp)
        })
        .catch(err => {
          commit(AUTH_CONSTS.AUTH_ERROR, err)
          localStorage.removeItem('user-token')
          sessionStorage.removeItem('user-token')
          reject(err)
        })
    })
  },
  [AUTH_CONSTS.AUTH_REQUEST]: ({commit, dispatch}, payload) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_CONSTS.AUTH_REQUEST)

      const credentials = payload && payload.credentials ? payload.credentials : payload
      const keepLoggedIn = !!(payload && payload.keepLoggedIn)

      axios.post(LOGIN, credentials)
        .then(resp => {
          const token = resp.data

          localStorage.removeItem('user-token')
          sessionStorage.removeItem('user-token')

          if (keepLoggedIn) {
            localStorage.setItem('user-token', token)
          } else {
            sessionStorage.setItem('user-token', token)
          }

          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
          commit(AUTH_CONSTS.AUTH_SUCCESS, token)
          dispatch(AUTH_CONSTS.AUTH_USER_INFO)
            .then(() => {
              resolve(resp)
            })
            .catch((err) => {
              reject(err)
            })
        })
        .catch(err => {
          commit(AUTH_CONSTS.AUTH_ERROR, err)
          localStorage.removeItem('user-token')
          reject(err)
        })
    })
  },
  [AUTH_CONSTS.AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_CONSTS.AUTH_LOGOUT)
      localStorage.removeItem('user-token')
      sessionStorage.removeItem('user-token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

export default {
  state,
  mutations,
  actions,
}
