<!-- 协议列表(会员)-->
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
          <span>甲乙方：</span>
          <Input size="large" placeholder="甲乙方" class="inpt" />
        </div>
        <div class="flex-center-start">
          <span>协议分类</span>
          <Input size="large" placeholder="全部" class="inpt" />
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
          <Button size="small" @click="newagree">新建协议</Button>
          <Button size="small" @click="newclass">分类管理</Button>
          <Select size="small" class="inpt" placeholder="显示条数"></Select>
          <Select size="small" class="inpt" placeholder="排序方式"></Select>
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
        head: "协议列表(会员)",
       },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "甲方",
          key: "jia",
           align:'center',
          render: (h, params) => {
            return h("div", "融融");
          }
        },
        {
          title: "乙方",
          key: "yi",
           align:'center',
        },
        {
          title: "协议分类",
          key: "class",
           align:'center',
        },
        {
          title: "所属项目",
          key: "end",
           align:'center',
           render: (h, params) => {
            return h("div", "快乐活动营");
          }
        },
        {
          title: "协议时间",
          key: "end",
           align:'center',
           render: (h, params) => {
            return h("div", "2019-4-10");
          }
        },
        {
          title: "相关",
          key: "end",
          width:'100px',
          align:'center',
           render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "red"
                  },
                  on: {
                    click: () => {
                    //   this.$router.push({ name: 'vp_edquestion' })
                    }
                  }
                },
                "附件"
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
                    color: "#097276"
                  },
                  on: {
                    click: () => {
                    //   this.$router.push({ name: 'vp_edquestion' })
                    }
                  }
                },
                "上传附件"
              ),
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276",
                    padding:'5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({ name: 'agreedetail' })
                    }
                  }
                },
                "详情"
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
        {
            yi:"志愿者机构负责人",
            class:"立项"
        },
        {
            yi:"捐赠方",
            class:"捐赠"
        },
      ]
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {
    newagree(){
      this.$router.push({ name: 'newagree' })
    },
    newclass(){
      this.$router.push({ name: 'agreeclass' })
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
</style>
