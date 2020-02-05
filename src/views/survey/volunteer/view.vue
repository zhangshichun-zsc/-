<!-- 组织列表 -->
<template>
  <survey-view
    pageFlag="查看"
    sysTypeText="志愿者"
    :configHeaderId="configHeaderId"
    :navigation="navigation"
  ></survey-view>
</template>

<script>
import surveyView from "../commonComponent/view";
import { surveyDetail } from "@/request/api";
export default {
  data() {
    return {
      navigation: {
        head: "查看问卷调查(志愿者)",
        id: ""
      },
      data: [],
      configHeaderId: parseInt(this.$route.query.configHeaderId) || ""
    };
  },
  components: { surveyView },

  mounted() {},

  computed: {},

  methods: {}
};
</script>
<style lang="scss">
</style>
