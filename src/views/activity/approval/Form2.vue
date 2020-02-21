<template>
  <div class="approval-form-2">
    <div class="card mt-16">
      <!--v-if='!isEdit' -->
      <!-- 从立项管理进来 不展示 table -->
      <Tag v-for="(batch, index) in batches" :key="index" :name="index" :type="index === batchIndex ? null : 'border'" :closable="batches.length>1&&!(index === 0 && isIntegrated)" :color="index === batchIndex ? '#ff565a' : '' " @click.native="editBatch(index)" @on-close="onRemoveBatch(index)">第{{index + 1}}批次</Tag>
      <Button class="ml-16" icon="md-add" type="dashed" @click="addBatch()">添加批次</Button>
      <!-- <Tabs v-model="tabName" type="card" closable :animated="false" capture-focus
        @before-remove="beforeTabRemove">
        <TabPane label="第1批次" name="1"></TabPane>
        <TabPane label="第2批次" name="2"></TabPane>
      </Tabs> -->
    </div>
    <Form class="mt-16" ref="form" :model="form" :rules="rules" :label-width="100">
      <Row :gutter="16">
        <Col span="12">
        <div class="card">
          <FormItem label="活动分类" prop="actTypeId">
            <Select v-model="form.actTypeId" placeholder="请选择活动分类" :disabled="isFormDisabled">
              <Option v-for="item in batchData.actTypes" :value="item.dicId" :key="item.dicId" @click.native="onSelectActType(item.dicId, item.name)">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="选择模板">
            <Select v-model="form.mouldActId" placeholder="选择模板可快速填写" :disabled="isFormDisabled" @on-change="onTemplateChange">
              <Option v-for="item in templateList" :value="item.activityId" :key="item.activityId">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </div>
        <div class="mt-16 card">
          <FormItem label="活动名称" prop="actName">
            <Input v-model="form.actName" placeholder="请输入活动名称" />
            <!-- :disabled="isFormDisabled" -->
          </FormItem>
          <FormItem label="封面图片" prop="actCoverPic">
            <UploadImg :max="1" v-model="form.actCoverPic" :full-url.sync="form.actCoverShowPic" placeholder="请上传封面图片" :display-width="160" :crop-width="256" :crop-height="256" />
          </FormItem>
          <FormItem label="主题图片" prop="actPic">
            <UploadImg :max="1" v-model="form.actPic" :full-url.sync="form.actShowPic" placeholder="请上传主题图片" :display-width="320" :crop-width="750" :crop-height="320" />
          </FormItem>
          <FormItem label="活动时间" prop="startT">
            <XDatePicker type="datetimerange" :value="[form.startT, form.endT]" format="yyyy-MM-dd HH:mm" :options="dateRangeOptions" placeholder="请选择活动时间" @on-change="onDateRangeChange" @on-open-change="isDate($event)" />
          </FormItem>
          <FormItem label="活动地址" prop="actAddress" class="width-auto">
            <Row :gutter="16">
              <Col span="13">
              <!-- :disabled="isFormDisabled" -->

              <Input v-model="form.actAddress" readonly placeholder="选择活动地址" @on-focus="() => addressMapVisible = true">
              <!-- <Button slot="append" icon="md-pin" @click="() => addressMapVisible = true"></Button> -->
              </Input>
              </Col>
              <Col span="10">
              <!-- :disabled="isFormDisabled"  -->
              <Input v-model="form.addressSup" placeholder="请输入详细地址" />
              </Col>
            </Row>
          </FormItem>
          <FormItem label="出行方式" prop="vehicleCode" class="width-auto">
            <RadioGroup v-model="form.vehicleCode" @on-change="onVehicleChange">
              <!-- :disabled="isFormDisabled" -->
              <Radio label="1">自驾</Radio>
              <Radio class="ml-16" label="2">大巴</Radio>
              <Radio class="ml-16" label="3">自定义</Radio>
              <Input v-show="form.vehicleCode==='3'" class="ml-16" v-model="form.actVehicle" placeholder="请输入自定义出行方式" style="width:160px" />
            </RadioGroup>
          </FormItem>
          <FormItem label="现场联系人" prop="ownerUserName" class="contacts">
            <Row :gutter="16">
              <Col span="10">
              <FormItem label="姓名">
                <!-- :disabled="isFormDisabled" -->
                <AutoComplete v-model="form.ownerUserName" placeholder="联系人姓名" @on-search="searchLeader">
                  <div class="cadidate-wrapper">
                    <Option v-for="(p, index) in leaderCandidates" :key="index" :value="p.tel" @click.native="selectLeader(p)">{{p.name}}</Option>
                  </div>
                </AutoComplete>
              </FormItem>
              </Col>
              <Col span="10">
              <FormItem label="联系方式">
                <!-- :disabled="isFormDisabled"  -->
                <Input v-model="form.ownerUserTel" placeholder="联系方式" />
              </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="工作人员" prop="workerIdList" class="contacts">
            <Row v-for="(worker, index) in form.workerIdList" :key="index" :gutter="16">
              <Col span="10">
              <FormItem label="姓名">
                <!--  :disabled="isFormDisabled" -->
                <AutoComplete v-model="worker.ownerUserName" placeholder="工作人员姓名" @on-search="searchWorker(worker.ownerUserName)">
                  <div class="cadidate-wrapper">
                    <Option v-for="(p, index) in workerCandidates" :key="index" :value="p.tel" @click.native="selectWorker(worker, p)">{{p.name}}</Option>
                  </div>
                </AutoComplete>
              </FormItem>
              </Col>
              <Col span="10">
              <FormItem label="联系方式">
                <!--  :disabled="isFormDisabled" -->
                <Input v-model="worker.ownerUserTel" placeholder="联系方式" />
              </FormItem>
              </Col>
              <Col span="3">
              <!-- v-if="!isFormDisabled&&form.workerIdList.length > 1" -->
              <!-- v-if="!isFormDisabled&&index === form.workerIdList.length - 1" -->
              <Icon v-if="form.workerIdList.length > 1" type="md-remove-circle" size="18" color="#999" @click.native="removeWorker(index)" />
              <Icon type="md-add-circle" size="18" color="#999" @click.native="addWorker" />
              </Col>
            </Row>
          </FormItem>
          <FormItem label="活动标签">
            <!-- :disabled="isFormDisabled" -->
            <Select v-model="form.actLabelId" placeholder="请选择活动标签">
              <Option v-for="(item, index) in batchData.labels" :value="item.dicId" :key="index" @click.native="onSelectLabel(item)">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </div>
        </Col>
        <Col span="12">
        <div class="card">
          <!-- <div class="card-title required"></div> -->
          <FormItem class="column-item" label="活动详情" prop="detail">
            <wangeditor :labels="form.detail" id="ed1" @change="onChangeEditorTrain" />
          </FormItem>
        </div>
        <div class="mt-16 card">
          <div class="list-wrapper">
            <!-- <div class="card-title required"></div> -->
            <FormItem class="column-item" label="招募角色" prop="userConfList">
              <table class="list-table">
                <tr v-for="(item, index) in form.userConfList" :key="index">
                  <td>{{item.roleName}}</td>
                  <td>{{item.recruitNum}}</td>
                  <td class="actions" width="96">
                    <div class="flex-center-start">
                      <a href @click.prevent="showRole(item, index)">详情</a>
                      <Icon type="md-remove-circle" class="ml-16" v-if="!isFormDisabled" @click.native="removeRole(index)" />
                    </div>
                  </td>
                </tr>
                <tr v-if="!isFormDisabled" class="create">
                  <td colspan="3">
                    <CreatePane text="+新增招募角色" @click="addRole" />
                  </td>
                </tr>
              </table>
            </FormItem>
          </div>
        </div>
        <div class="mt-16 card">
          <div class="list-wrapper">
            <!-- <div class="list-header"></div> -->
            <FormItem class="column-item" label="所需物资" prop="actResList">
              <table class="list-table">
                <tr v-for="(item, index) in form.actResList" :key="index">
                  <td>{{item.resourcesName}}</td>
                  <td width="30%">
                    <!-- :disabled="isFormDisabled" -->
                    <Input v-model="item.num" placeholder="请输入数量" />
                  </td>
                  <td class="actions" width="108">
                    <Checkbox v-model="item.isOk" :true-value="1" :false-value="2">已筹</Checkbox>
                    <!--  可以删除 物资v-if="!isFormDisabled"  -->
                    <Icon type="md-remove-circle" @click="deleteResources(index)"></Icon>
                  </td>
                </tr>
                <tr class="create">
                  <td colspan="3">
                    <!-- v-if="!isFormDisabled" 可以新增 和删除物资    -->
                    <CreatePane text="+新增物资" :menus="batchData.resources" dropdownTextField="name" @select="addResource" />
                    <!-- <CreatePane v-if="isFormDisabled&&!form.actResList.length" text="暂无物资" /> -->
                  </td>
                </tr>
              </table>
            </FormItem>
          </div>
        </div>
        <div class="mt-16 card">
          <!-- <div class="card-title required"></div> -->
          <FormItem class="column-item release-time" label="发布时间" prop="releaseTime">
            <RadioGroup v-model="releaseTime" @on-change="onReleaseTimeChange">
              <Radio label="0">招募开始前一周</Radio>
              <Radio class="ml-16" label="1">自定义</Radio>
            </RadioGroup>
            <XDatePicker v-show="releaseTime==='1'" type="datetime" :editable="false" format="yyyy-MM-dd HH:mm" placeholder="选择日期" :value="form.releaseTime" :disabled="isFormDisabled" @on-change="onCustomReleaseTimeChange" />
          </FormItem>
        </div>
        </Col>
      </Row>
      <div class="mt-16 card flex-column flex-center-center">
        <div class="flex-center-center">
          <Button shape="circle" class="action-btn" :loading="loading" @click="saveDraft">存为草稿</Button>
          <Button v-if="isEdit" type="primary" shape="circle" class="action-btn" :loading="loading" @click="submit">保存活动</Button>
          <Button v-if="!isEdit" shape="circle" class="action-btn" @click="previous">上一步</Button>
          <Button v-if="!isEdit" type="primary" shape="circle" class="action-btn" @click="next">下一步</Button>
        </div>
      </div>
    </Form>
    <RecruitEnroll :detail="roleData" :isFormDisabled="isFormDisabled" @change="editUsrtConfigList" v-model="showEnroll"></RecruitEnroll>
    <Address v-model="addressMapVisible" @change="onAddressChange" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { debounce } from '@/libs/utils'
