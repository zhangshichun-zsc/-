<!-- 证书维护（志愿者） -->
<template>
  <div class="integral">
     <Navigation :labels="navigation1"></Navigation>
    <div class="integral-header">

      <div class="integral-left">
        <div class="title">
          <p>志愿服务证明</p>
          <p>CERTIFICATE OF VOLUNTEER SERVICE</p>
          <div id="texts">
            为融爱融乐的心智障碍者融合服务提供了珍贵的 小时的志愿支持。
            感谢您的诚恳用心和专业态度，与我们一起协助心智障碍者更好的融入和参与社会，提升他们的生活品质。给我们信心与力量，让更多人看见
            生命的多元，让我们的社会更平等、文明、融合。
            期待未来与您继续携手前行，谨此表达最诚挚的感谢与祝福！
          </div>
          <!-- <Input v-model="value8" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." /> -->
         <div class="head ">
          <img class="head-left" src="../../assets/images/prend/1.png" alt=""/>
           <img  class="head-right" src="../../assets/images/prend/2.png" alt=""/>
        </div>
        <div class="dataname">
          <p>北京市海淀区融爱融乐</p>
          <p>心智障碍者家庭支持中心</p>
          <p>年 月  日</p>
        </div>

        </div>



      </div>
      <div class="integral-right">
        <div class="top">
          <p>更换LOGO</p>
           <p>更换尾页</p>
        </div>
        <div class="bottom">
          <div class="textimg">
          </div>
          <h5>图片最大为*</h5>
          <p class="btn"><Button type="success">上传图片</Button></p>
        </div>
          <p class="btn"><Button type="success">保存图片</Button></p>


    </div>

      <!-- <Row>
      <Col span="12">
        <div class="show">
          <img :src="headimg" alt="" class="head">
          <p>志愿服务证明</p>
          <p>CERTIFICATE OF VOLUNTEER SERVICE</p>
        </div>
        <p>  感谢 </p>
        <p>   于    年    月      日至    年    月    日</p>
        <p>
为融爱融乐的心智障碍者融合服务提供了珍贵的       小时的志愿支持。
    感谢您的诚恳用心和专业态度，与我们一起协助心智障碍者更好的融入和参与社会，提升他们的生活品质。给我们信心与力量，让更多人看见
          生命的多元，让我们的社会更平等、文明、融合。
  期待未来与您继续携手前行，谨此表达最诚挚的感谢与祝福！
        </p>
        <Row>
          <Col span="6" push="18">
            <p>[*志愿机构*]</p>
            <img :src="footimg" alt="" class="fot">
          </Col>
        </Row>
      </Col>
      <Col span="12">
        <p>
          <a href="javascript:;" @click="showUpload(1)">更换LOGO</a>
          <a href="javascript:;" @click="showUpload(2)">更换页尾</a>
        </p>
        <div class="box" v-show='i == 0'>
            <div class="upload" v-if='headimg == null'>
                <div class="file" @click="()=>{ this.$refs.files.click()}">
                  <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="files" @change="uploadFile('headimg','logoPic',$event)">
                  <Icon type="md-cloud-upload" :size='36' color="#2d8cf0"/>
                </div>
            </div>
            <img class="imgs" v-else :src="headimg"/>
            <Icon type="ios-trash" v-if='!show && headimg !== null' class="cancel" @click="cancelImg('logoPic')"/>
        </div>
        <div class="box" v-show='i == 2'>
            <div class="upload" v-if='footimg == null'>
                <div class="file" @click="()=>{ this.$refs.filess.click()}">
                  <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="filess" @change="uploadFile('footimg','officeSealPic',$event)" >
                  <Icon type="md-cloud-upload" :size='36' color="#2d8cf0"/>
                </div>
            </div>
            <img class="imgs" v-else :src="footimg"/>
            <Icon type="ios-trash" v-if='!show && footimg !== null' class="cancel" @click="cancelImg('officeSealPic')"/>
        </div>
        <Button type="primary" icon="ios-cloud-saved-outline" @click="location" v-if='show'>保存图片</Button>
      </Col>
      </Row>-->
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
      i: 0,
      certMouldId: this.$route.query.certMouldId,
      show: false,
      navigation1: {
        head: "积分查询(志愿者)"
      },
      value8: ""
    };
  },
  created() {
    if (~~this.$route.query.show === 0) {
      this.show = false;
      this.getList();
    } else {
      this.show = true;
      this.getList();
    }
  },
  methods: {
    getList() {
      getBooksDetails({ certMouldId: this.certMouldId }).then(res => {
        this.headimg = res.data.logoPicPath;
        this.logoPic = res.data.logoPic;
        this.footimg = res.data.officeSealPicPath;
        this.officeSealPic = res.data.officeSealPic;
      });
    },
    showUpload(e) {
      this.i = e;
    },
    uploadFile(img, src, e) {
      let file = e.target.files[0];
      const dataForm = new FormData();
      dataForm.append("file", file);
      upload(dataForm).then(res => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          this[img] = e.target.result;
          this[src] = res.data;
        };
      });
    },
    cancelImg(src) {
      orgimgdel({ path: this[src] }).then(res => {
        if (src == "logoPic") {
          this.logoPic = null;
          this.headimg = null;
        } else {
          this.officeSealPic = null;
          this.footimg = null;
        }
        this.$Message.success("删除成功");
      });
    },
    location() {
      console.log(this.logoPic, this.officeSealPic);
      if (!this.logoPic || !this.officeSealPic) {
        this.$Message.warning("logo或者尾部照片没有选择");
        return;
      }
      let args = {
        certMouldId: this.certMouldId,
        logoPic: this.logoPic,
        officeSealPic: this.officeSealPic
      };
      updateBooks(args).then(res => {
        this.$router.back();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.integral-header {
  width: 1000px;
  height: 1000px;
  display: flex;
   background: #ffffff;
  justify-content: space-between;
  padding-top: 30px;
}
.integral-left {
  height: 900px;
  width: 100%;



  .title {
    padding-top: 200px;
    text-align: center;
    padding-right: 33px;
    width: 530px;
    height: 830px;
    left: 0;
    top: 60px;
    background: url(../../assets/images/prend/title.png) no-repeat;
    background-size: contain;

    p {
      width: 100%;
      line-height: 36px;
      font-size: 20px;
      text-align: center;
    }
  }
  .head {
    margin: 30px 0;
    display: flex;
    margin-left: 50px;
    .head-left {
      height: 70px;
      width: 70px;
      background: url(../../assets/images/prend/1.png) no-repeat;
      background-size: contain;
    }
    .head-right {
       height: 70px;
      width: 130px;
      background: url(../../assets/images/prend/2.png) no-repeat;
      background-size: contain;
    }
  }
}


.integral-right{
  width: 700px;
  height: 500px;
  .top{
    height: 25px;

    width: 100%;
    display: flex;

    p{
      width: 50%;
      font-size: 16px;
      text-align: center;
        line-height: 25px;
      border: black 1px solid;
    }

  }

  .bottom{
    height: 100%;
    width: 100%;
    background: #eeee;
    border: black 1px solid;
    border-top: black 0 solid;
    padding-top: 30px;
    .textimg{
      margin: 0px auto;
      height: 300px;
      width: 300px;
      background: #ffffff;
border:  black 1px solid;
    }

  }

  .btn{
      text-align: center;
    }
}
  #texts{
    text-indent: 2em;
  padding: 0 30px;
  font-size: 14px;
  text-align: start;
}

.integral-left .dataname{
 display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  p{
    text-align: end;
    font-size: 14px;
    padding-right: 25px;
  }
}




</style>
