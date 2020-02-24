<!--家长小组活动统计(会员)-->
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
          <Input placeholder="按活动名称搜索" style="width:250px;margin: 5px"></Input>
          <DatePicker type="daterange" split-panels placeholder="Select date" style="width: 200px"></DatePicker>
        </div>
      </div>
      <div class="data table">
        <Table border :columns="columns" :data="data"></Table>
        <div class="filter">
          <Icon type="md-color-filter" @click="modal1=true" />
        </div>
        <Modal v-model="modal1">
          <ul>
            <li>
              <Checkbox>全选</Checkbox>
            </li>
            <li>
              <Checkbox>丰台家长小组</Checkbox>
            </li>
            <li>
              <Checkbox>海淀家长小组</Checkbox>
            </li>
            <li>
              <Checkbox>家长联盟</Checkbox>
            </li>
            <li>
              <Checkbox>怀柔家长小组</Checkbox>
            </li>
          </ul>
        </Modal>
      </div>
      <div class="pages">
        <Page :current='page' :total="100" show-elevator show-total size='small' style="margin: auto" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigation1: {
        head: '家长小组活动统计(会员)'
      },
      modal1: false,
      data: [],
      columns: [
        {
          title: '家长小组',
          key: 'ParentGroup',
          align: 'center'
        },
        {
          title: '活动名称',
          key: 'ActivityName',
          align: 'center'
        },
        {
          title: '项目名称',
          key: 'Project',
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
          title: '工作人员人数',
          key: 'staffNumber',
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
.table {
  position: relative;
}
.filter {
  position: absolute;
  top: 1rem;
  left: 5.5rem;
}
li {
  width: 300px;
  height: 40px;
  line-height: 40px;
  border: 1px solid gray;
  border-top: none;
  margin: 0 auto;
}
</style>
