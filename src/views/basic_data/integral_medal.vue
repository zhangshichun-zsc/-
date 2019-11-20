<!-- 勋章管理(会员) -->
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
           <Input class="inpt" placeholder="勋章名称"  />
        </div>
        <div class="flex-center-start">
          <span>规则</span>
           <Select size='large' class="inpt" placeholder="全部">
          </Select>
        </div>
        <div class="flex-center-start">
          <span>创建时间</span>
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
                  <Button size="small" @click="modal1 = true">新增</Button>
                  <Select size='small' class="inpt" placeholder="显示条数"></Select>
                  <Select size='small' class="inpt" placeholder="排序方式"></Select>
            </div>
             <Modal v-model="modal1" title="新增勋章" class="img">
               <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                 <FormItem label="勋章图片" prop="img">
                     <Upload action="//jsonplaceholder.typicode.com/posts/">
                       <img src="" alt="" >
                    </Upload>
                 </FormItem>
                 <FormItem label="勋章名称" prop="name">
                     <Input v-model="formValidate.name" placeholder="请输入勋章名称"></Input>
                 </FormItem>
                 <FormItem label="活动规则" prop="rules">
                     <Input v-model="formValidate.rules" placeholder="请输入规则"></Input>
                 </FormItem>
              </Form>
             </Modal>
             <Modal v-model="modal2" title="新增勋章" class="img">
               <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                 <FormItem label="勋章图片" prop="img">
                     <Upload action="//jsonplaceholder.typicode.com/posts/">
                       <img src="" alt="" >
                    </Upload>
                 </FormItem>
                 <FormItem label="勋章名称" prop="name">
                     <Input v-model="formValidate.name" placeholder="请输入勋章名称"></Input>
                 </FormItem>
                 <FormItem label="规则" prop="rules">
                     <Input v-model="formValidate.rules" placeholder="请输入规则"></Input>
                 </FormItem>
              </Form>
             </Modal>
             <Modal v-model="modal3" title="所获人员" width="600">
               <Table border :columns="columns1" :data="data1"></Table>
               <div class="pages">
                 <Page :total="100" show-elevator show-total size="small" />
                </div>
             </Modal>
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
        head: "勋章管理(会员)"
      },
     formValidate:{
         name:'',
         img:'',
         rules:''
       },
      ruleValidate:{
        name: [
            { required: true, message: '勋章名称不能为空', trigger: 'blur' }
            ],
        img: [
            { required: true, message: '勋章图片不能为空', trigger: 'blur' }
            ],
        rules: [
            { required: true, message: '活动规则不能为空', trigger: 'blur' }
            ],
      },
      modal1: false,
      modal2: false,
      modal3: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "勋章图片",
          key: "medalimg",
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
          title: "勋章名称",
          key: "medalname"
        },
        {
          title: "规则",
          key: "rules"
        },
        {
          title:"创建时间",
          key:"createtime"
        },
        {
          title:"所获人数",
          key:"person",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "green"
                  },
                  on: {
                    click: () => {
                      this.modal3=true
                    }
                  }
                },
                "30"
              )
            ]);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "green"
                  },
                  on: {
                    click: () => {
                      this.modal2=true
                    }
                  }
                },
                "修改"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "red"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "删除"
              )
            ]);
          }
        }
    ],
    columns1:[
        {
          title: "姓名",
          key: "name",
          render: (h, params) => {
            return h("div", "张三");
          }
        },
        {
          title: "账号",
          key: "id",
            render: (h, params) => {
            return h("div", "12345678");
          }
        },
        {
          title: "用户类型",
          key: "userclass",
          render: (h, params) => {
            return h("div", "志愿者");
          }
        },
        {
          title: "获取时间",
          key: "gettime",
            render: (h, params) => {
            return h("div", "2019-06-11");
          }
        },
    ],
      data: [

      ],
      data1: []
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
