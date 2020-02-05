<!-- 组织列表 -->
<template>
  <survey-edit
    pageFlag="编辑"
    sysTypeText="会员"
    :configHeaderId="configHeaderId"
    :navigation="navigation"
  ></survey-edit>
</template>

<script>
import surveyEdit from "../commonComponent/edit";
import { surveyDetail } from "@/request/api";
export default {
  data() {
    return {
      navigation: {
        head: "编辑问卷调查(志愿者)",
        id: ""
      },
      data: [],
      configHeaderId: parseInt(this.$route.query.configHeaderId) || ""
    };
  },
  components: { surveyEdit },

  mounted() {},

  computed: {},

  methods: {}
};
</script>
<style lang="scss">
</style>
