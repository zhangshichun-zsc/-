<!-- 融爱中国成员单位 -->
<template>
  <organizationData :navigation1='navigation1' ></organizationData>
</template>

<script>
import organizationData from '@/components/organizationData'
export default {
  data () {
    return {
       navigation1: {
        head: "融爱中国成员单位(会员)",
        id:1
      },

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
