<!-- 查看问卷详情页面 -->
<template>
  <survey-view
    pageFlag="查看"
    sysTypeText="会员"
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
      data: [],
      configHeaderId: parseInt(this.$route.query.configHeaderId) || "",
      navigation: {
        head: "查看问卷调查(会员)",
        id: 100
      }
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
