<!-- 项目管理(会员) -->
<template>
  <div class="integral">

    <div class="integral-header">
      <basicdata :navigation1="navigation1" @query="query"></basicdata>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          全选
          <span>已选择{{arr.length}}</span>
          <Button class="table-btn">批量删除</Button>
          <Button class="table-btn" type="primary" @click="modal1 = true">新增项目</Button>
          <Modal v-model="modal1" title="新增项目" @on-ok="ok" @on-cancel="cancel" class="mol">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <FormItem label="项目名称" prop="name">
                <Input v-model="formValidate.name"></Input>
              </FormItem>
              <FormItem label="总计预算" prop="budget">
                <Input v-model="formValidate.budget"></Input>
              </FormItem>
              <FormItem label="预算来源" prop="source">
                <Input v-model="formValidate.source"></Input>
              </FormItem>
            </Form>
          </Modal>
          <Modal v-model="modal2" title="新增项目" class="mol">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <FormItem label="项目名称" prop="name">
                <Input v-model="formValidate.name"></Input>
              </FormItem>
              <FormItem label="总计预算" prop="budget">
                <Input v-model="formValidate.budget"></Input>
              </FormItem>
              <FormItem label="预算来源" prop="source">
                <Input v-model="formValidate.source"></Input>
              </FormItem>
            </Form>
          </Modal>
        </div>
      </div>
        <Table ref="selection" border :columns="columns" :data="data" @on-selection-change="handleSelectionChange"></Table>
      <div class="pages">
        <Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          style="margin: auto"
          :page-size="size"
          @on-change="changepages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import basicdata from "@/components/basicdata";
import { projectmanpage} from '@/request/api'
import {date1,formatDate} from '@/request/datatime'
export default {
  data() {
    return {
      navigation1: {
        head: "项目管理(会员)"
      },
      formValidate: {
        name: "",
        budget: "",
        source: ""
      },
      ruleValidate: {
        name: [
          { required: true, message: "职业名称不能为空", trigger: "blur" }
        ],
        budget: [
          { required: true, message: "总计预算不能为空", trigger: "blur" }
        ],
        source: [
          { required: true, message: "预算来源不能为空", trigger: "blur" }
        ]
      },
      modal1: false,
      modal2: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "项目名称",
          key: "categoryName"
        },
        {
          title: "总预算",
          key: "allBudget",

        },
        {
          title: "预算来源",
          key: "orgName",

        },
        {
          title: "创建时间",
          key: "createTimestamp",
          render: (h, params) => {
            return h("div", formatDate(params.row.createTimestamp));
          }
        },
        {
          title: "有效状态",
          key: "status",
          algin: "center",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.status == 1
                },
                on: {
                  input: e => {
                    console.log(e);
                    // this.getmodifystate(params.row.dicId, e);
                  }
                }
              })
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
                      this.modal2 = true;
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
      data: [],
      page: 1,
      size: 10,
      dataCount: 0,
      arr: [],
      typelist: [
        {
          value: "",
          name: "全部"
        },
        {
          value: "1",
          name: "有效"
        },
        {
          value: "0",
          name: "无效"
        }
      ],
      validFlag: null,
      sysType:1,
      categoryName:null,
      status:null,
      enddata:null
    };
  },

  components: {basicdata },

  computed: {},

  created() {},
  mounted() {
    this.getprojectmanpage()
  },
  methods: {
    //基础资料--获取项目分页
    getprojectmanpage(){
      projectmanpage({
        page:{page:this.page,size:this.size},
        sysType:this.sysType,
        categoryName:this.categoryName,
        status:this.status,
        createTimestamp:this.enddata
      }).then(res=>{
        if(res.code==200){
          this.data = res.data.list
          this.dataCount = res.data.totalSize;
        }else{
          this.$Message.error(res.msg)
        }
        console.log(res)
      })
    },


    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getOffactivities();
    },

    // 查询结果按钮
    query(e) {
       if(e.createTimestamp!=''){
        this.enddata = e.createTimestamp.getTime()
      }
      this.status=e.validFlag
      this.categoryName=e.dicName

      this.getprojectmanpage();
    },

    //每条数据单选框的状态
    handleSelectionChange(val) {
      this.arr = val;
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true;
      } else {
        this.status = false;
      }
      //选择的数据id
      this.arr = this.arr.map(item=>{
        return item.categoryId;
      }).toString()
      console.log(this.arr);
    },

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
.mol div {
  margin: 10px;
}
</style>
