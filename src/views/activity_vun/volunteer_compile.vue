<!--志愿者编辑招募报名项（志愿者）-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="post">
      <ul>
        <li class="flex-between">
          <span class="post-left">招募类型</span>
          <div>
            <Select v-model="args.userPosition" style="width:300px">
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
              <div class="ls-item" v-if=' ~~item.itemType === 5 '>
                <span>{{ item.itemName }}</span>
                <div>
                  <i-switch :value="item.isMustWrite===1" @on-change="changeWrite" />
                  <span>必填</span>
                </div>
                 <img class="icon" @click="deleItem(index)" v-if='!isDisb'/>
              </div>
              <div class="ls-item flex-between" v-else-if=' ~~item.itemType  === 1 '>
                <i-input placeholder="请输入单文本标题" v-model="item.detailText" :disabled="isDisb"/>
                <div>
                  <i-switch  v-model="item.isMustWrite" :true-value='1' :false-value='0'  />
                  <span>必填</span>
                </div>
                <img @click="deleItem(index,null)" v-if='!isDisb'/>
              </div>
              <div class="ls-item flex-between" v-else-if=' ~~item.itemType  === 6 '>
                <i-input placeholder="请输入多行文本标题" v-model="item.detailText" :disabled="isDisb"/>
                 <div>
                  <i-switch v-model="item.isMustWrite" :true-value='1' :false-value='0' />
                  <span>必填</span>
                </div>
                <img @click="deleItem(index,null)" 
                v-if='!isDisb'/>
              </div>
              <div class="ls-item"  v-else-if=' ~~item.itemType  === 3 '>
                <div class="flex-between">
                  <i-input placeholder="请输入单选标题" v-model="item.detailText" :disabled="isDisb"/>
                  <div>
                    <i-switch v-model="item.isMustWrite" :true-value='1' :false-value='0' />
                    <span>必填</span>
                  </div>
                  <img @click="deleItem(index,null)" v-if='!isDisb'/>
                </div>
                <div class="item flex-between" v-for="(val,i) in item.arr" :key='i'>
                  <i-input :placeholder="`输入选项${i+1}`" v-model="val.value" :disabled="isDisb"/>
                  <img @click="deleItem(index,i)" v-if='!isDisb'/>
                </div>
                <div class="item-add" @click="addSignIput(index)" v-if='!isDisb'>+</div>
              </div>
              <div class="ls-item" v-else>
                <div class="flex-between">
                  <i-input placeholder="请输入多选标题" v-model="item.detailText" :disabled="isDisb"/>
                  <div>
                    <i-switch  v-model="item.isMustWrite" :true-value='1' :false-value='0'  />
                    <span>必填</span>
                  </div>
                  <img @click="deleItem(index,null)" v-if='!isDisb'/>
                </div>
                <div class="item flex-between" v-for="(val,i) in item.arr" :key='i'>
                  <input :placeholder="`输入选项${i+1}`" v-model="val.value" :disabled="isDisb"/>
                  <img @click="deleItem(index,i)" v-if='!isDisb'/>
                </div>
                <div class="item-add" @click="addSignIput(index)" v-if='!isDisb'>+</div>
              </div>
            </div>
            <div class="items">
              <p>新增报名项</p>
              <div>
                <div class="flex">
                  <span class="items-tit">常用报名项</span>
                  <div class="flex-start "><span v-for="(item,index) in items" :key='index' class="item" @click="addItem(item,0)">{{ item.name }}</span></div>
                </div>
                <div class="flex">
                  <span class="items-tit">自定义报名项</span>
                  <div class="flex-start "><span class="item" v-for="(item,index) in feedList" :key='index' @click="addItem(item,1)">{{ item.name }}</span></div>
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
               <Select v-model="name[0]" style="width:200px" @on-change='changeProve'>
                      <Option
                        v-for="(item,i) in area"
                        :value="`${i},${0}`"
                        :key="i"
                      >{{ item.name }}</Option>
                    </Select>
                    <Select v-model="name[1]" style="width:200px" @on-change='changeProve'>
                      <Option
                        v-for="(item,i) in area[val[0]].citys"
                        :value="`${i},${1}`"
                        :key="i"
                      >{{ item.name }}</Option>
                    </Select>
                    <Select v-model="name[2]" style="width:200px" @on-change='changeProve'>
                      <Option
                        v-for="(item,i) in area[val[0]].citys[val[1]].areas"
                        :value="`${i},${2}`"
                        :key="i"
                      >{{ item }}</Option>
                    </Select>
              <div v-for='(item,index) in limit' :key='index' class="flex-between">
                <span>{{ item.ruleName }}</span>
                <div>
                  <div v-if='item.ruleId == 3'>
                    <i-input v-model="args.positionComments" :disabled="isDisb"/>
                    <span>至</span>
                    <i-input v-model="args.positionComments" :disabled="isDisb"/>
                  </div>
                  <div v-else-if='item.ruleId == 4'>
                    <Select v-model="name[0]" style="width:200px" @on-change='changeProve'>
                      <Option
                        v-for="(item,i) in area"
                        :value="`${i},${0}`"
                        :key="i"
                      >{{ item.name }}</Option>
                    </Select>
                    <Select v-model="name[1]" style="width:200px" @on-change='changeProve'>
                      <Option
                        v-for="(item,i) in area[val[0]].citys"
                        :value="`${i},${1}`"
                        :key="i"
                      >{{ item.name }}</Option>
                    </Select>
                    <Select v-model="name[2]" style="width:200px" @on-change='changeProve'>
                      <Option
                        v-for="(item,i) in area[val[0]].citys[val[1]].areas"
                        :value="`${i},${2}`"
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
                <img src="" alt="" class="icon" @click="deleLimitItem(index)" v-if='!isDisb'>
              </div>
              <div class="items flex">
                <p class="items-tit">常用限制项</p>
                <div class="flex-start "><span v-for="(item,index) in limitList" :key='index' class="add-item" @click="addLimitItem(item)">{{ item.name }}</span></div>
              </div>
            </div>
          </div>
        </li>
        <li class="flex-between">
          <span class="post-left">优先设置</span>
          <div>
             <p class="flex-between"><span>报名项名称</span><span>是否必填</span><span>操作</span></p>
             <div>
                <div v-for='(item,index) in good' :key='index'>
                 <span>{{index+1}}</span>
                 <span>{{ item.ruleName }}</span>
                 <div><img src="" alt=""  @click="ranktab(index)"/><img src="" alt="" class="icon" @click="deleGoodItem(index)"/></div>
                </div>
                <div class="items flex">
                  <p class="items-tit">优先规则库</p>
                  <div class="flex-start "><span v-for="(item,index) in goodList" :key='index' class="add-item" @click="addGoodItem(item)">{{ item.name }}</span></div>
                </div>
             </div>
          </div>
        </li>
        <li class="flex-between">
          <span class="post-left">集合时间</span>
          <TimePicker size="small" placeholder="Select time" v-model="args.setTime"></TimePicker>
        </li>
        <li class="flex-between">
          <span class="post-left">集合地址</span>
          <div>
             <iframe id="mapPage" width="100%" height="500px" frameborder=0
  src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=CEIBZ-KTJR3-XOB37-Y5LZ6-ZGMLH-CSF75&referer=myapp">
