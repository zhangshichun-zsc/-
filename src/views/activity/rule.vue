<!--活动规则池(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="select">
      <RadioGroup v-model="sysType" @on-change="Singles">
        <Radio label="1">会员</Radio>
        <Radio label="2">
          <span @click="vun">志愿者</span>
        </Radio>
      </RadioGroup>
      <div style="float:right">
        <Select v-model="size" style="width:120px" placeholder="显示条数" class="space">
          <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select placeholder="排序方式" class="space" style="width: 120px;" v-model="sort">
          <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
    </div>
    <div class="content">
      <div class="integral-table">
        <div class="table-header">
          <div>
            <Tabs type="card" v-model="ruleType" @on-click="Single">
              <TabPane label="限制规则" name="1">
                <Table border :columns="columns" :data="data" width="600px"></Table>
              </TabPane>
              <TabPane label="优先规则" name="2">
                <Table border :columns="columns1" :data="data1" width="600px"></Table>
              </TabPane>
            </Tabs>
          </div>
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
  </div>
</template>

<script>
import { date1, formatDate } from "../../request/datatime";
import { Activerule, Activerulepage } from "../../request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "活动规则池(会员)"
      },
      sysType: "1",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "限制名称",
          key: "name",
          align: "center"
        },

        {
          title: "新增时间",
          key: "createAt",
          align: "center",
          render: (h, params) => {
            return h("div", formatDate(params.row.createAt));
          }
        },
        {
          title: "最后修改时间",
          key: "updateAt",
          align: "center",
          render: (h, params) => {
            return h("div", formatDate(params.row.updateAt));
          }
        },
        {
          title: "最后操作人",
          key: "userName",
          align: "center"
        },

        {
          title: "是否启用",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.validFlag == '1'
                },
                on: {
                  input: e => {
                    console.log(e);
                    this.stater(params.row.ruleId, e);
                  }
                }
              })
            ]);
          }
        }
      ],
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "优先条件",
          key: "name",
          align: "center"
        },
        {
          title: "新增时间",
          key: "createAt",
          align: "center",
          render: (h, params) => {
            return h("div", formatDate(params.row.createAt));
          }
        },
        {
          title: "修改时间",
          key: "updateAt",
          align: "center",
          render: (h, params) => {
            return h("div", formatDate(params.row.createAt));
          }
        },
        {
          title: "操作人",
          key: "userName",
          align: "center"
        },

        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.validFlag == '1'
                },
                on: {
                  input: e => {
                    console.log(e);
                    this.stater(params.row.ruleId, e);
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
        { value: "create_at asc", label: "正序" },
        { value: "create_at desc", label: "倒序" }
      ],
      data: [],
      data1: [],
      page: 1,
      size: 10,
      dataCount: 0,
      ruleType: "1",
      ruleOprType: "1",
      sort: "create_at asc"
    };
  },

  components: {},

  computed: {},

  created() {},
  mounted() {
    this.getActiverulepage();
  },
  methods: {
    // 活动规则池--批量操作活动规则
    getActiverule() {
      Activerule({
        ruleIds: this.ruleIds,
        ruleOprType: this.ruleOprType
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info(res.msg);
        }
        console.log(res);
      });
    },
    //活动规则池--获取活动规则分页
    getActiverulepage() {
      let ruletypes=this.ruleType
      if(this.sysType==2){
        ruletypes=Number(this.ruleType)+2
      }

      Activerulepage({
        sysType: this.sysType,
        page: { page: this.page, size: this.size,sort:this.sort },
        ruleType: ruletypes
      }).then(res => {
        if (res.code == 200) {
          if (this.ruleType == 1) {
            this.data = res.data.list;
          } else {
            this.data1 = res.data.list;
          }
          this.dataCount = res.data.totalSize;
        }
        console.log(res);
      });
    },
    //批量操作
    stater(id, e) {
      this.ruleIds = id;
      if (e) {
        this.ruleOprType = 1;
      } else {
        this.ruleOprType = 0;
      }
      this.getActiverule();
    },

    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getActiverulepage();
    },

    Singles(){

      this.getActiverulepage();
    },
    //单选
    Single() {
      this.getActiverulepage();
    },



    //跳转志愿者页面
    vun() {
      // this.$router.push({ name: "volunteer_rule" });
    }
  },
  //事件监听
  watch: {
    size: "getActiverulepage",
    sort: "getActiverulepage"
  }
};
</script>
<style lang="scss" scoped>
.select {
  height: 50px;
  background: #ffffff;
  line-height: 50px;
  padding-left: 30px;
  border: #e4e4e4 1px solid;
}

.content {
  height: 700px;
  .integral-table {
    height: 50px;
    border: #e4e4e4 1px solid;
    margin-top: 10px;
    .table-btn {
      margin: 0 5px;
    }
  }
}
.pages {
  text-align: center;
}
</style>
