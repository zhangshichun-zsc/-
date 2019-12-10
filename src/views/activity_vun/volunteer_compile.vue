<!--志愿者编辑招募报名项（志愿者）-->
<template>
  <div>
    <adress :value='adr' @change='getMap'/>
    <Navigation :labels="navigation1"></Navigation>
 
    <div class="post">
      <ul>
        <li class="flex-between">
          <span class="post-left">招募类型</span>
          <div>
            <Select v-model="args.userPosition" style="width:300px" @on-change='changePos' :label-in-value='true'>
              <Option
                v-for="(item,index) in array"
                :value="item.dicId"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </div>
        </li>
        <li class="flex-between">
          <span class="post-left">模式</span>
          <div>
            <RadioGroup v-model="args.zmType">
              <Radio label="1">先到先得</Radio>
              <Radio label="2">预约型</Radio>
            </RadioGroup>
          </div>
        </li>
        <li class="flex-between">
          <span class="post-left">招募数量：</span>
          <div><i-input v-model="args.recruitNum"  type="number"  style="width:300px"/></div></li>
        <li class="flex-between" v-if='args.zmType==2'>
          <span class="post-left">可预约数量：</span>
          <div><i-input v-model="args.apptNum"  type="number" style="width:300px"/></div></li>
        <li class="flex-start">
          <span class="post-left">报名项设置</span>
          <div>
            <p class="flex-between"><span>报名项名称</span><span>是否必填</span><span>操作</span></p>
            <div v-for="(item,index) in args.coActivityItemList" :key='index'>
              <div class="flex-between" v-if=' ~~item.itemType === 7 '>
                <span>{{ item.itemName }}</span>
                <div>
                  <i-switch v-model="item.isMustWrite" :true-value='1' :false-value='0'/>
                  <span>必填</span>
                </div>
                <Icon type="ios-trash" @click="deleItem(index,null,item.fors)" v-if='!isDisb'/>
              </div>
              <div class="flex-between" v-else-if=' ~~item.itemType  === 1 '>
                <i-input placeholder="请输入单文本标题" v-model="item.detailText" :disabled="isDisb" style="width:300px"/>
                <div>
                  <i-switch  v-model="item.isMustWrite" :true-value='1' :false-value='0' />
                  <span>必填</span>
                </div>
                <Icon type="ios-trash" @click="deleItem(index,null,item.fors)" v-if='!isDisb'/>
              </div>
              <div class="flex-between" v-else-if=' ~~item.itemType  === 6 '>
                <i-input placeholder="请输入多行文本标题" v-model="item.detailText" :disabled="isDisb" style="width:300px"/>
                 <div>
                  <i-switch v-model="item.isMustWrite" :true-value='1' :false-value='0' />
                  <span>必填</span>
                </div>
                <Icon type="ios-trash" @click="deleItem(index,null,item.fors)" v-if='!isDisb'/>
              </div>
              <div class=""  v-else-if=' ~~item.itemType  === 3 '>
                <div v-if='item.isNewItem == 0' class="flex-between">
                  <span>{{item.itemName}}</span> 
                  <div>
                    <i-switch  v-model="item.isMustWrite" :true-value='1' :false-value='0' />
                    <span>必填</span>
                  </div>
                  <Icon type="ios-trash" @click="deleItem(index,null)" v-if='!isDisb'/>
                </div>
                <div v-else>
                  <div class="flex-between">
                    <i-input placeholder="请输入单选标题" v-model="item.detailText" :disabled="isDisb" style="width:300px"/>
                    <div>
                      <i-switch v-model="item.isMustWrite" :true-value='1' :false-value='0' />
                      <span>必填</span>
                    </div>
                    <Icon type="ios-trash" @click="deleItem(index,null)" v-if='!isDisb'/>
                  </div>
                  <div class="item flex-between" v-for="(val,i) in item.arr" :key='i'>
                    <i-input :placeholder="`输入选项${i+1}`" v-model="val.value" :disabled="isDisb" style="width:300px"/>
                    <Icon type="ios-trash" @click="deleItem(index,i)" v-if='!isDisb'/>
                  </div>
                  <Button type="primary" ghost  @click="addSignIput(index)" v-if='!isDisb'>+</Button>
                </div>
              </div>
              <div class=""  v-else-if=' ~~item.itemType  === 4 '>
                <div class="flex-between">
                  <i-input placeholder="请输入多选标题" v-model="item.detailText" :disabled="isDisb" style="width:300px"/>
                  <div>
                    <i-switch  v-model="item.isMustWrite" :true-value='1' :false-value='0'  />
                    <span>必填</span>
                  </div>
                  <Icon type="ios-trash" @click="deleItem(index,null)" v-if='!isDisb'/>
                </div>
                <div class="item flex-between" v-for="(val,i) in item.arr" :key='i'>
                  <input :placeholder="`输入选项${i+1}`" v-model="val.value" :disabled="isDisb" style="width:300px"/>
                  <Icon type="ios-trash" @click="deleItem(index,i)" v-if='!isDisb'/>
                </div>
                 <Button type="primary" ghost  @click="addSignIput(index)" v-if='!isDisb'>+</Button>
              </div>
            </div>
            <div class="items">
              <p>新增报名项</p>
              <div>
                <div class="flex-start">
                  <span class="items-tit">常用报名项</span>
                  <div class="flex-wrap-start ">
                    <Button type="primary" v-for="(item,index) in items" :key='index' @click="addItem(item,0,index)"  :disabled='item.disabled' class="item">{{ item.name }}</Button>
                  </div>
                </div>
                <div class="flex-start">
                  <span class="items-tit">自定义报名项</span>
                  <div class="flex-start ">
                     <Button type="primary"  v-for="(item,index) in feedList" :key='index' @click="addItem(item,1)" class="item">{{ item.name }}</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="flex-between">
          <span class="post-left">岗位职责</span>
          <div> <i-input placeholder="请输入岗位职责" v-model="args.positionComments" :disabled="isDisb"/></div>
        </li>
        <li class="flex-start">
          <span class="post-left">限制设置</span>
          <div>
            <p class="flex-between"><span>常用限制项</span><span>是否必填</span><span>操作</span></p>
            <div>
              <div v-for='(item,index) in limit' :key='index' class="flex-between">
                <span>{{ item.ruleName }}</span>
                <div>
                  <div v-if='item.ruleId == 3'>
                    <i-input v-model="item.data[0]" :disabled="isDisb"/>
                    <span>至</span>
                    <i-input v-model="item.data[1]" :disabled="isDisb"/>
                  </div>
                  <div v-else-if='item.ruleId == 4'>
                   <selsect @change="changeCity(index,$event)" :arr='proCity(item.ruleValue)'/>
                  </div>
                  <div v-else>
                    <Select v-model="item.ruleValue" style="width:200px" @on-change='selectDrap(index,limit,0,$event)'>
                      <Option
                        v-for="(val,i) in item.data"
                        :value="item.ruleId==5?val.orgId:val.dicId"
                        :key="i"
                      >{{ val.name }}</Option>
                    </Select>
                  </div>
                </div>
                <Icon type="ios-trash"  @click="deleLimitItem(index,item.fors)" v-if='!isDisb'/>
              </div>
              <div class="items flex">
                <p class="items-tit">常用限制项</p>
                <div class="flex-start ">
                  <Button type="primary" :disabled='item.disabled'  v-for="(item,index) in limitList" :key='index' @click="addLimitItem(item,index)">{{ item.name }}</Button>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="flex-start"  v-if='args.zmType==2'>
          <span class="post-left">优先设置</span>
          <div>
             <p class="flex-between"><span>报名项名称</span><span>是否必填</span><span>操作</span></p>
             <div>
                <div v-for='(item,index) in good' :key='index' class="flex-between">
                 <span>{{index+1}}</span>
                 <span>{{ item.ruleName }}</span>
                 <div v-if=' ~~item.ruleId == 23'>
                    <Select v-model="item.ruleValue" style="width:300px" @on-change='selectDrap(index,good,1,$event)'>
                      <Option
                        v-for="(val,i) in item.data"
                        :value="val.dicId"
                        :key="i"
                      >{{ val.name }}</Option>
                    </Select>
                 </div>
                 <div>
                   <Icon type="md-arrow-up" color='red' @click="ranktab(index)"/>
                   <Icon type="ios-trash"  @click="deleGoodItem(index,item.fors)" v-if='!isDisb'/>
                  </div>
                </div>
                <div class="items flex">
                  <p class="items-tit">优先规则库</p>
                  <div class="flex-start ">

                   <Button type="primary" :disabled='item.disabled'  v-for="(item,index) in goodList" :key='index' @click="addGoodItem(item,index)">{{ item.name }}</Button>
                    </div>
                </div>
             </div>
          </div>
        </li>
        <li class="flex-between">
          <span class="post-left">集合时间</span>
          <DatePicker  size="small" placeholder="Select time" v-model="args.setTime" type='datetime' @on-change="changeDate"/>
        </li>
        <li class="flex-between">
          <span class="post-left">集合地址</span>
          <div>
             <span @click="()=>{this.adr = true}">{{ args.setAddr?args.setAddr:"点击选中地址"}}</span>
          </div>
        </li>
        <li><Button type="primary" @click="success()">完成</Button></li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getActiveType,getActiveSign,getActiveLimit,getGood } from '@/request/api'
