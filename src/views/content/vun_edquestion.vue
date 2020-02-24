<!-- 问卷调查（志愿者） -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <span>问卷调查</span>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
            <Form :model="formItem" :label-width="80">
               <FormItem label="问卷简介" >
                  <Input v-model="formItem.textarea"type="textarea" style="width: 500px" :autosize="{minRows: 5,maxRows: 5}"  ></Input>
               </FormItem>
                <FormItem label="问卷内容">
                   <span>1、最近半年，你是否有参与融融活动？</span><br>
                    <RadioGroup v-model="formItem.radio">
                        <Radio label="true">是</Radio>
                        <Radio label="false">否</Radio>
                   </RadioGroup>
                   <Button class="icon"><Icon type="md-add" size="18"/></Button>
              </FormItem>
                <FormItem >
                   <span>2、你对哪类活动感兴趣？ （*可多选）</span><br>
                   <CheckboxGroup v-model="formItem.checkbox">
                         <Checkbox label="快乐活动营"></Checkbox>
                         <Checkbox label="支持性就业"></Checkbox>
                         <Checkbox label="自倡导小组"></Checkbox>
                         <Checkbox label="趾印计划"></Checkbox>
                    </CheckboxGroup>
                    <Button class="icon"><Icon type="md-add" size="18"/></Button>
              </FormItem>
               <FormItem>
                   <span>3、你会将融融推荐给身边的人吗？</span><br>
                    <RadioGroup v-model="formItem.radio">
                        <Radio label="yes">会</Radio>
                        <Radio label="no">不会</Radio>
                   </RadioGroup>
                   <Button class="icon"><Icon type="md-add" size="18"/></Button>
              </FormItem>
               <FormItem style="text-align:center">
                   <Button>保存</Button>
                   <Button>+添加内容</Button>
              </FormItem>
            </Form> 
      </div>
      <div class="pages">
        <Page  :total="100" show-elevator show-total size="small" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
          formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: '为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！'
                },
        navigation1: {
        head: "问卷调查(志愿者)"
       },   
      data: [
     
      ]
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {
    invest(){
      this.$router.push({ name: 'vp_new' })
    }
  }
};
</script>
<style lang="scss">
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  padding: 15px 20px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
}
.integral-header .integral-center {
  margin: 0 20px;
}
.integral-header .integral-body {
  padding: 20px;
  background: #fff;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 200px;
  margin-left: 15px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 20px;
}
.integral-table {
  margin-top: 30px;
}
.table-header {
  padding: 5px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.table-header .table-btn {
  margin-left: 15px;
}
.integral-table .pages {
  padding: 5px 20px;
  margin-top: 50px;
  background: #fff;
}
.pages {
  text-align: center;
}
.ipt {
  margin-left: 10px;
}
.sdate {
  margin-left: 15px;
}
Button{
    margin-right: 0.5rem;
}
.icon{
  border-radius: 0;
  display: block;
  border:1px solid #ccc;
}
</style>
