<!--活动立项明细(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <p class="content-head">新增活动立项</p>
      <div class="establish">
        <ul>
          <li>
            <span>创建者</span>
            <span>{{list.createUserName}}</span>
          </li>
          <li>
            <span>选择项目</span>
            <i-select :model.sync="model1" style="width:200px">
              <i-option
                v-for="(item,index) in cityList"
                :value="item.value"
                :key="index"
              >{{ item.label }}</i-option>
            </i-select>
          </li>
          <li>
            <span>活动预算</span>
            <span>{{list.budget}}</span>
          </li>
          <li>
            <span>有效期限</span>
           <Col span="12">
            <DatePicker v-model="datas" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
        </Col>
          </li>
        </ul>
      </div>
      <div class="establish">
        <ul>
          <li>
            <span>立项名称</span>
            <span>{{list.batchName}}</span>
          </li>
          <li>
            <span>活动目的</span>
            <span>{{list.objective}}</span>
          </li>
          <li>
            <span>小组归属</span>
            <i-select :model.sync="model1" style="width:200px">
              <i-option
                v-for="(item,index) in cityList"
                :value="item.value"
                :key="index"
              >{{ item.label }}</i-option>
            </i-select>
          </li>
          <li>
            <span>招募类型</span>
            <Radio :checked.sync="single">{{list.recuitTypeText}}</Radio>
          </li>
        </ul>
        <div>
          <Upload action="//jsonplaceholder.typicode.com/posts/">
        <Button icon="ios-cloud-upload-outline">上传图片</Button>
    </Upload>
        </div>
      </div>
      <div class="project-content">
        <p>
          <span>活动立项批次</span>
        </p>
        <div class="main" v-for="item in actlist" :key="item.index">
          <img :src="item.pic" />
          <ul>
            <li class="ul-head">{{item.name}}</li>
            <li>地点:{{item.address}}</li>
            <li>活动日期:{{item.startAt}}--{{item.endAt}}</li>
            <li>招募:{{item.recruitNum}}人</li>
            <li>{{item.pay}}</li>
          </ul>
        </div>
      </div>
      <div class="cooperation">
        <ul>
          <li class="border-no">合作方</li>
          <li v-for="item in list.actBatchPartners" :key="item.batchPartId" >
            <span>{{item.partName}}</span>
            <span>详情</span>
          </li>
        </ul>
      </div>
      <div class="introduce">
        <p>
          北京融爱融乐心智障碍者家庭支持中心
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
        </p>
      </div>
      <div class="btn"><Button class="table-btn">拒绝</Button><Button class="table-btn active" @click="adopt">通过</Button></div>
    </div>
  </div>
</template>

<script>
import {formatDate,date1} from '../../request/datatime'
import {approvaldet} from '../../request/api'
export default {
  data() {
    return {
      navigation1: {
        head: "活动立项明细"
      },
      cityList: [
        {
          value: "beijing",
          label: "北京市"
        },
        {
          value: "shanghai",
          label: "上海市"
        }
      ],
      model1: "beijing",
      single: false,
      list:[],
      datas:['2019-08-21','2019-10-1'],
      actlist:[]
    };
  },

  components: {  },

  computed: {},

  created() {},
  mounted(){
    this.getapprovaldet()
  },
  methods: {
    //活动详情
    getapprovaldet(){
      approvaldet({
        batchId:this.$route.query.batchId
      }).then(res=>{
        if(res.code==200){
          this.list = res.data
          this.actlist = res.data.acitivitys
          this.actlist=res.data.acitivitys.map(item => {
            if(item.startAt){
              item.startAt=date1('Y-m-d',item.startAt)
              item.endAt=date1('Y-m-d',item.endAt)
            }
            return item
          });
          this.datas[0] =date1('Y-m-d',res.data.startTime)
          this.datas[1]=date1('Y-m-d',res.data.endTime)
          console.log(this.datas)
        }
        console.log(res)
      })
    },
    //通过
    adopt(){
      console.log(this.datas)
    }
  }
};
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
    width: 900px;
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
          width: 200px;
          // margin-right: 70px;
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
    width: 900px;
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
    border: #e4e4e4 1px solid;
    height: 200px;
    width: 600px;
    margin-left: 40px;
    margin-top: 20px;

    display: flex;
    padding: 20px 30px;
    align-items: center;
    img {
      width: 150px;
      height: 120px;
      background: #e4e4e4;
      margin-right: 70px;
    }
    ul {
      height: 120px;
      .ul-head {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        margin-bottom: 10px;
      }
      li {
        font-size: 14px;
        line-height: 18px;
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
  .btn{
    width: 900px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top:50px;
    .table-btn{
      width: 120px;
      height: 40px;
      border: black 1px solid;
      margin: 0 20px;

    }
    .active{
      background: #339933;
      color: #ffffff;
    }
  }
}
</style>
