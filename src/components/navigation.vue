<!-- 公用头部标签-->
<template>
  <div class="min">
    <div class="flex-center-between min-tit">
      <div>
        <span class="borders">{{labels.head}}</span>
      </div>
      <div>
        <Button class="left" v-if="labels.flush" size="small">
          <Icon type="md-refresh" size="10" />
          刷新
        </Button>
        <Button class="left" v-if="labels.returns" @click="history" size="small">
          <Icon type="ios-arrow-back" size='10'  />
          返回
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props: [ 'labels' ],
  components: {},

  computed: {},

  created() {},

  methods: {
    history(){
      this.$router.go(-1)
      console.log(1);
    }
  }
};
</script>
<style lang="scss">
.min .min-tit {
  height: 50px;
  background: #f3f3f3;
  border: 1px solid #e4e4e4;
  margin-bottom: 0px;
}
.min .rig {
  margin-right: 20px;
}
.min .left {
  margin-left: 20px;
}
.borders {
  border-left: 5px solid #1abc9c;
}
</style>
