<!--登录日志(会员)-->
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
          <Icon type="md-reorder" size='20' />
          <p>数据列表</p>
        </div>
        <Table border :columns="columns" :data="data"></Table>
        <div class="pages">
          <Page :total="dataCount" show-elevator show-total size='small' @on-change="changepages" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { date1 } from '../../request/datatime'
import { Userhistory } from '../../request/api'
export default {
  data() {
    return {
      navigation1: {
        head: '登录日志(会员)'
      },
      columns: [
        {
          title: '时间',
          key: 'createAt',
          render: (h, params) => {
            return h('div', [h('p', date1('Y-m-dH:i:s', params.row.startAt))])
          }
        },
        {
          title: 'IP',
          key: 'ipAddr'
        },
        {
          title: '地区',
          key: 'address'
        },
        {
          title: '登录方式',
          key: 'typeFlag',
          render: (h, params) => {
            let str = params.row.typeFlag
            let name = ''
            if (str == 1) {
              name = '会员小程序登录'
            } else if (str === 2) {
              name = '志愿者小程序登录'
            } else {
              name = '后台登录'
            }
            return h('div', [h('p', name)])
          }
        }
      ],
      data: [],
      page: 1,
      size: 10,
      dataCount: 0,
      userId: 2,
      sysType: 2
    }
  },
  methods: {
    userDetaile() {
      this.$router.push({
        name: 'user_details_hy',
        query: {
          userId: this.$route.query.userId
        }
      })
    },
    Editor() {
      this.$router.push({
        name: 'Edit_data_hy',
        query: {
          userId: this.$route.query.userId
        }
      })
    },

    //分页功能
    changepages(index) {
      this.page = index
      console.log(index)
      this.gethistory()
    },

    //列表数据
    gethistory() {
      console.log({ page: this.page, size: this.size })
      Userhistory({
        page: { page: this.page, size: this.size },
        sysType: this.sysType,
        userId: this.$route.query.userId
      }).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.data = res.data.list
          this.page = res.data.totalNum
          this.dataCount = res.data.totalSize
        }
      })
    }
  },
  mounted() {
    this.gethistory()
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 50rem;
  margin: 0 auto;
}
.constant-title {
  border-top: 1px solid #e4e4e4;
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  padding: 0.5rem;
  background-color: #f3f3f3;
}
.pages {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 0.2rem 0;
}
</style>