import CreatePane from './CreatePane'
import RecruitEnroll from './recruit_enroll/RecruitCondition'
import Address from '_c/map'
import cloneDeep from 'lodash.clonedeep'
import { batchItem, leader, chooseTempalte, templateMsg } from '@/request/api'

const today = new Date()

const form = {
  // 新增
  type: '1',
  actTypeId: '',
  actTypeName: '',
  mouldActId: '',
  actName: '',
  actCoverPic: '',
  actCoverShowPic: '',
  actPic: '',
  actShowPic: '',
  startT: '',
  endT: '',
  // 省
  provinceName: '',
  // 区
  districtName: '',
  // 市
  cityName: '',
  actAddress: '',
  addressSup: '',
  // 地理位置坐标？
  actXx: null,
  actYy: null,
  vehicleCode: '',
  actVehicle: null,
  ownerUserName: '',
  ownerUserTel: '',
  workerIdList: [{ ownerUserName: '', ownerUserTel: '', ownerUserId: '' }],
  actLabelId: '',
  actLabelName: '',
  detail: '',
  userConfList: [],
  actResList: [],
  releaseTime: ''
}

export default {
  components: {
    CreatePane,
    RecruitEnroll,
    Address
  },
  props: {
    originData: Array,
    baseInfo: Object,
    loading: Boolean
  },
  data() {
    return {
      // 批次总数据
      batches: [],
      batchIndex: 0,
      // 批次活动的前置信息
      batchData: {},
      // 模板
      templateList: [],
      // 发布时间radio
      releaseTime: '',
      roleIndex: null,
      roleData: {},
      dateRangeOptions: {
        disabledDate(v) {
          return v && v.valueOf() < Date.now() - 86400000
        }
      },
      form: cloneDeep(form),
      rules: {
        actTypeId: { required: true, message: '活动分类不能为空' },
        actName: { required: true, message: '活动名称不能为空' },
        actCoverPic: { required: true, message: '封面图片不能为空' },
        actPic: { required: true, message: '主题图片不能为空' },
        startT: { required: true, message: '活动时间不能为空' },
        actAddress: { required: true, message: '活动地址不能为空', trigger: 'change' },
        vehicleCode: { required: true, message: '出行方式不能为空', trigger: 'blur' },
        ownerUserName: { required: true, message: '现场联系人信息不能为空' },
        detail: { required: true, message: '活动详情不能为空' },
        userConfList: {
          type: 'array',
          required: true,
          asyncValidator: (rule, value) => {
            return new Promise((resolve, reject) => {
              const userConfList = this.form.userConfList || []
              if (!userConfList.length) {
                reject('招募角色不能为空')
              }
              for (let i = 0; i < userConfList.length; i++) {
                if (!userConfList[i].enrollStarttime || !userConfList[i].enrollEndtime) {
                  reject(`请补充第${i + 1}条招募信息报名时间`)
                }
              }
              resolve()
            })
          }
        },
        workerIdList: {
          type: 'array',
          defaultField: {
            type: 'object',
            required: true,
            fields: {
              ownerUserName: '工作人员名称不能为空',
              ownerUserTel: '工作人员联系方式不能为空'
            }
          }
        },
        actResList: {
          type: 'array',
          validator: (rule, value) => value.every(v => !!v.num),
          message: '请填写物资数量'
        },
        releaseTime: { required: true, message: '活动发布时间不能为空', trigger: 'blur' }
      },
      // 新增报名项
      showEnroll: false,
      leaderCandidates: [],
      workerCandidates: [],
      addressMapVisible: false,
      isEdit: this.$route.query.isEdit ? true : false
    }
  },
  computed: {
    ...mapState(['userId']),
    // 是否是整体招募
    isIntegrated() {
      return this.baseInfo.recruitType === '1'
    },
    isFormDisabled() {
      // 整体招募且非第一个批次的表单大部分禁止填写
      // return !this.baseInfo || (this.isIntegrated && this.batchIndex > 0)

      // 整体招募 当批次总数超过 1条， 所有的批次表单 大部分禁止填写
      return !this.baseInfo || (this.isIntegrated && this.batches.length > 1)
    }
  },
  watch: {
    originData: {
      immediate: true,
      handler(v) {
        if (v.length > 0) {
          this.batches = [...v]
          // Object.assign(this.batches, v)
        }
      }
    },
    batches: {
      immediate: true,
      handler(v) {
        if (!v.length) {
          this.batches.push(cloneDeep(form))
          this.batchIndex = 0
          this.onSelectBatch()
        } else {
          this.onSelectBatch()
        }
      }
    }
  },
  methods: {
    clearForm() {
      this.$refs.form.resetFields()
      this.form = cloneDeep(form)
      this.releaseTime = null
    },
    // 更新发布时间
    updateReleaseTimeRadio() {
      if (this.form.releaseTime) {
        this.releaseTime = this.form.releaseTime === '0' ? '0' : '1'
      } else {
        this.releaseTime = null
      }
    },
    onSelectBatch() {
      this.form = cloneDeep(this.batches[this.batchIndex])
      // 活动分类
      if (this.form.actTypeId) {
        this.onSelectActType(this.form.actTypeId, undefined, false)
      }
      this.updateReleaseTimeRadio()
      if (!this.form.workerIdList || !this.form.workerIdList.length) {
        this.form.workerIdList = [{ ownerUserName: '', ownerUserTel: '', ownerUserId: '' }]
      }
    },
    onSelectActType(actType, actTypeName, resetTemplate = true) {
      if (actTypeName) {
        this.form.actTypeName = actTypeName
      }
      // 是否重置模板
      if (resetTemplate) {
        this.form.mouldActId = ''
      }
      chooseTempalte({ actTypeDicId: actType }).then(res => {
        this.templateList = res.data
      })
    },
    onTemplateChange(activityId) {
      if (activityId) {
        templateMsg({ activityId: activityId }).then(res => {
          if (res.code == 200) {
            Object.assign(this.form, res.data)
            this.updateReleaseTimeRadio()
            this.form.type = '1'
            // this.$refs.form.resetFields()
            if (!this.form.workerIdList || !this.form.workerIdList.length) {
              this.form.workerIdList = [{ ownerUserName: '', ownerUserTel: '', ownerUserId: '' }]
            }
          }
        })
      }
    },
    onRemoveBatch(index) {
      this.$Modal.confirm({
        title: '提示',
        content: `确定要删除“第${index + 1}批次”么？`,
        onOk: () => {
          this.batches.splice(index, 1)
          if (index === this.batchIndex) {
            // 当前是最后一个索引时才查看前一个批次
            if (this.batchIndex >= this.batches.length) {
              this.batchIndex--
            }
            this.onSelectBatch()
          } else if (index < this.batchIndex) {
            // 删除的是当前选中之前的，需要索引减1
            this.batchIndex--
          }
        }
      })
    },
    onDateRangeChange(v) {
      this.form.startT = v[0]
      this.form.endT = v[1]
    },
    onVehicleChange(v) {
      this.form.actVehicle = ['自驾', '大巴', ''][+this.form.vehicleCode - 1]
    },
    onChangeEditorTrain(e) {
      this.form.detail = e
    },
    onReleaseTimeChange(v) {
      this.form.releaseTime = this.releaseTime === '1' ? '' : v
    },
    onCustomReleaseTimeChange(formatedDate) {
      this.form.releaseTime = formatedDate
    },
    onAddressChange(e) {
      this.form.actXx = e.xx
      this.form.actYy = e.yy
      this.form.actAddress = e.address
      this.form.provinceName = e.province
      this.form.cityName = e.city
      this.form.districtName = e.district
    },
    onSelectLabel(label) {
      this.form.actLabelName = label.name
    },
    // 保存当前批次信息
    saveCurrentBatch() {
      const clone = cloneDeep(this.form)
      // 过滤没有信息的工作人员
      const workerList = this.form.workerIdList.filter(
        worker => worker.ownerUserName || worker.ownerUserTel
      )
      clone.workerIdList = workerList
      this.batches.splice(this.batchIndex, 1, clone)
    },
    // 添加批次
    async addBatch(skipValidate = false) {
      // 是否跳过验证
      if (!skipValidate) {
        const valid = await this.$refs.form.validate()
        if (valid) {
          this.saveCurrentBatch()
        } else {
          return this.$Message.error({
            content: '请先完成当前批次信息'
          })
        }
      }
      //  需要用户确认是否新增批次
      if (this.isIntegrated) {
        this.$Modal.confirm({
          title: '提示',
          content: `新增批次后第1批次部分数据将无法修改，请确认是否新增？`,
          onOk: () => {
            this.copyForm()
          }
        })
      } else {
        this.copyForm()
      }
    },
    copyForm() {
      // 复制批次
      const cloneForm = cloneDeep(this.batches[this.batches.length - 1])
      cloneForm.activityId = ''
      // 清空时间数据
      cloneForm.releaseTime = ''
      cloneForm.startT = ''
      cloneForm.endT = ''
      cloneForm.userConfList.forEach(conf => {
        conf.setTime = ''
        conf.enrollStarttime = ''
        conf.enrollEndtime = ''
      })
      this.batches.push(cloneForm)
      this.batchIndex = this.batches.length - 1
      this.onSelectBatch()
      this.leaderCandidates = []
      this.workerCandidates = []
    },
    // 编辑批次
    async editBatch(index) {
      const valid = await this.$refs.form.validate()
      if (valid) {
        // 保存当前批次
        this.saveCurrentBatch()
        this.batchIndex = index
        this.onSelectBatch()
        // if (this.isFormDisabled && this.batchIndex === 0) {
        //   this.$Modal.info({
        //     title: '提示',
        //     content: '在整体招募时，修改第一个批次后建议删除其它批次重新创建。'
        //   })
        // }
      } else {
        this.$Message.error({
          content: '请先完成当前批次信息'
        })
      }
    },
    // 模糊搜索现场联系人信息
    searchLeader: debounce(function() {
      leader({ name: this.form.ownerUserName }).then(res => {
        if (res.code === 200) {
          this.leaderCandidates = (res.data || []).slice(0, 100)
        }
      })
    }, 500),
    // 选中现场联系人
    selectLeader(leader) {
      this.form.ownerUserName = leader.name
      this.form.ownerUserTel = leader.tel
      this.form.ownerUserId = leader.userId
    },
    // 模糊搜索工作人员信息
    searchWorker(name) {
      leader({ name }).then(res => {
        if (res.code === 200) {
          this.workerCandidates = (res.data || []).slice(0, 100)
        }
      })
    },
    // 选中工作人员
    selectWorker(worker, selectedWorker) {
      worker.ownerUserName = selectedWorker.name
      worker.ownerUserTel = selectedWorker.tel
      worker.ownerUserId = selectedWorker.userId
    },
    // 添加招募角色
    addRole() {
      this.roleData = {}
      this.showEnroll = true
      this.roleIndex = null
    },
    // 添加招募角色返回
    editUsrtConfigList(e) {
      if (this.roleIndex !== null) {
        this.form.userConfList[this.roleIndex] = e
      } else {
        this.form.userConfList.push(e)
      }
    },
    // 判断当前时间是否有问题
    isDate(e) {
      if (e) return
      let startT = this.form.startT
      let endT = this.form.endT
      //
      if (new Date(startT).getTime() < new Date().getTime()) {
        this.$Message.error('活动开始时间不能早于当前时间！')
        this.form.startT = ''
        this.form.endT = ''
        return
      } else if (new Date(endT).getTime() < new Date(startT).getTime()) {
        this.$Message.error('活动结束时间不能早于活动开始时间！')
        this.form.startT = ''
        this.form.endT = ''
        return
      }
    },
    // 显示招募角色详情
    showRole(role, index) {
      this.roleData = {}
      this.showEnroll = true
      this.roleIndex = index
      this.roleData = role
    },
    // 删除招募角色
    removeRole(index) {
      this.form.userConfList.splice(index, 1)
    },
    // 添加物资
    addResource(res) {
      this.form.actResList.push({
        resourcesId: res.resourcesId,
        resourcesName: res.name,
        num: null,
        isOk: 2
      })
    },
    // 删除物资
    deleteResources(i) {
      this.form.actResList.splice(i, 1)
    },
    // 添加工作人员
    addWorker() {
      if (this.form.workerIdList.every(worker => worker.ownerUserName && worker.ownerUserTel)) {
        this.form.workerIdList.push({ ownerUserName: '', ownerUserTel: '', ownerUserId: '' })
      } else {
        this.$Message.error({
          content: '请先填写工作人员信息'
        })
      }
    },
    // 删除工作人员
    removeWorker(index) {
      this.form.workerIdList.splice(index, 1)
    },
    saveDraft() {
      this.batches[this.batchIndex] = this.form
      // 将当前的 批次活动，添加到  batches 中去

      this.$emit('draft', this.batches)
    },
    previous() {
      this.$emit('previous', this.batches)
    },
    async next() {
      const valid = await this.$refs.form.validate()
      if (valid) {
        this.saveCurrentBatch()
        this.$emit('next', this.batches)
      } else {
        this.$Message.error({
          content: '请完成当前信息'
        })
      }
    },
    async submit() {
      const valid = await this.$refs.form.validate()
      if (valid) {
        // 保存当前的批次
        this.saveCurrentBatch()
        this.$emit('submit', {
          form: this.form,
          batches: this.batches
        })
      } else {
        this.$Message.error({
          content: '请完成当前信息'
        })
      }
    }
  },
  mounted() {
    // 批次活动前置信息查询
    batchItem({
      userId: this.userId
    }).then(res => {
      this.batchData = res.data
    })
  }
}
</script>

