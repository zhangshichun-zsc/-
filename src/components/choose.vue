<!-- 公用组件--筛选 -->
<template>
  <div class="integral">
    <div class="integral-header">
      <div class="flex-center-between integral-top">
        <div>
          <Icon type="ios-search-outline" />
          <span>筛选查询</span>
        </div>
        <div class="flex-center-end">
          <Button>收起筛选</Button>
          <Button>查询结果</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>组织名称</span>
          <Input size="small" placeholder="组织名称" class="inpt" />
        </div>
        <div class="flex-center-start">
          <span>审核状态</span>
          <Select size="small" class="inpt">
            <Option value="1">1</Option>
            <Option value="1">1</Option>
          </Select>
        </div>
        <div class="flex-center-start" v-if="screen.shows">
          <span>提交日期</span>
          <row>
            <i-col span="12" class="inpt">
              <Date-picker
                type="daterange"
                placement="bottom-end"
                placeholder="选择日期"
                style="width: 200px"
              ></Date-picker>
            </i-col>
          </row>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <Icon type="md-reorder" size="20" />
          <span @click="handleSelectAll(true)">全选</span>
          <Button
            class="table-btn"

          >{{cityList[0].add}}</Button>
        </div>
        <div>
          <!-- <Button
            class="table-btn"
            v-for="(item,index) in cityList"
            :value="item.value"
            :key="index"
          >

            <Icon type="md-arrow-dropdown" />
          </Button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      screen: {
        // first: "查询结果",
        shows: true
      },
      cityList: [
        {
          name: "名称",
          value: "组织名称",
          label: "北京市",
          add: "新增常用报名项"
        },
        {
          name: "有效状态",
          value: "审核状态",
          label: "上海市"
        },
        {
          name: "创建时间",
          value: "提交日期"
        }
      ]
    };
  },
  props: ["listMsg", "index"],
  methods: {}
};
</script>

<style lang="scss" scoped>
.integral-header {
  border: 1px solid #eee;
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
  padding: 20px;
  background: #fff;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 160px;
  margin-left: 15px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 20px;
}
.integral-table {
  // margin-top: 30px;
}
.table-header {
  padding: 10px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.table-header .table-btn {
  margin-left: 15px;
}
.line {
  width: 20px;
  border: 1px solid;
  margin: 12px 5px 0 20px;
}
.flex-center-end {
  button {
    margin-right: 10px;
  }
}
.flex-center-start {
  height: 50px;
}
</style>
