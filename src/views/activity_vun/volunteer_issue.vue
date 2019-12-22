<!--志愿者活动发布（志愿者）-->
<template>
  <div>
    <adress v-model='adr' @change='getMap'/>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <p class="content-head">
        <span>活动发布</span>
        <Button @click="apply">设置常用报名项</Button>
      </p>
      <Row type="flex" justify="space-between" class-name="row20">
        <i-col span="12">
          <div class="publish-content">
            <div class="active-publish">
              <ul>
                <li>
                  <span>活动名称</span>
                  <Input v-model="args.name" placeholder="请输入名称" style="width: 300px" :disabled='isDisb'/>
                </li>
                <li class="start">
                  <span>封面图片</span>
                  <div class="start-wap start-firt">
                    <div class="upload shae" v-if='cover == null'>
                        <div class="file " @click="()=>{ this.$refs.filess.click()}">
                          <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="filess" @change="uploadFile('cover',$event)">
                          <Icon type="md-cloud-upload" :size='36' color="#FF565A"/>
                        </div>
                    </div>
                    <img class="imgss" v-else :src="cover"/>
                    <Icon type="ios-trash" v-if='cover !== null&&!isDisb' class="cancel" @click="cancelImg('cover')" color='#FF565A' size='28'/>
                  </div>
                </li>
                <li class="start">
                  <span>活动图片</span>
                  <div class="start-wap">
                    <div class="upload" v-if='image == null'>
                        <div class="file" @click="()=>{ this.$refs.files.click()}">
                          <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="files" @change="uploadFile('image',$event)">
                          <Icon type="md-cloud-upload" :size='36' color="#FF565A"/>
                        </div>
                    </div>
                    <img class="imgs" v-else :src="image"/>
                    <Icon type="ios-trash" v-if='image !== null&&!isDisb' class="cancel" @click="cancelImg('image')" color='#FF565A' size='26'/>
                  </div>
                </li>
                <li>
                  <span>活动归属团队</span>
                  <Select v-model="args.orgId" style="width:300px" placement='bottom'  :disabled='isDisb || (!isDisb && (status === 1 || status === 2))'>
                    <Option
                      v-for="(item,index) in orgList"
                      :value="item.orgId"
                      :key="index"
                    >{{ item.orgName }}</Option>
                  </Select>
                </li>
                <li class="flex-start">
                  <span>活动时间</span>
                   <DatePicker
                   :value='args.startAt'
                   type="datetime"
                   :options="options" 
                   placeholder="开始时间"
                  :disabled='isDisb'
                   confirm 
                   style="width: 150px"
                   @on-change="handleChange(0,'startAt',$event)"
                   @on-ok="successOk(0)"  
                   format="yyyy-MM-dd HH:mm"/>
                   <i>&nbsp;~&nbsp;</i>
                   <DatePicker
                   :value='args.endAt'
                   type="datetime"
                   :options="options"
                   :disabled='isDisb' 
                   placeholder="结束时间"
                   @on-change="handleChange(0,'endAt',$event)"
                   @on-ok="successOk(1)"  
                   confirm 
                   style="width: 150px"  
                   format="yyyy-MM-dd HH:mm"/>
                </li>
                <li class="flex-start">
                  <span>招募时间</span>
                  <DatePicker
                   :value='zhaStart'
                   type="datetime"
                   :options="options"
                   :disabled='isDisb' 
                   placeholder="开始时间"
                   confirm 
                   style="width: 150px"
                   @on-change="handleChange(1,'zhaStart',$event)"
                   @on-ok="successOk(2)"    
                   format="yyyy-MM-dd HH:mm"/>
                   <i>&nbsp;~&nbsp;</i>
                   <DatePicker
                   :value='zhaEnd'
                   :disabled='isDisb'  
                   type="datetime"
                   :options="options" 
                   placeholder="结束时间"
                   @on-change="handleChange(1,'zhaEnd',$event)"
                   @on-ok="successOk(3)"  
                   confirm 
                   style="width: 150px"  
                   format="yyyy-MM-dd HH:mm"/>
                </li>
              </ul>
            </div>
          </div>
        </i-col>
        <i-col span="12">
          <div class="publish-content">
            <div class="active-publish">
              <ul>
                <li class="flex-start">
                  <span>活动地址</span>
                  <div @click="getAdr" class="adr">{{ args.address == null?"点击选中地址":args.address}}</div>
                </li>
                <li>
                  <span>现场负责人</span>
                  <div class="juge">
                    <Input v-model="judge" placeholder="请输入" @on-change='changeInput' :disabled='isDisb'/>
                    <div class="juge-drap" v-if="showJudge">
                      <div class="drap-item" v-for="(item,index) in judgeList" :key='index' @click="getOwn(index)">
                        {{ item.result }}
                      </div>
                    </div>
                  </div>
                </li>
                <li class="jobs">
                  <span>招募岗位</span>
                  <p v-for="(item,index) in args.coActivityUserConfParamList" :key='index' @click.stop="jump(index)" style="cursor: pointer;">
                    <span>{{ item.userPositionName }}</span>
                    <span>{{ item.recruitNum }}人</span>
                    <span>
                      详情
                      <Icon type="ios-trash" @click.stop="deletUserPost(index)" v-if="!isDisb"/>
                    </span>
                  </p>
                </li>
                <li>
                  <Button @click="jump(-1)" v-if='!isDisb'>+新增招募角色</Button>
                </li>
                <li>
                  <span>是否交保险</span>
                  <RadioGroup v-model="args.isInsurance" :disabled='isDisb'>
                    <Radio label="1">是</Radio>
                    <Radio label="2">否</Radio>
                  </RadioGroup>
                </li>
                <li>
                  <span>是否允许空降</span>
                  <RadioGroup v-model="args.flyFlag" :disabled='isDisb'>
                    <Radio label="1">是</Radio>
                    <Radio label="2">否</Radio>
                  </RadioGroup>
                </li>
                <li>
                  <span>是否发放证书</span>
                  <RadioGroup v-model="args.isNeedCertMould" :disabled='isDisb'>
                    <Radio label="1">是</Radio>
                    <Radio label="2">否</Radio>
                  </RadioGroup>
                </li>
                <li>
                  <span>是否显示主办方小站</span>
                  <RadioGroup v-model="args.isShowHolder" :disabled='isDisb'>
                    <Radio label="1">是</Radio>
                    <Radio label="2">否</Radio>
                  </RadioGroup>
                </li>
                <li>
                  <span>活动分类</span>
                  <Select v-model="args.coActCatTypeList[0].typeDicId" style="width:300px" :label-in-value='true'  @on-change='changeSelect' :disabled='isDisb'>
                    <Option
                      v-for="(item,index) in array"
                      :value="item.dicId"
                      :key="index"
                    >{{ item.name }}</Option>
                  </Select>
                </li>
                <li class="active-cost">
                  <span>活动费用</span>
                  <div class="cost">
                    <Input v-model="args.pay" placeholder="请输入" style="width: 300px" type="number" :disabled='isDisb'/>
                    <p>此活动费用仅供参考，无需缴费</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </i-col>
      </Row> 
      <Row class-name="row20">
        <i-col span='3' push='1'>
          活动详情
        </i-col>
        <i-col span='16'  push='1'>
            <wangeditor id='wange' :labels="args.detail" @change='changeEditor' :disabled='status == 3 || status == 4?false:isDisb'/>
        </i-col>
      </Row>
      <Row class-name="row20">
        <i-col span='12' push='1'>
          <Row class-name="row20">
            <Row class-name="row10">
              <i-col span='3'>
                培训内容
              </i-col>
              <i-col span='3' push='2'>
                <i-switch v-model="isTrain" :true-value='1' :false-value='0' :disabled='isDisb'/>
              </i-col>
            </Row>
            <Row v-if='isTrain === 1'>
              <wangeditor :labels="train" id="ed1" @change='changeEditorTrain' :disabled='isDisb'/>
            </Row>
          </Row>
          <Row class-name="row20">
            <Row class-name="row10">
              <i-col span='3'>
                反馈内容
              </i-col>
              <i-col span='3' push='2'>
                <i-switch v-model="isFeedback" :true-value='1' :false-value='0' :disabled='isDisb'/>
              </i-col>
            </Row>
            <Row v-if='isFeedback === 1'>
              <Row v-for="(item,index) in feed" :key='index'>
                <Row v-if=' index == 0 ' class-name="row10" type="flex" justify="space-between">
                  <i-col span='5'>反馈简介</i-col>
                  <i-col span='16'> 
                    <i-input placeholder="请输入反馈内容" v-model="item.detailText" type="textarea" :disabled="isDisb" :row='4'/>
                  </i-col>
                </Row>
                <Row v-else-if='~~item.typeFlag === 9' class-name="row10" type="flex" justify="space-between">
                  <i-col span='5'>是否上传图片</i-col>
                  <i-col span='16'>
                    <i-switch :disabled="isDisb" :true-value='1' :false-value='0' v-model="item.detailText"/>
                  </i-col>
                </Row>
                <Row v-else-if=' ~~item.typeFlag === 1 || ~~item.typeFlag === 6 ' class-name="row10" type="flex" justify="space-between">
                  <i-col span='5'>
                    <i-input placeholder="标题" v-model="item.detailText" :disabled="isDisb"/>
                  </i-col>
                  <i-col span='4'>
                    <i-switch :disabled="isDisb" :true-value='1' :false-value='0' v-model="item.isMust"/>
                    <span>必填</span>
                  </i-col>
                  <i-col span='2'>
                      <Icon type="ios-trash"  @click="deleItem(index,null)" v-if='!isDisb' color='#FF565A' size='28'/>
                  </i-col>
                </Row>
                <Row v-else-if='~~item.typeFlag === 3 || ~~item.typeFlag === 4 '>
                  <Row type="flex" justify="space-between"  class-name="row10">
                    <i-col span='5'>
                      <i-input placeholder="请输入标题" v-model="item.detailText" :disabled="isDisb"/>
                    </i-col>
                    <i-col span='4'>
                      <i-switch :disabled="isDisb" :true-value='1' :false-value='0' v-model="item.isMust"/>
                      <span>必填</span>
                    </i-col>
                    <i-col span='2'>
                      <Icon type="ios-trash"  @click="deleItem(index,null)" v-if='!isDisb' color='#FF565A' size='28'/>
                    </i-col>
                  </Row>
                  <Row v-for="(val,i) in item.arr" :key='i' class-name="row10">
                    <i-col span='5'>
                        <i-input :placeholder="`输入选项${i+1}`" v-model="val.value" :disabled="isDisb"/>
                    </i-col>
                    <i-col span='2' push='2'>
                      <Icon type="ios-trash"  @click="deleItem(index,i)" v-if='!isDisb' color='#FF565A' size='28'/>
                    </i-col>
                  </Row>
                  <Row>
                    <i-col push='8' span='2'>
                      <Button type="primary" ghost  @click="addSignIput(index)" v-if='!isDisb'>+</Button>
                    </i-col>
                  </Row>
                </Row>
              </Row>
              <Row v-if='!isDisb'>
                <i-col span='3'>新增反馈项</i-col>
                <i-col span='19' push='2'>
                  <Button class="btn" v-for="(item,index) in feedList" :key='index' @click="addItem(item.type)">{{ item.name }}</Button>
                </i-col>
              </Row>
            </Row>
          </Row>
          <Row class-name="row20">
            <Button @click="add = true" v-if='!add'>添加</Button>
            <Row v-if='add'>
              <i-col span='4'>受益群体人数</i-col>
              <i-col span='4' push='2'>
                <Input v-model="args.memberGroupNum" placeholder="输入收益群体人数" :disabled="isDisb"/>
              </i-col>        
            </Row>
          </Row>
          <Row class-name="row20">
            <Radio v-model="single">
              我同意
              <a>《活动发布规则》</a>
            </Radio>
          </Row>
        </i-col>
      </Row>
      <Row class-name="row20">
        <i-col push='18' span='6'>
          <div class="btns">
            <Button @click="sumbmit(8)" shape="circle" size='large' class="left">存为草稿</Button>
            <Button type="success" @click="sumbmit(1)" shape="circle" size='large' class="right">提交申请</Button>
          </div>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
