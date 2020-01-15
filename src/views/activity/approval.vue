<!--活动立项(会员)-->
<template>
  <div class="lx-content">
     <Modal v-model="adds" title="新增物资">
      <div class="wap">
         <Button v-for="(item,index) in batchItemList.resources" @click="chooseResource(item)" class="btn font" :key='index'>{{item.name}}</Button>
      </div>
      <div slot="footer"></div>
    </Modal>
    <Modal v-model="rule" title="融爱融乐之家活动发布规则" width='500' scrollable>
      <div class="textp">
        <p>欢迎您使用“融爱融乐之家”系统（以下简称“本系统”）及服务！</p>
        <p>活动发布规则（以下简称“规则”）系家长小组或其他在本系统成功注册的会员就本系统活动发布规则的说明。</p>
        <p>本规则为《会员系统用户协议》的组成部分，与《会员系统用户协议》具有同等的法律效力。</p>
        <p>除非您已阅读并接受本规则及融爱融乐的相关协议、规则等所有条款，否则您无权使用活动信息发布功能。您使用活动信息发布功能，即视为您已阅读并同意上述协议、规则等的约束。</p>
        <p>1.本说明下的活动发布规则主要指融爱融乐的工作人员或者家长小组在本系统发布融合活动所应遵守的内容和条款。</p>
        <p>2.家长小组是由心智障碍家庭家长自发组成的互助小组。小组旨在通过培养核心家长，发挥家长的组织领导和社会倡导力，成为行动者，以此改善社区及社会对心智障碍人士的认知。</p>
        <p>3.您必须是成功在本系统成功注册的家长小组或其他系统授予发布活动权限的会员。您需要按活动立项页面的引导填写信息，包括但不限于立项名称、立项目的、小组归属、招募类型、活动申请预算、有效期限，阅读并同意《活动发布规则》且完成全部立项程序，经本系统审核通过后方能发布信息。</p>
        <p>4.审核的时间通常为5个工作日。但本系统有权根据特殊情况对审核时间进行调整。</p>
        <p>5.您特此保证，您发布的任何信息，不存在以下任何一种违反法律法规规定的情形：</p>
        <p>(1)反对宪法所确定的基本原则；</p>
        <p>(2)危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一；</p>
        <p>(3)损害国家荣誉和利益；</p>
        <p>(4)煽动民族仇恨、民族歧视、破坏民族团结；</p>
        <p>(5)破坏国家宗教政策，宣扬邪教和封建迷信；</p>
        <p>(6)散布谣言，扰乱社会秩序，破坏社会稳定；</p>
        <p>(7)宣扬淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪；</p>
        <p>(8)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序；</p>
        <p>(9)诽谤他人，泄露他人隐私，侵害他人合法权益；</p>
        <p>(10)含有法律、行政法规、政策禁止的其他内容的信息。</p>
        <p>6.您特此保证，您发布的任何信息，不存在以下任一不友善的行为：</p>
        <p>(1)捏造、散布虚假事实，损害他人名誉；</p>
        <p>(2)以不友好的方式激怒他人，意图使对方对自己的言论作出回应，蓄意制造事端；</p>
        <p>(3)贬低他人的能力、行为、生理或身份特征，让对方难堪；</p>
        <p>(4)以不文明的语言对他人进行负面评价；</p>
        <p>(5)针对他人的民族、种族、宗教、性取向、性别、年龄、地域、生理特征等身份或者归类的攻击；</p>
        <p>(6)许诺以不良的后果来迫使他人服从自己的意志。</p>
        <p>(7.您特此保证，您发布的任何信息，不存在以下任一侵犯第三方权益的情形：</p>
        <p>(1)任何侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容；</p>
        <p>(2)任何涉及他人隐私、个人信息或资料的内容；</p>
        <p>(3)任何混淆行为，擅自使用包括但不限于社会组织名称（包括简称等）、企业名称（包括简称、字号等）、姓名（保留笔名、艺名、译名等）、域名主体部分、网站名称、网页等引人误认为是他人单位与他人存在特定联系的内容。</p>
        <p>(8.您在发布信息时还应遵守以下条款：</p>
        <p>(1)保证不发布与本平台志愿服务目的无关之信息；</p>
        <p>(2)保证所发布的全部信息均为真实、有效的，没有任何虚假信息；</p>
        <p>(3)保证不违反任何与您发布的信息相关的、与任何第三方（包括但不限于与投资者）之间的约定或承诺；</p>
        <p>(4)保证不违反您所在机构或公司的规章制度。</p>
        <p>9.您理解并同意，本系统仅为网络服务提供者，为您提供的是信息分享、传播及获取的平台，您必须为自己注册账户下的一切行为负责，包括您所发布的任何内容、活动及由此产生的任何后果。</p>
        <p>10.您理解并同意，若您出现任何违反本规则及《会员服务协议》的行为的，本系统有权自行删除您发布的全部信息，无需另行事先通知，并有权采取冻结账户，要求您赔偿损失等措施。</p>
        <p>11.本系统有权随时根据法律、法规的变化以及融爱融乐经营策略的调整等修改本规则。修改后的规则将会通过适当的方式将进行公示。如您在本规则后修订后仍继续使用本系统的，则视为您接收本规则的修订。</p>
      </div>
    </Modal>
    <adress :value="adr" @change="getMap" />
    <Navigation :labels="navigation1"></Navigation>
    <div class="lx-cont">
      <p class>
        <span class="first-span">新增活动立项</span>
        <Button class @click="set" disabled>设置常用报名项</Button>
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
                <Input v-model="projectMsg.budget" type="number" placeholder="请输入活动预算金额" style="width: 300px"></Input>
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
                      :options="options" 
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
                      :options="options" 
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
                  <div class="first-pic" v-if='!projectMsg.batchPicShow'>
                      <div class="" @click="()=>{ this.$refs.files.click()}">
                        <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="files" @change="uploadFile()" style="display:none" >
                        <Icon type="md-cloud-upload" :size='36' color="#FF565A"/>
                      </div>
                  </div>
                  <div class="first-pic" style="border:none" v-else>
                    <img class="imgs" style="width:283px;height:188px" :src="projectMsg.batchPicShow"/>
                    <Icon type="ios-trash" class="cancel" @click="cancelImg()" color='#FF565A' size='26'/>
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
                  <Radio :label="2">批次招募</Radio>
                  <Radio :label="1" disabled>整体招募</Radio>
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
                  <div class="first-picfm" v-if='!batch.actCoverShowPic'>
                    <div class="" @click="()=>{ this.$refs.filefm.click()}">
                      <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="filefm" @change="uploadActFmFile()" style="display:none" >
                      <Icon type="md-cloud-upload" :size='36' color="#FF565A"/>
                    </div>
                  </div>
                  <div class="first-picfm" style="border:none" v-else>
                    <img style="width:100%;height:100%" :src="batch.actCoverShowPic"/>
                    <Icon type="ios-trash" class="cancel" @click="cancelActFmImg()" color='#FF565A' size='26'/>
                  </div>
                </div>
              </li>
              <li class="first-li">
                <span class="first-span">主题图片</span>
                <div>
                  <div class="first-pic" v-if='!batch.actShowPic'>
                    <div class="" @click="()=>{ this.$refs.filezt.click()}">
                      <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="filezt" @change="uploadActFile()" style="display:none" >
                      <Icon type="md-cloud-upload" :size='36' color="#FF565A"/>
                    </div>
                  </div>
                  <div class="first-pic" style="border:none" v-else>
                    <img style="width:100%;height:100%" :src="batch.actShowPic"/>
                    <Icon type="ios-trash" class="cancel" @click="cancelActImg()" color='#FF565A' size='26'/>
                  </div>
                </div>
              </li>
            </ul>
          </Col>
          <Col span='14'>
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
                      style="width: 200px"
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
                      style="width: 200px"
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
                   <Button @click="getAdr()">{{ batch.actAddress == null?"选择活动地址":batch.actAddress}}</Button>
                </div>
              </li>
              <li class="first-li">
                <span class="first-span">详细地址</span>
                <Input v-model="batch.addressSup" placeholder="请输入详细地址" style="width:300px;"></Input>
              </li>
              <li class="first-li">
                <span class="first-span">出行方式</span>
                <RadioGroup v-model="batch.vehicleCode" @on-change='tripMode'>
                  <Radio label="1">自驾</Radio>
                  <Radio label="2">大巴</Radio>
                  <Radio label="3">自定义</Radio>
                </RadioGroup>
              </li>
              <li v-if="batch.vehicleCode=='3'">
                <Input v-model="batch.actVehicle" placeholder="请输入出行方式"></Input>
              </li>
              <li class="first-li">
                <span class="first-span">现场负责人</span>
                <div class="flex-center-start" style="flex:1">
                  <span class="tit">姓名</span>
                  <Input v-model="batch.ownerUserName" style="width: 150px" class="same-staff" @on-change='getLeaderList' placeholder="输入姓名"></Input>
                  <span class="twoT">联系方式</span>
                  <Input v-model="batch.ownerUserTel" style="width: 150px" class="same-staff" disabled></Input>
                  <Select style="width:200px;margin-left:15px;" placeholder="请选择现场负责人" v-if='addLeader'>
                    <Option
                      v-for="(item,idx) in leaderList"
                      :value="item.name"
                      :key="idx"
                      @click.native="getLeader(item)"
                    >{{ item.name }} {{item.tel}}</Option>
                  </Select>
                </div>
              </li>
              <li class="first-li start">
                <span class="first-span">工作人员</span>
                <div>
                  <div><Button @click="addWorkers" class="font">添加</Button></div>
                  <div v-for="(item,index) in batch.workerIdList" class="li-flex-around" :key='index'>
                    <span class="tit">姓名</span>
                    <Input v-model="item.ownerUserName" style="width:150px" class="same-staff" @on-change='getWorkerList(item,index)' placeholder="输入姓名"></Input>
                    <span class="twoT">联系方式</span>
                    <Input v-model="item.ownerUserTel" style="width:150px" class="same-staff" disabled></Input>
                     <Icon type="ios-trash"   @click="deleteWorker(index)" style="margin-left:15px;" color='#FF565A' size='28'/>
                  </div>
                  <div v-if='addWorker'>
                    <Select style="width:300px" placeholder="请选择工作人员">
                      <Option
                        v-for="(i,idx) in workerList"
                        :value="i.name"
                        :key="idx"
                        @click.native="getWorker(i)"
                      >{{ i.name }} {{i.tel}}</Option>
                    </Select>
                  </div>
                </div>
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
              <li class="first-li start">
                <span class="first-span">招募角色</span>
                <div style="flex:1">
                  <div class="flex-center-center"><Button @click="addRoles()" class="font">+新增招募角色</Button></div>
                  <div>
                    <Row type="flex" justify="space-between" v-for="(item,i) in batch.userConfList" class-name="li-flex-around lx-resource" :key='i'>
                      <i-col span='5'>{{item.roleName}}</i-col>
                      <i-col span='3'>{{item.recruitNum}}</i-col>
                      <i-col span='5'><Button @click="changeRoles(i)" class="font">详情</Button></i-col>
                      <i-col span='3'><Icon type="ios-trash"   @click="deleteRole(i)" color='#FF565A' size='28'/></i-col>
                    </Row>
                  </div>
                </div>
              </li>
              <li class="first-li start">
                <span class="first-span">所需物资</span>
                <div  style="flex:1">
                  <div class="flex-center-center"><Button @click="addResources" style="marginBottom:20px"    class="font">+新增物资</Button></div>
                  <div>
                    <Row v-for="(item,i) in batch.actResList" class-name="li-flex-around lx-resource" :key='i' type="flex" justify="space-between">
                      <i-col span='4'>{{item.resourcesName}}</i-col>
                      <i-col span='8'>
                        <Input v-model="item.num" placeholder="请输入数量"  class="twoT"></Input>
                      </i-col>
                      <i-col span='4'>
                        <Checkbox v-model="item.isOk" :true-value='1'>已筹</Checkbox>
                        <Icon type="ios-trash"  @click="deleteResources(i)" color='#FF565A' size='28'/>
                      </i-col>
                    </Row>
                  </div>
                </div>
              </li>
              <li class="first-li">
                <span class="first-span">发布时间</span>
                <RadioGroup v-model="batch.releaseTime" @on-change='releaseTime'>
                  <Radio label="0">活动开始前一个月自动发布</Radio>
                  <Radio label="1" :trueValue='releaseTimeSelf'>自定义</Radio>
                </RadioGroup>
                <Date-picker :value="batch.releaseTime" :options="options" v-if='releaseTimeSelf' type="datetime" :editable="false" format="yyyy-MM-dd HH:mm" placeholder="选择日期" style="width: 200px" @on-change="getReleaseTime"></Date-picker>
              </li>
            </ul>
          </Col>
        </Row>
        <Row style="margin-top:40px">
          <Col style="margin-bottom:10px;"><span>活动详情</span></Col>
          <Col span='12'>
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
                <Input v-model="projectMsg.budget" type="number" placeholder="请输入活动预算金额" style="width: 300px"></Input>
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
                      :options="options" 
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
                      :options="options" 
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
                  <div class="first-pic" v-if='!projectMsg.batchPicShow'>
                      <div class="" @click="()=>{ this.$refs.files.click()}">
                        <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="files" @change="uploadFile()" style="display:none" >
                        <Icon type="md-cloud-upload" :size='36' color="#FF565A"/>
                      </div>
                  </div>
                  <div class="first-pic" v-else>
                    <img class="imgs" style="width:283px;height:188px" :src="projectMsg.batchPicShow"/>
                    <Icon type="ios-trash" class="cancel" @click="cancelImg()" color='#FF565A' size='26'/>
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
                  <Radio :label="2">批次招募</Radio>
                  <Radio :label="1" disabled>整体招募</Radio>
                </RadioGroup>
              </li>
            </ul>
          </Col>
          <Col span="10">
            <div class="active-head">
              <span>活动立项批次</span>
            </div>
            <div class="first-li" style="width:100%" v-for="(item,i) in projectMsg.actInfoList" :key='i'>
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
                  <Button @click.native="changePc(i)" class="font">修改</Button>
                  <Button @click.native="deletePc(i)" class="font">删除</Button>
                </li>
              </ul>
            </div>
            <div class="lx-flex-center">
              <Button @click="addBatch" class="font">新增批次</Button>
            </div>
          </Col>
        </Row>
      </div>

      <div v-if="selects" class="lx-flex-center lx-btn">
        <Button class="lx-draft" @click="draft" :disabled='disSubmit'>存为草稿</Button>
        <Button class="lx-next" @click.native="nextOne()" :disabled='disSubmit'>下一步</Button>
      </div>

      <div v-if="two" class="lx-flex-center lx-btn">
        <Button class="lx-draft" @click="draft" :disabled='disSubmit'>存为草稿</Button>
        <Button class="lx-next" @click.native="nextTwo()" :disabled='disSubmit'>下一步</Button>
      </div>

      <div v-if="three" class="lx-flex-center lx-btn">
        <Checkbox v-model="isAgree">我同意</Checkbox><a @click="rule = true">《活动发布规则》</a>
      </div>

      <div v-if="three" class="lx-flex-center lx-btn">
        <Button class="lx-draft" @click="draft" :disabled='disSubmit'>存为草稿</Button>
        <Button class="lx-submit" @click.native="submit()" :disabled='disSubmit'>提交审核</Button>
      </div>

      <!-- 弹出框 -->
      <div class="" v-if="add" style="padding:20px 0">
        <p class="" style="padding:10px 0">设置活动合作方</p>
        <div class="">
          <ul>
            <li class="first-li">
              <span class="first-span">合作方</span>
              <Input v-model="partner.partName" placeholder="请输入合作方名称" style="width: 300px;"></Input>
            </li>
            <li class="first-li">
              <span class="first-span">介绍</span>
              <Input type="textarea" v-model="partner.description" placeholder="请输入合作方介绍" style="width: 300px;" :rows='5'></Input>
            </li>
            <li class="first-li">
                <span class="first-span">图片</span>
                <div>
                  <div class="first-pic" v-if='!partner.partPicShow'>
                      <div class="" @click="()=>{ this.$refs.filepar.click()}">
                        <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="filepar" @change="uploadPartnerFile()" style="display:none" >
                        <Icon type="md-cloud-upload" :size='36' color="#FF565A"/>
                      </div>
                  </div>
                  <div class="first-pic" v-else>
                    <img class="imgs" style="width:283px;height:188px" :src="partner.partPicShow"/>
                    <Icon type="ios-trash" class="cancel" @click="cancelPartnerImg()" color='#FF565A' size='26'/>
                  </div>
                </div>
              </li>
            <li>
              <p style="padding:10px 0">协议</p>
              <div>
                <ul v-for="(item,index) in partner.agrees" :key='index'>
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
                    <Input v-model="item.partA" placeholder="请输入甲方名称" style="width: 300px;"></Input>
                  </li>
                  <li class="first-li">
                    <span class="first-span">乙方</span>
                    <Input v-model="item.partB" placeholder="请输入乙方名称" style="width: 300px;"></Input>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <p class="add-deal">
          <Button @click="addAgrees" class="font" style="margin-left:200px">+新增协议</Button>
        </p>
        <!-- <div class="upload">
          <span>上传附件</span>
        </div> -->
        <div class="lx-flex-center" style="width:80%">
          <div class="li-flex-around" style="width:40%">
            <Button class="lx-draft" @click="off()">取消</Button>
            <Button class="lx-submit" @click="save()">保存</Button>
          </div>
        </div>
      </div>
      <div class="" v-if="isAddRole">
        <role :oneRoles="oneRole" @cancelEdit="cancelRole" @oneRoleMsg='getRole'></role>
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
import { upload,uploadCopy } from "@/request/http";

export default {
  data() {
    return {
      disSubmit:false,
      projectMsg: {
        partnerList: [],
        actInfoList: []
      },
      rule:false,
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
      itemsList: {
        org:{
          propagandaTitle:'',
          propagandaText:'',
        }
      },
      part: [],
      batchItemList: [],
      navigation1: {
        head: "活动立项"
      },
      current: 0,
      add: false,
      selects: true,
      two: false,
      three: false,
      adds: false,
      addbtns: true,
      addLeader: false,
      addWorker: false,
      releaseTimeSelf: false,
      isAddRole: false,
      userId: 1,
      oneRole: {},
      roleMsg: {
        fkDetailList: [{ name: '反馈简介', type: 0},{ name: '上传图片', type: 9, context: 2 }],
        refund: {},
        signRuleList: [],
        itemList: [],
        choiceRuleList: []
      },
      roleI: 0, //招募角色下标
      adr: false,
      pcNum: 0,
      templateList: [],
      options: {
        disabledDate (date) {
          return  date && date.valueOf() < Date.now() - 86400000
        }
      },
      isAgree:false
    };
  },

  components: { role, adress },

  computed: {},

  created() {
    this.userId = this.$store.state.userId;
    if(this.$route.query.batchId){
      if (this.$route.query.copy !== 1){
        this.batchId= this.$route.query.batchId
      }
      this.getDraftsDetail(this.$route.query.batchId)
    }
    this.getProjectItem();
    this.getPartner();
    this.getBatchItem();
  },
  mounted() {

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
      if (e == "1") {
        this.batch.actVehicle = "自驾"
      }else if(e == "2"){
        this.batch.actVehicle = "自驾"
      }else {
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
        fkDetailList: [{ name: '反馈简介', type: 0},{ name: '上传图片', type: 9, context: 2 }],
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
    deepClone(obj){
      let _obj = JSON.stringify(obj),
      objClone = JSON.parse(_obj);
      return objClone
    },  
    addBatch(){
      let p = this.deepClone(this.projectMsg)
      this.pcNum = p.actInfoList.length
      this.batch = p.actInfoList[p.actInfoList.length-1]
      delete this.batch.startT
      delete this.batch.endT
      delete this.batch.releaseTime
      this.uploadActFmFilefz(this.batch.actCoverPic)
      this.uploadActFilefz(this.batch.actPic)
      for(let oi in this.batch.userConfList){
        delete this.batch.userConfList[oi].enrollStarttime
        delete this.batch.userConfList[oi].enrollEndtime
        delete this.batch.userConfList[oi].outrollStarttime
        delete this.batch.userConfList[oi].outrollEndtime
        delete this.batch.userConfList[oi].setTime
        delete this.batch.userConfList[oi].qrCodeShow
        delete this.batch.userConfList[oi].qrCode
      }
      this.two = true;
      this.three = false;
      this.current = 1;
      console.log(this.projectMsg.actInfoList)
    },

    //提交
    submit() {
      this.disSubmit = true
      console.log(this.projectMsg);
      if(this.isAgree){
        this.projectMsg.userId = this.userId;
        this.projectMsg.is_draft = 2;
        if (this.$route.query.copy === 1){
          this.projectMsg.batchId = ''
          delete this.projectMsg.batchId
        }
        projectApproval({
          actInfoList: this.projectMsg.actInfoList,
          batchName: this.projectMsg.batchName,
          batchId:this.projectMsg.batchId,
          batchObjective: this.projectMsg.batchObjective,
          batchPic: this.projectMsg.batchPic,
          budget: this.projectMsg.budget,
          categoryId: this.projectMsg.categoryId,
          categoryName: this.projectMsg.categoryName,
          channel: 1,
          endT: this.projectMsg.endT,
          is_draft: this.projectMsg.is_draft,
          orgId: this.projectMsg.orgId,
          orgName: this.projectMsg.orgName,
          orgType: this.projectMsg.orgType,
          partnerList: this.projectMsg.partnerList,
          recruitType: this.projectMsg.recruitType,
          startT: this.projectMsg.startT,
          userId: this.projectMsg.userId
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$Message.success(res.msg);
            this.$router.back()
            this.disSubmit = false
          } else {
            this.$Message.error(res.msg);
            this.disSubmit = false
          }
        });
      }else{
        this.$Message.warning('请先同意活动发布规则')
        this.disSubmit = false
      }
    },
    //提交
    draft() {
      this.disSubmit = true
      console.log(this.projectMsg);
      this.projectMsg.userId = this.userId;
      this.projectMsg.is_draft = 1;
      if (this.$route.query.copy === 1){
        this.projectMsg.batchId = ''
        delete this.projectMsg.batchId
      }
      projectApproval({
        actInfoList: this.projectMsg.actInfoList,
        batchName: this.projectMsg.batchName,
        batchId:this.projectMsg.batchId,
        batchObjective: this.projectMsg.batchObjective,
        batchPic: this.projectMsg.batchPic,
        budget: this.projectMsg.budget,
        categoryId: this.projectMsg.categoryId,
        categoryName: this.projectMsg.categoryName,
        channel: 1,
        endT: this.projectMsg.endT,
        is_draft: this.projectMsg.is_draft,
        orgId: this.projectMsg.orgId,
        orgName: this.projectMsg.orgName,
        orgType: this.projectMsg.orgType,
        partnerList: this.projectMsg.partnerList,
        recruitType: this.projectMsg.recruitType,
        startT: this.projectMsg.startT,
        userId: this.projectMsg.userId
      }).then(res => {
        if (res.code == 200) {
          this.$Message.success(res.msg);
          this.$router.back()
          this.disSubmit = false
        } else {
          this.$Message.error(res.msg);
          this.disSubmit = false
        }
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
    uploadActFmFilefz(path) {
      uploadCopy({path:path}).then(res => {
        this.$set(this.batch, "actCoverShowPic", res.data.relPath);
        this.$set(this.batch, "actCoverPic", res.data.path);
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
    uploadActFilefz(path) {
      uploadCopy({path:path}).then(res => {
        this.$set(this.batch, "actShowPic", res.data.relPath);
        this.$set(this.batch, "actPic", res.data.path);
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
      console.log(e);
      this.batch.actXx = e.xx;
      this.batch.actYy = e.yy;
      this.batch.provinceName = e.province;
      this.batch.cityName = e.city;
      this.batch.districtName = e.district;
      this.$set(this.batch, "actAddress", e.address);
    }
  }
};
</script>
<style lang="scss" scoped>
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
 
}
.lx-cont{
  padding: 30px;
  background-color: #fff;
  border-radius: 20px;
}
.first-li{
  display: flex;
  align-items: center;
  padding: 12px 0;
  .ivu-radio-wrapper{
    font-size: 16px !important;
  }
}
.first-span{
  width: 120px !important;
  margin-right: 30px;
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
  border: 1px dashed #FF565A;
  position: relative;
  cursor: pointer;
}
.first-picfm{
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  border: 1px dashed #FF565A;
  position: relative;
  cursor: pointer;
}
.cancel{
  position: absolute;
  top: 0;
  right: -30px;
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
  border-color: #FF565A;
  color: #FFF;
  width: 110px;
}
.lx-submit{
  background: #FF565A;
  border-radius: 15px;
  width: 110px;
  color: #fff;
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
.padd{
  padding-left: 150px;
}
.textp p{
  text-indent: 10px;
}
.textp {
  height:500px;
  overflow-y: auto;
}
</style>
