<!-- 障碍管理(会员) -->
<template>
  <div>
    <tophead :navigation1="navigation1" :top="top" @query="query"></tophead>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status"></Checkbox>全选
          </Button>
          <span>已选择{{arr.length}}</span>
          <Button class="table-btn" @click="getRetardeddel(1)">批量删除</Button>
          <Button class="table-btn" @click="addbtn(1)">新增智障类型</Button>
          <Modal v-model="modal1" :title="text">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <FormItem :label="text" prop="name">
                <Input v-model="formValidate.name"></Input>
              </FormItem>
            </Form>
            <div slot="footer">
              <Button type="text" size="large" @click="modalCancel">取消</Button>
              <Button type="primary" size="large" @click="modalOk('formValidate')">确定</Button>
            </div>
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
import { Retardedtype, Retardedadd, Retardeddel } from "../../request/api";
import { formatDate } from "../../request/datatime";
import tophead from "../../components/tophead";
export default {
  data() {
    return {
      navigation1: {
        head: "障碍类型(会员)"
      },
      formValidate: {
        name: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "新增智障类型", trigger: "blur" }]
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "障碍类型名称",
          key: "dicName"
        },
        {
          title: "创建时间",
          key: "createAt",
          render: (h, params) => {
            return h("div", formatDate(params.row.createAt));
          }
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
                      this.arr = Array.of(params.row.dicId);
                    if (e == true) {
                      this.getRetardeddel(2);
                    } else {
                      this.getRetardeddel(3);
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
                      this.addbtn(2, params.row.dicName, params.row.dicId);
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
                      this.arr = Array.of(params.row.dicId);
                      console.log(this.arr)
                      this.getRetardeddel(1);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [],
      top: [
        { name: "名称", type: "input", value: "" },
        {
          name: "有效状态",
          type: "select",
          list: [
            { dataValue: "全部", dataKey: "2" },
            { dataValue: "有效", dataKey: "1" },
            { dataValue: "无效", dataKey: "0" }
          ],
          value: ""
        }
      ],
      modal1: false,
      arr: [],
      page: 1,
      size: 10,
      dataCount: 0,
      status: false,
      validFlag: null,
      name: null,
      type: "9",
      text: null,
      add: null,
      userId: 1,
      dicId: null,
      types: null
    };
  },

  components: { tophead },

  computed: {},

  created() {},
  mounted() {
    this.getRetardedtype();
  },
  methods: {
    //列表
    getRetardedtype() {
      Retardedtype({
        page: { page: this.page, size: this.size },
        validFlag: this.validFlag,
        name: this.name,
        type: this.type
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

    //新增修该
    getRetardedadd() {
      Retardedadd({
        type: this.type,
        add: this.add,
        name: this.formValidate.name,
        dicId: this.dicId,
        userId: this.userId
      }).then(res => {
        if (res.code == 200) {
          this.modal1 = false;
          this.getRetardedtype();
          this.$Message.info("操作成功");
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //删除
    getRetardeddel(type) {
      this.types = type;
      Retardeddel({
        userId: this.userId,
        dicId: this.arr,
        type: this.types
      }).then(res => {
        if (res.code == 200) {
          this.arr=[]
          this.getRetardedtype();
          this.$Message.info("操作成功");
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //弹出框显示
    addbtn(e, name, id) {
      this.modal1 = true;
      this.add = e;
      if (e == 1) {
        this.text = "新增智障类型";
        this.formValidate.name = "";
        this.dicId = "";
      } else {
        this.text = "编辑智障类型";
        this.formValidate.name = name;
        this.dicId = id;
      }
    },
    //取消弹出框
    modalCancel() {
      this.modal1 = false;
    },

    //弹出框
    modalOk(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getRetardedadd();
        } else {
          this.$Message.error("必填项不能为空！");
        }
      });
    },

    //查询
    query(e) {
      this.name = e[0].value;
      if (e[1].value == 2) {
        this.validFlag = "";
      } else {
        this.validFlag = e[1].value;
      }
      this.getRetardedtype();
      console.log(e);
    },

    //全选按钮
    chackall() {
      this.status = !this.status;
      console.log(this.status);
      this.$refs.selection.selectAll(this.status);
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
      //选择的数据id
      let arr = [];
      for (let i = 0; i < this.arr.length; i++) {
        arr.push(this.arr[i].dicId);
      }
      this.arr = arr;
      console.log(this.arr);
    },

    //分页功能
    changepages(index) {
      this.page = index;
      this.getRetardedtype();
    }
  }
};
</script>
<style lang="scss" scoped>
.integral-table {
  margin-top: 10px;
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
.table-btn {
  position: relative;
}
.icon {
  position: absolute;
  padding: 2px;
  top: 0;
  right: 0;
  transform: translateY(-50%);
  background: yellow;
  color: #000;
}
</style>
