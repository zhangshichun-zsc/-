<!--维护活动模板(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <p class="content-activity">活动模板</p>
      <div class="select">
        <span class="select-template">所选项目</span>
        <Input  style="width:300px" value="快乐活动营">
        </Input>
      </div>
      <div class="select">
        <span class="select-template">活动分类</span>
        <Input  style="width:300px" value="篮球">
        </Input>
      </div>
      <div class="activitives">
        <p class="activitives-top">
          <span>活动内容</span>
        </p>
        <div class="main1">
          <ul>
            <li>
              <span class="same_style">活动主题</span>
              <span>篮球活动</span>
            </li>
            <li class="imges">
              <span class="same_style">主题图片</span>
              <div class="imgs">
                <img src alt />
              </div>
            </li>
            <li>
              <span class="same_style">活动时间</span>
              <i-col span="12">
                <Date-picker
                  type="daterange"
                  placement="bottom-end"
                  placeholder="选择日期"
                  style="width: 200px"
                ></Date-picker>
              </i-col>
            </li>
            <li>
              <span class="same_style">活动地址</span>
              <Select v-model="model1" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Select v-model="model1" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Select v-model="model1" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </li>
            <li>
              <span class="same_style">出行方式</span>
              <RadioGroup v-model="animal">
                <Radio label="daba">大巴</Radio>
                <Radio label="zijia">自驾</Radio>
                <Radio label="ziding">自定义</Radio>
              </RadioGroup>
            </li>
            <li class="linkman">
              <p>
                <span class="same_style style-no">现场联系人</span>
              </p>
              <div class="staff">
                <p>
                  <span class="same-staff">工作人员</span>
                  <span class="relation">姓名</span>
                  <i-input
                    :value.sync="value"
                    placeholder="请输入..."
                    style="width: 200px"
                    class="same-staff"
                  ></i-input>
                  <span class="relation">联系方式</span>
                  <i-input
                    :value.sync="value"
                    placeholder="请输入..."
                    style="width: 200px"
                    class="same-staff"
                  ></i-input>
                </p>
                <p>
                  <span class="same-staff">现场负责人</span>
                  <span class="relation">姓名</span>
                  <i-input
                    :value.sync="value"
                    placeholder="请输入..."
                    style="width: 200px"
                    class="same-staff"
                  ></i-input>
                  <span class="relation">联系方式</span>
                  <i-input
                    :value.sync="value"
                    placeholder="请输入..."
                    style="width: 200px"
                    class="same-staff"
                  ></i-input>
                </p>
              </div>
            </li>
            <li class="imges">
              <span class="same_style">群二维码</span>
              <div class="imgs">
                <img src />
              </div>
            </li>
            <li>
              <span class="same_style">活动标签</span>
              <Select v-model="model1" style="width:300px">
                <Option v-for="item in drill3" :value="item.value" :key="item.value" label="快乐活动营">{{ item.label }}</Option>
              </Select>
            </li>
          </ul>
        </div>
      </div>
      <div class="details">
        <p class="details-head">
          <span>活动详情</span>
        </p>
        <wangeditor :labels="editor1" id="ed1"></wangeditor>
      </div>
      <div class="recruit">
        <p class="recruit-head">
          <span>招募角色</span>
        </p>
        <div class="recruitment">
          <p>
            <span>会员</span>
            <span>20人</span>
            <span>详情<Icon type="md-close-circle" /></span>

          </p>
          <p>
            <span>志愿者</span>
            <span>10人</span>
            <span>详情<Icon type="md-close-circle" /></span>
          </p>
          <h2 class="added">
            <a @click="jump()">+新增招募角色</a>
          </h2>
        </div>
      </div>
      <div class="material">
        <p class="material-head">
          <span>所需物质</span>
        </p>
        <div class="recruitment">
          <p>
            <span>场地</span>
            <span>丰台篮球体育场</span>
            <span>
              <Radio :checked.sync="single">已筹</Radio>
              <Icon type="md-close-circle" />
            </span>
          </p>
          <p>
            <span>志愿者</span>
            <span>30人</span>
            <span>
              <Radio :checked.sync="single">已筹</Radio>
              <Icon type="md-close-circle" />
            </span>
          </p>
          <h2 class="added" v-if="addbtns">
            <a @click="addbtn()">+新增物资</a>
          </h2>
          <p v-if="adds">
            <i-input :value.sync="value" placeholder="请输入物资" style="width: 100px"></i-input>
            <i-input :value.sync="value" placeholder="请输入数量" style="width: 100px"></i-input>
            <span>
              <Radio :checked.sync="single">已筹</Radio>
              <Icon type="md-close-circle" @click="close()"/>
            </span>
          </p>
        </div>
      </div>
      <div class="issue">
        <span>发布时间</span>
        <RadioGroup v-model="animal">
          <Radio label="daba">活动开始前一个月自动发布</Radio>

          <Radio label="ziding" class="self">自定义</Radio>
        </RadioGroup>
        <i-col span="12">
          <Date-picker type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
        </i-col>
      </div>
      <div class="button-food">
        <i-button @click="template">保存</i-button>
        <i-button @click="template">作废</i-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigation1: {
        head: "维护活动模板(会员)"
      },
      drill1: [
        {
          value: "basketball",
          label: "篮球训练"
        },
        {
          value: "mountaineering",
          label: "登山"
        }
      ],
      drill2: [
        {
          value: "basketball",
          label: "篮球训练"
        },
        {
          value: "mountaineering",
          label: "登山"
        }
      ],
      drill3: [
        {
          value: "happy",
          label: "快乐活动营"
        },
        {
          value: "foot",
          label: "奥森徒步"
        },
        {
          value: "summer",
          label: "夏令营"
        }
      ],
      model1: "basketball",
      cityList: [
        {
          value: "beijing",
          label: "北京市"
        },
        {
          value: "shanghai",
          label: "上海市"
        },
        {
          value: "shenzhen",
          label: "深圳市"
        },
        {
          value: "hangzhou",
          label: "杭州市"
        },
        {
          value: "nanjing",
          label: "南京市"
        },
        {
          value: "chongqing",
          label: "重庆市"
        }
      ],

      animal: "daba",
      value: "",
      // 富文本富文本editor
      editor1: {
          contents:''
      },
      single: "",
      adds: false,
      addbtns: true
    };
  },

  components: {  },

  computed: {},

  created() {},

  mounted() {},
  methods: {
    addbtn() {
      this.adds = !this.adds;
      this.addbtns = !this.addbtns;
    },
    close() {
      this.adds = false;
      this.addbtns = true;
    },
    jump() {
      this.$router.push({name:'compile_beneficiary'})
    },
    template(){
        this.$router.push({name:'template'})
    }
  }
}
</script>
<style lang="scss" scoped>
.head {
  margin-bottom: 0px;
}
.content {
  background: #f3f3f3;
  border-top: #e4e4e4 solid 1px;
  margin-top: 20px;
  .content-activity {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
  }
  .select {
    display: flex;
    background: #ffffff;
    height: 40px;
    align-items: center;
    .select-template {
      margin: 0 50px;
    }
  }
  .activitives {
    background: #ffffff;
    margin-bottom: 40px;
    // height: 900px;
    .activitives-top {
      height: 40px;
      margin-top: 40px;
      background: #ffffff;
      span {
        width: 140px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: #008e40;
        color: #ffffff;
        font-size: 14px;
        display: inline-block;
      }
    }
  }
  .main1 {
    padding: 0 50px;
    background: #ffffff;
    ul {
      padding: 20px 0;
      li {
        margin-bottom: 20px;
        // height: 40px;
        display: flex;
        align-items: center;
        .same_style {
          margin-right: 70px;
        }
        .style-no {
          margin-right: 55px;
        }
        .imgs {
          width: 400px;
          height: 200px;
          background: #797979;
        }
      }
      .imges {
        align-items: flex-start;
      }
      .linkman {
        display: flex;
        height: 80px;
        align-items: flex-start;
      }
      .staff {
        p {
          margin-bottom: 20px;
          .same-staff {
            margin-right: 20px;
          }
          .relation {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
.details,
.recruit,
.material {
  background: #ffffff;
  margin-bottom: 40px;
  .details-head,
  .recruit-head,
  .material-head {
    height: 40px;
    background: #ffffff;
    span {
      width: 140px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: #008e40;
      color: #ffffff;
      font-size: 14px;
      display: inline-block;
    }
  }
  .recruitment {
    padding: 5px 50px;
    // height: 160px;
    p {
      padding: 0 50px;
      height: 40px;
      width: 700px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #e4e4e4;
      margin: 20px 0;
      line-height: 40px;
      .ivu-input-default {
        border: 0;
      }
    }
    h2,
    .added {
      text-align: center !important;
      height: 40px;
      line-height: 40px;
      border: 0;
      width: 700px;
      a {
        color: #008e40;
      }
    }
  }
  .ivu-icon-md-close-circle{
    font-size: 16px;
    color: #e4e4e4;
    margin-left: 10px;
  }
}
.issue {
  display: flex;
  align-items: center;
  justify-content:flex-start;
  font-size: 14px;
  background: #ffffff;
  height: 50px;
  padding-left: 50px;
  span{
    margin-right: 50px;
  }
  .self{
    margin-left: 100px;
  }
}
.button-food {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  .ivu-btn-default {
    height: 40px;
    width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: #ffffff;
    border: 1px solid #797979;
    margin-right: 10px;
    // color: #f3f3f3;/
  }
}

.ivu-select-default{
  margin-right: 10px;
}
</style>
