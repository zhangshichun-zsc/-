<!--维护活动模板(会员)-->
<template>
  <Maintain :navigation1='navigation1' :list='list' :from='from'></Maintain>
</template>

<script>
import Maintain from '../../../components/Maintain'
import { mouldList } from "@/request/api";
export default {
  data() {
    return {
      navigation1: "维护活动模板(会员)"
      ,
      list:[],
      from:'editing'
    };
  },

 components: {Maintain},

  computed: {},

  created() {
    this.getList()
  },

  methods: {
    getList(){
      mouldList().then(res=>{
        console.log(res)
        this.list = res.data
      })
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
