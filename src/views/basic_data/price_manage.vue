<!-- 基金管理(会员)-->
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
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>名称</span>
          <Input size="large" placeholder="基金名称" class="inpt" />
        </div>
        <div class="flex-center-start">
          <span>有效状态</span>
          <Input size="large" placeholder="全部" class="inpt" />
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
        <div>
          全选
          <span>已选择0</span>
          <Button class="table-btn">批量删除</Button>
          <Button class="table-btn" @click="modal1 = true">新增</Button>
          <Modal v-model="modal1" title="新增基金" @on-ok="ok" @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                 <FormItem label="基金名称" prop="name">
                   <Input v-model="formValidate.name" placeholder="请输入基金名称"></Input>
                  </FormItem>
                   <FormItem label="联系人员" prop="linker">
                     <Input v-model="formValidate.link"></Input>
                  </FormItem>
                   <FormItem label="联系方式" >
                     <Input></Input>
                  </FormItem>
              </Form>
          </Modal>
          <Modal v-model="modal2" title="修改基金" @on-ok="ok" @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                 <FormItem label="基金名称" prop="name">
                   <Input v-model="formValidate.name" placeholder="请输入基金名称"></Input>
                  </FormItem>
                   <FormItem label="联系人员" prop="linker">
                     <Input v-model="formValidate.link"></Input>
                  </FormItem>
                   <FormItem label="联系方式" >
                     <Input></Input>
                  </FormItem>
              </Form>
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
        head: "基金管理(会员)"
      },
      modal1: false,
      modal2: false,
        formItem: {
        input: '',
                },
       formValidate:{
          name:"",
          linker:""
       },
       ruleValidate:{
          name: [
          { required: true, message: '基金名称不能为空', trigger: 'blur' }
                ],
          linker: [
          { required: true, message: '联系人员不能为空', trigger: 'blur' }
                ]
       },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "基金名称",
          key: "pricename"
        },
        {
          title: "联系人",
          key: "linker"
        },
        {
          title: "联系电话",
          key: "phone",
          render: (h, params) => {
            return h("div", "13111111111");
          }
        },
        {
          title: "创建时间",
          key: "createtime",
          render: (h, params) => {
            return h("div", "2019-6-28 15:00");
          }
        },
        {
          title: "有效状态",
          key: "status",
          algin: "center",
          render: (h, params) => {
            return h("div", [h("i-switch")]);
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
                    color: "#097276"
                  },
                  on: {
                    click: () => {
                      this.modal2=true
                      // this.$router.push({ name: 'integral_detail' })
                    }
                  }
                },
                "编辑"
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
      data: [
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
</style>
