<!--举报列表(志愿者)-->
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
          <Button size="small">查询结果</Button>
        </div>
      </div>
      <div class="con bk inp flex-center-start">
        <p>
          <span>举报人:</span>&nbsp;
          <Input size="small" placeholder="举报人" style="width: 8rem" />
        </p>
        <p>
          <span>举报理由:</span>&nbsp;
          <Select style="width:6rem;" placeholder="全部" size="small">
            <Option v-for="item in ReasonList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
          <Button size="small">显示条数
            <Icon type="md-arrow-dropdown" /></Button>
          <Button size="small">排序方式
            <Icon type="md-arrow-dropdown" /></Button>
        </div>
      </div>
      <div class="con">
        <Table border :columns="columns" :data="data"></Table>
      </div>
      <div class="pages flex-center-between">
        <div>
          <Checkbox>全选</Checkbox>
          <Select placeholder="批量操作" style="width: 150px">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button class="space">确定</Button>
        </div>
        <Page :total="100" show-elevator show-total size='small' />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigation1: {
        head: '举报列表(志愿者)'
      },
      ReasonList: [
        { value: 'ProductEvaluation', label: '商品评价' },
        { value: 'topics', label: '话题内容' },
        { value: 'UserComments', label: '用户评论' }
      ],
      data: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '举报理由',
          key: 'ReportReason',
          align: 'center'
        },
        {
          title: '举报人',
          key: 'Whistleblowers',
          align: 'center'
        },
        {
          title: '举报时间',
          key: 'ReportTime',
          align: 'center'
        },
        {
          title: '举报对象',
          key: 'ReportObject',
          align: 'center'
        },
        {
          title: '举报状态',
          key: 'ReportStatus',
          align: 'center'
        },
        {
          title: '处理结果',
          key: 'ProcessingResults',
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
                      if (params.index === 0) {
                        this.$router.push({ name: 'ReportDetails-Not_zyz' }) //未处理
                      } else {
                        this.$router.push({ name: 'ReportDetails-Handled_zyz' }) //已处理
                      }
                    }
                  }
                },
                '查看'
              ),
              h(
                'span',
                {
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
                },
                '删除'
              )
            ])
          }
        }
      ],
      batchList: [
        { value: 'Effective', label: '有效举报' },
        { value: 'invalid', label: '无效举报' },
        { value: 'malicious', label: '恶意举报' },
        { value: 'delete', label: '删除' }
      ]
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
