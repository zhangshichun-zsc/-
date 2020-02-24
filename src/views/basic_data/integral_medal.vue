<!-- 勋章管理(会员) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>组织:</span>
          <Input size="large" placeholder="请输入名称" :maxlength="30" class="inpt" v-model="orgName" />
        </div>
        <div class="flex-center-start">
          <span>创建时间段:</span>
          <DatePicker
            class="inpt"
            style="width: 180px"
            type="date"
            @on-change="startTimeChange"
            placeholder="请选择开始时间"
            v-model="startAt"
          ></DatePicker>
          <span class="po">~</span>
          <DatePicker
            style="width: 180px"
            type="date"
            @on-change="endTimeChange"
            placeholder="请选择结束时间"
            v-model="endAt"
          ></DatePicker>
        </div>
        <!-- <div class="flex-center-start">
          <span>创建时间</span>
          <Row>
            <DatePicker
              :open="open"
              confirm
              type="daterange"
              @on-change="handleChange"
              @on-ok="successOk"
            >
              <a href="javascript:void(0)" @click="open = true">
                <Icon type="ios-calendar-outline"></Icon>
                <template>{{ time }}</template>
              </a>
            </DatePicker>
          </Row>
        </div>-->
        <div class="flex-center-start">
          <Button class="search" @click="query()">查询</Button>
        </div>
        <div class="flex-center-end">
          <Modal v-model="modal1" title="新增勋章" class="img" class-name="vertical-center-modal">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <FormItem label="勋章图片" prop="img">
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                  <img src alt />
                </Upload>
              </FormItem>
              <FormItem label="勋章名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入勋章名称" />
              </FormItem>
              <FormItem label="活动规则" prop="rules">
                <Input v-model="formValidate.rules" placeholder="请输入规则" />
              </FormItem>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-between">
        <div class="flex-center-start">
          <Button class="table-btns" @click="modal1 = true">新增勋章</Button>
        </div>
        <div class="flex-center-end">
          <Select v-model="size" class="inp" placeholder="显示条数">
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="排序方式"  class="inp" v-model="sort">
            <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <div class="min-height">
        <Table border :columns="columns" :data="data"></Table>
      </div>
      <div class="pages">
        <Page
          :current='page'
          :total="sumSize"
          show-elevator
          show-total
          size="small"
          style="margin: auto"
          :page-size="size"
          @on-change="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigation1: {
        head: "勋章管理(会员)"
      },
      formValidate: {
        name: null,
        rules: null
      },
      ruleValidate: {
        name: [
          { required: true, message: "模板名称不能为空", trigger: "blur" }
        ],
        rules: [
          { required: true, message: "有效日期不能为空", trigger: "blur" }
        ]
      },

      modal1: false,
      orgName: null,

      columns: [],
      data: [],
      size: 10,
      sort: "create_at desc",
      Article: [
        { value: 10, label: 10 },
        { value: 15, label: 15 },
        { value: 20, label: 20 }
      ],
      sorting: [
        { value: "create_at asc", label: "正序" },
        { value: "create_at desc", label: "倒序" }
      ],

      sumSize: 0,
      page: 1,
      loading: false
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {
    query() {
      if (this.startAt && this.endAt) {
        if (this.startAt <= this.endAt) {
        } else {
          this.startAt = "";
          this.endAt = "";
          this.$Message.error("时间选择错误请重新选择");
          return;
        }
      }
      this.page = 1;
      this.getList(this.args);
    },

    startTimeChange(e) {
      if (e) {
        this.startAt = e + " 00:00:00";
      } else {
        this.startAt = e;
      }
    },

    endTimeChange(e) {
      if (e) {
        this.endAt = e + " 23:59:59";
      } else {
        this.endAt = e;
      }
    },

    changePage(e) {
      this.page = e;
      this.getList(this.args);
    }
  }
};
</script>
<style lang="scss" scoped>
.integral-header .integral-body {
  margin-bottom: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 200px;
  margin-left: 15px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 20px;
}
.po {
  padding: 0 10px;
}
.inp{
  width: 100px;
}
</style>
