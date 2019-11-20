<!-- 政府 -->
<template>
  <organizationData :navigation1='navigation1'></organizationData>
</template>

<script>
import organizationData from '@/components/organizationData'
export default {
  data () {
    return {
      navigation1: {
        head: "政府(会员)",
        id:6
      },
      orgType:6,
      data: [
        {
          name: '政府',
          type: '政府',
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
