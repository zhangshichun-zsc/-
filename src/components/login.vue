<!-- 基础资料(共用) -->
<template>
  <div class='box'>

    <img class='banner' src='@/assets/images/banner.png' />
    <div class="login">

      <div class="form">
        <Form ref="formValidate" :model="formValidate" :rules="ruleInline" inline :show-message="false" :label-width="80">
          <p class="text">后台管理系统</p>

          <FormItem prop="user">

            <Input prefix="md-person" type="text" size="large" style="width:240px;" v-model="formValidate.user" placeholder="请输入用户名称" @on-enter="handleSubmit('formValidate')" />

          </FormItem>

          <FormItem prop="password">
            <Input prefix="ios-unlock" type="password" size="large" style="width:240px; " v-model="formValidate.password" placeholder="请输入登陆密码" @on-enter="handleSubmit('formValidate')" />

          </FormItem>
          <FormItem>
            <Button type="warning" size=default @click="handleSubmit('formValidate')" style="width:240px; height:40px">登录</Button>

          </FormItem>
        </Form>
      </div>

    </div>
  </div>

</template>

<script>
import { login,homepage } from '../request/api'
export default {
  data() {
    return {
      formValidate: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 1,
            message: 'The password length cannot be less than 6 bits',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  components: {},

  computed: {},

  created() {},
  mounted() {},
  methods: {
    getlogin() {
      login({
        loginName:this.formValidate.user,
        loginPwd:this.formValidate.password
      }).then(res=>{
        if(res.code==200){
          localStorage.setItem("token",res.data.token)
          localStorage.setItem("userId",res.data.userId)
          localStorage.setItem("userName",res.data.userName)
          localStorage.setItem("tel",res.data.tel)
          this.$router.push({ name: "index"});
          // this.gethomepage()
        }else{
          this.$Message.info("密码或账号不正确!")
        }
      })
    },

    gethomepage() {
      homepage({
        userId: localStorage.getItem('userId')
      }).then(res => {
        if (res.code == 200) {
          // this.routelist = res.data
           window.sessionStorage.setItem('routelist', res.data)
        }
        console.log(res)
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getlogin()
        } else {
          this.$Message.error('请输入密码或账号!')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.ivu-input-large {
  height: 90px !important;
}
.box {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #c11333;
}
.banner {
  width: 100%;
  height: 100%;

  vertical-align: top;
}

.login {
  position: absolute;

  top: 0;
  right: 250px;
  // background: #fff;
  height: 700px;

  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  display: flex;
  // justify-content: center;
  align-items: center;

  height: 420px;
  width: 520px;
  // background: ;
  box-shadow: -1px 1px 13px 9px #fff;
  .text {
    text-align: center;
    margin-top: 30px;

    color: #000;
    font-size: 32px;
    font-weight: 900;
    margin-bottom: 40px;
  }
  .engin {
    text-align: center;
    margin-bottom: 40px;
    color: #000;
    font-size: 28px;
  }
}
.ivu-input-default {
  height: 50px;
}
.ivu-btn-success {
  height: 40px;
  width: 300px;
}
.ivu-form-item {
  width: 100%;
}
.ivu-input-large {
  height: 45px;
}

.ivu-form-inline .ivu-form-item {
  margin-right: 0;
}
</style>
