<template>
  <Drawer title="编辑招募报名项" v-model="visible" width="760" transfer :mask-closable="false" @on-close="closeDraw">
    <div v-if="visible">
      <Form class="mt-16" ref="reForm" :model="form" :rules="rules" :label-width="96">
        <Row :gutter="16">
          <Col span="12">
          <FormItem label="招募类型" prop="roleId">
            <Select v-model="form.roleId" :disabled="isFormDisabled" placeholder="请选择招募类型" @on-change="signTypeChange">
              <Option v-for="item in signTypeList" :value="item.roleId" :key="item.roleId">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="招募描述">
            <Input v-model="form.positionComments" type="textarea" :autosize="{minRows: 3,maxRows: 4}" placeholder="请输入描述···" />
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="招募岗位" prop="userPosition">
            <Select :disabled="isFormDisabled" v-model="form.userPosition" placeholder="请选择招募岗位">
              <Option v-for="item in signPostList" :value="item.dicId" :key="item.name" @click.native="getPost(item)">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="模式" prop="zmType">
            <RadioGroup size="large" v-model="form.zmType" style="width: 100%">
              <Row>
                <Col span="12">
                <Radio :disabled="isFormDisabled" label="1">先到先得</Radio>
                </Col>
                <Col span="12">
                <Radio :disabled="isFormDisabled" label="2">预约型</Radio>
                </Col>
              </Row>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <FormItem label="票价" prop="recruitNum">
          <Table :columns="ticketColumn" :data="[{}]">
          </Table>
          <div v-if="form.zmType == '2'" class="flex ai-center pane-box">
            <span style="margin-left: 10px">是否审核</span>
            <i-switch :disabled="isFormDisabled" style="margin: 0 20px 0 5px" v-model="form.isAudit" :falseValue='2' :trueValue='1' />
            <span>报名后需要我审核</span>
          </div>
        </FormItem>
        <FormItem label="退款设置">
          <div class="flex ai-center">
            <Tooltip content="如有人支付成功，则无法更改退款设置">
              <Icon :size="20" type="ios-information-circle-outline" />
            </Tooltip>
            <span style="margin-left: 4px" class="mr-16">是否支持退款</span>
            <i-switch v-model="form.actRefund.refundRule" falseValue='3' :trueValue="'1' || '2'" />
          </div>
        </FormItem>
        <FormItem v-if="form.actRefund.refundRule != 3" prop="actRefund">
          <RadioGroup size="large" v-model="form.actRefund.refundRule" style="width: 100%">
            <Row>
              <Radio label="1">活动结束前均可退款</Radio>
            </Row>
            <Row>
              <Radio label="2">
                活动开始前&nbsp;
                <InputNumber :disabled="form.actRefund.refundRule == 1" :min="0" v-model="form.actRefund.refundDays" style="width: 80px" />&nbsp;天可退款
              </Radio>
            </Row>
          </RadioGroup>
        </FormItem>
        <FormItem label="是否发放补助" prop="isHaveSubsidy">
          <RadioGroup class="w-260" size="large" v-model="form.isHaveSubsidy">
            <Row>
              <Col span="12">
              <Radio :label="1">是</Radio>
              </Col>
              <Col span="12">
              <Radio :label="2">否</Radio>
              </Col>
            </Row>
          </RadioGroup>
        </FormItem>
        <FormItem v-if="form.isHaveSubsidy==1" prop="subsidyType">
          <FormItem label="补助类型：">
            <RadioGroup class="w-260" size="large" v-model="form.subsidyType">
              <Row>
                <Col span="12">
                <Radio label="1">现金</Radio>
                </Col>
                <Col span="12">
                <Radio label="2">物资</Radio>
                </Col>
              </Row>
            </RadioGroup>
          </FormItem>
          <FormItem v-if="form.subsidyType=='1'" label="现金金额：">
            <InputNumber v-model="form.subsidyCash" style="width: 140px" :min="1" placeholder="请输入金额" />
          </FormItem>
          <FormItem v-if="form.subsidyType=='2'" label="物资类型：">
            <div class="flex ai-center">
              <Select v-model="form.resourcesId" style="width: 140px" :min="0" placeholder="请选择">
                <Option v-for="item in batchItemData.resources" :value="item.resourcesId" :key="item.resourcesId" @click.native="resourcesChange(item)">{{ item.name }}</Option>
              </Select>
              <Input v-model="form.resourcesRemark" style="margin-left: 10px;width: 300px" placeholder="请输入备注" />
            </div>
          </FormItem>
        </FormItem>
        <FormItem label="限制设置" prop="signRuleList">
          <Table style="overflow: visible" v-if="form.signRuleList.length" :columns="limitSetColumns" :data="form.signRuleList" />
          <CreatePane v-if="!isFormDisabled" text="+新增限制条件" :menus="signLimitsList" dropdownTextField="name" @select="addLimit" />
        </FormItem>
        <FormItem v-if="form.zmType == '2' && form.isAudit == 2" label="优先设置" prop="choiceRuleList">
          <Table v-if="form.choiceRuleList && form.choiceRuleList.length" :columns="choiceRuleColumns" :data="form.choiceRuleList" />
          <CreatePane v-if="!isFormDisabled" text="+新增优先条件" :menus="firstList" dropdownTextField="name" @select="addFirstTerm" />
        </FormItem>
        <FormItem v-if="form.zmType == '2' && form.isAudit == 2" label="是否自动筛选替补人员" prop="isAutoChoose">
          <RadioGroup class="w-260" size="large" v-model="form.isAutoChoose">
            <Row>
              <Col span="12">
              <Radio :disabled="isFormDisabled" label="0">是</Radio>
              </Col>
              <Col span="12">
              <Radio :disabled="isFormDisabled" label="1">否</Radio>
              </Col>
            </Row>
          </RadioGroup>
        </FormItem>
        <FormItem label="报名时间" prop="enrollTime">
          <XDatePicker :format="format" :options="newDateRangeOptions" :value="[form.enrollStarttime,form.enrollEndtime]" placeholder="请选择报名时间" style="width: 290px" type="datetimerange" @on-change="enrollTimeChange" @on-open-change="successOk" />
        </FormItem>
        <FormItem label="集合时间" prop="setTime">
          <XDatePicker :format="format" :options="dateRangeOptions" :value="form.setTime" placeholder="请选择集合时间" style="width: 290px" type="datetime" @on-change="setTimeChange" />
        </FormItem>
        <FormItem label="集合地址" prop="setAddr">
          <div class="flex ai-center">
            <Input style="width: 240" :value="form.setAddr" @on-focus="()=>{this.showMap = true}" readonly enter-button="选择地址" placeholder="请选择地址" />
            <Input v-model="form.addressSup" style="width: 240;margin-left: 20px" placeholder="请输入详细地址" />
          </div>
        </FormItem>
        <FormItem label="报名取消时间" prop="qxSet">
          <RadioGroup size="large" v-model="form.qxSet" style="width: 100%">
            <Row>
              <Radio label="2">
                活动开始前&nbsp;
                <InputNumber :disabled="form.qxSet==1" :min="1" v-model="form.qxDays" style="width: 80px" />&nbsp;天可取消
              </Radio>
            </Row>
            <Row>
              <Radio label="1">不可取消</Radio>
            </Row>
          </RadioGroup>
        </FormItem>
        <FormItem label="报名项设置" prop="itemList" transfer>
          <Table v-if="form.itemList&&form.itemList.length" :columns="signItemColumns" :data="form.itemList || []" />
          <Dropdown @on-click="selectSignItem">
            <CreatePane v-if="!isFormDisabled" text="+新增报名项" style="width: 624px" />
            <DropdownMenu style="width: 200px" slot="list">
              <Dropdown placement="right-start">
                <DropdownItem>
                  常用报名项
                  <Icon type="ios-arrow-forward"></Icon>
                </DropdownItem>
                <DropdownMenu slot="list">
                  <DropdownItem :name="'one'+index" v-for="(item, index) of oftenItemList" v-bind:key="index">{{item.name}}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </DropdownMenu>
            <DropdownMenu style="width: 200px" slot="list">
              <Dropdown placement="right-start">
                <DropdownItem>
                  自定义报名项
                  <Icon type="ios-arrow-forward"></Icon>
                </DropdownItem>
                <DropdownMenu slot="list">
                  <DropdownItem :name="'two'+index" v-for="(item, index) of signList" v-bind:key="index">{{item.name}}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </DropdownMenu>
          </Dropdown>
        </FormItem>
        <FormItem label="群二维码" prop="actCoverPic">
          <UploadImg :full-url.sync="form.qrCodeShow" :editable="false" :display-width="150" :display-height="150" :max="1" v-model="form.qrCode" placeholder="请上传群二维码图片" />
        </FormItem>
        <FormItem label="培训内容">
          <div class="flex ai-center">
            <i-switch @on-change="isTrainChange" :value="form.isTrain" :true-value='1' :false-value='2' />
            <Checkbox @on-change="isTrainMustChange" :value="form.isTrainMust" style="margin-left: 50px" :true-value='1' :false-value='2'>是否为强制培训</Checkbox>
          </div>
        </FormItem>
        <div v-if="form.isTrain==1">
          <!-- <FormItem>
            <div class="flex ai-center">
              <Button type="primary" class="action-btn">选择模板</Button>
              <Input style="margin-left: 50px" />
            </div>
          </FormItem> -->
          <FormItem class="column-item" label="培训详情">
            <wangeditor :labels="form.trainComments" @change="(e) => { this.form.trainComments = e }" id="ed-draw" />
          </FormItem>
        </div>
        <FormItem label="反馈内容">
          <i-switch v-model="form.isFeedback" :true-value="1" :false-value="2" />
        </FormItem>
        <div v-if="form.isFeedback == 1">
          <!-- <FormItem>
            <div class="flex ai-center">
              <Button type="primary" class="action-btn">选择模板</Button>
              <Input style="margin-left: 50px" />
            </div>
          </FormItem> -->
          <div>

          </div>
          <FormItem label="反馈简介">
            <Input v-model="form.introductionData.context" type="textarea" :autosize="{minRows: 3,maxRows: 4}" placeholder="请输入描述···" />
          </FormItem>
          <FormItem label="反馈详情" transfer prop="fkDetailList">
            <Table v-if="form.fkDetailList.length" :columns="feedColumns" :data="form.fkDetailList" />
            <CreatePane text="+新增反馈项" :menus="feedList" dropdownTextField="name" @select="addFeed" />
          </FormItem>
          <FormItem label="是否需要用户上传图片">
            <i-switch v-model="form.isUploadData.context" true-value="1" false-value="2" />
          </FormItem>
        </div>
        <div class="mt-16 flex-end" style="margin-bottom: 100px">
          <Button shape="circle" class="action-btn" @click="closeDraw">关闭</Button>
          <Button type="primary" shape="circle" class="action-btn" @click="submit">完成</Button>
        </div>
      </Form>
      <adress v-model='showMap' @change='getMap' />
    </div>
  </Drawer>
