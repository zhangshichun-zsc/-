<!--成员管理(共用)-->
<template>
  <div class="main bk">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content bk">
      <div class="Members-search">
        <p>
          <span>输入搜索:</span>&nbsp;
          <Input search size="large" placeholder="用户名/姓名" style="width: 200px" />
        </p>&nbsp;&nbsp;&nbsp;
        <p>
          <span>所属部门:</span>&nbsp;
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
                <Button @click="modal1=true">部门设置</Button>
                <Modal v-model="modal1" title="添加部门">
                  <Form
                    ref="formValidate"
                    :model="formValidate"
                    :rules="ruleValidate"
                    :label-width="120"
                  >
                    <FormItem label="部门名称" prop="name">
                      <Input v-model="formValidate.name"></Input>
                    </FormItem>
                    <FormItem label="职能描述" prop="career">
                      <Input
                        v-model="formValidate.career"
                        type="textarea"
                        :autosize="{minRows: 5,maxRows: 5}"
                        placeholder="请输入描述"
                      ></Input>
                    </FormItem>
                    <FormItem label="上级部门" prop="apartment">
                      <Select v-model="formValidate.apartment" label="后勤部">
                        <Option value="后勤部">后勤部</Option>
                        <Option value="财务部">财务部</Option>
                        <Option value="行政部">行政部</Option>
                        <Option value="项目部">项目部</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="设置负责人" prop="person">
                      <Input v-model="formValidate.person"></Input>
                    </FormItem>
                  </Form>
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
              >
                <Submenu name="1">
                  <template slot="title">
                    <Icon type="ios-navigate" />融爱融乐
                  </template>
                  <MenuItem name="1-1">品牌发展部</MenuItem>
                  <MenuItem name="1-2">志愿者发展部</MenuItem>
                  <MenuItem name="1-3">IT管理系统部</MenuItem>
                  <Submenu name="2">
                    <template slot="title">后勤部</template>
                    <MenuItem name="2-1">财务部</MenuItem>
                    <MenuItem name="2-2">行政部</MenuItem>
                  </Submenu>
                  <Submenu name="3">
                    <template slot="title">项目部</template>
                    <MenuItem name="2-1">项目部1</MenuItem>
                    <MenuItem name="2-2">项目部2</MenuItem>
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
        <Page :total="100" show-elevator show-total size="small" style="margin: auto" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formValidate: {
        career: "",
        name: "",
        apartment: "",
        person: ""
      },
      ruleValidate: {
        career: [
          { required: true, message: "职能描述不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" }
        ],
        apartment: [
          { required: true, message: "上级名称不能为空", trigger: "blur" }
        ],
        person: [{ required: true, message: "负责人不能为空", trigger: "blur" }]
      },
      modal1: false,
      navigation1: {
        head: "成员管理(共用)"
      },
      columns: [
        {
          title: "姓名",
          key: "name",
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
          key: "link",
          align: "center"
        },
        {
          title: "角色",
          key: "active",
          width: "100",
          align: "center"
        },
        {
          title: "是否启用",
          key: "status",
          width: "100",
          algin: "center",
          render: (h, params) => {
            return h("div", [h("i-switch")]);
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
                      this.$router.push({ name: "Permissions-SetUp" });
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
                    click: () => {}
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: []
    };
  },
  methods: {
    addmember() {
      this.$router.push({ name: "Add-members" });
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
