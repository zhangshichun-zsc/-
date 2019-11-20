<!-- 协议分类管理(会员) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div class="flex-center-start">
          <Icon type="md-list" />
          <span>数据列表</span>
        </div>
        <div class="flex-center-end">
          <Button class="table-btn" @click="modal1 = true">添加</Button>
        </div>  
          <Modal v-model="modal1" title="添加分类" @on-ok="ok" @on-cancel="cancel">
             <Form :model="formItem"  :rules="ruleValidate" :label-width="120">
               <FormItem label="类型名称" prop="TypeName">
                   <Input v-model="formItem.input" ></Input>
               </FormItem>
               <FormItem label="分类图标" prop="ClassificationIcon">
                    <Upload action="//jsonplaceholder.typicode.com/posts/">
                         <Button icon="ios-cloud-upload-outline">选择上传文件</Button>
                    </Upload>
                    <p style="color: #666666;font-size: 14px">只能上传jpg/png格式文件，文件不能超过50kb</p>
               </FormItem>
               <FormItem label="是否显示">
                   <i-switch v-model="switch1" /></i-switch>
               </FormItem>
            </Form>
          </Modal>
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
         switch1: true,
         navigation1: {
        head: "协议分类管理(会员)"
      },
       formItem: {
                    input: '',
                    switch: true,
                },
      ruleValidate:{
        TypeName:[
          { required: true, trigger: 'blur'}
        ],
        ClassificationIcon:[
          { required: true, trigger: 'blur'}
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
          title: "协议名称",
          key: "agreename"
        },
        {
          title: "是否显示",
          key: "status",
          algin: "center",
          render: (h, params) => {
            return h("div", [h("i-switch")]);
          }
        },
        {
          title: "排序",
          key: "asc"
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
        {
          agreename: "项目立项",
        },
        {
          agreename: "捐赠",
         
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
</style>
