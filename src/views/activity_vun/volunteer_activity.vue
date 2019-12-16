<!--志愿者活动管理(会员)-->
<template>
  <div class="integral">
    <Navigation :labels="navigation1"></Navigation>
    <div class="integral-header">
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>活动名称:</span>
          <Input size="small" placeholder="活动名称" class="inpt" v-model="name" />
        </div>
        <div class="flex-center-start">
          <span>活动状态:</span>
          <Input size="small" placeholder="活动状态" style="width:120px;margin-left:10px" v-model="activityStatus" />
        </div>
        <div class="flex-center-start">
          <span>活动日期:</span>
          <Row>
            <Col span="12">
              <Date-picker
                type="date"
                placeholder="选择日期"
                style="width: 150px;margin:0 20px 0 10px"
                v-model="activityTimestampFrom"
              ></Date-picker>
            </Col>
            <Col span="12">
              <Date-picker
                type="date"
                placeholder="选择日期"
                style="width: 150px"
                v-model="activityTimestampTo"
              ></Date-picker>
            </Col>
          </Row>
        </div>
        <div class="flex-center-start">
          <Button class="button-red" @click="result">查询</Button>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-between">
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status">全选</Checkbox>
          </Button>
          <div>
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
            <Button class="table-btn" @click="addaction">添加活动</Button>
          <Select v-model="size" style="width:100px;margin-right:10px" placeholder="显示条数" class="space">
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="排序方式" class="space" style="width: 100px;" v-model="sort">
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
      <Page
        :total="dataCount"
        show-elevator
        show-total
        class="pages"
        size="small"
        style="margin: auto"
        :page-size="size"
        @on-change="changepages"
      />
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/request/datatime";
import { actManager } from "../../request/api";
export default {
  data() {
    return {
      status: false,
      modal1: false,
      modal2: false,
      modal3: false,
      fruit: ["苹果"],
      navigation1: {
        head: "志愿者活动管理(志愿者)"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          width: 260,
          key: "action",
          align: "center",
          renderHeader:(h,params)=>{
            return h('div',[
              h('span','操作'),
              h('Icon',{
                props:{
                  type:'ios-settings-outline'
                },
                style:{
                  marginLeft:'5px'
                },
                on:{
                  click:()=>{
                     this.$Message.info("此功能暂未开放")
                    // this.modal3=true
                  }
                }
              })
            ])
          },
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
                      console.log(params.row.activityId);
                      if (
                        params.row.statusText == 1 ||
                        params.row.statusText == 2 ||
                        params.row.statusText == 3 ||
                        params.row.statusText == 4
                      ) {
                        this.$router.push({
                          name: "volunteer_issue",
                          query: {
                            activityId: params.row.activityId,
                            isEdit: 1,
                            status: params.row.statusText
                          }
                        });
                      } else {
                        this.$Message.warning("该活动状态不可编辑");
                      }
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "10px",
                    marginLeft: "10px",
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "volunteer_general",
                        query: { activityId: params.row.activityId }
                      });
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
              )
              // h(
              //   "Dropdown",
              //   {
              //     props: {
              //       transfer: true
              //     }
              //   },
              //   [
              //     h(
              //       "a",
              //       {
              //         style: {
              //           color: "green"
              //         }
              //       },
              //       "更多操作"
              //     ),
              //     h(
              //       "DropdownMenu",
              //       {
              //         slot: "list"
              //       },
              //       [
              //         h(
              //           "DropdownItem",
              //           {
              //             nativeOn: {
              //               click: name => {
              //                 this.show(params.index);
              //               }
              //             }
              //           },
              //           "取消"
              //         ),
              //         h("DropdownItem", "关闭报名"),
              //         h("DropdownItem", "活动总结"),
              //         h("DropdownItem", "设为新活动模板")
              //       ]
              //     )
              //   ]
              // )
            ]);
          }
        },
        {
          title: "活动名称",
          key: "name",
          align: "center",
          width:300,
        },
        {
          title: "活动时间",
          key: "startTime",
          align:'center',
          width:240,
        },
        {
          title: "活动类型",
          key: "typeName",
          align: "center",
          width:200,
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          width:200,
          render: (h, params) => {
            return h("div", params.row.status==1?"未付款":(params.row.status==2?"待招募":(params.row.status==3?"招募中":(params.row.status==4?"待开始":(params.row.status==5?"进行中":(params.row.status==6?"已结束":(params.row.status==7?"已取消":(params.row.status==8?"草稿箱":(params.row.status==9?"审核不通过":(params.row.status==10?"已下架":(params.row.status==11?"待发布":(params.row.status==12?"模板":"关闭报名"))))))))))) );
          }
        },
        {
          title: "是否显示主办方小站",
          key: "isShowHolder",
          align: "center",
          width:200,
          render: (h, params) => {
            return h("div", params.row.isShowHolder==1?"是":"否");
          }
        },
        {
          title: "志愿者报名人数",
          key: "num",
          align: "center",
          width:200,
        },
        {
          title: "是否上架",
          key: "statue",
          align: "center",
          width:240,
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.activityQrCode == 1
                },
                on: {
                  input: e => {}
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
      status: "1,2,3,4,5,6,7,9,10,11,13"
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
      let From = "";
      let To;
      if (this.activityTimestampFrom != "") {
        From = this.activityTimestampFrom.getTime();
      }
      if (this.activityTimestampTo != "") {
        To = this.activityTimestampTo.getTime();
      }
      actManager({
        // page: { page: this.page, size: this.size,sort: "createAt" + " " + this.sort},
        // name: this.name,
        // sysType: this.sysType,
        // activityStatus: this.activityStatus,
        // activityTimestampFrom: From,
        // activityTimestampTo: To
        name: this.name,
        status: this.status,
        startT: this.From,
        endT: this.To,
        page: {
          page: this.page,
          size: this.size
        }
      }).then(res => {
        this.$refs.selection.selectAll(false);
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
      this.getactiveManager();
    },

    //查询
    result(e) {
      (this.name = e[0].value),
        // this

        this.getactiveManager();
    },

    addaction() {
      this.$router.push({ name: "volunteer_issue" });
    },
    draft() {
      this.$router.push({ name: "draft" });
    },

    //导出数据
    exportData() {
      if (this.arr.length == 0) {
        this.arr = this.data;
      }
      this.$refs.selection.exportCsv({
        filename: this.navigation1.head,
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
.integral-header .integral-top {
  padding: 10px;
  background: white;
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
  width: 160px;
  margin-left: 10px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 40px;
}

.table-header {
  padding: 20px;
  background: white;

}
.table-header .table-btn {
  margin-left: 15px;
}
.flex-data {
  display: flex;
}
.pages {
  text-align: center;
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
.table{
   position: relative;
}

.pages{
  padding:10px 0 20px;
  text-align: center;
  background-color: #fff;
}
</style>
