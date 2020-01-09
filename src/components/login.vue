<!-- 基础资料(共用) -->
<template>
  <div class="box">
    <div class="content">
      <header>
        <span>融合中国 </span><span> | </span
        ><span class="title"> 后台管理系统</span>
      </header>
      <div class="login-box">
        <img src="@/assets/images/login_bg.svg" />
        <div class="login-from">
          <form class="form" autocomplete="off">
            <p>欢迎登录</p>

            <input
              type="text"
              v-model="formValidate.user"
              placeholder="请输入用户名称"
            />

            <input
              type="password"
              v-model="formValidate.password"
              placeholder="请输入登陆密码"
            />
            <a class="login-btn" href="javascript:;" @click="handleSubmit()"
              >登录</a
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, homepage } from "../request/api";
import { axios } from "axios";
export default {
  data() {
    return {
      formValidate: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            type: "string",
            min: 1,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },

  components: {},

  computed: {},

  created() {
    this.util.keydowenter(this, this.getlogin);
  },
  beforeDestroy() {
    this.util.removekeydow();
  },
  mounted() {},
  methods: {
    getlogin() {
      login({
        loginName: this.formValidate.user,
        loginPwd: this.formValidate.password
      }).then(res => {
        if (res.code == 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("userName", res.data.userName);
          localStorage.setItem("tel", res.data.tel);
          /**
           * ! 将数据保存在vux中
           */
          this.$store.commit("setToken", { ...res.data });
          this.gethomepage(res.data.userId);
        } else {
          this.$Message.info("密码或账号不正确!");
        }
      });
    },
    gethomepage(userId) {
      homepage({
        userId
      }).then(res => {
        if (res.code == 200) {
          if (res.data.length > 0) {
            let pathUrl = res.data[0].list[0].url;
            this.$router.push({ name: pathUrl });
          } else {
            this.$Message.error("该账号无任何权限，请联系系统管理员！");
          }
        }
      });
    },

    handleSubmit() {
      if (this.formValidate.user && this.formValidate.password) {
        this.getlogin();
      } else {
        this.$Message.error("请输入密码或账号!");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.ivu-input-large {
  height: 90px !important;
}
.box {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #f2f2f2;
  padding-top: 180px;
}
header {
  margin: 0 auto;
  text-align: center;
  span {
    font-size: 40px;
    color: #c11333;

    font-weight: 800;
  }
  .title {
    color: #001c00;
  }
}
.login-box {
  display: flex;

  justify-content: center;
  margin-top: 80px;
  img {
    width: 443px;
    height: 562px;
    vertical-align: middle;
  }
  .login-from {
    width: 443px;
    height: 562px;
    background: #ffffff;
    box-shadow: 0 3px 4px 0 rgba(188, 200, 219, 0.23);
    border-radius: 0px 23px 23px 0px;

    .form {
      padding-top: 72px;
    }
    p {
      text-align: center;
      font-size: 36px;
      color: #333333;
      font-weight: 800;
      margin-bottom: 72px;
    }

    input {
      padding: 0 5px;
      display: block;
      margin: 0 auto;
      width: 354px;
      height: 60px;
      font-size: 16px;
      color: #333333;
      background: #fff;
      line-height: 60px;
      outline: none;
      border: 0;
      border-bottom: 1px solid #fe6472;
      border-radius: 0.27px;
    }
  }
}

input:-webkit-autofill {
  background-color: #fff;
  outline: none;
  color: #333333;
  -webkit-box-shadow: 0 0 0px 1000px #ffffff inset;
}
.login-btn {
  display: block;
  background-image: linear-gradient(90deg, #ff6877 0%, #fc494d 100%);
  box-shadow: 0 4px 5px 0 rgba(255, 98, 111, 0.43);
  border-radius: 24.5px;
  width: 350px;
  height: 48px;
  margin: 0 auto;
  margin-top: 50px;
  text-align: center;
  line-height: 48px;
  font-size: 18px;
  color: #ffffff;
}
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
