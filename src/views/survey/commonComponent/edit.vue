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
            <li class="list-item inline-item">
              <span class="form-item-label">问卷名称</span>
              <Input v-model="survey.configName"/>
            </li>
            <li class="list-item inline-item">
              <span class="form-item-label">反馈时间</span>
              <DatePicker
                type="daterange"
                v-model="surveyDate"
                @on-change="handleChange"
                placement="bottom-end"
                placeholder="选择时间"
              ></DatePicker>
            </li>
            <li class="list-item textarea">
              <span class="form-item-label none-required">问卷简介</span>
              <Input v-model="survey.configDetail" type="textarea"/>
            </li>
            <li class="list-item table-title-item" style="margin-right:0;">
              <!-- <span class="form-item-label">问卷内容</span> -->
              <p>
                <Icon type="ios-list"/>
                <span>题目列表</span>
              </p>
              <Button class="add-survey-item">
                <span class="add-btn" @click="addSurveyItem">
                  <Icon type="ios-add-circle-outline"/>添加题目
                </span>
              </Button>
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
              <template slot-scope="{ row, index }" slot="action">
                <span :class="['action-btn',{'disabled':!row.isOpt}]" @click="edit(row,index)">编辑</span>
                <span
                  :class="['action-btn delete',{'disabled':!row.isOpt}]"
                  @click="remove(row,index)"
                >删除</span>
                <span class="action-btn" @click="exChangeOrderNum(index,-1)">上移</span>
                <span class="action-btn" @click="exChangeOrderNum(index,1)">下移</span>
              </template>
            </Table>
          </div>
        </div>
      </div>
      <div class="active-details" style="padding:20px;text-align:center">
        <div class="active-pud">
          <div class="btns">
            <Button @click="preview" class="btn-preview">预览</Button>
            <Button type="success" @click="submit" style="margin-left:20px;" class="btn-save">保存</Button>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加问卷题目弹框 -->
    <Modal v-model="surveyModal.visible"
        draggable scrollable :title="surveyModal.title"
        class-name="survey-modal" width="650">
        <Form ref="formOptions" :model="formData" :rules="ruleValidate" :label-width="140">
          <FormItem label="标题" prop="configTitle">
              <Input v-model="formData.configTitle"></Input>
          </FormItem>
          <FormItem label="类型" prop="typeFlag">
              <Select v-model="formData.typeFlag">
                  <Option :value="item.typeFlag" 
                  v-for="(item,index) in typeList" :key="index">{{item.name}}</Option>
              </Select>
          </FormItem>
          <FormItem label="校验规则" prop="ruleType" v-if="formData.typeFlag == 1">
              <Select v-model="formData.ruleType" clearable>
                  <Option :value="item.type" 
                    v-for="(item,index) in ruleList" :key="index">{{item.name}}</Option>
              </Select>
          </FormItem>
          <FormItem label="选项" prop="configSelectList"
              v-if="['3','4'].indexOf(formData.typeFlag)>=0">
            <div v-for="(item,index) in formData.configSelectList" :key="index">
              <div class="option-item">
                <Input v-model="item['scontent']" placeholder="输入选项"></Input>
                <span class="delete-icon" @click="deleteOptions(index)">
                  <Icon type="md-trash" />
                </span>
                <Checkbox 
                  @on-change="changeDefaultValue($event,index)"
                  v-model="item.defaultChecked" style="margin-left:1rem;"></Checkbox>
              </div>
          </div>
          <div class="add-option-btn" @click="onAddOptionsList">
            <Icon type="md-add-circle"/>添加选项
          </div>
        </FormItem>
        <FormItem
          label="默认值"
          prop="defaultValue"
          v-if="[1,6].indexOf(parseInt(formData.typeFlag))>=0"
        >
          <!-- <template v-if="formData.typeFlag == 3">
                    <Select v-model="formData.defaultValue">
                      <Option :value="item.scontent" :key="index"
                        v-for="(item,index) in formData.configSelectList">
                        {{item.name}}
                      </Option>
                    </Select>
                  </template>
                  <template v-if="formData.typeFlag == 4">
                    <Select v-model="formData.multipleValue" multiple>
                      <Option :value="item.typeFlag" :key="index"
                        v-for="(item,index) in formData.configSelectList">
                        {{item.name}}
                      </Option>
                    </Select>
          </template>-->
          <Input v-model="formData.defaultValue"></Input>
        </FormItem>
        <FormItem label="是否可编辑" prop="isOpt">
          <RadioGroup v-model="formData.isOpt">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="是否必填" prop="isMust">
          <RadioGroup v-model="formData.isMust">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleClose('formOptions')">取消</Button>
        <Button type="primary" @click="handleSubmit('formOptions')" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>
    <!-- /添加问卷题目弹框 -->
    <!-- 预览问卷弹框 start-->
    <!-- <Modal v-model="previewStatus" width="700" 
      :title="survey.configName" 
      class-name="preview-modal"
    :styles="{top: '0'}">-->

    <!-- <preview-survey ref="listPushRef" :surveyData="survey" :showStatus="previewStatus"></preview-survey> -->
    <!-- 自定义页脚 -->

    <!-- <div slot="footer" >
      </div>
    </Modal>-->
    <!-- 预览问卷弹框 end -->

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
      // navigation: {
      //   head: '新建问卷调查(会员)'
      // },
      // 问卷题目表格表头
      columns: [
        {
          title: "标题",
          slot: "configTitle"
        },
        {
          title: "类型",
          slot: "typeFlag"
        },
        {
          title: "枚举值",
          slot: "configSelectList"
        },
        {
          title: "默认值",
          slot: "defaultValue"
        },
        {
          title: "是否可编辑",
          slot: "isOpt",
          align: "center",
          width:150
        },
        {
          title: "是否必填",
          slot: "isMust",
          align: "center",
          width:120
        },
        {
          title: "排序",
          slot: "sort",
          align: "center",
          width:80
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      // 问卷题目数据
      surveyDataList: [],
      // 问卷弹框
      surveyModal: {
        title: "添加题目",
        visible: false
      },
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
        { type: '1', name: "数字" },
        { type: '2', name: "中文" },
        { type: '3', name: "手机" },
        { type: '4', name: "身份证号" },
        { type: '5', name: "地址/省市区" },
        { type: '6', name: "城市" },
        { type: '7', name: "日期" }
      ],

      surveyDate: [],
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
    // 添加选项
    onAddOptionsList() {
      if (this.formData.configSelectList.length >= 6) {
        // 超过6条，不可再添加
        this.$Message.warning("选项数量不可超过6条");
        return;
      }
      // let curIndex = this.formData.configSelectList.length;
      // this.$set(this.formData.configSelectList,curIndex+1,{})
      this.formData.configSelectList.push({});
    },
    // 删除选项
    deleteOptions(index) {
      if (this.formData.configSelectList.length === 2) {
        // 少于2条，不可删除
        this.$Message.warning("选项数量不可少于2条");
        return;
      }
      this.formData.configSelectList.splice(index, 1);
    },
    handleSubmit(name) {
      console.log("handlesibmit");
      // 将校验规则定义在这个地方是为了解决第一个输入框失焦时就开始校验的地方
      // 现在这样只在提交的时候校验选项的个数。题目添加完后将校验规则恢复
      // 校验选项列表数据是否为空
      let validOptions = (rule, value, callback) => {
        /**
         * value            用户输入的值
         * callback(true)   检测失败，显示 message的内容
         * callback(new Error('手机号码格式不正确'))   检测失败，显示 error的内容
         * callback()       检测成功
         */
        if (
          this.formData.configSelectList.filter(item => !!item.scontent)
            .length < 2
        ) {
          callback(new Error("请输入至少两个选项"));
        } else {
          callback();
        }
      };
      this.ruleValidate.configSelectList.push({
        validator: validOptions,
        trigger: "blur"
      });
      this.$refs[name].validate(valid => {
        if (!valid) {
          return;
        }
        console.log("valid");
        // 排序
        this.formData.sort = this.surveyDataList.length + 1
        let defaultValue = []
        this.formData.configSelectList.forEach((item, index) => {
          item.sort = index
          if(item.defaultChecked){
            defaultValue.push(item.scontent)
          }
        })
        if(['3','4'].indexOf(this.formData.typeFlag)>=0){
          this.formData.defaultValue = defaultValue.filter(item=>!!item).join(',');
        }
        // delete this.formData.ruleType
        let formData = JSON.parse(JSON.stringify(this.formData));
        if (formData.configSelectList.filter(item => !!item).length == 0) {
          // 没有添加选项
          formData.configSelectList = [];
        }
        // 恢复校验规则到初始状态
        if (this.surveyModal.title == "编辑题目") {
          console.log("edit");
          this.surveyDataList.splice(formData.index, 1, formData);
        } else {
          console.log("add");
          this.surveyDataList.push(formData);
        }
        this.surveyModal.visible = false;
        // 清空数据
        this.formData = Object.assign({}, this.formData, {
          typeFlag: "",
          configTitle: "",
          defaultValue: "",
          isOpt: "",
          isMust: "",
          ruleType: "",
          configSelectList: [{}, {}]
        });
        this.ruleValidate.configSelectList.splice(1);
      });
    },
    handleClose(name) {
      this.$refs[name].resetFields();
      this.surveyModal.visible = false;
    },

    remove(item, index) {
      if (!item.isOpt) {
        // 该道题不可编辑
        return;
      }
      this.surveyDataList.splice(index, 1);
    },

    // 添加题目
    addSurveyItem() {
      this.surveyModal.visible = true;
      this.surveyModal.title = "添加题目";
      // 默认选中且可编辑
      this.formData = Object.assign({}, this.formData, {
        typeFlag: "",
        configTitle: "",
        defaultValue: "",
        isOpt: "1",
        isMust: "1",
        ruleType: "",
        configSelectList: [{}, {}]
      });
    },

    // 编辑题目
    edit(item, index) {
      if (!item.isOpt) {
        // 该道题不可编辑
        return;
      }
      this.surveyModal.visible = true;
      this.surveyModal.title = "编辑题目";
      let defaultValue = item.defaultValue;
      if(defaultValue){
        defaultValue = defaultValue.split(',');
      }
      let cloneItem = JSON.parse(JSON.stringify(item));
      if(Array.isArray(cloneItem.configSelectList)){
        cloneItem.configSelectList.forEach(selItem=>{
          if(defaultValue.indexOf(selItem.scontent)>=0){
            selItem.defaultChecked = true
          }
        })
      }
      this.formData = Object.assign({}, this.formData, cloneItem, { index });
    },

    // 移动位置
    checkMove() {
      console.log("move");
    },

    handleChange(e) {
      console.log("handle", e);
      // this.survey.startAt = e[0]
      // this.survey.endAt = e[1]
      this.survey.startAt = e[0];
      this.survey.endAt = e[1];
    },
    changeDefaultValue (e,index) {
      console.log('e',e)
      if(this.formData.typeFlag == '3'){
        // 单选题
        if(e){
          // 选中状态
          this.formData.configSelectList.forEach((selItem,selIndex)=>{
            if(selIndex != index){
              selItem.defaultChecked = false;
            }
          })
        }
      }
    },
    submit () {
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
      // let surveyDataList = JSON.parse(JSON.stringify(this.surveyDataList))
      console.log('survey', this.survey)
      let survey = this.survey
      let onSubmitFun = this.configHeaderId ? editSurvey : addSurvey;
      onSubmitFun(survey).then(res => {
        console.log('res', res)
        if (res.code == 200) {
          this.$router.back(-1)
          // 提交成功
          this.survey = Object.assign({}, this.survey, {
            configName: '',
            configDetail: '',
            configLineList: []
          })
          this.surveyDate = ''
          this.surveyDataList.splice(0)
        }
      }).catch(err => {
        console.log('err', err)
      })
    },
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
            this.surveyDate = (res.data.startAt + "," + res.data.EndAt).split(
              ","
            );
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    /**
     * 交换字段属顺序
     *  row 数据
     *  index 行index
     *  numer -1 上一层 ， 1 下一层
     */
    exChangeOrderNum(index, number) {
      if (index === 0 && number === -1) {
        // 第一行的向上图标不执行函数
        return;
      }
      if (index + 1 === this.surveyDataList.length && number === 1) {
        // 最后一行的向下图标不执行函数
        return;
      }
      let list = [];
      let old_d = index;
      let new_d = index + number;
      let temp = {};

      /**
       * 2019-12-14 bug 点击调整顺序的按钮，checkbox select 无法操作
       * slice()方法返回一个新的数组对象，这一对象是一个由 begin 和end 决定的原数组的浅拷贝（包括begin，不包括end）。
       * 原始数组不会被改变。
       * 解决方案： 交换操作必须 用另一份数据
       */
      if (this.surveyDataList.length > 0) {
        list = this.surveyDataList.slice(); // 深度拷贝  JSON.parse(JSON.stringify())
      }

      // 数组中交换两个值
      list.forEach((data, c_index) => {
        if (c_index == old_d) {
          // 保证只交换一次
          temp = Object.assign({}, list[old_d]);
          list[old_d] = Object.assign({}, list[new_d]);
          list[new_d] = Object.assign({}, temp);
          console.log("exChangeOrderNum", old_d, new_d);
        }
      });
      this.surveyDataList = [];
      this.$nextTick(function() {
        this.surveyDataList = this._initOrderNum(list);
      });
    },
    // 初始化，save 前 确定orderNum 的数据
    _initOrderNum(list) {
      list.forEach((data, c_index) => {
        data.sort = c_index + 1;
      });
      return list;
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
</style>
