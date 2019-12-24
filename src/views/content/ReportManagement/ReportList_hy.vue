<!--举报列表(会员)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="flex-center-start integral-body" style="border-radius: 10px;margin-bottom:20px;">
        <div class="flex-center-start" style="margin-right:20px;">
          <div style="width:80px">举报人:</div>
          <Input size="large" placeholder="用户ID/账号" class="inpt" v-model="reportUserName" />
        </div>
        <div class="flex-center-start">
          <div style="width:80px">举报理由:</div>
          <Select placeholder="全部" style="width:200px" v-model="reportReason">
            <Option
              v-for="item in list"
              :value="item.dataKey"
              :key="item.dataKey"
            >{{ item.dataValue }}</Option>
          </Select>
        </div>
        <Button class="table-btns" @click="query">查询</Button>
      </div>
    </div>
    <div class="contents">
      <div class="con-top flex-wrap-between">
        <p>
          <Icon type="ios-list" size="30" />
          <span>数据列表</span>
        </p>
        <div>
          <Select v-model="size" style="width:120px;margin-right:5px;" placeholder="显示条数">
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="排序方式" style="width: 120px;" v-model="sort">
            <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <div class="con">
        <Table
          ref="selection"
          border
          :columns="columns"
          :data="data"
          @on-selection-change="handleSelectionChange"
        ></Table>
      </div>
      <!-- <div>
        <Button @click="chackall()" style="border:0px;">
          <Checkbox v-model="status"></Checkbox>全选
        </Button>
        <Select placeholder="批量操作" style="width: 150px" v-model="type">
          <Option v-for="item in batchList" :value="item.dicId" :key="item.dicId">{{ item.dicName }}</Option>
        </Select>
        <Button class="space" @click="space">确定</Button>
      </div>
      <div class="pages flex-center-between">
        <Page
          :total="dataCount"
          size="small"
          show-elevator
          show-total
          style="margin: auto"
          :page-size="size"
          @on-change="changepages"
        />
      </div> -->
      <div class="row">
        <div>
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status"></Checkbox>全选
          </Button>
          <Select placeholder="批量操作" style="width: 150px" v-model="type">
            <Option
              v-for="item in batchList"
              :value="item.dicId"
              :key="item.dicId"
            >{{ item.dicName }}</Option>
          </Select>
          <Button class="space" @click="space">确定</Button>
        </div>
        <div><Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          :page-size="size"
          @on-change="changepages"
        /></div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/request/datatime";

