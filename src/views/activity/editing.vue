<!--编辑活动(会员)-->
<template>
  <div class="content">
    <adress :value='adr' @change='getMap'/>
          <div class="select">
            <span class="select-template">活动分类</span>
            <Select v-model="batch.actTypeName" style="width:200px">
              <Option v-for="item in batchItemList.actTypes" :value="item.name" :key="item.name" @click.native="getActiveTypeId(item)">{{ item.name }}</Option>
            </Select>
          </div>
          <div class="select">
            <span class="select-template">选择模板</span>
            <Select v-model="model1" style="width:200px">
              <Option v-for="item in batchItemList.actTypes" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>
          </div>
          <div class="activitives">
            <p class="activitives-top">
              <span>活动内容</span>
            </p>
            <div class="main1">
              <ul>
                <li>
                  <span class="same_style">活动名称</span>
                  <Input placeholder="请输入活动名称" v-model="batch.actName" style="width:200px"></Input>
                </li>
                <li class="imges">
                  <span class="same_style">主题图片</span>
                  <div class="imgs">
                    <img :src='batch.actShowPic' />
                  </div>
                </li>
                <li>
                  <span class="same_style">活动时间</span>
                  <i-col span="12">
                    <Date-picker
                      type="datetimerange" 
                      format="yyyy-MM-dd HH:mm"
                      placement="bottom-end"
                      placeholder="选择日期"
                      style="width: 200px"
                      @on-change="getBatchDate"
                    ></Date-picker>
                  </i-col>
                </li>
                <li>
                  <span class="same_style">活动地址</span>
                  <span @click="()=>{this.adr = true}">{{ batch.actAddress == null?"点击选中地址":batch.actAddress}}</span>
                </li>
                <li>
                  <span class="same_style">出行方式</span>
                  <RadioGroup v-model="batch.actVehicle" @on-change='tripMode'>
                    <Radio label="自驾">自驾</Radio>
                    <Radio label="大巴">大巴</Radio>
                    <Radio label="自定义" :true-value='tripSelf'>自定义</Radio>
                  </RadioGroup>
                </li>
                <li v-if="tripSelf">
                  <Input v-model="batch.actVehicle" placeholder="请输入出行方式"></Input>
                </li>
                <li>
                  <span class="same_style">现场联系人</span>
                  <p>
                    <span class="relation">姓名</span>
                    <Input v-model="batch.ownerUserName" style="width: 200px" class="same-staff" @on-change='getLeaderList'></Input>
                    <span class="relation">联系方式</span>
                    <Input v-model="batch.ownerUserTel" style="width: 200px" class="same-staff" disabled></Input>
                  </p>
                  <p v-if='addLeader'>
                    <ul>
                      <li v-for="item in leaderList" @click="getLeader(item)">
                        {{item.name}}
                      </li>
                    </ul>
                  </p>
                </li>
                <li>
                  <span class="same_style">工作人员</span>
                  <span @click="addWorkers">添加</span>
                </li>
                <li v-for="(item,index) in batch.workerIdList">
                  <p>
                    <span class="relation">姓名</span>
                    <Input v-model="item.ownerUserName" style="width: 200px" class="same-staff" @on-change='getWorkerList(item,index)'></Input>
                    <span class="relation">联系方式</span>
                    <Input v-model="item.ownerUserTel" style="width: 200px" class="same-staff" disabled></Input>
                    <span @click="deleteWorker(index)">删除</span>
                    <p v-if='addWorker'>
                      <ul>
                        <li v-for="i in workerList" @click="getWorker(i)">
                          {{i.name}}
                        </li>
                      </ul>
                    </p>
                  </p>
                </li>
                <li>
                  <span class="same_style">活动标签</span>
                  <Select v-model="batch.actLabelName" style="width:340px" placeholder="请选择活动标签">
                    <Option
                      v-for="item in batchItemList.labels"
                      :value="item.name"
                      :key="item.name"
                      @click.native="getActiveLabels(item)"
                    >{{ item.name }}</Option>
                  </Select>
                </li>
              </ul>
            </div>
          </div>
          <div class="details">
            <p class="details-head">
              <span>活动详情</span>
            </p>
            <wangeditor :labels="editor1" id="ed1"></wangeditor>
          </div>

          <div class="recruit">
            <p class="recruit-head">
              <span>招募角色</span>
            </p>
            <div class="recruitment">
              <p v-for="(item,i) in batch.userConfList">
                <span>{{item.roleName}}</span>
                <span>{{item.recruitNum}}</span>
                <span>详情</span>
                <span @click="deleteRole(i)">删除</span>
              </p>
              <h2 class="added">
                <a @click="addRoles">+新增招募角色</a>
              </h2>
            </div>
          </div>
          <div class="material">
            <p class="material-head">
              <span>所需物质</span>
            </p>
            <div class="recruitment">
              <p v-for="(item,i) in batch.actResList">
                <span>{{item.resourcesName}}</span>
                <Input v-model="item.num" style="width: 200px"></Input>
                <span>
                  <Checkbox v-model="item.isOk" :true-value='1'>已筹</Checkbox>
                  <Icon type="ios-close" @click="deleteResources(i)"></Icon>
                </span>
              </p>
              <h2 class="added" v-if="addbtns">
                <a @click="addResources">+新增物质</a>
              </h2>
              <p v-if="adds">
                <ul>
                  <li v-for="item in batchItemList.resources" @click="chooseResource(item)">{{item.name}}</li>
                </ul>
              </p>
            </div>
          </div>
          <div class="issue">
            <span>发布时间</span>
            <RadioGroup v-model="batch.releaseTime" @on-change='releaseTime'>
              <Radio label="0">活动开始前一个月自动发布</Radio>
              <Radio label="1" :true-value='releaseTimeSelf'>自定义</Radio>
            </RadioGroup>
            <i-col span="12" v-if='releaseTimeSelf'>
              <Date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期" style="width: 200px" @on-change="getReleaseTime"></Date-picker>
            </i-col>
          </div>
          <div class="button-food">
            <Button @click="save">保存</Button>
          </div>
        </div>
