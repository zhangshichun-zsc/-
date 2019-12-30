<!-- 积分审核(会员) -->
<template>
  <div class="audit">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start name">
          <span>用户账号:</span>
          <Input size="large" placeholder="用户ID/账号" class="inpt" v-model.trim="userAccount" />
        </div>
        <div class="flex-center-start name">
          <span>修改人:</span>
          <Input size="large" placeholder="修改人昵称" class="inpt" v-model.trim="modifyName" />
        </div>

        <Button class="search" @click="query">查询</Button>
      </div>
    </div>
    <!-- <Tophead :navigation1="navigation1" :top="top" @query="query"></Tophead> -->
    <div class="audit-list">
      <div class="table-header flex-center-end">
        <div class="flex-center-end">
          <Button class="table-btns" @click="batch">批量审批</Button>
          <Button class="table-btn" disabled>
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
         <Modal v-model="modal1" title="审批确定" class-name="vertical-center-modal">
          <div class="approval">
            <h3 style="font-size:16px;text-align: center;">是否确认审批？</h3>
          </div>
           <div slot="footer">
              <Button type="text" size="large" @click="cancel">取消</Button>
              <Button type="error" size="large" @click="ok">确定</Button>
            </div>
        </Modal>
      </div>
      <div class="min-height">
        <Table
          ref="selection"
          border
          :columns="columns"
          :data="data"
          @on-selection-change="handleSelectionChange"
        ></Table>
      </div>

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
import { formatDate } from "../../request/datatime";
import { integralExa, Integralaudit } from "../../request/api";
export default {
  data() {
    return {
      modal1: false,
      navigation1: {
        head: "积分审核(会员)"
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
          width: 200
        },
        {
          title: "用户昵称",
          key: "nickName",
          width: 300,
          align: "center"
        },
        {
          title: "用户类型",
          key: "userType",
          width: 200,
          align: "center"
        },
        {
          title: "修改人",
          key: "modifyName",
          width: 300,
          align: "center"
        },
        {
          title: "修改时间",
          key: "modifyTime",
          width: 300,
          align: "center"
        },
        {
          title: "原积分",
          key: "sourceScore",
          width: 200,
          align: "center"
        },
        {
          title: "现积分",
          key: "currScore",
          align: "center",
          width: 200
        },
        {
          title: "积分调整值",
          key: "addScore",
          width: 200,
          align: "center"
        },
        {
          title: "状态",
          key: "auditStatus",
          align: "center",
          width: 200,
          render: (h, params) => {
            let statess = [
              "待审核",
              "审核通过",
              "审核不通过",
              "一级审核通过二级待审核"
            ];

            //  0待审核,1审核通过,2审核不通过,3一级审核通过二级待审核'
            return h("p", statess[params.row.auditStatus]);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  clssName: "action",
                  style: {
                    color:
                      params.row.auditStatus == 0 || params.row.auditStatus == 3
                        ? "red"
                        : "gray"
                  },
                  on: {
                    click: () => {
                      if (
                        params.row.auditStatus == 0 ||
                        params.row.auditStatus == 3
                      ) {
                        this.refuse(params.row.auditId, 1);
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
                    color:
                      params.row.auditStatus == 0 || params.row.auditStatus == 3
                        ? "red"
                        : "gray"
                  },
                  on: {
                    click: () => {
                      if (
                        params.row.auditStatus == 0 ||
                        params.row.auditStatus == 3
                      ) {
                        this.refuse(params.row.auditId, 2);
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
      sysType: 1,
      userAccount: "",
      modifyName: "",
      page: 1,
      size: 10,

      dataCount: 0,

      auditStatus: "",

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
      arr: "",
      arrs: [],
      select:[],
    };
  },

  components: {},

  computed: {},

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
        page: {
          page: this.page,
          size: this.size,
          sort: `createAt ${this.sort}`
        },
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
    getIntegralaudit(e) {
      Integralaudit({
        auditIds: this.arr,
        sysType: this.sysType,
        auditStatus: this.auditStatus,
        operationUserId: this.$store.state.userId
      }).then(res => {
        if (res.code == 200) {
          if(e==2){
            this.modal1=false
          }
          this.$Message.info("操作成功");
          this.getintegralExa();
        } else {
          this.$Message.info(res.msg);
        }
        console.log(res);
      });
    },
     //批量修改
     batch(){

      if(this.select.length==0){
        this.$Message.error("请先选择")
      }else if(this.arrs==''){
       this.$Message.error("暂无权限审批")
       }else{
        this.modal1=true
      }
    },

    cancel() {
      this.modal1 = false;
    },
    ok() {
      this.arr = this.arrs;
      this.auditStatus = 1;
      this.getIntegralaudit(2);
    },

    //分页功能
    changepages(index) {
      this.page = index;
      this.getintegralExa();
    },

    //选择内容
    handleSelectionChange(val) {
      this.select=val
      let a = val.filter(
        item => item.auditStatus == 0
      );
      this.arrs=a.map(item=>{
        return item.auditId
      }).toString()
    },
    //拒绝和通过
    refuse(id, e) {
      this.arr = id;
      this.auditStatus = e;
      this.getIntegralaudit();
    },

    // 搜索
    query() {
      this.page = 1;
      this.getintegralExa();
    }
  }
};
</script>
<style lang="scss" scoped>
.integral-body {
  margin-bottom: 20px;
  padding-left: 20px;
  border-radius: 10px;
  display: flex;
  height: 90px;
  background: #ffffff;
  border: 0;
}
.name {
  span {
    display: block;
    min-width: 70px;
  }
  .inpt {
    margin-right: 30px;
  }
}
</style>
