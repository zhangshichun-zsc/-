<!--编辑招募报名项-受益方（会员）-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="compole">
      <p class="compole-head">编辑招募报名项</p>
      <div class="compole-content">
        <ul>
          <li>
            <span>招募类型</span>
            <div>
              <i-select :model.sync="model1" style="width:200px">
                <i-option
                  v-for="(item,index) in cityList"
                  :value="item.value"
                  :key="index"
                >{{ item.label }}</i-option>
              </i-select>
              <i-input :value.sync="value" placeholder="请输入..." style="width: 200px"></i-input>
            </div>
          </li>
          <li>
            <span>岗位职责</span>
            <i-input type="textarea" placeholder="请输入..." style="width: 600px"></i-input>
          </li>
          <li>
            <span>模式</span>
            <Checkbox-group :model.sync="fruit">
              <Checkbox value="先到先得">先到先得</Checkbox>
              <Checkbox value="预约型">预约型</Checkbox>
            </Checkbox-group>
          </li>
          <li>
            <span>票价</span>
            <div class="tables">
              <table>
                <tr>
                  <th>票价</th>
                  <th>VIP价</th>
                  <th>数量</th>
                  <th>可预约数量</th>
                  <th>可获得积分</th>
                  <th>操作</th>
                </tr>
                <tr>
                  <td>
                    <i-input :value.sync="value" placeholder="请输入..." style="width: 90px"></i-input>
                  </td>
                  <td>
                    <i-input :value.sync="value" placeholder="请输入..." style="width: 90px"></i-input>
                  </td>
                  <td>
                    <i-input :value.sync="value" placeholder="请输入..." style="width: 90px"></i-input>
                  </td>
                  <td>
                    <i-input :value.sync="value" placeholder="请输入..." style="width: 90px"></i-input>
                  </td>
                  <td>
                    <i-input :value.sync="value" placeholder="请输入..." style="width: 90px"></i-input>
                  </td>
                  <td>
                    <Icon type="ios-close-circle" />
                  </td>
                </tr>
              </table>
              <div class="audit">
                <span class="audit-span">是否审核</span>
                <i-switch v-model="switch1" @on-change="change" />
                <span>报名后需要我审核</span>
              </div>
            </div>
          </li>
          <li>
            <span>退款设置</span>
            <div class="refund">
              <p>
                支持退款
                <i-switch @on-change="change"></i-switch>
              </p>
              <div class="refund-div">
                <RadioGroup v-model="animal" vertical>
                  <Radio label="金斑蝶">活动结束前均可退款</Radio>
                  <Radio label="爪哇犀牛">
                    活动结束
                    <Input v-model="value" placeholder="Enter something..." style="width: 80px" />天可退款
                  </Radio>
                </RadioGroup>
              </div>
            </div>
          </li>
          <li>
            <span>是否发放补助</span>
            <div class="li-subsidy">
              <RadioGroup v-model="animal">
                <Radio label="爪哇犀牛">是</Radio>
                <Radio label="金斑蝶">否</Radio>
              </RadioGroup>
              <div class="li-subsidys">
                <p>
                  <span>补助类型：</span>
                  <RadioGroup v-model="animal">
                    <Radio label="爪哇犀牛">现金</Radio>
                    <Radio label="金斑蝶">物质</Radio>
                  </RadioGroup>
                </p>
                <p>
                  <span>物资类型：</span>
                  <Input v-model="value" placeholder="Enter something..." style="width: 150px" />
                  <Select v-model="model1" style="width:100px" v-if="subsidys">
                    <Option
                      v-for="item in cityList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                  <Input
                    v-model="value"
                    placeholder="Enter something..."
                    style="width: 100px"
                    v-if="subsidys"
                  />
                </p>
              </div>
            </div>
          </li>
          <li>
            <span>限制设置</span>
            <div class="impose">
              <table>
                <tr>
                  <th>限制项</th>
                  <th>限制项条件</th>
                  <th>操作</th>
                </tr>
                <tr>
                  <td>年龄</td>
                  <td>
                    <Input v-model="value" placeholder="Enter something..." style="width: 70px" />
                    <b>——</b>
                    <Input v-model="value" placeholder="Enter something..." style="width: 70px" />
                  </td>
                  <td>
                    <Icon type="ios-close-circle" />
                  </td>
                </tr>
              </table>
              <div class="impose-text">
                <a>+新增限制条件</a>
              </div>
              <div class="impose-div">
                <span>常用限制项</span>
                <Button>是否爸爸陪同</Button>
                <Button>VIP专属</Button>
                <Button>性别</Button>
              </div>
            </div>
          </li>
          <li>
            <span>优先限制</span>
            <div class="impose">
              <table>
                <tr>
                  <th>优先级别</th>
                  <th>优先项</th>
                  <th>操作</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>VIP优先</td>
                  <td>
                    <Icon type="ios-close-circle" />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>未参加优先</td>
                  <td>
                    <Icon type="ios-close-circle" />
                  </td>
                </tr>
              </table>
              <div class="impose-text">
                <a>+新增优先条件</a>
              </div>
              <div class="impose-div">
                <span>优先规则项</span>
                <Button>隔1次参加</Button>
                <Button>隔2次参加</Button>
                <Button class="takes">参与过往期活动</Button>
                <Button>爸爸陪同</Button>
              </div>
            </div>
          </li>
          <li v-if="others" class="other"><span>是否自动筛选替补人员</span><RadioGroup v-model="animal">
        <Radio label="金斑蝶">是</Radio>
        <Radio label="爪哇犀牛">否</Radio>

    </RadioGroup></li>
          <li v-if="others" class="other"><span>是否发放志愿证书</span><RadioGroup v-model="animal">
        <Radio label="金斑蝶">是</Radio>
        <Radio label="爪哇犀牛">否</Radio>

    </RadioGroup></li>
          <li>
            <span>报名时间</span>
            <Row>
              <Col span="8">
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
            <span>集合时间</span>
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
            <span>集合地址</span>
            <Select v-model="model1" style="width:200px">
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
            <Select v-model="model1" style="width:200px">
              <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </li>
          <li>
            <span>取消时间</span>
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
            <span>报名项设置</span>
            <div class="impose">
              <table>
                <tr>
                  <th>报名项名称</th>
                  <th>是否填写</th>
                  <th>操作</th>
                </tr>
                <tr class="company">
                  <td>公司</td>
                  <td>
                    <Radio v-model="single">必填</Radio>
                  </td>
                  <td>
                    <Icon type="ios-close-circle" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Input v-model="value" placeholder="Enter something..." style="width: 100px" />
                  </td>
                  <td>
                    <Radio v-model="single">必填</Radio>
                  </td>
                  <td>
                    <Icon type="ios-close-circle" />
                  </td>
                </tr>
              </table>
              <div class="apply">
                <RadioGroup v-model="animal">
                  <Radio label="金斑蝶">
                    <Input v-model="value" placeholder="1" style="width: 100px" />
                  </Radio>
                  <Radio label="爪哇犀牛">
                    <Input v-model="value" placeholder="2" style="width: 100px" />
                  </Radio>
                  <Radio label="印度黑羚">
                    <Input v-model="value" placeholder="3" style="width: 100px" />
                  </Radio>
                  <Radio label="印度黑羚">
                    <Input v-model="value" placeholder="4" style="width: 100px" />
                  </Radio>
                </RadioGroup>
                <div class="adds">
                  <a>新增报名项</a>
                </div>
                <div class="apply-btn">
                  <p class="apply-btn-p">
                    <span>常用报名项</span>
                    <Button>用餐人数</Button>
                    <Button>出行方式</Button>
                    <Button>徒步几公里</Button>
                    <Button>备注</Button>
                  </p>
                  <p class="apply-btn-p">
                    <span>自定义报名项</span>
                    <Button>+单行文本</Button>
                    <Button>+多行文本</Button>
                    <Button>+单选题</Button>
                    <Button>+多选题</Button>
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li>
            <span>群二维码</span>
            <div class="imgess">
              <img />
            </div>
          </li>
          <li>
            <span>培训内容</span>
            <i-switch v-model="switch1" @on-change="change" />
            <Radio v-model="single">是否必填</Radio>
          </li>
          <li>
            <span>
              <Button>选择模块</Button>
            </span>
            <Input v-model="value" placeholder="4" style="width: 200px" />
          </li>
          <li>
            <span>培训标题</span>
            <Input v-model="value" placeholder="4" style="width: 200px" />
          </li>
          <li>
            <span>培训图片</span>
            <div class="photo">
              <img />
            </div>
          </li>
          <li>
            <span>培训视频</span>
            <div class="video">
              <img />
            </div>
          </li>
          <li class="rich-text">
            <span>培训详情</span>
            <wangeditor :labels="editor1" id="ed1"></wangeditor>
          </li>
          <li>
            <span>反馈内容</span>
            <i-switch v-model="switch1" @on-change="change" />
            <Radio v-model="single">是否必填</Radio>
          </li>
          <li>
            <span>
              <Button>选择模块</Button>
            </span>
            <Input v-model="value" placeholder="4" style="width: 200px" />
          </li>
          <li>
            <span>反馈标题</span>
            <Input v-model="value" placeholder="4" style="width: 200px" />
          </li>
          <li class="rich-text">
            <span>反馈详情</span>
            <div class="editorElem2" style="text-align:left;"></div>
          </li>
        </ul>
      </div>
      <div class="btns-foot"><Button>取消</Button><Button class="active">保存</Button></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigation1: {
        head: "编辑招募报名项-受益方(会员)"
      },
      animal:'',
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
      model1: "",
      value: "",
      fruit: "先到先得",
      switch1: false,
      animal: "金斑蝶",
      subsidys: false,
      single: false,
      others: true,
      // 富文本editor
      editor1: {
        contents:''
      }
    };
  },
  mounted() {
    var editor1 = new E('.editorElem1');
    var editor2 = new E('.editorElem2');
    editor1.customConfig.onchange = (html) => {
      this.editorContent1 = html
    };
    editor2.customConfig.onchange = (html) => {
      this.editorContent2 = html
    };
    editor1.create()
    editor2.create()
  },
  components: {},

  computed: {},

  created() {},

  methods: {
    change(status) {
      this.$Message.info("开关状态：" + status);
    }
  }
};
</script>
<style lang="scss" scoped>
.compole {
  .compole-head {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    border-bottom: #e4e4e4 1px solid;
  }
  .compole-content {
    padding: 10px 0;
    width: 900px;
    background: #ffffff;
    ul {
      padding-left: 50px;
      li {
        display: flex;
        margin: 20px 0;
        span {
          display: block;
          width: 140px;
          height: 40px;
          // line-height: 40px;
          font-size: 14px;
          // margin: 0 50px;
        }
        .ivu-switch-default {
          width: 45px;
          height: 23px;
          margin-right: 20px;
        }
        .tables {
          table {
            width: 620px;
            th {
              background: #f2f2f2;
              text-align: center;
              height: 45px;
              border-left: #e4e4e4 1px solid;
              line-height: 45px;
              width: 100px;
            }
            td {
              height: 70px;
              background: #ffffff;
              text-align: center;
              line-height: 70px;
            }
          }
        }
        .audit {
          display: flex;
          background: #e4e4e4;
          align-items: center;
          padding-left: 10px;
          span {
            line-height: 40px;
          }
          .audit-span {
            width: 80px;
          }
        }
        .refund {
          p {
            display: flex;
            align-items: flex-start;
          }

          span {
            margin: 0 10px;
            font-size: 14px;
          }
          .refund-div {
            margin-top: 10px;
            border: 1px solid #e4e4e4;
            width: 600px;
            height: 80px;
            padding: 7px;
          }
        }
        .li-subsidy {
          .li-subsidys {
            p {
              display: flex;
              align-items: center;
              span {
                line-height: 40px;
                width: 70px;
              }
            }
          }
        }

        .impose {
          border: #e4e4e4 1px solid;
          table {
            // border-bottom: 0;

            th {
              width: 200px;
              text-align: center;
              font-size: 14px;
              line-height: 40px;
              background: #e4e4e4;
              border: #e4e4e4 1px solid;
            }
            td {
              font-size:14px;
              text-align: center;
              height: 50px;
              line-height: 50px;
            }
          }

          .ivu-radio-default {
            margin: 5px 10px;
          }
        }

        .impose-div {
          display: flex;
          background: #e4e4e4;
          align-items: center;
          justify-content: space-around;
          span {
            text-align: center;
            line-height: 40px;
          }
          button {
            margin: 0px 5px;
            width: 100px;
          }
          .takes {
            width: 120px;
          }
        }

        .impose-text {
          text-align: center;
          height: 40px;
          line-height: 40px;
          border: #e4e4e4 1px solid;
          a {
            color: #339933;
            font-size: 14px;
          }
        }

        .company {
          border-bottom: #e4e4e4 1px solid;
        }

        .imgess {
          height: 150px;
          width: 240px;
          background: #e4e4e4;
        }

        .apply-btn {
          height: 100px;
          background: #e4e4e4;
          .apply-btn-p {
            margin: 10px 0;
            display: flex;
            align-items: center;
            span {
              line-height: 40px;
              text-align: center;
            }
            button {
              margin: 0 10px;
              height: 30px;
            }
          }
        }

        .adds {
          height: 40px;
          text-align: center;
          line-height: 40px;
          border-bottom: #e4e4e4 solid 1px;
          a {
            color: #339933;
          }
        }


       .video,.photo{
          height: 150px;
          width: 300px;
          background: #e4e4e4;
        }
      }

      .rich-text{
        display: flex;
        flex-direction: column;
        span{
          height: 30px;
        }
        .rich-texts{
          height: 240px;
          width: 600px;
          background: #e4e4e4;
          border: #e4e4e4 solid 1px;
        }
      }
    }
  }
  .btns-foot{
    display: flex;
    justify-content: center;
    margin-top: 40px;
    Button{
      margin: 0 10px;
      width: 140px;
    }
    .active{
      background: #339933;
      color: #ffffff;
    }
  }
}
.ivu-select-default{
  margin-right:10px;
}
.other{
  span{
    margin-right:20px;
  }
}
</style>
