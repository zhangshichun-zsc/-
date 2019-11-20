<!--活动参与列表(会员)-->
<template>
  <div class="list">
    <Navigation :labels="navigation1"></Navigation>
    <div class="all">
      <span
        v-for="(item,index) in list"
        :key="index"
        :class="{active:num==index}"
        @click="onall(index)"
      >
        <a>{{item}}</a>
      </span>
    </div>
    <div class="flex-center-between integral-top">
      <div>
        <Icon type="ios-search-outline" />
        <span>筛选查询</span>
      </div>
      <div class="flex-center-end">
        <Button @click="query">查询结果</Button>
      </div>
    </div>
    <div class="name">
      <span>活动名称:</span>
      <i-input :value.sync="value" placeholder="活动名称" style="width: 180px" v-model="activityName"></i-input>
      <span>姓名:</span>
      <i-input :value.sync="value" placeholder="姓名" style="width: 180px" v-model="userName"></i-input>
      <span>手机号:</span>
      <i-input :value.sync="value" placeholder="手机号" style="width: 180px" v-model="userTel"></i-input>
      <span>受益方:</span>
      <Select v-model="types" style="width:200px">
        <Option v-for="item in users" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status"></Checkbox>全选
          </Button>
          <Button class="table-btn" @click="exportData">导出</Button>
          <Dropdown style="margin-left: 10px">
            <Button>
              群发消息
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem>微信消息</DropdownItem>
              <DropdownItem>短信</DropdownItem>
              <DropdownItem>站内信</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>
          <Button class="table-btn" @click="add">添加活动</Button>
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
</template>

<script>
import { date1 } from "@/request/datatime";
import { activeAddManager } from "@/request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "活动参与列表(会员)"
      },
      users: [],
      types: "quanbu",
      value: "",
      list: ["全部", "待审核", "报名成功", "已参加", "已违约", "已取消"],
      num: 0,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "userName",
          align: "center"
        },
        {
          title: "活动名称",
          key: "activityName",
          align: "center"
        },
        {
          title: "项目名称",
          key: "categoryName",
          align: "center"
        },
        {
          title: "活动时间",
          key: "startTimestamp",
          render: (h, params) => {
            return h("div", date1("Y-m-d", params.row.startTimestamp));
          }
        },
        {
          title: "活动类型",
          key: "activityType",
          align: "center"
        },
        {
          title: "用户类型",
          key: "userType",
          align: "center"
        },
        {
          title: "手机号码",
          key: "tel",
          align: "center"
        },
        {
          title: "预约状态",
          key: "signUpStatusText",
          align: "center"
        },
        {
          title: "报名时间",
          key: "signUpTimestamp",
          render: (h, params) => {
            return h("div", date1("Y-m-d", params.row.signUpTimestamp));
          }
        },
        {
          title: "匹配规则",
          key: "rule",
          align: "center"
        }
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
      datax: [],
      sysType: 1,
      page: 1,
      size: 10,
      pageSize: 10,
      dataCount: 0,
      userTel: "",
      userType: "",
      userName: "",
      activityName: "",
      signUpStatus: "",
      status: false
    };
  },

  components: {},

  computed: {},

  created() {},
  mounted() {
    this.getactiveAddManager();
  },
   //事件监听
  watch: {
    size: "getactiveAddManager",
    sort: "getactiveAddManager"
  },

  methods: {
    add() {
      this.$router.push({ name: "approval" });
    },
    onall(index) {
      this.num = index;
    },


    //参与列表接口
    getactiveAddManager() {
      activeAddManager({
        page: { page: this.page, size: this.size,sort: "createAt" + " " + this.sort},
        activityName: this.activityName,
        sysType: this.sysType,
        signUpStatus: this.signUpStatus,
        userName: this.userName,
        userTel: this.userTel,
        userType: this.userType
      }).then(res => {
        this.$refs.selection.selectAll(false);
        if (res.code == 200) {

          this.dataCount = res.data.totalSize;
          this.datax = res.data.list;
        }
        console.log(res);
      });
    },

    //查询结果
    query(){
      this.getactiveAddManager()
    },

    //导出数据
    exportData() {
      if(this.arr.length==0){
        this.arr=this.data
      }
      this.$refs.selection.exportCsv({
        filename: this.navigation1.head,
        columns: this.columns.filter((col, index) => index > 0),
        data: this.arrs
      });
    },

    //分页功能
    changepages(index) {
      this.page = index;
      this.getactiveAddManager();
    },
    //选择内容
    handleSelectionChange(val) {
      console.log(val);
      this.arr = val;
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true;
      } else {
        this.status = false;
      }
    },

    //全选按钮
    chackall() {
      this.status = !this.status;
      this.$refs.selection.selectAll(this.status);
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  .all {
    height: 40px;
    padding-left: 20px;
    background: #ffffff;
    line-height: 40px;
    border: 1px solid #e4e4e4;
    margin-top: 20px;
    span {
      margin: 0 20px;
      a {
        color: black;
      }
    }
  }
  .integral-top {
    height: 50px;
    border: 1px solid #e4e4e4;
  }
  .name {
    height: 60px;
    display: flex;
    align-items: center;
    background: #ffffff;
    span {
      margin-left: 35px;
      margin-right: 10px;
      font-size: 14px;
    }
  }
}
.active {
  a {
    color: green !important;
  }
}
.integral-table {
  .table-header {
    height: 50px;
    .table-btn {
      margin: 0 10px;
    }
  }
}
</style>
