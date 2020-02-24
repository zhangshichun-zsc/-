<!--图片库管理(志愿者)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div  class="con top bk">
        <div class="title bk-xia flex-center-start">
          <p>
            <Icon type="ios-search" />
            <span>筛选查询</span>
          </p>
          <div class="flex-center-end">
            <div class="Pack">
              <Icon type="ios-arrow-down"/>
              <span>收起筛选</span>
            </div>
            <Button>开始查询</Button>
          </div>
        </div>
        <div class="con img-ss flex-center-start">
          <p>
            <span>输入搜索:</span>&nbsp;
          </p>
          <Input search size="large" placeholder="相册名称" style="width: 200px" />
        </div>
      </div>
      <div class="con">
        <div class="title bk-szy flex-center-start">
          <p>
            <Icon type="ios-list" />
            <span>数据列表</span>
          </p>
          <div class="but">
            <Button @click="but()">新建相册</Button>
            <Button>显示条数<Icon type="md-arrow-dropdown" /></Button>
            <Button>排序方式<Icon type="md-arrow-dropdown" /></Button>
          </div>
        </div>
        <Table border :columns="columns" :data="data"></Table>
      </div>
      <div class="pages">
        <Page  :total="100" show-elevator show-total size='small' style="margin: auto"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        navigation1: {
          head: "图片库管理(志愿者)"
        },
        data: [
        ],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '相册名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '图片数量',
            key: 'number',
            align: 'center'
          },
          {
            title: '排序',
            key: 'sorting',
            align: 'center'
          },
          {
            title: '描述',
            key: 'describe',
            align: 'center'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('span', {
                  clssName: 'action',
                  style: {
                    color: 'green'
                  },
                  on: {
                    click: () => {
                      this.$router.push({ name: 'Photo_zyz' })
                    }
                  }
                }, '编辑'),
                h('span', {
                  style: {
                    marginRight: '5px',
                    marginLeft: '5px',
                    color: 'green'
                  },
                  on: {
                    click: () => {
                      this.$Message.info('你点击了第' + params.index + '列')
                    }
                  }
                }, '删除')
              ])
            }
          }
        ]
      }
    },

    components: {},

    computed: {},

    created () {},

    methods: {
      but(){
        this.$router.push({ name: 'NowPhoto_zyz' })
      }

    },
  }

</script>
<style lang="scss" scoped>
  html,body{
    margin: auto;
  }
  .main{
    background-color: #ffffff;
    border: 1px solid #E4E4E4;
  }
  .content{
    margin: 10px;
  }
  .top{
    margin-bottom: 20px;
  }
  .bk{
    border: 1px solid #E4E4E4;
  }
  .bk-xia{
    border-bottom: 1px solid #E4E4E4;
  }
  .bk-szy{
    border-left: 1px solid #E4E4E4;
    border-right: 1px solid #E4E4E4;
    border-top: 1px solid #E4E4E4;
  }
  .title{
    background-color: #F3F3F3;
    justify-content: space-between;
    padding: 5px 20px;
  }
  .Pack,
  .but Button{
    margin-right: 5px;
  }
  .img-ss{
    display: flex;
    justify-content: flex-start;
    padding: 10px 20px;
  }
  .pages{
    display: flex;
    justify-content: center;
    margin: 10px auto;
  }
</style>
