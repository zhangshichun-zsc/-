<!--志愿者编辑招募报名项（志愿者）-->
<template>
  <div>
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
        <li class="flex-between"><span class="post-left">招募数量：</span><div><i-input v-model="args.recruitNum"  type="number"  style="width:300px"/></div></li>
        <li class="flex-between"><span class="post-left">可预约数量：</span><div><i-input v-model="args.apptNum"  type="number" style="width:300px"/></div></li>
        <li class="flex-between">
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
                <Icon type="ios-trash" @click="deleItem(index,null)" v-if='!isDisb'/>
              </div>
              <div class="flex-between" v-else-if=' ~~item.itemType  === 1 '>
                <i-input placeholder="请输入单文本标题" v-model="item.detailText" :disabled="isDisb" style="width:300px"/>
                <div>
                  <i-switch  v-model="item.isMustWrite" :true-value='1' :false-value='0' />
                  <span>必填</span>
                </div>
                <Icon type="ios-trash" @click="deleItem(index,null)" v-if='!isDisb'/>
              </div>
              <div class="flex-between" v-else-if=' ~~item.itemType  === 6 '>
                <i-input placeholder="请输入多行文本标题" v-model="item.detailText" :disabled="isDisb" style="width:300px"/>
                 <div>
                  <i-switch v-model="item.isMustWrite" :true-value='1' :false-value='0' />
                  <span>必填</span>
                </div>
                <Icon type="ios-trash" @click="deleItem(index,null)" v-if='!isDisb'/>
              </div>
              <div class=""  v-else-if=' ~~item.itemType  === 3 '>
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
                <div class="flex">
                  <span class="items-tit">常用报名项</span>
                  <div class="flex-start ">
                    <Button type="primary" v-for="(item,index) in items" :key='index' @click="addItem(item,0,index)"  :disabled='item.disabled' class="item">{{ item.name }}</Button>
                  </div>
                </div>
                <div class="flex">
                  <span class="items-tit">自定义报名项</span>
                  <div class="flex-start ">
                     <Button type="primary"  v-for="(item,index) in feedList" :key='index' @click="addItem(item,1)">{{ item.name }}</Button>
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
        <li class="flex-between">
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
                    <Select v-model="item.data[0]" style="width:200px" @on-change='changeProve(0,$event)' :label-in-value='true'>
                      <Option
                        v-for="(item,i) in area"
                        :value="i"
                        :key="i"
                      >{{ item.name }}</Option>
                    </Select>
                    <Select v-model="item.data[1]" style="width:200px" @on-change='changeProve(1,$event)' :label-in-value='true'>
                      <Option
                        v-for="(item,i) in area[val[0]].citys"
                        :value="i"
                        :key="i"
                      >{{ item.name }}</Option>
                    </Select>
                    <Select v-model="item.data[2]" style="width:200px" @on-change='changeProve(2,$event)' :label-in-value='true'>
                      <Option
                        v-for="(item,i) in area[val[0]].citys[val[1]].areas"
                        :value="i"
                        :key="i"
                      >{{ item }}</Option>
                    </Select>
                  </div>
                  <div v-else>
                    <Select v-model="item.ruleValue" style="width:200px">
                      <Option
                        v-for="(item,i) in item.data"
                        :value="item.dicId"
                        :key="i"
                      >{{ item.name }}</Option>
                    </Select>
                  </div>
                </div>
                <Icon type="ios-trash"  @click="deleLimitItem(index)" v-if='!isDisb'/>
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
        <li class="flex-between">
          <span class="post-left">优先设置</span>
          <div>
             <p class="flex-between"><span>报名项名称</span><span>是否必填</span><span>操作</span></p>
             <div>
                <div v-for='(item,index) in good' :key='index' class="flex-between">
                 <span>{{index+1}}</span>
                 <span>{{ item.ruleName }}</span>
                 <div>
                   <Icon type="md-arrow-up" color='red' @click="ranktab(index)"/>
                   <Icon type="ios-trash"  @click="deleGoodItem(index)" v-if='!isDisb'/>
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
             <iframe id="mapPage" width="100%" height="500px" frameborder=0
              src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=CEIBZ-KTJR3-XOB37-Y5LZ6-ZGMLH-CSF75&referer=myapp">
            </iframe>
          </div>
        </li>
        <li><Button type="primary" @click="success()">完成</Button></li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getActiveType,getActiveSign,getActiveLimit,getGood } from '@/request/api'
