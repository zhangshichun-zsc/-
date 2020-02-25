<!-- 用户筛选(会员) -->
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
          <div class="push">
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
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div class="flex-center-start">
          <Icon type="md-list" />
          <span>数据列表</span>
        </div>
        <div class="flex-center">
            <Button class="btn" @click="modal1 = true">群发短信</Button>
            <Button class="btn" @click="modal2 = true">群发站内信</Button>
            <Button class="btn" @click="modal3 = true">微信推送</Button>
            <Button class="btn" @click="modal4 = true">设置标签</Button>
            <Modal v-model="modal1" title="群发短信">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                 <FormItem label="发送对象" prop="object">
                   <Input v-model="formValidate.object" placeholder="请输入对象"></Input>
                  </FormItem>
                   <FormItem label="短信内容" prop="content">
                     <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 4,maxRows: 4}" placeholder="请输入内容..."></Input>
                  </FormItem>
              </Form>
           </Modal>
            <Modal v-model="modal2" title="群发站内信">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                 <FormItem label="发送对象" prop="object">
                   <Input v-model="formValidate.object" placeholder="请输入对象"></Input>
                  </FormItem>
                 <FormItem label="标题" prop="title">
                   <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
                  </FormItem>
                   <FormItem label="短信内容" prop="content">
                     <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 4,maxRows: 4}" placeholder="请输入内容..."></Input>
                  </FormItem>
              </Form>
           </Modal>
            <Modal v-model="modal3" title="微信推送">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                 <FormItem label="推送类型" prop="class">
                    <RadioGroup v-model="formValidate.class">
                        <Radio label="链接"></Radio>
                        <Radio label="专题"></Radio>
                        <Radio label="活动"></Radio>
                        <Radio label="商品"></Radio>
                    </RadioGroup> 
                  </FormItem>
                  <FormItem label="标题" prop="title">
                   <Input v-model="formValidate.title"></Input>
                  </FormItem>
                  <FormItem label="推送标题" prop="pushtitle">
                   <Input v-model="formValidate.pushtitle"></Input>
                  </FormItem>
                   <FormItem label="推送内容" prop="pushcontent">
                     <Input v-model="formValidate.pushcontent" type="textarea" :autosize="{minRows: 4,maxRows: 4}" placeholder="请输入内容..."></Input>
                  </FormItem>
              </Form>
           </Modal>
            <Modal v-model="modal4" title="设置标签">
                <div class="taps">
                    <ul>
                        <li>
                           <Checkbox>用户标签名称</Checkbox>
                        </li>
                        <li>
                           <Checkbox>用户标签名称</Checkbox>
                        </li>
                        <li>
                           <Checkbox>用户标签名称</Checkbox>
                        </li>
                    </ul>
                    <ul>
                        <li>
                           <Checkbox>用户标签名称</Checkbox>
                        </li>
                        <li>
                           <Checkbox>用户标签名称</Checkbox>
                        </li>
                        <li>
                           <Checkbox>用户标签名称</Checkbox>
                        </li>
                    </ul>
                    <ul>
                        <li>
                           <Checkbox>用户标签名称</Checkbox>
                        </li>
                        <li>
                           <Checkbox>用户标签名称</Checkbox>
                        </li>
                        <li>
                           <Checkbox>用户标签名称</Checkbox>
                        </li>
                    </ul>
                    <ul>
                        <li>
                           <Checkbox>用户标签名称</Checkbox>
                        </li>
                        <li>
                           <Checkbox>用户标签名称</Checkbox>
                        </li>
                        <li>
                           <Checkbox>用户标签名称</Checkbox>
                        </li>
                    </ul>
                    <ul>
                        <li>
                           <Checkbox>用户标签名称</Checkbox>
                        </li>
                        <li>
                           <Checkbox>用户标签名称</Checkbox>
                        </li>
                        <li>
                           <Checkbox>用户标签名称</Checkbox>
                        </li>
                    </ul>
                </div>
           </Modal>
        </div>
        <div class="flex-center-end">
          <Select size="small" class="inpt" placeholder="显示条数"></Select>
          <Select size="small" class="inpt" placeholder="排序方式"></Select>
        </div>
      </div>
      <Table ref="selection" border :columns="columns" :data="data" @on-selection-change="tablechange"></Table>
      <div class="pages">
          <div class="batch">
          <Checkbox  @click="chackall()" style="border:0px;">全选</Checkbox>
          <Select placeholder="批量操作" style="width: 150px" v-model="batch">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px" @click="batches()">确定</Button>
        </div>
        <Page  :current.sync='page' :total="dataCount" show-elevator show-total size="small" :page-size="pageSize"
          @on-change="changepages" />
      </div>
    </div>
  </div>
