<!--组织列表共用-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>

    <div class="top flex-center-start btn-wrapper">
      <div class="btn-box">
        <span class="label">反馈人:</span>
        <Input v-model="answerUserName" size="small" placeholder="反馈人"/>
      </div>
      <div class="btn-box">
        <span class="label">反馈人:</span>
        <DatePicker
          type="datetimerange"
          v-model="surveyDate"
          @on-change="handleChange"
          placement="bottom-end"
          placeholder="反馈时间"
          format="yyyy-MM-dd HH:mm:ss"
        ></DatePicker>      
      </div>
      <Button @click="query" shape="circle" size='large' class="search" style="margin-left:10px;">查询</Button>
    </div>

    <div class="basis">
      <div class>
        <div class="table-header flex-between">
          <p>
            <Icon type="ios-list"/>
            <span>数据列表</span>
          </p>
        </div>
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
    <Modal v-model="modalReview" title="反馈详情">
      <span class="answer-title">{{configName}}</span>
      <div v-for="(item,index) in answerDetailMyList" :key="index" class="answer-item">
        <div :class="['item-title',item.isMust?'must':'unMust']">{{index+1}} &nbsp;{{item.configTitle}}</div>
        <!-- 单行文本 -->
        <div v-if="item.typeFlag==1">
          <!-- !!!!!!!!!!!!!需要做保护处理,此处的item.answer.answer可能为 null 第二页的第二个-->
          <div>
            <template v-if="item.answer && item.answer.answer">
              <Input class="item-input" placeholder="请输入" 
                    v-model="item.answer.answer" readonly/>
            </template>
            <template v-else>
              <span class="empty-text">未作答</span>
            </template>
            
          </div>

        </div>
        <!-- 图片 -->
        <div v-else-if="item.typeFlag==2">
          <div v-if="item.answer">
              <span v-if="item.answer.picPath" class="item-img">
                <img :src="item.answer.picPath" alt class="imgClass">
              </span>
          </div>
          <template v-else>
            <span class="empty-text">未作答</span>
          </template>
        </div>
        <!-- 单选问题 -->
        <div v-else-if="item.typeFlag==3">
          <div v-if="item.answer && item.answer.answer">
            <RadioGroup v-model="item.answer.answer || ''">
              <Radio v-for="(optionsItem, index ) in item.select" :label="optionsItem.scontent" :key="index">
              </Radio>
            </RadioGroup>
          </div>
          <template v-else>
            <span class="empty-text">未作答</span>
          </template>
        </div>
        <div v-else-if="item.typeFlag==4">
          <div>
            <template v-if="item.answer && item.answer.answer">
            <CheckboxGroup 
              :value="item.answer.answer.split(',')" >
              <Checkbox v-for="(optionsItem,index) in item.select" :label="optionsItem.scontent" :key='index'>
              </Checkbox>
            </CheckboxGroup>
            </template>
            <template v-else>
              <span class="empty-text">未作答</span>
            </template>
          </div>
        </div>
        <!-- 多行文本 -->
        <div v-else-if="item.typeFlag==6">
          <div v-if="item.answer">                 
             <Input type="textarea" class="item-textarea" placeholder="请输入" 
              style="width: 300px;height:40px;" :value="item.answer.answer || ''" readonly/>
          </div>
          <template v-else>
              <span class="empty-text">未作答</span>
            </template>
        </div>
        <!-- 图文编辑框 -->
        <div v-else-if="item.typeFlag==10">
          <div v-if="item.answer">
            <wangeditor
              id="exccccc3"
              :labels="item.answer.answer||''"
            ></wangeditor>
          </div>
          <template v-else>
            <span class="empty-text">未作答</span>
          </template>
        </div>
        </div>
      <!-- 自定义页脚 -->
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import wangeditor from "@/components/wangeditor";
import { myBrowser } from "@/request/Browser";
import '../style/index.scss';
import {
  orgpage,
  orgtype,
  orgbatch,
  getSelectList,
  getAllConfigUserList,
  getQuestionnaireFeedbackList,
  operateReview,
  answerDetailPage,
  answerDetail
} from "@/request/api";
import { constants } from "fs";
export default {
  filters:{
 toMyArray(input) { //这里的this 是window  input是指 | 符号之前的数据 param1 是参数，可以用更多的参数                                
                    return input.split(',');
                }
  },
  data() {
    return {
      surveyDate: [],
      modalReview: false,
      answerDetailMyList: [],
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
          title: "反馈人",
          key: "userName",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {
                on: {
                  click: () => {
                    // console.log("this is userId",params.row.userId)
                    this.userId = params.row.userId;
                    this.handleRender();
                  }
                }
              },
              params.row.userName
            );
          }
        },
        {
          title: "手机号码",
          key: "tel",
          align: "center"
        },
        {
          title: "反馈时间",
          key: "answerTime",
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
      isInit: true, //默认是true,,点击查询之后被赋值为false
      options: ["options1", "options2", "options8"],
      sysType: "1", // 1 会员 2 志愿者
      typeFlag: "2", //项目区分 1 问卷调查 2 反馈
      orgName: "",
      configStartTimestamp: "",
      configEndTimestamp: "",
      answerUserName: "",
      configName: this.$route.query.name,
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
      userId: 1,
      arrs: [],
      types: "",
      // configHeaderIds:"",
      // configHeaderId:19,
      configHeaderId: this.$route.query.configHeaderId,
      optType: "",
      resResult: "",
      answerTime: "",
      tel: "",
      userName: "",
      userId: "",
      commitStarttime: "",
      commitEndtime: "",
      answerUserName: ""
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
      // 如果是第一次加载,开始时间为
      // this.page = index;
      // console.log(
      //   "isInit",
      //   this.isInit,
      //   "configHeaderId",
      //   this.configHeaderId
      // );
      if (this.isInit) {
        answerDetailPage({
          page: this.page,
          size: this.size,
          sysType: this.sysType,
          typeFlag: this.typeFlag,
          configHeaderId: this.configHeaderId
          // configHeaderId: 2 //为了调试
        }).then(res => {
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

    // 查询结果
    query() {
      // console.log("this.surveyDate[0])", this.surveyDate,Number(this.surveyDate[0]),Number(this.surveyDate[1]));
      // console.log("this.surveyDate[0])2121", this.surveyDate,this.surveyDate[0].getTime(),this.surveyDate[1].getTime());
      // console.log("this.surveyDate[0])3333333333", Date.parse(this.surveyDate[0]));
      this.isInit = false;

      let submitData = {};
      let oldSubmkitData = {
        page: this.page,
        size: this.size,
        sysType: this.sysType,
        typeFlag: this.typeFlag,
        configHeaderId: this.configHeaderId,
        // commitStarttime: "1578798251",
        // commitEndtime: "1579086251",
        // commitStarttime: Date.parse(this.surveyDate[0]),
        // commitEndtime: Date.parse(this.surveyDate[1]),
        // answerUserName: this.answerUserName
        // 可选项
        answerUserName:this.answerUserName,//反馈人
      };
      for (let i in oldSubmkitData) {
        if (oldSubmkitData[i]) {
          submitData[i] = oldSubmkitData[i];
        }
      }

      answerDetailPage(submitData).then(res => {
        if (res.code == 200) {
          this.dataCount = res.data.totalSize;
          this.data = res.data.list;
        } else {
          // this.$Message.warn("查询失败");
          this.$Message.info("查询失败");
        }
        console.log("res", res);
      });
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

    handleChange(e) {},

    // 审核,点击确认
    ok() {
      this.$Message.info("Clicked ok");
    },
    // 审核,点击取消
    cancel() {
      // this.$Message.info("Clicked cancel");
    },
    handleRender(param) {
      this.modalReview = true;
      // 获取该用户对应的反馈数据
      answerDetail({
        // configHeaderId: this.configHeaderId,
        configHeaderId: this.configHeaderId,
        // configHeaderId: 2,//调试用!!!!
        userId: this.userId
      }).then(res => {
        if (res.code == 200 && res.data) {
          // this.dataCount = res.data.totalSize;
          // this.data = res.data.list;
          this.answerDetailMyList = res.data.line;
        }
        console.log("res", res);
        // 根据获取的值,渲染该弹窗里的内容,,先标题,再循环加问卷的选项
        // var modalContent='';
        // var modalContentTemp='';
        // if(res.data.line.length){
        //   for(var i=0;i<res.data.line.length;i++){
        //     // 根据类型进行处理
        //       // { name: '单行文本', typeFlag: 1 },
        //       // { name: '多行文本', typeFlag: 6 },
        //       // { name: '单选问题', typeFlag: 3 },
        //       // { name: '多选问题', typeFlag: 4 },
        //       // { name: '图片', typeFlag: 2 },
        //       // { name: '图文编辑框', typeFlag: 10 }
        //     if(res.data.line.typeFlag==1){
        //       // 单行文本
        //       // modalContentTemp=
        //     }

        //   }
        // }

        // 将结果加入弹窗页面
      });
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

/* 图片样式 */
.imgClass {
  width: 100%;
  height: 100%;
}

.imgBox >>> img {
  width: 100%;
  height: 100%;
}
</style>
