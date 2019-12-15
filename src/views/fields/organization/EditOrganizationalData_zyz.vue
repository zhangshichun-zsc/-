<!--编辑组织资料(志愿者)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="main">
      <div class="details-top">
      <span>
        <a @click="jump()">组织详情</a>
      </span>
        <span class="active">
        <a>编辑组织资料</a>
      </span>
      </div>
      <div class="group flex-center-start">
        <span>北师大白鸽志愿团队</span>
        <span>分类</span>
        <div class="ellipse"><span>志愿者团队</span></div>
      </div>
      <div class="basic">
        <p class="title">基本信息</p>
        <div class="content middle">
          <Form ref="BasicDate" :model="BasicDate" :label-width="120">
            <FormItem label="名称:">
              <Input v-model="BasicDate.Name" style="width: 220px"/>
            </FormItem>
            <FormItem label="联系人:">
              <Input v-model="BasicDate.TheContact" placeholder="自动带出" style="width: 220px" />
            </FormItem>
            <FormItem label="地址:">
              <Input v-model="BasicDate.Address" placeholder="点 击 输 入" style="width: 220px" />
            </FormItem>
            <FormItem label="联系方式:">
              <Input v-model="BasicDate.Contact" style="width: 220px" />
            </FormItem>
            <FormItem label="微信公众号:">
              <Input v-model="BasicDate.WeChat_GZH" placeholder="点 击 输 入" style="width: 220px" />
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
            <FormItem label="详情:">
              <Input v-model="BasicDate.Details" type="textarea" :autosize="{minRows: 5,maxRows: 8}" />
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
              <Progress :percent="percent" style="width: 15rem"/>
            </div>
            <Button shape="circle" icon="md-close" style="margin-top: 0.5rem;"></Button>
          </div>
          <div class="middle">
            <Button>添加附件</Button>
          </div>
        </div>
      </div>
      <div class="basic">
        <p class="title">备注</p>
        <div class="content">
          <Input v-model="Note" type="textarea" :autosize="{minRows: 5,maxRows: 8}" />
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
        head: "编辑组织资料(志愿者)",
      },
      BasicDate: {
        Name:'北师大白鸽志愿团队',
        TheContact:'',
        Address:'',
        Contact:'',
        WeChat_GZH:'',
        Details:''
      },
      Note:'',
      percent: 0, // 文件上传进度条
    }
  },
  methods: {
    jump() {
      this.$router.push({ name: 'details' })
    },
    add () {
      if (this.percent >= 100) {
        return false;
      }
      this.percent += 10;
    },
    minus () {
      if (this.percent <= 0) {
        return false;
      }
      this.percent -= 10;
    }
  }
}
</script>
<style lang="scss" scoped>
  .details-top {
    span {
      display: inline-block;
      height: 30px;
      width: 120px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #e4e4e4;
      a {
        color: black;
        font-size: 16px;
      }
    }
    .active {
      background: #1ABC9C;
      a {
        color: #ffffff;
      }
    }
  }
  .ellipse{
    width: 4rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 2px solid #e4e4e4;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .group {
    border-top: #e4e4e4 solid 1px;
    border-bottom: #e4e4e4 solid 1px;
    padding: 0.2rem 1rem;
    span:nth-child(2){
      margin: 0 0.5rem;
    }
    span:nth-child(2),
    .ellipse span{
      font-size: 12px;
    }
  }
  .main{
    width: 36rem;
  }
  .basic{
    margin: 0.5rem;
    border: #e4e4e4 solid 1px;
  }
  .title{
    padding: 0.5rem 1rem;
    background-color: #F2F2F2;
  }
  .middle{
    display: flex;
    justify-content: center;
  }
  .content{
    padding: 0.5rem 0;
  }
  .ivu-form-item{
    margin-bottom: 0.5rem;
  }
  .file p{
    padding: 0.5rem;
  }
</style>
