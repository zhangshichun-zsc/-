<!--组织列表共用-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <!-- <div class="closeButtonBox"> -->
    <!-- <button onClick="operatePushAction">新增</button> -->
    <!-- <Button class="button" size="large" @click="back">X</Button> -->
    <!-- </div> -->
    <!-- 筛选条件栏 -->
    <div class="top flex-center-start btn-wrapper">
      <div class="btn-box">
        <label class>最近参与活动:</label>
        <Select v-model="modelSelect1">
          <!-- <Select v-model="modelSelect1" @on-change="query()"> -->
          <Option
            v-for="item in modelSelect1List"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
      <div class="btn-box">
        <label class>活动次数:</label>
        <Select v-model="modelSelect2">
          <!-- <Select v-model="modelSelect2" @on-change="query()"> -->
          <Option
            v-for="item in modelSelect2List"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
      <div class="btn-box">
        <label class>关注类型:</label>
        <Select v-model="modelSelect3">
          <!-- <Select v-model="modelSelect3" @on-change="query()"> -->
          <Option
            v-for="item in modelSelect3List"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
      <!-- 会员有用户类型,志愿者没有 -->
      <div v-if="this.sysType=='1'" class="btn-box">
        <label class>用户类型:</label>
        <Select v-model="modelSelect4">
          <!-- <Select v-model="modelSelect4" @on-change="query()"> -->
          <Option
            v-for="item in modelSelect4List"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
      <div class="btn-box">
        <label class>等级:</label>
        <Select v-model="modelSelect5">
          <!-- <Select v-model="modelSelect5" @on-change="query()"> -->
          <Option
            v-for="item in modelSelect5List"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
      <Button @click="query" shape="circle" size="large" class="search" style="margin-left:10px;">查询</Button>
