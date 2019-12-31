<!-- 积分明细(志愿者) -->
<template>
  <div class="integral-header">
    <Navigation :labels="navigation1"></Navigation>
    <div class="inter">
      <div class="inter-head">
        <Table border :columns="columns1" :data="data1"></Table>
      </div>
      <div class="flex-center-start integral-body" v-if="Retract==true">
        <div class="flex-center-start">
          <span>积分来源:</span>
          <Select size="large" class="inpt" v-model="scoreRuleType">
            <Option
              v-for="item in list"
              :value="item.typeFlag"
              :key="item.typeFlag"
            >{{item.comments}}</Option>
          </Select>
        </div>
        <div class="flex-center-start">
          <span>操作时间/时间段:</span>
          <DatePicker
            class="inpt"
            style="width: 180px"
            type="date"
            @on-change="startTimeChange"
            placeholder="请选择开始时间"
            v-model="startAt"
          ></DatePicker>
          <span class="po">~</span>
          <DatePicker
            style="width: 180px"
            type="date"
            @on-change="endTimeChange"
            placeholder="请选择结束时间"
            v-model="endAt"
          ></DatePicker>
        </div>
        <!-- <div class="flex-center-start">
          <span>操作时间:</span>
          <DatePicker
            type="date"
            @change="time"
            format="yyyy/MM/dd"
            placeholder="请选择"
            style="width: 200px;margin-left:10px"
            v-model="updateTimeStamp"
          ></DatePicker>
        </div>-->
        <div class="flex-center-start">
          <Button class="table-btns" @click="query">查询</Button>
        </div>
      </div>
    </div>
    <div class="inter-list">
      <div class="table-header flex-center-between">
        <div class="flex-center-end">
          <Button class="table-btn" @click="exportData" disabled>
            导出数据
            <Icon type="md-arrow-dropdown" />
          </Button>
          <Select v-model="size" style="width:120px;margin:0 10px" placeholder="显示条数" class="space">
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="排序方式" class="space" style="width: 120px;" v-model="sort">
            <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <Table
        ref="selection"
        border
        :columns="columns2"
        :data="data2"
        @on-selection-change="handleSelectionChange"
      ></Table>

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
import { tablepage } from "@/request/mixin";
import { formatDate } from "@/request/datatime";
import { integralDet, integralHistory, integralrule } from "@/request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "积分明细(志愿者)"
      },
      columns1: [
        {
          title: "用户账号",
          key: "userAccount",
          align: "center"
        },
        {
          title: "用户昵称",
          key: "nickName",
          align: "center",
          width: 300
        },
        {
          title: "志愿者等级",
          key: "level",
          align: "center",
          width: 300
        },
        {
          title: "可用积分",
          key: "sourceScore",
          align: "center",
          width: 300
        }
      ],
      data1: [],
      columns2: [
        {
          title: "积分来源",
          key: "scoreOrigin",
          align: "center"
        },
        {
          title: "积分变化",
          key: "score",
          align: "center"
        },
        {
          title: "时间",
          key: "updateAt",
          align: "center"
        },
        {
          title: "审批状态",
          // key: "updateAt",
          align: "center",
          render: (h, params) => {
            let states = ["待审批", "已拒绝", "审核通过"];
            return h("p", states[params.row.auditFlag]);
          }
        },
        {
          title: "备注",
          key: "comments",
          align: "center"
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

      data2: [],
      sysType: 2,
      sysTypes: "2,3",
      page: 1,
      size: 10,
      dataCount: 0,
      updateTimeStamp: "",
      scoreRuleType: "",
      arrs: [],
      datas: "",
      list: [],
      Retract: true,
      startAt: "",
      endAt: "",
      userId: this.$route.query.userId
    };
  },

  components: {},
  mixins: [tablepage],
  computed: {},

  //事件监听
  watch: {
    size: "getintegralHistory",
    sort: "getintegralHistory"
  },

  created() {},
  mounted() {
    this.getintegralDet();
    this.getintegralHistory();
    this.getintegralrule();
  },

  methods: {
    // 获取积分规则列表
    getintegralrule() {
      integralrule({
        sysType: this.sysType
      }).then(res => {
        // console.log(res);
        if (res.code == 200) {
          res.data.unshift({ typeFlag: "", comments: "全部" });
          this.list = res.data;
        }
      });
    },
    // 用户积分基础信息
    getintegralDet() {
      integralDet({
        sysType: this.sysType,
        userId: this.userId
      }).then(res => {
        if (res.code == 200) {
          this.data1 = Array.of(res.data);
        }
        // console.log(res);
      });
    },
    // 积分历史记录分页
    getintegralHistory() {
      let params = {
        sysType: this.sysTypes,
        userId: this.userId,
        scoreRuleType: this.scoreRuleType,
        startAt: this.startAt,
        endAt: this.endAt,
        page: {
          page: this.page,
          size: this.size,
          sort: "updateAt" + " " + this.sort
        }
      };
      params = this.util.remove(params);
      integralHistory(params).then(res => {
        if (res.code == 200) {
          this.data2 = res.data.list;
          this.dataCount = res.data.totalSize;
        }
        // console.log(res);
      });
    },
    time(e) {
      let start = e;
      let end = e[1];
      this.updateTimeStamp = start + " 00:00:00";
    },
    //收起筛选
    Retractbtn() {
      this.Retract = !this.Retract;
      // console.log(11);
    },

    //分页功能
    changepages(index) {
      this.page = index;
      this.getintegralHistory();
    },
    //选择内容
    handleSelectionChange(val) {
      // console.log(val);
      this.arrs = val;
    },
    startTimeChange(e) {
      this.startAt = e;
    },

    endTimeChange(e) {
      this.endAt = e;
    },
    //查询
    query() {
      if (this.startAt && this.endAt) {
        if (this.startAt <= this.endAt) {
          this.startAt = this.startAt.split(" ")[0] + " 00:00:00";
          this.endAt = this.endAt.split(" ")[0] + " 23:59:59";
          this.page = 1;
          this.getintegralHistory();
        } else {
          this.startAt = "";
          this.endAt = "";
          this.$Message.error("时间选择错误请重新选择");
        }
      } else {
        this.page = 1;
        this.getintegralHistory();
      }
      // if (this.args.startAt && this.args.endAt) {
      //   if (this.args.startAt <= this.args.endAt) {
      //     this.args.startAt = this.args.startAt + " 00:00:00";
      //     this.args.endAt = this.args.endAt + " 23:59:59";

      //   } else {
      //      this.args.startAt=''
      //     this.args.endAt=''
      //     this.$Message.error('时间选择错误请重新选择')
      //   }

      // }else{
      //    this.page=1
      // this.getintegralHistory();
      // }
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
  background: white;
}
.integral-header .integral-center {
  margin: 0 20px;
}
.integral-header .integral-body {
  padding: 20px;
  background: #fff;
  padding-top: 40px;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 200px;
  margin-left: 15px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 20px;
}
.table-header {
  padding: 10px 20px;
  background: white;
}
.table-header .table-btn {
  margin-left: 15px;
}

.po {
  padding: 0 10px;
}
</style>
