<!-- 企业 -->
<template>
  <organizationData :navigation1='navigation1'></organizationData>
</template>

<script>
import organizationData from '@/components/organizationData'
export default {
  data () {
    return {
      navigation1: {
        head: "企业(会员)",
        id:3
      },
      data: [
        {
          name: '拜耳中国',
          type: '企业',
          addr: '北京市',
          leader: '比心',
          num: 20
        },
        {
          name: '拜耳中国',
          type: '企业',
          addr: '北京市',
          leader: '比心',
          num: 20
        },
        {
          name: '拜耳中国',
          type: '企业',
          addr: '北京市',
          leader: '比心',
          num: 20
        },
        {
          name: '拜耳中国',
          type: '企业',
          addr: '北京市',
          leader: '比心',
          num: 20
        },
        {
          name: '拜耳中国',
          type: '企业',
          addr: '北京市',
          leader: '比心',
          num: 20
        }
      ]
    }
  },

  components: { organizationData },

  computed: {},

  created () {},

  methods: {}
}

</script>
<style lang="scss">
</style>
