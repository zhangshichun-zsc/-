<!--活动概况(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <p class="words">
        5.12"行走在夏日"游园活动
        <span>
          <a>关联活动反馈表</a>
        </span>
      </p>
      <div>
        <p class="color"></p>
        <div class="apply">
          <div class="sign">
            <div class="icon1">
              <Icon type="md-paper" />
            </div>
            <span>总报名人数</span>
            <span>{{lists.signUpNum}}</span>
          </div>
          <div class="sign">
            <div class="icon1">
              <Icon type="ios-people" />
            </div>
            <span>总签到人数</span>
            <span>{{lists.signInNum}}</span>
          </div>
        </div>
      </div>
      <div>
        <p class="color padd">
          <span>待办事项</span>
        </p>
        <div class="apply">
          <div class="sign" @click="pend">
            <Icon type="document-text"></Icon>
            <span>报名待审核</span>
            <span>{{lists.waitAuditNum}}</span>
          </div>
          <div class="sign" @click="pend">
            <Icon type="folder"></Icon>
            <span>转移待审核</span>
            <span>{{lists.waitTransferNum}}</span>
          </div>
        </div>
      </div>
      <div>
        <p class="color padd">
          <Icon type="ios-search-outline" />
          <span>筛选查询</span>
        </p>
        <div class="inquire">
          <span>姓名：</span>
          <i-input v-model="query.userName" style="width: 8rem;"></i-input>
          <span>报名类型:</span>
          <Select v-model="query.roleId" style="width:5rem;">
            <Option :value="''">全部</Option>
            <Option v-for="item in cityList1" :value="item.roleId" :key="item.value">{{ item.roleName }}</Option>
          </Select>
          <span>报名状态:</span>
          <Select v-model="query.enrollStatus" style="width:5rem;">
            <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <div class="exports">
        <div>
          <Button class="table-btn">
            <Icon type="md-cloud-upload" />导出
          </Button>
          <Dropdown style="margin-left: 0.2rem;width:5rem;">
            <Button><Icon type="md-cloud-upload" />更多操作</Button>
            <DropdownMenu slot="list">
              <DropdownItem>添加参与人员</DropdownItem>
              <DropdownItem>导入参与人员</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown style="margin-left:0.2rem;width:5rem;">
            <Button><Icon type="md-cloud-upload" />发送信息</Button>
            <DropdownMenu slot="list">
              <DropdownItem>发送短信</DropdownItem>
              <DropdownItem>发送微信</DropdownItem>
              <DropdownItem>发送站内信</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <Button class="table-btn" @click="querys">搜索</Button>
      </div>
      <div class="check">
        <p>
          <Checkbox :checked.sync="xuan">全选</Checkbox>
          <span style="font-size: 14px;">已选择</span>
          <span style="font-size: 14px;">0</span>
        </p>
        <Table border :columns="columns" :data="memberlist"></Table>
      </div>
    </div>
    <div class="pages">
      <!-- <span>共10页/100条数据</span> -->
      <Page :total="sumSize" show-elevator @on-change='changePage' :page-size='size'/>
    </div>
  </div>
</template>

<script>
import { Activitysummary, actMemberlist,getActiveIdType } from "../../request/api"
import { filterNull } from '@/libs/utils'
import { constants } from 'fs';
export default {
  data() {
    return {
      value: "",
      xuan: false,
      navigation1: {
        head: "活动概况(会员)"
      },
      cityList1: [],
      cityList2: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 1,
          label: "待审核"
        },
        {
          value: 2,
          label: "报名成功"
        },
        {
          value: 3,
          label: "报名被拒绝"
        },
          {
          value: 4,
          label: "资格转移审核中，转移方"
        },
        {
          value: 5,
          label: "资格转移审核中，接收方"
        },
        {
          value: 6,
          label: "转移成功"
        },
        {
          value: 7,
          label: "用户自主取消--已取消"
        },
            {
          value: 8,
          label: "活动已取消--活动"
        },
        {
          value: 9,
          label: "已违约"
        },
          {
          value: 10,
          label: "排队中"
        },
        {
          value: 11,
          label: "请假中"
        },
        {
          value: 12,
          label: "待付款"
        },
        {
          value: 13,
          label: "拒绝转移"
        }
      ],
      model1: "Photography",
      model2: "loading",
      columns: [
        {
          type: "selection",
          width: 80,
          align: "center"
        },
        {
          title: "姓名",
          key: "userName",
          width: 300,
          align: "center"
        },
        {
          title: "手机号",
          key: "userPhone",
          width: 300,
          align: "center"
        },
        {
          title: "报名类型",
          key: "roleName",
          width: 300,
          align: "center"
        },
        {
          title: "报名状态",
          key: "types",
          width: 400,
          align: "center",
          render: (h,params) =>{
            let state = params.row.userActType
            let name = ''
            for(let item of this.cityList2){
              if(item.value == state){
                name = item.label
                break;
              }
            }
            return (<span>{name}</span>)
          }
        },
        {
          title: "签到状态",
          width: 300,
          key: "userstype",
          align: "center",
          render: (h,params) =>{
            let state = params.row.signStatus
            return (<span>{["未签到","已签到","迟到"][~~state]}</span>)
          }
        },
        {
          title: "反馈状态",
          key: "number",
          width: 300,
          align: "center",
          render: (h,params) =>{
            return (<span>{~~params.row.feedbackStatus === 1?'已反馈':'未反馈'}</span>)
          }
        },
        {
          title: "详情",
          key: "apply",
          width: 200,
          align: "center",
          render: (h,params) =>{
            return (<span>详情</span>)
          }
        },
        {
          title: "操作",
          key: "action",
          width: 300, 
          align: "center",
          render: (h, params) => {
            return h("div", [
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
                      this.$Message.info("你点击了第" + params.index + "列");
                    }
                  }
                },
                "活动授权"
              )
            ]);
          }
        }
      ],
      datax: [],
      userName: null,
      roleId: null,
      enrollStatus: null,
      page: 1,
      size: 10,
      sumSize: 10,
      lists:[],
      query:{
        userName: null,
        roleId: null,
        enrollStatus: null,
      },
      memberlist:[]
    }
  },

  components: {},

  computed: {},

  created() {
    this.getActivitysummary()
    this.getMemberList()
    this.typeList()
  },

  methods: {
    pend(){
      this.$router.push({name:'pending'})
    },
    querys(){
      this.roleId = this.query.roleId
      this.userName = this.query.userName
      this.enrollStatus = this.query.enrollStatus
      this.getMemberList()
    },
    //数据概况
    getActivitysummary(){
      Activitysummary({
        activityId:this.$route.query.acitvityId,
        userId:this.$store.state.userId
      }).then(res => {
        if(res.code == 200){
          this.lists=res.data
        }
      })
    },
    getMemberList(){
      actMemberlist(filterNull({
        userName: this.userName,
        roleId: this.roleId,
        activityId:this.$route.query.acitvityId,
        enrollStatus: this.enrollStatus,
        page:{
          page:this.page,
          size: this.size
        }
      })).then(res=>{
        if(res.code == 200){
          this.sumSize = res.data.totalSize
          this.memberlist = res.data.list
        }else{
          this.$Message.error(res.msg)
        } 
      })
    },
    typeList(){
      getActiveIdType({activityId:this.$route.query.acitvityId}).then(res => {
        if(res.code == 200){
          this.cityList1 = res.data
        }else{
          this.$Message.error(res.msg)
        }
      })
    },
    changePage(e){
      this.page = index;
      this.getMemberList();
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  padding: 0 40px;
  background: #ffffff;
  margin-top: 20px;
}
.words {
  height: 70px;
  line-height: 70px;
  span {
    // color:
    margin-left: 30px;
  }
}
.color {
  background: #e3e3e3;
  height: 40px;
}
.apply {
  height: 150px;
  display: flex;
  justify-content: space-around;
  border: #e3e3e3 1px solid;
  margin-bottom: 20px;
  .sign {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      margin: 5px 0;
    }
  }
}
.padd {
  padding-left: 20px;
  line-height: 40px;
}
.inquire {
  display: flex;
  align-items: center;
  height: 50px;
  border: #e3e3e3 1px solid;
  padding-left: 20px;
  span {
    margin: 0 10px;
  }
}
.exports {
  display: flex;
  justify-content: space-between;
  padding-right: 200px;
  margin: 20px 0;
  .ivu-select-default,button {
    margin-right: 10px;
  }
}
.check {
  p {
    padding-left: 15px;
    margin-bottom: 10px;
    span{
      font-size: 14px;
    }
  }
}
.pages {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background: #ffffff;
  font-size: 14px;
  span{
    margin-right: 10px;
  }
}
  .icon1{
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    border: 2px solid #e4e4e4;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
</style>
