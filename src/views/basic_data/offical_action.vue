<!-- 官方活动分类管理(会员) -->
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
          <div class="integral-center">
            <Icon type="ios-arrow-down" />
            <span>收起筛选</span>
          </div>
          <Button @click="query">查询结果</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>名称</span>
          <Input size="large" placeholder="活动分类名称" class="inpt" v-model="dicName" />
        </div>
        <div class="flex-center-start">
          <span>有效状态</span>
          <Select v-model="validFlag" style="width: 150px;margin-right:10px">
            <Option v-for="item in typelist" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="flex-center-start">
          <span>创建时间</span>
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
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          全选
          <span>已选择{{arr.length}}人</span>
          <Button class="table-btn" type="primary" @click="modal2 = true">新增活动分类</Button>
          <!-- <Modal v-model="modal1" title="添加活动分类" @on-ok="ok" @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <FormItem label="活动分类" prop="name">
                <Input v-model="dicNameone"></Input>
              </FormItem>
            </Form>
          </Modal>-->
          <Modal v-model="modal2" title="修改活动分类" @on-ok="oktwo" @on-cancel="canceltwo">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <FormItem label="活动名称" prop="name">
                <Input v-model="dicNamemod" placeholder="环保"></Input>
              </FormItem>
            </Form>
          </Modal>
        </div>
      </div>
      <Table
        ref="selection"
        border
        :columns="columns"
        :data="data"
        @on-selection-change="handleSelectionChange"
      ></Table>

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
import { date1 } from "@/request/datatime.js";
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
        name: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "活动名称不能为空", trigger: "blur" }]
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
          key: "dicName"
        },
        {
          title: "受益对象",
          key: "beneficiary"
        },
        {
          title: "创建时间",
          key: "createtime",
          render: (h, params) => {
            return h("div", date1("Y-m-dH:i:s", params.row.releaseTimestamp));
          }
        },
        {
          title: "创建人",
          key: "userName"
        },
        {
          title: "有效状态",
          key: "status",
          algin: "center",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.validFlag == 1
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
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276"
                  },
                  on: {
                    click: () => {
                      this.modal2 = true;
                      this.dicId = params.row.dicId;
                      this.dicNamemod = params.row.dicName;
                    }
                  }
                },
                "编辑"
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
                      this.getOffactivitedel(params.row.dicId);
                    }
                  }
                },
                "删除"
              )
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
      validFlag: "",
      createTimestamp: "",
      dicNamemod: "",
      validFlag: "",
      typeFlag: "",
      oprUserId: 1,
      statsdata: "",
      dicId: "",
      arr: []
    };
  },

  components: {},

  computed: {},

  created() {
    //  this.getOffactivities();
  },
  mounted() {
    this.getOffactivities();
  },

  methods: {
    // -获取官方活动分页
    getOffactivities() {
      if (this.createTimestamp != "") {
        this.statsdata = this.createTimestamp.getTime();
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
        this.validFlag = 1;
      } else {
        this.validFlag = 0;
      }
      modifystate({
        dicId: id,
        validFlag: this.validFlag
      }).then(res => {
        if (res.code == 200) {
          this.getOffactivities();
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
        dicName: this.dicNamemod
      }).then(res => {
        if (res.code == 200) {
          this.getOffactivities();
          this.$Message.info("修改成功");
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },
    // 添加字典信息
    getOffactiviteadd() {
      Offactiviteadd({
        typeFlag: 8,
        dicName: this.dicNamemod,
        oprUserId: this.oprUserId
      }).then(res => {
        if (res.code == 200) {
          this.getOffactivities();
          this.$Message.info("添加成功");
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //修改模态框
    oktwo() {
      console.log(this.dicId);
      if (this.dicId != "") {
        this.getOffactivitemod();
      } else {
        this.getOffactiviteadd();
      }
    },
    canceltwo() {},

    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getOffactivities();
    },

    // 查询结果按钮
    query() {
      this.getOffactivities();
    },

    //每条数据单选框的状态
    handleSelectionChange(val) {
      this.arr = val;
      console.log(this.arr);
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true;
      } else {
        this.status = false;
      }
      //选择的数据id
      let arr = [];
      for (let i = 0; i < this.arr.length; i++) {
        arr.push(this.arr[i].informationId);
      }
      this.arr = arr.toString();
      console.log(this.arr);
    },

    ok() {
      this.$Message.info("新增成功");
    },
    cancel() {
      this.$Message.info("新增失败");
    }
  }
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
.integral-header .integral-center {
  margin: 0 20px;
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
  padding: 5px 20px;
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
  text-align: center;
}
.ipt {
  margin-left: 10px;
}
.sdate {
  margin-left: 15px;
}
</style>
