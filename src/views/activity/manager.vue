<!--活动管理(会员)-->
<template>
  <div class="integral">
    <Navigation :labels="navigation1"></Navigation>
    <div class="integral-header">
      <div class="flex-center-between integral-top">
        <div>
          <Icon type="ios-search-outline" />
          <span>筛选查询</span>
        </div>
        <div class="flex-center-end">
          <Button @click="result">查询结果</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>活动名称:</span>
          <Input size="small" placeholder="活动名称" class="inpt" v-model="name" />
        </div>
        <div class="flex-center-start">
          <span>活动日期:</span>
          <Input size="small" placeholder="活动状态" class="inpt" v-model="activityStatus" />
        </div>
        <div class="flex-center-start">
          <span>活动日期:</span>
          <row class="flex-data inpt">
            <i-col>
              <Date-picker
                type="date"
                placeholder="选择日期"
                style="width: 150px"
                v-model="activityTimestampFrom"
              ></Date-picker>
            </i-col>
            <span>——</span>
            <i-col>
              <Date-picker
                type="date"
                placeholder="选择日期"
                style="width: 150px"
                v-model="activityTimestampTo"
              ></Date-picker>
            </i-col>
          </row>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status">全选</Checkbox>
          </Button>

          <Button class="table-btn" @click="exportData">导出</Button>
          <Button class="table-btn" @click="modal1 = true">导出受益方签到表</Button>
          <Modal draggable ok-text="导出" v-model="modal1" title="自定义展示字段">
            <div class="popup">
              <p class="popup-head">
                <span>目前导出字段顺序</span>
                <span class="popup-head-tit">拖拽调整列显示顺序</span>
              </p>
              <div class="popup-content">
                <p>
                  <span>序号</span>
                  <span>姓名</span>
                  <span>性别</span>
                  <span>手机号码</span>
                  <span>身份证号</span>
                  <span>年龄</span>
                  <span>孩子姓名</span>
                </p>
                <p>
                  <span>孩子性别</span>
                  <span>孩子年龄</span>
                  <span>签名（孩子）</span>
                  <span>签名(家长)</span>
                  <span>障碍类型</span>
                </p>
              </div>
              <div class="bft">
                <p>备选字段</p>
                <div class="bft-tab">
                  <CheckboxGroup v-model="fruit">
                    <Checkbox label="香蕉">序号</Checkbox>
                    <Checkbox label="苹果">姓名</Checkbox>
                    <Checkbox label="西瓜">障碍类型</Checkbox>
                  </CheckboxGroup>
                </div>
              </div>
            </div>
          </Modal>
          <Button class="table-btn" @click="modal1 = true">导出志愿者签到表</Button>
          <Button class="table-btn" @click="draft">草稿箱</Button>
        </div>
        <div class="flex-center-end">
          <Button class="table-btn" @click="addaction">添加活动</Button>
         <Select v-model="size" style="width:120px" placeholder="显示条数" class="space">
              <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select placeholder="排序方式" class="space" style="width: 120px;" v-model="sort">
              <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
      </div>
      <div class="table">
        <Table
          ref="selection"
          border
          :columns="columns"
          :data="datax"
          @on-selection-change="handleSelectionChange"
        ></Table>
        <div class="set">
          <Icon type="ios-settings-outline" @click="modal3 = true" />
          <Modal draggable ok-text="导出" v-model="modal3" title="自定义展示字段">
            <div class="popup">
              <p class="popup-head">
                <span>目前导出字段顺序</span>
                <span class="popup-head-tit">拖拽调整列显示顺序</span>
              </p>
              <div class="popup-content">
                <p>
                  <span>序号</span>
                  <span>姓名</span>
                  <span>性别</span>
                  <span>手机号码</span>
                  <span>身份证号</span>
                  <span>年龄</span>
                  <span>孩子姓名</span>
                </p>
                <p>
                  <span>孩子性别</span>
                  <span>孩子年龄</span>
                  <span>签名（孩子）</span>
                  <span>签名(家长)</span>
                  <span>障碍类型</span>
                </p>
              </div>
              <div class="bft">
                <p>备选字段</p>
                <div class="bft-tab">
                  <CheckboxGroup v-model="fruit">
                    <Checkbox label="香蕉">序号</Checkbox>
                    <Checkbox label="苹果">姓名</Checkbox>
                    <Checkbox label="西瓜">障碍类型</Checkbox>
                  </CheckboxGroup>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
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
</template>

