<!-- 基础资料(共用) -->
<template>
  <div class="login">
    <div class="form">
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleInline"
      inline
      :show-message="false"
       :label-width="140"
    >
    <p>后台管理系统</p>

      <FormItem label="用户名" prop="user">
        <Input v-model="formValidate.user" placeholder="Enter your name" ></Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input v-model="formValidate.password" placeholder="Enter your e-mail"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">登陆</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
    </div>
  </div>
</template>

<script>
import {login} from '../request/api'
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
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
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

  created() {},

  methods: {
    getlogin(){
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
        console.log(res.data)
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getlogin()
        } else {
          this.$Message.error("密码或账号不正确!");
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
.login {
  background: #008E40;
  height: 700px;
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
  p{
    text-align: center;
    margin: 30px 0;
    color: #008E40;
    font-size: 18px;
    font-weight: 900;
  }
}
</style>
