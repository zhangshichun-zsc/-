<!-- VIP时间审核(会员) -->
<template>
  <div class="integral">
    <Tophead :navigation1="navigation1" :top="top" @query="query"></Tophead>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div class="flex-center-start">
          <Icon type="md-list" />
          <span>数据列表</span>
        </div>
        <div class="flex-center-end">
          <Button  class="btn">批量审核</Button>
          <!--导出数据-->

            <Button  class="btn" @click="exportData">
              导出数据
              <Icon type="md-arrow-dropdown"></Icon>
            </Button>

          <Select v-model="size" style="width:120px" placeholder="显示条数" class="space">
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="排序方式" class="space" style="width: 120px;" v-model="sort">
            <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <Table border :columns="columns" :data="data"></Table>
      <div class="pages">
        <div class="batch">
          <Checkbox>全选</Checkbox>
          <Select placeholder="批量操作" style="width: 150px">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px">确定</Button>
        </div>
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
import { tablepage } from "@/request/mixin";
import {} from "@/request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "VIP时间审核(会员)"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户账户",
          key: "userid",
          render: (h, params) => {
            return h("div", "18000000000");
          }
        },
        {
          title: "用户昵称",
          key: "username"
        },
        {
          title: "用户类型",
          key: "userclass",
          render: (h, params) => {
            return h("div", "受益方");
          }
        },
        {
          title: "修改人",
          key: "modify"
        },
        {
          title: "修改时间",
          key: "modifytime"
        },
        {
          title: "原VIP到期时间",
          key: "once",
          algin: "center",
          render: (h, params) => {
            return h("div", "2019-1-1");
          }
        },
        {
          title: "现VIP到期时间",
          key: "now",
          algin: "center",
          render: (h, params) => {
            return h("div", "2020-1-1");
          }
        },
        {
          title: "调整值",
          key: "adjust",
          algin: "center",
          render: (h, params) => {
            return h("div", "+12");
          }
        },
        {
          title: "状态",
          key: "status",
          algin: "center",
          render: (h, params) => {
            return h("div", "待审核");
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276"
                  },
                  on: {
                    click: () => {
                      // this.$router.push({ name: 'integral_detail' })
                    }
                  }
                },
                "审核"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "red"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "拒绝"
              )
            ]);
          }
        }
      ],
      batchList: [
        { value: "recommended", label: "设为推荐" },
        { value: "cancel", label: "取消推荐" },
        { value: "hidden", label: "设为隐藏" },
        { value: "According", label: "设为显示" },
        { value: "delete", label: "删除" }
      ],
      data: [],
      arrs: [],
      Article: [
        { value: 10, label: 10 },
        { value: 15, label: 15 },
        { value: 20, label: 20 }
      ],
      sorting: [
        { value: "asc", label: "正序" },
        { value: "desc", label: "倒序" }
      ],
      sort: "asc",
      size: 10,
      dataCount: 0,
      page: 1,
      top: [
        { name: "用户账号", type: "input", value: "" },
        { name: "修改人", type: "input", value: "" }
      ]
    };
  },

  mixins: [tablepage],

  components: {  },



  computed: {},

  created() {},

  methods: {
    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
    },
    query(e) {
      console.log(e);
    }
  }
};
</script>
<style lang="scss" scoped>
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  padding: 15px 20px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
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
.integral-table {
  margin-top: 30px;
}
.table-header {
  padding: 5px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.table-header .table-btn {
  margin-left: 15px;
}
.integral-table .pages {
  padding: 5px 20px;
  margin-top: 50px;
  background: #fff;
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
.btn {
  margin-right: 10px;
}
.pages {
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
}
</style>
