<!-- 问卷调查详情(会员) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <span>活动问卷（3条反馈）</span>
        </div>
        <div class="flex-center-end">
            <Button>导出反馈结果</Button>
          <div class="integral-center">
            <Icon type="ios-arrow-down" />
            <span>收起筛选</span>
          </div>
          <Button>查询结果</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>反馈人</span>
          <Select size='large' class="inpt" placeholder="活动名称">
          </Select>
        </div>
        <div class="flex-center-start">
          <span style="width:4rem">提交时间:</span>
           <DatePicker type="date" placeholder="请选择日期" style="width: 150px" class="sdate"></DatePicker>
            <Col span="2" style="text-align: center">-</Col>
           <DatePicker type="date" placeholder="请选择日期" style="width: 150px" class="sdate"></DatePicker>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div class="data-ios">
         <div class="flex-center-start"
           <Icon type="ios-apps" />
          <span>数据列表</span>
         </div>
            <div class="flex-center-end">
                  <Select size='small' class="inpt" placeholder="显示条数"></Select>
                  <Select size='small' class="inpt" placeholder="排序方式"></Select>
            </div>
        </div>
      </div>
      <div class="sd">
          
               <Table border :columns="columns" :data="data"></Table>
 
         
       <div class="box" >
          <div class="title">
              <span>反馈详情</span>
          </div>
          <div class="content">
              <div class="ques">
                <span>1、最近半年，是否参加过融融活动</span>
                <div class="radio">
                  <Radio v-model="single1">有</Radio>
                </div>  
              </div>
              <div class="ques">
                <span>2、你对哪类活动感兴趣？</span>
                <div class="radio">
                  <Radio v-model="single2">快乐活动营</Radio>
                </div>  
              </div>
              <div class="ques">
                <span>3、你会将融融活动推荐给其他人吗？</span>
                <div class="radio">
                  <Radio v-model="single3">会</Radio>
                </div>  
              </div>
          </div>
      </div>
      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
         single1: false,
         single2: false,
         single3: false,
        navigation1: {
        head: "问卷调查详情(会员)"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "反馈人",
          key: "ticker"
        },
        {
          title: "手机号码",
          key: "phonenumber"
        },
        {
          title:"反馈时间",
          key:"createtime"
        }
      ],
      data: [
        {
          ticker: "张三",
          phonenumber: "158000000",
          createtime: "2019-03-22 11:05"
        },
        {
          ticker: "李四",
          phonenumber: "158000000",
          createtime: "2019-03-22 11:05"
        }
      ]
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {
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
.ivu-table-wrapper{
    width: 25rem;
}

.box{
    width: 20rem;
    height: 20rem;
    background:#e2edf9;
    margin: 10px;
}
.title{
    height: 2rem;
    line-height: 2rem;
    background:#b1d1f2;
}
.ques{
    padding: 10px;
}
.radio{
    margin: 10px 20px;
}
.sd{
    display: flex;
    justify-content: space-between
}
.ivu-table{
    background:none;
}
</style>
