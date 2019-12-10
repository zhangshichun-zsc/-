<!--活动反馈详情(会员)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con-top con-p bk-szy flex-center-start">
        <p>
          <span>{{this.$route.query.name}}</span>
          <span>（{{this.$route.query.num}}条反馈）</span>
        </p>
        <div class="flex-center-end">
          <Button size="small">导出反馈结果</Button>
          <div class="Pack">
            <Icon type="ios-arrow-down" />
            <span>收起筛选</span>
          </div>
          <Button size="small"  @click="query">查询结果</Button>
        </div>
      </div>
      <div class="con con-p bk inp flex-center-start">
        <p>
          <span>反馈人:</span>&nbsp;
          <Input size="small" placeholder="活动名称" style="width: 8rem" v-model="querys.userName"/>
        </p>
        <p>
          <span>提交时间:</span>&nbsp;
          <DatePicker
              :open="open"
              confirm
              type="daterange"
              @on-change="handleChange"
              @on-ok="successOk">
              <a href="javascript:void(0)" @click="open = true">
                  <Icon type="ios-calendar-outline"></Icon>
                  <template>{{ time }}</template>
              </a>
            </DatePicker>
        </p>
      </div>
    </div>
    <div class="content">
      <div class="con-top bk-szy flex-center-end">
         <p>
          <Icon type="ios-list" size="30" />
          <span>数据列表</span>
        </p>
        <div class="flex-center-end">
           <Select size='small' placeholder="显示条数" @on-change='changeNum' placement='top'>
            <Option :value="item" v-for='(item,index) in numList' :key="index">{{ item }}</Option>
          </Select>
            <Select size='small' placeholder="排序方式"  @on-change='changeSort' placement='top'>
            <Option value="create_at desc">升序</Option>
            <Option value="create_at asc">降序</Option>
          </Select>
        </div>
        </div>
      </div>
      <div class="con">
        <div class="con-left">
          <Table border :columns="columns" :data="data"></Table>
          <div class="pages">
            <Page :total="dataCount" show-elevator show-total size="small" :page-size="size" @on-change="changepages" />
          </div>
        </div>
        <div class="con-right bk">
          <div class="con-top">
            <p>反馈详情</p>
          </div>
          <div>
            <div v-for="(item,index) in msg.detailList" :key='index+"d"'>
              <div class="ls-item" v-if=' index == 0 '>
                {{ item.detailText }}
              </div>
              <view class="ls-item flex-wrap-start" v-else-if=' index == 1 && msg.feedbackPicList.length !== 0 '>
                <img src="" alt="" v-for="(val,i) in msg.feedbackPicList" :key='i'/>
              </view>
              <div class="ls-item" v-else-if=' ~~item.typeFlag === 1 ||  ~~item.typeFlag === 6 '>
                <p>{{ item.detailText }}</p>
                <p>{{ item.value }}</p>
              </div>
              <!-- <div class="ls-item"  v-else-if='~~item.typeFlag === 3'>
                <div>
                   {{ item.detailText }}
                </div>
                <div class="item">
                   <RadioGroup  vertical size="large" v-model="item.value">
                      <Radio :label="substrs(i)"  v-for="(val,i) in item" :key='i' v-if='sign(val,i)' disabled ></Radio>
                  </RadioGroup>
                </div>
              </div> -->
               <!-- <div class="ls-item"  v-else-if='~~item.typeFlag === 4'>
                <div>
                   {{ item.detailText }}
                </div>
                <div class="item">
                  <CheckboxGroup v-model="item.value" vertical>
                    <Checkbox :label="substrs(i)"  v-for="(val,n) in item" :key='n' v-if='sign(val,i)' disabled ></Checkbox>
                  </CheckboxGroup>
                </div>
              </div> -->
            </div>
            <div v-for="(item,m) in msg.evaluateList" :key='m'>
              <p class="flex-between"><span>评价对象:</span><span>{{ item.typeFlag==5?"会员":"现场负责人" }}</span></p>
              <p class="flex-between"><span>姓名:</span><span>{{ item.userName }}</span></p>
              <p class="flex-between"> <span>我的评价</span><Rate v-model="item.level" disabled/> </p>
              <div class="flex-between"><span>评价内容</span><div>{{ item.comments }}</div></div>
              <div class="felx-between"><span>是否匿名</span><div><i-switch true-color="#13ce66" false-color="#ff4949" disabled v-model="item.isAnonymous" :true-value='1' :false-value='0'/></div></div>
            </div>
          </div>
        </div>
      </div>
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
          width: '100px',
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
          width: '140px'
        },
        {
          title: '反馈时间',
          key: 'feedbackAt',
          align: 'center',
        },
        {
          title: '参与活动岗位',
          key: 'positionName',
          align: 'center',
          width: '160px'
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
        return i.substr(-1,1)
      }
    }
  },
  methods: {
    query(){
      this.page = 1
      this.startAt = this.querys.startAt
      this.endAt = this.querys.endAt
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
      successOk(){
      if(!this.querys.startAt&&!this.querys.endAt){
        this.time='请选择时间段'
      }
      this.open = false
    },
    handleChange(e){
      let start = e[0]
      let end = e[1]
      this.time = e[0] + '-' + e[1]
      if(start&&end){
        if(start === end){
          start = start + ' 00:00:00'
          end = end + ' 23:59:59'
        }else{
          start = start + ' 00:00:00'
          end = end + ' 00:00:00'
        }
      }
      this.querys.startAt = start
      this.querys.endAt = end
    },
  }
}
</script>
<style lang="scss" scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
}

.bk {
  border: 1px solid #e4e4e4;
}
.con-left {
  width: 60%;
}
.con-right {
  width: 35%;
}
.con-right div {
  margin: 8px;
}

.con {
  display: flex;
  justify-content: space-between;
}
.content {
  margin: 1rem;
}
.con-top {
  background-color: #f3f3f3;
  justify-content: space-between;
  padding: 0.2rem 1rem;
}
.bk-szy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
}
.con-p p {
  margin-right: 3rem;
}
.inp {
  display: flex;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
}
.Pack,
.content button {
  margin-right: 1rem;
}

.pages {
  display: flex;
  justify-content: center;
  margin: 10px auto;
}
.ls-item img{
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
</style>