</template>

<script>
import CreatePane from '../CreatePane'
import adress from '_c/map'
import areaSelect from '_c/selsect'
import cloneDeep from 'lodash.clonedeep'
import {
  signType, // 获取招募类型
  signPost, // 根据招募类型获取招募岗位
  signLimits, // 常用限制项
  signItems, // 常用报名项
  batchItem, // 批次活动前置信息
  firstList // 优先规则列表
} from '@/request/api'

const today = new Date()

const form = {
  roleId: '', // 招募类型id
  roleName: '', // 招募类型名称
  userPosition: '', // 招募岗位id
  positionName: '', // 招募岗位名称
  positionComments: '', // 招募描述
  zmType: '1', // 模式
  amount: null, // 票价
  vipAmount: null, // vip票价
  apptNum: null, // 可预约数量
  recruitNum: null, // 数量
  score: null, // 积分
  isAudit: 2, // 是否需要审核
  actRefund: {
    // 退款设置
    refundRule: '1',
    refundDays: null
  },
  isHaveSubsidy: 2, // 是否发放补助,
  subsidyType: '1', // 补助类型
  subsidyCash: null, // 补助金额
  resourcesId: '', // 补助物资id
  resourcesName: '', // 补助物资name
  resourcesRemark: '', // 补助物资备注
  signRuleList: [], // 限制条件列表
  choiceRuleList: [], // 优先条件列表
  isAutoChoose: 0, // 是否支持自动筛选替补人员
  // enrollTime: [], // 报名时间
  enrollStarttime: null,
  enrollEndtime: null,
  setTime: null, // 集合时间
  qxSet: 1,
  qxDays: null,
  xx: '',
  yy: '',
  setAddr: '',
  addressSup: '', // 详细地址
  qrCode: '', // 群二维码
  qrCodeShow: '',
  itemList: [], // 报名项设置
  isTrain: 2, // 是否含有培训内容
  trainComments: '', // 培训详情
  isTrainMust: 2, // 是否强制培训
  isFeedback: 2, // 是否带有反馈内容
  fkDetailList: [], // 反馈项
  introductionData: {
    // 反馈简介
    type: 0,
    context: ''
  },
  isUploadData: {
    // 是否上传图片
    type: 9,
    context: 2
  },
  provinceName: '',
  cityName: '',
  districtName: ''
}

