<!--活动待处理(会员)-->
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
    <div class="head">
      <p>{{activityName}}</p>
    </div>
    <div class="content">
      <p>
        <span>活动管理</span>
        <Select v-model="Scene" style="width:200px">
          <Option v-for="item in List" :value="item.batchNum" :key="item.batchNum">{{item.batchNum}}</Option>
        </Select>
      </p>
      <!-- <Tabs value="name1">
        <TabPane label="标签一" name="name1">标签一的内容</TabPane>
        <TabPane label="标签二" name="name2">标签二的内容</TabPane>
        <TabPane label="标签三" name="name3">标签三的内容</TabPane>
      </Tabs>-->
      <div class="content-details">
        <ul class="list-one">
          <li @click="btn(1)">
            <a>报名</a>
          </li>
          <li @click="btn(2)">
            <a>转移人员</a>
          </li>
          <li @click="btn(3)">
            <a>补助发放</a>
          </li>
        </ul>
        <ul class="list" v-if="show==1">
          <li class="active" @click="btns('')">
            <a>全部</a>
          </li>
          <li
            @click="btns(item.id)"
            v-for="(item,index) in Statuslist"
            :key="index"
          >
            <a>{{item.dataValue}}</a>
          </li>
        </ul>
        <ul class="list" v-if="show==4">
          <li class="active" @click="grantbtn('')">
            <a>全部</a>
          </li>
          <li @click="grantbtn(0)">
            <a>待发放</a>
          </li>
          <li @click="grantbtn(1)">
            <a>已发放</a>
          </li>
        </ul>
        <div class="search" v-if="show!=3">
          <Input v-model="info" placeholder="报名人/手机号" style="width: 150px" />
          <Button class="table-btn" @click="search">搜索</Button>
        </div>
        <div class="integral-table">
          <div class="table-header flex-center-between">
            <div>
              <Button @click="chackall()" style="border:0px;">
                <Checkbox v-model="status">全选</Checkbox>
              </Button>
              <span>已选择{{this.arr.length}}人</span>
              <Button class="table-btn" @click="pass" v-if="show==1||show==2">通过</Button>
              <Button class="table-btn" @click="refuse" v-if="show==1||show==2">拒绝</Button>
              <Button class="table-btn" @click="sendInfos" v-if="show==1||show==2">群发信息</Button>
              <Button class="table-btn" @click="pass(2)" v-if="show==3">批量发送</Button>
            </div>
          </div>

          <Table
            ref="selection"
            border
            :columns="columns"
            :data="datax"
            @on-selection-change="handleSelectionChange"
          ></Table>
          <div class="add" v-if="show==3">
            <p>
              <a>新增物资</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="isshow" @on-ok="ok" @on-cancel="cancel">
      <p>拒绝理由</p>
      <Input
        v-model="refuseReasonComments"
        type="textarea"
        :rows="4"
        placeholder="Enter something..."
      />
    </Modal>
    <Modal v-model="grant" @on-ok="grantok" @on-cancel="grantcancel">
      <CheckboxGroup v-model="subsidyTypes">
        <Checkbox label="1">物质</Checkbox>
        <Checkbox label="2">现金</Checkbox>
      </CheckboxGroup>
      <p>物质</p>

      <Input v-model="resourcesRemark" placeholder="Enter something..." width="150" />
      <p>现金</p>
      <Input v-model="subsidyCash" placeholder="Enter something..." width="150" />
    </Modal>

    <Modal v-model="modify" @on-ok="modifyok" @on-cancel="modifycancel">
      <p>物质名称</p>
      <!-- <Input value="batchNums" width="150" /> -->
      <Select v-model="batchNum" style="width:200px">
        <Option v-for="item in modifyList" :value="item.name" :key="item.index">{{ batchNums }}</Option>
      </Select>
      <p>物质数量</p>
      <Input v-model="resourceNum" placeholder="Enter something..." width="150" />
      <p>备注</p>
      <Input v-model="remark" placeholder="Enter something..." width="150" />
    </Modal>
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
  sendInfo
} from "../../request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "活动待处理(会员)"
      },
      info: "",
      status: false,
      List: [],
      Statuslist: [
        {name:"待审核",id:1},{name:"已通过",id:2},{name:"已拒绝",id:3},{name:"已违约",id:9}
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
          key: "userType",
          align: "center"
        },
        {
          title: "场次",
          // key: "batchNum",
          align: "center",
          render: (h, params) => {
            return h("div", "第" + params.row.batchNum + "场");
          }
        },
        {
          title: "预约时间",
          align: "center",
          render: (h, params) => {
            return h("div", date1("Y-m-dH:i:s", params.row.apptTimestamp));
          }
        },
        {
          title: "报名状态",
          key: "signUpStatusText",
          align: "center"
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
                      console.log(params.row.activityUserId);
                      this.pass(2, params.row.activityUserId);
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
                      this.refuse(3, params.row.activityUserId);
                      // this.$Message.info("你点击了第" + params.index + "列");
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
          title: "场次",
          key: "batchNum",
          align: "center"
        },
        {
          title: "原报名姓名",
          key: "transferUserName",
          align: "center"
        },
        {
          title: "手机号码",
          key: "transferTel",
          align: "center"
        },
        {
          title: "转移岗位",
          key: "recruitJob",
          align: "center"
        },
        {
          title: "转移人姓名",
          key: "recieveUserName",
          align: "center"
        },
        {
          title: "手机号码",
          key: "receiveTel",
          align: "center"
        },
        {
          title: "提交时间",
          key: "userName",
          align: "center",
          render: (h, params) => {
            return h("div", date1("Y-m-dH:i:s", params.row.apptTimestamp));
          }
        },
        {
          title: "状态",
          key: "signUpStatusText",
          align: "center"
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
                      this.pass(6, params.row.activityUserId);
                      // this.$router.push({ path: "/organization/editDetail" });
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
                      this.refuse(13, params.row.activityUserId);
                      // this.$Message.info("你点击了第" + params.index + "列");
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
          title: "场次",
          key: "batchNum",
          align: "center"
        },
        {
          title: "物质名称",
          key: "resourceName",
          align: "center"
        },
        {
          title: "数量",
          key: "num",
          align: "center"
        },
        {
          title: "备注",
          key: "remark",
          align: "center"
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
                      this.modifybtn(params.row);
                      // this.$router.push({ path: "/organization/editDetail" });
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
                      this.rmove(params.row.activityResourcesId);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "场次",
          key: "batchNum",
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
          key: "userType",
          align: "center"
        },
        {
          title: "签到状态",
          key: "signStatusText",
          align: "center"
        },
        {
          title: "发放状态",
          key: "receiveStatusText",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                on: {
                  click: () => {
                    this.grantmat(params.row.activityUserId);
                    // this.$router.push({ path: "/organization/editDetail" });
                  }
                }
              },
              "发放"
            );
          }
        }
      ],
      datax: [],
      activityBatchId: 1, //活动场次
      batchNum: 1, //批次
      receiveStatus: "",
      signUpStatus: "",
      page: 1, //每页显示多少数据
      size: 10, //数据条数
      dataCount: 0,
      pageSize: 10,
      arr: [],
      activityUserIds: [],
      show: 1,
      refuseReasonComments: "",
      isshow: false,
      oprType: "",
      activityResourceIds: "",
      grant: false, //物质弹出框
      grantId: "",
      activityUserId: "",
      subsidyCash: "", //现金输入框
      subsidyTypes: ["1", "2"], //发送状态
      subsidyType: "", //发送状态
      resourcesRemark: "", //物质输入框
      modify: false,
      activityResourceId: "",
      modifyList: [{ name: "1", index: "2" }],
      resourceNum: "",
      remark: "",
      batchNums: "",
      activityName: this.$route.query.activityName,
      status: '',
      name: '',
      title: '',
      msg: '',
      modal1: false
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
      
      })
    },
    //转移审核
    auditTran(type){
      moveStatus({
        ids: this.ids,
        remark: this.remark,
        type
      }).then(res => {

      })
    },
    // 获取报名列表
    getpendingEnrollList() {
      pendingEnrollList({
      activityId:this.$route.query.activityId,
      status: this.status,
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
        activityId:this.$route.query.activityId
      }).then(res => {
        if (res.code == 200) {
          // this.size=res.data.pageSize
          this.columns = this.columns2;
          this.datax = res.data
        }
      });
    },
    // 获取补助发放列表
    getpendingSubsidyList() {
      pendingSubsidyList({
        activityId:this.$route.query.activityId,
        status: this.status,
        name:this.name
      }).then(res => {
        this.status = false;
        if (res.code == 200) {
          // this.size=res.data.pageSize
          this.columns = this.columns4;
          this.datax = res.data
        }
      });
    },

    //发放列表
    grantbtn(e) {
      this.receiveStatus = e;
      this.getpendingSubsidyList();
    },

    //发放物质
    getpendingSubsidy() {
      pendingSubsidy({
        activityUserId: this.activityUserId,
        subsidyType: this.subsidyType,
        subsidyCash: this.subsidyCash,
        resourcesRemark: this.resourcesRemark
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info(res.msg);
        }
        console.log(res);
      });
    },

    //搜索
    search() {
      if (this.show == 1) {
        this.getpendingSignList();
        this.getpendingEnrollList();
      } else if (this.show == 2) {
        this.getpendingTransferList();
        this.getpendingTransfer();
      } else if (this.show == 3) {
        this.getpendingUnclaimedList();
      } else if (this.show == 4) {
        console.log(show);
        this.getpendingSubsidyList();
      }
    },
    // 删除活动物资
    getpendingUncDel() {
      pendingUncDel({
        activityResourceIds: this.activityResourceIds
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$refs.selection.selectAll(this.status);
          this.$Message.info(res.msg);
          this.getpendingUnclaimedList();
        }
      });
    },

    //弹出框取消按钮
    cancel() {
      this.refuseReasonComments = "";
    },

    ok(e) {
      if (this.show == 1) {
        this.oprType = 3;
      } else if (this.show == 2) {
        this.oprType = 13;
      }
      console.log(this.arr);
      if (this.arr.length > 0) {
        let arr = [];
        for (let i = 0; i < this.arr.length; i++) {
          arr.push(this.arr[i].activityId);
        }
        this.activityUserId = arr.toString();
        console.log(this.activityUserId);
        this.getpendingUncOperation();
      } else {
        this.getpendingUncOperation();
        this.refuseReasonComments = "";
      }
    },
    // 修改活动物资信息
    getpendingUncModify() {
      pendingUncModify({
        activityResourceId: this.activityResourceId,
        resourceNum: this.resourceNum,
        remark: this.remark
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$Message.info(res.msg);
        }
      });
    },
    // 批量操作用户报名状态
    getpendingUncOperation() {
      pendingUncOperation({
        activityUserIds: this.activityUserId,
        oprType: this.oprType,
        refuseReasonComments: this.refuseReasonComments
      }).then(res => {
        if (res.code == 200) {
          this.$refs.selection.selectAll(this.status);
          this.$Message.info("操作成功");
        }
        console.log(res);
      });
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
    },
    //全选按钮
    chackall() {
      this.status = !this.status;
      this.$refs.selection.selectAll(this.status);
    },

    //报名 转移人员  物资领取 补助发放
    btn(id) {
      this.show = id;
      if (this.show == 1) {
        this.getpendingSignList();
        this.getpendingEnrollList();
      } else if (this.show == 2) {
        this.getpendingTransferList();
        this.getpendingTransfer();
      } else if (this.show == 3) {
        this.getpendingSubsidyList();
      }
    },
    btns(val) {
      this.receiveStatus = val;
      if (val == 1 || val == 2 || val == 3 || val == 7) {
        this.getpendingEnrollList();
      } else {
        this.getpendingTransferList();
      }
      console.log(val);
    },

    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      if (this.show == 1) {
        this.getpendingEnrollList();
      } else if (this.show == 2) {
        this.getpendingTransferList();
        this.getpendingTransfer();
      } else if (this.show == 3) {
        this.getpendingSubsidyList();
      }
    },
    //通过
    pass() {
      if(this.show == 1){
        this.getPass(2)
      }else if(this.show == 2){
        this.auditTran(2)
      }
    },

    //拒绝
    refuse(i) {
      if(this.show == 1){
        this.getPass(3)
      }else if(this.show == 2){
        this.auditTran(3)
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
    // 发放
    grantmat(e) {
      this.activityUserId = e;
      this.grant = true;
    },
    grantcancel() {},

    //使用ok按钮
    grantok() {
      console.log(this.subsidyTypes);
      if (this.subsidyTypes.length == 2) {
        this.subsidyType = 3;
        this.getpendingSubsidy();
      } else {
        this.subsidyType = this.subsidyTypes[0];
        this.getpendingSubsidy();
      }
    },
    //修改按钮
    modifybtn(e) {
      this.modify = true;
      this.activityResourceId = e.activityResourcesId;
      this.batchNums = e.batchNum;
    },
    // 修改弹出框
    modifyok() {
      console.log(this.activityResourcesId);
      this.getpendingUncModify();
    },
    modifycancel() {}
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
  padding-left: 30px;
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
    .active {
      background: green;
      color: #ffffff;
    }
  }
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
.search {
  height: 40px;
  padding-left: 20px;
  display: flex;
  align-items: center;
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
