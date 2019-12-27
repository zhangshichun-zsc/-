<!--编辑活动(会员)-->
<template>
  <div class="lx-content">
    <Modal v-model="adds" title="新增物资">
      <div class="wap">
         <Button v-for="(item,index) in batchItemList.resources" @click="chooseResource(item)" class="btn font" :key='index'>{{item.name}}</Button>
      </div>
      <div slot="footer"></div>
    </Modal>
    <adress :value="adr" @change="getMap" />
    <Navigation :labels="navigation1"></Navigation>
    <div class="lx-cont">
      <div v-if="two">
        <Row>
          <Col span="10">
            <ul>
              <li class="first-li">
                <span class="first-span">活动分类</span>
                <Select v-model="batch.actTypeName" style="width:300px">
                  <Option
                    v-for="item in batchItemList.actTypes"
                    :value="item.name"
                    :key="item.name"
                    @click.native="getActiveTypeId(item)"
                    >{{ item.name }}</Option
                  >
                </Select>
              </li>
              <li class="first-li">
                <span class="first-span">选择模板</span>
                <Select style="width:300px">
                  <Option
                    v-for="item in templateList"
                    :value="item.name"
                    :key="item.name"
                    @click.native="getTemplateDetail(item)"
                    >{{ item.name }}</Option
                  >
                </Select>
              </li>
              <li class="first-li">
                <span class="first-span">活动名称</span>
                <Input
                  placeholder="请输入活动名称"
                  v-model="batch.actName"
                  style="width:300px"
                />
              </li>
              <li class="first-li">
                <span class="first-span">封面图片</span>
                <div>
                  <div class="first-picfm" v-if="batch.actCoverShowPic == null">
                    <div
                      class=""
                      @click="
                        () => {
                          this.$refs.files.click();
                        }
                      "
                    >
                      <input
                        type="file"
                        accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP"
                        ref="files"
                        @change="uploadActFmFile()"
                        style="display:none"
                      />
                      <Icon type="md-cloud-upload" :size="36" color="#FF565A" />
                    </div>
                  </div>
                  <div class="first-picfm"  style="border:none" v-else>
                    <img
                      class="imgs"
                      style="width:200px;height:200px"
                      :src="batch.actCoverShowPic"
                    />
                    <Icon type="ios-trash" v-if='batch.actCoverShowPic' class="cancel" @click="cancelActFmImg()" color='#FF565A' size='26'/>
                  </div>
                </div>
              </li>
              <li class="first-li">
                <span class="first-span">主题图片</span>
                <div>
                  <div class="first-pic" v-if="batch.actShowPic == null">
                    <div
                      class=""
                      @click="
                        () => {
                          this.$refs.files.click();
                        }
                      "
                    >
                      <input
                        type="file"
                        accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP"
                        ref="files"
                        @change="uploadActFile()"
                        style="display:none"
                      />
                      <Icon type="md-cloud-upload" :size="36" color="#FF565A" />
                    </div>
                  </div>
                  <div class="first-pic"  style="border:none" v-else>
                    <img
                      class="imgs"
                      style="width:283px;height:188px"
                      :src="batch.actShowPic"
                    />
                    <Icon type="ios-trash" v-if='batch.actShowPic' class="cancel" @click="cancelActImg()" color='#FF565A' size='26'/>
                  </div>
                </div>
              </li>
            </ul>
          </Col>
          <Col span="12">
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
                      :options="options" 
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
                      :options="options" 
                    ></Date-picker>
                  </Col>
                </Row>
              </li>
              <li class="first-li">
                <span class="first-span">活动地址</span>
                <div style="flex:1">
                  <Button
                  @click="getAdr()"
                  lang
                  >{{
                      batch.actAddress == null ? "选择活动地址" : batch.actAddress
                  }}</Button>
                </div>
              </li>
              <li class="first-li">
                <span class="first-span">详细地址</span>
                <Input v-model="batch.addressSup" placeholder="请输入详细地址"></Input>
              </li>
              <li class="first-li">
                <span class="first-span">出行方式</span>
                <RadioGroup v-model="batch.actVehicle" @on-change="tripMode">
                  <Radio label="自驾">自驾</Radio>
                  <Radio label="大巴">大巴</Radio>
                  <Radio label="自定义" :true-value="tripSelf">自定义</Radio>
                </RadioGroup>
              </li>
              <li v-if="tripSelf">
                <Input
                  v-model="batch.actVehicle"
                  placeholder="请输入出行方式"
                />
              </li>
              <li class="li-flex-between">
                <span class="first-span">现场联系人</span>
                <div class="flex-center-start" style="flex:1">
                  <span class="tit">姓名</span>
                  <Input
                    v-model="batch.ownerUserName"
                    style="width: 150px"
                    class="same-staff"
                    @on-change="getLeaderList"
                  />
                  <span class="twoT">联系方式</span>
                  <Input
                    v-model="batch.ownerUserTel"
                    style="width: 150px"
                    class="same-staff"
                    disabled
                  />
                  <Select style="width:200px;margin-left:15px;" placeholder="请选择现场联系人" v-if="addLeader">
                    <Option
                      v-for="(item, idx) in leaderList"
                      :value="item.name"
                      :key="idx"
                      @click.native="getLeader(item)"
                      >{{ item.name }} {{ item.tel }}</Option
                    >
                  </Select>
                </div>
              </li>
              <li class="first-li start">
                <span class="first-span">工作人员</span>
                <div>
                  <div class="flex-center-center"><Button @click="addWorkers" class="font">添加</Button></div>
                  <div v-for="(item, index) in batch.workerIdList" :key="index" class="li-flex-around">
                    <span class="tit">姓名</span>
                    <Input
                      v-model="item.ownerUserName"
                      class="same-staff lw"
                      @on-change="getWorkerList(item, index)"
                    />
                    <span class="twoT">联系方式</span>
                    <Input
                      v-model="item.ownerUserTel"
                      class="same-staff lw"
                      disabled
                    />
                     <Icon type="ios-trash"   @click="deleteWorker(index)" style="margin-left:15px;" color='#FF565A' size='28'/>
                  </div>
                  <div v-if="addWorker">
                    <Select class="lw" placeholder="请选择工作人员">
                      <Option
                        v-for="(i, idx) in workerList"
                        :value="i.name"
                        :key="idx"
                        @click.native="getWorker(i)"
                        >{{ i.name }} {{ i.tel }}</Option
                      >
                    </Select>
                  </div>
                </div>
              </li>
              <li class="first-li">
                <span class="first-span">活动标签</span>
                <Select
                  v-model="batch.actLabelName"
                  style="width:300px"
                  placeholder="请选择活动标签"
                >
                  <Option
                    v-for="item in batchItemList.labels"
                    :value="item.name"
                    :key="item.name"
                    @click.native="getActiveLabels(item)"
                    >{{ item.name }}</Option
                  >
                </Select>
              </li>
              <li class="first-li start">
                <span class="first-span">招募角色</span>
                <div>
                  <div class="flex-center-center"><Button @click="addRoles()" class="font">+新增招募角色</Button></div>
                  <div>
                    <p v-for="(item,i) in batch.userConfList" class="li-flex-around lx-resource" :key='i'>
                      <span>{{item.roleName}}</span>
                      <span>{{item.recruitNum}}</span>
                      <Button @click="changeRoles(i)" class="font">详情</Button>
                      <Icon type="ios-trash"   @click="deleteRole(i)" color='#FF565A' size='28'/>
                    </p>
                  </div>
                </div>
              </li>
               <li class="first-li start">
                <span class="first-span">所需物资</span>
                <div>
                  <div class="flex-center-center"><Button @click="addResources" style="marginBottom:20px" class="font">+新增物资</Button></div>
                  <div>
                    <p v-for="(item,i) in batch.actResList" class="li-flex-around lx-resource" :key='i'>
                      <span>{{item.resourcesName}}</span>
                      <Input v-model="item.num" style="width: 200px" placeholder="请输入数量"  class="twoT"></Input>
                      <span>
                        <Checkbox v-model="item.isOk" :true-value='1'>已筹</Checkbox>
                        <Icon type="ios-trash"  @click="deleteResources(i)" color='#FF565A' size='28'/>
                      </span>
                    </p>
                  </div>
                </div>
              </li>
              <li class="first-li">
                <span class="first-span">发布时间</span>
                <RadioGroup
                  v-model="batch.releaseTime"
                  @on-change="releaseTime"
                >
                  <Radio label="0">活动开始前一个月自动发布</Radio>
                  <Radio label="1" :true-value="releaseTimeSelf">自定义</Radio>
                </RadioGroup>
                <Date-picker
                  :value="batch.releaseTime"
                  v-if="releaseTimeSelf"
                  type="datetime"
                  :editable="false"
                  format="yyyy-MM-dd HH:mm"
                  placeholder="选择日期"
                  style="width: 200px"
                  @on-change="getReleaseTime"
                  :options="options" 
                ></Date-picker>
              </li>
            </ul>
          </Col>
        </Row>
        <Row style="margin-top:40px">
          <Col style="margin-bottom:10px;">活动详情</Col>
          <Col>
            <wangeditor
              :labels="batch.detail"
              id="ed1"
              @change="changeEditorTrain"
            ></wangeditor>
          </Col>
        </Row>
      </div>

      <div class="" v-if="isAddRole">
        <role
          :oneRoles="oneRole"
          @cancelEdit="cancelRole"
          @oneRole="getRole"
        ></role>
      </div>

      <div v-if="two" class="lx-flex-center" style="margin-top:80px;">
        <Button v-if="showZf" @click="zf" shape="circle" size='large' class="btn">作废</Button>
        <Button @click="save()" shape="circle" size='large' class="btn">保存</Button>
      </div>

      <Modal v-model="isZf" title="作废模板" @on-ok='sureZf'>
        <div>是否确定作废该活动模板</div>
      </Modal>

    </div>
  </div>
