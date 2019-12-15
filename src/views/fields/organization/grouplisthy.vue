<!-- 组织列表 -->
<template>
  <organizationData :navigation1='navigation1'></organizationData>
</template>

<script>
import organizationData from '@/components/organizationData'
export default {
  data () {
    return {
      navigation1: {
        head: "组织列表(会员)",
        id:100
      },
      data: []
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
