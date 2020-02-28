<!--志愿者编辑招募报名项（志愿者）-->
<template>
  <div>
    <Modal v-model="modal" :title="titles[state-1]" width='700'>
      <div class="wap">
        <Row v-if='state===1'>
          <Row class-name="row10">
            <i-col span='4'>常用报名项</i-col>
            <i-col span='18' push='2'>
              <Button v-for="(item,index) in items" :key='index' @click="addItem(item,0,index)" class="btn">{{ item.name }}</Button>
            </i-col>
          </Row>
          <Row class-name="row10">
            <i-col span='4'>自定义报名项</i-col>
            <i-col span='18' push='2'>
              <Button v-for="(item,index) in feedList" :key='index' @click="addItem(item,1)" class="btn">{{ item.name }}</Button>
            </i-col>
          </Row>
        </Row>
        <Row class-name="row10" v-else-if='state===2'>
          <i-col span='4'>常用限制项</i-col>
          <i-col span='18' push='2'>
            <Button v-for="(item,index) in limitList" :key='index' @click="addLimitItem(item,index)" class="btn">{{ item.name }}</Button>
          </i-col>
        </Row>
        <Row class-name="row10" v-else>
          <i-col span='4'>优先规则库</i-col>
          <i-col span='18' push='2'>
            <Button v-for="(item,index) in goodList" :key='index' @click="addGoodItem(item,index)" class="btn">{{ item.name }}</Button>
          </i-col>
        </Row>
      </div>
      <div slot="footer"></div>
    </Modal>
    <adress :value='adr' @change='getMap' />
    <Navigation :labels="navigation1"></Navigation>
    <div class="post">
      <Row class-name="row">
        <i-col span='3'><span>招募类型</span></i-col>
        <i-col span='4'>
          <Select v-model="args.userPosition" @on-change='changePos' :label-in-value='true' 
          :disabled="isDisb || status==5">
            <Option v-for="(item,index) in array" :value="item.dicId" :key="index">{{ item.name }}</Option>
          </Select>
        </i-col>
      </Row>
      <Row class-name="row">
        <i-col span='3'><span>模式</span></i-col>
        <i-col span='4'>
          <RadioGroup v-model="args.zmType" @on-change='changeTeam'>
            <Radio label="1" :disabled="isDisb || status==5">先到先得</Radio>
            <Radio label="2" :disabled="isDisb || status==5">预约型</Radio>
          </RadioGroup>
        </i-col>
      </Row>
      <Row class-name="row">
        <i-col span='3'><span>招募数量：</span></i-col>
        <i-col span='4'>
          <i-input v-model="args.recruitNum" type="number" :disabled="isDisb" @on-blur='isNumber' @change="isNumber"/>
        </i-col>
      </Row>
      <Row class-name="row" v-if='args.zmType==2'>
        <i-col span='3'><span>可预约数量：</span></i-col>
        <i-col span='4'>
          <i-input v-model="args.apptNum" type="number" :disabled="isDisb" />
        </i-col>
      </Row>
      <Row class-name="row" v-if='args.zmType==2'>
        <i-col span='3'><span>是否审核：</span></i-col>
        <i-col span='4'>
          <i-switch v-model="args.isAudit" :true-value='1' :false-value='2' 
          :disabled="isDisb ||  good.length !== 0 || status==5 "
           />
           <!-- :disabled="isDisb || good.length !== 0" -->
        </i-col>
      </Row>
      <Row class-name="row">
        <i-col span='3'>报名项设置</i-col>
        <i-col span='12'>
          <Row type="flex" justify="space-between" class-name="row10">
            <i-col span='8'>报名项名称</i-col>
            <i-col span='5'>是否必填</i-col>
            <i-col span='2'>操作</i-col>
          </Row>
          <Row v-for="(item,index) in args.coActivityItemList" :key='index'>
            <Row v-if=' ~~item.itemType === 7 ' type="flex" justify="space-between" class-name="row10">
              <i-col span='8'>{{ item.itemName }}</i-col>
              <i-col span='5'>
                <i-switch v-model="item.isMustWrite" :true-value='1' :false-value='0' :disabled="isDisb" />
                <span>必填</span>
              </i-col>
              <i-col span='2'>
                <Icon type="ios-trash" @click="deleItem(index,null,item.fors)" v-if='!isDisb && status!=5' color='#FF565A' size='28' />
              </i-col>
            </Row>
            <Row v-else-if=' ~~item.itemType  === 1 ' type="flex" justify="space-between" class-name="row10">
              <i-col span='8'>
                <i-input placeholder="请输入单文本标题" v-model="item.itemName" :disabled="isDisb" />
              </i-col>
              <i-col span='5'>
                <i-switch v-model="item.isMustWrite" :true-value='1' :false-value='0' :disabled="isDisb" />
                <span>必填</span>
              </i-col>
              <i-col span='2'>
                <Icon type="ios-trash" @click="deleItem(index,null,item.fors)" v-if='!isDisb && status!=5'color='#FF565A' size='28' />
              </i-col>
            </Row>
            <Row v-else-if=' ~~item.itemType  === 6 ' type="flex" justify="space-between" class-name="row10">
              <i-col span='8'>
                <i-input placeholder="请输入多行文本标题" v-model="item.itemName" :disabled="isDisb" />
              </i-col>
              <i-col span='5'>
                <i-switch v-model="item.isMustWrite" :true-value='1' :false-value='0' :disabled="isDisb" />
                <span>必填</span>
              </i-col>
              <i-col span='2'>
                <Icon type="ios-trash" @click="deleItem(index,null,item.fors)" v-if='!isDisb && status!=5' color='#FF565A' size='28' />
              </i-col>
            </Row>
            <Row v-else class-name="row10">
              <Row v-if='item.isNewItem == 0 &&  ~~item.itemType  === 3' type="flex" justify="space-between">
                <i-col span='8'>
                  {{item.itemName}}
                </i-col>
                <i-col span='5'>
                  <i-switch v-model="item.isMustWrite" :true-value='1' :false-value='0' :disabled="isDisb" />
                  <span>必填</span>
                </i-col>
                <i-col span='2'>
                  <Icon type="ios-trash" @click="deleItem(index,null)" v-if='!isDisb && status!=5' color='#FF565A' size='28' />
                </i-col>
              </Row>
              <Row v-else>
                <Row type="flex" justify="space-between">
                  <i-col span='8'>
                    <i-input placeholder="请输入标题" v-model="item.itemName" :disabled="isDisb" />
                  </i-col>
                  <i-col span='5'>
                    <i-switch v-model="item.isMustWrite" :true-value='1' :false-value='0' :disabled="isDisb" />
                    <span>必填</span>
                  </i-col>
                  <i-col span='2'>
                    <Icon type="ios-trash" @click="deleItem(index,null)" v-if='!isDisb && status!=5' color='#FF565A' size='28' />
                  </i-col>
                </Row>
                <Row v-for="(val,i) in item.arr" :key='i' type="flex" justify="space-between">
                  <i-col span='10'>
                    <i-input :placeholder="`输入选项${i+1}`" v-model="val.value" :disabled="isDisb" />
                  </i-col>
                  <i-col span='2'>
                    <Icon type="ios-trash" @click="deleItem(index,i)" v-if='!isDisb && status!=5' color='#FF565A' size='28' />
                  </i-col>
                </Row>
                <Button type="primary" ghost @click="addSignIput(index)" v-if=' item.arr.length <6 && !isDisb'>+</Button>
              </Row>
            </Row>
          </Row>
          <Row v-if='!isDisb' type="flex" justify="center">
            <Button @click="showModal(1)" class="add">+添加报名项</Button>
          </Row>
        </i-col>
      </Row>
      <Row class-name="row">
        <i-col span='3'>岗位职责</i-col>
        <i-col span='12'>
          <i-input placeholder="请输入岗位职责" :autosize="{minRows: 4,maxRows: 4}" v-model="args.positionComments" :disabled="isDisb" type='textarea' :rows='4' />
        </i-col>
      </Row>
      <Row class-name="row">
        <i-col span='3'>限制设置</i-col>
        <i-col span='12'>
          <Row type="flex" justify="space-between" class-name="row10">
            <i-col span='4'>限制项名称</i-col>
            <i-col span='9'>限制条件</i-col>
            <i-col span='2'>操作</i-col>
          </Row>
          <Row v-for='(item,index) in limit' :key='index' type="flex" justify="space-between" class-name="row10">
            <i-col span='4'>{{ item.ruleName }}</i-col>
            <i-col span='9' v-if='item.ruleId == 3'>
              <Row type="flex" justify="space-between" align='middle'>
                <i-col span='10'>
                  <i-input v-model="item.data[0]" :disabled="isDisb" />
                </i-col>
                <i-col span='4'>至</i-col>
                <i-col span='10'>
                  <i-input v-model="item.data[1]" :disabled="isDisb" />
                </i-col>
              </Row>
            </i-col>
            <i-col span='14' v-else-if='item.ruleId == 4'>
              <selsect :disabled_s="isDisb" @change="changeCity(index,$event)" :arr='item.data' :styles="150" />
            </i-col>
            <i-col span='9' v-else>
              <Select v-model="item.ruleValue" :disabled="isDisb"  @on-change='selectDrap(index,limit,0,$event)'>
                <Option v-for="(val,i) in item.data" :value="item.ruleId==5?val.orgId:val.dicId" :key="i">{{ val.name }}</Option>
              </Select>
            </i-col>
            <i-col span='2'>
              <Icon type="ios-trash" color='#FF565A' size='28' @click="deleLimitItem(index,item.fors)" v-if='!isDisb' />
            </i-col>
          </Row>
          <Row v-if='!isDisb' class-name="row10" type="flex" justify="center">
            <Button @click="showModal(2)" class="add">+添加限制项</Button>
          </Row>
        </i-col>
      </Row>
      <Row v-if='args.zmType==2' class-name="row">
        <i-col span='3'>优先设置</i-col>
        <i-col span='12'>
          <Row type="flex" justify="space-between" class-name="row10">
            <i-col span='2'>序号</i-col>
            <i-col span='10'>优先项名称</i-col>
            <i-col span='4'>操作</i-col>
          </Row>
          <Row v-for='(item,index) in good' :key='index' type="flex" justify="space-between" class-name="row10">
            <i-col span='2'>{{index+1}}</i-col>
            <i-col span='10'>
              <Row>
                <i-col :span=' ~~item.ruleId == 23?8:24'>{{ item.ruleName }}</i-col>
                <i-col span='12' push='2' v-if=' ~~item.ruleId == 23'>
                  <Select v-model="item.ruleValue" @on-change='selectDrap(index,good,1,$event)' :disabled="isDisb">
                    <Option v-for="(val,i) in item.data" :value="val.dicId" :key="i">{{ val.name }}</Option>
                  </Select>
                </i-col>
              </Row>
            </i-col>
            <i-col span='4'>
              <Row>
                <i-col span='10'>
                  <Icon type="md-arrow-up" color='#FF565A' size='28' @click="ranktab(index)" v-if='!isDisb' />
                </i-col>
                <i-col span='10' push='2'>
                  <Icon type="ios-trash" color='#FF565A' size='28' @click="deleGoodItem(index,item.fors)" v-if='!isDisb' />
                </i-col>
              </Row>
            </i-col>
          </Row>
          <Row v-if='!isDisb' class-name="row10" type="flex" justify="center">
            <Button @click="showModal(3)" class="add">+添加优先项</Button>
          </Row>
        </i-col>
      </Row>
      <Row class-name="row">
        <i-col span='3'><span>集合时间</span></i-col>
        <i-col span='4'>
          <XDatePicker size="large" placeholder="请输入" :value="args.setTime" type="datetime" @on-change="changeDate" :disabled="isDisb" :options="options" format="yyyy-MM-dd HH:mm"></XDatePicker>
        </i-col>
      </Row>
      <Row class-name="row">
        <i-col span='3'><span>集合地址</span></i-col>
        <i-col span='4'>
          <Button  v-if="!isDisb" :disabled="onlineFlag==0? true:false" @click="getAdr" size='large' style="margin-bottom:20px;">{{ args.setAddr?args.setAddr:"点击选中地址"}}</Button>
          <Button v-else :disabled="isDisb" @click="getAdr" size='large' style="margin-bottom:20px;">{{ args.setAddr?args.setAddr:"点击选中地址"}}</Button>
          <Input  v-model="args.addressSup" placeholder="请输入详细地址" :disabled="isDisb||onlineFlag==0? true:false" />
        </i-col>
      </Row>
      <Row>
        <i-col span='3' style='visibility: hidden;'>操作</i-col>
        <i-col span='5'>
          <div>
            <Button shape="circle" size='large' @click="()=>{this.$router.back()}" style="margin-right:10px" class="success">返回</Button>
            <Button shape="circle" size='large' @click="success()" class="success">完成</Button>
          </div>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
