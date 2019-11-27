<!-- 证书维护（志愿者） -->
<template>
  <div class="integral">
    <!-- <Row class="row">
      <Col span="10">
        <button>选择志愿者团队</button>
      </Col> 
      <Col span="14">
        <Select v-model="model1" style="width:80%">
          <Option v-for="item in team" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
    </Row> -->

    <Row>
      <Col span="12">
        <div class="show">
          <img :src="headimg" alt="" class="head">
          <p>志愿服务证明</p>
          <p>CERTIFICATE OF VOLUNTEER SERVICE</p>
        </div>
        <Row>
          <Col span="6" push="18">
            <p>[*志愿机构*]</p>
            <img :src="footimg" alt="" class="fot">
          </Col>
        </Row>
      </Col>
      <Col span="12">
        <p>
          <a href="javascript:;" @click="showUpload(1)">更换LOGO</a>
          <a href="javascript:;" @click="showUpload(2)">更换页尾</a>
        </p>
        <div class="box" v-show='i == 0'>
            <div class="upload" v-if='headimg == null'>
                <div class="file" @click="()=>{ this.$refs.files.click()}">
                  <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="files" @change="uploadFile('headimg','logoPic',$event)">
                  <Icon type="md-cloud-upload" :size='36' color="#2d8cf0"/>
                </div>
            </div>
            <img class="imgs" v-else :src="headimg"/>
            <Icon type="ios-trash" v-if='!show && headimg !== null' class="cancel" @click="cancelImg('logoPic')"/>
        </div>
        <div class="box" v-show='i == 2'>
            <div class="upload" v-if='footimg == null'>
                <div class="file" @click="()=>{ this.$refs.filess.click()}">
                  <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="filess" @change="uploadFile('footimg','officeSealPic',$event)" >
                  <Icon type="md-cloud-upload" :size='36' color="#2d8cf0"/>
                </div>
            </div>
            <img class="imgs" v-else :src="footimg"/>
            <Icon type="ios-trash" v-if='!show && footimg !== null' class="cancel" @click="cancelImg('officeSealPic')"/>
        </div>
        <Button type="primary" icon="ios-cloud-saved-outline" @click="location" v-if='show'>保存图片</Button>
      </Col>
    </Row>
    <!-- <div class="integral-table">
      <div class="pages">
        <Page :total="100" show-elevator show-total size="small" />
      </div>
    </div> -->
  </div>
</template>

<script>
import { updateBooks,getBooksDetails,orgimgdel } from '@/request/api'
import { upload }from '@/request/http' 
export default {
  data() {
    return {
      model1: "",
      headimg:null,
      logoPic:null,
      footimg:null,
      officeSealPic:null,
      i:0,
      certMouldId:this.$route.params.certMouldId,
      show:this.$route.params.show
    };
  },
  created() {
    this.getList()
  },
  methods: {
    getList(){
      getBooksDetails({certMouldId:this.certMouldId}).then(res => {
        console.log(res)
        this.headimg = res.data.logoPicPath
        this.logoPic = res.data.logoPic
        this.footimg = res.data.officeSealPicPath
        this.officeSealPic = res.data.officeSealPic
      })
    },
    showUpload(e){
      this.i = e
    },
    uploadFile (img,src,e) {
      let file = e.target.files[0]
        const dataForm = new FormData()
      dataForm.append('file', file)
      upload(dataForm).then(res => {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          this[img] = e.target.result
          this[src] = res.data
        }
      })
      
    },
    cancelImg(src){
        orgimgdel({path:this[src]}).then(res => {
          if(src == 'logoPic'){
            this.logoPic = null
            this.headimg = null
          }else{
            this.officeSealPic = null
            this.footimg = null
          }
         this.$Message.success('删除成功')
        })
    },
    location(){
      if(this.logoPic || this.officeSealPic){
        this.$Message.wran('logo或者尾部照片没有选择')
        return
      }
      let args = {
        certMouldId:this.certMouldId,
        logoPic:this.logoPic,
        officeSealPic:this.officeSealPic
      }
      updateBooks(args).then(res => {
        this.$router.back()
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.integral {
  text-align: center;
}
a {
  color: black;
  font-size: 14px;
}
.box {
  width: 80%;
  border: 1px solid gray;
  height: 20rem;
  margin: 2rem auto;
  background: #bfeef0;
}
.photo {
  width: 60%;
  height: 15rem;
  border: 1px solid gray;
  margin: 1rem auto;
  background: #c3cbcb;
}
.integral-table {
  margin-top: 30px;
}
button {
    padding: 5px;
  font-size: 14px;
  text-align: center;
  border-radius: 5px;
  border:1px solid gray;
}
.row{
    margin: 1rem;
}
.show{
  padding: 20px;
}
.show .head{
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
}
.fot{
  width: 100%;
  height: 100px;
}
.show .head p{
  text-align: center;
}
.box{
  .upload .file{
    height: 150px;
    width: 300px;
    border: 1px dashed #dcdee2;
    text-align: center;
    padding: 20px 0;
  }
  .upload .file:hover{
    border: 1px dashed #2d8cf0;
  }
  .upload .file input{
    display: none;
  }
}
</style>
