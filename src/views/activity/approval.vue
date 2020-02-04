<!--活动立项(会员)-->
<template>
  <div class="lx-content">
    <adress :value="adr" @change="getMap" />
    <Navigation :labels="navigation1"></Navigation>
    <div class="lx-cont">
      <p class>
        <span class="first-span">新增活动立项</span>
        <Button class @click="set">设置常用报名项</Button>
      </p>
      <div class='lx-jd'>
        <div class>
          <Steps :current="current">
            <Step title="基本项"></Step>
            <Step title="详情维护"></Step>
            <Step title="新增批次提交"></Step>
          </Steps>
        </div>
      </div>

      <div v-if="selects">
        <Row>
          <Col span="10">
            <ul>
              <li class="first-li">
                <span class="first-span">选择项目</span>
                <Select v-model="projectMsg.categoryName" style="width:300px" placeholder="请选择">
                  <Option
                    v-for="item in itemsList.categorys"
                    :value="item.name"
                    :key="item.name"
                    @click.native="getCategoryId(item)"
                  >{{ item.name }}</Option>
                </Select>
              </li>
              <li class="first-li">
                <span class="first-span">活动预算</span>
                <Input v-model="projectMsg.budget" placeholder="请输入活动预算金额" style="width: 300px"></Input>
              </li>
              <li class="first-li">
                <span class="first-span">有效期限</span>
                <Row>
                  <Col span="11">
                    <Date-picker
                      type="datetime"
                      :value="projectMsg.startT"
                      format="yyyy-MM-dd HH:mm"
                      placement="bottom-end"
                      placeholder="选择开始时间"
                      style="width: 140px"
                      :editable="false"
                      @on-change="getStartDate"
                    ></Date-picker>
                  </Col>
                  <Col span="2" class="wave">~</Col>
                  <Col span="11">
                    <Date-picker
                      type="datetime"
                      :value="projectMsg.endT"
                      format="yyyy-MM-dd HH:mm"
                      placement="bottom-end"
                      placeholder="选择结束时间"
                      style="width: 140px"
                      :editable="false"
                      @on-change="getEndDate"
                    ></Date-picker>
                  </Col>
                </Row>
              </li>
              <li class="first-li">
                <span class="first-span">立项名称</span>
                <Input v-model="projectMsg.batchName" placeholder="请输入立项名称" style="width: 300px"></Input>
              </li>
              <li class="first-li">
                <span class="first-span">立项目的</span>
                <Input
                  v-model="projectMsg.batchObjective"
                  placeholder="请输入活动目的"
                  style="width: 300px"
                ></Input>
              </li>
              <li class="first-li">
                <span class="first-span">主题图片</span>
                <div>
                  <div class="first-pic" v-if='projectMsg.batchPicShow == null'>
                      <div class="" @click="()=>{ this.$refs.files.click()}">
                        <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="files" @change="uploadFile()" style="display:none" >
                        <Icon type="md-cloud-upload" :size='36' color="#FF565A"/>
                      </div>
                  </div>
                  <div class="first-pic" v-else>
                    <img class="imgs" style="width:283px;height:188px" :src="projectMsg.batchPicShow"/>
                    <span v-if='projectMsg.batchPicShow' class="cancel" @click="cancelImg()">X</span>
                  </div>
                </div>
              </li>
              <li class="first-li">
                <span class="first-span">小组归属</span>
                <Select v-model="projectMsg.orgName" style="width:300px" placeholder="请选择小组归属">
                  <Option
                    v-for="(item,index) in itemsList.org1s"
                    :value="item.name"
                    :key="index"
                    @click.native="getOrg(item)"
                  >{{ item.name }}</Option>
                </Select>
              </li>
              <li class="first-li">
                <span class="first-span">招募类型</span>
                <RadioGroup v-model="projectMsg.recruitType">
                  <Radio label="2">批次招募</Radio>
                  <Radio label="1" disabled>整体招募</Radio>
                </RadioGroup>
              </li>
            </ul>
          </Col>

          <Col span="10">
            <ul>
              <li class="first-li">合作方</li>
              <li class="first-li">
                <Row v-for="(item,i) in projectMsg.partnerList" :key="i" class="li-flex-between" style="width:100%">
                  <Col span="10">{{item.partName}}</Col>
                  <Col span="10" style="par-col" class="li-flex-between">
                    <div @click="addPartner(i)" style="margin-right:10px">详情</div>
                    <div @click="deletePartner(i)">
                      <Icon type="ios-close"></Icon>
                    </div>
                  </Col>
                </Row>
              </li>
              <li class="lx-flex-center">
                <Button @click="addPartner()">+新增合作方</Button>
              </li>
              <li class="ins">
                <div>
                  <p class="ins-p" v-html="itemsList.org.propagandaTitle"></p>
                  <p class="ins-b" v-html="itemsList.org.propagandaText"></p>
                </div>
              </li>
            </ul>
          </Col>
        </Row>
      </div>

      <div v-if='two'>
        <Row>
          <Col span='10'>
            <ul>
              <li class="first-li">
                <span class="first-span">活动分类</span>
                <Select v-model="batch.actTypeName" style="width:300px">
                  <Option v-for="item in batchItemList.actTypes" :value="item.name" :key="item.name" @click.native="getActiveTypeId(item)">{{ item.name }}</Option>
                </Select>
              </li>
              <li class="first-li">
                <span class="first-span">选择模板</span>
                <Select style="width:300px">
                  <Option v-for="item in templateList" :value="item.name" :key="item.name" @click.native="getTemplateDetail(item)">{{ item.name }}</Option>
                </Select>
              </li>
              <li class="first-li">
                <span class="first-span">活动名称</span>
                <Input placeholder="请输入活动名称" v-model="batch.actName" style="width:300px"></Input>
              </li>
              <li class="first-li">
                <span class="first-span">封面图片</span>
                <div>
                  <div class="first-picfm" v-if='batch.actCoverShowPic == null'>
                    <div class="" @click="()=>{ this.$refs.filefm.click()}">
                      <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="filefm" @change="uploadActFmFile()" style="display:none" >
                      <Icon type="md-cloud-upload" :size='36' color="#FF565A"/>
                    </div>
                  </div>
                  <div class="first-picfm" v-else>
                    <img class="imgs" style="width:200px;height:200px" :src="batch.actCoverShowPic"/>
                    <span v-if='batch.actCoverShowPic' class="cancel" @click="cancelActFmImg()">X</span>
                  </div>
                </div>
              </li>
              <li class="first-li">
                <span class="first-span">主题图片</span>
                <div>
                  <div class="first-pic" v-if='batch.actShowPic == null'>
                    <div class="" @click="()=>{ this.$refs.filezt.click()}">
                      <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="filezt" @change="uploadActFile()" style="display:none" >
                      <Icon type="md-cloud-upload" :size='36' color="#FF565A"/>
                    </div>
                  </div>
                  <div class="first-pic" v-else>
                    <img class="imgs" style="width:283px;height:188px" :src="batch.actShowPic"/>
                    <span v-if='batch.actShowPic' class="cancel" @click="cancelActImg()">X</span>
                  </div>
                </div>
              </li>
            </ul>
          </Col>
          <Col span='10'>
            <ul>
              <li class="first-li">
                <span class="first-span">活动时间</span>
                <Row>
                  <Col span="11">
                    <Date-picker
                      type="datetime"
                      :value="batch.startT"
                      format="yyyy-MM-dd HH:mm"
                      placement="bottom-end"
                      placeholder="选择活动开始时间"
                      style="width: 140px"
                      :editable="false"
                      @on-change="getBatchStartDate"
                    ></Date-picker>
                  </Col>
                  <Col span="2" class="wave">~</Col>
                  <Col span="11">
                    <Date-picker
                      type="datetime"
                      :value="batch.endT"
                      format="yyyy-MM-dd HH:mm"
                      placement="bottom-end"
                      placeholder="选择活动结束时间"
                      style="width: 140px"
                      :editable="false"
                      @on-change="getBatchEndDate"
                    ></Date-picker>
                  </Col>
                </Row>
              </li>
              <li class="first-li">
                <span class="first-span">活动地址</span>
                <span @click="getAdr()">{{ batch.actAddress == null?"选择活动地址":batch.actAddress}}</span>
              </li>
              <li class="first-li">
                <span class="first-span">出行方式</span>
                <RadioGroup v-model="batch.actVehicle" @on-change='tripMode'>
                  <Radio label="自驾">自驾</Radio>
                  <Radio label="大巴">大巴</Radio>
                  <Radio label="自定义" :true-value='tripSelf'>自定义</Radio>
                </RadioGroup>
              </li>
              <li v-if="tripSelf">
                <Input v-model="batch.actVehicle" placeholder="请输入出行方式"></Input>
              </li>
              <li class="li-flex-between">
                <span class="first-span">现场联系人</span>
                <span class="first-span">姓名</span>
                <Input v-model="batch.ownerUserName" style="width: 150px" class="same-staff" @on-change='getLeaderList'></Input>
                <span class="first-span">联系方式</span>
                <Input v-model="batch.ownerUserTel" style="width: 150px" class="same-staff" disabled></Input>
              </li>
              <li v-if='addLeader'>
                <Select style="width:300px" placeholder="请选择现场联系人">
                  <Option
                    v-for="(item,idx) in leaderList"
                    :value="item.name"
                    :key="idx"
                    @click.native="getLeader(item)"
                  >{{ item.name }} {{item.tel}}</Option>
                </Select>
              </li>
              <li class="first-li">
                <span class="first-span">工作人员</span>
                <Button @click="addWorkers">添加</Button>
              </li>
              <li v-for="(item,index) in batch.workerIdList" class="li-flex-around">
                <span>姓名</span>
                <Input v-model="item.ownerUserName" style="width: 200px" class="same-staff" @on-change='getWorkerList(item,index)'></Input>
                <span>联系方式</span>
                <Input v-model="item.ownerUserTel" style="width: 200px" class="same-staff" disabled></Input>
                <span @click="deleteWorker(index)">删除</span>
              </li>
              <li v-if='addWorker'>
                <Select style="width:300px" placeholder="请选择工作人员">
                  <Option
                    v-for="(i,idx) in workerList"
                    :value="i.name"
                    :key="idx"
                    @click.native="getWorker(i)"
                  >{{ i.name }} {{i.tel}}</Option>
                </Select>
              </li>
              <li class="first-li">
                <span class="first-span">活动标签</span>
                <Select v-model="batch.actLabelName" style="width:300px" placeholder="请选择活动标签">
                  <Option
                    v-for="item in batchItemList.labels"
                    :value="item.name"
                    :key="item.name"
                    @click.native="getActiveLabels(item)"
                  >{{ item.name }}</Option>
                </Select>
              </li>
              <li class="first-li">招募角色</li>
              <li>
                <p v-for="(item,i) in batch.userConfList" class="li-flex-around lx-resource">
                  <span>{{item.roleName}}</span>
                  <span>{{item.recruitNum}}</span>
                  <span @click="changeRoles(i)">详情</span>
                  <span @click="deleteRole(i)">删除</span>
                </p>
              </li>
              <li class="lx-flex-center">
                <Button @click="addRoles()">+新增招募角色</Button>
              </li>
              <li class="first-li">所需物资</li>
              <li>
                <p v-for="(item,i) in batch.actResList" class="li-flex-around lx-resource">
                  <span>{{item.resourcesName}}</span>
                  <Input v-model="item.num" style="width: 200px" placeholder="请输入数量"></Input>
                  <span>
                    <Checkbox v-model="item.isOk" :true-value='1'>已筹</Checkbox>
                    <Icon type="ios-close" @click="deleteResources(i)"></Icon>
                  </span>
                </p>
              </li>
              <li class="lx-flex-center">
                <Button @click="addResources">+新增物质</Button>
              </li>
              <li v-if="adds">
                <Button v-for="item in batchItemList.resources" @click="chooseResource(item)">{{item.name}}</Button>
              </li>
              <li class="first-li">
                <span class="first-span">发布时间</span>
                <RadioGroup v-model="batch.releaseTime" @on-change='releaseTime'>
                  <Radio label="0">活动开始前一个月自动发布</Radio>
                  <Radio label="1" :true-value='releaseTimeSelf'>自定义</Radio>
                </RadioGroup>
                <Date-picker :value="batch.releaseTime" v-if='releaseTimeSelf' type="datetime" :editable="false" format="yyyy-MM-dd HH:mm" placeholder="选择日期" style="width: 200px" @on-change="getReleaseTime"></Date-picker>
              </li>
            </ul>
          </Col>
        </Row>
        <Row style="margin-top:40px">
          <Col style="margin-bottom:10px;">活动详情</Col>
          <Col>
            <wangeditor :labels="batch.detail" id="ed1" @change="changeEditorTrain"></wangeditor>
          </Col>
        </Row>
      </div>

      <div v-if="three">
        <Row>
          <Col span="10">
            <ul>
              <li class="first-li">
                <span class="first-span">选择项目</span>
                <Select v-model="projectMsg.categoryName" style="width:300px" placeholder="请选择">
                  <Option
                    v-for="item in itemsList.categorys"
                    :value="item.name"
                    :key="item.name"
                    @click.native="getCategoryId(item)"
                  >{{ item.name }}</Option>
                </Select>
              </li>
              <li class="first-li">
                <span class="first-span">活动预算</span>
                <Input v-model="projectMsg.budget" placeholder="请输入活动预算金额" style="width: 300px"></Input>
              </li>
              <li class="first-li">
                <span class="first-span">有效期限</span>
                <Row>
                  <Col span="11">
                    <Date-picker
                      type="datetime"
                      :value="projectMsg.startT"
                      format="yyyy-MM-dd HH:mm"
                      placement="bottom-end"
                      placeholder="选择开始时间"
                      style="width: 140px"
                      :editable="false"
                      @on-change="getStartDate"
                    ></Date-picker>
                  </Col>
                  <Col span="2" class="wave">~</Col>
                  <Col span="11">
                    <Date-picker
                      type="datetime"
                      :value="projectMsg.endT"
                      format="yyyy-MM-dd HH:mm"
                      placement="bottom-end"
                      placeholder="选择结束时间"
                      style="width: 140px"
                      :editable="false"
                      @on-change="getEndDate"
                    ></Date-picker>
                  </Col>
                </Row>
              </li>
              <li class="first-li">
                <span class="first-span">立项名称</span>
                <Input v-model="projectMsg.batchName" placeholder="请输入立项名称" style="width: 300px"></Input>
              </li>
              <li class="first-li">
                <span class="first-span">立项目的</span>
                <Input
                  v-model="projectMsg.batchObjective"
                  placeholder="请输入活动目的"
                  style="width: 300px"
                ></Input>
              </li>
              <li class="first-li">
                <span class="first-span">主题图片</span>
                <div>
                  <div class="first-pic" v-if='projectMsg.batchPicShow == null'>
                      <div class="" @click="()=>{ this.$refs.files.click()}">
                        <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="files" @change="uploadFile()" style="display:none" >
                        <Icon type="md-cloud-upload" :size='36' color="#FF565A"/>
                      </div>
                  </div>
                  <div class="first-pic" v-else>
                    <img class="imgs" style="width:283px;height:188px" :src="projectMsg.batchPicShow"/>
                    <span v-if='projectMsg.batchPicShow' class="cancel" @click="cancelImg()">X</span>
                  </div>
                </div>
              </li>
              <li class="first-li">
                <span class="first-span">小组归属</span>
                <Select v-model="projectMsg.orgName" style="width:300px" placeholder="请选择小组归属">
                  <Option
                    v-for="(item,index) in itemsList.org1s"
                    :value="item.name"
                    :key="index"
                    @click.native="getOrg(item)"
                  >{{ item.name }}</Option>
                </Select>
              </li>
              <li class="first-li">
                <span class="first-span">招募类型</span>
                <RadioGroup v-model="projectMsg.recruitType">
                  <Radio label="1">整体招募</Radio>
                  <Radio label="2">批次招募</Radio>
                </RadioGroup>
              </li>
            </ul>
          </Col>
          <Col span="10">
            <p class="active-head">
              <span>活动立项批次</span>
            </p>
            <div class="first-li" style="width:100%" v-for="(item,i) in projectMsg.actInfoList">
              <img style="width:200px;height:150px" :src='item.actShowPic' />
              <ul style="margin-left:20px;width:60%">
                <li class="first-li">
                  <span>{{item.actName}}</span>
                </li>
                <li class="first-li">
                  <span>地点：{{item.actAddress}}</span>
                </li>
                <li class="first-li">
                  <span>活动日期：{{item.startT}}至{{item.endT}}</span>
                </li>
                <li class="li-flex-around">
                  <Button @click.native="changePc(i)">修改</Button>
                  <Button @click.native="deletePc(i)">删除</Button>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>

      <div v-if="selects" class="lx-flex-center lx-btn">
        <Button class="lx-draft" @click="draft">存为草稿</Button>
        <Button class="lx-next" @click.native="nextOne()">下一步</Button>
      </div>

      <div v-if="two" class="lx-flex-center lx-btn">
        <Button class="lx-draft" @click="draft">存为草稿</Button>
        <Button class="lx-next" @click.native="nextTwo()">下一步</Button>
      </div>

      <div v-if="three" class="lx-flex-center lx-btn">
        <Button class="lx-draft" @click="draft">存为草稿</Button>
        <Button class="lx-submit" @click.native="submit()">提交审核</Button>
      </div>

      <!-- 弹出框 -->
      <div class="" v-if="add" style="padding:20px 0">
        <p class="" style="padding:10px 0">设置活动合作方</p>
        <div class="">
          <ul>
            <li class="first-li">
              <span class="first-span">合作方</span>
              <Input v-model="partner.partName" placeholder="请输入合作方名称" style="width: 300px;margin-left:15px"></Input>
            </li>
            <li class="first-li">
              <span class="first-span">介绍</span>
              <Input type="textarea" v-model="partner.description" placeholder="请输入合作方介绍" style="width: 300px;margin-left: 30px;" :rows='5'></Input>
            </li>
            <li class="first-li">
                <span class="first-span">图片</span>
                <div style="margin-left: 30px;">
                  <div class="first-pic" v-if='partner.partPicShow == null'>
                      <div class="" @click="()=>{ this.$refs.filepar.click()}">
                        <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="filepar" @change="uploadPartnerFile()" style="display:none" >
                        <Icon type="md-cloud-upload" :size='36' color="#FF565A"/>
                      </div>
                  </div>
                  <div class="first-pic" v-else>
                    <img class="imgs" style="width:283px;height:188px" :src="partner.partPicShow"/>
                    <span v-if='partner.partPicShow' class="cancel" @click="cancelPartnerImg()">X</span>
                  </div>
                </div>
              </li>
            <li>
              <p style="padding:10px 0">协议</p>
              <div>
                <ul v-for="(item,index) in partner.agrees">
                  <li class="first-li">
                    <span class="first-span">协议名称</span>
                    <Input v-model="item.agreeName" placeholder="请输入协议名称" style="width: 300px"></Input>
                  </li>
                  <li class="first-li">
                    <span class="first-span">协议类型</span>
                    <Select v-model="item.agreeTypeName" style="width:300px">
                      <Option
                        v-for="item in part"
                        :value="item.name"
                        :key="item.value"
                        @click.native="getPartnerType(item,index)"
                      >{{ item.name }}</Option>
                    </Select>
                  </li>
                  <li class="first-li">
                    <span class="first-span">甲方</span>
                    <Input v-model="item.partA" placeholder="请输入甲方名称" style="width: 300px;margin-left: 30px"></Input>
                  </li>
                  <li class="first-li">
                    <span class="first-span">乙方</span>
                    <Input v-model="item.partB" placeholder="请输入乙方名称" style="width: 300px;margin-left: 30px"></Input>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <p class="add-deal">
          <Button @click="addAgrees">+新增协议</Button>
        </p>
        <!-- <div class="upload">
          <span>上传附件</span>
        </div> -->
        <div class="lx-flex-center" style="width:80%">
          <div class="li-flex-around" style="width:40%">
            <Button class="table-btn" @click="off()">取消</Button>
            <Button class="table-btn active" @click="save()">保存</Button>
          </div>
        </div>
      </div>
      <div class="" v-if="isAddRole">
        <role :oneRole="oneRole" @cancelEdit="cancelRole" @oneRole='getRole'></role>
      </div>

    </div>
  </div>
