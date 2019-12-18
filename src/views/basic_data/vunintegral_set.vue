<!-- 积分设置（志愿者） -->
<template>
  <div class="set">
    <Navigation :labels="navigation1"></Navigation>
    <div class="set-header flex-center-between"><span>志愿者积分</span></div>
    <div class="content">

      <div class="content-list">
        <ul class="list-left">

          <li v-for="(item,index) in data" :key="index">{{item.comments}}

            <div class="right-input flex-center-start">
              <span><Icon type="ios-add-circle" size='25' v-if="item.typeChange==1"/><Icon type="md-remove-circle" size='25' v-if="item.typeChange==2"/>积分:</span>
              <!-- <Input v-model="item.score"  οnblur="item.score=item.score.replace(/[^\d]/g,'')"   placeholder="只能输入数字" style="width: 120px" /> -->
               <InputNumber v-model="item.score" :min="1" placeholder="只能输入数字" style="width: 120px;margin-right:10px"></InputNumber>
              <span slot='append'>分</span>
            </div>

          </li>

        </ul>
      </div>
       <p class="btns"><Button size='large'  class="table-btns" @click="Submission">提交</Button></p>
    </div>
    </div>

</template>

<script>
import {integralrule,OffSubmission} from '../../request/api'
export default {
  data () {
    return {
      navigation1: {
        head: "积分设置(志愿者)"
      },
      sysType:2,
      data:[],
      stateinput:[]
    }
  },

  components: {},
   computed: {

  },


  created () {},

  methods: {

    //积分设置
    getintegralrule(){
      integralrule({
        sysType:this.sysType
      }).then(res=>{
        if(res.code==200){
          this.data=res.data

        }
        console.log(res)
      })
    },

    //提交接口
    getOffSubmission(){
      OffSubmission({
        list:this.data
      }).then(res=>{
        if(res.code==200){
          // this.getintegralrule()
           this.$router.push({name:'vun_integral'})
          this.$Message.info('设置成功')
        }else{
          this.$Message.error(res.msg)
        }
      })
    },

    //提交
    Submission(){
      this.stateinput=this.data.filter(item=>{
        return item.score===null
      })
      console.log(this.stateinput)
      if(this.stateinput.length==0){
        this.getOffSubmission()
      }else{
        this.$Message.error("必填项未填,请仔细检查哟!");
      }

    }
  },
  mounted(){
    this.getintegralrule()
  }
}

</script>
<style lang="scss" scoped>
.set-header{
  padding: 20px;
  background: rgb(228, 228, 228);
}
.content{
  padding: 20px 30px 30px;
  background: #fff;
}
.content .content-tit{
  padding: 20px 0;
}
.content .content-list{
  // border: 1px solid #eee;
  // border-left: 1px solid #eee;
  display: flex;
  justify-content: center;
}
.content .list-left li{
  align-items: center;
  justify-content: space-between;
  display: flex;
}
.content .list-right{
  flex: 3;
}
.content .list-right .right-input{
  margin-left: 10px;
}
.right-input span{
  width: 100px;
}
.content .list-right .right-input .input{
  width: 200px;
  margin-left: 10px;
}
.content .content-list ul{
  border: 1px solid #eee;
 li{
  box-sizing: border-box;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  // border-right: 1px solid #eee;
}
}
.content .content-list .list-right li{
  padding-left: 150px;
}
.content .content-btn{
  margin: 100px auto;
}

.btns{
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
</style>
