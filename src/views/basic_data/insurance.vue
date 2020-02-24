<!-- 保险(会员) -->
<template>
  <div>
    <basicdata :navigation1="navigation1" @query="query"></basicdata>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
         <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status"></Checkbox>全选
          </Button>
          <span>已选择{{arr.length}}</span>
          <Button class="table-btn" @click="modal1 = true">{{title}}</Button>
          <Modal v-model="modal1" :title="'新增'+title" class-name="vertical-center-modal">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <FormItem :label="title" prop="name">
                <Input v-model.trim="formValidate.name" />
              </FormItem>
            </Form>
            <div slot="footer">
              <Button type="text" size="large" @click="modalCancel">取消</Button>
              <Button type="error" size="large" @click="modalOk('formValidate')">确定</Button>
            </div>
          </Modal>
        </div>
      </div>
      <Table
        ref="selection"
        border
        :columns="columns"
        :data="data1"
        @on-selection-change="handleSelectionChange"
      ></Table>
      <div class="pages">
        <Page
          :current='page'
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          style="margin: auto"
          :page-size="pageSize"
          @on-change="changepages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from '../../request/datatime'
import basicdata from "../../components/basicdata";
export default {
  data() {
    return {
      navigation1: {
        head: "保险(会员)"
      },
      formValidate: {
        name: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "就业情况不能为空", trigger: "blur" }]
      },
      title: "保险",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "就业情况",
          key: "EmploymentSituation"
        },
        {
          title: "创建时间",
          key: "createtime",
           render:(h,params)=>{
              return h("div",formatDate(params.row.createtime))
          }
        },
        {
          title: "创建人",
          key: "creater"
        },
        {
          title: "有效状态",
          key: "status",
          algin: "center",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.hotFlag == 1
                },
                on: {
                  input: e => {
                    console.log(e)
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
                    click: () => {}
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: [],
      modal1: false,
      arr: [],
       page: 1,
      size: 10,
      dataCount: 0,
      pageSize: 10,
      status:false
    };
  },

  components: { basicdata },

  computed: {},

  created() {},

  methods: {
    //查询
    query(e) {
      console.log(e);
    },

    //全选按钮
    chackall() {
      this.status = !this.status;
      console.log(this.status);
      this.$refs.selection.selectAll(this.status);
    },

    //取消
    modalCancel(){

    },
    //确定
    modalOk(){

    },

    //每条数据单选框的状态
    handleSelectionChange(val){
      this.arr=val
      console.log(this.arr)
      if (this.arr.length == this.dataCount&&this.dataCount!=0||this.arr.length==this.size) {
        this.status = true;
      } else {
        this.status = false;
      }
       //选择的数据id
        let arr = [];
        for (let i = 0; i < this.arr.length+1; i++) {
          arr.push(this.arr[i].informationId);
        }
        this.arr = arr.toString();
        console.log(this.arr)
    },

     //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);

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
<style lang="scss" scoped>

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
