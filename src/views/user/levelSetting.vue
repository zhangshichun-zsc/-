<template>
  <div class="integral">
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <Icon type="md-reorder" size='20'/>
          <span>数据列表</span>
        </div>
        <div>
          <Button class="table-btn">积分设置规则</Button>
          <Button class="table-btn">添加</Button>
        </div>
      </div>
      <Table border ref="selection" :columns="columns" :data="listMsg"></Table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '等级名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '默认等级',
          key: 'name',
          align: 'center',
          render: (h, params) => {
            return h('i-switch', {})
          }
        },
        {
          title: '积分满足点',
          key: 'point',
          align: 'center'
        },
        {
          title: '反馈奖励',
          key: 'feedbackReward',
          align: 'center'
        },
        {
          title: '评价奖励',
          key: 'evaluateReward',
          align: 'center'
        },
        {
          title: '备注',
          key: 'remarks',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', {
              style: {
                color: 'green',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.$router.push({ path: './addUserType' })
                }
              }
            }, '编辑')
          }
        }
      ],
      listMsg: [
        {
          name: '营员',
          point: '10',
          feedbackReward: '+5积分/条',
          evaluateReward: '+5积分/条',
          remarks: '无'
        }
      ]
    }
  }
}
</script>

<style scoped>
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top{
  padding: 20px;
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
.integral-table{
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
</style>
