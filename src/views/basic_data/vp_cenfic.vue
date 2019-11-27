<!-- 证书管理(志愿者) -->
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
          <Button @click="query()">查询结果</Button>
          <Button>高级检索</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>组织</span>
          <Input size="large" placeholder="请输入" class="inpt" v-model="args.orgName" />
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
        <div class="flex-center-end">
          <Button @click="modal1 = true">新增模板</Button>
           <Modal v-model="modal1" title="新增证书模板" @on-ok='success'>
             <Form ref="formValidate" :model="params" :rules="ruleValidate" :label-width="120">
                 <FormItem label="组织" prop="organ">
                     <Select v-model="params.orgId">
                         <Option :value="item.orgId" v-for='(item,index) in volun' :key="index">{{ item.orgName }}</Option>
                     </Select>
                 </FormItem>
                 <FormItem label="模板名称" prop="mname">
                     <Input v-model="params.title"></Input>
                 </FormItem>
                 <FormItem label="生效日期" prop="effect">
                    <Date-picker
                    placement="bottom-end"
                    placeholder="选择日期"
                    style="width: 200px"
                    type="datetime" 
                    v-model="params.effectiveAt"
                    @on-change='changeDate'
                    :options="options"
                  ></Date-picker>
                 </FormItem>
              </Form>
          </Modal>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div class="data-ios">
         <div class="flex-center-start">
           <!-- <i-icon type="ios-apps" /> -->
          <span>数据列表</span>
         </div>
            <div class="flex-center-end">
              <Select size='small' class="inpt" placeholder="显示条数" @on-change='changeNum'>
                <Option :value="item" v-for='(item,index) in numList' :key="index">{{ item }}</Option>
              </Select>
                  <Select size='small' class="inpt" placeholder="排序方式"></Select>
            </div>
        </div>
      </div>
      <Table border :columns="columns" :data="data"></Table>
      <div class="pages">
         <Page :total="sumSize" show-elevator @on-change='changePage' :page-size='size'/>
      </div>
    </div>
  </div>
</template>

<script>
import { getBooks, getVolunteer,updateBooks } from '@/request/api'
import { filterNull } from '@/libs/utils'
export default {
  data() {
    return {
        navigation1: {
        head: "证书管理(志愿者)"
      },
      ruleValidate:{
        organ: [
            { required: true, message: '组织不能为空', trigger: 'blur' }
            ],
        mname: [
            { required: true, message: '模板名称不能为空', trigger: 'blur' }
            ],
        effect: [
            { required: true, message: '有效日期不能为空', trigger: 'blur' }
            ],
      },
      params:{
        orgId:'',
        title:'',
        effectiveAt:'',
        orgType:1,
        sysId:1
      },
      modal1: false,
      columns: [
        {
          title: "组织",
          key: "orgName"
        },
        {
          title: "证书名称",
          key: "title"
        },
        {
          title: "有效期限",
          key: "effectiveAt"
        },
        {
          title:"失效时间",
          key:"inEffectiveAt"
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
                      let ob = params.row
                      this.$router.push({ name: 'cenfic_prend',query:{certMouldId:ob.certMouldId,show:0} })
                    }
                  }
                },
                "预览"
              ),
              params.row.isEdit == 1?
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276"
                  },
                  on: {
                    click: () => {
                      let ob = params.row
                      this.$router.push({ name: 'cenfic_prend',query:{certMouldId:ob.certMouldId,show:1}})
                    }
                  }
                },
                "编辑"
              ):''
            ]);
          }
        }
      ],
      data: [],
      size:10,
      args:{
        startAt:null,
        endAt:null,
        orgName:null,
      },
      volun:[{orgName:"融爱融乐",orgId:1}],
      sumSize:10,
      page:1,
      numList:[10,15,20,],
      options:{
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      }
    };
  },

  components: {},

  computed: {},

  created() {
    this.getList({})
  },

  methods: {
    getList ({startAt,endAt,orgName}) {
      getBooks(filterNull({page:{page:this.page,size:this.size},startAt,endAt,orgName,sysType:'1,3'})).then(res => {
        if(res.code == 200){
           this.sumSize = res.data.totalSize
           this.data = res.data.list
           this.page = res.data.pageNum
        }else{
          this.$Message.error(res.msg)
        }
      })
    },
    query(){
      this.page = 1
      this.getList(this.args)
    },

    handleChange(e){
      this.args.startAt = e[0]
      this.args.endAt = e[1]
    },

    changePage (e) {
      this.page = e
      this.getList(this.args)
    },
    success () {
      updateBooks(this.params).then(res => {
        if(res.code == 200){
          this.$Message.success('添加成功')
          this.getList(this.args)
        }else{
           this.$Message.error(res.msg)
        }
      })
    },
    changeDate(e){
      this.params.effectiveAt = e
    },
    cancel() {
      this.$Message.info("新增失败");
    },
    changeNum(e){
      this.size = e
      this.page = 1
      this.getList()
    }
  }
};
</script>
<style lang="scss" scoped>
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
   margin-top: 2.5rem;
}
.ipt {
  margin-left: 10px;
}
.sdate {
  margin-left: 15px;
}
.data-ios{
    padding: 5px;
}
.inpt{
    margin: 5px;
}
</style>
