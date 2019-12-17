<!--志愿者活动管理(会员)-->

<template>
  <div class="integral">
     <Modal
      v-model="modal4">
      <img :src="showImg" alt="" class="showimg"/>
    </Modal>
    <Navigation :labels="navigation1"></Navigation>
    <div class="integral-header">
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>活动名称:</span>
          <Input size="large" placeholder="活动名称" class="inpt" v-model="name" />
        </div>
        <div class="flex-center-start">
          <span>活动状态:</span>
          <Input size="large" placeholder="活动状态" class="inpt" v-model="activityStatus" />
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
          <Select v-model="size" style="width:100px;margin:0 10px" placeholder="显示条数" class="space">
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
      <Modal v-model="addstate" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                  <span>下架确定</span>
                </p>
                <div style="text-align:center">
                  <p>是否确认下架，下架后无法上架</p>
                </div>
                <div slot="footer">
                  <Button type="error" @click="modalCancel">取消</Button>
                  <Button type="success" @click="modalOkdel">确定</Button>
                </div>
              </Modal>
      <Page
        :total="dataCount"
        show-elevator
        show-total
        size="small"
        class="pages"
        :page-size="size"
        @on-change="changepages"
      />
    </div>

  </div>
</template>

<script>
import { formatDate } from "../../request/datatime";
import {
  activeManager,
  activeAddManager,
  activecancel,
  activeclose,
  activeset,
  activedown
} from "../../request/api";
export default {
  inject: ['reload'],
  data() {
    return {
      status: false,
      modal1: false,
      modal2: false,
      modal3: false,
      modal4:false,
      showImg:'',
      fruit: ["苹果"],
      navigation1: {
        head: "活动管理(会员)"
      },
      columns: [
        {
          type: "selection",
          width: 80,
          align: "center"
        },
        {
          width: 300,
          key: "action",
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
          align: "center",
          render: (h, params) => {
            let signup = "关闭报名";
            if (params.row.statusText == "13") {
              signup = "开启报名";
            }
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
                      this.$router.push({
                        path: "editing",
                        query: { id: params.row.acitvityId }
                      });
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
                        path: "profile",
                        query: { acitvityId: params.row.acitvityId }
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
                    marginRight: "10px",
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
                              this.modal5 = true;
                              this.activityId = params.row.acitvityId;
                            }
                          }
                        },
                        "取消"
                      ),
                      h(
                        "DropdownItem",
                        {
                          nativeOn: {
                            click: name => {

                              if (signup == "关闭报名") {
                                this.types = 1;
                                this.getactiveclose(params.row.acitvityId);
                              } else {
                                this.types = 2;
                                this.getactiveclose(params.row.acitvityId);
                              }
                            }
                          }
                        },
                        signup
                      ),
                      h(
                        "DropdownItem",
                        {
                          nativeOn: {
                            click: name => {
                              let status = this.statelist[Number(params.row.statusText)-1].name
                              if(status=="已结束"){
                                this.$router.push({
                                  name: "summarize",
                                  query: { acitvityId: params.row.acitvityId,activityName:params.row.activityName }
                                });
                              }else{
                                this.$Message.warning("只有已结束的活动才可进行活动总结");
                              }
                            }
                          }
                        },
                        "活动总结"
                      ),
                      h(
                        "DropdownItem",
                        {
                          nativeOn: {
                            click: name => {
                              this.getactiveset(params.row.acitvityId);
                            }
                          }
                        },
                        "设为新活动模板"
                      )
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
          align: "center",
          width:500,
          ellipsis: true,
          tooltip: true,
        },
        {
          title: "立项名称",
          key: "batchName",
          align: "center",
          width: 300,
          ellipsis: true,
          tooltip: true,
        },
        {
          title: "项目名称",
          key: "categoryName",
          align: "center",
          width:250,
        },
        {
          title: "活动时间",
          key: "startTimestamp",
          align: "center",
          width:300,
          render: (h, params) => {
            return h("div", formatDate(params.row.startTimestamp));
          }
        },
        {
          title: "活动类型",
          width:200,
          key: "activityType",
          align: "center"
        },
        {
          title: "状态",
          width:200,
          key: "statusText",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              this.statelist[Number(params.row.statusText)-1].name
            );
          }
        },
        {
          title: "活动分类",
          width:200,
          key: "activityClass",
          align: "center"
        },
        {
          title: "会员报名人数",
          width:180,
          key: "memberSignUpCount",
          align: "center",
        },
        {
          title: "志愿者报名人数",
          width:160,
          key: "volunteerSignUpCount",
          align: "center"
        },
        {
          title: "其他角色报名人数",
          width:180,
          key: "otherSignUpCount",
          align: "center"
        },
        {
          title: "群二维码",
          width: 100,
          key: "activityQrCode",
          align: "center",
          render: (h,params) => {
            return h("Icon", {
              props: {
                type: 'md-images',
              },
              on: {
                click: () => {
                  this.modal4 = true
                  this.showImg = params.row.activityQrCode
                }
              }
            })
          }
        },
        {
          title: "是否上架",
          width:140,
          key: "statue",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.statusText != "10",
                   disabled: params.row.statusText!="10"?false:"disabled"
                },
                'on':{
                  'on-change': e => {
                    if (params.row.statusText == "10") {

                    } else {
                      this.activityId=params.row.acitvityId
                      this.addstate=true
                    }
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
      activeList: [],
      activityId: "",
      text: "",
      types: "",
      statelist: [
        { name: "待审核", value: 1 },
        { name: "待招募", value: 2 },
        { name: "招募中", value: 3 },
        { name: "待开始", value: 4 },
        { name: "进行中", value: 5 },
        { name: "已结束", value: 6 },
        { name: "已取消", value: 7 },
        { name: "草稿箱", value: 8 },
        { name: "审核不通过", value: 9 },
        { name: "下架", value: 10 },
        { name: "待发布", value: 11 },
        { name: "模板", value: 12 },
        { name: "关闭报名", value: 13 }
      ],
       statelists: [
        { name: "待审核", value: 1 },
        { name: "待招募", value: 2 },
        { name: "招募中", value: 3 },
        { name: "待开始", value: 4 },
        { name: "进行中", value: 5 },
        { name: "已结束", value: 6 },
        { name: "已取消", value: 7 },

        { name: "审核不通过", value: 9 },
        { name: "下架", value: 10 },
        { name: "待发布", value: 11 },

        { name: "关闭报名", value: 13 }
      ],
      modal5: false,
      addstate:false
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
      let Fromtime = "";
      let Totime = "";
      if (this.activityTimestampFrom != "") {
        Fromtime = this.activityTimestampFrom.getTime();
      }
      if (this.activityTimestampTo != "") {
        Totime = this.activityTimestampTo.getTime();
      }
      activeManager({
        page: {
          page: this.page,
          size: this.size,
          sort: "createAt" + " " + this.sort
        },
        name: this.name,
        sysType: this.sysType,
        activityStatus: this.activityStatus,
        activityTimestampFrom: Fromtime,
        activityTimestampTo: Totime
      }).then(res => {
        this.$refs.selection.selectAll(false);
        console.log(res);
        if (res.code == 200) {
          this.dataCount = res.data.totalSize;
          this.datax = res.data.list;
        }
      });
    },

    //取消
    getactivecancel() {
      activecancel({
        userId: this.$store.state.userId,
        activityId: this.activityId,
        text: this.text,
        channel: 2
      }).then(res => {
        if (res.code == 200) {
          this.getactiveManager()
          this.$Message.info("取消成功");
        }else{
          this.$Message.error(res.msg)
        }
        console.log(res);
      });
    },
    //关闭
    getactiveclose(ids) {
      activeclose({
        userId: this.$store.state.userId,
        activityId: ids,
        type: this.types,
        channel: 2
      }).then(res => {
         if(res.code==200){
          this.$Message.info('关闭成功')
        }else{
          this.$Message.error(res.msg)
        }
        console.log(res);
      });
    },
    // 设置模板
    getactiveset(ids) {
      activeset({
        activityId: ids
      }).then(res => {
        if(res.code==200){

          this.$Message.info('设置成功')
        }else{
          this.$Message.error(res.msg)
        }
        console.log(res);
      });
    },
    // 活动下架
    getactivedown(ids) {
      ids = Array.of(ids);
      activedown({
        activityId: ids
      }).then(res => {
         if(res.code==200){
           this.addstate=false
          this.getactiveManager()
          this.$Message.info('下架成功')
        }else{
          this.$Message.error(res.msg)
        }
        console.log(res);
      });
    },

    //拒绝理由
    modalOk() {
      this.getactivecancel();
    },
    cancel() {
      this.modal5 = false;
      this.$Message.info("已取消操作");
    },

    //取消
    modalCancel(){
      this.addstate=false
       this.getactiveManager()
    },

    //确定
    modalOkdel(){
      this.getactivedown(this.activityId)
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
    result() {
      // this.name=e[0].value,
      this.getactiveManager();
    },

    addaction() {
      this.$router.push({ name: "approval" });
    },
    draft() {
      this.$router.push({ name: "draft" });
    },
    exportData() {},

    // //导出数据
    // exportData() {
    //   if(this.arr.length==0){
    //     this.arr=this.data
    //   }
    //   this.$refs.selection.exportCsv({
    //     filename:this.navigation1.head,
    //     columns: this.columns.filter((col, index) => index > 0),
    //     data: this.arr
    //   });
    // },

    //全选按钮
    chackall() {
      this.status = !this.status;
      this.$refs.selection.selectAll(this.status);
    }
  }
};
</script>
<style lang="scss" scoped>
.showimg{
    width: 100%;
    height: auto;
}
.integral-header .integral-top {
  padding: 10px;
  background: white;
}
.integral-header .integral-center {
  margin: 0 20px;
}
.integral-header .integral-body {
  padding:  20px;
  background: #fff;
  justify-content: flex-start;
  height: 50px;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 150px;
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
li {
  width: 160px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid gray;
  margin-top: -1px;
}
.pages{
  text-align: center;
  padding: 20px 0;
  background-color: white;
}
</style>
