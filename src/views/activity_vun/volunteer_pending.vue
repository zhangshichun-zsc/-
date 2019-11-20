<!--活动待处理(志愿者)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="head">
      <p>5.12 "行走在夏日" 游园活动</p>
    </div>
    <div class="content">
      <p>
        <span>活动管理</span>
        <i-select :model.sync="model1" style="width:200px">
          <i-option
            v-for="(item,index) in cityList"
            :value="item.value"
            :key="index"
          >{{ item.label }}</i-option>
        </i-select>
      </p>
      <div class="content-details">
        <ul class="list-one">
          <li>
            <a>报名</a>
          </li>
          <li>
            <a>转移人员</a>
          </li>
          <li>
            <a>物资领取</a>
          </li>
          <li>
            <a>补助发放</a>
          </li>
        </ul>
        <ul class="list">
          <li class="active">
            <a>全部</a>
          </li>
          <li>
            <a>待审核</a>
          </li>
          <li>
            <a>已通过</a>
          </li>
          <li>
            <a>已参加</a>
          </li>
          <li>
            <a>已违约</a>
          </li>
          <li>
            <a>已取消</a>
          </li>
        </ul>
        <div class="search">
          <i-input :value.sync="value" placeholder="报名人/手机号" style="width: 150px"></i-input>
          <Button class="table-btn">搜索</Button>
        </div>
        <div class="integral-table">
          <div class="table-header flex-center-between">
            <div>
              <Checkbox :checked.sync="checks">全选</Checkbox>
              <span>已选择0人</span>
              <Button class="table-btn">通过</Button>
              <Button class="table-btn">拒绝</Button>
              <Button class="table-btn">群发信息</Button>
            </div>
          </div>
          <Table border :columns="columns" :data="datax"></Table>
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
        head: "活动待处理(志愿者)"
      },
      value: "",
      checks: false,
      cityList: [
        {
          value: "all",
          label: "所有场次"
        },
        {
          value: "fist",
          label: "第一场"
        },
        {
          value: "two",
          label: "第二场"
        }
      ],
      model1: "",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          align: "center"
        },
        {
          title: "手机号码",
          key: "time",
          align: "center"
        },
        {
          title: "用户类型",
          key: "userstype",
          align: "center"
        },
        {
          title: "场次",
          key: "number",
          align: "center"
        },
        {
          title: "预约时间",
          key: "state",
          align: "center"
        },
        {
          title: "报名状态",
          key: "apply",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  clssName: "action",
                  style: {
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      // this.$router.push({ path: "/organization/editDetail" });
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
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      // this.$Message.info("你点击了第" + params.index + "列");
                    }
                  }
                },
                "拒绝"
              )
            ]);
          }
        }
      ],
      datax: [
        {
          name: "受益方",
          designation: "帆帆",
          project: 1800000000,
          time: "受益方",
          types: "帆帆",
          userstype: "2019-10-01",
          number: 100,
          state: 1000,
          apply: "+800"
        },
        {
          name: "受益方",
          designation: "帆帆",
          project: 1800000000,
          time: "受益方",
          types: "帆帆",
          userstype: "2019-10-01",
          number: 100,
          state: 1000,
          apply: "+800"
        }
      ]
    };
  },



  computed: {},

  created() {},

  methods: {}
};
</script>
<style lang="scss" scoped>
.head {
  height: 70px;
  padding-left: 40px;
  // text-align: center;
  line-height: 70px;
  font-size: 18px;
  background: #ffffff;
}
.content {
  padding-left: 30px;
  background: #e3e3e3;
  p {
    background: #e3e3e3;
    height: 50px;
    line-height: 50px;
    span {
      margin-right: 20px;
    }
  }
  .list-one {
    display: flex;
    height: 40px;
    line-height: 40px;
    background: #ffffff;
    margin-bottom: 5px;
    li {
      margin: 0 20px;
      // color: green;
      a {
        color: green;
      }
    }
  }
  .list {
    display: flex;
    height: 40px;
    line-height: 40px;
    background: #ffffff;
    border: #e3e3e3 solid 1px;
    li {
      margin: 0 20px;
      width: 50px;
      text-align: center;
      a {
        color: black;
      }
    }
    .active {
      background: green;
      color: #ffffff;
    }
  }
}
.table-header {
  height: 50px;
  background: #ffffff;
  padding-left: 10px;
  span {
    font-size: 14px;
  }
  .table-btn {
    margin: 0 10px;
  }
}
.search {
  height: 40px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  background: #ffffff;
  .table-btn {
    margin-left: 20px;
  }
}
.content-details {
  background: #ffffff;
}
</style>
