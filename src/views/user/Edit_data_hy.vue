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
                <a href="javascript:;" @click='showBasic'>
                  显示/隐藏空值
                </a>
              </div>

              <Form ref="basic" :label-width="120" style="padding: 0.5rem" label-position='left'>
                <FormItem label="手机号" style="text-algin:left">
                  <p>{{parameOBJ.basicInfo.info.tel}}</p>
                </FormItem>
                <FormItem label="昵称" v-show="basic.displayName">
                  <Input type="text" placeholder="点击输入" v-model="parameOBJ.basicInfo.info.displayName" style="width:180px"></Input>
                </FormItem>
                <FormItem label="身份证件类型">
                  <Select v-model="parameOBJ.basicInfo.info.idcardType" style="width:180px">
                    <Option v-for="item in parameOBJ.basicInfo.idCardType" :value="item.dicId" :key="item.dicId">{{ item.dicName }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="证件号码" v-show="basic.idCard">
                  <Input type="text" placeholder="点击输入" style="width:180px" v-model="parameOBJ.basicInfo.info.idCard"></Input>
                </FormItem>
                <FormItem label="出生日期" v-show="basic.birthDay">
                  <DatePicker type="date" :clearable="false" v-model="parameOBJ.basicInfo.info.birthDay" placeholder="点击输入" style="width:180px"></DatePicker>
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

                <FormItem prop="province" label="省市区">
                  <Selsect :arr='[province,city,county,]' @change='idsactive'></Selsect>
                </FormItem>
                <FormItem prop="address" label="详细地址" v-show="basic.address">
                  <Input type="text" style="width:180px" v-model="parameOBJ.basicInfo.info.address"></Input>
                </FormItem>

                <FormItem label="创建时间" v-show="basic.createAt">
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
                <a href="javascript:;" @click='showVolInfo'>
                  显示/隐藏空值
                </a>
              </div>
              <Form :label-width="120" style="padding: 0.5rem " label-position='left'>
                <FormItem label="特长">
                  <Select v-model="parameOBJ.volInfo.info.speciality" style="width:180px" placeholder="请选择">
                    <Option v-for="item in parameOBJ.volInfo.speciality" :value="item.dicId+''" :key='item.dicId'>{{item.dicName}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="志愿者特长">
                  <Select v-model="parameOBJ.volInfo.info.voluSpeciality" style="width:180px" placeholder="请选择">
                    <Option v-for="item in parameOBJ.volInfo.volSpeciality" :value="item.dicId+''" :key='item.dicId'>{{ item.dicName }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="期待参加的活动种类">
                  <Select v-model="parameOBJ.volInfo.info.actTypeLike" style="width:180px" placeholder="请选择">
                    <Option v-for="item in parameOBJ.volInfo.volServerType" :value="item.dicId+''" :key='item.dicId'>{{ item.dicName }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="教育程度">
                  <Select v-model="parameOBJ.volInfo.info.eduStatus" style="width:180px" placeholder="请选择">
                    <Option v-for="item in parameOBJ.volInfo.education" :value="item.dicId+''" :key='item.dicId'>{{ item.dicName }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="邮箱" v-show="volInfo.email">
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
            <div class="btn-box"> <Button @click="setUpdata" class='btn' type="success">保存</Button></div>
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
        <span style="text-align:right; margin-right: 30px">
          <a href="javascript:;" @click='showUserInfo'>
            显示/隐藏空值
          </a>
        </span>

      </p>
      <div>
        <Row>
          <Col span="12">
          <Form :label-width="140" style="padding: 0.5rem" label-position='left'>
            <FormItem label="VIP到期时间" v-show="userInfo.vipLastTime">
              <p>{{  parameOBJ.memInfo.userInfo.vipLastTime || '暂无数据'}}</p>
            </FormItem>
            <FormItem label="姓名" v-show="userInfo.userName">
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
            <FormItem label="会员服装尺码">
              <Select v-model="clothingSize" style="width:180px" placeholder="请选择">
                <Option v-for="item in parameOBJ.memInfo.clothingSize" :value="item.dicId" :key='item.dicId'>{{ item.dicName }}</Option>
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
            <FormItem label="是否患有其他疾病">
              <p style='padding:0; width:70%;' v-if="parameOBJ.memInfo.childsInfo[0].disorderType.length>0" class='disorderTypelist-item ' v-for="item in parameOBJ.memInfo.childsInfo[0].disorderType.split(',')">{{item}}</p>
              <p v-else class='disorderTypelist-item'>无</p>
            </FormItem>
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
            <FormItem label="如有，年龄为" v-show="vipInfo.brothersAge">
              <Input type="text" placeholder="请输入年龄" v-model="parameOBJ.memInfo.vipotherInfo.brothersAge" style="width:180px"></Input>
            </FormItem>
            <FormItem label="手足的现有状态">
              <Select v-model="parameOBJ.memInfo.vipotherInfo.brothersStatus" style="width:180px" placeholder="请选择">
                <Option v-for="item in parameOBJ.memInfo.listStatusType" :value="item.dicId+''" :key='item.dicId'>{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="成年心智障碍者婚姻状况">
              <RadioGroup v-model="parameOBJ.memInfo.vipotherInfo.isMarried">
                <Radio label="1">
                  <span>已婚</span>
                </Radio>
                <Radio label="0">
                  <span>未婚</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="年收入范围">
              <Select v-model="parameOBJ.memInfo.vipotherInfo.annualIncome" style="width:180px" placeholder="请选择">
                <Option v-for="item in parameOBJ.memInfo.listInCome" :value="item.dicId" :key='item.dicId'>{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="所在家长小组" v-show="userInfo.orgName">
              <p>{{parameOBJ.memInfo.userInfo.orgName}}</p>
            </FormItem>
            <FormItem label="目前孩子有哪些社会保障" v-show="checkout.securityType">
              <CheckboxGroup v-model="securityType">
                <Checkbox v-if="item.name!=='其他'" v-for='item in parameOBJ.memInfo.listSecurity' :key='item.dicId' :label="item.dicId+''">
                  {{item.name}}
                </Checkbox>
                <Checkbox style='display:flex; align-items: center; ' v-else :label="item.dicId+''">
                  <p style='width: 35px;'> {{item.name}}</p>
                  <Input v-model="parameOBJ.memInfo.vipotherInfo.securityOther" placeholder="请输入" style="width: 150px" />
                </Checkbox>
              </CheckboxGroup>

            </FormItem>

            <FormItem label="是否自行购买相关商业保险*" v-show="checkout.insuranceType">
              <CheckboxGroup v-model="insuranceType">
                <Checkbox v-if="item.name!=='其他'" v-for='item in parameOBJ.memInfo.listInsurance' :key='item.dicId' :label="item.dicId+''">{{item.name}} </Checkbox>
                <Checkbox style='display:flex; align-items: center; ' v-else :label="item.dicId +''">
                  <p style='width: 35px;'> {{item.name}}</p>
                  <Input v-model="parameOBJ.memInfo.vipotherInfo.insuranceOther" placeholder="请输入" style="width: 150px" />
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="家庭希望孩子能获得哪方面的服务支持*" v-show='checkout.supportType'>
              <CheckboxGroup v-model="supportType">
                <Checkbox v-if="item.name!=='其他'" v-for='item in parameOBJ.memInfo.listSupport' :key='item.dicId' :label="item.dicId+''">{{item.name}} </Checkbox>
                <Checkbox style='display:flex; align-items: center;' v-else :label="item.dicId+''">
                  <p style='width: 35px;'> {{item.name}}</p>
                  <Input v-model="parameOBJ.memInfo.vipotherInfo.supportOther" placeholder="请输入" style="width: 150px" />
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Form>

          </Col>
          <Col span="12">
          <Form :label-width="120" style="padding: 0.5rem" label-position='left'>
            <FormItem label="融合教育*" v-show="checkout.confluentType">
              <CheckboxGroup v-model="confluentType">
                <Checkbox v-if="item.name!=='其他'" v-for='item in parameOBJ.memInfo.listConfluent' :key='item.dicId' :label="item.dicId+''">{{item.name}} </Checkbox>
                <Checkbox style='display:flex; align-items: center;' v-else :label="item.dicId+''">
                  <p style='width: 35px;'> {{item.name}}</p>
                  <Input v-model="parameOBJ.memInfo.vipotherInfo.confluentOther" placeholder="请输入" style="width: 150px" />
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="康复支持*" v-show="checkout.rehabilitationType">
              <CheckboxGroup v-model="rehabilitationType">
                <Checkbox v-if="item.name!=='其他'" v-for='item in parameOBJ.memInfo.listRehabilitation' :key='item.dicId' :label="item.dicId+''">{{item.name}} </Checkbox>
                <Checkbox style='display:flex; align-items: center;' v-else :label="item.dicId+''">
                  <p style='width: 35px;'> {{item.name}}</p>
                  <Input v-model="parameOBJ.memInfo.vipotherInfo.rehabilitationOther" placeholder="请输入" style="width: 150px" />
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="职业培训及就业*" v-show='checkout.trainType'>
              <CheckboxGroup v-model="trainType">
                <Checkbox v-if="item.name!=='其他'" v-for='item in parameOBJ.memInfo.listTrain' :key='item.dicId' :label="item.dicId+''">{{item.name}} </Checkbox>
                <Checkbox style='display:flex; align-items: center;' v-else :label="item.dicId+''">
                  <p style='width: 35px;'> {{item.name}}</p>
                  <Input v-model="parameOBJ.memInfo.vipotherInfo.trainOther" placeholder="请输入" style="width: 150px" />
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="自主生活*" v-show="checkout.livingType">
              <CheckboxGroup v-model="livingType">
                <Checkbox v-if="item.name!=='其他'" v-for='item in parameOBJ.memInfo.listLiving' :key='item.dicId' :label="item.dicId+''">{{item.name}} </Checkbox>
                <Checkbox style='display:flex; align-items: center;' v-else :label="item.dicId+''">
                  <p style='width: 35px;'> {{item.name}}</p>
                  <Input v-model="parameOBJ.memInfo.vipotherInfo.livingOther" placeholder="请输入" style="width: 150px" />
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="社会融合*" v-show="checkout.socialType">
              <CheckboxGroup v-model="socialType">
                <Checkbox v-if="item.name!=='其他'" v-for='item in parameOBJ.memInfo.listSocial' :key='item.dicId' :label="item.dicId+''">{{item.name}} </Checkbox>
                <Checkbox style='display:flex; align-items: center;' v-else :label="item.dicId+''">
                  <p style='width: 35px;'> {{item.name}}</p>
                  <Input v-model="parameOBJ.memInfo.vipotherInfo.socialOther" placeholder="请输入" style="width: 150px" />
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="家长希望获得的支持*" v-show="checkout.hopeType">
              <CheckboxGroup v-model="hopeType">
                <Checkbox v-if="item.name!=='其他'" v-for='item in parameOBJ.memInfo.listHope' :key='item.dicId' :label="item.dicId+''">{{item.name}} </Checkbox>
                <Checkbox style='display:flex; align-items: center;' v-else :label="item.dicId+''">
                  <p style='width: 35px;'> {{item.name}}</p>
                  <Input v-model="parameOBJ.memInfo.vipotherInfo.hopeOther" placeholder="请输入" style="width: 150px" />
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="如参加专题培训，倾向主题为*" v-show="checkout.specialType">
              <CheckboxGroup v-model="specialType">
                <Checkbox v-if="item.name!=='其他'" v-for='item in parameOBJ.memInfo.listSpecial' :key='item.dicId' :label="item.dicId+''">{{item.name}} </Checkbox>
                <Checkbox style='display:flex; align-items: center;' v-else :label="item.dicId+''">
                  <p style='width: 35px;'> {{item.name}}</p>
                  <Input v-model="parameOBJ.memInfo.vipotherInfo.specialOther" placeholder="请输入" style="width: 150px" />
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="作为会员，我(家长)的优势和感兴趣的事情*" v-show="checkout.interestType">
              <CheckboxGroup v-model="interestType">
                <Checkbox v-if="item.name!=='其他'" v-for='item in parameOBJ.memInfo.listInterest' :key='item.dicId' :label="item.dicId+''">{{item.name}} </Checkbox>
                <Checkbox style='display:flex; align-items: center;' v-else :label="item.dicId+''">
                  <p style='width: 35px;'> {{item.name}}</p>
                  <Input v-model="parameOBJ.memInfo.vipotherInfo.interestOther" placeholder="请输入" style="width: 150px" />
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="融爱融乐现有活动中，您所感兴趣的包括*" v-show='checkout.activityType'>
              <CheckboxGroup v-model="activityType">
                <Checkbox v-if="item.name!=='其他'" v-for='item in parameOBJ.memInfo.listActivity' :key='item.dicId' :label="item.dicId+''">{{item.name}} </Checkbox>
                <Checkbox style='display:flex; align-items: center;' v-else :label="item.dicId+''">
                  <p style='width: 35px;'> {{item.name}}</p>
                  <Input v-model="parameOBJ.memInfo.vipotherInfo.activityOther" placeholder="请输入" style="width: 150px" />
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="融爱融乐现有小组中，您希望加入*" v-show="checkout.hopeOrgId">
              <CheckboxGroup v-model="hopeOrgId">
                <Checkbox v-for='item in parameOBJ.memInfo.listOrg' :key='item.dicId' :label="item.dicId+''">{{item.name}} </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="会员信息推动方式*" v-show="checkout.msgSendType">
              <CheckboxGroup v-model="msgSendType">
                <Checkbox v-if="item.name!=='其他'" v-for='item in parameOBJ.memInfo.listMsgSend' :key='item.dicId' :label="item.dicId+''">{{item.name}} </Checkbox>
                <Checkbox style='display:flex; align-items: center;' v-else :label="item.dicId+''">
                  <p style='width: 35px;'> {{item.name}}</p>
                  <Input v-model="parameOBJ.memInfo.vipotherInfo.msgOtherSendType" placeholder="请输入" style="width: 150px" />
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="家庭账号成员*">
              <p v-for="item in parameOBJ.memInfo.homeMemberList">
                {{item.userName}} {{item.typeDicId}} {{item.userPhone}}
              </p>
            </FormItem>

          </Form>
          </Col>

        </Row>
      </div>

      <div slot="footer">
        <Button type="text" size="large"></Button>
        <Button type="text" size="large" @click="setUpdata(2)">保存</Button>
      </div>
    </Modal>
    <Modal v-model="modallable" title="设置标签" @on-ok="onSetLabel">
      <CheckboxGroup v-model="userLabel">
        <Checkbox v-for="item in parameOBJ.titleInfo.label" :key='item.labelId' :label="item.labelId">{{item.labelName}}</Checkbox>
      </CheckboxGroup>
    </Modal>
  </div>
</template>

<script>
import Public from './config/index'
import Selsect from '@/components/selsect'
export default {
  components: { Selsect },
  data() {
    return {
      navigation1: {
        head: '编辑资料(会员)'
      },
      //  多选框的数据 选中的数据
      securityType: [],
      insuranceType: [],
      supportType: [],
      rehabilitationType: [],
      confluentType: [],
      trainType: [],
      livingType: [],
      socialType: [],
      hopeType: [],
      specialOther: [],
      activityType: [],
      hopeOrgId: [],
      msgSendType: [],
      specialType: [],
      interestType: [],
      // 多选框数据end

      formInline5: {
        DonorType: '',
        cycle: '',
        lines: ''
      },
      clothingSize: '',
      province: '',
      city: '',
      county: '',
      provinceArr: [], //省
      citiesArr: [], // 市
      countyArr: [], //区

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
      modallable: false, //设置标签
      userLabel: [],
      labelcheckout: [],
      labelList_c: [],
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
            confluentType: [],
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
      }, // 所有 的数据
      basic: {
        displayName: true,
        idCard: true,
        birthDay: true,
        address: true,
        createAt: true
      },
      volInfo: {
        email: true
      },
      userInfo: {
        userName: true,
        vipLastTime: true,
        orgName: true
      },
      vipInfo: {
        brothersAge: true
      },
      checkout: {
        securityType: true,
        insuranceType: true,
        supportType: true,
        rehabilitationType: true,
        confluentType: true,
        trainType: true,
        livingType: true,
        socialType: true,
        hopeType: true,
        activityType: true,
        hopeOrgId: true,
        msgSendType: true,
        specialType: true,
        interestType: true
      },
      basicFlag: true,
      volInfoFlag: true,
      userInfoFlag: true
    }
  },
  created() {
    this.getVipUserInfo(this.getOBJ)
  },
  watch: {},
  methods: {
    // 获取省市区信息
    init() {
      Public.orgcity().then(res => {
        this.provinceArr = res.data
      })
    },
    getcitiesArr(id) {
      Public.orgprovince({ provinceId: id }).then(res => {
        this.citiesArr = res.data
      })
    },
    getcountyArr(id) {
      Public.orgdistrict({ cityId: id }).then(res => {
        this.countyArr = res.data
        // this.county = ''
      })
    },

    // 获取所有数据
    getVipUserInfo(parame) {
      Public.getVipUserInfo(parame).then(res => {
        if (res.code === 200) {
          let data = res.data.memInfo.vipotherInfo
          // 将 多选框的数据保存起来
          this.securityType = this.splitArr(data.securityType)
          this.supportType = this.splitArr(data.supportType)
          this.confluentType = this.splitArr(data.confluentType)
          this.trainType = this.splitArr(data.trainType)
          this.livingType = this.splitArr(data.livingType)
          this.socialType = this.splitArr(data.socialType)
          this.hopeType = this.splitArr(data.hopeType)
          this.specialOther = this.splitArr(data.specialOther)
          this.activityType = this.splitArr(data.activityType)
          this.msgSendType = this.splitArr(data.msgSendType)
          this.hopeOrgId = this.splitArr(data.hopeOrgId)
          this.insuranceType = this.splitArr(data.insuranceType)
          this.interestType = this.splitArr(data.interestType)
          this.specialType = this.splitArr(data.specialType)
          // end

          this.userLabel = res.data.titleInfo.userLabel.map(item => {
            return item.labelId
          })

          this.province = res.data.basicInfo.info.proviceId
          this.city = res.data.basicInfo.info.cityId
          this.county = res.data.basicInfo.info.districtId

          // this.getcitiesArr(res.data.basicInfo.info.proviceId)
          // this.getcountyArr(res.data.basicInfo.info.cityId)

          this.parameOBJ = res.data
        }

        // console.log(JSON.stringify(res.data))
      })
    },
    setUpdata() {
      // 将多选题剔除保设置

      let _basicInfo = this.parameOBJ.basicInfo.info
      let _volInfo = this.parameOBJ.volInfo.info
      let _memInfo = this.parameOBJ.memInfo.vipotherInfo
      let _userInfo = this.parameOBJ.memInfo.userInfo

      let obj = {
        userId: this.$route.query.userId,
        basicInfo: {
          // 主信息
          address: _basicInfo.address,
          districtId: this.county,
          cityId: this.city,
          provinceId: this.province,
          sex: _basicInfo.sex,
          birthDay: _basicInfo.birthDay,
          idCard: _basicInfo.idCard,
          idcardType: _basicInfo.idcardType,
          displayName: _basicInfo.displayName
        },
        volInfo: {
          // 志愿者信息
          eduStatus: _volInfo.eduStatus,
          actTypeLike: _volInfo.actTypeLike,
          voluSpeciality: _volInfo.voluSpeciality,
          speciality: _volInfo.speciality,
          email: _volInfo.email
        },
        memInfo: {
          // 会员信息
          annualIncome: _memInfo.annualIncome,
          msgOtherSendType: _memInfo.msgOtherSendType,
          msgSendType: this.msgSendType.toString(),
          hopeOtherOrg: _memInfo.hopeOtherOrg,
          hopeOrgId: this.hopeOrgId.toString(),
          activityOther: _memInfo.activityOther,
          activityType: this.activityType.toString(),
          interestOther: _memInfo.interestOther,
          interestType: this.interestType.toString(),
          specialOther: _memInfo.specialOther,
          specialType: this.specialType.toString(),
          hopeOther: _memInfo.hopeOther,
          hopeType: this.hopeType.toString(),
          socialOther: _memInfo.socialOther,
          socialType: this.socialType.toString(),
          livingOther: _memInfo.livingOther,
          livingType: this.livingType.toString(),
          trainOther: _memInfo.trainOther,
          trainType: this.trainType.toString(),
          rehabilitationOther: _memInfo.rehabilitationOther,
          rehabilitationType: this.rehabilitationType.toString(),
          confluentOther: _memInfo.confluentOther,
          confluentType: this.confluentType.toString(),
          supportOther: _memInfo.supportOther,
          supportType: this.supportType.toString(),
          insuranceOther: _memInfo.insuranceOther,
          insuranceType: this.insuranceType.toString(),
          securityOther: _memInfo.securityOther,
          securityType: this.securityType.toString(),
          isMarried: _memInfo.isMarried,
          brothersStatus: _memInfo.brothersStatus,
          brothersAge: _memInfo.brothersAge,
          brothersDisorder: _memInfo.brothersDisorder,
          haveBrothers: _memInfo.haveBrothers,
          clothingSize: this.clothingSize,
          jobDicId: _userInfo.jobDicId,
          typeDicId: _userInfo.typeDicId,
          userName: _userInfo.userName
        }
      }
      // console.log(JSON.stringify(obj))
      Public.setUpdate(obj).then(res => {
        if (res.code === 200) {
          this.$Message.info('修改成功')
          this.getVipUserInfo(this.getOBJ)
        } else {
          this.$Message.error('操作失败')
        }
        this.showBenefitModelFlag = false
      })
    },
    splitArr(str) {
      return str.split(',').filter(function(el) {
        return el != ''
      })
    },
    idsactive(res) {
      if (res[0]) {
        this.province = res[0]
      }
      if (res[1]) {
        this.city = res[1]
      }
      if (res[2]) {
        this.county = res[2]
      }
    },
    //修改标签弹窗
    modifyLabel() {
      this.modallable = true
    },
    // 隐藏 空值
    showBasic() {
      let head = this.parameOBJ.basicInfo.info
      let keys = Object.keys(this.basic)
      let newObj = {}
      keys.forEach(item => {
        if (this.basicFlag) {
          if (head[item]) {
            newObj[item] = true
          } else {
            newObj[item] = false
          }
          this.basicFlag = false
        } else {
          this.basicFlag = true
          newObj[item] = true
        }
      })
      this.basic = newObj
    },
    showVolInfo() {
      if (this.volInfoFlag) {
        console.log(this.parameOBJ.volInfo.info.email)
        if (this.parameOBJ.volInfo.info.email) {
          this.volInfo.email = true
        } else {
          this.volInfo.email = false
        }
        this.volInfoFlag = false
      } else {
        this.volInfo.email = true
        this.volInfoFlag = true
      }
    },
    showBasic() {
      let head = this.parameOBJ.basicInfo.info
      let keys = Object.keys(this.basic)
      let newObj = {}
      keys.forEach(item => {
        if (this.basicFlag) {
          if (head[item]) {
            newObj[item] = true
          } else {
            newObj[item] = false
          }
          this.basicFlag = false
        } else {
          this.basicFlag = true
          newObj[item] = true
        }
      })
      this.basic = newObj
    },
    showUserInfo() {
      let head = this.parameOBJ.memInfo.userInfo
      let keys = Object.keys(this.userInfo)
      let keys2 = Object.keys(this.checkout)
      let newObj = {}
      let newObj2 = {}
      let flag = this.userInfoFlag
      if (flag) {
        keys.forEach(item => {
          if (head[item]) {
            newObj[item] = true
          } else {
            newObj[item] = false
          }
        })
        keys2.forEach(item => {
          if (this[item].lenght > 0) {
            newObj2[item] = true
          } else {
            newObj2[item] = false
          }
        })
        this.userInfoFlag = !flag
      } else {
        keys.forEach(item => {
          newObj[item] = true
        })
        keys2.forEach(item => {
          newObj2[item] = true
        })
        this.userInfoFlag = !flag
      }

      this.userInfo = newObj
      this.checkout = newObj2
    },

    // 显示 具体的营员信息
    showBenefitModel() {
      this.showBenefitModelFlag = true
    },
    // 显示更多孩子信息
    showMoreChildren() {
      this.moreChildren = true
    },
    // 设置标签 确定按钮
    onSetLabel() {
      Public.SetUserLabel({
        userId: this.$route.query.userId,
        labelIds: this.userLabel.toString(),
        sysType: '1'
      }).then(res => {
        if (res.code === 200) {
          this.$Message.info('设置标签成功')
          this.getVipUserInfo(this.getOBJ)
        } else {
          this.$Message.error({
            background: true,
            content: '设置标签失败，请稍后再试'
          })
          console.log(res.msg)
        }
      })
    },
    // 跳转
    userDetaile() {
      this.$router.push({
        name: 'user_details_hy',
        query: {
          userId: this.$route.query.userId
        }
      })
    },
    Log() {
      this.$router.push({
        name: 'Login_hy',
        query: {
          userId: this.$route.query.userId
        }
      })
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
  // -moz-page-break-inside: avoid;
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
.btn {
  width: 200px;
  height: 60px;
  border-radius: 20px;
}
.btn-box {
  margin: 0 auto;
}
</style>
