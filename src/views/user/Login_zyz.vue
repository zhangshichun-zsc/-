<!--登录日志(志愿者)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="main">
      <ButtonGroup>
        <Button @click="userDetaile()">用户详情</Button>
        <Button @click="Editor()">编辑资料</Button>
        <Button type="success">登录日志</Button>
      </ButtonGroup>
      <div class="constant">
        <div class="constant-title flex-center-start">
          <Icon type="md-reorder" size='20'/>
          <p>数据列表</p>
        </div>
        <Table border :columns="columns" :data="data"></Table>
        <div class="pages">
          <Page :total="100" show-elevator show-total size='small'/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        navigation1: {
          head: "登录日志(志愿者)"
        },
        columns: [
          {
            title: '时间',
            key: 'time'
          },
          {
            title: 'IP',
            key: 'ip'
          },
          {
            title: '地区',
            key: 'area'
          },
          {
            title: '登录方式',
            key: 'log'
          }
        ],
        data: [
          {
            time: '2019-10-01 10:05:01',
            ip: '193.168.1.1',
            area: '中国',
            log: '微信登录'
          },
          {
            time: '2019-10-01 10:05:01',
            ip: '193.168.1.1',
            area: '中国',
            log: '微信登录'
          }
        ]
      }
    },
    methods: {
      userDetaile(){
        this.$router.push({ name: 'user_details_hy' })
      },
      Editor(){
        this.$router.push({ name: 'Edit_data_hy' })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .main{
    width: 50rem;
    margin: 0 auto;
  }
  .constant-title{
    border-top: 1px solid #e4e4e4;
    border-left: 1px solid #e4e4e4;
    border-right: 1px solid #e4e4e4;
    padding: 0.5rem;
    background-color: #F3F3F3;
  }
  .pages{
    border-left: 1px solid #e4e4e4;
    border-right: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding: 0.2rem 0;
  }
</style>
