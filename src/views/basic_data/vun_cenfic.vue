<!-- 证书管理(志愿者) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>组织:</span>
          <Input size="large" placeholder="请输入名称" class="inpt" v-model.trim="args.orgName" />
        </div>
        <div class="flex-center-start">
          <span>创建时间段:</span>
          <XDatePicker
            class="inpt"
            style="width: 180px"
            type="date"
            @on-change="startTimeChange"
            placeholder="请选择开始时间"
            v-model="args.startAt"
          ></XDatePicker>
          <span class="po">~</span>
          <XDatePicker
            style="width: 180px"
            type="date"
            @on-change="endTimeChange"
            placeholder="请选择结束时间"
            v-model="args.endAt"
          ></XDatePicker>
        </div>
        <div class="flex-center-end">
          <Button class="search" @click="query()">查询</Button>
          <Modal v-model="modal1" title="新增证书模板" @on-cancel="cancel">
            <Form ref="formValidate" :model="params" :rules="ruleValidate" :label-width="120">
              <FormItem label="组织" prop="orgId">
                <Select v-model="params.orgId">
                  <Option
                    :value="item.orgId"
                    v-for="(item,index) in volun"
                    :key="index"
                  >{{ item.orgName }}</Option>
                </Select>
              </FormItem>
              <FormItem label="模板名称" prop="title">
                <Input v-model.trim="params.title" :maxlength="30" />
              </FormItem>
              <FormItem label="生效日期" prop="effectiveAt">
                <XDatePicker
                  placement="bottom-end"
                  placeholder="选择日期"
                  style="width: 200px"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  :value="params.effectiveAt"
                  @on-change="changeDate"
                  @on-open-change="isDate($event)"
                  :options="options"
                   :editable='false'
                ></XDatePicker>
              </FormItem>
            </Form>
            <div slot="footer">
              <Button size="large" @click="modal1=false">取消</Button>
              <Button type="error" size="large" @click="success" :loading="loading">确定</Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-between">
        <div class="flex-center-start">
          <Button class="table-btns" @click="modal1 = true">新增证书</Button>
        </div>
        <div class="flex-center-end">
          <Select
            class="inpt sort"
            placeholder="显示条数"
            v-model="size"
            @on-change="changeNum"
          >
            <Option :value="item" v-for="(item,index) in numList" :key="index">{{ item }}</Option>
          </Select>
          <Select
            class="inpt sort"

            placeholder="排序方式"
            v-model="sort"
            @on-change="changeSort"
          >
            <Option value="create_at desc">倒序</Option>
            <Option value="create_at asc">正序</Option>
          </Select>
        </div>
      </div>

      <div class="min-height">
        <Table border :columns="columns" :data="data"></Table>
      </div>
      <div class="pages">
        <Page
          :current.sync='page'
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
import { getBooks, getVolunteer, updateBooks } from "@/request/api";
import { filterNull } from "@/libs/utils";
import XDatePicker from "@/business_components/XDatePicker.vue"
export default {
  data() {
    return {
      open: false,
      time: "请选择时间段",
      navigation1: {
        head: "证书管理(志愿者)"
      },
      params: {
        orgId: "",
        title: "",
        effectiveAt: "",
        orgType: 3,
        sysId: 2
      },
      ruleValidate: {
        orgId: [
          {
            required: true,
            message: "组织不能为空",
            trigger: "change",
            type: "number",
            min: 0
          }
        ],
        title: [
          { required: true, message: "模板名称不能为空", trigger: "blur" }
        ],
        effectiveAt: [
          { required: true, message: "有效日期不能为空" }
        ]
      },
      modal1: false,
      columns: [
        {
          title: "组织",
          key: "orgName",
          width: 600,
          align: "center"
        },
        {
          title: "证书名称",
          key: "title",
          width: 440,
          align: "center"
        },
        {
          title: "生效时间",
          key: "effectiveAt",
          width: 240,
          align: "center"
        },
        {
          title: "失效时间",
          key: "inEffectiveAt",
          width: 240,
          align: "center"
        },
        {
          title: "创建时间",
          key: "createAt",
          width: 240,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 220,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "red",
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let ob = params.row;
                      this.$router.push({
                        name: "vun_prend",
                        query: { certMouldId: ob.certMouldId, show: 0 }
                      });
                    }
                  }
                },
                "预览"
              ),
              params.row.isEdit == 1
                ? h(
                    "a",
                    {
                      clssName: "action",
                      style: {
                        color: "red"
                      },
                      on: {
                        click: () => {
                          let ob = params.row;
                          this.$router.push({
                            name: "vun_prend",
                            query: { certMouldId: ob.certMouldId, show: 1 }
                          });
                        }
                      }
                    },
                    "编辑"
                  )
                : ""
            ]);
          }
        }
      ],
      data: [],
      page: 1,
      size: 10,
      sort: "create_at desc",
      sumSize: 0,
      args: {
        startAt: null,
        endAt: null,
        orgName: null
      },
      volun: [],
      numList: [10, 15, 20],

      options: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      loading: false
    };
  },

  components: {XDatePicker},

  computed: {},
