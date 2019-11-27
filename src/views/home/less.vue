<!-- 账户设置 -->
<template>
  <div class="less">
    <Navigation :labels="navigation1"></Navigation>
    <div class="zh">
      <p class="zh-sz">账户设置</p>

      <div class="zh-nr">
         <div class="start-wap">
              <div class="upload" v-if="imgUrl == null" @click="()=>{ this.$refs.files.click()}">
                <div class="file" >
                  <input
                    style=" display:none;"
                    type="file"
                    accept=".jpg, .JPG, .gif, .GIF, .png, .PNG, .bmp, .BMP"
                    ref="files"
                    @change="uploadFile()"
                    multiple
                  />
                  <Button icon="ios-cloud-upload-outline" >上传头像</Button>
                  <!-- <Icon type="md-cloud-upload" :size="36" color="#2d8cf0" /> -->
                </div>
              </div>

              <img  :src=imgUrl style="height:150px;width:150px;"/>
              <Icon
                type="ios-trash"
                v-if="imgUrl != null"
                class="cancel"
                :size="26"
                @click="cancelImg()"
              />
            </div>

        <!-- <div class="img">
          <img :src="imgUrl" class="img" />
        </div>
        <Upload
          :action="orgimg"
          :format="['jpg','jpeg','png']"
          :show-upload-list="false"
          :before-upload="handleBeforeUpload"
        >
          <Button icon="ios-cloud-upload-outline">上传头像</Button>
        </Upload> -->
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
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
            <Input v-model="formValidate.newPassword" />
          </FormItem>
          <FormItem label="确认密码" prop="confirm">
            <Input v-model="formValidate.confirm" />
          </FormItem>
          <FormItem>
            <Button type="success" @click="handleSubmit('formValidate')">提交</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Setup,orgimgdel} from "../../request/api";
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
        number: this.$store.state.tel,
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

      picUrl: null,
      imgUrl:null
    };
  },

  components: {},

  computed: {},

  created() {},
  mounted() {

  },

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
          if (this.file == null) {
            this.$Message.error("请上传图片！");
          } else {
            // if(this.formValidate.oldPassword!=this.formValidate.confirm){
            //   this.$Message.error('两次密码不一致!')
            // }else{
            //  this.getSetup();
            // }
            this.getSetup();
          }
        } else {
          // this.$Message.error("必填项未填!");
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
          this.picUrl = null;
          this.imgUrl = null;
        } else {
          this.$Message.success(res.msg);
        }
      });
    },
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
  .zh-sz {
    height: 50px;
    padding-left: 20px;
    font-size: 12px;
    background: #f3f3f3;
    line-height: 50px;
    border: #e4e4e4 solid 1px;
    margin-top: 20px;
  }
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
</style>
