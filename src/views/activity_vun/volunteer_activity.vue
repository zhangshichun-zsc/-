<!--志愿者活动管理(志愿者)-->
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
          <Button>查询结果</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>活动名称:</span>
          <Input size="small" placeholder="活动名称" class="inpt" />
        </div>
        <div class="flex-center-start">
          <span>活动状态:</span>
          <Select v-model="model1" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div class="flex-center-start">
          <span>活动日期:</span>
          <row class="flex-data inpt">
            <i-col>
              <Date-picker type="date" placeholder="选择日期" style="width: 150px"></Date-picker>
            </i-col>
            <span>——</span>
            <i-col>
              <Date-picker
                type="daterange"
                placement="bottom-end"
                placeholder="选择日期"
                style="width: 150px"
              ></Date-picker>
            </i-col>
          </row>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <Checkbox :checked.sync="single1">全选</Checkbox>
          <Button class="table-btn">导出</Button>
          <Button class="table-btn" @click="modal3=true">导出志愿者签到表</Button>
          <Button class="table-btn" @click="draft">草稿箱</Button>
        </div>
        <div>
          <Button class="table-btn" @click="add">添加活动</Button>
          <Button class="table-btn">
            显示条数
            <Icon type="md-arrow-dropdown" />
          </Button>
          <Button class="table-btn">
            排序方式
            <Icon type="md-arrow-dropdown" />
          </Button>
        </div>
      </div>
      <div class="table">
           <Table border :columns="columns" :data="datax"></Table>
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
       <div class="pages">
        <Page :total="100" show-elevator show-total size="small" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal3:false,
      single1: false,
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
          title: "活动名称",
          key: "activity",
          align: "center"
        },
        {
          title: "活动时间",
          key: "approval",
          align: "center"
        },
        {
          title: "活动类型",
          key: "project",
          align: "center"
        },
        {
          title: "状态",
          key: "time",
          align: "center"
        },
        {
          title: "活动分类",
          key: "type",
          align: "center"
        },
        {
          title: "是否显示主办方小站",
          key: "xiao",
          align: "center"
        },
        {
          title: "志愿者报名人数",
          key: "state",
          align: "center"
        },
        {
          title: "上架/下架",
          key: "classify",
          align: "center",
          render: (h,params) =>{
             return h('div', [
              h('i-switch')
            ])
          }
        },
        {
          width: 220,
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  clssName: "action",
                  style: {
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      // this.$router.push({ path: "/organization/editDetail" });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "2px",
                    marginLeft: "2px",
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                     this.$router.push({path:'volunteer_general'})
                    }
                  }
                },
                "概况"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "2px",
                    marginLeft: "2px",
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({path:'activity_share'})
                    }
                  }
                },
                "分享"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "2px",
                    marginLeft: "2px",
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      // this.$Message.info("你点击了第" + params.index + "列");
                    }
                  }
                },
                "复制"
              ),
              h(
                "Dropdown",{
                  props:{
                    transfer:true
                  }
                },[
                  h('a',{
                    style:{
                      color:'green'
                    }
                  },'更多操作'),
                  h('DropdownMenu',{
                    slot:'list'
                  },[
                    h('DropdownItem',{
                      nativeOn:{
                        click:(name)=>{
                          this.show(params.index)
                        }
                      }
                    },'活动下架'),
                    h('DropdownItem','关闭报名')
                  ])
                ]
              )
            ]);
          }
        }
      ],
      datax: [],
      cityList: [
        {
          value: "待发布",
          label: "待发布"
        },
        {
          value: "招募中",
          label: "招募中"
        },
        {
          value: "即将开始",
          label: "即将开始"
        },
        {
          value: "进行中",
          label: "进行中"
        },
        {
          value: "已结束",
          label: "已结束"
        },
      ],
      model1: "",
      fruit:''
    };
  },
  components: {},

  computed: {},

  created() {},

  methods: {
    add(){
      this.$router.push({name:'volunteer_issue'})
    },
    draft(){
      this.$router.push({name:'volunteer_draft'})
    }

  }
};
</script>
<style lang="scss" scoped>
.integral-header {
  border: 1px solid #eee;
  // font-size: 14px;
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
.pages {
  text-align: center;
  margin-top: 10px;
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
.set{
  position: absolute;
  right: 3rem;
  top: 0.7rem
}
</style>
