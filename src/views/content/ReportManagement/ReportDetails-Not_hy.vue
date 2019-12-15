<!--举报详情-未处理(会员)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con-top bk-szy">
        <p>
          <span>举报详情</span>
        </p>
      </div>
      <div class="con bk">
        <table width="100%;">
          <tr>
            <td>举报理由</td>
            <td>{{ReportData.reportReasonText}}</td>
          </tr>
          <tr>
            <td>举报人</td>
            <td>{{ReportData.reportUserName}}</td>
          </tr>
          <tr>
            <td>举报时间</td>
            <td>{{ReportData.reportTimestamp}}</td>
          </tr>
          <tr>
            <td>举报对象</td>
            <td>{{ReportData.activityName}}</td>
          </tr>
          <tr>
            <td>举报状态</td>
            <td>{{ReportData.reportStatusText}}</td>
          </tr>
          <tr>
            <td>举报内容</td>
            <td>{{ReportData.reportContent}}</td>
          </tr>
        </table>
        <table width="100%;">
          <tr>
            <td>处理备注</td>
            <td><Input size="small" style="width: 8rem"  v-model="ReportData.answerContent" /></td>
          </tr>
        </table>
        <div class="but"  >
          <Button size="small" type="success" v-for="(item,index) in list" :key="index" @click="btns(item.dicId)">{{item.dicName}}</Button>
          <!-- <Button size="small" type="error">恶意举报</Button>
          <Button size="small" type="error">无效报举</Button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/request/datatime'
import {ReportDel,Reporttext,Reportdeles} from '@/request/api'
export default {
  data() {
    return {
      navigation1: {
        head: '举报详情-未处理(会员)'
      },
      ReportData: {},
      text:'',
      list:[],
      params:{}
    }
  },
  mounted(){

    if(this.$route.query.state==1){
      this.navigation1.head='举报详情-未处理(会员)'

    }else if(this.$route.query.state==2){
       this.navigation1.head='举报详情-未处理(志愿者)'
    }
    this.getReportDel()
     this.getReporttext()

  },
  methods:{
    // 详情
    getReportDel(){
      ReportDel({
        reportId:this.$route.query.reportId
      }).then(res=>{
        if(res.code==200){
          this.ReportData=res.data
          this.ReportData.reportTimestamp=formatDate(res.data.reportTimestamp)
        }
        console.log(res)
      })
    },

     //批量操作
    getReportdeles(id){
      let params = {
        reportIds:this.$route.query.reportId,
        dealUserId:this.$store.state.userId,
        reportDealResult:id,
        remark:this.ReportData.answerContent,
      }
      this.params =this.util.remove(params)
      Reportdeles(params).then(res=>{
        if(res.code==200){
          this.$Message.info('操作成功');
          if(this.$route.query.state==1){
            this.$route.push({path:'/ReportList_hy'})
          }else{
            this.$route.push({path:'/ReportList_zyz'})
          }

        }
        console.log(res)
      })
    },

    //按钮
    btns(id){
      this.getReportdeles(id)
    },
    //文本
    getReporttext(){
      Reporttext({
      }).then(res=>{
        if(res.code==200){
          this.list=res.data

        }
        console.log(res)
      })
    }
  },
}
</script>
<style scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
}

.bk,
.con td {
  border: 1px solid #e4e4e4;
}
.content {
  margin: 1rem;
}
.con-top {
  background-color: #f3f3f3;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}
.con-top p,
.con {
  font-size: 12px;
}
.bk-szy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
}
.con {
  padding: 1rem 8rem;
}
.con td:nth-child(1) {
  text-align: right;
  width: 6rem;
}
.con td {
  padding: 0.5rem 1rem;
}
.con table {
  margin-bottom: 1rem;
}
.but {
  display: flex;
  justify-content: center;
}
.but button {
  margin-right: 1rem;
}
</style>
