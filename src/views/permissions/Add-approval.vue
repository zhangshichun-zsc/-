<!--设置审批流程（共用）-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="150"
      >
        <FormItem label="审批类型:" prop="typeFlag">
          <Select
            placeholder="立项审批、家长小组成立审批、志愿者团队成立审批、积分修改审批、VIP修改审批"
            style="width: 20rem"
            v-model="formValidate.typeFlag"
            :transfer="true"
          >
            <p>{{ typelist }}</p>
            <Option
              v-for="item in typelist"
              :value="item.dicCode"
              :key="item.dicCode"
              >{{ item.dataValue }}</Option
            >
          </Select>
        </FormItem>
        <FormItem v-show="flag_show" label="谁可以发起申请:" prop="applyRoles">
          <Select v-model="formValidate.applyRoles" style="width:200px">
            <Option
              v-for="item in rolelist"
              :value="item.roleId"
              :key="item.roleId"
              :transfer="true"
              >{{ item.roleName }}</Option
            >
          </Select>
        </FormItem>
        <FormItem v-show="flag_show" label="项目所属:" prop="categoryId">
          <Select
            placeholder="快乐活动营"
            style="width: 10rem"
            v-model="formValidate.categoryId"
          >
            <Option
              v-for="item in projectlist"
              :value="item.categoryId"
              :key="item.categoryId"
              :transfer="true"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
      </Form>
      <div
        class="Select-level flex-start"
        style="width: 38rem;
                margin: 0 auto;"
      >
        <div class="Level-1">
          <h2>选择一级审批</h2>
          <ul>
            <li
              v-for="(item, index) in prolist"
              :class="{ 'flex-center-between': true, active: item.active }"
              :key="item.userId"
              :value="item.userId"
              @click="class1(item, index)"
            >
              <span>{{ item.userName }}</span>
              <Icon type="ios-arrow-forward" />
            </li>
          </ul>
        </div>

        <div class="Level-2">
          <h2>选择二级审批</h2>
          <ul>
            <li
              :class="{ 'flex-center-between': true, active: item.active }"
              v-for="(item, index) in prolisttwo"
              :key="item.userId"
              :value="item.userId"
              @click="class2(item, index)"
            >
              <span>{{ item.userName }}</span>
              <Icon type="ios-arrow-forward" />
            </li>
          </ul>
        </div>
      </div>
      <div style="margin: 20px;">
        <span>您当前选择的审核流程是:</span>

        <span style="color: #ed4014;">
          提交人:
          <Icon v-show="userNamea" type="md-fastforward" />
          &nbsp;{{ userNamea }}&nbsp;
          <Icon v-show="userNameb" type="md-fastforward" />
          &nbsp;{{ userNameb }}&nbsp;
        </span>
      </div>
    </div>
    <Button type="error" @click="det('formValidate')">保存</Button>
  </div>
</template>

