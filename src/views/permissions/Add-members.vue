<!--添加成员(共用)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con">
        <div class="title bk-szy">
          <p>
            <span>{{navigation1.head}}</span>
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

              <Select style="width: 10rem" multiple v-model="AddDate.deplNames" placeholder="全部">
                <!-- <Option :value="AddDate.deplNames">{{AddDate.deplNames}}</Option> -->
                <Option :value=item.deptId v-for="(item,index) in list" :key="index">{{item.deptName}}</Option>
                <!-- <Option value="logistics">行政部</Option>
                <Option value="logistics">项目部</Option> -->
              </Select>
              <a>查看部门详情</a>
              <p>选择所属部门后默认继承部门数据权限，可在成员列表中单独设置权限</p>
            </FormItem>
            <FormItem label="所属角色:" prop="sysRoleNames">
              <Select style="width: 10rem" multiple v-model="AddDate.sysRoleNames" placeholder="全部">
                <Option :value="AddDate.sysRoleNames">{{AddDate.sysRoleNames}}</Option>
              </Select>
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
import { rolenumquery, roleedit,departmentlist,memberlist} from "@/request/api";
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
        deplNames:[
         { required: true, message: "请选择部门类型", trigger: "change",type:'number' }
          ],
        sysRoleNames:[
         { required: true, message: "请选择角色类型", trigger: "change",type:'number' }
          ],
        loginPwd: [
          { required: true, message: "请输入初始密码", trigger: "blur" }
        ],
        comments: []
      },
      page: 1,
      size: 10,
      list:[]
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
          if (this.$route.query.state == 3) {
            this.$Message.info("编辑成功");
            this.$router.push({
              name: "role"
            });
          }else if(this.$route.query.state==2){
            this.$Message.info("添加成功");
            this.$router.push({
              name: "membersMGT"
            });
          }else if(this.$route.query.state==1){
            this.$Message.info("添加成功");
            this.$router.push({
              name: "departmentMGT"
            });
          }
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    // 部门列表
    getdepartmentlist() {
      departmentlist({
        parentId: 0
      }).then(res => {
        if (res.code == 200) {
          this.list = res.data;
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

    //成员管理编辑
    getmemberlist(){
      memberlist({
        page: { page: this.page, size: this.size },
        userId:this.$route.query.userId,
        name:this.$route.query.name,
        deptId:this.$route.query.deptId
      }).then(res=>{
        console.log(res)
      })
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
    // this.getdepartmentlist()
    if (this.$route.query.userId) {
      this.getrolenumquery();
      this.navigation1.head = "编辑成员信息";
    }
    this.getmemberlist()
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
