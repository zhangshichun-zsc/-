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
          <Button class="btn" @click="examine(1)">批量审核</Button>
          <Button class="btn" @click="refuse">批量拒绝</Button>
          <!--导出数据-->

          <Button class="btn" @click="exportData">
            导出数据
          </Button>
        </div>
        <div class="flex-center-end">
          <Select
            v-model="size"
            style="width:120px"
            placeholder="显示条数"
            class="space"
          >
            <Option
              v-for="item in Article"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
          <Select
            placeholder="排序方式"
            class="space"
            style="width: 120px;"
            v-model="sort"
          >
            <Option
              v-for="item in sorting"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </div>
      </div>
      <Table
        border
        :columns="columns"
        :data="data"
        @on-selection-change="handleSelectionChange"
      ></Table>
      <div class="pages">
        <!-- <div class="batch">
          <Checkbox>全选</Checkbox>
          <Select placement="top" placeholder="批量操作" style="width: 150px">
            <Option
              v-for="item in batchList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
          <a href="javascript:;" class="queryBtn" style="margin-left: 10px"
            >确定</a
          >
     
        </div> -->
        <Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          style="margin:0 auto"
          :page-size="size"
          @on-change="changepages"
        />
      </div>
    </div>

    <Modal title="拒绝理由" v-model="refusemodel" :mask-closable="false">
      <Input v-model="refuseValue" placeholder="请输入原因" clearable />
      <p v-show="isModel" class="tips">请输入拒绝理由</p>
      <div slot="footer">
        <Button type="text" size="large" @click="modalCancel">取消</Button>
        <Button type="primary" size="large" @click="modalOk">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { tablepage } from "@/request/mixin";
import Public from "./config/index";
export default {
  data() {
    return {
      navigation1: {
        head: "VIP时间审核(会员)"
      },
      refusemodel: false,
      columns: [
        {
          type: "selection",
          align: "center",
          with: 60
        },
        {
          title: "用户账户",
          key: "loginName",
          align: "center",
          minWidth: 160
        },
        {
          title: "用户昵称",
          key: "disPlayName",
          align: "center",
          minWidth: 140
        },
        {
          title: "用户类型",
          key: "userType",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h("div", "受益方");
          }
        },
        {
          title: "修改人",
          key: "optName",
          align: "center",
          minWidth: 140
        },
        {
          title: "修改时间",
          key: "optTime",
          align: "center",
          minWidth: 220
        },
        {
          title: "原VIP到期时间",
          key: "vipLastTime",
          align: "center",
          minWidth: 140
        },
        {
          title: "现VIP到期时间",
          key: "vipOptTime",
          align: "center",
          minWidth: 140
        },
        {
          title: "调整值",
          key: "adjustValue",
          align: "center",
          minWidth: 140
          // render: (h, params) => {
          //   return h("div", "+12");
          // }
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          minWidth: 140,
          render: (h, params) => {
            // '当前审核状态,0待一级审核,1审核通过,2审核不通过,3待二级审核',

            let flag = params.row.status;
            let colors = {
              待审核: "#FF565A",
              待一级审核: "#FF565A",
              审核通过: "#ccc",
              审核不通过: "#ccc",
              待二级审核: "#FF565A"
            };
            return h(
              "div",
              {
                style: {
                  color: colors[flag]
                }
              },
              params.row.status
            );
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 140,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color:
                      params.row.status == "审核通过" ||
                      params.row.status == "审核不通过"
                        ? "#ccc"
                        : "#FF565A"
                  },
                  on: {
                    click: () => {
                      if (
                        params.row.status == "审核通过" ||
                        params.row.status == "审核不通过"
                      ) {
                        return false;
                      } else {
                        this.examine("1", params.row.auditId);
                      }

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
                    color:
                      params.row.status == "审核通过" ||
                      params.row.status == "审核不通过"
                        ? "#ccc"
                        : "#FF565A"
                  },
                  on: {
                    click: () => {
                      if (
                        params.row.status == "审核通过" ||
                        params.row.status == "审核不通过"
                      ) {
                        return false;
                      } else {
                        this.refuse(params.row.auditId);
                      }
                    }
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
        { value: "create_at asc", label: "正序" },
        { value: "create_at desc", label: "倒序" }
      ],
      sort: "create_at desc",
      size: 10,
      dataCount: 0,
      page: 1,
      top: [
        { name: "用户账号", type: "input", value: "" },
        { name: "修改人", type: "input", value: "" }
      ],
      isModel: false,
      refuseValue: "",
      paramsObj: {
        userId: "1",
        sysType: "1",
        accountName: "",
        optUserName: ""
      },
      isALLLIST: []
    };
  },

  mixins: [tablepage],

  components: {},

  computed: {},

  created() {},
  mounted() {
    this.paramsObj.userId = localStorage.getItem("userId") || "";
    this.getVipList(this.paramsObj);
  },
  methods: {
    // 选中的 具体项
    handleSelectionChange(val) {
      this.isALLLIST = val.map(item => {
        return item.auditId;
      });
    },
    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
    },
    query(e) {
      let arr = this.paramsObj;
      this.paramsObj = {
        ...arr,
        accountName: e[0].value,
        optUserName: e[1].value,
        sort: this.sort
      };
      this.getVipList(this.paramsObj);
    },

    // 查询列表 接口
    getVipList(params) {
      let obj = this.util.remove({
        page: this.page,
        size: this.size,
        ...params
      });
      Public.getVipPage(obj).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.data = res.data.list;
          this.dataCount = res.data.totalSize;
        }
      });
    },
    // 拒绝按钮
    refuse(props) {
      props && (this.isALLLIST = props);
      if (this.isALLLIST.length < 1) {
        this.$Message.error("请至少选择一项");
        return;
      }
      this.refusemodel = true;
    },
    // 确定
    modalOk() {
      if (this.refuseValue) {
        this.examine(2);
      } else {
        this.isModel = true;
      }
    },
    // 取消按钮
    modalCancel() {
      this.refusemodel = false;
    },
    // 审批
    examine(optType, props) {
      props && (this.isALLLIST = props);
      if (this.isALLLIST.length < 1) {
        this.$Message.error("请至少选择一项");
      } else {
        Public.vipApproval(
          this.util.remove({
            optType: optType,
            auditIds: this.isALLLIST.toString(),
            userId: this.paramsObj.userId,
            remark: this.refuseValue
          })
        ).then(res => {
          this.refusemodel = false;
          if (res.code === 200) {
            this.$Message.info("操作成功");
            this.getVipList(this.paramsObj);
          } else if (res.code === 400) {
            this.$Message.error("当前账号权限不允许进行二级审批");
          } else {
            this.$Message.error("操作失败");
          }
        });
      }
    },
    exportData() {
      this.util.userExprot("/user-list/vip-export", {
        sysType: 1,
        page: 0,
        ...{ size: this.dataCount },
        ...this.paramsObj
      });
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
  margin-top: 20px;
}
.table-header {
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table-header .table-btn {
  margin-left: 15px;
}
.integral-table .pages {
  padding: 15px 30px;
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
}
.tips {
  color: red;
}
</style>