</iframe>
          </div>
        </li>
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
    this.getMap()
  },

  methods: {
    changeProve(e){
      console.log(e)
      let val = this.val
      let arr = e.split(',')
      let i = Number(arr[0])
      let index = Number(arr[1])
      val[index] = i
      this.val = val
    },
    addItem(item,isNewItem){
      let itemList = this.args.coActivityItemList
      let itemId =  isNewItem === 0?item.itemId:null
      let itemName = isNewItem === 0?item.name:null
      let itemType = isNewItem === 0?item.typeFlag:item.type
      let sort = itemList.length+1
      let args = { itemName, itemType, isMustWrite: 1, isNewItem, itemId, sort, sysId: 2}
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
      let limit = this.limit
      limit.splice(m, 1)
      for (let i = 0, len = limit.length; i < len; i++) {
        limit[i].sort = i + 1
      }
      this.limit = limit
    },
    addLimitItem(item){
      let limit = this.limit
      limit.push({
        ruleId:item.ruleId,
        ruleType:3,
        ruleValue: null,
        ruleName:item.name,
        data: item.ruleId == 4?[]:item.data,
        sort:itemList.length+1,
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
      let good = this.good
      good.splice(i, 1)
      for (let i = 0, len = good.length; i < len; i++) {
        good[i].sort = i + 1
      }
      this.good = good
    },
    addGoodItem(item){
      let good = this.good
      good.push({
        ruleId: item.ruleId,
        ruleType: 4,
        ruleValue: null,
        ruleName: item.name,
        sort: itemList.length+1,
        sysId: 2,
        typeFlag: 3,
      })
      this.good = good
    },
    initData(){
      getActiveType({typeFlag:15}).then(res => {
        this.array = res.data
      })
      getActiveSign().then(res => {
        this.items = res.data
      })
      getActiveLimit({roleId: 2, userId: 13}).then(res => {
        this.limitList = res.data
      })
      getGood({roleId:2}).then(res => {
        this.goodList = res.data
      })
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
      margin-right: 50rpx;
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
        display: inline-block;
        width: 50px;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        text-align: center;
        color: #fff;
        background: green;
        margin: 0 20px 20px 0;
        font-size: 18px;
      }
    }
  }
}
</style>
