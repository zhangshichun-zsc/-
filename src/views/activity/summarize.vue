<!--活动总结(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="head">
      <p>5.12"行走在夏日"游园活动</p>
      <span>未开始</span>
    </div>
    <div class="content">
      <div class="summarize">
        <p>本次活动总结</p>
         <wangeditor id="excccc2" :labels='text'  @change="btns"></wangeditor>

      </div>
      <div class="activity-content">
        <p class="content-img">
          <span>您可以上传有意思的活动照片</span>
          <span>上传图片(最多6张)</span>
        </p>
        <div class="uploading-img" v-for='(item,i) in picList'>
          <div v-if="item.pic">
            <img class="imgs" :src="item.pic"/>
            <Icon src="" alt="" class="cancel" @click="cancelImg()"/>
          </div>
        </div>
        
        <div v-if='picList.length<6'>
          <div class="upload" >
            <div class="file" @click="()=>{ this.$refs.files.click()}">
              <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="files" @change="uploadFile()" style="display:none" >
              <Icon type="md-cloud-upload" :size='36' color="#2d8cf0"/>
            </div>
          </div>
        </div>

        <div class="btn">
          <Button class="table-btn" @click="getactivesum">提交</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {activesum} from '@/request/api'
import wangeditor from '@/components/wangeditor';
import { upload }from '@/request/http'

export default {
  data() {
    return {
      navigation1: {
        head: "活动总结(会员)"
      },
      editor1:'',
      picList:[], //图片展示
      pics:[], //上传后
      userId:1,
      activityId:1,
      text:''
    };
  },

  components: { wangeditor },

  computed: {},

  created() {
    this.userId = this.$store.state.userId
  },

  methods: {
    uploadFile() {
      let file = this.$refs.files.files[0]
      const dataForm = new FormData()
      dataForm.append('file', file)
      upload(dataForm).then(res => {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          console.log(e)
          this.picList[this.picList.length] = e.target.result
          this.pics[this.pics.length] = res.data
        }
      })
      console.log(this.picList)
      console.log(this.pics)
    },
    cancelImg(){
      orgimgdel({path:this.projectMsg.batchPic}).then(res => {
        this.projectMsg.batchPicShow = null
        this.projectMsg.batchPic = null
        this.$Message.success('删除成功')
      })
    },
    getactivesum(){
      activesum({
        userId:this.userId,
        activityId:this.$route.query.acitvityId,
        text:this.text,
        pics:this.pics
      }).then(res=>{
        console.log(res)
      })
    },
    //
    btns(e){
      console.log(e)
      this.text = e
    },

    btn(){
      console.log(apiAddress)
      apiAddress().then(res=> {
            console.log(res)
        })
    }

  }
};
</script>
<style lang="scss" scoped>
.head {
  height: 70px;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  align-items: flex-start;
  margin-bottom: 20px;
  p {
    margin: 5px 0px;
    font-size: 20px;
    height: 20px;
  }
}
.content {
  padding-left: 80px;
  background: #ffffff;
  .summarize {

    padding-top: 20px;
    p {
      width: 280px;
      height: 40px;
      line-height: 40px;
      color: #ffffff;
      background: green;
      padding-left: 20px;
    }
  }
}
.rich-text {
  height: 300px;
  width: 900px;
  border: #e4e4e4 1px solid;
  margin-bottom: 20px;
}

.activity-content {
  background: #ffffff;
  padding-bottom: 30px;
  .content-img {
    display: flex;
    flex-direction: column;
    span {
      font-size: 14px;
      color: #999999;
      margin: 10px 0;
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    button {
      height: 40px;
      width: 140px;
    }
  }
}

.uploading-img {
  ul {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 700px;
    li {
      height: 120px;
      width: 120px;
      background: #e4e4e4;
      margin: 10px 30px;

    }
  }
}

//上传图片样式
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
