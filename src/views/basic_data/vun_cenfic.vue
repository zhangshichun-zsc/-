<!-- 证书管理(志愿者) -->
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
        <div class="flex-center-start">
          <span>组织:</span>
          <Input size="large" placeholder="请输入" class="inpt" v-model="args.orgName" />
        </div>
        <div class="flex-center-start">
          <span>创建时间/时间段:</span>
          <DatePicker
            class="inpt"
            style="width: 180px"
            type="date"
            @on-change="startTimeChange"
            placeholder="请选择开始时间"
            v-model="args.startAt"
          ></DatePicker>
          <span class="po">~</span>
          <DatePicker
            style="width: 180px"
            type="date"
            @on-change="endTimeChange"
            placeholder="请选择结束时间"
            v-model="args.endAt"
          ></DatePicker>
        </div>
        <!-- <div class="flex-center-start">
          <span>创建时间:</span>
          <Row>
            <DatePicker
              :open="open"
              confirm
              type="daterange"
              @on-change="handleChange"
              @on-ok="successOk"
            >
              <a href="javascript:void(0)" @click="open = true">
                <Icon type="ios-calendar-outline"></Icon>
                <template>{{ time }}</template>
              </a>
            </DatePicker>
          </Row>
        </div>-->
        <div class="flex-center-end">
          <Button class="search" @click="query()">查询</Button>
          <Modal v-model="modal1" title="新增证书模板" @on-cancel="cancel">
            <Form ref="formValidate" :model="params" :rules="ruleValidate" :label-width="120">
              <FormItem label="组织" prop="orgId">
                <Select v-model="params.orgId">
                  <Option
                    :value="item.orgId"
                    v-for="(item,index) in volun"
                    :key="index"
                  >{{ item.orgName }}</Option>
                </Select>
              </FormItem>
              <FormItem label="模板名称" prop="title">
                <Input v-model="params.title" />
              </FormItem>
              <FormItem label="生效日期" prop="effectiveAt">
                <Date-picker
                  placement="bottom-end"
                  placeholder="选择日期"
                  style="width: 200px"
                  type="datetime"
                  v-model="params.effectiveAt"
                  @on-change="changeDate"
                  :options="options"
                ></Date-picker>
              </FormItem>
            </Form>
            <div slot="footer">
              <Button type="error" size="large" @click="success">确定</Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-between">
        <div class="flex-center-start">
         <Button class="table-btns" @click="modal1 = true">新增模板</Button>
        </div>
        <div class="flex-center-end">
          <Select class="inpt" style="width:100px;margin-right:10px" placeholder="显示条数" @on-change="changeNum">
            <Option :value="item" v-for="(item,index) in numList" :key="index">{{ item }}</Option>
          </Select>
          <Select class="inpt" style="width:100px" placeholder="排序方式" @on-change="changeSort">
            <Option value="create_at desc">升序</Option>
            <Option value="create_at asc">降序</Option>
          </Select>
        </div>
      </div>

      <div class="min-height">
        <Table border :columns="columns" :data="data"></Table>
      </div>
      <div class="pages">
        <Page :total="sumSize" show-elevator @on-change="changePage" :page-size="size" />
      </div>
    </div>
  </div>
</template>

