<!--物资列表(会员)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con bk">
        <div class="title bk-xia flex-center-start">
          <p>
            <Icon type="ios-search" />
            <span>筛选查询</span>
          </p>
          <div class="flex-center-end">
            <div class="Pack space" @click="Retractbtn">
              <Icon type="ios-arrow-down" v-if="Retract==true" />
              <Icon type="ios-arrow-up" v-if="Retract==false" />
              <span v-if="Retract==true">收起筛选</span>
              <span v-if="Retract==false">启用筛选</span>
            </div>
            <Button @click="query">查询结果</Button>
          </div>
        </div>
        <div class="con">
          <Form inline class="flex-center-start" v-if="Retract==true">
            <FormItem label="名称:" prop="name">
              <Input style="width:150px" type="text" v-model="name" placeholder="物资名称"></Input>
            </FormItem>
            <FormItem label="有效状态:" prop="ValidStateList">
              <Select style="width:150px" v-model="statues">
                <Option
                  v-for="item in ValidStateList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="创建时间:" prop="CreationTime" v-model="createAt">
              <DatePicker type="date" placeholder="请选择日期" style="width: 150px" :transfer="true"></DatePicker>
            </FormItem>
          </Form>
        </div>
      </div>
      <div class="con">
        <div class="title bk-zy">
          <div class="batch">
            <Button @click="chackall()" style="border:0px;">
              <Checkbox v-model="status"></Checkbox>全选
            </Button>
            <Button @click="batch('sanchu')">批量删除</Button>
            <Button @click="add(1)">新增物资</Button>
          </div>
        </div>
        <Table
          ref="selection"
          border
          :columns="columns"
          :data="data"
          @on-selection-change="handleSelectionChange"
        ></Table>
        <!--对话框(新增)-->
        <Modal v-model="modal1" :title="text">
          <Form ref="ModifyDate" :model="ModifyDate" :rules="ruleValidate">
            <FormItem label="物资种类" prop="MaterialTypes">
              <Select style="width: 10rem" v-model="ModifyDate.typeDicId">
                <Option
                  v-for="item in MaterialTypes"
                  :value="item.dicId"
                  :key="item.dicId"
                >{{ item.dicName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="物资名称:" prop="name">
              <Input style="width: 10rem" v-model="ModifyDate.name" type="text"></Input>
            </FormItem>
            <FormItem label="有效状态:" prop="ValidState">
              <i-switch v-model="ModifyDate.ValidState" size="large"></i-switch>
            </FormItem>
          </Form>
          <div slot="footer">
            <Button type="primary" @click="save('ModifyDate')">保存</Button>
          </div>
        </Modal>
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
import { formatDate } from "../../request/datatime";
import {
  materialpage,
  materialdels,
  materialup,
  materialadds,
  materialtype,
  materialquery,
  materialstatus
} from "../../request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "物资列表(会员)"
      },

      ValidStateList: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "有效"
        },
        {
          value: "2",
          label: "无效"
        }
      ],
      data: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "物资类型",
          key: "typeDicName",
          align: "center"
        },
        {
          title: "物资名称",
          key: "name",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createAt",
          align: "center",
          render: (h, params) => {
            return h("div", formatDate(params.row.createAt));
          }
        },
        {
          title: "有效状态",
          key: "validFlag",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.status == 2
                },
                on: {
                  input: e => {
                    console.log(e);

                    this.getmaterialstatus(params.row.resourcesId, e);
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
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-around",
                  MaxfontSize: "16px"
                }
              },
              [
                h(
                  "a",
                  {
                    clssName: "action",
                    style: {
                      color: "#1ABD9D"
                    },
                    on: {
                      click: () => {
                        this.add(params.row);
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "a",
                  {
                    style: {
                      color: "#1ABD9D"
                    },
                    on: {
                      click: () => {
                        this.batch(params.row.resourcesId);
                      }
                    }
                  },
                  "删除"
                )
              ]
            );
          }
        }
      ],
      modal1: false,
      ModifyDate: {
        typeDicId: "",
        name: "",
        ValidState: ""
      },
      ruleValidate: {
        typeDicId: [
          { required: true, message: "请选择物资种类", trigger: "blur" }
        ],
        name: [{ required: true, message: "物资名称不能为空", trigger: "blur" }]
      },
      MaterialTypes: [],
      page: 1,
      size: 10,
      dataCount: 0,
      status: false,
      arr: null,
      statues: "",
      typeDicId: null,
      sysId: 1,
      text: null,
      resourcesId: null,
      name: null,
      createAt: null,
      Retract: true,
      edit: null
    };
  },
  methods: {
    //收起筛选
    Retractbtn() {
      this.Retract = !this.Retract;
      console.log(11);
    },

    //新增编辑
    add(e) {
      this.modal1 = true;
      if (e == 1) {
        this.text = "新增物质";
        this.ModifyDate.name = "";
        this.ModifyDate.typeDicId = "";
        this.ModifyDate.ValidState = false;
      } else {
        this.text = "编辑物质";
        console.log(e);
        this.ModifyDate.name = e.name;
        this.ModifyDate.typeDicId = e.typeDicId;
        this.resourcesId = e.resourcesId;
        if (e.status == 3) {
          this.ModifyDate.ValidState = false;
        } else {
          this.ModifyDate.ValidState = true;
        }
        console.log(this.ModifyDate);
      }
    },

    save(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.text == "编辑物质") {
            this.getmaterialup();
            this.modal1 = false;
          } else if (this.text == "新增物质") {
            this.getmaterialadds();
          }
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    // 查询结果按钮
    query() {
      this.getmaterialquery();
    },
    //查询物资类型（会员）
    getmaterialtype() {
      materialtype({}).then(res => {
        if (res.code == 200) {
          this.MaterialTypes = res.data;
        }
        console.log(res);
      });
    },
    //查询物资（会员）
    getmaterialquery() {
      let sta = this.statues;
      if (this.statues == "0") {
        sta = "";
      }
      let datatimes = "";
      if (this.createAt != "") {
        datatimes = this.createAt.getTime();
      }
      materialquery({
        page: { page: this.page, size: this.size },
        name: this.name,
        status: sta,
        createAt: datatimes
      }).then(res => {
        if (res.code == 200) {
          this.dataCount = res.data.totalSize;
          this.data = res.data.list;
        }
        console.log(res);
      });
    },
    //物质列表
    getmaterialpage() {
      materialpage({
        page: { page: this.page, size: this.size }
      }).then(res => {
        if (res.code == 200) {
          this.dataCount = res.data.totalSize;
          this.data = res.data.list;
        }
        console.log(res);
      });
    },
    //物质状态
    getmaterialstatus(id, e) {
      let typestatus = null;
      if (e) {
        typestatus = 2;
      } else {
        typestatus = 3;
      }
      materialstatus({
        resourcesId: id,
        status: typestatus
      }).then(res => {
        if (res.code == 200) {
          this.$Message.success("操作成功");
        }
        console.log(res);
      });
    },

    // 删除物资（会员）
    getmaterialdels() {
      materialdels(this.arr).then(res => {
        if (res.code == 200) {
          this.$Message.success("删除成功");
          this.getmaterialpage();
        }
        console.log(res);
      });
    },
    // 编辑物资（会员）
    getmaterialup() {
      if (this.ModifyDate.ValidState) {
        this.edit = 2;
      } else {
        this.edit = 3;
      }
      console.log(this.ModifyDate.typeDicId);
      materialup({
        resourcesId: this.resourcesId,
        name: this.ModifyDate.name,
        status: this.edit,
        typeDicId: this.ModifyDate.typeDicId,
        sysId: this.sysId
      }).then(res => {
        if (res.code == 200) {
          this.modal1 = false;
          this.$Message.info("编辑成功");
          this.getmaterialpage();
        }
        console.log(res);
      });
    },
    // 添加物资（会员）
    getmaterialadds() {
      if (this.ModifyDate.ValidState) {
        this.edit = 2;
      } else {
        this.edit = 3;
      }
      materialadds({
        sysId: this.sysId,
        name: this.ModifyDate.name,
        status: this.edit,
        typeDicId: this.ModifyDate.typeDicId
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info("添加成功");
          this.modal1 = false;
          this.getmaterialpage();
        }
        console.log(res);
      });
    },
    //批量删除
    batch(e) {
      console.log(this.arr);
      if (this.arr == "") {
        this.$Message.error("请先选择");
      } else {
        if (e == "sanchu") {
          console.log(this.arr);
          this.getmaterialdels();
        } else {
          this.arr = Array.of(e);
          console.log(this.arr);
          this.getmaterialdels();
        }
      }
    },
    //全选按钮
    chackall() {
      this.status = !this.status;
      this.$refs.selection.selectAll(this.status);
    },

    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getmaterialpage();
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
        arr.push(this.arr[i].resourcesId);
      }
      this.arr = arr;
      console.log(this.arr);
    }
  },
  //  created() {
  //  this.getmaterialtype()
  //   this.getmaterialpage();

  // },
  mounted() {
    this.getmaterialpage();
    this.getmaterialtype();
  }
};
</script>
<style scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
  border: 1px solid #e4e4e4;
}
.content {
  margin: 10px;
}
.bk {
  border: 1px solid #e4e4e4;
}
.bk-xia {
  border-bottom: 1px solid #e4e4e4;
}
.bk-zy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
}
.title {
  background-color: #f3f3f3;
  justify-content: space-between;
  padding: 5px 20px;
}
.Pack {
  margin-right: 5px;
}
.ivu-form {
  margin-top: 1rem;
  padding-left: 1rem;
}
.ivu-form-item {
  display: flex;
}
.pages {
  display: flex;
  justify-content: center;
  margin: 0.5rem auto;
}
.batch button {
  margin-left: 1rem;
}
</style>
