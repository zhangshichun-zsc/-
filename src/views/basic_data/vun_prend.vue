<!-- 证书维护（会员） -->
<template>
  <div class="integral">
    <Navigation :labels="navigation1"></Navigation>
    <div class="integral-header">
      <div class="integral-left">
        <div class="title">
          <img class="imgtops"  v-if="headimg!=null"  :src="headimg" alt />
          <img class="imgtops" v-else="headimg==null"  src="../../assets/images/prend/4.png" />
          <p>志愿服务证明</p>
          <p>CERTIFICATE OF VOLUNTEER SERVICE</p>
          <p class="texts">
            兹证明志愿者[*姓名*]于【*活动日期*】，参与了[*志愿机构*]志愿服务，出色地完成志愿服务工作，累计志愿服务【*志愿服务时长*】小时。期待未来与您继续携手前行，谨此表达最诚挚的感谢与祝福！
            <!-- <Input v-model="value6" type="textarea" :rows="5" placeholder disabled /> -->
          </p>
          <img class="imgtops fot" v-if="footimg!=null"  :src="footimg" alt  />
          <!-- <Input v-model="value8" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." /> -->
          <div v-if="footimg==null" class="head">
            <img class="head-left" src="../../assets/images/prend/1.png" alt />
            <img class="head-right" src="../../assets/images/prend/2.png" alt />
            <img class="head-left" src="../../assets/images/prend/3.png" />
          </div>
          <div v-if="footimg==null" class="bottom">
            <p>北京市海淀区融爱融乐</p>
            <p>心智障碍者家庭支持中心</p>
            <p>年 月 日</p>
          </div>
        </div>
      </div>
      <div class="integral-right" v-if="!show">
        <div class="top">
          <p :class="i===1?'active':'default'"  @click="showUpload(1)">
            <a href="javascript:;" >更换LOGO</a>
          </p>
          <p :class="i===2?'active':'default'" @click="showUpload(2)">
            <a href="javascript:;" >更换页尾</a>
          </p>
        </div>
        <div class="bottom" style="display: flex;">
          
          <UploadImg
          v-show="i==1"
              :max="1"
              ref="logo"
              v-model="logoPicUrl"
              :full-url.sync="logoPicMap"
              :display-width="280"
              :crop-width="700"
              :crop-height="230"
              style="justify-content: center;"
            ></UploadImg>
          <UploadImg
              v-show="i==2"
              :max="1"
              ref="foot"
              v-model="footPicUrl"
              :full-url.sync="footPicMap"
              :display-width="280"
              :crop-width="700"
              :crop-height="230"
              style="justify-content: center;"
            ></UploadImg>
        </div>
        <p class="btn">
          <Button
            type="error"
            icon="ios-cloud-saved-outline"
            @click="location"
            v-if="!show"
            :loading="loading"
          >保存图片</Button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { updateBooks, getBooksDetails, orgimgdel } from "@/request/api";
import { upload } from "@/request/http";
export default {
  data() {
    return {
      model1: "",
      
      headimg: null,
      logoPic: null,
      footimg: null,
      officeSealPic: null,
      i: 1,
      certMouldId: this.$route.query.certMouldId,
      show: false,
      navigation1: {
        head: "证书维护（志愿者）"
      },
      value8: "",
      value6:
        "  兹证明志愿者[*姓名*]于【*活动日期*】，参与了[*志愿机构*]志愿服务，出色地完成志愿服务工作，累计志愿服务【*志愿服务时长*】小时。期待未来与您继续携手前行，谨此表达最诚挚的感谢与祝福！",
      loading: false,
      logoPicUrl: "",
      logoPicMap:'',
      footPicUrl:'',
      footPicMap:''
    };
  },
  created() {
    if (~~this.$route.query.show === 0) {
      this.show = true;
      this.getList();
    } else {
      this.show = false;

      this.getList();
    }
  },
  watch:{
    logoPicUrl(newValue){
      if(newValue){
         this.headimg = this.logoPicMap
      }else {
        this.headimg = null
      }
    },
     footPicUrl(newValue){
      if(newValue){
     
         this.footimg = this.footPicMap
        
        //  this.footimg = this.$refs.foot.uploadList[1].previewUrl
      }else {
        this.footimg = null
      }
     }
  },
  methods: {
    getList() {
      getBooksDetails({ certMouldId: this.certMouldId }).then(res => {
        this.headimg = res.data.logoPicPath;
        this.logoPic = res.data.logoPic;
        this.footimg = res.data.officeSealPicPath;
        this.officeSealPic = res.data.officeSealPic;

        this.logoPicUrl =res.data.logoPic
        this.logoPicMap =  res.data.logoPicPath
        this.footPicUrl=res.data.officeSealPic
        this.footPicMap =  res.data.officeSealPicPath
      });
    },
    showUpload(e) {
      this.i = e;
    },
    location() {
      if (!this.logoPicUrl || !this.footPicUrl) {
        this.$Message.warning("logo或者尾部照片没有选择");
        return;
      }
      this.loading = true;
      let args = {
        certMouldId: this.certMouldId,
        logoPic: this.logoPicUrl,
        officeSealPic: this.footPicUrl
      };
      updateBooks(args).then(res => {
        //防止重复提交
        setTimeout(() => {
          this.loading = false;
        }, 500);
        this.$router.back();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.integral-header {
  width: 100%;
  height: 1000px;
  display: flex;
  background: #ffffff;
  padding-top: 30px 50px;
}
.integral-left {
  height: 930px;
  width: 600px;

  .title {
    // padding-top: 200px;
    text-align: center;

    width: 530px;
    height: 930px;
    // left: 0;
    // top: 60px;
    background: url(../../assets/images/prend/vun.png) no-repeat;
    background-size: contain;

    p {
      width: 80%;
      margin: 0 auto;
      line-height: 36px;
      font-size: 20px;
      text-align: center;
    }
  }
  .bottom {
    margin-top: 30px;
    p {
      text-align: end;
    }
  }
  .head {
    display: flex;
    // justify-content:;
    margin-top: 30px;
    margin-left: 50px;
    width: 80%;

    .head-left {
      height: 70px;
      width: 70px;

      background-size: contain;
    }
    .head-right {
      height: 70px;
      width: 130px;

      background-size: contain;
    }
  }
}

.integral-right {
  width: 500px;
  height: 500px;
  .top {
    height: 40px;
    line-height: 40px;
    width: 100%;
    display: flex;
    p {
      width: 50%;
      font-size: 16px;
      text-align: center;
      border: black 1px solid;
    }
  }
  h5 {
    margin: 20px 0 20px 100px;
  }
  .bottom {
    height: 100%;
    width: 100%;
    background: #eeee;
    border: black 1px solid;
    border-top: black 0 solid;
    padding-top: 30px;
   
    .textimg {
      margin: 0px auto;
      height: 300px;
      width: 300px;
      background: #ffffff;
      border: black 1px solid;
    }
  }

  .btn {
    text-align: center;
    margin-top: 30px;
  }
}

.upload,
.uploads .file {
  //  margin: 0px auto;
  height: 300px;
  width: 300px;
  border: 1px dashed #ff565a;
  text-align: center;
  line-height: 300px;
}

.box {
  display: flex;
  justify-content: center;
}
.active {
  background: #ff565a;
  a {
    color: #ffffff;
  }
}

.default {
  a {
    color: black;
  }
}
.texts {
  margin-top: 20px !important;
  margin-bottom: 20px !important;
  height: 160px;
  overflow-y: auto;
  border: 1px solid black;
  text-indent: 2em;
  text-align: left !important;
}

.imgtops{
  width: 490px;
}
</style>
