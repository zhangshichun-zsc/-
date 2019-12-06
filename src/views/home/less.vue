<!-- 账户设置 -->
<template>
  <div class="less">
    <Navigation :labels="navigation1"></Navigation>
    <div class="zh">
      <div class="zh-nr">
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="120"
        >
          <FormItem label="上传头像">
            <div class="start-wap">
              <!-- v-if="imgUrl == null" -->
              <div
                class="upload"
                @click="
                  () => {
                    this.$refs.files.click();
                  }
                "
              >
                <div class="file">
                  <input
                    style="display:none; width:0; hidht:0"
                    type="file"
                    accept=".jpg, .JPG, .gif, .GIF, .png, .PNG, .bmp, .BMP"
                    ref="files"
                    @change="uploadFile()"
                    multiple
                  />
                  <!-- <Button icon="ios-cloud-upload-outline">上传头像</Button> -->
                  <!-- <Icon type="md-cloud-upload" :size="36" color="#2d8cf0" /> -->
                  <img
                    v-show="imgUrl"
                    :src="imgUrl || null"
                    style="height:104px;width:104px;"
                  />
                  <div v-show="!imgUrl" class="file-text">
                    <img src="@/assets/images/fix-img.png" />
                  </div>
                  <Icon
                    type="ios-trash"
                    v-show="imgUrl !== ''"
                    class="cancel"
                    :size="26"
                    @click.stop.prevent="cancelImg()"
                  />
                </div>
              </div>
            </div>
          </FormItem>

          <FormItem label="用户名">
            <Input v-model="formValidate.name" disabled />
          </FormItem>
          <FormItem label="手机号" prop="number">
            <Input v-model="formValidate.number" disabled />
          </FormItem>
          <FormItem label="旧密码" prop="oldPassword">
            <Input v-model="formValidate.oldPassword" />
          </FormItem>
          <FormItem label="新密码" prop="newPassword">
            <Input type="password" v-model="formValidate.newPassword" />
          </FormItem>
          <FormItem label="确认密码" prop="confirm">
            <Input type="password" v-model="formValidate.confirm" />
          </FormItem>
          <FormItem>
            <Button type="success" @click="handleSubmit('formValidate')"
              >提交</Button
            >
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Setup, orgimgdel } from "../../request/api";
import { upload } from "../../request/http";
export default {
  data() {
    const newPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请重新输入密码!"));
      } else {
        if (this.formValidate.confirm !== "") {
          // 对第二个密码框单独验证
          this.$refs.formValidate.validateField("confirm");
        }
        callback();
      }
    };
    const confirm = (rule, value, callback) => {
      if (value === "") {
        // callback(new Error('请重新输入密码!'));
      } else if (value !== this.formValidate.newPassword) {
        callback(new Error("两个输入密码不匹配!"));
      } else {
        callback();
      }
    };
    return {
      navigation1: {
        head: "账户设置"
      },
      formValidate: {
        name: this.$store.state.userName,
        number: this.$store.state.tel ? this.$store.state.tel : "",
        oldPassword: "",
        newPassword: "",
        confirm: ""
      },
      uploadpath: "",
      ruleValidate: {
        oldPassword: [
          {
            required: true,
            message: "旧密码不能为空",
            trigger: "blur"
          }
        ],
        newPassword: [{ validator: newPassword, trigger: "blur" }],
        confirm: [{ validator: confirm, trigger: "blur" }]
      },

      picUrl: "",
      imgUrl: ""
    };
  },

  components: {},

  computed: {},

  created() {},
  mounted() {},

  methods: {
    //提交
    getSetup() {
      Setup({
        userId: this.$store.state.userId,
        oldPassword: this.formValidate.oldPassword,
        newPassword: this.formValidate.newPassword,
        picUrl: this.picUrl
      }).then(res => {
        if (res.code == 200) {
          this.$Message.success("修改成功!");
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.picUrl);

          // if(this.formValidate.oldPassword!=this.formValidate.confirm){
          //   this.$Message.error('两次密码不一致!')
          // }else{
          //  this.getSetup();
          // }
          this.getSetup();
        } else {
          this.$Message.error("必填项未填!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
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
          this.imgUrl = e.target.result;
          this.picUrl = res.data;
        };
      });
    },
    //删除图片
    cancelImg() {
      orgimgdel({ path: this.picUrl }).then(res => {
        if (res.code == 200) {
          this.$Message.success("删除成功");
          this.picUrl = "";
          this.imgUrl = "";
        } else {
          this.$Message.success(res.msg);
        }
      });
    }
    // // handleSuccess(res, file) {
    // //   this.picUrl = res.data;
    // //   console.log(res, file);
    // // },

    // //图片上传
    // handleBeforeUpload(file) {
    //   console.log(file);
    //   if (file.type == "image/jpeg") {
    //     this.file = file;
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //       const _base64 = reader.result;
    //       this.imgUrl = _base64;
    //       this.picUrl = file.name;
    //       // console.log(_base64,file.name);
    //     };
    //     return false;
    //   } else {
    //     // this.file = "";
    //     this.$Message.error("格式不正确！");
    //   }
    // }
  }
};
</script>
<style lang="scss" scoped>
.zh {
  background: #fff;
  padding-bottom: 50px;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
}
.zh-nr {
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  .img {
    height: 150px;
    width: 150px;
    border: 1px solid #ccc;
  }
}
.file {
  height: 150px;
  position: relative;
}
.cancel {
  position: absolute;
  bottom: 5px;
  left: 5px;
  z-index: 2;
}
.file-text {
  width: 150px;
  height: 150%;
  font-size: 14px;
  color: #1b2331;
  text-align: justify;
  line-height: 24px;
  img {
    width: 100%;
  }
}
.ivu-input {
  width: 240px;
  height: 40px;
}
.ivu-btn-ghost {
  color: green;
}
.ivu-input-type {
  width: 230px;
  height: 40px;
}

input:-webkit-autofill {
  background-color: #fff;
  outline: none;
  color: #333333;
  -webkit-box-shadow: 0 0 0px 1000px #ffffff inset;
}
</style>
