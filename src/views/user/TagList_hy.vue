<!--标签列表(会员)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="basis">
      <div class="content">
        <div class="title bk-szy flex-center-between">
          <p>
            <Icon type="ios-list" />
            <span>数据列表</span>
          </p>
          <Button @click="modal1 = true">添加</Button>
        </div>
        <Modal width="850" v-model="modal1" title="添加标签类型" @on-ok="ok" @on-cancel="cancel">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="180">
            <FormItem label="标签名称：" prop="TagName">
              <Input v-model="name" style="width: 300px;"></Input>
            </FormItem>
            <FormItem label="自动打标签条件：">
              <div class="flex-center-start">
                <p style="width: 100px;text-align: center;">用户分类</p>
                <Select v-model="sysId" style="width: 200px;">
                  <Option
                    v-for="item in typelist"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </div>
              <div class="flex-center-start">
                <p style="width: 100px;text-align: center;">类型</p>
                <Select v-model="adds[0].ruleType" style="width: 150px;margin-right:10px">
                  <Option
                    v-for="item in cityList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
                <Select v-model="adds[0].compareType" style="width: 100px;">
                  <Option
                    v-for="item in cityList"
                    :value="item.value1"
                    :key="item.value1"
                  >{{ item.label1 }}</Option>
                </Select>
                <Input
                  type="text"
                  style="width: 50px;margin-left:10px"
                  v-model="adds[0].requireCondition"
                ></Input>
              </div>
              <div class="flex-center-start" v-if="a">
                <p style="width: 100px;text-align: center;"></p>
                <Select v-model="adds[1].ruleType" style="width: 150px;margin-right:10px">
                  <Option
                    v-for="item in cityList2"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
                <Select v-model="adds[1].compareType" style="width: 100px;">
                  <Option
                    v-for="item in cityList2"
                    :value="item.value1"
                    :key="item.value1"
                  >{{ item.label1 }}</Option>
                </Select>
                <Input
                  type="text"
                  style="width: 50px;margin-left:10px"
                  v-model="adds[1].requireCondition"
                ></Input>
              </div>
              <div
                v-if="b"
                style="width:280px;height:24px;margin:10px 0 0 100px;border:1px solid #ccc;text-align: center;line-height:24px; border-style: dashed;cursor:pointer"
                @click="Show"
              >添加条件</div>
              <div class="flex-start">
                <p style="width: 100px;text-align: center;">时间范围</p>
                <RadioGroup v-model="timeType" style="display: inline-grid;">
                  <Radio label="0">
                    <span>应用于所有历史记录</span>
                  </Radio>
                  <Radio label="1">
                    <span>应用于所选时间段</span>
                    <DatePicker
                      type="date"
                      placeholder="开始时间"
                      v-model="startAt"
                      style="width: 150px"
                    ></DatePicker>
                    <DatePicker type="date" placeholder="结束时间" v-model="endAt" style="width: 150px"></DatePicker>
                  </Radio>
                </RadioGroup>
              </div>
            </FormItem>
          </Form>
        </Modal>
        <Table
          ref="selection"
          border
          :columns="columns"
          :data="listMsg"
          @on-selection-change="tablechange"
        ></Table>
        <div class="pages bk-zxy flex-center-between">
          <div>
            <Button @click.stop="chackall()" style="border:0px;">
              <Checkbox v-model="status">全选</Checkbox>
            </Button>
            <Select placeholder="批量操作" style="width: 150px">
              <Option
                v-for="item in batchList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
            <Button class="space" @click="batches()">确定</Button>
          </div>
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
  </div>
</template>

