<!--编辑招募报名项-志愿者（会员）-->
<template>
  <div>
  <Navigation :labels="navigation1"></Navigation>
  <div class="main">
    <div class="content bk">
      <div class="con-title bj">
        <p>编辑招募报名项</p>
      </div>
      <div class="con-form">
        <Form ref="formItem" :label-width="150">
          <FormItem label="招募类型">
            <Select v-model="formItem.RecruitType1" size="small" style="width:8rem;margin-right:1rem;">
              <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="formItem.RecruitType2" size="small" style="width:8rem;">
              <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="岗位职责">
            <Input v-model="formItem.responsibility" type="textarea" style="width:20rem;" :autosize="{minRows: 4,maxRows: 8}"/>
          </FormItem>

          <FormItem label="模式">
            <CheckboxGroup  v-model="formItem.multi_select">
              <Checkbox  label="先到先得"></Checkbox>
              <Checkbox label="预约型"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="票价">
            <table class="table-item">
              <tr>
                <th>数量</th>
                <th>可获得积分</th>
                <th>操作</th>
              </tr>
              <tr>
                <td><Input v-model="formItem.NameEntry1_1" type="text" size="small" style="width:5rem" placeholder="请输入招募数量"/></td>
                <td><Input v-model="formItem.NameEntry1_2" type="text" size="small" style="width:5rem" placeholder="请输入积分"/></td>
                <td><Button icon="md-close-circle" shape="circle" size="small"></Button></td>
              </tr>
            </table>
          </FormItem>
          <FormItem label="是否发放补助">
            <RadioGroup v-model="formItem.Whether1">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
            <FormItem label="补助类型：">
              <RadioGroup v-model="formItem.TypeSubsidy">
                <Radio label="现金"></Radio>
                <Radio label="物资"></Radio>
              </RadioGroup>
            </FormItem>

            <FormItem label="现金金额：">
              <Input v-model="formItem.CashAmount" type="text" size="small" style="width:10rem;"/>
            </FormItem>
            <FormItem label="物资类型:">
              <Select v-model="formItem.MaterialType" size="small" style="width:5rem;margin-right:1rem;">
                <Option v-for="item in MaterialList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Input type="text" size="small" style="width:10rem;" placeholder="备注"/>
            </FormItem>

          </FormItem>
          <FormItem label="限制设置">
            <table class="table-item">
              <tr>
                <th>限制项名称</th>
                <th>限制项条件</th>
                <th>操作</th>
              </tr>
              <tr>
                <td><p>年龄</p></td>
                <td><Input type="text" size="small" style="width:3rem;"/>---<Input type="text" size="small" style="width:3rem;"/></td>
                <td><Button icon="md-close-circle" shape="circle" size="small"></Button></td>
              </tr>
            </table>

            <div class="bj">
              <FormItem label="常用限制项">
                <Button v-for="item in CommonRestriction" :value="item.value" :key="item.value" size="small" style="margin:0 0.5rem;min-width:3rem;">{{ item.label }}</Button>
              </FormItem>
            </div>
            <div class="addItem">
              <p>
                <span @click="add()">+新增限制条件</span>
              </p>
            </div>
          </FormItem>
          <FormItem label="是否发送证书">
            <RadioGroup v-model="formItem.Whether2">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="报名时间">
            <DatePicker type="date" placeholder="Select date" style="width: 8rem;"></DatePicker>
            <span>至</span>
            <DatePicker type="date" placeholder="Select date" style="width: 8rem;"></DatePicker>
          </FormItem>
          <FormItem label="集合时间">
            <DatePicker type="date" placeholder="Select date" style="width: 8rem;"></DatePicker>
            <span>至</span>
            <DatePicker type="date" placeholder="Select date" style="width: 8rem;"></DatePicker>
          </FormItem>
          <FormItem label="集合地址">
            <Cascader :data="AddressData" v-model="formItem.address" style="width: 8rem;display:inline-block;margin-right:1rem;" placeholder="请选择所在区域"></Cascader>
            <Input v-model="formItem.DetailedAddress" placeholder="详细地址" style="width: 10rem;" />
          </FormItem>
          <FormItem label="取消时间">
            <DatePicker type="date" placeholder="Select date" style="width: 8rem;"></DatePicker>
            <span>至</span>
            <DatePicker type="date" placeholder="Select date" style="width: 8rem;"></DatePicker>
          </FormItem>

          <FormItem label="报名项设置">
            <table class="table-item">
              <tr>
                <th>报名项名称</th>
                <th>是否必填</th>
                <th>操作</th>
              </tr>
              <tr>
                <td><p>公司</p></td>
                <td><Radio v-model="formItem.EntryRadio1">必填</Radio></td>
                <td><Button icon="md-close-circle" shape="circle" size="small"></Button></td>
              </tr>
              <tr>
                <td><Input v-model="formItem.NameEntry" type="text" size="small" style="width:5rem"/></td>
                <td><Radio v-model="formItem.EntryRadio2" label="必填"></Radio></td>
                <td><Button icon="md-close-circle" shape="circle" size="small"></Button></td>
              </tr>
            </table>
            <RadioGroup class="con-box">
              <Radio v-model="formItem.EntryRadio1_1"><Input v-model="formItem.EntryItem1_1" type="text" size="small" style="width:3rem;" disabled /></Radio>
              <Radio v-model="formItem.EntryRadio1_2"><Input v-model="formItem.EntryItem1_2" type="text" size="small" style="width:3rem;" disabled /></Radio>
              <Radio v-model="formItem.EntryRadio1_3"><Input v-model="formItem.EntryItem1_3" type="text" size="small" style="width:3rem;" disabled /></Radio>
              <Radio v-model="formItem.EntryRadio1_4"><Input v-model="formItem.EntryItem1_4" type="text" size="small" style="width:3rem;" disabled /></Radio>
            </RadioGroup>
            <div class="bj">
              <FormItem label="常用报名项">
                <Button v-for="item in ItemList1" :value="item.value" :key="item.value" size="small" style="margin:0 0.5rem;min-width:3rem;">{{ item.label }}</Button>
              </FormItem>
              <FormItem label="自定义报名项">
                <Button v-for="item in ItemList2" :value="item.value" :key="item.value" size="small" style="margin:0 0.5rem;min-width:3rem;">{{ item.label }}</Button>
              </FormItem>
            </div>
            <div class="addItem">
              <p>
                <span @click="add()">+新增报名项</span>
              </p>
            </div>
          </FormItem>
          <FormItem label="群二维码">
            <div style="width:10rem;height:7rem;background-color:#999999;"></div>
          </FormItem>

          <FormItem label="培训内容">
            <i-switch v-model="formItem.switch" size="large"></i-switch>
            <Radio v-model="formItem.Whether3">是否必填</Radio>
          </FormItem>
          <FormItem label="选择模板">
            <Input type="text" size="small" style="width:10rem"/>
          </FormItem>
          <FormItem label="培训标题">
            <Input type="text" size="small" style="width:10rem"/>
          </FormItem>
          <FormItem label="培训图片">
            <div style="width:10rem;height:7rem;background-color:#999999;"></div>
          </FormItem>
          <FormItem label="培训视频">
            <div style="width:10rem;height:7rem;background-color:#999999;"></div>
          </FormItem>
          <FormItem label="培训详情">
            <div class="editorElem1" style="text-align:left;"></div>
          </FormItem>

          <FormItem label="反馈内容">
            <i-switch v-model="formItem.switch" size="large"></i-switch>
            <Radio v-model="formItem.Whether3">是否必填</Radio>
          </FormItem>
          <FormItem label="选择模板">
            <Input type="text" size="small" style="width:10rem"/>
          </FormItem>
          <FormItem label="反馈标题">
            <Input type="text" size="small" style="width:10rem"/>
          </FormItem>
          <FormItem label="反馈详情">
            <div class="editorElem2" style="text-align:left;"></div>
          </FormItem>

        </Form>
      </div>

    </div>
  </div>
  </div>
