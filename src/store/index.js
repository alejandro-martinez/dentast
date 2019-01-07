import Vue from 'vue';
import Vuex from 'vuex';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

Vue.use(Vuex);

// eslint-disable-next-line import/prefer-default-export
export const store = new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem('userLogged') || false,
  },
  mutations: {
    [LOGIN](state) {
      localStorage.setItem('userLogged', true);
      state.isLoggedIn = true;
    },
    [LOGOUT](state) {
      state.isLoggedIn = false;
    },
  },
  actions: {
    login({ commit }) {
      commit(LOGIN, commit); // show spinner
    },
    logout({ commit }) {
      localStorage.removeItem('userLogged');
      commit(LOGOUT);
    },
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
  },
});
