<!--活动立项(会员)-->
<template>
  <div class="active-lx">
    <Navigation :labels="navigation1"></Navigation>
    <div class="contents">
      <p class="head">
        <span>新增活动立项</span>
        <Button class="table-btn" @click="set">设置常用报名项</Button>
      </p>
      <div class="content-main">
        <div class="step">
          <Steps :current="current">
            <Step title="基本项"></Step>
            <Step title="详情维护"></Step>
            <Step title="新增批次提交"></Step>
          </Steps>
        </div>
        <!-- 第一步 -->
        <div v-if="selects">
          <div class="options">
            <ul>
              <li>
                <span>选择项目</span>
                <Select v-model="projectMsg.categoryName" style="width:300px" placeholder="请选择">
                  <Option
                    v-for="item in itemsList.categorys"
                    :value="item.name"
                    :key="item.name"
                    @click.native="getCategoryId(item)"
                  >{{ item.name }}</Option>
                </Select>
              </li>
              <li>
                <span>活动预算</span>
                <Input v-model="projectMsg.budget" placeholder="请输入活动预算金额" style="width: 300px"></Input>
              </li>
              <li>
                <span>有效期限</span>
                <Row>
                  <Col span="12">
                    <Date-picker
                      type="datetimerange" 
                      format="yyyy-MM-dd HH:mm"
                      placement="bottom-end"
                      placeholder="选择日期"
                      style="width: 300px"
                      @on-change="getDate"
                    ></Date-picker>
                  </Col>
                </Row>
              </li>
            </ul>
          </div>

          <div class="options">
            <ul>
              <li>
                <span>立项名称</span>
                <Input v-model="projectMsg.batchName" placeholder="请输入立项名称" style="width: 300px"></Input>
              </li>
              <li>
                <span>立项目的</span>
                <Input
                  v-model="projectMsg.batchObjective"
                  placeholder="请输入活动目的"
                  style="width: 300px"
                ></Input>
              </li>
              <li>
                <span>主题图片</span>
                <div class="start-wap">
                  <div class="upload" v-if='projectMsg.batchPicShow == null'>
                      <div class="file" @click="()=>{ this.$refs.files.click()}">
                        <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="files" @change="uploadFile()" multiple>
                        <p>+</p>
                      </div>
                  </div>
                  <img class="imgs" v-else :src="projectMsg.batchPicShow"/>
                  <img src="" alt="" v-if='projectMsg.batchPicShow == null' class="cancel" @click="cancelImg()">
                </div>
              </li>
              <li>
                <span>小组归属</span>
                <Select v-model="projectMsg.orgName" style="width:200px" placeholder="请选择小组归属">
                  <Option
                    v-for="item in itemsList.org1s"
                    :value="item.name"
                    :key="item.name"
                    @click.native="getOrg(item)"
                  >{{ item.name }}</Option>
                </Select>
              </li>
              <li>
                <span>招募类型</span>
                <RadioGroup v-model="projectMsg.recruitType">
                  <Radio label="1">整体招募</Radio>
                  <Radio label="2">批次招募</Radio>
                </RadioGroup>
              </li>
            </ul>
          </div>

          <div class="parnter">
            <div class="styles">合作方</div>
            <ul class="parnter-sans">
              <li v-for="(item,i) in projectMsg.partnerList" :key="i">
                <span>{{item.partName}}</span>
                <span @click="addPartner(i)">详情</span>
                <span @click="deletePartner(i)">
                  <Icon type="ios-close"></Icon>
                </span>
              </li>
            </ul>
            <p>
              <a @click="addPartner()">+新增合作方</a>
            </p>
          </div>
          <div class="content-text">
            <p>北京融爱融乐心智障碍者家庭支持中心</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam harum, fuga autem repudiandae incidunt a omnis vero nulla quaerat quibusdam dolorum excepturi? Incidunt praesentium consectetur est, repudiandae molestiae suscipit natus.</p>
          </div>
        </div>
        <!-- 第二步 -->
        <div class="content" v-if="two">
          <div class="select">
            <span class="select-template">活动分类</span>
            <Select v-model="batch.actTypeName" style="width:340px">
              <Option v-for="item in batchItemList.actTypes" :value="item.name" :key="item.name" @click.native="getActiveTypeId(item)">{{ item.name }}</Option>
            </Select>
          </div>
          <div class="select">
            <span class="select-template">选择模板</span>
            <Select v-model="model1" style="width:340px">
              <Option v-for="item in part" :value="item.name" :key="item.name">{{ item.name }}</Option>
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
                  <Input placeholder="请输入活动名称" v-model="batch.actName"></Input>
                </li>
                <li class="imges">
                  <span class="same_style">主题图片</span>
                  <div class="start-wap">
                    <div class="upload" v-if='image == null'>
                        <div class="file" @click="()=>{ this.$refs.files.click()}">
                          <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="files" @change="uploadFile()" multiple>
                          <p>+</p>
                        </div>
                    </div>
                    <img class="imgs" v-else :src="projectMsg.batchPicShow"/>
                    <img src="" alt="" v-if='image == null' class="cancel" @click="cancelImg()">
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
                  <iframe id="mapPage" width="100%" height="500px" frameborder=0 src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=CEIBZ-KTJR3-XOB37-Y5LZ6-ZGMLH-CSF75&referer=myapp">
                  </iframe>
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
            <Button>预览</Button>
            <Button>上一步</Button>
            <Button @click="nexttwo()">下一步</Button>
            <Button @click="draft">存为草稿</Button>
          </div>
        </div>
      </div>
    </div>
    <div class="btn" v-if="selects">
      <Button class="table-btn" @click="draft">存为草稿</Button>
      <Button class="table-btn" @click="nextone()">下一步</Button>
    </div>

    <!-- 弹出框 -->
    <div class="add" v-if="add">
      <p class="add-head">设置活动合作方</p>
      <div class="add-content">
        <ul>
          <li>
            <span>合作方</span>
            <Input v-model="partner.partName" placeholder="请输入合作方名称" style="width: 200px"></Input>
          </li>
          <li>
            <span>介绍</span>
            <Input type="textarea" v-model="partner.description" placeholder="请输入合作方介绍"></Input>
          </li>
          <li class="borders-img">
            <span>图片</span>
            <div class="start-wap">
              <div class="upload" v-if='image == null'>
                  <div class="file" @click="()=>{ this.$refs.files.click()}">
                    <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="files" @change="uploadFile()" multiple>
                    <p>+</p>
                  </div>
              </div>
              <img class="imgs" v-else :src="image"/>
              <img src="" alt="" v-if='image == null' class="cancel" @click="cancelImg()">
            </div>
          </li>
          <li>
            <span>协议</span>
            <div class="list">
              <ul v-for="(item,index) in partner.agrees">
                <li>
                  <span>协议名称</span>
                  <Input v-model="item.agreeName" placeholder="请输入协议名称" style="width: 300px"></Input>
                </li>
                <li>
                  <span>协议类型</span>
                  <Select v-model="item.agreeTypeName" style="width:200px">
                    <Option
                      v-for="item in part"
                      :value="item.name"
                      :key="item.value"
                      @click.native="getPartnerType(item,index)"
                    >{{ item.name }}</Option>
                  </Select>
                </li>
                <li>
                  <p>
                    <span>甲方</span>
                    <Input v-model="item.partA" placeholder="请输入甲方名称" style="width: 200px"></Input>
                  </p>
                  <p>
                    <span>乙方</span>
                    <Input v-model="item.partB" placeholder="请输入乙方名称" style="width: 200px"></Input>
                  </p>
                </li>
              </ul>
            </div>
          </li>
          <li class="upload">
            <span>上传附件</span>
          </li>
        </ul>
      </div>
      <p class="add-deal">
        <a @click="addAgrees">+新增协议</a>
      </p>
      <p class="table-btn-p">
        <Button class="table-btn" @click="off()">取消</Button>
        <Button class="table-btn active" @click="save()">保存</Button>
      </p>
    </div>
    <div class="add" v-if="isAddRole">
      <role></role>
    </div>
    <!-- 第三步 -->
    <div class="content-three" v-if="three">
      <div class="main1">
        <ul>
          <li>
            <span>选择项目</span>
            <Select v-model="projectMsg.categoryName" style="width:300px" placeholder="请选择">
              <Option
                v-for="item in itemsList.categorys"
                :value="item.name"
                :key="item.name"
                @click.native="getCategoryId(item)"
              >{{ item.name }}</Option>
            </Select>
          </li>
          <li>
            <span>活动预算</span>
            <Input v-model="projectMsg.budget" placeholder="请输入活动预算金额" style="width: 300px"></Input>
          </li>
          <li>
            <span>有效期限</span>
            <Row>
              <Col span="12">
                <Date-picker
                  type="datetimerange" 
                  format="yyyy-MM-dd HH:mm"
                  placement="bottom-end"
                  placeholder="选择日期"
                  style="width: 300px"
                  @on-change="getDate"
                ></Date-picker>
              </Col>
            </Row>
          </li>
        </ul>
      </div>
      <div class="goal-three">
        <ul>
          <li>
            <span>立项名称</span>
            <Input v-model="projectMsg.batchName" placeholder="请输入立项名称" style="width: 300px"></Input>
          </li>
          <li>
            <span>立项目的</span>
            <Input
              v-model="projectMsg.batchObjective"
              placeholder="请输入活动目的"
              style="width: 300px"
            ></Input>
          </li>
          <li>
            <span>小组归属</span>
            <Select v-model="projectMsg.orgName" style="width:200px" placeholder="请选择小组归属">
              <Option
                v-for="item in itemsList.org1s"
                :value="item.name"
                :key="item.name"
                @click.native="getOrg(item)"
              >{{ item.name }}</Option>
            </Select>
          </li>
          <li>
            <span>招募类型</span>
            <RadioGroup v-model="projectMsg.recruitType">
              <Radio label="1">整体招募</Radio>
              <Radio label="2">批次招募</Radio>
            </RadioGroup>
          </li>
        </ul>
        <div class="images">
          <img :src="projectMsg.batchPicShow"/>
        </div>
      </div>
      <div class="activite-three">
        <p class="active-head">
          <span>活动立项批次</span>
        </p>
        <div class="activite-content">
          <img src />
          <ul v-for="item in projectMsg.actInfoList">
            <li class="activite-li">
              <span>{{item.actName}}</span>
            </li>
            <li>
              <span>地点：{{item.actAddress}}</span>
            </li>
            <li>
              <span>活动日期：{{item.startT}}至{{item.endT}}</span>
            </li>
          </ul>
        </div>
        <div class="add-three">
          <p>
            <a>+新增批次</a>
          </p>
        </div>
      </div>
      <div class="pdu-three">
        <p>
          <Checkbox v-model="single">
            我同意
            <a>《活动发布规则》</a>
          </Checkbox>
        </p>
        <p class="btn-three">
          <Button>上一步</Button>
          <Button @click="draft">存为草稿</Button>
          <Button type="success" @click="submit">提交审核</Button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { projectItem, partner,batchItem,leader,projectApproval } from "@/request/api";

