import sidentify from './identify.vue'

const page = {
    install: function(Vue) {
        Vue.component('Sidentify', sidentify)
    }
};

export default page;