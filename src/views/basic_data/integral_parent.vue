<!-- 家长职业类型管理(会员) -->
<template>
  <div>
    <basicdata :navigation1="navigation1" @query="query"></basicdata>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <!-- <span>已选择{{arr.length}}</span> -->
          <Button class="table-btns" @click="btn">新增类型</Button>
          <Modal v-model="modal1" :title="text">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <FormItem :label="title" prop="dicName">
                <Input v-model="formValidate.dicName" width="200px"/>
              </FormItem>
            </Form>
            <div slot="footer">
              <Button type="text" size="large" @click="modalCancel">取消</Button>
              <Button type="error" size="large" @click="modalOk('formValidate')">确定</Button>
            </div>
          </Modal>
        </div>
      </div>
      <div class="min-height">
        <Table ref="selection"  :columns="columns" :data="data1" border></Table>
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
        head: "家长职业类型管理(会员)"
      },
      formValidate: {
        dicName: ""
      },
      ruleValidate: {
        dicName: [
          { required: true, message: "职业名称不能为空", trigger: "blur" }
        ]
      },
      title: "家长职业类型管理",
      columns: [
        {
          type: "selection",
          width: 60,
          resizable: true,
          align: "center"
        },
        {
          title: "职业名称",
          key: "dicName",
          align: "center",
          resizable: true,
          width: 400
        },
        {
          title: "创建时间",
          key: "creatAt",
          align: "center",
          resizable: true,
          width: 240
        },
        {
          title: "创建人",
          key: "userName",
          align: "center",
          resizable: true,
          width: 300
        },
        {
          title: "有效状态",
          key: "status",
          align: "center",
          resizable: true,
          width: 180,
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
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
          resizable: true,
          width:180,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276",
                    align: "center"
                  },
                  on: {
                    click: () => {
                      this.modal1 = true;
                      this.dicId = params.row.dicId;
                      this.text = "编辑新增家长职业类型管理";
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
      data1: [],
      modal1: false,

      page: 1,
      size: 10,
      dataCount: 0,
      sysId: 1,
      typeFlag: 1, //每个页面写死
      startAt: "",
      endAt: "",
      validFlag: "",
      params: "",
      dicCode: 0,

      list: [],
      text: "新增家长职业类型管理",
      states: "",
      id: 0
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
          this.data1 = res.data.list;
          this.dataCount = res.data.totalSize;
          this.dicCode = this.dataCount + 1;
        }
        console.log(res);
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
        if (res.code == 200) {
          if (e == 0) {
            this.$Message.info("添加成功");
          } else if (e == 1) {
            this.$Message.info("编辑成功");
          } else if (e == 2) {
            this.$Message.info("操作成功");
          }
          this.getBasicsearch();
          this.modal1 = false;
        }
        console.log(res);
      });
    },

    //查询
    query(e) {
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
          if (this.id == 0) {
            this.getBasicbatch(1);
          } else {
            this.getBasicbatch(0);
          }
        } else {
          this.$Message.error("名称不能为空!");
        }
      });
    },

    //弹出框
    btn() {
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
@import "../../libs/basicdata.css";


</style>
