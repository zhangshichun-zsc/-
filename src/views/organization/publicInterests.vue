<!-- 公益机构 -->
<template>
  <organizationData :navigation1='navigation1' ></organizationData>
</template>

<script>
import organizationData from '@/components/organizationData'
export default {
  data () {
    return {
      navigation1: {
        head: "公益机构(会员)",
        id:5
      },
      data: [
        {
          name: '公益机构1',
          type: '公益机构',
          addr: '北京市',
          leader: '比心',
          num: 20
        },
        {
          name: '公益机构1',
          type: '公益机构',
          addr: '北京市',
          leader: '比心',
          num: 20
        },
        {
          name: '公益机构1',
          type: '公益机构',
          addr: '北京市',
          leader: '比心',
          num: 20
        },
        {
          name: '公益机构1',
          type: '公益机构',
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
