<!--活动立项审批(会员)-->
<template>
  <div>
    <Modal v-model="modal1" title="拒绝理由"  @on-cancel='cancel'>
      <i-input placeholder="请输入拒绝内容" v-model="reason" type="textarea" :row='4'/>
      <div slot="footer">
        <Button type="error" size="large" @click="success">确定</Button>
      </div>
    </Modal>
    <Navigation :labels="navigation1"></Navigation>
    <div class="flex-between integral-body">
      <div class="flex-start">
        <div class="flex-center-start list">
          <span class="span">立项名称:</span>
          <Input size="large" placeholder="立项名称" class="inpt" v-model="query.batchName" />
        </div>
        <div class="flex-center-start list">
          <span class="span">审核状态:</span>
          <Select v-model="query.statu" style="width:200px" size="large">
            <Option :value="''">全部</Option>
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div class="flex-center-start list" style="margin-right:20px;">
          <span class="span">提交日期:</span>
          <row class="flex-center-start inpt">
            <i-col>
              <Date-picker
                type="date"
                placeholder="选择日期"
                style="width: 200px"
                size='large'
                @on-change="handleChange('rom',$event)"
              ></Date-picker>
            </i-col>
            <i-col style="padding:7px 5px 0;">~</i-col>
            <i-col>
              <Date-picker
              type="date"
                placeholder="选择日期"
                style="width: 200px"
                size='large'
                @on-change="handleChange('tos',$event)"
              ></Date-picker>
            </i-col>
          </row>
        </div>
      </div>
      <div class="flex-center-end">
        <Button @click="querys" class="button-red">查询</Button>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-between">
        <div>
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status" :disabled='allD'>全选</Checkbox>
          </Button>
          <Button class="table-btn" @click="operation(2)">通过</Button>
          <Button class="table-btn" @click="modal1 = true">拒绝</Button>
        </div>
        <div>
          <Button @click="approval" class="table-btn" >新建立项</Button>
          <Button class="table-btn" @click="draft">草稿箱</Button>
          <Button class="table-btn">导出</Button>
          <Select v-model="size" class="table-btn" placeholder="显示条数" size='large' style="width: 150px;">
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="排序方式" style="width: 150px;" v-model="sort" class="table-btn"  size='large'>
            <Option :value="'create_at desc'">倒序</Option>
            <Option :value="'create_at asc'">正序</Option>
          </Select>
        </div>
      </div>
      <Table
        ref="selection"
        border
        :columns="columns"
        :data="datax"
        @on-selection-change="handleSelectionChange"
      ></Table>
      <div class="pages">
        <Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          style="margin: auto"
          :page-size="size"
          @on-change="changepages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../request/datatime";
