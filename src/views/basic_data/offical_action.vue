<!-- 官方活动分类管理(会员) -->
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
          <div class="integral-center">
            <Icon type="ios-arrow-down" />
            <span>收起筛选</span>
          </div>

        </div>
      </div>-->
      <div class="flex-center-start integral-body">
        <div class="flex-center-start name">
          <span>名称:</span>
          <Input size="large" placeholder="活动分类名称" class="inpt" v-model="dicName" />
        </div>
        <div class="flex-center-start name">
          <span>有效状态:</span>
          <Select v-model="validFlag" style="width: 150px;margin-right:10px">
            <Option v-for="item in typelist" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="flex-center-start name">
          <span>创建时间:</span>
          <Row>
            <Col span="12">
              <DatePicker
                type="date"
                placeholder="请选择日期"
                style="width: 200px"
                class="sdate"
                v-model="createTimestamp"
              ></DatePicker>
            </Col>
          </Row>
        </div>
        <Button class="search" @click="query">查询</Button>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-between">
        <div>
          <!-- <span>已选择{{arr.length}}人</span> -->
          <Button class="table-btns" @click="add">新增活动分类</Button>
          <Modal v-model="modal2" :title="text" class-name="vertical-center-modal">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <FormItem label="活动分类" prop="dicNamemod">
                <Input v-model.trim="formValidate.dicNamemod" :maxlength=30 style="width:200px" />
              </FormItem>
              <FormItem label="受益对象" prop="actTypeFlag">
                <Select v-model="formValidate.actTypeFlag" style="width: 200px;margin-right:10px">
                  <Option
                    v-for="item in actTypelist"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.name }}</Option>
                </Select>
              </FormItem>
            </Form>
            <div slot="footer">
              <Button type="text" size="large" @click="canceltwo">取消</Button>
              <Button type="error" size="large" @click="oktwo('formValidate')">确定</Button>
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
import { formatDate } from "@/request/datatime.js";
import {
  Offactivities,
  modifystate,
  Offactivitedel,
  Offactivitemod,
  Offactiviteadd
} from "@/request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "官方活动分类管理(会员)"
      },
      formValidate: {
        dicNamemod: "",
        actTypeFlag: 1
      },
      ruleValidate: {
        dicNamemod: [
          { required: true, message: "活动名称不能为空", trigger: "blur" }
        ],
        actTypeFlag: [
          {
            required: true,
            message: "收益对象不能为空",
            trigger: "change",
            type: "number"
          }
        ]
      },
      // modal1: false,
      modal2: false,
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
          width:300
        },
        {
          title: "受益对象",
          key: "beneficiary",
          width: 240,
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTimestamp",
          width: 240,
          align: "center",
          render: (h, params) => {
            return h("div", formatDate(params.row.createTimestamp));
          }
        },
        {
          title: "创建人",
          key: "userName",
          width: 300,
          align: "center"
        },
        {
          title: "有效状态",
          align: "center",
           width: 240,
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.validFlag == 1
                },
                style: {
                  text: "center"
                },
                on: {
                  input: e => {
                    console.log(e);
                    this.getmodifystate(params.row.dicId, e);
                  }
                }
              })
            ]);
          }
        },
        {
          title: "操作",

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
                      this.text = "编辑活动分类";
                      this.modal2 = true;
                      this.dicId = params.row.dicId;
                      this.formValidate.dicNamemod = params.row.dicName;
                    }
                  }
                },
                "编辑"
              ),
              // h(
              //   "a",
              //   {
              //     style: {
              //       marginRight: "5px",
              //       marginLeft: "5px",
              //       color: "red"
              //     },
              //     on: {
              //       click: () => {
              //         this.getOffactivitedel(params.row.dicId);
              //       }
              //     }
              //   },
              //   "删除"
              // )
            ]);
          }
        }
      ],
      typelist: [
        {
          value: "",
          name: "全部"
        },
        {
          value: "1",
          name: "有效"
        },
        {
          value: "0",
          name: "无效"
        }
      ],
      data: [],
      page: 1,
      size: 10,
      dataCount: 0,

      dicName: "",
      validFlags: "",
      createTimestamp: "",
      // dicNamemod: "",
      validFlag: "",
      typeFlag: "",

      statsdata: "",
      dicId: "",
      arr: [],
      text: "",

      actTypelist: [{ name: "家长", value: 1 }, { name: "孩子", value: 2 }]
    };
  },

  components: {},

  computed: {},

  created() {},
  mounted() {
    this.getOffactivities();
  },

  methods: {
    // -获取官方活动分页
    getOffactivities() {
      if (this.createTimestamp != "") {
        this.statsdata = this.createTimestamp.getTime();
      } else {
        this.statsdata = "";
      }
      Offactivities({
        page: { page: this.page, size: this.size },
        dicName: this.dicName,
        validFlag: this.validFlag,
        createTimestamp: this.statsdata
      }).then(res => {
        if (res.code == 200) {
          this.data = res.data.list;
          this.dataCount = res.data.totalSize;
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //修改模块状态
    getmodifystate(id, e) {
      if (e) {
        this.validFlags = 1;
      } else {
        this.validFlags = 0;
      }
      modifystate({
        dicId: id,
        validFlag: this.validFlags
      }).then(res => {
        if (res.code == 200) {
          // this.getOffactivities();
          this.$Message.info("操作成功");
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //  删除字典信息
    getOffactivitedel(id) {
      Offactivitedel({
        dicId: id
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.getOffactivities();
          this.$Message.info("删除成功");
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    // 修改字典信息
    getOffactivitemod(id) {
      Offactivitemod({
        dicId: this.dicId,
        dicName: this.formValidate.dicNamemod,
        actTypeFlag: this.formValidate.actTypeFlag
      }).then(res => {
        if (res.code == 200) {
          this.getOffactivities();
          this.$Message.info("修改成功");
          this.modal2 = false;
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },
    // 添加字典信息
    getOffactiviteadd() {
      Offactiviteadd({
        userId: this.$store.state.userId,
        typeFlag: 8,
        dicName: this.formValidate.dicNamemod,
        oprUserId: this.$store.state.userId,
        actTypeFlag: this.formValidate.actTypeFlag
      }).then(res => {
        if (res.code == 200) {
          this.modal2 = false;
          this.getOffactivities();
          this.$Message.info("添加成功");
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //修改模态框
    oktwo(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.dicId != "") {
            this.getOffactivitemod();
          } else {
            this.getOffactiviteadd();
          }
        } else {
          this.$Message.error("名称不能为空");
        }
      });
      console.log(this.dicId);
    },
    //取消
    canceltwo() {
      this.modal2 = false;
    },

    //新增
    add() {
      this.formValidate.dicNamemod = "";
      this.text = "新增活动分类";
      this.modal2 = true;
    },

    //分页功能
    changepages(index) {
      this.page = index;
      this.getOffactivities();
    },

    // 查询结果按钮
    query() {
      console.log(this.createTimestamp);
      this.page = 1;
      this.getOffactivities();
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
  margin-right: 20px;
  span {
    display: block;
    min-width: 60px;
  }
}

</style>
