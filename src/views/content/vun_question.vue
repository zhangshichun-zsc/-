<!-- 问卷调查(志愿者) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <Icon type="ios-search-outline" />
          <span>筛选查询</span>
        </div>
        <div class="flex-center-end">
          <div class="integral-center">
            <Icon type="ios-arrow-down" />
            <span>收起筛选</span>
          </div>
          <Button>查询结果</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body" style="font-size:14px">
        <div class="flex-center-start">
          <span>反馈人：</span>
          <Input size="large" placeholder="反馈人" class="inpt" />
        </div>
        <div class="flex-center-start">
          <span>问卷名称</span>
          <Input size="large" placeholder="全部" class="inpt" />
        </div>
        <div class="flex-center-start">
          <span>问卷时间</span>
          <Row>
            <Col span="12">
              <DatePicker type="date" placeholder="请选择日期" style="width: 200px" class="sdate"></DatePicker>
            </Col>
            <Col span="12">
              <DatePicker type="date" placeholder="请选择日期" style="width: 200px" class="sdate"></DatePicker>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div class="flex-center-start">
          <Icon type="md-list" />
          <span>数据列表</span>
        </div>
        <div class="flex-center-end">
          <Button size="small" @click="invest">新建问卷调查</Button>
          <Select size="small" class="inpt" placeholder="显示条数"></Select>
          <Select size="small" class="inpt" placeholder="排序方式"></Select>
        </div>
      </div>
      <Table border :columns="columns" :data="data"></Table>
      <div class="pages">
        <div class="page">
          <Page  :total="100" show-elevator show-total size="small" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigation1: {
        head: "问卷调查(志愿者)"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "问卷名称",
          key: "qtname",
          render: (h, params) => {
            return h("div", "活动问卷");
          }
        },
        {
          title: "开始时间",
          key: "start",
          render: (h, params) => {
            return h("div", "2019-07-01");
          }
        },
        {
          title: "结束时间",
          key: "end",
          render: (h, params) => {
            return h("div", "2019-07-31");
          }
        },
        {
          title: "状态",
          key: "status",
          algin: "center",
          render: (h, params) => {
            return h("div", [h("i-switch")]);
          }
        },
        {
          title: "问卷反馈明细",
          key: "detail",
          algin: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  style: {
                    color: "#097276"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ name: "vun_qdetail" });
                    }
                  }
                },
                "3"
              )
            ]);
          }
        },
        {
          title: "问卷推送对象",
          key: "object",
          algin: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  style: {
                    color: "#097276"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ name: "vun_object" });
                    }
                  }
                },
                "10"
              )
            ]);
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
                      this.$router.push({ name: "vun_edquestion" });
                    }
                  }
                },
                "编辑"
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
                "删除"
              )
            ]);
          }
        }
      ],
      data: []
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {
    invest() {
      this.$router.push({ name: "vun_new" });
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

.ipt {
  margin-left: 10px;
}
.sdate {
  margin-left: 15px;
}
button {
  margin: 0 0.5rem;
}
.pages {
  display: flex;
}
.page {
  margin-left: 20%;
}
</style>