import { getAdressId,getAreaAdress } from '@/libs/utils'
import adress from'_c/map'
import selsect from '_c/selsect'
export default {
  data () {
    return {
      navigation1: {
        head: "志愿者编辑招募报名项(志愿者)"
      },
      adr:false,
      i:null,
      userId:null,
      goodList:[],
      good:[],
      limitList:[],
      limit:[],
      isDisb:false,
      items:[],
      feedList:[{name:'单行文本',type:1},{name:'多行文本',type:6 },{name:'单选问题',type:3},{name:'多选问题',type:4}],
      array:[],
      args:{
        zmType:null,
        roleId:2,
        isAutoChoose:2,
        isTrainMust:2,
        subsidyCash:0,
        subsidyType:0,
        sysId:2,
        coActivityItemList:[],
        coActivityRuleParamList:[]
    },
    }
  },

  components: { adress, selsect },

  computed: {
    proCity(){
      return (val)=>{
        if(!!val)return val.split(",")
        return []
      }
     
    }
  },

  created () {
    this.initData()
    this.dealData()
  },

  methods: {
    changeCity(i,e){
      this.$set(this.limit[i],'ruleValue',e.join(','))
    },
    changeDate(e,m){
      this.args.setTime = e
    },
    changePos(e){
      this.args.userPositionName = e.label
    },
    selectDrap(index,arr,m,e){
      let id = arr[index].ruleId
      if((id == 2 || id == 5) || (m==1&&id==23)){
        arr.forEach((val,i)=>{
          if(val.ruleId == id&&val.ruleValue == e&&index !== i){
            this.$set(arr[index],'ruleValue','')
            this.$Message.warning("不能重复选择")
            return
          } 
        })
      }

    },
    addItem(item,isNewItem,index){
      let fors = -1
      if(isNewItem == 0){
        this.$set(this.items[index],'disabled',true)
        fors = index
      }
      let itemList = this.args.coActivityItemList
      let itemId =  isNewItem === 0?item.itemId:null
      let itemName = isNewItem === 0?item.name:null
      let itemType = isNewItem === 0?item.typeFlag:item.type
      let sort = itemList.length+1
      let args = { itemName, itemType, isMustWrite: 0, isNewItem, itemId, sort, sysId: 2,fors }
      if (itemType == 3 || itemType == 4){
        args.arr = [{ value: null }, { value: null }, { value: null }]
      }
      itemList.push(args)
      this.args.coActivityItemList = itemList
    },
    deleItem(i,m,fors){
      if(fors !== -1&& fors !== undefined){
        this.$set(this.items[fors],'disabled',false)
      }
      let items = this.args.coActivityItemList
      if (m !== null) {
        let arr = items[i].arr
        if(arr.length >2){
          arr.splice(m, 1)
        }else{
          this.$Message.warning("必须留两个")
          return
        }
      } else {
        if(items[i].isNewItem == 0){
          this.$set(this.items[i],'disabled',false)
        }
        items.splice(i, 1)
      }
      for (let i = 0, len = items.length; i < len; i++) {
        items[i].sort = i + 1
      }
      this.args.coActivityItemList = items
    },
    addSignIput(i){
      let items = this.args.coActivityItemList
      let arr = items[i].arr
      arr.push({ value: null })
      this.args.coActivityItemList = items
    },
    deleLimitItem(m,fors){
      if(fors !== -1){
        this.$set(this.limitList[fors],'disabled',false)
      }
      let limit = this.limit
      limit.splice(m, 1)
      for (let i = 0, len = limit.length; i < len; i++) {
        limit[i].sort = i + 1
      }
      this.limit = limit
    },
    addLimitItem(item,index){
      let fors = -1
      if(item.ruleId !== 2 && item.ruleId !== 5){
        this.$set(this.limitList[index],'disabled',true)
        fors = index
      }
      let limit = this.limit
      let data = item.ruleId == 4?[]:item.ruleId ==3?['','']:item.data
      let ruleValue = item.ruleId == 4?"1,1,1":null
      limit.push({
        ruleId:item.ruleId,
        ruleType:1,
        ruleValue,
        ruleName:item.name,
        data,
        sort:limit.length+1,
        sysId:2,
        typeFlag:3,
        fors
      })
      this.limit = limit
    },
    ranktab(i){
      let good = this.good
      let emp = good[i]
      good.splice(i, 1)
      good.unshift(emp)
      for (let i = 0, len = good.length; i < len; i++) {
        good[i].sort = i + 1
      }
      this.good = good
    },
    deleGoodItem(i,fors){
      if(fors != -1) this.$set(this.goodList[fors],'disabled',false)
      let good = this.good
      good.splice(i, 1)
      for (let i = 0, len = good.length; i < len; i++) {
        good[i].sort = i + 1
      }
      this.good = good
    },
    addGoodItem(item,index){
      let fors = -1
      if(item.ruleId !== 23)  this.$set(this.goodList[index],'disabled',true); fors = index;
      let good = this.good
      good.push({
        ruleId: item.ruleId,
        ruleType: 2,
        ruleValue: null,
        ruleName: item.name,
        sort: good.length+1,
        data:item.object?item.object:[],
        sysId: 2,
        typeFlag: 3,
        fors
      })
      this.good = good
    },
    initData(){
      let userId = localStorage.getItem("userId")
      getActiveType({typeFlag:15}).then(res => {
        this.array = res.data
      })
      getActiveSign({}).then(res => {
        this.items = res.data
      })
      getActiveLimit({ roleId: 2, sysId:2, userId }).then(res => {
        this.limitList = res.data
      })
      getGood({ roleId:2, sysId:2, userId}).then(res => {
        this.goodList = res.data
      })
    },
    dealData(){
       this.i =  this.$route.query.i
       let data = JSON.parse(sessionStorage.getItem("data"))
       this.isDisb = data.isDisb
       if(this.i !== -1){
          this.args = Object.assign(this.args,data.args.coActivityUserConfParamList[this.i])
          this.forList()
       }
    },
    forList(){
      let list = this.args.coActivityRuleParamList
      let limit = [],good = []
      for(let i=0,len=list.length;i<len;i++){
        if (list[i].ruleType ==3){
          limit.push(list[i])
        }else{
          good.push(list[i])
        }
      }
      this.limit = limit
      this.good = good
      // this.splitLimit()
    },
    splitLimit() {
      let limit = this.limit
      for(let i=0,len=limit.length;i<len;i++){
        if(limit[i].ruleId == 3){
          this.$set(limit[i],"data",limit[i].ruleValue.split(','))
        }else if(item.ruleId == 4){
          let arr = item.ruleValue.split(',')
          let data = getAreaAdress(arr[0], arr[1], arr[2])
          this.$set(limit[i],"data",data)
        }else{
          for(let as of this.limitList){
            if (as.ruleId == limit[i].ruleId && as.data){
               this.$set(limit[i],"data",as.data)
              break
            }
          }
        }
      }
    },
    getMap(e){
      this.args.provinceId = e.provinceId
      this.args.cityId = e.cityId
      this.args.districtId = e.districtId
      this.args.xx = e.xx
      this.args.yy = e.yy
      this.$set(this.args,'setAddr',e.address)
    },
    success(){
      if (!this.args.userPosition){
        this.$Message.warning('岗位或没填')
        return
      }else if(!this.args.zmType){
        this.$Message.warning('模式没填')
        return
      } else if (!this.args.recruitNum || this.args.recruitNum == 0){
        this.$Message.warning('招募数量没填写')
        return
      }else if (~~this.args.zmType == 2 && !!this.args.apptNum &&~~this.args.recruitNum > ~~this.args.apptNum){
         this.$Message.warning('可预约人数不能小于招募人数')
      return
    } 
      let data = JSON.parse(sessionStorage.getItem("data"))
      let args = this.args
       if(!args.apptNum)args.apptNum = args.recruitNum
      let list = data.args.coActivityUserConfParamList
      for(let item of list){
        if(item.userPosition == args.userPosition && this.i == -1){
          this.$Message.warning('岗位不能重复')
          return
        }
      }
      let limit = this.limit
      for(let val of limit){
        if(val.ruleId == 3){
          val.ruleValue = (val.data).join(',')
        }
      }
      args.coActivityRuleParamList = [...limit,...this.good]
      if(this.i !== -1){
        data.args.coActivityUserConfParamList[this.i] = args
      }else{
        let arr = data.args.coActivityUserConfParamList
        arr.push(args)
        data.args.coActivityUserConfParamList = arr
      }
      console.log(data)
     sessionStorage.setItem('data',JSON.stringify(data))
      this.$router.back()
    }
  }
}

</script>
<style lang="scss" scoped>
.post {
  padding: 20px 50px;
  ul>li>div{
    flex: 1;
  }
  ul>li{
    margin-bottom: 20px;
    .post-left{
      display: block;
      width: 200px;
      margin-right: 30px;
    }
    .flex{
      display: flex;
    }
    .items{
      padding: 20px;
      background: #eee;
      .items-tit{
        width:100px;
        margin-right: 30px;
      }
      .flex-start{
        flex:1;
      }
      .items-one{
        display: flex;
      }
      .item{
        margin-right: 20px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
