<!--  -->
<template>
  <div class="min">
    <div class="flex-center-between min-tit">
      <div>
        <Button :to="{ name: 'users_detail' }" class="rig">用户详情</Button>
        <Button :to="{ name: 'edit-data' }"  class="rig">编辑资料</Button>
        <Button :to="{ name: 'login_record' }"  class="rig">登录日志</Button>
      </div>
      <div>
        <Button class="left"><Icon type="md-refresh" size='20'/>刷新</Button>
        <Button class="left"><Icon type="ios-arrow-back" size='20'/>返回</Button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  created () {},

  methods: {}
}

</script>
<style lang="scss" scoped>
.min .min-tit{
  margin-bottom: 30px;
}
.min .rig{
  margin-right: 20px;
}
.min .left{
  margin-left: 20px;
}
</style>
