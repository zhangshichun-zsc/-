<!--举报详情-已处理(会员)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con-top bk-szy">
        <p>
          <span class="zt">举报详情</span>
        </p>
      </div>
      <div class="con bk">
        <table width="100%;">
          <tr>
            <td class="zt">举报理由</td>
            <td class="zt">{{ReportData.reportReasonText}}</td>
          </tr>
          <tr>
            <td class="zt">举报人</td>
            <td class="zt">{{ReportData.reportUserName}}</td>
          </tr>
          <tr>
            <td class="zt">举报时间</td>
            <td class="zt">{{ReportData.reportTimestamp}}</td>
          </tr>
          <tr>
            <td class="zt">举报对象</td>
            <td class="zt">{{ReportData.activityName}}</td>
          </tr>
          <tr>
            <td class="zt">举报状态</td>
            <td class="zt">{{ReportData.reportStatus}}</td>
          </tr>
          <tr>
            <td class="zt">举报内容</td>
            <td class="zt">{{ReportData.reportReasonText}}</td>
          </tr>
        </table>
        <table width="100%;">
          <tr>
            <td class="zt">处理人员</td>
            <td class="zt">{{ReportData.answerUserName}}</td>
          </tr>
          <tr>
            <td class="zt">处理时间</td>
            <td class="zt">{{ReportData.answerTimestamp}}</td>
          </tr>
          <tr>
            <td class="zt">处理结果</td>
            <td class="zt">{{ReportData.reportDealResultText}}</td>
          </tr>
          <tr>
            <td class="zt">处理备注</td>
            <td class="zt">{{ReportData.answerContent?ReportData.answerContent:''}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/request/datatime'
import { ReportDel } from '../../../request/api'
export default {
  data() {
    return {
      navigation1: {
        head: '举报详情-已处理(会员)'
      },

      ReportData: {}
    }
  },
  mounted() {
    if(this.$route.query.state==1){
      this.navigation1.head='举报详情-已处理(会员)'
    }else if(this.$route.query.state==2){
       this.navigation1.head='举报详情-已处理(志愿者)'
    }
    this.getReportDel()
  },
  methods: {
    // 详情
    getReportDel(){
      ReportDel({
        reportId:this.$route.query.reportId
      }).then(res=>{
        if(res.code==200){
          this.ReportData=res.data
          this.ReportData.reportTimestamp=formatDate(res.data.reportTimestamp)
          this.ReportData.answerTimestamp=formatDate(res.data.answerTimestamp)
        }
        console.log(res)
      })
    },

  }
}
</script>
<style scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
  font-size: 18px;
  min-height: 875px
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
.zt{
  font-size: 16px;
}
</style>
