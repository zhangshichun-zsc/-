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
          <span>积分来源</span>
          <Select size="large" class="inpt" v-model="scoreRuleId">
            <Option
              v-for="item in list"
              :value="item.scoreRuleId"
              :key="item.scoreRuleId"
            >{{item.comments}}</Option>
          </Select>
        </div>
        <div class="flex-center-start">
          <span>操作时间</span>
          <DatePicker
            type="date"
            @change="time"
            format="yyyy/MM/dd"
            placeholder="请选择"
            style="width: 200px;margin-left:10px"
            v-model="updateTimeStamp"
          ></DatePicker>
        </div>
        <div class="flex-center-start">
          <Button class="search" @click="query">查询</Button> 
        </div>
      </div>
    </div>
    <div class="inter-list">
      <div class="table-header">
        <div class="flex-center-end">
          <Button class="table-btn" @click="exportData">
            导出数据
            <Icon type="md-arrow-dropdown" />
          </Button>
          <Select v-model="size" style="width:100px;margin:0 10px" placeholder="显示条数" class="space">
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="排序方式" class="space" style="width: 100px;" v-model="sort">
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
          align:'center'
        },
        {
          title: "用户昵称",
          key: "nickname",
          align:'center'
        },
        {
          title: "会员等级",
          key: "level",
          align:'center'
        },
        {
          title: "可用积分",
          key: "score",
          align:'center'
        }
      ],
      data1: [],
      columns2: [
        {
          title: "积分来源",
          key: "scoreOrigin",
          align:'center'
        },
        {
          title: "积分变化",
          key: "scoreChange",
          align:'center'
        },
        {
          title: "时间",
          key: "time",
          align:'center',
          render: (h, params) => {
            return h("div", formatDate(params.row.time));
          }
        },
        {
          title: "备注",
          key: "remark",
          align:'center'
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

      data2: [],
      sysType: 2,
      page: 1,
      size: 10,
      dataCount: 0,
      updateTimeStamp: "",
      scoreRuleId: "",
      arrs: [],
      datas: "",
      list: [],
      Retract: true
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
        console.log(res);
        if (res.code == 200) {
          this.list = res.data;
        }
      });
    },
    // 用户积分基础信息
    getintegralDet() {
      integralDet({
        sysType: this.sysType,
        userId: this.$route.query.userId
      }).then(res => {
        if (res.code == 200) {
          this.data1 = res.data;
        }
        console.log(res);
      });
    },
    // 积分历史记录分页
    getintegralHistory() {
      if (this.updateTimeStamp != "") {
        this.datas = this.updateTimeStamp.getTime();
        console.log(this.datas);
      } else {
        this.datas = "";
      }
      integralHistory({
        sysType: this.sysType,
        userId: this.$route.query.userId,
        scoreRuleId: this.scoreRuleId,
        updateTimeStamp: this.datas,
        page: {
          page: this.page,
          size: this.size,
          sort: "createAt" + " " + this.sort
        }
      }).then(res => {
        if (res.code == 200) {
          this.data2 = res.data.list;
          this.dataCount = res.data.totalSize;
        }
        console.log(res);
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
      console.log(11);
    },

    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getintegralHistory();
    },
    //选择内容
    handleSelectionChange(val) {
      console.log(val);
      this.arrs = val;
    },
    //查询
    query() {
      this.page=1
      this.getintegralHistory();
    }
  }
};
</script>
<style lang="scss">

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
  background:white;
  border: 1px solid #eee;
}
.table-header .table-btn {
  margin-left: 15px;
}
.pages {
  padding: 20px;
  background: #fff;
  text-align: center;
}
</style>
