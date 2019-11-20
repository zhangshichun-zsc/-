<!--举报详情-已处理(志愿者)-->
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
        <table width="100%;"  v-for="details in ReportData">
          <tr>
            <td>举报理由</td>
            <td>{{details.ReportReason}}</td>
          </tr>
          <tr>
            <td>举报人</td>
            <td>{{details.Whistleblowers}}</td>
          </tr>
          <tr>
            <td>举报时间</td>
            <td>{{details.ReportTime}}</td>
          </tr>
          <tr>
            <td>举报对象</td>
            <td>{{details.ReportObject}}</td>
          </tr>
          <tr>
            <td>举报状态</td>
            <td>{{details.ReportStatus}}</td>
          </tr>
          <tr>
            <td>举报内容</td>
            <td>{{details.ReportContent}}</td>
          </tr>
        </table>
        <table width="100%;"  v-for="DealWith in DealWithData">
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
    data () {
      return {
        navigation1: {
          head: "举报详情-已处理(志愿者)"
        },
        ReportData:[
          {
            ReportReason:'存在不良信息',
            Whistleblowers:'王',
            ReportTime:'2019-03-22 11:05',
            ReportObject:'5-12 行走在夏日',
            ReportStatus:'已处理',
            ReportContent:'暴露隐私'
          }
        ],
        DealWithData:[
          {
            DealWithPersonnel:'admin',
            ProcessingTime:'2019-07-19 14:48:38',
            ProcessingResults:'无效举报',
            ProcessingNote:'无',
          }
        ]
      }
    }
  }

</script>
<style scoped>
  html,body{
    margin: auto;
  }
  .main{
    background-color: #ffffff;
  }
  .main,
  .bk,
  .con td{
    border: 1px solid #E4E4E4;
  }
  .content{
    margin: 1rem;
  }
  .con-top{
    background-color: #F3F3F3;
    justify-content: space-between;
    padding:0.5rem 1rem;
  }
  .con-top p,
  .con{
    font-size: 12px;
  }
  .bk-szy{
    border-left: 1px solid #E4E4E4;
    border-right: 1px solid #E4E4E4;
    border-top: 1px solid #E4E4E4;
  }
  .con{
    padding: 1rem 8rem;
  }
  .con td:nth-child(1){
    text-align: right;
    width: 6rem;
  }
  .con td{
    padding: 0.5rem 1rem;
  }
  .con table{
    margin-bottom: 1rem;
  }
</style>
