<!-- 广告列表(志愿者) -->
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
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>广告名称</span>
          <Input size="large" placeholder="广告名称" class="inpt" />
        </div>
        <div class="flex-center-start">
          <span>广告位置</span>
          <Select v-model="model1" style="width:200px" placeholder="全部" class="inpt">
            <Option v-for="item in location" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div class="flex-center-start">
          <span>到期时间</span>
          <Row>
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
          <Button size="small" class="table-btn" @click="add">添加广告</Button>
          <Select size="small" class="inpt" placeholder="显示条数"></Select>
          <Select size="small" class="inpt" placeholder="排序方式"></Select>
        </div>
      </div>
      <Table border :columns="columns" :data="data"></Table>
      <div class="pages flex-center-between">
        <div class="batch">
          <Checkbox>全选</Checkbox>
          <Select placeholder="批量操作" style="width: 150px">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px">确定</Button>
        </div>
        <Page :current='page' :total="100" show-elevator show-total size="small" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model1: "",
      location: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "会员首页轮播",
          label: "会员首页轮播"
        },
        {
          value: "志愿者首页轮播",
          label: "志愿者首页轮播"
        }
      ],
      navigation1: {
        head: "广告列表(志愿者)"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "广告名称",
          key: "advertise",
          render: (h, params) => {
            return h("div", "月捐介绍");
          }
        },
        {
          title: "广告位置",
          key: "location",
          render: (h, params) => {
            return h("div", "会员首页轮播");
          }
        },
        {
          title: "广告图片",
          key: "img",
          render: (h, params) => {
            return h("div", "");
          }
        },
        {
          title: "时间",
          key: "time",
          render: (h, params) => {
            return h("div", "2019-08-02 15:47:44");
          }
        },
        {
          title: "上线",
          key: "online",
          align: "center",
          render: (h, params) => {
            return h("div", [h("i-switch")]);
          }
        },
        {
          title: "点击次数",
          key: "number",
          render: (h, params) => {
            return h("div", "200");
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
                      this.$router.push({ name: "vp_add" });
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
                    color: "blue"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "置顶"
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
      data: [],
      batchList: [
        {
          value: "Delete",
          label: "删除"
        }
      ]
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {
    ok() {
      this.$Message.info("新增成功");
    },
    cancel() {
      this.$Message.info("新增失败");
    },
    add() {
      this.$router.push({ name: "vp_add" });
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
  margin-right: 15px;
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
</style>