<!-- <Button @click="back" shape="circle" size="large" class="search" style="margin-left:10px;">返回</Button> -->

      <!-- <span>
        <label class>用户标签:&nbsp;</label>
        <Select v-model="modelSelect6" style="width:200px">
          <Option
            v-for="item in modelSelect6List"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </span>-->
    </div>

    <!-- 展示数据区 -->
    <div class="dataListBox basis">
      <div class>
        <div class="table-header flex-between">
          <p>
            <Icon type="ios-list"/>
            <span>数据列表</span>
          </p>
          <!-- <p>
            <Button @click="chackall()" style="border:0px;">
              <Checkbox v-model="status">全选</Checkbox>
            </Button>     @on-selection-change="handleSelectionChange"
          </p>-->
        </div>
        <div>
          <Table
            ref="selection"
            border
            :columns="columns"
            :data="data"
            @on-selection-change="handleSelectionChange"
            :loading="loading"
          ></Table>
        </div>
        <div class="pages flex-center-between">
          <Page
          :current.sync='page'
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
    <div class="increaseButtonBox">
      <!-- <button onClick="operatePushAction">新增</button> -->
      <Button class="button" size="large" @click="handleRenderPush">推送</Button>
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
  getVolActType,
  getAllConfigUserList,
  getVolConfigUserList,
  getQuestionnaireFeedbackList,
  operateReview,
  answerDetailPageDelete,
  answerDetailPagePush
} from "@/request/api";
import { constants } from "fs";
export default {
  components: {},
  data() {
    return {
      modelSelect1: "",
      modelSelect2: "",
      modelSelect3: "",
      modelSelect4: "",
      modelSelect5: "",
      modelSelect6: "",
      // 最近参与活动
      modelSelect1List: [
        {
          value: 0,
          label: "不限"
        },
        {
          value: 7,
          label: "1周内"
        },
        {
          value: 14,
          label: "2周内"
        },
        {
          value: 30,
          label: "1个月内"
        },
        {
          value: 60,
          label: "2个月内"
        }
      ],
      // 活动次数
      modelSelect2List: [
        {
          value: 0,
          label: "不限"
        },
        {
          value: 1,
          label: "1次+"
        },
        {
          value: 2,
          label: "2次+"
        },
        {
          value: 3,
          label: "3次+"
        },
        {
          value: 4,
          label: "4次+"
        },
        {
          value: 10,
          label: "10次+"
        },
        {
          value: 20,
          label: "20次+"
        },
        {
          value: 30,
          label: "30次+"
        }
      ],
      // 关注类型
      modelSelect3List: [],
      // 用户类型
      modelSelect4List: [
        {
          value: 0,
          label: "不限"
        },
        {
          value: 1,
          label: "受益方"
        },
        {
          value: 2,
          label: "志愿者"
        }
      ],
      // 等级
      modelSelect5List: [],

      surveyDate: [],
      modalReview: false,
      modalInsert: true,
      formInline: {
        OrganizationName: "",
        GroupAddress: "",
        head: "",
        classifications: ""
      },
      data: [],
      typelist: [],
      columnsMember: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户账号",
          key: "loginName",
          align: "center"
        },
        {
          title: "会员等级",
          key: "mlevelName",
          align: "center"
        },
        {
          title: "服务时长",
          key: "allDuration",
          align: "center"
        },
        {
          title: "活动次数",
          key: "num",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: "200px",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  className: "action",
                  style: {
                    marginLeft: "5px",
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      columnsVolunteer: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户账号",
          key: "loginName",
          align: "center"
        },
        {
          title: "等级",
          key: "vlevelName",
          align: "center"
        },
        {
          title: "服务时长",
          key: "allDuration",
          align: "center"
        },
        {
          title: "活动次数",
          key: "num",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: "200px",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  className: "action",
                  style: {
                    marginLeft: "5px",
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      columns: [],

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
      // sysType:pushData.sysType,
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
      // configHeaderIds: '',
      optType: "",
      resResult: "",
      loading:false,    // true table数据正在加载
    };
  },

  props: {
    sysId: String,
    configHeaderId: "",
    navigation1: Object
  },

  methods: {
    // 类型
    getorgtype() {
      orgtype({
        // sysType: this.sysType
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
      console.log("isInit", this.isInit);
      if (this.isInit) {
        let submitData = {};
        let oldSubmkitData = {
          page: {
            page: this.page,
            size: this.size
          },
          days:
            (this.modelSelect1 == 0 || this.modelSelect1) == null
              ? null
              : this.modelSelect1,
          act0Num:
            (this.modelSelect2 == 0 || this.modelSelect2) == null
              ? null
              : this.modelSelect2,
          categotyId:
            (this.modelSelect3 == 0 || this.modelSelect3) == null
              ? null
              : this.modelSelect3,
          roleId:
            (this.modelSelect4 == 0 || this.modelSelect4) == null
              ? null
              : this.modelSelect4,
          levelCode:
            (this.modelSelect5 == 0 || this.modelSelect5) == null
              ? null
              : this.modelSelect5
        };
        for (let i in oldSubmkitData) {
          if (oldSubmkitData[i]) {
            submitData[i] = oldSubmkitData[i];
          }
        }
        console.log("obj,,this.sysType", submitData, this.sysType);
        // 最后调用接口，传入的参数是obj

        let getPushDataFunc = this.sysType == "1" ? getAllConfigUserList : getVolConfigUserList;
        this.loading = true;
        getPushDataFunc(submitData).then(res => {
          this.loading = false;
            if (res.code == 200) {
              this.dataCount = res.data.totalSize;
              this.data = res.data.list;
            }
            console.log("res", res);
          }).catch(err=>{
            this.loading = false;
          });
      } else {
        this.query();
      }
    },

    // 初始化问卷调查搜索栏
    getSelectList() {
      // 如果是会员
      if (this.sysType == "1") {
        getSelectList({}).then(res => {
          if (res.code == 200) {
            console.log("res", res);
            var temp1 = {
              value: 0,
              label: "不限"
            };
            // 处理LevelList
            var theLevelList = res.data.theLevelList;
            this.modelSelect5List = [];
            this.modelSelect5List.push(temp1);
            // 处理categoryList
            var categoryList = res.data.categoryList;
            this.modelSelect3List = [];
            this.modelSelect3List.push(temp1);

            for (var i = 0; i < theLevelList.length; i++) {
              (temp1 = {
                value: theLevelList[i].levelCode,
                label: theLevelList[i].levelName
              }),
                this.modelSelect5List.push(temp1);
            }

            for (var i = 0; i < categoryList.length; i++) {
              (temp1 = {
                value: categoryList[i].categoryId,
                label: categoryList[i].name
              }),
                this.modelSelect3List.push(temp1);
            }
            // console.log('getSelectList', this.modelSelect5List, this.modelSelect3List)
          }
        });
      }

      // 如果是志愿者
      if (this.sysType == "2") {
        getVolActType({}).then(res => {
          if (res.code == 200) {
            console.log("志愿者res", res);
            var temp1 = {
              value: 0,
              label: "不限"
            };
            // 处理LevelList,,志愿者等级
            var theLevelList = res.data.theLevelList;
            this.modelSelect5List = [];
            this.modelSelect5List.push(temp1);
            // 处理categoryList,,,关注类型
            var categoryList = res.data.volActType;
            this.modelSelect3List = [];
            this.modelSelect3List.push(temp1);

            for (var i = 0; i < theLevelList.length; i++) {
              (temp1 = {
                value: theLevelList[i].levelCode,
                label: theLevelList[i].levelName
              }),
                this.modelSelect5List.push(temp1);
            }

            for (var i = 0; i < categoryList.length; i++) {
              (temp1 = {
                value: categoryList[i].dicId,
                label: categoryList[i].dicName
              }),
                this.modelSelect3List.push(temp1);
            }
            // console.log('getSelectList', this.modelSelect5List, this.modelSelect3List)
          }
        });
      }
    },
    // 收起筛选
    Retractbtn() {
      this.Retract = !this.Retract;
      console.log(11);
    },
    // 查询结果
    query() {
      this.isInit = false;

      let submitData_member = {};
      let submitData_volunteer = {};

      // 最后调用接口，传入的参数是obj
      // 如果是会员
      if (this.sysType == "1") {
        let oldSubmkitData_member = {
          page: {
            page: this.page,
            size: this.size
          },
          days:
            (this.modelSelect1 == 0 || this.modelSelect1) == null
              ? null
              : this.modelSelect1,
          act0Num:
            (this.modelSelect2 == 0 || this.modelSelect2) == null
              ? null
              : this.modelSelect2,
          categotyId:
            (this.modelSelect3 == 0 || this.modelSelect3) == null
              ? null
              : this.modelSelect3,
          roleId:
            (this.modelSelect4 == 0 || this.modelSelect4) == null
              ? null
              : this.modelSelect4,
          levelCode:
            (this.modelSelect5 == 0 || this.modelSelect5) == null
              ? null
              : this.modelSelect5
        };
        // console.log("ddddddddddddoldSubmkitData",oldSubmkitData)
        for (let i in oldSubmkitData_member) {
          if (oldSubmkitData_member[i]) {
            submitData_member[i] = oldSubmkitData_member[i];
          }
          // console.log("i in oldSubmkitData",i,oldSubmkitData_member[i])
        }
        console.log("obj,,this.sysType", submitData_member, this.sysType);
        this.loading = true;
        getAllConfigUserList(submitData_member).then(res => {
          this.loading = false;
          if (res.code == 200) {
            this.dataCount = res.data.totalSize;
            this.data = res.data.list;
          }
          console.log("res", res);
        }).catch(err=>{
          this.loading = false
        });
      }

      // 如果是志愿者
      if (this.sysType == "2") {
        let oldSubmkitData_volunteer = {
          page: {
            page: this.page,
            size: this.size
          },
          days:
            (this.modelSelect1 == 0 || this.modelSelect1) == null
              ? null
              : this.modelSelect1,
          actNum:
            (this.modelSelect2 == 0 || this.modelSelect2) == null
              ? null
              : this.modelSelect2,
          volActType:
            (this.modelSelect3 == 0 || this.modelSelect3) == null
              ? null
              : this.modelSelect3,

          levelCode:
            (this.modelSelect5 == 0 || this.modelSelect5) == null
              ? null
              : this.modelSelect5
        };
                console.log("ddddddddddddoldSubmkitData",oldSubmkitData_volunteer)
        for (let i in oldSubmkitData_volunteer) {
          if (oldSubmkitData_volunteer[i]) {
            submitData_volunteer[i] = oldSubmkitData_volunteer[i];
          }
        }
        this.loading = true;
        getVolConfigUserList(submitData_volunteer).then(res => {
          this.loading = false;
          if (res.code == 200) {
            this.dataCount = res.data.totalSize;
            this.data = res.data.list;
          }
          console.log("res", res);
        }).catch(err=>{
          this.loading = false;
        });
      }
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
      // console.log(val,"val")
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
      console.log("this.arrs", this.arrs);
    },

    handleRenderPush(param) {
      console.log("this.arrs",this.arrs.length,this.arrs);
      if(this.arrs ==0){
        this.$Message.info('请勾选要推送的用户');
        return 
      }
      this.arrs
      var _this = this;
      this.$Modal.confirm({
        title: "操作确认框",
        content: "是否确定推送?",
        onOk: () => {
          this.userIds = [];
          for (var item in this.arrs) {
            this.userIds.push(this.arrs[item].userId);
          }
          this.operatePushAction();
          
        },
        onCancel: () => {
          // this.$Message.info('Clicked cancel');
        }
      });
      // }
    },

    // 提交推送的动作
    operatePushAction() {
      // console.log("this.configHeaderIds-xxxx---",this.sysType,this.pushData.sysId, this.userIds.toString(), this.pushData.configHeaderId);
      console.log(
        "operatePushAction-xxxx---",
        this.sysType,
        this.$route.query.configHeaderId,
        this.userIds.toString()
      );
      answerDetailPagePush({
        sysId: this.sysType,
        userIds: this.userIds.toString(),
        // userIds: 1622,
        configHeaderId: this.$route.query.configHeaderId
      }).then(res => {
        if (res.code == 200) {
          let returnStatus = res.result;
          if (returnStatus == "success") {
            this.$Message.info("操作成功");
            this.back();
          } else {
            this.$Message.info("操作失败");
          }
        }
        //  return "success"
      });
    },

    back() {
      this.$router.go(-1); //返回上一层
    }
  },

  // 事件监听
  watch: {},
  mounted() {
    // console.log("pushData",this.pushData)
    if (this.navigation1.id == "") {
      // 志愿者
      this.sysType = 2;
      this.getorgpage();
      this.getorgtype();

      this.columns = this.columnsVolunteer;
    } else if (this.navigation1.id == 100) {
      // 会员
      this.sysType = 1;
      this.getorgpage();
      this.getorgtype();

      this.columns = this.columnsMember;
    }
    // 更新列表
    this.getSelectList();

    // this.sysType = this.pushData.sysId
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
  margin: 0.5rem;
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
.filterBox {
  margin: 10px;
}
.filterBox span {
  margin-right: 10px;
}
.dataListBox {
  margin: 10px 0;
}
.increaseButtonBox {
  text-align: center;
}

.closeButtonBox {
  text-align: right;
}
</style>