<style lang="scss">
.approval-form-2 {
  .ivu-tag {
    padding: 0 16px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    &::after {
      content: none;
    }
    & + .ivu-tag {
      margin-left: 16px;
    }
    > .ivu-icon {
      margin-left: 8px !important;
    }
  }
  .contacts > .ivu-form-item-content {
    width: auto;
    .ivu-row + .ivu-row {
      margin-left: 0 !important;
    }
    .ivu-col {
      > .ivu-form-item {
        display: flex;
        align-items: center;
      }
      &:first-child {
        .ivu-form-item-label {
          width: 60px !important;
        }
      }
      &:nth-child(2) {
        .ivu-form-item-label {
          width: 80px !important;
        }
      }
      .ivu-form-item-label {
        flex-shrink: 0;
      }
      .ivu-form-item-content {
        margin-left: 0 !important;
        width: auto;
      }
      .ivu-icon {
        cursor: pointer;
        &:hover {
          color: #ff565a !important;
        }
        & + .ivu-icon {
          margin-left: 8px;
        }
      }
    }
  }
  .cadidate-wrapper {
    max-height: 120px;
    overflow: auto;
  }
  .release-time {
    margin-bottom: 0;
    .ivu-form-item-content {
      width: auto;
      .ivu-radio-group,
      .ivu-date-picker {
        width: auto;
      }
    }
  }
  .column-item {
    .ivu-form-item-label {
      width: 100% !important;
      text-align: left;
      & + .ivu-form-item-content {
        margin-left: 0 !important;
        width: auto;
      }
    }
  }
  .ivu-form-item-label {
    width: 88px !important;
  }
  .ivu-form-item {
    .ivu-form-item-content {
      margin-left: 88px !important;
    }
  }
}
</style>
