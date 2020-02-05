<!--志愿者活动发布（志愿者）-->
<template>
  <div>
    <Navigation :labels="navigation"></Navigation>

    <div class="top flex-center-start btn-wrapper">
      <p class="btn-box">
        <span>问卷调查内容</span>
      </p>
    </div>
    <div class="basis" style="padding-top:0;">
      <div class="publish-content">
        <div class="active-publish">
          <ul>
            <li class="list-item inline-item view-list">
              <span class="form-item-label">问卷名称</span>
              <span>{{survey.configName}}</span>
            </li>
            <li class="list-item inline-item view-list">
              <span class="form-item-label">反馈时间</span>
              <span>{{surveyDate}}</span>
            </li>
            <li class="list-item inline-item view-list">
              <span class="form-item-label none-required">问卷简介</span>
              <span>{{survey.configDetail||'-'}}</span>
            </li>
            <li class="list-item table-title-item">
              <!-- <span class="form-item-label">问卷内容</span> -->
              <p>
                <Icon type="ios-list"/>
                <span>题目列表</span>
              </p>
            </li>
          </ul>

          <div class="list-item table-item">
            <Table
              ref="selection"
              border
              :columns="columns"
              :data="surveyDataList"
              class="survey-table"
            >
              <template slot-scope="{ row }" slot="configTitle">
                <strong>{{ row.configTitle }}</strong>
              </template>
              <template slot-scope="{ row }" slot="typeFlag">
                <strong>{{ row.typeFlag|typeFormat }}</strong>
              </template>
              <template slot-scope="{ row }" slot="configSelectList">
                <strong
                  v-if="Array.isArray(row.configSelectList)"
                >{{ row.configSelectList | selectFormats }}</strong>
              </template>
              <template slot-scope="{ row }" slot="defaultValue">
                <!-- <template v-if="row.typeFlag == 3">
                    <Select v-model="formData.defaultValue">
                      <Option :value="item.typeFlag" v-for="item in typeList">
                        {{item.name}}
                      </Option>
                    </Select>
                  </template>
                  <template v-if="row.typeFlag == 4">
                    <Select v-model="formData.multipleValue" multiple>
                      <Option :value="item.typeFlag" v-for="item in typeList">
                        {{item.name}}
                      </Option>
                    </Select>
                </template>-->
                <strong>{{ row.defaultValue }}</strong>
              </template>
              <template slot-scope="{ row }" slot="isOpt">
                <strong>{{ row.isOpt|editableText }}</strong>
              </template>
              <template slot-scope="{ row }" slot="isMust">
                <strong>{{ row.isMust|requiredText }}</strong>
              </template>
              <template slot-scope="{ row }" slot="sort">
                <strong>{{ row.sort }}</strong>
              </template>
            </Table>
          </div>
        </div>
      </div>
      <div class="active-details" style="padding:20px;text-align:center">
        <div class="active-pud">
          <div class="btns">
            <Button @click="preview" class="btn-preview">预览</Button>
          </div>
        </div>
      </div>
    </div>

    <!-- 预览 start -->
    <div class="preview-wrap" v-if="previewStatus">
      <div class="preview-mask" @click="previewStatus = false"></div>
      <div class="preview-container preview-modal">
        <div class="preview-content">
          <div class="survey-content">
            <preview-survey ref="listPushRef" :surveyData="survey" :showStatus="previewStatus"></preview-survey>
          </div>
        </div>
      </div>
    </div>
    <!-- 预览 end -->
  </div>
</template>

<script>
import { addSurvey, surveyDetail, editSurvey } from "@/request/api";
import { upload } from "@/request/http";
import draggable from "vuedraggable";

