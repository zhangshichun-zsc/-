<!-- 新建协议（会员） -->
<template>
  <div class="integral">
    <div class="integral-header">
       <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <span>新建协议</span>
        </div>
      </div>
    </div>
    <div class="integral-table">
 
    </div>
     <Table border :columns="columns1" :data="data1"></Table><br>
    <Upload action="//jsonplaceholder.typicode.com/posts/">
        <Button icon="ios-cloud-upload-outline">上传附件</Button>
    </Upload>
    <Button align="center" type="success">保存</Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
       navigation1: {
        head: "新建协议（会员）",
       },
        columns1: [
                    {
                        title: '甲方',
                        key: 'jia',
                        width:'160',
                        align:'right'
                    },
                    {
                        title: ' ',
                        key: ''
                    }
                
                ],
      data1: [
                {
                  jia:"乙方",
                },
                {
                  jia:"协议分类",
                },
                {
                  jia:"所属项目",
                },
                {
                  jia:"协议时间",
                }
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
