<!-- 订单列表(共用)-->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="shop">
          <Button><span>全部订单(1000)</span></Button>
          <Button @click="pend"><span>待付款(1000)</span></Button>
          <Button @click="ship"><span>待发货(1000)</span></Button>
          <Button @click="shiped"><span>已完成(1000)</span></Button>
          <Button @click="close"><span>已关闭(1000)</span></Button>
          <Button @click="cancle"><span>已取消(1000)</span></Button>
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
          <Button @click="modal2=true">高级检索</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>输入搜索：</span>
          <Input size="large" placeholder="订单编号/商品货号" class="inpt" />
        </div>
        <div class="flex-center-start">
          <span>收货人：</span>
          <Input size="large" placeholder="收货人姓名/手机号码" class="inpt" />
        </div>
        <div class="flex-center-start">
          <span>提交时间：</span>
           <DatePicker type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
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
          <Button size="small" @click="modal1 = true">合并订单</Button>
          <Button size="small" @click="batch">批量发货</Button>
          <Button size="small">导出订单</Button>
          <Select size="small" class="inpt" placeholder="显示条数"></Select>
          <Select size="small" class="inpt" placeholder="排序方式"></Select>
        </div>
         <Modal v-model="modal1" title="合并订单">
               <Form :label-width="80">
                 <FormItem label="主订单">
                   <Select v-model="formItem.select">
                  </Select>
                 </FormItem>
                 <FormItem label="从订单">
                  <Select v-model="formItem.select">
                  </Select>
                 </FormItem>
              </Form>
        </Modal>
         <Modal v-model="modal2" title="高级检索">
           <div class="jian">
              <div>
                <p>输入搜索：</p>
                <Input type="text" placeholder="订单编号/商品货号"></Input>
                <p>订单状态：</p>
                <Select placeholder="全部"></Select>
                <p>订单来源：</p>
                <Select placeholder="全部"></Select>
              </div>
              <div>
                 <p>收货人：</p>
                <Input type="text" placeholder="收货人姓名/手机号码"></Input>
                <p>订单分类：</p>
                <Select placeholder="全部"></Select>
                <p>提交时间：</p>
                <TimePicker type="time" placeholder="请选择时间" ></TimePicker>
              </div>
           </div>
        </Modal>
        <Modal v-model="modal3" title="关闭订单">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                 <FormItem label="操作备注" prop="remark">
                      <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 5,maxRows: 5}"></Input>
                 </FormItem>
              </Form>
          </Modal>
      </div>
      <Table border :columns="columns" :data="data"></Table>
      <div class="pages">
          <div>
             <Checkbox>全选</Checkbox>
           <Button>关闭订单</Button>
           <Button>删除订单</Button>
          </div>
        <Page  :current='page' :total="100" show-elevator show-total size="small" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        formValidate:{
        remark:'',
       },
      ruleValidate:{
        remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
            ],
      },
        formItem:{
          select:'',
          input:'',
          time:''
        },
        modal1:false,
        modal2:false,
        modal3:false,
        navigation1: {
        head: "订单列表(共用)"
       },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "订单编号",
          key: "id",
          align:"center",
          render: (h, params) => {
            return h("div", "201907196398345");
          }
        },
          {
          title: "提交时间",
          key: "submittime",
          align:"center",
          width:"200px",
          render: (h, params) => {
            return h("div", "2019-07-19 14:48:38");
          }
        },
        {
          title: "用户账号",
          key: "user",
          align:"center",
          width:"150px",
          render: (h, params) => {
            return h("div", "18000000000");
          }
        },
        {
          title: "订单金额",
          key: "order",
          width:"100px",
          align:"center",
          render:(h,params) =>{
              return h("div","100.00")
          }
        },
        {
          title: "支付方式",
          key: "payment",
          width:"100px",
          align:"center"
        },
       {
          title: "订单状态",
          key: "orderstate",
          width:"100px",
          align:"center"
        },
        {
          title: "操作",
          key: "action",
          width:"300px",
          align: "center",
          render:(h,params)=>{
           if(params.index==0){
            return h('div', [
              h('a', {
                clssName: 'action',
                style: {
                  color: 'green'
                },
                on: {
                  click: () => {
                   this.$router.push({name:'order_pend'})
                  }
                }
              }, '查看订单'),
              h('a', {
                style: {
                  marginRight: '5px',
                  marginLeft: '5px',
                  color: 'green'
                },
                on: {
                  click: () => {
                   this.modal3=true
                  }
                }
              }, '关闭订单')
            ])
            }
            else if(params.index==1){
               return h('div', [
              h('a', {
                clssName: 'action',
                style: {
                  color: 'green'
                },
                on: {
                  click: () => {
                   this.$router.push({name:'order_pend'})
                  }
                }
              }, '查看订单'),
              h('a', {
                style: {
                  marginRight: '5px',
                  marginLeft: '5px',
                  color: 'green'
                },
                on: {
                  click: () => {
                   this.$router.push({name:'order_batch'})
                  }
                }
              }, '订单发货')
            ])
            }
            else if(params.index==2){
               return h('div', [
              h('a', {
                clssName: 'action',
                style: {
                  color: 'green'
                },
                on: {
                  click: () => {
                   this.$router.push({name:'order_pend'})
                  }
                }
              }, '查看订单'),
              h('a', {
                style: {
                  marginRight: '5px',
                  marginLeft: '5px',
                  color: 'green'
                },
                on: {
                  click: () => {
                  }
                }
              }, '订单跟踪')
            ])
            }
            else if(params.index==3){
               return h('div', [
              h('a', {
                clssName: 'action',
                style: {
                  color: 'green'
                },
                on: {
                  click: () => {
                   this.$router.push({name:'order_pend'})
                  }
                }
              }, '查看订单'),
              h('a', {
                style: {
                  marginRight: '5px',
                  marginLeft: '5px',
                  color: 'green'
                },
                on: {
                  click: () => {
                  }
                }
              }, '订单跟踪')
            ])
            }
            else if(params.index==4){
               return h('div', [
              h('a', {
                clssName: 'action',
                style: {
                  color: 'green'
                },
                on: {
                  click: () => {
                   this.$router.push({name:'order_pend'})
                  }
                }
              }, '查看订单'),
              h('a', {
                style: {
                  marginRight: '5px',
                  marginLeft: '5px',
                  color: 'green'
                },
                on: {
                  click: () => {
                  }
                }
              }, '删除订单')
            ])
            }
            else if(params.index==5){
               return h('div', [
              h('a', {
                clssName: 'action',
                style: {
                  color: 'green'
                },
                on: {
                  click: () => {
                   this.$router.push({name:'order_pend'})
                  }
                }
              }, '查看订单'),
              h('a', {
                style: {
                  marginRight: '5px',
                  marginLeft: '5px',
                  color: 'green'
                },
                on: {
                  click: () => {
                  }
                }
              }, '删除订单')
            ])
            }
          }
        }
      ],
      data: [

      ]

    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {
    pend(){
      this.$router.push({ name: 'order_pend' })
    },
    ship(){
      this.$router.push({ name: 'order_ship' })
    },
    shiped(){
      this.$router.push({ name: 'order_shiped' })
    },
    close(){
      this.$router.push({ name: 'order_close' })
    },
    cancle(){
      this.$router.push({ name: 'order_cancle' })
    },
    batch(){
      this.$router.push({ name: 'order_batch' })
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
}
.shop Button:hover{
    background: green;
    color: white;
}
.shop Button:nth-of-type(1){
    background: green;
    color: white;
}
.jian{
  display: flex;
  justify-content: space-around
}
.jian p{
  margin: 15px 0 10px 0;
}
</style>
