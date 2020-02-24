<!-- 商品列表(共用)-->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="shop">
          <Button><span>全部商品(100)</span></Button>
          <Button><span>已上架（80）</span></Button>
          <Button><span>未上架（20）</span></Button>
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
          <Button>高级检索</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>输入搜索：</span>
          <Input size="large" placeholder="商品名称/商品货号" class="inpt" />
        </div>
        <div class="flex-center-start">
          <span>商品分类：</span>
           <Select style="width:200px" placeholder="全部">
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
          <Button size="small" @click="addshop">新增商品</Button>
          <Select size="small" class="inpt" placeholder="显示条数"></Select>
          <Select size="small" class="inpt" placeholder="排序方式"></Select>
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
        head: "商品列表(共用)",
       },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "编号",
          key: "id",
        },
          {
          title: "商品图片",
          key: "shopimg",
          render: (h) => {
　　　　　　return h('img', {
　　　　　　　　attrs: {
　　　　　　　　　　src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568873093429&di=e72b75a25b1f15d788ba8f97378a4117&imgtype=0&src=http%3A%2F%2Fimg002.hc360.cn%2Fg3%2FM05%2F45%2FFF%2FwKhQvFLfKMaEYJMdAAAAAGqrml0101.jpg',
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
          render: (h, params) => {
            return h("div", "T恤衫     品牌：");
          }
        },
        {
          title: "价格/货号",
          key: "start",
          render:(h,params) =>{
              return h("div","积分：100.00")
          }
        },
        {
          title: "状态",
          key: "status",
          algin: "center",
          render: (h, params) => {
            return h("div", ["上架： ",h("i-switch"),"新品： ",h("i-switch"),"推荐： ",h("i-switch")]);
          }
        },
       {
          title: "排序",
          key: "sort",
          width:"100px",
          render: (h, params) => {
            return h("div", "100");
          }
        },
       {
          title: "SKU库存",
          key: "stock",
          render: (h, params) => {
            return h("div", "");
          }
        },
       {
          title: "销量",
          key: "sale",
          render: (h, params) => {
            return h("div", "100");
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
                "查看"
              ),
              h("a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276",
                    marginLeft: "10px",
                  },
                  on: {
                    click: () => {
                      this.$router.push({ name: 'addshop' })
                    }
                  }
                },
                "编辑"
              ),
              h("a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276",

                  },
                  on: {
                    click: () => {
                      this.$router.push({ name: 'shopjournal' })
                    }
                  }
                },
                "日志"
              ),
              h(
                "a",
                {
                  style: {
                    color: "red",
                    marginLeft: "10px",
                  },
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
    addshop(){
      this.$router.push({ name: 'addshop' })
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
.shop Button:nth-of-type(1){
    background: green;
    color: white;
}
</style>
