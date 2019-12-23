<!--活动反馈-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con">
        <div class="title">
          活动反馈
        </div>
        <div v-for='(items,m) in feed' :key='m'>
          <div v-for="(item,index) in items" :key='index'>
            <div class="ls-item" v-if=' index == 0 '>
              <div class="item-head">{{ item.postName }}反馈简介</div>
              <div class="item-wap">{{ item.detailText }}</div>
            </div>
            <view class="ls-item flex-between" v-else-if=' ~~item.typeFlag == 9 '>
              <text>是否上传图片</text>
              <span>{{~~item.detailText == 1?"是":"否"}}</span>
            </view>
            <div class="ls-item flex-between" v-else-if=' ~~item.typeFlag === 1 || ~~item.typeFlag === 6 '>
              <div class="item-head">文本标题</div>
              <div>{{ item.detailText }}</div>
            </div>
            <div class="ls-item"  v-else-if='~~item.typeFlag === 3 || ~~item.typeFlag === 4'>
              <div class="item-head">
                {{ item.detailText }}
              </div>
                <p v-for="(val,i) in item" :key='i' v-if='sign(val,i)'> {{ setVal(i) }}{{val}}</p>
            </div>
          </div>
        </div>
        <div style="display: flex;justify-content: center;">
          <Button @click=" this.$router.back()">确定</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'iview/src/components/button/button'
import { getFeedDetail }from '@/request/api'
export default {
  components: { Button },
  data() {
    return {
      navigation1: {
        head: '活动反馈'
      },
      activityId:null,
      isDisb:true,
      answer:['aa','ab','ac','ad','ae','af'],
      sub:['A','B','C','D','E','F'],
      feed:[]
    }
  },
  computed:{
    sign(){
      return (val,i)=>{
        return this.answer.indexOf(i) > -1 && !!val
      }
    },
    setVal(){
      return (val)=>{
        return val.substr(-1,1).toUpperCase()
      }
    }
  },
  created () {
    this.activityId = this.$route.query.activityId
    this.getDetail()
  },
  methods: {
    getDetail(){
      getFeedDetail({activityId:this.activityId}).then(res => {
        if(res.code == 200){
          this.feed = res.data
        }else{
          this.$Message.error(res.msg)
        }
      })
    }
  },
}
</script>
<style scoped lang='scss'>
.main{
  background: #fff;
}
.con{
  padding: 20px;
  .title{
    font-size: 30px;
    text-align: center;
    padding: 10px;
  }
  .ls-item{
    padding: 10px 0;
    p{
      margin-bottom: 10px;
    }
    .item-head{
      padding: 10px 0;
    }
    .item-wap{
      padding: 10px;
      height: 100px;
      border: 1px solid #eee;
    }
  }
}
</style>
