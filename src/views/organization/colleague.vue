<!-- 同行 -->
<template>
  <organizationData :navigation1='navigation1'></organizationData>
</template>

<script>
import organizationData from '@/components/organizationData'
export default {
  data () {
    return {
      navigation1: {
        head: "同行(会员)",
        id:2
      },
      data: [
        {
          name: '同行1',
          type: '同行',
          addr: '北京市',
          leader: '比心',
          num: 20
        },
        {
          name: '同行1',
          type: '同行',
          addr: '北京市',
          leader: '比心',
          num: 20
        },
        {
          name: '同行1',
          type: '同行',
          addr: '北京市',
          leader: '比心',
          num: 20
        },
        {
          name: '同行1',
          type: '同行',
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
