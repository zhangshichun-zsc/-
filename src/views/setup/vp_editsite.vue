<!-- 消息模板编辑-站内消息（会员） -->
<template>
  <div class="integral">
    <div class="integral-header">
       <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <p>站内消息</p>
        </div>
          <div>
        <Button  @click="history" size="small">
          <Icon type="ios-arrow-back" size='10'  />
          返回
        </Button>
        </div>
      </div>
    </div>
    <div class="integral-table">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" >
        <FormItem label="消息类型">
            <span>活动报名时</span>
        </FormItem>
        <FormItem label="标签说明">
            <Tag>用户名：$Username$</Tag>
            <Tag>发起方：$OrderId$</Tag>
            <Tag>活动地点：$Total$</Tag>
            <Tag>活动名称：$Shipping_Type$</Tag>
            <Tag>活动日期：$Shipping_Name$</Tag>
        </FormItem>
        <FormItem label="站内信标题" prop="site">
            <Input v-model="formValidate.site" ></Input>
        </FormItem>
        <FormItem label="内容模板" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="您报名的 @在@举行的@活动已经报名成功。请您准时于@日@地点参加。如不能参加活动，请您点击@取消。"></Input>
            <span>内容不能为空，长度限制在1-300个字符之间</span>
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
        head: "消息模板编辑-站内消息（会员）",
       },
           formValidate: {
                    name: '',
                    desc: '',
                    site:''

                },
                ruleValidate: {
                    name: [
                        { required: true, message: '消息类型不能为空', trigger: 'blur' }
                    ],
                    site: [
                        { required: true, message: '站内标题不能为空', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '内容不能为空', trigger: 'blur' },
                        { type: 'string', min: 20, message: '不能少于20个字', trigger: 'blur' }
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
span{
  color: #ccc;
}

</style>
