<!--费用报表(会员)-->
<template>
  <div class="main">
    <Tophead :navigation1=navigation1 :top=top @query=query></Tophead>
    <div class="content">

      <div class="con">
        <div class="title bk-zy">
          <div class="batch">
            <Button @click="chackall()" style="border:0px;">
              <Checkbox v-model="status">全选</Checkbox>
            </Button>
            <Button style="margin-left: 10px" @click="exportData">导出</Button>
          </div>
        </div>
        <Table ref="selection" border :columns="columns" :data="data" @on-selection-change="handleSelectionChange"></Table>
      </div>
      <div class="pages">
        <Page  :current.sync='page' :total="dataCount" show-elevator show-total size="small" style="margin: auto" :page-size="size" @on-change="changepages" />
      </div>
    </div>
  </div>
</template>

<script>
import { tablepage } from '../../request/mixin'
import { date1 } from '../../request/datatime'
export default {
  data() {
    return {
      navigation1: {
        head: '费用报表(会员)'
      },
      modelQuery: {
        username: '',
        MobilePhone: '',
        CostType: ''
      },
      CostType: [],
      data: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'MobilePhone',
          align: 'center'
        },
        {
          title: '费用类型',
          key: 'CostType',
          align: 'center'
        },
        {
          title: '费用金额',
          key: 'amount',
          align: 'center'
        },
        {
          title: '活动名称',
          key: 'EventName',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'CreationTime',
          align: 'center'
        }
      ],
      page: 1,
      size: 10,
      dataCount: 0,
      name: '',
      createTimeStamp: '',
      datas: '',
      status: false,
      arrs: [],
      top: [
        { name: '姓名', type: 'input', value: '' },
        { name: '手机号', type: 'input', value: '' },
        { name: '费用类型', type: 'select', list: [], value: '' }
      ]
    }
  },
  mixins: [tablepage],
  methods: {
    //查询
    results() {},
    //分页功能
    changepages(index) {
      this.page = index
      console.log(index)
      this.getLabelpage()
    },
    //全选按钮
    chackall() {
      this.status = !this.status
      this.$refs.selection.selectAll(this.status)
    },
    //选择内容
    handleSelectionChange(val) {
      console.log(val)
      this.arrs = val
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true
      } else {
        this.status = false
      }
    },

    //查询
    query(e) {
      console.log(e)
    }
  },
  mounted() {}
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
  margin: 10px;
}
.bk {
  border: 1px solid #e4e4e4;
}
.bk-xia {
  border-bottom: 1px solid #e4e4e4;
}
.bk-zy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
}
.title {
  background-color: #f3f3f3;
  justify-content: space-between;
  padding: 5px 20px;
}
.Pack {
  margin-right: 5px;
}
.query p {
  margin-right: 5px;
}
.ivu-form {
  margin-top: 1rem;
  padding-left: 1rem;
}
.ivu-form-item {
  display: flex;
}
.pages {
  display: flex;
  justify-content: center;
  margin: 10px auto;
}
.batch {
  margin-left: 25px;
}
</style>
