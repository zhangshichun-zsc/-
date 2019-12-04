<!--系统首页（会员）-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <!-- 立项数量 -->
    <div class="jr">
      <ul>
        <li>
          <div class="jj">
            <p>今日立项总数</p>
            <span>{{ activity.activityBatchCount }}</span>
          </div>
          <div>
            <img class="icon-img" src="@/assets/images/activity1.png" />
          </div>
        </li>
        <li>
          <div class="jj">
            <p>今日活动总数</p>
            <span>{{ activity.todayActivityCount }}</span>
          </div>
          <div>
            <img class="icon-img" src="@/assets/images/activity2.png" />
          </div>
        </li>
        <li>
          <div class="jj">
            <p>昨日活动总数</p>
            <span>{{ activity.yesterdayActivityCount }}</span>
          </div>
          <div>
            <img class="icon-img" src="@/assets/images/activity3.png" />
          </div>
        </li>
        <li>
          <div class="jj">
            <p>近7天总数</p>
            <span>{{ activity.latest7dayActivityCount }}</span>
          </div>
          <div>
            <img class="icon-img" src="@/assets/images/activity4.png" />
          </div>
        </li>
      </ul>
    </div>

    <div class="pending-box">
      <div class="pending-left">
        <p class="pending-left-title">
          <span>待处理事务</span>
          <!-- <span class="more">查看更多</span> -->
        </p>
        <div class="pending-left-content">
          <li>
            <p>
              <Icon type="md-arrow-dropright" />
              <a href="javascript:;">待审核立项</a>
              <span
                v-show="Pending.unauditActivityCount > 0"
                class="dot"
              ></span>
            </p>
            <span>
              (
              <b>{{ Pending.unauditActivityCount }}</b
              >)
            </span>
          </li>
          <li>
            <p>
              <Icon type="md-arrow-dropright" />
              <a href="javascript:;">待审核转移人员</a>
              <span
                v-show="Pending.unauditActivityCount > 0"
                class="dot"
              ></span>
            </p>

            <span>
              (
              <b>{{ Pending.qualAuditCount }}</b
              >)
            </span>
          </li>
          <li>
            <p>
              <Icon type="md-arrow-dropright" />
              <a href="javascript:;">待审核报名</a>
              <span
                v-show="Pending.unauditActivityCount > 0"
                class="dot"
              ></span>
            </p>

            <span>
              (
              <b>{{ Pending.waitAuditSignUpCount }}</b
              >)
            </span>
          </li>
          <li>
            <p>
              <Icon type="md-arrow-dropright" />
              <a href="javascript:;">广告位即将到期</a>
              <span
                v-show="Pending.unauditActivityCount > 0"
                class="dot"
              ></span>
            </p>

            <span>
              (
              <b>{{ Pending.willExpiredAdvCount }}</b
              >)
            </span>
          </li>
          <li>
            <p>
              <Icon type="md-arrow-dropright" />
              <a href="javascript:;">待领取物质</a>
              <span
                v-show="Pending.unauditActivityCount > 0"
                class="dot"
              ></span>
            </p>
            <span>
              (
              <b>{{ Pending.unReceiveCount }}</b
              >)
            </span>
          </li>
        </div>
      </div>

      <div class="pending-right"></div>
    </div>

    <div class="sw">
      <div class="sw-bo">
        <ul class="sh">
          <li>
            <span>
              <a @click="examine(0)">待审核立项</a>
            </span>
            <span>
              (
              <b>{{ Pending.unauditActivityCount }}</b
              >)
            </span>
          </li>
          <li>
            <span>
              <a @click="examine(2)">待审核转移人员</a>
            </span>
            <span>
              (
              <b>{{ Pending.qualAuditCount }}</b
              >)
            </span>
          </li>
          <li>
            <span>
              <a @click="examine(4)">待审核报名</a>
            </span>
            <span>
              (
              <b>{{ Pending.waitAuditSignUpCount }}</b
              >)
            </span>
          </li>
        </ul>
        <ul class="lb-gg">
          <li class="le">
            <span>
              <a @click="examine(1)">广告位即将到期</a>
            </span>
            <span>
              (
              <b>{{ Pending.willExpiredAdvCount }}</b
              >)
            </span>
          </li>
          <li class="le">
            <span>
              <a @click="examine(3)">待领取物质</a>
            </span>
            <span>
              (
              <b>{{ Pending.unReceiveCount }}</b
              >)
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div class="rk-head">
      <p class="rk-top">快捷入口</p>
      <ul class="rk-hd">
        <li @click="Jump(index)" v-for="(item, index) in Jumplist" :key="index">
          <a>{{ item.name }}</a>
        </li>
        <li @click="modal1 = true">
          <a>快捷入口管理</a>
        </li>
      </ul>
    </div>
    <Modal
      v-model="modal1"
      width="1000"
      :mask="false"
      :styles="{ left: '18px' }"
    >
      <div class="rk-head">
        <p class="rk-top">已选快捷入口</p>
        <ul class="rk-hd">
          <li v-for="(item, index) in Jumplist" :key="index">
            <p>
              <a>{{ item.name }}</a>
            </p>
            <p class="del">
              <a>删除</a>
            </p>
          </li>
          <li @click="modal1 = true">
            <a>快捷入口管理</a>
          </li>
        </ul>
      </div>
      <div class="rk-head">
        <p class="rk-top">未选快捷入口</p>
        <ul class="rk-hd">
          <li v-for="(item, index) in Jumplist" :key="index">
            <p>
              <a>{{ item.name }}</a>
            </p>
            <p class="del">
              <a>添加</a>
            </p>
          </li>
        </ul>
      </div>

      <div slot="footer"></div>
    </Modal>
    <div class="hd-ma">
      <div class="hd-on">
        <p>活动总览</p>
        <ul>
          <li>
            <span class="hd-shu">{{
              activityOverview.offShelfActivityCount
            }}</span>
            <span>已下架</span>
          </li>
          <li>
            <span class="hd-shu">{{
              activityOverview.publishActivityCount
            }}</span>
            <span>已发布</span>
          </li>
          <li>
            <span class="hd-shu">{{
              activityOverview.beginningActivityCount
            }}</span>
            <span>进行中</span>
          </li>
          <li>
            <span class="hd-shu">{{
              activityOverview.endingActivityCount
            }}</span>
            <span>已结束</span>
          </li>
          <li>
            <span class="hd-shu">{{
              activityOverview.cancelActivityCount
            }}</span>
            <span>已取消</span>
          </li>
          <li>
            <span class="hd-shu">{{ activityOverview.allActivityCount }}</span>
            <span>全部活动</span>
          </li>
        </ul>
      </div>
      <div class="hd-tw">
        <p>用户总览</p>
        <ul>
          <li>
            <span class="hd-shu">{{ userOverview.todayNewUserCount }}</span>
            <span>今日新增</span>
          </li>
          <li>
            <span class="hd-shu">{{ userOverview.yesterdayNewUserCount }}</span>
            <span>昨日新增</span>
          </li>
          <li>
            <span class="hd-shu">{{
              userOverview.currentMonthNewUserCount
            }}</span>
            <span>本月新增</span>
          </li>
          <li>
            <span class="hd-shu">{{ userOverview.memberTatolCount }}</span>
            <span>会员总数</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="lx-on">
      <p>立项统计</p>
      <div class="lx-nr">
        <div class="lx-left">
          <ul>
            <li>
              <span class="lx-by">本月立项总数</span>
              <span class="lx-su">40</span>
              <h2>
                <span class="lx-bai"> <Icon type="md-arrow-dropup" />10% </span
                >同比上月
              </h2>
            </li>
            <li>
              <span class="lx-by">本周立项数量</span>
              <span class="lx-su">10</span>
              <h2>
                <span class="lx-bai-two">
                  <Icon type="md-arrow-dropdown" />10% </span
                >同比上周
              </h2>
            </li>
          </ul>
        </div>
        <div class="lx-right">
          <ve-line
            :data="chartData"
            width="900px"
            height="323px"
            :settings="chartSettings"
          ></ve-line>
          <i-col span="12">
            <Date-picker
              :value="value2"
              format="yyyy/MM/dd"
              type="daterange"
              placement="bottom-end"
              placeholder="选择日期"
              style="width: 200px"
            ></Date-picker>
          </i-col>
        </div>
      </div>
    </div>
    <div class="lx-on" style="margin-top:20px;">
      <p>活动统计</p>
      <div class="lx-nr">
        <div class="lx-left">
          <ul>
            <li>
              <span class="lx-by">本月活动总数</span>
              <span class="lx-su">40</span>
              <h2>
                <span class="lx-bai"> <Icon type="md-arrow-dropup" />10% </span
                >同比上月
              </h2>
            </li>
            <li>
              <span class="lx-by">本周活动数量</span>
              <span class="lx-su">10</span>
              <h2>
                <span class="lx-bai-two">
                  <Icon type="md-arrow-dropdown" />10% </span
                >同比上周
              </h2>
            </li>
          </ul>
        </div>
        <div class="lx-right">
          <ve-line
            :data="chartData"
            width="900px"
            height="323px"
            :settings="chartSettings"
          ></ve-line>
          <i-col span="12">
            <Date-picker
              :value="value2"
              format="yyyy/MM/dd"
              type="daterange"
              placement="bottom-end"
              placeholder="选择日期"
              style="width: 200px"
            ></Date-picker>
          </i-col>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Homeactivity, Homeactpend, Homeactwhole } from "../../request/api";
