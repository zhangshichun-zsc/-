<!--发布资讯(会员)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con flex-start">
        <div class="con-left">
          <div class="title-box flex-start">
            <div class="title flex-center-start">
              <p>
                <Icon style="color: #F9FAFC" type="md-bookmark" />
                <span>基本信息</span>
              </p>
            </div>
            <div class="jiao"></div>
          </div>
        </div>
        <div class="con-right">
          <Form
            style="margin: 0 auto;"
            ref="ContentData"
            :model="ContentData"
            :rules="RuleDate"
          >
            <FormItem label="资讯标题:" prop="title" class="shuru">
              <Input style="width: 15rem" v-model="ContentData.title" />
            </FormItem>
            <FormItem label="资讯描述:" prop="resume" class="shuru">
              <Input style="width: 15rem" v-model="ContentData.resume" />
            </FormItem>
            <!-- <FormItem label="展示窗口:" prop="showLocation">
              <Select v-model="ContentData.showLocation" style="width:200px" :transfer=true>
                <Option v-for="item in showlist" :value="item.dicId" :key="item.dicId">{{ item.dicName }}</Option>
              </Select>
            </FormItem> -->
            <FormItem label="资讯分类:" prop="informationType" class="gg-xz">
              <Select
                v-model="ContentData.informationType"
                style="width:200px"
                :transfer="true"
              >
                <Option
                  v-for="item in typelist"
                  :value="item.dicId"
                  :key="item.dicId"
                  >{{ item.dicName }}</Option
                >
              </Select>
            </FormItem>
            <FormItem label="上线/下线" prop="isOnline" class="asd">
              <RadioGroup v-model="ContentData.isOnline" class="font">
                <Radio label="1">上线</Radio>
                <Radio label="0">下线</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </div>
      </div>
      <div class="con flex-start">
        <div class="con-left">
          <div class="title-box flex-start">
            <div class="title flex-center-start">
              <p>
                <Icon style="color: #F9FAFC" type="md-bookmark" />
                <span>正文</span>
              </p>
            </div>
            <div class="jiao"></div>
          </div>
        </div>
        <div class="con-right">
          <wangeditor
            id="exccccc3"
            :labels="editorContent"
            @change="btn"
          ></wangeditor>
        </div>
      </div>
      <div class="con flex-start">
        <div class="con-left">
          <div class="title-box flex-start">
            <div class="title flex-center-start">
              <p>
                <Icon style="color: #F9FAFC" type="md-bookmark" />
                <span>图片</span>
              </p>
            </div>
            <div class="jiao"></div>
          </div>
        </div>
        <div class="con-right">
           <!-- :picMap="picMap" -->
          <UploadImg
           
            :max="1"
            v-model="picUrl"
            :full-url.sync="picMap"
            :display-width="240"
            :crop-width="750"
            :crop-height="320"
          ></UploadImg>
          <!-- <Modal v-model="modal1" title="从图库选择">
            <p>商品图库>全部图库</p>
          </Modal> -->
          <div class="tj">
            <Button type="error" @click="Submission('ContentData')"
              >提交</Button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wangeditor from "@/components/wangeditor";
