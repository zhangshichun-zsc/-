import Vue from "vue";
import VeLine from "v-charts/lib/line.common";
import App from "./App.vue";
import router from "./router/index";
import Components from "./components";
import store from "./store/index";
import VDistpicker from "v-distpicker";
import "babel-polyfill";

import util from "../src/request/util";
import page from "./components/page";
import head from "./components/head";
import topheads from "./components/topheads";
import number from "./components/number";
import iView, { Message } from "iview";
import "./assets/css/dist/styles/iview.css";
import "./libs/style.scss";
import "./libs/rest.css";
import "./libs/rem.js";




Vue.prototype.$Message = Message;

// const routerPush = router.prototype.push

// router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// }

//路由
router.beforeEach((to, from, next) => {
  if (store.state.token) {
    next();
  } else {
    //没有登录，去跳转登录页
    if (to.path === "/login") {
      // Message.error('身份过期请重新登陆')
      next();
    } else {

       //初始化动态路由方法
      //  initRouter(router, store);
      // Message.error('已退出登陆')
      next({
        path: "/login"
      });
    }
  }
});

Vue.prototype.util = util;

Vue.config.productionTip = false;
Vue.use(Components);
Vue.use(iView);
Vue.use(head);
Vue.use(topheads);
Vue.use(page);
Vue.use(number);
Vue.component("v-distpicker", VDistpicker);
Vue.component(VeLine.name, VeLine);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
