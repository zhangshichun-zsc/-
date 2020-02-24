<!-- 系统消息(志愿者)  -->
<template>
  <div class='integral'>
    <div class='integral-header'>
       <Navigation :labels='navigation1'></Navigation>
      <div class='flex-center-between integral-top'>
        <div>
          <Icon type='ios-search-outline' />
          <span>筛选查询</span>
        </div>
        <div class='flex-center-end'>
          <div class='integral-center'>
            <Icon type='ios-arrow-down' />
            <span>收起筛选</span>
          </div>
          <Button>查询结果</Button>
        </div>
      </div>
      <div class='flex-center-start integral-body'>
        <div class='flex-center-start'>
          <span>消息标题</span>
          <Input size='large' placeholder='消息标题' class='inpt' />
        </div>
        <div class='flex-center-start'>
          <span>发布时间</span>
          <Row>
            <Col span='12'>
              <DatePicker type='date' placeholder='请选择日期' style='width: 200px' class='sdate'></DatePicker>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div class='integral-table'>
      <div class='table-header flex-center-between'>
        <div class='flex-center-start'>
           <Icon type='md-list' />
          <span>数据列表</span>
        </div>
        <div class='flex-center-end'>
                  <Button size='small' @click='modal1 = true'>发布消息</Button>
                  <Select size='small' class='inpt' placeholder='显示条数'></Select>
                  <Select size='small' class='inpt' placeholder='排序方式'></Select>
          </div>
           <Modal v-model='modal1' title='发布消息' >
          <Form :model='formItem' :rules="ruleValidate" :label-width='120'>
                 <FormItem label='消息标题' prop="NewsHeadlines">
                   <Input v-model='formItem.input' placeholder='请输入标题'></Input>
                  </FormItem>
                   <FormItem label='消息内容' prop="MessageContent">
                     <Input v-model='formItem.textarea' type='textarea' :autosize='{minRows: 4,maxRows: 4}' placeholder='请输入内容...'></Input>
                  </FormItem>
        </Form>
          </Modal>
      </div>
      <Table border :columns='columns' :data='data'></Table>
      <div class='pages'>
        <Page :current='page' :total='100' show-elevator show-total size='small' />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
                },
      modal1:false,
      ruleValidate:{
        NewsHeadlines:[
          { required: true, trigger: 'blur' }
        ],
        MessageContent:[
          { required: true, trigger: 'blur' }
        ],
      },
      navigation1: {
        head: '系统消息(志愿者)'
       },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '编号',
          key: 'uid',
          render: (h,params)=>{
          return h('div','10001')
          }
        },
        {
          title: '消息标题',
          key: 'title',
          render:(h,params)=> {
          return h('div','系统升级提醒')
          }
        },
        {
          title: '发布时间',
          key: 'pubulishtime',
          render: (h,params)=> {
          return h('div','2019-08-02 15:47:44')
          }
        },
        {
          title: '发布人员',
          key: 'publisher',
          algin: 'center',
          render: (h, params) => {
          return h('div', 'admin')
          }
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
                    color: '#097276'
                  },
                  on: {
                    click: () => {
                      this.modal1=true
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
                    color: 'red'
                  },
                  on: {
                    click: () => {}
                  }
                },
                '删除'
              )
            ]);
          }
        }
      ],
      data: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ]
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {
    ok () {
      this.$Message.info('新增成功')
    },
    cancel () {
      this.$Message.info('新增失败')
    }
  }
};
</script>
<style lang='scss'>
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  padding: 15px 20px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
}
.integral-header .integral-center {
  margin: 0 20px;
}
.integral-header .integral-body {
  padding: 20px;
  background: #fff;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 200px;
  margin-left: 15px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 20px;
}
.integral-table {
  margin-top: 30px;
}
.table-header {
  padding: 5px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.table-header .table-btn {
  margin-left: 15px;
}
.integral-table .pages {
  padding: 5px 20px;
  margin-top: 50px;
  background: #fff;
}
.pages {
  text-align: center;
}
.ipt {
  margin-left: 10px;
}
.sdate {
  margin-left: 15px;
}
</style>
