<!-- 证书维护（会员） -->
<template>
  <div class="integral">
    <Navigation :labels="navigation1"></Navigation>
    <div class="integral-box">
      <div class="integral-header">
        <div class="top" >
          <!-- <UploadImg v-if='!show' :max="1" ref="logo" v-model="logoPicUrl" :full-url.sync="logoPicMap" :display-width="356"
          :display-height="146"
           :crop-width="700" :crop-height="230" style="justify-content: center;"></UploadImg> -->
        </div>
        <div class="center">
          <!-- <h1>志愿服务证明</h1>
          <h3>CERTIFICATE</h3>
          <h3>OF VOLUNTEER SERVICE</h3>
          <h2>感谢</h2> 
          <h4>于__年__月___日至__年__月___日</h4>
          <p>为融爱融乐的心智障碍者融合服务提供了珍贵的________小时的志愿支持。感谢您的诚恳用心和专业态度，与我们一起协助心智障碍者更好的融入和参与社会，提升他们的生活品质。给我们信心与力量，让更多人看见生命的多元，让我们的社会更平等、文明、融合。期待未来与您继续携手前行，谨此表达最诚挚的感谢与祝福！</p> -->
        </div>
        <div class="bottom" >
          <!-- <UploadImg v-if='!show' :max="1" ref="foot" v-model="footPicUrl" :full-url.sync="footPicMap" :display-width="280" :crop-width="700" :crop-height="230" style="justify-content: center;"></UploadImg> -->
        </div>
       <!-- <div class="footBtn">
          <Button style="justify-content: center;" type="error" icon="ios-cloud-saved-outline" @click="location" v-if="!show" :loading="loading">保存图片</Button>
      </div> -->

      </div>
      
    </div>
  </div>
</template>

<script>
import { updateBooks, getBooksDetails, orgimgdel } from '@/request/api'
import { upload } from '@/request/http'
export default {
  data() {
    return {
      certMouldId: this.$route.query.certMouldId,
      show: false,
      navigation1: {
        head: '证书维护（会员）'
      },

      value6:
        '   感谢 [*姓名*]于    年    月      日至    年    月    日为[*   *] 的心智障碍者融合服务提供了珍贵的【*志愿服务时长*】小时的志愿支持。感谢您的诚恳用心和专业态度，与我们一起协助心智障碍者更好的融入和参与社会，提升他们的生活品质。给我们信心与力量，让更多人看见生命的多元，让我们的社会更平等、文明、融合。期待未来与您继续携手前行，谨此表达最诚挚的感谢与祝福！',
      loading: false,
      logoPicUrl: '',
      logoPicMap: '',
      footPicUrl: '',
      footPicMap: ''
    }
  },
  created() {
    if (~~this.$route.query.show === 0) {
      this.show = true
      this.getList()
    } else {
      this.show = false

      this.getList()
    }
  },

  methods: {
    getList() {
      getBooksDetails({ certMouldId: this.certMouldId }).then(res => {
        this.logoPicUrl = res.data.logoPic
        this.logoPicMap = res.data.logoPicPath
        this.footPicUrl = res.data.officeSealPic
        this.footPicMap = res.data.officeSealPicPath
      })
    },

    location() {
     if (!this.logoPicUrl) return this.$Message.warning('请选择logo图片')
     if(!this.footPicUrl) return   this.$Message.warning('请选择底部图片')
      this.loading = true
      let args = {
        certMouldId: this.certMouldId,
        logoPic: this.logoPicUrl,
        officeSealPic: this.footPicUrl
      }
      updateBooks(args).then(res => {
        //防止重复提交
        setTimeout(() => {
          this.loading = false
        }, 500)
        this.$router.back()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.integral-box {
  width: 100%;
  display: flex;
  justify-content: center;
  background: #ffffff;
  padding-top: 30px;
  padding-bottom: 30px;
  border-radius: 10px;
  box-sizing: border-box;
}
.integral-header {
  width: 450px;
  height: 650px;
  background-image:url("../../assets/images/prend/title.png") ;
  background-repeat:no-repeat;
  background-size:100%; 
  .top,
  .bottom {
    .noImg {
      text-align: center;
      color: #f70000;
    }
    // height: 115px;
    // background-color: #eee;
    border-radius: 10px;
  }

  .center {
    padding: 40px;
    padding-top: 40px;
    padding-bottom: 30px;
    text-align: center;
    h1 {
      font-weight: 600;
      font-size: 22px;
      line-height: 52px;
      color: #07913c;
    }
    h2 {
      font-weight: 600;
      font-size: 18px;
      color: #000;
      line-height: 52px;
    }
    h3{
      color: #0000008f;
      font-weight: 600;
      font-size: 18px;
    }
    p {
      line-height: 36px;
      font-size: 18px;
      text-align: left;
      text-indent: 2em;
    }
  }
    .footBtn {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
}
</style>
