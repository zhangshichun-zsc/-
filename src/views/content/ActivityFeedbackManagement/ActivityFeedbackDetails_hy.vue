<!--活动反馈详情(会员)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con-top con-p bk-szy flex-center-start">
        <p>
          <span>5.12 “行走在夏日”游园活动</span>
          <span>（10条反馈）</span>
        </p>
        <div class="flex-center-end">
          <Button size="small">导出反馈结果</Button>
          <div class="Pack">
            <Icon type="ios-arrow-down" />
            <span>收起筛选</span>
          </div>
          <Button size="small">查询结果</Button>
        </div>
      </div>
      <div class="con con-p bk inp flex-center-start">
        <p>
          <span>反馈人:</span>&nbsp;
          <Input size="small" placeholder="活动名称" style="width: 8rem" />
        </p>
        <p>
          <span>提交时间:</span>&nbsp;
          <DatePicker type="date" style="width: 200px"></DatePicker>
          <span>———</span>
          <DatePicker type="date" style="width: 200px"></DatePicker>
        </p>
      </div>
    </div>
    <div class="content">
      <div class="con-top bk-szy flex-center-start">
        <p>
          <Icon type="ios-list" size="30" />
          <span>数据列表</span>
        </p>
        <div class="flex-center-end">
          <Button size="small">
            显示条数
            <Icon type="md-arrow-dropdown" />
          </Button>
          <Button size="small">
            排序方式
            <Icon type="md-arrow-dropdown" />
          </Button>
        </div>
      </div>
      <div class="con">
        <div class="con-left">
          <Table border :columns="columns" :data="data"></Table>
          <div class="pages">
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
        <div class="con-right bk">
          <div class="con-top">
            <p>反馈详情</p>
          </div>
          <div style="padding: 0.1rem 0.5rem" v-for="(item,i) in lists">
            <p>{{lists[i].sort}}.{{lists[i].question}}</p>
            <div>{{lists[i].answer}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Divider from "iview/src/components/divider/divider";
import { date1 } from "../../../request/datatime";
import { Activityuserpage, Activitydetail } from "../../../request/api";
export default {
  components: { Divider },
  data() {
    return {
      navigation1: {
        head: "活动反馈详情(会员)"
      },
      data: [],
      page: 1, //每页显示多少数据
      size: 10, //数据条数
      dataCount: 0,
      userName: "",
      feedbackId: 18,
      sort: "",
      question: "",
      answer: "",
      submitTimestampFrom: "",
      submitTimestampTo: "",
      arr: [],
      lists: [],
      columns: [
        {
          title: "反馈人",
          key: "userName",
          width: "100px",
          align: "center"
        },
        {
          title: "手机号码",
          key: "tel",
          align: "center",
          width: "140px"
        },
        {
          title: "反馈时间",
          key: "feedbackTimestamp",
          align: "center",
          width: "180px",
          render: (h, params) => {
            return h("div", [h("p", date1("Y-m-dH:i:s", params.row.startAt))]);
          }
        },
        {
          title: "参与活动岗位",
          key: "userTypeText",
          align: "center",
          width: "160px"
        }
      ]
    };
  },
  methods: {
    getActivityuserpage() {
      Activityuserpage({
        page: { page: this.page, size: this.size },
        activityId: this.$route.query.activityId
      }).then(res => {
        if (res.code == 200) {
          this.data = res.data.list;
          this.dataCount = res.data.totalSize;
        }
        console.log(res);
      });
    },
    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getActivityuserpage();
    },

    //详情
    getActivitydetail() {
      Activitydetail({
        feedbackId: this.feedbackId
      }).then(res => {
        if (res.code == 200) {
          this.lists = res.data;
          console.log(res);
        }
      });
    }
  },
  mounted() {
    this.getActivityuserpage();
    this.getActivitydetail();
  }
};
</script>
<style lang="scss" scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
}
.main,
.bk {
  border: 1px solid #e4e4e4;
}
.con-left {
  width: 60%;
}
.con-right {
  width: 25%;
}
.con-right div {
  margin: 8px;
}

.con {
  display: flex;
  justify-content: space-between;
}
.content {
  margin: 1rem;
}
.con-top {
  background-color: #f3f3f3;
  justify-content: space-between;
  padding: 0.2rem 1rem;
}
.bk-szy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
}
.con-p p {
  margin-right: 3rem;
}
.inp {
  display: flex;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
}
.Pack,
.content button {
  margin-right: 1rem;
}

.pages {
  display: flex;
  justify-content: center;
  margin: 10px auto;
}
</style>
