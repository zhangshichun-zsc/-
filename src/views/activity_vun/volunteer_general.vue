<!--活动概况(志愿者)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <p class="words">
        5.12"行走在夏日"游园活动
        <span>
          <a>关联活动反馈表</a>
        </span>
      </p>
      <div>
        <p class="color"></p>
        <div class="apply">
          <div class="sign">
            <div class="icon1">
              <Icon type="md-paper" />
            </div>
            <span>总报名人数</span>
            <span>{{lists.signUpNum}}</span>
          </div>
          <div class="sign">
            <div class="icon1">
              <Icon type="ios-people" />
            </div>
            <span>总签到人数</span>
            <span>{{lists.signInNum}}</span>
          </div>
        </div>
      </div>
      <div>
        <p class="color padd">
          <span>待办事项</span>
        </p>
        <div class="apply">
          <div class="sign" @click="pend">
            <Icon type="document-text"></Icon>
            <span>报名待审核</span>
            <span>{{lists.waitAuditNum}}</span>
          </div>
          <div class="sign" @click="pend">
            <Icon type="folder"></Icon>
            <span>转移待审核</span>
            <span>{{lists.waitTransferNum}}</span>
          </div>
        </div>
      </div>
      <div>
        <p class="color padd">
          <Icon type="ios-search-outline" />
          <span>筛选查询</span>
        </p>
        <div class="inquire">
          <i-input :value.sync="value" placeholder="姓名,手机" style="width: 8rem;"></i-input>
          <span>岗位:</span>
          <Select v-model="model1" style="width:5rem;">
            <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span>报名状态:</span>
          <Select v-model="model2" style="width:5rem;">
            <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <div class="exports">
        <div>
          <Button class="table-btn">
            <Icon type="md-cloud-upload" />导出
          </Button>
          <Dropdown style="margin-left: 0.2rem;width:5rem;">
            <Button><Icon type="md-cloud-upload" />更多操作</Button>
            <DropdownMenu slot="list">
              <DropdownItem>添加参与人员</DropdownItem>
              <DropdownItem>导入参与人员</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown style="margin-left:0.2rem;width:5rem;">
            <Button><Icon type="md-cloud-upload" />发送信息</Button>
            <DropdownMenu slot="list">
              <DropdownItem>发送短信</DropdownItem>
              <DropdownItem>发送微信</DropdownItem>
              <DropdownItem>发送站内信</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <Button class="table-btn">搜索</Button>
      </div>
      <div class="check">
        <p>
          <Checkbox :checked.sync="xuan">全选</Checkbox>
          <span style="font-size: 14px;">已选择</span>
          <span style="font-size: 14px;">0</span>
        </p>
        <Table border :columns="columns" :data="memberlist"></Table>
      </div>
    </div>
    <div class="pages">
      <span>共10页/100条数据</span>
      <Page :total="100" show-elevator></Page>
    </div>
  </div>
</template>

<script>
import {Activitysummary, actMemberlist} from "../../request/api"
export default {
  data() {
    return {
      value: "",
      xuan: false,
      navigation1: {
        head: "活动概况(志愿者)"
      },
      cityList1: [
        {
          value: "Photography",
          label: "摄影岗位"
        },
        {
          value: "Presided",
          label: "主持岗位"
        },
        {
          value: "company",
          label: "陪伴岗位"
        }
      ],
      cityList2: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "loading",
          label: "待审核"
        },
        {
          value: "down",
          label: "已拒绝"
        },
        {
          value: "audit",
          label: "已审核"
        }
      ],
      model1: "Photography",
      model2: "loading",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          align: "center"
        },
        {
          title: "手机号",
          key: "designation",
          align: "center"
        },
        {
          title: "岗位",
          key: "project",
          align: "center"
        },
        {
          title: "报名状态",
          key: "types",
          align: "center"
        },
        {
          title: "签到状态",
          key: "userstype",
          align: "center"
        },
        {
          title: "反馈状态",
          key: "number",
          align: "center"
        },
        {
          title: "详情",
          key: "apply",
          align: "center"
        },
        {
          title: "操作",
          key: "action",

          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "green"
                  },
                  on: {
                    click: () => {
                      this.$Message.info("你点击了第" + params.index + "列");
                    }
                  }
                },
                "活动授权"
              )
            ]);
          }
        }
      ],
      datax: [],
      lists:[],
      memberlist:[]
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {
    pend(){
      this.$router.push({name:'pending'})
    },
    //数据概况
    getActivitysummary(){
      Activitysummary({
        activityId:this.$route.query.acitvityId
      }).then(res => {
        if(res.code == 200){
          this.lists=res.data
          console.log(res);
        }
      })
    },
    getMemberList(){
      actMemberlist({
        activityId:this.$route.query.acitvityId
      }).then(res=>{
        this.memberlist=res.data
      })
    }
  },
  mounted() {
    console.log(this.$route.query.acitvityId)
    this.getActivitysummary()
  },
};
</script>
<style lang="scss" scoped>
.content {
  padding: 0 40px;
  background: #ffffff;
  margin-top: 20px;
}
.words {
  height: 70px;
  line-height: 70px;
  span {
    // color:
    margin-left: 30px;
  }
}
.color {
  background: #e3e3e3;
  height: 40px;
}
.apply {
  height: 150px;
  display: flex;
  justify-content: space-around;
  border: #e3e3e3 1px solid;
  margin-bottom: 20px;
  .sign {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      margin: 5px 0;
    }
  }
}
.padd {
  padding-left: 20px;
  line-height: 40px;
}
.inquire {
  display: flex;
  align-items: center;
  height: 50px;
  border: #e3e3e3 1px solid;
  padding-left: 20px;
  span {
    margin: 0 10px;
  }
}
.exports {
  display: flex;
  justify-content: space-between;
  padding-right: 200px;
  margin: 20px 0;
  .ivu-select-default,button {
    margin-right: 10px;
  }
}
.check {
  p {
    padding-left: 15px;
    margin-bottom: 10px;
    span{
      font-size: 14px;
    }
  }
}
.pages {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background: #ffffff;
  font-size: 14px;
  span{
    margin-right: 10px;
  }
}
  .icon1{
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    border: 2px solid #e4e4e4;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
</style>
