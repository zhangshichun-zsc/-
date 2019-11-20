<!--登陆日志-->
<template>
  <div class="less">
    <Navigation :labels="navigation1"></Navigation>
    <p class="xt-lb">
      <Icon class="xt-tb" type="ios-list" size="24" color="block" />数据列表
    </p>

    <Table ref="demo" border :columns="columns1" :data="data1"></Table>
    <div class="pages">
      <!-- <span>共10页/100条数据</span> -->
      <Page :total="100" show-elevator show-total />
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {

      navigation1: {
        head: "登陆日志"
      },
      columns1: [
        {
          title: "时间",
          key: "date"
        },
        {
          title: "IP",
          key: "age"
        },
        {
          title: "地区",
          key: "address"
        },
        {
          title: "浏览器",
          key: "llq"
        }
      ],
      data1: [],
      arr:[],
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {

  }
};
</script>
<style lang="scss" scoped>
.xt-lb {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  background: #f3f3f3;
  border: #e4e4e4 solid 1px;
  border-bottom: 0px;
  margin-top: 20px;
  .xt-tb {
    font-weight: 700;
  }
}
.less {
  height: 100%;
}
.pages {
  padding-right: 20px;
  height: 50px;
  background: #fdfdfe;
  border: 1px solid #e4e4e4;
  display: flex;
  justify-content: center;
  align-items: center;
  // position: relative;
  // top: 800px;
  margin-top: 50px;
  font-size: 14px;
}
.ivu-table-header tr th {
  text-align: center;
  font-weight: 700;
}
.ivu-table-row td {
  text-align: center;
}
</style>
