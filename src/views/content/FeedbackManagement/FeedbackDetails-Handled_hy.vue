<!--举报详情-已处理(会员)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con-top bk-szy">
        <p>
          <span>意见反馈详情</span>
        </p>
      </div>
      <div class="con bk">
        <table width="100%;" v-for="details in FeedbackData">
          <tr>
            <td>反馈类型</td>
            <td>{{details.FeedbackType}}</td>
          </tr>
          <tr>
            <td>反馈人</td>
            <td>{{details.FeedbackPeople}}</td>
          </tr>
          <tr>
            <td>反馈时间</td>
            <td>{{details.FeedbackTime}}</td>
          </tr>
          <tr>
            <td>反馈内容</td>
            <td>{{details.FeedbackContent}}</td>
          </tr>
          <tr>
            <td>状态</td>
            <td>{{details.state}}</td>
          </tr>
        </table>
        <table width="100%;" v-for="DealWith in DealWithData">
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
export default {
  data() {
    return {
      navigation1: {
        head: '举报详情-已处理(会员)'
      },
      FeedbackData: [
        {
          FeedbackType: '活动反馈',
          FeedbackPeople: '王',
          FeedbackTime: '2019-03-22 11:05',
          FeedbackContent: '增加多种活动形式',
          state: '已回复'
        }
      ],
      DealWithData: [
        {
          DealWithPersonnel: 'admin',
          ProcessingTime: '2019-07-19 14:48:38',
          ProcessingResults: '无效举报',
          ProcessingNote: '无'
        }
      ]
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
