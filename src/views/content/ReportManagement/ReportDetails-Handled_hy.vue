<!--举报详情-已处理(会员)-->
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
            <td>{{details.reportReasonText}}</td>
          </tr>
          <tr>
            <td>举报人</td>
            <td>{{details.reportUserName}}</td>
          </tr>
          <tr>
            <td>举报时间</td>
            <td>{{details.reportTimestamp}}</td>
          </tr>
          <tr>
            <td>举报对象</td>
            <td>{{details.activityName}}</td>
          </tr>
          <tr>
            <td>举报状态</td>
            <td>{{details.reportStatus}}</td>
          </tr>
          <tr>
            <td>举报内容</td>
            <td>{{details.reportReasonText}}</td>
          </tr>
        </table>
        <table width="100%;">
          <tr>
            <td>处理人员</td>
            <td>{{DealWith.DealWithPersonnel}}</td>
          </tr>
          <tr>
            <td>处理时间</td>
            <td>{{DealWith.ProcessingTime}}</td>
          </tr>
          <tr>
            <td>处理结果</td>
            <td>{{DealWith.ProcessingResults}}</td>
          </tr>
          <tr>
            <td>处理备注</td>
            <td>{{DealWith.ProcessingNote}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ReportDel } from '../../../request/api'
export default {
  data() {
    return {
      navigation1: {
        head: '举报详情-已处理(会员)'
      },
      details: {},
      DealWithData: [
        {
          DealWithPersonnel: 'admin',
          ProcessingTime: '2019-07-19 14:48:38',
          ProcessingResults: '无效举报',
          ProcessingNote: '无'
        }
      ],
      DealWith: [{}]
    }
  },
  mounted() {
    this.getReportDel()
  },
  methods: {
    getReportDel() {
      ReportDel({
        reportId: this.$route.query.reportId
      }).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.ReportData = res.data
        }
      })
    }
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
</style>
