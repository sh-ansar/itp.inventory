import {GET_COMPANIES_ACTION, SET_COMPANIES, SET_COMPANY} from "../../consts/common";
import { axios } from '../../app/main';
import {GET_COMPANIES} from "../../consts/urls";

const state = {
  sidebar: {
    opened: false,
  },
  company: '',
  companies: [],
  config: {
    palette: {
      primary: '#4ae387',
      danger: '#e34a4a',
      info: '#4ab2e3',
      success: '#db76df',
      warning: '#f7cc36',
      white: '#fff',
      black: '#000',
      fontColor: '#34495e',
      transparent: 'transparent',
      lighterGray: '#ddd',
    },
  },
  isLoading: true,
}

const mutations = {
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  },
  [SET_COMPANIES]: (state, companies) => {
    state.companies = companies;
  },
  [SET_COMPANY]: (state, company) => {
    state.company = company;
  }
}

const actions = {
  [GET_COMPANIES_ACTION]: ({commit, dispatch}) => {
    axios.get(GET_COMPANIES, {
      params: {
        is_deleted: 0
      }
    })
      .then((response) => {
        commit(SET_COMPANIES, response.data);
      })
  }
}

export default {
  state,
  mutations,
  actions,
}
