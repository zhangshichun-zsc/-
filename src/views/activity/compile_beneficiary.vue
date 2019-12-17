<!--编辑招募报名项-受益方（会员）-->
<template>
  <div>
    <adress :value='adr' @change='getMap'/>
    <div class="compole">
      <p class="compole-head">编辑招募报名项</p>
      <Row class="role-row">
        <Col span="10">
          <ul>
            <li class="first-li">
              <span class="first-span">招募类型</span>
              <Select v-model="oneRole.roleName" style="width:300px">
                <Option
                  v-for="(item,index) in signTypeList"
                  :value="item.name"
                  :key="index"
                  @click.native="getType(item)"
                >{{ item.name }}</Option>
              </Select>
            </li>
            <li class="first-li">
              <span class="first-span">招募岗位</span>
              <Select v-model="oneRole.positionName" style="width:300px">
                <Option
                  v-for="(item,index) in signPostList"
                  :value="item.name"
                  :key="index"
                  @click.native="getPost(item)"
                >{{ item.name }}</Option>
              </Select>
            </li>
            <li class="first-li">
              <span class="first-span">票价</span>
              <Input v-model="oneRole.amount" placeholder="请输入票价" style="width: 300px"></Input>
            </li>
            <li class="first-li">
              <span class="first-span">VIP价</span>
              <Input v-model="oneRole.vipAmount" placeholder="请输入VIP价" style="width: 300px"></Input>
            </li>
            <li class="first-li">
              <span class="first-span">招募人数</span>
              <Input v-model="oneRole.recruitNum" placeholder="请输入招募人数" style="width: 300px"></Input>
            </li>
            <li class="first-li">
              <span class="first-span">积分</span>
              <Input v-model="oneRole.score" placeholder="请输入积分" style="width: 300px"></Input>
            </li>
            <li class="first-li">
              <span class="first-span">岗位描述</span>
              <Input
                type="textarea"
                v-model="oneRole.positionComments"
                placeholder="请输入岗位描述"
                style="width: 300px;"
                :rows='5'
              ></Input>
            </li>
            <li class="first-li">
              <span class="first-span">报名时间</span>
              <Row>
                <Col span="11">
                  <Date-picker
                    type="datetime"
                    :value="oneRole.enrollStarttime"
                    format="yyyy-MM-dd HH:mm"
                    placement="bottom-end"
                    placeholder="选择报名开始时间"
                    style="width: 140px"
                    :editable="false"
                    @on-change="getStartDate"
                  ></Date-picker>
                </Col>
                <Col span="2" class="wave">~</Col>
                <Col span="11">
                  <Date-picker
                    type="datetime"
                    :value="oneRole.enrollEndtime"
                    format="yyyy-MM-dd HH:mm"
                    placement="bottom-end"
                    placeholder="选择报名结束时间"
                    style="width: 140px"
                    :editable="false"
                    @on-change="getEndDate"
                  ></Date-picker>
                </Col>
              </Row>
            </li>
            <li class="first-li">
              <span class="first-span">取消时间</span>
              <Row>
                <Col span="11">
                  <Date-picker
                    type="datetime"
                    :value="oneRole.outrollStarttime"
                    format="yyyy-MM-dd HH:mm"
                    placement="bottom-end"
                    placeholder="选择报名取消开始时间"
                    style="width: 140px"
                    :editable="false"
                    @on-change="getStartDatec"
                  ></Date-picker>
                </Col>
                <Col span="2" class="wave">~</Col>
                <Col span="11">
                  <Date-picker
                    type="datetime"
                    :value="oneRole.outrollEndtime"
                    format="yyyy-MM-dd HH:mm"
                    placement="bottom-end"
                    placeholder="选择报名取消结束时间"
                    style="width: 140px"
                    :editable="false"
                    @on-change="getEndDatec"
                  ></Date-picker>
                </Col>
              </Row>
            </li>
            <li class="first-li">
              <span class="first-span">集合时间</span>
              <Row>
                <Col span="12">
                  <Date-picker
                    type="date"
                    :value="oneRole.setTime"
                    format="yyyy-MM-dd HH:mm"
                    placement="bottom-end"
                    placeholder="选择集合日期"
                    style="width: 300px"
                    @on-change="getDates"
                  ></Date-picker>
                </Col>
              </Row>
            </li>
            <li class="first-li">
              <span class="first-span">集合地址</span>
              <span @click="()=>{this.adr = true}">{{ oneRole.setAddr == null?"点击选中地址":oneRole.setAddr}}</span>
            </li>
            <li class="first-li">
              <span class="first-span">模式</span>
              <RadioGroup v-model="oneRole.zmType">
                <Radio label="1" >先到先得</Radio>
                <Radio label="2">预约型</Radio>
              </RadioGroup>
            </li>
            <li class="first-li" v-if="oneRole.zmType==2">
              <span class="first-span">预约数量</span>
              <Input v-model="oneRole.apptNum" placeholder="请输入预约数量" style="width: 300px"></Input>
            </li>
            <li class="first-li" v-if="oneRole.zmType==2">
              <span class="first-span">需要审核</span>
              <i-switch v-model="oneRole.isHaveSubsidy" :trueValue='1' :falseValue='2' />
            </li>
            <li class="first-li" v-if="oneRole.zmType==2">
              <span class="first-span">是否自动筛选替补人员</span>
              <RadioGroup v-model="oneRole.isAutoChoose">
                <Radio label="0" :trueValue='0'>是</Radio>
                <Radio label="1" :trueValue='1'>否</Radio>
              </RadioGroup>
            </li>
            <li class="first-li">
              <span class="first-span">是否发放补助</span>
              <RadioGroup v-model="oneRole.isHaveSubsidy">
                <Radio label="1">是</Radio>
                <Radio label="2">否</Radio>
              </RadioGroup>
            </li>
            <li class="first-li" v-if="oneRole.isHaveSubsidy==1">
              <span class="first-span">补助类型</span>
              <RadioGroup v-model="oneRole.subsidyType">
                <Radio label="1">现金</Radio>
                <Radio label="2">物质</Radio>
              </RadioGroup>
            </li>
            <li class="first-li" v-if="oneRole.subsidyType==1">
              <span class="first-span">补助金额</span>
              <Input placeholder="请输入补助金额" v-model="oneRole.subsidyCash" type="number" style="width:300px"></Input>
            </li>
            <li class="first-li" v-if="oneRole.subsidyType==2">
              <span class="first-span">物资类型</span>
              <Select v-model="oneRole.resourcesName" style="width:150px;margin-right:10px">
                <Option
                  v-for="item in batchItemList.resources"
                  :value="item.name"
                  :key="item.name"
                  @click.native='getResources(item)'
                >{{ item.name }}</Option>
              </Select>
              <Input v-model="oneRole.resourcesRemark" placeholder="备注" style="width: 150px" />
            </li>
            <li class="first-li">
              <span class="first-span">退款设置</span>
              <div class="refund">
                <p>
                  <i-switch v-model="oneRole.actRefund.refundRule" @on-change="refund" :falseValue='3' :trueValue='1 || 2' />
                  支持退款
                </p>
              </div>
            </li>
            <li v-if="oneRole.actRefund.refundRule==1 || oneRole.actRefund.refundRule==2">
              <RadioGroup v-model="oneRole.actRefund.refundRule" vertical>
                <Radio label="1" :trueValue='1'>活动结束前均可退款</Radio>
                <Radio label="2" :trueValue='2'>
                  活动开始前
                  <Input v-model="oneRole.actRefund.refundDays" style="width: 80px" />天可退款
                </Radio>
              </RadioGroup>
            </li>
            <li class="first-li">
              <span>限制设置</span>
            </li>
            <li>
              <table v-for="(item,index) in oneRole.signRuleList" class="role-table">
                  <tr v-if="item.ruleId==21 || item.ruleId==3" class="role-tr">
                    <td>年龄限制</td>
                    <td>
                      <Input
                        v-model="age1"
                        style="width: 70px"
                      />
                      <b>——</b>
                      <Input
                        v-model="age2"
                        style="width: 70px"
                      />
                    </td>
                    <td>
                      <Button @click.native="deleteLimits(index)">删除</Button>
                    </td>
                  </tr>
                  <tr v-if="item.ruleId==6" class="role-tr">
                    <td>所属家长小组限制</td>
                    <td>
                      <Select v-model="item.ruleName" style="width:200px">
                        <Option
                          v-for="(item,i) in  signLimitsList[0].data"
                          :value="item.name"
                          :key="i"
                          @click.native="getLimitValue1(item,index)"
                        >{{ item.name }}</Option>
                      </Select>
                    </td>
                    <td>
                      <Button @click.native="deleteLimits(index)">删除</Button>
                    </td>
                  </tr>
                  <tr v-if="item.ruleId==7" class="role-tr">
                    <td>障碍类型</td>
                    <td>
                      <Select v-model="item.ruleName" style="width:200px">
                        <Option
                          v-for="(item,i) in  signLimitsList[1].data"
                          :value="item.name"
                          :key="i"
                          @click.native="getLimitValue1(item,index)"
                        >{{ item.name }}</Option>
                      </Select>
                    </td>
                    <td>
                      <Button @click.native="deleteLimits(index)">删除</Button>
                    </td>
                  </tr>
                  <tr v-if="item.ruleId==8" class="role-tr">
                    <td>本月生日</td>
                    <td></td>
                    <td>
                      <Button @click.native="deleteLimits(index)">删除</Button>
                    </td>
                  </tr>
                  <tr v-if="item.ruleId==9" class="role-tr">
                    <td>限VIP</td>
                    <td></td>
                    <td>
                      <Button @click.native="deleteLimits(index)">删除</Button>
                    </td>
                  </tr>
                  <tr v-if="item.ruleId==22 || item.ruleId==4" class="role-tr">
                    <td>居住地区限制</td>
                    <td></td>
                    <td>
                      <Button @click.native="deleteLimits(index)">删除</Button>
                    </td>
                  </tr>
                  <tr v-if="item.ruleId==2" class="role-tr">
                    <td>志愿特长</td>
                    <td>
                      <Select v-model="item.ruleName" style="width:200px">
                        <Option
                          v-for="(item,i) in  signLimitsList[0].data"
                          :value="item.name"
                          :key="i"
                          @click.native="getLimitValue1(item,index)"
                        >{{ item.name }}</Option>
                      </Select>
                    </td>
                    <td>
                      <Button @click.native="deleteLimits(index)">删除</Button>
                    </td>
                  </tr>
                  <tr v-if="item.ruleId==5" class="role-tr">
                    <td>所属社团限制</td>
                    <td>
                      <Select v-model="item.ruleName" style="width:200px">
                        <Option
                          v-for="(item,i) in  signLimitsList[0].data"
                          :value="item.name"
                          :key="i"
                          @click.native="getLimitValue1(item,index)"
                        >{{ item.name }}</Option>
                      </Select>
                    </td>
                    <td>
                      <Button @click.native="deleteLimits(index)">删除</Button>
                    </td>
                  </tr>
              </table>
            </li>
            <li class="lx-flex-center" style="padding:8px 0">
              <div class="first-span">常用限制项</div>
            </li>
            <li class="lx-flex-around" style="padding:8px 0">
              <div v-for="item in signLimitsList">
                <Button @click.native="getLimits(item)">{{item.name}}</Button>
              </div>
            </li>
            <li class="first-li">
              <span>报名项设置</span>
            </li>
            <li>
              <div v-for="(item,index) in oneRole.itemList" :key="index" class="role-table">
                <div v-if='!item.isNew' class="role-tr">
                  <div>{{item.itemName}}</div>
                  <Checkbox v-model="item.isMust" :true-value='1'>必填</Checkbox>
                  <Button @click.native="deleteItem(index)">删除</Button>
                </div>
                <div v-else-if=" item.type === 1" class="role-tr">
                  <i-input style="width:60%" placeholder="请输入单文本标题" v-model="item.context" :disabled="isDisb" />
                  <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                  <span @click="deleteItem(index)" v-if="!isDisb">删除</span>
                </div>
                <div v-else-if=" item.type === 6 " class="role-tr">
                  <i-input style="width:60%" placeholder="请输入多行文本标题" v-model="item.context" :disabled="isDisb" />
                  <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                  <span @click="deleteItem(index)" v-if="!isDisb">删除</span>
                </div>
                <div v-else-if="item.type === 3 " style="width:80%">
                  <div class="role-trs">
                    <i-input style="width:60%" placeholder="请输入单选标题" v-model="item.context" :disabled="isDisb" />
                    <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                    <span @click="deleteItem(index)" v-if="!isDisb">删除</span>
                  </div>
                  <div v-for="(val,i) in item.answer" :key="i" class="role-trs">
                    <i-input style="width:60%" :placeholder="`输入选项${i+1}`" v-model="val.answer" :disabled="isDisb" />
                    <span @click="deleteItems(index,i)" v-if="!isDisb">x</span>
                  </div>
                  <div class="lx-flex-center" v-if="!isDisb">
                    <Button @click="addItemIput(index)">+</Button>
                  </div>
                </div>
                <div v-else style="width:80%">
                  <div class="role-trs">
                    <i-input style="width:60%" placeholder="请输入多选标题" v-model="item.context" :disabled="isDisb" />
                    <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                    <span @click="deleteItem(index)" v-if="!isDisb">删除</span>
                  </div>
                  <div v-for="(val,i) in item.answer" :key="i" class="role-trs">
                    <i-input style="width:60%" :placeholder="`输入选项${i+1}`" v-model="val.answer" :disabled="isDisb" />
                    <span @click="deleteItems(index,i)" v-if="!isDisb">x</span>
                  </div>
                  <div class="lx-flex-center" v-if="!isDisb">
                    <Button @click="addItemIput(index)">+</Button>
                  </div>
                </div>
              </div>
            </li>
            <li class="lx-flex-center" style="padding:8px 0">
              <div class="first-span">常用报名项</div>
            </li>
            <li class="lx-flex-around" style="padding:8px 0">
              <div v-for="item in signItemList">
                <Button @click.native="getSign(item)">{{item.name}}</Button>
              </div>
            </li>
            <li class="lx-flex-center" style="padding:8px 0">
              <div class="first-span">自定义报名项</div>
            </li>
            <li class="lx-flex-around" style="padding:8px 0">
              <div v-for="item in signList">
                <Button @click.native="addSign(item)">{{item.itemName}}</Button>
              </div>
            </li>
            <li class="first-li">
              <span>优先设置</span>
            </li>
            <li class="role-table">
              <table style="width:80%">
                <tbody v-for="(item,index) in oneRole.choiceRuleList" class="role-table">
                  <tr class="role-tr">
                    <td>{{index+1}}.{{item.firstName}}</td>
                    <td>
                      <Button @click.native="sortFirst(index)">上移</Button>
                    </td>
                    <td>
                      <Button @click.native="deleteFirst(index)">删除</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li class="lx-flex-center" style="padding:8px 0">
              <div class="first-span">优先规则</div>
            </li>
            <li class="lx-flex-around" style="padding:8px 0">
              <div v-for="item in firstItemList">
                <Button @click.native="getFirst(item)">{{item.name}}</Button>
              </div>
            </li>
          </ul>
        </Col>
      </Row>
      <Row class="role-row">
        <Col span="10">
          <ul>
            <li class="first-li">
              <span class="first-span">培训内容</span>
              <Checkbox v-model="oneRole.isTrainMust" :true-value='1'>是否必须培训</Checkbox>
              <i-switch v-model="oneRole.isTrain" :true-value='1' :false-value='2' />
            </li>
            <li class="first-li" v-if="oneRole.isTrain==1">
              <wangeditor :labels="oneRole.trainComments" id="ed1" @change="changeEditorTrain"></wangeditor>
            </li>
            <li class="first-li">
              <span class="first-span">反馈内容</span>
              <i-switch v-model="oneRole.isFeedback" :true-value="1" :false-value="2" />
            </li>
            <li v-if="oneRole.isFeedback === 1">
              <div v-for="(item,index) in oneRole.fdList" :key="index" class="role-table">
                <div class="role-tr" v-if=" item.type ==0 " style="width:90%">
                  <div>反馈简介</div>
                  <Input
                    placeholder="请输入反馈简介"
                    class="txt"
                    v-model="item.context"
                    type="textarea"
                    :rows='5'
                    :disabled="isDisb"
                  />
                </div>
                <div v-else-if="item.type == 9 ">
                  <span class="first-span">上传图片</span>
                  <i-switch v-model="item.context" :true-value="1" :false-value="2" />
                </div>
                <div class="role-tr" v-else-if=" item.type === 1 ">
                  <i-input style="width:60%" placeholder="请输入单文本标题" v-model="item.context" :disabled="isDisb" />
                  <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                  <span @click="deleItem(index)" v-if="!isDisb">删除</span>
                </div>
                <div class="role-tr" v-else-if=" item.type === 6 ">
                  <i-input style="width:60%" placeholder="请输入多行文本标题" v-model="item.context" :disabled="isDisb" />
                  <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                  <span @click="deleItem(index)" v-if="!isDisb">删除</span>
                </div>
                <div v-else-if="item.type === 3 " style="width:90%">
                  <div class="role-trs">
                    <i-input style="width:60%" placeholder="请输入单选标题" v-model="item.context" :disabled="isDisb" />
                    <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                    <span @click="deleItem(index)" v-if="!isDisb">删除</span>
                  </div>
                  <div class="role-trs" v-for="(val,i) in item.answer" :key="i">
                    <i-input style="width:60%" :placeholder="`输入选项${i+1}`" v-model="val.answer" :disabled="isDisb" />
                    <span @click="deleItem(index,i)" v-if="!isDisb">x</span>
                  </div>
                  <div class="lx-flex-center" v-if="!isDisb">
                    <Button @click="addSignIput(index)">+</Button>
                  </div>
                </div>
                <div v-else-if="item.type === 4 " style="width:90%">
                  <div class="role-trs">
                    <i-input style="width:60%" placeholder="请输入多选标题" v-model="item.context" :disabled="isDisb" />
                    <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                    <span @click="deleItem(index)" v-if="!isDisb">删除</span>
                  </div>
                  <div class="role-trs" v-for="(val,i) in item.answer" :key="i">
                    <i-input style="width:60%" :placeholder="`输入选项${i+1}`" v-model="val.answer" :disabled="isDisb" />
                    <span @click="deleItem(index,i)" v-if="!isDisb">x</span>
                  </div>
                  <div class="lx-flex-center" v-if="!isDisb">
                    <Button @click="addSignIput(index)">+</Button>
                  </div>
                </div>
              </div>
            </li>
            <li class="lx-flex-center" style="padding:8px 0" v-if="oneRole.isFeedback === 1">
              <div class="first-span">新增反馈项</div>
            </li>
            <li class="lx-flex-around" style="padding:8px 0" v-if="oneRole.isFeedback === 1">
              <div v-for="(item,index) in feedList">
                <Button @click.native="addItem(item)">{{item.name}}</Button>
              </div>
            </li>
          </ul>
        </Col>
      </Row>

      <div class="role-row" style="margin-top:80px">
        <div class="lx-flex-around" style="width:40%">
          <Button @click.native="cancel">取消</Button>
          <Button class="active" @click.native="save">保存</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { batchItem,signType, signPost,signLimits,signItems,firstList } from "../../request/api";
