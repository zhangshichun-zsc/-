<!--站内信消息提醒(会员) -->
<template>
  <messages :navigation1='navigation1'></messages>
</template>

<script>
import messages from '@/components/messages'
export default {
  data() {
    return {
      navigation1: {
        head: "站内信消息提醒(会员)",
        sysId:1,
        channelFlag:1
      },

    };
  },



  computed: {},

  created() {},
  mounted(){

  },
  components: { messages },

  methods: {

  }
};
</script>
<style lang="scss" scoped>

</style>
