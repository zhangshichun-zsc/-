<!--权限设置(共用)-->
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
              <Menu :active-name="active" theme="light" width="300px" accordion>
                <Submenu :name="index+1" v-for="(item, index) in this.$router.options.routes" :key="index" v-if="item.meta.title">
                  <template slot="title">
                    +
                    {{ item.meta.title}}
                    <Checkbox style="position:absolute;right:24px;z-index:999"></Checkbox>
                    <div class="sub"></div>
                  </template>
                  <Menu-item :name="`${index+1}-${keys+1}`" v-for="(value,keys) in item.children" :key="keys" :to="{name: value.name}" v-if="value.meta.title" @click.native="savestate(`${index+1}-${keys+1}`)">
                    <Icon :type="value.meta.icon"></Icon>
                    {{ value.meta.title }}
                    <Checkbox style="position:absolute;right:24px"></Checkbox>
                  </Menu-item>
                </Submenu>
              </Menu>
              <div class="all">
                <Checkbox>选择全部</Checkbox>
              </div>
              <Button type="success">保存</Button>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from 'iview/src/components/table/table'
export default {
  components: { Table },
  data() {
    return {
      active: '',
      navigation1: {
        head: '权限设置(共用)'
      }
    }
  },
  //保存储存的信息
  created() {
    this.active = window.sessionStorage.getItem('active')
  },
  methods: {
    //保存点击的信息
    savestate(active) {
      window.sessionStorage.setItem('active', active)
    }
  }
}
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
.sub {
  position: absolute;
  z-index: 50;
  right: 0;
  top: 0;
  width: 50px;
  height: 50px;
  background: white;
}
</style>
