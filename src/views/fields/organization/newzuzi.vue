<!-- 新建组织(志愿者)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="main">
      <div class="basic">
        <p class="title">分类</p>
        <div class="content middle">
          <RadioGroup v-model="animal">
            <Radio label="mei">志愿者团队</Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="basic">
        <p class="title">基本信息</p>
        <div class="content middle">
          <Form ref="AddDate" :model="AddDate" :label-width="120">
            <FormItem label="名称:" prop="Name">
              <Input v-model="value" placeholder="点 击 输 入" style="width: 220px" />
            </FormItem>
            <FormItem label="联系人:" prop="Name">
              <Input v-model="value" placeholder="自动带出" style="width: 220px" />
            </FormItem>
            <FormItem label="地址:" prop="Name">
              <Input v-model="value" placeholder="点 击 输 入" style="width: 220px" />
            </FormItem>
            <FormItem label="联系方式:" prop="Name">
              <Input v-model="value" style="width: 220px" />
            </FormItem>
            <FormItem label="微信公众号:">
              <Input v-model="value" placeholder="点 击 输 入" style="width: 220px" />
            </FormItem>
            <FormItem label="图片:">
              <div class="flex-start">
                <div style="background-color: #5cb85c;width: 9rem;height: 5rem;"></div>
                <div style="padding-top: 2.5rem;margin-left: 0.5rem;">
                  <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">上传图片</Button>
                  </Upload>
                </div>
              </div>
            </FormItem>
            <FormItem label="详情:" prop="Name">
              <Input v-model="value" type="textarea" :autosize="{minRows: 5,maxRows: 8}" />
            </FormItem>
          </Form>
        </div>
      </div>
      <div class="basic">
        <p class="title">文件</p>
        <div class="content">
          <div class="middle">
            <Icon type="ios-paper-outline" size="100" />
            <div class="file">
              <p>
                <span>文件名称</span>
              </p>
              <Progress :percent="percent" style="width: 15rem" />
            </div>
            <Button shape="circle" icon="md-close" style="margin-top: 0.5rem;"></Button>
          </div>
          <div class="middle">
            <Upload action="//jsonplaceholder.typicode.com/posts/">
              <Button icon="ios-cloud-upload-outline">添加附件</Button>
            </Upload>
          </div>
        </div>
      </div>
      <div class="basic">
        <p class="title">备注</p>
        <div class="content">
          <Input v-model="value" type="textarea" :autosize="{minRows: 5,maxRows: 8}" />
        </div>
      </div>
      <div class="middle">
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
        head: "新建组织(志愿者)"
      },
      animal: "",
      value: ""
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style scoped>
.main {
  width: 36rem;
  margin: 0 auto;
}
.basic {
  margin: 0.5rem;
  border: #e4e4e4 solid 1px;
}
.title {
  padding: 0.5rem 1rem;
  background-color: #f2f2f2;
}
.middle {
  display: flex;
  justify-content: center;
}
.content {
  padding: 0.5rem 1rem;
}
.ivu-form-item {
  margin-bottom: 0.5rem;
}
.file p {
  padding: 0.5rem;
}
.middle {
  display: flex;
  justify-content: center;
}
</style>