export default {
  data() {
    this.chartSettings = {
      stack: { 用户: ["访问用户", "下单用户"] },
      area: true
    };
    return {
      navigation1: {
        head: "系统首页（会员）"
      },
      value1: "2016-01-01",
      value2: ["2016-01-01", "2016-02-15"],
      chartData: {
        columns: ["日期", "本周"],
        rows: [
          { 日期: "06-01周六", 今日: 1, 本周: 1, 本月: 1 },
          { 日期: "06-02周六", 今日: 1, 本周: 3, 本月: 2 },
          { 日期: "06-03周六", 今日: 1, 本周: 2, 本月: 3 },
          { 日期: "06-04周六", 今日: 6, 本周: 1, 本月: 2 },
          { 日期: "06-05周六", 今日: 4, 本周: 3, 本月: 4 },
          { 日期: "06-06周六", 今日: 5, 本周: 4, 本月: 3 }
        ]
      },
      modal1: false,
      sysType: 1,
      activity: [],
      Pending: [],
      activityOverview: [],
      userOverview: [],
      Jumplist: [
        { name: "活动立项", query: "/activity/approval" },
        { name: "活动管理", query: "/activity/manager" },
        { name: "用户列表", query: "/user/all_member_hy" },
        { name: "报表统计", query: "/activity/approval" },
        { name: "消息管理", query: "/operate/vp_message" },
        { name: "广告管理", query: "/recommend/vp_adlist" }
      ],
      examinelist:[{name:'活动立项',query: "/activity/approval"},
      {name:'广告位即将过期',query: "/recommend/vp_adlist"},
      {name:'待审核审批人员',query: "/activity/pending"},
      {name:'待领取物质',query: "/activity/pending"},
        {name:'待审核报名',query: "/activity/list"},

      ]
    };
  },
  components: {},

  computed: {},

  created() {},
  mounted() {
    this.getHomeactivity();
    this.getHomeactpend();
    this.getHomeactwhole();
  },
  methods: {
    //首页-活动计数
    getHomeactivity() {
      Homeactivity({
        sysType: this.sysType
      }).then(res => {
        if (res.code == 200) {
          this.activity = res.data;
        } else {
        }
        console.log(res);
      });
    },

    //首页--待处理事务
    getHomeactpend() {
      Homeactpend({
        sysType: this.sysType
      }).then(res => {
        if (res.code == 200) {
          this.Pending = res.data;
        }
        console.log(res);
      });
    },
    //首页--活动总览
    getHomeactwhole() {
      Homeactwhole({
        sysType: this.sysType
      }).then(res => {
        if (res.code == 200) {
          this.userOverview = res.data.userOverview;
          this.activityOverview = res.data.activityOverview;
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },
    //跳转
    Jump(index) {
      this.$router.push({
        path: this.Jumplist[index].query
      });
    },
    examine(index){
      this.$router.push({
        path:this.examinelist[index].query
      })
    }
  }
};
</script>
<style lang="scss" scoped>
//  当宽度界限 lg: '992px',xl: '1200px', xxl: '1600'
@media screen and (max-width: 1600px) {
}

@media screen and (max-width: 1200px) {
  .jr li {
    width: 360px !important;
  }
}

@media screen and (max-width: 992px) {
  .jr li {
    width: 360px !important;
  }

  .jr li div {
    padding: 40px 30px;
  }
}

.icon-img {
  width: 50px;
  height: 50px;
}

.head {
  height: 50px;
  line-height: 50px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  background-color: rgba(243, 243, 243, 1);
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.jr ul {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
.jr li {
  width: 376px;
  height: 150px;
  border: #e4e4e4 1px solid;
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  display: flex;
}
.jr li div {
  // margin: 25px;
  padding: 40px 30px;
}
.jj p {
  width: 6rem;
  margin: 10px 15px 0 0;
  font-size: 16px;
  color: #8e9192;
  line-height: 20px;
}
.jj span {
  font-size: 36px;
  color: #1b2331;
  line-height: 35px;
  // font-weight: 800;
}

//待处理事务
.pending-box {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-bottom: 20px;
}
.pending-left {
  padding: 22px 32px;
  width: 1070px;
  height: 320px;
  background: #fff;
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
}
.pending-right {
  width: 410px;
  height: 320px;
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
}

.pending-left-title {
  font-size: 18px;
  color: #1b2331;
  font-weight: 800;
  display: flex;
  justify-content: space-between;
}
.pending-left .more {
  font-size: 16px;
  color: #8e9192;
  text-align: right;
}
.pending-left-content {
  margin-bottom: 20px;
}
.pending-left-content li {
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  font-size: 16px;
  color: #1b2331;
  letter-spacing: 0;
  line-height: 42px;
  position: relative;
  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #fc4c51;
    border-radius: 50%;
    margin-top: 8px;
    vertical-align: top;
  }
}
.pending-left-content li a {
  margin-left: 5px;
  margin-right: 5px;
  color: #1b2331;
}

.gd {
  line-height: 45px;
  height: 45px;
  font-size: 16px;
}
.cl {
  height: 45px;
  line-height: 45px;
  padding-left: 20px;
  font-weight: 700;
}
.sh {
  background: #ffffff;
  display: flex;
  flex-direction: column;
}
.sh li,
.lb-gg li {
  height: 40px;
  width: 305px;
  border-bottom: #eeeeee 1px solid;
  margin: 10px 20px;
  line-height: 40px;
  padding-left: 15px;
  display: flex;
  justify-content: space-between;
  span {
    b {
      color: red;
    }
  }
}
.sh li a,
.lb-gg li a {
  font-size: 14px;
  color: black;
}
.lb-gg li a:hover,
.sh li a:hover {
  color: rgb(26, 188, 156);
}

.rk {
  height: 200px;
  border: 1px solid #eeeeee;
}
.sw-bo {
  display: flex;
  background: #ffffff;
}
.rk-head {
  border: #eeeeee 1px solid;
}
.rk-top {
  border-bottom: #eeeeee 1px solid;
  background: #eeeeee;
  font-size: 14px;
  height: 45px;
  line-height: 45px;
  font-weight: 700;
  padding-left: 20px;
  color: black;
}
.rk-hd {
  display: flex;
  background: #ffffff;
}
.rk-hd li {
  height: 150px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.del {
  color: red;
  margin-top: 10px;
  a {
    color: red;
  }
}

.rk-hd li a {
  font-size: 14px;
  color: black;
}
// .rk-hd li a:hover{
//   a{
//     color: green;
//   }
// }
.rk-hd li:hover {
  background: #ebebeb;
  a {
    color: green;
  }
}
.hd-ma {
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
}
.hd-on,
.hd-tw {
  height: 200px;
  width: 520px;
  border: #e4e4e4 solid 1px;
  p {
    background: #f3f3f3;
    padding-left: 20px;
    height: 45px;
    line-height: 45px;
    font-weight: 700;
    border-bottom: #e4e4e4 solid 1px;
  }

  ul {
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 153px;
    li {
      height: 100px;
      width: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .hd-shu {
        font-size: 20px;
        color: red;
        margin-bottom: 20px;
      }
    }
  }
}
.lx-on {
  height: 370px;
  border: #e4e4e4 1px solid;
  p {
    height: 45px;
    line-height: 45px;
    background: #f3f3f3;
    padding-left: 20px;
    border-bottom: #e4e4e4 solid 1px;
  }
  .lx-nr {
    display: flex;
    height: 323px;
    .lx-left {
      background: #ffffff;
      height: 100%;
      width: 200px;
      padding: 0 30px;
      font-size: 12px;
      border-right: #ebebeb solid 1px;
      li {
        display: flex;
        flex-direction: column;
        .lx-by {
          margin-top: 20px;
          height: 20px;
          line-height: 20px;
        }
        .lx-su {
          font-size: 28px;
          height: 40px;
          line-height: 40px;
        }
        h2 {
          color: #cccccc;
        }
        .lx-bai {
          color: green;
          margin: 0 4px;
          height: 21px;
          line-height: 21px;
        }
        .lx-bai-two {
          color: red;
          margin: 0 4px;
          height: 21px;
          line-height: 21px;
        }
      }
    }
  }

  .lx-tb {
    display: flex;
  }
}
.lx-right {
  position: relative;
  height: 323px;
}
.ivu-col-span-12 {
  position: absolute;
  top: 0;
  right: 80px;
  width: 200px;
}
</style>
