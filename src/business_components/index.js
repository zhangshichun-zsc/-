import Vue from "vue";

const components = {
  PageHeaderWrapper: () => import("./PageHeaderWrapper.vue"),
  CommonList: () => import("./common_list/CommonList.vue"),
  UploadImg: () => import("./UploadImg.vue"),
  CommonDetailsModal: () => import("./common_details/CommonDetailsModal"),
  EditImg: () => import("./EditImg.vue"),
  XDatePicker: () => import('./XDatePicker.vue')
}

Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});
