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
        <div class="but" v-if="ReportData.reportStatusText=='未处理'" >
          <Button size="small" type="success">有效举报</Button>
          <Button size="small" type="error">恶意举报</Button>
          <Button size="small" type="error">无效报举</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/request/datatime'
import {ReportDel,Reporttext} from '@/request/api'
export default {
  data() {
    return {
      navigation1: {
        head: '举报详情-未处理(会员)'
      },
      ReportData: {},
      text:''
    }
  },
  mounted(){
    this.getReportDel()
    this.getReporttext()
  },
  methods:{
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
    getReporttext(){
      Reporttext({
      }).then(res=>{
        if(res.code==200){

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