<script>
import { date1 } from "../../request/datatime.js";
import {
  Labelpage,
  Labeldel,
  Labeladd,
  Labelmodify,
  Labeldetails
} from "../../request/api";
export default {
  inject: ["reload"],
  data() {
    return {
      navigation1: {
        head: "标签列表(会员)"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "标签名称",
          key: "name",
          align: "center"
        },
        {
          title: "人数",
          key: "count",
          align: "center"
        },
        {
          title: "自动打标签条件",
          key: "getCondition",
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
                  clssName: "action",
                  style: {
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.modify(params.row.labelId);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.del(params.row.labelId);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      modal1: false,
      formValidate: {
        TagName: ""
      },
      ruleValidate: {
        TagName: [
          // { required: true, message: "标签名称不能为空", trigger: "blur" }
        ]
      },
      cityList: [
        { value: "1", label: "活动参与数", value1: "3", label1: "大于" },
        { value: "0", label: "服务时长", value1: "0", label1: "小于" }
      ],
      cityList2: [
        { value: "1", label: "活动参与数", value1: "3", label1: "大于" },
        { value: "0", label: "服务时长", value1: "0", label1: "小于" }
      ],
      typelist: [{ value: 1, label: "志愿者" }, { value: 2, label: "受益方" }],
      batchList: [{ value: "1", label: "删除" }],
      listMsg: [],
      a: false,
      b: true,
      isShow: false,
      page: 1,
      size: 10,
      pageSize: 10,
      dataCount: 0,
      status: false,
      batch: "",
      sysType: 1,
      arr: [],
      sysId: "",
      name: "",
      adds: [
        {
          ruleType: "",
          compareType: "",
          requireCondition: ""
        },
        {
          ruleType: "",
          compareType: "",
          requireCondition: ""
        }
      ],
      adds1: [],
      timeType: null,
      startAt: null,
      endAt: null,
      data1: null,
      data2: null,
      labelId: null,
      obj: [],
    };
  },
  mounted() {
    this.getLabelpage();
  },
  methods: {
    // 标签管理--标签分页
    getLabelpage() {
      Labelpage({
        page: { page: this.page, size: this.size },
        sysType: this.sysType
      }).then(res => {
        if (res.code == 200) {
          this.listMsg = res.data.list;
          this.page = res.data.pageNum;
          this.dataCount = res.data.totalSize;
        }
        console.log(res);
      });
    },

    //标签管理--删除标签
    getLabeldel() {
      Labeldel({
        labelIds: this.arr
      }).then(res => {
        if (res.code == 200) {
          this.$refs.selection.selectAll(false);
          this.$Message.info("删除成功");
          this.reload();
        }
        console.log(res);
      });
    },
    //标签管理--添加新标签
    getLabeladd() {
      if (this.timeType == 1) {
        this.data1 = this.startAt.getTime();
        this.data2 = this.endAt.getTime();
      } else {
        this.startAt = "";
        this.endAt = "";
      }
      if (this.adds[1].ruleType != "") {
        this.obj = this.adds;
        console.log(this.obj,this.adds,1)
      } else {
        let arr = []
        arr.push(this.adds[1])
        this.obj=arr
        console.log(arr,2)
      }
      Labeladd({
        name: this.name,
        sysId: this.sysId,
        timeType: this.timeType,
        startAt: this.data1,
        endAt: this.data2,
        labelRules: this.obj
      }).then(res => {
        if (res.code == 200) {
          this.reload()
        }
        console.log(res);
      });
    },
    //编辑
    modify(e) {
      this.modal1 = true;
      this.labelId = e;
      this.getLabeldetails();
    },
    //详情
    getLabeldetails() {
      Labeldetails({
        labelId: this.labelId
      }).then(res => {
        if (res.code == 200) {
          let lists = res.data;
          this.sysId = lists.sysId;
          this.name = lists.name;
          console.log(typeof(this.timeType),typeof(lists.timeType))
          this.timeType = lists.timeType;
          if (this.timeType == 1) {
            this.startAt = date1("Y-m-d", lists.startAt);
            this.endAt = date1("Y-m-d", lists.endAt);
          }
          if (lists.labelRules.length == 2) {
            this.a = true;
            this.b = false;
            this.adds = lists.labelRules;
          } else {
            this.adds[0] = lists.labelRules[0];
            console.log(this.adds[0])
            console.log(typeof(this.adds[0].ruleType))
          }
        }
        console.log(res);
      });
    },

    //修改
    getLabelmodify() {
      if (this.adds[1].ruleType != "") {
        this.obj = this.adds;
        console.log(this.adds);
      } else {
        this.obj = this.adds[0];
      }
      Labelmodify({
        labelId: this.labelId,
        name: this.name,
        sysId: this.sysId,
        timeType: this.timeType,
        startAt: this.data1,
        endAt: this.data2,
        labelRules: this.obj
      }).then(res => {
        console.log(res);
      });
    },

    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getLabelpage();
    },

    //每条数据单选框的状态
    tablechange(selection) {
      this.arr = selection;
      console.log(this.arr);
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true;
      } else {
        this.status = false;
      }
      let arr = [];
      for (let i = 0; i < this.arr.length; i++) {
        arr.push(this.arr[i].labelId);
      }
      this.arr = arr.toString();
      console.log(this.arr);
    },

    //批量删除
    batches() {
      this.getLabeldel();
    },

    //全选按钮
    chackall() {
      console.log(this.status)
      this.status = !this.status;
      this.$refs.selection.selectAll(this.status);
    },

    //删除
    del(e) {
      this.arr = e;
      this.getLabeldel();
    },
    // 确定
    ok() {
      console.log(this.labelId);
      if (this.labelId != "") {
        this.getLabelmodify();
      } else {
        this.getLabeladd();
      }
    },
    cancel() {

      this.$Message.info("Clicked cancel");
    },
    //显示
    Show() {
      this.a = true;
      this.b = false;
    }
  }
};
</script>

<style scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
  border: 1px solid #e4e4e4;
}
.basis {
  margin: 0.5rem;
}
.bk-szy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
}
.title {
  background-color: #f3f3f3;
  padding: 0.2rem 0.5rem;
}
.bk-zxy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
}
.pages {
  padding: 0.2rem;
}
.space {
  margin: 0 0.2rem;
}
.flex-center-start {
  margin-bottom: 10px;
}
</style>
