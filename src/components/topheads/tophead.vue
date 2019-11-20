<!-- 兴趣爱好(会员) -->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con bk">
        <div class="title bk-xia flex-center-start">
          <p>
            <Icon type="ios-search" />
            <span>筛选查询</span>
          </p>
          <div class="flex-center-end">
            <div class="Pack space" @click="Retractbtn">
              <Icon type="ios-arrow-down" v-if="Retract==true" />
              <Icon type="ios-arrow-up" v-if="Retract==false" />
              <span v-if="Retract==true">收起筛选</span>
              <span v-if="Retract==false">启用筛选</span>
            </div>
            <Button @click="query">查询结果</Button>
          </div>
        </div>
        <div class="con">
          <Form inline class="flex-center-start" v-if="Retract==true">
            <div v-for="(item,index) in top" :key="index">
              <FormItem :label=item.name  prop="name" v-if="item.type=='input'">
                <Input style="width:150px" type="text" v-model="item.value" placeholder="物资名称"></Input>
              </FormItem>
              <FormItem :label=item.name  prop="list" v-if="item.type=='select'">
                <Select style="width:150px" v-model="item.value">
                  <Option
                    v-for="items in item.list"
                    :value="items.dataKey"
                    :key="items.dataKey"
                    :transfer=true
                  >{{ items.dataValue }}</Option>
                </Select>
              </FormItem>
              <FormItem :label=item.name  prop="CreationTime"  v-if="item.type=='date'">
                <DatePicker type="date" placeholder="请选择日期" v-model="item.value" style="width: 150px" :transfer=true></DatePicker>
              </FormItem>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <Icon type="ios-search-outline" />
          <span>筛选查询</span>
        </div>
        <div class="flex-center-end">
          <div class="integral-center" @click="Retractbtn">
           <Icon type="ios-arrow-down" v-if="Retract==true"/>
              <Icon type="ios-arrow-up"  v-if="Retract==false"/>
              <span v-if="Retract==true">收起筛选</span>
              <span v-if="Retract==false">启用筛选</span>
          </div>
          <Button @click="query">查询结果</Button>
        </div>
  </div>-->
  <!-- <div class="flex-center-start integral-body" v-if="Retract==true">
        <div class="flex-center-start" v-for="(item,index) in top" :key="index">
          <span>{{item.name}}:</span>
          <Input size="large" :placeholder=item.name class="inpt" v-model="item.value" v-if="item.type=='input'"/>
          <Select v-model="item.value" style="width: 150px;margin-right:10px" v-if="item.type=='select'" :transfer="true" >
            <Option v-for="items in item.list" :value="items.dataKey" :key="items.dataKey">{{ items.dataValue}}</Option>
          </Select>
           <Row v-if="item.type=='date'">
            <Col span="12">
              <DatePicker
                type="date"
                placeholder="请选择日期"
                style="width: 200px"
                class="sdate"
                v-model="item.value"
                :transfer="true"
              ></DatePicker>
            </Col>
          </Row>
        </div>
      </div>
  </div>-->
</template>
<script>
export default {
  data() {
    return {
      formValidate: {
        name: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "兴趣爱好不能为空", trigger: "blur" }]
      },
      modal1: false,
      Retract: true
    };
  },
  props: ["navigation1", "top"],

//  <!-- //数据例子 -->
  // <!-- top:[{name:'关键词',type:'input',value:''},{name:'发布时间',type:'select',list:[],value:''}], -->

  components: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {
    //查询
    query() {
      this.$emit("query", this.top);
    },

    //收起筛选
    Retractbtn() {
      this.Retract = !this.Retract;
      console.log(11);
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

.main {
  background-color: #ffffff;
  border: 1px solid #e4e4e4;
}
.content {
  margin-top: 10px;
  padding: 5px;
}
.bk {
  border: 1px solid #e4e4e4;
}
.bk-xia {
  border-bottom: 1px solid #e4e4e4;
}
.bk-zy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
}
.title {
  background-color: #f3f3f3;
  justify-content: space-between;
  padding: 5px 20px;
}
.Pack {
  margin-right: 5px;
}
.ivu-form {
  margin-top: 1rem;
  padding-left: 1rem;
}
.ivu-form-item {
  display: flex;
}
.pages {
  display: flex;
  justify-content: center;
  margin: 0.5rem auto;
}
.batch button {
  margin-left: 1rem;
}
.ivu-form-inline .ivu-form-item{
  display: flex;
}
</style>
