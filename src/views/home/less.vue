<!-- 账户设置 -->
<template>
  <div class="less">
    <Navigation :labels="navigation1"></Navigation>
    <div class="zh">
      <p class="zh-sz">账户设置</p>
      <div class="zh-nr">
        <div class="img"><img :src=uploadpath /></div>
        <Upload action="//jsonplaceholder.typicode.com/posts/" :on-success="handleSuccess">
        <Button icon="ios-cloud-upload-outline">上传头像</Button>
    </Upload>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
          <FormItem label="用户名" prop="name">
            <Input v-model="formValidate.name"></Input>
          </FormItem>
          <FormItem label="手机号" prop="mail">
            <Input v-model="formValidate.mail"></Input>
          </FormItem>
          <FormItem label="旧密码" prop="city">
            <Input v-model="formValidate.mail"></Input>
          </FormItem>
          <FormItem label="新密码" prop="city">
            <Input v-model="formValidate.mail"></Input>
          </FormItem>
          <FormItem label="确认密码" prop="city">
            <Input v-model="formValidate.mail"></Input>
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
export default {
  data() {
    return {
      navigation1: {
        head: "账户设置"
      },
      formValidate: {
        name: "",
        mail: "",
        city: ""
      },
      uploadpath:'',
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "会费期限不能为空并且只能是数字",
            trigger: "change",
            type: "number",
            pattern: /^[a-z0-9]+$/,
            transform(value) {
              return Number(value);
            }
          }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ]
      }
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },

    //图片上传
    handleSuccess(res,file){
      this.uploadpath= file.name
      console.log(res,file)
    }
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
