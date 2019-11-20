<!--维护活动反馈模板(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <p class="content-activity">反馈模板</p>
      <div class="select">
        <span class="select-template">所选项目</span>
        <Input  style="width:300px;margin-top:20px" value="快乐活动营">
        </Input>
      </div>
      <div class="select">
        <span class="select-template">活动分类</span>
        <Input  style="width:300px;margin-top:20px" value="篮球">
        </Input>
      </div>
      <div class="select">
        <span class="select-template">反馈简介</span>
        <Input  style="margin-top:20px" type="textarea" :autosize="{minRows: 4,maxRows: 4}"  value=" 恭喜您已成功参与***活动！为了了解您的活动感受，进一步做好今后的活动工作，我们特进行此活动反馈，以便根据您的意见与建议，更加科学地、有针对性地改进课程，更好地满足您的需求。"></Input>
      </div>
      <div class="select">
        <span class="select-template">反馈内容</span>
        <div style="margin-top:20px">
            <p>1. 本次活动是否达到您的期望</p>
            <div style="margin-top:20px">
              <RadioGroup>
                 <Radio label="ok">
                     <span>A.完全达到</span>
                 </Radio>
                 <Radio label="good">
                     <span>B.基本达到</span>
                 </Radio>
                 <Radio label="general">
                     <span>C.一般</span>
                 </Radio>
                 <Radio label="no">
                     <span>D.相差很远</span>
                 </Radio>
              </RadioGroup>
            </div>  
            <p style="margin-top:20px">2. 您对本次活动的哪方面感到满意</p>
            <div style="margin-top:20px">
              <RadioGroup>
                 <Radio label="ok">
                     <span>A.活动内容</span>
                 </Radio>
                 <Radio label="good">
                     <span>B.参与互动</span>
                 </Radio>
                 <Radio label="general">
                     <span>C.流程安排</span>
                 </Radio>
                 <Radio label="no">
                     <span>D.活动气氛</span>
                 </Radio>
              </RadioGroup>
            </div>  
            <p style="margin-top:20px">您对我们以后活动的举办还有什么建议？</p>
              <h2 class="added" v-if="addbtns" >
                 <a @click="addbtn()">+新增物资</a>
              </h2>
              <div v-show="show">
                <div class="addes">
                    <Button>+单选题</Button>
                    <Button>+多选题</Button>
                    <Button>+单行文本</Button>
                    <Button>+多行文本</Button>
                </div>
              </div>
        </div>
      </div>
       <div class="select">
        <span class="select-template">上传图片</span>
         <i-switch style="margin-top:20px"></i-switch>
      </div>
      <div class="button-food">
        <i-button @click="feedback">保存</i-button>
        <i-button @click="feedback">作废</i-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigation1: {
        head: "维护活动反馈模板(会员)"
      },
      animal: "daba",
      value: "",
      single: "",
      show: false,
      addbtns: true
    };
  },

  components: {  },

  computed: {},

  created() {},

  mounted() {
  },
  methods: {
    addbtn() {
       if(this.show===false){
       this.show=true
       }else{
       this.show=false
     }
      this.addbtns = !this.addbtns;
    },
    close() {
      this.adds = false;
      this.addbtns = true;
    },
    feedback(){
        this.$router.push({name:'feedback'})
    }
  }
}
</script>
<style lang="scss" scoped>
.head {
  margin-bottom: 0px;
}
.content {
  background: #f3f3f3;
  border-top: #e4e4e4 solid 1px;
  margin-top: 20px;
  .content-activity {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
  }
  .select {
    display: flex;
    background: #ffffff;
    // align-items: center;
    .select-template {
      margin: 20px 50px;
      width: 100px;
    }
  }
}
.details,
.recruit,
.material {
  background: #ffffff;
  margin-bottom: 40px;
  .details-head,
  .recruit-head,
  .material-head {
    height: 40px;
    background: #ffffff;
    span {
      width: 140px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: #008e40;
      color: #ffffff;
      font-size: 14px;
      display: inline-block;
    }
  }
  .ivu-icon-md-close-circle{
    font-size: 16px;
    color: #e4e4e4;
    margin-left: 10px;
  }
}
 .added {
      text-align: center;
      margin-top: 10px;
      height: 40px;
      line-height: 40px;
      width: 700px;
      a {
        color: #008e40;
      }
    }
 .addes{
     display: flex;
     justify-content: space-around;
     align-items: center;
     border: 1px solid #ccc;
     height: 80px;
     width:500px;
     margin-top: 20px;
 }   
 .addes Button{
     width: 100px;
     height: 30px;
     text-align: center
 }
.button-food {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  .ivu-btn-default {
    height: 40px;
    width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: #ffffff;
    border: 1px solid #797979;
    margin-right: 10px;
    // color: #f3f3f3;/
  }
}

.ivu-select-default{
  margin-right: 10px;
}
</style>
