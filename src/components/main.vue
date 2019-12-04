<!--  -->
<template>
  <div class="main">
    <div class="layout">
      <Layout>
        <Header :style="{position: 'fixed', width: '100%'}">
          <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-nav">
              <div class="layout-logo">
                <img src="../assets/logo.svg" />
                <span>后台管理系统</span>
              </div>
              <div class="icon">
                <span>
                  <Icon title="系统首页" @click="home" type="ios-home-outline" size="26" style="cursor: pointer;" />
                </span>

                <Dropdown prop="transfer:true">
                  <span>
                    <Icon title="常用菜单" type="ios-menu-outline" size="26" />
                  </span>
                  <DropdownMenu slot="list" style="width:300px" class="drop">
                    <DropdownItem style="display:flex;justify-content: space-between">
                      <p style="color:gray">常用菜单</p>
                      <p style="color:green" @click="modal2=true">菜单管理</p>
                    </DropdownItem>
                    <DropdownItem divided style="display:flex;justify-content: space-around">
                      <p @click="manger">活动管理</p>
                      <p @click="group">机构列表</p>
                      <p @click="order">订单列表</p>
                    </DropdownItem>
                    <DropdownItem style="display:flex;justify-content: space-around">
                      <p @click="user">用户列表</p>
                      <p @click="approval">活动立项</p>
                      <p @click="adlist">广告列表</p>
                    </DropdownItem>
                    <DropdownItem style="display:flex;justify-content: space-around">
                      <p>专题列表</p>
                      <p @click="department">部门管理</p>
                      <p @click="member">成员管理</p>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <Dropdown prop="transfer:true">
                  <span title="账户信息">
                    <Icon type="ios-contact-outline" size="26" />admin
                  </span>
                  <DropdownMenu slot="list">
                    <DropdownItem style="display:flex;justify-content: space-between">
                      <p>账户信息</p>
                      <p style="color:green" @click="less">账户设置</p>
                    </DropdownItem>
                    <DropdownItem divided>• 所在部门：IT系统管理部</DropdownItem>
                    <DropdownItem>• 本次登录：2019-07-01 14:36:21</DropdownItem>
                    <DropdownItem>• 登录地区：北京市 (IP：1.1.1.1)</DropdownItem>
                    <DropdownItem>• 上次登录：2019-06-31 14:36:21</DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <Modal v-model="modal2" width="800px">
                  <p slot="header">
                    <span>常用菜单设置</span>
                  </p>
                  <p slot="header" style="color:#ccc;font-weight:normal">
                    <span>通过点击勾选可添加菜单为管理常用操作项，最多添加9个</span>
                  </p>
                  <div class="cai">
                    <ul>
                      <li>一级分类</li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                    </ul>
                    <ul>
                      <li>一级分类</li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                    </ul>
                    <ul>
                      <li>一级分类</li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                    </ul>
                    <ul>
                      <li>一级分类</li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                    </ul>
                  </div>
                  <div class="cai">
                    <ul>
                      <li>一级分类</li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                    </ul>
                    <ul>
                      <li>一级分类</li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                    </ul>
                    <ul>
                      <li>一级分类</li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                    </ul>
                    <ul>
                      <li>一级分类</li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                      <li>
                        <Checkbox>二级菜单</Checkbox>
                      </li>
                    </ul>
                  </div>
                </Modal>
                <span>|</span>
                <Dropdown>
                  <span class="mess">
                    <div class="message">50</div>
                    <Icon title="系统消息" type="ios-notifications-outline" size="26" />
                  </span>
                  <DropdownMenu slot="list" style="width:260px">
                    <DropdownItem>
                      <p style="color:gray">提示</p>
                    </DropdownItem>
                    <DropdownItem divided style="display:flex;justify-content: space-between">
                      <p @click="pend">报名待审核</p>
                      <p>（10）</p>
                    </DropdownItem>
                    <DropdownItem divided style="display:flex;justify-content: space-between">
                      <p @click="pend">转移待审核</p>
                      <p>（10）</p>
                    </DropdownItem>
                    <DropdownItem divided style="display:flex;justify-content: space-between">
                      <p @click="pend">待领取物资</p>
                      <p>（10）</p>
                    </DropdownItem>
                    <DropdownItem divided style="display:flex;justify-content: space-between">
                      <p @click="pend">待发放物资</p>
                      <p>（10）</p>
                    </DropdownItem>
                    <DropdownItem divided style="color:gray">
                      <p>广告位提示</p>
                    </DropdownItem>
                    <DropdownItem divided style="display:flex;justify-content: space-between">
                      <p @click="adlist">广告位即将到期</p>
                      <p>（10）</p>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <span>|</span>
                <span>
                  <Icon title="退出登录" @click="modal1=true" type="ios-power-outline" size="26" style="cursor: pointer;" />
                </span>
                <Modal v-model="modal1" title="退出确认">
                  <h4>确定要退出登录吗？</h4>
                  <div slot="footer">
                    <Button type="text" size="large" @click="modalOk(0)">取消</Button>
                    <Button type="primary" size="large" @click="modalOk(1)">确定</Button>
                  </div>
                </Modal>
              </div>
            </div>
          </Menu>
        </Header>
        <Layout>

          <Sider hide-trigger breakpoint="md" collapsible :collapsed-width="78" id='sider' :style="{position: 'fixed', 'padding-top': '50px', height: '100vh', left: 0, overflow: 'auto', background:'#fff'}">
            <!-- <div class="toggle-button">|||</div> -->
            <Menu :active-name="active" :open-names="['1']" theme="dark" width="auto" ref="child" accordion>
              <Submenu :name="index+1" id='top' v-for="(item, index) in routelist" :key="index">
                <template slot="title">
                  <img class='icon-img' v-if='item.icon' :src="`https://rhzgtest.co-inclusion.org/app/menu_icon/${item.icon}.svg` ">
                  <Icon v-else type="ios-bookmark" />
                  <span style='font-size: 14px;color: #1B2331;line-height: 14px;'>{{ item.parentName}}</span>
                </template>
                <Menu-item :name="`${index+1}-${keys+1}`" v-for="(value,keys) in item.list" :key="keys" :to="{name: value.url}" @click.native="savestate(`${index+1}-${keys+1}`)">
                  <Icon type="md-arrow-dropright" />
                  <span class='color: #1b2331'> {{ value.name }}</span>
                </Menu-item>
              </Submenu>
            </Menu>
          </Sider>
          <Layout>
            <Content class="main-content">
              <router-view />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  </div>
