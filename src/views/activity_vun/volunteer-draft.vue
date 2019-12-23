<!--活动管理(会员)-->
<template>
  <div class="integral">
    <Tophead :navigation1=navigation1 :top=top></Tophead>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <Checkbox :checked.sync="single1">全选</Checkbox>
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
          <Button class="table-btn">草稿箱</Button>
        </div>
        <div>
          <Button class="table-btn" @click="addaction">添加活动</Button>
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
        <Table
          ref="selection"
          border
          :columns="columns"
          :data="datax"
          @on-selection-change="handleSelectionChange"
        ></Table>
        <div class="set">
          <Icon type="ios-settings-outline" @click="modal1 = true"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDraft } from "../../request/api"
export default {
  data() {
    return {
      single1: false,
      modal1: false,
      fruit: ["苹果"],
      navigation1: {
        head: "草稿箱(志愿者)"
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
          title: "提交时间",
          key: "time",
          align: "center"
        },
        {
          title: "活动类型",
          key: "type",
          align: "center"
        },
        {
          width: 200,
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
                    cursor: "pointer",
                    marginRight:"10px"
                  },
                  on: {
                    click: () => {
                    //   this.$router.push({ path: "editing" });
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
                    //   this.$router.push({ path: "profile" });
                    }
                  }
                },
                "发布"
              )
            ]);
          }
        }
      ],
      datax: [],
      top:[{name:'活动名称',type:'input',value:''},{name:'活动状态',type:'select',list:[],value:''},{name:'活动日期',type:'date',value:''}],
      arrs:'',
      page: 1,
      size: 1
    };
  },
  components: {},

  computed: {},

  created() {
    this.getList()
  },

  methods: {
    getList(){
      getDraft({userId:this.$store.state.userId,status:this.status,page:{page:this.page,size:this.size}}).then(res => {

      })
    },
    handleSelectionChange(){

    },
    addaction(){
      this.$router.push({name:'approval'})
    },
    //导出数据
   exportData(){
    if (this.arrs.length == 0) {
      this.arrs = this.datax
    }
    this.$refs.selection.exportCsv({
      filename: this.navigation1.head,
      columns: this.columns.filter((col, index) => index > 0),
      data: this.datax
    });

  },
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

.popup{
  background: #ffffff;
  .popup-head{
    height: 20px;
    line-height: 20px;
    margin-bottom: 10px;
    .popup-head-tit{
      display: inline-block;
      // width: 140px;
      border: black solid 1px;
      padding: 0 5px;
      margin-left: 20px;
    }
  }
  .popup-content{
    margin-bottom: 20px;
    p{
      span{
        display: inline-block;
        padding: 0 8px;
        line-height: 20px;
        font-size: 14px;
        border: black 1px dashed;
        margin: 5px;
      }
    }
  }
  .bft{
    .bft-tab{
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
  top: 12px;
  right: 50px;
}
</style>
