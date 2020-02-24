<!--活动传播报表(会员)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="head flex-center-start">
        <p>
          <span>家长小组活动报表</span>
        </p>
        <div class="flex-center-between">
          <Button style="margin-right: 5px">导出数据</Button>
          <DatePicker type="daterange" split-panels placeholder="Select date" style="width: 200px"></DatePicker>
        </div>
      </div>
      <div class="data">
        <Table border :columns="columns" :data="data"></Table>
      </div>
      <div class="pages">
        <Page :total="100" show-elevator show-total size='small' style="margin: auto" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigation1: {
        head: '活动传播报表(会员)'
      },
      data: [],
      columns: [
        {
          title: '排名',
          key: 'indix',
          align: 'center'
        },
        {
          title: '活动名称',
          key: 'ActivityName',
          align: 'center'
        },
        {
          title: '活动类型',
          key: 'ActivityType',
          align: 'center'
        },
        {
          title: '活动日期',
          key: 'Date',
          align: 'center'
        },
        {
          title: '孩子人数',
          key: 'ChildNumber',
          align: 'center'
        },
        {
          title: '家长人数',
          key: 'ParentsNumber',
          align: 'center'
        },
        {
          title: '志愿者人数',
          key: 'VolunteersNumber',
          align: 'center'
        },
        {
          title: '点击率',
          key: 'Click',
          align: 'center'
        },
        {
          title: '阅读人数',
          key: 'ReadingNumber',
          align: 'center'
        },
        {
          title: '分享次数',
          key: 'ShareNumber',
          align: 'center'
        }
      ]
    }
  }
}
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
  border: 1px solid #e4e4e4;
  margin: 10px;
}
.head {
  background-color: #f3f3f3;
  justify-content: space-between;
  padding: 5px 20px;
}
.data {
  padding: 10px 20px;
}
.pages {
  display: flex;
  justify-content: center;
}
</style>
