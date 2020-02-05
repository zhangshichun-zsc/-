<!-- 组织列表 -->
<template>
  <listPushList :navigation1='navigation'></listPushList>
</template>

<script>
import listPushList from '../commonComponent/listPushList'
export default {
  name:'memberList',
  data () {
    return {
      navigation: {
        head: '问卷调查-问卷对象(志愿者)',
        id: ""
      },
      data: []
    }
  },
  components: { listPushList },

  computed: {},

  created () {},

  methods: {}
}

</script>
<style lang="scss">
</style>
