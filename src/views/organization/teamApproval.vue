<template>
  <div class="integral">
    <Modal title="拒绝理由" v-model="modal8" :mask-closable="false">
      <input
        class="rejbtn"
        type="textarea"
        v-model="value"
        placeholder="请输入原因"
      />
      <p v-show="isModel" class="tips">请输入拒绝理由</p>
      <div slot="footer">
        <Button type="text" size="large" @click="modalCancel">取消</Button>
        <Button type="error" size="large" @click="modalOk">确定</Button>
      </div>
    </Modal>

    <Navigation :labels="navigation1"></Navigation>
    <div class="integral-header">
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>组织名称:</span>
          <Input placeholder="组织名称" class="inpt" v-model="orgName" />
        </div>
        <div class="flex-center-start">
          <span>审核状态:</span>
          <Select v-model="orgStatus" class="inpt">
            <Option value="0,1,2">全部</Option>
            <Option value="0,3">待审核</Option>
            <Option value="1">已通过</Option>
            <Option value="2">已拒绝</Option>
          </Select>
        </div>
        <div class="flex-center-start">
          <span>提交日期:&nbsp;&nbsp;</span>
          <DatePicker
            type="date"
            placeholder="请选择开始时间"
            v-model="startAt"
            style="width: 200px"
          ></DatePicker>
          <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
          <DatePicker
            type="date"
            placeholder="请选择结束时间"
            v-model="endAt"
            style="width: 200px"
          ></DatePicker>
        </div>
        <div class="flex-center-start">
          <a href="javascript:;" class="queryBtn" @click="query">查询</a>
        </div>
      </div>
    </div>

    <div class="integral-table">
      <div class="table-header table-flex">
        <div>
          <Icon type="md-reorder" size="25" />
          <span>数据列表</span>
        </div>
        <div>
          <Select v-model="size" style="width:120px" placeholder="显示条数">
            <Option
              v-for="item in Article"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
          <Select
            placeholder="排序方式"
            style=" margin-left:10px;width: 120px;"
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
        ref="selection"
        border
        :columns="columns"
        :data="data"
        @on-selection-change="handleSelectionChange"
      ></Table>

      <div class="pages">
        <div class="batch">
          <span @click="chackall">
            <Checkbox v-model="isALL">全选</Checkbox>
          </span>
          <a
            href="javascript:;"
            style="margin-left:10px;"
            class="queryBtn"
            @click="batchAdopt"
            >通过</a
          >
          <a
            href="javascript:;"
            style="margin-left:10px;"
            class="queryBtn"
            @click="showBatch"
            >拒绝</a
          >
        </div>
        <Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          :page-size="size"
          @on-change="changepages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  orgpages,
  orgSetStatus,
  queryVouluteerOrgList,
  queryAuditList,
  getIsConfig,
  auditCreateCoOrg
} from "@/request/api";
export default {
  data() {
    return {
      modal8: false,
      value: "",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "组织名称",
          key: "orgName",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#FF565A",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    let name = this.navigation1.name;
                    if (name === "volunteer") {
                      return;
                    } else {
                      let address = params.row;
                      localStorage.setItem(
                        "city",
                        address.provinceName +
                          address.cityName +
                          address.districtName
                      );
                      setTimeout(res => {
                        this.$router.push({
                          path: "/organization/editDetail",
                          query: {
                            orgId: params.row.orgId,
                            status: params.row.status,
                            auditId: params.row.auditId,
                            head: this.navigation1.name
                          }
                        });
                      });
                    }
                  }
                }
              },
              params.row.orgName
            );
          }
        },
        {
          title: "组织分类",
          key: "orgType",
          align: "center",
          render: (h, params) => {
            let orgType = params.row.orgType;
            let type = {
              1: "机构",
              2: "家长小组",
              3: "志愿者团队"
            };

            return h("span", type[orgType]);
          }
        },
        {
          title: "组织地址",
          key: "address",
          align: "center",
          render: (h, params) => {
            let address = params.row;
            return h(
              "span",
              address.provinceName + address.cityName + address.districtName
            );
          }
        },
        {
          title: "负责人",
          key: "userName",
          align: "center"
        },
        {
          title: "人数",
          key: "num",
          align: "center"
        },
        {
          title: "提交时间",
          key: "createAt",
          align: "center"
        },
        {
          title: "状态",
          key: "validFlag",
          align: "center",
          render: (h, params) => {
            let name = this.navigation1.name;
            if (name === "volunteer") {
              console.log();
              let status = params.row.status;
              let state = {
                0: "待审核",
                1: "已审核",
                2: "已拒绝"
              };
              return h(
                "span",
                {
                  style: {
                    color: "#FF565A",
                    cursor: "pointer"
                  }
                },
                state[status]
              );
            } else {
              let status = params.row.status;
              let statu = {
                0: "待审核",
                1: "已审核",
                2: "已拒绝"
              };

              return h("span", statu[status]);
            }
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            let name = this.navigation1.name;
            if (name === "volunteer") {
              return h("div", [
                h(
                  "span",
                  {
                    clssName: "action",
                    style: {
                      color: params.row.status == 0 ? "#FF565A" : "#ccc",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        if (params.row.status == 0) {
                          this.singlePass("vol", {
                            auditIdStr: params.row.auditId,
                            orgIdStr: params.row.orgId,
                            operation: "0"
                          });
                        }
                      }
                    }
                  },
                  "通过"
                ),
                h(
                  "span",
                  {
                    style: {
                      marginRight: "5px",
                      marginLeft: "5px",
                      color: params.row.status == 0 ? "#FF565A" : "#ccc",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        if (params.row.status == 0) {
                          this.showModal("vol", {
                            auditIdStr: params.row.auditId,
                            orgIdStr: params.row.orgId
                          });
                        }
                      }
                    }
                  },
                  "拒绝"
                )
              ]);
            } else {
              return h("div", [
                h(
                  "span",
                  {
                    clssName: "action",
                    style: {
                      color: params.row.status == 0 ? "#FF565A" : "#ccc",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        if (params.row.status == 0) {
                          this.singlePass("parent", {
                            ids: params.row.auditId,
                            status: 2
                          });
                        }
                      }
                    }
                  },
                  "通过"
                ),
                h(
                  "span",
                  {
                    style: {
                      marginRight: "5px",
                      marginLeft: "5px",
                      color: params.row.status == 0 ? "#FF565A" : "#ccc",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        if (params.row.status == 0) {
                          this.showModal("parent", {
                            auditIdStr: params.row.auditId
                          });
                        }
                      }
                    }
                  },
                  "拒绝"
                )
              ]);
            }
          }
        }
      ],
      data: [],
      Article: [
        { value: 10, label: "10" },
        { value: 15, label: "15" },
        { value: 20, label: "20" }
      ],
      sorting: [
        { value: "asc", label: "正序" },
        { value: "desc", label: "倒序" }
      ],
      sort: "asc",
      page: 1,
      size: 10,
      dataCount: 0,
      arr: [],
      orgId: [],
      orgStatus: "0,1,2,3",
      isBatch: false,
      orgName: "",
      address: "",
      ownerUserName: "",
      startAt: "",
      endAt: "",
      auditId: "",
      paramsid: "",
      userId: "",
      isModel: false,
      navigation1: {
        head: "志愿者团队审批（共用）",
        name: "volunteer"
      },
      promeObj: {
        userId: ""
      },
      isALL: false
    };
  },
  props: ["index"],
  created() {
    if (this.$route.query.head === "parent") {
      this.navigation1 = {
        head: "家长小组审批（会员）",
        name: "parent"
      };
    }
    let userId = localStorage.getItem("userId") || "";
    this.promeObj.userId = userId;
    this.userId = userId;

    this.getorgpage();
  },
  watch: {},
  methods: {
    //标签分页
    getorgpage() {
      let fromobj = this.util.remove({
        page: {
          page: this.page,
          size: this.size
        },
        userId: this.userId,
        orgName: this.orgName,
        startAt: this.startAt ? this.startAt.getTime() : "",
        endAt: this.endAt ? this.endAt.getTime() : ""
      });
      if (this.navigation1.name === "parent") {
        let status = "";
        if (this.orgStatus === "0,1,2,3") {
          status = "";
        } else if (this.orgStatus === "0,3") {
          status = "0";
        }

        orgpages(this.util.remove({ ...fromobj, status: status })).then(res => {
          if (res.code == 200) {
            this.dataCount = res.data.totalSize;
            this.data = res.data.list;
          }
        });
      } else {
        //  志愿者审批
        queryAuditList(
          this.util.remove({
            ...fromobj,
            status: this.orgStatus
          })
        ).then(res => {
          if (res.code === 200) {
            this.data = res.data.list;
            this.dataCount = res.data.totalSize;
          }
        });
      }
    },

    /**
     * 单个审批通过
     *
     */

    singlePass(flag, obj) {
      if (flag === "vol") {
        auditCreateCoOrg({
          userId: this.userId,
          ...obj
        }).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.$Message.info("审批成功");
            this.getorgpage();
          } else {
            this.$Message.error({
              background: true,
              content: "审批失败"
            });
          }
        });
      } else {
        orgSetStatus({ userId: this.userId, ...obj }).then(res => {
          if (res.code === 200) {
            this.getorgpage();
            this.$Message.info("通过成功");
          } else {
            this.$Message.error({
              background: true,
              content: "审批失败"
            });
          }
        });
      }
    },

    /**
     * 批量审批通过
     */
    batchAdopt() {
      if (this.arr.length <= 0) {
        this.$Message.error({
          background: true,
          content: "请至少选择一项内容"
        });
        return;
      }
      if (this.navigation1.name === "volunteer") {
        let arr = [];
        this.arr.forEach(item => {
          this.data.forEach(key => {
            if (item == key.auditId && (key.status == 0 || key.status == 3)) {
              arr.push(key.auditId);
            }
          });
        });

        if (arr.length < 1) {
          this.$Message.error("请选择未审核的团队进行操作");
          return;
        }
        let paramsObj = {
          userId: this.userId,
          orgIdStr: this.orgId.toString(),
          auditIdStr: arr.toString(),
          operation: "0"
        };
        auditCreateCoOrg(paramsObj).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.$Message.info("审批成功");
            this.getorgpage();
          } else {
            this.$Message.error({
              background: true,
              content: "审批失败"
            });
          }
        });
      } else {
        // 过滤 一下,已经操作过的数据
        let arr = [];
        this.arr.forEach(item => {
          this.data.forEach(key => {
            if (item == key.auditId && (key.status == 0 || key.status == 3)) {
              arr.push(key.auditId);
            }
          });
        });

        if (arr.length < 1) {
          this.$Message.error("请选择未审核的小组进行操作");
          return;
        }
        let paramsObj = {
          userId: this.userId,
          ids: arr.toString(),
          status: 2
        };
        orgSetStatus(paramsObj).then(res => {
          if (res.code === 200) {
            this.$Message.info("审批成功");
            this.getorgpage();
          } else {
            this.$Message.error({
              background: true,
              content: "审批失败"
            });
          }
        });
      }
    },
    // 单独拒绝
    singleRefuse() {
      if (this.navigation1.name === "volunteer") {
        let paramsObj = {
          userId: this.userId,
          orgIdStr: this.orgId.toString(),
          auditIdStr: this.arr.toString(),
          refReason: this.value,
          operation: "1"
        };
        auditCreateCoOrg(paramsObj).then(res => {
          if (res.code === 200) {
            this.$Message.info("审批成功");
            this.getorgpage();
          } else {
            this.$Message.error({
              background: true,
              content: "审批失败"
            });
          }
        });
        this.removeaudutId();
      } else {
        let paramsObj = {
          userId: this.userId,
          ids: this.arr.toString(),
          status: 3,
          refReason: this.value
        };
        orgSetStatus(paramsObj).then(res => {
          if (res.code === 200) {
            this.$Message.info("审批成功");
            this.getorgpage();
          } else {
            this.$Message.error({
              background: true,
              content: "审批失败"
            });
          }
          this.removeaudutId();
        });
      }
    },
    // 批量拒绝
    batchRefuse(flag, params) {
      if (this.navigation1.name === "volunteer") {
        // 过滤 一下,已经操作过的数据
        let arr = [];
        this.arr.forEach(item => {
          this.data.forEach(key => {
            if (item == key.auditId && (key.status == 0 || key.status == 3)) {
              arr.push(key.auditId);
            }
          });
        });

        if (arr.length < 1) {
          this.$Message.error("请选择未审核的团队进行操作");
          this.removeaudutId();
          this.isBatch = false;
          return;
        }

        let paramsObj = {
          userId: this.userId,
          orgIdStr: this.orgId.toString(),
          auditIdStr: arr.toString(),
          refReason: this.value,
          operation: "1"
        };

        auditCreateCoOrg(paramsObj).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.$Message.info("审批成功");
            this.getorgpage();
          } else {
            this.$Message.error({
              background: true,
              content: "审批失败"
            });
          }
        });
        this.removeaudutId();
        this.isBatch = false;
      } else {
        // 过滤 一下,已经操作过的数据
        let arr = [];
        this.arr.forEach(item => {
          this.data.forEach(key => {
            if (item == key.auditId && (key.status == 0 || key.status == 3)) {
              arr.push(key.auditId);
            }
          });
        });
        if (arr.length < 1) {
          this.$Message.error("请选择未审核的小组进行操作");
          this.removeaudutId();
          this.isBatch = false;
          return;
        }
        let paramsObj = {
          userId: this.userId,
          ids: arr.toString(),
          status: 3,
          refReason: this.value
        };

        orgSetStatus(paramsObj).then(res => {
          if (res.code === 200) {
            this.$Message.info("审批成功");
            this.getorgpage();
          } else {
            this.$Message.error({
              background: true,
              content: "审批失败"
            });
          }
          this.removeaudutId();
          this.isBatch = false;
        });
      }
    },
    // 审核 方法
    setOrg(flag, obj) {},
    //查询结果
    query() {
      this.getorgpage();
    },
    //全选按钮
    chackall() {
      this.$refs.selection.selectAll(!this.isALL);
    },

    // 显示模态框
    showModal(flag, obj) {
      if (flag === "vol") {
        this.arr = obj.auditIdStr;
        this.orgId = obj.orgIdStr;
        this.modal8 = true;
      } else {
        this.arr = obj.auditIdStr;
        this.modal8 = true;
      }
    },

    // 批量操作时候的模态框
    showBatch() {
      if (this.arr.length <= 0) {
        this.$Message.error({
          background: true,
          content: "请至少选择一项内容"
        });
        return;
      } else {
        this.modal8 = true;
        this.isBatch = true;
      }
    },

    // 关闭按钮
    modalCancel() {
      this.modal8 = false;
      this.isModel = false;
    },

    // 确定按钮
    modalOk() {
      if (this.value.length <= 0) {
        this.isModel = true;
        return;
      } else {
        // isBatch  true: 批量操作
        if (this.isBatch) {
          this.batchRefuse();
        } else {
          this.singleRefuse();
        }
      }
    },
    // 关闭不需要值
    removeaudutId() {
      this.modal8 = false;
      this.isModel = false;
      this.value = "";
    },
    //分页功能
    changepages(index) {
      this.page = index;
      this.getorgpage();
    },
    //选择内容
    handleSelectionChange(val) {
      this.arr = val;
      if (val.length < this.data.length) {
        this.isALL = false;
      } else if (val.length == this.data.length) {
        this.isALL = true;
      }
      let arr = [];
      let brr = [];
      for (let i = 0; i < this.arr.length; i++) {
        arr.push(this.arr[i].auditId);
        brr.push(this.arr[i].orgId);
      }
      this.arr = arr;
      this.orgId = brr;
    }
  }
};
</script>

<style lang="scss" scoped>
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  margin-top: 15px;
  padding: 15px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
}
.integral-header .integral-center {
  margin: 0 20px;
}
.integral-header .integral-body {
  padding: 20px;
  background: #fff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
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
  background: #ffffff;
  padding: 0 5px;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
}
.table-header {
  padding: 10px 20px;
}
.table-header .table-btn {
  margin-left: 15px;
}
.line {
  width: 20px;
  border: 1px solid;
  margin: 12px 5px 0 20px;
}

.rejbtn {
  width: 100%;
  height: 8vh;
  padding: 0 1vw;
}
.tips {
  text-align: center;
  color: red;
}
.table-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pages {
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>
