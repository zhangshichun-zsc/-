<!--维护活动反馈模板(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <p class="content-activity">反馈模板</p>
      <div class="select">
        <span class="select-template">模板名称</span>
        <Input  style="width:300px;margin-top:20px" v-model="args.fkMouldName"></Input>
      </div>
      <div class="actType">
        <span class="select-template">活动分类</span>
        <span>{{args.typeDicName}}</span>
      </div>
      <div class="select">
        <span class="select-template">反馈简介</span>
        <Input  style="margin-top:20px" type="textarea" :autosize="{minRows: 4,maxRows: 4}" v-model="details[0].context"/>
      </div>
      <div class="select flex-start">
        <span class="select-template">反馈内容</span>
        <div class="wap">
          <div v-for="(item,index) in feed" :key='index'>
            <div class="ls-item flex-between" v-if=' item.type === 1 '>
              <i-input placeholder="请输入单文本标题" v-model="item.context"/>
              <Icon type="ios-trash"  @click="deleItem(index,null)" color='#FF565A' size='25'/>
            </div>
            <div class="ls-item flex-between" v-else-if=' item.type === 6 '>
              <i-input placeholder="请输入多行文本标题" v-model="item.context"/>
              <Icon type="ios-trash"  @click="deleItem(index,null)" color='#FF565A' size='25'/>
            </div>
            <div class="ls-item"  v-else-if='item.type === 3 '>
              <div class="item flex-between">
                <i-input placeholder="请输入单选标题" v-model="item.context"/>
                <Icon type="ios-trash"  @click="deleItem(index,null)" color='#FF565A' size='25'/>
              </div>
              <div class="item flex-between" v-for="(val,i) in item.answer" :key='i'>
                <i-input :placeholder="`输入选项${i+1}`" v-model="val.answer"/>
                <Icon type="ios-trash"  @click="deleItem(index,i)" color='#FF565A' size='25'/>
              </div>
              <Button type="primary" ghost  @click="addSignIput(index)" class="btn">+</Button>
            </div>
            <div class="ls-item" v-else>
              <div class="item flex-between">
                <i-input placeholder="请输入多选标题" v-model="item.context"/>
                <Icon type="ios-trash"  @click="deleItem(index,null)" color='#FF565A' size='25'/>
              </div>
              <div class="item flex-between" v-for="(val,i) in item.answer" :key='i'>
                <input :placeholder="`输入选项${i+1}`" v-model="val.answer"/>
                <Icon type="ios-trash"  @click="deleItem(index,i)" color='#FF565A' size='25'/>
              </div>
              <Button type="primary" ghost  @click="addSignIput(index)" class="btn">+</Button>
            </div>
          </div>
          <div class="add flex-center-start">
            <p>新增反馈项</p>
            <div class="flex-between">
              <i-button v-for="(item,index) in feedList" :key='index' class="add-item" @click="addItem(item.type)">{{ item.name }}</i-button>
            </div>
          </div>
        </div>
      </div>
       <div class="select">
        <span class="select-template">上传图片</span>
         <i-switch style="margin-top:20px" v-model="args.isPicFlag"  :true-value='1' :false-value='0'></i-switch>
      </div>
      <div class="button-food">
        <i-button @click="feedback()" shape="circle" size='large' class="btn">保存</i-button>
        <i-button @click="delFeed()" shape="circle" size='large' class="btn" v-if="ble===1">作废</i-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addActiveTypeItem,getActiveFeedBack,delActiveFeedBack }from'@/request/api'
