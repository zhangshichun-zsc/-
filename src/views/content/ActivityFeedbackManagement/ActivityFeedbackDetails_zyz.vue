<!--活动反馈详情(志愿者)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con-top con-p bk-szy flex-center-start">
        <p>
          <span>5.12 “行走在夏日”游园活动</span>
          <span>（10条反馈）</span>
        </p>
        <div class="flex-center-end">
          <Button size="small">导出反馈结果</Button>
          <div class="Pack">
            <Icon type="ios-arrow-down"/>
            <span>收起筛选</span>
          </div>
          <Button size="small">查询结果</Button>
        </div>
      </div>
      <div class="con con-p bk inp flex-center-start">
        <p>
          <span>反馈人:</span>&nbsp;
          <Input size="small" placeholder="活动名称" style="width: 8rem" />
        </p>
        <p>
          <span>提交时间:</span>&nbsp;      
          <DatePicker type="date"  style="width: 200px"></DatePicker>
          <span>———</span>
          <DatePicker type="date"  style="width: 200px"></DatePicker>
        </p>
      </div>
    </div>
    <div class="content">
      <div class="con-top bk-szy flex-center-start">
        <p>
          <Icon type="ios-list" size="30"/>
          <span>数据列表</span>
        </p>
        <div class="flex-center-end">
          <Button size="small">显示条数<Icon type="md-arrow-dropdown" /></Button>
          <Button size="small">排序方式<Icon type="md-arrow-dropdown" /></Button>
        </div>
      </div>
      <div class="con">
        <div>
          <Table border :columns="columns" :data="data"></Table>
           <div class="pages">
        <div class="batch">
          <Checkbox>全选</Checkbox>
          <Select placeholder="批量操作" style="width: 150px">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px">确定</Button>
        </div>
        <Page :total="100" show-elevator show-total size='small' style="margin: auto"/>
      </div>
        </div>
        <div class="con-right bk">
          <div class="con-top">
            <p>反馈详情</p>
          </div>
          <div style="padding: 0.1rem 0.5rem">
            <div>
              <p>1. 本次活动是否达到您的期望</p>
              <RadioGroup v-model="choose1" vertical>
                <Radio label="choose-D">
                  <span>D.没有达到</span>
                </Radio>
              </RadioGroup>
            </div>
            <div>
              <p>2. 您对本次活动的哪方面感到满意</p>
              <RadioGroup v-model="choose2" vertical>
                <Radio label="choose-A">
                  <span>A.活动内容</span>
                </Radio>
              </RadioGroup>
            </div>
            <div>
              <p>3.您对我们以后活动的举办还有什么建议？</p>
              <Input v-model="FeedbackSuggestions" type="textarea" placeholder="请输入内容"></Input>
            </div>
            <div>
              <p>4.精彩照片</p>
              <div class="flex-center-between" style="padding: 0.2rem 0">
                <div class="tu"></div>
                <div class="tu"></div>
                <div class="tu"></div>
                <div class="tu"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Divider from "iview/src/components/divider/divider";
  export default {
    components: {Divider},
    data () {
      return {
        navigation1: {
          head: "活动反馈列表(志愿者)"
        },
        batchList:[
          {value: 'recommended',label: '设为推荐'},
          {value: 'cancel',label: '取消推荐'},
          {value: 'hidden',label: '设为隐藏'},
          {value: 'According',label: '设为显示'},
          {value: 'delete',label: '删除'}
        ],
        data: [
          {
            FeedbackPeople:'张三',
            PhoneNumber:'1580000000',
            FeedbackTime:'2019-03-22 11:05',
            ParticipatingPost:'受益方'
          }
        ],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '反馈人',
            key: 'FeedbackPeople',
            width:'100px',
            align: 'center'
          },
          {
            title: '手机号码',
            key: 'PhoneNumber',
            align: 'center',
            width:'140px'
          },
          {
            title: '反馈时间',
            key: 'FeedbackTime',
            align: 'center',
            width:'180px'
          },
          {
            title: '参与活动岗位',
            key: 'ParticipatingPost',
            align: 'center',
            width:'160px'
          }
        ],
        choose1: 'choose-D',
        choose2: 'choose-A',
        FeedbackSuggestions:'提高活动管理水平'
      }
    }
  }

</script>
<style lang="scss" scoped>
  html,body{
    margin: auto;
  }
  .main{
    background-color: #ffffff;
  }
  .main,
  .bk{
    border: 1px solid #E4E4E4;
  }
  .con{
    display: flex;
    justify-content: space-between
  }
  .content{
    margin: 1rem;
  }
  .con-top{
    background-color: #F3F3F3;
    justify-content: space-between;
    padding:0.2rem 1rem;
  }
  .bk-szy{
    border-left: 1px solid #E4E4E4;
    border-right: 1px solid #E4E4E4;
    border-top: 1px solid #E4E4E4;
  }
  .con-p p{
    margin-right: 3rem;
  }
  .inp{
    display: flex;
    justify-content: flex-start;
    padding: 0.5rem 1rem;
  }
  .Pack,
  .content Button{
    margin-right: 1rem;
  }
  .tu{
    width: 3rem;
    height: 3rem;
    border: 1px solid #9EA7B4;
  }
    .pages{
    display: flex;
    justify-content: center;
    margin: 10px auto;
  }

</style>
