<!--用户详情(会员)-->
<template>
  <div class="box">
    <div class="btn-box">
      <a href="javascript:;" class="act-tn ">用户详情</a>
      <a href="javascript:;" @click="Editor()">编辑资料</a>
      <a href="javascript:;" @click="Log()">登录日志</a>
    </div>
    <div class="content-box">
      <Navigation style="background:#fff" :labels="navigation1"></Navigation>
      <div class="main">
        <div class="content-top flex-center-start">
          <div class="bk">
            <div class="portrait">
              <img
                class="img-src"
                v-if="basicInfo.avatarPath"
                :src="basicInfo.avatarPath"
                alt=""
              />
              <Avatar v-else icon="ios-person" size="large" />
              <!-- <p>
              <span>黄金会员</span>
              <Icon type="ios-cog-outline" size='30' @click="jump()" />
            </p> -->
            </div>
            <div class="details">
              <p>
                <span>分类：</span>
                <span v-for="item in role">{{ item }}</span>
              </p>
            </div>
            <div class="details">
              <p>
                <span>标签：</span>
                <span v-for="item in userLabel">{{ item }}</span>
              </p>
            </div>
          </div>
          <table>
            <tr>
              <th>姓名</th>
              <td>{{ basicInfo.userName }}</td>
              <th>身份证号</th>
              <td>{{ basicInfo.idCard }}</td>
            </tr>
            <tr>
              <th>昵称</th>
              <td>{{ basicInfo.nickname }}</td>
              <th>邮箱</th>
              <td>{{ basicInfo.email }}</td>
            </tr>
            <tr>
              <th>性别</th>
              <td>{{ basicInfo.sex }}</td>
              <th>活动关注型</th>
              <td>{{ basicInfo.role }}</td>
            </tr>
            <tr>
              <th>生日</th>
              <td>{{ basicInfo.birthday }}</td>
              <th>注册时间</th>
              <td>{{ basicInfo.createTime }}</td>
            </tr>
            <tr>
              <th>城市</th>
              <td>{{ basicInfo.city }}</td>
              <th>vip到期时间</th>
              <td>{{ basicInfo.vipLastTime }}</td>
            </tr>
          </table>
        </div>
        <div class="content bk">
          <div class="content-item">
            <div class="item-title">
              <Icon type="md-bookmark" />
              <span>统计信息</span>
            </div>
            <Table border :columns="columns1" :data="statisticsInfo"></Table>
          </div>
          <div class="content-item">
            <div class="item-title">
              <Icon type="md-bookmark" />
              <span>组织信息</span>
            </div>
            <Table border :columns="columns2" :data="orgRecordList"></Table>
          </div>
          <div class="content-item">
            <div class="item-title">
              <Icon type="md-bookmark" />
              <span>收货地址</span>
            </div>
            <Table border :columns="columns3" :data="userAdderes"></Table>
          </div>
          <div class="content-item">
            <div class="item-title">
              <Icon type="md-bookmark" />
              <span>活动记录</span>
            </div>
            <Table border :columns="columns4" :data="activityRecord"></Table>
          </div>
          <!-- <div class="content-item">
          <div class="item-title">
            <Icon type="md-bookmark" />
            <span>赞助记录</span>
          </div>
          <Table border :columns="columns5" :data="data5"></Table>
        </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../request/datatime";
