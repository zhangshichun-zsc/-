<!--举报详情-已处理(会员)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con-top">
        <p>
          <span class="zt">举报详情</span>
        </p>
      </div>
      <div class="con">
        <table width="100%;">
          <tr>
            <td class="zt">举报理由</td>
            <td class="zt">{{ReportData.reportReasonText?ReportData.reportReasonText:''}}</td>
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
            <td class="zt">{{ReportData.reportStatusText}}</td>
          </tr>
          <tr>
            <td class="zt">举报内容</td>
            <td class="zt">{{ReportData.reportContent}}</td>
          </tr>
          <tr>
            <td class="zt" style="position:relative">
              <div style="position:absolute;right:27px;">举报图片</div>
            </td>
            <td class="tp">
              <img class="oneTp" v-for='(item,index) in picList' :key="index" :src="item.picPath"></img>
            </td>
          </tr>
        </table>

        <table width="100%;">
          <tr>
            <td class="zt">处理人员</td>
            <td class="zt">{{ ReportData.answerUserName }}</td>
          </tr>
          <tr>
            <td class="zt">处理时间</td>
            <td class="zt">{{ ReportData.answerTimestamp }}</td>
          </tr>
          <tr>
            <td class="zt">处理结果</td>
            <td class="zt">{{ ReportData.reportDealResultText }}</td>
          </tr>
          <tr>
            <td class="zt">处理备注</td>
            <td class="zt">
              {{ ReportData.answerContent ? ReportData.answerContent : "" }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/request/datatime";
import { ReportDel } from "../../../request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "举报详情-已处理(会员)"
      },
      ReportData: {},
      state:this.$route.query.states,
      reportId:this.$route.query.reportId,
       picList:[]
    };
  },
  mounted() {
    if (this.state == 1) {
      this.navigation1.head = "举报详情-已处理(会员)";
    } else if (this.state == 2) {
      this.navigation1.head = "举报详情-已处理(志愿者)";
    }
    this.getReportDel();
  },
  methods: {
    // 详情
    getReportDel() {
      ReportDel({
        reportId: this.reportId
      }).then(res => {
        if (res.code == 200) {
          this.ReportData = res.data.reportDetail;
          this.picList=res.data.picList
          this.ReportData.reportTimestamp = formatDate(
                    res.data.reportDetail.reportTimestamp
          );
          this.ReportData.answerTimestamp = formatDate(
              res.data.reportDetail.answerTimestamp
          );
        }
        console.log(res);
      });
    }
  }
};
</script>
<style scoped>
html,
body {
  margin: auto;
}
.main {
  font-size: 18px;
}

.bk,
.con td {
  border: 1px solid #e4e4e4;
}
.content {
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
}
.con-top {
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
  text-align: center;
  width: 6rem;
}
.con td {
  padding: 0.5rem 1rem;
}
.con table {
  margin-bottom: 1rem;
}
.zt {
  font-size: 16px;
}
.tp{
  display: flex;
  align-items: center;
}
.oneTp{
  width: 200px;
  height: 200px;
  padding: 5px;
}
</style>
