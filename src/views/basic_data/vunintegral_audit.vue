<!-- 积分审核(志愿者) -->
<template>
  <div class="audit">
    <Tophead :navigation1="navigation1" :top="top" @query="query"></Tophead>
    <div class="audit-list">
      <div class="table-header">
        <div class="flex-center-end">
          <Button class="table-btn" @click="batch">批量审批</Button>
          <Button class="table-btn" @click="exportData" disabled>
            导出数据
            <Icon type="md-arrow-dropdown" />
          </Button>
          <Select v-model="size" style="width:100px;margin:0 10px" placeholder="显示条数" class="space">
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="排序方式" class="space" style="width: 100px;" v-model="sort">
            <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <Modal v-model="modal1" @on-ok="ok"
        @on-cancel="cancel" class-name="vertical-center-modal">
          <div class="approval">
            <h3>是否确认审批？</h3>
          </div>
        </Modal>
      </div>

      <Table
        ref="selection"
        border
        :columns="columns"
        :data="data"
        @on-selection-change="handleSelectionChange"
      ></Table>
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
import { tablepage } from "@/request/mixin";
import { date1 } from "../../request/datatime";
import { integralExa, Integralaudit } from "../../request/api";
export default {
  data() {
    return {
      modal1: false,
      navigation1: {
        head: "积分审核(志愿者)"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户账号",
          key: "userAccount",
          align: "center",
          width:200,
        },
        {
          title: "用户昵称",
          key: "nickname",
          width:300,
          align: "center"
        },
        {
          title: "用户类型",
          key: "userType",
          width:200,
          align: "center"
        },
        {
          title: "修改人",
          key: "modifyName",
          width:300,
          align: "center"
        },
        {
          title: "修改时间",
          key: "modifyTime",
          width:300,
          align: "center",
          render: (h, params) => {
            return h("div", date1("Y-m-dH:i:s", params.row.modifyTime));
          }
        },
        {
          title: "原积分",
          key: "sourceScore",
          width:200,
          align: "center"
        },
        {
          title: "现积分",
          key: "currScore",
          width:200,
          align: "center"
        },
        {
          title: "积分调整值",
          key: "addScore",
          width:200,
          align: "center"
        },
        {
          title: "状态",
          key: "auditStatusTtext",
          width:200,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width:200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  clssName: "action",
                  style: {
                    color: params.row.auditStatusTtext=='待审核'?"green":'gray'
                  },
                  on: {
                    click: () => {
                      if(params.row.auditStatusTtext=='待审核'){
                        this.refuse(params.row.scoreHisId,1)
                      }
                    }
                  }
                },
                "通过"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: params.row.auditStatusTtext=='待审核'?"green":'gray'
                  },
                  on: {
                    click: () => {
                      if(params.row.auditStatusTtext=='待审核'){
                        this.refuse(params.row.scoreHisId,2)
                      }
                    }
                  }
                },
                "拒绝"
              )
            ]);
          }
        }
      ],
      data: [],
      sysType: 2,
      userAccount: "",
      modifyName: "",
      page: 1,
      size: 10,

      dataCount: 0,
      operationUserId:13,
      auditStatus:'',
       top: [
        { name: "用户账号", type: "input", value: "" },
        { name: "修改人", type: "input", value: "" }
      ],
      Article: [
        { value: 10, label: 10 },
        { value: 15, label: 15 },
        { value: 20, label: 20 }
      ],
      sorting: [
        { value: "asc", label: "正序" },
        { value: "desc", label: "倒序" }
      ],
      sort: "asc",
      arr:''
    };
  },

  components: {},

  computed: {},
  mixins: [tablepage],
  created() {},
  mounted() {
    this.getintegralExa();
  },
    //事件监听
  watch: {
    size: "getintegralExa",
    sort: "getintegralExa"
  },
  methods: {
    // 积分审核分页
    getintegralExa() {
      integralExa({
        page: { page: this.page, size: this.size,sort: `createAt ${this.sort}` },
        sysType: this.sysType,
        userAccount: this.userAccount,
        modifyName: this.modifyName
      }).then(res => {
        if (res.code == 200) {
          this.data = res.data.list;
          this.dataCount = res.data.totalSize;
        }
        console.log(res);
      });
    },

    //积分管理--审核积分
    getIntegralaudit() {
      // let
      Integralaudit({
        scoreHisIds: this.arr,
        sysType: this.sysType,
        // auditStatus: this.auditStatus,
        // operationUserId: this.operationUserId
      }).then(res => {
        if(res.code==200){
          this.$refs.selection.selectAll(false);
           this.$Message.info("操作成功");
           this.getintegralExa()
        }else{
          this.$Message.info("网络错误");
        }
        console.log(res);
      });
    },
    cancel(){


    },
    batch(){
      if(this.arr==''){
        this.$Message.error("请先选择")
      }else{
        this.modal1=true
      }
    },
    ok(){
      this.auditStatus=1
      this.getIntegralaudit()
    },

    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getintegralExa();
    },
    //选择内容
    handleSelectionChange(val) {
      this.arr = val.map(item => {
        return item.scoreHisId;
      }).toString();
        console.log(this.arr)

    },
    //拒绝和通过
    refuse(id,e){
      this.arr=id
      this.auditStatus=e
      this.getIntegralaudit()
    },

    // 搜索
    query(e) {
      this.userAccount=e[0].value
      this.modifyName=e[1].value
      this.getintegralExa();
    }
  }
};
</script>
<style lang="scss">

.integral-header .integral-top {
  padding: 15px 20px;
  background: white;
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

.table-header {
  padding: 10px 20px;
  background: white;
}
.table-header .table-btn {
  margin-left: 15px;
}
.pages {
  padding: 20px;
  background: #fff;
}
.approval {
  text-align: center;
}
.ivu-modal-footer {
  text-align: center;
}
</style>
