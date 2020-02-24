<!-- 证书管理（共用） -->
<template>
  <div>
    <div class="integral-header">
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
        <Table :loading="loading" ref="selection" border :columns="columns" :data="data1"></Table>
      </div>

      <div class="pages">
        <Page
          :current='params.page.page'
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
      loading: true,
      open: false,
      time: "请选择时间段",
      navigation1: {
        head: "证件管理"
      },
      ruleValidate: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      title: "证件管理",
      columns: [
        {
          title: "名称",
          key: "name",
          align: "center",

        },
        {
          title: "创建时间",
          key: "createAt",

          align: "center"
        },
        {
          title: "创建人",
          key: "userName",

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
      this.data1 = []
      getCard(filterNull(this.params)).then(res => {
     
        if (res.code == 200) {
          this.$nextTick(()=>{
            this.data1 = [...res.data.list];
            this.sumSize = res.data.totalSize;
            this.sumPage = res.data.totalNum;
          })
       
        } else {
          this.$Message.error(res.msg);
        }
        this.loading = false
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
          // this.getList();
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
      this.loading = true
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