<script>
import { getBooks, getVolunteer, updateBooks } from "@/request/api";
import { filterNull } from "@/libs/utils";
export default {
  data() {
    return {
      open: false,
      time: "请选择时间段",
      navigation1: {
        head: "证书管理(会员)"
      },
      params: {
        orgId: "",
        title: "",
        effectiveAt: "",
        orgType: 1,
        sysId: 1
      },
      ruleValidate: {
        orgId: [
          {
            required: true,
            message: "组织不能为空",
            trigger: "change",
            type: "number",
            min: 0
          }
        ],
        title: [
          { required: true, message: "模板名称不能为空", trigger: "blur" }
        ],
        effectiveAt: [
          { required: true, message: "有效日期不能为空", trigger: "change" }
        ]
      },
      modal1: false,
      columns: [
        {
          title: "组织",
          key: "orgName",
          width: 300,
          align: "center"
        },
        {
          title: "证书名称",
          key: "title",
          width: 300,
          align: "center"
        },
        {
          title: "生效时间",
          key: "effectiveAt",
          width: 140,
          align: "center"
        },
        {
          title: "失效时间",
          key: "inEffectiveAt",
          width: 140,
          align: "center"
        },
        {
          title: "创建时间",
          key: "createAt",
          width: 180,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width:180,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276",
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let ob = params.row;
                      this.$router.push({
                        name: "vun_prend.vue",
                        query: { certMouldId: ob.certMouldId, show: false }
                      });
                    }
                  }
                },
                "预览"
              ),
              params.row.isEdit == 1
                ? h(
                    "a",
                    {
                      clssName: "action",
                      style: {
                        color: "#097276"
                      },
                      on: {
                        click: () => {
                          let ob = params.row;
                          this.$router.push({
                            name: "vun_prend.vue",
                            query: { certMouldId: ob.certMouldId, show: true }
                          });
                        }
                      }
                    },
                    "编辑"
                  )
                : ""
            ]);
          }
        }
      ],
      data: [],
      page: 1,
      size: 10,
      sort: "create_at desc",
      sumSize: 10,
      args: {
        startAt: null,
        endAt: null,
        orgName: null
      },
      volun: [],
      numList: [10, 15, 20],

      options: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      }
    };
  },

  components: {},

  computed: {},

  created() {
    this.getList({});
    this.getVoteer();
  },

  methods: {
    getList({ startAt, endAt, orgName }) {
      getBooks(
        filterNull({
          page: { page: this.page, size: this.size, sort: this.sort },
          startAt,
          endAt,
          orgName,
          sysType: "2,3"
        })
      ).then(res => {
        if (res.code == 200) {
          this.sumSize = res.data.totalSize;
          this.data = res.data.list;
          this.page = res.data.pageNum;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    getVoteer() {
      getVolunteer({}).then(res => {
        this.volun = res.data;
      });
    },

    query() {
      if (this.args.startAt && this.args.endAt) {
        if (this.args.startAt < this.args.endAt) {
          this.args.startAt = this.args.startAt + " 00:00:00";
          this.args.endAt = this.args.endAt + " 23:59:59";

        } else {
           this.args.startAt=''
          this.args.endAt=''
          this.$Message.error('时间选择错误请重新选择')
        }

      }
      this.page = 1;
      this.getList(this.args);
    },

    // successOk() {
    //   if (!this.args.startAt && !this.args.endAt) {
    //     this.time = "请选择时间段";
    //   }
    //   this.open = false;
    // },
    startTimeChange(e) {
      this.args.startAt = e;
    },

    endTimeChange(e) {
      this.args.endAt = e;
    },
    // handleChange(e) {
    //   let start = e[0];
    //   let end = e[1];
    //   this.time = e[0] + "-" + e[1];
    //   if (start && end) {
    //     if (start === end) {
    //       start = start + " 00:00:00";
    //       end = end + " 23:59:59";
    //     } else {
    //       start = start + " 00:00:00";
    //       end = end + " 00:00:00";
    //     }
    //   }
    //   this.args.startAt = start;
    //   this.args.endAt = end;
    // },

    changePage(e) {
      this.page = e;
      this.getList(this.args);
    },
    success() {
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          updateBooks(this.params).then(res => {
            if (res.code == 200) {
              this.modal1 = false;
              this.$Message.success("添加成功");
              this.getList(this.args);
              this.cancel();
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error("没有填写完整");
        }
      });
    },
    changeDate(e) {
      this.params.effectiveAt = e;
    },
    cancel() {
      this.params.orgId = "";
      this.params.title = "";
      this.params.effectiveAt = "";
    },
    changeNum(e) {
      console.log(e);
      this.size = e;
      this.page = 1;
      this.getList({});
    },
    changeSort(e) {
      this.sort = e;
      this.page = 1;
      this.getList({});
    }
  }
};
</script>
<style lang="scss" scoped>
.table-header{
  padding: 10px 0;
}
.integral-header .integral-top {
  padding: 15px 20px;
  background: white;
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
.po{
  padding:0 10px;
}

@import "../../libs/basicdata.css";
</style>
