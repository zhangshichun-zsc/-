<!--功能权限设置(共用)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con">
        <div class="title bk">
          <p>
            <span class="btn"
              >当前人员:{{ sysRoleName ? sysRoleName : "" }}</span
            >
          </p>
        </div>
        <div class="choose">
          <Tabs value="name1">
            <TabPane label="功能权限设置" name="name1">
              <Row>
                <Col span="8">
                  <!--  :default-checked-keys="USERLIST" -->
                  <chu-tree
                    accordion
                    :data="data"
                    show-checkbox
                    node-key="id"
                    :props="defaultProps"
                    :default-checked-keys="USERLIST"
                    ref="tree"
                  ></chu-tree>
                </Col>
              </Row>
              <Button type="success" @click="save">保存</Button>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Permissionset, roleSetup, findRoleMenu } from "@/request/api";
import Table from "iview/src/components/table/table";

export default {
  components: { Table },
  data() {
    return {
      navigation1: {
        head: "功能权限设置(共用)"
      },
      single: false,
      sysRoleId: [],
      list: [],
      fruit: [],
      obj: {},
      sysRoleId: "",
      sysRoleName: "",
      firstClassMenu: [],
      ALLLIST: [], // 全部菜单
      USERLIST: [], // 用户选中的
      menuONE: {
        0: [true]
      }, // 一级菜单
      arr: [],
      parentMenu: [], // 父级菜单，
      subMenu: [],
      indeterminate: true,
      checkAll: false,

      // 菜单、

      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  watch: {},
  methods: {
    //查询
    getPermissionset() {
      let roleId = this.sysRoleId;
      findRoleMenu({ roleId }).then(res => {
        if (res.code == 200) {
          this.ALLLIST = res.data.menuList; // 所有的菜单
          // ! 用户选择的数据
          let userArr = res.data.subMenuRoles.map(item => {
            return item.sysMenuId;
          });
          this.USERLIST = userArr;
          //  ! 将数据转成 插件的数据结构
          let obj = [];
          res.data.menuList.forEach(item => {
            obj.push({
              id: item.sysMenuId,
              label: item.parentName,
              children: [
                ...item.list.map(key => {
                  return {
                    id: key.sysMenuId,
                    label: key.name
                  };
                })
              ]
            });
          });

          this.data = obj;
        } else {
          this.$Message.info(res.msg);
        }
        console.log(res);
      });
    },

    // 角色权限设置
    getroleSetup() {
      let list = this.list.toString();

      roleSetup({
        sysRoleId: this.sysRoleId,
        sysMenuIds: list
      }).then(res => {
        this.getPermissionset();
        this.$Message.info(res.msg);
        console.log(res);
        if (res.code == 200) {
          this.$router.push({
            name: this.$route.query.fromURL
          });
        }
      });
    },

    //保存
    save() {
      let arr = [];

      this.$refs.tree.getCheckedNodes().map(item => {
        arr.push(item.id);
      });

      this.list = arr;
      this.getroleSetup();
    }
  },
  mounted() {
    this.sysRoleId = this.$route.query.sysRoleId;
    this.sysRoleName = this.$route.query.sysRoleName;
    this.getPermissionset();
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

.choose {
  border: 1px solid #e4e4e4;
}
.content {
  margin: 10px;
}
.bk,
caption {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
}
.title {
  background-color: #f3f3f3;
  justify-content: space-between;
  padding: 10px 20px;
}
.choose {
  padding: 0 10px 50px 10px;
}
table,
.all {
  margin-bottom: 30px;
}
table,
.all {
  width: 100%;
}
caption,
.all {
  background-color: #f9fafc;
}
caption {
  text-align: left;
  padding: 10px 30px;
}
caption,
table td,
.all {
  font-size: 20px;
  font-weight: 400;
}
table td,
.all {
  padding: 10px 0;
  text-align: center;
}
table td,
.all {
  border: 1px solid #e7e7e7;
}
.all {
  text-align: center;
}
.choose button {
  display: block;
  margin: auto;
}
.ivu-checkbox-wrapper .ivu-checkbox span {
  display: none !important;
}
.btn {
  display: inline-block;
  padding: 0 15px;
  height: 32px;
  line-height: 32px;
  font-size: 16px;
  color: #fff;
  text-align: justify;
  background: #ff565a;
  border-radius: 15px;
}
</style>
