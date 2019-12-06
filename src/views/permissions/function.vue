<!--功能权限设置(共用)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con">
        <div class="title bk">
          <p>
            <span>当前人员:{{ sysRoleName ? sysRoleName : "" }}</span>
          </p>
        </div>
        <div class="choose">
          <Tabs value="name1">
            <TabPane label="功能权限设置" name="name1">
              <Row>
                <Col span="8">
                  <Menu>
                    <!-- <CheckboxGroup v-model="fruit"> -->
                    <Submenu
                      :name="index"
                      v-for="(item, index) in ALLLIST"
                      :key="index"
                    >
                      <template slot="title">
                        <!-- ！ 点击全选， 选中一部分， 展示不同的样式 -->

                        {{ arr[item.sysMenuId].checkAll }}
                        <!--    :value="arr[item.sysMenuId].checkAll" -->
                        <CheckboxGroup v-model="menuONE">
                          <Checkbox
                            :value="true"
                            :label="item.sysMenuId"
                            :indeterminate="arr[item.sysMenuId].indeterminate"
                            @click.prevent.native="handleCheckAll"
                            >{{ item.parentName }}}</Checkbox
                          >
                        </CheckboxGroup>
                      </template>
                      <CheckboxGroup
                        v-model="checkAllGroup"
                        @on-change="checkAllGroupChange"
                      >
                        <MenuItem
                          name="1-1"
                          v-for="(value, keys) in item.list"
                          :key="keys"
                        >
                          <Checkbox :label="value.sysMenuId">{{
                            value.name
                          }}</Checkbox>
                        </MenuItem>
                      </CheckboxGroup>
                    </Submenu>
                    <!-- </CheckboxGroup> -->
                  </Menu>
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
/**
 *  ! 实现 :1 展示选中的子项
 *  ! 2: 展示选中的父项
 *  ! 3: 实现全选,
 *  ! 4: 实现全不选
 *
 */

import { Permissionset, roleSetup, findRoleMenu } from "@/request/api";
import Table from "iview/src/components/table/table";
import { log } from "util";
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
      menuONE: [], // 一级菜单
      arr: [],
      checkAllGroup: [], // 已选的才当
      indeterminate: true,
      checkAll: false
    };
  },
  watch: {},
  methods: {
    //查询
    getPermissionset() {
      let roleId = this.sysRoleId;
      findRoleMenu({ roleId }).then(res => {
        if (res.code == 200) {
          this.ALLLIST = res.data.menuList;
          this.checkAllGroup = res.data.subMenuRoles.map(item => {
            return item.sysMenuId;
          });

          /**
           * !用来控制 一级菜单的首选项
           */
          let obj = {};
          res.data.parentMenuRoles
            .map(item => {
              return item.sysMenuId;
            })
            .forEach(key => {
              obj[key] = {
                indeterminate: false,
                checkAll: true
              };
            });
          this.arr = obj;
        } else {
          this.$Message.info(res.msg);
        }
        console.log(res);
      });
    },

    // 角色权限设置
    getroleSetup() {
      this.list = this.fruit.toString();
      roleSetup({
        sysRoleId: this.sysRoleId,
        sysMenuIds: this.list
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
    // 全选中一部分
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        let menuArr = this.ALLLIST;
        // TODO  保存所有的 满足父节菜单 的菜单
        // this.checkAllGroup = menuArr.map(item => {
        //   return item.sysMenuId;
        // });
      } else {
        this.checkAllGroup = [];
      }
    },

    // 全选中的情况
    checkAllGroupChange(data) {
      // console.log(data);
      if (data.length === 104) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = true;
      }
    },

    // 全选 END
    //保存
    save() {
      console.log(this.checkAllGroup);
      console.log(this.menuONE);
      // this.getroleSetup();
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
</style>
