<!--活动人员明细（会员）-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="wapper">
      <div class="head">
        <p>{{ activityName }}</p>
        <p>{{ activeState[msg.actStatus].name }}</p>
      </div>
      <div class="content">
        <ul>
          <li class="sign">
            <p>报名</p>
            <table :style="{width:(5+msg.items.length)*200+'px'}">
              <tr>
                <th>姓名</th>
                <th>手机号码</th>
                <th>报名类型</th>
                <th>报名时间</th>
                <th>报名状态</th>
                <th v-for='(item,index) in msg.items' :key='index'>{{ item.itemName }}</th>
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
                <td v-for='(val,i) in msg.items' :key='i'>{{ val.itemValue }}</td>
              </tr>
            </table>
          </li>
          <li>
            <p>培训</p>
            <table>
              <tr>
                <th>培训状态</th>
                <th>确认时间</th>
              </tr>
              <tr>
                <td>{{ trainStatus[msg.trainStatus-1] }}</td>
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
                <th style="width:500px">签到地点</th>
              </tr>
              <tr>
                <td>{{ signStatus[msg.signStatus] }}</td>
                <td>{{msg.signAt}}</td>
                <td style="width:500px">{{msg.signAddress}}</td>
              </tr>
            </table>
          </li>
          <li>
            <p>反馈</p>
            <table>
              <tr>
                <th>反馈状态</th>
                <th>提交时间</th>
                <th>操作</th>
              </tr>
              <tr>
                <td>{{ msg.feedStatus==1?"已反馈":"未反馈"}}</td>
                <td>{{msg.feedAt}}</td>
                <td @click="jump" style="cursor:'pointer'">详情</td>
              </tr>
            </table>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { feendDetail } from '@/request/api'

export default {
  data() {
    return {
      navigation1: {
        head: "活动人员明细"
      },
      actUserId:1,
      msg:{},
      activeState: this.$store.state.activeState,
      activityName: this.$route.query.activityName,
      signStatus: ["未签到","未反馈","迟到"],
      trainStatus: ["未阅读","已阅读","已确认"]
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
.wapper{
  padding: 20px;
  background: #fff;
  border-radius: 20px;
}
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
.sign{
  max-width: 100%;
  overflow-x: scroll;
}
.content {
  padding-left: 40px;
  li{
    margin: 20px 0;
    p{
      margin: 10px 0;
      font-size: 20px;
      font-weight: bold;
    }
  }
  table {
    border: 1px solid #e4e4e4;
    td,
    th {
      height: 50px;
      border: 1px solid #e4e4e4;
      text-align: center;
      line-height: 50px;
      width: 200px;
      white-space: nowrap;
      overflow: hidden;
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