<script>
import { date1 } from "../../request/datatime";
import { activeManager, activeAddManager } from "../../request/api";
export default {
  data() {
    return {
      status: false,
      modal1: false,
      modal2: false,
      modal3: false,
      fruit: ["苹果"],
      navigation1: {
        head: "活动管理(会员)"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          width: 180,
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
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: "editing",query:{ acitvityId:params.row.acitvityId} });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "2px",
                    marginLeft: "2px",
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: "profile",query:{ acitvityId:params.row.acitvityId} });
                    }
                  }
                },
                "概况"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "2px",
                    marginLeft: "2px",
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: "activity_share" });
                    }
                  }
                },
                "分享"
              ),
              h(
                "Dropdown",
                {
                  props: {
                    transfer: true
                  }
                },
                [
                  h(
                    "a",
                    {
                      style: {
                        color: "green"
                      }
                    },
                    "更多操作"
                  ),
                  h(
                    "DropdownMenu",
                    {
                      slot: "list"
                    },
                    [
                      h(
                        "DropdownItem",
                        {
                          nativeOn: {
                            click: name => {
                              this.show(params.index);
                            }
                          }
                        },
                        "取消"
                      ),
                      h("DropdownItem", "关闭报名"),
                      h("DropdownItem", "活动总结"),
                      h("DropdownItem", "设为新活动模板")
                    ]
                  )
                ]
              )
            ]);
          }
        },
        {
          title: "活动名称",
          key: "activityName",
          align: "center"
        },
        {
          title: "立项名称",
          key: "batchName",
          align: "center"
        },
        {
          title: "项目名称",
          key: "categoryName",
          align: "center"
        },
        {
          title: "活动时间",
          key: "startTimestamp",
          render: (h, params) => {
            return h("div", date1("Y-m-d", params.row.startAt));
          }
        },
        {
          title: "活动类型",
          key: "activityType",
          align: "center"
        },
        {
          title: "状态",
          key: "statusText",
          align: "center"
        },
        {
          title: "活动分类",
          key: "activityClass",
          align: "center"
        },
        {
          title: "会员报名人数",
          key: "memberSignUpCount",
          align: "center",
          render: (h, params) => {
            return h("div", params.row.memberSignUpCount);
          }
        },
        {
          title: "志愿者报名人数",
          key: "volunteerSignUpCount",
          align: "center"
        },
        {
          title: "其他角色报名人数",
          key: "otherSignUpCount",
          align: "center"
        },
        {
          title: "群二维码",
          key: "activityQrCode",
          align: "center",
          render: (h,params) => {
            return h("img", {
              attrs: {
                src: params.row.activityQrCode
              },
              style: {
                width: "4rem",
                height: "4rem"
              }
            });
          }
        },
        {
          title: "上架/下架",
          key: "statue",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.activityQrCode == 1
                },
                on: {
                  input: e => {

                  }
                }
              })
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
      sysType: 1,
      page: 1,
      size: 10,
      dataCount: 0,
      name: "",
      activityStatus: "",
      activityTimestampFrom: "",
      activityTimestampTo: "",
      arr: [],
    };
  },
  components: {},

  computed: {},

  created() {},
  mounted() {
    this.getactiveManager();
  },
  //事件监听
  watch: {
    size: "getactiveManager",
    sort: "getactiveManager"
  },

  methods: {
    //列表和分页
    getactiveManager() {
      let From=''
      let To
      if (this.activityTimestampFrom != "") {
         From= this.activityTimestampFrom.getTime();
      }
      if (this.activityTimestampTo != "") {
        To = this.activityTimestampTo.getTime();
      }
      activeManager({
        page: { page: this.page, size: this.size,sort: "createAt" + " " + this.sort},
        name: this.name,
        sysType: this.sysType,
        activityStatus: this.activityStatus,
        activityTimestampFrom: From,
        activityTimestampTo: To
      }).then(res => {
        this.$refs.selection.selectAll(false);
        console.log(res);
        if (res.code == 200) {

          this.dataCount = res.data.totalSize;
          this.datax = res.data.list;
        }
      });
    },

    //选择内容
    handleSelectionChange(val) {
      console.log(val);
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

    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getactiveManager();
    },

    //查询
    result(e) {
      this.name=e[0].value,
      // this

      this.getactiveManager();
    },

    addaction() {
      this.$router.push({ name: "approval" });
    },
    draft() {
      this.$router.push({ name: "draft" });
    },

    //导出数据
    exportData() {
      if(this.arr.length==0){
        this.arr=this.data
      }
      this.$refs.selection.exportCsv({
        filename:this.navigation1.head,
        columns: this.columns.filter((col, index) => index > 0),
        data: this.arr
      });
    },

    //全选按钮
    chackall() {
      this.status = !this.status;
      this.$refs.selection.selectAll(this.status);
    }
  }
};
</script>
<style lang="scss" scoped>
.integral-header {
  border: 1px solid #eee;
  margin-top: 20px;
}
.integral-header .integral-top {
  padding: 10px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
}
.integral-header .integral-center {
  margin: 0 20px;
}
.integral-header .integral-body {
  padding: 0 20px;
  background: #fff;
  justify-content: flex-start;
  height: 50px;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 200px;
  margin-left: 10px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 40px;
}
// .integral-table {
//   margin-top: 30px;
// }
.table-header {
  padding: 10px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.table-header .table-btn {
  margin-left: 15px;
}
.flex-data {
  display: flex;
}
.integral-table {
  position: relative;
}
.popup {
  background: #ffffff;
  .popup-head {
    height: 20px;
    line-height: 20px;
    margin-bottom: 10px;
    .popup-head-tit {
      display: inline-block;
      // width: 140px;
      border: black solid 1px;
      padding: 0 5px;
      margin-left: 20px;
    }
  }
  .popup-content {
    margin-bottom: 20px;
    p {
      span {
        display: inline-block;
        padding: 0 8px;
        line-height: 20px;
        font-size: 14px;
        border: black 1px dashed;
        margin: 5px;
      }
    }
  }
  .bft {
    .bft-tab {
      padding: 15px;
      background: #e4e4e4;
      height: 150px;
    }
  }
}
ul {
  margin: 10px 30%;
}
li {
  width: 160px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid gray;
  margin-top: -1px;
}
.set {
  position: absolute;
  left: 180px;
  top: 70px;
  cursor: pointer;
}
</style>
