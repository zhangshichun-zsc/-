<!-- 证书管理（共用） -->
<template>
  <div>
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
          <Button @click="queryMet()">查询结果</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>名称</span>
          <Input size="large" placeholder="基金名称" class="inpt" v-model="query.name" />
        </div>
        <div class="flex-center-start">
          <span>有效状态</span>
          <Select size="small" class="inpt" v-model="query.validFlag">
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
          <!-- <Button class="table-btn" @click="modal1 = true">{{title}}</Button> -->
          <Modal v-model="modal1" title="修改"  @on-cancel='cancel'>
            <Form ref="formValidate" :model="args" :rules="ruleValidate" :label-width="120">
              <FormItem :label="title" prop="name">
                <Input v-model="args.name"/>
              </FormItem>
            </Form>
              <div slot="footer">
                 <Button type="error" size="large" @click="update">确定</Button>
               </div>
          </Modal>
        </div>
      </div>
      <Table
        ref="selection"
        border
        :columns="columns"
        :data="data1"
      ></Table>
      <div class="pages">
        <Page
          :total="sumSize"
          show-elevator
          show-total
          size="small"
          style="margin: auto"
          :page-size="params.size"
          @on-change="changepages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from '../../request/datatime'
import basicdata from "../../components/basicdata"
import { getCard,updateCard } from '@/request/api'
import { filterNull } from '@/libs/utils'
export default {
  data() {
    return {
      open: false,
      time: '请选择时间段',
      navigation1: {
        head: "证件管理"
      },
      ruleValidate: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      title: "证书管理",
      columns: [
        {
          title: "名称",
          key: "name"
        },
        {
          title: "创建时间",
          key: "createAt",
        },
        {
          title: "创建人",
          key: "userName",
          render: (h,params) => {
            return h("span",params.row.userName?params.row.userName:'系统管理员')
          }
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
                    this.args.name = params.row.name
                    this.args.dicId = params.row.dicId
                    this.args.validFlag = e
                    this.update()
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
                      this.args.name = params.row.name
                      this.args.dicId = params.row.dicId
                      this.args.validFlag = params.row.validFlag
                      this.modal1 = true;
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      query:{
        name:null,
        validFlag:null,
        startAt:null,
        endAt:null,
      },
      params:{
        name:null,
        validFlag:null,
        startAt:null,
        endAt:null,
        page:{
          page: 1,
          size: 10
        }
      },
      data1: [],
      modal1: false,
      sumSize:10,
      args:{
        name:null,
        dicId:null,
        validFlag:null
      }
    };
  },

  components: { basicdata },

  computed: {},

  created() {
    this.getList()
  },

  methods: {
    getList(){
      getCard(filterNull(this.params)).then(res => {
        if(res.code == 200){
          this.data1 = res.data.list
          this.sumSize = res.data.totalSize
          this.sumPage = res.data.totalNum
        }else{
          this.$Message.error(res.msg)
        }
      })
    },
    update(){
      if(!this.args.name){
        this.$Message.warning('不能为空')
        return
      }
      updateCard(filterNull(this.args)).then(res => {
        if(res.code == 200){
          this.$set(this.params.page,'page',1)
          this.modal1 = false
          this.getList()
          this.$Message.success('修改成功')
          this.cancel()
        }else{
          this.$Message.error(res.msg)
        }
      })
    },
    cancel(){
      this.args.name = null
      this.args.dicId = null
      this.args.validFlag = null
    },
    successOk(){
      if(!this.query.startAt&&!this.query.endAt){
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
          end = end + ' 59:59:59'
        }else{
          start = start + ' 00:00:00'
          end = end + ' 00:00:00'
        }
      }
      this.query.startAt = start
      this.query.endAt = end
    },
    changepages(e){
      this.params.page = e
      this.getList()
    },
    queryMet(){
      if(this.query.validFlag=='-1'){
        this.query.validFlag=''
      }
      this.params = Object.assign(this.params,this.query)
      this.$set(this.params.page,'page',1)
      this.getList()
    }
  }
};
</script>
<style lang="scss" scoped>
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
.table-btn {
  position: relative;
}
.icon {
  position: absolute;
  padding: 2px;
  top: 0;
  right: 0;
  transform: translateY(-50%);
  background: yellow;
  color: #000;
}
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
</style>
