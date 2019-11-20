<!--维护捐赠模板(会员)-->
<template>
  <Maintain :navigation1='navigation1'></Maintain>
</template>

<script>
import Maintain from '../../../components/Maintain'
export default {
  data() {
    return {
      navigation1: {
        head: "维护捐赠模板(会员)"
      }
    };
  },

  components: { Maintain},

  computed: {},

  created() {},

  methods: {

  }
};
</script>
<style lang="scss" scoped>

</style>
