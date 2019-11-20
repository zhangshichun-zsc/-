<!-- 邀请好友明细(会员) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
    </div>
    <Table border :columns="columns1" :data="data1"></Table>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div class="flex-center-start">
          <Icon type="md-list" />
          <span>数据列表</span>
        </div>
        <div class="flex-center-end">
          <Select size="small" class="inpt" placeholder="显示条数" style="margin-right: 0.5rem;"></Select>
          <Select size="small" class="inpt" placeholder="排序方式"></Select>
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
          :page-size="pageSize"
          @on-change="changepages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { InvitationDetailed, BiInvitationList } from "../../request/api";
import {date1} from '../../request/datatime'

export default {
  data() {
    return {
      navigation1: {
        head: "邀请好友明细(志愿者)"
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
           align: "center"
        },
        {
          title: "用户昵称",
          key: "nickname",
           align: "center"
        },
        {
          title: "注册时间",
          // key: "registerTimestamp",
          render: (h, params) => {
            return h("div",date1('Y-m-dH:s:i',params.row.registerTimestamp) );
          }
        },
        {
          title: "是否参与活动",
          key: "isJoinActivity",
           align: "center"
        }
      ],
      columns1: [
        {
          title: "用户账号",
          key: "userAccount",
          align: "center"

        },
        {
          title: "用户昵称",
          key: "nickname",
         align: "center"
        },
        {
          title: "用户分类",
          key: "userTypeText",
         align: "center"
        },
        {
          title: "邀请好友",
          key: "inviteUserNum",
          align: "center"
        },
        {
          title: "成功参与活动好友",
          key: "actJoinedNum",
          width:"160px",
          align: "center"
        },
        {
          title: "成功邀请团队注册",
          key: "inviteOrgNum",
          width:"160px",
          align: "center"
        },
        {
          title: "积分奖励",
          key: "sumScore",
          align: "center"
        }
      ],
      data: [],
      data1: [],
       page:1,
      size:10,
      pageSize: 10,
      dataCount:0,
       arr:[],
      sysType:1,
      volunteerId:''
    };
  },

  components: {},

  computed: {},

  created() {},
  mounted(){
    this.getInvitationDetailed()
    this.getBiInvitationList()
  },

  methods: {
    history() {
      this.$router.go(-1);
    },
    // 邀请好友分页
    getInvitationDetailed() {
      InvitationDetailed({
        sysType: this.sysType,
        volunteerId: this.$route.query.volunteerId,
      }).then(res => {
        if(res.code==200){
          this.data1=res.data
        }
        console.log(res);
      });
    },
    // 获取被邀请人分页
    getBiInvitationList() {
      BiInvitationList({
        page: { page: this.page, size: this.size },
        inviteUserAccountId:this.$route.query.inviteUserAccountId,
      }).then(res => {
        if(res.code==200){
          this.page = res.data.pageNum;
          this.dataCount = res.data.totalSize;
          this.data = res.data.list
        }
        console.log(res);
      });
    },
      //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getBiInvitationList()
    },

     //选择内容
    handleSelectionChange(val){
      console.log(val)
      this.arr=val
    },
  }
};
</script>
<style lang="scss">
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  padding: 15px 10px;
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
  margin-right: 15px;
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
