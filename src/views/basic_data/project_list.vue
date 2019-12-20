<!-- 项目预算列表(会员) -->
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
          <Button @click="query">查询结果</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>名称</span>
          <Input size="large" placeholder="活动名称" class="inpt" v-model="categoryName"/>
        </div>
        <div class="flex-center-start">
          <span>项目名称</span>
          <Select v-model="batchId" style="width:200px" class="sec">
            <Option v-for="item in project" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div class="flex-center-start">
          <span>创建时间</span>
          <Row>
            <Col span="12">
              <DatePicker
                type="date"
                placeholder="请选择日期"
                style="width: 200px;margin-left:10px"
                class="sdate"
                v-model="createTimestamp"
              ></DatePicker>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          全选
          <span>已选择{{arr.length}}</span>
        </div>
      </div>
        <Table ref="selection" border :columns="columns" :data="data" @on-selection-change="handleSelectionChange"></Table>
      <div class="pages">
         <Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          style="margin: auto"
          :page-size="pageSize"
          @on-change="changepages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Activitybudpage } from "../../request/api";
import {formatDate} from '../../request/datatime'
export default {
  data() {
    return {
      navigation1: {
        head: "项目预算列表(会员)"
      },
      project: [

      ],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "项目名称",
          key: "projectname"
        },
        {
          title: "活动名称",
          key: "actionname"
        },
        {
          title: "总预算",
          key: "price",

        },
        {
          title: "剩余预算",
          key: "leaveprice"
        },
        {
          title: "预算来源",
          key: "resource",

        },
        {
          title: "创建时间",
          key: "createtime",
           render: (h, params) => {
            return h("div", formatDate(params.row.createTimestamp));
          }
        }
      ],
      data: [],
      page: 1,
      size: 10,
      dataCount: 0,
      pageSize: 10,
      arr:[],
      enddata:'',
      createTimestamp:null,
      batchId:null,
      categoryName:null,

    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {
    //基础资料--获取项目分页
    getprojectmanpage() {
      if (this.createTimestamp != "") {
        this.enddata = this.createTimestamp.getTime();
      } else {
      }
      projectmanpage({
        page: { page: this.page, size: this.size },
        sysType: this.sysType,
        categoryName: this.categoryName,
        status: this.batchId,
        createTimestamp: this.enddata
      }).then(res => {
        if (res.code == 200) {
          this.data = res.data.list;
          this.page = res.data.pageNum;
          this.dataCount = res.data.totalSize;
        }
        console.log(res);
      });
    },

    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getOffactivities();
    },

    // 查询结果按钮
    query() {
      this.getprojectmanpage();
    },

    //每条数据单选框的状态
    handleSelectionChange(val) {
      this.arr = val;
      console.log(this.arr);
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true;
      } else {
        this.status = false;
      }
      //选择的数据id
      let arr = [];
      for (let i = 0; i < this.arr.length; i++) {
        arr.push(this.arr[i].informationId);
      }
      this.arr = arr.toString();
      console.log(this.arr);
    },

    ok() {
      this.$Message.info("新增成功");
    },
    cancel() {
      this.$Message.info("新增失败");
    }
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
  margin-left: 15px;
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
.sec {
  margin-left: 10px;
}
</style>
