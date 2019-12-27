<!--活动规则池(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="wapper">
      <div class="select flex-between">
        <RadioGroup v-model="sysType" @on-change="Singles"  size="large">
          <Radio label="1" size="large">会员</Radio>
          <Radio label="2" size="large">
            <span @click="vun">志愿者</span>
          </Radio>
        </RadioGroup>
        <div>
          <Select v-model="size" style="width:150px" placeholder="显示条数" class="space" size="large">
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="排序方式" style="width: 150px;" v-model="sort" size="large">
            <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <div class="content">
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
          width: 80,
          align: "center"
        },
        {
          title: "限制名称",
          key: "name",
          align: "center",
          width: 500,
          ellipsis: true,
          tooltip: true,
        },

        {
          title: "新增时间",
          key: "createAt",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", formatDate(params.row.createAt));
          }
        },
        {
          title: "最后修改时间",
          key: "updateAt",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", formatDate(params.row.updateAt));
          }
        },
        {
          title: "最后操作人",
          key: "userName",
          width: 300,
          align: "center"
        },

        {
          title: "是否启用",
          width: 200,
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
          width: 80,
          align: "center"
        },
        {
          title: "优先条件",
          key: "name",
          width: 500,
          align: "center",
          ellipsis: true,
          tooltip: true,
        },
        {
          title: "新增时间",
          key: "createAt",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", formatDate(params.row.createAt));
          }
        },
        {
          title: "最后修改时间",
          key: "updateAt",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", formatDate(params.row.createAt));
          }
        },
        {
          title: "最后操作人",
          key: "userName",
          width: 300,
          align: "center"
        },

        {
          title: "是否启用",
          width: 200,
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
          this.getActiverulepage()
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
  background: #ffffff;
  padding: 10px 20px;
  margin-bottom: 30px;
  *{
    font-size: 16px;
  }
}
.wapper{
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  .space{
    margin-right: 20px;
  }
}
.pages {
  margin-top: 20px;
  text-align: center;
}
</style>