import Public from "./config/index";
export default {
  data() {
    return {
      navigation1: {
        head: "用户详情(会员)"
      },
      columns1: [
        {
          title: "立项数量",
          key: "establishNum"
        },
        {
          title: "活动报名数量",
          key: "signUpNum"
        },
        {
          title: "积分",
          key: "score"
        },
        {
          title: "收藏类型(个)",
          key: "collectNum"
        },
        {
          title: "活动评价",
          key: "activityEvaluateNum"
        },
        {
          title: "活动反馈",
          key: "activityFeedbackNum"
        },
        {
          title: "邀请好友",
          key: "inviteNum"
        },
        {
          title: "活动时长（小时）",
          key: "joinActLength"
        }
      ],
      columns2: [
        {
          title: "组织名称",
          key: "orgName"
        },
        {
          title: "省份",
          key: "provinceName"
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "单位职务",
          key: "userType"
        }
      ],
      columns3: [
        {
          title: "姓名",
          key: "consignee"
        },
        {
          title: "手机号码",
          key: "tel"
        },
        {
          title: "详细地址",
          key: "address"
        },
        {
          title: "默认地址",
          key: "defaultAddress",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: true,
                  disabled: true
                }
              })
            ]);
          }
        }
      ],
      columns4: [
        {
          title: "活动名称",
          key: "name"
        },
        {
          title: "活动时间",
          key: "startAt",
          render: (h, params) => {
            return h("div", formatDate(params.row.startAt));
          }
        },
        {
          title: "用户账号",
          key: "account"
        },
        {
          title: "参与类型",
          key: "joinType"
        },
        {
          title: "活动类型",
          key: "categoryName"
        },
        {
          title: "状态",
          key: "joinStatus"
        },
        {
          title: "操作",
          key: "operation",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  clssName: "action",
                  style: {
                    color: "green"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "profile",
                        query: {
                          userId: params.row.activityId
                        }
                      });
                    }
                  }
                },
                "查看活动"
              )
            ]);
          }
        }
      ],
      columns5: [
        {
          title: "赞助时间",
          key: "SponsoredTime"
        },
        {
          title: "用户账号",
          key: "UserAccount"
        },
        {
          title: "赞助类型",
          key: "SponsorshipType"
        },
        {
          title: "额度",
          key: "lines"
        },
        {
          title: "周期",
          key: "cycle"
        },
        {
          title: "总金额",
          key: "TotalAmount",
          Color: "#1ABD9D"
        },
        {
          title: "记录人",
          key: "recorder",
          Color: "#1ABD9D"
        }
      ],
      data5: [],
      role: [], //  分类
      userLabel: [], // 标签
      basicInfo: {}, //用户信息
      statisticsInfo: [], // 统计信息
      activityRecord: [], // 活动记录
      userAdderes: [], //收货地址
      orgRecordList: [] // 组织
    };
  },
  methods: {
    Editor() {
      this.$router.push({
        name: "Edit_data_hy",
        query: {
          userId: this.$route.query.userId
        }
      });
    },
    Log() {
      this.$router.push({
        name: "Login_hy",
        query: {
          userId: this.$route.query.userId
        }
      });
    },
    jump() {
      this.$router.push({ name: "Beneficiary_level_setting" });
    },
    //列表数据
    getUserdetail() {
      Public.Userdetail({
        sysType: "1",
        userId: this.$route.query.userId
      }).then(res => {
        if (res.code == 200) {
          this.basicInfo = res.data.basicInfo;

          this.basicInfo.vipLastTime = formatDate(this.basicInfo.vipLastTime);
          this.basicInfo.birthday = formatDate(this.basicInfo.birthday);
          this.basicInfo.createTime = formatDate(this.basicInfo.createTime);

          this.statisticsInfo = [res.data.statisticsInfo];
          this.activityRecord = res.data.activityRecord;
          this.userAdderes = res.data.userAdderes;
          this.orgRecordList = res.data.orgRecordList;

          if (this.basicInfo.userLabel) {
            console.log();
            this.userLabel = res.data.basicInfo.userLabel.split(",");
          }
          if (this.basicInfo.role) {
            this.role = res.data.basicInfo.role.split(",");
          }
        }
      });
    }
  },
  mounted() {
    this.getUserdetail();
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 50rem;
  margin: 0 auto;
}
.bk {
  border: 1px solid #e4e4e4;
}
.portrait {
  padding: 0.5rem;
  display: block;
  justify-content: center;
  text-align: center;
  align-items: center;
  p {
    font-size: 15px;
    span {
      border-radius: 15px;
      background-color: red;
      padding: 0 0.3rem;
      line-height: 30px;
      color: white;
    }
  }
}
.details {
  font-size: 16px;
  padding: 0.3rem;
  border-top: 1px solid #e4e4e4;
  span:nth-child(1n + 2) {
    border-radius: 50%;
    border: 1px solid;
    padding: 0 0.5rem;
    margin: 0 0.1rem;
  }
}
.content-top {
  table {
    border: 1px solid #e4e4e4;
    td,
    th {
      height: 32px;
      border: 1px solid #e4e4e4;
      text-align: center;
      line-height: 32px;
    }
    th {
      font-weight: 700;
      width: 100px;
    }
    td {
      width: 300px;
      background: #ffffff;
    }
    width: 800px;
  }
}
.content {
  margin: 1rem 0;
  padding: 0.5rem;
}
.content-item {
  margin: 0.5rem;
}
.item-title {
  padding: 0.5rem 0;
}
.img-src {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.box {
  padding-top: 26px;
}

.btn-box a {
  display: inline-block;
  width: 104px;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  color: #8e9192;
  text-align: center;
  margin: 0 5px;
}

.btn-box .act-tn {
  background: #ffffff;
  border-radius: 20px;
  font-size: 15px;
  color: #1b2331;
}
</style>
