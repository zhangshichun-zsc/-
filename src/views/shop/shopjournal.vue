<!-- 商品日志(共用) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div class="data-ios">
         <div class="flex-center-start"
           <Icon type="ios-apps" />
          <span>数据列表</span>
         </div>
        </div>
      </div>
      <Table border :columns="columns" :data="data"></Table>
      <div class="pages">
        <Page :total="100" show-elevator show-total size="small" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        navigation1: {
        head: "商品日志(共用)"
      },
      modal1: false,
      columns: [
        {
          title: "编号",
          key: "id",
          width:"100px",
          align:"center"
        },
        {
          title: "销售价格",
          key: "saleprice",
          align:"center"
        },
        {
          title: "促销价格",
          key: "proprice",
          align:"center"
        },
        {
          title:"积分兑换额",
          key:"interprice",
          align:"center"
        },
        {
          title:"上下架",
          key:"updown",
          align:"center"
        },
        {
          title:"操作信息",
          key:"information",
          align:"center"
        },
      ],
      data: [
        {
            id:"1",
            saleprice:"原：100.00元    现：20元",
            proprice:"原：100.00元     现：200.00元",
            interprice:"原：1000    现：2000 ",
            updown:"原：上架中   原：上架中",
            information:"admin 2019-07-07 16:58:11"
        },
        {
            id:"2",
            saleprice:"原：199.00元    现：99元",
            proprice:"原：100.00元     现：200.00元",
            interprice:"原：1000    现：2000 ",
            updown:"原：上架中   原：上架中",
            information:"admin 2019-07-07 16:58:11"
        },
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
    }
  }
};
</script>
<style lang="scss">
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
.pages {
  text-align: center;
}
.ipt {
  margin-left: 10px;
}
.sdate {
  margin-left: 15px;
}
.data-ios{
    padding: 5px;
}
.inpt{
    margin: 5px;
}
.pages{
    margin-top: 2.5rem;
}
</style>
