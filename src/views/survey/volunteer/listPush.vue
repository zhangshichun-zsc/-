<!-- 组织列表 -->
<template>
  <surveyList :navigation1='navigation'></surveyList>
</template>

<script>
import surveyList from '../commonComponent/listPush'
export default {
  name:'memberList',
  data () {
    return {
      navigation: {
        head: '新增问卷对象(志愿者)',
        id: ""
      },
      data: []
    }
  },
  components: { surveyList },

  computed: {},

  created () {},

  methods: {}
}

</script>
<style lang="scss">
</style>
