<!--活动人员明细（会员）-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="head">
      <p>{{activityName}}</p>
      <span>未开始</span>
    </div>
    <div class="content">
      <ul>
        <li>
          <p>报名</p>
          <table>
            <tr>
              <th>姓名</th>
              <th>手机号码</th>
              <th>报名类型</th>
              <th>报名时间</th>
              <th>报名状态</th>
            </tr>
            <tr>
              <td>{{msg.userName}}</td>
              <td>{{msg.phone}}</td>
              <td>{{msg.roleName}}</td>
              <td>{{msg.createAt}}</td>
              <td v-if='msg.userActType==1'>审核中</td>
              <td v-else-if='msg.userActType==2'>报名成功</td>
              <td v-else-if='msg.userActType==3'>报名被拒绝</td>
              <td v-else-if='msg.userActType==4'>转移中</td>
              <td v-else-if='msg.userActType==5'>被转移中</td>
              <td v-else-if='msg.userActType==6'>转移成功</td>
              <td v-else-if='msg.userActType==7'>自主取消</td>
              <td v-else-if='msg.userActType==8'>主办方取消</td>
              <td v-else-if='msg.userActType==9'>已违约</td>
              <td v-else-if='msg.userActType==10'>排队中</td>
              <td v-else-if='msg.userActType==11'>请假中</td>
              <td v-else-if='msg.userActType==12'>待付款</td>
              <td v-else-if='msg.userActType==13'>拒绝转移</td>
              <td v-else-if='msg.userActType==14'>工作人员</td>
            </tr>
          </table>
        </li>
        <li>
          <p>培训</p>
          <table>
            <tr>
              <th>培训状态</th>
              <th>确认时间</th>
              <!-- <th>操作</th> -->
            </tr>
            <tr>
              <td v-if='msg.trainStatus==1'>未阅读</td>
              <td v-else-if='msg.trainStatus==2'>已阅读</td>
              <td v-else-if='msg.trainStatus==3'>已确认</td>
              <td>{{msg.trainTime}}</td>
            </tr>
          </table>
        </li>
        <li>
          <p>签到</p>
          <table>
            <tr>
              <th>签到状态</th>
              <th>签到时间</th>
              <th>签到地点</th>
            </tr>
            <tr>
              <td v-if='msg.signStatus==0'>未签到</td>
              <td v-else-if='msg.signStatus==1'>已签到</td>
              <td v-else-if='msg.signStatus==2'>迟到</td>
              <td>{{msg.signAt}}</td>
              <td>{{msg.signAddress}}</td>
            </tr>
          </table>
        </li>
        <li>
          <p>反馈</p>
          <table>
            <tr>
              <th>反馈状态</th>
              <th>提交时间</th>
              <!-- <th>操作</th> -->
            </tr>
            <tr>
              <td v-if='msg.feedStatus==1'>已反馈</td>
              <td v-else-if='msg.feedStatus==2'>未反馈</td>
              <td>{{msg.feedAt}}</td>
              <td @click="jump">详情</td>
            </tr>
          </table>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { userDetail ,feendDetail } from '@/request/api'

export default {
  data() {
    return {
      navigation1: {
        head: "活动人员明细(会员)"
      },
      actUserId:1,
      msg:{},
      activityName: this.$route.query.activityName,
    };
  },

  components: {  },

  computed: {},

  created() {
    this.actUserId = this.$route.query.actUserId
    this.getUserDetail()
  },

  methods: {
    getUserDetail(){
      feendDetail({actUserId:this.actUserId}).then(res => {
        this.msg = res.data
      })
    },
    jump(){
      this.$router.push({
        name: 'feedDetail',
        query: {
          activityUserId: this.actUserId
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.head {
  height: 70px;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  align-items: flex-start;
  margin-bottom: 20px;
  p {
    margin: 5px 0px;
    font-size: 20px;
    height: 20px;
  }
}
.content {
  padding-left: 40px;
  li{
    margin: 20px 0;
  }
  table {
    border: 1px solid #e4e4e4;
    td,
    th {
      height: 30px;
      border: 1px solid #e4e4e4;
      text-align: center;
      line-height: 30px;
      width: 120px;
    }
    th {
      // font-weight: 700;
      background: #e4e4e4;
    }
    td {
      background: #ffffff;
    }
    // background: #cccccc;
    height: 60px;
  }
}
</style>