<script>
import {
  poweradd,
  powertype,
  powerPer,
  powerApply,
  AgreementNewList
} from "../../request/api";
export default {
  data() {
    return {
      formFlag: true,
      navigation1: {
        head: "设置审批流程（共用）"
      },
      formValidate: {
        typeFlag: null,
        applyRoles: 0,
        categoryId: null
      },
      ruleValidate: {
        typeFlag: [
          {
            required: true,
            message: "必选项",
            trigger: "change",
            type: "number"
          }
        ],
        applyRoles: [
          {
            required: true,
            type: "number",
            message: "必选项",
            trigger: "change"
          }
        ],
        categoryId: [
          {
            required: true,
            message: "必选项",
            trigger: "change",
            type: "number"
          }
        ]
      },
      sysType: 1,
      typelist: [],
      prolist: [],
      prolisttwo: [],
      rolelist: [],
      projectlist: [],
      auditUser1Id: null,
      userNamea: null,
      auditUser2Id: null,
      userNameb: null,
      enableFLag: 1,
      flag_show: false
    };
  },
  watch: {
    "formValidate.typeFlag"(newValue, oldValue) {
      console.log(newValue);
      if (newValue === 1) {
        this.flag_show = true;
      } else {
        this.flag_show = false;
      }
    }
  },
  mounted() {
    this.getAgreementNewList();
    this.getpowertype();
    this.getpowerPer();
    this.getpowerApply();
  },
  methods: {
    // poweradd, powertype, powerPer, powerApply,AgreementNewList
    // 项目列表
    getAgreementNewList() {
      AgreementNewList({
        sysType: this.sysType
      }).then(res => {
        if (res.code == 200) {
          this.projectlist = res.data;
        }
        console.log(res);
      });
    },
    // 获取审批类型列表
    getpowertype() {
      powertype({
        sysType: this.sysType
      }).then(res => {
        if (res.code == 200) {
          this.typelist = res.data;
        }
        console.log(res);
      });
    },
    // 获取审核人员列表
    getpowerPer() {
      powerPer({}).then(res => {
        if (res.code == 200) {
          let arr = res.data.map(item => {
            return {
              active: false,
              ...item
            };
          });
          this.prolist = arr;
          this.prolisttwo = arr;
        }
      });
    },
    // 获取可申请角色列表
    getpowerApply() {
      powerApply({}).then(res => {
        if (res.code == 200) {
          this.rolelist = res.data;
        }
        console.log(res);
      });
    },
    // -添加审批流程
    getpoweradd() {
      if (!this.formFlag) return;
      this.formFlag = false;
      let applyRoles = {};
      if (this.formValidate.typeFlag === 1) {
        applyRoles = {
          applyRoles: this.formValidate.applyRoles
        };
      }

      poweradd({
        sysId: this.sysType,
        typeFlag: this.formValidate.typeFlag,
        categoryId: this.formValidate.categoryId,
        auditUser1Id: this.auditUser1Id,
        auditUser2Id: this.auditUser2Id,
        audit1At: this.audit1At,
        audit2At: this.audit2At,
        enableFLag: this.enableFLag,
        ...applyRoles
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info(res.msg);
          this.$router.push({ name: "examinationMGT" });
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
        setTimeout(() => {
          this.formFlag = true;
        }, 500);
      });
    },
    //一级审批
    class1(e, index) {
      let arr = this.prolist.map(item => {
        return {
          ...item,
          active: false
        };
      });
      arr[index].active = true;
      this.prolist = arr;

      this.auditUser1Id = e.userId;
      this.userNamea = e.userName;
    },
    //二级审批
    class2(e, index) {
      this.auditUser2Id = e.userId;
      this.userNameb = e.userName;
      let arr = this.prolisttwo.map(item => {
        return {
          ...item,
          active: false
        };
      });
      if (this.auditUser1Id == null) {
        this.$Message.info("请先选择一级审批");
        this.userNameb = "";
        this.auditUser2Id = "";
      } else if (this.auditUser1Id == this.auditUser2Id) {
        this.auditUser2Id = null;
        this.userNameb = null;
        this.$Message.info("审批人不能相同");
      } else {
        arr[index].active = true;
      }
      this.prolisttwo = arr;
    },

    //保存
    det(name) {
      // 如果 没有选择 活动立项， 即审批的问题
      if (this.formValidate.typeFlag === 1) {
        this.$refs[name].validate(valid => {
          if (valid) {
            if (this.auditUser1Id == null) {
              this.$Message.info("请先选择审批人");
            } else if (this.auditUser1Id == this.auditUser2Id) {
              this.$Message.info("审批人不能相同");
            } else {
              this.getpoweradd();
            }
          } else {
            this.$Message.error("有必选项未填");
          }
        });
      } else {
        if (this.formValidate.typeFlag) {
          this.getpoweradd();
        } else {
          this.$Message.error("请选择审批类型！");
        }
      }
    }
  }
};
</script>

<style scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;

  padding-bottom: 2rem;
}
.content {
  margin: 10px;
  padding: 0 20%;
}
.Level-1,
.Level-2 {
  border-radius: 10px;
  border: 1px solid #e4e4e4;
  margin: 0 30px;
}
.Level-1 li,
.Level-2 li {
  border-top: 1px solid #e4e4e4;
}
.Level-1 h2,
.Level-1 li,
.Level-2 h2,
.Level-2 li {
  padding: 10px 20px;
  color: #999999;
  width: 200px;
}
.Level-1 h2,
.Level-2 h2 {
  background-color: #f9fafc;
}
.Level-1 li:hover,
.Level-2 li:hover {
  background-color: #f2f2f2;
  color: #ed4014;
  transition: all 0.2s;
}
.main button {
  display: block;
  margin: auto;
}
.active {
  color: #ed4014 !important;
}
</style>
