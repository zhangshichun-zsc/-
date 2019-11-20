import navigation from './navigation.vue'

const head={
  install:function(Vue){
    Vue.component('Navigation',navigation)
  }
};

export default head;
