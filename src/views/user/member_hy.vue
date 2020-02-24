<!-- 会费管理(会员) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <Icon type="ios-search-outline" />
          <span>筛选查询</span>
        </div>
        <div class="flex-center-end">
          <div class="integral-rig">
            <Icon type="ios-arrow-down" />
            <span>收起筛选</span>
          </div>
          <Button class="integral-rig">查询结果</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>名称</span>
          <Input size="large" placeholder="名称" class="inpt" />
        </div>
        <div class="flex-center-start">
          <span>有效状态</span>
          <Input size="large" placeholder="全部" class="inpt" />
        </div>
        <div class="flex-center-start">
          <span>创建时间:</span>
          <DatePicker type="date" placeholder="请选择日期" class="inpt" size="large"></DatePicker>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <Checkbox>全选</Checkbox>
          <span>已选择0</span>
          <Button class="table-btn" size="small" @click="modal1 = true">新增</Button>
        </div>
        <Modal v-model="modal1" title="新增会费" width="860px">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
            <FormItem label="会费名称" prop="name">
              <Input v-model="formItem.name" style="width:300px"></Input>
            </FormItem>
            <FormItem label="金额" prop="price">
              <Input v-model="formItem.price" style="width:300px"></Input>
            </FormItem>
            <FormItem label="会费期限" prop="time">
              <Input v-model="formItem.time" style="width:300px"></Input>个月
            </FormItem>
            <FormItem label="会员包" prop="bag">
              <RadioGroup v-model="formValidate.bag">
                <Radio>有</Radio>
                <Radio>无</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="会费详情" prop="detail">
              <div class="editorElem1" style="text-align:left;">
                <p>
                  一、VIP会员权益<br>
                  VIP会员包括以下权利：<br>
                  VIP会员具备竞聘担任本中心各类职务的资格；<br>
                  VIP会员可以参加本中心举办的文化、教育、体育、培训、省际交流、出境出国考察参会等活动，享受VIP会员的优惠待遇和中心给予的奖励。参加每年度的VIP会员交流聚会；<br>
                  VIP会员可以参加本中心开设的各种交流平台，在VIP会员会议和中心家长通讯及相关媒体上，参加关于身心障碍人士及家庭关心问题的讨论，定期得到本中心的资讯、刊物及本会的各种信息；<br>
                  VIP会员具备获得本中心服务的优先权；<br>
                  VIP会员具备对本中心工作的建议权、监督权及各种形式志愿服务的参与权；<br>
                  
                  VIP会员具有组建社区家长小组的资格；<br>
                  VIP会员入会自愿、退会自由,会籍只属于申请VIP会员个人所有
                  其他合法权益。<br>
                  二、会费标准及缴费时间<br>
                  会费每人每年120元。会费统一由北京融爱融乐心智障碍者家庭支持中心进行专项账目管理，账目全部公开。会费需专款专用，只得用于VIP会员的管理支出、入会培训及VIP会员徽章、手册的制作等用途，家长VIP会员负责部门每年按年度工作报经费使用计划并报请理事会（执行团队）。
                  VIP会籍自缴费日期起，有效期为12个月。
                </p>
              </div>
            </FormItem>
          </Form>
        </Modal>
      </div>
      <Table border :columns="columns" :data="data"></Table>
      <div class="pages">
        <Page  :current='page' :total="100" show-elevator show-total size="small" />
      </div>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "editor",
  data() {
    return {
      editorContent1: "",
      formItem: {
        textarea: "",
        radio: "",
        input: ""
      },
      formValidate: {
        name: "2019年会费",
        price: "120",
        time: "2019-01-01",
        bag:'',
        detail: ""
      },
      ruleValidate: {
        name: [
          { required: true, message: "会费名称不能为空", trigger: "blur" }
        ],
        price: [{ required: true, message: "金额不能为空", trigger: "blur" }],
        time: [
          { required: true, message: "会费期限不能为空", trigger: "blur" }
        ],
        bag: [{ required: true, message: "会费包不能为空", trigger: "change" }],
        detail: [
          { required: true, message: "会费详情不能为空", trigger: "change" }
        ]
      },
      modal1: false,
      navigation1: {
        head: "会费管理(会员)"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "会费期限",
          key: "time"
        },
        {
          title: "金额",
          key: "price"
        },
        {
          title: "会员包",
          key: "bag"
        },
        {
          title: "创建时间",
          key: "create"
        },
        {
          title: "有效状态",
          key: "state",
          render: (h, params) => {
            return h("div", [h("div", [h("i-switch")])]);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "green"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ name: "vunintegral_detail" });
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      data: [
        {
          name: "2019年会费",
          time: "12个月",
          price: "120.00",
          bag: "有",
          create: "2019-6-28  15:00"
        },
        {
          name: "2020年会费",
          time: "5个月",
          price: "60.00",
          bag: "有",
          create: "2019-6-28  15:00"
        }
      ]
    };
  },

  components: {},

  computed: {},

  created() {},

  mounted() {
    var editor1 = new E(".editorElem1");
    editor1.customConfig.onchange = html => {
      this.editorContent1 = html;
    };
    editor1.create();
  },
  methods: {}
};
</script>
<style lang="scss">
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  padding: 15px 20px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
}
.integral-header .integral-rig {
  margin-left: 20px;
}
.integral-header .integral-body {
  padding: 20px;
  background: #fff;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 200px;
  margin-left: 15px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 20px;
}
.integral-table {
  margin-top: 30px;
}
.table-header {
  padding: 10px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.table-header .table-btn {
  margin-left: 15px;
}
.integral-table .pages {
  padding: 5px 20px;
  margin-top: 50px;
  background: #fff;
}
.pages {
  margin-top: 1.5rem auto;
  width: 500px;
  height: 30px;
}
</style>