import role from "./compile_beneficiary.vue"
import { orgimg } from "@/request/http";

export default {
  data() {
    return {
      projectMsg: {
        partnerList: []
      },
      partner: {
        partName: "",
        description: "",
        agrees: [
          {
            agreeName: "",
            agreeType: "",
            agreeTypeName: "",
            partA: "",
            partB: ""
          }
        ]
      },
      agrees: [
        {
          agreeName: "",
          agreeType: "",
          agreeTypeName: "",
          partA: "",
          partB: ""
        }
      ],
      batch:{
        userConfList:[],
        actResList:[],
        actShowPic: '',
        workerIdList:[{}]
      },
      itemsList: [],
      part: [],
      batchItemList:[],
      editorContent1: "",
      navigation1: {
        head: "活动立项"
      },
      current: 0,
      single: false,
      model1: "",
      value: "",
      value2: "",
      animal: "批次招募",
      add: false,
      selects: true,
      two: false,
      three: false,
      adds: false,
      addbtns: true,
      tripSelf:false,
      addLeader:false,
      addWorker:false,
      releaseTimeSelf:false,
      isAddRole:false,
      editor1:'',
      orgimg:'',
      userId:1,
      image:''
    };
  },

  components: {role},

  computed: {},

  created() {
    // this.userId = localStorage.getItem('userId')
    this.getProjectItem();
    this.getPartner();
    this.getBatchItem();
  },
  mounted(){
    this.orgimg = orgimg;
  },

  methods: {
    //立项前置项查询
    getProjectItem() {
      projectItem({
        userId: this.userId
      }).then(res => {
        console.log(res);
        this.itemsList = res.data;
      });
    },
    //立项合作方
    getPartner() {
      partner({}).then(res => {
        console.log(res);
        this.part = res.data;
      });
    },
    //批次活动前置信息查询
    getBatchItem(){
      batchItem({
        userId:this.userId
      }).then(res => {
        console.log(res);
        this.batchItemList = res.data
      });
    },
    //新增合作方
    addPartner(e) {
      if (e >= 0) {
        this.partnerIndex = e;
        this.partner = this.projectMsg.partnerList[e];
      } else {
        let p = {
          partName: "",
          description: "",
          agrees: [
            {
              agreeName: "",
              agreeType: "",
              agreeTypeName: "",
              partA: "",
              partB: ""
            }
          ]
        };
        this.partner = p;
      }
      this.add = true;
    },
    //删除合作方
    deletePartner(e) {
      this.projectMsg.partnerList.splice(e, 1);
    },
    //第一步
    addbtn() {
      this.add = true;
      console.log(11);
    },
    set() {
      this.$router.push({ name: "registration" });
    },
    nextone() {
      (this.selects = false), (this.two = true), (this.current = 1);
    },

    //保存合作方
    save() {
      if (this.partnerIndex >= 0) {
        this.projectMsg.partnerList[this.partnerIndex] = this.partner;
        delete this.partnerIndex;
      } else {
        this.projectMsg.partnerList.push(this.partner);
      }
      this.add = false;
    },
    //取消
    off() {
      this.add = false;
    },

    //第二步
    addbtnes() {
      this.adds = !this.adds;
      this.addbtns = !this.addbtns;
    },

    nexttwo() {
      (this.two = false), (this.three = true), this.current++;
    },
    //第三步

    //选择项目
    getCategoryId(val) {
      this.projectMsg.categoryId = val.categoryId;
      this.projectMsg.categoryName = val.name;
      console.log(this.projectMsg);
    },
    //获取日期
    getDate(e) {
      this.projectMsg.startT = e[0];
      this.projectMsg.endT = e[1];
    },
    //小组归属
    getOrg(val) {
      this.projectMsg.orgId = val.orgId;
      this.projectMsg.orgName = val.name;
    },
    //协议类型
    getPartnerType(val, index) {
      this.partner.agrees[index].agreeType = val.dicId;
      this.partner.agrees[index].agreeTypeName = val.name;
    },
    //新增协议
    addAgrees() {
      this.partner.agrees.push(this.agrees);
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

    //提交
    submit() {
      console.log(this.projectMsg);
      this.projectMsg.userId = this.userId
      this.projectMsg.is_draft = 2
      projectApproval(
        this.projectMsg
      ).then(res => {
        console.log(res);
      });
    },
    //提交
    draft() {
      console.log(this.projectMsg);
      this.projectMsg.userId = this.userId
      this.projectMsg.is_draft = 1
      projectApproval(
        this.projectMsg
      ).then(res => {
        console.log(res);
      });
    },
    uploadFile() {
      let file = this.$refs.files.files[0]
      const dataForm = new FormData()
      dataForm.append('file', file)
      orgimg(dataForm).then(res => {

      })
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        this.image = e.target.result
      }
    },
    cancelImg(){
      orgimgdel({path:this.data.args.pic}).then(res => {
        this.$Message.success('删除成功')
      })
    },
  }
};
</script>
<style lang="scss" scoped>
.active-lx {
  position: relative;
}
.contents {
  padding-left: 20px;
  .head {
    height: 50px;
    line-height: 50px;
    span {
      margin-right: 30px;
    }
  }
  .step {
    width: 900px;
    background: #ffffff;
    height: 110px;
    display: flex;
    align-items: center;
    // justify-content: center;
    margin: 10px 0;
  }
  .options {
    width: 900px;
    background: #ffffff;
    // height: 180px;
    padding: 5px 0;
    margin-bottom: 10px;
    ul {
      //  height: 180px;
      li {
        display: flex;
        align-items: center;
        margin: 10px 0;
        font-size: 14px;

        span {
          margin: 0px 60px;
        }
      }
    }
  }

  .parnter {
    width: 900px;
    background: #ffffff;
    .parnter-sans,
    ul {
      li {
        padding-left: 60px;
        display: flex;
        justify-content: space-between;
        // width: 700px;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        border-bottom: solid 1px #e4e4e4;
        padding-right: 100px;
      }
      .styles {
        border: 0px;
      }
    }
    p {
      height: 70px;
      line-height: 70px;
      text-align: center;
      a {
        color: #008e40;
        font-size: 14px;
      }
    }
  }
  .content-text {
    height: 100px;
    width: 900px;
    background: #ffffff;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    // align-items: center;
    flex-direction: column;
    padding-left: 20px;
    font-size: 14px;
    line-height: 18px;
  }
}
.btn {
  display: flex;
  justify-content: center;
  height: 50px;
  align-items: center;
  margin-top: 70px;
  border: #e4e4e4 1px solid;
  button {
    height: 40px;
    width: 140px;
    margin: 10px;
    border: black solid 1px;
  }
}

