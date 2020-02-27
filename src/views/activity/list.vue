<!--活动参与列表(会员)-->

<template>
  <div class="list">
    <Navigation :labels="navigation1"></Navigation>
    <div class="wap">
      <div class="all">
        <span
          v-for="(item,index) in list"
          :key="index"
          :class="{active:num==index}"
          @click="onall(index)"
        >
          {{item}}
        </span>
      </div>
      <div class="name flex-between">
        <div class="flex-center-start">
          <span>活动名称:</span>
          <i-input :value.sync="value" placeholder="活动名称" style="width: 180px" v-model="activityName"></i-input>
          <span>姓名:</span>
          <i-input :value.sync="value" placeholder="姓名" style="width: 180px" v-model="userName"></i-input>
          <span>手机号:</span>
          <i-input :value.sync="value" placeholder="手机号" style="width: 180px" v-model="userTel"></i-input>
          <span>用户类型:</span>
          <Select v-model="userType" style="width:180px">
            <Option v-for="item in users" :value="item.roleId" :key="item.roleId">{{ item.roleName }}</Option>
          </Select>
        </div>
        <Button class="button-red" @click="query">查询</Button>
      </div>
      <div class="integral-table">
        <div class="table-header flex-between" style="display:flex">
              <Checkbox v-model="status" @on-change="chackall">全选</Checkbox>
          <div class="flex-center-end">
            <Button class="table-btn" @click="exportData">导出</Button>
      
              <Button class="table-btn" @click="ismodal2" style="margin-left: 10px">
                群发站内信 
              </Button>
         
              <Modal v-model="modal2" title="群发站内信" class='QRcodemodal' :mask-closable="false">
            <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="120">
              <FormItem label="发送对象：" prop="tag">
                <p class="pitchOn">
                  <span>共</span>
                  <!-- <span class="red">{{arr.length}}</span> -->
                  <span>个用户</span>
                </p>
              </FormItem>
              <FormItem label="标题" prop="title">
                <Input v-model="formValidate2.title"></Input>
              </FormItem>
              <FormItem label="内容：" prop="msg">
                <Input v-model="formValidate2.msg" type="textarea" :autosize="{minRows: 5,maxRows: 8}"></Input>
                <p style="font-size: 12px;">站内信标题不能超过20个字，内容不能超过100个字。</p>
              </FormItem>
            </Form>

            <div slot="footer">
              <Button type="error" style="font-size:14px" size="large" @click="onStation">确定</Button>
            </div>
          </Modal>
            <div class="flex-center-start">
              <Select class="table-btn" placeholder="排序方式" style="width: 150px;" v-model="sort" size="large">
                <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
          </div>
          </div>
        </div>
        <Table
          ref="selection"
          border
          :columns="columns"
          :data="datax"
          @on-selection-change="handleSelectionChange"
        ></Table>

        <Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          class="pages"
           placement='top' 
          show-sizer
          @on-page-size-change="setSize" 
          @on-change="changepages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/request/datatime";
