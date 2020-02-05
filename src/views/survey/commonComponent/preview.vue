<!--志愿者活动发布（志愿者）-->
<template>
  <div>
      <p class="content-head">
        {{surveyData.configName}}
      </p>
      <p class="content-intro" v-if="surveyData.configDetail">
        {{surveyData.configDetail}}
      </p>
      <div class="survey-content">
        <template v-for="(item,index) in surveyData.configLineList">
            <div class="survey-item" :key="index">
              <!-- <i v-if="item.required" class="iconfont required-icon">&#xe6b3;</i> -->
              <span :class="['survey-order',item.isMust==='1'?'isMust':'']">{{index+1}}.</span>
              <span class="survey-item-name">{{item.configTitle}}</span>
              <!-- 单行文本 -->
              <template v-if="item.typeFlag==1">
                <div class="answer-box input-wrapper">
                  <Input class="item-input" placeholder="请输入" 
                    v-model="formData.list[index] && formData.list[index].answer"/>
                  <!-- <span class="error-text">{{item.regRules.errMsg}}</span> -->
                </div>
              </template>
              <!-- /单行文本 -->
              <!-- 多行文本 -->
              <template v-if="item.typeFlag==6">
                <div class="answer-box textarea-wrapper">
                  <Input type="textarea"
                    v-model="formData.list[index] && formData.list[index].answer"
                   class="item-textarea" placeholder="请输入" style="height:40px;" />
                </div>
              </template>
              <!-- /多行文本 -->
              <!-- 单选问题 -->
              <template v-if="item.typeFlag==3">
                  <!-- <div class="select-item-conatiner">
                    <span class="circle-line"></span>
                    <span>{{optionsItem.scontent}}</span>
                  </div> -->
                  <div class="answer-box radio-wrapper item-radio">
                    <template v-if="Array.isArray(item.configSelectList)">
                    <RadioGroup v-model="formData.list[index] && formData.list[index].answer">
                      <Radio v-for="(optionsItem,optionsIndex) in item.configSelectList" 
                        :key="optionsIndex"
                        :label="optionsItem.scontent">

                      </Radio>
                    </RadioGroup>
                    </template>
                  </div>
                  <!-- <div class="">
                    <CheckboxGroup v-model="item.configSelectList">
                      <Checkbox v-for="optionsItem in item.configSelectList" :label="optionsItem.scontent" disabled></Checkbox>
                    </CheckboxGroup>
                  </div> -->
              </template>
              <!-- /单选问题 -->
              <!-- 多选问题 -->
              <template v-if="item.typeFlag==4">
                <!-- <template v-for="optionsItem in item.configSelectList">
                  <div class="select-item-conatiner">
                    <span class="rect-line"></span>
                    <span>{{optionsItem.scontent}}</span>
                  </div>
                </template> -->
                <div class="answer-box checkbox-wrapper"
                  v-if="Array.isArray(item.configSelectList)">
                <CheckboxGroup 
                    v-model="formData.list[index] && formData.list[index].answer" >
                    <Checkbox v-for="(optionsItem,optionsIndex) in item.configSelectList"
                      :key="optionsIndex"
                      :label="optionsItem.scontent">
                    </Checkbox>
                </CheckboxGroup>
                </div>
              </template>
              <!-- /多选问题 -->
              <!-- 上传图片问题 -->
              <template v-if="item.typeFlag==2">
                  <div class="answer-box select-item-conatiner">
                    <UploadImg
                    :picMap="picMap"
                    :max="1"
                    v-model="formData.medalPic"
                    :display-width="120"
                    :crop-width="200"
                    :crop-height="200"
                  ></UploadImg>
                  </div>
              </template>
              <!-- /上传图片问题 -->
              <!-- 富文本编辑问题 -->
              <template v-if="item.typeFlag==10">
                <div class="answer-box richText-container">
                  <wangeditor
                    :id="'exccccc3'+index"
                    :labels="formData.list[index] && formData.list[index].answer"
                    @change="btn"
                  ></wangeditor>
                </div>
              </template>
              <!-- /富文本编辑问题 -->
            </div>
          </template>
      </div>
  </div>
</template>

<script>
import wangeditor from "@/components/wangeditor";
import { addSurvey } from '@/request/api'
import { getAdressId, filterNull } from '@/libs/utils'
import { upload } from '@/request/http'
import draggable from 'vuedraggable'

import '@/libs/survey.scss'
import '../style/preview.scss'
export default {
  components: { draggable },
  data () {
    return {
      ruleObj: {
        '1': { text: '数字', regRule: '', errMsg: '请输入正确的整数，如1,2,3' },
        '2': { text: '中文', regRule: '', errMsg: '请输入中文' },
        '3': { text: '手机号', regRule: '', errMsg: '请输入手机号' },
        '4': { text: '身份证号', regRule: '', errMsg: '请输入正确的身份证号' },
        '5': { text: '地址/省市区', regRule: '', errMsg: '' },
        '6': { text: '城市', regRule: '', errMsg: '' }
      },
      ruleList: [
        { type: '1', name: '数字' },
        { type: '2', name: '中文' },
        { type: '3', name: '手机' },
        { type: '4', name: '身份证号' },
        { type: '5', name: '地址/省市区' },
        { type: '6', name: '城市' },
        { type: '7', name: '日期' }
      ],
      formData:{
        answer:'',
        list:[]
      },
      picMap:{},    // 图片的映射地址
      editorContent:''
    }
  },
  props: {
    surveyData: Object
  },

  mounted () {
    let defaultValue = ''
    this.surveyData.configLineList.forEach((item,index)=>{
      defaultValue = item.defaultValue;
      if(item.typeFlag == '4' && defaultValue){
        defaultValue = defaultValue.split(',')
      }
      this.$set(this.formData.list,index,{
        answer:defaultValue
      })
    })
  },
  methods: {
    //富文本
    btn(e) {
      // this.editorContent = e;
    }
  },

}
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
