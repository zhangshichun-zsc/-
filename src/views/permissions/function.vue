<!--功能权限设置(共用)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con">
        <div class="title bk">
          <p>
            <span>当前人员:*****</span>
          </p>
        </div>
        <div class="choose">
          <Tabs value="name1">
            <TabPane label="功能权限设置" name="name1">
              <Row>
                <Col span="8">
                  <Menu>
                    <Submenu name="1" v-for="(item,index) in list" :key="index">
                      <template slot="title">
                        <Icon type="ios-paper" />{{item.parentName}}<Checkbox v-model="single"></Checkbox>
                      </template>
                      <MenuItem name="1-1" v-for="(value,keys) in item.list" :key="keys">{{value.name}} <Checkbox v-model="single"></Checkbox></MenuItem>
                    </Submenu>
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
import {Permissionset} from '@/request/api'
import Table from "iview/src/components/table/table";
export default {
  components: { Table },
  data() {
    return {
      navigation1: {
        head: "功能权限设置(共用)"
      },
      single:false,
      sysMenuIds:[],
      sysRoleId:[],
      list:[],
    };
  },
  methods:{

    //查询
    getPermissionset(){
      Permissionset({
      }).then(res=>{
        if(res.code==200){
          this.list=res.data
        }else{
          this.$Message.info(res.msg)
        }
        console.log(res)
      })
    },

     // 角色权限设置
    getroleSetup() {
      roleSetup({
        sysRoleId:this.sysRoleId,
        sysMenuIds:this.sysMenuIds,
      }).then(res => {
        console.log(res);
      });
    },
    //保存
    save(){
      this.getroleSetup()
    }
  },
  mounted(){
    this.getPermissionset()
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
</style>
