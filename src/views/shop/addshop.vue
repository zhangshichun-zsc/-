<!-- 填写商品信息（共用） -->
<template>
  <div class="integral">
    <div class="integral-header">
       <Navigation :labels="navigation1"></Navigation>
    </div>
    <div class="integral-table">
      <div class="push">
           <div class="box">
              <div class="box1">基本信息</div>
              <div class="box2"></div>
           </div>
           <div class="content">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="200" >
        <FormItem label="商品分类" prop="shopclass" >
            <Select v-model="formValidate.shopclass" placeholder="请选择" style="width:300px">
            </Select>
        </FormItem>
        <FormItem label="商品名称" prop="shopname">
            <Input v-model="formValidate.shopname" style="width:300px"></Input>
        </FormItem>
        <FormItem label="商品介绍" prop="shopintro">
            <Input v-model="formValidate.shopintro" type="textarea" :autosize="{minRows: 5,maxRows: 5}"style="width:400px" placeholder="请输入内容···"></Input>
        </FormItem>
        <FormItem label="积分兑换数量" prop="integral">
            <Input v-model="formValidate.integral" style="width:300px"></Input>
        </FormItem>
        <FormItem label="商品库存" prop="stock">
            <Input v-model="formValidate.stock" style="width:300px"></Input>
        </FormItem>
    </Form>   
           </div>
      </div>
      <div class="push">
           <div class="box">
              <div class="box1">其他信息</div>
              <div class="box2"></div>
           </div>
           <div class="content">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="200" >
                 <FormItem label="商品上架"  >
                     <i-switch v-model="switch1" />
                 </FormItem>
                 <FormItem label="商品推荐">
                      <CheckboxGroup>
                         <Checkbox v-model="disabledSingle">
                             <span>新品</span>
                         </Checkbox>
                         <Checkbox >
                             <span>推荐</span>
                         </Checkbox>
                      </CheckboxGroup>   
                 </FormItem>
                 <FormItem label="详细页标题">
                     <Input style="width:300px"></Input>
                 </FormItem>
                 <FormItem label="详细页描述">
                     <Input style="width:300px"></Input>
                 </FormItem>
                 <FormItem label="商品关键词">
                     <Input style="width:300px"></Input>
                 </FormItem>
                 <FormItem label="商品备注">
                     <Input type="textarea" :autosize="{minRows: 5,maxRows: 5}"style="width:400px" placeholder="请输入内容···"></Input>
                 </FormItem>
             </Form>  
           </div>
      </div>
      <div class="push">
           <div class="box">
              <div class="box1">商品相册</div>
              <div class="box2"></div>
           </div>
           <div class="content">
              <div class="img">
                  <ul>
                      <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568890584861&di=3bc20fd3a0e62606a014543c3bcc80c3&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F202124649.jpeg" ></li>
                      <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568890584861&di=3bc20fd3a0e62606a014543c3bcc80c3&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F202124649.jpeg" ><div><span>设为主图</span><span>删除图片</span></div></li>
                      <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568890584861&di=3bc20fd3a0e62606a014543c3bcc80c3&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F202124649.jpeg" ><div><span>设为主图</span><span>删除图片</span></div></li>
                      <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568890584861&di=3bc20fd3a0e62606a014543c3bcc80c3&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F202124649.jpeg" ><div><span>设为主图</span><span>删除图片</span></div></li>
                  </ul>
              </div>
              <div class="btns">
                   <Upload action="//jsonplaceholder.typicode.com/posts/">
                     <Button type="success">上传图片</Button>
                   </Upload>
                   <Upload action="//jsonplaceholder.typicode.com/posts/">
                     <Button type="success">从图片库选择</Button>
                   </Upload>
              </div>
           </div>
      </div>
      <div class="content">
           <Button type="success">保存</Button>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
               formValidate: {
                   shopclass:"",
                   shopname:"",
                   shopintro:"",
                   integral:"",
                   stock:""
                        },
                ruleValidate: {
                    shopclass: [
                        { required: true, message: '商品分类不能为空', trigger: 'blur' }
                    ],
                    shopname: [
                        { required: true, message: '商品名称不能为空', trigger: 'blur' }
                    ],
                    shopintro: [
                        { required: true, message: '商品介绍不能为空', trigger: 'blur' },
                    ],
                    integral: [
                        { required: true, message: '积分兑换数量不能为空', trigger: 'blur'},
                    ],
                    stock: [
                        { required: true, message: '商品库存不能为空', trigger: 'blur' }
                    ]
                },
         disabledSingle: true,        
        switch1: false,
        navigation1: {
        head: "填写商品信息（共用）"
       },
    };
  },

  components: {},
  computed: {},
  created() {},
  methods: {
     
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

.ivu-tag {
  margin-left: 10px;
}

.box{
  display: flex;
}
.box1{
  width: 150px;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  background:gray;
  color: white;
}
.box2{
width: 0;
height: 0;
border-width: 20px;
border-style: solid;
border-color:  transparent transparent transparent gray;
}
.push{
  margin:10px 0;
}
.content{
  width: 80%;
  margin: 20px auto;
}
.ques{
  margin-bottom: 15px;
  display: flex;
}
.img ul{
    width: 600px;
    display: flex;
    justify-content: space-between;
    color: green;
    font-size: 12px;
}
.img ul li{
    width: 120px;
    height: 120px;
    border: 1px solid gray;
    text-align: center;
    
}
.img ul li div{
    display: flex;
    height: 18px;
    width: 118px;
    background: #ccc;
    line-height: 18px;
}
.img ul li div span{
    flex: 1;
 
}
.img ul li img{
    width: 80px;
    height: 60px;
    margin: 20px;
    vertical-align: top;
}
.btns{
    margin-top: 20px;
    display: flex;
}
.btns Button{
    margin-right: 10px;
}
</style>
