<!--维护活动融融固定项(会员)-->
<template>
  <div>
  <Navigation :labels="navigation1"></Navigation>
    <div class="new-head">
      <p>融融介绍</p>
    </div>
    <div class="content">
      <p>
        <span>标题</span>
        <i-input :value.sync="value" placeholder="请输入..." style="width: 300px"></i-input>
      </p>
      <p>详情</p>
      <div>富文本</div>
      <div class="btn">
        <i-button type="info" class="btn-info">保存</i-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      navigation1: {
        head: "维护活动融融固定项"
      }
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {}
};
</script>
<style lang="scss" scoped>
.new-head {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  background: #ffffff;
}
.content {
  background: #ffffff;
  padding: 10px 70px;
  margin-top: 20px;
  height: 600px;
  // width: 700px;
  .btn-info {
    height: 40px;
    width: 120px;
    text-align: center;
  }
  p{
    margin: 20px 0;
    height: 40px;
    span{
      margin-right: 50px;
    }
  }
  .btn{
    display: flex;
    width: 700px;
    justify-content: center;
    align-items: center;
  }
}
</style>