</template>

<script>
import E from 'wangeditor';
export default {
  name: 'editor',
  data () {
    return {
      navigation1: {
        head: "编辑招募报名项-志愿者(会员)"
      },
      formItem: {
        RecruitType1: 'option2',
        RecruitType2: 'option2',
        responsibility:'',
        multi_select:[],
        NameEntry1_1:'',
        NameEntry1_2:'',
        Whether1:'是',
        TypeSubsidy:'',
        CashAmount:'',
        MaterialType:'option1',
        Whether2:'',
        EntryRadio1:false,
        NameEntry:'几人乘车',
        EntryRadio2:false,
        EntryRadio1_1:'0',
        EntryRadio1_2:'1',
        EntryRadio1_3:'3',
        EntryRadio1_4:'4',
        EntryItem1_:false,
        EntryItem1_:false,
        EntryItem1_:false,
        EntryItem1_:false,
        switch:false,
        Whether3:false,



        address:[],
        DetailedAddress:'',
      },
      cityList1: [
        {value:'option1',label:'会员'},
        {value:'option2',label:'志愿者'},
        {value:'option3',label:'家长'},
        {value:'option4',label:'传媒'},
        {value:'option5',label:'企业'},
        {value:'option6',label:'教练'},
      ],
      cityList2: [
        {value:'option1',label:'摄影岗位'},
        {value:'option2',label:'陪伴岗位'},
      ],
      MaterialList: [
        {value:'option1',label:'矿泉水'},
        {value:'option2',label:'食物'},
      ],
      CommonRestriction: [
        {value:'item1',label:'是否爸爸陪同'},
        {value:'item2',label:'VIP专属'},
        {value:'item3',label:'性别'},
      ],
      AddressData: [
        {
          value: "beijing",label: "北京",
          children: [
            {value:'gugong',label:"故宫"},
            {value:'tiantan',label:"天坛"},
            {value:'wangfujing',label:"王府井"},
          ]
        },
        {
          value: "jiangsu",label: "江苏",
          children: [
            {
              value:'nanjing',label:"南京",
              children: [
                {value:'fuzimiao',label:"夫子庙"}
              ]
            },
            {
              value:'suzhou',label:"苏州",
              children: [
                {value:'zhuozhengyuan',label:"拙政园"},
                {value:'shizilin',label:"狮子林"},
              ]
            },
          ]
        },
      ],
      ItemList1:[
        {value:'item1',label:'用餐人数'},
        {value:'item2',label:'出行方式'},
        {value:'item3',label:'徒步几公里'},
        {value:'item4',label:'备注'},
      ],
      ItemList2: [
        {value:'item1',label:'+单行文本'},
        {value:'item2',label:'+多行文本'},
        {value:'item3',label:'+单选题'},
        {value:'item4',label:'+多选题'},
      ],
      editorContent1: '',
      editorContent2: '',

    }
  },
  mounted() {
    var editor1 = new E('.editorElem1');
    var editor2 = new E('.editorElem2');
    editor1.customConfig.onchange = (html) => {
      this.editorContent1 = html
    };
    editor2.customConfig.onchange = (html) => {
      this.editorContent2 = html
    };
    editor1.create()
    editor2.create()
  },

  components: {},

  computed: {},

  created () {},

  methods: {
    add(){
      this.$Message.info("点击");
    }
  }
}

</script>
<style lang="scss" scoped>
  .main{
    width:50rem;
    margin:0 auto;
  }
  .content{
    margin:1rem auto;
  }
  .bk{
    border: 1px solid #e4e4e4;
  }
  .bj{
    background-color: #F3F3F3;
  }
  .con-title{

    border-bottom:1px solid #e4e4e4;
    p{
      padding:0.5rem;
    }
  }
  .con-form {
    margin:1rem auto;
    display:flex;
    justify-content:center;
  }
  .table-item{
    th,td {
      width:8rem;
      height:2rem;
    }
    th{
      background-color: #F3F3F3;
    }
    td{
      text-align: center;
    }
  }
  .con-box{
    .ivu-radio-wrapper{
      margin:auto 0.8rem;
    }

  }
  .addItem{
    p{
      color:#329933;
      span{
        display:block;
        text-align: center;
      }
    }

  }
</style>
