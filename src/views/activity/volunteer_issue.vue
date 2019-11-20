<!--志愿者活动发布（志愿者）-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <p class="content-head">
        <span>活动发布</span>
        <Button @click="apply">设置常用报名项</Button>
      </p>
      <div class="publish-content">
        <div class="active-publish">
          <ul>
            <li>
              <span>活动名称</span>
              <Input v-model="value" placeholder="Enter something..." style="width: 200px" />
            </li>
            <li class="start">
              <span>活动图片</span>
              <img class="imgs" />
            </li>
            <li>
              <span>活动归属团队</span>
              <Select v-model="model1" style="width:200px">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </li>
            <li>
              <span>活动时间</span>
              <Row>
                <Col span="12">
                  <DatePicker
                    type="daterange"
                    placement="bottom-end"
                    placeholder="Select date"
                    style="width: 200px"
                  ></DatePicker>
                </Col>
              </Row>
            </li>
            <li>
              <span>招募时间</span>
              <Row>
                <Col span="12">
                  <DatePicker
                    type="daterange"
                    placement="bottom-end"
                    placeholder="Select date"
                    style="width: 200px"
                  ></DatePicker>
                </Col>
              </Row>
            </li>
            <li>
              <span>活动地址</span>
              <Select v-model="model1" style="width:200px">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
              <Select v-model="model1" style="width:200px" class="select">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
              <Select v-model="model1" style="width:200px">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </li>
            <li>
              <span>现场联系人</span>
              <span class="names">姓名</span>
              <Input v-model="value" placeholder="Enter something..." style="width: 200px" />
              <span class="phone">联系方式</span>
              <Input v-model="value" placeholder="Enter something..." style="width: 200px" />
            </li>
            <li class="jobs">
              <span>招募岗位</span>
              <p>
                <span>志愿者-摄影岗位</span>
                <span>10人</span>
                <span>
                  详情
                  <Icon type="md-close-circle" />
                </span>
              </p>
            </li>
            <li>
              <p class="adds">
                <a>+新增招募角色</a>
              </p>
            </li>
            <li>
              <span>是否交保险</span>
              <RadioGroup v-model="animal">
                <Radio label="金斑蝶">是</Radio>
                <Radio label="爪哇犀牛">否</Radio>
              </RadioGroup>
            </li>
            <li>
              <span>是否允许空降</span>
              <RadioGroup v-model="animal">
                <Radio label="金斑蝶">是</Radio>
                <Radio label="爪哇犀牛">否</Radio>
              </RadioGroup>
            </li>
            <li>
              <span>是否发放证书</span>
              <RadioGroup v-model="animal">
                <Radio label="金斑蝶">是</Radio>
                <Radio label="爪哇犀牛">否</Radio>
              </RadioGroup>
            </li>
            <li>
              <span>是否显示主办方小站</span>
              <RadioGroup v-model="animal">
                <Radio label="金斑蝶">是</Radio>
                <Radio label="爪哇犀牛">否</Radio>
              </RadioGroup>
            </li>
            <li>
              <span>活动分类</span>
              <Select v-model="model1" style="width:200px">
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </li>
            <li class="active-cost">
              <span>活动费用</span>
              <div class="cost">
                <Input v-model="value" placeholder="Enter something..." style="width: 200px" />
                <p>此活动费用仅供参考，无需缴费</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="active-details">
        <p class="active-text">
          <span>活动详情</span>
        </p>
        <div class="active-pud">
          <div class="active-list">
            <ul>
              <li>
                <span class="active-span">培训内容</span>
                <i-switch v-model="switch1" @on-change="change" />
              </li>
              <li>
                <span class="active-span">培训标题</span>
                <Input v-model="value" placeholder="Enter something..." style="width: 200px" />
              </li>
              <li class="starts-img">
                <span class="active-span">培训图片</span>
                <img class="imgs" />
              </li>
              <li>
                <span class="active-span">培训详情</span>
                <wangeditor :labels="editor1" id="ed1"></wangeditor>
              </li>
              <li>
                <span class="active-span">反馈内容</span>
                <i-switch v-model="switch1" @on-change="change" />
              </li>
              <li>
                <span class="active-span">反馈标题</span>
                <Input v-model="value" placeholder="Enter something..." style="width: 200px" />
              </li>
              <li>
                <span class="active-span">受益群体人数</span>
                <Input v-model="value" placeholder="Enter something..." style="width: 200px" />
              </li>
            </ul>
            <p class="active-adds">
              <a>+添加</a>
            </p>
            <p class="active-adds">
              <Radio v-model="single">
                我同意
                <a @click="rule()">《活动发布规则》</a>
              </Radio>
            </p>
          </div>
          <div class="btns">
            <Button>存为草稿</Button>
            <Button type="success" disabled>提交申请</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                editor1:{
                    contents:''
                },
                navigation1: {
                    head: "志愿者活动发布(志愿者)"
                },
                cityList: [
                    {
                        value: "New York",
                        label: "New York"
                    },
                    {
                        value: "London",
                        label: "London"
                    }
                ],
                model1: "",
                value: "",
                animal: "",
                switch1: false,
                single: true
            };
        },

        components: {},

        computed: {},

        created() {},

        methods: {
            change(status) {
                this.$Message.info("开关状态：" + status);
            },
            rule() {
                this.$router.push({ name: "rule_text" });
            },
            apply(){
                this.$router.push({name:'volunteer_apply'})
            }
        },
        mounted(){}
    };
