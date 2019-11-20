<!--活动反馈-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con">
        <div class="title">
          <p>
            <span>活动反馈</span>
          </p>
        </div>
        <Form ref="FeedbackDate" :model="FeedbackDate" style="display: grid;justify-content: center;" :label-width="120">
          <FormItem label="反馈简介">
            <Input style="width: 20rem" v-model="FeedbackDate.FeedbackIntroduction" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入内容"></Input>
          </FormItem>
          <FormItem label="反馈内容">
            <div style="display: grid;">
              <div>
                <p>1. 本次活动是否达到您的期望</p>
                <RadioGroup v-model="choose1" vertical>
                  <Radio label="choose-A">
                    <span>A.完全达到</span>
                  </Radio>
                  <Radio label="choose-B">
                    <span>B.基本达到</span>
                  </Radio>
                  <Radio label="choose-C">
                    <span>C.一般</span>
                  </Radio>
                  <Radio label="choose-D">
                    <span>D.相差很远</span>
                  </Radio>
                </RadioGroup>
              </div>
              <Divider style="margin: 0.2rem 0"/>
              <div>
                <p>2. 您对本次活动的哪方面感到满意</p>
                <RadioGroup v-model="choose2" vertical>
                  <Radio label="choose-A">
                    <span>A.活动内容</span>
                  </Radio>
                  <Radio label="choose-B">
                    <span>B.参与互动</span>
                  </Radio>
                  <Radio label="choose-C">
                    <span>C.流程安排</span>
                  </Radio>
                  <Radio label="choose-D">
                    <span>D.活动气氛</span>
                  </Radio>
                </RadioGroup>
              </div>
              <Divider style="margin: 0.2rem 0"/>
              <div>
                <p>您对我们以后活动的举办还有什么建议？</p>
                <Input style="width: 20rem" v-model="FeedbackDate.FeedbackSuggestions" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入内容"></Input>
              </div>
            </div>
          </FormItem>
        </Form>
        <div style="display: flex;justify-content: center;">
          <Button>确定</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Button from "iview/src/components/button/button";
  export default {
    components: {Button},
    data(){
      return{
        navigation1: {
          head: "活动反馈"
        },
        FeedbackDate:{
          FeedbackIntroduction:' 恭喜您已成功参与活动！为了了解您的活动感受，进一步做好今后的活动工作，我们特进行此活动反馈，以便根据您的意见与建议，更加科学地、有针对性地改进课程，更好地满足您的需求。',
          FeedbackSuggestions:'希望此类活动更多些',

        },
        choose1: 'choose-A',
        choose2: 'choose-C',
      }
    }
  }

</script>
<style scoped>
  html,body{
    margin: auto;
  }
  .main{
    background-color: #ffffff;
  }
  .main{
    border: 1px solid #E4E4E4;
  }
  .content{
    margin: 1rem 5rem;
  }
  .title{
    padding: 1rem 2rem;
  }
</style>
