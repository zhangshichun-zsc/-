import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    // isLogin:false,
    userName: localStorage.getItem('userName') ? localStorage.getItem('userName') : '',
    userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : '',

    tel: localStorage.getItem('tel') ? localStorage.getItem('tel') : ''
  },
  getters: {


  },
  mutations: {
    setToken(state, userInfo) {
      localStorage.setItem("token", userInfo.token);
      state.token = userInfo.token;
      state.userId = userInfo.userId;
    },

    clearToken(state) {
      localStorage.clear();
      state.user = '';
      state.token = null
    },
  },
  actions: {

  },

})
