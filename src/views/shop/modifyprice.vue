<!--修改价格/库存（共用）-->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="shop">
          <Button @click="modify"><span>修改价格/库存</span></Button>
          <Button @click="updown"><span>批量自动上下架</span></Button>
      </div>
    </div>
     <div class="integral-table" style="text-align:center">
         <Table border :columns="columns" :data="data"></Table>
         <Button type="success" style="margin:20px">确定</Button>
     </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        navigation1: {
        head: "修改价格/库存（共用）",
       },
      columns: [
        {
          title:"编号",
          key:"id",
          align:"center"
        },
        {
          title: "商品名称",
          key: "shopname",
          align:"center",
          render: (h, params) => {
            return h("div", "指导手册");
          }
        },
          {
          title: "积分兑换数量",
          key: "intergal",
          align:"center",
　　　　　render: (h, params) => {
            return h("input", {style:{
                width:"120px",height:"26px",border:"1px solid #ddd",margin:"auto"
            }});
          }
        },
          {
          title: "库存",
          key: "intergal",
          align:"center",
　　　　　render: (h, params) => {
            return h("input", {style:{
                width:"120px",height:"26px",border:"1px solid #ddd",margin:"auto"
            }});
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
    modify(){
      this.$router.push({ name: 'modifyprice' })
    },
    updown(){
        this.$router.push({ name: 'automatic' })
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
}
.ipt {
  margin-left: 10px;
}
.sdate {
  margin-left: 15px;
}
Button{
    margin-right: 0.5rem;
}
.shop{
    margin:20px 10px;
}
.shop Button:hover{
    background: green;
    color: white;
}

</style>