import { CITYSDATA } from '@/libs/sele'
import { getAdressId } from '@/libs/utils'
export default {
  data () {
    return {
      navigation1: {
        head: "志愿者编辑招募报名项(志愿者)"
      },
      i:null,
      userId:null,
      goodList:[],
      good:[],
      limitList:[],
      limit:[],
      isDisb:false,
      area:CITYSDATA,
      val:[0,0,0],
      name:[],
      items:[],
      feedList:[{name:'单行文本',type:1},{name:'多行文本',type:6 },{name:'单选问题',type:3},{name:'多选问题',type:4}],
      array:[],
      args:{
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

  components: {},

  computed: {},

  created () {
    this.initData()
    this.dealData()
    this.getMap()
  },

  methods: {
    changeDate(e,m){
      this.args.setTime = e
    },
    changePos(e){
      this.args.userPositionName = e.label
    },
    changeProve(i,e){
      this.$set(this.name,i,e.label)
    },
    addItem(item,isNewItem,index){
      if(isNewItem == 0){
        this.$set(this.items[index],'disabled',true)
      }
      let itemList = this.args.coActivityItemList
      let itemId =  isNewItem === 0?item.itemId:null
      let itemName = isNewItem === 0?item.name:null
      let itemType = isNewItem === 0?item.typeFlag:item.type
      let sort = itemList.length+1
      let args = { itemName, itemType, isMustWrite: 0, isNewItem, itemId, sort, sysId: 2}
      if (itemType == 3 || itemType == 4){
        args.arr = [{ value: null }, { value: null }, { value: null }]
      }
      itemList.push(args)
      this.args.coActivityItemList = itemList
    },
   deleItem(i,m){
      let items = this.args.coActivityItemList
      if (m !== null) {
        let arr = items[i].arr
        arr.splice(m, 1)
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
    deleLimitItem(m){
       this.$set(this.limitList[m],'disabled',false)
      let limit = this.limit
      limit.splice(m, 1)
      for (let i = 0, len = limit.length; i < len; i++) {
        limit[i].sort = i + 1
      }
      this.limit = limit
    },
    addLimitItem(item,index){
      console.log(item)
       this.$set(this.limitList[index],'disabled',true)
      let limit = this.limit
      let data = item.ruleId == 4?[0,0,0]:item.ruleId ==3?['','']:item.data
      limit.push({
        ruleId:item.ruleId,
        ruleType:3,
        ruleValue: null,
        ruleName:item.name,
        data,
        sort:limit.length+1,
        sysId:2,
        typeFlag:3,
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
    deleGoodItem(i){
       this.$set(this.goodList[i],'disabled',false)
      let good = this.good
      good.splice(i, 1)
      for (let i = 0, len = good.length; i < len; i++) {
        good[i].sort = i + 1
      }
      this.good = good
    },
    addGoodItem(item,index){
      this.$set(this.goodList[index],'disabled',true)
      let good = this.good
      good.push({
        ruleId: item.ruleId,
        ruleType: 4,
        ruleValue: null,
        ruleName: item.name,
        sort: good.length+1,
        sysId: 2,
        typeFlag: 3,
      })
      this.good = good
    },
    initData(){
      let userId = localStorage.getItem("userId")
      getActiveType({typeFlag:15}).then(res => {
        this.array = res.data
      })
      getActiveSign().then(res => {
        this.items = res.data
      })
      getActiveLimit({roleId: 2, userId}).then(res => {
        this.limitList = res.data
      })
      getGood({roleId:2}).then(res => {
        this.goodList = res.data
      })
    },
    dealData(){
       this.i =  this.$route.params.i
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
    },
    getMap(){
      window.addEventListener('message', (event)=> {
        var loc = event.data;
        if (loc && loc.module == 'locationPicker') {
        let geocoder = new qq.maps.Geocoder({
            complete:(result)=>{
              let obj = result.detail.addressComponents
              let arr = getAdressId(obj.province,obj.city,obj.district)
              console.log(arr,obj)
              this.args.provinceId = arr[0]
              this.args.cityId = arr[1]
              this.args.districtId = arr[2]
            }
        })
        let coord=new qq.maps.LatLng(loc.latlng.lat,loc.latlng.lng)
        geocoder.getAddress(coord)
        this.args.setAddr = loc.poiaddress
        this.args.xx = loc.latlng.lat 
        this.args.yy = loc.latlng.lng 
        }
      }, false)
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
      } 
      let data = JSON.parse(sessionStorage.getItem("data"))
      let args = this.args
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
        }else if(val.ruleId == 4){
          val.ruleValue = getAdressId(this.name[0],this.name[1],this.name[2]).join(',')
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
        margin-right: 30px;
      }
      .flex-start{
        flex:1;
      }
      .items-one{
        display: flex;
      }
      .item{
         white-space: pre-wrap;
      }
    }
  }
}
</style>
