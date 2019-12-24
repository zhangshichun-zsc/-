<!--维护活动模板(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="select flex-start">
        <span class="select-template">培训标题</span>
        <Input  style="width:300px" v-model="args.fkMouldName" size="large">
        </Input>
      </div>
      <div class="select flex-start">
        <span class="select-template">活动分类</span>
        <Input  style="width:300px" v-model="args.typeDicName" size="large">
        </Input>
      </div>
      <div class="select flex-start">
        <span class="select-template">培训图片</span>
        <div class="start-wap">
          <div class="upload" v-if='image == null'>
              <div class="file" @click="()=>{ this.$refs.files.click()}">
                <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="files" @change="uploadFile()">
                <Icon type="md-cloud-upload" :size='36' color="#FF565A"/>
              </div>
          </div>
          <img class="imgs" v-else :src="image"/>
          <Icon type="ios-trash" v-if='image !== null' class="cancel" @click="cancelImg()" color='#FF565A'/>
        </div>
      </div>
      <div class="select flex-start">
        <span class="select-template">培训详情</span>
        <div><wangeditor :labels="args.trainComments" id="eddl" @change='changeEditorTrain'></wangeditor></div>
      </div>
       <Modal v-model="addstate" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                  <span>作废确定</span>
                </p>
                <div style="text-align:center">
                  <p>请确认是否要作废此模板</p>
                </div>
                <div slot="footer">
                  <Button type="error" @click="cencel(2)">取消</Button>
                  <Button type="success" @click="delFeed">确定</Button>
                </div>
              </Modal>
      <div class="button-food">
        <i-button @click="template" shape="circle" size='large' class="btn">保存</i-button>
        <i-button @click="cencel(1)"  shape="circle" size='large' class="btn" v-if='ble==1'>作废</i-button>
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
      addstate:false,
      zuo:false,
      ble:1,
      args:{
	      fkMouldName:null,
	      typeDicId:null,
	      typeDicName:null,
	      picUrl: null,
        trainComments: null,

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
      this.zuo=true
      this.args.actFkMouldId = this.$route.query.id
      this.getDetail()
    }else{
      this.args.typeDicId = this.$route.query.id
      this.args.typeDicName = this.$route.query.name
    }
  },

  mounted() {

  },

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
        this.$Message.warning('不完整')
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
    cencel(e){
      if(e==1){
        this.addstate=true
      }else{
        this.addstate=false
      }

    },
    delFeed(){
      delActiveFeedBack({actFkMouldId:this.args.actFkMouldId,valid:3}).then(res => {
        if(res.code == 200){
          this.$Message.success('删除成功')
          this.addstate=false
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
  background: #fff;
  .button-food {
    padding: 50px 20px;
    display: flex;
    justify-content: center;
  .btn{
    padding: 10px 30px !important;
    background: #FF565A !important;
    color: #fff !important;
    border-color:none !important;
    margin-right: 30px !important;
  }
  .btn:hover{
    border:1px solid #FF565A !important;
    color: #FF565A !important;
    background: #fff !important;
  }
}
  .select{
    margin-bottom: 15px;
    .select-template{
      margin-right: 50px;
    }
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
    border: 1px dashed #FF565A;
    text-align: center;
    padding: 20px 0;
  }
  .upload .file input{
    display: none;
  }
}
</style>
