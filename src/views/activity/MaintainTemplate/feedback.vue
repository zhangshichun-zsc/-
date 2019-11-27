<!--维护反馈模板(会员)-->
<template>
  <Maintain :navigation1='navigation1' :list='list'></Maintain>
</template>

<script>
import Maintain from '../../../components/Maintain'
import { getActiveTeb }from'@/request/api'
export default {
  data() {
    return {
      navigation1: {
        head: "维护反馈模板(会员)"
      },
      list:[]
    };
  },

  components: { Maintain},

  computed: {},

  created() {
    this.getList()
  },

  methods: {
    getList(){
      getActiveTeb().then(res => {
        this.list = res.data
      })
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