</template>

<script>
  import E from 'wangeditor';
import { batchItem,leader,projectDetail,projectEdit } from "@/request/api";
import { projectApproval } from '../../request/api';
import role from "./compile_beneficiary.vue"
import adress from'_c/map'
import { orgimg } from "@/request/http";
import { upload }from '@/request/http'
export default {
  name: 'editor',
  data() {
    return {
      adr:false,
      batch:{
        userConfList:[],
        actResList:[],
        actShowPic: '',
        workerIdList:[{}]
      },
      batchItemList:[],
      editorContent1: '',
      navigation1: {
        head: "编辑活动(会员)"
      },
      drill1: [
        {
          value: "basketball",
          label: "篮球训练"
        },
        {
          value: "mountaineering",
          label: "登山"
        }
      ],
      drill2: [
        {
          value: "basketball",
          label: "篮球训练"
        },
        {
          value: "mountaineering",
          label: "登山"
        }
      ],
      drill3: [
        {
          value: "basketball",
          label: "篮球训练"
        },
        {
          value: "mountaineering",
          label: "登山"
        }
      ],
      model1: "basketball",
      cityList: [
        {
          value: "beijing",
          label: "北京市"
        },
        {
          value: "shanghai",
          label: "上海市"
        },
        {
          value: "shenzhen",
          label: "深圳市"
        },
        {
          value: "hangzhou",
          label: "杭州市"
        },
        {
          value: "nanjing",
          label: "南京市"
        },
        {
          value: "chongqing",
          label: "重庆市"
        }
      ],

      animal: "daba",
      value: "",
      single: "",
      adds: false,
      addbtns: true,
      tripSelf:false,
      addLeader:false,
      addWorker:false,
      releaseTimeSelf:false,
      isAddRole:false,
      editor1:''
    };
  },

  components: {role,adress},

  computed: {},

  created() {
    this.getBatchItem();
    this.getProjectDetail()
  },

  mounted() {
    // var editor1 = new E('.editorElem1');
    // editor1.customConfig.onchange = (html) => {
    //   this.editorContent1 = html
    // };

    // editor1.create()
  },
  methods: {
    changeEditorTrain(e){
      this.batch.detail = e
    },
    getMap(e){
      this.batch.actXx = e.xx
      this.batch.actYy = e.yy
      this.batch.actAddress = e.address
      console.log(e)
    },
    getProjectDetail(){
       projectDetail({
        activityId:this.$route.query.acitvityId
      }).then(res => {
        console.log(res);
        this.batch = res.data
      });
    },
    save(){
      this.batch.type = 2
      projectEdit(this.batch).then(res=>{
        console.log(res)
      })
    },
    addbtn() {
      this.adds = !this.adds;
      this.addbtns = !this.addbtns;
    },
    close() {
      this.adds = false;
      this.addbtns = true;
    },
    jump() {
      this.$router.push({name:'compile_beneficiary'})
    },
    //批次活动前置信息查询
    getBatchItem(){
      batchItem({
        userId:1
      }).then(res => {
        console.log(res);
        this.batchItemList = res.data
      });
    },
    //现场负责人列表
    getLeaderList(e){
      console.log(this.batch.ownerUserName)
      leader({
        name:this.batch.ownerUserName
      }).then(res => {
        console.log(res);
        if(res.code==200){
          this.addLeader = true
          this.leaderList=res.data
        }
      });
    },
    //活动分类
    getActiveTypeId(val){
      this.batch.actTypeName = val.name
      this.batch.actTypeId = val.dicId
    },
    //活动标签
    getActiveLabels(val){
      this.batch.actLabelName = val.name
      this.batch.actLabelId = val.dicId
    },
    //活动日期
    getBatchDate(e){
      this.batch.startT = e[0];
      this.batch.endT = e[1];
    },
    //出行方式
    tripMode(e){
      if(e == '自驾' || e == '大巴'){
        this.tripSelf = false
        this.batch.actVehicle = e
      }else{
        this.tripSelf = true
        this.batch.actVehicle = ''
      }
    },
    //现场负责人列表
    getLeaderList(e){
      console.log(this.batch.ownerUserName)
      leader({
        name:this.batch.ownerUserName
      }).then(res => {
        console.log(res);
        if(res.code==200){
          this.addLeader = true
          this.leaderList=res.data
        }
      });
    },
    //工作人员列表
    getWorkerList(e,index){
      console.log(e.ownerUserName)
      console.log(index)
      this.workerIndex = index
      leader({
        name:e.ownerUserName
      }).then(res => {
        console.log(res);
        if(res.code==200){
          this.addWorker = true
          this.workerList=res.data
        }
      });
    },
    //现场负责人
    getLeader(val){
      console.log(val)
      this.batch.ownerUserName = val.name
      this.batch.ownerUserTel = val.tel
      this.addLeader = false
    },
    //工作人员
    getWorker(val){
      console.log(val)
      this.batch.workerIdList[this.workerIndex].ownerUserName = val.name
      this.batch.workerIdList[this.workerIndex].ownerUserTel = val.tel
      this.addWorker = false
    },
    //添加工作人员
    addWorkers(){
      let m = this.batch.workerIdList
      if(m.length<5){
        m.push({})
        this.batch.workerIdList = m
      }else{
        this.$Message.error('最多添加五个工作人员');
      }
    },
    //新增招募角色
    addRoles(){
      let r = {
        fdList:[{ name: '反馈简介', type: 0}],
        refund:{},
        signRuleList:[],
        itemList:[],
        choiceRuleList:[]
      }
      let n = this.batch.userConfList
      this.roleI = n.length
      this.oneRole = n[this.roleI]?n[this.roleI]:r
      this.isAddRole = true
      this.two = false
    },
    changeRoles(e){
      this.roleI = e
      this.oneRole = this.batch.userConfList[e]
      this.isAddRole = true
      this.two = false
    },
    //删除工作人员
    deleteWorker(i){
      console.log(i)
      this.batch.workerIdList.splice(i,1)
    },
    //删除招募角色
    deleteRole(i){
      this.batch.userConfList.splice(i,1)
    },
    //新增物资
    addResources(){
      this.adds = true
    },
    //增加物资
    chooseResource(e){
      console.log(e)
      let m = this.batch.actResList
      let n = {}
      let isAdd = true
      if(m.length == 0){
        n.resourcesName = e.name
        n.resourcesId = e.resourcesId
        n.isOk = 2
        m.push(n)
      }else{
        for(let i=0;i<m.length;i++){
          if (m[i].resourcesName==e.name){
            isAdd = false
          }
        }
        if(isAdd){
          n.resourcesName = e.name
          n.resourcesId = e.resourcesId
          n.isOk = 2
          m.push(n)
        }else{
          this.$Message.error('已有该选项，请勿重复添加')
        }
      }
      this.adds = false
      this.batch.actResList = m
    },
    //删除物资
    deleteResources(i){
      this.batch.actResList.splice(i,1)
    },
    //发布时间
    releaseTime(e){
      console.log(e)
      if(e==1){
        this.releaseTimeSelf = true
      }else{
        this.releaseTimeSelf = false
      }
      this.batch.releaseTime = e
    },
    //自定义发布时间
    getReleaseTime(e){
      console.log(e)
      this.batch.releaseTime = e
    },
  }
}
</script>
<style lang="scss" scoped>
.head {
  margin-bottom: 0px;
}
.content {
  background: #f3f3f3;
  border-top: #e4e4e4 solid 1px;
  margin-top: 20px;
  .content-activity {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
  }
  .select {
    display: flex;
    background: #ffffff;
    height: 40px;
    align-items: center;
    .select-template {
      margin: 0 50px;
    }
  }
  .activitives {
    background: #ffffff;
    margin-bottom: 40px;
    // height: 900px;
    .activitives-top {
      height: 40px;
      margin-top: 40px;
      background: #ffffff;
      span {
        width: 140px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: #008e40;
        color: #ffffff;
        font-size: 14px;
        display: inline-block;
      }
    }
  }
  .main1 {
    padding: 0 50px;
    background: #ffffff;
    ul {
      padding: 20px 0;
      li {
        margin-bottom: 20px;
        // height: 40px;
        display: flex;
        align-items: center;
        .same_style {
          display: inline-block;
          width: 100px;
          margin-right: 70px;
        }
        .style-no {
          margin-right: 55px;
        }
        .imgs {
          width: 400px;
          height: 200px;
          background: #797979;
        }
      }
      .imges {
        align-items: flex-start;
      }
      .linkman {
        display: flex;
        height: 80px;
        align-items: flex-start;
      }
      .staff {
        p {
          margin-bottom: 20px;
          .same-staff {
            margin-right: 20px;
          }
          .relation {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
.relation {
  margin-right: 10px;
}
.same-staff {
  margin-right: 20px;
}
.details,
.recruit,
.material {
  background: #ffffff;
  margin-bottom: 40px;
  .details-head,
  .recruit-head,
  .material-head {
    height: 40px;
    background: #ffffff;
    span {
      width: 140px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: #008e40;
      color: #ffffff;
      font-size: 14px;
      display: inline-block;
    }
  }
  .recruitment {
    padding: 5px 50px;
    // height: 160px;
    p {
      padding: 0 50px;
      height: 40px;
      width: 700px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #e4e4e4;
      margin: 20px 0;
      line-height: 40px;
      .ivu-input-default {
        border: 0;
      }
    }
    h2,
    .added {
      text-align: center !important;
      height: 40px;
      line-height: 40px;
      border: 0;
      width: 700px;
      a {
        color: #008e40;
      }
    }
  }
  .ivu-icon-md-close-circle{
    font-size: 16px;
    color: #e4e4e4;
    margin-left: 10px;
  }
}
.issue {
  display: flex;
  align-items: center;
  justify-content:flex-start;
  font-size: 14px;
  background: #ffffff;
  height: 50px;
  padding-left: 50px;
  span{
    margin-right: 50px;
  }
  .self{
    margin-left: 100px;
  }
}
.button-food {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  .ivu-btn-default {
    height: 40px;
    width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: #ffffff;
    border: 1px solid #797979;
    margin-right: 10px;
    // color: #f3f3f3;/
  }
}

.ivu-select-default{
  margin-right: 10px;
}
</style>
