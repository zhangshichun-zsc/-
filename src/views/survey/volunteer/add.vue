<!-- 组织列表 -->
<template>
  <survey-add  :navigation="navigation"></survey-add>
  <!-- <survey-add :sysTypeText="'志愿者'" :navigation1="navigation"></survey-add> -->
</template>

<script>
import surveyAdd from "../commonComponent/edit";
export default {
  data() {
    return {
      navigation: {
        head: "新建问卷调查(志愿者)",
        id: ""
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
