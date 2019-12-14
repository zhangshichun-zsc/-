<!--成员管理(共用)-->
<template>
  <div class="main bk">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content bk">
      <div class="Members-search">
        <p class="item">
          <span>输入搜索:</span>&nbsp;
          <Input
            search
            size="large"
            placeholder="姓名"
            v-model="name"
            style="width: 200px"
          />
          <!-- <Input search size="large" placeholder="用户名/姓名" style="width: 200px" /> -->
        </p>
        &nbsp;&nbsp;&nbsp;
        <p class="item">
          <span>所属部门:</span>
          <Select v-model="role" style="width:200px" :transfer="true">
            <Option
              v-for="item in deplist"
              :value="item.deptId"
              :key="item.deptId"
              >{{ item.deptName }}</Option
            >
          </Select>
        </p>
        <p class="item">
          <a href="javascript:;" class="getInfo" @click="getdepartmentmember">
            <Icon type="ios-search-outline" />查询</a
          >
        </p>
        <div
          class="item"
          style=" flex:2; display: flex; justify-content: flex-end"
        >
          <a href="javascript:;" class="addmember-btn" @click="addmember"
            >添加成员</a
          >
        </div>
        <!-- <div style=" display: flex; justify-content: flex-end">
         
        </div> -->
      </div>

      <div>
        <!-- <Button
          :style="{ margin: '24px 0', maxWidth: '100px' }"
         
          ></Button -->
        <!-- > -->
        <Table border :columns="columns" :data="data2"></Table>
      </div>
      <div class="pages">
        <Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          style="margin: auto"
          @on-change="changepages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  departmentmember,
  memberlist,
  departmentlist,
  departmentadd,
  departmentall,
  departmentStatus,
  departmentsub,
  findDeptUserName
} from "@/request/api";
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
          align: "center",
          width: 110
        },
        {
          title: "角色",
          key: "sysRoleNames",

          align: "center"
        },
        {
          title: "部门",
          key: "deptName",
          align: "center"
        },
        {
          title: "是否启用",
          key: "userEnable",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.userEnable == 1
                },
                style: {
                  margin: "0 auto",
                  "text-align": "center"
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
          width: 80,
          render: (h, params) => {
            return h("div", [
              // h(
              //   "a",
              //   {
              //     clssName: "action",
              //     style: {
              //       color: "#FF565A",
              //       padding: "10px"
              //     },
              //     on: {
              //       click: () => {
              //         this.$router.push({
              //           name: "function",
              //           query: {
              //             sysRoleName: params.row.userName,
              //             sysRoleId: params.row.deptUserId,
              //             fromURL: this.$route.name
              //           }
              //         });
              //       }
              //     }
              //   },
              //   "权限设置"
              // ),
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#FF565A"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "Add-members",
                        query: {
                          userId: params.row.userId,
                          name: params.row.userName,
                          deptId: params.row.deptIds,
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
              //       click: () => {}
              //     }
              //   },
              //   "删除"
              // )
            ]);
          }
        }
      ],
      role: 0,
      data2: [],
      deplist: [],
      parentId: 0,
      sun: true,
      sunlist: [],
      deptId: "",
      page: 1,
      size: 10,
      name: "",
      status: "",
      dataCount: 0,
      lowestlist: [],
      layer: ""
    };
  },
  mounted() {
    this.getdepartmentall();
    this.getdepartmentmember();
  },
  watch: {
    page() {
      console.log(11);
      this.getdepartmentmember();
    }
  },
  methods: {
    // 查询所有部门名称
    getdepartmentall() {
      departmentall({}).then(res => {
        if (res.code == 200) {
          this.deplist = [
            {
              deptId: "",
              deptName: "全部"
            },
            ...res.data
          ];
        }
        console.log(res);
      });
    },

    // 查询部门成员
    getdepartmentmember() {
      let obj = this.util.remove({
        page: { page: this.page, size: this.size },
        deptId: this.role == 0 ? "" : this.role,
        sort: "",
        name: this.name
      });

      findDeptUserName(obj).then(res => {
        if (res.code == 200) {
          this.data2 = res.data.list;
          this.dataCount = res.data.totalSize;
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //成员管理列表
    getmemberlist() {
      let obj = this.util.remove({
        page: { page: this.page, size: this.size },
        deptId: this.deptId == 0 ? "" : this.deptId,
        userId: "",
        name: this.name
      });
      console.log(obj);
      memberlist(obj).then(res => {
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

    //清除input
    clear() {
      (this.formValidate.deptName = ""),
        (this.formValidate.description = ""),
        (this.formValidate.parentId = ""),
        (this.formValidate.leader = "");
    },
    addmember() {
      this.$router.push({
        name: "Add-members",
        query: { states: 2, fromURL: this.$route.name }
      });
    },
    changepages(page) {
      this.page = page;
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

.Members-search {
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
}
.Members-search .item {
  flex: 2;
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

.getInfo {
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

.addmember-btn {
  display: block;
  width: 110px;
  height: 32px;
  line-height: 32px;
  background: #ff565a;
  border-radius: 15px;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
}
</style>