.add {
  position: absolute;
  top: 240px;
  left: 20px;
  // margin: 0 auto;
  // height: 700px;
  padding-bottom: 20px;
  width: 900px;
  background: #ffffff;
  padding-left: 40px;
  .add-head {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    border-bottom: #e4e4e4 solid 1px;
  }
}
.add-content {
  ul {
    li {
      display: flex;
      // align-items: center;
      margin: 10px 0;
      span {
        display: inline-block;
        width: 140px;
        height: 40px;
        font-size: 14px;
        // text-align: center;
        // line-height: 40px;
      }
      img {
        height: 150px;
        width: 350px;
        background: #e4e4e4;
      }
    }
    .borders-img {
      border-bottom: #e4e4e4 solid 1px;
      padding-bottom: 40px;
    }
    .introduce {
      height: 70px;
    }
  }
}
.list {
  li {
    span {
      line-height: 30px;
      width: 70px !important;
      margin-left: 20px;
    }
  }
  .upload {
    padding-left: 20px;
  }
}
.add-deal {
  text-align: center;
  height: 40px;
  line-height: 40px;
  a {
    color: #008e40;
    font-size: 14px;
  }
  margin: 25px 0;
}
.table-btn-p {
  // height: ;
  display: flex;
  justify-content: center;
  background: #ffffff;
  .table-btn {
    width: 140px;
    height: 40px;
    border: #008e40 solid 1px;
    margin: 0 20px;
  }
  .active {
    background: #008e40;
    color: #ffffff;
  }
}

