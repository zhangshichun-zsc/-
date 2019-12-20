<!--活动待处理(会员)-->
<template>
  <div>
     <Modal v-model="modal1"  @on-cancel='cancel'>
       <div>
         <i-input placeholder="请输入内容" v-model="title" style="marginBottom:1rem;"/>
         <i-input placeholder="请输入内容" v-model="msg" type="textarea" :row='4'/>
       </div>
      <div slot="footer">
        <Button type="success" size="large" @click="success">确定</Button>
      </div>
    </Modal>
    <Modal v-model="modal3" title="拒绝理由"  @on-cancel='matchCancel'>
      <div>
        <Select v-model="mUserId" style="marginBottom:1rem;" :disabled='type == 0' @on-change='changeSele(0,$event)'>
          <Option :value="mUserId" v-if="type==0">{{ vName }}</Option>
          <Option v-for="(item,index) in listM"  :key="index" :value="item.userId" v-else>{{ item.name }}</Option>
        </Select>
        <i-input v-model="mTel"  style="marginBottom:1rem;" disabled/>
        <Select v-model="vUserId" style="marginBottom:1rem;" @on-change='changeSele(1,$event)'>
          <Option v-for="(item,index) in listV" :key="index" :value="item.userId">{{ item.name }}</Option>
        </Select>
        <i-input  v-model="vTel" disabled />
      </div> 
      <div slot="footer">
        <Button type="error" size="large" @click="matching">确定</Button>
      </div>
    </Modal>
    <Modal v-model="modal2" title="拒绝理由"  @on-cancel='showCancel'> 
        <i-input placeholder="请输入拒绝内容" v-model="remark" type="textarea" :row='4'/>
        <div slot="footer">
          <Button type="error" size="large" @click="refuse">确定</Button>
        </div>
    </Modal>
    <Navigation :labels="navigation1"></Navigation>
    <div class="head">
      <p>{{activityName}}</p>
    </div>
    <div class="content">
      <div class="content-details">
        <ul class="list-one">
          <li @click="btnTab(index+1)" v-for='(item,index) in head' :key='index'>
            <Button :class="{active:show == index+1}">{{ item.name }}</Button>
          </li>
        </ul>
        <ul class="list" v-if="show==1">
          <li
            @click="btns(item.id)"
            v-for="(item,index) in Statuslist"
            :key="index"
          >
            <Button :class="{active:state[0] == item.id}">{{item.name}}</Button>
          </li>
        </ul>
        <ul class="list" v-if="show==3">
          <li @click="grantbtn(item.id)" v-for='(item,index) in arrsList' :key='index'>
            <Button :class="{active:state[1] == item.id}">{{ item.name }}</Button>
          </li>
        </ul>
        <div class="searchs flex-start" v-if="show!=4">
          <i-input v-model="info" placeholder="报名人/手机号" style="width:150px" />
          <Button class="table-btn" @click="search">搜索</Button>
        </div>
        <div class="integral-table">
          <div class="table-header flex-center-between"  v-if='show !== 4'>
            <div>
              <Button @click="chackall()" style="border:0px;">
                <Checkbox v-model="status">全选</Checkbox>
              </Button>
              <span>已选择{{this.ids.length}}人</span>
              <Button class="table-btn" @click="pass" v-if="show==1||show==2">通过</Button>
              <Button class="table-btn" @click="showModal2" v-if="show==1||show==2">拒绝</Button>
              <Button class="table-btn" @click="sendInfos">群发信息</Button>
              <Button class="table-btn" @click="moreSend" v-if="show==3">批量发送</Button>
            </div>
          </div>

          <Table
            ref="selection"
            border
            :columns="columns"
            :data="datax"
            @on-selection-change="handleSelectionChange"
          ></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { date1, getTransrList } from "../../request/datatime";
