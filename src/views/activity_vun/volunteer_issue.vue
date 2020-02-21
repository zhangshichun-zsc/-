<!--志愿者活动发布（志愿者）-->
<template>
  <div>
    <adress v-model="adr" @change="getMap" />
    <Modal v-model="rule" title="发布规则" width="50">
      <div class="rules">
        <h3>融爱融乐之家活动发布规则</h3>
        <p>欢迎您使用“融爱融乐之家”系统（以下简称“本系统”）及服务！</p>
        <p>
          活动发布规则（以下简称“规则”）系家长小组或其他在本系统成功注册的会员就本系统活动发布规则的说明。
        </p>
        <p>
          本规则为《会员系统用户协议》的组成部分，与《会员系统用户协议》具有同等的法律效力。
        </p>
        <p>
          除非您已阅读并接受本规则及融爱融乐的相关协议、规则等所有条款，否则您无权使用活动信息发布功能。您使用活动信息发布功能，即视为您已阅读并同意上述协议、规则等的约束。
        </p>
        <p class="yi">
          1.本说明下的活动发布规则主要指融爱融乐的工作人员或者家长小组在本系统发布融合活动所应遵守的内容和条款。
        </p>
        <p class="yi">
          2.家长小组是由心智障碍家庭家长自发组成的互助小组。小组旨在通过培养核心家长，发挥家长的组织领导和社会倡导力，成为行动者，以此改善社区及社会对心智障碍人士的认知。
        </p>
        <p class="yi">
          3.您必须是成功在本系统成功注册的家长小组或其他系统授予发布活动权限的会员。您需要按活动立项页面的引导填写信息，包括但不限于立项名称、立项目的、小组归属、招募类型、活动申请预算、有效期限，阅读并同意《活动发布规则》且完成全部立项程序，经本系统审核通过后方能发布信息。
        </p>
        <p class="yi">
          4.审核的时间通常为5个工作日。但本系统有权根据特殊情况对审核时间进行调整。
        </p>
        <p class="yi">
          5.您特此保证，您发布的任何信息，不存在以下任何一种违反法律法规规定的情形：
        </p>
        <p class="er">1)反对宪法所确定的基本原则；</p>
        <p class="er">
          2)危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一；
        </p>
        <p class="er">3)损害国家荣誉和利益；</p>
        <p class="er">4)煽动民族仇恨、民族歧视、破坏民族团结；</p>
        <p class="er">5)破坏国家宗教政策，宣扬邪教和封建迷信；</p>
        <p class="er">6)散布谣言，扰乱社会秩序，破坏社会稳定；</p>
        <p class="er">7)宣扬淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪；</p>
        <p class="er">8)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序；</p>
        <p class="er">9)诽谤他人，泄露他人隐私，侵害他人合法权益；</p>
        <p class="er">10)含有法律、行政法规、政策禁止的其他内容的信息。</p>
        <p class="yi">
          6.您特此保证，您发布的任何信息，不存在以下任一不友善的行为：
        </p>
        <p class="er">1)捏造、散布虚假事实，损害他人名誉；</p>
        <p class="er">
          2)以不友好的方式激怒他人，意图使对方对自己的言论作出回应，蓄意制造事端；
        </p>
        <p class="er">3)贬低他人的能力、行为、生理或身份特征，让对方难堪；</p>
        <p class="er">4)以不文明的语言对他人进行负面评价；</p>
        <p class="er">
          5)针对他人的民族、种族、宗教、性取向、性别、年龄、地域、生理特征等身份或者归类的攻击；
        </p>
        <p class="er">6)许诺以不良的后果来迫使他人服从自己的意志。</p>
        <p class="yi">
          7.您特此保证，您发布的任何信息，不存在以下任一侵犯第三方权益的情形：
        </p>
        <p class="er">
          1)任何侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容；
        </p>
        <p class="er">2)任何涉及他人隐私、个人信息或资料的内容；</p>
        <p class="er">
          3)任何混淆行为，擅自使用包括但不限于社会组织名称（包括简称等）、企业名称（包括简称、字号等）、姓名（保留笔名、艺名、译名等）、域名主体部分、网站名称、网页等引人误认为是他人单位与他人存在特定联系的内容。
        </p>
        <p>8.您在发布信息时还应遵守以下条款：</p>
        <p class="er">1)保证不发布与本平台志愿服务目的无关之信息；</p>
        <p class="er">
          2)保证所发布的全部信息均为真实、有效的，没有任何虚假信息；
        </p>
        <p class="er">
          3)保证不违反任何与您发布的信息相关的、与任何第三方（包括但不限于与投资者）之间的约定或承诺；
        </p>
        <p class="er">4)保证不违反您所在机构或公司的规章制度。</p>
        <p class="yi">
          9.您理解并同意，本系统仅为网络服务提供者，为您提供的是信息分享、传播及获取的平台，您必须为自己注册账户下的一切行为负责，包括您所发布的任何内容、活动及由此产生的任何后果。
        </p>
        <p class="yi">
          10.您理解并同意，若您出现任何违反本规则及《会员服务协议》的行为的，本系统有权自行删除您发布的全部信息，无需另行事先通知，并有权采取冻结账户，要求您赔偿损失等措施。
        </p>
        <p class="yi">
          11.本系统有权随时根据法律、法规的变化以及融爱融乐经营策略的调整等修改本规则。修改后的规则将会通过适当的方式将进行公示。如您在本规则后修订后仍继续使用本系统的，则视为您接收本规则的修订。
        </p>
      </div>
    </Modal>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <p class="content-head">
        <span>活动发布</span>
        <Button @click="apply" disabled>设置常用报名项</Button>
      </p>
      <Row type="flex" justify="space-between" class-name="row20">
        <i-col span="11" push="1">
          <div class="publish-content">
            <div class="active-publish">
              <ul>
                <li>
                  <span>活动名称</span>
                  <Input
                    v-model="args.name"
                    placeholder="请输入名称"
                    style="width: 300px"
                    :disabled="isDisb"
                  />
                </li>
                <li class="start">
                  <span>封面图片</span>
                  <div class="start-wap start-firt">
                    <!-- :picMap="coverMap"
                      :disabled="cover && isDisb" 
                      -->
                    <UploadImg
                      :max="1"
                      v-model="cover"
                      :full-url.sync="coverMap"
                      :display-width="120"
                      :display-height="120"
                      :crop-width="128"
                      :crop-height="128"
                      :disabled="isDisb"
                      ref="refCover"
                    ></UploadImg>
                  </div>
                </li>
                <li class="start">
                  <span>活动图片</span>
                  <div class="start-wap">
                    <!-- :picMap="imageMap" -->
                    <UploadImg
                      :max="1"
                      v-model="image"
                      :full-url.sync="imageMap"
                      :display-width="300"
                      :crop-width="750"
                      :crop-height="320"
                      :disabled="isDisb"
                      ref="refImags"
                    ></UploadImg>
                  </div>
                </li>
                <li>
                  <span>活动归属团队</span>
                  <Select
                    v-model="args.orgId"
                    style="width:300px"
                    placement="bottom"
                    :disabled="
                      isDisb || (!isDisb && (status === 1 || status === 2))
                    "
                    @on-change="changeTeam"
                  >
                    <Option
                      v-for="(item, index) in orgList"
                      :value="item.orgId"
                      :key="index"
                      >{{ item.orgName }}</Option
                    >
                  </Select>
                </li>
                <li class="flex-start">
                  <span>活动时间</span>
                  <XDatePicker
                    :value="args.startAt"
                    type="datetime"
                    :options="options"
                    placeholder="开始时间"
                    :disabled="isDisb"
                    confirm
                    style="width: 170px"
                    @on-change="handleChange(0, 'startAt', $event)"
                    @on-open-change="successOk(0, $event)"
                    format="yyyy-MM-dd HH:mm"
                  ></XDatePicker>

                  <i>&nbsp;~&nbsp;</i>
                  <XDatePicker
                    :value="args.endAt"
                    type="datetime"
                    :options="options"
                    @on-change="handleChange(0, 'endAt', $event)"
                    @on-open-change="successOk(1, $event)"
                    confirm
                    :disabled="isDisb"
                    style="width: 170px"
                    format="yyyy-MM-dd HH:mm"
                  ></XDatePicker>
                  <!-- <DatePicker
                    :value="args.endAt"
                    type="datetime"
                    :options="options"
                    :disabled="isDisb"
                    placeholder="结束时间"
                    @on-change="handleChange(0, 'endAt', $event)"
                    @on-open-change="successOk(1, $event)"
                    confirm
                    style="width: 150px"
                    format="yyyy-MM-dd HH:mm"
                  /> -->
                </li>
                <li class="flex-start">
                  <span>招募时间</span>

                  <XDatePicker
                    :value="zhaStart"
                    type="datetime"
                    :options="optionsStart"
                    :disabled="isDisb"
                    placeholder="开始时间"
                    confirm
                    style="width: 170px"
                    @on-change="handleChange(1, 'zhaStart', $event)"
                    @on-open-change="successOk(2, $event)"
                    format="yyyy-MM-dd HH:mm"
                  ></XDatePicker>

                  <i>&nbsp;~&nbsp;</i>

                  <XDatePicker
                    :options="optionsEnd"
                    :value="zhaEnd"
                    :disabled="isDisb"
                    type="datetime"
                    @on-change="handleChange(1, 'zhaEnd', $event)"
                    @on-open-change="successOk(3, $event)"
                    confirm
                    style="width: 170px"
                    format="yyyy-MM-dd HH:mm"
                  ></XDatePicker>
                </li>
                <li class="flex-start">
                  <span>活动方式</span>
                  <div class="tipsBox">
                     <div>
                          <RadioGroup vertical v-model="args.onlineFlag">
                          <Radio label="0" :disabled="isDisb">线上活动</Radio>
                          <Radio label="1" :disabled="isDisb">线下活动</Radio>
                        </RadioGroup>
                      </div>
                      <div class='tips'>
                          <p>通过网络举办的活动</p>
                          <p>在某个地理位置举办的活动</p>
                      </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </i-col>
        <i-col span="11">
          <div class="publish-content">
            <div class="active-publish">
              <ul>
                <li class="flex-start">
                  <span>活动地址</span>
                  <div>
                    <Button @click="getAdr" class="adr" :disabled="args.onlineFlag==0? true:false">{{
                      args.address == null ? "点击选中地址" : args.address
                    }}
                    </Button>
                    <Input
                      v-model="args.addressSup"
                      placeholder="请输入详细地址"
                      :disabled="isDisb || args.onlineFlag==0? true:false"
                    />
                  </div>
                </li>
                <li>
                  <span>现场负责人</span>
                  <div>
                    <div class="juge">
                      <Input
                        v-model="judge"
                        placeholder="请输入"
                        @on-change="changeInput"
                        :disabled="isDisb"
                        @on-blur="blurInput"
                      />
                      <div class="juge-drap" v-if="showJudge">
                        <div
                          class="drap-item"
                          v-for="(item, index) in judgeList"
                          :key="index"
                          @click="getOwn(index)"
                        >
                          {{ item.result }}
                        </div>
                      </div>
                    </div>
                    <p style="margin-top:10px;color:#666;">
                      输入手机号和姓名获得查询结果填入其中
                    </p>
                  </div>
                </li>
                <li class="jobs">
                  <span>招募岗位</span>
                  <p
                    v-for="(item, index) in args.coActivityUserConfParamList"
                    :key="index"
                    @click.stop="jump(index)"
                    style="cursor: pointer;margin-bottom:10px;"
                  >
                    <span>{{ item.userPositionName }}</span>
                    <span>{{ item.recruitNum }}人</span>
                    <span>
                      详情
                      <Icon
                        type="ios-trash"
                        @click.stop="deletUserPost(index)"
                        v-if="!isDisb"
                      />
                    </span>
                  </p>
                </li>
                <li>
                  <Button @click="jump(-1)" v-if="!isDisb"
                    >+新增招募角色</Button
                  >
                </li>
                <li>
                  <span>是否交保险</span>
                  <RadioGroup v-model="args.isInsurance">
                    <Radio label="1" :disabled="isDisb">是</Radio>
                    <Radio label="2" :disabled="isDisb">否</Radio>
                  </RadioGroup>
                </li>
                <li>
                  <span>是否允许空降</span>
                  <RadioGroup v-model="args.flyFlag">
                    <Radio :label="1" :disabled="isDisb">是</Radio>
                    <Radio :label="2" :disabled="isDisb">否</Radio>
                  </RadioGroup>
                </li>
                <li>
                  <span>是否发放证书</span>
                  <RadioGroup v-model="args.isNeedCertMould">
                    <Radio :label="1" :disabled="isDisb">是</Radio>
                    <Radio :label="2" :disabled="isDisb">否</Radio>
                  </RadioGroup>
                </li>
                <li>
                  <span>是否显示主办方小站</span>
                  <RadioGroup v-model="args.isShowHolder">
                    <Radio :label="1" :disabled="isDisb">是</Radio>
                    <Radio :label="2" :disabled="isDisb">否</Radio>
                  </RadioGroup>
                </li>
                <li>
                  <span>活动分类</span>
                  <Select
                    v-model="args.coActCatTypeList[0].typeDicId"
                    style="width:300px"
                    :label-in-value="true"
                    @on-change="changeSelect"
                    :disabled="isDisb"
                  >
                    <Option
                      v-for="(item, index) in array"
                      :value="item.dicId"
                      :key="index"
                      >{{ item.name }}</Option
                    >
                  </Select>
                </li>
                <li class="active-cost">
                  <span>活动费用</span>
                  <div class="cost">
                    <Input
                      v-model="args.pay"
                      placeholder="请输入"
                      style="width: 300px"
                      type="number"
                      :disabled="isDisb"
                    />
                    <p>此活动费用仅供参考，无需缴费</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </i-col>
      </Row>
      <Row class-name="row20">
        <i-col span="3" push="1">
          活动详情
        </i-col>
        <i-col span="16" push="1">
          <wangeditor
            id="wange"
            :labels="args.detail"
            @change="changeEditor"
            :disabled="status == 3 || status == 4 ? false : isDisb"
          />
        </i-col>
      </Row>
      <Row class-name="row20">
        <i-col span="12" push="1">
          <Row class-name="row20">
            <Row class-name="row10">
              <i-col span="3">
                培训内容
              </i-col>
              <i-col span="3" push="2">
                <i-switch
                  v-model="isTrain"
                  :true-value="1"
                  :false-value="2"
                  :disabled="isDisb"
                />
              </i-col>
            </Row>
            <Row v-if="isTrain === 1">
              <wangeditor
                :labels="train"
                id="ed1"
                @change="changeEditorTrain"
                :disabled="isDisb"
              />
            </Row>
          </Row>
          <Row class-name="row20">
            <Row class-name="row10">
              <i-col span="3">
                反馈内容
              </i-col>
              <i-col span="3" push="2">
                <i-switch
                  v-model="isFeedback"
                  :true-value="1"
                  :false-value="2"
                  :disabled="isDisb"
                />
              </i-col>
            </Row>
            <Row v-if="isFeedback === 1">
              <Row v-for="(item, index) in feed" :key="index">
                <Row
                  v-if="index == 0"
                  class-name="row10"
                  type="flex"
                  justify="space-between"
                >
                  <i-col span="5">反馈简介</i-col>
                  <i-col span="16">
                    <i-input
                      placeholder="请输入反馈内容"
                      v-model="item.detailText"
                      type="textarea"
                      :disabled="isDisb"
                      :row="4"
                    />
                  </i-col>
                </Row>
                <Row
                  v-else-if="~~item.typeFlag === 9"
                  class-name="row10"
                  type="flex"
                  justify="space-between"
                >
                  <i-col span="5">是否上传图片</i-col>
                  <i-col span="16">
                    <i-switch
                      :disabled="isDisb"
                      :true-value="1"
                      :false-value="0"
                      v-model="item.isMust"
                    />
                  </i-col>
                </Row>
                <Row
                  v-else-if="~~item.typeFlag === 1 || ~~item.typeFlag === 6"
                  class-name="row10"
                  type="flex"
                  justify="space-between"
                >
                  <i-col span="5">
                    <i-input
                      placeholder="标题"
                      v-model="item.detailText"
                      :disabled="isDisb"
                    />
                  </i-col>
                  <i-col span="4">
                    <i-switch
                      :disabled="isDisb"
                      :true-value="1"
                      :false-value="0"
                      v-model="item.isMust"
                    />
                    <span>必填</span>
                  </i-col>
                  <i-col span="2">
                    <Icon
                      type="ios-trash"
                      @click="deleItem(index, null)"
                      v-if="!isDisb"
                      color="#FF565A"
                      size="28"
                    />
                  </i-col>
                </Row>
                <Row v-else-if="~~item.typeFlag === 3 || ~~item.typeFlag === 4">
                  <Row type="flex" justify="space-between" class-name="row10">
                    <i-col span="5">
                      <i-input
                        placeholder="请输入标题"
                        v-model="item.detailText"
                        :disabled="isDisb"
                      />
                    </i-col>
                    <i-col span="4">
                      <i-switch
                        :disabled="isDisb"
                        :true-value="1"
                        :false-value="0"
                        v-model="item.isMust"
                      />
                      <span>必填</span>
                    </i-col>
                    <i-col span="2">
                      <Icon
                        type="ios-trash"
                        @click="deleItem(index, null)"
                        v-if="!isDisb"
                        color="#FF565A"
                        size="28"
                      />
                    </i-col>
                  </Row>
                  <Row v-for="(val, i) in item.arr" :key="i" class-name="row10">
                    <i-col span="5">
                      <i-input
                        :placeholder="`输入选项${i + 1}`"
                        v-model="val.value"
                        :disabled="isDisb"
                      />
                    </i-col>
                    <i-col span="2" push="2">
                      <Icon
                        type="ios-trash"
                        @click="deleItem(index, i)"
                        v-if="!isDisb"
                        color="#FF565A"
                        size="28"
                      />
                    </i-col>
                  </Row>
                  <Row>
                    <i-col push="8" span="2">
                      <Button
                        type="primary"
                        ghost
                        @click="addSignIput(index)"
                        v-if="item.arr.length < 6 && !isDisb"
                        >+</Button
                      >
                    </i-col>
                  </Row>
                </Row>
              </Row>
              <Row v-if="!isDisb">
                <i-col span="3">新增反馈项</i-col>
                <i-col span="19" push="2">
                  <Button
                    class="btn"
                    v-for="(item, index) in feedList"
                    :key="index"
                    @click="addItem(item.type)"
                    >{{ item.name }}</Button
                  >
                </i-col>
              </Row>
            </Row>
          </Row>
          <Row class-name="row20">
            <i-col span="3">受益群体人数</i-col>
            <i-col span="5" push="2">   
              <!--  @on-keyup='isNumber' -->
              <Input
                type="number"
                v-model="args.memberGroupNum"
                @on-blur='isNumber'
                placeholder="输入受益群体人数"
                :disabled="isDisb"
              />
            </i-col>
          </Row>
          <Row
            class-name="row20"
            type="flex"
            justify="center"
            v-if="isEdit == 1 || isEdit == 2 || isEdit == 3 || isEdit == 4"
          >
            <Checkbox v-model="single"></Checkbox>
            <span>我同意</span>
            <a @click="showRule">《活动发布规则》</a>
          </Row>
        </i-col>
      </Row>
      <Row class-name="row20">
        <i-col push="18" span="6">
          <div class="btns">
            <Button
              @click="sumbmit(8)"
              shape="circle"
              size="large"
              class="left"
              v-if="isEdit == 2 || isEdit == 3 || isEdit == 4"
              >存为草稿</Button
            >
            <Button
              @click="sumbmit(1)"
              shape="circle"
              size="large"
              class="right"
              >{{ isEdit == 1 ? "保存活动" : "发布活动" }}</Button
            >
          </div>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
