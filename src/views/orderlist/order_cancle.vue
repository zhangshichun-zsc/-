<!-- 订单详情-已取消（共用）-->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="shop">
          <div class="circle">
             <i-circle :percent="100" stroke-color="#5cb85c" >
               <Icon type="ios-checkmark" size="60" style="color:#5cb85c"></Icon>
             </i-circle>
             <p>提交订单</p>
             <span>2019-07-19 15:43:23</span>
          </div>
          <div class="circle">
             <i-circle :percent="100" stroke-color="#5cb85c" >
               <Icon type="ios-checkmark" size="60" style="color:#5cb85c"></Icon>
             </i-circle>
             <p>支付订单</p>
             <span>2019-07-19 15:43:23</span>
          </div>
          <div class="circle">
             <i-circle :percent="100" stroke-color="#5cb85c" >
               <Icon type="ios-checkmark" size="60" style="color:#5cb85c"></Icon>
             </i-circle>
             <p>平台发货</p>
             <span>2019-07-19 15:43:23</span>
          </div>
      </div>
      <div class="flex-center-between integral-top">
        <div>
          <Icon type="ios-information-circle" style="color:red"/>
          <span>当前订单状态：已取消</span>
        </div>
        <div class="flex-center-end">
          <Button @click="modal1=true">发送站内信</Button>
          <Button @click="modal2=true">备注订单</Button>
        </div>
         <Modal v-model="modal1" title="发送站内信">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                 <FormItem label="标题" prop="title">
                     <Select v-model="formValidate.title"></Select>
                 </FormItem>
                 <FormItem label="内容" prop="content">
                      <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 5,maxRows: 5}"></Input>
                 </FormItem>
              </Form> 
          </Modal>
          <Modal v-model="modal2" title="备注订单">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                 <FormItem label="操作备注" prop="remark">
                      <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 5,maxRows: 5}"></Input>
                 </FormItem>
              </Form> 
          </Modal>
      </div>
    </div>
    <div class="integral-table">
        <div class="table">
            <Icon type="md-bookmark" />
            <span>基本信息</span>
            <Table border :columns="columns" :data="data"></Table>
        </div>
        <div class="table">
            <Icon type="md-bookmark" />
            <span>收货人信息</span>
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="table">
            <Icon type="md-bookmark" />
            <span>商品信息</span>
            <Table border :columns="columns2" :data="data2"></Table>
        </div>
        <div class="table">
            <Icon type="md-bookmark" />
            <span>操作信息</span>
            <Table border :columns="columns3" :data="data3"></Table>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
       formValidate:{
        title:'',
        remark:'',
        content:''
       },
      ruleValidate:{
        title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
            ],
        content: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
            ],
        remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
            ]
      }, 
        modal1:false,
        modal2:false,
        navigation1: {
        head: "订单详情-已取消（共用）"
       },
      columns: [
      
        {
          title: "订单编号",
          key: "id",
          align:"center",
          render: (h, params) => {
            return h("div", "201907196398345");
          }
        },
        {
          title: "用户账号",
          key: "user",
          align:"center",
          render: (h, params) => {
            return h("div", "18000000000 查看");
          }
        },
        {
          title: "支付方式",
          key: "price",
          align:"center",
           render: (h, params) => {
            return h("div", "现金");
          }
        },
        {
          title: "配送方式",
          key: "payment",
          align:"center",
           render: (h, params) => {
            return h("div", "未发货");
          }
        },
        {
          title: "物流单号",
          key: "logistic",
          align:"center",
           render: (h, params) => {
            return h("div", "未发货");
          }
        }
      ],
      columns1: [
      
        {
          title: "收货人",
          key: "receier",
          align:"center",
          render: (h, params) => {
            return h("div", "123");
          }
        },
        {
          title: "手机号码",
          key: "phone",
          align:"center",
          render: (h, params) => {
            return h("div", "18000000000");
          }
        },
        {
          title: "邮政编码",
          key: "email",
          align:"center",
           render: (h, params) => {
            return h("div", "21000");
          }
        },
        {
          title: "收货地址",
          key: "address",
          align:"center",
           render: (h, params) => {
            return h("div", "南京");
          }
        }
      ],
      columns2: [
        {
          title: "商品信息",
          key: "receier",
          align:"center",
         render: (h) => {
　　　　　 return h('img', {
　　　　　　　　attrs: {
　　　　　　　　　　src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567649710&di=395b989ba4f5f6c42f9de07978070305&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F00%2F80%2F44%2F58c7d87e55ce1_610.jpg',
　　　　　　　　},
　　　　　　　　style: {
　　　　　　　　　width:"30px",
                height:"30px"
　　　　　　　　}
　　　　　　});
　　　　}
        },
        {
          title: "商品名称",
          key: "goodname",
          align:"center",
          render: (h, params) => {
            return h("div", "T恤");
          }
        },
        {
          title: "价格货号",
          key: "priceid",
          align:"center",
           render: (h, params) => {
            return h("div", "价格：¥100.00");
          }
        },
        {
          title: "数量",
          key: "number",
          align:"center",
           render: (h, params) => {
            return h("div", "1");
          }
        },
        {
          title: "库存",
          key: "stock",
          align:"center",
           render: (h, params) => {
            return h("div", "100");
          }
        },
        {
          title: "小计",
          key: "total",
          align:"center",
           render: (h, params) => {
            return h("div", "¥100.00");
          }
        }
      ],
       columns3: [
      
        {
          title: "操作者",
          key: "operater",
          align:"center",
          render: (h, params) => {
            return h("div", "用户");
          }
        },
        {
          title: "操作时间",
          key: "operatime",
          align:"center",
          render: (h, params) => {
            return h("div", "2019-07-19 15:43:23");
          }
        },
        {
          title: "订单状态",
          key: "orderstate",
          align:"center",
           render: (h, params) => {
            return h("div", "已取消");
          }
        },
        {
          title: "付款状态",
          key: "pricestate",
          align:"center",
           render: (h, params) => {
            return h("div", "已退款");
          }
        },
        {
          title: "发货状态",
          key: "salestate",
          align:"center",
           render: (h, params) => {
            return h("div", "未发货");
          }
        },
        {
          title: "备注",
          key: "remark",
          align:"center",
           render: (h, params) => {
            return h("div", "无货");
          }
        }
      ],
      data: [
        {}
      ],
      data1: [
        {}
      ],
      data2: [
        {}
      ],
      data3: [
        {}
      ],
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
  justify-content: space-between;
  display: flex
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
    display: flex;
    justify-content: flex-start
}
.circle{
    text-align: center;
    margin-right: 50px;
}

.circle p{
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0;
}
.circle span:last-child{
    font-size: 12px;
    color: #bbb;
}
.table{
    margin-bottom: 40px;
}
</style>
