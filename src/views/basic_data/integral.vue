<!-- 积分查询(会员) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <!-- <div class="flex-center-between integral-top">
        <div>
          <Icon type="ios-search-outline" />
          <span>筛选查询</span>
        </div>
        <div class="flex-center-end">

          <div class="integral-rig" @click="Retractbtn">
            <Icon type="ios-arrow-down" v-if="Retract==true" />
            <Icon type="ios-arrow-up" v-if="Retract==false" />
            <span v-if="Retract==true">收起筛选</span>
            <span v-if="Retract==false">启用筛选</span>
          </div>

        </div>
      </div>-->
      <div class="flex-center-start integral-body" v-if="Retract==true">
        <div class="flex-center-start name">
          <span>用户账户:</span>
          <Input size="large" placeholder="请输入用户ID/账号" class="inpt" v-model="userAccount" />
        </div>
        <div class="flex-center-start name">
          <span>用户昵称:</span>
          <Input size="large" placeholder="请输入用户昵称" class="inpt" v-model="nickname" />
        </div>


        <Button class="search" @click="query">查询</Button>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-between">
        <div>
          <Button class="table-btns" @click="set">积分规则设置</Button>
          <Button class="table-btns" @click="sets" v-if="power==1">积分审核</Button>
        </div>

        <div>
          <!-- <Button class="table-btns" @click="exportData">
            导出数据
            <Icon type="md-arrow-dropdown" />
          </Button>-->
          <Select v-model="size" style="width:100px;margin-right:10px" placeholder="显示条数">
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="排序方式" style="width: 100px;" v-model="sort">
            <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <Modal v-model="modal1" title="编辑积分" class-name="vertical-center-modal">
          <Form ref="formItem" :model="formItem" :rules="ruleValidates" :label-width="120">
            <FormItem label="调整积分" prop="addType">
              <RadioGroup v-model="formItem.addType" size="large">
                <Radio label="1">增加</Radio>
                <Radio label="2">减少</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="数值：" prop="addScore">
              <InputNumber
                :min="1"

                size="large"
                v-model="formItem.addScore"
                style="width: 160px;"
                placeholder="请输入大于0的整数"
                @on-change="numbers"
              ></InputNumber>
              <Button type="error">分</Button>
            </FormItem>
            <FormItem label="备注信息：" prop="remark">
              <Input
                v-model="formItem.remark"
                size="large"
                type="textarea"
                :autosize="{minRows: 4,maxRows: 4}"
              />
            </FormItem>
          </Form>
          <div slot="footer">
            <Button type="text" size="large" @click="modalCancel">取消</Button>
            <Button type="error" size="large" @click="modalOk('formItem')">确定</Button>
          </div>
        </Modal>
      </div>
      <div class="min-height">
        <Table
          ref="selection"
          border
          :columns="columns"
          :data="datax"
          @on-selection-change="handleSelectionChange"
        ></Table>
      </div>

      <div class="pages">
        <Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          style="margin: auto"
          :page-size="size"
          @on-change="changepages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  integralpage,
  integralmodify,
  approvalAuditScorePower
} from "../../request/api";
export default {
  data() {
    return {
      formItem: {
        remark: "",
        addType: "1",
        addScore: 1
      },
      formValidate: {
        serve: ""
      },
      ruleValidate: {
        serve: [
          { required: true, message: "服务时长不能为空", trigger: "blur" }
        ]
      },
      ruleValidates: {
        addType: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "change"
          }
        ],
        // \b[1-9]\d{0-2}\b
        // addScore: [
        //   { required: true, message: "必填项不能为空", trigger: "blur" },
        //   {
        //     type: "number",
        //     pattern: /^[1-9]*$/,
        //     message: "输入数字必须大于0",
        //     trigger: "blur"
        //   }
        // ],
         addScore: [
          { required: true, message: "必填项不能为空", trigger: "blur", type: "number",},

        ],
        remark: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur"
          }
        ]
      },
      modal1: false,
      modal2: false,
      navigation1: {
        head: "积分查询(会员)"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户账号",
          key: "userAccount",
          align: "center",
          width: 300
        },
        {
          title: "用户昵称",
          key: "nickName",
          align: "center",
          width: 400
        },
        {
          title: "用户类型",
          key: "userType",
          align: "center",
          width: 230
        },
        {
          title: "可用积分",
          key: "score",
          align: "center",
          width: 180
        },
        {
          title: "是否有待审核积分",
          key: "isAuditScore",
          align: "center",
          width: 260
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 260,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "red"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "integral_detail",
                        query: { userId: params.row.userId }
                      });
                    }
                  }
                },
                "明细"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "red"
                  },
                  on: {
                    click: () => {
                      this.clearinput();
                      this.userIds = params.row.userId;
                    }
                  }
                },
                "修改数值"
              )
            ]);
          }
        }
      ],

      Article: [
        { value: 10, label: 10 },
        { value: 15, label: 15 },
        { value: 20, label: 20 }
      ],
      sorting: [
        { value: "asc", label: "正序" },
        { value: "desc", label: "倒序" }
      ],
      sort: "desc",

      datax: [],
      sysType: 1,
      page: 1,
      size: 10,

      dataCount: 0,
      userAccount: "",
      nickname: "",
      arr: [],
      userIds: "",
      arrs: [],
      operationUserId: 8,
      userIds: "",
      Retract: true,
      num: "",
      sysId: "1,3",
      power: "",

    };
  },

  components: {},

  computed: {},
  mounted() {
    this.getintegralpage();
    this.getapprovalAuditScorePower();
  },

  created() {},

  //  事件监听
  watch: {
    size: "getintegralpage",
    sort: "getintegralpage"
  },
  methods: {
    numbers(e){
      if(e==0){
        this.formItem.addScore=1
      }else{
        this.formItem.addScore=e
      }
      console.log(e)
    },
    //积分管理--积分分页
    getintegralpage() {
      integralpage({
        page: {
          page: this.page,
          size: this.size,
          sort: "createAt" + " " + this.sort
        },
        sysType: this.sysType,
        userAccount: this.userAccount,
        nickname: this.nickname
      }).then(res => {
        if (res.code == 200) {
          this.dataCount = res.data.totalSize;
          this.datax = res.data.list;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },

    //审核权限
    getapprovalAuditScorePower() {
      approvalAuditScorePower({
        userId: this.$store.state.userId,
        sysId: this.sysId
      }).then(res => {
        this.power = res.data.power;
        console.log(res);
      });
    },

    //修改积分
    getintegralmodify() {
      integralmodify({
        userIds: this.userIds,
        sysType: this.sysType,
        addScore: this.formItem.addScore,
        addType: this.formItem.addType,
        remark: this.formItem.remark,
        operationUserId: this.$store.state.userId
      }).then(res => {
        if (res.code == 200) {
          this.modal1 = false;
          this.getintegralpage();
          this.$Message.info(res.msg);
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getintegralpage();
    },

    //选择内容
    handleSelectionChange(val) {
      this.arrs = val;
      this.arr = val
        .map(item => {
          return item.userId;
        })
        .toString();
      console.log(this.arr);
    },

    //收起筛选
    Retractbtn() {
      this.Retract = !this.Retract;
      console.log(11);
    },

    // //批量修改
    // modify() {
    //   console.log(this.arr);
    //   if (this.arr.length == 0) {
    //     this.$Message.error("至少选择一个！");
    //   } else {
    //     this.clearinput();
    //     this.userIds = this.arr;
    //   }
    // },

    clearinput() {
      this.formItem.remark = "";
      this.formItem.addScore = 1;
      // this.formItem.addScore2 = 0;
      this.modal1 = true;
    },

    //搜索结果
    query() {
      this.page = 1;
      this.getintegralpage();
    },

    //模态框
    modalOk(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getintegralmodify();
        } else {
          this.$Message.error("必填项未填");
        }
      });
    },

    modalCancel() {
      this.modal1 = false;
    },

    // //模态框
    // modalOk2(name) {
    //   console.log(11);
    //   this.$refs[name].validate(valid => {
    //     if (valid) {
    //       this.modal2 = false;
    //       this.$Message.success("修改成功");
    //     } else {
    //       this.$Message.error("必填项未填");
    //     }
    //   });
    // },
    // modalCancel2() {
    //   this.modal2 = false;
    // },

    set() {
      this.$router.push({
        name: "integral_set"
      });
    },
    sets() {
      this.$router.push({
        name: "integral_audit"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.integral-body {
  margin-bottom: 20px;
  padding-left: 20px;
  border-radius: 10px;
  display: flex;
  height: 90px;
  background: #ffffff;
  border: 0;
}
.name {
  span {
    display: block;
    min-width: 80px;
  }
  .inpt {
    margin-right: 30px;
  }
}
</style>
