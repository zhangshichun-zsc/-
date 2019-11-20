<!-- 积分设置（会员） -->
<template>
  <div class="set">
    <div class="set-header flex-center-between"><span>积分设置</span><Button>积分兑换规则</Button></div>
    <div class="content">
      <div class="content-tit">会员积分</div>
      <div class="content-list">
        <ul class="list-left">
          <li v-for="(item,index) in data" :key="index">{{item.comments}}
            <div class="right-input flex-center-start">
              <span><Icon type="ios-add-circle" size='25' v-if="item.typeChange==1"/><Icon type="md-remove" size='25' v-if="item.typeChange==2"/>积分:</span>
              <Input v-model="item.score"  placeholder="Enter something..." style="width: 120px" />
              <span slot='append'>分</span></i-input>
            </div>
          </li>
        </ul>
      </div>
       <Button type='primary' size='large' class="content-btn" @click="Submission">提交</Button>
    </div>
    </div>
  </div>
</template>

<script>
import {integralrule,OffSubmission} from '../../request/api'
export default {
  data () {
    return {
      sysType:1,
      data:[],
    }
  },

  components: {},

  computed: {},

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
          this.getintegralrule()
        }
      })
    },
    //提交
    Submission(){
      // this.util.debounce(this.getOffSubmission(),10000)
      this.getOffSubmission()
    }
  },
  mounted(){
    this.getintegralrule()
  }
}

</script>
<style lang="scss">
.set-header{
  padding: 20px;
  background: rgb(228, 228, 228);
}
.content{
  padding: 0 30px 30px;
  background: #fff;
}
.content .content-tit{
  padding: 20px 0;
}
.content .content-list{
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  display: flex;
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
.content .content-list ul li{
  box-sizing: border-box;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
}
.content .content-list .list-right li{
  padding-left: 150px;
}
.content .content-btn{
  margin: 100px auto;
}
</style>
