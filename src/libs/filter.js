export default {
  install (Vue, opts = {}) {
    Vue.filter('my-filter', function (value) {
      // 返回处理后的值
    })
  }
}