</template>

<script>
import E from "wangeditor";
import {
  batchItem,
  leader,
  projectDetail,
  projectEdit,
  chooseTempalte,
  orgimgdel,
  zfmb
} from "@/request/api";
import { projectApproval } from "../../request/api";
import role from "./compile_beneficiary.vue";
import adress from "_c/map";
import { orgimg } from "@/request/http";
import { upload } from "@/request/http";
export default {
  name: "editor",
  data() {
    return {
      adr: false,
      two: true,
      batch: {
        userConfList: [],
        actResList: [],
        workerIdList: [{}]
      },
      batchItemList: [],
      editorContent1: "",
      navigation1: {
        head: "编辑活动"
      },
      model1: "basketball",
      animal: "daba",
      value: "",
      single: "",
      adds: false,
      addbtns: true,
      tripSelf: false,
      addLeader: false,
      addWorker: false,
      releaseTimeSelf: false,
      isAddRole: false,
      editor1: "",
      templateList: [],
      options: {
        disabledDate (date) {
          return  date && date.valueOf() < Date.now() - 86400000
        }
      },
      showZf:false,
      isZf:false
    };
  },

  components: { role, adress },

  computed: {},

  created() {
    console.log(this.$route.query)
    this.userId = this.$store.state.userId;
    this.getBatchItem();
    if(this.$route.query.dicId){
      console.log(this.batch)
      this.batch.actTypeName = this.$route.query.name
      this.batch.actTypeId = this.$route.query.dicId
      this.getTemplate();
    }else if(this.$route.query.id){
      this.getProjectDetail();
    }
    if(this.$route.query.ble===1){
      this.showZf = true
    }
  },

  mounted() {
    // var editor1 = new E('.editorElem1');
    // editor1.customConfig.onchange = (html) => {
    //   this.editorContent1 = html
    // };
    // editor1.create()
  },
  methods: {
    changeEditorTrain(e) {
      this.batch.detail = e;
    },
    getTemplate() {
      chooseTempalte(this.batch.actTypeId).then(res => {
        console.log(res);
        this.templateList = res.data;
      });
    },
    //活动日期
    getBatchStartDate(e) {
      this.batch.startT = e;
    },
    getBatchEndDate(e) {
      this.batch.endT = e;
    },
    getAdr(){
      this.adr = !this.adr
    },
    getMap(e) {
      console.log(e);
      this.batch.actXx = e.xx;
      this.batch.actYy = e.yy;
      this.batch.provinceName = e.province;
      this.batch.cityName = e.city;
      this.batch.districtName = e.district;
      this.$set(this.batch, "actAddress", e.address);
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
    getProjectDetail() {
      projectDetail({
        activityId: this.$route.query.id
      }).then(res => {
        console.log(res);
        this.batch = res.data;
      });
    },
    save() {
      this.batch.type = 2;
      projectEdit(this.batch).then(res => {
        console.log(res);
      });
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
      this.$router.push({ name: "compile_beneficiary" });
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
    getTemplateDetail(e) {
      templateMsg(e.activityId).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.batch = res.data;
          if (!this.batch.workerIdList) {
            this.batch.workerIdList = [{}];
          }
        }
      });
    },
    uploadActFmFile() {
      let file = this.$refs.files.files[0];
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
      let file = this.$refs.files.files[0];
      const dataForm = new FormData();
      dataForm.append("file", file);
      upload(dataForm).then(res => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          console.log(e);
          this.batch.actShowPic = e.target.result;
          this.batch.actPic = res.data;
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
    //活动分类
    getActiveTypeId(val) {
      this.batch.actTypeName = val.name;
      this.batch.actTypeId = val.dicId;
      this.getTemplate();
    },
    //活动标签
    getActiveLabels(val) {
      this.batch.actLabelName = val.name;
      this.batch.actLabelId = val.dicId;
    },
    //活动日期
    getBatchDate(e) {
      this.batch.startT = e[0];
      this.batch.endT = e[1];
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
      this.addLeader = false;
    },
    //工作人员
    getWorker(val) {
      console.log(val);
      this.batch.workerIdList[this.workerIndex].ownerUserName = val.name;
      this.batch.workerIdList[this.workerIndex].ownerUserTel = val.tel;
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
        fkDetailList: [{ name: "反馈简介", type: 0 }],
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
    zf(){
      this.isZf = true
    },
    sureZf(){
      zfmb({
        actMouldId:this.$route.query.actMouldId,
        type:0
      }).then(res=>{
        this.$Message.info(res.msg)
        if(res.code==200){
          this.$router.back()
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.btn{
  margin-left: 20px;
  background: #FF565A !important;
  color: #fff !important;
  border-color:#FF565A !important;
}
.font{
  font-size: 16px;
}
.start{
   align-items: flex-start !important;
}
.btn{
  margin-right: 10px !important;
  margin-bottom: 10px !important;
}
.tit{
  margin-right: 15px;
}
.twoT{
  margin: 0 15px;
}
.lx-content {
  background-color: #fff;
}
.lx-cont {
  padding: 20px;
}
.first-li {
  display: flex;
  align-items: center;
  padding: 12px 0;
  .ivu-radio-wrapper{
    font-size: 16px !important;
  }
}
.first-span {
  width: 120px;
  margin-right: 30px;
}
.wave {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 8px;
  padding-left: 5px;
}
.first-pic {
  width: 300px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  border: 1px solid;
  position: relative;
  border: 1px dashed #FF565A;
}
.first-picfm {
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  border: 1px solid;
  position: relative;
  border: 1px dashed #FF565A;
}
.cancel {
  position: absolute;
  top: 0;
  right: -30px;
}
.par-col {
  display: flex;
  align-items: center;
}
.ins {
  margin-top: 60px;
}
.ins-p {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #1b2331;
  letter-spacing: 0;
  text-align: justify;
  line-height: 24px;
}
.ins-b {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #8e9192;
  letter-spacing: 0;
  text-align: justify;
  line-height: 24px;
  margin-top: 10px;
}
.lx-flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.lx-draft {
  background: #f6f7f9;
  border-radius: 15px;
  width: 110px;
  margin-right: 20px;
}
.lx-next {
  background: #ff565a;
  border-radius: 15px;
  color: #fff;
  width: 110px;
}
.lx-submit {
  background: #00ff7f;
  border-radius: 15px;
  width: 110px;
}
.li-flex-around {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0;
}
.li-flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}
.lx-resource {
  padding: 5px 0;
}
.lx-btn {
  margin-top: 20px;
}
.lx-jd {
  height: 80px;
  padding-top: 30px;
}
.lw{
  width: 200px;
}
</style>
