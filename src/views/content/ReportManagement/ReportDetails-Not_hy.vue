<!--举报详情-未处理(会员)-->
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
            <td class="zt">{{reportDetail.reportReasonText}}</td>
          </tr>
          <tr>
            <td class="zt">举报人</td>
            <td class="zt">{{reportDetail.reportUserName}}</td>
          </tr>
          <tr>
            <td class="zt">举报时间</td>
            <td class="zt">{{reportDetail.reportTimestamp}}</td>
          </tr>
          <tr>
            <td class="zt">举报对象</td>
            <td class="zt">{{reportDetail.activityName}}</td>
          </tr>
          <tr>
            <td class="zt">举报状态</td>
            <td class="zt">{{reportDetail.reportStatusText}}</td>
          </tr>
          <tr>
            <td class="zt">举报内容</td>
            <td class="zt">{{reportDetail.reportContent}}</td>
          </tr>
          <tr>
            <td class="zt" style="position:relative">
              <div style="position:absolute;right:27px;">举报图片</div>
            </td>
            <td class="tp">
              <img class="oneTp" v-for="(item,index) in picList" :key="index" :src="item.picPath" />
            </td>
          </tr>
        </table>
        <table width="100%;">
          <tr>
            <td class="zt">处理备注</td>
            <td>
              <Input
                class="zt"
                size="small"
                 style="width: 100%;"
                v-model="reportDetail.answerContent"
              />
            </td>
          </tr>
        </table>
        <div class="but">
          <Button
            size="small"
            type="success"
            v-for="(item,index) in list"
            :key="index"
            @click="btns(item.dicId)"
          >{{item.dicName}}</Button>
          <!-- <Button size="small" type="error">恶意举报</Button>
          <Button size="small" type="error">无效报举</Button>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/request/datatime";
import { ReportDel, Reporttext, Reportdeles } from "@/request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "举报详情-未处理(会员)"
      },
      ReportData: {},
      text: "",
      list: [],
      params: {},
      reportId: this.$route.query.reportId,
      state: this.$route.query.states,

      reportDetail: {},
      picList: {}
    };
  },
  mounted() {
    if (this.state == 1) {
      this.navigation1.head = "举报详情-未处理(会员)";
    } else if (this.state == 2) {
      this.navigation1.head = "举报详情-未处理(志愿者)";
    }
    this.getReportDel();
    this.getReporttext();
  },
  methods: {
    // 详情
    getReportDel() {
      ReportDel({
        reportId: this.reportId
      }).then(res => {
        if (res.code == 200) {
          this.picList = res.data.picList;
          this.reportDetail = res.data.reportDetail;
          this.reportDetail.reportTimestamp = formatDate(
            this.reportDetail.reportTimestamp
          );
        }
        console.log(res);
      });
    },

    //批量操作
    getReportdeles(id) {
      let params = {
        reportIds: this.reportId,
        dealUserId: this.$store.state.userId,
        reportDealResult: id,
        type: 1,
        remark: this.reportDetail.answerContent
      };
      this.params = this.util.remove(params);
      Reportdeles(params).then(res => {
        if (res.code == 200) {
          this.$Message.info("操作成功");
          this.$router.back();
        }
        console.log(res);
      });
    },

    //按钮
    btns(id) {
      this.getReportdeles(id);
    },
    //文本
    getReporttext() {
      Reporttext({}).then(res => {
        if (res.code == 200) {
          this.list = res.data;
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
  background-color: #ffffff;
  min-height: 875px;
  font-size: 18px;
}
.zt {
  font-size: 16px;
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
.tp {
  display: flex;
  align-items: center;
}
.oneTp {
  width: 200px;
  height: 200px;
  padding: 5px;
}
</style>
