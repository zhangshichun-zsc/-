<!--添加成员(共用)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con">
        <!-- <div class="title bk-szy">
          <p>
            <span>{{ navigation1.head }}</span>
          </p>
        </div> -->
        <div class="add inter-table">
          <Form
            style="margin: 0 auto;"
            ref="AddDate"
            :model="AddDate"
            :rules="
              this.$route.query.states == 2 ? ruleValidate : ruleValidate_two
            "
            :label-width="130"
          >
            <FormItem label="成员名称:" prop="userName">
              <Input
                placeholder="请输入成员名称"
                style="width: 10rem"
                v-model="AddDate.userName"
              />
            </FormItem>
            <FormItem label="账号:" prop="tel">
              <Input
                placeholder="请输入账号"
                style="width: 10rem"
                v-model="AddDate.tel"
                :maxlength="11"
              />
            </FormItem>
            <FormItem label="邮箱地址:" prop="email">
              <Input
                placeholder="请输入邮箱地址"
                style="width: 10rem"
                v-model="AddDate.email"
              />
            </FormItem>
            <FormItem label="所属部门:" prop="deptId">
              <Select
                style="width: 10rem"
                v-model="AddDate.deptId"
                placeholder="请选择所属部门"
                :disabled="this.$route.query.states == 3"
              >
                <Option
                  :value="item.deptId"
                  v-for="(item, index) in list"
                  :key="index"
                  >{{ item.deptName }}</Option
                >
              </Select>
              <!-- <a href="javascript:;">查看部门详情</a> -->
              <p>
                选择所属部门后默认继承部门数据权限，可在成员列表中单独设置权限
              </p>
            </FormItem>
            <FormItem label="所属角色:" prop="sysRoleNames">
              <Select
                multiple
                style="width: 10rem"
                v-model="AddDate.sysRoleNames"
                placeholder="请选择所属角色"
              >
                <Option
                  v-for="(item, index) in checkList"
                  :key="index"
                  :value="item.sysRoleId"
                  >{{ item.sysRoleName }}</Option
                >
              </Select>
              <!-- <a>查看角色详情</a> -->
              <p>
                选择所属部门后默认继承角色功能权限，可在成员列表中单独设置权限
              </p>
            </FormItem>
            <FormItem label="密码设置:" prop="loginPwd">
              <Input
                placeholder="请设置密码"
                style="width: 10rem"
                v-model="AddDate.loginPwd"
              />
            </FormItem>
            <FormItem label="备注信息:" prop="comments">
              <Input
                style="width: 20rem"
                v-model="AddDate.comments"
                type="textarea"
                :autosize="{ minRows: 8, maxRows: 5 }"
                placeholder="请输入内容"
              />
            </FormItem>
            <FormItem>
              <a
                href="javascript:;"
                class="addDate-btn"
                @click="handleReset('AddDate')"
                >提交</a
              >
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  rolenumquery,
  departmentall,
  roleedit,
  memberlist,
  rolequery,
  departaddDeptUser,
  findDeptUserName,
  editDeptUser
} from "@/request/api";
export default {
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      //  else if (!/^1[34578]\d{9}$/.test(value)) {
      //   callback("手机号格式不正确");
      // }
      else {
        callback();
      }
    };

    return {
      navigation1: {
        head: "添加成员(共用)"
      },
      AddFormFlag: true,
      EditFormFlag: true,
      AddDate: {
        userName: "",
        tel: "",
        email: "",
        deplNames: "",
        deptId: "",
        sysRoleNames: [],
        loginPwd: "",
        comments: ""
      },
      ruleValidate: {
        userName: [
          { required: true, message: "成员名称不能为空", trigger: "blur" }
        ],
        tel: [{ required: true, validator: validatePhone, trigger: "blur" }],

        email: [
          { type: "email", message: "邮箱地址格式不正确", trigger: "blur" }
        ],
        deplNames: [
          {
            required: true,
            message: "请选择部门类型",
            trigger: "change",
            type: "number"
          }
        ],
        deptId: [
          {
            required: true,
            message: "请选择部门类型",
            trigger: "change",
            type: "number"
          }
        ],
        sysRoleNames: [
          {
            required: true,
            message: "请选择角色类型",
            trigger: "change",
            type: "array"
          }
        ],
        loginPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        // loginPwd: [
        //   { required: true, message: "请输入初始密码", trigger: "blur" }
        // ],
        comments: []
      },
      ruleValidate_two: {
        userName: [
          { required: true, message: "成员名称不能为空", trigger: "blur" }
        ],
        tel: [{ required: true, validator: validatePhone, trigger: "blur" }],

        email: [
          { type: "email", message: "邮箱地址格式不正确", trigger: "blur" }
        ],
        deplNames: [
          {
            required: true,
            message: "请选择部门类型",
            trigger: "change",
            type: "number"
          }
        ],
        deptId: [
          {
            required: true,
            message: "请选择部门类型",
            trigger: "change",
            type: "number"
          }
        ],
        sysRoleNames: [
          {
            required: true,
            message: "请选择角色类型",
            trigger: "change",
            type: "array"
          }
        ],
        loginPwd: [],
        comments: []
      },
      deptId: "",
      page: 1,
      size: 10,
      list: [],
      checkList: []
    };
  },
  watch: {},
  methods: {
    // 查询所有角色
    getrolequery() {
      rolequery({}).then(res => {
        if (res.code == 200) {
          this.checkList = res.data;
        }
        console.log(res);
      });
    },
    //编辑角色
    getroleedit() {
      editDeptUser({
        userId: this.$route.query.userId,
        sysRoleIds: this.AddDate.sysRoleNames.toString(),
        tel: this.AddDate.tel,
        userName: this.AddDate.userName,
        deptIds: this.AddDate.deptId.toString(),
        email: this.AddDate.email,
        comments: this.AddDate.comments,
        loginPwd: this.AddDate.loginPwd
      }).then(res => {
        if (res.code == 200) {
          if (this.$route.query.states == 3) {
            this.$Message.info("编辑成功");
          } else if (this.$route.query.states == 2) {
            this.$Message.info("添加成功");
          }
          this.$router.push({
            name: this.$route.query.fromURL
          });
        } else {
          this.$Message.error(res.msg);
        }
        setTimeout(() => {
          this.EditFormFlag = true;
        }, 500);
      });
    },
    // 查询所有部门名称
    getdepartmentall() {
      departmentall({}).then(res => {
        if (res.code == 200) {
          this.list = res.data;
        }
        console.log(res);
      });
    },

    // 多条件查询角色成员
    getrolenumquery() {
      console.log("查询编辑的用户信息");
      findDeptUserName({
        userId: this.$route.query.userId,
        name: this.$route.query.name,
        // deptId: "0",
        page: {
          page: this.page,
          size: this.size
        }
      }).then(res => {
        if (res.code == 200) {
          if (res.data.list.length > 0) {
            this.AddDate = res.data.list[0];
            console.log(res.data.list[0].sysRoleIds);

            this.AddDate.sysRoleNames = res.data.list[0].sysRoleIds
              .split(",")
              .map(item => {
                return Number(item);
              });

            this.AddDate.deplNames = res.data.list[0].deptIds;
          }
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //成员添加
    getdepartaddDeptUser() {
      departaddDeptUser({
        sysRoleIds: this.AddDate.sysRoleNames.toString(),
        tel: this.AddDate.tel,
        userName: this.AddDate.userName,
        deptIds: this.AddDate.deptId.toString(),
        email: this.AddDate.email,
        comments: this.AddDate.comments,
        loginPwd: this.AddDate.loginPwd
      }).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.$Message.info("添加成功");
          this.$router.push({
            name: this.$route.query.fromURL
          });
        } else {
          this.$Message.error(res.msg);
        }
        setTimeout(() => {
          this.AddFormFlag = true;
        }, 500);
      });
    },

    getmemberlist() {
      memberlist({
        page: { page: this.page, size: this.size },
        userId: this.$route.query.userId,
        name: this.$route.query.name,
        deptId: this.$route.query.deptId
      }).then(res => {
        if (res.code == 200) {
          if (res.data.list.length > 0) {
            this.AddDate = res.data.list[0];
            this.AddDate.sysRoleNames = res.data.list[0].sysRoleIds
              .split(",")
              .map(item => {
                return Number(item);
              });
            this.AddDate.deplNames = res.data.list[0].deptIds
              .split(",")
              .map(item => {
                return Number(item);
              });
            console.log(this.AddDate.deplNames, this.AddDate.sysRoleNames);
          }
        }
        console.log(res);
      });
    },

    //提交
    handleReset(name) {
      console.log(this.AddDate.deptId);
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.$route.query.states == 2) {
            if (!this.AddFormFlag) return;
            this.AddFormFlag = false;
            this.getdepartaddDeptUser();
          } else {
            if (!this.EditFormFlag) return;
            this.EditFormFlag = false;
            this.getroleedit();
          }
        } else {
          this.$Message.error("必填项未填!");
        }
      });
    }
  },
  mounted() {
    this.getdepartmentall();
    this.getrolequery();
    if (this.$route.query.userId) {
      this.navigation1.head = "编辑成员信息";
      if (this.$route.query.states == 2) {
        this.getmemberlist();
      } else if (this.$route.query.states == 3) {
        this.getrolenumquery();
      }
    } else {
    }
  }
};
</script>
<style lang="scss" scoped>
html,
body {
  margin: auto;
}
.ivu-form .ivu-form-item-label {
  font-size: 20px !important;
  color: #1b2331 !important;
  line-height: 24px !important;
}
.main {
  padding: 10px;
}

.content {
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
}
.bk-szy {
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 24px;
}
.title {
  background-color: #f3f3f3;
  justify-content: space-between;
  padding: 10px 20px;
}
.add {
  padding: 50px 0;
}
.add td {
  padding: 5px 10px;
}
.add a {
  margin-left: 20px;
  color: #666666;
}
.inter-table {
  display: flex;
  align-items: center;
}
.addDate-btn {
  display: block;
  width: 110px;
  text-align: center;
  background: #ff565a;
  border-radius: 15px;
  line-height: 32px;
  font-size: 14px;
  color: #ffffff !important;
  height: 32px;
}
</style>
