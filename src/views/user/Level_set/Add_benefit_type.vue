<!--添加受益方类型（会员）-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="main">
      <div class="constant bk">
        <div class="constant-title">
          <p>编辑资料</p>
        </div>
        <div class="inter-table">
          <Form style="margin: 0 auto;" :model="formInline" :rules="ruleValidate" :label-width="250">
            <FormItem label="会员等级名称:" prop="MembershipGrade">
              <Input style="width: 10rem" v-model="formInline.MembershipGrade"></Input>
            </FormItem>
            <FormItem label="积分满足点:" prop="IntegralPoint">
              <Input style="width: 10rem" v-model="formInline.IntegralPoint"></Input>
            </FormItem>
            <FormItem label="设为默认会员等级:">
              <RadioGroup v-model="formInline.Whether">
                <Radio label="否"></Radio>
                <Radio label="是"></Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="签到奖励特权:">
              <i-switch v-model="formInline.switch1" />
            </FormItem>
            <FormItem label="评价奖励特权:">
              <i-switch v-model="formInline.switch2" />
            </FormItem>
            <FormItem label="专享活动特权:">
              <i-switch v-model="formInline.switch3" />
            </FormItem>
            <FormItem label="会员特价特权:">
              <i-switch v-model="formInline.switch4" />
            </FormItem>
            <FormItem label="生日礼包特权:">
              <i-switch v-model="formInline.switch5" />
            </FormItem>
            <FormItem>
              <Button type="success">提交</Button>
            </FormItem>
          </Form>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navigation1: {
        head: "添加受益方类型（会员）"
      },
      formInline:{
        MembershipGrade:'',
        IntegralPoint:'',
        Whether:'否',
        switch1:true,
        switch2:true,
        switch3:true,
        switch4:true,
        switch5:true,
      },
      ruleValidate:{
        MembershipGrade:[
          { required: true, message: '请输入会员等级名称', trigger: 'blur' }
        ],
        IntegralPoint:[
          { required: true, message: '请输入积分满足点', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {}
}
</script>
<style scoped>
  .main{
    width: 50rem;
    margin: 0 auto;
  }
  .constant{
    margin-top: 1rem;
  }
  .bk{
    border: 1px solid #e4e4e4;
  }
  .constant-title{
    padding: 0.5rem;
    background-color: #F3F3F3;
    border-bottom: 1px solid #e4e4e4;
  }
  .inter-table{
    display: flex;
    justify-items: center;
    margin: 1rem auto;
  }
</style>
