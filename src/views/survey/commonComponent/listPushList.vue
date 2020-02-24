<!--组织列表共用-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <!-- 展示数据区 -->
    <div class="dataListBox basis">
      <div class>
        <div class="table-header flex-between">
          <p>
            <Icon type="ios-list"/>
            <span>数据列表</span>
          </p>
          <div class="increaseButtonBox">
            <!-- <button onClick="operatePushAction">新增</button> -->
            <Button @click="handleRenderPush" style="line-height:1;">添加</Button>
            <!-- <Button @click="back" style="line-height:1;">返回</Button> -->
          </div>
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
          ></Table>
        </div>
        <div class="pages flex-center-between">
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
import { myBrowser } from "@/request/Browser";
import {
  orgpage,
  orgtype,
  orgbatch,
  getSelectList,
  getAllConfigUserList,
  getQuestionnaireFeedbackList,
  operateReview,
  answerDetailPageDelete,
  answerDetailPagePush,
  getCofigUserList
} from "@/request/api";
import { constants } from "fs";
export default {
  components: {},
  data() {
    return {
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
      columns: [
        {
          title: "姓名",
          key: "userName",
          align: "center"
        },
        {
          title: "账号",
          key: "loginName",
          align: "center"
        },
        {
          title: "用户类型",
          key: "roles",
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
      resResult: ""
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
          configHeaderId: this.$route.params.configHeaderId
        };
        for (let i in oldSubmkitData) {
          if (oldSubmkitData[i]) {
            submitData[i] = oldSubmkitData[i];
          }
        }
        console.log("obj", submitData);
        // 最后调用接口，传入的参数是obj
        getCofigUserList(submitData).then(res => {
          if (res.code == 200) {
            this.dataCount = res.data.totalSize;
            this.data = res.data.list;
          }
          console.log("res", res);
        });
      } else {
        this.query();
      }
    },
    // 初始化问卷调查搜索栏
    getSelectList() {
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
          console.log(
            "getSelectList",
            this.modelSelect5List,
            this.modelSelect3List
          );
        }
      });
    },
    // 收起筛选
    Retractbtn() {
      this.Retract = !this.Retract;
      console.log(11);
    },
    // 查询结果
    query() {
      this.isInit = false;

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
        actNum:
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
      console.log("obj", submitData);
      // 最后调用接口，传入的参数是obj
      getAllConfigUserList(submitData).then(res => {
        if (res.code == 200) {
          this.dataCount = res.data.totalSize;
          this.data = res.data.list;
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
      // 如果是会员
      if (this.sysType == "1") {
        this.$router.push({
          name: "memberListPush",
          params: { configHeaderId: this.$route.params.configHeaderId }
        });
      }
      // 如果是志愿者
      if (this.sysType == "2") {
        this.$router.push({
          name: "volunteerListPush",
          params: { configHeaderId: this.$route.params.configHeaderId }
        });
      }
    },

// 返回上一个页面
        back() {
      this.$router.go(-1); //返回上一层
    }
  },

  // 事件监听
  watch: {
    // size: 'getorgpage',
    // sort: 'getorgpage',
    // 'pushData.sysType': function (newVal, oldVal) {
    //   // this.sysType = this.pushData.sysId
    //   console.log('this.sysType', this.sysType, newVal, oldVal)
    // }
  },
  mounted() {
    // console.log("pushData",this.pushData)
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
  text-align: right;
}
</style>