import { activeAddManager,getRoleType,Setsend } from "@/request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "活动参与列表(会员)"
      },
      users: [],
      modal2: false, //群发站内信
      types: "quanbu",
      value: "",
      list: ["全部", "待审核", "报名成功", "已违约", "已取消"],
      num: 0,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "userName",
          align: "center",
          width:200,
        },
        {
          title: "活动名称",
          key: "activityName",
          align: "center",
          width: 500,
          ellipsis: true,
          tooltip: true,
        },
        {
          title: "项目名称",
          key: "categoryName",
          align: "center",
          width:250,
        },
        {
          title: "活动时间",
          width:300,
          key: "startTimestamp",
          align: "center",
          render: (h, params) => {
            return h("div", formatDate(params.row.startTimestamp));
          }
        },
        {
          title: "活动类型",
          key: "activityType",
          align: "center",
          width:250,
        },
        {
          title: "用户类型",
          key: "userType",
          align: "center",
          width:250
        },
        {
          title: "手机号码",
          key: "tel",
          align: "center",
          width:200
        },
        {
          title: "预约状态",
          key: "signUpStatusText",
          align: "center",
          width:200
        },
        {
          title: "报名时间",
          key: "signUpTimestamp",
          width:300,
          align: "center",
          render: (h, params) => {
            return h("div", formatDate(params.row.signUpTimestamp));
          }
        },
        {
          title: "匹配规则",
          key: "ruleName",
          align: "center",
          width:180
        }
      ],
      Article: [
        { value: 10, label: 10 },
        { value: 15, label: 15 },
        { value: 20, label: 20 }
      ],
      sorting: [
        { value: "asc", label: "正序" },
        { value: "desc", label: "倒序" }
      ],
      sort: "desc",
      datax: [],
      sysType: 1,
      page: 1,
      size: 10,
      pageSize: 10,
      dataCount: 0,
      userTel: "",
      userType: "",
      userName: "",
      activityName: "",
      signUpStatus: "",
      status: false,
      stationFormFlag: true,
      arr:[],
      formValidate2: {
        title: '',
        msg: ''
      },
        ruleValidate2: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        msg: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      },
    };
  },

  components: {},

  computed: {},

  created() {},
  mounted() {
    this.getactiveAddManager();
    this.getuserTypeList()
  },
   //事件监听
  watch: {
    sort: "getactiveAddManager"
  },

  methods: {
    add() {
      this.$router.push({ name: "approval" });
    },
    getuserTypeList(){
        getRoleType().then(res=>{
          this.users = res.data
        })
    },
    onall(index) {
      this.num = index;
      if(index==0){
        this.signUpStatus = ''
      }else if(index==1){
        this.signUpStatus = 1
      }else if(index==2){
        this.signUpStatus = 2
      }else if(index==3){
        this.signUpStatus = 9
      }else if(index==4){
        this.signUpStatus = 7
      }
      this.getactiveAddManager()
    },

    //参与列表接口
    getactiveAddManager() {
      activeAddManager({
        page: { page: this.page, size: this.size,sort: "createAt" + " " + this.sort},
        activityName: this.activityName,
        sysType: this.sysType,
        signUpStatus: this.signUpStatus,
        userName: this.userName,
        userTel: this.userTel,
        userType: this.userType
      }).then(res => {
        this.$refs.selection.selectAll(false);
        if (res.code == 200) {
    
          this.dataCount = res.data.totalSize;
          this.datax = res.data.list;
        }
        console.log(res);
      });
    },
    
    //查询结果
    query(){
      this.page=1
      this.getactiveAddManager()
    },
    ismodal2(){
      console.log(this.arr);
      if (this.arr.length > 0) {
        this.modal2 = true
      } else {
        this.$Message.error({
          background: true,
          content: '请选择要发送站内信的用户'
        })
      }
    },
    onStation() {
      if (!this.stationFormFlag) return
      this.$refs.formValidate2.validate(valid => {
        if (valid) {
          let userIds = this.arr.map(item=>{
            return item.userId
          })
          this.stationFormFlag = false
          let ids = userIds.toString()
          this.setsend({ ids, ...this.formValidate2 })
        }
      })
    },
        // 站内信
    setsend(params) {
      Setsend({
        sysId: '3',
        ...params
      }).then(res => {
        if (res.code === 200) {
          this.modal2 = false
          this.formValidate2 = {
            msg: '',
            title: ''
          }
          this.$Message.info('站内信发送成功~')
        } else {
          this.modal2 = false
          let str = res.msg
          this.$Message.error({
            background: true,
            content: str
          })
        }
        setTimeout(() => {
          this.stationFormFlag = true
        }, 500)
      })
    },
    //导出数据
    exportData() {
      if(this.arr.length==0){
        this.arr=this.data
      }
      this.$refs.selection.exportCsv({
        filename: this.navigation1.head,
        columns: this.columns.filter((col, index) => index > 0),
        data: this.arrs
      });
    },
      // 切换页数
    setSize(size) {
      this.size = size
      this.getapprovalpage()
    },
    //分页功能
    changepages(index) {
      this.page = index;
      this.getactiveAddManager();
    },
    //选择内容
    handleSelectionChange(val) {
      console.log(val);
      this.page = 1
      this.arr = val;
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true;
      } else {
        this.status = false;
      }
    },
    
    //全选按钮
    chackall(v) {
      this.$refs.selection.selectAll(v);
    }

  }
};
</script>

<style lang="scss" scoped>
.wap{
  margin-top: 20px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
}
.list {
  .all {
    padding: 20px;
    background: #ffffff;
    span {
      display: inline-block;
      height: 40;
      line-height: 40px;
      width: 120px;
      text-align: center;
      padding: 0 20px;
      border-radius: 20px;
      background: rgb(250, 248, 248);
      margin: 0 20px;
      cursor: pointer;
    }
  }
  .integral-top {
    height: 50px;
    border: 1px solid #e4e4e4;
  }
  .name {
    height: 60px;
    padding: 20px 20px 20px 0;
    background: #ffffff;
    span {
      margin-left: 35px;
      margin-right: 15px;
      font-size: 16px;
    }
  }
}
.active {
  background: #FF565A !important;
  color: #fff !important;
}
.integral-table {
  background-color: #fff;
  padding:  10px;
  .table-header {
    height: 50px;
    .table-btn {
      font-size: 16px;
      margin: 0 10px;
    }
  }
}
.btn{
  background: #FF565A !important;
  color: #fff !important;
  border-color:#FF565A !important;
  font-size: 16px;
}
.pages{
  padding: 16px;
  text-align: center;
}
</style>


