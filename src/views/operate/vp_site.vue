<!-- 站内信消息(会员) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <Icon type="ios-search-outline" />
          <span>筛选查询</span>
        </div>
        <div class="flex-center-end">
          <div class="integral-center">
            <Icon type="ios-arrow-down" />
            <span>收起筛选</span>
          </div>
          <Button>查询结果</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>消息标题</span>
          <Input size="large" placeholder="消息标题" class="inpt" />
        </div>
        <div class="flex-center-start">
          <span>发布时间</span>
          <Row>
            <Col span="12">
              <DatePicker type="date" placeholder="请选择日期" style="width: 200px" class="sdate"></DatePicker>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div class="flex-center-start">
          <Icon type="md-list" />
          <span>数据列表</span>
        </div>
        <div class="flex-center-end">
          <Button size="small" @click="modal1=true">发布消息</Button>
          <Button size="small" @click="screen">群发消息</Button>
          <Select size="small" class="inpt" placeholder="显示条数"></Select>
          <Select size="small" class="inpt" placeholder="排序方式"></Select>
        </div>
        <Modal v-model="modal1" title="群发短信" >
          <Form :model="formItem" :rules="ruleValidate" :label-width="150">
                 <FormItem label="发送对象" prop="SendObject">
                   <Input v-model="formItem.input" placeholder="选择用户"></Input>
                  </FormItem>
                 <FormItem label="标题" prop="Title">
                   <Input v-model="formItem.input" ></Input>
                  </FormItem>
                   <FormItem label="内容" prop="Content">
                     <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 4,maxRows: 4}"></Input>
                     <p style="color: #9EA7B4;font-size: 12px;">站内信标题不能超过20个字，内容不能超过100个字。</p>
                  </FormItem>
          </Form>
        </Modal>
      </div>
      <Table border :columns="columns" :data="data"></Table>
      <Modal v-model="modal2" title="查看消息" >
        <h1 style="text-align: center;">秒杀专区暂时下线公告</h1>
        <p style="text-align: center;color: #9EA7B4;">2017-08-02 15:47:44</p>
        <Divider style="margin: 0.5rem 0;" />
        <p>尊敬的用户，为了给您带来更好的体验，秒杀专区业务将于2017年4月26日22：00-2017年4月27日09:00期间进行系统升级，升级期间秒杀专区入口将暂时下线。升级后可正常充值和查看充值记录，请有需要的用户提前充值或者在系统升级后再充值。给您带来的不便，敬请谅解。感谢您一如既往的支持。</p>
      </Modal>
      <div class="pages">
        <Page :total="100" show-elevator show-total size="small" />
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
      modal2:false,
      ruleValidate:{
        SendObject:[
          { required: true, trigger: 'blur' }
        ],
        Title:[
          { required: true, trigger: 'blur' }
        ],
        Content:[
          { required: true, trigger: 'blur' }
        ]
      },
       navigation1: {
        head: "站内信消息(会员)"
       },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "编号",
          key: "id",
          render: (h, params) => {
            return h("div", "10001");
          }
        },
        {
          title: "消息标题",
          key: "title"
        },
        {
          title: "发布时间",
          key: "pubulishtime",
          render: (h, params) => {
            return h("div", "2019-08-02 15:47:44");
          }
        },
        {
          title: "发布人员",
          key: "publisher",
          algin: "center",
          render: (h, params) => {
            return h("div", "admin");
          }
        },
        {
          title: "接收对象",
          key: "receiver",
          algin: "center",
          render: (h, params) => {
            return h("div", "200人");
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276"
                  },
                  on: {
                    click: () => {
                      this.modal2=true
                      // this.$router.push({ name: 'integral_detail' })
                    }
                  }
                },
                "查看"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "red"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [

      ]
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {
    screen(){
      this.$router.push({name:'vp_screen'})
    }
  }
};
</script>
<style lang="scss">
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
Button{
    margin-right: 0.5rem;
}
</style>
