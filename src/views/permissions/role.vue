<!--角色管理(共用)-->
<template>
  <div class="main bk">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content bk">
      <div class="Members-search">
        <p>
          <span>输入搜索:</span>&nbsp;
          <Input
            search
            size="large"
            placeholder="姓名"
            v-model="name"
            style="width: 200px"
            @on-search="querys"
          />
        </p>&nbsp;&nbsp;&nbsp;
        <p>
          <span>所属角色:</span>&nbsp;
          <Select v-model="role" style="width:200px" :transfer="true">
            <Option
              v-for="item in List"
              :value="item.sysRoleName"
              :key="item.sysRoleId"
            >{{ item.sysRoleName }}</Option>
          </Select>
        </p>
      </div>
      <div class="layout">
        <Layout>
          <Header>
            <Menu mode="horizontal" theme="dark" active-name="1">
              <div class="layout-logo">角色</div>
              <div class="btn1">
                <Button @click="modal1=true">新建角色</Button>
                <Modal v-model="modal1" title="新增常用报名项">
                  <Form
                    ref="formValidate"
                    :model="formValidate"
                    :rules="ruleValidate"
                    :label-width="120"
                  >
                    <FormItem label="角色名称" prop="name">
                      <Input v-model="formValidate.name" placeholder="Enter your name" />
                    </FormItem>
                    <FormItem label="职能描述" prop="sysRoleNames">
                      <Input v-model="formValidate.sysRoleNames" placeholder="Enter your name" />
                    </FormItem>
                    <Button @click="function1">权限设置</Button>
                  </Form>

                  <div slot="footer">
                    <Button type="text" size="large" @click="modalcancel()">取消</Button>
                    <Button type="primary" size="large" @click="modalOk('formValidate')">确定</Button>
                  </div>
                </Modal>
              </div>
              <div class="layout-nav">
                <span>项目经理</span>
              </div>
              <div class="btn">
                <Button @click="function1">权限设置</Button>
              </div>
            </Menu>
          </Header>
          <Layout>
            <Sider hide-trigger :style="{background: '#008e40'}">
              <Menu
                :active-name="`1-${this.role}`"
                width="auto"
                :open-names="['1']"
                style="background-color: #008e40;color: white;"
              >
                <Submenu name="1">
                  <template slot="title">
                    <Icon type="ios-navigate" />融爱融乐
                  </template>
                  <MenuItem
                    :name="`1-${item.sysRoleName}`"
                    v-for="(item,index) in List"
                    :key="index"
                    @click.native="option(item.sysRoleName)"
                  >{{item.sysRoleName}}</MenuItem>
                </Submenu>
              </Menu>
            </Sider>
            <Layout :style="{padding: '0 24px 24px'}">
              <Button :style="{margin: '24px 0',maxWidth:'100px'}" @click="newadd">添加成员</Button>
              <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                <Table border :columns="columns" :data="data"></Table>
              </Content>
              <Modal v-model="modal2" title="添加人员">
                <Transfer
                  :data="data1"
                  :target-keys="targetKeys1"
                  :render-format="render1"
                  @on-change="handleChange1"
                ></Transfer>
              </Modal>
            </Layout>
          </Layout>
        </Layout>
      </div>
      <div class="pages">
        <Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          style="margin: auto"
          :page-size="size"
          @on-change="changepages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  rolenumquery,
  rolequery,
  rolenew,
  roleSetup,
  roledel,
  roleAddto,
  roleedit
} from "@/request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "角色管理(共用)"
      },
      formValidate: {
        name: "",
        sysRoleNames: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur"
          }
        ],
        sysRoleNames: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur"
          }
        ]
      },

      modal1: false,
      modal2: false,
      columns: [
        {
          title: "姓名",
          key: "userName",
          width: "100",
          align: "center"
        },
        {
          title: "邮箱地址",
          key: "email",
          align: "center"
        },
        {
          title: "联系方式",
          key: "tel",
          align: "center"
        },
        {
          title: "最近登录时间",
          key: "login",
          width: "140",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("p", this.util.formatDate(params.row.lastLogin))
            ]);
          }
        },
        {
          title: "部门",
          key: "deplNames",
          width: "100",
          algin: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ name: "Add-members" });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "red"
                  },
                  on: {
                    click: () => {
                      this.ids = params.row.userId;
                      this.getroledel();
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [],
      page: 1,
      size: 10,
      dataCount: 0,
      name: "",
      role: "",
      List: [],
      listpage: "",
      ids: "",
      add:'',
      data1: this.getMockData(),
      targetKeys1: this.getTargetKeys()
    };
  },

  watch: {
    role: "getrolenumquery"
  },
  methods: {


    getMockData() {
      let mockData = [];
      for (let i = 1; i <= 20; i++) {
        mockData.push({
          key: i.toString(),
          label: "Content " + i,
          description: "The desc of content  " + i,
          // disabled: Math.random() * 3 < 1
        });
      }
      return mockData;
    },
    getTargetKeys() {
      return this.getMockData()
        .filter(() => Math.random() * 2 > 1)
        .map(item => item.key);
    },
    render1(item) {
      return item.label;
    },
    handleChange1(newTargetKeys, direction, moveKeys) {
      console.log(newTargetKeys);
      console.log(direction);
      console.log(moveKeys);
      this.targetKeys1 = newTargetKeys;
    },

    // 多条件查询角色成员
    getrolenumquery() {
      rolenumquery({
        name: this.name,
        role: this.role,
        page: {
          page: this.page,
          size: this.size
        }
      }).then(res => {
        if (res.code == 200) {
          this.dataCount = res.data.totalSize;
          this.data = res.data.list;
        }
        console.log(res);
      });
    },
    // 查询所有角色
    getrolequery() {
      rolequery({}).then(res => {
        if (res.code == 200) {
          this.List = res.data;
        }
        console.log(res);
      });
    },

    // 新建角色
    getrolenew() {
      rolenew({
        sysRoleName: this.formValidate.name,
        description: this.formValidate.sysRoleNames
      }).then(res => {
        if (res.code == 200) {
          this.$Message.success(res.msg);
          this.modal1 = false;
          this.getrolequery();
        }
        console.log(res);
      });
    },

    //角色删除
    getroledel() {
      roledel({
        userIds: this.ids,
        sysRoleId: this.role
      }).then(res => {
        if (res.code == 200) {
        }
        console.log(res);
      });
    },

    //添加角色列表
    getroleAddto() {
      this.add=this.List.filter(item=>item.sysRoleId==this.role)
      if(this.add.length!=0){
         roleAddto({
        sysRoleName: this.add[0].sysRoleName
      }).then(res => {
        if(res.code==200){
          this.data1=res.data
        }
        console.log(res);
      });
      }

    },

    //编辑角色
    getroleedit(obj) {
      roleedit({
        userName: obj.userName,
        tel: obj.tel,
        email: obj.email,
        comments: obj.comments,
        loginPwd: obj.loginPwd
      }).then(res => {
        if (res.code == 200) {
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //新建成员
    newadd(){
      this.targetKeys1=this.List
      this.modal2=true
      this.getroleAddto()
    },

    //查询
    querys() {

      console.log(`1-${this.role}`);
      this.getrolenumquery();
    },

    //分页功能
    changepages(index) {
      this.page = index;
      this.getrolenumquery();
    },

    //选项
    option(e) {
      this.role = e;
      this.getrolenumquery();
    },

    //新建角色
    modalOk(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.formValidate.sysRoleNames = "";
          this.formValidate.name = "";
          this.getrolenew();
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    //取消
    modalcancel() {
      this.formValidate.sysRoleNames = "";
      this.formValidate.name = "";
      this.modal1 = false;
    },

    addmember() {
      this.$router.push({ name: "Add-members" });
    },
    function1() {
      this.$router.push({ name: "function" });
    }
  },
  mounted() {
    this.getrolenumquery();
    this.getrolequery();
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
}
.content {
  margin: 10px;
}
.bk {
  border: 1px solid #e4e4e4;
}
.Members-search {
  background-color: #f3f3f3;
  display: flex;
  justify-content: flex-start;
  padding: 10px 30px;
}
.ivu-menu li {
  color: white;
}
.pages {
  display: flex;
  justify-content: center;
  margin: 10px auto;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: white;
  float: left;
  position: relative;
  top: 15px;
  left: -10px;
  color: black;
  text-align: center;
}
.layout-nav {
  width: 200px;
  height: 40px;
  float: left;
  position: relative;
  top: 15px;
  left: 30px;
  background: white;
  color: black;
  line-height: 40px;
  border: 1px solid black;
}
.layout-nav span {
  padding-left: 30%;
}
.btn1 {
  float: left;
  position: relative;
  top: 5px;
  left: 10px;
}
.btn {
  float: left;
  position: relative;
  top: 5px;
  left: 60px;
}
.ivu-menu-vertical .ivu-menu-submenu-title-icon {
  right: 0.2rem !important;
}
.addperson {
  display: flex;
  justify-content: space-around;
}
.addperson div:nth-of-type(2n-1) {
  padding: 10px;
  border: 1px solid #ccc;
}
li {
  height: 24px;
}
.addperson div:nth-of-type(2n) button {
  margin-top: 20px;
}
.ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):after {
  width: 0;
}
</style>
