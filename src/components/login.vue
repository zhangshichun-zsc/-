<!-- 基础资料(共用) -->
<template>
  <div class="login">
    <div class="form">
      <Form ref="formValidate" :model="formValidate" :rules="ruleInline" inline :show-message="false" :label-width="80">
        <p class="text">后台管理系统</p>
        <p class="engin">Management System</p>
        <FormItem  prop="user">

           <Input prefix="md-person" type="text" size="large" style="width:300px;height:45px;" v-model="formValidate.user" placeholder="请输入用户名称"/>
                <!-- <Icon type="ios-person-outline" slot="prepend"></Icon> -->


        </FormItem>

        <FormItem  prop="password">
          <Input  prefix="ios-unlock" type="password" size="large" style="width:300px" v-model="formValidate.password" placeholder="请输入登陆密码"/>



        </FormItem>
        <FormItem>

          <Button type="success"  size=default @click="handleSubmit('formValidate')">登陆</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { login } from '../request/api'
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
  mounted(){

  },
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
        }else{
          this.$Message.info("密码或账号不正确!")
        }
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getlogin()
        } else {
          this.$Message.error('密码或账号不正确!')
        }
      })
    },

  }
}
</script>
<style lang="scss" scoped>
.login {
  background: #008e40;
  height:700px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  display: flex;
  // justify-content: center;
  align-items: center;
  background: #ffffff;
  height: 420px;
  width: 420px;
  .text{
     text-align: center;
    margin-top: 30px;
     margin-bottom: 10px;
    color: #008e40;
    font-size: 32px;
    font-weight: 900;
  }
  .engin{
    text-align: center;
    margin-bottom: 40px;
    color: #008e40;
    font-size: 28px;

  }
}
.ivu-input-default{
  height: 50px;
}
.ivu-btn-success{
  height: 40px;
  width: 300px;
}
.ivu-form-item{
  width: 100%;
}
.ivu-input-large{
  height: 45px;
}
</style>