import { getActiveType, getActiveSign, getActiveLimit, getGood } from '@/request/api'
import { getAdressId, getAreaAdress } from '@/libs/utils'
import adress from '_c/map'
import selsect from '_c/selsect'
import { constants, truncate } from 'fs'
export default {
  data() {
    return {
      TimeId:null,
      navigation1: {
        head: '志愿者编辑招募报名项(志愿者)'
      },
      options: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      titles: ['设置报名项', '设置限制项', '设置优先项'],
      state: 1,
      modal: false,
      adr: false,
      i: null,
      status:'',
      userId: null,
      goodList: [],
      good: [],
      limitList: [],
      limit: [],
      isDisb: false,
      items: [],
      feedList: [
        { name: '单行文本', type: 1 },
        { name: '多行文本', type: 6 },
        { name: '单选问题', type: 3 },
        { name: '多选问题', type: 4 }
      ],
      array: [],
      onlineFlag:null,
      args: {
        userPositionName: null,
        userPosition: null,
        zmType: null,
        roleId: 2,
        isAutoChoose: 2,
        isTrainMust: 2,
        subsidyCash: 0,
        subsidyType: 0,
        sysId: 2,
        coActivityItemList: [],
        coActivityRuleParamList: []
      }
    }
  },

  components: { adress, selsect },
  watch:{
    onlineFlag(newVal, oldVal){
        if(newVal == 0){
          this.args.setAddr = '点击选中地址'
          this.args.addressSup = ''
        }
    },
  },
  computed: {},

  created() {
    if(this.$route.query.status){
      this.status = this.$route.query.status

    }
    
    this.initData()
    this.dealData()
  },

  methods: {
    changeTeam(val) {
      let args = {
        userPositionName: this.args.userPositionName,
        userPosition: this.args.userPosition,
        zmType: val,
        roleId: 2,
        isAutoChoose: 2,
        isTrainMust: 2,
        subsidyCash: 0,
        subsidyType: 0,
        sysId: 2,
        coActivityItemList: [],
        coActivityRuleParamList: []
      }
      this.args = args
    },
    showModal(index) {
      this.modal = true
      this.state = index
    },
    getAdr() {
      if (this.isDisb) return
      this.adr = !this.adr
    },
    signItem() {
      if (this.isEdit !== 2) {
        let itemList = this.args.coActivityItemList
        for (let item of itemList) {
          if (
            (~~item.targetType === 3 || ~~item.targetType === 4) &&
            typeof item.arr[0] !== 'object'
          ) {
            let arr = []
            let list = item.arr
            for (let m = 0, len = list.length; m < len; m++) {
              arr.push({ value: list[m] })
            }
            item.arr = arr
          }
        }
        this.args.coActivityItemList = itemList
      }
    },
    sperl() {
      if (this.isEdit == 2) return
      let itemList = this.limit
      for (let item of itemList) {
        if (item.ruleId == 3) {
          item.data = item.ruleValue.split(',')
        } else if (item.ruleId == 4) {
          let arr = item.ruleValue.split(',')
          item.data = getAreaAdress(arr[0], arr[1], arr[2])
        } else {
          for (let as of this.data.arr) {
            if (as.ruleId == item.ruleId && as.data) {
              item.data = as.data
              break
            }
          }
        }
      }
      this.limit = itemList
    },
    changeCity(i, e) {
      this.$set(this.limit[i], 'ruleValue', e.join(','))
    },
    changeDate(e, m) {
      this.args.setTime = e + ':00'
    },
    changePos(e) {
      this.args.userPositionName = e.label
    },
    selectDrap(index, arr, m, e) {
      let id = arr[index].ruleId
    console.log(1);
    
      if (id == 2 || id == 5 || (m == 1 && id == 23)) {
        arr.forEach((val, i) => {
          if (val.ruleId == id && val.ruleValue == e && index !== i) {
            this.$set(arr[index], 'ruleValue', '')
            this.$Message.warning('不能重复选择')
            return
          }
        })
      }
    },
    addItem(item, isNewItem, index) {
      let itemList = this.args.coActivityItemList

      if (isNewItem == 0) {
        let isShow = this.forDisable(item.name, itemList, 'itemName', [])
        if (!isShow) return
      }
      let itemId = isNewItem === 0 ? item.itemId : null
      let itemName = isNewItem === 0 ? item.name : null
      let itemType = isNewItem === 0 ? item.typeFlag : item.type
      let sort = itemList.length + 1
      let args = { itemName, itemType, isMustWrite: 0, isNewItem, itemId, sort, sysId: 2 }

      if ((itemType == 3 && isNewItem == 1) || itemType == 4) {
        args.arr = [{ value: null }, { value: null }, { value: null }]
      }
      itemList.push(args)
      this.args.coActivityItemList = itemList
    },
    deleItem(i, m, fors) {
      console.log(2);
      
      let items = this.args.coActivityItemList
      if (m !== null) {
        let arr = items[i].arr
        if (arr.length > 2) {
          arr.splice(m, 1)
        } else {
          this.$Message.warning('必须留两个')
          return
        }
      } else {
        if (items[i].isNewItem == 0) {
          this.$set(this.items[i], 'disabled', false)
        }
        items.splice(i, 1)
      }
      for (let i = 0, len = items.length; i < len; i++) {
        items[i].sort = i + 1
      }
      this.args.coActivityItemList = items
    },
    addSignIput(i) {
      console.log(3);
      
      let items = this.args.coActivityItemList
      let arr = items[i].arr
      arr.push({ value: null })
      this.args.coActivityItemList = items
    },
    deleLimitItem(m, fors) {
      console.log(4);
      
      let limit = this.limit
      limit.splice(m, 1)
      for (let i = 0, len = limit.length; i < len; i++) {
        limit[i].sort = i + 1
      }
      this.limit = limit
    },
    addLimitItem(item, index) {
      let limit = this.limit
      let isShow = this.forDisable(item.name, limit, 'ruleName', ['志愿特长', '所属社团限制'])
      if (!isShow) return
      let data = item.ruleId == 4 ? [] : item.ruleId == 3 ? ['', ''] : item.data
      let ruleValue = item.ruleId == 4 ? '1,1,1' : null
      limit.push({
        ruleId: item.ruleId,
        ruleType: 1,
        ruleValue,
        ruleName: item.name,
        data,
        sort: limit.length + 1,
        sysId: 2,
        typeFlag: 3
      })
      this.limit = limit
    },
    ranktab(i) {
      console.log(5);
      
      let good = this.good
      let emp = good[i]
      good.splice(i, 1)
      good.unshift(emp)
      for (let i = 0, len = good.length; i < len; i++) {
        good[i].sort = i + 1
      }
      this.good = good
    },
    deleGoodItem(i, fors) {
      console.log(6);
      
      let good = this.good
      good.splice(i, 1)
      for (let i = 0, len = good.length; i < len; i++) {
        good[i].sort = i + 1
      }
      this.good = good
    },
    addGoodItem(item, index) {
      if (~~this.args.zmType === 2 && ~~this.args.isAudit === 1) {
        this.$Message.warning('您已设置为报名需审核，无法再次设置优先条件')
        return
      }
      let good = this.good
      let isShow = this.forDisable(item.name, good, 'ruleName', ['特长优先'])
      if (!isShow) return
      good.push({
        ruleId: item.ruleId,
        ruleType: 2,
        ruleValue: null,
        ruleName: item.name,
        sort: good.length + 1,
        data: item.object ? item.object : [],
        sysId: 2,
        typeFlag: 3
      })
      this.good = good
    },
    initData() {
      let userId = localStorage.getItem('userId')
      getActiveLimit({ roleId: 2, sysId: 2, userId }).then(res => {
        this.limitList = res.data
      })
      getActiveType({ typeFlag: 15 }).then(res => {
        this.array = res.data
      })
      getActiveSign({}).then(res => {
        this.items = res.data
      })
      getGood({ roleId: 2, sysId: 2, userId }).then(res => {
        this.goodList = res.data
      })
    },
    dealData() {
      console.log(7);
      
      this.i = this.$route.query.i
      let data = JSON.parse(sessionStorage.getItem('data'))

     
      if (this.status == 5) {
        this.isDisb = false;
      }else{
         this.isDisb = data.isDisb
      }
      this.isEdit = data.isEdit
      this.onlineFlag = data.args.onlineFlag
      if (this.i != -1) {
        let args = Object.assign(this.args, data.args.coActivityUserConfParamList[this.i])
        this.args = args
        this.forList()
        this.signItem()
      } else {
        this.args.coActivityItemList = [...data.args.coActivityItemList]
      }
    },
    forDisable(name, list, nms, arr) {
      for (let item of list) {
        if (item[nms] == name && arr.indexOf(item[nms]) == -1) {
          this.$Message.warning('重复添加')
          return false
        }
      }
      return true
    },
    forList() {
      let list = [...this.args.coActivityRuleParamList]
      let limit = []
      let good = []
      if (list.length > 0) {
        list.forEach((item, i) => {
          if (item.ruleType == 1) {
            if (item.ruleId == 3) {
              item.data = item.ruleValue.split(',')
              limit.push(item)
            } else if (item.ruleId == 4) {
              let arr = item.ruleValue.split(',')
              item.data = getAreaAdress(arr[0], arr[1], arr[2])
              limit.push(item)
            } else {
              if (this.limitList.length > 0) {
                this.limitList.forEach(key => {
                  if (key.ruleId == item.ruleId && key.data) {
                      item.data = [...key.data] 
                      limit.push(item)
                  }
                })
              } else {
                let userId = localStorage.getItem('userId')
                getActiveLimit({ roleId: 2, sysId: 2, userId }).then(res => {
                  this.limitList = res.data
                  res.data.forEach(key => {
                    if (key.ruleId == item.ruleId && key.data) {
                     item.data = [...key.data]
                     item.ruleValue = parseInt(item.ruleValue) 
                     limit.push(item)
                    }
                  })
                })
              }
            }
          
            
          } else {
            good.push(list[i])
          }
        })
      }
      this.limit = limit
      this.good = good
    },
    splitLimit() {
      let limit = this.limit
      for (let i = 0, len = limit.length; i < len; i++) {
        if (limit[i].ruleId == 3) {
          this.$set(limit[i], 'data', limit[i].ruleValue.split(','))
        } else if (item.ruleId == 4) {
          let arr = item.ruleValue.split(',')
          let data = getAreaAdress(arr[0], arr[1], arr[2])
          this.$set(limit[i], 'data', data)
        } else {
          for (let as of this.limitList) {
            if (as.ruleId == limit[i].ruleId && as.data) {
              this.$set(limit[i], 'data', as.data)
              break
            }
          }
        }
      }
    },
    isNumber(){
      // 招募数量
     let value = this.args.recruitNum
      if( value.toString().includes(".")|| 0 > value){
        this.$Message.error({
            background: true,
            content: '请输入大于0的整数！'
        });   
        this.args.recruitNum = ""
      }
    },
    getMap(e) {
      this.args.provinceId = e.provinceId
      this.args.cityId = e.cityId
      this.args.districtId = e.districtId
      this.args.xx = e.xx
      this.args.yy = e.yy
      this.$set(this.args, 'setAddr', e.address)
    },
    success() {
      // 节流阀
      if(this.timeId) return
      this.timeId = true
      setTimeout(()=>{
        this.timeId = false
      },2000)
      // end
      let args = this.args
      if (!args.userPosition) {
        this.$Message.warning('岗位没填')
        return
      } else if (!args.zmType) {
        this.$Message.warning('模式没填')
        return
      } else if (!args.recruitNum || args.recruitNum == 0) {
        this.$Message.warning('招募数量没填写')
        return
      } else if (~~args.zmType == 2 && !!args.apptNum && ~~args.recruitNum > ~~args.apptNum) {
        this.$Message.warning('可预约人数不能小于招募人数')
        return
      } else if (args.coActivityItemList.length !== 0) {
        let list = args.coActivityItemList
        for (let item of list) {
          if (!item.itemName) {
            this.$Message.warning('设置报名项有的名称没填写')
            return
          } else if (item.arr) {
            for (let val of item.arr) {
              if (!val.value) {
                console.log(val.value)
                this.$Message.warning('设置报名项的选项没填写')
                return
              }
            }
          }
        }
      } else if (this.limit.length !== 0) {
        for (let item of this.limit) {
          if (item.ruleId == 3 && (item.data[0] == '' || item.data[1] == '')) {
            this.$Message.warning('限制项年龄没填写')
            return
          } else if (item.ruleId == 3 && ~~item.data[0] > ~~item.data[1]) {
            this.$Message.warning('限制项年龄范围不正确')
            return
          } else if (item.ruleId !== 3 && item.ruleId !== 4 && !item.ruleValue) {
            this.$Message.warning('限制项下拉没选择')
            return
          }
        }
      } else if (this.good.length !== 0) {
        for (let item of this.good) {
          if (~~item.ruleId === 23 && !item.ruleValue) {
            this.$Message.warning('优先项下拉没选择')
            return
          }
        }
      }
      let data = JSON.parse(sessionStorage.getItem('data'))
      let list = data.args.coActivityUserConfParamList
      for (let item of list) {
        if (item.userPosition == args.userPosition && this.i == -1) {
          this.$Message.warning('岗位不能重复')
          return
        }
      }
      if (!args.apptNum) args.apptNum = args.recruitNum
      let limit = this.limit
      for (let val of limit) {
        if (val.ruleId == 3) {
          val.ruleValue = val.data.join(',')
        }
      }
      args.coActivityRuleParamList = [...limit, ...this.good]
      if (this.i !== -1) {
        data.args.coActivityUserConfParamList[this.i] = args
        console.log(data.args.coActivityUserConfParamList[this.i], args)
      } else {
        let arr = data.args.coActivityUserConfParamList
        arr.push(args)
        data.args.coActivityUserConfParamList = arr
      }
      sessionStorage.setItem('data', JSON.stringify(data))
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
.success {
  width: 150px;
  border-radius: 30px;
  background: #ff565a !important;
  color: #fff !important;
  border-color: #ff565a !important;
}
.wap {
  * {
    font-size: 16px;
  }
  .btn {
    margin-right: 10px !important;
    margin-bottom: 10px !important;
  }
  .btn:hover {
    border-color: #ff565a;
    color: #ff565a;
  }
}
.post {
  padding: 20px 50px;
  border-radius: 20px;
  background: #fff;
  * {
    font-size: 16px;
  }
  .row {
    margin-bottom: 20px;
    .add {
      margin-top: 30px;
    }
    .row10 {
      margin-bottom: 10px;
    }
  }
}
</style>