import {
  ReportList,
  Reportpage,
  ReportDel,
  Reportdelete,
  Reportdeles,
  Reporttext
} from "@/request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "举报列表(会员)"
      },
      list: [],
      data: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "举报理由",
          key: "reportReasonText",
          align: "center"
        },
        {
          title: "举报人",
          key: "reportUserName",
          align: "center"
        },
        {
          title: "举报时间",
          key: "reportTimestamp",
          align: "center",
          render: (h, params) => {
            return h("p", formatDate(params.row.reportTimestamp));
          }
        },
        {
          title: "举报对象",
          key: "activityName",
          align: "center"
        },
        {
          title: "举报状态",
          key: "reportStatusText",
          align: "center"
        },
        {
          title: "处理结果",
          key: "reportDealResultText",
          align: "center"
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
                    color: "#FF566A"
                  },
                  on: {
                    click: () => {
                      if (params.row.reportStatusText == "未处理") {
                        this.$router.push({
                          name: "ReportDetails-Not_hy",
                          query: { reportId: params.row.reportId, states: 1 }
                        }); //未处理
                      } else {
                        this.$router.push({
                          name: "ReportDetails-Handled_hy",
                          query: { reportId: params.row.reportId, states: 1 }
                        }); //已处理
                      }
                    }
                  }
                },
                "查看"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "#FF566A"
                  },
                  on: {
                    click: () => {
                      this.delete(params.row.reportId);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      batchList: [],
      reportReason: "",
      reportUserName: "",
      page: 1,
      size: 10,

      dataCount: 0,
      sysType: 1,
      reportId: "",
      arr: [],
      status: false,

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
      arrs: [],
      type: "",
      types: ""
    };
  },
  //事件监听
  watch: {
    size: "getReportList",
    sort: "getReportList"
  },

  mounted() {
    this.getReportList();
    this.getReportpage();
    this.getReporttext();
  },
  methods: {
    //文本
    getReporttext() {
      Reporttext({}).then(res => {
        if (res.code == 200) {
          this.batchList = [{ dicId: 0, dicName: "删除举报" }, ...res.data];
        }
        console.log(res);
      });
    },
    //获取举报原因列表
    getReportList() {
      ReportList({
        sysType: 1
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.list = [{ dataKey: "", dataValue: "全部" }, ...res.data];
        }
      });
    },
    // 举报管理--获取举报分页
    getReportpage() {
      Reportpage({
        page: { page: this.page, size: this.size, sort: this.sort },
        sysType: this.sysType,
        reportUserName: this.reportUserName,
        reportReason: this.reportReason,
        userId: this.$store.state.userId
      }).then(res => {
        if (res.code == 200) {
          this.data = res.data.list;
          this.dataCount = res.data.totalSize;
        }
        console.log(res);
      });
    },
    // 举报管理--获取举报详情
    getReportDel() {
      ReportDel({}).then(res => {
        console.log(res);
      });
    },
    getSort() {
      this.page = 1;
      this.getReportpage();
    },

    //  //批量操作
    // getReportdeles(id){
    //   let params = {
    //     reportIds:this.reportId,
    //     dealUserId:this.$store.state.userId,
    //     reportDealResult:id,
    //     type:1,
    //     remark:this.ReportData.answerContent,
    //   }
    //   this.params =this.util.remove(params)
    //   Reportdeles(params).then(res=>{
    //     if(res.code==200){
    //       this.$Message.info('操作成功');
    //       this.$router.back()
    //     }
    //     console.log(res)
    //   })
    // },

    //批量操作
    getReportdeles() {
      if (this.type == 0) {
        this.types = 0;
      } else {
        this.types = 1;
      }
      let params = {
        reportIds: this.arr,
        dealUserId: this.$store.state.userId,
        reportDealResult: this.type,
        type: this.types
      };
      this.params = this.util.remove(params);
      Reportdeles(params).then(res => {
        if (res.code == 200) {
          this.status = false;
          this.getReportpage();
          this.$Message.info("操作成功");
        }
      });
    },
    // 举报管理--删除举报
    getReportdelete() {
      Reportdelete({
        reportId: this.reportId
      }).then(res => {
        if (res.code == 200) {
          this.getReportpage();
        }
        console.log(res);
      });
    },
    space() {
      console.log(this.type)
      if (this.type == 0) {
        this.arr = this.arr
          .map(item => {
            return item.reportId;
          })
          .toString();
        this.getReportdeles();
      } else if (this.type != 0) {

        if (this.arr.length == 0 || this.arrs == "") {
          this.$Message.error("暂无可操作数据");
        } else {
          this.arr = this.arrs;
          this.getReportdeles();
        }
      }
    },

    delete(e) {
      this.reportId = e;
      this.getReportdelete();
    },
    //分页功能
    changepages(index) {
      this.page = index;

      this.getReportpage();
    },

    //每条数据单选框的状态
    handleSelectionChange(val) {
      this.arr = val;
      console.log(this.arr);
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true;
      } else {
        this.status = false;
      }
      let a = val.filter(item => item.reportDealResultText == "未处理");
      this.arrs = a
        .map(item => {
          return item.reportId;
        })
        .toString();
      console.log(this.arrs);
    },
    //全选按钮
    chackall() {
      this.status = !this.status;
      this.$refs.selection.selectAll(this.status);
    },

    //查询
    query() {
      this.getReportpage();
    }
  }
};
</script>
<style lang="scss" scoped>
.integral-body {
  padding: 20px;

  display: flex;
  height: 80px;
  background: #ffffff;
  border: 0;
}
.name {
  span {
    display: block;
    width: 120px;
  }
  .inpt {
    margin-right: 30px;
  }
}
.contents {
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
}
//
.con-top {
  margin-bottom: 10px;
}

.pages {
  text-align: center;
  padding: 20px 0;
  background: #fff;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}
.space {
  margin-left: 10px;
}
</style>