import selects from'_c/selsect'
import adress from'_c/map'
import { upload }from '@/request/http'

export default {
  props:['oneRole'],
  data() {
    return {
      adr:false,
      signTypeList: [],
      signPostList: [],
      navigation1: {
        head: "编辑招募报名项-受益方(会员)"
      },
      animal: "",
      cityList: [
        {
          value: "beijing",
          label: "北京市"
        },
        {
          value: "shanghai",
          label: "上海市"
        }
      ],
      model1: "",
      value: "",
      fruit: "先到先得",
      switch1: false,
      animal: "金斑蝶",
      subsidys: false,
      single: false,
      others: true,
      // 富文本editor
      editor1: {
        contents: ""
      },
      feedList:[
        { name: '单行文本', type: 1},
        { name: '多行文本', type: 6},
        { name: '单选问题', type: 3, answer: [{ answer: '' }, { answer: '' }, { answer: '' }]},
        { name: '多选问题', type: 4, answer: [{ answer: '' }, { answer: '' }, { answer: '' }]}
      ],
      isDisb:false,
      batchItemList:[],
      userId:1,
      signLimitsList:[],
      signList: [
        { itemName: '单行文本', type: 1, isNew:1},
        { itemName: '多行文本', type: 6, isNew: 1},
        { itemName: '单选问题', type: 3, answer: [{ answer: '' }, { answer: '' }, { answer: '' }], isNew: 1},
        { itemName: '多选问题', type: 4, answer: [{ answer: '' }, { answer: '' }, { answer: '' }], isNew: 1}
      ],
      signItemList:[],
      firstItemList:[],
      age1:'',
      age2:''
    };
  },
  mounted() {
    console.log(this.oneRole)
  },
  components: {selects,adress},

  computed: {},

  created() {
    console.log(this.oneRole)
    this.userId = this.$store.state.userId;
    if(this.oneRole.roleId){
      this.getType(this.oneRole)
    }
    this.getSignType();
    this.getBatchItem();
  },

  methods: {
    //批次活动前置信息查询
    getBatchItem(){
      batchItem({
        userId:this.userId
      }).then(res => {
        console.log(res);
        this.batchItemList = res.data
      });
    },
    // change(status) {
    //   this.$Message.info("开关状态：" + status);
    // },
    refund(e){
      console.log(e)
    },
    //招募类型
    getSignType() {
      signType({}).then(res => {
        this.signTypeList = res.data.roles;
      });
    },
    //招募类型
    getType(val) {
      // if (this.oneRole.roleName) {
      //   this.$Message.warning('招募岗位，限制设置，报名项设置，优先设置已清空,请重新填写')
      // }
      this.oneRole.roleName = val.name;
      this.oneRole.roleId = val.roleId;
      // this.oneRole.userPosition = '';
      // this.oneRole.positionName = ''
      // this.oneRole.signRuleList = []
      // this.oneRole.choiceRuleList = []
      // this.oneRole.itemList = []
      signPost({
        roleId: val.roleId,
        name: this.oneRole.roleName
      }).then(res => {
        if(res.code==200){
          this.signPostList = res.data.voluJobs;
        }
      });
      signLimits({
        userId:this.userId,
        roleId:val.roleId,
        sysId:1
      }).then(res=>{
        if(res.code==200){
          this.signLimitsList = res.data
        }
      })
      signItems({
        roleId:val.roleId
      }).then(res=>{
        if(res.code==200){
          this.signItemList = res.data
        }
      })
      firstList({
        userId:this.userId,
        sysId:1,
        roleId:val.roleId
      }).then(res=>{
        if(res.code==200){
          this.firstItemList = res.data
        }
      })
    },
    //招募岗位
    getPost(val) {
      console.log(val)
      this.oneRole.positionName = val.name;
      this.oneRole.userPosition = val.dicId;
    },
    addItem(e){
      this.oneRole.fdList.push(e)
    },
    deleItem(e,ei){
      if(ei>=0){
        if(this.oneRole.fdList[e].answer.length>2){
          this.oneRole.fdList[e].answer.splice(ei,1)
        }else{
          this.$Message.warning("至少需要两个选项")
        }
      }else{
        this.oneRole.fdList.splice(e,1)
      }
    },
    addSignIput(e){
      if(this.oneRole.fdList[e].answer.length<6){
        this.oneRole.fdList[e].answer.push({answer:''})
      }else{
        this.$Message.warning("最多只可添加6个选项")
      }
    },
    getRefund(){
      console.log(this.oneRole.actRefund.refundRule)
    },
    getResources(e){
      this.oneRole.resourcesId = e.resourcesId
      this.oneRole.resourcesName = e.name
    },
    //获取日期
    getStartDate(e) {
      this.oneRole.enrollStarttime = e
    },
    getEndDate(e) {
      this.oneRole.enrollEndtime = e
    },
    getStartDatec(e) {
      this.oneRole.outrollStarttime = e
    },
    getEndDatec(e) {
      this.oneRole.outrollEndtime = e
    },
    //获取日期
    getDates(e) {
      this.oneRole.setTime = e
    },
    getMap(e){
      console.log(e)
      this.oneRole.xx = e.xx
      this.oneRole.yy = e.yy
      this.$set(this.oneRole,'setAddr',e.address)
    },
    getLimits(e){
      console.log(e)
      let isAdd = true
      for(let i in this.oneRole.signRuleList){
        if(e.ruleId==2||e.ruleId==5||e.ruleId==6||e.ruleId==7){
          isAdd = true
        }else if(e.ruleId==this.oneRole.signRuleList[i].ruleId){
          isAdd = false
        }
      }
      if(isAdd){
        if(e.ruleId==4||e.ruleId==22){
          //居住地区限制
        }
        this.oneRole.signRuleList.push({ruleId:e.ruleId})
      }else{
        this.$Message.warning("已有该限制项，请勿重复添加")
      }
    },
    deleteLimits(e){
      this.oneRole.signRuleList.splice(e,1)
    },
    getLimitValue1(e,ei){
      let isAdd = true
      for(let i in this.oneRole.signRuleList){
        if(this.oneRole.signRuleList[i].ruleId==5||this.oneRole.signRuleList[i].ruleId==6){
          if(this.oneRole.signRuleList[i].ruleValue == e.orgId){
            isAdd = false
          }
        }else{
          if(this.oneRole.signRuleList[i].ruleValue == e.dicId){
            isAdd = false
          }
        }
      }
      if(isAdd){
        if(this.oneRole.signRuleList[ei].ruleId==5||this.oneRole.signRuleList[ei].ruleId==6){
          this.oneRole.signRuleList[ei].ruleValue = e.orgId
          this.oneRole.signRuleList[ei].ruleName = e.name
        }else{
          this.oneRole.signRuleList[ei].ruleValue = e.dicId
          this.oneRole.signRuleList[ei].ruleName = e.name
        }
      }else{
        this.$Message.warning("已有该选项，请勿重复添加")
        this.oneRole.signRuleList[ei].ruleValue = ''
        this.oneRole.signRuleList[ei].ruleName = ''
      }
    },
    getSign(e){
      console.log(e)
      let m = {}
      let n = this.oneRole.itemList ? this.oneRole.itemList : []
      let isAdd = true
      for (let i = 0; i < n.length; i++) {
        if (n[i].itemId == e.itemId) {
          isAdd = false
        }
      }
      if (isAdd) {
        m.itemId = e.itemId
        m.itemName = e.name
        m.type = e.typeFlag
        n.push(m)
        this.oneRole.itemList = n
      } else {
        this.$Message.warning('已有该设置项，请勿重复添加')
      }
    },
    deleteItem(e){
      this.oneRole.itemList.splice(e,1)
    },
    deleteItems(e,ei){
      if(ei>=0){
        if(this.oneRole.itemList[e].answer.length>2){
          this.oneRole.itemList[e].answer.splice(ei,1)
        }else{
          this.$Message.warning("至少需要两个选项")
        }
      }else{
        this.oneRole.itemList.splice(e,1)
      }
    },
    addSign(e){
      this.oneRole.itemList.push(e)
    },
    addItemIput(e){
      if(this.oneRole.itemList[e].answer.length<6){
        this.oneRole.itemList[e].answer.push({answer:''})
      }else{
        this.$Message.warning("最多只可添加6个选项")
      }
    },
    getFirst(e){
      let m = {}
      let n = this.oneRole.choiceRuleList
      let isAdd = true
      if (n.length == 0) {
        m.ruleId = e.ruleId
        m.firstName = e.name
        n.push(m)
      } else {
        for (let i = 0; i < n.length; i++) {
          if (n[i].ruleId == e.ruleId) {
            isAdd = false
          }
        }
        if (isAdd) {
          m.ruleId = e.ruleId
          m.firstName = e.name
          n.push(m)
        } else {
          this.$Message.warning("已有该设置项，请勿重复添加")
        }
      }
      this.oneRole.choiceRuleList = n
    },
    deleteFirst(e){
      this.oneRole.choiceRuleList.splice(e,1)
    },
    sortFirst(e){
      let m = this.oneRole.choiceRuleList
      if(e==0){
        this.$Message.warning("已经置顶，请勿继续操作")
      }else{
        m[e-1] = m.splice(e,1,m[e-1])[0]
        this.oneRole.choiceRuleList = m
      }
    },
    cancel(){
      this.$emit("cancelEdit",false)
    },
    save(){
      console.log(this.oneRole)
      this.$emit("oneRole",this.oneRole)
    },
    changeEditorTrain(e){
      this.oneRole.trainComments = e
    },
    getAddr(e){
      console.log(e)
      for(let i in this.oneRole.signRuleList){
        if(i.ruleId==22 || i.ruleId==4){
          this.oneRole.signRuleList[i].ruleValue = e[0] + ',' + e[1] + ',' + e[2]
        }
      }
    },
    uploadFile() {
      let file = this.$refs.files.files[0]
      const dataForm = new FormData()
      dataForm.append('file', file)
      upload(dataForm).then(res => {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          console.log(e)
          this.oneRole.qrCodeShow = e.target.result
          this.oneRole.qrCode = res.data
        }
      })
    },
    cancelImg(){
      orgimgdel({path:this.oneRole.qrCode}).then(res => {
        this.oneRole.qrCodeShow = null
        this.oneRole.qrCode = null
        this.$Message.success('删除成功')
      })
    },
  }
};
</script>
<style lang="scss" scoped>
.compole {
  .compole-head {
    height: 50px;
    line-height: 50px;
  }
  .btns-foot {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    button {
      margin: 0 10px;
      width: 140px;
    }
    .active {
      background: #339933;
      color: #ffffff;
    }
  }
}
.first-li{
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.lx-flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.lx-flex-around{
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.role-table{
  display: flex;
  justify-content: center;
  align-items: center;
}
.role-tr{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  padding: 5px 0;
}
.role-trs{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 5px 0;
}
.role-row{
  display: flex;
  justify-content: center;
  width: 80%;
}
.txt{
  width: 80%;
}
</style>
