<!-- 添加分类(共用) -->
<template>
  <div class="integral">
    <div class="integral-header">
       <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <span>添加分类</span>
        </div>
      </div>
    </div>
    <div class="integral-table">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" >
        <FormItem label="分类名称" prop="classname" >
            <Input v-model="formValidate.classname"  style="width:300px"></Input>
        </FormItem>
        <FormItem label="数量单位" >
            <Input></Input>
        </FormItem>
        <FormItem label="排序">
             <Input></Input>
        </FormItem>
        <FormItem label="是否显示">
          <RadioGroup>
              <Radio>
                  <span>是</span>
              </Radio>   
              <Radio>
                  <span>否</span>
              </Radio>   
          </RadioGroup>               
        </FormItem>
         <FormItem label="分类图标" >
            <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button icon="ios-cloud-upload-outline">选择上传文件</Button>
                <p style="color:#ccc">图标尺寸为18*18比例，大小不能超过200KB，图片只能为jpg、png、gif格式</p>
            </Upload>
        </FormItem>
        <FormItem label="分类描述">
            <Input  type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入内容"></Input>
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
  data() {
    return {
       navigation1: {
        head: "添加分类(共用)"
       },
           formValidate: {
                    classname: ''
                },
                ruleValidate: {
                    classname: [
                        { required: true, message: '分类名称不能为空', trigger: 'blur' }
                    ]
                },
      data: [
       ]
    };
  },

  components: {},

  computed: {},

  created() {},

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
            }
  }
};
</script>
<style lang="scss" scoped>
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
</style>
