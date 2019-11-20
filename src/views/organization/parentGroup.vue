<!-- 家长小组列表 -->
<template>
  <groupList :index='index' :navigation1='navigation1'></groupList>
</template>

<script>
import groupList from '@/components/groupList'
export default {
  data() {
    return {
      navigation1: {
        head: '家长小组列表(会员)',
        name: 'parent'
      },
      index: 0
    }
  },
  components: { groupList }
}
</script>
