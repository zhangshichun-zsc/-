<!-- 邀请好友查询(会员) -->
<template>
  <div class="integral">
    <Tophead :navigation1=navigation1 :top=top @query="query"></Tophead>

    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div class="flex-center-start">
           <Icon type="md-list" />
          <span>数据列表</span>
        </div>
        <div class="flex-center-end" style="padding:10px;">
                  <Button  @click="exportData">导出数据</Button>
                  <Select v-model="size" style="width:120px;margin-right:10px" placeholder="显示条数" class="space">
              <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select placeholder="排序方式" class="space" style="width: 120px;" v-model="sort">
              <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </div>
      </div>
       <Table ref="selection" border :columns="columns" :data="data" @on-selection-change="handleSelectionChange"></Table>
      <div class="pages">
        <Page
        :current='page'
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
  </div>
</template>

<script>
import {tablepage} from '@/request/mixin'
import {InvitationList} from '@/request/api'
export default {
  data() {
    return {
        navigation1: {
        head: "邀请好友查询(会员)",
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
          title: "用户分类",
          key: "userTypeText",
          width:200,
         align: "center"
        },
        {
          title: "邀请好友",
          key: "inviteUserNum",
          width:120,
          align: "center"
        },
        {
          title: "成功参与活动好友",
          key: "actJoinedNum",
          width:160,
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
          align: "center",
          width:120,
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
                      this.$router.push({ name: 'vp_detail',query:{ memberId:params.row.memberId,inviteUserAccountId:params.row.userAccountId} })
                    }
                  }
                },
                "查看明细"
              )
            ]);
          }
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
      top:[{name:'用户账号',type:'input',value:''},{name:'用户昵称',type:'input',value:''}],
      data: [],
       page:1,
      size:10,

      dataCount:0,
      arrs:[],
      sysType:1,
      info:'',
      nickname:'',
      inviteUserAccountId:1
    };
  },

  mixins:[tablepage],
  components: {},
  //事件监听
  watch: {
    size: "getInvitationList",
    sort: "getInvitationList"
  },
  computed: {},
  mounted(){
    this.getInvitationList()
  },

  created() {
  },

  methods: {
    //查询
    query(e){
      this.page=1
      this.info=e[0].value
      this.nickname=e[1].value
this.getInvitationList()
    },

    // 邀请好友分页
    getInvitationList(){
      InvitationList({
        page:{page: this.page,size: this.size, sort: "createAt" + " " + this.sort},
        sysType:this.sysType,
        info:this.info,
        nickname:this.nickname,
      }).then(res=>{
        if(res.code==200){
          this.dataCount = res.data.totalSize;
          this.data = res.data.list
        }
        console.log(res)
      })
    },

      //分页功能
    changepages(index) {
      this.page = index;
      this.getInvitationList()
    },

     //选择内容
    handleSelectionChange(val){
      console.log(val)
      this.arrs=val
    },

  }
};
</script>
<style lang="scss" scoped>

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
  padding: 5px 20px;
  background: white;
}
.table-header .table-btn {
  margin-left: 15px;
}
.integral-table .pages {
  padding: 20px;
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
