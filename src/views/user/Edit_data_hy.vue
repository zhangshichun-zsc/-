<!--编辑资料(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="main">
      <ButtonGroup>
        <Button @click="userDetaile()">用户详情</Button>
        <Button type="success">编辑资料</Button>
        <Button @click="Log()">登录日志</Button>
      </ButtonGroup>
      <div class="constant bk">
        <div class="constant-title">
          <p>编辑资料</p>
        </div>
        <div class="con flex-center-start">
          <div style="margin-right: 0.5rem;">
            <img class='avatarPath' v-if="parameOBJ.titleInfo.avatarPath" :src="parameOBJ.titleInfo.avatarPath">
            <Avatar v-else icon="ios-person" size="large" />
            <span style="margin-left:8px">{{parameOBJ.titleInfo.displayName}}</span>
          </div>
          <div>
            <div class="details">
              <p>
                <span>分类：</span>
                <span v-for="item in parameOBJ.titleInfo.userRole" :key='item.roleId'>{{item.roleName}}</span>
              </p>
            </div>
            <div class="details">
              <p>
                <span>标签：</span>
                <span v-for="item in parameOBJ.titleInfo.userLabel" :key='item.labelId'>{{item.labelName}}</span>
                <Icon type="ios-create" size='30' @click='modifyLabel' />
              </p>
            </div>
          </div>

        </div>
      </div>

      <div class="content">
        <Row>
          <Col span="12">
          <div class='content-item'>
            <div class="con-box bk item">
              <div class="constant-title flex-center-between">
                <span>
                  基本信息
                </span>
                <span @click='showInfo(0)'>
                  显示/隐藏空值
                </span>
              </div>
              <Form :label-width="120" style="padding: 0.5rem" label-position='left'>
                <FormItem label="手机号" style="text-algin:left">
                  <p>{{parameOBJ.basicInfo.info.tel}}</p>
                </FormItem>
                <FormItem label="昵称">
                  <Input type="text" placeholder="点击输入" :value="parameOBJ.basicInfo.info.displayName" style="width:180px"></Input>
                </FormItem>
                <FormItem label="身份证件类型">
                  <Select v-model="parameOBJ.basicInfo.info.idcardType" style="width:180px">
                    <Option v-for="item in parameOBJ.basicInfo.idCardType" :value="item.dicId" :key="item.dicId">{{ item.dicName }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="证件号码">
                  <Input type="text" placeholder="点击输入" style="width:180px" v-model="parameOBJ.basicInfo.info.idCard"></Input>
                </FormItem>
                <FormItem label="出生日期">
                  <DatePicker type="date" :value='parameOBJ.basicInfo.info.birthDay' placeholder="点击输入" style="width:180px"></DatePicker>
                </FormItem>
                <FormItem label="性别">
                  <RadioGroup v-model="parameOBJ.basicInfo.info.sex">
                    <Radio label="1">
                      <span>男</span>
                    </Radio>
                    <Radio label="2">
                      <span>女</span>
                    </Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="创建时间">
                  <p>{{parameOBJ.basicInfo.info.createAt}}</p>
                </FormItem>
              </Form>
            </div>
          </div>
          </Col>
          <Col span="12">
          <div class='content-item'>
            <!-- 志愿者信息 -->
            <div class="con-box bk item">
              <div class="constant-title flex-center-between">
                <span>
                  志愿者信息
                </span>
                <span>
                  显示/隐藏空值
                </span>
              </div>
              <Form :label-width="120" style="padding: 0.5rem " label-position='left'>
                <FormItem label="特长">
                  <Select v-model="parameOBJ.volInfo.info.speciality" style="width:180px" placeholder="请选择">
                    <Option v-for="item in parameOBJ.volInfo.speciality" :value="item.dicId" :key='item.dicId'>{{item.dicName}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="志愿者特长">
                  <Select v-model="parameOBJ.volInfo.info.voluSpeciality" style="width:180px" placeholder="请选择">
                    <Option v-for="item in parameOBJ.volInfo.volSpeciality" :value="item.dicId" :key='item.dicId'>{{ item.dicName }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="期待参加的活动种类">
                  <Select v-model="parameOBJ.volInfo.info.actTypeLike" style="width:180px" placeholder="请选择">
                    <Option v-for="item in parameOBJ.volInfo.volServerType" :value="item.dicId" :key='item.dicId'>{{ item.dicName }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="教育程度">
                  <Select v-model="parameOBJ.volInfo.info.eduStatus" style="width:180px" placeholder="请选择">
                    <Option v-for="item in parameOBJ.volInfo.education" :value="item.dicId" :key='item.dicId'>{{ item.dicName }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="邮箱">
                  <Input type="text" style="width:180px" v-model="parameOBJ.volInfo.info.email"></Input>
                </FormItem>

              </Form>
            </div>

          </div>
          </Col>
          <Col span="12" style='margin-bottom:110px'>
          <div class='content-item'>
            <!-- 收益方 -->
            <div class="con-box bk item">
              <div class="constant-title flex-center-between">
                <span>
                  受益方信息
                </span>
                <span>
                  显示/隐藏空值
                </span>
              </div>
              <Form :label-width="120" style="padding: 0.5rem" label-position='left'>
                <FormItem label="VIP到期时间">
                  <p>{{  parameOBJ.memInfo.userInfo.vipLastTime || ''}}</p>
                </FormItem>
                <FormItem label="障碍类型">
                  <p>{{parameOBJ.memInfo.childsInfo[0].disorderType || ""}}</p>
                </FormItem>
                <FormItem label="残疾证号">
                  <p>{{parameOBJ.memInfo.childsInfo[0].disorderCard || ""}}</p>

                </FormItem>
                <FormItem label="家庭账号成员">
                  <p>{{parameOBJ.memInfo.homeMemberList[0].userName || ""}}{{parameOBJ.memInfo.homeMemberList[0].typeDicId}} {{parameOBJ.memInfo.homeMemberList[0].userPhone}}</p>
                </FormItem>
                <FormItem label="衣服尺码">
                  <p>{{parameOBJ.memInfo.childsInfo[0].clothingSize || "XL"}}</p>
                </FormItem>
                <div style="text-align: center;" @click="showBenefitModel">
                  <Icon type="ios-arrow-down" />
                </div>
              </Form>
            </div>

          </div>
          </Col>
        </Row>
      </div>

      <!-- 组织信息 -->
      <!-- <div class="con-box bk item">
          <div class="constant-title flex-center-between">
            <span>
              组织信息
            </span>
          </div>
          <Form :model="formInline4" :label-width="120" style="padding: 0.5rem">
            <FormItem label="组织名称">
              <Select v-model="formInline4.OrganizationName" style="width:180px" placeholder="点击输入">
                <Option v-for="item in cityList12" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="组织类型">
              <Select v-model="formInline4.TissueTypes" style="width:180px" placeholder="点击输入">
                <Option v-for="item in cityList13" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="所在部门">
              <Select v-model="formInline4.department" style="width:180px" placeholder="点击输入">
                <Option v-for="item in cityList14" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="单位职务">
              <Select v-model="formInline4.UnitPosition" style="width:180px" placeholder="点击输入">
                <Option v-for="item in cityList15" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Form>
        </div> -->
      <!-- <div class="con-box bk item">
          <div class="constant-title flex-center-between">
            <span>捐赠方信息</span>
            <span>显示/隐藏空值</span>
          </div>
          <Form :model="formInline5" :label-width="120" style="padding: 0.5rem">
            <FormItem label="捐赠类型">
              <Select v-model="formInline5.DonorType" style="width:180px" placeholder="点击输入">
                <Option v-for="item in cityList16" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="周期">
              <Select v-model="formInline5.cycle" style="width:180px" placeholder="点击输入">
                <Option v-for="item in cityList17" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="额度">
              <Select v-model="formInline5.lines" style="width:180px" placeholder="点击输入">
                <Option v-for="item in cityList18" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <div style="text-align: center;">
              <Icon type="ios-arrow-down" />
            </div>
          </Form>
        </div>
        <div class="con-box bk item">
          <div class="constant-title flex-center-between">
            <span>备注</span>
            <span>显示/隐藏空值</span>
          </div>
          <div style="padding: 0.2rem">
            <Input v-model="formInline6.DonorType" placeholder="添加新备注">
            <span slot="prepend">+</span>
            </Input>
          </div>

        </div>
        <div class="con-box bk item">
          <div class="constant-title flex-center-between">
            <span>文件</span>
            <span>显示/隐藏空值</span>
          </div>
          <div style="margin: 0.2rem auto;display: flex;justify-content: center;">
            <Upload action="//jsonplaceholder.typicode.com/posts/">
              <Button>添加附件</Button>
            </Upload>
          </div>

        </div> -->

    </div>

    <!-- 弹窗 -->
    <Modal title="收益方详情" v-model="showBenefitModelFlag" :mask-closable="false" width='1000'>
      <p slot="header" class='header'>
        <span>收益方详情</span>
        <span style="text-align:right; margin-right: 30px">显示/隐藏空值</span>
      </p>
      <div>
        <Row>
          <Col span="12">
          <Form :label-width="140" style="padding: 0.5rem" label-position='left'>
            <FormItem label="VIP到期时间">
              <p>{{  parameOBJ.memInfo.userInfo.vipLastTime || ''}}</p>
            </FormItem>
            <FormItem label="姓名">
              <p>{{  parameOBJ.memInfo.userInfo.userName || ''}}</p>
            </FormItem>
            <FormItem label="家庭身份">
              <Select v-model="parameOBJ.memInfo.userInfo.typeDicId" style="width:180px" placeholder="请选择家庭身份">
                <Option v-for="item in parameOBJ.memInfo.parentRelation" :value="item.dicId" :key='item.dicId'>{{ item.dicName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="会员职业">
              <Select v-model="parameOBJ.memInfo.userInfo.jobDicId" style="width:180px" placeholder="请选择">
                <Option v-for="item in parameOBJ.memInfo.occupation" :value="item.dicId" :key='item.dicId'>{{ item.dicName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="孩子姓名">
              <p>{{parameOBJ.memInfo.childsInfo[0].childName}}</p>
            </FormItem>
            <FormItem label="孩子性别">
              <p>{{parameOBJ.memInfo.childsInfo[0].childSex}}</p>
            </FormItem>
            <FormItem label="孩子证件类型">
              <p>{{parameOBJ.memInfo.childsInfo[0].idcardType}}</p>
            </FormItem>
            <FormItem label="孩子生日">
              <p>{{parameOBJ.memInfo.childsInfo[0].childBirthday}}</p>
            </FormItem>
            <FormItem label="孩子残疾证后两位">
              <p>{{parameOBJ.memInfo.childsInfo[0].disorderCard}}</p>
            </FormItem>
            <FormItem label="孩子尺码">
              <p>{{parameOBJ.memInfo.childsInfo[0].clothingSize}}</p>
            </FormItem>
            <FormItem label="孩子障碍类型">
              <p>{{parameOBJ.memInfo.childsInfo[0].disorderType}}</p>
            </FormItem>
            <div style="padding-left:0.5rem; padding-right:5rem">
              <p>是否患有其他疾病</p>
              <span v-if="parameOBJ.memInfo.childsInfo[0].disorderType.length>0" class='disorderTypelist-item ' v-for="item in parameOBJ.memInfo.childsInfo[0].disorderType.split(',')">{{item}}</span>
              <span v-else class='disorderTypelist-item'>无</span>
            </div>
            <FormItem label="孩子爱好、注意事项">
              <p>{{parameOBJ.memInfo.childsInfo[0].point}}</p>
            </FormItem>
            <FormItem label="教育经历">
              <p>{{parameOBJ.memInfo.childsInfo[0].eduExperience||'暂无'}}</p>
            </FormItem>
            <FormItem label="就业情况">
              <p>{{parameOBJ.memInfo.childsInfo[0].workExperience||'无业'}}</p>
            </FormItem>
            <FormItem label="孩子家庭身份">
              <p>{{parameOBJ.memInfo.childsInfo[0].typeDicId||'孩子'}}</p>
            </FormItem>

          </Form>
          <Button v-if='parameOBJ.memInfo.childsInfo.length>1' style='margin-left:70px;' @click="showMoreChildren" v-show="!moreChildren">更多</Button>
          <div v-show='moreChildren'>
            <Form v-for='(item,index) in parameOBJ.memInfo.childsInfo' :label-width="140" style="padding: 0.5rem" label-position='left' v-if='index>0'>
              <FormItem label="孩子姓名">
                <p>{{parameOBJ.memInfo.childsInfo[index].childName}}</p>
              </FormItem>
              <FormItem label="孩子性别">
                <p>{{parameOBJ.memInfo.childsInfo[index].childSex}}</p>
              </FormItem>
              <FormItem label="孩子证件类型">
                <p>{{parameOBJ.memInfo.childsInfo[index].idcardType}}</p>
              </FormItem>
              <FormItem label="孩子生日">
                <p>{{parameOBJ.memInfo.childsInfo[index].childBirthday}}</p>
              </FormItem>
              <FormItem label="孩子残疾证后两位">
                <p>{{parameOBJ.memInfo.childsInfo[index].disorderCard}}</p>
              </FormItem>
              <FormItem label="孩子尺码">
                <p>{{parameOBJ.memInfo.childsInfo[index].clothingSize}}</p>
              </FormItem>
              <FormItem label="孩子障碍类型">
                <p>{{parameOBJ.memInfo.childsInfo[index].disorderType}}</p>
              </FormItem>
              <div style="padding-left:0.5rem; padding-right:5rem">
                <p>是否患有其他疾病</p>
                <span v-if="parameOBJ.memInfo.childsInfo[index].disorderType.length>0" class='disorderTypelist-item ' v-for="item in parameOBJ.memInfo.childsInfo[index].disorderType.split(',')">{{item}}</span>
                <span v-else class='disorderTypelist-item'>无</span>
              </div>
              <FormItem label="孩子爱好、注意事项">
                <p>{{parameOBJ.memInfo.childsInfo[index].point}}</p>
              </FormItem>
              <FormItem label="教育经历">
                <p>{{parameOBJ.memInfo.childsInfo[index].eduExperience||'暂无'}}</p>
              </FormItem>
              <FormItem label="就业情况">
                <p>{{parameOBJ.memInfo.childsInfo[index].workExperience||'无业'}}</p>
              </FormItem>
              <FormItem label="孩子家庭身份">
                <p>{{parameOBJ.memInfo.childsInfo[index].typeDicId||'孩子'}}</p>
              </FormItem>
            </Form>
          </div>
          <Form :label-width="140" style="padding: 0.5rem" label-position='left'>
            <FormItem label="孩子是否有兄弟姐妹">
              <RadioGroup v-model="parameOBJ.memInfo.vipotherInfo.haveBrothers">
                <Radio label="1">
                  <span>是</span>
                </Radio>
                <Radio label="0">
                  <span>否</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="如有，是否同为心智患者">
              <RadioGroup v-model="parameOBJ.memInfo.vipotherInfo.brothersDisorder">
                <Radio label="1">
                  <span>是</span>
                </Radio>
                <Radio label="0">
                  <span>否</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="如有，年龄为">
              <Input type="text" placeholder="请输入年龄" :value="parameOBJ.memInfo.vipotherInfo.brothersAge" style="width:180px"></Input>
            </FormItem>
            <FormItem label="手足的现有状态">
              <Select v-model="parameOBJ.memInfo.vipotherInfo.brothersStatus" style="width:180px" placeholder="请选择">
                <Option v-for="item in parameOBJ.memInfo.listStatusType" :value="item.dicId" :key='item.dicId'>{{ item.dicName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="成年心智障碍者婚姻状况">
              <RadioGroup v-model="parameOBJ.memInfo.vipotherInfo.brothersDisorder">
                <Radio label="1">
                  <span>已婚</span>
                </Radio>
                <Radio label="0">
                  <span>未婚</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="年收入范围">

              <Select v-model="parameOBJ.memInfo.userInfo.orgName" style="width:180px" placeholder="请选择">
                <Option v-for="item in parameOBJ.memInfo.listOrg" :value="item.dicId" :key='item.dicId'>{{ item.dicName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="所在家长小组">
              <p>{{parameOBJ.memInfo.userInfo.orgName}}</p>
            </FormItem>
            <FormItem label="目前孩子有哪些社会保障">
              <CheckboxGroup>
                <Checkbox v-for='item in parameOBJ.memInfo.listInsurance' :label="item.dicId">{{item.name}}</Checkbox>

              </CheckboxGroup>

            </FormItem>
          </Form>

          </Col>
          <Col span="12">
          <Form :label-width="120" style="padding: 0.5rem" label-position='left'>
            <FormItem label="VIP到期时间">
              <p>{{  parameOBJ.memInfo.userInfo.vipLastTime || ''}}</p>
            </FormItem>
            <FormItem label="障碍类型">
              <p>{{parameOBJ.memInfo.childsInfo[0].disorderType || ""}}</p>
            </FormItem>
            <FormItem label="残疾证号">
              <p>{{parameOBJ.memInfo.childsInfo[0].disorderCard || ""}}</p>

            </FormItem>
            <FormItem label="家庭账号成员">
              <p>{{parameOBJ.memInfo.homeMemberList[0].userName || ""}}{{parameOBJ.memInfo.homeMemberList[0].typeDicId}} {{parameOBJ.memInfo.homeMemberList[0].userPhone}}</p>
            </FormItem>
            <FormItem label="衣服尺码">
              <p>{{parameOBJ.memInfo.childsInfo[0].clothingSize || "XL"}}</p>
            </FormItem>
            <div style="text-align: center;">
              <Icon type="ios-arrow-down" @click="showBenefitModel" />
            </div>

          </Form>
          </Col>
        </Row>

      </div>

      <div slot="footer">
        <Button type="text" size="large"></Button>
        <Button type="text" size="large"></Button>
      </div>
    </Modal>

  </div>
</template>

<script>
import Public from './config/index'
export default {
  data() {
    return {
      navigation1: {
        head: '编辑资料(会员)'
      },
      // formInline1: {
      //   photo: '13111111111',
      //   DateBirth: '',
      //   gender: '',
      //   IdCard: '',
      //   email: '',
      //   CreationTime: '2019-05-20   15:00'
      // },
      // formInline2: {
      //   ProfessionalCompetence: '',
      //   ServiceableTime: '',
      //   hobby: '',
      //   DegreeEducation: '',
      //   ServiceIntention: ''
      // },
      // cityList2: [{ value: 'option1', label: '1' }],
      // cityList3: [{ value: 'option1', label: '工作日' }],
      // cityList4: [{ value: 'option1', label: '1' }],
      // cityList5: [{ value: 'option1', label: '1' }],
      // cityList6: [{ value: 'option1', label: '1' }],
      // formInline3: {
      //   VIPExpiryDate: '',
      //   BarrierType: '',
      //   DisabilityNumber: '',
      //   FamilyAccountMember: '',
      //   DressSize: ''
      // },
      // cityList7: [{ value: 'option1', label: '1' }],
      // cityList8: [{ value: 'option1', label: '1' }],
      // cityList9: [{ value: 'option1', label: '1' }],
      // cityList10: [{ value: 'option1', label: '1' }],
      // cityList11: [{ value: 'option1', label: '1' }],
      // formInline4: {
      //   OrganizationName: '',
      //   TissueTypes: '',
      //   department: '',
      //   UnitPosition: ''
      // },
      // cityList12: [
      //   { value: 'option1', label: '拜耳中国' },
      //   { value: 'option2', label: '白鸽志愿团队' },
      //   { value: 'option3', label: '丰台家长小组' }
      // ],
      // cityList13: [{ value: 'option1', label: '1' }],
      // cityList14: [{ value: 'option1', label: '1' }],
      // cityList15: [{ value: 'option1', label: '1' }],
      formInline5: {
        DonorType: '',
        cycle: '',
        lines: ''
      },
      cityList16: [{ value: 'option1', label: '月捐' }, { value: 'option2', label: '次捐' }],
      cityList17: [{ value: 'option1', label: '1' }],
      cityList18: [{ value: 'option1', label: '1' }],
      formInline6: {
        note: ''
      },
      moreChildren: false, // 多个孩子
      showBenefitModelFlag: false,
      showInfoList: [
        {
          0: {},
          1: {},
          2: {},
          3: {}
        }
      ],
      getOBJ: {
        // 获取编辑详情的数据
        userId: this.$route.query.userId,
        sysType: '1'
      },
      specialityInfo: '',
      speciality: [],
      parameOBJ: {
        titleInfo: {}, //头部信息
        basicInfo: {
          idCardType: [], // 身份证件类型
          info: {
            // 个人信息
            proviceId: 0,
            birthDay: '',
            address: '',
            districtId: 0,
            displayName: '',
            idCard: '',
            sex: '1',
            idcardType: 0,
            tel: '',
            cityId: 1,
            createAt: ''
          }
        },
        volInfo: {
          speciality: [], // 用户的特长类型
          volSpeciality: [], // 志愿者的特长
          volServerType: [], // 活动种类
          education: [], // 教育程度
          info: {} // 用户信息
        },
        memInfo: {
          listStatusType: [],
          userInfo: {}, //用户信息
          occupation: [], // 职业
          parentRelation: [], // 身份
          childsInfo: [
            {
              disorderCard: '',
              disorderType: '',
              childSex: '',
              workExperience: '',
              childBirthday: '',
              typeDicId: '',
              point: '',
              childIdcard: '',
              clothingSize: '',
              eduExperience: '',
              childName: '',
              idcardType: '',
              diseaseDicIds: ''
            }
          ], //孩子信息
          homeMemberList: [
            {
              userPhone: '',
              userName: '',
              typeDicId: ''
            }
          ], // 家庭账号
          vipotherInfo: {
            activityOther: '',
            activityType: '',
            address: '',
            annualIncome: '',
            brothersAge: '',
            brothersDisorder: '',
            brothersStatus: '',
            cityId: 1,
            confluentOther: '',
            confluentType: '',
            countryId: '',
            createAt: '',
            createUserId: '',
            createUserPhone: '"',
            districtId: 1,
            haveBrothers: '',
            homeId: '',
            hopeOrgId: '',
            hopeOther: '',
            hopeOtherOrg: '',
            hopeType: '',
            improveFlag: '0',
            insuranceOther: '',
            insuranceType: '',
            interestOther: '',
            interestType: '',
            isMarried: '',
            livingOther: '',
            livingType: '',
            memberScore: 64,
            msgOtherSendType: '',
            msgSendType: '',
            name: '',
            num: 0,
            provinceId: 1,
            rehabilitationOther: '',
            rehabilitationType: '',
            securityOther: '',
            securityType: '',
            socialOther: '',
            socialType: '',
            specialOther: '',
            specialType: '',
            subdistrictId: '',
            supportOther: '',
            supportType: '',
            trainOther: '',
            trainType: '',
            updateAt: '',
            validFlag: '1',
            vipFlag: 0,
            vipLastTime: null,
            volunteerScore: ''
          }
        }
      } // 所有 的数据
    }
  },
  created() {
    this.getVipUserInfo(this.getOBJ)
  },
  methods: {
    // 获取所有数据
    getVipUserInfo(parame) {
      Public.getVipUserInfo(parame).then(res => {
        if (res.code === 200) {
          // this.titleInfo = res.data.titleInfo
          // this.basicInfo = res.data.basicInfo
          this.speciality = res.data.volInfo.speciality
          this.parameOBJ = res.data
        }

        // console.log(JSON.stringify(res.data))
      })
    },

    //修改标签弹窗
    modifyLabel() {
      alert('修改弹窗')
    },
    showInfo(index) {
      alert('显示或者隐藏数据')
    },
    // 显示 具体的营员信息
    showBenefitModel() {
      this.showBenefitModelFlag = true
    },
    // 显示更多孩子信息
    showMoreChildren() {
      this.moreChildren = true
    },
    // 跳转
    userDetaile() {
      this.$router.push({ name: 'user_details_hy' })
    },
    Log() {
      this.$router.push({ name: 'Login_hy' })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 50rem;
  margin: 0 auto;
}
.bk {
  border: 1px solid #e4e4e4;
}
.constant-title {
  padding: 0.5rem;
  background-color: #f3f3f3;
  border-bottom: 1px solid #e4e4e4;
}
.con {
  padding: 0.2rem 0.5rem;
}
.details {
  font-size: 16px;
  padding: 0.3rem;
  span:nth-child(1n + 2) {
    border-radius: 50%;
    border: 1px solid;
    padding: 0 0.5rem;
    margin: 0 0.1rem;
  }
}
.con-box {
  width: 15rem;
}
.ivu-form-item {
  margin: 0.2rem 0.5rem;
}
.masonry {
  -moz-column-count: 2;
  -webkit-column-count: 2;
  column-count: 2;
  -moz-column-gap: 2em;
  -webkit-column-gap: 2em;
  column-gap: 2em;
  margin: 2em auto;
}
.item {
  margin-bottom: 2em;
  -moz-page-break-inside: avoid;
  -webkit-column-break-inside: avoid;
}
.avatarPath {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  vertical-align: middle;
}
.content {
  width: 800px;
  margin: 0 auto;
}
.content-item {
  width: 300px;
  padding: 20px;
  padding-left: 20px;
  margin: 0 auto;
  margin-bottom: 20px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ivu-modal {
  width: 800px !important;
}

.disorderTypelist {
  display: flex;
  justify-content: space-between;
}

.disorderTypelist-item {
  display: inline-block;
  padding: 5px 20px;
  width: 33.3%;
}
</style>
