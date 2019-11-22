<!-- 证书管理（共用） -->
<template>
  <div>
    <basicdata :navigation1="navigation1"></basicdata>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <!-- <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status"></Checkbox>全选
          </Button> -->
          <!-- <span>已选择{{arr.length}}</span> -->
          <Button class="table-btn" @click="modal1 = true">{{title}}</Button>
          <Modal v-model="modal1" title="修改" @on-ok='update' @on-cancel='cancel'>
            <Form ref="formValidate" :model="args" :rules="ruleValidate" :label-width="120">
              <FormItem :label="title" prop="name">
                <Input v-model="args.name"/>
              </FormItem>
            </Form>
          </Modal>
        </div>
      </div>
      <Table
        ref="selection"
        border
        :columns="columns"
        :data="data1"
      ></Table>
      <!-- <div class="pages">
        <Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          style="margin: auto"
          :page-size="pageSize"
          @on-change="changepages"
        />
      </div> -->
    </div>
  </div>
</template>

<script>
import {formatDate} from '../../request/datatime'
import basicdata from "../../components/basicdata"
import { getActiveType,updateCard } from '@/request/api'
export default {
  data() {
    return {
      navigation1: {
        head: "证书管理（共用）"
      },
      ruleValidate: {
        name: [{ required: true, message: "就业情况不能为空", trigger: "blur" }]
      },
      title: "证书管理",
      columns: [
        {
          title: "就业情况",
          key: "name"
        },
        {
          title: "创建时间",
          key: "createAt",
        },
        {
          title: "创建人",
          key: "userName",
          render: (h,params) => {
            return h("span",params.row.userName?params.row.userName:'系统管理员')
          }
        },
        {
          title: "有效状态",
          key: "validFlag",
          algin: "center",
          render: (h, params) => {
            return h('div', [
              h('i-switch',{
                props:{
                  trueValue:1,
                  falseValue:0,
                  value: ~~params.row.validFlag
                },
                on: {
                  "on-change": (e) => {
                    this.args.name = params.row.name
                    this.args.dicId = params.row.dicId
                    this.args.validFlag = e
                    this.update()
                  }
                }
              })
            ])
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
                      this.args.name = params.row.name
                      this.args.dicId = params.row.dicId
                      this.args.validFlag = params.row.validFlag
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
      data1: [],
      modal1: false,
      args:{
        name:null,
        dicId:null,
        validFlag:null
      }
    };
  },

  components: { basicdata },

  computed: {},

  created() {
    this.getList()
  },

  methods: {
    getList(){
      getActiveType({typeFlag:19}).then(res => {
        if(res.code == 200){
          this.data1 = res.data
        }
      })
    },
    update(){
      updateCard(this.args).then(res => {
        if(res.code == 200){
          this.getList()
          this.$Message.success('修改成功')
          this.cancel()
        }
      })
    },
    cancel(){
      this.args.name = null
      this.args.dicId = null
      this.args.validFlag = null
    }
  }
};
</script>
<style lang="scss" scoped>
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
