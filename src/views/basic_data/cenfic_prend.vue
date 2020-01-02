<!-- 证书维护（会员） -->
<template>
  <div class="integral">
    <Navigation :labels="navigation1"></Navigation>
    <div class="integral-header">
      <div class="integral-left">
        <div class="title">
          <img v-if="headimg!=null" style=" width: 488px;" :src="headimg" alt />
          <img v-if="headimg==null" style=" width: 488px;" src="../../assets/images/prend/4.png" />
          <p>志愿服务证明</p>
          <p>CERTIFICATE OF VOLUNTEER SERVICE</p>
          <p style="margin-top:20px;margin-bottom:20px;">
            <Input v-model="value6" type="textarea" :rows="5" placeholder disabled />
          </p>
          <img v-if="footimg!=null" style=" width: 488px;" :src="footimg" alt class="fot" />
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
          <p :class="i===1?'active':'default'">
            <a href="javascript:;" @click="showUpload(1)">更换LOGO</a>
          </p>
          <p :class="i===2?'active':'default'">
            <a href="javascript:;" @click="showUpload(2)">更换页尾</a>
          </p>
        </div>
        <div class="bottom">
          <!-- <div class="textimg">
          </div>
          <h5>图片最大为*</h5>-->
          <div class="box" v-show="i == 1">
            <div class="uploads" v-if="headimg == null">
              <div class="file" @click="()=>{ this.$refs.files.click()}">
                <input
                  type="file"
                  style=" display:none;"
                  accept=".jpg, .JPG, .gif, .GIF, .png, .PNG, .bmp, .BMP"
                  ref="files"
                  @change="uploadFile('headimg','logoPic',$event)"
                />
                <Icon type="md-cloud-upload" :size="50" color="#FF565A" />
              </div>
            </div>
            <img class="imgs" style="width:300px;margin:0 auto;" v-else :src="headimg" />
            <Icon
              type="ios-trash"
              color="#FF565A"
              v-if="!show && headimg != null"
              size="24"
              class="cancel"
              @click="cancelImg('logoPic')"
            />
          </div>
          <div class="box" v-show="i == 2">
            <div class="upload" v-if="footimg == null">
              <div class="file" @click="()=>{ this.$refs.filess.click()}">
                <input
                  type="file"
                  style=" display:none;"
                  accept=".jpg, .JPG, .gif, .GIF, .png, .PNG, .bmp, .BMP"
                  ref="filess"
                  @change="uploadFile('footimg','officeSealPic',$event)"
                />
                <Icon type="md-cloud-upload" color="#FF565A" :size="50" />
              </div>
            </div>
            <img class="imgs" style="width:300px;margin:0 auto;" v-else :src="footimg" />
            <Icon
              type="ios-trash"
              color="#FF565A"
              v-if="!show && footimg != null"
              size="24"
              class="cancel"
              @click="cancelImg('officeSealPic')"
            />
          </div>
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
      i: 1,
      certMouldId: this.$route.query.certMouldId,
      show: false,
      navigation1: {
        head: "证书维护（会员）"
      },
      value8: "",
      value6:
        "  为融爱融乐的心智障碍者融合服务提供了珍贵的__小时的志愿支持。感谢您的诚恳用心和专业态度，与我们一起协助心智障碍者更好的融入和参与社会，提升他们的生活品质。给我们信心与力量，让更多人看见生命的多元，让我们的社会更平等、文明、融合。期待未来与您继续携手前行，谨此表达最诚挚的感谢与祝福",
      loading: false
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
      // console.log(this.logoPic, this.officeSealPic);
      if (!this.logoPic || !this.officeSealPic) {
        this.$Message.warning("logo或者尾部照片没有选择");
        return;
      }
      this.loading = true;
      let args = {
        certMouldId: this.certMouldId,
        logoPic: this.logoPic,
        officeSealPic: this.officeSealPic
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
    .title-imgs {
    }
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
</style>
