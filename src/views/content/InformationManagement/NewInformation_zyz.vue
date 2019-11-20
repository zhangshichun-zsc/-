<!--发布资讯(志愿者)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con flex-start">
        <div class="con-left">
          <div class="title-box flex-start">
            <div class="title flex-center-start">
              <p>
                <Icon style="color: #F9FAFC" type="md-bookmark" />
                <span>基本信息</span>
              </p>
            </div>
            <div class="jiao"></div>
          </div>
        </div>
        <div class="con-right">
          <Form style="margin: 0 auto;" ref="ContentData" :model="ContentData" :rules="RuleDate">
            <FormItem label="资讯标题:" prop="TitleInformation">
              <Input style="width: 15rem" v-model="ContentData.TitleInformation"></Input>
            </FormItem>
            <FormItem label="资讯描述:" prop="InformationDescription">
              <Input style="width: 15rem" v-model="ContentData.InformationDescription"></Input>
            </FormItem>
            <FormItem label="展示窗口:" prop="DisplayWindow">
              <Input style="width: 15rem" v-model="ContentData.DisplayWindow"></Input>
            </FormItem>
            <FormItem label="资讯分类:" prop="Classification">
              <Select style="width: 8rem" placeholder="选择分类"></Select>
            </FormItem>
          </Form>
        </div>
      </div>
      <div class="con flex-start">
        <div class="con-left">
          <div class="title-box flex-start">
            <div class="title flex-center-start">
              <p>
                <Icon style="color: #F9FAFC" type="md-bookmark" />
                <span>专题正文</span>
              </p>
            </div>
            <div class="jiao"></div>
          </div>
        </div>
        <div class="con-right">
          <wangeditor :labels="editor1" id="ed1"></wangeditor>
        </div>
      </div>
      <div class="con flex-start">
        <div class="con-left">
          <div class="title-box flex-start">
            <div class="title flex-center-start">
              <p>
                <Icon style="color: #F9FAFC" type="md-bookmark" />
                <span>封面图片</span>
              </p>
            </div>
            <div class="jiao"></div>
          </div>
        </div>
        <div class="con-right">
          <div class="figure">
            <div class="tu">
              <Icon type="md-image" />
              <p>删除图片</p>
            </div>
            <div class="Photo-But">
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                     <Button icon="ios-cloud-upload-outline" type="success">上传图片</Button>
               </Upload>
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                     <Button type="success">从图库中选择</Button>
               </Upload>
            </div>
          </div>
          <div class="tj">
            <Button type="success">提交</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        navigation1: {
          head: "发布资讯(志愿者)"
        },
        ContentData:{
          TitleInformation:'',
          InformationDescription:'',
          DisplayWindow:''
        },
        RuleDate:{
          TitleInformation:[
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          InformationDescription:[
            { required: true, message: '描述不能为空', trigger: 'blur' }
          ],
          DisplayWindow:[
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        },
        // 富文本editor
        editor1: {
          contents:''
        }
      }
    },
    mounted(){}
  }

</script>
<style scoped>
  html,body{
    margin: auto;
  }
  .main{
    background-color: #ffffff;
  }
  .main,
  .content,
  .tu{
    border: 1px solid #E4E4E4;
  }
  .content{
    margin: 1rem auto;
    width: 50rem;
  }
  .con-left,
  .title{
    width: 8rem;
  }
  .con-right{
    border-left: 1px solid #E4E4E4;
  }
  .con-left,
  .con-right{
    padding-top: 2rem;
    float: left;
  }
  .title-box{
    position: absolute;
  }
  .title{
    background-color: #9EA7B4;
    height: 40px;
    color: #F9FAFC;
    padding-left: 1rem;
  }
  .jiao{
    width: 0;
    height: 0;
    border-width: 20px;
    border-style: solid;
    border-color:  transparent transparent transparent #9EA7B4;
  }
  .con-right{
    padding-left: 3rem;
    padding-right: 3rem;
    width: 42rem;
  }
  .tu{
    width: 6rem;
  }
  .tu{
    text-align: center;
    line-height: 6rem;
  }
  .tu p{
    border-top: 1px solid #E4E4E4;
    text-align: center;
    line-height: 1.5rem;
    font-size: 12px;
    color: #1ABC9C;
  }
  .Photo-But{
    padding: 0.5rem 0;
    display: flex;
  }
  .Photo-But Button{
    margin-right: 0.5rem;
  }
  .tj{
    margin-top: 1rem;
    border-top: 1px solid #E4E4E4;
  }
  .tj Button{
    display: block;
    margin: 2rem auto 5rem;
  }
</style>
