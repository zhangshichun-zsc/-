<!-- 公益机构 -->
<template>
  <organizationData :navigation1='navigation1' :orgType='orgType'></organizationData>

</template>

<script>
import organizationData from '@/components/organizationData'
export default {
  data () {
    return {
      navigation1: {
        head: "公益机构(会员)"
      },
      orgType:1,
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
