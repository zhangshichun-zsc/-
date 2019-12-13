import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    // isLogin:false,
    userName: localStorage.getItem('userName') ? localStorage.getItem('userName') : '',
    userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : '',

    tel: localStorage.getItem('tel') ? localStorage.getItem('tel') : '',

    // 成员管理
    MGTpage: { page: 1, size: 10 },
    MGTlist: { list: [], count: 0 },
    activityType: [],
    deplist: [],

    // 菜单
    menuList: []
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
    updatePage(state, MGTpage) {
      state.MGTpage = MGTpage
    },
    updateList(state, MGTlist) {
      state.MGTlist = MGTlist
    },
    activityType(state, activityType) {
      state.activityType = activityType
    },
    deplist(state, deplist) {
      state.deplist = deplist
    },
    menuList(state, menuList) {
      state.menuList = menuList
    }
  },
  actions: {

  },

})
