<!--维护活动融融固定项(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <p class="content-activity">融融介绍</p>
      <Form :model="formValidate" :label-width="80">
        <FormItem label="标题">
          <Input v-model="title" placeholder="请输入..." style="width:10rem;"></Input>
        </FormItem>
        <FormItem label="详情">
          <wangeditor :labels="editor1" id="ed1"></wangeditor>
        </FormItem>
      </Form>
      <div class="button-food">
        <Button>保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          navigation1: {
              head: "维护活动融融固定项",
          },
          formValidate: {
              title:'',
          },
          title:'',
          // 富文本富文本editor
          editor1: {
              contents:''
          },
      };
  },

  components: {},

  computed: {},

  created() {},

  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
  .content {
    border: #e4e4e4 solid 1px;
    margin-top: 20px;
    .content-activity {
      border-bottom: #e4e4e4 solid 1px;
      background: #f3f3f3;
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
    }
    Form {
      padding: 1rem;
      background-color: #ffffff;
    }
  }
  .button-food{
    display: flex;
    justify-content:center;
    background-color: #ffffff;
    Button {
      margin: 1rem;
    }
  }
</style>
