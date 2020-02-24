<!-- 商品库存（共用） -->
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
          <Button>高级检索</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>输入搜索</span>
           <Input class="inpt" placeholder="商品名称/商品货号"  />
        </div>
        <div class="flex-center-start">
          <span>操作类型</span>
           <Select size='large' class="inpt" placeholder="全部">
          </Select>
        </div>
        <div class="flex-center-start">
          <span>操作时间</span>
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
        <div class="data-ios">
         <div class="flex-center-start"
           <Icon type="ios-apps" />
          <span>数据列表</span>
         </div>
            <div class="flex-center-end">
                  <Select size='small' class="inpt" placeholder="显示条数"></Select>
                  <Select size='small' class="inpt" placeholder="排序方式"></Select>
            </div>
        </div>
      </div>
      <Table border :columns="columns" :data="data"></Table>
      <div class="pages">
        <Page :current='page' :total="100" show-elevator show-total size="small" />
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
       navigation1: {
        head: "商品库存（共用）"
      },
      modal1: false,
      modal2: false,
      columns: [
        {
          title: "商品图片",
          key: "shopimg",
          render: (h) => {
　　　　　　return h('img', {
　　　　　　　　attrs: {
　　　　　　　　　　src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568807266566&di=ca82400ec10554d30f8dd5a3a2ca133d&imgtype=0&src=http%3A%2F%2Fimg009.hc360.cn%2Fg8%2FM08%2FEE%2F89%2FwKhQt1N9cmGEHKQQAAAAAN7_jII892.jpg',
　　　　　　　　},
　　　　　　　　style: {
　　　　　　　　　width:"50px",
                height:"50px"
　　　　　　　　}
　　　　　　});
　　　　}
        },
        {
          title: "商品名称",
          key: "shopname",
          width:"100"
        },
        {
          title: "订单号",
          key: "ordernumber"
        },
        {
          title:"库存",
          width:"100",
          key:"stock"
        },
        {
          title:"库存类型",
          key:"stockclass"
        },
        {
          title:"操作类型",
          key:"operation"
        },
        {
          title:"操作信息",
          key:"message"
        }
      ],
      data: []
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
.pages {
  text-align: center;
   margin-top: 2.5rem;
}
.ipt {
  margin-left: 10px;
  padding: 5px;
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
.integral{
    font-size: 14px;
}
.ivu-modal-body div{
  margin: 10px 0 0 10px;
}
.ivu-upload{
  display: inline-block;
  background: rgb(207, 204, 204);
  width: 5rem;
  text-align: center;
  line-height: normal;
}
.ivu-upload-select{
  width: 3rem;
}
</style>
