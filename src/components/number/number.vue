<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label prop="number">
      <Input v-model="formValidate.number"></Input>
    </FormItem>
  </Form>
</template>

<script>
export default {
  data() {
    var checknumber = (rule, value, cb) => {
      //验证数字正则
      const regnumber = /^([1-9][0-9]*)+(.[0-9]{1,2})?$/;
      if (regnumber.test(value)) {
        return cb();
      }
      cb(new Error("请输入正确的数字格式"));
    };
    return {
      formValidate: {
        number: ""
      },
      ruleValidate: {
        number: [
          { required: true, message: "输入框不能为空", trigger: "blur" },
          { validator: checknumber, trigger: "blur" }
        ]
      }
    };
  }
};
</script>