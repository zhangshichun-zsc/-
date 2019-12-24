<!--活动立项明细(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="establish">
        <ul>
          <li>
            <span class="tit">创建者</span>
            <span>{{list.createUserName}}</span>
          </li>
          <li>
            <span class="tit">项目</span>
            <span>{{list.categoryName}}</span>
          </li>
          <li>
            <span class="tit">活动预算</span>
            <span>{{list.budget}}</span>
          </li>
          <li>
            <span class="tit">有效期限</span>
            <span>{{list.startTime}}~{{list.endTime}}</span>
          </li>
        </ul>
      </div>
      <div class="establish">
        <ul>
          <li>
            <span class="tit">立项名称</span>
            <span>{{list.batchName}}</span>
          </li>
          <li>
            <span class="tit">活动目的</span>
            <span>{{list.objective}}</span>
          </li>
          <li>
            <span class="tit">小组归属</span>
            <span>{{list.orgName}}</span>
          </li>
          <li>
            <span class="tit">招募类型</span>
            <span>{{list.recuitTypeText}}</span>
          </li>
        </ul>
        <div>
          <img :src="list.pic" alt="" style="width:190px;heigth:130px">
        </div>
      </div>
      <div class="project-content">
        <p>
          <span>活动立项批次</span>
        </p>
        <div class="main" v-for="item in actlist" :key="item.index" @click="jump(item.isUpdate,item.activityId,item.name)">
          <img :src="item.pic" />
          <ul>
            <li class="ul-head" >{{item.name}}</li>
            <li><span class="tit">地点:</span><span>{{item.address}}</span></li>
            <li><span class="tit">活动日期:</span><span>{{item.startAt}}--{{item.endAt}}</span></li>
            <li><span class="tit">招募:</span><span>{{item.recruitNum}}人</span></li>
            <li>{{item.pay}}</li>
          </ul>
        </div>
      </div>
      <div class="btn" v-if='statusText=="待审核"'>
        <Button class="table-btn" @click="adopt(3)">拒绝</Button>
        <Button class="table-btn active" @click="adopt(2)">通过</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate, date1 } from '../../request/datatime'
import { approvaldet,programApproval } from '../../request/api'
export default {
  data() {
    return {
      navigation1: {
        head: '活动立项明细'
      },
      cityList: [
        {
          value: 'beijing',
          label: '北京市'
        },
        {
          value: 'shanghai',
          label: '上海市'
        }
      ],
      model1: 'beijing',
      single: false,
      list: [],
      datas: ['2019-08-21', '2019-10-1'],
      actlist: [],
      reason:'',
      statusText:''
    }
  },

  components: {},

  computed: {},

  created() {
    this.statusText = this.$route.query.statusText
  },
  mounted() {
    this.getapprovaldet()
  },
  methods: {
    jump(i,id,name){
      if(i === 1){
        this.$router.push({
          name: "editing",
          query: { dicId:id,name}
        });
      }
    },
    //活动详情
    getapprovaldet() {
      approvaldet({
        batchId: this.$route.query.batchId,
        userId: this.$store.state.userId
      }).then(res => {
        if (res.code == 200) {
          this.list = res.data
          this.actlist = res.data.acitivitys
          this.actlist = res.data.acitivitys.map(item => {
            if (item.startAt) {
              item.startAt = date1('Y-m-d', item.startAt)
              item.endAt = date1('Y-m-d', item.endAt)
            }
            return item
          })
          this.datas[0] = date1('Y-m-d', res.data.startTime)
          this.datas[1] = date1('Y-m-d', res.data.endTime)
          console.log(this.datas)
        }
        console.log(res)
      })
    },
    //通过
    adopt(e) {
      programApproval({
        userId:this.$store.state.userId, 
        auditId:this.$route.query.auditId, 
        type:e,
      }).then(res=>{
        if(res.code==200){
          this.$Message.success(res.msg);
        }else{
           this.$Message.warning(res.msg);
        }
      })
    },
    refuse() {
      console.log(this.datas)
      programApproval({
        userId:this.$store.state.userId, 
        auditId:this.list.auditId, 
        type:3,
        reason:this.reason
      }).then(res=>{
        console.log(res)
        if(res.code==200){
          this.$Message.success(res.msg);
        }else{
           this.$Message.warning(res.msg);
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  padding-left: 20px;
  .content-head {
    height: 50px;
    line-height: 50px;
  }
  .establish {
    background: #ffffff;
    padding-left: 50px;
    margin-bottom: 10px;
    width: 1000px;
    display: flex;
    align-items: center;
    ul {
      // height: 200px;
      width: 500px;
      padding: 20px 0;
      li {
        display: flex;
        align-items: center;
        height: 40px;
        span {
          font-size: 14px;
          display: inline-block;
          width: 500px;
          font-size: 16px;
          // margin-right: 70px;
        }
        .tit{
          width: 200px;
        }
      }
    }
    .ivu-upload {
      height: 140px;
      width: 200px;
      display: flex;
      align-items: center;
      background: #e4e4e4;
      justify-content: center;
      .ivu-btn,
      .ivu-btn-ghost {
        span {
          color: black;
        }
      }
    }
  }
  .project-content {
    // height: 500px;
    width: 1000px;
    margin-bottom: 10px;
    background: #ffffff;
    p {
      width: 100px;
      height: 30px;
      background: #339933;
      line-height: 30px;
      font-size: 14px;
      color: #ffffff;
      text-align: center;
    }
  }
  .main {
    height: 200px;
    margin-left: 40px;
    margin-top: 20px;
    display: flex;
    padding: 0px 30px;
    align-items: center;
    img {
      width: 150px;
      height: 120px;
      background: #e4e4e4;
      margin-right: 70px;
    }
    ul {
      .ul-head {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        margin-bottom: 10px;
      }
      li {
        margin-bottom: 10px;
        .tit{
          display: inline-block;
          width: 100px;
        }
      }
    }
  }
  .cooperation {
    width: 900px;
    // height: 200px;
    padding: 20px 0;
    background: #ffffff;
    ul {
      li {
        height: 40px;
        line-height: 40px;
        padding: 0 50px;
        border-bottom: #e4e4e4 1px solid;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
      }
      .border-no {
        border: 0;
      }
    }
  }
  .introduce {
    width: 900px;
    font-size: 14px;
    padding: 10px;

    height: 150px;
    background: #ffffff;
    margin-top: 10px;
  }
  .btn {
    width: 900px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    .table-btn {
      width: 120px;
      height: 40px;
      border: black 1px solid;
      margin: 0 20px;
    }
    .active {
      background: #339933;
      color: #ffffff;
    }
  }
}
</style>
