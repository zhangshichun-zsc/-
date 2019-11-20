<!--维护培训模板(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <p class="content-activity">培训模板</p>
      <Form :model="formValidate" :label-width="80">
        <FormItem label="所选项目">
          <Input :value="formValidate.SelectedProject" style="width:300px;" value="快乐活动营"></Input>
        </FormItem>
        <FormItem label="活动分类">
          <Input :value="formValidate.ClassificationActivities" style="width:300px;" value="篮球"></Input>
        </FormItem>
        <FormItem label="培训标题">
          <Input :value="formValidate.TrainingTitle" style="width:300px;" value="徒步活动培训"></Input>
        </FormItem>
        <FormItem label="培训图片">
          <div class="imgs">
            <img src alt />
          </div>
        </FormItem>
        <FormItem label="培训详情">
          <wangeditor  :labels="editor1" id="ed1"></wangeditor>
        </FormItem>
      </Form>
      <div class="button-food">
        <Button>保存</Button>
        <Button>作废</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigation1: {
        head: "维护培训模板(会员)"
      },
        formValidate: {
          SelectedProject:'',
          ClassificationActivities:'',
          TrainingTitle:'',
        },
        // 富文本editor
        editor1: {
          contents:'一. 培训内容 志愿者培训工作包括2个内容：理论知识培训，实践培训。'
      }
    };
  },

  components: {  },

  computed: {},

  created() {},

  mounted() {}
}
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
.imgs {
  width: 400px;
  height: 200px;
  background: #797979;
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