// 第二步
.content {
  background: #f3f3f3;
  margin-top: 10px;
  width: 900px;
  .content-activity {
    height: 50px;
    line-height: 50px;
  }
  .select {
    display: flex;
    background: #ffffff;
    height: 80px;
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
          margin-right: 70px;
          display: inline-block;
          width: 100px;
        }
        .imgs {
          width: 400px;
          height: 200px;
          background: #797979;
        }
        .ivu-select-default {
          margin-left: 10px;
          .ivu-select-item {
            margin: 0;
          }
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
}
.issue {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 14px;
  background: #ffffff;
  height: 50px;
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

// 第三步
.content-three {
  margin-left: 20px;
  width: 900px;
  .goal-three,
  .main1 {
    background: #ffffff;
    height: 160px;
    ul {
      display: flex;
      height: 160px;
      flex-direction: column;
      justify-content: space-around;
      align-content: space-between;
      li {
        display: flex;
        padding-left: 50px;
        span {
          display: inline-block;
          height: 40px;
          width: 240px;
          line-height: 40px;
          font-size: 14px;
        }
      }
    }
  }

  .goal-three {
    height: 200px;
    display: flex;
    align-items: center;
    margin-top: 20px;
    justify-content: space-between;
    padding-right: 50px;
    li {
      align-items: center;
    }
    .images {
      height: 150px;
      width: 300px;
      background: #e4e4e4;
    }
  }
  .activite-three {
    height: 300px;
    background: #ffffff;
    margin-top: 20px;
    .active-head {
      height: 30px;
      span {
        height: 30px;
        width: 130px;
        text-align: center;
        line-height: 30px;
        background: #008e40;
        color: #ffffff;
        display: inline-block;
      }
    }
    .activite-content {
      height: 170px;
      width: 650px;
      border: 1px solid #e4e4e4;
      display: flex;
      align-items: center;
      // justify-content: center;
      margin-top: 20px;
      margin-left: 60px;
      img {
        height: 130px;
        width: 200px;
        margin: 0 30px;
      }
      ul {
        margin-left: 20px;
        li {
          font-size: 14px;
          line-height: 20px;
        }
      }
      .activite-li {
        font-size: 16px;
        margin-bottom: 10px;
      }
    }
  }
  .add-three {
    font-size: 14px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    a {
      color: #008e40;
    }
  }
  .pdu-three {
    // height: 40px;

    text-align: center;
    line-height: 40px;
    // font-size: 16px;
    p {
      margin-top: 30px;
      button {
        margin: 0 10px;
        height: 40px;
        width: 140px;
      }
    }
    a {
      color: #008e40;
      // font-size: 16px;
    }
  }

  .start-wap{
    position: relative;
    height: 150px;
    width: 300px;
    .cancel{
      width: 30px;
      height: 30px;
      background: #000;
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
}
</style>
