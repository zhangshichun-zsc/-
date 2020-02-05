<!-- 组织列表 -->
<template>
  <survey-add :navigation='navigation'></survey-add>
</template>

<script>
import surveyAdd from '../commonComponent/edit'
export default {
  data() {
    return {
      navigation: {
        head: "新建问卷调查(会员)",
        id: 100
      },
      data: []
    };
  },
  components: { surveyAdd },

  computed: {},

  created() {},

  methods: {}
};
</script>
<style lang="scss">
</style>
