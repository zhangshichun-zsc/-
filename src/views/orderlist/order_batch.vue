<!-- 批量发货（共用） -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
 
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>发货列表</span>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <Table border :columns="columns" :data="data"></Table>
    </div>
    <div class="btn">
      <Button>取消</Button>
      <Button type="success">确定</Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        navigation1: {
        head: "批量发货（共用）"
      },
      columns: [
        {
          title: "订单编号",
          key: "orderid",
          align: "center",
          render: (h, params) => {
            return h("div", "201907196398345");
          }
        },
        {
          title: "收货人",
          key: "receiver",
          align: "center",
          render: (h, params) => {
            return h("div", "123");
          }
        },
        {
          title: "手机号码",
          key: "phone",
          align: "center",
          render: (h, params) => {
            return h("div", "18000000000");
          }
        },
        {
          title: "邮政编码",
          key: "post",
          align: "center",
          render: (h, params) => {
            return h("div", "51800");
          }
        },
        {
          title: "收获地址",
          key: "adress",
          align: "center",
          render: (h, params) => {
            return h("div", "北京");
          }
        },
        {
          title: "配送方式",
          key: "payment",
          align: "center",
          render: (h, params) => {
            return h("Select", "");
          }
        },
        {
          title: "物流单号",
          key: "logistics",
          align: "center",
          render: (h, params) => {
            return h("Input", "");
          }
        },
        
      ],
      data: [
        {
        },
        {
        }
      ]
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
.btn{
    margin: 20px;
    text-align: center
}
</style>
