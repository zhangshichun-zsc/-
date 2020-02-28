<!--组织列表共用-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="top flex-center-start btn-wrapper">
      <div class="btn-box">
        <span class="label">勋章名称:</span>
        <Input v-model="medalNameModel" size="small" />
      </div>
      <div class="btn-box">
        <span class="label">规则名称:</span>
        <Select v-model="ruleNameModal" clearable @on-change="setRule">
          <Option value="" key="ALL" >全部</Option>
          <Option v-for="item in ruleList" :value="item.dicId" :key="item.dicId" >{{ item.name }}</Option>
          <!-- @click.native="getSelectedRuleItem1(item)" -->
        </Select>
      </div>
      <div class="btn-box">
        <span class="label">创建时间:</span>
        <!-- v-model="surveyDate" -->
        <DatePicker type="daterange" @on-change='formTime'  format="yyyy-MM-dd" placeholder="创建时间"></DatePicker>
      </div>
      <Button @click="query" shape="circle" size='large' class="search" style="margin-left:10px;">查询</Button>
    </div>
    <div class="basis">
      <div class>
        <div class="table-header flex-between">
          <p>
            <Icon type="ios-list" />
            <span>数据列表</span>
          </p>
          <div class="options flex-center-start">
            <!-- <Button @click="createNewline">新增</Button> -->
            <Button @click="onOpenModal('add')" style="line-height:1;margin-right:.5rem;">新增</Button>

            <Select v-model="size" placeholder="显示条数" style="width:120px;">
              <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select placeholder="排序方式" v-model="sort" style="width:9rem;margin-left:.5rem;">
              <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        <Table ref="selection" border :columns="columns1" :data="data" @on-selection-change="handleSelectionChange">
          <template slot-scope="{ row }" slot="medalPicPath">
            <!-- <img :src="row.medalPicPath" alt> -->

            <Icon type="md-images" @click="onShowIconModal(row)" />
          </template>
          <template slot-scope="{ row }" slot="medalName">
            <strong>{{ row.medalName }}</strong>
          </template>
          <template slot-scope="{ row }" slot="ruleName">
            <strong>{{ row.ruleName }}满{{ row.conditions }}{{ row.unit }}</strong>
          </template>
          <template slot-scope="{ row }" slot="createAt">
            <strong>{{ row.createAt }}</strong>
          </template>
          <template slot-scope="{ row }" slot="obtainNum">
            <strong>{{ row.obtainNum }}</strong>
          </template>
          <template slot-scope="{ row,index }" slot="validFlag">
            <i-switch :true-value="String(1)" :false-value="String(0)" v-model="row.validFlag" @on-change="changeSwitch($event,row,index)" />
            <!-- <span></span> -->
          </template>
          <template slot-scope="{ row,index }" slot="action">
            <span @click="onOpenModal('edit',row,index)" style="cursor:pointer;color:#FF566A;">修改</span>
          </template>
        </Table>
      </div>
      <div class="pages flex-center-between">
        <Page :current.sync='page' :total="dataCount" show-elevator show-total size="small" style="margin: auto" :page-size="size" @on-change="changepages" />
      </div>
    </div>
    <!-- 新增/编辑问卷对象的弹框页 -->
    <!-- @on-cancel='cancel' -->
    <Modal v-model="modal.visible" :title="modal.title" @on-visible-change="onVisibleChange"   width="800" class-name="add-modal">
      <!-- 添加key是为了保证div组件内容重新渲染，防止一个组件出现两张图片的情况 -->
      <div :key="formData.index">
        <Form :model="formData" :label-width="100" :rules="ruleValidate" ref="medalFormRef">
          <FormItem label="勋章图片" prop="medalPic">
            <UploadImg :max="1" v-model="formData.medalPic" :full-url.sync="picMap" :display-width="100" :crop-width="190" :crop-height="190"></UploadImg>
          </FormItem>
          <FormItem label="勋章名称" prop="medalName">
            <span class="insertPart3">
              <Input v-model="formData.medalName" placeholder="请输入勋章名称" />
            </span>
          </FormItem>
          <FormItem label="规则" prop="ruleName" class="rule-item">
            <Select v-model="formData.ruleName">
              <Option v-for="item in ruleList" :value="item.name" :key="item.dicId" @click.native="getSelectedRuleItem(item)">{{ item.name }}</Option>
            </Select>
            <span class="insertPartText rule-text">满</span>
            <Input v-model="formData.conditions" placeholder="请输入" />
            <span class="insertPartText value-text">{{selectedRuleData.unit}}</span>
          </FormItem>
          <FormItem label="说明" prop="remarks">
            <span class="insertPart3" style="width: 80%">
              <Input v-model="formData.remarks" placeholder />
            </span>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="default" @click="modal.visible = false" style="margin-right:1rem;">取消</Button>
        <Button type="primary" @click="updateMedalAction" style="margin-right:.5rem;">确定</Button>
      </div>
    </Modal>

    <!-- 预览图片弹框 start -->
    <Modal v-model="iconModal.visible">
      <img :src="iconModal.picPath" alt="" class="showimg" style="width:100%" />
      <span slot="footer"></span>
    </Modal>
    <!-- 预览图片弹框 end -->
  </div>
