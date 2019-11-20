<!--新建相册(会员)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con">
        <div class="title bk-szy">
          <p>
            <span>新建相册</span>
          </p>
        </div>
        <div class="add inter-table">
          <Form class="bd" ref="AddDate" :model="AddData" :rules="ruleValidate" :label-width="120">
            <FormItem label="相册名称:" prop="AlbumName">
              <Input style="width: 10rem" v-model="AddData.AlbumName"></Input>
            </FormItem>
            <FormItem label="相册封面:">
              <Upload
                multiple
                action="//jsonplaceholder.typicode.com/posts/">
                <Button icon="ios-cloud-upload-outline">选择上传文件</Button>
              </Upload>
              <span style="color: #999999;font-size: 14px;">只能上传jpg/png格式文件，文件不能超过50kb</span>
            </FormItem>
            <FormItem label="相册描述:">
              <Input style="width: 20rem" v-model="AddData.AlbumDescription" type="textarea" :autosize="{minRows: 8,maxRows: 5}" placeholder="请输入内容"></Input>
            </FormItem>
            <FormItem label="排序:">
              <Input style="width: 10rem" v-model="AddData.Sorting"></Input>
            </FormItem>
            <FormItem>
              <Button type="success">提交</Button>
            </FormItem>
          </Form>
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
          head: "新建相册(会员)"
        },
        AddData:{
          AlbumName:'',
          AlbumCover:'',
          AlbumDescription:'',
          Sorting:''
        },
        ruleValidate:{
          AlbumName:[
            { required: true, message: '相册名称不能为空', trigger: 'blur' }
          ]
        },
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
  .add{
    border: 1px solid #E4E4E4;
  }
  .content{
    margin: 10px;
  }
  .bk-szy{
    border-left: 1px solid #E4E4E4;
    border-right: 1px solid #E4E4E4;
    border-top: 1px solid #E4E4E4;
  }
  .title{
    background-color: #F3F3F3;
    justify-content: space-between;
    padding: 10px 20px;
  }
  .add{
    padding: 50px 0;
  }
  .add td{
    padding: 5px 10px;
  }
  .add a{
    margin-left: 20px;
    color: #666666;
  }
  .bd{
    margin: 0 auto;
  }
  .inter-table{
    display: flex;
    align-items: center;
  }
</style>
