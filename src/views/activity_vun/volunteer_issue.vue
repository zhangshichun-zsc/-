<!--志愿者活动发布（志愿者）-->
<template>
  <div>
    <adress :value='adr' @change='getMap'/>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <p class="content-head">
        <span>活动发布</span>
        <Button @click="apply">设置常用报名项</Button>
      </p>
      <div class="publish-content">
        <div class="active-publish">
          <ul>
            <li>
              <span>活动名称</span>
              <Input v-model="args.name" placeholder="Enter something..." style="width: 300px" />
            </li>
            <li class="start">
              <span>活动图片</span>
              <div class="start-wap">
                <div class="upload" v-if='image == null'>
                    <div class="file" @click="()=>{ this.$refs.files.click()}">
                      <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="files" @change="uploadFile()" multiple>
                      <Icon type="md-cloud-upload" :size='36' color="#2d8cf0"/>
                    </div>
                </div>
                <img class="imgs" v-else :src="image"/>
                <Icon type="ios-trash" v-if='image !== null' class="cancel" @click="cancelImg()"/>
              </div>
            </li>
            <li>
              <span>活动归属团队</span>
              <Select v-model="args.orgId" style="width:300px">
                <Option
                  v-for="(item,index) in orgList"
                  :value="item.orgId"
                  :key="index"
                >{{ item.orgName }}</Option>
              </Select>
            </li>
            <li>
              <span>活动时间</span>
              <Row>
                <Col :span="12">
                  <DatePicker
                    type="datetimerange"
                    v-model="dateOne"
                    @on-change="handleChange"
                    placement="bottom-end"
                    placeholder="Select date"
                    style="width:300px"
                  ></DatePicker>
                </Col>
              </Row>
            </li>
            <li>
              <span>招募时间</span>
              <Row>
                <Col span="12">
                  <DatePicker
                   @on-change="handleChangeTwo"
                   v-model="dateTwo"
                  type="datetimerange"
                  placement="bottom-end"
                  placeholder="Select date"
                  style="width: 300px"
                  ></DatePicker>
                </Col>
              </Row>
            </li>
            <li>
              <span>>活动地址</span>
              <span @click="()=>{this.adr = true}">{{ args.address == null?"点击选中地址":args.address}}</span>
            </li>
            <li>
              <span>现场负责人</span>
              <div class="juge">
                 <Input v-model="judge" placeholder="Enter something..." @on-change='changeInput'/>
                 <div class="juge-drap" v-if="showJudge">
                   <div class="drap-item" v-for="(item,index) in judgeList" :key='index' @click="getOwn(index)">
                     {{ item.result }}
                   </div>
                 </div>
              </div>
            </li>
            <li class="jobs">
              <span>招募岗位</span>
              <p v-for="(item,index) in args.coActivityUserConfParamList" :key='index' @click.stop="jump(index)">
                <span>{{ item.userPositionName }}</span>
                <span>{{ item.recruitNum }}人</span>
                <span>
                  详情
                  <Icon type="ios-trash" @click.stop="deletUserPost(index)"/>
                </span>
              </p>
            </li>
            <li>
              <p class="adds" @click="jump(-1)">
              +新增招募角色
              </p>
            </li>
            <li>
              <span>是否交保险</span>
              <RadioGroup v-model="args.isInsurance">
                <Radio label="1">是</Radio>
                <Radio label="2">否</Radio>
              </RadioGroup>
            </li>
            <li>
              <span>是否允许空降</span>
              <RadioGroup v-model="args.flyFlag">
                <Radio label="1">是</Radio>
                <Radio label="2">否</Radio>
              </RadioGroup>
            </li>
            <li>
              <span>是否发放证书</span>
              <RadioGroup v-model="args.isNeedCertMould">
                <Radio label="1">是</Radio>
                <Radio label="2">否</Radio>
              </RadioGroup>
            </li>
            <li>
              <span>是否显示主办方小站</span>
              <RadioGroup v-model="args.isShowHolder">
                <Radio label="1">是</Radio>
                <Radio label="2">否</Radio>
              </RadioGroup>
            </li>
            <li>
              <span>活动分类</span>
              <Select v-model="args.coActCatTypeList[0].typeDicId" style="width:300px" :label-in-value='true'  @on-change='changeSelect'>
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
                <Input v-model="args.pay" placeholder="Enter something..." style="width: 300px" type="number"/>
                <p>此活动费用仅供参考，无需缴费</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="active-details">
        <div>
          <p class="active-text"><span>活动详情</span></p>
          <wangeditor id='wange' :labels="args.detail" @change='changeEditor'/>
        </div>
        <div class="active-pud">
          <div class="active-list">
            <ul>
              <li>
                <p><span class="active-span">培训内容</span> <i-switch v-model="isTrain" :true-value='1' :false-value='0' /></p>
                <div v-if='isTrain === 1'>
                  <wangeditor :labels="train" id="ed1" @change='changeEditorTrain'></wangeditor>
                </div>
              </li>
              <li>
                <p><span class="active-span">反馈内容</span> <i-switch v-model="isFeedback" :true-value='1' :false-value='0' /></p>
                <div v-if='isFeedback === 1'>
                  <div v-for="(item,index) in feed" :key='index'>
                    <div class="ls-item" v-if=' index ==0 '>
                      <div>反馈简介</div>
                      <i-input placeholder="请输入反馈内容" class="txt" v-model="item.detailText" type="textarea" :disabled="isDisb"/>
                    </div>
                    <div class="ls-item flex-between" v-else-if=' item.typeFlag === 1 '>
                      <i-input placeholder="请输入单文本标题" v-model="item.detailText" :disabled="isDisb"/>
                       <Icon type="ios-trash"  @click="deleItem(index,null)" v-if='!isDisb'/>
                    </div>
                    <div class="ls-item flex-between" v-else-if=' item.typeFlag === 6 '>
                      <i-input placeholder="请输入多行文本标题" v-model="item.detailText" :disabled="isDisb"/>
                      <Icon type="ios-trash"  @click="deleItem(index,null)" v-if='!isDisb'/>
                    </div>
                    <div class="ls-item"  v-else-if='item.typeFlag === 3 '>
                      <div class="flex-between">
                        <i-input placeholder="请输入单选标题" v-model="item.detailText" :disabled="isDisb"/>
                       <Icon type="ios-trash"  @click="deleItem(index,null)" v-if='!isDisb'/>
                      </div>
                      <div class="item flex-between" v-for="(val,i) in item.arr" :key='i'>
                        <i-input :placeholder="`输入选项${i+1}`" v-model="val.value" :disabled="isDisb"/>
                       <Icon type="ios-trash"  @click="deleItem(index,i)" v-if='!isDisb'/>
                      </div>
                      <Button type="primary" ghost  @click="addSignIput(index)" v-if='!isDisb'>+</Button>
                    </div>
                    <div class="ls-item" v-else>
                      <div class="flex-between">
                        <i-input placeholder="请输入多选标题" v-model="item.detailText" :disabled="isDisb"/>
                       <Icon type="ios-trash"  @click="deleItem(index,null)" v-if='!isDisb'/>
                      </div>
                      <div class="item flex-between" v-for="(val,i) in item.arr" :key='i'>
                        <input :placeholder="`输入选项${i+1}`" v-model="val.value" :disabled="isDisb"/>
                       <Icon type="ios-trash"  @click="deleItem(index,i)" v-if='!isDisb'/>
                      </div>
                      <Button type="primary" ghost  @click="addSignIput(index)" v-if='!isDisb'>+</Button>
                    </div>
                  </div>
                   <div class="add">
                     <p>新增反馈项</p>
                     <div class="flex-between">
                        <div v-for="(item,index) in feedList" :key='index' class="add-item" @click="addItem(item.type)">{{ item.name }}</div>
                     </div>
                   </div>
                </div>
              </li>
              <li>
                <span class="active-span">受益群体人数</span>
                <Input v-model="args.memberGroupNum" placeholder="Enter something..." style="width: 200px" />
              </li>
            </ul>
            <p class="active-adds">
              <a>+添加</a>
            </p>
            <p class="active-adds">
              <Radio v-model="single">
                我同意
                <a>《活动发布规则》</a>
              </Radio>
            </p>
          </div>
          <div class="btns">
            <Button @click="sumbmit(8)">存为草稿</Button>
            <Button type="success" @click="sumbmit(1)" >提交申请</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getActiveType,getActiveLimit,getActiveSign,getOrgTeam,getOrgId,orgimgdel,saveActive } from '@/request/api'