</template>

<script>
import {
  projectItem,
  partner,
  batchItem,
  leader,
  projectApproval,
  chooseTempalte,
  templateMsg,
  orgimgdel,draftsDetail
} from "@/request/api";

import role from "./compile_beneficiary.vue";
import adress from "_c/map";
import { orgimg } from "@/request/http";
import { upload } from "@/request/http";

export default {
  data() {
    return {
      projectMsg: {
        partnerList: [],
        actInfoList: []
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
      batch: {
        userConfList: [],
        actResList: [],
        workerIdList: [{}]
      },
      itemsList: [],
      part: [],
      batchItemList: [],
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
      tripSelf: false,
      addLeader: false,
      addWorker: false,
      releaseTimeSelf: false,
      isAddRole: false,
      editor1: "",
      orgimg: "",
      userId: 1,
      image: "",
      oneRole: {},
      roleMsg: {
        fdList: [{ name: '反馈简介', type: 0},{ name: '上传图片', type: 9, context: 2 }],
        refund: {},
        signRuleList: [],
        itemList: [],
        choiceRuleList: []
      },
      roleI: 0, //招募角色下标
      adr: false,
      pcNum: 0,
      templateList: [],
    };
  },

  components: { role, adress },

  computed: {},

  created() {
    this.userId = this.$store.state.userId;
    if(this.$route.query.batchId){
      if (this.$route.query.copy != 1){
        this.batchId= this.$route.query.batchId
      }
      this.getDraftsDetail(this.$route.query.batchId)
    }
    this.getProjectItem();
    this.getPartner();
    this.getBatchItem();
  },
  mounted() {
    this.orgimg = orgimg;
  },

  methods: {
    getDraftsDetail(e){
      draftsDetail({
        batchId:e,
        isTime:this.batchId?2:null
      }).then(res=>{
        console.log(res)
        this.projectMsg = res.data
      })
    },
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
    getBatchItem() {
      batchItem({
        userId: this.userId
      }).then(res => {
        console.log(res);
        this.batchItemList = res.data;
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
      this.selects = false;
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
      this.$router.push({ name: "volunteer_apply", params: { sysId: "1,3" } });
    },
    nextOne() {
      this.selects = false
      this.two = true
      this.current = 1
      let batch = {
        userConfList: [],
        actResList: [],
        workerIdList: [{}]
      }
      this.batch = this.projectMsg.actInfoList[0]?this.projectMsg.actInfoList[0]:batch
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
      this.selects = true;
    },
    //取消
    off() {
      this.add = false;
      this.selects = true;
    },

    //第二步
    addbtnes() {
      this.adds = !this.adds;
      this.addbtns = !this.addbtns;
    },

    nextTwo() {
      console.log(this.batch);
      console.log(this.pcNum);
      this.projectMsg.actInfoList[this.pcNum] = this.batch;
      console.log(this.projectMsg);
      this.two = false;
      this.three = true;
      this.current = 2;
    },
    //第三步

    //选择项目
    getCategoryId(val) {
      this.projectMsg.categoryId = val.categoryId;
      this.projectMsg.categoryName = val.name;
      console.log(this.projectMsg);
    },
    //获取日期
    getStartDate(e) {
      console.log(e);
      this.projectMsg.startT = e;
    },
    //获取日期
    getEndDate(e) {
      console.log(e);
      this.projectMsg.endT = e;
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
    getActiveTypeId(val) {
      this.batch.actTypeName = val.name;
      this.batch.actTypeId = val.dicId;
      this.getTemplate();
    },
    getTemplate() {
      chooseTempalte({actTypeDicId:this.batch.actTypeId}).then(res => {
        console.log(res);
        this.templateList = res.data;
      });
    },
    getTemplateDetail(e) {
      templateMsg({activityId:e.activityId}).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.batch = res.data;
          if (!this.batch.workerIdList) {
            this.batch.workerIdList = [{}];
          }
        }
      });
    },
    getAdr(){
      this.adr = !this.adr
    },
    //活动标签
    getActiveLabels(val) {
      this.batch.actLabelName = val.name;
      this.batch.actLabelId = val.dicId;
    },
    //活动日期
    getBatchStartDate(e) {
      this.batch.startT = e
    },
    //活动日期
    getBatchEndDate(e) {
      this.batch.endT = e
    },
    //出行方式
    tripMode(e) {
      if (e == "自驾" || e == "大巴") {
        this.tripSelf = false;
        this.batch.actVehicle = e;
      } else {
        this.tripSelf = true;
        this.batch.actVehicle = "";
      }
    },
    //现场负责人列表
    getLeaderList(e) {
      console.log(this.batch.ownerUserName);
      leader({
        name: this.batch.ownerUserName
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.addLeader = true;
          this.leaderList = res.data;
        }
      });
    },
    //工作人员列表
    getWorkerList(e, index) {
      console.log(e.ownerUserName);
      console.log(index);
      this.workerIndex = index;
      leader({
        name: e.ownerUserName
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.addWorker = true;
          this.workerList = res.data;
        }
      });
    },
    //现场负责人
    getLeader(val) {
      console.log(val);
      this.batch.ownerUserName = val.name;
      this.batch.ownerUserTel = val.tel;
      this.batch.ownerUserId = val.userId;
      this.addLeader = false;
    },
    //工作人员
    getWorker(val) {
      console.log(val);
      this.batch.workerIdList[this.workerIndex].ownerUserName = val.name;
      this.batch.workerIdList[this.workerIndex].ownerUserTel = val.tel;
      this.batch.workerIdList[this.workerIndex].ownerUserId = val.userId;
      this.addWorker = false;
    },
    //添加工作人员
    addWorkers() {
      let m = this.batch.workerIdList;
      if (m.length < 5) {
        m.push({});
        this.batch.workerIdList = m;
      } else {
        this.$Message.error("最多添加五个工作人员");
      }
    },
    //新增招募角色
    addRoles() {
      let r = {
        fdList: [{ name: '反馈简介', type: 0},{ name: '上传图片', type: 9, context: 2 }],
        actRefund: {},
        signRuleList: [],
        itemList: [],
        choiceRuleList: []
      };
      let n = this.batch.userConfList;
      this.roleI = n.length;
      this.oneRole = n[this.roleI] ? n[this.roleI] : r;
      this.isAddRole = true;
      this.two = false;
    },
    changeRoles(e) {
      this.roleI = e;
      this.oneRole = this.batch.userConfList[e];
      this.isAddRole = true;
      this.two = false;
    },
    //删除工作人员
    deleteWorker(i) {
      console.log(i);
      this.batch.workerIdList.splice(i, 1);
    },
    //删除招募角色
    deleteRole(i) {
      this.batch.userConfList.splice(i, 1);
      console.log(this.batch.userConfList);
    },
    cancelRole(e) {
      console.log(e);
      this.isAddRole = false;
      this.two = true;
    },
    getRole(e) {
      console.log(e);
      console.log(this.roleI);
      this.batch.userConfList[this.roleI] = e;
      if (this.roleI >= 0) {
        this.batch.userConfList[this.roleI] = e;
        delete this.roleI;
      } else {
        this.batch.userConfList.push(e);
      }
      this.isAddRole = false;
      this.two = true;
    },
    //新增物资
    addResources() {
      this.adds = true;
    },
    //增加物资
    chooseResource(e) {
      console.log(e);
      let m = this.batch.actResList;
      let n = {};
      let isAdd = true;
      if (m.length == 0) {
        n.resourcesName = e.name;
        n.resourcesId = e.resourcesId;
        n.isOk = 2;
        m.push(n);
      } else {
        for (let i = 0; i < m.length; i++) {
          if (m[i].resourcesName == e.name) {
            isAdd = false;
          }
        }
        if (isAdd) {
          n.resourcesName = e.name;
          n.resourcesId = e.resourcesId;
          n.isOk = 2;
          m.push(n);
        } else {
          this.$Message.error("已有该选项，请勿重复添加");
        }
      }
      this.adds = false;
      this.batch.actResList = m;
    },
    //删除物资
    deleteResources(i) {
      this.batch.actResList.splice(i, 1);
    },
    //发布时间
    releaseTime(e) {
      console.log(e);
      if (e == 1) {
        this.releaseTimeSelf = true;
      } else {
        this.releaseTimeSelf = false;
      }
      this.batch.releaseTime = e;
    },
    //自定义发布时间
    getReleaseTime(e) {
      console.log(e);
      this.batch.releaseTime = e;
    },
    addPc() {
      this.pcNum = this.projectMsg.actInfoList.length;
      let b = {
        userConfList: [],
        actResList: [],
        actShowPic: "",
        workerIdList: [{}]
      };
      this.batch = b;
      this.two = true;
      this.three = false;
      this.current = 1;
    },
    deletePc(e) {
      this.projectMsg.actInfoList.splice(e, 1);
    },
    changePc(e) {
      this.pcNum = e;
      this.batch = this.projectMsg.actInfoList[e];
      this.two = true;
      this.three = false;
      this.current = 1;
    },

    //提交
    submit() {
      console.log(this.projectMsg);
      this.projectMsg.userId = this.userId;
      this.projectMsg.is_draft = 2;
      projectApproval(this.projectMsg).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$Message.success(res.msg);
          this.$router.push({path: "manager"});
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    //提交
    draft() {
      console.log(this.projectMsg);
      this.projectMsg.userId = this.userId;
      this.projectMsg.is_draft = 1;
      projectApproval(this.projectMsg).then(res => {
        console.log(res);
      });
    },
    uploadFile() {
      let file = this.$refs.files.files[0];
      const dataForm = new FormData();
      dataForm.append("file", file);
      upload(dataForm).then(res => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          console.log(e);
          this.$set(this.projectMsg, "batchPicShow", e.target.result);
          this.$set(this.projectMsg, "batchPic", res.data);
        };
      });
    },
    cancelImg() {
      orgimgdel({ path: this.projectMsg.batchPic }).then(res => {
        this.projectMsg.batchPicShow = null;
        this.projectMsg.batchPic = null;
        this.$Message.success("删除成功");
      });
    },
    uploadPartnerFile() {
      let file = this.$refs.filepar.files[0];
      const dataForm = new FormData();
      dataForm.append("file", file);
      upload(dataForm).then(res => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          console.log(e);
          this.$set(this.partner, "partPicShow", e.target.result);
          this.$set(this.partner, "partPic", res.data);
        };
      });
    },
    cancelPartnerImg() {
      orgimgdel({ path: this.partner.partPic }).then(res => {
        this.partner.partPicShow = null;
        this.partner.partPic = null;
        this.$Message.success("删除成功");
      });
    },
    uploadActFmFile() {
      let file = this.$refs.filefm.files[0];
      const dataForm = new FormData();
      dataForm.append("file", file);
      upload(dataForm).then(res => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          console.log(e);
          this.$set(this.batch, "actCoverShowPic", e.target.result);
          this.$set(this.batch, "actCoverPic", res.data);
        };
      });
    },
    cancelActFmImg() {
      orgimgdel({ path: this.batch.actPic }).then(res => {
        this.batch.actCoverShowPic = null;
        this.batch.actCoverPic = null;
        this.$Message.success("删除成功");
      });
    },
    uploadActFile() {
      let file = this.$refs.filezt.files[0];
      const dataForm = new FormData();
      dataForm.append("file", file);
      upload(dataForm).then(res => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          console.log(e);
          this.$set(this.batch, "actShowPic", e.target.result);
          this.$set(this.batch, "actPic", res.data);
        };
      });
    },
    cancelActImg() {
      orgimgdel({ path: this.batch.actPic }).then(res => {
        this.batch.actShowPic = null;
        this.batch.actPic = null;
        this.$Message.success("删除成功");
      });
    },
    changeEditorTrain(e) {
      this.batch.detail = e;
    },
    getMap(e) {
      this.batch.actXx = e.xx;
      this.batch.actYy = e.yy;
      // this.batch.actAddress = e.address
      this.$set(this.batch, "actAddress", e.address);
      console.log(e);
    }
  }
};
</script>
<style lang="scss" scoped>
.lx-content {
  background-color: #fff;
}
.lx-cont{
  padding: 20px;
}
.first-li{
  display: flex;
  align-items: center;
  padding: 8px 0;
}
.first-span{
  margin-right: 10px;
}
.wave{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 8px;
  padding-left: 5px;
}
.first-pic{
  width: 300px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  border: 1px solid;
  position: relative;
}
.first-picfm{
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  border: 1px solid;
  position: relative;
}
.cancel{
  position: absolute;
  top: -82px;
  right: 8px;
}
.par-col{
  display: flex;
  align-items: center;
}
.ins{
  margin-top: 60px;
}
.ins-p{
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #1B2331;
  letter-spacing: 0;
  text-align: justify;
  line-height: 24px;
}
.ins-b{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #8E9192;
  letter-spacing: 0;
  text-align: justify;
  line-height: 24px;
  margin-top: 10px;
}
.lx-flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.lx-draft{
  background: #F6F7F9;
  border-radius: 15px;
  width: 110px;
  margin-right: 20px;
}
.lx-next{
  background: #FF565A;
  border-radius: 15px;
  color: #FFF;
  width: 110px;
}
.lx-submit{
  background: #00FF7F;
  border-radius: 15px;
  width: 110px;
}
.li-flex-around{
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0;
}
.li-flex-between{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}
.lx-resource{
  padding: 5px 0;
}
.lx-btn{
  margin-top: 20px;
}
.lx-jd{
  height: 80px;
  padding-top: 30px;
}
</style>
