<!--举报列表(会员)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con-top bk-szy flex-center-start">
        <p>
          <Icon type="ios-search" size="30" />
          <span>筛选查询</span>
        </p>
        <div class="flex-center-end">
          <div class="Pack">
            <Icon type="ios-arrow-down" />
            <span>收起筛选</span>
          </div>
          <Button size="small" @click="query">查询结果</Button>
        </div>
      </div>
      <div class="con bk inp flex-center-start">
        <p>
          <span>举报人:</span>&nbsp;
          <Input size="small" placeholder="举报人" style="width: 8rem" v-model="reportUserName" />
        </p>
        <p>
          <span>举报理由:</span>&nbsp;
          <Select style="width:6rem;" placeholder="全部" size="small" v-model="reportReason">
            <Option v-for="item in list" :value="item.dataKey" :key="item.dataKey">{{ item.dataValue }}</Option>
          </Select>
        </p>
      </div>
    </div>
    <div class="content">
      <div class="con-top bk-szy flex-center-start">
        <p>
          <Icon type="ios-list" size="30" />
          <span>数据列表</span>
        </p>
        <div class="flex-center-end">
          <Button size="small">
            显示条数
            <Icon type="md-arrow-dropdown" />
          </Button>
          <Button size="small">
            排序方式
            <Icon type="md-arrow-dropdown" />
          </Button>
        </div>
      </div>
      <div class="con">
        <Table ref="selection" border :columns="columns" :data="data" @on-selection-change="handleSelectionChange"></Table>
      </div>
      <div class="pages flex-center-between">
        <div>
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status">全选</Checkbox>
          </Button>
          <Select placeholder="批量操作" style="width: 150px">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button class="space">确定</Button>
        </div>
        <Page :total="dataCount" show-elevator show-total size="small" style="margin: auto" :page-size="pageSize" @on-change="changepages" />
      </div>
    </div>
  </div>
</template>

<script>
import { date1 } from '../../../request/datatime'

import { ReportList, Reportpage, ReportDel, Reportdelete } from '../../../request/api'
export default {
  data() {
    return {
      navigation1: {
        head: '举报列表(会员)'
      },
      list: [],
      data: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '举报理由',
          key: 'reportReasonText',
          align: 'center'
        },
        {
          title: '举报人',
          key: 'reportUserName',
          align: 'center'
        },
        {
          title: '举报时间',
          key: 'reportTimestamp',
          render: (h, params) => {
            return h('div', [h('p', date1('Y-m-dH:i:s', params.row.reportTimestamp))])
          }
        },
        {
          title: '举报对象',
          key: 'activityName',
          align: 'center'
        },
        {
          title: '举报状态',
          key: 'reportStatusText',
          align: 'center'
        },
        {
          title: '处理结果',
          key: 'reportDealResultText',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'a',
                {
                  clssName: 'action',
                  style: {
                    color: 'green'
                  },
                  on: {
                    click: () => {
                      if (params.row.reportStatusText == '未处理') {
                        this.$router.push({
                          name: 'ReportDetails-Not_hy',
                          query: { reportId: params.row.reportId }
                        }) //未处理
                      } else {
                        this.$router.push({
                          name: 'ReportDetails-Handled_hy',
                          query: { reportId: params.row.reportId }
                        }) //已处理
                      }
                    }
                  }
                },
                '查看'
              ),
              h(
                'a',
                {
                  style: {
                    marginRight: '5px',
                    marginLeft: '5px',
                    color: 'green'
                  },
                  on: {
                    click: () => {
                      this.delete(params.row.reportId)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      batchList: [
        { value: '2', label: '有效举报' },
        { value: '1', label: '无效举报' },
        { value: '3', label: '恶意举报' },
        { value: '0', label: '删除' }
      ],
      reportReason: '',
      reportUserName: '',
      page: 1,
      size: 10,
      pageSize: 10,
      dataCount: 0,
      sysType: 1,
      reportId: '',
      arr: [],
      status: false
    }
  },
  mounted() {
    this.getReportList()
    this.getReportpage()
  },
  methods: {
    //获取举报原因列表
    getReportList() {
      ReportList({}).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.list = res.data
          // let list = res.data
          // this.list = list.unshift( {dataKey: '', dataValue: "全部"})
          console.log(this.list)
        }
      })
    },
    // 举报管理--获取举报分页
    getReportpage() {
      Reportpage({
        page: { page: this.page, size: this.size },
        sysType: this.sysType,
        reportUserName: this.reportUserName,
        reportReason: this.reportReason
      }).then(res => {
        if (res.code == 200) {
          this.data = res.data.list
          this.data = res.data.list
          this.page = res.data.pageNum
          this.dataCount = res.data.totalSize
        }
        console.log(res)
      })
    },
    // 举报管理--获取举报详情
    getReportDel() {
      ReportDel({}).then(res => {
        console.log(res)
      })
    },
    // 举报管理--删除举报
    getReportdelete() {
      Reportdelete({
        reportId: this.reportId
      }).then(res => {
        if (res.code == 200) {
          this.getReportpage()
        }
        console.log(res)
      })
    },
    delete(e) {
      this.reportId = e
      this.getReportdelete()
    },
    //分页功能
    changepages(index) {
      this.page = index
      console.log(index)
      // this.getAddressList();
    },

    //每条数据单选框的状态
    handleSelectionChange(val) {
      this.arr = val
      console.log(this.arr)
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true
      } else {
        this.status = false
      }
    },
    //全选按钮
    chackall() {
      this.status = !this.status
      console.log(this.status)
      this.$refs.selection.selectAll(this.status)
    },

    //查询
    query() {
      this.getReportpage()
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

.bk {
  border: 1px solid #e4e4e4;
}
.content {
  margin: 1rem;
}
.con-top {
  background-color: #f3f3f3;
  justify-content: space-between;
  padding: 0.2rem 1rem;
}
.bk-szy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
}
.con p {
  margin-right: 3rem;
}
.inp {
  display: flex;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
}
.Pack,
.content button {
  margin-right: 1rem;
}
.pages {
  margin: 0.5rem;
}
</style>
