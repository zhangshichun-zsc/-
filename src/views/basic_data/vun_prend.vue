<!-- 证书维护（会员） -->
<template>
  <div class="integral">
    <Navigation :labels="navigation1"></Navigation>
    <div class="integral-box">
      <div class="integral-header">
        <div class="top" style="height:92px">
          <p v-if="show&& !logoPicMap" class="noImg" style="line-height: 92px;">暂未上传</p>
          <UploadImg v-if='!show' :max="1" ref="logo" v-model="logoPicUrl" :full-url.sync="logoPicMap" :display-width="280" :crop-width="700" :crop-height="230" style="justify-content: center;"></UploadImg>
          <UploadImg v-else  :disabled="true" :max="1" ref="logo" v-model="logoPicUrl" :full-url.sync="logoPicMap" :display-width="280" :crop-width="700" :crop-height="230" style="justify-content: center;"></UploadImg>
        </div>
        <div class="center">
          <h1>志愿服务证明</h1>
          <h2>CERTIFICATE OF VOLUNTEER SERVICE</h2>
          <p>兹证明志愿者[*姓名*]于【*活动日期*】，
            参与了[*志愿机构*]志愿服务，
            出色地完成志愿服务工作，
            累计志愿服务【*志愿服务时长*】小时。
            期待未来与您继续携手前行，
            谨此表达最诚挚的感谢与祝福！</p>
        </div>
        <div class="bottom" style="height:92px">
          <p v-if="show && !footPicMap" class="noImg" style="line-height: 92px;">暂未上传</p>
          <UploadImg v-if='!show' :max="1" ref="foot" v-model="footPicUrl" :full-url.sync="footPicMap" :display-width="280" :crop-width="700" :crop-height="230" style="justify-content: center;"></UploadImg>
          <UploadImg v-else :max="1" ref="foot" :disabled="true" v-model="footPicUrl" :full-url.sync="footPicMap" :display-width="280" :crop-width="700" :crop-height="230" style="justify-content: center;"></UploadImg>
        </div>
        <div class="footBtn">
          <Button style="justify-content: center;" type="error" icon="ios-cloud-saved-outline" @click="location" v-if="!show" :loading="loading">保存图片</Button>
        </div>

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
        head: '证书维护（志愿者）'
      },
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
      if (!this.logoPicUrl) return this.$Message.warning('logo图片没有选择')
      if (!this.footPicUrl) return this.$Message.warning('底部图片没有选择')

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
  width: 350px;
  .top,
  .bottom {
    .noImg {
      text-align: center;
      color: #f70000;
    }
    // height: 115px;
    background-color: #eee;
    border-radius: 10px;
  }
  .footBtn {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
  .center {
    padding-top: 15px;
    padding-bottom: 30px;
    text-align: center;
    h1 {
      font-weight: 600;
      font-size: 22px;
      line-height: 52px;
    }
    h2 {
      font-size: 18px;
      color: #80c515;
      line-height: 52px;
    }

    p {
      line-height: 36px;
      font-size: 18px;
      text-align: left;
      text-indent: 2em;
    }
  }
}
</style>