</script>
<style lang="scss" scoped>
  .content {
    .content-head {
      height: 50px;
      background: #e4e4e4;
      line-height: 50px;
      span {
        margin: 0 10px;
      }
      button {
        border: 1px solid black;
        margin-left: 10px;
      }
    }
    //活动发布内容
    .publish-content {
      background: #ffffff;
      width: 900px;
      .active-publish {
        padding: 30px 0;
        ul {
          padding-left: 70px;
          li {
            margin: 20px;
            display: flex;
            align-items: center;
            span {
              display: inline-block;
              width: 130px;
              height: 40px;
              font-size: 14px;
              line-height: 40px;
            }
            p {
              text-align: center;
              display: flex;
              justify-content: space-around;
            }
            .imgs {
              height: 150px;
              width: 300px;
              background: #e4e4e4;
            }
            .phone {
              width: 60px;
              margin-left: 20px;
            }
            .names {
              width: 35px;
            }

            .select {
              margin: 0 15px;
            }
            .ivu-radio-default {
              margin-right: 30px;
            }

            .adds {
              width: 600px;
              text-align: center;
              a {
                color: green;
                font-size: 14px;
              }
            }

          }
          .active-cost{
            display: flex;
            align-items: flex-start;
            .cost{
              p{
                margin-top: 5px;
                font-size: 12px;
              }

            }
          }

          .start {
            display: flex;
            // justify-content: flex-end;
            align-items: flex-start;
          }

          .jobs {
            flex-direction: column;
            // justify-content: flex-start;
            align-items: flex-start;
            p {
              width: 600px;
              border: #e4e4e4 1px solid;
              .ivu-icon-md-close-circle {
                margin-left: 10px;
              }
            }
          }
        }
      }
    }

    // 活动详情
    .active-details {
      padding: 30px 0;
      background: #ffffff;
      width: 900px;
      .active-text {
        height: 40px;
        line-height: 40px;
        span {
          display: inline-block;
          width: 120px;
          height: 40px;
          background: #008e40;
          color: #ffffff;
          text-align: center;
          line-height: 40px;
        }
      }
      .rich-text {
        height: 300px;
        width: 700px;
        margin: 30px 40px;
        border: #e4e4e4 1px solid;
      }
      .active-list {
        padding-left: 70px;
        ul {
          li {
            .active-span {
              display: inline-block;
              width: 130px;
              height: 40px;
              line-height: 40px;
              font-size: 14px;
              margin: 10px 0;
            }
            .rich-texts {
              height: 140px;
              width: 700px;
              border: #e4e4e4 solid 1px;
            }
          }
          .starts-img {
            display: flex;
            span {
              line-height: 0;
            }
            .imgs {
              width: 240px;
              height: 160px;
              background: #e4e4e4;
            }
          }
        }
        .active-adds {
          text-align: center;
          margin: 30px 0;
          a {
            color: #008e40;
          }
        }
      }

      .btns {
        display: flex;
        justify-content: center;
        margin: 40px 0;
        button {
          width: 140px;
          height: 40px;
          margin: 0 40px;
        }
      }
    }
  }
</style>
