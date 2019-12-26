<!--编辑资料(志愿者)-->
<template>
  <div class="box">
    <div class="btn-box-top">
      <a href="javascript:;" @click="userDetaile()">用户详情</a>
      <a href="javascript:;" class="act-tn ">编辑资料</a>
      <a href="javascript:;" @click="Log()">登录日志</a>
    </div>

    <header class="header">
      <p class="title">{{ navigation1.head }}</p>
      <div class="userInfo">
        <div>
          <img
            class="avatarPath"
            v-if="parameOBJ.titleInfo.avatarPath"
            :src="parameOBJ.titleInfo.avatarPath"
          />
          <Avatar v-else icon="ios-person" size="large" />
          <span class="username">{{ parameOBJ.titleInfo.displayName }}</span>
        </div>
        <div>
          <span class="itemizes">分类 </span>
          <span
            class="itemize"
            v-for="item in parameOBJ.titleInfo.userRole.split(',')"
            :key="item"
            >{{ item }}</span
          >
        </div>
        <div style="flex:2">
          <span class="itemizes">标签 </span>
          <span
            lass="itemize"
            v-for="item in parameOBJ.titleInfo.userLabel"
            :key="item.labelId"
            >{{ item.labelName }}</span
          >
          <Icon type="ios-create" size="20" @click="modifyLabel" />
        </div>
      </div>
    </header>

    <div class="edit-box">
      <Row style="width:100%">
        <Col span="12">
          <div class="content-item" style="margin-right: 15px;">
            <div class="con-box  item">
              <div class="constant-title">
                <span>
                  基本信息
                </span>
                <a href="javascript:;" @click="showBasic">
                  显示/隐藏空值
                </a>
              </div>

              <Form
                ref="basic"
                :label-width="120"
                style="padding: 0.5rem"
                label-position="left"
              >
                <FormItem label="手机号" style="text-algin:left">
                  <p class="tel">{{ parameOBJ.basicInfo.info.tel }}</p>
                </FormItem>
                <FormItem label="昵称" v-show="basic.displayName">
                  <Input
                    type="text"
                    placeholder="点击输入"
                    v-model="parameOBJ.basicInfo.info.displayName"
                    style="width: 224px;"
                  ></Input>
                </FormItem>
                <FormItem label="身份证件类型">
                  <Select
                    v-model="parameOBJ.basicInfo.info.idcardType"
                    style="width: 224px;"
                  >
                    <Option
                      v-for="item in parameOBJ.basicInfo.idCardType"
                      :value="item.dicId"
                      :key="item.dicId"
                      >{{ item.dicName }}</Option
                    >
                  </Select>
                </FormItem>
                <FormItem label="证件号码" v-show="basic.idCard">
                  <Input
                    type="text"
                    placeholder="点击输入"
                    style="width: 224px;"
                    v-model="parameOBJ.basicInfo.info.idCard"
                  ></Input>
                </FormItem>
                <FormItem label="出生日期" v-show="basic.birthDay">
                  <DatePicker
                    type="date"
                    :clearable="false"
                    v-model="parameOBJ.basicInfo.info.birthDay"
                    placeholder="点击输入"
                    style="width: 224px;"
                  ></DatePicker>
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
                  <Selsect
                    :arr="[province, city, county]"
                    @change="idsactive"
                    :styles="224"
                  ></Selsect>
                </FormItem>
                <FormItem
                  prop="address"
                  label="详细地址"
                  v-show="basic.address"
                >
                  <Input
                    type="text"
                    style="width: 224px;"
                    v-model="parameOBJ.basicInfo.info.address"
                  ></Input>
                </FormItem>

                <FormItem label="创建时间" v-show="basic.createAt">
                  <p class="tel">{{ parameOBJ.basicInfo.info.createAt }}</p>
                </FormItem>
              </Form>
            </div>
          </div>
        </Col>
        <!-- style="margin-bottom:200px" -->
        <Col span="12">
          <div class="content-item">
            <!-- 志愿者信息 -->
            <div class="con-box bk item">
              <div class="constant-title flex-center-between">
                <span>
                  志愿者信息
                </span>
                <a href="javascript:;" @click="showVolInfo">
                  显示/隐藏空值
                </a>
              </div>
              <Form
                :label-width="120"
                style="padding: 0.5rem "
                label-position="left"
              >
                <FormItem label="特长">
                  <Select
                    multiple
                    v-model="speciality"
                    style="width: 224px;"
                    placeholder="请选择"
                  >
                    <Option
                      v-for="item in parameOBJ.volInfo.speciality"
                      :value="item.dicId + ''"
                      :key="item.dicId"
                      >{{ item.dicName }}</Option
                    >
                  </Select>
                </FormItem>
                <FormItem label="志愿者特长">
                  <Select
                    multiple
                    v-model="voluSpeciality"
                    style="width: 224px;"
                    placeholder="请选择"
                  >
                    <Option
                      v-for="item in parameOBJ.volInfo.volSpeciality"
                      :value="item.dicId + ''"
                      :key="item.dicId"
                      >{{ item.dicName }}</Option
                    >
                  </Select>
                </FormItem>
                <FormItem label="期待参加的活动种类">
                  <Select
                    multiple
                    v-model="actTypeLike"
                    style="width: 224px;"
                    placeholder="请选择"
                  >
                    <Option
                      v-for="item in parameOBJ.volInfo.volServerType"
                      :value="item.dicId + ''"
                      :key="item.dicId"
                      >{{ item.dicName }}</Option
                    >
                  </Select>
                </FormItem>
                <FormItem label="教育程度">
                  <Select
                    v-model="parameOBJ.volInfo.info.eduStatus"
                    style="width: 224px;"
                    placeholder="请选择"
                  >
                    <Option
                      v-for="item in parameOBJ.volInfo.education"
                      :value="item.dicId + ''"
                      :key="item.dicId"
                      >{{ item.dicName }}</Option
                    >
                  </Select>
                </FormItem>
                <FormItem label="邮箱" v-show="volInfo.email">
                  <Input
                    type="text"
                    style="width: 224px;"
                    v-model="parameOBJ.volInfo.info.email"
                  ></Input>
                </FormItem>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>

    <div class="btn-box">
      <a href="javascript:;" @click="setUpdata" class="btn">保存</a>
    </div>
    <!-- 弹窗 -->

    <Modal v-model="modallable" title="设置标签" @on-ok="onSetLabel">
      <CheckboxGroup v-model="userLabel">
        <Checkbox
          v-for="item in parameOBJ.titleInfo.label"
          :key="item.labelId"
          :label="item.labelId"
          >{{ item.labelName }}</Checkbox
        >
      </CheckboxGroup>
    </Modal>
  </div>
