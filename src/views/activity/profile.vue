<!--活动概况(会员)-->
<template>
  <div>
    <Modal v-model="modal1" title="新增证书模板"  @on-cancel='cancel'>
      <i-input placeholder="请输入内容" v-model="title" style="marginBottom:1rem;"/>
      <i-input placeholder="请输入内容" v-model="msg" type="textarea" :row='4'/>
      <div slot="footer">
        <Button type="error" size="large" @click="success">确定</Button>
      </div>
    </Modal>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <p class="words">
        {{activityName}}
      </p>
      <div>
        <p class="color"></p>
        <div class="apply">
          <div class="sign">
            <div class="icon1">
              <Icon type="md-paper" />
            </div>
            <span>总报名人数</span>
            <span>{{lists.totalApprNum }}</span>
          </div>
          <div class="sign">
            <div class="icon1">
              <Icon type="ios-people" />
            </div>
            <span>总签到人数</span>
            <span>{{lists.totalSignNum}}</span>
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
            <span>{{lists.apprAuditNum }}</span>
          </div>
          <div class="sign" @click="pend">
            <Icon type="folder"></Icon>
            <span>转移待审核</span>
            <span>{{lists.moveActNum}}</span>
          </div>
        </div>
      </div>
      <div>
        <p class="color padd">
          <Icon type="ios-search-outline" />
          <span>筛选查询</span>
        </p>
        <div class="inquire flex-between">
          <div class="flex-center-start">
            <span>姓名：</span>
            <i-input v-model="query.userName" size='large' class="input"  placeholder="输入名称"></i-input>
            <span>报名类型:</span>
            <Select v-model="query.roleId" size='large' class="input">
              <Option :value="''">全部</Option>
              <Option v-for="item in cityList1" :value="item.roleId" :key="item.value">{{ item.roleName }}</Option>
            </Select>
            <span>报名状态:</span>
            <Select v-model="query.enrollStatus" size='large' class="input">
              <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <Button shape="circle" size='large' @click="querys" class="btn">搜索</Button>
        </div>
      </div>
      <div class="check">
        <div class="flex-between">
          <div class="flex-start">
            <Checkbox :checked.sync="xuan" style="font-size: 16px;" class="span">全选</Checkbox>
            <span >已选择</span>
            <span>{{arr.length}}</span>
          </div>
          <div class="flex-start">
            <Button class="table-btn" disabled size='large'>
            <Icon type="md-cloud-upload" />导出
          </Button>
          <!-- <Dropdown style="margin-left: 0.2rem;width:5rem;">
            <Button><Icon type="md-cloud-upload" />更多操作</Button>
            <DropdownMenu slot="list">
              <DropdownItem>添加参与人员</DropdownItem>
              <DropdownItem>导入参与人员</DropdownItem>
            </DropdownMenu>
          </Dropdown> -->
          <Button @click="sendInfos"  class="table-btn" size='large'>发送站内信</Button>
          </div>
        </div>
        <Table border :columns="columns" :data="memberlist"  @on-selection-change="handleSelectionChange"></Table>
      </div>
    </div>
    <div class="pages">
      <!-- <span>共10页/100条数据</span> -->
      <Page :total="sumSize" show-elevator @on-change='changePage' :page-size='size'/>
    </div>
  </div>
</template>

<script>
import { Activitysummary, actMemberlist,getActiveIdType,activeReson,sendInfo } from "../../request/api"
import { filterNull } from '@/libs/utils'
import { constants } from 'fs';
export default {
  data() {
    return {
      arr: [],
      value: "",
      xuan: false,
      navigation1: {
        head: "活动概况"
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
      modal1:false,
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
            return   h(
                "span",
                {
                  style: {
                    color: "#FF565A"
                  },
                  on: {
                    click: () => {
                       this.$router.push({
                        name: "personnel_details",
                        query: { actUserId: params.row.actUserId, activityName:this.activityName}
                      });
                    }
                  }
                },
                "详情"
              )
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

                    color: "#FF565A"
                  },
                  on: {
                    click: () => {
                      activeReson({actUserId:params.row.actUserId,userId:params.row.userId}).then(res => {
                        if(res.code == 200){
                          this.$Message.success("授权成功")
                        }else{
                          this.$Message.error(res.msg)
                        }
                      })
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
      memberlist:[],
      activityName: this.$route.query.activityName,
      title:'',
      msg: ''
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
    sendInfos(){
      if(this.arr.length == 0){
        this.$Message.info("请选择")
        return
      }
      this.modal1 = true
    },
    success(){
      if(!this.title){
        this.$Message.error("标题没有填写")
        return
      }else if(!this.msg){
        this.$Message.error("内容没有填写")
        return
      }
      sendInfo({ids:this.arr,msg:this.msg,title:this.title,sysId:this.$route.query.sysId}).then(res => {
        if(res.code == 200){
          this.modal1 = false
          this.$Message.success("发送成功")
        }else{
          this.$Message.error(res.msg)
        }
      })
    },
    cancel(){
      this.model1 = false
      this.title = ''
      this.msg = ''
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
        this.arr = val.map(item => {
          return item.userId
        })
    },
    pend(){
      this.$router.push({
        name: "pending",
        query: { activityId: this.$route.query.acitvityId, activityName:this.activityName,sysId:this.$route.query.sysId}
      })
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
.btn{
  background: #FF565A !important;
  color: #fff !important;
  border-color:#FF565A !important;
  font-size: 16px;
}
.table-btn{
  font-size: 16px;
  margin: 0 10px;
}
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
    cursor: pointer;
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
  padding: 20px 20px 20px 0;
  .input{
    width: 250px;
  }
  span {
    margin: 0 10px 0 30px;
  }
}
.check {
  .flex-between{
    padding: 10px 20px;
    span,.span{
      font-size: 16px;
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