import { upload } from "@/request/http";
import {
  inquiryReltype,
  inquiryRelext,
  inquiryRel,
  orgimgdel,
  AddressDetails,
  Addressbatch
} from "@/request/api";
export default {
  data() {
    return {
      name: "editor",
      navigation1: {
        head: "发布资讯(会员)"
      },
      ContentData: {
        title: "",
        resume: "",
        showLocation: 337,
        informationType: ""
      },
      RuleDate: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        resume: [{ required: true, message: "描述不能为空", trigger: "blur" }],
        showLocation: [
          {
            type: "number",
            required: true,
            message: "请选择展示类型",
            trigger: "change"
          }
        ],
        informationType: [
          {
            type: "number",
            required: true,
            message: "请选择资讯类型",
            trigger: "change"
          }
        ]
      },

      editorContent: "",

      sysId: 1,
      typelist: [],
      showlist: [],

      url: "",
      modal1: false,
      picUrl: '',
      picMap: '',
      informationId: this.$route.query.informationId
    };
  },
  components: { wangeditor },
  methods: {
    //资讯类型下拉
    getinquiryReltype() {
      inquiryReltype({
        sysId: this.sysId
      }).then(res => {
        if (res.code == 200) {
          this.typelist = res.data;
        }
        console.log(res);
      });
    },
    //展示窗口下拉
    getinquiryRelext() {
      inquiryRelext({
        sysId: this.sysId
      }).then(res => {
        if (res.code == 200) {
          this.showlist = res.data;
        }
        console.log(res);
      });
    },

    //详情数据
    getAddressDetails() {
      AddressDetails({
        informationId: this.informationId
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          let lists = res.data;
          this.ContentData.title = lists.title;
          this.ContentData.showLocation = Number(lists.showLocation);
          this.ContentData.informationType = lists.informationType;
          this.ContentData.resume = lists.resume;
          this.ContentData.isOnline = lists.isOnline;
          this.picUrl = lists.coverImg;
          this.picMap =  lists.coverImgPath ;
          this.editorContent = lists.content;
        }
      });
    },
    //质询编辑
    getAddressbatch() {
      let obj = {
        informationId: this.informationId,
        userId: this.$store.state.userId,
        title: this.ContentData.title,
        showLocation: this.ContentData.showLocation,
        resume: this.ContentData.resume,
        content: this.editorContent,
        informationType: this.ContentData.informationType,
        isOnline: this.ContentData.isOnline,
        url: this.picUrl.toString()
      };
      Addressbatch(obj).then(res => {
        if (res.code == 200) {
          this.$router.push({ name: "InformationList_hy" });
          this.$Message.info("编辑成功");
        } else {
          this.$Message.info(res.msg);
        }
        console.log(res);
      });
    },
    //资讯发布
    getinquiryRel() {
      let obj = {
        sysId: this.sysId,
        userId: this.$store.state.userId,
        title: this.ContentData.title,
        showLocation: this.ContentData.showLocation,
        resume: this.ContentData.resume,
        content: this.editorContent,
        informationType: this.ContentData.informationType,
        isOnline: this.ContentData.isOnline,
        url: this.picUrl.toString()
      };
      inquiryRel(obj).then(res => {
        if (res.code == 200) {
          this.$router.push({ name: "InformationList_hy" });
          this.$Message.info(res.msg);
        } else {
          this.$Message.info(res.msg);
        }
        console.log(res);
      });
    },

    //图片上传
    uploadFile() {
      let file = this.$refs.files.files[0];
      console.log(file);
      const dataForm = new FormData();
      dataForm.append("file", file);
      upload(dataForm).then(res => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          this.imgs = e.target.result;
          this.url = res.data;
        };
      });
    },
    //删除图片
    cancelImg() {
      if (this.url == null) {
        this.$Message.info("请先上传图片");
      } else {
        orgimgdel({ path: this.url }).then(res => {
          if (res.code == 200) {
            this.$Message.success("删除成功");
            this.imgs = null;
            this.url = null;
          } else {
            this.$Message.success(res.msg);
          }
        });
      }
    },

    //富文本
    btn(e) {
      this.editorContent = e;
    },

    //提交
    Submission(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.url == null) {
            this.$Message.error("请先上传图片");
          } else if (this.editorContent == "") {
            this.$Message.error("专题正文未填");
          } else {
            if (this.informationId != null) {
              this.getAddressbatch();
            } else {
              this.getinquiryRel();
            }
          }
        } else {
          this.$Message.error("必填项未填!");
        }
      });
    }
  },
  mounted() {
    if (this.informationId != null) {
      this.getAddressDetails();
    }

    this.getinquiryReltype();
    this.getinquiryRelext();
  }
};
</script>
<style lang="scss" scoped>
.start-wap {
  position: relative;
  height: 150px;
  width: 150px;
  margin-bottom: 20px;
  .image {
    width: 100%;
    height: 100%;
  }
  .upload {
    width: 100%;
    height: 100%;
  }
  .cancel {
    position: absolute;
    top: 0px;
    z-index: 10;
  }
  .upload .file {
    width: 100%;
    height: 100%;
    border: 1px dashed #ff565a;
    text-align: center;
    line-height: 140px;
  }
  // .upload .file:hover{
  //   border: 1px dashed #FF565A;
  // }
  // .upload .file:hover .ivu-icon{
  //   color: #FF565A !important;
  // }
  .upload .file input {
    display: none;
  }
}
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
}

.content,
.tu {
  border: 1px solid #e4e4e4;
}
.content {
  margin: 1rem auto;
  width: 50rem;
}
.con-left,
.title {
  width: 8rem;
}
.con-right {
  border-left: 1px solid #e4e4e4;
}
.con-left,
.con-right {
  padding-top: 2rem;
  float: left;
}
.title-box {
  position: absolute;
}
.title {
  background-color: #9ea7b4;
  height: 40px;
  color: #f9fafc;
  padding-left: 1rem;
}
.jiao {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent transparent #9ea7b4;
}
.con-right {
  padding-left: 3rem;
  padding-right: 3rem;
  width: 42rem;
}
.tu {
  width: 6rem;
}
.tu {
  text-align: center;
  line-height: 6rem;
}
.tu p {
  border-top: 1px solid #e4e4e4;
  text-align: center;
  line-height: 1.5rem;
  font-size: 12px;
  color: #1abc9c;
}
.Photo-But {
  padding: 0.5rem 0;
  display: flex;
}
.Photo-But button {
  margin-right: 0.5rem;
}
.tj {
  margin-top: 1rem;
  border-top: 1px solid #e4e4e4;
}
.tj button {
  display: block;
  margin: 2rem auto 5rem;
}
</style>