import {date1} from '@/request/datatime.js'
import { pendingApp, approvalpage } from "@/request/api";
import { filterNull } from '@/libs/utils'
import { constants } from 'fs';
export default {
  data() {
    return {
      modal1:false,
      navigation1: {
        head: "活动立项管理"
      },
      allD:false,
      cityList: [
        {
          value: "0",
          label: "待审核"
        },
        {
          value: "1",
          label: "审核通过"
        },
        {
          value: "2",
          label: "审核不通过"
        },
        {
          value: "3",
          label: "一级审核通过二级待审核"
        }
      ],
      columns: [
        {
          type: "selection",
          width: 80,
          align: "center"
        },
        {
          title: "立项名称",
          key: "name",
          align: "center",
          width: 500,
          ellipsis: true,
          tooltip: true,
        },
        {
          title: "项目名称",
          key: "categoryName",
          width: 300,
          align: "center"
        },
        {
          title: "总预算",
          key: "budget",
          width: 200,
          align: "center"
        },
        {
          title: "创建人",
          key: "userName",
          width: 300,
          align: "center",
          ellipsis: true,
          tooltip: true,
        },
        {
          title: "身份",
          key: "userRole",
          align: "center",
          width: 300,
        },
        {
          title: "提交时间",
          key: "createAt",
          width: 300,
          align: "center",
        },
        {
          title: "状态",
          width: 200,
          align: "center",
          render: (h,params) =>{
            let state = params.row.status
            return (<span>{["待审核","审核通过","审核不通过",'一级审核通过二级待审核'][~~state]}</span>)
          }
        },
        {
          title: "操作",
          key: "action",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  clssName: "action",
                  style: {
                    color: "#FF565A",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      // this.$router.push({
                      //   name: "approval_details",
                      //   query: { batchId: params.row.batchId,auditId:params.row.auditId,statusText:params.row.status }
                      // });
                       this.$router.push({
                        name: "approval",
                        query: { batchId: params.row.batchId, currentStep:2}
                      });
                    }
                  }
                },
                "详情"
              ),
              h(
                "span",
                {
                  style: {
                    marginLeft: "20px",
                    color: "#FF565A",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "approval",
                        query: { batchId: params.row.batchId,copy:1 }
                      });
                    }
                  }
                },
                "复制"
              )
            ]);
          }
        }
      ],
      datax: [],
      page: 1, //每页显示多少数据
      size: 10, //数据条数
      dataCount: 0,
      pageSize: 10,
      batchName: "",
      status:false,
      statu: "",
      query:{
        batchName:'',
        statu:'',
        rom:'',
        tos:''
      },
      rom: "",
      tos: "",
      datastat: "",
      dataend: "",
      reason: '',
      arr: [],
      Article: [
        { value: 10, label: 10 },
        { value: 15, label: 15 },
        { value: 20, label: 20 }
      ],
      sorting: [
        { value: "asc", label: "正序" },
        { value: "desc", label: "倒序" }
      ],
      sort: 'create_at desc',
    };
  },
   //事件监听
  watch: {
    size: "getapprovalpage",
    sort: "getapprovalpage"
  },

  components: {},

  computed: {},

  created() {
    this.getapprovalpage();
  },

  methods: {
    draft() {
      this.$router.push({ name: "draft" })
    },
    handleChange(name,e){
      this.query[name] = e
    },
    success(){
       this.modal1 = false
       this.operation(3)
    },
    cancel(){
      this.modal1 = false
      this.reason = ''
    },
    // 活动立项审批--批量审批
    getpendingApp(e) {
      pendingApp({
        userId: this.$store.state.userId,
        auditId: this.arr,
        type: e,
        reason: this.reason
      }).then(res => {
        if(res.code==200){
          this.$Message.info("操作成功");
          this.getapprovalpage()
        }
      });
    },
    // 活动立项审批--活动立项审批分页
    getapprovalpage() {
      approvalpage(filterNull({
        page: { page: this.page, size: this.size, sort: this.sort },
        name: this.batchName,
        type: this.statu,
        startT: this.rom,
        endT: this.tos,
        userId:this.$store.state.userId
      })).then(res => {
        if(res.code==200){
          this.dataCount = res.data.totalSize;
          let data = res.data.list
          let len = data.length
          let num = 0
          for(let item of data){
            if(~~item.status !== 0 && ~~item.status !== 3){item._disabled = true;num++;}
          }
          console.log(len,num)
          this.allD = len == num?true:false
          this.datax = data
        }
      });
    },

    //全选按钮
    chackall() {
      this.status = !this.status;
      this.$refs.selection.selectAll(this.status);
    },

    // 查询结果按钮
    querys() {
      if(!!this.query.rom&&!!this.query.tos){
        if(new Date(this.query.rom).getTime()>new Date(this.query.tos).getTime()){
          this.$Message.info('开始时间应该小于结束时间')
          return
        }else if(new Date(this.query.rom).getTime() == new Date(this.query.tos).getTime()){
          this.rom = this.query.rom + " 00:00:00"
          this.tos = this.query.tos + " 23:59:59"
        }else{
          this.rom = this.query.rom + " 00:00:00"
          this.tos = this.query.tos + " 00:00:00"
        }
      }
      this.batchName = this.query.batchName
      this.statu = this.query.statu
      this.page = 1
      this.getapprovalpage();
    },
    handleChange(name,e){
      this.query[name] = e
    },
    //分页功能
    changepages(index) {
      this.page = index;
      this.getapprovalpage();
    },

    //每条数据单选框的状态
    handleSelectionChange(val) {
      this.arr = val;
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true;
      } else {
        this.status = false;
      }
      //选择的数据id
        this.arr = val.map(item => {
          if(item.status == 0 || item.status == 3){
             return item.auditId
          }else{
            this.$Message.info("审核通过和审核不通过不可以选")
          }
        })
    },

    //操作
    operation(e){
      this.getpendingApp(e)
    },

    approval() {
      this.$router.push({ name: "approval" });
    },

    mounted() {
      this.getapprovalpage();
    }
  }
};
</script>
<style lang="scss" scoped>
.btn{
  background: #FF565A !important;
  color: #fff !important;
  border-color:#FF565A !important;
  font-size: 16px;
}
.integral-top {
  border: 1px solid #e4e4e4;
  height: 50px;
  margin-top: 20px;
  button {
    margin-right: 10px;
  }
}

.flex-start {
  font-size: 16px;
  .list {
    margin-right: 20px;
    span {
      display: inline-block;
      width: 100px;
      margin-right: 10px;
    }
    .span {
      width: 100px;
    }
  }
}
.integral-body{
  background: #fff;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 30px;
}
.integral-table{
  background: #fff;
  padding: 20px 10px;
  border-radius: 20px;
}
.table-header {
  padding: 10px 20px;
}
.table-btn {
    margin: 0 10px;
    font-size: 16px;
  }
.pages {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e4e4e4;
}
</style>