import {
  getActiveType,
  getActiveLimit,
  getActiveSign,
  getOrgTeam,
  getOrgId,
  orgimgdel,
  saveActive,
  getActiveRelse
} from "@/request/api";
import { getAdressId } from "@/libs/utils";
import wangeditor from "_c/wangeditor";
import adress from "_c/map";
import { upload } from "@/request/http";
import { filterNull } from "@/libs/utils";
import { stat, constants } from "fs";
import { isDate, log } from "util";
import XDatePicker from "@/business_components/XDatePicker.vue";

const timeObj = {
  zhaStart: "",
  zhaEnd: ""
};

export default {
  data() {
    return {
      timeId: null,
      options: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      optionsStart:{
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      optionsEnd: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      rule: false,
      navigation1: {
        head: "志愿者活动发布(志愿者)"
      },
      single: false,
      adr: false,
      feedList: [
        { name: "单行文本", type: 1 },
        { name: "多行文本", type: 6 },
        { name: "单选问题", type: 3 },
        { name: "多选问题", type: 4 }
      ],
      isDisb: false,
      feed: [
        {
          sysId: 2,
          typeFlag: 0,
          targetType: 5,
          detailText: null,
          isMust: 2,
          sort: 1
        },
        {
          sysId: 2,
          typeFlag: 9,
          targetType: 5,
          detailText: 0,
          isMust: 2,
          sort: 2
        }
      ],
      train: null,
      isFeedback: 0,
      isTrain: 0,
      actveType: "",
      array: [],
      judge: "",
      judgeList: [],
      showJudge: false,
      zhaStart: null,
      zhaEnd: null,
      isEdit: 2,
      orgList: [],
      ab: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q"
      ],
      args: {
        onlineFlag: null,
        isNeedCertMould: null,
        name: null,
        pic: null,
        coverPic: null,
        orgId: null,
        startAt: null,
        endAt: null,
        provinceId: null,
        cityId: null,
        districtId: null,
        address: null,
        addressSup: null,
        xx: null,
        yy: null,
        ownerUserId: null,
        ownerUserName: null,
        ownerUserTel: null,
        flyFlag: null,
        isInsurance: null,
        voluCertMouldId: null,
        isShowHolder: null,
        detail: null,
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
        coActCatTypeList: [
          {
            typeDicId: null,
            typeDicName: null,
            typeFlag: 3
          }
        ],
        coActivityUserConfParamList: [],
        sysId: 2,
        typeFlag: 3,
        isNeedVolu: 0,
        isMouldFlag: 1,
        isWorkAct: 1,
        channel: 2
      },
      status: 0,
      cover: "",
      image: "",
      coverMap: "",
      imageMap: "",
      once: false,
      isAct: false
    };
  },
  beforeRouteLeave(to, from, next) {
    if (to.name !== "volunteer_compile") sessionStorage.removeItem("data");
    next();
  },

  components: { wangeditor, adress, XDatePicker },
  watch: {
    "args.onlineFlag"(newVal, oldVal){
        if(newVal == 0){
          this.args.address = '点击选中地址'
          this.args.addressSup = ''
        }
    },
    cover: {
      handler(newValue, oldValue) {
        this.args.coverPic = newValue || null;
      },
      deep: true
    },
    image: {
      handler(newValue, oldValue) {
        this.args.pic = newValue || null;
      },
      deep: true
    },
    isFeedback(newValu, oldValue) {
      if (newValu == 1 && this.feed.length < 1) {
        // 编辑状态下进来，没有任何数据
        let arr = [
          {
            detailText: null,
            isMust: 2,
            sort: 1,
            sysId: 2,
            targetType: 5,
            typeFlag: 0
          },
          {
            detailText: 0,
            isMust: 2,
            sort: 2,
            sysId: 2,
            targetType: 5,
            typeFlag: 9
          }
        ];
        this.feed = [...arr];
      }
    }
  },
  created() {
    let isEdit = ~~this.$route.query.isEdit || 2;
    let status = ~~this.$route.query.status || 0;
    let isDisb =
      Number(isEdit) === 0 ||
      Number(isEdit) === -1 ||
      (Number(isEdit) === 1 && (Number(status) === 3 || Number(status) === 4))
        ? true
        : false;
    this.isEdit = isEdit;
    this.status = status;
    this.isDisb = isDisb;
    this.activityId = this.$route.query.activityId;
    this.initData();
    this.getRelse();
  },

  methods: {
    changeTeam(e) {
      this.args.ownerUserId = null;
      this.args.ownerUserName = null;
      this.args.ownerUserTel = null;
      this.judge = "";
    },
    blurInput(e) {
      if (!this.args.ownerUserId) {
        this.judge = "";
      }
    },
    showRule() {
      this.rule = true;
    },
    getAdr() {
      if (this.isDisb) return;
      this.adr = !this.adr;
    },
    getRelse() {
      let data = JSON.parse(sessionStorage.getItem("data"));
      if (!this.activityId || !!data) return;
      getActiveRelse({ activityId: this.activityId }).then(res => {
        if (res.code == 200) {
          let args = {
            ...this.args,
            ...res.data
          };
          // Object.assign(this.args, res.data);
          let add = !!args.memberGroupNum ? true : false;
          this.args = args;
          this.args.startAt =
            this.isEdit == 4
              ? null
              : res.data.startAt
              ? res.data.startAt + ":00"
              : "";
          this.args.endAt =
            this.isEdit == 4
              ? null
              : res.data.endAt
              ? res.data.endAt + ":00"
              : "";

          this.zhaStart =
            this.isEdit == 4
              ? null
              : res.data.enrollStarttime
              ? res.data.enrollStarttime + ":00"
              : null;
          this.zhaEnd =
            this.isEdit == 4
              ? null
              : res.data.enrollEndtime
              ? res.data.enrollEndtime + ":00"
              : null;
          this.judge = res.data.result || "";
          this.isFeedback = ~~res.data.isFeedback || 0;
          this.isTrain = ~~res.data.isTrain || 0;
          this.orgName = res.data.orgName;

          // TODo 图片赋值
          this.cover = res.data.coverPic;
          this.coverMap = res.data.coverPicPath;
          this.image = res.data.pic;
          this.imageMap = res.data.picPath;
          // END

          this.add = add;

          // 地址

          if (res.data.address) {
            let address = res.data.address;
            let str = address.indexOf("-")
              ? address.split("-")[0] == "null"
                ? null
                : address.split("-")[0]
              : res.data.address;
            this.args.address = str;
          }

          if (this.isEdit === 4) {
            this.args.status = 1;
          }
          this.separation();
          this.filter();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    filter() {
      let list = this.args.coActivityUserConfParamList;
      for (let item of list) {
        if (item.coActivityItemList) {
          this.forlist(item.coActivityItemList);
        }
        if (item.coActivityRuleParamList) {
          this.forlist(item.coActivityRuleParamList);
        }
        if (~~this.isEdit === 4) {
          item.setTime = "";
        } else if (!!item.setTime) {
          item.setTime = item.setTime + ":00";
        }
      }
      this.args.coActivityUserConfParamList = list;
    },
    forlist(list) {
      for (let val of list) {
        if (val.actUserConfId || val.activityId || val.activityRuleId) {
          delete val.actUserConfId;
          delete val.activityId;
          delete val.activityRuleId;
        }
        if (val.activityItemId) {
          delete val.activityItemId;
        }
      }
    },
    separation() {
      let args = this.args;
      this.train = args.trainComments || null;
      this.feed = [];
      if (args.coDetailList) {
        this.feed = [...args.coDetailList];
      }

      this.spliced();
    },
    spliced() {
      if (this.isEdit !== 2) {
        let itemList = this.feed;
        if (!itemList) return;
        for (let item of itemList) {
          if (
            (~~item.targetType === 3 || ~~item.targetType === 4 || ~~item.targetType === 5) &&
            typeof item.arr[0] !== "object"
          ) {
            let arr = [];
            let list = item.arr;
            for (let m = 0, len = list.length; m < len; m++) {
              arr.push({ value: list[m] });
            }
            item.arr = arr;
          }
        }
        this.feed = itemList;
      }
    },
    deletUserPost(i) {
      this.$delete(this.args.coActivityUserConfParamList, i);
    },
    jump(i) {
      // TODO 图片
      let coverPicPath = "";
      let cover = "";
      let image = "";
      let picPath = "";
      // END
      if (this.$refs.refCover.imgList.length > 0) {
        coverPicPath = this.$refs.refCover.imgList[0].previewUrl;
        cover = this.$refs.refCover.imgList[0].url;
      }
      if (this.$refs.refImags.imgList.length > 0) {
        picPath = this.$refs.refImags.imgList[0].previewUrl;
        image = this.$refs.refImags.imgList[0].url;
      }
      let data = {
        isFeedback: this.isFeedback,
        isTrain: this.isTrain,
        zhaEnd: this.zhaEnd,
        zhaStart: this.zhaStart,
        isDisb: this.isDisb,
        isEdit: this.isEdit,
        args: this.args,
        judge: this.judge,
        train: this.train,
        feed: this.feed,
        // TODO 图片
        coverPicPath,
        cover,
        image,
        picPath
        // END
      };
      sessionStorage.setItem("data", JSON.stringify(data));
      this.$router.push({ name: "volunteer_compile", query: { i } });
    },
    deleItem(i, m) {
      let feed = this.feed;
      if (m !== null) {
        let arr = feed[i].arr;
        if (arr.length > 2) {
          arr.splice(m, 1);
        } else {
          this.$Message.warning("必须留两个");
          return;
        }
      } else {
        feed.splice(i, 1);
      }
      for (let i = 0, len = feed.length; i < len; i++) {
        feed[i].sort = i + 1;
      }
      this.feed = feed;
    },
    addSignIput(i) {
      let feed = this.feed;
      let arr = feed[i].arr;
      arr.push({ value: null });
      this.feed = feed;
    },
    addItem(type) {
      let feed = this.feed;
      let args = {
        sysId: 2,
        typeFlag: type,
        targetType: 5,
        detailText: null,
        sort: feed.length + 1,
        isMust: 0
      };
      if (type === 4 || type === 3) {
        args.arr = [{ value: null }, { value: null }, { value: null }];
      }
      feed.push(args);
      this.feed = feed;
    },
    changeEditor(html) {
      this.args.detail = html;
    },
    changeEditorTrain(html) {
      this.train = html;
    },
    initData() {
      this.userId = localStorage.getItem("userId");
      let data = JSON.parse(sessionStorage.getItem("data"));
      if (data) {
        this.args = data.args;
        this.isDisb = data.isDisb;
        this.zhaStart = data.zhaStart;
        this.zhaEnd = data.zhaEnd;
        this.judge = data.judge;
        // TODO 图片
        this.cover = data.cover;
        this.coverMap = data.coverPicPath;
        this.image = data.image;
        this.imageMap = data.picPath;
        // END
        this.isFeedback = data.isFeedback;
        this.isTrain = data.isTrain;
        this.train = data.train
        this.feed = data.feed
      }
      getOrgTeam({}).then(res => {
        this.orgList = res.data;
      });
      getActiveType({ typeFlag: 7 }).then(res => {
        this.array = res.data;
      });
    },
    uploadFile(img, e) {
      let file = e.target.files[0];
      const dataForm = new FormData();
      dataForm.append("file", file);
      console.log(dataForm);
      upload(dataForm).then(res => {
        if (res.code == 200) {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = e => {
            if (img === "cover") {
              this.cover = e.target.result;
              this.args.coverPic = res.data;
            } else {
              this.image = e.target.result;
              this.args.pic = res.data;
            }
          };
        } else {
          this.$Message.warning(res.msg);
        }
      });
    },
    cancelImg(img) {
      let path = img == "cover" ? this.args.coverPic : this.args.pic;
      orgimgdel({ path }).then(res => {
        if (res.code == 200) {
          if (img === "cover") {
            this.cover = null;
            this.args.coverPic = null;
          } else {
            this.image = null;
            this.args.pic = null;
          }
          this.$Message.success("删除成功");
        } else {
          this.$Message.warning(res.msg);
        }
      });
    },
    changeInput(e) {
      if (!this.args.orgId) {
        this.$Message.info("需要选择团队归属");
        return;
      }
      let param = this.judge;
      getOrgId({ orgId: this.args.orgId, param }).then(res => {
        this.judgeList = res.data;
        this.showJudge = res.data.length == 0 ? false : true;
        this.args.ownerUserId = null;
        this.args.ownerUserName = null;
        this.args.ownerUserTel = null;
      });
    },
    getOwn(i) {
      let item = this.judgeList[i];
      (this.judge = item.result),
        (this.args.ownerUserId = item.userId),
        (this.args.ownerUserName = item.userName),
        (this.args.ownerUserTel = item.tel),
        (this.showJudge = false);
    },
    changeSelect(e) {
      this.args.coActCatTypeList = [
        {
          typeDicId: e.value,
          typeDicName: e.label,
          typeFlag: 3
        }
      ];
    },
    getMap(e) {
      this.args.provinceId = e.provinceId;
      this.args.cityId = e.cityId;
      this.args.districtId = e.districtId;
      this.args.xx = e.xx;
      this.args.yy = e.yy;
      this.$set(this.args, "address", e.address);
    },
    successOk(m, e) {
      if (e) return;
      if (m == 0 || m == 1) {
        if (m == 0 && !!this.args.startAt) {
          console.log(
            new Date(this.args.startAt).getTime() >= new Date().getTime()
          );
          if (new Date(this.args.startAt).getTime() < new Date().getTime()) {
            this.$Message.warning("活动开始时间要晚于当前时间");
            this.$set(this.args, "startAt", "");
          } else if (
            !!this.args.endAt &&
            new Date(this.args.startAt).getTime() >=
              new Date(this.args.endAt).getTime()
          ) {
            this.$Message.warning("活动开始时间要早于活动结束时间");
            this.$set(this.args, "startAt", "");
          } else if (
            !!this.zhaEnd &&
            new Date(this.args.startAt).getTime() <=
              new Date(this.zhaEnd).getTime()
          ) {
            this.$Message.warning("活动开始时间要晚于招募结束时间");
            this.$set(this.args, "startAt", "");
          } 
        
        } else if (m == 1 && !!this.args.endAt) {
          if (new Date(this.args.endAt).getTime() < new Date().getTime()) {
            this.$Message.warning("活动结束时间要晚于当前时间");
            this.$set(this.args, "endAt", "");
          } else if (
            !!this.args.startAt &&
            new Date(this.args.startAt).getTime() >=
              new Date(this.args.endAt).getTime()
          ) {
            this.$Message.warning("活动开始时间要早于活动结束时间");
            this.$set(this.args, "endAt", "");
          }
        }
      } else {
        if (m == 2 && !!this.zhaStart) {
          if (new Date(this.zhaStart).getTime() < new Date().getTime()) {
            this.$Message.warning("招募开始时间要晚于当前时间");
            this.zhaStart = "";
          } else if (
            !!this.zhaEnd &&
            new Date(this.zhaStart).getTime() >= new Date(this.zhaEnd).getTime()
          ) {
            this.$Message.warning("活动开始时间要早于活动结束时间");
            this.zhaStart = "";
          }
        } else if (m == 3 && !!this.zhaEnd) {
          if (new Date(this.zhaEnd).getTime() < new Date().getTime()) {
            this.$Message.warning("招募结束时间要晚于当前时间");
            this.zhaEnd = "";
          } else if (
            !!this.zhaStart &&
            new Date(this.zhaStart).getTime() >= new Date(this.zhaEnd).getTime()
          ) {
            this.$Message.warning("招募开始时间要早于招募结束时间");
            this.zhaEnd = "";
          } else if (
            !!this.args.startAt &&
            new Date(this.args.startAt).getTime() <=
              new Date(this.zhaEnd).getTime()
          ) {
            this.$Message.warning("活动开始时间要晚于招募结束时间");
            this.zhaEnd = "";
          }
        }
      }
    },
    handleChange(i, name, e) {
      let time = e;
      if (time) {
        time = time + ":00";
      }
      if (i === 0) {
        this.args[name] = time;
      } else {
        this[name] = time;
        timeObj[name] = time;
        if (name == "zhaStart") {
          this.optionsEnd = {
            disabledDate(date) {
              
              return (
                
                new Date(date).getTime() <= new Date(timeObj.zhaStart).getTime()- 86400000
              );
            }
          };
        }
          else if(name == "zhaEnd"){
            this.optionsStart = {
              disabledDate(date) {
                return ( new Date(date).getTime() >= new Date(timeObj.zhaEnd).getTime()- 86400000) 
            }
            }
          }
        else {
          this.optionsStart  = {
             disabledDate(date) {
              return date && date.valueOf() < Date.now() - 86400000;
            }
          }
          this.optionsEnd = {
            disabledDate(date) {
              return date && date.valueOf() < Date.now() - 86400000;
            }
          };
        }
      }
    },
    sumbmit(i) {
      // 节流阀
      if (this.timeId) return;
      this.timeId = true;
      setTimeout(() => {
        this.timeId = false;
      }, 2000);
      // end

      let item = this.args;
      if (i == 1) {
        
        console.log(JSON.stringify(item))
        if (this.single == false) {
          this.$Message.warning("你没有同意发布规则");
          return;
        }else if (
          !item.name  ||
          !item.coverPic ||
          !item.pic  ||
          !item.orgId  ||
          !item.startAt ||
          !item.endAt ||
          !this.zhaStart ||
          !this.zhaEnd  ||
          item.coActivityUserConfParamList.length == 0 ||
          !item.isInsurance  ||
          !item.flyFlag  ||
          !item.isNeedCertMould  ||
          !item.isShowHolder  ||
          !item.coActCatTypeList[0].typeDicId ||
          !item.detail 
        ) {
          this.$Message.warning("活动内容填写不完整");
          return;
        }else if(!item.onlineFlag){
           this.$Message.warning("请选择活动方式");
         
        }else if(item.onlineFlag == 1 &&  item.address == null){
           this.$Message.warning("请选择活动地址");
        }else if (item.ownerUserId == null) {
          this.$Message.warning("请选择现场负责人");
          return;
        } else if (this.isFeedback == 1) {
          for (let val of this.feed) {
            if (val.detailText === "" || val.detailText === null) {
              this.$Message.warning("你已经勾选反馈，必须完善反馈项");
              return;
            } else if (val.arr) {
              for (let em of val.arr) {
                if (em.value === "" || em.value === null) {
                  this.$Message.warning("你已经勾选反馈，选项没完善");
                  return;
                }
              }
            }
          }
        } else if (this.isTrain == 1) {
          if (!this.train) {
            this.$Message.warning("你已经勾选培训，必须完善");
            return;
          }
        }
      } else {
        if (item.name == null) {
          this.$Message.warning("至少填写活动名称");
          return;
        }
        if (
          this.isFeedback == 1 &&
          item.coActivityUserConfParamList.length == 0
        ) {
          this.$Message.warning("反馈填写，岗位必须填写");
          return;
        }
        if (this.isTrain == 1 && item.coActivityUserConfParamList.length == 0) {
          this.$Message.warning("培训填写，岗位必须填写");
          return;
        }
      }
      if (this.once) return;
      this.once = true;
      let list = item.coActivityUserConfParamList;
      for (let i = 0, len = list.length; i < len; i++) {
        list[i].coActivityItemList = this.dealSelect(
          list[i].coActivityItemList
        );
      }
      this.dealData(list, item.startAt);
      item.coActivityUserConfParamList = list;
      if (this.isEdit !== 1) {
        item.status = i;
      } else {
        item.activityId = this.activityId;
      }
      item.userId = this.userId;
      if (i == 1) {
        item.releaseTime = this.getTime();
      }
      if (this.isEdit == 4) delete item.activityId;
      let obj = filterNull(item);
      obj.title = obj.name;

      console.log(obj);
      saveActive(obj).then(res => {
        this.once = false;
        if (res.code == 200) {
          this.$router.replace({ name: "volunteer_activity" });
          sessionStorage.removeItem("data");
          this.$Message.success("发布成功");
        } else {
          this.$Message.warning(res.msg);
        }
      });
    },
    dealData(list, startAt) {
      let ls = this.isFeedback == 1 ? this.dealSelect(this.feed) : [];
      let train = this.isTrain == 1 ? this.train : null;
      let zhaStart = this.zhaStart;
      let zhaEnd = this.zhaEnd;
      for (let i = 0, len = list.length; i < len; i++) {
        list[i].isFeedback = this.isFeedback;
        list[i].isTrain = this.isTrain;
        list[i].coDetailList = ls;
        list[i].trainComments = train;
        list[i].enrollEndtime = zhaEnd;
        list[i].enrollStarttime = zhaStart;
        list[i].outrollStarttime = zhaStart;
        list[i].outrollEndtime = startAt;
      }
    },
    dealSelect(list) {
      if (list.length !== 0) {
        for (let i = 0, len = list.length; i < len; i++) {
          if (list[i].arr) {
            let arr = list[i].arr;
            let ar = this.ab;
            for (let m = 0, len = arr.length; m < len; m++) {
              list[i][`answer${ar[m]}`] = arr[m].value;
            }
          }
        }
        return list;
      } else {
        return [];
      }
    },
    getTime() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const mine = date.getMinutes();
      const ss = date.getSeconds();
      return `${year}-${month}-${day} ${hour}:${mine}:00`;
    },
    apply() {
      this.$router.push({ name: "volunteer_apply", params: { sysId: "2,3" } });
    },
    isNumber(event) {
    // console.log(event)
    // this.args.memberGroupNum = this.args.memberGroupNum.replace(/^\+?[1-9][0-9]*$/)

      let value = this.args.memberGroupNum;
      if (value.toString().includes(".") || 0 > value) {
          this.$Message.error({
            background: true,
            content: "请输入大于0的整数！"
          });
           this.$nextTick(() => {
              this.args.memberGroupNum = "";
           })
        }
      
    },
    checkRad() {
      console.log(this.single);
    }
  }
};
</script>
<style lang="scss" scoped>
  .tipsBox{
    display: flex;
  }
  .tips{
      display: flex;
      flex-direction: column;
      align-items: baseline;
      justify-content: space-around;
  }
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
        li {
          margin: 20px 0;
          display: flex;
          align-items: center;
          .adr {
            flex: 1;
            margin-bottom: 10px;
          }
          .juge {
            width: 300px;
            position: relative;
            .juge-drap {
              position: absolute;
              z-index: 100;
              top: 46px;
              left: 0;
              width: 100%;
              max-height: 310px;
              overflow-y: scroll;
              background: #fff;
              box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.2);
              .drap-item {
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
        .active-cost {
          display: flex;
          align-items: flex-start;
          .cost {
            p {
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
.start-wap {
  position: relative;
  height: 150px;
  width: 300px;
  .upload {
    width: 100%;
    height: 100%;
  }
  .cancel {
    position: absolute;
    top: 0px;
    right: -30px;
    z-index: 10;
  }
  .upload .file {
    width: 100%;
    height: 100%;
    border: 1px dashed #ff565a;
    text-align: center;
    padding: 20px 0;
  }
  .upload .file input {
    display: none;
  }
  .shae {
    height: 150px;
    width: 150px;
  }
}
.start-firt {
  width: 150px;
}
.btns {
  .right {
    margin-left: 20px;
    background: #ff565a !important;
    color: #fff !important;
    border-color: #ff565a !important;
  }
}
.row20 {
  margin-bottom: 20px;
}
.row10 {
  margin-bottom: 10px;
}
.btn {
  margin-right: 10px !important;
  margin-bottom: 10px !important;
}
.btn:hover {
  border-color: #ff565a;
  color: #ff565a;
}

.rules {
  overflow-y: auto;
  height: 700px;
  font-size: 16px;
  padding: 0 20px;
  h3 {
    text-align: center;
    margin-bottom: 10px;
  }
  .yi {
    text-indent: 2em;
  }
  .er {
    text-indent: 4em;
  }
}
</style>
