<!--发布资讯(会员)-->
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
              <Input style="width: 15rem" v-model="ContentData.title" />
            </FormItem>
            <FormItem label="资讯描述:" prop="InformationDescription">
              <Input style="width: 15rem" v-model="ContentData.resume" />
            </FormItem>
            <FormItem label="展示窗口:" prop="DisplayWindow">
              <Select v-model="ContentData.showLocation" style="width:200px">
                <Option
                  v-for="item in showlist"
                  :value="item.dicId"
                  :key="item.value"
                >{{ item.dicName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="资讯分类:" prop="Classification">
              <Select v-model="ContentData.informationType" style="width:200px">
                <Option
                  v-for="item in typelist"
                  :value="item.dicId"
                  :key="item.value"
                >{{ item.dicName }}</Option>
              </Select>
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
           <div id="editorElem" style="text-align:left"></div>

          <!-- <wangeditor :labels="editor1" id="ed1"></wangeditor> -->
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
              <p><a @click="del">删除图片</a></p>
            </div>
            <div class="Photo-But">
              <Upload :action="orgimg" :format="['jpg','jpeg','png']" :on-success="handleSuccess">
                <Button icon="ios-cloud-upload-outline" type="success">上传图片</Button>
              </Upload>
              <Upload :action="orgimg">
                <Button type="success">从图库中选择</Button>
              </Upload>
            </div>
          </div>
          <div class="tj">
            <Button type="success" @click="Submission">提交</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
import { orgimg } from "@/request/http";
import {
  inquiryReltype,
  inquiryRelext,
  inquiryRel,
  orgimgdel
} from "@/request/api";
export default {
  data() {
    return {
      name:'editor',
      navigation1: {
        head: "发布资讯(会员)"
      },
      ContentData: {
        title: "",
        resume: "",
        showLocation: "",
        informationType:""
      },
      RuleDate: {
        TitleInformation: [
          { required: true, message: "标题不能为空", trigger: "blur" }
        ],
        InformationDescription: [
          { required: true, message: "描述不能为空", trigger: "blur" }
        ],
        city: [
          {
            type: 'number', required: true, message: '请选择案件类型', trigger: 'change'
          }
        ],
        DisplayWindow: [
          { required: true, message: "不能为空", trigger: "change" }
        ]
      },

      editorContent:'',

      sysType: 1,
      typelist: [],
      showlist: [],
      orgimg: "",
      url:"",
      content:'1323'
    };
  },
  methods: {
    //资讯类型下拉
    getinquiryReltype() {
      inquiryReltype({
        sysType: this.sysType
      }).then(res => {
        if (res.code == 200) {
          this.typelist = res.data;
        }
        console.log(res);
      });
    },
    //展示窗口下拉
    getinquiryRelext() {
      inquiryRelext({
        sysType: this.sysType
      }).then(res => {
        if (res.code == 200) {
          this.showlist = res.data;
        }
      });
    },
    //资讯发布
    getinquiryRel() {
      inquiryRel({
        sysType: this.sysType,
        userId: 1,
        title: this.ContentData.title,
        showLocation: this.ContentData.showLocation,
        resume: this.ContentData.resume,
        content: this.editorContent,
        informationType: this.ContentData.informationType,
        url: this.url
      }).then(res => {
        if(res.code==200){
          this.$Message.info(res.msg)
        }else{
          this.$Message.info(res.msg)

        }
        console.log(res);
      });
    },

    //删除图片
    getorgimgdel(){
      orgimgdel({
        path:this.url
      }).then(res=>{
        if(res.code==200){
           this.$Message.info("删除成功");
        }
        console.log(res)
      })
    },
    //图片上传
    handleSuccess(res, file) {
      this.url=res.data
      console.log(res, file);
    },
    //删除
    del(){
      this.getorgimgdel()
    },
    //提交
    Submission() {
      console.log(this.editorContent)
      // this.getinquiryRel();
    }
  },
  mounted() {
    var editor = new E('#editorElem')
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
          console.log(html)
        }
        editor.create()
        editor.txt.html('11233')

    this.orgimg = orgimg;
    this.getinquiryReltype();
    this.getinquiryRelext();
  }
};
</script>
<style scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
}
.main,
.content,
.tu {
  border: 1px solid #e4e4e4;
}
.content {
  margin: 1rem auto;
  width: 50rem;
}
.con-left,
.title {
  width: 8rem;
}
.con-right {
  border-left: 1px solid #e4e4e4;
}
.con-left,
.con-right {
  padding-top: 2rem;
  float: left;
}
.title-box {
  position: absolute;
}
.title {
  background-color: #9ea7b4;
  height: 40px;
  color: #f9fafc;
  padding-left: 1rem;
}
.jiao {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent transparent #9ea7b4;
}
.con-right {
  padding-left: 3rem;
  padding-right: 3rem;
  width: 42rem;
}
.tu {
  width: 6rem;
}
.tu {
  text-align: center;
  line-height: 6rem;
}
.tu p {
  border-top: 1px solid #e4e4e4;
  text-align: center;
  line-height: 1.5rem;
  font-size: 12px;
  color: #1abc9c;
}
.Photo-But {
  padding: 0.5rem 0;
  display: flex;
}
.Photo-But button {
  margin-right: 0.5rem;
}
.tj {
  margin-top: 1rem;
  border-top: 1px solid #e4e4e4;
}
.tj button {
  display: block;
  margin: 2rem auto 5rem;
}
</style>
