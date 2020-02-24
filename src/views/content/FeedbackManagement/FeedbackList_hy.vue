<!--意见反馈列表(会员)-->
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
          <Button size="small">查询结果</Button>
        </div>
      </div>
      <div class="con bk inp flex-center-start">
        <p>
          <span>反馈人:</span>&nbsp;
          <Input size="small" placeholder="反馈人" style="width: 8rem" />
        </p>
        <p>
          <span>反馈类型:</span>&nbsp;
          <Select style="width:6rem;" placeholder="全部" size="small">
            <Option :value="null">全部</Option>
            <Option v-for="item in OptionsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </p>
        <p>
          <Button @click="modal1 = true">添加类型</Button>
          <Modal v-model="modal1" title="反馈类型设置">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                 <FormItem label="反馈类型名称" prop="name">
                     <Input v-model="formValidate.name"></Input>
                 </FormItem>
                 <FormItem label="类型描述" prop="detail">
                     <Input v-model="formValidate.detail" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入内容"></Input>
                 </FormItem>
              </Form>
          </Modal>
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
        <Page :current='page' :total="100" show-elevator show-total size='small' style="margin: auto"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      formValidate:{
         name:'',
         detail:''
       },
      ruleValidate:{
        name: [
            { required: true, message: '反馈类型名称不能为空', trigger: 'blur' }
            ],
        detail: [
            { required: true, message: '类型描述不能为空', trigger: 'blur' }
            ],
      },
      modal1: false,
        navigation1: {
          head: "意见反馈列表(会员)"
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
            title: '反馈类型',
            key: 'FeedbackType',
            align: 'center'
          },
          {
            title: '反馈人',
            key: 'FeedbackPeople',
            align: 'center'
          },
          {
            title: '反馈时间',
            key: 'FeedbackTime',
            align: 'center'
          },
          {
            title: '反馈内容',
            key: 'FeedbackContent',
            align: 'center'
          },
          {
            title: '状态',
            key: 'state',
            align: 'center'
          },
          {
            title: '回复内容',
            key: 'ReplyContent',
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
                    color: 'green'
                  },
                  on: {
                    click: () => {
                      this.$router.push({ name: 'FeedbackDetails-Note_hy' })
                      // this.$router.push({ name: 'FeedbackDetails-Handled_hy' })
                      //判断是否处理并调整页面
                    }
                  }
                }, '查看'),
                h('a', {
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
