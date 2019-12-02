<!-- 广告列表(志愿者) -->
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
          <div class="integral-center">
            <Icon type="ios-arrow-down" />
            <span>收起筛选</span>
          </div>
          <Button @click="result">查询结果</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>广告名称</span>
          <Input size="large" placeholder="广告名称" class="inpt" v-model="title" />
        </div>
        <div class="flex-center-start">
          <span>广告位置</span>
          <Select style="width:200px" placeholder="全部" class="inpt" v-model="location">
            <Option
              v-for="item in locations"
              :value="item.dataKey"
              :key="item.dataValue"
            >{{ item.dataValue }}</Option>
          </Select>
        </div>
        <div class="flex-center-start">
          <span>到期时间</span>
          <Select style="width:200px" placeholder="全部" class="inpt" v-model="time">
            <Option v-for="item in timeLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
    </div>

    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div class="flex-center-start">
          <Icon type="md-list" />
          <span>数据列表</span>
        </div>
        <div class="flex-center-end">
          <Button size="small" class="table-btn" @click="add">添加广告</Button>
          <Select v-model="size" style="width:120px" placeholder="显示条数" class="space">
        <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
            <Select placeholder="排序方式" class="space" style="width: 120px;" v-model="sort">
              <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
      </div>
      <Table
        ref="selection"
        border
        :columns="columns"
        :data="data"
        @on-selection-change="tablechange"
      ></Table>

      <div class="pages flex-center-between">
        <div class="batch">
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status">全选</Checkbox>
          </Button>
          <Select placeholder="批量操作" style="width: 150px" v-model="batch">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px" @click="batches()">确定</Button>
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
  </div>
</template>

<script>
import { formatDate } from "../../request/datatime";
import {
  AdvertisingList,
  AdvertisingDetails,
  AdvertisingBatch,
  AdvertisingPage
} from "../../request/api";
export default {
  data() {
    return {
      model1: "",
      locations: [],
      timeLists: [
        {
          value: "1",
          label: "一天内",
          time: "86400001"
        },
        {
          value: "2",
          label: "三天内",
          time: "259200001"
        },
        {
          value: "3",
          label: "一周内",
          time: "604700000"
        }
      ],

      navigation1: {
        head: "广告列表(志愿者)"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "广告名称",
          key: "title",
          align: "center"
        },
        {
          title: "广告位置",
          key: "locationText",
          align: "center"
        },
        {
          title: "广告图片",
          key: "picUrl",
          align: "center",
          render: (h,params) => {
            return h("img", {
              attrs: {
                src: params.row.picUrl
              },
              style: {
                width: "4rem",
                height: "4rem"
              }
            });
          }
        },
        {
          title: "时间",
          key: "time",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("p", "开始时间:" + formatDate(params.row.startAt)),
              h("p", "到期时间:" + formatDate(params.row.endAt))
            ]);
          }
        },
        {
          title: "上线",
          key: "online",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.status == 1
                },
                on: {
                  input: e => {
                    if (e == false) {
                      this.remove(params.row.contentId, 2);
                    } else if (e == true) {
                      this.remove(params.row.contentId, 3);
                    }
                  }
                }
              })
            ]);
          }
        },
        {
          title: "点击次数",
          key: "clickCount",
          align: "center"
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
                    color: "#097276"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "vp_add",
                        query: {
                          contentId: params.row.contentId
                        }
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
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "blue"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.contentId, 4);
                    }
                  }
                },
                "置顶"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "red"
                  },
                  on: {
                    click: () => {
                      console.log(params.row.contentId);
                      this.remove(params.row.contentId, 1);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [],
      batchList: [
        { value: "1", label: "删除" },
        { value: "2", label: "上线" },
        { value: "3", label: "下线" },
        { value: "4", label: "置顶" },
        { value: "5", label: "取消置顶" }
      ],
       Article: [{ value: 10,label: 10 },{ value: 15,label: 15 },{ value: 20,label: 20 }],
      sorting: [{ value: "asc", label: "正序" },{ value: "desc", label: "倒序" }],
      sort:"asc",
      page: 1,
      size: 10,
      dataCount: 0,
      title: "",
      sysType: 2,
      location: "",
      endTimeStamp: "",
      time: "",
      status: false,
      arr: [],
      batch: null
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {

    add() {
      this.$router.push({ name: "vun_add" });
    },

    //列表
    getAdvertisingList() {
      AdvertisingList({
        sysType:2

      }).then(res => {
        if (res.code == 200) {
          this.locations = res.data;
        }
        console.log(res);
      });
    },
    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getAddressList();
    },
    //列表数据
    getAdvertisingPage(e) {
      if (this.time == 1) {
        this.endTimeStamp = 86400001 + new Date().getTime();
      } else if (this.time == 2) {
        this.endTimeStamp = 259200001 + new Date().getTime();
      } else if (this.time == 3) {
        this.endTimeStamp = 604700000 + new Date().getTime();
      }
      console.log(
        this.page,
        this.title,
        this.sysType,
        this.location,
        this.endTimeStamp
      );
      AdvertisingPage({
        page: { page: this.page, size: this.size },
        title: this.title,
        sysType: this.sysType,
        location: this.location,
        endTimeStamp: this.endTimeStamp
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.data = res.data.list;
          this.dataCount = res.data.totalSize;
          if (e == 1) {
          } else if (e == 2) {
            this.$Message.info("操作成功");
          } else if (e == 3) {
            this.$Message.info("查询成功");
          } else {
          }
          // this.$Message.info("操作成功");
        }
      });
    },
    //批量操作接口
    getAdvertisingBatch() {
      AdvertisingBatch({
        contentIds: this.arr,
        adContentOprType: this.batch
      }).then(res => {
        if (res.code == 200) {
          this.getAdvertisingPage(2);
        }
        console.log(res);
      });
    },


    // 删除按钮
    remove(id, startid) {
      this.arr = id;
      this.batch = startid;
      this.getAdvertisingBatch(2);
    },
    //每条数据单选框的状态
    tablechange(selection) {
      this.arr = selection;
      if (this.arr.length == this.dataCount&&this.dataCount!=0||this.arr.length==this.size) {
        this.status = true;
      } else {
        this.status = false;
      }
    },

    //全选按钮
    chackall() {
      this.status = !this.status;
      console.log(this.status, this.$refs.selection);
      this.$refs.selection.selectAll(this.status);
    },

     //批量操作
    batches() {
      if (this.arr== "") {
        this.$Message.error("至少选择一个");
      } else if (this.batch == "") {
        this.$Message.error("请选择操作类型");
      } else {
        this.arr = this.arr
          .map(item => {
            return item.contentId;
          })
          .toString();
        this.getAdvertisingBatch();
        this.status = false;
      }
    },



    //查询
    result() {
      this.getAdvertisingPage(3);
    }
  },
    //事件监听
  watch:{
    size:'getAdvertisingPage',
    sort:'getAdvertisingPage'

  },
  mounted() {
    this.getAdvertisingList();
    this.getAdvertisingPage();
  }
};
</script>
<style lang="scss" scoped>
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  padding: 15px 20px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
}
.integral-header .integral-center {
  margin: 0 20px;
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
  padding: 5px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.table-header .table-btn {
  margin-right: 15px;
}
.integral-table .pages {
  padding: 5px 20px;
  margin-top: 50px;
  background: #fff;
}
.pages {
  text-align: center;
}
.ipt {
  margin-left: 10px;
}
.sdate {
  margin-left: 15px;
}
</style>