</template>

<script>
import Public from "./config/index";
import Selsect from "@/components/selsect";
export default {
  components: { Selsect },
  data() {
    return {
      stationFormFlag: true,
      navigation1: {
        head: "编辑资料(志愿者)"
      },
      formInline1: {
        photo: "13111111111",
        DateBirth: "",
        gender: "",
        IdCard: "",
        email: "",
        CreationTime: "2019-05-20   15:00"
      },
      cityList1: [
        { value: "option1", label: "男" },
        { value: "option2", label: "女" }
      ],
      formInline2: {
        ProfessionalCompetence: "",
        ServiceableTime: "",
        hobby: "",
        DegreeEducation: "",
        ServiceIntention: ""
      },
      cityList2: [{ value: "option1", label: "1" }],
      cityList3: [{ value: "option1", label: "工作日" }],
      cityList4: [{ value: "option1", label: "1" }],
      cityList5: [{ value: "option1", label: "1" }],
      cityList6: [{ value: "option1", label: "1" }],
      formInline5: {
        DonorType: "",
        cycle: "",
        lines: ""
      },
      cityList16: [
        { value: "option1", label: "月捐" },
        { value: "option2", label: "次捐" }
      ],
      cityList17: [{ value: "option1", label: "1" }],
      cityList18: [{ value: "option1", label: "1" }],
      formInline6: {
        note: ""
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
      actTypeLike: [],
      speciality: [],
      voluSpeciality: [],
      // end
      province: "",
      city: "",
      county: "",
      provinceArr: [], //省
      citiesArr: [], // 市
      countyArr: [], //区

      // 多选框数据end
      parameOBJ: {
        titleInfo: {}, //头部信息
        basicInfo: {
          idCardType: [], // 身份证件类型
          info: {
            // 个人信息
            proviceId: 0,
            birthDay: "",
            address: "",
            districtId: 0,
            displayName: "",
            idCard: "",
            sex: "1",
            idcardType: 0,
            tel: "",
            cityId: 1,
            createAt: ""
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
              disorderCard: "",
              disorderType: "",
              childSex: "",
              workExperience: "",
              childBirthday: "",
              typeDicId: "",
              point: "",
              childIdcard: "",
              clothingSize: "",
              eduExperience: "",
              childName: "",
              idcardType: "",
              diseaseDicIds: ""
            }
          ], //孩子信息
          homeMemberList: [
            {
              userPhone: "",
              userName: "",
              typeDicId: ""
            }
          ], // 家庭账号
          vipotherInfo: {
            activityOther: "",
            activityType: "",
            address: "",
            annualIncome: "",
            brothersAge: "",
            brothersDisorder: "",
            brothersStatus: "",
            cityId: 1,
            confluentOther: "",
            confluentType: [],
            countryId: "",
            createAt: "",
            createUserId: "",
            createUserPhone: '"',
            districtId: 1,
            haveBrothers: "",
            homeId: "",
            hopeOrgId: "",
            hopeOther: "",
            hopeOtherOrg: "",
            hopeType: "",
            improveFlag: "0",
            insuranceOther: "",
            insuranceType: "",
            interestOther: "",
            interestType: "",
            isMarried: "",
            livingOther: "",
            livingType: "",
            memberScore: 64,
            msgOtherSendType: "",
            msgSendType: "",
            name: "",
            num: 0,
            provinceId: 1,
            rehabilitationOther: "",
            rehabilitationType: "",
            securityOther: "",
            securityType: "",
            socialOther: "",
            socialType: "",
            specialOther: "",
            specialType: "",
            subdistrictId: "",
            supportOther: "",
            supportType: "",
            trainOther: "",
            trainType: "",
            updateAt: "",
            validFlag: "1",
            vipFlag: 0,
            vipLastTime: null,
            volunteerScore: ""
          }
        }
      }, // 所有 的数据
      getOBJ: {
        // 获取编辑详情的数据
        userId: this.$route.query.userId,
        sysType: "2"
      },
      userLabel: [],
      clothingSize: "",
      moreChildren: false, // 多个孩子
      showBenefitModelFlag: false,
      modallable: false, //设置标签
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
    };
  },
  watch: {
    province(newValue) {
      this.getcitiesArr(newValue);
    },
    city(newValue) {
      this.getcountyArr(newValue);
    }
  },
  mounted() {
    this.init();
    this.getVipUserInfo(this.getOBJ);
  },
  methods: {
    // 获取省市区信息
    init() {
      Public.orgcity().then(res => {
        this.provinceArr = res.data;
      });
    },
    getcitiesArr(id) {
      Public.orgprovince({ provinceId: id }).then(res => {
        this.citiesArr = res.data;
      });
    },
    getcountyArr(id) {
      Public.orgdistrict({ cityId: id }).then(res => {
        this.countyArr = res.data;
        // this.county = ''
      });
    },
    // 获取所有数据
    getVipUserInfo(parame) {
      Public.getVipUserInfo(parame).then(res => {
        if (res.code === 200) {
          this.actTypeLike = this.splitArr(res.data.volInfo.info.actTypeLike);
          this.speciality = this.splitArr(res.data.volInfo.info.speciality);
          this.voluSpeciality = this.splitArr(
            res.data.volInfo.info.voluSpeciality
          );
          // end

          this.userLabel = res.data.titleInfo.userLabel.map(item => {
            return item.labelId;
          });
          this.province = res.data.basicInfo.info.proviceId;
          this.city = res.data.basicInfo.info.cityId;
          this.county = res.data.basicInfo.info.districtId;

          this.parameOBJ = res.data;
        }
      });
    },
    setUpdata() {
      // 将多选题剔除保设置
      if (!this.stationFormFlag) return;
      this.stationFormFlag = false;
      let _basicInfo = this.parameOBJ.basicInfo.info;
      let _volInfo = this.parameOBJ.volInfo.info;
      let birthDay = this.util.formatDateYMD(
        new Date(_basicInfo.birthDay).getTime()
      );
      /**
         * actTypeLike

volSpeciality

voluSpeciality
         * 
         */

      let obj = {
        userId: this.$route.query.userId,
        basicInfo: {
          // 主信息
          address: _basicInfo.address,
          districtId: this.county,
          cityId: this.city,
          provinceId: this.province,
          sex: _basicInfo.sex,
          birthDay: birthDay,
          idCard: _basicInfo.idCard,
          idcardType: _basicInfo.idcardType,
          displayName: _basicInfo.displayName
        },
        volInfo: {
          // 志愿者信息
          eduStatus: _volInfo.eduStatus,
          actTypeLike: this.actTypeLike.toString(),
          voluSpeciality: this.voluSpeciality.toString(),
          speciality: this.speciality.toString(),
          email: _volInfo.email
        }
      };
      // console.log(JSON.stringify(obj))
      Public.setUpdate(obj).then(res => {
        if (res.code === 200) {
          this.$Message.info("修改成功");
          this.getVipUserInfo(this.getOBJ);
        } else {
          this.$Message.error("操作失败");
        }
        setTimeout(() => {
          this.stationFormFlag = true;
        }, 500);
      });
    },
    splitArr(str) {
      if (!str) return [];
      return str.split(",").filter(function(el) {
        return el != "";
      });
    },
    modifyLabel() {
      this.$Message.info("暂无此功能！");
      // this.modallable = true;
    },
    // 隐藏 空值
    showBasic() {
      let head = this.parameOBJ.basicInfo.info;
      let keys = Object.keys(this.basic);
      let newObj = {};
      keys.forEach(item => {
        if (this.basicFlag) {
          if (head[item]) {
            newObj[item] = true;
          } else {
            newObj[item] = false;
          }
          this.basicFlag = false;
        } else {
          this.basicFlag = true;
          newObj[item] = true;
        }
      });
      this.basic = newObj;
    },
    showVolInfo() {
      if (this.volInfoFlag) {
        console.log(this.parameOBJ.volInfo.info.email);
        if (this.parameOBJ.volInfo.info.email) {
          this.volInfo.email = true;
        } else {
          this.volInfo.email = false;
        }
        this.volInfoFlag = false;
      } else {
        this.volInfo.email = true;
        this.volInfoFlag = true;
      }
    },
    showBasic() {
      let head = this.parameOBJ.basicInfo.info;
      let keys = Object.keys(this.basic);
      let newObj = {};
      keys.forEach(item => {
        if (this.basicFlag) {
          if (head[item]) {
            newObj[item] = true;
          } else {
            newObj[item] = false;
          }
          this.basicFlag = false;
        } else {
          this.basicFlag = true;
          newObj[item] = true;
        }
      });
      this.basic = newObj;
    },
    showUserInfo() {
      let head = this.parameOBJ.memInfo.userInfo;
      let keys = Object.keys(this.userInfo);
      let keys2 = Object.keys(this.checkout);
      let newObj = {};
      let newObj2 = {};
      let flag = this.userInfoFlag;
      if (flag) {
        keys.forEach(item => {
          if (head[item]) {
            newObj[item] = true;
          } else {
            newObj[item] = false;
          }
        });
        keys2.forEach(item => {
          if (this[item].lenght > 0) {
            newObj2[item] = true;
          } else {
            newObj2[item] = false;
          }
        });
        this.userInfoFlag = !flag;
      } else {
        keys.forEach(item => {
          newObj[item] = true;
        });
        keys2.forEach(item => {
          newObj2[item] = true;
        });
        this.userInfoFlag = !flag;
      }

      this.userInfo = newObj;
      this.checkout = newObj2;
    },
    // 设置标签 确定按钮
    onSetLabel() {
      Public.SetUserLabel({
        userId: this.$route.query.userId,
        labelIds: this.userLabel.toString(),
        sysType: "1"
      }).then(res => {
        if (res.code === 200) {
          this.$Message.info("设置标签成功");
          this.getVipUserInfo(this.getOBJ);
        } else {
          this.$Message.error({
            background: true,
            content: "设置标签失败，请稍后再试"
          });
          console.log(res.msg);
        }
      });
    },
    userDetaile() {
      this.$router.push({
        name: "user_details_zyz",
        query: {
          userId: this.$route.query.userId
        }
      });
    },
    Log() {
      this.$router.push({
        name: "Login_zyz",
        query: {
          userId: this.$route.query.userId
        }
      });
    },
    // 显示 具体的营员信息
    showBenefitModel() {
      this.showBenefitModelFlag = true;
    },
    // 显示更多孩子信息
    showMoreChildren() {
      this.moreChildren = true;
    },
    idsactive(res) {
      if (res[0]) {
        this.province = res[0];
      }
      if (res[1]) {
        this.city = res[1];
      }
      if (res[2]) {
        this.county = res[2];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// .main {
//   width: 50rem;
//   margin: 0 auto;
// }
// .bk {
//   border: 1px solid #e4e4e4;
// }
// .constant-title {
//   padding: 0.5rem;
//   background-color: #f3f3f3;
//   border-bottom: 1px solid #e4e4e4;
// }
// .con {
//   padding: 0.2rem 0.5rem;
// }
// .details {
//   font-size: 16px;
//   padding: 0.3rem;
//   span:nth-child(1n + 2) {
//     border-radius: 50%;
//     border: 1px solid;
//     padding: 0 0.5rem;
//     margin: 0 0.1rem;
//   }
// }
// .con-box {
//   width: 15rem;
// }
// .ivu-form-item {
//   margin: 0.2rem 0.5rem;
// }
// .masonry {
//   -moz-column-count: 3;
//   -webkit-column-count: 3;
//   column-count: 3;
//   -moz-column-gap: 2em;
//   -webkit-column-gap: 2em;
//   column-gap: 2em;
//   margin: 2em auto;
// }
// .item {
//   margin-bottom: 2em;
//   // -moz-page-break-inside: avoid;
//   -webkit-column-break-inside: avoid;
//   break-inside: avoid;
// }
// .avatarPath {
//   width: 46px;
//   height: 46px;
//   border-radius: 50%;
//   vertical-align: middle;
// }
// .content {
//   width: 800px;
//   margin: 0 auto;
// }
// .content-item {
//   width: 300px;
//   padding: 20px;
//   padding-left: 20px;
//   margin: 0 auto;
//   margin-bottom: 20px;
// }
// .header {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// }

.main {
  width: 50rem;
  margin: 0 auto;
}

.constant-title {
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #1b2331;
  font-weight: 800;
  a {
    font-size: 14px;
    color: #8e9192;
    text-align: right;
  }
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
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
  padding: 20px;
  margin: 0 auto;
  margin-bottom: 20px;
}
// .header {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// }
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
  display: block;
  width: 110px;
  height: 32px;
  line-height: 32px;
  background: #ff565a;
  border-radius: 15px;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
}
.btn-box {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  margin-bottom: 100px;
}

.box {
  padding-top: 26px;
}

.btn-box-top a {
  display: inline-block;
  width: 104px;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  color: #8e9192;
  text-align: center;
  margin: 0 5px;
}

.btn-box-top .act-tn {
  background: #ffffff;
  border-radius: 20px;
  font-size: 15px;
  color: #1b2331;
}

.header {
  margin-top: 20px;
  height: 162px;
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
  padding: 22px 30px;
}
.userInfo {
  display: flex;
  align-items: center;
  padding: 30px 0;
  img {
    vertical-align: middle;
  }
  div {
    flex: 1;
  }
}
.title {
  font-size: 18px;
  color: #1b2331;
  font-weight: 800;
}
.username {
  margin-left: 20px;
  font-size: 18px;
  color: #1b2331;
}
.itemizes {
  font-size: 15px;
  color: #1b2331;
}

.itemize {
  display: inline-block;
  margin: 0 5px;
  padding: 0 10px;
  background: #fef4f5;
  border-radius: 15px;
  font-size: 14px;
  color: #fd585e;
  line-height: 32px;
}
.noitemize {
  display: inline-block;
  margin: 0 5px;
  padding: 0 10px;
  background: #ccc;
  border-radius: 15px;
  font-size: 14px;
  color: #fff;
  line-height: 32px;
}
.edit-box {
  display: flex;
  margin-top: 15px;
}
.edit-item {
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
  padding: 30px 30px;
}
.tel {
  width: 280px;
  padding: 0 5px;
  line-height: 30px;
  border: 1px solid #cccccc;
}
.modelheader {
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    font-size: 14px;
    color: #8e9192;
    text-align: right;
  }
}

.footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 60px;
}
.modelbtn {
  display: block;
  width: 110px;
  height: 32px;
  line-height: 32px;
  background: #ff565a;
  border-radius: 15px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
}
.show-btn {
  font-size: 15px;
  color: #ff565a;
  text-align: right;
  vertical-align: center;
}
p {
  font-size: 16px;
  height: 1.5rem;
}
</style>
