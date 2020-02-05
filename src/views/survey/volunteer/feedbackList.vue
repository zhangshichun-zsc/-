<!-- 组织列表 -->
<template>
  <surveyList :navigation1='navigation'></surveyList>
</template>

<script>
import surveyList from '../commonComponent/feedbackList'
export default {
  data () {
    return {
      navigation: {
        head: '问卷调查详情(志愿者)',
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
