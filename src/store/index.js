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
    menuList: [],
    //活动状态
    activeState:[{name:"全部",id:"1,2,3,4,5,6,7,9,10,11,13"},{name:"待审核",id:1},{name:"待招募",id:2},{name:"招募中",id:3},{name:"待开始",id:4},{name:"进行中",id:5},{name:"已结束",id:6},{name:"已取消",id:7},{name:"草稿箱",id:8},{name:"审核不通过",id:9},{name:"下架",id:10},{name:"待发布",id:11},{name:"模板",id:12},{name:"关闭报名",id:13}]
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
