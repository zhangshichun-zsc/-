<!--登录日志(志愿者)-->
<template>
  <div class="box">
    <div class="btn-box">
      <a href="javascript:;" @click="userDetaile()">用户详情</a>
      <a href="javascript:;" @click="Editor()">编辑资料</a>
      <a href="javascript:;" class="act-tn">登录日志</a>
    </div>

    <div class="main">
      <div class="constant">
        <div class="constant-title flex-center-start">
          <p>{{ navigation1.head }}</p>
        </div>

        <Table border :columns="columns" :data="data"></Table>
        <div class="pages">
          <Page
          :current='page'
            :total="dataCount"
            show-elevator
            show-total
            size="small"
            @on-change="changepages"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Userhistory } from "../../request/api";
import { formatDate } from "../../request/datatime";
export default {
  data() {
    return {
      navigation1: {
        head: "登录日志(志愿者)"
      },
      columns: [
        {
          title: "时间",
          key: "createAt",
          render: (h, params) => {
            return h("div", [h("p", formatDate(params.row.createAt))]);
          }
        },
        {
          title: "IP",
          key: "ipAddr"
        },
        {
          title: "地区",
          key: "address"
        },
        {
          title: "登录方式",
          key: "typeFlag",
          render: (h, params) => {
            let str = params.row.typeFlag;
            let name = "";
            if (str == 1) {
              name = "会员小程序登录";
            } else if (str === 2) {
              name = "志愿者小程序登录";
            } else {
              name = "后台登录";
            }
            return h("div", [h("p", name)]);
          }
        }
      ],
      data: [],
      page: 1,
      size: 10,
      dataCount: 0,
      userId: 2,
      sysType: "2"
    };
  },
  mounted() {
    this.gethistory();
  },
  methods: {
    //列表数据
    gethistory() {
      console.log({ page: this.page, size: this.size });
      Userhistory({
        page: { page: this.page, size: this.size },
        sysType: this.sysType,
        userId: this.$route.query.userId
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.data = res.data.list;
          this.page = res.data.totalNum;
          this.dataCount = res.data.totalSize;
        }
      });
    },
    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.gethistory();
    },
    userDetaile() {
      this.$router.push({
        name: "user_details_zyz",
        query: {
          userId: this.$route.query.userId
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
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  margin: 0 auto;
  margin-top: 30px;
  background: #fff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
  padding: 30px 30px;
}
.constant-title {
  padding-bottom: 30px;
  font-size: 18px;
  color: #1b2331;
  font-weight: 800;
}
.pages {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 0.2rem 0;
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
