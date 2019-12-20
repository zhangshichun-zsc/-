<!-- 证书管理（共用） -->
<template>
  <div>
    <div class="integral-header">
      <!-- <Navigation :labels="navigation1"></Navigation> -->
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
      <!-- <div class="flex-center-start integral-body">
        <div class="flex-center-start name">
          <span>名称:</span>
          <Input size="large" placeholder="基金名称" class="inpt" v-model="query.name" />
        </div>
        <div class="flex-center-start name">
          <span>有效状态:</span>
          <Select  class="inpt" v-model="query.validFlag" style="width: 150px;margin-right:10px">
             <Option value="-1">全部</Option>
            <Option value="1">有效</Option>
            <Option value="0">无效</Option>
          </Select>
        </div>
        <div class="flex-center-start name">
          <span>创建时间:</span>
          <Row>
             <DatePicker
              :open="open"
              confirm
              type="daterange"
              @on-change="handleChange"
              @on-ok="successOk">
              <a href="javascript:void(0)" @click="open = true">
                  <Icon type="ios-calendar-outline"></Icon>
                  <template>{{ time }}</template>
              </a>
            </DatePicker>
          </Row>
        </div>
         <Button class="table-btns" @click="queryMet()">查询结果</Button>
      </div>-->
      <basicdata :navigation1="navigation1" @query="queryMet"></basicdata>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <!-- <Button class="table-btn" @click="modal1 = true">{{title}}</Button> -->
          <Modal v-model="modal1" title="修改" @on-cancel="cancel" class-name="vertical-center-modal">
            <Form ref="formValidate" :model="args" :rules="ruleValidate" :label-width="120">
              <FormItem :label="title" prop="name">
                <Input v-model.trim="args.name" />
              </FormItem>
            </Form>
            <div slot="footer">
              <Button  size="large" @click="modalCancel">取消</Button>
              <Button type="error" size="large" @click="update">确定</Button>
            </div>
          </Modal>
        </div>
      </div>
      <div class="min-height">
        <Table ref="selection" border :columns="columns" :data="data1"></Table>
      </div>

      <div class="pages">
        <Page
          :total="sumSize"
          show-elevator
          show-total
          size="small"
          style="margin: auto"
          :page-size="params.size"
          @on-change="changepages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import basicdata from "@/components/basicdata";
import { formatDate } from "../../request/datatime";

import { getCard, updateCard } from "@/request/api";
import { filterNull } from "@/libs/utils";
export default {
  data() {
    return {
      open: false,
      time: "请选择时间段",
      navigation1: {
        head: "证件管理"
      },
      ruleValidate: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      title: "证书管理",
      columns: [
        {
          title: "名称",
          key: "name",
          align: "center",
          width:400,
        },
        {
          title: "创建时间",
          key: "createAt",
          width: 240,
          align: "center"
        },
        {
          title: "创建人",
          key: "userName",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              params.row.userName ? params.row.userName : "系统管理员"
            );
          }
        },
        {
          title: "有效状态",

          align: "center",
          width: 180,
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  trueValue: 1,
                  falseValue: 0,
                  value: ~~params.row.validFlag
                },
                on: {
                  "on-change": e => {
                    this.args.name = params.row.name;
                    this.args.dicId = params.row.dicId;
                    this.args.validFlag = e;
                    this.update();
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
                      this.args.name = params.row.name;
                      this.args.dicId = params.row.dicId;
                      this.args.validFlag = params.row.validFlag;
                      this.modal1 = true;
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      query: {
        name: null,
        validFlag: null,
        startAt: null,
        endAt: null
      },
      params: {
        name: null,
        validFlag: null,
        startAt: null,
        endAt: null,
        page: {
          page: 1,
          size: 10
        }
      },
      data1: [],
      modal1: false,
      sumSize: 10,
      args: {
        name: null,
        dicId: null,
        validFlag: null
      }
    };
  },

  components: { basicdata },

  computed: {},

  created() {
    this.getList();
  },

  methods: {
    getList() {
      getCard(filterNull(this.params)).then(res => {
        if (res.code == 200) {
          this.data1 = res.data.list;
          this.sumSize = res.data.totalSize;
          this.sumPage = res.data.totalNum;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    update() {
      if (!this.args.name) {
        this.$Message.warning("不能为空");
        return;
      }
      updateCard(filterNull(this.args)).then(res => {
        if (res.code == 200) {
          this.$set(this.params.page, "page", 1);
          this.modal1 = false;
          this.getList();
          this.$Message.success("修改成功");
          this.cancel();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
      modalCancel() {
      this.modal1 = false;
    },
    cancel() {
      this.args.name = null;
      this.args.dicId = null;
      this.args.validFlag = null;
    },

    changepages(e) {
      this.params.page = e;
      this.getList();
    },
    queryMet(e) {
      this.query.startAt = e.createTimestamp[0];
      this.query.endAt = e.createTimestamp[1];
      this.query.validFlag = e.validFlag;
      this.query.name = e.dicName;
      this.params = Object.assign(this.params, this.query);
      this.$set(this.params.page, "page", 1);
      this.getList();
    }
  }
};
</script>
<style lang="scss" scoped>
.integral-body {
  padding: 30px 20px 20px 20px;

  display: flex;
  height: 80px;
  background: #ffffff;
  border: 0;
}
.name {
  span {
    display: block;
    width: 80px;
  }
  margin-right: 20px;
}

</style>
