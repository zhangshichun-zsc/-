<!-- 物流公司（共用） -->
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
          <span>快递名称</span>
          <Input size="large" placeholder="活动名称" class="inpt" />
        </div>
        <div class="flex-center-start">
          <span>启用状态</span>
          <Select class="inpt" size="large" placeholder="全部">
            <Option v-for="item in enabledstate" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header">
        <div class="data-ios flex-center-between">
          <div class="flex-center-start">
            <Icon type="ios-apps" />
            <span>数据列表</span>
          </div>
          <div class="flex-center-end">
            <Button size="small" @click="modal1 = true">添加</Button>
            <Select size='small' class="inpt" placeholder="显示条数"></Select>
            <Select size='small' class="inpt" placeholder="排序方式"></Select>
          </div>
        </div>
        <div>
          <Modal v-model="modal1" title="添加物流公司" @on-ok="ok" @on-cancel="cancel">
             <Form :model="formItem" :rules="ruleValidate" :label-width="120">
                  <FormItem label="公司名称" prop="input">
                      <Input v-model="formItem.input"></Input>
                  </FormItem>
                 <FormItem label="配送描述" prop="textarea">
                       <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入内容..."></Input>
                </FormItem>
             </Form>
          </Modal>
        </div>
      </div>
      <Table border :columns="columns" :data="data"></Table>
      <div class="pages flex-center-between">
        <div class="batch">
          <Checkbox>全选</Checkbox>
          <Select placeholder="批量操作" style="width: 150px">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px">确定</Button>
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
       formItem:{
         input: '',
         textarea: ''
       },
       navigation1: {
        head: "物流公司（共用）"
      },
      modal1: false,
      enabledstate:[
        {
          value: 'enable',
          label: '启用'
        },{
          value: 'stop',
          label: '停用'
        }
      ],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "编号",
          align:"center",
          width:"70",
          key: "id"
        },
        {
          title: "公司名称",
          key: "company",
          align:"center",
          width:"100",
           render: (h, params) => {
            return h("div", '中通快递');
          }
        },
        {
          title: "配送描述",
          key: "delivery",
          align: "center",
           width:"300",
           render: (h, params) => {
            return h("div", '首重为5元/KG，续重为5元/KG。');
          }
        },
        {
          title: "添加时间",
          key: "addtime",
          align: "center",
          width:"260",
           render: (h, params) => {
            return h("div", '2019-08-05 15:47:44');
          }
        },
        {
          title: "是否启用",
          key: "status",
          algin: "center",
          width:"90",
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
                      this.modal1=true
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276",
                    margin:"5px"
                  }
                },
                "设置打印模板"
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
      ruleValidate:{
        input:[
          { required: true,message: '公司名称不能为空',trigger: 'blur' }
        ],
        textarea:[
          { required: true,message: '描述内容不能为空',trigger: 'blur' }
        ]
      },
      data: [],
      batchList:[
        {
          value: 'enable',
          label: '设为启用'
        },
        {
          value: 'stop',
          label: '设为停用'
        },
        {
          value: 'delete',
          label: '删除'
        }
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
.pages{
  margin-top: 0.5rem;
}
.ipt {
  margin-left: 10px;
}
.sdate {
  margin-left: 15px;
}
.batch{
  margin-left: 25px;
}
</style>
