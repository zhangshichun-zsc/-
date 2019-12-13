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
            <Option value="-1">全部</Option>
            <Option value="1">有效</Option>
            <Option value="0">无效</Option>
          </Select>
        </div>
        <div class="flex-center-start">
          <span>创建时间</span>
          <Row>
              <DatePicker
                :open="open"
                confirm
                type="daterange"
                @on-change="handleChange"
                @on-ok="successOk">
                <a href="javascript:void(0)" @click="open = true">
                    <Icon type="ios-calendar-outline"></Icon>
                    <template>{{ time }}</template>
                </a>
            </DatePicker>
          </Row>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          全选
          <span>已选择{{list.length}}</span>
          <!-- <Button class="table-btn" @click="deletes()">批量删除</Button> -->
          <Button class="table-btns" @click="showModal(null)">新增</Button>
          <Modal v-model="modal1" title="新增基金" @on-cancel="cancel">
            <Form ref="formValidate" :model="pams" :rules="ruleValidate" :label-width="120">
                 <FormItem label="基金名称" prop="orgName">
                   <Input v-model="pams.orgName" placeholder="请输入基金名称"/>
                  </FormItem>
                   <FormItem label="联系人员" prop="contactUserName">
                     <Input v-model="pams.contactUserName"/>
                  </FormItem>
                   <FormItem label="联系方式" prop='contactUserPhone' >
                     <Input v-model="pams.contactUserPhone"/>
                  </FormItem>
              </Form>
              <div slot="footer">
                 <Button type="error" size="large" @click="ok">确定</Button>
              </div>
          </Modal>
        </div>
      </div>
      <div class="min-height">
      <Table border :columns="columns" :data="data" @on-select='select' @on-select-cancel='select' @on-select-all='select' @on-select-all-cancel='select'></Table>

      </div>
      <div class="pages">
        <Page :total="sumSize" show-elevator @on-change='changePage' :page-size='args.size'/>
      </div>
    </div>
  </div>
</template>

<script>
import { getfund,updateFun } from '@/request/api'
import { filterNull } from '@/libs/utils'
import { parse } from 'path';
export default {
  data() {
     const validatePhone = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('手机号不能为空'));
        }else if(!(/^1[3456789]\d{9}$/.test(value))){
             return callback(new Error('手机号码有误，请重填'));
        }else{
            callback();
        }
      };
    return {
      time:'请选择时间段',
      open:false,
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
        ],
        contactUserPhone:[
          { validator: validatePhone, trigger: 'blur' }
        ]
      },
      columns: [
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center"
        // },
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
                    let item = params.row
                    this.$set(this.pams,'orgId',item.orgId)
                    this.$set(this.pams,'validFlag',e)
                    this.update([this.pams])
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
                "a",
                {
                   clssName: "action",
                  style: {
                    color: "#097276"
                  },
                  on: {
                    click: () => {
                      if(params.row.validFlag == '1'){
                         this.showModal(params.row)
                      }else{
                        this.$Message.error('无效状态不能编辑')
                      }

                    }
                  }
                },
                "编辑"
              )
              // ,
              // h(
              //   "Button",
              //   {
              //    props:{
              //      type:'primary'
              //    },
              //     on: {
              //       click: () => {
              //         if(params.row.validFlag === 1){
              //           this.pams.orgId = params.row.orgId
              //           this.pams.delFlag = 1
              //           this.pams.validFlag = params.row.validFlag
              //           this.update([this.pams])
              //         }else{
              //           this.$Message.error('无效状态不能编辑')
              //         }
              //       }
              //     }
              //   },
              //   "删除"
              // )
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
        delFlag:0, //1删除
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
      if(this.args.validFlag==-1){
        this.args.validFlag=''
      }
      let args = filterNull(this.args)
      getfund(args).then(res => {
        this.sumSize = res.data.totalSize
        this.data = res.data.list
        this.sumPage = res.data.totalNum
      })
    },
    changePage(e){
      this.$set(this.args.page,'page',e)
      this.getList()
    },
    successOk(){
      if(!this.args.startAt&&!this.args.endAt){
        this.time='请选择时间段'
      }
      this.open = false
    },
    handleChange(e){
      let start = e[0]
      let end = e[1]
      this.time = e[0] + '-' + e[1]
      if(start&&end){
        if(start === end){
          start = start + ' 00:00:00'
          end = end + ' 23:59:59'
        }else{
          start = start + ' 00:00:00'
          end = end + ' 00:00:00'
        }
      }
      this.args.startAt = start
      this.args.endAt = end
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
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
             this.update([this.pams])
        } else {
            this.$Message.error('没有填写完整');
        }
      })
    },
    update(list){
      updateFun(filterNull({list})).then(res => {
        if(res.code == 200){
          this.modal1 = false
          this.getList()
        }else{
          this.$Message.error(res.msg);
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
<style lang="scss" scoped>
@import "../../libs/basicdata.css"
</style>
