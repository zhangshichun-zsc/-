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

      data: [
        {
          name: '广州扬爱',
          type: '融爱中国成员单位',
          addr: '广州市',
          leader: '比心',
          num: 20
        },
        {
          name: '广州扬爱',
          type: '融爱中国成员单位',
          addr: '广州市',
          leader: '比心',
          num: 20
        },
        {
          name: '广州扬爱',
          type: '融爱中国成员单位',
          addr: '广州市',
          leader: '比心',
          num: 20
        },
        {
          name: '广州扬爱',
          type: '融爱中国成员单位',
          addr: '广州市',
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
