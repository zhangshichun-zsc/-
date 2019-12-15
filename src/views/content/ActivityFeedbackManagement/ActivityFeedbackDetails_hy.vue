<!--活动反馈详情(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="wapper">
      <div class="head"> 
        <span>{{this.$route.query.name}}</span>
        <span>（{{this.$route.query.num}}条反馈）</span>
      </div>
      <Row type="flex" justify="space-between" class-name="header">
        <i-col span='12'>
          <Row align='middle' type="flex">
            <i-col span='2'>反馈人:</i-col>
            <i-col span='5'>
              <Input size="small" placeholder="活动名称"  v-model="querys.userName"/>
            </i-col>
            <i-col span='3' push='1'>提交时间:</i-col>
            <i-col span='12' push='1'>
                <DatePicker
                v-model='querys.startAt'
                type="date"
                style="width:180px"
                placeholder="开始时间"
                @on-change="handleChange('startAt',$event)"
                />
                <i>-</i>
                <DatePicker
                 v-model='querys.endAt'
                style="width:180px"
                type="date"
                placeholder="结束时间"
                @on-change="handleChange('endAt',$event)" 
                />
            </i-col>
          </Row>
        </i-col>
        <i-col span='4'>
           <Button @click="query()"  shape="circle" size='large' icon="ios-search" class="btn">查询结果</Button>
        </i-col>
      </Row>
      <Row>
        <i-col span='14'>
          <Row type="flex" justify="space-between" class-name="rowH">
            <i-col span='3'>
              <Icon type="ios-list" size="30" />
              <span>数据列表</span>
            </i-col>
            <i-col span='6'>
              <div class="flex-center-end">
                <Select size='small' placeholder="显示条数" @on-change='changeNum' placement='top'>
                  <Option :value="item" v-for='(item,index) in numList' :key="index">{{ item }}</Option>
                </Select>
                  <Select size='small' placeholder="排序方式"  @on-change='changeSort' placement='top'>
                  <Option value="create_at desc">升序</Option>
                  <Option value="create_at asc">降序</Option>
                </Select>
              </div>
            </i-col>
          </Row>
          <Row>
             <Table border :columns="columns" :data="data"></Table>
          </Row>
          <Row>
            <div class="pages">
              <Page :total="dataCount" show-elevator show-total size="small" :page-size="size" @on-change="changepages" />
            </div>
          </Row>
        </i-col>
        <i-col span='8' push='2'>
          <Row class-name="con-top">
            反馈详情
          </Row>
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
import Divider from 'iview/src/components/divider/divider'
import { formatDate } from '../../../request/datatime'
import { Activityuserpage, Activitydetail } from '../../../request/api'
import { filterNull } from '@/libs/utils'
export default {
  components: { Divider },
  data() {
    return {
      navigation1: {
        head: '活动反馈详情(会员)'
      },
      time:'请选择时间段',
      open:false,
      data: [],
      page: 1, //每页显示多少数据
      size: 10, //数据条数
      dataCount: 0,
      userName: '',
      startAt:'',
      sort: '',
      question: '',
      answer: '',
      endAt:'',
      querys:{
        startAt:'',
        endAt:'',
        userName: '',
      },
      arr: [],
      numList:[10,15,20],
      msg: {},
      columns: [
        {
          title: '反馈人',
          key: 'userName',
          width: 300,
          align: 'center',
          render: (h, params) => {
            return h('div',  {
                  on: {
                    click: () => {
                     this.getActivitydetail(params.row.activityUserId)
                    }
                  }
                },params.row.userName)
          }
        },
        {
          title: '手机号码',
          key: 'tel',
          align: 'center',
          width: 300,
        },
        {
          title: '反馈时间',
          key: 'feedbackAt',
          align: 'center',
          width: 300,
        },
        {
          title: '参与活动岗位',
          key: 'positionName',
          align: 'center',
          width: 200,
        }
      ]
    }
  },
  created(){
    this.getActivityuserpage()
  },
   computed:{
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
  methods: {
    query(){
      this.page = 1
      let startAt = this.querys.startAt
      let endAt = this.querys.endAt
      if(new Date(startAt).getTime() === new Date(endAt).getTime()){
        startAt = startAt + ' 00:00:00'
        endAt = endAt + ' 23:59:59'
      }else{
         startAt = startAt + ' 00:00:00'
        endAt = endAt + ' 00:00:00'
      }
      this.startAt = startAt
      this.endAt = endAt
      this.userName = this.querys.userName
      this.$Message.success("查询成功")
      this.getActivityuserpage()
    },
    getActivityuserpage() {
      let startAt = this.startAt?new Date(this.startAt).getTime():null
      let endAt = this.endAt?new Date(this.endAt).getTime():null
      Activityuserpage(filterNull({
        page: { page: this.page, size: this.size,sort:this.sort },
        activityId: this.$route.query.activityId,
        startAt,
        endAt,
        name:this.userName
      })).then(res => {
        if (res.code == 200) {
          this.data = res.data.list
          this.dataCount = res.data.totalSize
          this.getActivitydetail(res.data.list[0].activityUserId)
        }else{
          this.$Message.error(res.msg)
        }
      })
    },
    //分页功能
    changepages(index) {
      this.page = index
      this.getActivityuserpage()
    },

    //详情
    getActivitydetail(activityUserId) {
      Activitydetail({
         activityUserId
      }).then(res => {
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
    },
    changeNum(e){
      this.size = e
      this.page = 1
      this.getActivityuserpage()
    },
    changeSort(e){
      this.sort = e
      this.page = 1
      this.getActivityuserpage()
    },
    handleChange(name,e){
      let time = e
      if(time){
        if(name == 'startAt'&&!!this.querys.endAt&&new Date(time).getTime()>new Date(this.querys.endAt).getTime()){
          this.$Message.warning("活动开始时间要早于活动结束时间")
          this.$set(this.querys,'startAt','')
          return
        }else if(name == 'endAt'&&!!this.querys.startAt&&new Date(this.querys.startAt).getTime()>new Date(time).getTime()){
          this.$Message.warning("活动开始时间要早于活动结束时间")
          this.$set(this.querys,'endAt','')
          return
        }
      }
      this.$set(this.querys,name,time)
    },
  }
}
</script>
<style lang="scss" scoped>
.wapper{
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 30px;
  .head{
    padding: 10px 0;
    color: #1b2331;
  }
  .header{
    margin-bottom: 30px;
  }
  .rowH{
    background-color: #f3f3f3;
    padding: 5px 0;
  }
  .btn{
    background: #FF565A !important;
    color: #fff !important;
    border-color:none !important;
  }
  .btn:hover{
    border:1px solid #FF565A !important;
    color: #FF565A !important;
    background: #fff !important;
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
}
.con-top {
  background-color: #f3f3f3;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.2rem 1rem;
}
.pages {
  display: flex;
  justify-content: center;
  margin: 10px auto;
}
</style>