import { getAdressId } from '@/libs/utils'
import wangeditor from'_c/wangeditor'
import adress from'_c/map'
import { upload }from '@/request/http'
import { filterNull } from '@/libs/utils'
  export default {
    data() {
        return {
            navigation1: {
                head: "志愿者活动发布(志愿者)"
            },
            single: true,
            dateTwo:[],
            dateOne:[],
            adr:false,
            feedList:[{name:'单行文本',type:1},{name:'多行文本',type:6 },{name:'单选问题',type:3},{name:'多选问题',type:4}],
            isDisb:false,
            feed: [{
              sysId: 2,
              typeFlag: 1,
              targetType: 3,
              detailText: null,
              sort: 1
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
            once:false
        };
    },

    components: { wangeditor,adress },

    created() {
      this.initData()
    },
    methods: {
      deletUserPost(i){
        this.$delete(this.args.coActivityUserConfParamList,i)
      },
      jump(i){
        let data = {
          zhaEnd:this.zhaEnd,
          zhaStart:this.zhaStart,
          isDisb:this.isDisb,
          args:this.args,
          judge:this.judge,
          image:this.image
        }
        sessionStorage.setItem('data',JSON.stringify(data))
        this.$router.push({ name: 'volunteer_compile',params: { i } })
      },
      deleItem(i,m){
        let feed = this.feed
        if (m !== null) {
          let arr = feed[i].arr
          arr.splice(m, 1)
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
          sort: feed.length + 1
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
          this.dateOne = [data.args.startAt,data.args.endAt]
          this.dateTwo = [data.zhaStart,data.zhaEnd]
          this.image = data.image
        }
        getOrgTeam({}).then(res => {
          this.orgList = res.data
        })
        getActiveType({typeFlag:40}).then(res => {
          this.array = res.data
        })
      },
      uploadFile () {
        let file = this.$refs.files.files[0]
         const dataForm = new FormData()
        dataForm.append('file', file)
        upload(dataForm).then(res => {
          var reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            this.image = e.target.result
            this.args.pic = res.data
          }
        })

      },
      cancelImg(){
        orgimgdel({path:this.args.pic}).then(res => {
          this.image = null
          this.args.pic = null
         this.$Message.success('删除成功')
        })
      },
      handleChange(e){
        this.args.startAt = e[0]
        this.args.endAt = e[1]
        this.dateOne = e
      },
      handleChangeTwo(e){
        this.zhaStart = e[0]
        this.zhaEnd = e[1]
        this.dateTwo = e
      },
      changeInput(e){
        let param = e.data
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
        let args = this.args
        this.args = Object.assign(args,e)
      },
      sumbmit(i){
        let item = this.args
        if(i==1){
          if (this.single == false) {
            this.$Message.warning('你没有同意发布规则')
            return
          } else if (item.name == null || item.pic == null || item.orgId == null || item.startAt == null || item.endAt == null || this.zhaStart == null || this.zhaEnd == null || item.address == null || item.coActivityUserConfParamList.length == 0 || item.isInsurance == null || item.flyFlag == null || item.isNeedCertMould == null || item.isShowHolder == null || item.coActCatTypeList[0].typeDicId == null || item.pay == null || item.detail == null || this.args.ownerUserName == null) {
            this.$Message.warning('报名项填写不完整')
            return
          } else if (this.args.ownerUserId == null) {
             this.$Message.warning('现在负责人没有对应的归属团队')
            return
          }

        }else{
          if (item.name == null){
            this.$Message.warning('至少填写活动名称')
            return
          }
          if (item.isFeedback == 1 && item.coActivityUserConfParamList.length == 0){
            this.$Message.warning('反馈填写，岗位必须填写')
            return
          }
          if (item.isTrain == 1 &&item.coActivityUserConfParamList.length == 0) {
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
            this.$Message.success('发布成功')
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
    mounted(){}
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
    //活动发布内容
    .publish-content {
      background: #ffffff;
      width: 900px;
      .active-publish {
        padding: 30px 0;
        ul {
          padding-left: 70px;
          li {
            margin: 20px;
            display: flex;
            align-items: center;
            .juge{
              width: 300rpx;
              position: relative;
              .juge-drap{
                position: absolute;
                top: 46px;
                left: 0;
                width: 100%;
                max-height: 300px;
                overflow: scroll;
                box-shadow: 5px 5px #eee;
                .drap-item{
                  height: 50px;
                  line-height: 50px;
                  text-align: center;
                  background: green;
                  color: #fff;
                }
              }
            }
            span {
              display: inline-block;
              width: 130px;
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

            .adds {
              width: 600px;
              text-align: center;
              a {
                color: green;
                font-size: 14px;
              }
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

    // 活动详情
    .active-details {
      padding: 30px 0;
      background: #ffffff;
      width: 900px;
      .active-text {
        height: 40px;
        line-height: 40px;
        span {
          display: inline-block;
          width: 120px;
          height: 40px;
          background: #008e40;
          color: #ffffff;
          text-align: center;
          line-height: 40px;
        }
      }
      .rich-text {
        height: 300px;
        width: 700px;
        margin: 30px 40px;
        border: #e4e4e4 1px solid;
      }
      .active-list {
        padding-left: 70px;
        ul {
          li {
            .active-span {
              display: inline-block;
              width: 130px;
              height: 40px;
              line-height: 40px;
              font-size: 14px;
              margin: 10px 0;
            }
            .rich-texts {
              height: 140px;
              width: 700px;
              border: #e4e4e4 solid 1px;
            }
            .add{
              padding: 10px;
              background: #eee;
              .add-item{
                width: 100px;
                height: 50px;
                text-align: center;
                line-height: 50px;
                border: 1px solid #eee;
                color: #fff;
              }
            }
          }
          .starts-img {
            display: flex;
            span {
              line-height: 0;
            }
            .imgs {
              width: 240px;
              height: 160px;
              background: #e4e4e4;
            }
          }
        }
        .active-adds {
          text-align: center;
          margin: 30px 0;
          a {
            color: #008e40;
          }
        }
      }

      .btns {
        display: flex;
        justify-content: center;
        margin: 40px 0;
        button {
          width: 140px;
          height: 40px;
          margin: 0 40px;
        }
      }
    }
  }
  .start-wap{
    position: relative;
    height: 150px;
    width: 300px;
    .cancel{
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .upload .file{
      height: 150px;
      width: 300px;
      border: 1px dashed #dcdee2;
      text-align: center;
      padding: 20px 0;
    }
    .upload .file:hover{
      border: 1px dashed #2d8cf0;
    }
    .upload .file input{
      display: none;
    }
  }

</style>
