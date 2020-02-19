<!--组织列表共用-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="top flex-center-start btn-wrapper">
      <div class="btn-box">
        <span class="label">反馈人:</span>
        <Input v-model="answerUserName" size="small" placeholder="反馈人" />
      </div>
      <div class="btn-box">
        <span class="label">问卷名称:</span>
        <Input v-model="configName" size="small" placeholder="问卷名称"/>
      </div>
      <div class="btn-box">
        <span class="label">反馈时间:</span>
        <DatePicker
          type="daterange"
          v-model="surveyDate"
          @on-change="handleChange"
          placement="bottom-end"
          placeholder="反馈时间"
        ></DatePicker>
      </div>
      <Button @click="query" shape="circle" size="large" class="search" style="margin-left:10px;">查询</Button>
    </div>
    <div class="basis">
      <div class="table-header flex-between">
        <p>
          <Icon type="ios-list"/>
          <span>数据列表</span>
        </p>
        <div class="options flex-center-start">
          <Dropdown class="space">
            <Button @click="createPaperResearch">新增问卷调查</Button>
          </Dropdown>

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
        :data="tableData"
        @on-selection-change="handleSelectionChange"
      >
        <template slot-scope="{ row, index }" slot="configName">
          <span @click="onShowSurveyDetail(row.configHeaderId)"
           style="cursor:pointer;">
            {{ row.configName }}
          </span>
        </template>
        <template slot-scope="{row,index}" slot="answerNum">
          <span @click="onGetFeedbackDetail(row)" 
            :class="{'check-item':row.answerNum}">
            {{row.answerNum}}
          </span>
        </template>
        <template slot-scope="{row,index}" slot="sendNum">
          <span @click="onJumpPush(row)"
            :class="{'check-item':row.answerNum}">
            {{row.sendNum}}
          </span>
        </template>
        <template slot-scope="{row,index}" slot="action">
          <div class="btn-container">
            <span @click="onEdit(row)" :class="['nBtn',row.auditFlag=='待审核'?'activeBtn':'']">
              编辑
            </span>
            <span @click="onPush(row)" :class="['nBtn',row.auditFlag!=='待审核'?'activeBtn':'']">
              推送
            </span>
            <span @click="handleRenderShenhe(row)" 
              :class="['nBtn',row.auditFlag=='待审核'?'activeBtn':'']">
              审核
            </span>
            <span @click="handleRenderZuofei(row)" :class="['nBtn',row.auditFlag=='待审核'?'activeBtn':'']">
              作废
            </span>
            <span @click="handleRenderShanchu(row)" :class="['eBtn',row.auditFlag=='待审核'?'activeBtn':'']">
              删除
            </span>
          </div>
        </template>
      </Table>
    </div>
    <div class="pages flex-center-between">
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
import { myBrowser } from "@/request/Browser";
import "../style/index.scss";
import {
  orgpage,
  orgtype,
  orgbatch,
  getSelectList,
  // getAllConfigUserList,
  getQuestionnaireFeedbackList,
  operateReview,
  answerDetailPageDelete,
  answerDetailPagePush
} from "@/request/api";
import { constants } from "fs";
import "../style/index.scss";
export default {
  name: "surveyList",
  components: {},
  data() {
    return {
      surveyDate: [],
      modalReview: false,
      pushData: {}, // 传到推送页面的值
      formInline: {
        OrganizationName: "",
        GroupAddress: "",
        head: "",
        classifications: ""
      },
      tableData: [],
      typelist: [],
      columns: [
        {
          title: "问卷名称",
          slot: "configName",
          align: "center",
        },
        {
          title: "开始时间",
          key: "startAt",
          align: "center"
        },
        {
          title: "结束时间",
          key: "endAt",
          align: "center"
        },
        {
          title: "审核状态",
          key: "auditFlag",
          align: "center"
        },
        {
          title: "问卷反馈明细",
          slot: "answerNum",
          align: "center",
        },
        {
          title: "问卷推送对象",
          slot: "sendNum",
          align: "center",
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width: "200px"
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
      isInit: true, // 默认是true,,点击查询之后被赋值为false
      options: ["options1", "options2", "options8"],
      sysType: "1", // 1 会员 2 志愿者
      typeFlag: "1", // 项目区分 1 问卷调查 2 反馈
      orgName: "",
      configStartTimestamp: "",
      configEndTimestamp: "",
      answerUserName: "",
      configName: "",
      orgName: "",
      address: "",
      ownerUserName: "",
      orgType: "",
      page: 1,
      size: 10,
      dataCount: 0,
      arr: [],
      status: false,
      Retract: true,
      type: "",
      userIds: [],
      arrs: [],
      types: "",
      configHeaderIds: "",
      optType: "",
      resResult: ""
    };
  },

  methods: {
    // 类型
    getorgtype() {
      orgtype({
        sysType: this.sysType
      }).then(res => {
        if (res.code == 200) {
          this.typelist = res.data;
        }
        console.log(res);
      });
    },
    // 标签分页
    getorgpage() {
      // this.page = index;
      console.log("isInit11", this.isInit);
      if (this.isInit) {
        getQuestionnaireFeedbackList({
          page: this.page,
          size: this.size,
          sysType: this.sysType,
          // 志愿者时查不到数据,强制查找会员
          // sysType: 1,
          typeFlag: this.typeFlag
          // configStartTimestamp: Number(this.surveyDate[0])
          // configStartTimestamp: 1578581322677
          // answerUserName: this.orgType,
        }).then(res => {
          if (res.code == 200) {
            this.dataCount = res.data.totalSize;
            this.tableData = res.data.list;
          }
          console.log("res", res);
        });
      } else {
        this.query();
      }
    },

    // 收起筛选
    Retractbtn() {
      this.Retract = !this.Retract;
    },
    // 查询结果
    query() {
      console.log("this.surveyDate[0]2121212)", this.surveyDate[0]);
      this.isInit = false;
      getQuestionnaireFeedbackList({
        page: this.page,
        size: this.size,
        // sysType: 1,
        sysType: this.sysType,
        typeFlag: this.typeFlag,
        configStartTimestamp: this.surveyDate[0]
          ? Number(this.surveyDate[0])
          : null,
        configEndTimestamp: this.surveyDate[1]
          ? Number(this.surveyDate[1])
          : null,

        answerUserName: this.answerUserName ? this.answerUserName : null,
        configName: this.configName ? this.configName : null
      }).then(res => {
        if (res.code == 200) {
          this.dataCount = res.data.totalSize;
          this.tableData = res.data.list;
        }
        console.log("res", res);
      });

      // console.log("query22222222surveyDate",this.surveyDate)
    },

    // 点击切换页码功能
    changepages(index) {
      this.page = index;
      // console.log("isInit", this.isInit);
      if (this.isInit) {
        this.getorgpage();
      } else {
        this.query();
      }
    },
    // 选择内容
    handleSelectionChange(val) {
      this.arrs = val;
      if (
        (val.length == this.dataCount && this.dataCount != 0) ||
        val.length == this.size
      ) {
        this.status = true;
      } else {
        this.status = false;
      }
      this.arr = val.map(item => {
        return item.orgId;
      });
      console.log(this.arr);
    },

    // 新增问卷调查
    createPaperResearch() {
      // 如果是会员
      if (this.sysType == "1") {
        this.$router.push({
          name: "memberAdd"
        });
      }

      // 如果是会员
      if (this.sysType == "2") {
        this.$router.push({
          name: "volunteerAdd"
        });
      }
    },

    handleChange(e) {
      // console.log('handle', e)
      // // this.survey.startAt = e[0]
      // // this.survey.endAt = e[1]
      // this.survey.startAt = '2020-01-01 00:00:00'
      // this.survey.endAt = '2020-01-12 23:59:59'
      // this.surveyDate = e
    },

    // 新建组织
    jump() {
      this.$router.push({ name: "newzuzihy", query: { sysId: this.sysType } });
    },
    // 审核,点击确认
    ok() {
      this.$Message.info("Clicked ok");
    },
    // 审核,点击取消
    cancel() {
      // this.$Message.info("Clicked cancel");
    },
    // 动态更新提示框的内容--该函数已作废
    // handleRender(param) {
    //   let status = "";
    //   if (param == "待审核") {
    //     status = "审核";
    //   } else if (param == "已审核") {
    //     status = "作废";
    //   } else if (param == "作废") {
    //     status = "无操作";
    //   }
    //   this.$Modal.confirm({
    //       title: '操作确认框',
    //       content: "是否确定"+status+"?",
    //       onOk: () => {
    //           // this.$Message.info('Clicked ok');
    //           this.operateReviewAction();
    //       },
    //       onCancel: () => {
    //           // this.$Message.info('Clicked cancel');
    //       }
    //   });
    // },

    handleRenderShenhe(item) {
      let param = item.auditFlag;
      // 非待审核状态就不可触发后续事件
      if (param != "待审核") {
        return;
      }
      this.optType = 1;
      this.configHeaderIds = item.configHeaderId;
      if (param == "待审核") {
        this.$Modal.confirm({
          title: "操作确认框",
          content: "是否确定通过审核?",
          onOk: () => {
            // this.$Message.info('Clicked ok');
            this.operateReviewAction(param);
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
      }
    },
    // 作废按钮的事件
    handleRenderZuofei(item) {
      let param = item.auditFlag;
      // 非待审核状态就不可触发后续事件
      if (param != "待审核") {
        return;
      }
      this.optType = 2;
      this.configHeaderIds = item.configHeaderId;
      if (param == "待审核") {
        this.$Modal.confirm({
          title: "操作确认框",
          content: "是否确定作废?",
          onOk: () => {
            // this.$Message.info('Clicked ok');
            this.operateReviewAction(param);
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
      }
    },
    // 删除按钮的事件
    handleRenderShanchu(item) {
      if (item.auditFlag != "待审核") {
        return;
      }
      this.configHeaderIds = item.configHeaderId;
      // if (param == '待审核') {
      this.$Modal.confirm({
        title: "操作确认框",
        content: "是否确定删除?",
        onOk: () => {
          // this.$Message.info('Clicked ok');
          this.operateShanchuAction();
        },
        onCancel: () => {
          // this.$Message.info('Clicked cancel');
        }
      });
      // }
    },

    // 提交审核或者作废
    operateReviewAction() {
      console.log("this.optType", this.optType, this.configHeaderIds);
      operateReview({
        configHeaderIds: this.configHeaderIds,
        optType: this.optType
      }).then(res => {
        if (res.code == 200) {
          let returnStatus = res.result;
          if (returnStatus == "success") {
            this.$Message.info("操作成功");

            // 更新页面
            if (this.isInit) {
              this.getorgpage();
            } else {
              this.query();
            }
          } else {
            this.$Message.info("操作失败");
          }
        }
        //  return "success"
      });
    },
    // 提交删除的动作
    operateShanchuAction() {
      console.log("this.configHeaderIds", this.optType, this.configHeaderIds);
      answerDetailPageDelete({
        configHeaderId: this.configHeaderIds
      }).then(res => {
        if (res.code == 200) {
          let returnStatus = res.result;
          if (returnStatus == "success") {
            this.$Message.info("操作成功");

            // 更新页面
            if (this.isInit) {
              this.getorgpage();
            } else {
              this.query();
            }
          } else {
            this.$Message.info("操作失败");
          }
        }
        //  return "success"
      });
    },
    // 提交推送的动作
    operatePushAction() {
      console.log(
        "this.configHeaderIds,,,this.sysType",
        this.optType,
        this.configHeaderIds,
        this.sysType
      );
      answerDetailPagePush({
        sysId: this.sysType,
        userIds: this.userIds.toString(),
        configHeaderId: this.configHeaderIds
      }).then(res => {
        if (res.code == 200) {
          let returnStatus = res.result;
          if (returnStatus == "success") {
            this.$Message.info("操作成功");
          } else {
            this.$Message.info("操作失败");
          }
        }
        //  return "success"
      });
    },
    // 关闭弹窗
    closeSubmitPushModal() {
      this.modalInsert = false;
    },
    // 问卷详情
    onShowSurveyDetail (configHeaderId) {
      let _detailPage = this.sysType == '1' ? 'memberView' : 'volunteerView';
      this.$router.push({
        name: _detailPage,
        // query: { configHeaderId: params.row.configHeaderId }
        query: {
          configHeaderId
        }
      });
    },
    // 反馈详情
    onGetFeedbackDetail(item){
      if(item.answerNum <=0){
        // 还没人答题，不跳转到反馈详情页
        return
      }
      // 如果是会员
      if (this.sysType == "1") {
        this.$router.push({
          name: "memberFeedbackList",
          query: {
            configHeaderId: item.configHeaderId,
            name: item.configName
          }
        });
      }
      // 如果是志愿者
      if (this.sysType == "2") {
        this.$router.push({
          name: "volunteerFeedbackList",
          // query: { configHeaderId: params.row.configHeaderId }
          query: {
            configHeaderId: item.configHeaderId,
            name: item.configName
          }
        });
      }
    },
    // 跳转到推送页面
    onJumpPush(item){
      let configHeaderId = item.configHeaderId;
      if(item.sendNum <=0){
        return
      }
      // 如果是会员
      if (this.sysType == "1") {
        this.$router.push({
          name: "memberListPushList",
          params: { configHeaderId }
        });
      }
      // 如果是志愿者
      if (this.sysType == "2") {
        this.$router.push({
          name: "volunteerListPushList",
          params: { configHeaderId}
        });
      }
    },
    // 编辑
    onEdit(item){
      // 非待审核状态就不可触发后续事件
      if (item.auditFlag != "待审核") {
        return;
      }

      // 如果是会员
      if (this.sysType == "1") {
        this.$router.push({
          name: "memberEdit",
          query: { configHeaderId: item.configHeaderId }
        });
      }

      // 如果是志愿者
      if (this.sysType == "2") {
        this.$router.push({
          name: "volunteerEdit",
          query: { configHeaderId: item.configHeaderId }
        });
      }
    },
    // 推送
    onPush(item){
      // 非已审核状态不触发后面的事件,,已审核时,可以点击推送到下一页
      if (item.auditFlag == "已审核") {
        // this.modalInsert = true
        // this.pushData = {
        //   configHeaderId: params.row.configHeaderId,
        //   sysId: this.sysType
        // };

        // 如果是会员
        if (this.sysType == "1") {
          this.$router.push({
            name: "memberListPush",
            query: { configHeaderId: item.configHeaderId }
          });
        }
        // 如果是志愿者
        if (this.sysType == "2") {
          this.$router.push({
            name: "volunteerListPush",
            query: { configHeaderId: item.configHeaderId }
          });
        }
      }
    }
  },

  // 事件监听
  watch: {
    size: "getorgpage",
    sort: "getorgpage"
  },
  props: ["navigation1"],
  mounted() {
    if (this.navigation1.id == "") {
      // 志愿者
      this.sysType = 2;
      this.getorgpage();
      this.getorgtype();
    } else if (this.navigation1.id == 100) {
      // 会员
      this.sysType = 1;
      this.getorgpage();
      this.getorgtype();
    }
    console.log("this.sysType", this.sysType);
  }
};
</script>
<style scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
  border: 1px solid #e4e4e4;
}
.basis {
  /* margin: 0.5rem; */
}
.content {
  margin-bottom: 0.5rem;
}
.bk {
  border: 1px solid #e4e4e4;
}
.bk-szy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
}
.bk-xia {
  border-bottom: 1px solid #e4e4e4;
}
.title {
  background-color: #f3f3f3;
  padding: 0.2rem 0.5rem;
}
.Pack,
.space {
  margin: 0 0.2rem;
}
.pages {
  margin: 0.5rem;
}
.ivu-form-item {
  margin-bottom: 0;
}
.con p:nth-child(1n + 2) {
  display: table;
  margin-bottom: 0.3rem;
}
.con p:nth-child(2) {
  border: 1px solid;
}
.con p:nth-child(3) span {
  border: 1px dashed;
  padding: 0.1rem;
  margin-right: 0.2rem;
}
.con p:nth-last-child(1) {
  background-color: #f2f2f2;
  padding: 0.2rem;
}
.forms {
  margin: 20px 0;
  display: flex;
}
.forms {
  width: 80px;
}
.ivu-form-item-content {
  margin-left: 80px;
}
.sai {
  color: black;
}
</style>
