<!--审批管理(共用)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con">
        <div class="con con-margin">
          <div class="title bk-szy flex-center-start">
            <p>
              <span>数据列表</span>
            </p>
            <div class="but">
              <a href="javascript:;" class="btn" @click="AddSP()"
                >添加审批流程</a
              >

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
        </div>
        <Table ref="selection" border :columns="columns" :data="data"></Table>
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
import { powerpage, powermod } from "../../request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "审批管理(共用)"
      },
      data: [],
      columns: [
        {
          title: "审批类型",
          key: "auditTypeText",
          align: "center"
        },
        {
          title: "项目",
          key: "categoryName",
          align: "center"
        },
        {
          title: "申请方",
          key: "applyRoles",
          align: "center"
        },
        {
          title: "审批流程",
          key: "auditProcess",
          align: "center"
        },
        {
          title: "是否启用",
          key: "status",
          width: "100",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.enableFlag == 1
                },
                on: {
                  input: e => {
                    console.log(e);
                    this.getpowermod(params.row.auditConfId, e);
                  }
                }
              })
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
      sort: "asc",
      sysType: 1,
      page: 1,
      size: 10,
      dataCount: 0,

      enableFlag: null
    };
  },
  mounted() {
    this.getpowerpage();
  },
  //事件监听
  watch: {
    size: "getpowerpage",
    sort: "getpowerpage"
  },
  methods: {
    //审核分页
    getpowerpage() {
      powerpage({
        sysType: this.sysType,
        page: {
          page: this.page,
          size: this.size,
          sort: "createAt" + " " + this.sort
        }
      }).then(res => {
        if (res.code == 200) {
          this.data = res.data.list;
          this.page = res.data.pageNum;
          this.dataCount = res.data.totalSize;
        }
        console.log(res);
      });
    },

    //审核状态
    getpowermod(id, e) {
      if (e) {
        this.enableFlag = 1;
      } else {
        this.enableFlag = 0;
      }
      powermod({
        auditConfId: id,
        enableFlag: this.enableFlag
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info("操作成功");
        }
        console.log(res);
      });
    },
    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getpowerpage();
    },
    AddSP() {
      this.$router.push({ name: "Add-approval" });
    }
  }
};
</script>

<style scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
}
.content {
  margin: 10px;
}
.bk-szy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
}
.title {
  background-color: #f3f3f3;
  justify-content: space-between;
  padding: 5px 20px;
}
.con-margin {
  margin-top: 10px;
}
.pages {
  display: flex;
  justify-content: center;
  margin: 10px auto;
  padding: 15px 0;
}
.btn {
  display: inline-block;
  width: 110px;
  height: 32px;
  line-height: 32px;
  margin: 0 15px;
  background: #ff565a;
  border-radius: 15px;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
}
</style>
