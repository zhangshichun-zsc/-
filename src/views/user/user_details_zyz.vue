<!--用户详情(志愿者)-->
<template>
  <div class="box">
    <div class="btn-box">
      <a href="javascript:;" class="act-tn ">用户详情</a>
      <a href="javascript:;" @click="Editor()">编辑资料</a>
      <a href="javascript:;" @click="Log()">登录日志</a>
    </div>
    <div class="content-box">
      <header class="header">
        <p class="title">{{ navigation1.head }}</p>
        <div class="userInfo">
          <div class="left">
            <img
              class="img-src"
              v-if="basicInfo.avatarPath"
              :src="basicInfo.avatarPath"
              alt=""
            />
            <Avatar v-else icon="ios-person" size="large" />
            <div style="margin-left:15px">
              <p class="username">{{ basicInfo.userName }}</p>
              <p>
                <span class="level-btn"
                  >{{ basicInfo.level || "暂无等级" }}
                </span>
                <!-- <Icon type="ios-cog-outline" size="20" @click="jump()" /> -->
              </p>
            </div>
          </div>
          <div>
            <span class="itemizes">分类 </span>
            <span class="itemize" v-for="item in role" :key="item">{{
              item
            }}</span>
            <span class="noitemize" v-if="role.length == 0">暂无分类</span>
          </div>
          <div style="flex:2">
            <span class="itemizes">标签 </span>
            <span class="itemize" v-for="item in userLabel" :key="item">{{
              item
            }}</span>
            <span class="noitemize" v-if="userLabel.length == 0">暂无标签</span>
          </div>
        </div>
      </header>

      <div class="main">
        <div class="content-top flex-center-start">
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
              <td>{{ this.util.formatDateYMD(basicInfo.createTime) }}</td>
            </tr>
            <tr>
              <th>城市</th>
              <td>{{ basicInfo.city }}</td>
            </tr>
          </table>
        </div>

        <div class="content ">
          <div class="content-item">
            <div class="item-title">
              <Icon type="md-bookmark" style="color:#FF565A" />
              <span>统计信息</span>
            </div>
            <Table border :columns="columns1" :data="statisticsInfo"></Table>
          </div>
          <div class="content-item">
            <div class="item-title">
              <Icon type="md-bookmark" style="color:#FF565A" />
              <span>组织信息</span>
            </div>
            <Table border :columns="columns2" :data="orgRecordList"></Table>
          </div>
          <div class="content-item">
            <div class="item-title">
              <Icon type="md-bookmark" style="color:#FF565A" />
              <span>收货地址</span>
            </div>
            <Table border :columns="columns3" :data="userAdderes"></Table>
          </div>
          <div class="content-item">
            <div class="item-title">
              <Icon type="md-bookmark" style="color:#FF565A" />
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
import Public from "./config/index";
export default {
  data() {
    return {
      navigation1: {
        head: "用户详情(志愿者)"
      },
      columns1: [
        {
          title: "立项数量",
          key: "establishNum",
          align: "center"
        },
        {
          title: "活动报名数量",
          key: "signUpNum",
          align: "center"
        },
        {
          title: "积分",
          key: "score",
          align: "center"
        },
        {
          title: "收藏类型(个)",
          key: "collectNum",
          align: "center"
        },
        {
          title: "活动评价",
          key: "activityEvaluateNum",
          align: "center"
        },
        {
          title: "活动反馈",
          key: "activityFeedbackNum",
          align: "center"
        },
        {
          title: "邀请好友",
          key: "inviteNum",
          align: "center"
        },
        {
          title: "活动时长（小时）",
          key: "joinActLength",
          align: "center"
        }
      ],
      columns2: [
        {
          title: "组织名称",
          key: "orgName",
          align: "center"
        },
        {
          title: "省份",
          key: "provinceName",
          align: "center"
        },
        {
          title: "地址",
          key: "address",
          align: "center"
        },
        {
          title: "单位职务",
          key: "userType",
          align: "center"
        }
      ],

      columns3: [
        {
          title: "姓名",
          key: "consignee",
          align: "center"
        },
        {
          title: "手机号码",
          key: "tel",
          align: "center"
        },
        {
          title: "详细地址",
          key: "address",
          align: "center",
          align: "center"
        },
        {
          title: "默认地址",
          key: "defaultAddress",
          align: "center",
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
          key: "name",
          align: "center"
        },
        {
          title: "活动时间",
          key: "startAt",
          align: "center",
          render: (h, params) => {
            return h("div", this.util.formatDate(params.row.startAt));
          }
        },
        {
          title: "用户账号",
          key: "account",
          align: "center"
        },
        {
          title: "参与类型",
          key: "joinType",
          align: "center"
        },
        {
          title: "活动类型",
          key: "categoryName",
          align: "center"
        },
        {
          title: "状态",
          key: "joinStatus",
          align: "center"
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  clssName: "action",
                  style: {
                    color: "#FF565A"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "volunteer_general",
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

      role: [], //  分类
      userLabel: [], // 标签
      basicInfo: {}, //用户信息
      statisticsInfo: [], // 统计信息
      activityRecord: [], // 活动记录
      userAdderes: [], //收货地址
      orgRecordList: [] // 组织
    };
  },
  mounted() {
    this.getUserdetail();
  },
  methods: {
    // 获取数据
    getUserdetail() {
      Public.Userdetail({
        sysType: "2",
        userId: this.$route.query.userId
      }).then(res => {
        if (res.code == 200) {
          this.basicInfo = res.data.basicInfo;
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
    },
    Editor() {
      this.$router.push({
        name: "Edit_data_zyz",
        query: {
          userId: this.$route.query.userId
        }
      });
    },
    Log() {
      this.$router.push({
        name: "Login_zyz",
        query: {
          userId: this.$route.query.userId
        }
      });
    },
    jump() {
      this.$router.push({ name: "Volunteer_level_setting" });
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  margin: 0 auto;
  margin-top: 15px;
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
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
  padding: 30px;
  table {
    border: 1px solid #e4e4e4;
    margin: 0 auto;
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
  padding: 30px 0;
}
.content-item {
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
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
.header {
  margin-top: 20px;
  height: 162px;
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
  padding: 22px 30px;
}

.userInfo {
  display: flex;
  align-items: center;
  padding: 30px 0;
  img {
    vertical-align: middle;
  }
  div {
    flex: 1;
  }
}
.title {
  font-size: 18px;
  color: #1b2331;
  font-weight: 800;
}
.username {
  margin-left: 20px;
  font-size: 18px;
  color: #1b2331;
}
.itemizes {
  font-size: 15px;
  color: #1b2331;
}

.itemize {
  display: inline-block;
  margin: 0 5px;
  padding: 0 10px;
  background: #fef4f5;
  border-radius: 15px;
  font-size: 14px;
  color: #fd585e;
  line-height: 32px;
}
.noitemize {
  display: inline-block;
  margin: 0 5px;
  padding: 0 10px;
  background: #ccc;
  border-radius: 15px;
  font-size: 14px;
  color: #fff;
  line-height: 32px;
}
.left {
  display: flex;
  align-content: center;
}

.level-btn {
  padding: 0 10px;
  background: #fef4f5;
  border-radius: 15px;
  font-size: 14px;
  color: #fd585e;
  line-height: 32px;
}
</style>