export default {
  components: { CreatePane, adress, areaSelect },
  props: {
    value: {
      type: Boolean
    },
    detail: {
      type: Object
    },
    isFormDisabled: Boolean
  },
  watch: {
    // 由于模板返回字段不全，监听signLimitsList去构造所需要的对应数据
    signLimitsList: {
      immediate: true,
      deep: true,
      handler(v) {
        if (v) {
          const data = {}
          const nameData = {}
          for (let i = 0; i < v.length; i++) {
            if (v[i].data) {
              data[v[i].ruleId] = v[i].data
              nameData[v[i].ruleId] = v[i].name
            }
          }
          this.signLimitsData = data
          this.signLimitsName = nameData
        } else {
          this.signLimitsData = {}
          this.signLimitsName = {}
        }
      }
    },
    detail: {
      immediate: true,
      deep: true,
      handler(v) {
        if (v && v.roleId) {
          const typeNames = {
            1: '单行文本',
            2: '图片',
            3: '单选问题',
            4: '多选问题',
            6: '多行文本'
          }
          const data = cloneDeep(v)
          const itemList = data.itemList || []
          data.itemList = itemList.map(item => {
            return {
              ...item,
              name: item.isNew == 0 ? item.itemName : typeNames[item.type]
            }
          })
          if (data.qxDays) {
            data.qxDays = +data.qxDays
          }
          if (data.isFeedback) {
            data.isFeedback = +data.isFeedback
          }
          if (data.isTrainMust) {
            data.isTrainMust = +data.isTrainMust
          }
          if (data.isTrain) {
            data.isTrain = +data.isTrain
          }
          data.amount = +data.amount
          data.vipAmount = +data.vipAmount
          data.apptNum = +data.apptNum
          data.score = +data.score
          data.recruitNum = +data.recruitNum
          data.subsidyCash = +data.subsidyCash
          const list = data.fkDetailList || []
          const fkDetailList = []
          // const choiceRuleList = data.choiceRuleList || []
          // const choiceRuleIds = choiceRuleList.map(item => item.ruleId)
          data.introductionData = {
            type: 0,
            context: ''
          }
          data.isUploadData = {
            type: 9,
            context: 2
          }
          list.forEach((item, index) => {
            if (item.type == 0) {
              data.introductionData = item
            } else if (item.type == 9) {
              data.isUploadData = item
            } else {
              item.name = typeNames[item.type]
              fkDetailList.push(item)
            }
          })
          data.fkDetailList = fkDetailList
          this.form = data
          if (data.roleId) {
            this.signTypeChange(data.roleId)
          }
        } else {
          this.form = cloneDeep(form)
        }
      }
    }
  },
  data() {
    return {
      // 表单数据对象
      form: cloneDeep(form),
      isRefund: false, // 是否支持退款
      batchItemData: {}, // //批次活动前置信息
      codePicMap: {},
      // 报名项select类型对应data(由于模板不会给data,所以根据接口来做对应关系)
      signLimitsData: {},
      signLimitsName: {},
      newDateRangeOptions: {
        disabledDate(v) {
          return v && v.valueOf() < Date.now() - 86400000
        }
      },
      dateRangeOptions: {
        disabledDate(v) {
          return v < today
        }
      },
      typeNames: { 1: '文字', 2: '图片', 3: '单选题', 4: '多选题', 6: '多行文本' },
      // 表单验证规则
      rules: {
        roleId: { required: true, message: '请选择招募类型', type: 'number' },
        userPosition: { required: true, message: '请选择招募岗位', type: 'number' },
        zmType: { required: true, message: '请选择模式' },
        isAutoChoose: { required: true, message: '请选择是否自动筛选替补人员' },
        qxSet: {
          required: true,
          asyncValidator: (rule, value) => {
            return new Promise((resolve, reject) => {
              if (!this.form.qxSet) {
                reject('请选择')
                return
              }
              if (this.form.qxSet == 1) {
                resolve()
              } else {
                if (!this.form.qxDays || this.form.qxDays < 0) {
                  reject('请输入天数')
                  return
                }
                resolve()
              }
            })
          }
        },
        recruitNum: {
          type: 'number',
          asyncValidator: (rule, value) => {
            return new Promise((resolve, reject) => {
              if (!this.form.recruitNum) {
                reject('请输入数量')
              } else {
                resolve()
              }
            })
          }
        },
        isHaveSubsidy: { required: true },
        subsidyType: {
          asyncValidator: (rule, value) => {
            return new Promise((resolve, reject) => {
              if (this.form.isHaveSubsidy == 1) {
                // 现金
                if (this.form.subsidyType == 1) {
                  if (!this.form.subsidyCash || this.form.subsidyCash < 0) {
                    reject('请输入金额')
                    return
                  }
                  // 物资
                } else {
                  if (!this.form.resourcesId && this.form.resourcesId !== 0) {
                    reject('请选择物资类型')
                    return
                  }
                }
              }
              resolve()
            })
          }
        },
        enrollTime: {
          required: true,
          asyncValidator: (rule, value) => {
            return new Promise((resolve, reject) => {
              if (!this.form.enrollStarttime || !this.form.enrollEndtime) {
                reject('请完善报名时间')
              } else {
                resolve()
              }
            })
          }
        },
        setTime: { required: true, type: 'string', trigger: 'change', message: '请选择集合时间' },
        setAddr: { required: true, type: 'string', trigger: 'change', message: '请选择集合地址' },
        choiceRuleList: {
          type: 'array',
          asyncValidator: (rule, value) => {
            return new Promise((resolve, reject) => {
              const choiceRuleList = this.form.choiceRuleList
              if (!choiceRuleList.length) {
                resolve()
                return
              }
              for (let i = 0; i < choiceRuleList.length; i++) {
                if (choiceRuleList[i].object && !choiceRuleList[i].ruleValueRemark) {
                  reject(`请补全第${i + 1}项信息`)
                  return
                }
              }
              resolve()
            })
          }
        },
        itemList: {
          type: 'array',
          asyncValidator: (rule, value) => {
            return new Promise((resolve, reject) => {
              const typeList = [1, 3, 4, 6]
              const itemList = this.form.itemList
              if (!itemList.length) {
                resolve()
                return
              }
              for (let i = 0; i < itemList.length; i++) {
                if (typeList.indexOf(itemList[i].type) > -1) {
                  if (!itemList[i].context && !itemList[i].itemName) {
                    reject(`请补全报名项第${i + 1}项信息`)
                    return
                  }
                  if (itemList[i].answer && itemList[i].answer.length) {
                    for (let j = 0; j < itemList[i].answer.length; j++) {
                      if (!itemList[i].answer[j].answer) {
                        reject(`请补全报名项第${i + 1}项信息`)
                        return
                      }
                    }
                  }
                }
              }
              resolve()
            })
          }
        },
        fkDetailList: {
          type: 'array',
          asyncValidator: (rule, value) => {
            return new Promise((resolve, reject) => {
              const typeList = [1, 3, 4, 6]
              const fkDetailList = this.form.fkDetailList
              if (!fkDetailList.length || this.form.isFeedback == 2) {
                resolve()
                return
              }
              for (let i = 0; i < fkDetailList.length; i++) {
                if (typeList.indexOf(fkDetailList[i].type) > -1) {
                  if (!fkDetailList[i].context) {
                    reject(`请补全反馈项第${i + 1}项信息`)
                    return
                  }
                  if (fkDetailList[i].answer && fkDetailList[i].answer.length) {
                    for (let j = 0; j < fkDetailList[i].answer.length; j++) {
                      if (!fkDetailList[i].answer[j].answer) {
                        reject(`请补全反馈项第${i + 1}项信息`)
                        return
                      }
                    }
                  }
                }
              }
              resolve()
            })
          }
        },
        signRuleList: {
          type: 'array',
          asyncValidator: (rule, value) => {
            return new Promise((resolve, reject) => {
              const signRuleList = this.form.signRuleList
              if (!signRuleList.length) {
                resolve()
                return
              }
              const valueList = [4, 8, 9, 22]
              for (let i = 0; i < signRuleList.length; i++) {
                if (valueList.indexOf(signRuleList[i].ruleId) === -1) {
                  if (!signRuleList[i].ruleValue) {
                    reject(`请补全限制条件第${i + 1}项信息`)
                    return
                  }
                }
              }
              resolve()
            })
          }
        },
        actRefund: {
          asyncValidator: (rule, value) => {
            return new Promise((resolve, reject) => {
              if (this.form.actRefund.refundRule == 2 && !this.form.actRefund.refundDays) {
                reject(`请将天数补充完整`)
                return
              }
              resolve()
            })
          }
        }
      },
      // 反馈项
      feedList: [
        { name: '单行文本', type: 1 },
        { name: '多行文本', type: 6 },
        { name: '单选问题', type: 3, answer: [{ answer: '' }, { answer: '' }] },
        { name: '多选问题', type: 4, answer: [{ answer: '' }, { answer: '' }, { answer: '' }] }
      ],
      // 自定义报名项
      signList: [
        { name: '单行文本', type: 1, isNew: 1 },
        { name: '多行文本', type: 6, isNew: 1 },
        { name: '单选问题', type: 3, answer: [{ answer: '' }, { answer: '' }], isNew: 1 },
        {
          name: '多选问题',
          type: 4,
          answer: [{ answer: '' }, { answer: '' }, { answer: '' }],
          isNew: 1
        }
      ],
      // 常用报名项
      oftenItemList: [],
      // 招募类型列表
      signTypeList: [],
      // 优先规则列表
      firstList: [],
      // 招募岗位列表
      signPostList: [],
      sysId: '',
      userId: '',
      showMap: false,
      format: 'yyyy-MM-dd HH:mm',
      signLimitsList: [],
      limitSetColumns: [
        {
          title: '限制项名称',
          key: 'name',
          align: 'center',
          render: (h, params) => {
            const data = this.form.signRuleList[params.index]
            return h('span', {}, data.name || this.signLimitsName[data.ruleId])
          }
        },
        {
          title: '限制项条件',
          key: 'condition',
          align: 'center',
          width: 300,
          render: (h, params) => {
            let renderDom = []
            const index = params.index
            const ruleId = this.form.signRuleList[index].ruleId
            if (ruleId == 3 || ruleId == 21) {
              const signRuleList = this.form.signRuleList[index]
              const inputValue = signRuleList.ruleValue ? signRuleList.ruleValue.split(',') : []
              renderDom = [
                h('InputNumber', {
                  props: {
                    value: +inputValue[0] || null,
                    disabled: this.isFormDisabled
                  },
                  on: {
                    input: value => {
                      const ruleValue = signRuleList.ruleValue
                      if (ruleValue) {
                        signRuleList.ruleValue = ruleValue + ',' + ruleValue.split(',')[1]
                      } else {
                        signRuleList.ruleValue = ruleValue + ','
                      }
                    }
                  }
                }),
                h('span', {}, '——'),
                h('InputNumber', {
                  props: {
                    value: +inputValue[1] || null,
                    min: +inputValue[0] || null
                  },
                  on: {
                    input: value => {
                      const ruleValue = signRuleList.ruleValue
                      if (ruleValue) {
                        signRuleList.ruleValue = ruleValue.split(',')[0] + ',' + ruleValue
                      } else {
                        signRuleList.ruleValue = ',' + ruleValue
                      }
                    }
                  }
                })
              ]
            } else if (ruleId == 6 || ruleId == 7 || ruleId == 2 || ruleId == 5) {
              let create = this.$createElement
              renderDom = [
                create(
                  'Select',
                  {
                    style: 'max-width: 120px',
                    ref: 'limitSetColumns_' + index,
                    props: {
                      value: +this.form.signRuleList[index].ruleValue,
                      'label-in-value': true,
                      transfer: true,
                      disabled: this.isFormDisabled,
                      clearable: true
                    },
                    on: {
                      'on-change': e => {
                        if (!e) return
                        for (let i = 0; i < this.form.signRuleList.length; i++) {
                          if (
                            this.form.signRuleList[i].ruleId == ruleId &&
                            this.form.signRuleList[i].ruleValue == e.value
                          ) {
                            this.$Message.warning('已有该项，请勿重复选择')
                            this.$refs['limitSetColumns_' + index].clearSingleSelect()
                            this.form.signRuleList[index].ruleValue = null
                            return
                          }
                        }
                        this.form.signRuleList[index].ruleValue = e.value
                      }
                    }
                  },
                  this.form.signRuleList[index].data
                    ? this.form.signRuleList[index].data.map((item, index) => {
                        return create(
                          'Option',
                          {
                            props: {
                              value: item.dicId || item.orgId,
                              key: index
                            }
                          },
                          item.name
                        )
                      })
                    : this.signLimitsData[this.form.signRuleList[index].ruleId]
                    ? this.signLimitsData[this.form.signRuleList[index].ruleId].map(
                        (item, index) => {
                          return create(
                            'Option',
                            {
                              props: {
                                value: item.dicId || item.orgId,
                                key: index
                              }
                            },
                            item.name
                          )
                        }
                      )
                    : []
                )
              ]
            } else if (ruleId == 8 || ruleId == 9) {
              renderDom = [
                h(
                  'RadioGroup',
                  {
                    props: {
                      size: 'large',
                      value: 1
                    }
                  },
                  [
                    h(
                      'Radio',
                      {
                        props: {
                          label: 1,
                          disabled: this.isFormDisabled
                        }
                      },
                      '是'
                    )
                  ]
                )
              ]
            } else if (ruleId === 22 || ruleId == 4) {
              // 居住地区限制
              const ruleValue = this.form.signRuleList[index].ruleValue
              let arr = []
              if (ruleValue) {
                arr = ruleValue.split(',')
              } else {
                arr = ['1', '1', '1']
                this.form.signRuleList[index].ruleValue = '1,1,1'
              }
              renderDom = [
                h(areaSelect, {
                  staticClass: 'flex ai-center',
                  props: {
                    arr,
                    disabled: this.isFormDisabled
                  },
                  on: {
                    change: e => {
                      if (!e) return
                      const value = e.toString()
                      for (let i = 0; i < this.form.signRuleList.length; i++) {
                        if (
                          this.form.signRuleList[i].ruleId == ruleId &&
                          this.form.signRuleList[i].ruleValue == value
                        ) {
                          this.$Message.warning('已有该项，请勿重复选择')
                          this.form.signRuleList[index].ruleValue = '1,1,1'
                          return
                        }
                      }
                      this.form.signRuleList[index].ruleValue = e.toString()
                    }
                  }
                })
              ]
            }
            return h(
              'div',
              {
                staticClass: 'flex ai-center jc-center'
              },
              renderDom
            )
          }
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          render: (h, params) => {
            return this.isFormDisabled
              ? h('Icon', { props: { type: 'ios-lock-outline', size: 20 } })
              : h('Icon', {
                  props: {
                    type: 'ios-close-circle-outline',
                    size: 20
                  },
                  on: {
                    click: () => {
                      const index = params.index
                      this.form.signRuleList.splice(index, 1)
                    }
                  }
                })
          }
        }
      ],
      signItemColumns: [
        {
          title: '报名项名称',
          key: 'name',
          align: 'center',
          render: (h, params) => {
            let renderDom = []
            const index = params.index
            let itemList = this.form.itemList
            if (itemList[index].isNew) {
              if (itemList[index].type == 1 || itemList[index].type == 6) {
                // 单行或多行文本
                renderDom = [
                  h('span', {}, itemList[index].name + '：'),
                  h('Input', {
                    style: 'width: 200px;margin: 8px 0',
                    props: {
                      placeholder: '请输入标题文本',
                      value: itemList[index].itemName,
                      type: itemList[index].type == 6 ? 'textarea' : 'text',
                      disabled: this.isFormDisabled
                    },
                    on: {
                      input: e => {
                        itemList[index].itemName = e
                      }
                    }
                  })
                ]
              } else {
                // 单选或者多选问题
                renderDom = [
                  h('div', { staticClass: 'flex-column' }, [
                    h('div', { staticClass: 'flex ai-center' }, [
                      h('span', {}, itemList[index].name + '：'),
                      h('Input', {
                        style: 'width: 180px;margin: 10px 0',
                        props: {
                          placeholder: '请输入问题',
                          value: itemList[index].itemName,
                          disabled: this.isFormDisabled
                        },
                        on: {
                          input: e => {
                            itemList[index].itemName = e
                          }
                        }
                      })
                    ]),
                    itemList[index].answer.map((item, ids) => {
                      return h(
                        'div',
                        {
                          style: 'padding-left: 16px;margin-bottom: 10px',
                          staticClass: 'flex ai-center'
                        },
                        [
                          h('span', {}, '选项' + (ids + 1) + '：'),
                          h('Input', {
                            style: 'width: 180px',
                            props: {
                              placeholder: '请输入选项' + (ids + 1),
                              value: itemList[index].answer[ids].answer
                            },
                            on: {
                              input: e => {
                                itemList[index].answer[ids].answer = e
                              }
                            }
                          }),
                          this.isFormDisabled
                            ? h('Icon', { props: { type: 'ios-lock-outline', size: 20 } })
                            : h('Icon', {
                                style: 'margin-left: 40px',
                                props: {
                                  type: 'ios-close-circle-outline',
                                  size: 20
                                },
                                on: {
                                  click: () => {
                                    if (itemList[index].answer.length < 2) {
                                      this.$Message.error({
                                        content: '至少保留一项'
                                      })
                                      return false
                                    }
                                    itemList[index].answer.splice(ids, 1)
                                  }
                                }
                              })
                        ]
                      )
                    }),
                    h(
                      'div',
                      { style: 'text-align: right;margin-bottom: 10px;margin-right: -4px' },
                      [
                        this.isFormDisabled
                          ? h('Icon', { props: { type: 'ios-lock-outline', size: 20 } })
                          : h('Icon', {
                              style: 'margin-right: 4px',
                              props: {
                                type: 'ios-add-circle-outline',
                                size: 20
                              },
                              on: {
                                click: () => {
                                  itemList[index].answer.push({ answer: '' })
                                }
                              }
                            })
                      ]
                    )
                  ])
                ]
              }
            } else {
              renderDom = [h('span', {}, itemList[index].itemName)]
            }
            return h('div', { staticClass: 'flex ai-center' }, renderDom)
          }
        },
        {
          title: '是否必填',
          key: 'condition',
          align: 'center',
          width: 140,
          render: (h, params) => {
            let itemList = this.form.itemList
            const index = params.index
            return h(
              'Checkbox',
              {
                props: {
                  value: itemList[index].isMust,
                  'true-value': 1,
                  'false-value': 0,
                  disabled: this.isFormDisabled
                },
                on: {
                  'on-change': e => {
                    itemList[index].isMust = e
                  }
                }
              },
              '必填'
            )
          }
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          width: 140,
          render: (h, params) => {
            return this.isFormDisabled
              ? h('Icon', { props: { type: 'ios-lock-outline', size: 20 } })
              : h('Icon', {
                  props: {
                    type: 'ios-close-circle-outline',
                    size: 20
                  },
                  on: {
                    click: () => {
                      const index = params.index
                      this.form.itemList.splice(index, 1)
                    }
                  }
                })
          }
        }
      ],
      feedColumns: [
        {
          title: '反馈项名称',
          key: 'name',
          align: 'center',
          render: (h, params) => {
            let renderDom = []
            const index = params.index
            let fkDetailList = this.form.fkDetailList
            if (fkDetailList[index].type == 1 || fkDetailList[index].type == 6) {
              // 单行或多行文本
              renderDom = [
                h('span', {}, fkDetailList[index].name + '：'),
                h('Input', {
                  style: 'width: 200px;margin: 8px 0',
                  props: {
                    placeholder: '请输入标题文本',
                    value: fkDetailList[index].context,
                    type: fkDetailList[index].type == 6 ? 'textarea' : 'text'
                  },
                  on: {
                    input: e => {
                      fkDetailList[index].context = e
                    }
                  }
                })
              ]
            } else {
              // 单选或者多选问题
              renderDom = [
                h('div', { staticClass: 'flex-column' }, [
                  h('div', { staticClass: 'flex ai-center' }, [
                    h('span', {}, fkDetailList[index].name + '：'),
                    h('Input', {
                      style: 'width: 180px;margin: 10px 0',
                      props: {
                        placeholder: '请输入问题',
                        value: fkDetailList[index].context
                      },
                      on: {
                        input: e => {
                          fkDetailList[index].context = e
                        }
                      }
                    })
                  ]),
                  fkDetailList[index].answer.map((item, ids) => {
                    return h(
                      'div',
                      {
                        style: 'padding-left: 16px;margin-bottom: 10px',
                        staticClass: 'flex ai-center'
                      },
                      [
                        h('span', {}, '选项' + (ids + 1) + '：'),
                        h('Input', {
                          style: 'width: 180px',
                          props: {
                            placeholder: '请输入选项' + (ids + 1),
                            value: fkDetailList[index].answer[ids].answer
                          },
                          on: {
                            input: e => {
                              fkDetailList[index].answer[ids].answer = e
                            }
                          }
                        }),
                        h('Icon', {
                          style: 'margin-left: 40px',
                          props: {
                            type: 'ios-close-circle-outline',
                            size: 20
                          },
                          on: {
                            click: () => {
                              if (fkDetailList[index].answer.length < 2) {
                                this.$Message.error({
                                  content: '至少保留一项'
                                })
                                return false
                              }
                              fkDetailList[index].answer.splice(ids, 1)
                            }
                          }
                        })
                      ]
                    )
                  }),
                  h('div', { style: 'text-align: right;margin-bottom: 10px;margin-right: -4px' }, [
                    h('Icon', {
                      style: 'margin-right: 4px',
                      props: {
                        type: 'ios-add-circle-outline',
                        size: 20
                      },
                      on: {
                        click: () => {
                          fkDetailList[index].answer.push({ answer: '' })
                        }
                      }
                    })
                  ])
                ])
              ]
            }
            return h('div', { staticClass: 'flex ai-center' }, renderDom)
          }
        },
        {
          title: '是否必填',
          key: 'condition',
          align: 'center',
          width: 140,
          render: (h, params) => {
            let fkDetailList = this.form.fkDetailList
            const index = params.index
            return h(
              'Checkbox',
              {
                props: {
                  value: fkDetailList[index].isMust,
                  'true-value': 1,
                  'false-value': 2
                },
                on: {
                  'on-change': e => {
                    fkDetailList[index].isMust = e
                  }
                }
              },
              '必填'
            )
          }
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          width: 140,
          render: (h, params) => {
            return h('Icon', {
              props: {
                type: 'ios-close-circle-outline',
                size: 20
              },
              on: {
                click: () => {
                  const index = params.index
                  this.form.fkDetailList.splice(index, 1)
                }
              }
            })
          }
        }
      ],
      choiceRuleColumns: [
        {
          title: '优先级别',
          key: 'index',
          align: 'center',
          render: (h, params) => {
            return h('span', {}, params.index + 1)
          }
        },
        {
          title: '优先项',
          key: 'ruleName',
          align: 'center',
          render: (h, params) => {
            const index = params.index
            const choiceRuleList = this.form.choiceRuleList[index]
            let renderDom = [h('span', {}, choiceRuleList.ruleName || choiceRuleList.name)]
            for (let i = 0; i < this.firstList.length; i++) {
              if (choiceRuleList.ruleId == this.firstList[i].ruleId) {
                choiceRuleList.object = this.firstList[i].object
              }
            }
            if (choiceRuleList.object && choiceRuleList.object.length) {
              let create = this.$createElement
              renderDom = [
                create(
                  'Select',
                  {
                    style: 'max-width: 120px',
                    props: {
                      value: choiceRuleList.ruleValueRemark,
                      'label-in-value': true,
                      transfer: true,
                      disabled: this.isFormDisabled,
                      clearable: true
                    },
                    ref: 'choiceRuleColumns_' + index,
                    on: {
                      'on-change': e => {
                        if (!e) return
                        for (let i = 0; i < this.form.choiceRuleList.length; i++) {
                          if (this.form.choiceRuleList[i].ruleValueRemark === e.value) {
                            this.$Message.warning('已有该项，请勿重复选择')
                            this.$refs['choiceRuleColumns_' + index].clearSingleSelect()
                            choiceRuleList.ruleValueRemark = null
                            return false
                          }
                        }
                        choiceRuleList.ruleValueRemark = e.value
                      }
                    }
                  },
                  choiceRuleList.object.map((item, index) => {
                    return create(
                      'Option',
                      {
                        props: {
                          value: item.name,
                          key: index
                        }
                      },
                      item.name
                    )
                  })
                )
              ]
            }
            return h(
              'div',
              {
                staticClass: 'flex ai-center jc-center'
              },
              renderDom
            )
          }
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          render: (h, params) => {
            return h('div', { staticClass: 'flex ai-center jc-center' }, [
              this.isFormDisabled
                ? h('Icon', { props: { type: 'ios-lock-outline', size: 20 } })
                : h('Icon', {
                    style: 'margin-right: 30px',
                    props: {
                      type: 'ios-arrow-round-up',
                      size: 24
                    },
                    on: {
                      click: () => {
                        const index = params.index
                        if (index) {
                          const [deleted] = this.form.choiceRuleList.splice(index, 1)
                          this.form.choiceRuleList.splice(index - 1, 0, deleted)
                        } else {
                          this.$Message.warning('已在最顶部')
                        }
                      }
                    }
                  }),
              this.isFormDisabled
                ? h('Icon', { props: { type: 'ios-lock-outline', size: 20 } })
                : h('Icon', {
                    props: {
                      type: 'ios-close-circle-outline',
                      size: 20
                    },
                    on: {
                      click: () => {
                        this.form.choiceRuleList.splice(params.index, 1)
                      }
                    }
                  })
            ])
          }
        }
      ]
    }
  },
  computed: {
    visible: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    },
    // 票价header
    ticketColumn() {
      const column = [
        {
          title: '票价',
          key: 'amount',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: this.form.amount,
                placeholder: '输入金额',
                min: 0
              },
              on: {
                input: value => {
                  this.form.amount = value
                }
              }
            })
          }
        },
        {
          title: 'VIP价',
          key: 'vipAmount',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: this.form.vipAmount,
                placeholder: '不填则无VIP价',
                min: 0
              },
              on: {
                input: value => {
                  this.form.vipAmount = value
                }
              }
            })
          }
        },
        {
          // title: '数量',
          key: 'recruitNum',
          align: 'center',
          className: 'ticket-num',
          renderHeader: (h, parmas) => {
            return h('div', { style: 'flex ai-center' }, [
              h('span', {}, '数量'),
              h('span', { style: 'color: red' }, '*')
            ])
          },
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: this.form.recruitNum,
                placeholder: '输入数量',
                min: 0,
                disabled: this.isFormDisabled
              },
              on: {
                input: value => {
                  this.form.recruitNum = value
                }
              }
            })
          }
        },
        {
          title: '可预约数量',
          key: 'apptNum',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: this.form.apptNum,
                placeholder: '输入积分',
                min: 0,
                disabled: this.isFormDisabled
              },
              on: {
                input: value => {
                  this.form.apptNum = value
                }
              }
            })
          }
        },
        {
          title: '可获得积分',
          key: 'score',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: this.form.score,
                placeholder: '输入积分',
                min: 0,
                disabled: this.isFormDisabled
              },
              on: {
                input: value => {
                  this.form.score = value
                }
              }
            })
          }
        },
        {
          title: '操作',
          key: 'clear',
          align: 'center',
          render: (h, params) => {
            return this.isFormDisabled
              ? h('Icon', { props: { type: 'ios-lock-outline', size: 20 } })
              : h(
                  'a',
                  {
                    props: {
                      href: 'javascript:;'
                    },
                    on: {
                      click: value => {
                        this.form.amount = null
                        this.form.vipAmount = null
                        this.form.recruitNum = null
                        this.form.score = null
                        this.form.apptNum = null
                      }
                    }
                  },
                  '清除'
                )
          }
        }
      ]
      if (this.form.zmType == '1') {
        column.splice(3, 1)
      }
      return column
    }
  },
  methods: {
    // 招募类型修改时
    signTypeChange(roleId) {
      this.form.roleId = roleId
      this.signTypeList.forEach(item => {
        if (item.roleId == roleId) {
          this.form.roleName = item.name
          this.getSignPost()
          this.getSignLimits()
          this.getSignItems()
          this.getFirstList()
        }
      })
    },
    // 获取活动招募类型
    async getSignType() {
      const res = await signType()
      this.signTypeList = res.data.roles || []
      // 自动设置第一项选中
      if (this.signTypeList.length) {
        const data = this.signTypeList[0]
        this.form.roleId = data.roleId
        this.form.roleName = data.name
        this.sysId = data.sysId
        this.signTypeChange(data.roleId)
      }
    },
    // 获取招募岗位
    async getSignPost() {
      const res = await signPost({ roleId: this.form.roleId, name: this.form.roleName })
      this.signPostList = res.data.voluJobs || []
      if (this.signPostList.length) {
        this.form.userPosition = this.signPostList[0].dicId
        this.form.positionName = this.signPostList[0].name
      }
    },
    // 获取常用限制条件项
    async getSignLimits() {
      const res = await signLimits({
        roleId: this.form.roleId,
        userId: this.userId,
        sysId: this.sysId
      })
      const list = res.data || []
      this.signLimitsList = res.data || []
    },
    // 获取常用报名项
    async getSignItems() {
      const res = await signItems({ roleId: this.form.roleId })
      this.oftenItemList = res.data || []
    },
    //批次活动前置信息查询
    async getBatchItem() {
      const res = await batchItem({ userId: this.userId })
      this.batchItemData = res.data || {}
    },
    isTrainChange(e) {
      this.form.isTrain = e
      if (e == 2) {
        this.form.isTrainMust = 2
      }
    },
    isTrainMustChange(e) {
      this.form.isTrainMust = e
      if (e == 1) {
        this.form.isTrain = 1
      }
    },
    async getFirstList() {
      const res = await firstList({
        roleId: this.form.roleId,
        userId: this.userId,
        sysId: this.sysId
      })
      const list = res.data || []
      this.firstList = list.map(item => {
        return {
          ...item,
          ruleName: item.name
        }
      })
    },
    // 添加常用限制条件项
    addLimit(e) {
      const name = e.name
      const ruleId = e.ruleId
      if (ruleId == 22 || ruleId == 4) {
        e.ruleValue = '1,1,1'
      }
      for (let i = 0; i < this.form.signRuleList.length; i++) {
        const ruleName = this.form.signRuleList[i].name || this.form.signRuleList[i].ruleName
        if ((ruleId == 8 || ruleId == 9 || ruleId == 3 || ruleId == 21) && ruleName == name) {
          this.$Message.warning('已有该项，请勿重复添加')
          return
        }
        if ((ruleId == 22 || ruleId == 4) && this.form.signRuleList[i].ruleValue == e.ruleValue) {
          this.$Message.warning('已有该地区限制，请勿重复添加')
          return
        }
      }
      this.form.signRuleList.push(cloneDeep(e))
    },
    // 添加内容反馈项feed
    addFeed(e) {
      this.form.fkDetailList.push(cloneDeep(e))
    },
    // 添加优先条件
    addFirstTerm(e) {
      const name = e.name
      for (let i = 0; i < this.form.choiceRuleList.length; i++) {
        const ruleName = this.form.choiceRuleList[i].name || this.form.choiceRuleList[i].ruleName
        if (ruleName == name && !this.form.choiceRuleList[i].object) {
          this.$Message.warning('已有该项，请勿重复添加')
          return
        }
      }
      this.form.choiceRuleList.push(cloneDeep(e))
    },
    // 选择地址
    getMap(e) {
      this.form.xx = e.xx
      this.form.yy = e.yy
      this.form.provinceName = e.province
      this.form.cityName = e.city
      this.form.districtName = e.district
      this.$set(this.form, 'setAddr', e.address)
    },
    selectSignItem(e) {
      let index = Number(e.substring(3, e.length))
      if (e.indexOf('one') > -1) {
        // 常用项
        const data = cloneDeep(this.oftenItemList[index])
        data.itemName = data.name
        const name = data.itemName
        for (let i = 0; i < this.form.itemList.length; i++) {
          if (this.form.itemList[i].itemName == name) {
            this.$Message.warning('已有该项，请勿重复添加')
            return
          }
        }
        this.form.itemList.push(data)
      } else {
        this.form.itemList.push(cloneDeep(this.signList[index]))
      }
    },
    closeDraw() {
      this.$emit('input', false)
    },
    setTimeChange(e) {
      this.form.setTime = e
    },
    enrollTimeChange(e) {
      this.form.enrollStarttime = e[0]
      this.form.enrollEndtime = e[1]
    },
    successOk(e) {
  
      if (this.form.enrollStarttime) {
        let enrollStarttime = new Date(this.form.enrollStarttime).getTime()
        let newDate = new Date().getTime()
        if (newDate > enrollStarttime) {
          this.$Message.warning('招募开始时间要晚于当前时间')
          this.form.enrollStarttime = null
          this.form.enrollEndtime = null
        } 
      }
    },
    getPost(val) {
      this.form.positionName = val.name
      this.form.userPosition = val.dicId
    },
    //
    resourcesChange(val) {
      this.form.resourcesName = val.name
      this.form.resourcesId = val.resourcesId
    },
    async submit() {
      const valid = await this.$refs.reForm.validate()
      if (valid) {
        const data = this.form
        if (data.isTrain == 2) {
          delete data.trainComments
        }
        if (data.isFeedback == 2) {
          delete data.fkDetailList
        } else {
          // 合并反馈项
          data.fkDetailList.unshift(data.introductionData)
          data.fkDetailList.push(data.isUploadData)
        }
        const itemList = data.itemList
        data.itemList = itemList.map(item => {
          return {
            ...item,
            type: item.typeFlag || item.type
          }
        })
        if (data.zmType != '2' || data.isAudit != 2) {
          delete data.choiceRuleList
          delete data.isAutoChoose
        }
        delete data.introductionData
        delete data.isUploadData
        this.$emit('change', data)
        this.closeDraw()
      } else {
        this.$Message.error({
          content: '请完成当前信息'
        })
      }
    }
  },
  async mounted() {
    this.userId = this.$store.state.userId
    // 获取活动招募类型
    this.getSignType()
    //批次活动前置信息查询
    this.getBatchItem()
  }
}
</script>

<style lang="scss">
.flex {
  display: flex;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.ai-center {
  align-items: center;
}
.jc-center {
  justify-content: center;
}
.mr-16 {
  margin-right: 16px;
}
.recruitNum {
  &::after {
    content: '*';
    color: red;
  }
}
.w-260 {
  width: 260px;
}
.pane-box {
  padding: 12px 0;
  line-height: 1;
  background: #f8f8f9;
}
.action-btn {
  width: 120px;
  margin-right: 20px;
}
.flex-end {
  display: flex;
  justify-content: flex-end;
}
</style>
