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
            <!-- :picMap="picMap" -->
            <UploadImg
              :max="1"
              v-model="picUrl"
              :full-url.sync="picMap"
              :display-width="120"
              :crop-width="120"
              :crop-height="120"
            ></UploadImg>
          </FormItem>

          <FormItem label="用户名">
            <Input v-model="formValidate.name" disabled />
          </FormItem>
          <FormItem label="手机号" prop="number">
            <Input v-model="formValidate.number" disabled />
          </FormItem>
          <FormItem label="旧密码" prop="oldPassword">
            <Input type="password" v-model="formValidate.oldPassword" />
          </FormItem>
          <FormItem label="新密码" prop="newPassword">
            <Input type="password" v-model="formValidate.newPassword" />
          </FormItem>
          <FormItem label="确认密码" prop="confirm">
            <Input type="password" v-model="formValidate.confirm" />
          </FormItem>
          <FormItem>
            <a
              href="javascript:;"
              class="adduserbtn"
              @click="handleSubmit('formValidate')"
            >
              提交
            </a>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Setup, orgimgdel, loginout, queryUserDetail } from "../../request/api";
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
        name: "",
        number:
          this.$store.state.tel && this.$store.state.tel !== "undefined"
            ? this.$store.state.tel
            : "",

        oldPassword: "",
        newPassword: "",
        confirm: ""
      },
      ruleValidate: {
        oldPassword: [
          {
            required: true,
            message: "旧密码不能为空",
            trigger: "blur"
          }
        ],
        newPassword: [
          { required: true, validator: newPassword, trigger: "blur" }
        ],
        confirm: [{ required: true, validator: confirm, trigger: "blur" }]
      },
      picUrl: '',
      picMap: '',
      formFlag: true
    };
  },

  components: {},

  computed: {},

  created() {},
  mounted() {
    this.getUserInfo();
  },

  methods: {
    // 获取当前账号的 头像姓名
    getUserInfo() {
      let userId = this.$store.state.userId;
      if (!userId) {
        this.$router.push({ name: "login" });
      }
      queryUserDetail({ userId: userId }).then(res => {
        this.formValidate.name = res.data.userName;
        this.picMap =  res.data.avatarPath ;
        this.picUrl = res.data.avatar;
      });
    },
    //提交
    getSetup() {
      Setup({
        userId: this.$store.state.userId,
        oldPassword: this.formValidate.oldPassword,
        newPassword: this.formValidate.newPassword,
        picUrl: this.picUrl.toString()
      }).then(res => {
        if (res.code == 200) {
          this.$Message.success("修改成功!");
          loginout({
            userId: this.$store.state.userId
          }).then(res => {
            if (res.code == 200) {
              this.$store.commit("clearToken");
              this.$router.push({ name: "login" });
            }
          });
        } else {
          this.$Message.error(res.msg);
        }
        this.formFlag = true;
      });
    },

    handleSubmit(name) {
      if (!this.formFlag) return;
      this.$refs[name].validate(valid => {
        if (valid) {
          this.formFlag = false;
          this.getSetup();
        } else {
          this.$Message.error("必填项未填!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
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
  // height: 150px;
  position: relative;
}
.cancel {
  position: absolute;
  top: 10px;
  right: -35px;
  z-index: 2;
  color: #ff565a;
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
.adduserbtn {
  display: block;
  width: 110px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: #ff565a;
  border-radius: 15px;
  font-size: 14px;
  color: #ffffff;
}
.updataimg {
  position: relative;
}
.updataimg-icon {
  color: #ff565a;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translateX(-50%);
}
</style>
