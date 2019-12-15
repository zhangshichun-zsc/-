<!--活动立项审批(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="flex-center-start integral-body">
      <div class="flex-center-start list">
        <span>活动名称:</span>
        <Input size="small" placeholder="活动名称" class="inpt" v-model="batchName" />
      </div>
      <div class="flex-center-start list">
        <span class="span">审核状态:</span>
        <Select v-model="statu" style="width:200px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="flex-center-start" style="margin-right:20px;">
        <span>提交日期:</span>
        <row class="flex-data inpt">
          <i-col>
            <Date-picker
             type="date"
              placeholder="选择日期"
              style="width: 200px"
              v-model="creataTimeTimeStampFrom"
            ></Date-picker>
          </i-col>
          <i-col style="padding-top:7px;">——</i-col>
          <i-col>
            <Date-picker
             type="date"
              placeholder="选择日期"
              style="width: 200px"
              v-model="creataTimeTimeStampTo"
            ></Date-picker>
          </i-col>
        </row>
      </div>
      <div class="flex-center-end">
        <Button @click="approval" style="margin-right:10px">新建立项</Button>
        <Button @click="query">查询结果</Button>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between" style="display:flex;background-color:#fff;">
        <div>
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status">全选</Checkbox>
          </Button>
          <Button class="table-btn" @click="operation(2)">通过</Button>
          <Button class="table-btn" @click="operation(3)">拒绝</Button>
        </div>
        <div>
          <Button class="table-btn">导出</Button>
            <Select v-model="size" style="width:120px" placeholder="显示条数">
              <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select placeholder="排序方式" style="width: 120px;" v-model="sort">
              <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
      </div>
      <Table
        ref="selection"
        border
        :columns="columns"
        :data="datax"
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
import {date1} from '@/request/datatime.js'
import { pendingApp, approvalpage } from "@/request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "活动立项审批(会员)"
      },
      cityList: [
        {
          value: "1",
          label: "待审核"
        },
        {
          value: "3",
          label: "已拒绝"
        },
        {
          value: "2",
          label: "已审核"
        }
      ],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "立项名称",
          key: "batchName",
          align: "center"
        },
        {
          title: "项目名称",
          key: "categoryName",
          align: "center"
        },
        {
          title: "总预算",
          key: "budge",
          align: "center"
        },
        {
          title: "创建人",
          key: "createUserName",
          align: "center"
        },
        {
          title: "身份",
          key: "roleName",
          align: "center"
        },
        {
          title: "提交时间",
          key: "submitTimestamp",
          align: "center",
          render:(h,params)=>{
              return h("div",date1('Y-m-dH:i:s',params.row.submitTimestamp))
          }
        },
        {
          title: "状态",
          key: "statusText",
          align: "center",
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  clssName: "action",
                  style: {
                    color: "green"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "approval_details",
                        query: { batchId: params.row.batchId,auditId:params.row.auditId,statusText:params.row.statusText }
                      });
                    }
                  }
                },
                "详情"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "green"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "approval",
                        query: { batchId: params.row.batchId,copy:1 }
                      });
                    }
                  }
                },
                "复制"
              )
            ]);
          }
        }
      ],
      datax: [],
      page: 1, //每页显示多少数据
      size: 10, //数据条数
      dataCount: 0,
      pageSize: 10,
      batchName: "",
      status:false,
      statu:"",
      creataTimeTimeStampFrom: "",
      creataTimeTimeStampTo: "",
      datastat: "",
      dataend: "",
      arr: [],
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
    };
  },
   //事件监听
  watch: {
    size: "getapprovalpage",
    sort: "getapprovalpage"
  },

  components: {},

  computed: {},

  created() {
    this.getapprovalpage();
  },

  methods: {
    // 活动立项审批--批量审批
    getpendingApp(e) {
      pendingApp({
        batchIds: this.arr,
        status: e
      }).then(res => {
        if(res.code==200){
          this.$Message.info("操作成功");
        }
        console.log(res);
      });
    },
    // 活动立项审批--活动立项审批分页
    getapprovalpage() {
      if(this.creataTimeTimeStampFrom!=''){
        this.datastat = this.creataTimeTimeStampFrom.getTime()
        this.dataend = this.creataTimeTimeStampTo.getTime()
      }else{
        this.dataend=''
        this.dataend=''
      }
      approvalpage({
        page: { page: this.page, size: this.size,sort: "createAt" + " " + this.sort },
        batchName: this.batchName,
        status: this.statu,
        creataTimeTimeStampFrom: this.datastat,
        creataTimeTimeStampTo: this.dataend
      }).then(res => {
        if(res.code==200){
          this.datax = res.data.list;
          this.page = res.data.pageNum;
          this.dataCount = res.data.totalSize;
        }
        console.log(res);
      });
    },

    //全选按钮
    chackall() {
      this.status = !this.status;
      console.log(this.status);
      this.$refs.selection.selectAll(this.status);
    },

    // 查询结果按钮
    query() {
      this.getapprovalpage();
    },
    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getapprovalpage();
    },

    //每条数据单选框的状态
    handleSelectionChange(val) {
      this.arr = val;
      console.log(this.arr);
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true;
      } else {
        this.status = false;
      }
      //选择的数据id
        this.arr = val.map(item => {
          return item.batchId;
        }).toString();
    },

    //操作
    operation(e){
      this.getpendingApp(e)
    },

    approval() {
      this.$router.push({ name: "approval" });
    },

    mounted() {
      this.getapprovalpage();
    }
  }
};
</script>
<style lang="scss" scoped>
.integral-top {
  border: 1px solid #e4e4e4;
  height: 50px;
  margin-top: 20px;
  button {
    margin-right: 10px;
  }
}

.flex-center-start {
  font-size: 14px;
  height: 60px;
  padding-left: 5px;
  background: #ffffff;
  .list {
    margin-right: 20px;
    span {
      display: inline-block;
      width: 100px;
      margin-right: 10px;
    }
    .span {
      width: 70px;
    }
  }
}
.ivu-row {
  display: flex;
}
.table-header {
  height: 50px;
  .table-btn {
    margin: 0 10px;
  }
}

// .ivu-table-wrapper {
//   height: 500px;
// }
.pages {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e4e4e4;
}
</style>
