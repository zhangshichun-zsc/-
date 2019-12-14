<!--系统首页（志愿者）-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="jr">
      <ul>
        <li>
          <div class="jj">
            <p>今日活动总数</p>
            <span>{{ activity.activityBatchCount }}</span>
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
        </p>
        <div class="pending-left-content">
          <li v-for="(item, index) in examinelist" :key="item.name">
            <p>
              <Icon type="md-arrow-dropright" />
              <a @click="examine(index)" href="javascript:;">{{
                item.name || 其他
              }}</a>
              <span v-show="Pending[item.data] > 0" class="dot"></span>
            </p>
            <span>
              (
              <b>{{ Pending[item.data] }}</b
              >)
            </span>
          </li>
        </div>
      </div>
      <div class="pending-right">
        <p class="pending-right-title">快捷入口</p>
        <div class="pending-right-content">
          <ul>
            <li
              @click="Jump(index)"
              v-for="(item, index) in Jumplist"
              :key="index"
              :style="item.name == '快捷入口管理' ? 'width:35%' : ''"
            >
              <div>
                <img
                  class="icon-img2"
                  :src="
                    `https://rhzgtest.co-inclusion.org/app/menu_images/${item.icon}.png`
                  "
                />
              </div>
              <div>
                <a class="name-btn" href="javascript:;">{{ item.name }}</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- <div class="rk-head">
      <p class="rk-top">快捷入口</p>
      <ul class="rk-hd">
        <li>
          <Icon type="home"></Icon>
          <a>活动立项</a>
        </li>
        <li>
          <Icon type="home" size="14px" color="red"></Icon>
          <a>活动</a>
        </li>
        <li>
          <a>报表统计</a>
        </li>
        <li>
          <a>消息管理</a>
        </li>
        <li>
          <a>用户管理</a>
        </li>
        <li>
          <a>广告管理</a>
        </li>
        <li>
          <a>快捷入口管理</a>
        </li>
      </ul>
    </div> -->
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
            <span class="hd-shu">{{ userOverview.voluTatolCount }}</span>
            <span>会员总数</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="lx-on" style="margin-top:20px;">
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
    </div> -->
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
        head: "系统首页（志愿者）"
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
      sysType: 2,
      activity: [],
      Pending: [],
      activityOverview: [],
      userOverview: [],
      examinelist: [
        {
          name: "广告位即将过期",
          query: "/recommend/vun_adlist",
          data: "willExpiredAdvCount"
        }
      ],
      Jumplist: [
        {
          name: "活动发布",
          query: "/activity_vun/volunteer_issue",
          icon: "shortcutEntry_1"
        },
        {
          name: "活动管理",
          query: "/activity_vun/volunteer_activity",
          icon: "shortcutEntry_2"
        },
        {
          name: "用户列表",
          query: "/user/all_member_zyz",
          icon: "shortcutEntry_3"
        },
        {
          name: "报表统计",
          query: "/activity/approval",
          icon: "shortcutEntry_4"
        },
        {
          name: "消息管理",
          query: "/operate/vun_message",
          icon: "shortcutEntry_5"
        },
        {
          name: "广告管理",
          query: "/recommend/vun_adlist",
          icon: "shortcutEntry_6"
        },
        {
          name: "快捷入口管理",
          query: "",
          icon: "shortcutEntry_7"
        }
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
    Jump(index) {
      if (!this.Jumplist[index].query) {
        this.$Message.info("此功能暂未开放，敬请期待~");
        return;
      }
      this.$router.push({
        path: this.Jumplist[index].query
      });
    },
    examine(index) {
      this.$router.push({
        path: this.examinelist[index].query
      });
    }
  }
};
</script>
<style lang="scss" scoped>
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
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
}
.pending-right {
  padding: 22px 32px;
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

.pending-right-title {
  font-size: 18px;
  color: #1b2331;
  font-weight: 800;
}
.pending-right-content {
  // padding: 28px 40px;
  ul {
    li {
      width: 25%;
      margin-top: 30px;
      display: inline-block;
      div {
        margin: 0 auto;
        width: 100%;
        text-align: center;
      }
      .icon-img2 {
        vertical-align: middle;
        border-radius: 50%;
        background: #fef4f5;
        margin: 0 auto;
      }
      .name-btn {
        text-align: center;
        font-size: 12px;
        color: #333333;
        text-align: center;
        line-height: 16px;
      }
    }
  }
}

//待处理事务
.sw {
  border: 2px solid #eeeeee;
  margin-bottom: 10px;
}
.dai {
  background: #eeeeee;
  display: flex;
  justify-content: space-between;
  padding-right: 100px;
  border-bottom: #eeeeee solid 1px;
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
.hd-on {
  width: 1070px;
}
.hd-tw {
  width: 410px;
}
.hd-on,
.hd-tw {
  padding: 30px 22px;
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
  height: 179px;
  p {
    height: 45px;
    font-weight: 800;
    font-size: 18px;
    color: #1b2331;
  }

  ul {
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    li {
      width: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        font-size: 16px;
        color: #8e9192;
      }
      .hd-shu {
        font-size: 30px;
        color: #1b2331;
        text-align: center;
        margin-top: 13px;
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
