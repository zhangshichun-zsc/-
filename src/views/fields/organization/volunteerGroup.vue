<!-- 志愿者团队列表 -->
<template>
  <groupList :index='index' :navigation1='navigation1'></groupList>
</template>

<script>
import groupList from '@/components/groupList'
export default {
  data() {
    return {
      navigation1: {
        head: '志愿者团队(会员)',
        name: 'volunteer'
      },
      index: 1
    }
  },
  components: { groupList },
  created() {},
  methods: {}
}
</script>
