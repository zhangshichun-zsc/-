<!--维护活动模板(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="select">
        <span class="select-template">培训标题</span>
        <Input  style="width:300px" v-model="args.fkMouldName">
        </Input>
      </div>
      <div class="select">
        <span class="select-template">活动分类</span>
        <Input  style="width:300px" v-model="args.typeDicName">
        </Input>
      </div>
      <div class="select">
        <span>活动图片</span>
        <div class="start-wap">
          <div class="upload" v-if='image == null'>
              <div class="file" @click="()=>{ this.$refs.files.click()}">
                <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="files" @change="uploadFile()" multiple>
                <Icon type="md-cloud-upload" :size='36' color="#2d8cf0"/>
              </div>
          </div>
          <img class="imgs" v-else :src="image"/>
          <Icon type="ios-trash" v-if='image !== null' class="cancel" @click="cancelImg()"/>
        </div>
      </div>
      <div class="select">
        <span>培训图片</span>
        <div> <wangeditor :labels="args.trainComments" id="eddl" @change='changeEditorTrain'></wangeditor></div>
      </div>
      <div class="button-food">
        <i-button @click="template">保存</i-button>
        <i-button @click="delFeed">作废</i-button>
      </div>
    </div>
  </div>
</template>

<script>
import { upload }from '@/request/http'
import { addTranList,orgimgdel,getActiveFeedBack,delActiveFeedBack }from'@/request/api'
import { filterNull } from '@/libs/utils'
import wangeditor from'_c/wangeditor'
export default {
  data() {
    return {
      navigation1: {
        head: "维护活动模板(会员)"
      },
      image: null,
      args:{
	      fkMouldName:null,
	      typeDicId:null,
	      typeDicName:null,
	      picUrl: null,
	      trainComments: null
      }
    };
  },

  components: { 
    wangeditor
   },

  computed: {},

  created() {
    this.ble =  ~~this.$route.query.ble
    if(this.ble === 1){
      this.args.actFkMouldId = this.$route.query.id
      this.getDetail()
    }else{
      this.args.typeDicId = this.$route.query.id
      this.args.typeDicName = this.$route.query.name
    }
  },

  mounted() {},

  methods: {
    uploadFile () {
      let file = this.$refs.files.files[0]
        const dataForm = new FormData()
      dataForm.append('file', file)
      upload(dataForm).then(res => {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          this.image = e.target.result
          this.args.picUrl = res.data
        }
      })
    },
    getDetail(){
      getActiveFeedBack({actFkMouldId: this.args.actFkMouldId}).then(res => {
        if(res.code == 200){
          this.args.fkMouldName = res.data.fkMouldName
          this.args.typeDicName = res.data.typeDicName
          this.args.typeDicId = res.data.typeDicId
          this.args.picUrl = res.data.picUrl
          this.args.trainComments = res.data.trainComments
          this.image = res.data.picUrlShow
        }else{
          this.$Message.error(res.msg)
        }
      })
    },
     cancelImg(){
        orgimgdel({path:this.args.pic}).then(res => {
           this.image = null
           this.args.picUrl = null
           this.$Message.success('删除成功')
        })
      },
    changeEditorTrain(html){
      this.args.trainComments = html
    },
    template(){
      let args = this.args
      if(!args.fkMouldName || !args.trainComments || !args.typeDicName || !args.picUrl){
        this.$Message.console.warning('不完整')
        return
      }
      addTranList(filterNull(args)).then(res => {
        if(res.code == 200){
          this.$Message.success('添加成功')
          this.$router.back()
        }else{
           this.$Message.error(res.msg)
        }
      
      })
    },
    delFeed(){
      delActiveFeedBack({actFkMouldId:this.args.actFkMouldId,valid:3}).then(res => {
        if(res.code == 200){
          this.$Message.success('删除成功')
          this.$router.back()
        }else{
           this.$Message.error(res.msg)
        }
         
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.head {
  margin-bottom: 0px;
}
.content {
  padding: 20px;
  .select{
    display: flex;
  }
}
.start-wap{
  position: relative;
  height: 150px;
  width: 300px;
  .imgs{
    width: 300px;
    height: 150px;
  }
  .cancel{
    position: absolute;
    top: 10px;
    right: 10px;
  }
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