</template>

<script>
import { myBrowser } from '@/request/Browser'

import {
  orgpage,
  orgtype,
  getSelectList,
  getAllConfigUserList,
  getQuestionnaireFeedbackList,
  operateReview,
  answerDetailPageDelete,
  answerDetailPagePush,
  queryMedalList,
  updateMedal,
  queryDicByTypeFlag,
  getActiveType,
  postMedalInfo
} from '@/request/api'
import { constants } from 'fs'
import './style/index.scss'
import { log } from 'util'
export default {
  name: 'surveyList',
  components: {},
  data() {
    let validConditions = (rule, value, callback) => {
      let reg = /^\d+(\.\d+)?$/;
      if (this.formData.ruleName && !value) {
        return callback(new Error('请输入' + this.formData.ruleName + '的满足条件值'))
      } else if(!reg.test(value)){
        return callback(new Error('仅支持数字'))
      } else {
        callback()
      }
    }
    return {
      navigation1: {
        head: '会员勋章'
      },
      switch1: true,
      surveyDate: [],
      // 开发时的配置
      modal: {
        visible: false,
        title: '新增'
      },
      formInline: {
        OrganizationName: '',
        GroupAddress: '',
        head: '',
        classifications: ''
      },
      data: [],
      typelist: [],
      columns1: [
        {
          title: '勋章图片',
          slot: 'medalPicPath',
          align: 'center',
          width:120
        },
        {
          title: '勋章名称',
          slot: 'medalName',
          align: 'center'
        },
        // {
        //   title: '规则名称',
        //   slot: 'ruleName',
        //   align: 'center'
        // },
        {
          title: '规则',
          slot: 'ruleName',
          align: 'center'
        },
        {
          title: '创建时间',
          slot: 'createAt',
          align: 'center'
        },
        {
          title: '所获人数',
          slot: 'obtainNum',
          align: 'center',
          width:150
        },
        {
          title: '有效状态',
          slot: 'validFlag',
          align: 'center',
          width:120
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width:120
        }
      ],
      Article: [
        { value: 10, label: 10 },
        { value: 15, label: 15 },
        { value: 20, label: 20 }
      ],
      sorting: [
        { value: 'asc', label: '正序' },
        { value: 'desc', label: '倒序' }
      ],
      sort: 'asc',
      isInit: true, // 默认是true,,点击查询之后被赋值为false
      sysType: '1', // 1 会员 2 志愿者
      typeFlag: '1', // 项目区分 1 问卷调查 2 反馈
      address: '',
      orgType: '',
      page: 1,
      size: 10,
      dataCount: 0,
      arr: [],
      status: false,
      type: '',
      arrs: [],
      types: '',
      // 筛选条件
      medalNameModel: '',
      ruleNameModal: '',
      ruleList: [],
      selectedRuleData1: {},
      // 新增modal
      formData: {
        medalName: '',
        ruleName: '',
        ruleId: '',
        conditions: '',
        remarks: '',
        medalPic: ''
      },
      // 选中的select规则数据
      selectedRuleData: {},
      picMap: '',
      // 预览图片弹框
      iconModal: {
        visible: false,
        picPath: ''
      },
      ruleValidate: {
        medalPic: [{ required: true, message: '请上传图片', trigger: 'blur' }],
        medalName: [{ required: true, message: '请输入勋章名称', trigger: 'blur' }],
        ruleName: [{ required: true, message: '选择规则', trigger: 'change' }],
        conditions: [{ required: true, validator: validConditions,trigger: 'blur' }],
        remarks: [{ required: true, message: '请输入说明', trigger: 'blur' }]
      }
    }
  },

  methods: {
    // 类型
    getorgtype() {
      orgtype({
        sysType: this.sysType
      }).then(res => {
        if (res.code == 200) {
          this.typelist = res.data
        }
        console.log(res)
      })
    },
    // 标签分页
    getorgpage() {
      // this.page = index;
      if (this.isInit) {
        queryMedalList({
          page: { page: this.page, size: this.size, sort:`createAt ${this.sort }`  },
          typeFlag: '1'
        }).then(res => {
          if (res.code == 200) {
            this.dataCount = res.data.totalSize
            this.data = res.data.list
          }
          console.log('res', res)
        })
      } else {
        this.query()
      }
    },
    // 查询结果
    query() {

      this.isInit = false
      let submitData = {}
      let endAt =''
      if(this.surveyDate[1]){
          endAt =`${this.surveyDate[1]} 23:59:59`
      }
      let oldSubmkitData = {
        page: { page: this.page, size: this.size, sort: `createAt ${this.sort}` },
        typeFlag: '1',
        medalName: this.medalNameModel,
        ruleId: this.ruleNameModal,
        startAt:this.surveyDate[0],
        endAt 
      }
      for (let i in oldSubmkitData) {
        if (oldSubmkitData[i]) {
          submitData[i] = oldSubmkitData[i]
        }
      }
      
      console.log('obj', submitData)
      // 最后调用接口，传入的参数是obj
      queryMedalList(submitData).then(res => {
        if (res.code == 200) {
          this.dataCount = res.data.totalSize
          this.data = res.data.list
        }
        console.log('res', res)
      })

      // console.log("query22222222surveyDate",this.surveyDate)
    },
    setRule(v){
      this.ruleNameModal = v
    },
    formTime(v, o){
        this.surveyDate = v
    },
    // 点击切换页码功能
    changepages(index) {
      this.page = index
      // console.log("isInit", this.isInit);
      if (this.isInit) {
        this.getorgpage()
      } else {
        this.query()
      }
    },
    // 选择内容
    handleSelectionChange(val) {
      this.arrs = val
      if ((val.length == this.dataCount && this.dataCount != 0) || val.length == this.size) {
        this.status = true
      } else {
        this.status = false
      }
      this.arr = val.map(item => {
        return item.orgId
      })
      console.log(this.arr)
    },
    // 查询页,选中规则
    getSelectedRuleItem1(item) {
      this.selectedRuleData1 = item
      console.log('item', item)
    },
    // 新增页,选中规则
    getSelectedRuleItem(item) {
      this.selectedRuleData = item
      this.formData.ruleId = item.dicId
      console.log('item', item)
    },
 
    onVisibleChange(status) {
      if (!status) {
        // 关闭弹框
         if(this.formData.medalId){
          delete this.formData.medalId
        }
        this.$refs.medalFormRef.resetFields()
        this.formData = {
          medalName: '',
          ruleName: '',
          ruleId: '',
          conditions: '',
          remarks: '',
          medalPic: ''
        } 
      } else {

      }
    },

    // 新建组织
    jump() {
      this.$router.push({ name: 'newzuzihy', query: { sysId: this.sysType } })
    },
    // 审核,点击确认
    ok() {
      this.$Message.info('Clicked ok')
    },

    // 展示新增弹框
    onOpenModal(type, item, index) {
      console.log('item', item, index)
      this.modal.title = type == 'add' ? '新增' : '编辑'
      if (type === 'add') {
        this.formData = Object.assign({}, this.formData, {
          medalName: '',
          ruleName: '',
          ruleId: '',
          conditions: '',
          remarks: '',
          medalPic: '',
          index: Math.random().toFixed(5)
        })
      } else {
         this.selectedRuleData = item
        this.formData.index = Math.random().toFixed(5)
        this.picMap = item.medalPicPath

        item.medalPic = item.medalPic
        this.formData = Object.assign({}, this.formData, item)
      }
      this.modal.visible = true
    },

    // 提交新增/编辑勋章的动作
    updateMedalAction() {
      // 先校验
      this.$refs['medalFormRef'].validate(valid => {
        if (!valid) {
          return
        }
        if (!this.formData.medalPic || this.formData.medalPic.length === 0) {
          this.$Message.error('请上传图片')
          return
        }

        if (!this.formData.conditions) {
          this.$Message.error('请输入' + this.formData.ruleName + '的满足条件值')
          return
        }
        let reg = /^[0-9]*$/;
        if (!reg.test(this.formData.conditions)) {
          this.$Message.error(this.formData.ruleName + '的满足条件值仅支持数字')
          return
        }
        let formDataList = []
        formDataList.push(JSON.parse(JSON.stringify(this.formData)))
        formDataList[0] = Object.assign({}, formDataList[0], {
          validFlag: this.formData.validFlag || '0',
          typeFlag: 1,
          medalPic: this.formData.medalPic
        })
        console.log(formDataList)
        postMedalInfo({
          list: formDataList
        }).then(res => {
          
          if (res.code == 200) {
            // 新增或修改成功
            this.modal.visible = false
            this.isInit = true
            this.getorgpage()
          }else{
            let msg = res.msg;
            this.$Message.error(msg)
          }
        })
      })
    },
    // // 关闭弹窗
    // closeSubmitPushModal() {
    //   this.modal.visible = false;
    // },
    edit(item) {
      // test
      console.log('edit', item)
      item.medalName = '_test小时达人'
      console.log('edit', item)
      this.data[0].medalName = '_test小时达人222'
      updateMedal({
        list: this.data
      }).then(res => {
        console.log('res', res)
      })
    },
    // 勋章新增或者修改达成类型查询
    queryDicByTypeFlag() {
      queryDicByTypeFlag({
        typeFlag: '60'
      }).then(res => {
        console.log('res queryDicByTypeFlag', res.data)
        this.ruleList = res.data
        // // 在数组的开头添加一个选项,所有规则
        // var allrules = {
        //   name:"所有规则",<Navigation :labels="navigation1"></Navigation>
        //   dicId:null
        // }
        // this.ruleList.unshift(allrules)
        // console.log("this.ruleList", this.ruleList);
      })
    },

    // 切换开关
    changeSwitch(ev, row, index) {
      console.log('ev', ev, row.validFlag == '1')
      // row.validFlag = 0
      // row.validFlag = row.validFlag == '1' ? '0' : '1';
      console.log('row', row)
      let formData = []
      formData.push(row)
      postMedalInfo({
        list: formData
      }).then(res => {
        console.log('res', res)
      })
    },
    // 展示图片弹框
    onShowIconModal(item) {
      this.iconModal = Object.assign({}, this.iconModal, {
        visible: !this.iconModal.visible,
        picPath: item.medalPicPath
      })
    }
  },

  // 事件监听
  watch: {
    size: 'getorgpage',
    sort: 'getorgpage'
  },
  props: [],
  mounted() {
    this.sysType = 2
    this.getorgpage()
    this.getorgtype()
    this.queryDicByTypeFlag()

    // console.log('this.sysType', this.sysType)
  }
}
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

/* 设置弹出框样式 */
.insertLine {
  margin-bottom: 5px;
}
.insertPart1 {
  /* width:20%; */
  color: red;
  /* padding: 0 5px 0 0; */
}
.insertPartText {
  /* width:20%; */
  /* color: red; */
  padding: 0 5px 0 5px;
}

.insertPart2 {
  /* width:80% */
  padding: 0 5px 0 0;
}
.insertPart3 {
  /* width:80% */
  /* padding: 0 5px 0 0; */
  display: inline-block;
}
.ivu-modal-header-inner {
  height: 40px;
  line-height: 40px;
}
</style>
