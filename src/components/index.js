import editor from './wangeditor.vue'
const components = [
  editor
]

export default {
  install (Vue, opts = {}) {
    components.map(component => {
      Vue.component(component.name, component)
    })
  }
}