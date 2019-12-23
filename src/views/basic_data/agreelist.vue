<!-- 协议管理(会员)-->
<template>
  <div class="integral">
    <Navigation :labels="navigation1"></Navigation>
    <div class="flex-center-start integral-bodyss">
      <div class="flex-center-start name">
        <span>甲乙方:</span>
        <Input size="large" placeholder="甲乙方名称" class="inpt" v-model.trim="agreementObject" />
      </div>
      <div class="flex-center-start name">
        <span>协议分类:</span>
        <Select v-model="agreementType" class="inpt" style="width: 200px" placeholder="协议类型">
          <Option
            v-for="item in typelist"
            :value="item.dataKey"
            :key="item.dataKey"
          >{{ item.dataValue }}</Option>
        </Select>
      </div>
      <Button class="search" @click="query">查询</Button>
    </div>
    <div class="integral-table">
      <div class="table-header flex-between">
        <div class="flex-center-start paddings">
          <Button class="table-btns" @click="newagree">新建协议</Button>
        </div>
        <div class="flex-center-end">
          <Button class="table-btns" @click="newclass">分类管理</Button>
          <Select
            v-model="size"
            style="width:100px;margin-right:10px"
            placeholder="显示条数"
            class="space"
          >
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="排序方式" class="space" style="width:100px;" v-model="sort">
            <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <div class="min-height">
        <Table border :columns="columns" :data="data"></Table>
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
</template>

<script>
import { formatDate } from "../../request/datatime";
import tophead from "../../components/tophead";
import {
  Agreementpage,
  Agreementdel,
  Agreementadd,
  AgreementList
} from "../../request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "协议管理(会员)"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "甲方",
          key: "partA",
          align: "center",
          width: 360
        },
        {
          title: "乙方",
          key: "partB",
          align: "center",
          width: 360
        },
        {
          title: "协议分类",
          key: "agreementTypeText",
          align: "center",
          width: 280
        },
        {
          title: "所属项目",
          key: "categoryName",
          align: "center",
          width: 280
        },
        {
          title: "协议时间",
          align: "center",
          width: 240,
          render: (h, params) => {
            return h("div", formatDate(params.row.agreementTimestamp));
          }
        },
        {
          title: "相关",
          key: "nameA",
          align: "center",
          width: 600,
          render: (h, params) => {
            return h(
              "div",
              params.row.nameA != null
                ? params.row.nameA
                : "" + "  " + params.row.nameB != null
                ? params.row.nameB
                : "" + "  " + params.row.nameC != null
                ? params.row.nameC
                : ""
            );
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 180,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "red"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "newagree",
                        query: {
                          agreementId: params.row.agreementId
                        }
                      });
                    }
                  }
                },
                "详情"
              )
              // h(
              //   "a",
              //   {
              //     style: {
              //       marginRight: "5px",
              //       marginLeft: "5px",
              //       color: "red"
              //     },
              //     on: {
              //       click: () => {
              //         this.delete(params.row.agreementId)
              //       }
              //     }
              //   },
              //   "删除"
              // )
            ]);
          }
        }
      ],
      data: [],
      page: 1, //每页显示多少数据
      size: 10, //数据条数
      dataCount: 0,
      agreementId: "",
      sysType: 1,
      agreementObject: "",
      agreementType: "",
      top: [
        { name: "甲乙方", type: "input", value: "" },
        {
          name: "协议分类",
          type: "select",
          list: [],
          value: ""
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
      sort: "desc",
      typelist: []
    };
  },

  components: { tophead },

  computed: {},

  created() {
    this.getAgreementList();
    this.getAgreementpage();
  },
  //事件监听
  watch: {
    size: "getAgreementpage",
    sort: "getAgreementpage"
  },

  methods: {
    //协议分页
    getAgreementpage() {
      Agreementpage({
        page: {
          page: this.page,
          size: this.size,
          sort: "createAt" + " " + this.sort
        },
        sysType: this.sysType,
        agreementObject: this.agreementObject,
        agreementType: this.agreementType
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.data = res.data.list;
          this.dataCount = res.data.totalSize;
        }
      });
    },

    //删除协议
    getAgreementdel() {
      Agreementdel({
        agreementId: this.agreementId
      }).then(res => {
        if (res.code == 200) {
          this.getAgreementpage();
          this.$Message.info(res.msg);
        }
        console.log(res);
      });
    },

    //协议分页列表
    getAgreementList() {
      AgreementList({}).then(res => {
        console.log(res);
        if (res.code == 200) {
          res.data.unshift({ dataKey: "0", dataValue: "全部" });
          this.typelist = res.data;
        }
      });
    },

    //查询
    query(e) {
      this.page = 1;
      if (this.agreementType == 0) {
        this.agreementType = "";
      }
      this.getAgreementpage();
    },

    newagree() {
      this.$router.push({ name: "newagree" });
    },
    newclass() {
      this.$router.push({ name: "agreeclass" });
    },
    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getAgreementpage();
    },
    //删除
    delete(e) {
      this.agreementId = e;
      this.getAgreementdel();
    },

    //查看
    See() {
      this.getAgreementpage();
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.integral-bodyss {
  margin-bottom: 20px;
  padding-left: 20px;
  border-radius: 10px;
  display: flex;
  height: 90px;
  background: #ffffff;
  border: 0;
}
.name {
  span {
    display: block;
    width: 100px;
  }
  .inpt {
    margin-right: 30px;
  }
}
</style>
