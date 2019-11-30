import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:localStorage.getItem('token') ? localStorage.getItem('token') : '',
    isLogin:false,
    userName:localStorage.getItem('userName') ? localStorage.getItem('userName') : '',
    userId:localStorage.getItem('userId') ? localStorage.getItem('userId') : '17',
    tel:localStorage.getItem('tel') ? localStorage.getItem('tel') : ''
  },
  mutations: {


  },
  actions: {

  }
})
