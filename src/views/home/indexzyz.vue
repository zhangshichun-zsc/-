<!--系统首页（志愿者）-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="jr">
      <ul>
        <li>
          <div>
            <Icon type="md-aperture" size="40" color="green" />
          </div>
          <div class="jj">
            <p>今日活动总数</p>
            <span>{{activity.activityBatchCount}}</span>
          </div>
        </li>
        <li>
          <div>
            <Icon type="ios-aperture-outline" size="40" color="green" />
          </div>
          <div class="jj">
            <p>昨日活动总数</p>
            <span>{{activity.yesterdayActivityCount}}</span>
          </div>
        </li>
        <li>
          <div>
            <Icon type="md-trending-up" size="40" color="green" />
          </div>
          <div class="jj">
            <p>近7天总数</p>
            <span>{{activity.latest7dayActivityCount}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="sw">
      <p class="dai">
        <span class="cl">待处理事务</span>
        <span class="gd">更多</span>
      </p>
      <div class="sw-bo">
        <ul class="sh">
          <li>
            <span>
              <a @click="examine(3)">待审核报名</a>
            </span>
           <span>
              (
              <b>{{Pending.waitAuditSignUpCount}}</b>)
            </span>
          </li>
          <li>
            <span>
              <a @click="examine(3)">广告位即将到期</a>
            </span>
            <span>
              (
              <b>{{Pending.willExpiredAdvCount}}</b>)
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="rk-head">
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
    </div>
    <div class="hd-ma">
      <div class="hd-on">
        <p>活动总览</p>
        <ul>
          <li>
            <span class="hd-shu">{{activityOverview.offShelfActivityCount}}</span>
            <span>已下架</span>
          </li>
          <li>
            <span class="hd-shu">{{activityOverview.publishActivityCount}}</span>
            <span>已发布</span>
          </li>
          <li>
            <span class="hd-shu">{{activityOverview.beginningActivityCount}}</span>
            <span>进行中</span>
          </li>
          <li>
            <span class="hd-shu">{{activityOverview.endingActivityCount}}</span>
            <span>已结束</span>
          </li>
          <li>
            <span class="hd-shu">{{activityOverview.cancelActivityCount}}</span>
            <span>已取消</span>
          </li>
          <li>
            <span class="hd-shu">{{activityOverview.allActivityCount}}</span>
            <span>全部活动</span>
          </li>
        </ul>
      </div>
      <div class="hd-tw">
        <p>用户总览</p>
        <ul>
          <li>
            <span class="hd-shu">{{userOverview.todayNewUserCount}}</span>
            <span>今日新增</span>
          </li>
          <li>
            <span class="hd-shu">{{userOverview.yesterdayNewUserCount}}</span>
            <span>昨日新增</span>
          </li>
          <li>
            <span class="hd-shu">{{userOverview.currentMonthNewUserCount}}</span>
            <span>本月新增</span>
          </li>
          <li>
            <span class="hd-shu">{{userOverview.voluTatolCount}}</span>
            <span>会员总数</span>
          </li>
        </ul>
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
                <span class="lx-bai">
                  <Icon type="md-arrow-dropup" />10%
                </span>同比上月
              </h2>
            </li>
            <li>
              <span class="lx-by">本周活动数量</span>
              <span class="lx-su">10</span>
              <h2>
                <span class="lx-bai-two">
                  <Icon type="md-arrow-dropdown" />10%
                </span>同比上周
              </h2>
            </li>
          </ul>
        </div>
        <div class="lx-right">
          <ve-line :data="chartData" width="900px" height="323px" :settings="chartSettings"></ve-line>
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
       examinelist:[
      {name:'广告位即将过期',query: "/recommend/vp_adlist"},
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
        }else{
          this.$Message.error(res.msg);
        }
        console.log(res);
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
.jr ul {
  display: flex;
  margin: 20px 0;
}
.jr li {
  width: 250px;
  height: 100px;
  display: flex;
  margin-right: 20px;
  justify-content: flex-start;
  background: #ffffff;
  border: #e4e4e4 1px solid;
}
.jr li div {
  margin: 25px;
}
.jj p {
  width: 6rem;
  font-size: 0.75rem;
  margin: 10px 15px 10px 0;
  color: gray;
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
}

.rk-hd li a {
  font-size: 14px;
  color: black;
}
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
