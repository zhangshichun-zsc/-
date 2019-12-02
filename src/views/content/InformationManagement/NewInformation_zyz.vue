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
            <FormItem label="资讯标题:" prop="title">
              <Input style="width: 15rem" v-model="ContentData.title" />
            </FormItem>
            <FormItem label="资讯描述:" prop="resume">
              <Input style="width: 15rem" v-model="ContentData.resume" />
            </FormItem>
            <FormItem label="展示窗口:" prop="showLocation">
              <Select v-model="ContentData.showLocation" style="width:200px" :transfer=true>
                <Option v-for="item in showlist" :value="item.dicId" :key="item.dicId">{{ item.dicName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="资讯分类:" prop="informationType">
              <Select v-model="ContentData.informationType" style="width:200px" :transfer=true>
                <Option v-for="item in typelist" :value="item.dicId" :key="item.dicId">{{ item.dicName }}</Option>
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
              <img :src="imgs" style="height:100px;width:100px;" />
              <p>
                <a @click="cancelImg">删除图片</a>
              </p>
            </div>
            <div class="Photo-But">
              <div class="start-wap">
                <div class="upload">
                  <div class="file" @click="()=>{ this.$refs.files.click()}">
                    <input style=" display:none;" type="file" accept=".jpg, .JPG, .gif, .GIF, .png, .PNG, .bmp, .BMP" ref="files" @change="uploadFile()" multiple />
                    <!-- <Icon type="md-cloud-upload" :size="36" color="#2d8cf0" /> -->
                    <Button>上传图片</Button>
                  </div>
                </div>
              </div>
              <Button type="success" @click="modal1=true">从图库中选择</Button>
            </div>
          </div>
          <Modal v-model="modal1" title="从图库选择">
            <p>商品图库>全部图库</p>
          </Modal>
          <div class="tj">
            <Button type="success" @click="Submission('ContentData')">提交</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
import { upload } from '@/request/http'
import { inquiryReltype, inquiryRelext, inquiryRel, orgimgdel } from '@/request/api'
export default {
  data() {
    return {
      name: 'editor',
      navigation1: {
        head: '发布资讯(志愿者)'
      },
      ContentData: {
        title: '',
        resume: '',
        showLocation: '',
        informationType: ''
      },
      RuleDate: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        resume: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
        showLocation: [
          {
            type: 'number',
            required: true,
            message: '请选择展示类型',
            trigger: 'change'
          }
        ],
        informationType: [
          {
            type: 'number',
            required: true,
            message: '请选择资讯类型',
            trigger: 'change'
          }
        ]
      },

      editorContent: '',

      sysId: 2,
      typelist: [],
      showlist: [],

      url: '',
      modal1: false,
      imgs: null
    }
  },
  methods: {
    //资讯类型下拉
    getinquiryReltype() {
      inquiryReltype({
        sysId: this.sysId
      }).then(res => {
        if (res.code == 200) {
          this.typelist = res.data
        }
        console.log(res)
      })
    },
    //展示窗口下拉
    getinquiryRelext() {
      inquiryRelext({
        sysId: this.sysId
      }).then(res => {
        if (res.code == 200) {
          this.showlist = res.data
        }
        console.log(res)
      })
    },
    //资讯发布
    getinquiryRel() {
      inquiryRel({
        sysId: this.sysId,
        userId: this.$store.state.userId,
        title: this.ContentData.title,
        showLocation: this.ContentData.showLocation,
        resume: this.ContentData.resume,
        content: this.editorContent,
        informationType: this.ContentData.informationType,
        url: this.url
      }).then(res => {
        if (res.code == 200) {
          this.$router.push({ name: 'InformationList_zyz' })
          this.$Message.info(res.msg)
        } else {
          this.$Message.info(res.msg)
        }
        console.log(res)
      })
    },

    //图片上传
    uploadFile() {
      let file = this.$refs.files.files[0]
      console.log(file)
      const dataForm = new FormData()
      dataForm.append('file', file)
      upload(dataForm).then(res => {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = e => {
          this.imgs = e.target.result
          this.url = res.data
        }
      })
    },
    //删除图片
    cancelImg() {
      if (this.url == null) {
        this.$Message.info('请先上传图片')
      } else {
        orgimgdel({ path: this.url }).then(res => {
          if (res.code == 200) {
            this.$Message.success('删除成功')
            this.imgs = null
            this.url = null
          } else {
            this.$Message.success(res.msg)
          }
        })
      }
    },

    //提交
    Submission(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.url == null) {
            this.$Message.error('请先上传图片')
          } else if (this.editorContent == '') {
            this.$Message.error('专题正文未填')
          } else {
            this.getinquiryRel()
          }
        } else {
          this.$Message.error('必填项未填!')
        }
      })
    }
  },
  mounted() {
    var editor = new E('#editorElem')
    editor.customConfig.zIndex = 100

    editor.customConfig.onchange = html => {
      this.editorContent = html
      console.log(html)
    }
    editor.create()

    this.getinquiryReltype()
    this.getinquiryRelext()
  }
}
</script>
<style scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
}

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
