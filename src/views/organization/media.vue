<!-- 媒体 -->
<template>
  <organizationData :navigation1='navigation1' ></organizationData>
</template>

<script>
import organizationData from '@/components/organizationData'
export default {
  data () {
    return {
      navigation1: {
        head: "媒体(会员)",
        id:4
      },
      data: [
        {
          name: '媒体1',
          type: '媒体',
          addr: '北京市',
          leader: '比心',
          num: 20
        },
        {
          name: '媒体1',
          type: '媒体',
          addr: '北京市',
          leader: '比心',
          num: 20
        },
        {
          name: '媒体1',
          type: '媒体',
          addr: '北京市',
          leader: '比心',
          num: 20
        },
        {
          name: '媒体1',
          type: '媒体',
          addr: '北京市',
          leader: '比心',
          num: 20
        },
        {
          name: '媒体1',
          type: '媒体',
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
