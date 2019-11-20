<!--添加志愿者类型（志愿者）-->
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
            <FormItem label="志愿者等级名称:" prop="GradeName">
              <Input style="width: 10rem" v-model="formInline.GradeName"></Input>
            </FormItem>
            <FormItem label="服务时长满足点:" prop="ServiceTime">
              <Input style="width: 10rem" v-model="formInline.ServiceTime"></Input>
            </FormItem>
            <FormItem label="设为默认会员等级:">
              <RadioGroup v-model="formInline.Whether">
                <Radio label="否"></Radio>
                <Radio label="是"></Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="积分奖励:" prop="awarding">
              <Input style="width: 10rem" v-model="formInline.awarding">
                <span slot="append">积分</span>
              </Input>
            </FormItem>
            <FormItem label="组建志愿者团队奖励特权:">
              <i-switch v-model="formInline.switch1" />
            </FormItem>
            <FormItem label="发布志愿者奖励特权:">
              <i-switch v-model="formInline.switch2" />
            </FormItem>
            <FormItem label="邀请团队注册特权:">
              <i-switch v-model="formInline.switch3" />
            </FormItem>
            <FormItem label="邀请个人参与活动奖励特权:">
              <i-switch v-model="formInline.switch4" />
            </FormItem>
            <FormItem label="邀请个人注册奖励特权:">
              <i-switch v-model="formInline.switch5" />
            </FormItem>
            <FormItem label="填写活动反馈奖励特权:">
              <i-switch v-model="formInline.switch6" />
            </FormItem>
            <FormItem label="填写活动评价奖励特权:">
              <i-switch v-model="formInline.switch7" />
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
import {Grademodify,Gradeadd} from '../../../request/api'
export default {
  data() {
    return {
      navigation1: {
        head: "添加志愿者类型（志愿者）"
      },
      formInline:{
        MembershipGrade:'',
        ServiceTime:'',
        Whether:'否',
        awarding:'',
        switch1:true,
        switch2:true,
        switch3:true,
        switch4:true,
        switch5:true,
        switch6:true,
        switch7:true,
      },
      ruleValidate:{
        GradeName:[
          { required: true, message: '请输入会员等级名称', trigger: 'blur' }
        ],
        ServiceTime:[
          { required: true, message: '请输入积分满足点', trigger: 'blur' }
        ],
        awarding:[
          { required: true, message: '  ', trigger: 'blur' }
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
