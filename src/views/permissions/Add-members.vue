<!--添加成员(共用)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con">
        <div class="title bk-szy">
          <p>
            <span>添加成员</span>
          </p>
        </div>
        <div class="add inter-table">
          <Form
            style="margin: 0 auto;"
            ref="AddDate"
            :model="AddDate"
            :rules="ruleValidate"
            :label-width="100"
          >
            <FormItem label="成员名称:" prop="userName">
              <Input style="width: 10rem" v-model="AddDate.userName" />
            </FormItem>
            <FormItem label="手机号:" prop="tel">
              <Input style="width: 10rem" v-model="AddDate.tel" />
            </FormItem>
            <FormItem label="邮箱地址:" prop="email">
              <Input style="width: 10rem" v-model="AddDate.email" />
            </FormItem>
            <FormItem label="所属部门:" prop="deplNames">
              <!-- <Input v-model="AddDate.deplNames" disabled  /> -->
              <!-- <p>{{AddDate.deplNames}}</p> -->

              <Select style="width: 10rem" v-model="AddDate.deplNames" placeholder="全部">
                <Option :value=AddDate.deplNames>{{AddDate.deplNames}}</Option>
                <!-- <Option value="logistics">财务部</Option>
                <Option value="logistics">行政部</Option>
                <Option value="logistics">项目部</Option> -->
              </Select>
              <a>查看部门详情</a>
              <p>选择所属部门后默认继承部门数据权限，可在成员列表中单独设置权限</p>
            </FormItem>
            <FormItem label="所属角色:" prop="sysRoleNames">
               <Select style="width: 10rem" v-model="AddDate.sysRoleNames" placeholder="全部">
                <Option :value=AddDate.sysRoleNames>{{AddDate.sysRoleNames}}</Option>
                 </Select>
              <!-- <p>{{AddDate.sysRoleNames}}</p> -->
              <!-- <Input v-model="AddDate.sysRoleNames" disabled /> -->
              <!-- <Select style="width: 10rem" v-model="AddDate.sysRoleNames" placeholder="全部">
                <Option value="logistics">角色1</Option>
                <Option value="logistics">角色2</Option>
                <Option value="logistics">角色3</Option>
              </Select>-->
              <a>查看角色详情</a>
              <p>选择所属部门后默认继承角色功能权限，可在成员列表中单独设置权限</p>
            </FormItem>
            <FormItem label="初始密码:" prop="loginPwd">
              <Input style="width: 10rem" v-model="AddDate.loginPwd" />
            </FormItem>
            <FormItem label="备注信息:" prop="comments">
              <Input
                style="width: 20rem"
                v-model="AddDate.comments"
                type="textarea"
                :autosize="{minRows: 8,maxRows: 5}"
                placeholder="请输入内容"
              />
            </FormItem>
            <FormItem>
              <Button type="success" @click="handleReset('AddDate')">提交</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { rolenumquery, roleedit } from "@/request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "添加成员(共用)"
      },
      AddDate: {
        userName: "",
        tel: "",
        email: "",
        deplNames: "",
        sysRoleNames: "",
        loginPwd: "",
        comments: ""
      },
      ruleValidate: {
        userName: [
          { required: true, message: "成员名称不能为空", trigger: "blur" }
        ],
        tel: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          { type: "email", message: "邮箱地址格式不正确", trigger: "blur" }
        ],
        loginPwd: [
          { required: true, message: "请输入初始密码", trigger: "blur" }
        ],
        comments: []
      },
      page: 1,
      size: 10
    };
  },
  methods: {
    //编辑角色
    getroleedit() {
      roleedit({
        userId: this.$route.query.userId,
        userName: this.AddDate.userName,
        tel: this.AddDate.tel,
        email: this.AddDate.email,
        comments: this.AddDate.comments,
        loginPwd: this.AddDate.loginPwd
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info("编辑成功");
          this.$router.push({
            name: "role"
          });
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },
    // 多条件查询角色成员
    getrolenumquery() {
      rolenumquery({
        userId: this.$route.query.userId,
        role: this.$route.query.name,
        page: {
          page: this.page,
          size: this.size
        }
      }).then(res => {
        if (res.code == 200) {
          this.AddDate = res.data.list[0];
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //提交
    handleReset(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getroleedit();
        } else {
          this.$Message.error("必填项未填!");
        }
      });
    }
  },
  mounted() {
    if(this.$route.query.userId){
this.getrolenumquery();
this.navigation1.head='编辑成员信息'
    }

  }
};
</script>
<style lang="scss" scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
}
.main,
.add {
  border: 1px solid #e4e4e4;
}
.content {
  margin: 10px;
}
.bk-szy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
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
</style>
