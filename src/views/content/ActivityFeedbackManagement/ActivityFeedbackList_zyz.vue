<!--活动反馈列表(志愿者)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con-top bk-szy flex-center-start">
        <p>
          <Icon type="ios-search" size="30"/>
          <span>筛选查询</span>
        </p>
        <div class="flex-center-end">
          <div class="Pack">
            <Icon type="ios-arrow-down"/>
            <span>收起筛选</span>
          </div>
          <Button size="small">查询结果</Button>
        </div>
      </div>
      <div class="con bk inp flex-center-start">
        <p>
          <span>活动名称:</span>&nbsp;
          <Input size="small" placeholder="活动名称" style="width: 8rem" />
        </p>
        <p>
          <span>所属项目:</span>&nbsp;
          <Select style="width:6rem;" placeholder="全部" size="small">
            <Option v-for="item in OptionsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </p>
      </div>
    </div>
    <div class="content">
      <div class="con-top bk-szy flex-center-start">
        <p>
          <Icon type="ios-list" size="30"/>
          <span>数据列表</span>
        </p>
        <div class="flex-center-end">
          <Button size="small">显示条数<Icon type="md-arrow-dropdown" /></Button>
          <Button size="small">排序方式<Icon type="md-arrow-dropdown" /></Button>
        </div>
      </div>
      <div class="con">
        <Table border :columns="columns" :data="data"></Table>
      </div>
      <div class="pages">
        <div class="batch">
          <Checkbox>全选</Checkbox>
          <Select placeholder="批量操作" style="width: 150px">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px">确定</Button>
        </div>
        <Page :total="100" show-elevator show-total size='small' style="margin: auto"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        navigation1: {
          head: "活动反馈列表(志愿者)"
        },
        OptionsList:[
          {value: 'ProductEvaluation',label: '商品评价'},
          {value: 'topics',label: '话题内容'},
          {value: 'UserComments',label: '用户评论'},
        ],
        data: [

        ],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '活动名称',
            key: 'EventName',
            align: 'center'
          },
          {
            title: '项目名称',
            key: 'ProjectName',
            align: 'center'
          },
          {
            title: '反馈人数',
            key: 'FeedbackNumber',
            align: 'center'
          },
          {
            title: '活动时间',
            key: 'ActivityTime',
            align: 'center'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  clssName: 'action',
                  style: {
                    marginRight: '5px',
                    color: 'green'
                  },
                  on: {
                    click: () => {
                      this.$router.push({ name: 'ActivityFeedbackDetails_zyz' })
                    }
                  }
                }, '反馈统计'),
                h('a', {
                  clssName: 'action',
                  style: {
                    marginRight: '5px',
                    color: 'green'
                  },
                  on: {
                    click: () => {
                      this.$router.push({ name: 'ActivityFeedback' })
                    }
                  }
                }, '查看'),
                h('a', {
                  style: {
                    color: 'green'
                  },
                  on: {
                    click: () => {
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        batchList:[
          {value: 'Effective',label: '有效举报'},
          {value: 'invalid',label: '无效举报'},
          {value: 'malicious',label: '恶意举报'},
          {value: 'delete',label: '删除'}
        ],
        modalView: false,
        FeedbackDate:{
          FeedbackIntroduction:' 恭喜您已成功参与活动！为了了解您的活动感受，进一步做好今后的活动工作，我们特进行此活动反馈，以便根据您的意见与建议，更加科学地、有针对性地改进课程，更好地满足您的需求。',
          FeedbackSuggestions:'希望此类活动更多些',
        },
        choose1: 'choose-A',
        choose2: 'choose-C',
      }
    },
    methods: {
      ok () {
        this.$Message.info('添加成功');
      },
      cancel () {
        this.$Message.info('已取消');
      }
    }
  }

</script>
<style lang="scss" scoped>
  html,body{
    margin: auto;
  }
  .main{
    background-color: #ffffff;
  }
  .main,
  .bk{
    border: 1px solid #E4E4E4;
  }
  .content{
    margin: 1rem;
  }
  .con-top{
    background-color: #F3F3F3;
    justify-content: space-between;
    padding:0.2rem 1rem;
  }
  .bk-szy{
    border-left: 1px solid #E4E4E4;
    border-right: 1px solid #E4E4E4;
    border-top: 1px solid #E4E4E4;
  }
  .con p{
    margin-right: 3rem;
  }
  .inp{
    display: flex;
    justify-content: flex-start;
    padding: 0.5rem 1rem;
  }
  .Pack,
  .content Button{
    margin-right: 1rem;
  }
  .pages{
    display: flex;
    justify-content: center;
    margin: 10px auto;
  }
  .batch{
    margin-left: 25px;
  }
</style>
