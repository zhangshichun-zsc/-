<!-- 公用头部标签-->
<template>
  <div class="min">
    <div class="flex-center-between min-tit">
      <div>
        <span class="borders">{{labels.head}}</span>
      </div>
      <div>
        <Button class="left" v-if="labels.Shut" size="small">
          <Icon type="md-close" size="10" />关闭
        </Button>
        <Button class="left" v-if="labels.flush" @click="refresh()">
          <Icon type="md-refresh" />刷新
        </Button>
        <Button class="left" v-if="labels.returns" @click="returns()">
          <Icon type="ios-arrow-back" />返回
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {};
  },
  props: ["labels"],
  components: {},

  computed: {},

  created() {},

  methods: {

    //返回
    returns() {
      this.$router.go(-1);
    },

    //局部刷新
    refresh() {
      this.reload();
    }
  }
};
</script>
<style lang="scss" scoped>
.min .min-tit {
  height: 50px;
  background: #f3f3f3;
  border: 1px solid #e4e4e4;
  margin-bottom: 0px;
  line-height: 50px;
}
.min .rig {
  margin-right: 20px;
}
.min .left {
  margin-left: 20px;
  width: 80px;
  height: 35px;
  span {
    font-size: 14px;
  }
}
.borders {
  border-left: 5px solid #1abc9c;
}
</style>
