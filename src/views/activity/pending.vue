<!--活动待处理(会员)-->
<template>
  <div>
     <Modal v-model="modal1"  @on-cancel='cancel'>
      <i-input placeholder="请输入内容" v-model="title" style="marginBottom:1rem;"/>
      <i-input placeholder="请输入内容" v-model="msg" type="textarea" :row='4'/>
      <div slot="footer">
        <Button type="success" size="large" @click="success">确定</Button>
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
          <li @click="btn(1)">
            <Button :class="{active:show == 1}">报名</Button>
          </li>
          <li @click="btn(2)">
            <Button :class="{active:show == 2}">转移人员</Button>
          </li>
          <li @click="btn(3)">
            <Button :class="{active:show == 3}">补助发放</Button>
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
        <div class="searchs flex-start" v-if="show!=3">
          <i-input v-model="info" placeholder="报名人/手机号" style="width:150px" />
          <Button class="table-btn" @click="search">搜索</Button>
        </div>
        <div class="integral-table">
          <div class="table-header flex-center-between">
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
  subDo
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
      List: [],
      Statuslist: [
        {name:"全部",id: 0},{name:"待审核",id:1},{name:"已通过",id:2},{name:"已拒绝",id:3},{name:"已违约",id:9}
      ],
      arrsList: [
        {name: "全部",id: -1},{name:"未领取",id:0},{name:"已领取",id:1}
      ],
      Scene: "所有场次",
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
                    }
                    this.ids = [params.row.actUserId]
                    this.moreSend();
                  }
                }
            },'发放');
          }
        }
      ],
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
      ids:[]
    };
  },

  computed: {},

  created() {},
  mounted() {
    this.getpendingEnrollList();
  },

  methods: {
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
          this.datax = res.data
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
          this.datax = res.data
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
          this.datax = res.data
        }
      });
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
      if(this.show == 1){
        this.ids = val.map(v => {
          if(~~v.status === 0){
            return v.actUserId
          }else{
            this.$Message.error("只能选择待审核")
          }
        })
        this.arr = val.map( v=> {
          return v.userId
        })
      }else if(this.show == 2){
        this.ids = val.map(v => {
          if(~~v.status == 0 || ~~v.status == 3){
             return v.auditId
          }else{
            this.$Message.error("只能选择待审核二级待审核")
          }
        })
        this.arr = val.map( v=> {
          return v.targetUserId
        })
      }else{
         this.ids = val.map(v => {
           if(~~v.status === 0){
              return v.actUserId
           }else{
             this.$Message.error("已发放不能发放")
           }
        })
        this.arr = val.map( v=> {
          return v.userId
        })
      }
    },

    //全选按钮
    chackall() {
      this.status = !this.status;
      this.$refs.selection.selectAll(this.status);
    },

    //报名 转移人员  补助发放
    btn(id) {
      this.show = id;
      if (this.show == 1) {
        this.$set(this.state,0,0)
        this.getpendingEnrollList();
      } else if (this.show == 2) {
        this.getpendingTransferList();
      } else if (this.show == 3) {
        this.$set(this.state,1,-1)
        this.getpendingSubsidyList();
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