import {
  pendingBatchList,
  pendingSignList,
  pendingTransfer,
  pendingEnrollList,
  pendingTransferList,
  pendingUnclaimedList,
  pendingSubsidyList,
  pendingUncDel,
  pendingUncModify,
  pendingUncOperation,
  pendingSubsidy,
  signUpStatus,
  moveStatus,
  sendInfo,
  subDo,
  getMatchingList,
  getMatchingMeList,
  getMatchingVoList,
  Matchingupdate,
  matchAdd
} from "../../request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "活动待处理(会员)"
      },
      info: "",
      status: false,
      modal2: false,
      modal3: false,
      mTel:'',
      mUserId:'',
      vTel:'',
      vUserId: '',
      List: [],
      Statuslist: [
        {name:"全部",id: 0},{name:"待审核",id:1},{name:"已通过",id:2},{name:"已拒绝",id:3},{name:"已违约",id:9}
      ],
      arrsList: [
        {name: "全部",id: -1},{name:"未领取",id:0},{name:"已领取",id:1}
      ],
      columns: [],
      columns1: [
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
          title: "手机号码",
          key: "tel",
          align: "center"
        },
        {
          title: "用户类型",
          key: "roleName",
          align: "center"
        },
        {
          title: "预约时间",
          key: 'createAt',
          align: "center",
        },
        {
          title: "报名状态",
          align: "center",
          render: (h,params) =>{
            let state = params.row.status
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
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  clssName: "action",
                  style: {
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      let state = params.row.status
                      if(state !== 0){
                        this.$Message.error("不能操作")
                        return
                      }
                      this.ids = [params.row.actUserId]
                      this.pass();
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
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      let state = params.row.status
                      if(state !== 0){
                        this.$Message.error("不能操作")
                         return
                      }
                      this.ids = [params.row.actUserId]
                      this.refuse(3);
                    }
                  }
                },
                "拒绝"
              )
            ]);
          }
        }
      ],
      columns2: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "原报名姓名",
          key: "apprName",
          align: "center"
        },
        {
          title: "手机号码",
          key: "apprTel",
          align: "center"
        },
        {
          title: "转移岗位",
          key: "ROLE_NAME",
          align: "center"
        },
        {
          title: "转移人姓名",
          key: "targetName",
          align: "center"
        },
        {
          title: "手机号码",
          key: "targetTel",
          align: "center"
        },
        {
          title: "提交时间",
          key: "createAt",
          align: "center",
        },
        {
          title: "状态",
          align: "center",
          render: (h, params) => {
            const arr = ["待审核","审核通过","审核不通过","一级审核通过二级待审核"]
            return h("span",arr[params.row.status])
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  clssName: "action",
                  style: {
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      let state = params.row.status
                      if(state !== 0 && state !== 3){
                        this.$Message.error("不能操作")
                         return
                      }
                      this.ids = [params.row.auditId]
                      this.pass();
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
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                       let state = params.row.status
                      if(state !== 0 && state !== 3){
                        this.$Message.error("不能操作")
                         return
                      }
                      this.ids = [params.row.auditId]
                      this.refuse(3);
                    }
                  }
                },
                "拒绝"
              )
            ]);
          }
        }
      ],
      columns3: [
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
          title: "手机号",
          key: "tel",
          align: "center"
        },
        {
          title: "用户类型",
          key: "roleName",
          align: "center"
        },
        {
          title: "签到状态",
          align: "center",
          render: (h, params) => {
            const arr = ["未签到","已签到","迟到"]
            return h("span",arr[params.row.receiveStatus])
          }
        },
        {
          title: "发放状态",
          align: "center",
          render: (h, params) => {
            const arr = ["未发放","已发放"]
            return h("span",arr[params.row.status])
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("span",{
               on: {
                  click: () => {
                    let state = params.row.status
                    if(state !== 0){
                      this.$Message.error("不能操作")
                      return
                    }
                    this.ids = [params.row.actUserId]
                    this.moreSend();
                  }
                }
            },'发放');
          }
        }
      ],
      columns4:[
        
        {
          title: "受益方",
          align: "center",
          render: (h,params) =>{
            return (<span>受益方</span>)
          }
        },
        {
          title: "姓名",
          key: "memUserName",
          align: "center"
        },
        {
          title: "手机号",
          key: "memUserTel",
          align: "center"
        },
        {
          title: "志愿者",
          align: "center",
          render: (h,params) =>{
            return (<span>志愿者</span>)
          }
        },
        {
          title: "姓名",
          align: "center",
          key: "voluUserName",
        },
        {
          title: "手机号",
          key: "voluUserTel",
          align: "center",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
           render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  clssName: "action",
                  style: {
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.modal3 = true
                      this.mTel = params.row.memUserTel
                      this.mUserId = params.row.memUserId
                      this.vName = params.row.memUserName
                      this.actMatchId = params.row.actMatchId
                      this.type = 0
                    }
                  }
                },
                "修改"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.type = 1
                      this.modal3 = true
                    }
                  }
                },
                "新增"
              )
            ]);
          }
        }
      ],
      type: 0,
      datax: [],
      arr: [],
      show: 1,
      remark: "",
      activityName: this.$route.query.activityName,
      state: [0,-1],
      name: '',
      title: '',
      msg: '',
      modal1: false,
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
      ids:[],
      head:[{name:"报名"},{name:"转移人员"},{name:"补助发放"},{name:"匹配"}],
      listM:[],
      listV:[],
      vName:'',
      actMatchId: null
    };
  },

  computed: {},

  created() {},
  mounted() {
    this.getpendingEnrollList();
    this.initData()
  },

  methods: {
    changeSele(i,e){
      if(i == 0){
        for(let item of this.listM){
          if(item.userId == e) this.mTel = item.tel
        }
      }else{
        for(let item of this.listV){
          if(item.userId == e) this.vTel = item.tel
        }
      }
    },
    initData(){
      getMatchingMeList({activityId:this.$route.query.activityId}).then(res => {
        this.listM = res.data
      })
      getMatchingVoList({activityId:this.$route.query.activityId}).then(res => {
        this.listV = res.data
      })
    },
    matching(){
      if(this.type == 0){
        Matchingupdate({actMatchId:this.actMatchId,userId:this.vUserId}).then(res => {
          if(res.code == 200){
            this.modal3 = false
            this.$Message.success('修改成功')
            this.getMatchList()
          }else{
            this.$Message.error(res.msg)
          }
        })
      }else{
        matchAdd({
          memUserId: this.mUserId,
          voluUserId:this.vUserId,
          activityId:this.$route.query.activityId
        }).then(res => {
          if(res.code == 200){
            this.modal3 = false
            this.$Message.success('添加成功')
            this.getMatchList()
          }else{
            this.$Message.error(res.msg)
          }
        })
      }
    },
    matchCancel(){
      this.vUserId = ''
      this.vTel = ''
      this.mUserId = ''
      this.mTel = ''
    },
    sendInfos(){
      if(this.arr.length == 0){
        this.$Message.info("请选择")
        return
      }
      this.modal1 = true
    },
    //报名审核
    getPass(type){
      signUpStatus({
        ids: this.ids,
        remark: this.remark,
        type
      }).then(res => {
        if(res.code == 200){
          this.$Message.success("审核成功")
          if(this.show == 1){
            this.getpendingEnrollList()
          }else if(this.show == 2){
            this.getpendingTransferList()
          }
        }else{
          this.$Message.error(res.msg)
        }
      })
    },
    //转移审核
    auditTran(type){
      moveStatus({
        auditId: this.ids,
        remark: this.remark,
        type
      }).then(res => {
       if(res.code == 200){
          this.$Message.success("审核成功")
          if(this.show == 1){
            this.getpendingEnrollList()
          }else if(this.show == 2){
            this.getpendingTransferList()
          }
        }else{
          this.$Message.error(res.msg)
        }
      })
    },
    // 获取报名列表
    getpendingEnrollList() {
      pendingEnrollList({
      activityId:this.$route.query.activityId,
      status: this.state[0],
      name:this.name
      }).then(res => {
        this.status = false;
        if (res.code == 200) {
          this.columns = this.columns1;
          let data = res.data
          for(let item of data){
            if(~~item.status !== 0)item._disabled = true
          }
          this.datax = data
        }
      });
    },

    // 获取转移用户列表
    getpendingTransferList() {
      pendingTransferList({
        activityId:this.$route.query.activityId,
        status: -1
      }).then(res => {
        if (res.code == 200) {
          this.columns = this.columns2;
          let data = res.data
          for(let item of data){
            if(~~item.status !== 0 && ~~item.status !== 3)item._disabled = true
          }
          this.datax = data
        }
      })
    },
    // 获取补助发放列表
    getpendingSubsidyList() {
      pendingSubsidyList({
        activityId:this.$route.query.activityId,
        status: this.state[1],
        name:this.name
      }).then(res => {
        this.status = false;
        if (res.code == 200) {
          this.columns = this.columns3;
          let data = res.data
          for(let item of data){
            if(~~item.status !== 0)item._disabled = true
          }
          this.datax = data
        }
      });
    },
    getMatchList(){
      getMatchingList({activityId:this.$route.query.activityId}).then(res => {
        if (res.code == 200) {
          this.columns = this.columns4;
          this.datax = res.data
        }
      })
    },
    //发放列表
    grantbtn(e) {
      this.$set(this.state,1,e)
      this.getpendingSubsidyList();
    },

    //搜索
    search() {
      this.name = this.info
      if (this.show == 1) {
        this.getpendingEnrollList();
      } else if (this.show == 2) {
        this.getpendingTransferList();
      } else if (this.show == 3) {
        this.getpendingSubsidyList();
      }
    },
    //每条数据单选框的状态
    handleSelectionChange(val) {
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true;
      } else {
        this.status = false;
      }
      if(this.show == 1 || this.show == 3){
        this.ids = val.map(v => {
          return v.actUserId
        })
        this.arr = val.map( v=> {
          return v.userId
        })
      }else if(this.show == 2){
        this.ids = val.map(v => {
          return v.auditId
        })
        this.arr = val.map( v=> {
          return v.targetUserId
        })
      }
    },

    //全选按钮
    chackall() {
      this.status = !this.status;
      this.$refs.selection.selectAll(this.status);
    },

    //报名 转移人员  补助发放
    btnTab(id) {
      this.show = id;
      if (this.show == 1) {
        this.$set(this.state,0,0)
        this.getpendingEnrollList();
      } else if (this.show == 2) {
        this.getpendingTransferList();
      } else if (this.show == 3) {
        this.$set(this.state,1,-1)
        this.getpendingSubsidyList();
      }else{
        this.getMatchList()
      }
    },
    btns(val) {
      this.$set(this.state,0,val)
      this.getpendingEnrollList()
  
    },

    //通过
    pass() {
      if(this.show == 1){
        this.getPass(2)
      }else if(this.show == 2){
        this.auditTran(1)
      }
    },
    showModal2(){
      if(this.ids.length == 0){
        this.$Message.info("请选择拒绝的列表")
        return
      }
      this.modal2 = true
    },
    showCancel(){
      this.modal2 = false
      this.remark = ''
    },
    //拒绝
    refuse(i) {
      this.modal2 = false
      if(this.show == 1){
        this.getPass(3)
      }else if(this.show == 2){
        this.auditTran(2)
      }
    },
    success(){
      if(!this.title){
        this.$Message.error("标题没有填写")
        return
      }else if(!this.msg){
        this.$Message.error("内容没有填写")
        return
      }
      sendInfo({ids:this.arr,msg:this.msg,title:this.title,sysId:1}).then(res => {
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
    moreSend(){
      if(this.ids.length == 0){
        this.$$Message.info("请选择")
        return
      }
      subDo({ids:this.ids}).then(res => {
        if(res.code == 200){
          this.$Message.success("成功")
          this.getpendingSubsidyList()
        }else{
          this.$Message.error(res.msg)
        }
      })
    },
    // 发放
    grantmat(e) {
      this.activityUserId = e;
      this.grant = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.head {
  height: 70px;
  padding-left: 40px;
  // text-align: center;
  line-height: 70px;
  font-size: 18px;
  background: #ffffff;
}
.content {
  background: #e3e3e3;
  p {
    background: #e3e3e3;
    height: 50px;
    line-height: 50px;
    span {
      margin-right: 20px;
    }
  }
  .list-one {
    display: flex;
    height: 40px;
    line-height: 40px;
    background: #ffffff;
    margin-bottom: 5px;
    li {
      margin: 0 20px;
      // color: green;
      a {
        color: green;
      }
    }
  }
  .list {
    display: flex;
    height: 40px;
    line-height: 40px;
    background: #ffffff;
    border: #e3e3e3 solid 1px;
    li {
      margin: 0 20px;
      width: 50px;
      text-align: center;
      a {
        color: black;
      }
    }
   
  }
} 
.active {
  border-color:#FF565A !important;
  color: #FF565A !important;
}
.table-header {
  height: 50px;
  background: #ffffff;
  padding-left: 10px;
  span {
    font-size: 14px;
  }
  .table-btn {
    margin: 0 10px;
  }
}
.searchs {
  height: 40px;
  padding: 10px 20px;
  background: #ffffff;
  .table-btn {
    margin-left: 20px;
  }
}
.content-details {
  background: #ffffff;
}
.add {
  text-align: center;
  color: green;
  background: #ffffff;
}
</style>
