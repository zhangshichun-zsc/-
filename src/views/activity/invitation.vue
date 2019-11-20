<!-- 邀请函(共用) -->
<template>
  <div class="integral">
    <div class="integral-header">
       <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <span>邀请函</span>
        </div>
          <div>
          <Button  @click="history" size="small">
          <Icon type="ios-arrow-back" size='10'  />
          返回
        </Button>
        </div>
      </div>
    </div>
    <div class="inter">
        <div class="invite">
            <div>邀请函</div>
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568717870826&di=d57cf98b21e4667616d7387021009ec9&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201312%2F26%2F20131226115502_yArhi.jpeg" alt="">
            <div class="btn">
              <Button>选择图片</Button>
              <Button>立即分享</Button>
            </div>
        </div>
        <div class="invite">
            <h3>邀请函使用攻略</h3>
            <h5>上传图片->制成邀请函->分享给好友</h5>
        </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
       navigation1: {
        head: "邀请函(共用)",
       },
      data: [
       ]
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {
            handleReset (name) {
                this.$refs[name].resetFields();
            },
             history(){
              this.$router.go(-1);
            }
  }
};
</script>
<style lang="scss" scoped>
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  padding: 15px 20px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
}

.integral-table {
  margin-top: 30px;
   display: flex;
  flex-direction: column;
  align-items: center;
}
.table-header {
  padding: 5px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.btn{
  display: flex;
  justify-content: space-around
}
.invite{
   width:300px;
   text-align: center;
}
.invite div{
  margin: 20px 0;
}
.invite img{
    width:300px;
}
.inter{
    display: flex;
    justify-content: space-around;
    margin-top: 100px;
}
</style>
