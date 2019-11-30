<!--成员管理(共用)-->
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
          <!-- <Input search size="large" placeholder="用户名/姓名" style="width: 200px" /> -->
        </p>&nbsp;&nbsp;&nbsp;
        <p>
          <span>所属部门:</span>&nbsp;
          <!-- <Select v-model="role" style="width:200px" :transfer="true">
            <Option
              v-for="item in data1"
              :value="item.sysRoleName"
              :key="item.sysRoleId"
            >{{ item.sysRoleName }}</Option>
          </Select>-->
          <Button style="width: 200px">
            全部
            <Icon type="md-arrow-dropdown" />
          </Button>
        </p>
      </div>
      <div class="layout">
        <Layout>
          <Header>
            <Menu mode="horizontal" theme="dark" active-name="1">
              <div class="layout-logo">组织架构</div>
              <div class="layout-nav">
                <span>北京融爱融乐</span>
              </div>
              <div class="btn">
                <Button @click="set">部门设置</Button>
                <Modal v-model="modal1" title="添加部门">
                  <Form
                    ref="formValidate"
                    :model="formValidate"
                    :rules="ruleValidate"
                    :label-width="120"
                  >
                    <FormItem label="部门名称" prop="deptName">
                      <Input v-model="formValidate.deptName"></Input>
                    </FormItem>
                    <FormItem label="职能描述" prop="description">
                      <Input
                        v-model="formValidate.description"
                        type="textarea"
                        :autosize="{minRows: 5,maxRows: 5}"
                        placeholder="请输入描述"
                      />
                    </FormItem>
                    <FormItem label="上级部门" prop="parentId">
                      <Select v-model="formValidate.parentId">
                        <Option
                          v-for="item in deplist"
                          :value="item.deptId"
                          :key="item.deptId"
                        >{{ item.deptName }}</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="设置负责人" prop="leader">
                      <Input v-model="formValidate.leader" />
                    </FormItem>
                  </Form>
                  <div slot="footer">
                    <!-- <Button type="text" size="large" @click="modalCancel">取消</Button> -->
                    <Button type="primary" size="large" @click="modalOk('formValidate')">确定</Button>
                  </div>
                </Modal>
              </div>
            </Menu>
          </Header>
          <Layout>
            <Sider hide-trigger :style="{background: '#008e40'}">
              <Menu
                active-name="1-2"
                width="auto"
                :open-names="['1']"
                style="background-color: #008e40;color: white;"
                @on-open-change="member"
                @on-select="member"
                accordion
              >
                <Submenu name="1">
                  <template slot="title">
                    <Icon type="ios-navigate" />融爱融乐
                  </template>
                  <Submenu :name="index+1" v-for="(item,index) in data1" :key="index">
                    <template slot="title" @click="member(item.deptId)">{{item.deptName}}</template>
                    <MenuItem
                      :name="`2-${item.deptId}`"
                      @click.native="member(item.deptId)"
                      v-for="(item,index) in sunlist"
                      :key="index"
                    >{{item.deptName}}</MenuItem>
                  </Submenu>
                </Submenu>
              </Menu>
            </Sider>
            <Layout :style="{padding: '0 24px 24px'}">
              <Button :style="{margin: '24px 0',maxWidth:'100px'}" @click="addmember">添加成员</Button>
              <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                <Table border :columns="columns" :data="data"></Table>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
      <div class="pages">
        <Page :total="dataCount" show-elevator show-total size="small" style="margin: auto" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  memberlist,
  departmentlist,
  departmentadd,
  departmentall,
  departmentStatus,
  departmentsub
} from "../../request/api";
export default {
  data() {
    return {
      formValidate: {
        deptName: "",
        description: "",
        parentId: "",
        leader: "",
        active: ""
      },
      ruleValidate: {
        deptName: [
          { required: true, message: "职能描述不能为空", trigger: "blur" }
        ],
        description: [
          { required: true, message: "部门名称不能为空", trigger: "blur" }
        ],
        parentId: [
          {
            required: true,
            message: "上级名称不能为空",
            trigger: "change",
            type: "number"
          }
        ],
        leader: [{ required: true, message: "负责人不能为空", trigger: "blur" }]
      },
      modal1: false,
      navigation1: {
        head: "成员管理(共用)"
      },
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
          title: "角色",
          key: "sysRoleNames",
          width: "100",
          align: "center"
        },
        {
          title: "是否启用",
          key: "status",
          width: "100",
          algin: "center",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.validFag == 1
                },
                on: {
                  input: e => {
                    console.log(e);
                    this.getdepartmentStatus(params.row.userId, e);
                  }
                }
              })
            ]);
          }
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
                    color: "#097276",
                    padding: "10px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "function",
                        query: {
                          sysRoleName: params.row.userName,
                          sysRoleId: params.row.deptUserId,
                          status: 2
                        }
                      });
                    }
                  }
                },
                "权限设置"
              ),
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "Add-members",
                        query: {
                          userId: params.row.userId,
                          name: params.row.userName,
                          deptId: this.deptId,
                          states: 2
                        }
                      });
                    }
                  }
                },
                "编辑"
              )
              // h(
              //   "a",
              //   {
              //     style: {
              //       marginRight: "5px",
              //       marginLeft: "5px",
              //       color: "red"
              //     },
              //     on: {
              //       click: () => {}
              //     }
              //   },
              //   "删除"
              // )
            ]);
          }
        }
      ],
      data: [],
      data1: [],
      parentId: 0,
      deplist: [],
      sun: true,
      sunlist: [],
      deptId: "",
      page: 1,
      size: 10,
      name: "",
      status: "",
      dataCount: 0
    };
  },
  mounted() {
    this.getdepartmentlist();
  },

  methods: {
    // 部门列表
    getdepartmentlist() {
      departmentlist({
        parentId: this.parentId
      }).then(res => {
        if (res.code == 200) {
          this.data1 = res.data;
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },
    // 查询下级部门
    getdepartmentsub() {
      departmentsub({
        depId: this.deptId
      }).then(res => {
        if (res.code == 200) {
          this.sunlist = res.data;
        }
        console.log(res);
      });
    },

    // 查询所有部门名称
    getdepartmentall() {
      departmentall({}).then(res => {
        if (res.code == 200) {
          this.deplist = res.data;
        }
        console.log(res);
      });
    },
    member(e) {
      console.log(e);
      if (e.length > 1) {
        this.deptId = e[e.length - 1];
        console.log(this.deptId);
        this.getdepartmentsub();
        // this.getdepartmentlist();
        this.getmemberlist();
      } else {
        console.log(11);
      }
    },
    //成员管理列表
    getmemberlist() {
      memberlist({
        page: { page: this.page, size: this.size },
        deptId: this.deptId,
        userId: "",
        name: this.name
      }).then(res => {
        if (res.code == 200) {
          this.data = res.data.list;
          this.dataCount = res.data.totalSize;
        }
        console.log(res);
      });
    },
    // 部门成员-修改启用状态
    getdepartmentStatus(id, e) {
      if (e == true) {
        this.status = 1;
      } else {
        this.status = 0;
      }
      departmentStatus({
        deptUserId: id,
        validFlag: this.status
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info("操作成功");
        } else {
          this.$Message.info(res.msg);
          this.getmemberlist();
        }
        console.log(res);
      });
    },
    // 部门列表添加
    getdepartmentadd() {
      departmentadd({
        deptName: this.formValidate.deptName,
        description: this.formValidate.description,
        parentId: this.formValidate.parentId,
        leader: this.formValidate.leader
      }).then(res => {
        if (res.code == 200) {
          this.getdepartmentlist();
          this.$Message.info("添加成功");
          this.modal1 = false;
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //部门设置
    set() {
      this.modal1 = true;
      this.clear();
      this.getdepartmentall();
    },
    //清除input
    clear() {
      (this.formValidate.deptName = ""),
        (this.formValidate.description = ""),
        (this.formValidate.parentId = ""),
        (this.formValidate.leader = "");
    },
    //添加
    modalOk(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getdepartmentadd();
        } else {
          this.$Message.error("必填项未填!");
        }
      });
    },
    //查询
    querys() {
      this.getmemberlist();
    },

    addmember() {
      this.$router.push({ name: "Add-members", query: { states: 2 } });
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
.btn {
  float: left;
  position: relative;
  top: 5px;
  left: 60px;
}
.ivu-menu-vertical .ivu-menu-submenu-title-icon {
  right: 0.2rem;
}
.ivu-menu-dark {
  background: transparent !important;
}
.ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):after {
  width: 0;
}
</style>
