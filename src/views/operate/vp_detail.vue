<!-- 邀请好友明细(会员) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
    </div>
    <Table border :columns="columns1" :data="data1"></Table>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div class="flex-center-end">
         <Select v-model="size" style="width:100px;margin-right:10px" placeholder="显示条数" class="space">
              <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select placeholder="排序方式" class="space" style="width: 100px;" v-model="sort">
              <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
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
import { InvitationDetailed, BiInvitationList } from "../../request/api";
import {formatDate} from '../../request/datatime'

export default {
  data() {
    return {
      navigation1: {
        head: "邀请好友明细(会员)"
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
          // key: "registerTimestamp",shijian
          align: "center",
          render: (h, params) => {
            return h("div",formatDate(params.row.registerTimestamp) );
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
      data: [],
      data1: [],
       page:1,
      size:10,

      dataCount:0,
       arr:[],
      sysType:1,
    };
  },
  //事件监听
  watch: {
    size: "getBiInvitationList",
    sort: "getBiInvitationList"
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
        memberId: this.$route.query.memberId,
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
        page: { page: this.page, size: this.size,sort: "createAt" + " " + this.sort},
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
.integral-header .integral-top {
  padding: 15px 10px;
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
  border-radius:  10px 10px 0 0;
}
.table-header .table-btn {
  margin-right: 15px;
}

.integral-table{
  margin-top: 10px;
  padding: 0 10px;
}
.integral-table .pages {
  padding: 20px;
  background: #fff;
  border-radius: 0 0 10px 10px;
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