</template>

<script>
import { homepage } from '../request/api'
export default {
  props: ['labels'],
  data() {
    return {
      routelist:this.gethomepage(),
      modal1: false,
      modal2: false,
      active: '',
      token: '',
      list:function(){
        this.routelist=sessionStorage.getItem('routelist')
        console.log(this.routelist,sessionStorage.getItem('routelist'))
      }
    }
  },

  components: {},

  computed: {},

  //保存储存的信息
  created() {
    this.active = window.sessionStorage.getItem('active')
    // this.routelist = window.sessionStorage.getItem('routelist')
    // console.log(this.routelist)
  },

  methods: {
    gethomepage() {
      homepage({
        userId: this.$store.state.userId
      }).then(res => {
        if (res.code == 200) {
          // return res.data
          this.routelist = res.data
        }
        console.log(res)
      })
    },
    home() {
      this.$router.push({ name: 'index' })
    },
    less() {
      this.$router.push({ name: 'less' })
    },
    pend() {
      this.$router.push({ name: 'volunteer_pending' })
    },
    adlist() {
      this.$router.push({ name: 'vp_adlist' })
    },
    manger() {
      this.$router.push({ name: 'manager' })
    },
    group() {
      this.$router.push({ name: 'grouplisthy' })
    },
    order() {
      this.$router.push({ name: 'order' })
    },
    user() {
      this.$router.push({ name: 'all_member_hy' })
    },
    approval() {
      this.$router.push({ name: 'approval' })
    },
    department() {
      this.$router.push({ name: 'departmentMGT' })
    },
    member() {
      this.$router.push({ name: 'membersMGT' })
    },
    //保存点击的信息
    savestate(active) {
      window.sessionStorage.setItem('active', active)
    },

    modalOk(e) {
      this.modal1 = false
      if (e == 1) {
        this.$store.commit('clearToken')
        this.$router.push({ name: 'login' })
        console.log(this.$store.state.token)
      }
    },

    one() {
      console.log(111, this.$router.options.routes)
    }
  },
  mounted() {
    // this.gethomepage()
  }
}
</script>
<style lang="scss" scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  padding-left: 35px;
  height: 60px;
  background: #c11333;
  border-radius: 3px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    padding-left: 10px;
    font-size: 20px;
    color: #ffffff;
  }
}
.icon-img {
  width: 32px;
  height: 32px;
  vertical-align: middle;
}

.icon {
  padding-right: 35px;
}
.layout-logo img {
  width: 48px;
}
.layout-nav {
  display: flex;
  justify-content: space-between;
}
.main-bread {
  margin: 25px;
}
.main-content {
  padding: 0 20px 20px;
  padding-left: 280px;
  padding-top: 60px;
  background-color: #f2f2f2;
}

//  当宽度小于  xs: '480px',  lg: '992px',xl: '1200px', xxl: '1600px'
@media screen and (max-width: 992px) {
  .main-content {
    padding-left: 380px;
  }
  #sider {
    background: red;
    width: 200px !important;
  }
}

.ivu-layout .ivu-layout-header,
.ivu-layout-header .ivu-menu {
  // position:relative;
  background: #c11333;
  padding: 0;
  height: 60px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
}

.flex-center-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cm {
  background: red($color: #000000);
}
.toggle-button {
  background-color: #4a5064;
  text-align: center;
  font-size: 10px;
  color: #fff;
  line-height: 24px;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.icon span {
  margin-right: 15px;
  color: white;
}
.drop p:hover {
  color: green;
}
.mess {
  position: relative;
}
.message {
  position: absolute;
  top: -8px;
  right: 0;
  width: 0.6rem;
  height: 0.6rem;
  text-align: center;
  line-height: 0.6rem;
  font-size: 0.4rem;
  color: white;
  border-radius: 50%;
  background: red;
}
.cai {
  display: flex;
  justify-content: space-around;
}
.cai li {
  margin-top: 10px;
}
.cai ul {
  border-right: 1px solid #ccc;
  padding-right: 30px;
  padding-left: 10px;
  margin-top: 20px;
}
.cai ul li:first-child {
  font-weight: bold;
  color: green;
}
.ivu-menu-dark {
  background-color: #fff;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item {
  color: #1b2331;
}
#top .ivu-menu-submenu-title:hover {
  background-color: red !important;
  color: red !important;
}

.ivu-menu-opened {
  background: #ffffff !important;
}
.ivu-menu-submenu-title:hover {
  color: #fc494d !important;
  background: #f6f7f9 !important;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item:hover {
  color: #fc494d !important;
  background: #f6f7f9 !important;
}

.ivu-menu-item {
  color: #1b2331;
}
//  隐藏滚动条的样式
::-webkit-scrollbar {
  width: 0px;
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: transparent;
}
</style>
