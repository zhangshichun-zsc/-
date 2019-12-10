<!-- 会费管理(会员) -->
<template>
  <div class="integral">
      <basicdata :navigation1="navigation1" @query="query"></basicdata>

    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <!-- <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status"></Checkbox>全选
          </Button> -->
          <span>已选择{{arr.length}}</span>
          <Button class="table-btn" type="primary" @click="add('formValidate')">{{Newly}}</Button>
          <Modal v-model="modal1" title="新增会费" draggable width="800">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <FormItem label="会费名称" prop="name">
                <Input v-model="formValidate.name" />
              </FormItem>
              <FormItem label="金额" prop="amount">
                <InputNumber :min="0" v-model="formValidate.amount"></InputNumber>
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
                <wangeditor id="exccccc" :labels="editorContent" @change="btn"></wangeditor>
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
import wangeditor from "@/components/wangeditor";
import basicdata from "@/components/basicdata";

import { formatDate } from "@/request/datatime";
import { Costlist, Costadd, Costdels } from "@/request/api";

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
            type: "number"
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
          key: "imonth",
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
          align: "center"
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
                    this.duesId=params.row.duesId
                    if(e){
                      this.validFlags=1
                      this.getCostadd(2)
                    }else{
                      this.validFlags=0
                      this.getCostadd(2)
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
                      this.modal1 = true;
                      this.duesId=params.row.duesId
                      this.getCostdels()
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

      name: "",
      createTimeStamp: "",
      datas: "",
      status: false,
      statues: "",
      duesId: '',
      arr: [],

      startAt: "",
      endAt: "",
      editorContent: "",
      name: "",
      validFlag: "",
      names: "",
      amount: "",
      detail: "",
      list: "",
      validFlags:'',

    };
  },
  components: { basicdata, wangeditor },

  computed: {},

  created() {},

  mounted() {
    this.getCostlist();
  },
  methods: {
    //分页
    getCostlist() {
      let params = {
        page: {
          page: this.page,
          size: this.size
        },
        name: this.name,
        validFlag: this.validFlag,
        startAt: this.startAt,
        endAt: this.endAt
      };
      this.params = this.util.remove(params);
      Costlist(this.params).then(res => {
        if (res.code == 200) {
          this.data = res.data.list;
          this.dataCount = res.data.totalSize;
        }
        console.log(res);
      });
    },

    //增加修改
    getCostadd(e) {
      if (e==0) {  //新增
        this.list = [{
          duesId: this.duesId,
          validFlag: this.formValidate.validFlag,
          name: this.formValidate.name,
          amount: this.formValidate.amount,
          imonth:this.formValidate.imonth,
          detail: this.editorContent,
          packageFlag:this.formValidate.packageFlag
        }];
      }else if(e==1){ //编辑
        this.list = [{
          validFlag: this.formValidate.validFlag,
          name: this.formValidate.name,
          amount: this.formValidate.amount,
          imonth:this.formValidate.imonth,
          detail: this.editorContent,
          packageFlag:this.formValidate.packageFlag
        }];
      }else if(e==2){
        this.list =[{
          duesId:this.duesId,
          validFlag:this.validFlags
        }]
      }
      this.list = this.util.remove(this.list);
      Costadd({
        list: this.list
      }).then(res => {
        if(res.code==200){
          if(e==0){
            this.modal1=false
            this.$Message.info('添加成功')
          }else if(e==1){
            this.modal1=false
            this.$Message.info('修改成功')
          }else if(e==2){
            this.$Message.info('操作成功')
          }
          this.getCostlist()
        }

        console.log(res);
      });
    },

    //详情
    getCostdels() {
      Costdels({ duesId: this.duesId }).then(res => {
        if(res.code==200){
          this.formValidate=res.data
          this.editorContent=res.data.detail
        }
        console.log(res);
      });
    },

    //取消
    modalCancel() {
      this.modal1 = false;
    },
    //确定
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if(this.duesId==''){
            this.getCostadd(0)
          }else{
            this.getCostadd(1)
          }
        } else {
          this.$Message.error("必填项为空！");
        }
      });
    },

    //富文本
    btn(e) {
      this.editorContent = e;
    },

    //查询
    query(e) {
      this.page = 1;
       this.statues = e.validFlag;
      this.name = e.dicName;
      this.startAt = e.createTimestamp[0];
      this.endAt = e.createTimestamp[1];

      this.getCostlist();
    },

    //分页功能
    changepages(index) {
      this.page = index;
      this.getCostlist();
    },
    // //全选按钮
    // chackall() {
    //   console.log(this.status);
    //   this.status = !this.status;
    //   this.$refs.selection.selectAll(this.status);
    // },
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
    },
    //新增
    add(name) {
      this.duesId=''
      this.editorContent = "";
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
