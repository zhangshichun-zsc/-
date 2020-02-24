<!--商品批量修改(共用)-->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="shop">
          <Button @click="modify"><span>修改价格/库存</span></Button>
          <Button @click="updown"><span>批量自动上下架</span></Button>
      </div>
      <div class="flex-center-between integral-top">
        <div>
          <Icon type="ios-search-outline" />
          <span>筛选查询</span>
        </div>
        <div class="flex-center-end">
          <div class="integral-center">
            <Icon type="ios-arrow-up" />
            <span>收起筛选</span>
          </div>
          <Button>查询结果</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>输入搜索：</span>
          <Input size="large" placeholder="商品名称/商品货号" class="inpt" />
        </div>
        <div class="flex-center-start">
          <span>商品分类：</span>
           <Select style="width:200px" placeholder="请选择商品分类">
           </Select>
        </div>
        <div class="flex-center-start">
          <span>商品品牌：</span>
          <Select style="width:200px" placeholder="请选择品牌">
           </Select>
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
          <Select size="small" class="inpt" placeholder="显示条数"></Select>
          <Select size="small" class="inpt" placeholder="排序方式"></Select>
        </div>
      </div>
      <Table border :columns="columns" :data="data"></Table>
      <div class="pages flex-center-between">
        <div>
          <Checkbox>全选</Checkbox>
          <TimePicker type="time" placeholder="请选择时间" style="width: 168px;margin-right:10px"></TimePicker>
          <Button>批量上架</Button>
          <Button>批量下架</Button>
        </div>
        <Page :current='page' :total="100" show-elevator show-total size='small'/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        navigation1: {
        head: "商品批量修改(共用)",
       },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "商品名称",
          key: "shopname",
          render: (h, params) => {
            return h("div", "T恤");
          }
        },
          {
          title: "积分兑换量",
          key: "intergal",
　　　　　render: (h, params) => {
            return h("div", "100.00");
          }
        },
        {
          title: "上架时间",
          key: "uptime",
          render: (h, params) => {
            return h("div", "2017-07-07 16:58:11");
          }
        },
        {
          title: "下架时间",
          key: "downtime",
          render: (h, params) => {
            return h("div", "2017-07-07 16:58:11");
          }
        },
        {
          title: "操作",
          key: "action",
          width:"120px",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276",
                  },
                },
                "撤销"
              )
            ]);
          }
        }
      ],
      data: [
        {
        },
        {
        },
        {
        },
        {
        },
        {
        },
        {
        },
        {
        },
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
