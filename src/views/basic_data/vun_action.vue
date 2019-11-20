<!-- 志愿者活动分类管理(共用) -->
<template>
  <div>
    <basicdata :navigation1="navigation1"  @query=query></basicdata>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status"></Checkbox>全选
          </Button>
          <span>已选择{{arr.length}}</span>
          <Button class="table-btn" @click="add(1)">新增活动分类</Button>
          <Modal v-model="modal1" :title=text>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <FormItem label="活动名称" prop="dicName">
                <Input v-model="formValidate.dicName"></Input>
              </FormItem>
            </Form>
            <div slot="footer">
              <Button type="primary" @click="handsubmit('formValidate')">确定</Button>
            </div>
          </Modal>
        </div>
      </div>
      <Table
        ref="selection"
        border
        :columns="columns"
        :data="data"
        @on-selection-change="tablechange"
      ></Table>
      <div class="pages">
        <Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          :page-size="size"
          @on-change="changepages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { date1 } from "../../request/datatime";
import basicdata from "../../components/basicdata";
import {
  Commonpage,
  Commondelete,
  Commonmodifystatus,
  Commonmodify,
  Commonadd
} from "../../request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "志愿者活动分类管理(共用)"
      },
      formValidate: {
        dicName: ""
      },
      ruleValidate: {
        dicName: [
          { required: true, message: "活动名称不能为空", trigger: "blur" }
        ]
      },
      modal1: false,
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
          title: "创建时间",
          key: "createAt",
          render: (h, params) => {
            return h("div", [h("p", date1("Y-m-dH:i:s", params.row.startAt))]);
          }
        },
        {
          title: "创建人",
          key: "userName"
        },
        {
          title: "有效状态",
          key: "validFlag",
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
                      (this.dicId = params.row.dicId),
                        (this.formValidate.dicName = params.row.dicName),
                        console.log(this.dicName);
                      this.add(2)
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
                    color: "#07ec53"
                  },
                  on: {
                    click: () => {
                      this.delete(params.row.dicId);
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
      page: 1,
      size: 10,
      typeFlag: 7,
      dataCount: 0,
      status:false,
      validFlag: '',
      dicName: "",
      dicId: null,
      sysType:'',
      arr:[],
      text:''
    };
  },

  components: { basicdata },

  computed: {},

  created() {},

  methods: {
    ok() {
      this.$Message.info("新增成功");
    },
    cancel() {
      this.$Message.info("新增失败");
    },
    add(e){
      this.modal1=true
      if(e==1){
        this.formValidate.dicName=''
        this.text='新增活动名称'
      }else if(e==2){
        this.text='修改活动名称'
      }
    },


    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getCommonpage();
    },
    //每条数据单选框的状态
    tablechange(selection) {
      this.arr = selection;

      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true;
      } else {
        this.status = false;
      }
    },
    //全选按钮
    chackall() {
      this.status = !this.status;
      this.$refs.selection.selectAll(this.status);
    },
    //添加确定
    handsubmit(dicName) {
      this.$refs[dicName].validate(valid => {
        if (valid) {
          if(this.text=='新增活动名称'){
            this.getCommonadd();
          }else{
            this.getCommonmodify();
          }

        }
      });
    },
    //添加
    getCommonadd() {
      Commonadd({
        typeFlag: this.typeFlag,
        dicName: this.formValidate.dicName
      }).then(res => {
        if (res.code == 200) {
          this.getCommonpage();
          this.modal1 = false;
          this.$Message.success("添加成功!");
        } else {
          this.$Message.error("添加失败!");
        }
        console.log(res);
      });
    },


    //修改接口
    getCommonmodify() {
      Commonmodify({
        dicId: this.dicId,
        dicName: this.formValidate.dicName
      }).then(res => {
        if (res.code == 200) {
          this.getCommonpage();
          this.modal1 = false;
          this.$Message.success("修改成功!");
        } else {
          this.$Message.success("修改失败!");
        }
        console.log(res);
      });
    },

    //删除
    delete(e) {
      this.dicId = e;
      this.getCommondel();
    },

    //列表数据
    getCommonpage() {
      Commonpage({
        page: { page: this.page, size: this.size },
        typeFlag: this.typeFlag,
        sysType:this.sysType,
        dicName:this.dicName,
        validFlag:this.validFlag,
        createTimestamp:this.createTimestamp,
      }).then(res => {
        if (res.code == 200) {
          this.data = res.data.list;
          this.dataCount = res.data.totalSize;
        }else{
          this.$Message.error(res.msg)
        }
        console.log(res);
      });
    },
    //删除数据
    getCommondel() {
      Commondelete({
        dicId: this.dicId
      }).then(res => {
        if (res.code == 200) {
          this.$Message.success("删除成功!");
          this.getCommonpage();
        }else{
          this.$Message.error("删除成功!");
        }
        console.log(res);
      });
    },
    //查询
    query(e){
      this.dicName=e.dicName
      this.createTimestamp=e.createTimestamp
      this.validFlag=e.validFlag
      console.log(e)
      this.getCommonpage()
    }
  },
  mounted() {
    this.getCommonpage();
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