import "@/libs/survey.scss";
import "@/views/survey/style/index.scss";
import previewSurvey from "./preview";
export default {
  name: "surveyEdit",
  components: { draggable, previewSurvey },
  props: {
    pageFlag: {
      default: "新增",
      type: String
    },
    sysTypeText: {
      default: "会员",
      type: String
    },
    configHeaderId: Number,
    navigation: Object
  },
  data() {
    return {
      // 问卷题目表格表头
      columns: [
        {
          title: "标题",
          slot: "configTitle",
          width: 240
        },
        {
          title: "类型",
          slot: "typeFlag",
          width: 100
        },
        {
          title: "枚举值",
          slot: "configSelectList",
          width: 200
        },
        {
          title: "默认值",
          slot: "defaultValue",
          width: 200
        },
        {
          title: "是否可编辑",
          slot: "isOpt",
          align: "center",
          width: 100
        },
        {
          title: "是否必填",
          slot: "isMust",
          align: "center",
          width: 80
        },
        {
          title: "排序",
          slot: "sort",
          align: "center",
          width: 80
        },
      ],
      // 问卷题目数据
      surveyDataList: [],
      // 问卷题目form数据
      formData: {
        typeFlag: "",
        configTitle: "",
        defaultValue: "",
        isOpt: "",
        isMust: "",
        ruleType: "",
        configSelectList: [{}, {}]
      },
      ruleValidate: {
        configTitle: [
          { required: true, message: "标题不可为空", trigger: "blur" }
        ],
        typeFlag: [
          {
            required: true,
            type: "string",
            message: "类型不可为空",
            trigger: "blur"
          }
        ],
        configSelectList: [{ required: true, type: "array", trigger: "blur" }],
        isOpt: [
          {
            required: true,
            type: "string",
            message: "请选择可编辑状态",
            trigger: "blur"
          }
        ],
        isMust: [
          {
            required: true,
            type: "string",
            message: "请选择是否必填",
            trigger: "blur"
          }
        ]
      },
      typeList: [
        { name: "单行文本", typeFlag: "1" },
        { name: "多行文本", typeFlag: "6" },
        { name: "单选问题", typeFlag: "3" },
        { name: "多选问题", typeFlag: "4" },
        { name: "图片", typeFlag: "2" },
        { name: "图文编辑框", typeFlag: "10" }
      ],
      ruleList: [
        { type: 1, name: "数字" },
        { type: 2, name: "中文" },
        { type: 3, name: "手机" },
        { type: 4, name: "身份证号" },
        { type: 5, name: "地址/省市区" },
        { type: 6, name: "城市" },
        { type: 7, name: "日期" }
      ],

      surveyDate: '',
      adr: false,
      survey: {
        sysId: 1,
        typeFlag: 1,
        configName: "",
        configDetail: "",
        startAt: "",
        endAt: "",
        configLineList: []
      },
      enabled: true,
      dragging: false,
      previewStatus: false // false 预览画面不可见
    };
  },
  mounted() {

    // 更改data里的值
    if (this.navigation.id == "") {
      // 志愿者
      this.survey.sysId = 2;
    } else if (this.navigation.id == 100) {
      // 会员
      this.survey.sysId= 1;
    }
    // this.navigation.head =
    //   this.pageFlag + "问卷调查（" + this.sysTypeText + ")";

    this.getSurveyDetail();
  },
  methods: {
    // 预览
    preview() {
      if (!this.survey.configName) {
        this.$Message.error("问卷名称不为空");
        return;
      }
      if (!this.survey.startAt) {
        this.$Message.error("请选择反馈时间");
        return;
      }
      this.survey.configLineList = this.surveyDataList;
      if (this.survey.configLineList.length === 0) {
        this.$Message.error("问卷题目不少于一条");
        return;
      }
      this.previewStatus = true;
    },
    // 问卷详情
    getSurveyDetail () {
      if (!this.configHeaderId) {
        // 新增页面 不需要获取问卷详情
        return;
      }
      surveyDetail({
        configHeaderId: this.configHeaderId
      })
        .then(res => {
          console.log("re1s", res.data);
          if (res.code == 200) {
            this.survey = Object.assign({}, this.survey, res.data);
            this.survey.endAt = res.data.EndAt;
            this.surveyDataList = res.data.configLineList;
            this.surveyDate = (res.data.startAt + " 至 " + res.data.EndAt);
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  },
  filters: {
    typeFormat: function(val) {
      let typeObj = {
        1: "单行文本",
        6: "多行文本",
        3: "单选问题",
        4: "多选问题",
        2: "图片",
        10: "图文编辑器"
      };
      return typeObj[val];
    },
    requiredText: function(val) {
      return val == 1 ? "必填" : "选填";
    },
    editableText: function(val) {
      return val == 1 ? "可以" : "不可以";
    },
    selectFormats: function(val) {
      let scontList = val.filter(item => item && item.scontent);
      if (scontList.length > 0) {
        return scontList.map(item => item.scontent).join(",");
      } else {
        return "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  .content-head {
    height: 50px;
    background: #e4e4e4;
    line-height: 50px;
    span {
      margin: 0 10px;
    }
    button {
      border: 1px solid black;
      margin-left: 10px;
    }
  }
}
.publish-content .active-publish ul li.view-list{
  margin-top: .6rem;
  margin-bottom: 0;
}
</style>
