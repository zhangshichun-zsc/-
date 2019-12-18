<!--角色管理(共用)-->
<template>
  <div class="main bk">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content bk">
      <div class="Members-search">
        <p>
          <span>姓名:</span>&nbsp;
          <Input
            search
            size="large"
            placeholder="姓名"
            v-model="name"
            style="width: 200px"
          />
        </p>
        &nbsp;&nbsp;&nbsp;
        <p>
          <span>所属角色:</span>&nbsp;
          <Select v-model="role" style="width:200px" :transfer="true">
            <Option
              v-for="item in List"
              :value="item.sysRoleName"
              :key="item.sysRoleId"
              >{{ item.sysRoleName }}</Option
            >
          </Select>
        </p>

        <p>
          <a href="javascript:;" @click="querys" class="btn">查询</a>
        </p>
      </div>
      <div class="layout">
        <Layout>
          <Header style="background:  #fff">
            <Menu mode="horizontal" theme="dark" active-name="1">
              <div class="header-box">
                <div>角色</div>
                <span class="content-btn">{{ role }}</span>
                <a href="javascript:;" class="btn" @click="newbtn">新建角色</a>
                <a href="javascript:;" class="btn" @click="function1"
                  >权限设置</a
                >
                <a href="javascript:;" class="btn" @click="newadd">添加人员</a>
                <Modal v-model="modal1" title="新建角色" class="QRcodemodal">
                  <Form
                    ref="formValidate"
                    :model="formValidate"
                    :rules="ruleValidate"
                    :label-width="120"
                  >
                    <FormItem label="角色名称" prop="name">
                      <Input v-model="formValidate.name" />
                    </FormItem>
                    <FormItem label="职能描述" prop="sysRoleNames">
                      <Input v-model="formValidate.sysRoleNames" />
                    </FormItem>
                  </Form>
                  <div slot="footer">
                    <Button type="text" size="large" @click="modalcancel()"
                      >取消</Button
                    >
                    <Button
                      type="error"
                      size="large"
                      @click="modalOk('formValidate')"
                      >确定</Button
                    >
                  </div>

                  <div></div>
                </Modal>
              </div>
            </Menu>
          </Header>
          <Layout>
            <Sider
              hide-trigger
              :style="{
                background: '#fff',
                colot: '#1B2331',
                width: '300px',
                'min-width': '300px',
                'max-width': '300px',
                overflow: 'scroll',
                'min-height': '50vh',
                flex: '0 0 200px'
              }"
            >
              <Menu
                :active-name="`1-${role}`"
                width="auto"
                :open-names="['1']"
                style="background-color: #fff;"
              >
                <Submenu name="1" style="color: #1B2331; font-size:16px">
                  <template slot="title">
                    <Icon type="ios-navigate" />融爱融乐
                  </template>
                  <MenuItem
                    style="color: #1B2331; font-size:14px; line-height: 3px"
                    :name="`1-${item.sysRoleName}`"
                    v-for="(item, index) in List"
                    :key="index"
                    @click.native="option(item.sysRoleName)"
                    >{{ item.sysRoleName }}</MenuItem
                  >
                </Submenu>
              </Menu>
            </Sider>
            <Layout>
              <!-- <Button :style="{ margin: '24px 0', maxWidth: '100px' }"></Button> -->

              <Content
                :style="{
                  minHeight: '50vh',
                  background: '#fff'
                }"
              >
                <Table border :columns="columns" :data="data"></Table>
              </Content>
              <Modal v-model="modal2" title="添加人员" class="QRcodemodal">
                <Transfer
                  :data="data1"
                  :target-keys="targetKeys1"
                  :render-format="render1"
                  @on-change="handleChange1"
                  style="display: flex;
                         justify-content: center;
                         align-items: center;"
                ></Transfer>
                <div slot="footer">
                  <!-- <Button type="text" size="large" @click="modalCancel">取消</Button> -->
                  <Button type="error" size="large" @click="addmodalOk"
                    >确定</Button
                  >
                </div>
              </Modal>
              <Modal
                v-model="addstate"
                width="360"
                class="vertical-center-modal"
              >
                <p slot="header" style="color:#f60;text-align:center">
                  <span>删除确定</span>
                </p>
                <div style="text-align:center">
                  <p>请确认是否要删除此数据</p>
                </div>
                <div slot="footer">
                  <Button type="error" @click="modalCancel">取消</Button>
                  <Button type="success" @click="modalOkdel">确定</Button>
                </div>
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
  roleAddtos,
  roledel,
  roleAddto
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
          align: "center"
        },
        {
          title: "邮箱地址",
          key: "email",
          width: "240",
          align: "center"
        },
        {
          title: "联系方式",
          key: "tel",
          width: "140",
          align: "center"
        },
        {
          title: "最近登录时间",
          key: "login",
          width: "180",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                params.row.lastLogin
                  ? this.util.formatDate(params.row.lastLogin)
                  : ""
              )
            ]);
          }
        },
        {
          title: "部门",
          key: "deplNames",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: "100",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#FF565A"
                  },
                  on: {
                    click: () => {
                      console.log(params.row);
                      this.$router.push({
                        name: "Add-members",
                        query: {
                          userId: params.row.userId,
                          name: params.row.userName,
                          states: 3,
                          fromURL: this.$route.name
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
              //       click: () => {
              //         if (this.role == "") {
              //           this.$Message.error("请先选择角色");
              //         } else {
              //           this.ids = params.row.userId;
              //           this.addstate = true;
              //         }
              //       }
              //     }
              //   },
              //   "删除"
              // )
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
      add: "",
      // data1: this.getMockData(),
      // targetKeys1: this.getTargetKeys()
      data1: [],
      targetKeys1: [],
      addlist: [],
      arr: [],
      arrs: [],
      addUserIds: [],
      delUserIds: [],
      FormFlag: true,
      AddroleFormFlag: true,
      addstate: false
    };
  },

  watch: {
    role: "getrolenumquery"
  },

  mounted() {
    this.getrolenumquery();
    // this.getrolequery();
    // console.log(this.role)
  },
  created() {
    this.getrolequery();
    console.log(this.role);
  },
  methods: {
    getMockData() {
      let mockData = [];
      let data = this.data.concat(this.addlist);
      for (let i = 0; i < data.length; i++) {
        mockData.push({
          key: data[i].userId,
          label: data[i].userName
          // description: i
        });
      }
      this.data1 = mockData;
      console.log(mockData);

      return mockData;
    },

    //key值
    getTargetKeys() {
      this.targetKeys1 = this.arr;
    },
    render1(item) {
      // console.log(item.label)
      return item.label;
    },

    //穿梭框
    handleChange1(newTargetKeys, direction, moveKeys) {
      console.log(this.arrs, this.arr);
      if (direction == "right") {
        this.delUserIds = this.util.arrChange(this.delUserIds, moveKeys);
        this.addUserIds = this.addUserIds.concat(moveKeys);
      } else if (direction == "left") {
        this.addUserIds = this.util.arrChange(this.addUserIds, moveKeys);
        this.delUserIds = this.delUserIds.concat(moveKeys);
      }
      console.log(this.addUserIds, this.delUserIds);

      this.targetKeys1 = newTargetKeys;
    },
    //确定
    addmodalOk() {
      this.delUserIds = this.util.arrChange(this.delUserIds, this.arrs);
      this.addUserIds = this.util.arrChange(this.addUserIds, this.arr);
      this.getroleAddtos();
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
          if (this.List.length != 0) {
            this.role = this.List[0].sysRoleName;
            console.log(this.role, `1-${this.role}`);
          }
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
          setTimeout(() => {
            this.FormFlag = true;
          }, 500);
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //角色删除
    getroledel() {
      this.add = this.List.filter(item => item.sysRoleName == this.role);
      console.log(this.add);
      roledel({
        userIds: this.ids,
        sysRoleId: this.add[0].sysRoleId
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info("删除成功");
          this.getrolenumquery();
          this.addstate = false;
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //查询添加角色列表
    getroleAddto() {
      this.add = this.List.filter(item => item.sysRoleName == this.role);
      if (this.add.length != 0) {
        roleAddto({
          sysRoleName: this.add[0].sysRoleName
        }).then(res => {
          if (res.code == 200) {
            this.addlist = res.data;
            this.arr = this.data.map(item => item.userId);
            this.arrs = this.addlist.map(item => item.userId);
            this.addUserIds = this.arr;
            this.delUserIds = this.arrs;
            this.getMockData();
            this.getTargetKeys();
          }
          console.log(res);
        });
      }
    },

    //添加人员
    getroleAddtos() {
      if (!this.AddroleFormFlag) return;
      this.AddroleFormFlag = false;
      this.add = this.List.filter(item => item.sysRoleName == this.role);
      roleAddtos({
        delUserIds: this.delUserIds.toString(),
        addUserIds: this.addUserIds.toString(),
        sysRoleId: this.add[0].sysRoleId
      }).then(res => {
        if (res.code == 200) {
          this.modal2 = false;
          this.$Message.info(res.msg);
          this.getrolenumquery();
        } else {
          this.$Message.info(res.msg);
        }
        console.log(res);
        setTimeout(() => {
          this.AddroleFormFlag = true;
        }, 500);
      });
    },

    //新建成员
    newadd() {
      this.addUserIds = [];
      this.delUserIds = [];
      this.modal2 = true;
      this.getroleAddto();
    },

    //新建
    newbtn() {
      this.modal1 = true;
      this.formValidate.name = "";
      this.formValidate.sysRoleNames = "";
    },

    //查询
    querys() {
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
          if (!this.FormFlag) return;
          this.FormFlag = false;
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

    //跳转
    function1() {
      this.add = this.List.filter(item => item.sysRoleName == this.role);

      this.$router.push({
        name: "function",
        query: {
          sysRoleName: this.add[0].sysRoleName,
          sysRoleId: this.add[0].sysRoleId,
          fromURL: this.$route.name
        }
      });
    },
    //取消
    modalCancel() {
      this.addstate = false;
      this.$Message.info("取消成功");
    },
    //确定
    modalOkdel() {
      this.getroledel();
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
  padding: 0;
}
.content {
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
}

.Members-search {
  display: flex;
  justify-content: flex-start;
  padding: 10px 30px;
}

.pages {
  display: flex;
  justify-content: center;
  margin: 10px auto;
  padding: 15px 0;
}
.layout {
  background: #f5f7f9;
  position: relative;

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

.ivu-menu-vertical .ivu-menu-submenu-title-icon {
  right: 0.2rem !important;
}
.addperson {
  display: flex;
  justify-content: space-around;
}
.addperson div:nth-of-type(2n-1) {
  padding: 10px;
}

.addperson div:nth-of-type(2n) button {
  margin-top: 20px;
}
.ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):after {
  width: 0;
}
.header-box {
  display: flex;
  align-items: center;
  background: #fff;
}
.btn {
  display: inline-block;
  width: 110px;
  height: 32px;
  line-height: 32px;
  border-radius: 15px;
  font-size: 16px;
  margin: 0 15px;
  text-align: center;
  background: #ff565a;
  color: #fff;
}
.content-btn {
  width: 220px;
  line-height: 32px;
  font-size: 14px;
  margin: 0 15px;
  text-align: center;
  color: #ff565a;
  background: #fef4f5;
  border-radius: 15px;
}
</style>