import { filterNull } from '@/libs/utils'
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
      addbtns: true,
      feedList:[{name:'单行文本',type:1},{name:'多行文本',type:6 },{name:'单选问题',type:3},{name:'多选问题',type:4}],
      feed: [],
      details:[   {
            type:0,
            context: null,
            isMust:0
            
          }],
      args:{
        actFkMouldId: null,
        fkMouldName:null,
        typeDicId: null,
        typeDicName: null,
        isPicFlag: 0,
        details:[]
      },
      ble:1
    }
  },

  components: {  },

  computed: {},

  created() {
    this.ble =  ~~this.$route.query.ble
    if(this.ble === 1){
      this.args.actFkMouldId = this.$route.query.id
      this.getDetail()
    }else{
      this.args.typeDicId = this.$route.query.id
      this.args.typeDicName = this.$route.query.name
    }
  },

  mounted() {
  },
  methods: {
    deleItem(i,m){
      let feed = this.feed
      if (m !== null) {
        let arr = feed[i].answer
        if(arr.length<3){
          this.$Message.warning("最少保留两项")
        }else{
          arr.splice(m, 1)
        }
      } else {
        feed.splice(i, 1)
      }
      this.feed = feed
    },
    addSignIput(i){
      let feed = this.feed
      let arr = feed[i].answer
      if(arr.length>5){
        this.$Message.warning("最多添加六项")
      }else{
        arr.push({ answer: null })
        this.feed = feed
      }
    },
    getDetail(){
      getActiveFeedBack({actFkMouldId: this.args.actFkMouldId}).then(res => {
        console.log(res)
        let list = res.data
        if(list.details.length == 0){
          delete list.details
        }else{
          this.details = [list.details[0]]
          this.feed = list.details.splice(1)
        }
        list.isPicFlag = ~~list.isPicFlag
        this.args = Object.assign(this.args,list)
      })
    },
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
      let args = this.args
      if(!args.fkMouldName || !this.details[0].context || !args.typeDicName){
        this.$Message.warning('信息填写不完整')
        return
      }
      args.details = [...this.details,...this.feed]
      // args = filterNull(args)
      for(let i in args.details){
        if(args.details[i].context==''){
          this.$Message.warning('信息填写不完整')
          return
        }else if(args.details[i].type==3 || args.details[i].type==4){
          for(let j in args.details[i].answer){
            if(args.details[i].answer[j].answer=='' || args.details[i].answer[j].answer==null){
              this.$Message.warning('信息填写不完整')
              return
            }
          }
        }
      }
      console.log(args)
      addActiveTypeItem(args).then(res => {
         if(res.code == 200){
            this.$Message.success('添加成功')
             this.$router.back()
        }else{
           this.$Message.error(res.msg)
        }
     
      })
    },
    delFeed(){
      delActiveFeedBack({actFkMouldId:this.args.actFkMouldId,valid:3}).then(res => {
        if(res.code == 200){
          this.$Message.success('删除成功')
          this.$router.back()
        }else{
           this.$Message.error(res.msg)
        }
      })
    },
    addItem(type){
      let feed = this.feed
      let args = {
        type,
        context: null,
        isMust:0
      }
      if (type === 4 || type === 3) {
        args.answer = [{ answer: null }, { answer: null }, { answer: null }]
      }
      feed.push(args)
      this.feed = feed
    },
  }
}
</script>
<style lang="scss" scoped>
.head {
  margin-bottom: 0px;
}
.content {
  background: #fff;
  border-radius: 20px;
  padding: 20px 100px 20px 20px;
  .content-activity {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
  }
  .select {
    display: flex;
    background: #ffffff;
    padding: 10px 0;
    // align-items: center;
    .wap{
      .ls-item{
        .ivu-input-wrapper{
          width: 300px;
        }
        .btn{
          margin-left: 100px;
          margin-bottom: 20px;
        }
        .item{
           margin-bottom: 10px;
        }
        margin-bottom: 10px;
      }
      .add{
        .add-item{
          margin-right: 20px;
          margin-bottom: 15px;
        }
        p{
          margin-right: 20px;
        }
      }
      margin: 20px 0;
    }
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
  padding: 50px 20px;
  display: flex;
  justify-content: center;
  .btn{
    padding: 10px 30px !important;
    background: #FF565A !important;
    color: #fff !important;
    border-color:none !important;
    margin-right: 30px !important;
  }
  .btn:hover{
    border:1px solid #FF565A !important;
    color: #FF565A !important;
    background: #fff !important;
  }
}
.actType{
  display: flex;
  align-items: center;
  background: #fff;
  .select-template {
    margin: 20px 50px;
    width: 100px;
  }
}

.ivu-select-default{
  margin-right: 10px;
}
</style>
