<!-- 验证码设置(共用) -->
<template>
  <div class="integral">
    <div class="integral-header">
       <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <span>验证码设置</span>
        </div>
      </div>
    </div>
    <div class="integral-table">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="180" >
        <FormItem label="启用验证码" prop="EnableCaptcha">
            <CheckboxGroup>
             <Checkbox>新用户注册</Checkbox><br>
             <Checkbox>用户登录</Checkbox><br>
             <Checkbox>发表相关评论</Checkbox><br>
             <Checkbox>后台系统登录</Checkbox>
            </CheckboxGroup>
             <p>启用验证码可以避免恶意批量评论或提交信息，推荐打开验证码功能。注意: 启用验证码会使得部分操作变得繁琐，建议仅在必需时打开</p>
        </FormItem>
        <FormItem label="登录失败时显示验证码" prop="DisplayCaptcha">
            <RadioGroup>
                 <Radio label="关闭"></Radio>
                 <Radio label="开启"></Radio>
            </RadioGroup>
            <p>选择“是”将在用户登录失败 3 次后才显示验证码，选择“否”将始终在登录时显示验证码。注意: 只有在启用了用户登录验证码时本设置才有效</p>
        </FormItem>
        <FormItem label="验证码方式" prop="CaptchaMode">
             <RadioGroup>
                 <Radio label="图形验证码"></Radio>
                 <Radio label="滑动验证码"></Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="图形验码宽度" prop="imgwidth">
             <Input v-model="formValidate.imgwidth"></Input>
             <p>验证码图片的宽度，范围在 40～145 之间</p>
        </FormItem>
        <FormItem label="图形验码高度" prop="imgheight">
             <Input v-model="formValidate.imgheight"></Input>
          <p>验证码图片的高度，范围在 15～50 之间</p>
        </FormItem>
        <FormItem label="图形验证码内容大小" prop="imgcontent">
             <Input v-model="formValidate.imgcontent"></Input>
          <p>验证码内容大小，范围在16-20之间</p>
        </FormItem>
        <FormItem label="图形验证码位数" prop="imgnumber">
             <Input v-model="formValidate.imgnumber"></Input>
          <p>图形验证码位数，范围4-6之间</p>
        </FormItem>
         <FormItem label="图形验证码" >
            <div class="code" @click="refreshCode">
             <sidentify :identifyCode="identifyCode"></sidentify>
           </div>
        </FormItem>
        <FormItem>
            <Button type="success" @click="handleSubmit('formValidate')">提交</Button>
        </FormItem>
    </Form>
    </div>
  </div>
</template>

<script>
export default {
  name: "codetest",
  data() {
    return {
       identifyCodes: "1234567890",
       identifyCode: "",
       navigation1: {
        head: "验证码设置(共用)",
       },
           formValidate: {
                    imgwidth: '',
                    imgheight: '',
                    imgcontent: '',
                    imgnumber: '',
                },
                ruleValidate: {
                    EnableCaptcha: [
                      { required: true, message: '请选择至少一个选项', trigger: 'blur' },
                    ],
                    DisplayCaptcha: [
                      { required: true, message: '请选择关闭/开启', trigger: 'blur' },
                    ],
                    CaptchaMode: [
                      { required: true, message: '请选择验证方式', trigger: 'blur' },
                    ],
                    imgwidth: [
                        { required: true, message: '图形验码宽度不能为空', trigger: 'blur' },
                        { type: 'string', min: 40, max: 145,message: '验证码图片的宽度，范围在 40～145 之间', trigger: 'blur' }
                    ],
                    imgheight: [
                        { required: true, message: '图形验码高度不能为空', trigger: 'blur' },
                        { type: 'string', min: 15, max: 50, message: '验证码图片的高度，范围在 15～50之间', trigger: 'blur' }
                    ],
                    imgcontent: [
                        { required: true, message: '图形验证码内容大小不能为空', trigger: 'blur' },
                        { type: 'string', min: 16, max: 20, message: '验证码内容大小，范围在16-20之间', trigger: 'blur' }
                    ],
                    imgnumber: [
                        { required: true, message: '图形验证码位数不能为空', trigger: 'blur'},
                        { type: 'string', min: 4, max: 6, message: '图形验证码位数，范围4-6之间', trigger: 'blur' }
                    ]
                },
      data: [
       ]
    };
  },

  components: {},

  computed: {},

  created() {},

  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
         handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('提交失败！');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
             history(){
              this.$router.go(-1);
            },
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
           },
             refreshCode() {
                 this.identifyCode = "";
                 this.makeCode(this.identifyCodes, 4);
           },
         makeCode(o, l) {
            for (let i = 0; i < l; i++) {
              this.identifyCode += this.identifyCodes[
                this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    }
  }
};
</script>
<style scoped>
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  padding: 15px 20px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
}

.integral-table {
  margin-top: 30px;
   display: flex;
  flex-direction: column;
  align-items: center;
}
.table-header {
  padding: 5px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.integral-table p{
    color: #c2bdbd
}
.code {
  width: 114px;
  height: 40px;
}
</style>