watch:{
  modal1(newValue){
    if(!newValue){
       this.$refs.formValidate.resetFields()
    }
  }
},
  created() {
    this.getList({});
    this.getVoteer();
  },

  methods: {
    getList({ startAt, endAt, orgName }) {
      getBooks(
        filterNull({
          page: { page: this.page, size: this.size, sort: this.sort },
          startAt,
          endAt,
          orgName,
          sysType: "2,3"
        })
      ).then(res => {
        if (res.code == 200) {
          this.sumSize = res.data.totalSize;
          this.data = res.data.list;
          this.page = res.data.pageNum;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    getVoteer() {
      getVolunteer({}).then(res => {
        this.volun = res.data;
      });
    },
    isDate(e){
      if(e) return
      let val = this.params.effectiveAt
      if(new Date(val)<new Date()){
         this.params.effectiveAt = ""
        this.$Message.error("生效时间要早于当前时间")
        return
      }  
    },
    query() {
      if (this.args.startAt && this.args.endAt) {
        if (this.args.startAt <= this.args.endAt) {
        } else {
          this.args.startAt = "";
          this.args.endAt = "";
          this.$Message.error("时间选择错误请重新选择");
        }
      }
      this.page = 1;
      this.getList(this.args);
    },

    startTimeChange(e) {
       if(e){
        this.args.startAt = e+ " 00:00:00";
      }else{
        this.args.startAt = e
      }

    },

    endTimeChange(e) {
       if(e){
        this.args.endAt = e+ " 23:59:59";
      }else{
        this.args.endAt = e
      }

    },
    // handleChange(e) {
    //   let start = e[0];
    //   let end = e[1];
    //   this.time = e[0] + "-" + e[1];
    //   if (start && end) {
    //     if (start === end) {
    //       start = start + " 00:00:00";
    //       end = end + " 23:59:59";
    //     } else {
    //       start = start + " 00:00:00";
    //       end = end + " 00:00:00";
    //     }
    //   }
    //   this.args.startAt = start;
    //   this.args.endAt = end;
    // },

    changePage(e) {
      this.page = e;
      this.getList(this.args);
    },
    success() {
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          this.loading = true;
          updateBooks(this.params).then(res => {
            //防止重复提交
            setTimeout(() => {
              this.loading = false;
            }, 500);
            if (res.code == 200) {
              this.modal1 = false;
              this.$Message.success(res.msg);
              this.getList(this.args);
              this.cancel();
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error("没有填写完整");
        }
      });
    },
    changeDate(e) {
      this.params.effectiveAt = e;
    },
    cancel() {
      this.params.orgId = "";
      this.params.title = "";
      this.params.effectiveAt = "";
    },
    changeNum(e) {
      console.log(e);
      this.size = e;
      this.page = 1;
      this.getList({});
    },
    changeSort(e) {
      this.sort = e;
      this.page = 1;
      this.getList({});
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
.sort{
   width:100px;margin-right:10px;
}
</style>
