<!-- 平台信息(共用) -->
<template>
  <div class="integral">
    <div class="integral-header">
       <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <span>平台信息设置</span>
        </div>
      </div>
    </div>
    <div class="integral-table">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150" >
        <FormItem label="平台名称" prop="name" >
            <Input v-model="formValidate.name"  style="width:300px"></Input>
        </FormItem>
        <FormItem label="平台标题" prop="title">
            <Input v-model="formValidate.title" ></Input>
        </FormItem>
        <FormItem label="平台描述" prop="desripe">
             <Input v-model="formValidate.desripe"></Input>
        </FormItem>
        <FormItem label="关键词" prop="keyword">
             <Input v-model="formValidate.keyword"></Input>                   
        </FormItem>
         <FormItem label="平台LOGO" prop="upload">
            <Upload action="//jsonplaceholder.typicode.com/posts/" v-model="formValidate.upload">
                <Button icon="ios-cloud-upload-outline">选择上传文件</Button>
            </Upload>
            <p class="font">只能上传jpg/png格式文件，文件不能超过50kb</p>
        </FormItem>
         <FormItem label="客服热线" prop="link">
            <Input v-model="formValidate.link"></Input>
        </FormItem>
         <FormItem label="客服邮箱" prop="email">
            <Input v-model="formValidate.email"></Input>
        </FormItem>
        <FormItem label="排序" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入内容"></Input>
            <p class="font">该信息将在用户中心欢迎页面显示</p>
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
        head: "平台信息(共用)",
       },
           formValidate: {
                    name: '',
                    title: '',
                    desripe: '',
                    keyword: '',
                    email: '',
                    desc: '',
                    link:''

                },
                ruleValidate: {
                    name: [
                        { required: true, message: '平台名称不能为空', trigger: 'blur' }
                    ],
                    link: [
                        { required: true, message: '客户热线不能为空', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '平台标题不能为空', trigger: 'blur' },
                    ],
                    desripe: [
                        { required: true, message: '平台描述不能为空', trigger: 'blur'},
                    ],
                    keyword: [
                        { required: true, message: '关键次不能为空', trigger: 'blur'},
                    ],
                    upload: [
                      { required: true, trigger: 'blur'}
                    ],
                    email: [
                        { required: true, message: '客户邮箱不能为空', trigger: 'blur'},
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
.font{
  color: #9EA7B4;

}

</style>
