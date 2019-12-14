<!-- 证书维护（志愿者） -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="integral-left">
        <div class="imgs"></div>
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
        head: "积分查询(会员)"
      }
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
.integral-header{
  position: relative;
  height: 1000px;
}
.integral-left {
  position: absolute;
  z-index: 2;
  width: 530px;
  height: 830px;
  left: 0;
  top: 60px;
  background: url(../../assets/images/prend/vun.png) no-repeat;
  background-size: contain;

  .imgs {
    position: absolute;
    top: 20px;
    left: 23px;
    z-index: 3;
    width: 488px;
    height: 230px;
    background: url(../../assets/images/prend/4.png) no-repeat;
    background-size: contain;
  }
}
</style>
