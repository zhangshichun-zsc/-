<!-- 志愿者活动分类管理 -->
<template>
  <div>
    <basicdata :navigation1="navigation1" @query="query"></basicdata>
    <div class="integral-table">
      <div class="table-header flex-between">
        <div>
          <!-- <span>已选择{{arr.length}}</span> -->
          <Button class="table-btns" @click="btn">{{title}}</Button>
          <Modal v-model="modal1" :title="text" class-name="vertical-center-modal">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <FormItem label="活动分类" prop="dicName">
                <Input v-model.trim="formValidate.dicName"  :maxlength=30 />
              </FormItem>
            </Form>
            <div slot="footer">
              <Button type="text" size="large" @click="modalCancel">取消</Button>
              <Button type="error" size="large" @click="modalOk('formValidate')" :loading="loading">确定</Button>
            </div>
          </Modal>
        </div>
      </div>
      <div class="min-height">
        <Table ref="selection" border :columns="columns" :data="data"></Table>
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
import { Basicsearch, Basicbatch } from "@/request/api";
import { formatDate } from "@/request/datatime";
import basicdata from "@/components/basicdata";
export default {
  data() {
    return {
      navigation1: {
        head: "志愿者活动分类管理(志愿者)"
      },
      formValidate: {
        dicName: ""
      },
      ruleValidate: {
        dicName: [
          { required: true, message: "志愿者活动名称不能为空", trigger: "blur" }
        ]
      },
      title: "新增活动分类",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "活动分类名称",
          key: "dicName",
          align: "center",
          width:400
        },
        {
          title: "创建时间",
          key: "creatAt",
          width: 240,
          align: "center"
        },
        {
          title: "创建人",
          key: "userName",
          width: 300,
          align: "center"
        },

        {
          title: "有效状态",
          key: "status",
          align: "center",
          width:180,
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  // trueValue:params.row.validFlag == 1
                  value: params.row.validFlag == 1
                },
                on: {
                  input: e => {
                    if (e) {
                      this.dicId = params.row.dicId;
                      this.states = 1;
                      this.getBasicbatch(2);
                    } else {
                      this.dicId = params.row.dicId;
                      this.states = 0;
                      this.getBasicbatch(2);
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
                    color: "red"
                  },
                  on: {
                    click: () => {
                      this.modal1 = true;
                      this.dicId = params.row.dicId;
                      this.text = "编辑活动分类";
                      this.id = 0;
                      this.formValidate.dicName = params.row.dicName;
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
      modal1: false,
      top: [
        {
          name: "名称",
          type: "input",
          value: ""
        },
        {
          name: "有效日期",
          type: "select",
          list: [
            { dataKey: "", dataValue: "全部" },
            { dataKey: "0", dataValue: "无效" },
            { dataKey: "1", dataValue: "有效" }
          ],
          value: ""
        }
      ],

      page: 1,
      size: 10,
      dataCount: 0,
      sysId: 2,
      typeFlag: 7, //每个页面写死
      startAt: "",
      endAt: "",
      validFlag: "",
      params: "",
      dicCode: 0,

      list: [],
      text: "添加活动分类",
      states: "",
      id: 0,
      loading:false,
    };
  },

  components: { basicdata },

  computed: {},

  created() {
    this.getBasicsearch();
  },

  methods: {
    //查询 typeFlag =1，targetName名称，validFlag 有效是1无效是0，startAt开始时间，endAt结束时间sysId=1
    getBasicsearch() {
      let params = {
        page: {
          page: this.page,
          size: this.size
        },
        sysId: this.sysId,
        typeFlag: this.typeFlag,
        targetName: this.targetName,
        validFlag: this.validFlag,
        startAt: this.startAt,
        endAt: this.endAt
      };
      this.params = this.util.remove(params);
      Basicsearch(this.params).then(res => {
        if (res.code == 200) {
          this.data = res.data.list;
          this.dataCount = res.data.totalSize;
          this.dicCode = this.dataCount + 1;
        }
        // console.log(res);
      });
    },

    // 批量操作"list": [{"orgId": "70", "validFlag": "0"}]
    getBasicbatch(e) {
      if (e == 0) {
        this.list = [
          {
            sysId: this.sysId,
            dicName: this.formValidate.dicName,
            userId: this.$store.state.userId,
            validFlag: 1,
            delFlag: 0,
            typeFlag: this.typeFlag,
            dicCode: this.dicCode,
            orgId: 1
          }
        ];
      } else if (e == 1) {
        this.list = [
          {
            dicId: this.dicId,
            dicName: this.formValidate.dicName
          }
        ];
      } else if (e == 2) {
        this.list = [
          {
            dicId: this.dicId,
            validFlag: this.states
          }
        ];
      }
      Basicbatch({ list: this.list }).then(res => {
         //防止重复提交
        setTimeout(() => {
          this.loading = false;
        }, 500);
        if (res.code == 200) {
          this.modal1 = false;
          if (e == 0) {
             this.getBasicsearch();
            this.$Message.info("添加成功");
          } else if (e == 1) {
             this.getBasicsearch();
            this.$Message.info("编辑成功");
          } else if (e == 2) {
            this.$Message.info("操作成功");
          }
        }
        // console.log(res);
      });
    },

    //查询
    query(e) {
      this.data=[]
      this.page = 1;
      this.validFlag = e.validFlag;
      this.targetName = e.dicName;
      this.startAt = e.createTimestamp[0];
      this.endAt = e.createTimestamp[1];
      this.getBasicsearch();
    },

    //取消
    modalCancel() {
      this.modal1 = false;
      this.formValidate.dicName = "";
    },

    //确定
    modalOk(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading=true
          if (this.id == 0) {
            this.getBasicbatch(1);
          } else {
            this.getBasicbatch(0);
          }
        } else {
          this.$Message.error("名称不能为空");
        }
      });
    },

    //弹出框
    btn() {
      this.text = "添加活动分类";
      this.modal1 = true;
      this.id = 1;
      this.formValidate.dicName = "";
    },

    //分页功能
    changepages(index) {
      this.page = index;
      this.getBasicsearch();
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
