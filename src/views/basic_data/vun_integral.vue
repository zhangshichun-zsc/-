<!-- 积分查询(志愿者) -->
<template>
  <div class="integral">

    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <Icon type="ios-search-outline" />
          <span>筛选查询</span>
        </div>
        <div class="flex-center-end">
          <Button class="integral-rig" @click="modal2=true">志愿活动积分比例设置</Button>
          <Button class="integral-rig" :to="{ name: 'vunintegral_set' }">积分规则设置</Button>
          <div class="integral-rig"  @click="Retractbtn">
            <Icon type="ios-arrow-down" v-if="Retract==true" />
              <Icon type="ios-arrow-up" v-if="Retract==false" />
              <span v-if="Retract==true">收起筛选</span>
              <span v-if="Retract==false">启用筛选</span>
          </div>
          <Button class="integral-rig" @click="query">查询结果</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body" v-if="Retract==true">
        <div class="flex-center-start">
          <span>用户账户</span>
          <Input size="large" placeholder="用户ID/账号" class="inpt" v-model="userAccount" />
        </div>
        <div class="flex-center-start">
          <span>用户昵称</span>
          <Input size="large" placeholder="用户昵称" class="inpt" v-model="nickname" />
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <Icon type="md-reorder" size="20" />
          <span>数据列表</span>
        </div>
        <div>
          <Button class="table-btn" @click="modify">批量修改</Button>
          <Button class="table-btn" @click="exportData">
            导出数据
            <Icon type="md-arrow-dropdown" />
          </Button>
          <Select v-model="size" style="width:120px" placeholder="显示条数" class="space">
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="排序方式" class="space" style="width: 120px;" v-model="sort">
            <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <Modal v-model="modal1" title="修改积分">
          <Form ref="formItem" :model="formItem" :rules="ruleValidates" :label-width="120">
            <FormItem label="调整积分" prop="addType">
              <RadioGroup v-model="formItem.addType" vertical>
                <Radio label="1">
                  增加
                  <Input placeholder="请输入大于0的整数" v-model="formItem.addScore1"/>
                  <Button style="background:#ccc">分</Button>
                </Radio>
                <Radio label="2">
                  减少
                  <Input placeholder="请输入大于0的整数" v-model="formItem.addScore2"/>
                  <Button style="background:#ccc">分</Button>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="备注信息：" prop="remark">
              <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 4,maxRows: 4}"/>
            </FormItem>
          </Form>
          <div slot="footer">
            <Button type="text" size="large" @click="modalCancel">取消</Button>
            <Button type="primary" size="large" @click="modalOk('formItem')">确定</Button>
          </div>
        </Modal>
        <Modal v-model="modal2" title="志愿者活动积分比例设置">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
            <FormItem label="1小时服务时长：" prop="serve">
              <Input v-model="formValidate.serve" placeholder="请输入大于0的整数" style="width:250px"/>
              <Button style="background:#ccc">分</Button>
            </FormItem>
          </Form>
          <div slot="footer">
            <Button type="text" size="large" @click="modalCancel2">取消</Button>
            <Button type="primary" size="large" @click="modalOk2('formValidate')">确定</Button>
          </div>
        </Modal>
      </div>
      <Table
        ref="selection"
        border
        :columns="columns"
        :data="datax"
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
import { tablepage } from "@/request/mixin";
import { integralpage, integralmodify } from "../../request/api";
export default {
  data() {
    return {
      formItem: {
        remark: "",
        addType: "1",
        addScore1: "",
        addScore2: ""
      },
      formValidate: {
        serve: ""
      },
      ruleValidate: {
        serve: [
          { required: true, message: "服务时长不能为空", trigger: "blur" }
        ]
      },
      ruleValidates: {
        addScore: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur"
          }
        ],
        remark: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur"
          }
        ]
      },
      modal1: false,
      modal2: false,
      navigation1: {
        head: "积分查询(志愿者)"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户账号",
          key: "userAccount"
        },
        {
          title: "用户昵称",
          key: "nickname"
        },
        {
          title: "用户类型",
          key: "userType"
        },
        {
          title: "可用积分",
          key: "score"
        },
        {
          title: "待审积分",
          key: "unAuditScore"
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
                    color: "green"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "vunintegral_detail",
                        query: { userId: params.row.userId }
                      });
                    }
                  }
                },
                "明细"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "green"
                  },
                  on: {
                    click: () => {
                      this.clearinput();
                      console.log(this.userIds)
                      this.userIds = params.row.userId;

                    }
                  }
                },
                "修改数值"
              ),
              h(
                "a",
                {
                  style: {
                    color: "green"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ name: "vunintegral_audit" });
                    }
                  }
                },
                "积分审核"
              )
            ]);
          }
        }
      ],

      Article: [
        { value: 10, label: 10 },
        { value: 15, label: 15 },
        { value: 20, label: 20 }
      ],
      sorting: [
        { value: "asc", label: "正序" },
        { value: "desc", label: "倒序" }
      ],
      sort: "asc",

      datax: [],
      sysType: 2,
      page: 1,
      size: 10,

      dataCount: 0,
      userAccount: "",
      nickname: "",
      arr: [],
      userIds: "",
      arrs: [],
      operationUserId: 8,
      userIds:'',
      Retract:true
    };
  },

  components: {},

  computed: {},
  mounted() {
    this.getintegralpage();
  },

  mixins: [tablepage],
  created() {},

   //事件监听
  watch: {
    size: "getintegralpage",
    sort: "getintegralpage"
  },
  methods: {
    //积分管理--积分分页
    getintegralpage() {
      integralpage({
        page: {
          page: this.page,
          size: this.size,
          sort: "createAt" + " " + this.sort
        },
        sysType: this.sysType,
        userAccount: this.userAccount,
        nickname: this.nickname
      }).then(res => {
        if (res.code == 200) {
          this.dataCount = res.data.totalSize;
          this.datax = res.data.list;
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //修改积分
    getintegralmodify() {
      let num = "";
      if (this.formItem.addType == 1) {
        num = this.formItem.addScore1;
      } else if (this.formItem.addType == 2) {
        num = this.formItem.addScore2;
      }
      integralmodify({
        userIds: this.userIds,
        sysType: this.sysType,
        addScore: num,
        addType: this.formItem.addType,
        remark: this.formItem.remark,
        operationUserId: this.operationUserId
      }).then(res => {
        if (res.code == 200) {
          this.modal1 = false;
          this.$Message.info(res.msg);
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //分页功能
    changepages(index) {
      this.page = index;
      this.getintegralpage();
    },

    //选择内容
    handleSelectionChange(val) {
      this.arrs = val;
      this.arr = val
        .map(item => {
          return item.userId;
        })
        .toString();
      console.log(this.arr);
    },

     //收起筛选
    Retractbtn() {
      this.Retract = !this.Retract;
      console.log(11);
    },


     //批量修改
    modify() {
      console.log(this.arr);
      if(this.arr.length==0){
        this.$Message.error("请先选择")
      }else{
        this.clearinput();
        this.userIds=this.arr
      }
    },

    clearinput() {
      this.formItem.remark = "";
      this.formItem.addScore1 = "";
      this.formItem.addScore2 = "";
      this.modal1 = true;
    },

    //搜索结果
    query() {
      this.getintegralpage();
    },

    //模态框
    modalOk(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getintegralmodify();
        } else {
          this.$Message.error("必填项未填");
        }
      });
    },

    modalCancel() {
      this.modal1 = false;
    },

    //模态框
    modalOk2(name) {
      console.log(11);
      this.$refs[name].validate(valid => {
        if (valid) {
          this.modal2 = false;
          this.$Message.success("修改成功");
        } else {
          this.$Message.error("必填项未填");
        }
      });
    },
    modalCancel2() {
      this.formValidate.serve=''
      this.modal2 = false;
    }
  }
};
</script>
<style lang="scss">
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  padding: 15px 20px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
}
.integral-header .integral-rig {
  margin-left: 20px;
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
  padding: 10px 20px;
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
  margin-top: 2.5rem;
}
</style>
