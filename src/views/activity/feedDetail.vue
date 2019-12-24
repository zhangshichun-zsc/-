<!-- 反馈详情 -->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="wapper">
      <Row>
        <i-col span='12'>
          <Row>
            <div v-for="(item,index) in msg.detailList" :key='index+"d"'>
              <div v-if=' index == 0 ' class="item">
                <p class="title">
                  反馈简介:
                </p>
                <p class="des">
                    {{ item.detailText }}
                </p>
              </div>
              <div class="item" v-else-if=' index == 1 && msg.feedbackPicList.length !== 0 '>
                <p class="title">反馈图片</p>
                <div class="flex-wrap-start">
                  <img :src="val.picPath" alt="" v-for="(val,i) in msg.feedbackPicList" :key='i' class="img"/>
                </div>
              </div>
              <div class="item" v-else-if=' ~~item.typeFlag === 1 ||  ~~item.typeFlag === 6 '>
                <p class="title">{{ item.detailText }}</p>
                <p>{{ item.value }}</p>
              </div>
              <div class="item"  v-else-if='~~item.typeFlag === 3'>
                <div  class="title">
                  {{ item.detailText }}
                </div>
                <div>
                  <RadioGroup  vertical size="large" v-model="item.value">
                      <Radio :label="substrs(i)"  v-for="(val,i) in item" :key='i' v-if='sign(val,i)' disabled>
                      {{val}}</Radio>
                  </RadioGroup>
                </div>
              </div>
              <div class="item"  v-else-if='~~item.typeFlag === 4'>
                <div class="title">
                  {{ item.detailText }}
                </div>
                <div>
                  <CheckboxGroup v-model="item.value">
                    <p v-for="(val,n) in item" :key='n' v-if='sign(val,n)' class="box">
                        <Checkbox :label="substrs(n)"  disabled >{{ val }}</Checkbox>
                    </p>
                  </CheckboxGroup>
                </div>
              </div>
            </div>
            <Row v-for="(item,m) in msg.evaluateList" :key='m' class-name="bott">
              <p class="item flex-between"><span>评价对象:</span><span>{{ item.typeFlag==5?"会员":"现场负责人" }}</span></p>
              <p class="item flex-between"><span>姓名:</span><span>{{ item.userName }}</span></p>
              <p class="item flex-between"> <span>我的评价</span><Rate v-model="item.level" disabled/> </p>
              <div class="item"><p class="title">评价内容</p><div class="des">{{ item.comments }}</div></div>
              <div class="item flex-between">
                <span>是否匿名</span>
                <i-switch true-color="#13ce66" false-color="#ff4949" disabled v-model="item.isAnonymous" :true-value='1' :false-value='0'/>
              </div>
            </Row>
          </Row>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
import { getfeendDetail } from '@/request/api'
export default {
  data () {
    return {
      msg: {},
       navigation1: {
        head: "反馈详情"
      },
    }
  },

  components: {},

  computed: {
    sign(){
      return (val,i)=>{
        return i.indexOf('answer') > -1 && !!val
      }
    },
    splits(){
      return (val)=>{
        return val.split(',')
      }
    },
    substrs(){
      return (i)=>{
         if(!i)return
        return i.substr(-1,1)
      }
    }
  },

  created () {
     this.getDetail()
  },

  methods: {
    getDetail(){
      getfeendDetail({activityUserId:this.$route.query.activityUserId}).then(res => {
          if (res.code == 200) {
          let msg = res.data
          for(let item of msg.detailList){
            for(let val of msg.feedbackList){
              if(item.detailId == val.detailId) {
                if(item.typeFlag == 4) item.value = (val.answer).split(',') || ''
                else item.value = val.answer
                break;
              }
            }
          }
          this.msg = msg
        }else{
           this.$Message.error(res.msg)
        }
      })
    }
  }
}

</script>
<style lang="scss">
.wapper{
  background: #fff;
  padding: 20px;
  border-radius: 20px;
}
.con-top {
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.2rem 1rem;
}
 .item{
    margin-bottom: 10px;
    .box{
      padding: 10px 0;
    }
    .title{
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 10px;
      padding: 5px 10px;
      background: #eee;
    }
    .des{
      padding: 10px;
      border: 1px solid #eee;
      height: 100px;
    }
    .img{
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
  }
</style>