import { getActiveType, getActiveLimit, getActiveSign, getOrgTeam, getOrgId, orgimgdel, saveActive, getActiveRelse } from '@/request/api'
import { getAdressId } from '@/libs/utils'
import wangeditor from'_c/wangeditor'
import adress from'_c/map'
import { upload }from '@/request/http'
import { filterNull } from '@/libs/utils'
import { stat, constants } from 'fs'
export default {
  data() {
    return {
      options: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now()
        }
      },
      add:false,
      navigation1: {
          head: "志愿者活动发布(志愿者)"
      },
      single: false,
      adr:false,
      feedList:[{name:'单行文本',type:1},{name:'多行文本',type:6 },{name:'单选问题',type:3},{name:'多选问题',type:4}],
      isDisb:false,
      feed: [{
        sysId: 2,
        typeFlag: 1,
        targetType: 3,
        detailText: null,
        isMust: 2,
        sort: 1
      }, {
        sysId: 2,
        typeFlag: 9,
        targetType: 3,
        detailText: 0,
        isMust: 2,
        sort: 2
      }],
      train: null,
      isFeedback:0,
      isTrain: 0,
      actveType:'',
      array:[],
      judge:'',
      judgeList:[],
      showJudge:false,
      zhaStart:null,
      zhaEnd:null,
      isEdit:2,
      orgList:[],
      ab:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'],
      args:{
        isNeedCertMould:null,
        name:null,
        pic:null,
        coverPic:null,
        orgId:null,
        startAt:null,
        endAt:null,
        provinceId:null,
        cityId:null,
        districtId:null,
        address:null,
        xx:null,
        yy:null,
        ownerUserId:null,
        ownerUserName:null,
        ownerUserTel:null,
        flyFlag:null,
        isInsurance:null,
        voluCertMouldId:null,
        isShowHolder:null,
        detail:null,
        memberGroupNum: null,
        pay: null,
        releaseTime: null,
        activityQrcode: null,
        status: null,
        userId: null,
        voluXx: null,
        voluYy: null,
        volunteerMsgFlag: null,
        isNeedVolu: null,
        coActCatTypeList: [{
          typeDicId: null,
          typeDicName: null,
          typeFlag: 3
        }],
        coActivityUserConfParamList: [],
          sysId:2,
        typeFlag:3,
        isNeedVolu:0,
        isMouldFlag:1,
        isWorkAct:1,
        channel:2,
      },
      image:null,
      cover:null,
      once:false
    }
  },
  beforeRouteLeave (to, from, next) {
    if(to.name !== 'volunteer_compile')sessionStorage.removeItem("data")
     next()
  },
  components: { wangeditor, adress },

  created() {
    let isEdit = this.$route.query.isEdit || 2
    let status = this.$route.query.status || 0
    let isDisb = Number(isEdit) === 0 || Number(isEdit) === -1 || (Number(isEdit) === 1 && (Number(status) === 3 || Number(status) === 4))? true : false
    this.isEdit = isEdit
    this.status = status
    this.activityId = this.$route.query.activityId
    this.initData()
    this.getRelse()
  },
  beforeDestroy(){
    console.log(111)
  },
  methods: {
    getAdr(){
      if(this.isDisb)return
      this.adr = !this.adr
    },
    getRelse(){
      if(!this.activityId)return
      getActiveRelse({activityId:this.activityId}).then(res => {
        if(res.code == 200){
          let args = Object.assign(this.args, res.data)
          let add = !!args.memberGroupNum? true : false
          this.args = args
          this.args.startAt = res.data.startAt + ':00'
          this.args.endAt = res.data.endAt + ':00'
          this.image = res.data.picPath
          this.zhaStart = res.data.enrollStarttime + ':00' || null,
          this.zhaEnd = res.data.enrollEndtime + ':00' || null,
          this.judge = res.data.result || '',
          this.isFeedback = res.data.isFeedback || 0,
          this.isTrain = res.data.isTrain || 0,
          this.orgName = res.data.orgName,
          this.cover = res.data.coverPicPath,
          this.add = add
          this.separation()
          this.filter()
        }else{
          this.$Message.error(res.msg)
        }
      })
    },
    filter(){
      let list = this.args.coActivityUserConfParamList
      for(let item of list){
        if (item.coActivityItemList){
          this.forlist(item.coActivityItemList)
        }
        if (item.coActivityRuleParamList){
          this.forlist(item.coActivityRuleParamList)
        }
      }
      this.args.coActivityUserConfParamList = list
    },
    forlist(list){
      for (let val of list) {
        if (val.actUserConfId || val.activityId || val.activityRuleId) {
          delete val.actUserConfId
          delete val.activityId
          delete val.activityRuleId
        }
        if (val.activityItemId){
          delete val.activityItemId
        }
      }
    },
    separation(){
      let args = this.args
      this.train = args.trainComments || null,
      this.feed = args.coDetailList
      this.spliced()
    },
    spliced() {
      if (this.isEdit !== 2) {
        let itemList = this.feed
        for (let item of itemList) {
          if ((~~item.targetType === 3 || ~~item.targetType === 4) && typeof item.arr[0] !== 'object') {
            let arr = []
            let list = item.arr
            for (let m = 0, len = list.length; m < len; m++) {
              arr.push({ value: list[m] })
            }
            item.arr = arr
          }
        }
        this.feed = itemList
      }
    }, 
    deletUserPost(i){
      this.$delete(this.args.coActivityUserConfParamList,i)
    },
    jump(i){
      let data = {
        isFeedback:this.isFeedback,
        isTrain:this.isTrain,
        zhaEnd:this.zhaEnd,
        zhaStart:this.zhaStart,
        isDisb:this.isDisb,
        isEdit:this.isEdit,
        cover:this.cover,
        args:this.args,
        judge:this.judge,
        image:this.image,
        train:this.train,
        feed:this.feed
      }
      sessionStorage.setItem('data',JSON.stringify(data))
      this.$router.push({ name: 'volunteer_compile',query: { i } })
    },
    deleItem(i,m){
      let feed = this.feed
      if (m !== null) {
        let arr = feed[i].arr
        if(arr.length >2){
          arr.splice(m, 1)
        }else{
          this.$Message.warning("必须留两个")
          return
        }
      } else {
        feed.splice(i, 1)
      }
      for (let i = 0, len = feed.length; i < len; i++) {
        feed[i].sort = i + 1
      }
      this.feed = feed
    },
    addSignIput(i){
      let feed = this.feed
      let arr = feed[i].arr
      arr.push({ value: null })
      this.feed = feed
    },
    addItem(type){
      let feed = this.feed
      let args = {
        sysId: 2,
        typeFlag: type,
        targetType: 3,
        detailText: null,
        sort: feed.length + 1,
        isMust:0
      }
      if (type === 4 || type === 3) {
        args.arr = [{ value: null }, { value: null }, { value: null }]
      }
      feed.push(args)
      this.feed = feed
    },
    changeEditor(html){
      this.args.detail = html
    },
    changeEditorTrain(html){
      this.train = html
    },
    initData(){
      this.userId = localStorage.getItem("userId")
      let data = JSON.parse(sessionStorage.getItem('data'))
      if(data){
        this.args = data.args
        this.isDisb = data.isDisb
        this.zhaStart = data.zhaStart
        this.zhaEnd = data.zhaEnd
        this.judge = data.judge
        this.image = data.image
        this.cover = data.cover
        this.isFeedback = data.isFeedback
        this.isTrain = data.isTrain
        this.train = data.train,
        this.feed = data.feed
      }
      getOrgTeam({}).then(res => {
        this.orgList = res.data
      })
      getActiveType({typeFlag:7}).then(res => {
        this.array = res.data
      })
    },
    uploadFile (img,e) {
      let file = e.target.files[0]
      const dataForm = new FormData()
      dataForm.append('file', file)
      console.log(dataForm)
      upload(dataForm).then(res => {
        if(res.code == 200){
          var reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            if(img === 'cover'){
              this.cover = e.target.result
              this.args.coverPic = res.data
            }else{
              this.image = e.target.result
              this.args.pic = res.data
            }
          }
        }else{
          this.$Message.warning(res.msg)
        }
      })

    },
    cancelImg(img){
      let path = img == 'cover'?this.args.coverPic:this.args.pic
      orgimgdel({path}).then(res => {
        if(res.code == 200){
            if(img === 'cover'){
              this.cover =  null
              this.args.coverPic =  null
            }else{
              this.image = null
              this.args.pic = null
            }
          this.$Message.success('删除成功')
        }else{
            this.$Message.warning(res.msg)
        }
      })
    },
    changeInput(e){
      if(!this.args.orgId){
        this.$Message.info('需要选择团队归属')
        return
      }
      let param = this.judge
      getOrgId({ orgId:this.args.orgId, param}).then(res => {
        this.judgeList = res.data
        this.showJudge = res.data.length == 0?false:true
        this.args.ownerUserId = null
        this.args.ownerUserName = null
        this.args.ownerUserTel = null
      })
    },
    getOwn(i){
      let item = this.judgeList[i]
      this.judge = item.result,
      this.args.ownerUserId = item.userId,
      this.args.ownerUserName = item.userName,
      this.args.ownerUserTel = item.tel,
      this.showJudge = false
    },
    changeSelect(e){
      this.args.coActCatTypeList = [{
        typeDicId: e.value,
        typeDicName: e.label,
        typeFlag: 3
      }]
    },
    getMap(e){
      this.args.provinceId = e.provinceId
      this.args.cityId = e.cityId
      this.args.districtId = e.districtId
      this.args.xx = e.xx
      this.args.yy = e.yy
      this.$set(this.args,'address',e.address)
    },
    successOk(m){
      if(m == 0 || m == 1){
        if(m == 0 &&!!this.args.startAt){
          if(!!this.args.endAt&&new Date(this.args.startAt).getTime()>=new Date(this.args.endAt).getTime()){
            this.$Message.warning("活动开始时间要早于活动结束时间")
            this.$set(this.args,'startAt','')
          }else if(!!this.zhaEnd&&new Date(this.args.startAt).getTime()<=new Date(this.zhaEnd).getTime()){
            this.$Message.warning("活动开始时间要晚于招募结束时间")
            this.$set(this.args,'startAt','')
          }
        }else if(m == 1 && !!this.args.endAt){
          if(!!this.args.startAt&&new Date(this.args.startAt).getTime()>=new Date(this.args.endAt).getTime()){
            this.$Message.warning("活动开始时间要早于活动结束时间")
            this.$set(this.args,'endAt','')
          }
        }
      }else{
       if(m == 2 &&!!this.zhaStart){
          if(!!this.zhaEnd&&new Date(this.zhaStart).getTime()>=new Date(this.zhaEnd).getTime()){
            this.$Message.warning("活动开始时间要早于活动结束时间")
            this.zhaStart = ''
          }
        }else if(m == 3 && !!this.zhaEnd){
          if(!!this.zhaStart&&new Date(this.zhaStart).getTime()>=new Date(this.zhaEnd).getTime()){
            this.$Message.warning("活动开始时间要早于活动结束时间")
            this.zhaEnd = ''
          }else if(!!this.args.startAt&&new Date(this.args.startAt).getTime()<=new Date(this.zhaEnd).getTime()){
            this.$Message.warning("活动开始时间要晚于招募结束时间")
           this.zhaEnd = ''
          }
        }
      }
    },
    handleChange(i,name,e){
      let time = e
      if(time){
        time = time + ':00'
      }
      if(i === 0){
        this.args[name] = time
      }else{
        this[name] = time
      }
    },
    sumbmit(i){
      let item = this.args
      if(i==1){
        if (this.single == false) {
          this.$Message.warning('你没有同意发布规则')
          return
        } else if (item.name == null || item.coverPic == null ||item.pic == null || item.orgId == null || item.startAt == null || item.endAt == null || this.zhaStart == null || this.zhaEnd == null || item.address == null || item.coActivityUserConfParamList.length == 0 || item.isInsurance == null || item.flyFlag == null || item.isNeedCertMould == null || item.isShowHolder == null || item.coActCatTypeList[0].typeDicId == null || item.detail == null || this.args.ownerUserName == null) {
          this.$Message.warning('活动内容填写不完整')
          return
        } else if (item.ownerUserId == null) {
          this.$Message.warning('现在负责人没有对应的归属团队')
          return
        }else if(this.isFeedback == 1){
          for(let val of this.feed){
            if(val.detailText === '' || val.detailText === null){
              this.$Message.warning('你已经勾选反馈，必须完善反馈项')
              return
            }else if(val.arr){
              for(let em of val.arr){
                if(em.value === '' || em.value === null){
                  this.$Message.warning('你已经勾选反馈，选项没完善')
                  return
                }
              }
            }
          }
        }else if(this.isTrain == 1){
          if(!this.train){
            this.$Message.warning('你已经勾选培训，必须完善')
            return
          }
        }
      }else{
        if (item.name == null){
          this.$Message.warning('至少填写活动名称')
          return
        }
        if (this.isFeedback == 1 && item.coActivityUserConfParamList.length == 0){
          this.$Message.warning('反馈填写，岗位必须填写')
          return
        }
        if (this.isTrain == 1 &&item.coActivityUserConfParamList.length == 0) {
          this.$Message.warning('培训填写，岗位必须填写')
          return
        }
      }
      if(this.once)return
      this.once = true
      let list = item.coActivityUserConfParamList
      for (let i = 0, len = list.length; i < len; i++) {
        list[i].coActivityItemList = this.dealSelect(list[i].coActivityItemList)
      }
      this.dealData(list, item.startAt)
      item.coActivityUserConfParamList = list
      if (this.isEdit !== 1){
        item.status = i
      }else{
        item.activityId = this.data.activityId
      }
      item.userId = this.userId
      if(i == 1){
        item.releaseTime = this.getTime()
      }
      let obj = filterNull(item)
      obj.title = obj.name
      saveActive(obj).then(res => {
        this.once = false
        if(res.code == 200){
          this.$router.replace({name:'volunteer_activity'})
          sessionStorage.removeItem("data")
          this.$Message.success('发布成功')
        }else{
          this.$Message.warning(res.msg)
        }
      })
    },
    dealData(list, startAt){
      let ls = this.isFeedback == 1 ? this.dealSelect(this.feed) : []
      let train = this.isTrain == 1 ? this.train : null
      let zhaStart = this.zhaStart
      let zhaEnd = this.zhaEnd
      for(let i=0,len=list.length;i<len;i++){
        list[i].isFeedback = this.isFeedback
        list[i].isTrain = this.isTrain
        list[i].coDetailList = ls
        list[i].trainComments = train
        list[i].enrollEndtime = zhaEnd
        list[i].enrollStarttime = zhaStart
        list[i].outrollStarttime = zhaStart
        list[i].outrollEndtime = startAt
      }
    },
    dealSelect(list){
      if(list.length !== 0){
        for (let i = 0, len = list.length; i < len; i++) {
          if (list[i].arr) {
            let arr = list[i].arr
            let ar = this.ab
            for (let m = 0, len = arr.length; m < len; m++) {
              list[i][`answer${ar[m]}`] = arr[m].value
            }
          }
        }
        return list
      }else{
        return []
      }

    },
    getTime(){
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const mine = date.getMinutes()
      const ss = date.getSeconds()
      return `${year}-${month}-${day} ${hour}:${mine}:00`
    },
    apply(){
        this.$router.push({name:'volunteer_apply',params:{sysId:'2,3'}})
    }
  },
  
}
</script>
<style lang="scss" scoped>
  .content {
    background: #fff;
    padding: 20px 0;
    border-radius: 20px;
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
    //活动发布内容
    .publish-content {
      background: #ffffff;
      .active-publish {
        padding: 30px 0;
        ul {
          padding-left: 70px;
          li {
            margin: 20px;
            display: flex;
            align-items: center;
            .adr{
              flex: 1;
              cursor: pointer;
            }
            .juge{
              width: 300px;
              position: relative;
              .juge-drap{
                position: absolute;
                z-index: 100;
                top: 46px;
                left: 0;
                width: 100%;
                max-height: 310px;
                overflow-y: scroll;
                background: #fff;
                box-shadow: 0px 1px 6px rgba(0,0,0,0.2);
                .drap-item{
                  height: 50px;
                  line-height: 50px;
                  text-align: center;
                  border-bottom: 1px solid #eee;
                }
              }
            }
            span {
              display: inline-block;
              width: 130px;
              margin-right: 20px;
              height: 40px;
              font-size: 14px;
              line-height: 40px;
            }
            p {
              text-align: center;
              display: flex;
              justify-content: space-around;
            }
            .imgs {
              height: 150px;
              width: 300px;
              background: #e4e4e4;
            }
            .imgss {
              width: 150px;
              height: 150px;
            }
            .phone {
              width: 60px;
              margin-left: 20px;
            }
            .names {
              width: 35px;
            }

            .select {
              margin: 0 15px;
            }
            .ivu-radio-default {
              margin-right: 30px;
            }
          }
          .active-cost{
            display: flex;
            align-items: flex-start;
            .cost{
              p{
                margin-top: 5px;
                font-size: 12px;
              }

            }
          }

          .start {
            display: flex;
            // justify-content: flex-end;
            align-items: flex-start;
          }

          .jobs {
            flex-direction: column;
            // justify-content: flex-start;
            align-items: flex-start;
            p {
              width: 600px;
              border: #e4e4e4 1px solid;
              .ivu-icon-md-close-circle {
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
  }
  .start-wap{
    position: relative;
    height: 150px;
    width: 300px;
    .upload{
      width: 100%;
      height: 100%;
    }
    .cancel{
      position: absolute;
      top: 0px;
      right: 0px;
      z-index: 10;
    }
    .upload .file{
      width: 100%;
      height: 100%;
      border: 1px dashed #FF565A;
      text-align: center;
      padding: 20px 0;
    }
    // .upload .file:hover{
    //   border: 1px dashed #FF565A;
    // }
    // .upload .file:hover .ivu-icon{
    //   color: #FF565A !important;
    // } 
    .upload .file input{
      display: none;
    }
    .shae{
      height: 150px;
      width: 150px;
    }
  }
  .start-firt{
    width: 150px;
  }
  .btns{
    .right{
      margin-left: 20px;
    }
  }
  .row20{
    margin-bottom: 20px;
  }
  .row10{
    margin-bottom: 10px;
  }
  .btn{
    margin-right: 10px !important;
    margin-bottom: 10px !important;
  }
  .btn:hover{
    border-color:#FF565A;
    color: #FF565A
  }
</style>
