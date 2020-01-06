<!-- 项目管理(会员) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <basicdata :navigation1="navigation1" @query="query"></basicdata>
    </div>
    <div class="integral-table">
      <div class="table-header flex-between">
        <div>
          <!-- <span>已选择{{arr.length}}</span> -->
          <!-- <Button class="table-btn">批量删除</Button> -->
          <Button class="table-btns" @click="added">新增项目</Button>
          <Modal v-model="modal1" :title="text" class="mol" class-name="vertical-center-modal">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <FormItem label="项目名称" prop="name">
                <Input v-model.trim="formValidate.name" :maxlength="30" style="width: 220px" />
              </FormItem>
              <FormItem label="总计预算" prop="allBudget">
                <InputNumber
                  :min="0"
                  :max="1000000000"
                  size="large"
                  style="width: 220px"
                  v-model="formValidate.allBudget"
                ></InputNumber>
                <Button >元</Button>
                <!-- <Input v-model.trim="formValidate.allBudget" /> -->
              </FormItem>
              <FormItem label="预算来源" prop="orgId">
                <Select v-model="formValidate.orgId" style="width: 220px">
                  <Option
                    v-for="item in budgetlist"
                    :value="item.orgId"
                    :key="item.orgId"
                  >{{ item.orgName }}</Option>
                </Select>
              </FormItem>
            </Form>
            <div slot="footer">
              <Button type="text" size="large" @click="cancel">取消</Button>
              <Button type="error" size="large" @click="ok"  :loading="loading">确定</Button>
            </div>
          </Modal>
        </div>
      </div>
      <div class="min-height">
        <Table
          ref="selection"
          border
          :columns="columns"
          :data="data"
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
import basicdata from "@/components/basicdata";
import { projectsetlist, projectsetadd, budgetlist } from "@/request/api";
import { formatDate } from "@/request/datatime";
export default {
  data() {
    return {
      navigation1: {
        head: "项目管理(会员)"
      },
      formValidate: {
        name: "",
        allBudget: 0,
        orgId: null
      },
      ruleValidate: {
        name: [
          { required: true, message: "项目名称不能为空", trigger: "blur" }
        ],
        allBudget: [
          {
            required: true,
            message: "总计预算格式不正确",
            trigger: "blur",
            type: "number"
          }
        ],
        orgId: [
          {
            required: true,
            message: "预算来源不能为空",
            trigger: "change",
            type: "number"
          }
        ]
      },
      modal1: false,

      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "项目名称",
          key: "name",
          align: "center",
          width: 300
        },
        {
          title: "总预算/(元)",
          // key: "allBudget",
          align: "center",
          width: 240,
          render:(h,params)=>{
              return h('p',params.row.allBudget.toFixed(2))
            }
        },
        {
          title: "预算来源",
          key: "orgName",
          align: "center",
          width: 400
        },
        {
          title: "创建时间",
          key: "createAt",
          align: "center",
          width: 240
        },
        {
          title: "有效状态",
          key: "status",
          align: "center",
          width: 180,
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.validFlag == 1
                },
                on: {
                  input: e => {
                    // console.log(e);
                    this.categoryId = params.row.categoryId;
                    if (e) {
                      this.validFlags = 1;

                      this.getprojectstate();
                    } else {
                      this.validFlags = 0;
                      this.getprojectstate();
                    }
                  }
                }
              })
            ]);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 180,
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
                      this.getbudgetlist();
                      this.text = "编辑项目";
                      this.formValidate = params.row;
                      this.modal1 = true;
                      this.categoryId = params.row.categoryId;
                    }
                  }
                },
                "编辑"
              )
              // h(
              //   "a",
              //   {
              //     style: {
              //       marginRight: "5px",
              //       marginLeft: "5px",
              //       color: "red"
              //     },
              //     on: {
              //       click: () => {}
              //     }
              //   },
              //   "删除"
              // )
            ]);
          }
        }
      ],
      data: [],
      page: 1,
      size: 10,
      dataCount: 0,
      arr: [],

      validFlag: "",
      sysType: 1,
      targetName: "",
      status: null,

      params: null,
      budgetlist: [],
      typeFlag: 1,
      text: "新增项目",
      validFlags: "",
      loading:false,
    };
  },

  components: { basicdata },

  computed: {},

  created() {},
  mounted() {
    this.getprojectsetlist();
  },
  methods: {
    //基础资料--获取项目分页
    getprojectsetlist() {
      let params = {
        page: { page: this.page, size: this.size },
        targetName: this.targetName,
        startAt: this.startAt,
        endAt: this.endAt,
        validFlag: this.validFlag
      };
      this.params = this.util.remove(params);
      projectsetlist(this.params).then(res => {
        if (res.code == 200) {
          this.data = res.data.list;
          this.dataCount = res.data.totalSize;
        } else {
          this.$Message.error(res.msg);
        }
        // console.log(res);
      });
    },

    //新增 编辑
    getprojectsetadd() {
      let params = [
        {
          categoryId: this.categoryId,
          name: this.formValidate.name,
          typeFlag: this.typeFlag,
          allBudget: this.formValidate.allBudget,
          orgId: this.formValidate.orgId,
          sysId:1,
        }
      ];
      params = this.util.remove(params);
      projectsetadd({ list: params }).then(res => {
         //防止重复提交
        setTimeout(()=> {
          this.loading = false;
        }, 500);
        if (res.code == 200) {
          this.$Message.info(res.msg);
          this.getprojectsetlist();
          this.modal1 = false;
        } else {
          this.$Message.error(res.msg);
        }
        // console.log(res);
      });
    },

    //修改状态
    getprojectstate() {
      let params = [
        {
          categoryId: this.categoryId,
          validFlag: this.validFlags
        }
      ];
      projectsetadd({ list: params }).then(res => {
        if (res.code == 200) {
          this.$Message.info("操作成功");
        }
        // console.log(res);
      });
    },
    //预算列表
    getbudgetlist() {
      budgetlist({}).then(res => {
        if (res.code == 200) {
          this.budgetlist = res.data;
        }
      });
    },
    //新增
    added() {
      this.$refs.formValidate.resetFields();
      this.categoryId = "";
       this.text = "新增项目";
      this.modal1 = true;
      this.getbudgetlist();
    },

    //分页功能
    changepages(index) {
      this.page = index;
      this.getprojectsetlist();
    },

    // 查询结果按钮
    query(e) {
      this.data = [];
      this.targetName = e.dicName;
      this.startAt = e.createTimestamp[0];
      this.endAt = e.createTimestamp[1];
      this.validFlag = e.validFlag;
      this.getprojectsetlist();
    },

    //每条数据单选框的状态
    handleSelectionChange(val) {
      this.arr = val;
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true;
      } else {
        this.status = false;
      }
    },

    clear() {
      this.$refs.formValidate.resetFields();
    },

    ok() {
      this.$refs.formValidate.validate(valid => {
        if (valid) {
           this.loading = true;
          this.getprojectsetadd();
        } else {
          this.$Message.error("必填项未填!");
        }
      });
    },
    cancel() {
      this.modal1 = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