</template>

<script>
import { date1 } from "../../request/datatime";
import {Userfilter} from "../../request/api";
export default {
  data() {
    return {
      count: ["一周内","两周内","1个月内","一个月前","两个月前","三个月前","六个月前"],
      num:["1次+","2次+","3次+","4次+","10次+","20次+","30次+"],
      focus:["快乐活动营","家长赋能","趾印计划","支持性就业","自倡导","智库"],
      user:["受益方","志愿者","政府","企业","传播","捐赠方"],
      cla:["营员","黄金会员","白金会员","钻石会员"],
      tag:["会员","志愿者","普通用户","爱心人士"],
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
        formItem: {
        input: '',
        textarea: ''
                },
       formValidate:{
          object:"",
          content:"",
          title:"",
          class:"",
          pushtitle:"",
          pushcontent:""
       },
       ruleValidate:{
          object: [
          { required: true, message: '发送对象不能为空', trigger: 'blur' }
                ],
          content: [
          { required: true, message: '短信内容不能为空', trigger: 'blur' }
                ],
          title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
                ],
          pushtitle: [
          { required: true, message: '推送标题不能为空', trigger: 'blur' }
                ],
          pushcontent: [
          { required: true, message: '推送内容不能为空', trigger: 'blur' }
                ],
          class: [
          { required: true, message: '推送类型不能为空', trigger: 'change' }
                ],
       },
       navigation1: {
        head: "用户筛选(会员)"
       },
        batchList:[
          {value: '1',label: '设为推荐'},
          {value: '2',label: '取消推荐'},
          {value: '3',label: '设为隐藏'},
          {value: '4',label: '设为显示'},
          {value: '5',label: '删除'}
        ],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户账号",
          key: "loginName",
        },
        {
          title: "会员等级",
          key: "levelName",
        },
        {
          title: "服务时长",
          key: "serverSum",
        },
         {
          title: "活动次数",
          key: "count",
        },
         {
          title: "最近购买时间",
          key: "payTime",
          render: (h, params) => {
            return h("div", [
              h("p",date1("Y-m-dH:i:s", params.row.startAt)),
            ]);
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
                      this.$router.push({ name: 'user_details_hy', 
                      query: {
                          memberId: params.row.memberId
                        } })
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      data: [],
      page: 1,
      size: 10,
      pageSize: 10,
      dataCount: 0,
      atestJoinTimeStampFrom: "",
      sysType: 1,
      latestJoinTimeStampTo: "",
      joinCountFrom: "",
      joinCountTo:"",
      userInterestId:'',
      roleId: "",
      levelId: "",
      labelId:"",
      arr: [],
      batch: null
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: { 
    ok () {
      this.$Message.info('Clicked ok'); 
    },
    cancel () {
      this.$Message.info('Clicked cancel');
    },
 
    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getfilter();
    },

    //列表数据
    getfilter(){
      Userfilter({
        page: { page: this.page, size: this.size },
        sysType: this.sysType,
        latestJoinTimeStampFrom:this.latestJoinTimeStampFrom,
        latestJoinTimeStampTo:this.latestJoinTimeStampTo,
        joinCountFrom:this.joinCountFrom,
        joinCountTo:this.joinCountTo,
        userInterestId:this.userInterestId,
        roleId:this.roleId,
        levelId:this.levelId,
        labelId:this.labelId
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.data = res.data.list;
          this.page = res.data.pageNum;
          this.dataCount = res.data.totalSize;
          this.size=res.data.pageSize
          // if (e == 1) {
          // } else if (e == 2) {
          //   this.$Message.info("操作成功");
          // } else if (e == 3) {
          //   this.$Message.info("查询成功");
          // } else {
          // }
          // this.$Message.info("操作成功");
        }
      });
    },

    //  每条数据单选框的状态
    tablechange(selection) {
      this.arr = selection;
      if (this.arr.length == this.dataCount&&this.dataCount!=0||this.arr.length==this.size) {
        this.status = true;
      } else {
        this.status = false;
      }
    },

      // 全选按钮
    chackall() {
      this.status = !this.status;
      console.log(this.status, this.$refs.selection);
      this.$refs.selection.selectAll(this.status);
    }
  },
  mounted(){
    this.getfilter()
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
}
.ipt {
  margin-left: 10px;
}
.sdate {
  margin-left: 15px;
}
.btn{
    margin-right: 10px;
}
.push{
  margin:10px 0;
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
.taps ul{
    display: flex;
    justify-content: space-around; 
    margin-top: 10px;
}
 .pages{
    display: flex;
    justify-content: space-between;
    margin: 10px auto;
  }
</style>
