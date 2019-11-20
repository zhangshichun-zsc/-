<!-- 积分明细(会员) -->
<template>
  <div class="integral-header">
  <Navigation :labels="navigation1"></Navigation>
  <div class="inter">
    <div class="inter-head">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
      <div class="flex-center-between integral-top">
        <div><Icon type="ios-search-outline"/><span>筛选查询</span></div>
        <div class="flex-center-end">
          <div class="integral-center"><Icon type="ios-arrow-down"/><span>收起筛选</span></div>
          <Button>查询结果</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>积分来源</span>
          <Select size='large' class="inpt">
            <Option value="1">1</Option>
            <Option value="1">1</Option>
          </Select>
        </div>
        <div class="flex-center-start">
          <span>操作时间</span>
          <TimePicker type="time" placeholder="注册时间" class="inpt" size='large'></TimePicker>
        </div>
      </div>
    </div>
    <div class="inter-list">
       <div class="table-header flex-center-between">
        <div>
          <Icon type="md-reorder" size='20'/>
          <span>数据列表</span>
        </div>
        <div>
          <Button class="table-btn">导出数据<Icon type="md-arrow-dropdown" /></Button>
          <Button class="table-btn">显示条数<Icon type="md-arrow-dropdown" /></Button>
          <Button class="table-btn">排序方式<Icon type="md-arrow-dropdown" /></Button>
        </div>
      </div>
      <Table border :columns="columns2" :data="data2"></Table>
      <div class="pages">
        <Page :total="100" show-elevator show-total size='small'/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
       navigation1: {
        head: "积分明细(会员)"
       },
      columns1: [
        {
          title: '用户账号',
          key: 'account'
        },
        {
          title: '用户昵称',
          key: 'nickName'
        },
        {
          title: '会员等级',
          key: 'leve'
        },
        {
          title: '可用积分',
          key: 'integral'
        }
      ],
      data1: [
        {
          account: 1800000000,
          nickName: 'juan man',
          leve: '受益方',
          integral: 200
        }
      ],
      columns2: [
        {
          title: '积分来源',
          key: 'source'
        },
        {
          title: '积分变化',
          key: 'change'
        },
        {
          title: '时间',
          key: 'time'
        },
        {
          title: '备注',
          key: 'note'
        }
      ],
      data2: [
        {
          source: '管理员修改',
          change: '+100',
          time: '2019-10-01 10:14',
          note: '操作人员：admin  操作备注：无'
        },
        {
          source: '管理员修改',
          change: '+100',
          time: '2019-10-01 10:14',
          note: '操作人员：admin  操作备注：无'
        }
      ]
    }
  },

  components: {},

  computed: {},

  created () {},

  methods: {}
}

</script>
<style lang="scss">
.inter-head{
  margin-bottom: 30px;
}
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top{
  padding: 15px 20px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
}
.integral-header .integral-center{
  margin: 0 20px;
}
.integral-header .integral-body{
  padding: 20px;
  background: #fff;
}
.integral-header .integral-body .flex-center-start .inpt{
  width: 200px;
  margin-left: 15px;
}
.integral-header .integral-body .flex-center-start{
  margin-right: 20px;
}
.inter-list{
  margin-top: 30px;
}
.table-header{
  padding: 10px 20px;
  background: rgb(228, 228, 228);
  border:1px solid #eee;
}
.table-header .table-btn{
  margin-left: 15px;
}
.pages{
  padding: 5px 20px;
  margin-top: 50px;
  background: #fff;
}
</style>
