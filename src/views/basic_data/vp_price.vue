<!-- 会费管理(会员) -->
<template>
  <div class="integral">
    <tophead :navigation1="navigation1" :top="top" @query="query"></tophead>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status"></Checkbox>全选
          </Button>
          <span>已选择{{arr.length}}</span>
          <Button class="table-btn" type="primary" @click="add('formValidate')">{{Newly}}</Button>
          <Modal v-model="modal1" title="新增会费" draggable width="800">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <FormItem label="会费名称" prop="name">
                <Input v-model="formValidate.name" />
              </FormItem>
              <FormItem label="金额" prop="amount">
                 <InputNumber  :min="0" v-model="formValidate.amount"></InputNumber>

              </FormItem>
              <FormItem label="会费期限" prop="imonth">
                <InputNumber :max="99" :min="1" v-model="formValidate.imonth"></InputNumber>
                <span>个月</span>
              </FormItem>
              <FormItem label="会员包" prop="packageFlag">
                <RadioGroup v-model="formValidate.packageFlag">
                  <Radio label="1">有</Radio>
                  <Radio label="0">无</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="会费详情">
                <wangeditor id="exccccc" :labels=editorContent  @change="btn"></wangeditor>
                <!-- <div id="editorContent" style="text-align:left"></div> -->
              </FormItem>
            </Form>
            <div slot="footer">
              <Button type="text" size="large" @click="modalCancel">取消</Button>
              <Button type="primary" size="large" @click="handleSubmit('formValidate')">确定</Button>
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
import wangeditor from '@/components/wangeditor';
import tophead from "@/components/tophead";
import { formatDate } from "@/request/datatime";
import { Cost, Costdel, Costmodify, CostAdd, Costbatch } from "@/request/api";
export default {
  name: "editor",
  data() {
    return {
      editorContent: "",
      Newly: "新增",
      formValidate: {
        name: null,
        imonth: null,
        amount: null,
        packageFlag: "1"
      },
      ruleValidate: {
        name: [
          { required: true, message: "会费名称不能为空", trigger: "blur" }
        ],
        amount: [
          {
            required: true,
            message: "输入格式不正确",
            trigger: "blur",
            pattern: /^[a-z0-9]+$/,
            type: "number",
            // transform(value) {
            //   return Number(value);
            // }
          }
        ],
        imonth: [
          {
            required: true,
            message: "输入格式不正确",
            trigger: "blur",
            type: "number",
            pattern: /^[a-z0-9]+$/,
            transform(value) {
              return Number(value);
            }
          }
        ]
      },
      navigation1: {
        head: "会费管理(会员)"
      },
      modal1: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "会费期限",
          key: "duesLength",
          align: "center"
        },
        {
          title: "金额",
          key: "amount",
          align: "center"
        },
        {
          title: "会员包",
          key: "packageFlagText",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createAt",
          align: "center",
          render: (h, params) => {
            return h("div", [h("p", formatDate(params.row.createAt))]);
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
                  value: params.row.status == 1
                },
                on: {
                  input: e => {
                    console.log(e);
                    this.Effective(params.row.duesId, e);
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
                      this.modal1 = true;
                      this.edit(params.row.duesId);
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      data: [],
      costtype: [
        { label: "全部", value: "" },
        { label: "有效", value: "1" },
        { label: "无效", value: "0" }
      ],
      page: 1,
      size: 10,
      pageSize: 10,
      dataCount: 0,
      totalNum: "",
      name: "",
      createTimeStamp: "",
      datas: "",
      status: false,
      statues: "",
      duesId: "",
      arr: [],
      top: [
        { name: "名称", type: "input", value: "" },
        {
          name: "有效状态",
          type: "select",
          list: [
            { dataValue: "全部", dataKey: "" },
            { dataValue: "有效", dataKey: "1" },
            { dataValue: "无效", dataKey: "0" }
          ],
          value: ""
        },
        { name: "时间", type: "date", value: "" }
      ],
      startAt:'',
      endAt: "",
      editorContent:''
    };
  },
  components: { tophead ,wangeditor},

  computed: {},

  created() {},

  mounted() {

    this.getCost();
  },
  methods: {
    //取消
    modalCancel() {
      this.modal1 = false;
    },
    //确定
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(name);
          if (this.duesId) {
            this.getCostmodify();
          } else {
            this.getCostAdd();
          }
        } else {
          this.$Message.error("必填项为空！");
        }
      });
    },
    //列表page
    getCost() {
      if (this.createTimeStamp != "") {
        this.datas = this.createTimeStamp.getTime();
        this.endAt = new Date().getTime();
        if (this.datas > this.endAt) {
          this.startAt=this.endAt
          this.endAt=this.datas
        }else{
          this.startAt=this.datas
        }
      }

      Cost({
        page: { page: this.page, size: this.size },
        name: this.name,
        status: this.statues,
        startAt: this.startAt,
        endAt: this.endAt
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.dataCount = res.data.totalSize;
          this.data = res.data.list;
          this.$refs.selection.selectAll(false);
        } else {
          this.$Message.error(res.msg);
        }
      }).catch(res=>{
        console.log(res)
      })
    },
    // 会费详情
    getCostdel() {
      Costdel({
        duesId: this.duesId
      }).then(res => {
        if (res.code == 200) {
          let lists = res.data;
          (this.formValidate.name = lists.name),
            (this.editorContent = lists.detail),
            (this.formValidate.packageFlag = lists.packageFlag),
            (this.formValidate.imonth = Number(lists.imonth)),
            (this.formValidate.amount = Number(lists.amount));
          console.log(typeof lists.amount, typeof this.formValidate.amount);
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    // 修改会费
    getCostmodify() {
      Costmodify({
        duesId: this.duesId,
        name: this.formValidate.name,
        detail: this.editorContent,
        packageFlag: this.formValidate.packageFlag,
        imonth: this.formValidate.imonth,
        amount: this.formValidate.amount
      }).then(res => {
        if (res.code == 200) {
          this.$Message.success("提交成功!");


        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    // 添加会费
    getCostAdd() {
      CostAdd({
        name: this.formValidate.name,
        detail: this.editorContent,
        packageFlag: this.formValidate.packageFlag,
        imonth: this.formValidate.imonth,
        amount: this.formValidate.amount
      }).then(res => {
        if (res.code == 200) {
          this.getCost();
          this.$Message.success(res.data.msg);
          this.modal1 = false;
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res, 11);
      });
    },

    // 批量操作会费
    getCostbatch() {
      Costbatch({
        duesIds: this.duesId,
        oprType: this.oprType
      }).then(res => {
        if (res.code == 200) {
          this.$Message.success("操作成功");
        }
        console.log(res);
      });
    },
    //富文本
    btn(e){
      this.editorContent=e
    },

    //查询
    query(e) {
      this.page=1
      this.name = e[0].value;
      this.createTimeStamp = e[2].value;
      this.statues = e[1].value;
      this.getCost();
    },

    //分页功能
    changepages(index) {
      this.page = index;
      this.getCost();
    },
    //全选按钮
    chackall() {
      console.log(this.status);
      this.status = !this.status;
      this.$refs.selection.selectAll(this.status);
    },
    //选择内容
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

    //编辑
    edit(e) {
      this.duesId = e;
      this.getCostdel();
    },
    //有效切换
    Effective(stat, e) {
      this.duesId = stat;
      if (e == true) {
        this.oprType = 2;
        this.getCostbatch();
      } else {
        this.oprType = 3;
        this.getCostbatch();
      }
    },
    add(name) {
      this.editorContent=''
      this.$refs[name].resetFields();
      this.modal1 = true;
    }
  }
};
</script>
<style lang="scss" scoped>
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
