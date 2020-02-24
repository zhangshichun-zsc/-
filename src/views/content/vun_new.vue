<!-- 新建问卷调查(志愿者) -->
<template>
  <div class="integral">
    <div class="integral-header">
       <Navigation :labels="navigation1"></Navigation>
    </div>
    <div class="integral-table">
      <div class="push">
           <div class="box">
              <div class="box1">问卷调查内容</div>
              <div class="box2"></div>
           </div>
           <div class="content">
                  <div class="ques">
                     <span>问卷名称</span>
                     <Input v-model="value1" style="width: 500px " />
                  </div>
                  <div class="ques">
                     <span>问卷简介</span>
                     <Input v-model="value2" type="textarea" :autosize="{minRows: 4,maxRows: 4}"  style="width: 500px " />
                  </div>
                   <div class="ques">
                     <span>问卷内容</span>
                      <Tabs class="tabs">
                            <TabPane label="+单选题" name="name1" >
                              <Form :model="formItem" :label-width="80">
                                 <FormItem label="单选标题">
                                     <Input v-model="formItem.input" placeholder="请输入单选标题"></Input>
                                 </FormItem>
                                 <FormItem label="选项1">
                                     <Input v-model="formItem.input" placeholder="输入选项1"></Input>
                                 </FormItem>
                                 <FormItem label="选项2">
                                     <Input v-model="formItem.input" placeholder="输入选项2"></Input>
                                 </FormItem>
                                  <FormItem>
                                     <Button type="primary">确定</Button>
                                     <Button style="margin-left: 8px">取消</Button>
                                  </FormItem>
                              </Form>
                            </TabPane>
                            <TabPane label="+多选题" name="name2">标签二的内容</TabPane>
                            <TabPane label="+单行文本" name="name3">标签三的内容</TabPane>
                            <TabPane label="+多行文本" name="name4">标签三的内容</TabPane>
                      </Tabs>
                  </div>
                   <div class="ques">
                     <span>上传图片</span>
                     <i-switch v-model="switch1"  />
                  </div>
           </div>
      </div>
      <div class="push">
           <div class="box">
              <div class="box1">推送对象</div>
              <div class="box2"></div>
           </div>
          <div class="object">
             <div class="tit">
                 <span>最近参与活动:</span>
                 <Tag color="success">不限</Tag>
             </div>
            <div>
               <Tag v-for="item1 in count" :key="item1" :name="item1">{{item1}}</Tag>
               <Tag color="success">自定义</Tag>
            </div>
       </div>
       <div class="object">
             <div class="tit">
                 <span>活动次数:</span>
                 <Tag color="success">不限</Tag>
             </div>
            <div>
               <Tag v-for="item2 in num" :key="item2" :name="item2">{{item2}}</Tag>
               <Tag color="success">自定义</Tag>
            </div>
       </div>
       <div class="object">
             <div class="tit">
                 <span>关注类型:</span>
                 <Tag color="success">不限</Tag>
             </div>
            <div>
               <Tag v-for="item3 in focus" :key="item3" :name="item3">{{item3}}</Tag>
            </div>
       </div>
       <div class="object">
             <div class="tit">
                 <span>用户类型:</span>
                 <Tag color="success">不限</Tag>
             </div>
            <div>
               <Tag v-for="item4 in user" :key="item4" :name="item4">{{item4}}</Tag>
            </div>
       </div>
       <div class="object">
             <div class="tit">
                 <span>等级:</span>
                 <Tag color="success">不限</Tag>
             </div>
            <div>
               <Tag v-for="item5 in cla" :key="item5" :name="item5">{{item5}}</Tag>
            </div>
       </div>
       <div class="object">
             <div class="tit">
                 <span>用户标签:</span>
                 <Tag color="success">不限</Tag>
             </div>
            <div>
               <Tag v-for="item6 in tag" :key="item6" :name="item6">{{item6}}</Tag>
               <Tag color="success">更多>></Tag>
            </div>
       </div>
      </div>
       
      
      <div class="table-header flex-center-between">
        <div class="flex-center-start">
           <Icon type="md-list" />
          <span>数据列表</span>
        </div>
      </div>
      <Table border :columns="columns" :data="data"></Table>
      <div class="pages">
        <Page  :total="100" show-elevator show-total size="small" />
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
      switch1: false,
      value1:'',
      value2:'',
      count: ["一周内","两周内","1个月内","一个月前","两个月前","三个月前","六个月前"],
      num:["1次+","2次+","3次+","4次+","10次+","20次+","30次+"],
      focus:["快乐活动营","家长赋能","趾印计划","支持性就业","自倡导","智库"],
      user:["受益方","志愿者","政府","企业","传播","捐赠方"],
      cla:["营员","黄金会员","白金会员","钻石会员"],
      tag:["会员","志愿者","普通用户","爱心人士"],
       navigation1: {
        head: "新建问卷调查(志愿者)"
       },
       columns:[
         {
          type: "selection",
          width: 60,
          align: "center"
        },
         {
         title: "用户账号",
          key: "userid",
        
           render: (h, params) => {
            return h("div", "180000000");
          }
       },
       {
         title: "等级",
          key: "vunclass",
        
           render: (h, params) => {
            return h("div", "一星级志愿者");
          }
       },
       {
         title: "服务时长",
          key: "server",
      
           render: (h, params) => {
            return h("div", "200");
          }
       },
       {
         title: "活动次数",
          key: "naction",
      
           render: (h, params) => {
            return h("div", "10");
          }
       },
       {
         title: "最近购买时间",
          key: "shop",
      
           render: (h, params) => {
            return h("div", "2019-07-03 14:36:21");
          }
       },
       {
         title: "操作",
          key: "delete",
       
           render: (h, params) => {
            return h("a", "查看");
          }
       }],
      data: [
     {
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
  margin-right: 15px;
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
.ivu-tag {
  margin-left: 10px;
}
.object{
  display: flex;
  margin: 15px 0;
}
.tit{
  width: 10rem;
  text-align: right
}
.object span{
  font-size: 14px;
  margin-right: 10px;
}
.box{
  display: flex;
}
.box1{
  width: 150px;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  background:gray;
  color: white;
}
.box2{
width: 0;
height: 0;
border-width: 20px;
border-style: solid;
border-color:  transparent transparent transparent gray;
}
.push{
  margin:10px 0;
}
.content{
  width: 80%;
  margin: 20px auto;
}
.ques{
  margin-bottom: 15px;
  display: flex;
}
.ques span{
  margin-right: 20px;
}
</style>
