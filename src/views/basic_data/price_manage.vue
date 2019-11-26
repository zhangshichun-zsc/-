<!-- 基金管理(会员)-->
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
          <Button @click="getList()">查询结果</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>名称</span>
          <Input size="large" placeholder="基金名称" class="inpt" v-model="args.orgName" />
        </div>
        <div class="flex-center-start">
          <span>有效状态</span>
          <Select size="small" class="inpt" v-model="args.validFlag">
            <Option value="1">有效状态</Option>
            <Option value="0">无效状态</Option>
          </Select>
        </div>
        <div class="flex-center-start">
          <span>创建时间</span>
          <Row>
            <Col span="12">
               <DatePicker
                  type="datetimerange"
                  @on-change="handleChange"
                  placement="bottom-end"
                  placeholder="Select date"
                  style="width:300px"
                  format="yyyy-MM-dd HH:mm"
                ></DatePicker>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          全选
          <span>已选择0</span>
          <Button class="table-btn" @click="deletes()">批量删除</Button>
          <Button class="table-btn" @click="showModal(null)">新增</Button>
          <Modal v-model="modal1" title="新增基金" @on-ok="ok" @on-cancel="cancel">
            <Form ref="formValidate" :model="pams" :rules="ruleValidate" :label-width="120">
                 <FormItem label="基金名称" prop="orgName">
                   <Input v-model="pams.orgName" placeholder="请输入基金名称"/>
                  </FormItem>
                   <FormItem label="联系人员" prop="contactUserName">
                     <Input v-model="pams.contactUserName"/>
                  </FormItem>
                   <FormItem label="联系方式" >
                     <Input v-model="args.contactUserPhone"/>
                  </FormItem>
              </Form>
          </Modal>
        </div>
      </div>
      <Table border :columns="columns" :data="data" @on-select='select' @on-select-cancel='select' @on-select-all='select' @on-select-all-cancel='select'></Table>
      <div class="pages">
        <Page :total="sumSize" show-elevator @on-change='changePage' :page-size='args.size'/>
      </div>
    </div>
  </div>
</template>

<script>
import { getfund,updateFun } from '@/request/api'
import { filterNull } from '@/libs/utils'
export default {
  data() {
    return {
        navigation1: {
        head: "基金管理(会员)"
      },
      modal1: false,
        formItem: {
        input: '',
       },
       ruleValidate:{
          name: [
          { required: true, message: '基金名称不能为空', trigger: 'blur' }
                ],
          contactUserName: [
          { required: true, message: '联系人员不能为空', trigger: 'blur' }
                ]
       },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "基金名称",
          key: "orgName"
        },
        {
          title: "联系人",
          key: "contactUserName"
        },
        {
          title: "联系电话",
          key: "contactUserPhone",
        },
        {
          title: "创建时间",
          key: "createAt",
        },
        {
          title: "有效状态",
          key: "validFlag",
          algin: "center",
           render: (h, params) => {
            return h('div', [
              h('i-switch',{
                props:{
                  trueValue:1,
                  falseValue:0,
                  value: ~~params.row.validFlag
                },
                on: {
                  "on-change": (e) => {
                    // let item = this.datax[e]
                    // this.adds.itemId = item.itemId
                    // this.adds.typeFlag = item.typeFlag
                    // this.adds.name = item.name
                    // this.adds.validFlag = e
                    // this.addOk()
                  }
                }
              })
            ])
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props:{
                    type:'primary'
                  },
                  on: {
                    click: () => {
                      this.showModal(params.row)
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                 props:{
                   type:'primary'
                 },
                  on: {
                    click: () => {
                      this.pams.orgId = params.row.orgId
                      this.pams.delFlag = 1
                      this.pams.validFlag = params.row.validFlag
                      this.list = []
                      this.ok()
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [
      ],
      args:{
        orgName:null,
        startAt:null,
        endAt: null,
        validFlag:null,
        page: {
          page:1,
          size:10
        }
      },
      sumPage:1,
      sumSize:1,
      pams:{
        orgId:null,//新增不
		    sysId:1,
		    orgType:4,
		    orgName:null,
		    businessDays:null,
		    contactUserName:null,
		    contactUserPhone:null,
		    validFlag:1,
        status:2,
        delFlag:0,//1删除
      },
      list:[]
    };
  },

  components: {},

  computed: {},

  created() {
    this.getList()
  },

  methods: {
    getList(){
      let args = filterNull(this.args)
      getfund(args).then(res => {
        this.sumSize = res.data.totalSize
        this.data = res.data.list
        this.args.page = res.data.pageNum
        this.sumPage = res.data.totalNum
      })
    },
    changePage(e){
      this.args.page = e
      this.getList()
    },
    handleChange(e){
      this.args.startAt = e[0]
      this.args.endAt = e[1]
    },
    showModal(e){
      if(e == null){
        this.cancel()
      }else{
        this.pams.orgId = e.orgId
        this.pams.orgName = e.orgName
        this.pams.businessDays = e.createAt
        this.pams.contactUserName = e.contactUserName
        this.pams.contactUserPhone = e.contactUserPhone
      }
      this.list = []
      this.modal1 = true
    },
    ok() {
      let list = this.list
      list.push(this.pams)
      this.update()
    },
    update(list){
       list = filterNull(list)
      updateFun(list).then(res => {
        if(res.code == 200){
          this.$message.success('更新成功')
          this.list = []
          this.getList()
        }
      })
    },
    cancel() {
      this.pams.orgId = null
      this.pams.orgName = null
      this.pams.businessDays =null
      this.pams.contactUserName = null
      this.pams.contactUserPhone = null
    },
    select(e){
      this.list = e
    },
    deletes(){
      let list = this.list
      for(let item of list){
        item.delFlag = 1
      }
      this.list = list
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
</style>
