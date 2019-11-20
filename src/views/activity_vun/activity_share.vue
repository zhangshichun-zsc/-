<!--活动分享（共用）-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="content-left">
        <img />
        <div>
          <Button>下载二维码</Button>
          <Button class="content-btn" @click="make">制作邀请函</Button>
        </div>
      </div>
      <div class="content-right">
        <p>分享到社交平台,让更多人参加吧</p>
        <ul>
          <li>
            <span>微信</span>
          </li>
          <li>
            <span>朋友圈</span>
          </li>
          <li>
            <span>QQ</span>
          </li>
          <li>
            <span>微信</span>
          </li>
        </ul>
        <p>
          <Input v-model="value" placeholder="Enter something..." style="width: 300px" />
          <Button class="content-btn">复制活动链接</Button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigation1: {
        head: "活动分享"
      },
      value:''
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {
    make(){
      this.$router.push({name:'invitation'})
    }

  }
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  padding: 40px;
  .content-left {
    margin-right: 30px;
    img {
      height: 200px;
      width: 200px;
      margin-bottom: 10px;
    }
    .content-btn {
      margin-left: 15px;
      background: #169bd5;
      color: #ffffff;
    }
  }

  .content-right{
    font-size: 14px;
    padding:10px 0;

    ul{
      display: flex;
      margin: 50px 0;
      height: 50px;
      li{
        display: flex;
        margin-right: 20px;
      }
    }
    .content-btn {
      background: #169bd5;
      color: #ffffff;
    }
  }
}
</style>
