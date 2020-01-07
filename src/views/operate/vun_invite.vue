<!-- 邀请好友查询(志愿者) -->
<template>
  <div class="integral">
    <Tophead :navigation1="navigation1" :top="top" @query="query"></Tophead>

    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div class="flex-center-end" style="padding:10px">
          <Button @click="exportData" disabled>导出数据</Button>
          <Select
            v-model="size"
            style="width:120px;margin-right:10px"
            placeholder="显示条数"
            class="space"
          >
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="排序方式" class="space" style="width: 120px;" v-model="sort">
            <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <div style="padding:0 10px;background:white">
        <Table
          ref="selection"
          border
          :columns="columns"
          :data="data"
          @on-selection-change="handleSelectionChange"
        ></Table>
      </div>
      <div class="pages">
        <Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          style="margin: auto"
          :page-size="size"
          @on-change="changepages"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import {tablepage} from '@/request/mixin'
import { InvitationList } from "@/request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "邀请好友查询(志愿者)"
      },
      columns: [
        {
          title: "用户账号",
          key: "userAccount",
          align: "center",
          width: 200
        },
        {
          title: "用户昵称",
          key: "nickname",
          align: "center",
          width: 300
        },
        {
          title: "用户分类",
          key: "userTypeText",
          width: 300,
          align: "center"
        },
        {
          title: "邀请好友",
          key: "inviteUserNum",
          align: "center",
          width: 200
        },
        {
          title: "成功参与活动好友",
          key: "actJoinedNum",
          width: 200,
          align: "center"
        },
        {
          title: "成功邀请团队注册",
          key: "inviteOrgNum",
          width: 200,
          align: "center"
        },
        {
          title: "积分奖励",
          key: "sumScore",
          width: 200,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#FF566A"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "vun_detail",
                        query: {
                          volunteerId: params.row.volunteerId,
                          inviteUserAccountId: params.row.userAccountId
                        }
                      });
                    }
                  }
                },
                "查看明细"
              )
            ]);
          }
        }
      ],
      Article: [
        { value: 10, label: 10 },
        { value: 15, label: 15 },
        { value: 20, label: 20 }
      ],
      sorting: [
        { value: "asc", label: "正序" },
        { value: "desc", label: "倒序" }
      ],
      sort: "desc",
      top: [
        { name: "用户账号:", type: "input", value: "" },
        { name: "用户昵称:", type: "input", value: "" }
      ],
      data: [],
      page: 1,
      size: 10,

      dataCount: 0,
      arrs: [],
      sysType: 2,
      info: "",
      nickname: ""
    };
  },

  // mixins:[tablepage],
  components: {},
  //事件监听
  watch: {
    size: "getInvitationList",
    sort: "getInvitationList"
  },
  computed: {},
  mounted() {
    this.getInvitationList();
  },

  created() {},

  methods: {
    //查询
    query(e) {
      this.page = 1;
      this.info = e[0].value;
      this.nickname = e[1].value;
      this.getInvitationList();
    },

    // 邀请好友分页
    getInvitationList() {
      InvitationList({
        page: {
          page: this.page,
          size: this.size,
          sort: "createAt" + " " + this.sort
        },
        sysType: this.sysType,
        info: this.info,
        nickname: this.nickname
      }).then(res => {
        if (res.code == 200) {
          this.dataCount = res.data.totalSize;
          this.data = res.data.list;
        }
        console.log(res);
      });
    },
    exportData() {},

    //分页功能
    changepages(index) {
      this.page = index;
      this.getInvitationList();
    },

    //选择内容
    handleSelectionChange(val) {
      console.log(val);
      this.arrs = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.integral-header .integral-top {
  padding: 15px 10px;
  background: white;
}
.integral-header .integral-center {
  margin: 0 20px;
}
.integral-header .integral-body {
  padding: 20px;
  background: #fff;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 200px;
  margin-left: 15px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 20px;
}
.table-header {
  padding: 5px 20px;
  background: white;
  border-radius: 10px 10px 0 0;
}
.table-header .table-btn {
  margin-left: 15px;
}
.integral-table {
  border-radius: 10px;
}
.integral-table .pages {
  padding: 20px;
  background: #fff;
  border-radius: 0 0 10px 10px;
}
.pages {
  text-align: center;
}
.ipt {
  margin-left: 10px;
}
.sdate {
  margin-left: 15px;
}
</style>
