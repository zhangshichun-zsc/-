<!-- 证书管理(志愿者) -->
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
          <span>所属系统</span>
          <Select size='large' class="inpt" placeholder="全部">
          </Select>
        </div>
        <div class="flex-center-start">
          <span>组织</span>
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
        <div class="flex-center-end">
          <Button @click="modal1 = true">新增模板</Button>
           <Modal v-model="modal1" title="新增证书模板">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                 <FormItem label="组织" prop="organ">
                     <Select v-model="formValidate.organ"></Select>
                 </FormItem>
                 <FormItem label="模板名称" prop="mname">
                     <Input v-model="formValidate.mname"></Input>
                 </FormItem>
                 <FormItem label="有效日期" prop="effect">
                     <Input v-model="formValidate.effect"></Input>
                 </FormItem>
              </Form>
          </Modal>
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
        head: "证书管理(志愿者)"
      },
       formValidate:{
        organ:'',
        mname:'',
        effect:''
       },
      ruleValidate:{
        organ: [
            { required: true, message: '组织不能为空', trigger: 'blur' }
            ],
        mname: [
            { required: true, message: '模板名称不能为空', trigger: 'blur' }
            ],
        effect: [
            { required: true, message: '有效日期不能为空', trigger: 'blur' }
            ],
      },
      modal1: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "组织",
          key: "organ"
        },
        {
          title: "证书名称",
          key: "cenficname"
        },
        {
          title: "有效期限",
          key: "validtime"
        },
        {
          title:"创建时间",
          key:"createtime"
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
                      this.$router.push({ name: 'cenfic_prend' })
                    }
                  }
                },
                "预览"
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
</style>
