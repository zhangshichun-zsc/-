<!--活动反馈列表(会员)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="wapper">
      <div class="flex-between header">
        <div class="con bk inp flex-center-start">
          <p>
            <span>活动名称:</span>&nbsp;
            <Input
              placeholder="活动名称"
              style="width: 8rem"
              v-model="querys.activityName"
            />
          </p>
          <p>
            <span>活动分类:</span>&nbsp;
            <Select
              style="width:8rem;"
              v-model="querys.categoryId"
              placement="top"
            >
              <Option :value="''">全部</Option>
              <Option
                v-for="(item, index) in OptionsList"
                :value="item.categoryId + ''"
                :key="index"
                >{{ item.name }}</Option
              >
            </Select>
          </p>
          <a class="queryBtn" @click="query">查询</a>
        </div>
      </div>
      <div class="content">
        <div class="con-top bk-szy flex-center-start">
          <p>
            <Icon type="ios-list" size="30" />
            <span>数据列表</span>
          </p>
          <div class="flex-center-end">
            <Select
              style="width:120px; margin-right:10px"
              placeholder="显示条数"
              @on-change="changeNum"
              v-model="size"
            >
              <Option
                :value="item"
                v-for="(item, index) in numList"
                :key="index"
                >{{ item }}</Option
              >
            </Select>
            <Select
              style="width:120px"
              placeholder="排序方式"
              @on-change="changeSort"
              v-model="sort"
            >
              <Option value="create_at desc">升序</Option>
              <Option value="create_at asc">降序</Option>
            </Select>
          </div>
        </div>
        <div class="con">
          <Table
            ref="selection"
            border
            :columns="columns"
            :data="data"
            @on-selection-change="tablechange"
          ></Table>
        </div>
        <div class="pages">
          <div class="batch">
             <Checkbox :value="isALL"  @on-change='setALL'>全选</Checkbox>
           
          </div>
          <Page
          :current.sync='page'
            :total="dataCount"
            show-elevator
            show-total
            size="small"
            :page-size="size"
            @on-change="changepages"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/request/datatime";
import { Activitypage, Activitybatch, getTypeFeed } from "@/request/api";
import { filterNull } from "@/libs/utils";
export default {
  data() {
    return {
      navigation1: {
        head: "活动反馈列表(会员)"
      },
      OptionsList: [
        { value: "", label: "全部" },
        { value: "ProductEvaluation", label: "商品评价" },
        { value: "topics", label: "话题内容" },
        { value: "UserComments", label: "用户评论" }
      ],
      data: [],
      page: 1, //每页显示多少数据
      size: 10, //数据条数
      dataCount: 0,
      sysType: 1,
      activityName: "",
      categoryId: null,
      arr: [],
      batch: null,
      isALL: false,
      columns: [
        {
          type: "selection",
          width: 100,
          align: "center"
        },
        {
          title: "活动名称",
          key: "activityName",
          align: "center",
          width: 600,
          ellipsis: true,
          tooltip: true
        },
        {
          title: "活动分类",
          key: "typeName",
          align: "center",
          width: 300
        },
        {
          title: "反馈人数",
          key: "feedbackNum",
          width: 180,
          align: "center"
        },
        {
          title: "活动时间",
          key: "activityTimestamp",
          width: 280,
          align: "center",
          render: (h, params) => {
            return h("div", [h("p", params.row.activityTimestamp)]);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    marginRight: "5px",
                    color: "#FF565A"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "ActivityFeedbackDetails_hy",
                        query: {
                          activityId: params.row.activityId,
                          name: params.row.activityName,
                          num: params.row.feedbackNum
                        }
                      });
                    }
                  }
                },
                "反馈统计"
              ),
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    marginRight: "5px",
                    color: "#FF565A"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "ActivityFeedback",
                        query: {
                          activityId: params.row.activityId,
                          formURL: this.$route.name
                        }
                      });
                    }
                  }
                },
                "查看"
              )
              // h(
              //   "a",
              //   {
              //     style: {
              //       color: "green"
              //     },
              //     on: {
              //       click: () => {
              //         this.remove(params.row.activityId);
              //       }
              //     }
              //   },
              //   "删除"
              // )
            ]);
          }
        }
      ],
      numList: [10, 15, 20],
      sort: "create_at desc",
      // batchList: [{ value: "1", label: "删除" }],
      modalView: false,
      FeedbackDate: {
        FeedbackIntroduction:
          " 恭喜您已成功参与活动！为了了解您的活动感受，进一步做好今后的活动工作，我们特进行此活动反馈，以便根据您的意见与建议，更加科学地、有针对性地改进课程，更好地满足您的需求。",
        FeedbackSuggestions: "希望此类活动更多些"
      },
      choose1: "choose-A",
      choose2: "choose-C",
      querys: {
        activityName: "",
        categoryId: ""
      },
      userId: null
    };
  },
  created() {
    this.userId = this.$store.state.userId;
    this.getType();
  },
  methods: {
    getType() {
      getTypeFeed({ sysId: 1 }).then(res => {
        if (res.code == 200) {
          this.OptionsList = res.data;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    query() {
      this.page = 1;
      this.activityName = this.querys.activityName;
      this.categoryId = this.querys.categoryId;
      this.$Message.success("查询成功");
      this.getActivitypage();
    },
    changeNum(e) {
      this.size = e;
      this.page = 1;
      this.getActivitypage();
    },
    changeSort(e) {
      this.sort = e;

      this.page = 1;
      this.getActivitypage();
    },
    ok() {
      this.$Message.info("添加成功");
    },
    cancel() {
      this.$Message.info("已取消");
    },
    getActivitypage() {
      Activitypage(
        filterNull({
          activityName: this.activityName,
          categoryId: this.categoryId,
          page: { page: this.page, size: this.size, sort: this.sort },
          sysType: this.sysType,
          userId: this.userId
        })
      ).then(res => {
        if (res.code == 200) {
          this.data = res.data.list;
          this.dataCount = res.data.totalSize;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },

    //批量操作接口
    // getActivityBatch(){
    //     Activitybatch({
    //      feedbackIds:this.arr,
    //      actFeedbackOprType:this.batch
    //     }).then(res => {
    //     if (res.code == 200) {
    //       this.getActivitypage();
    //     }
    //     console.log(res);
    //   })
    // },

    //分页功能
    changepages(index) {
      this.page = index;
      this.getActivitypage();
    },
    setALL(v){
      this.$refs.selection.selectAll(v);
    },
    //每条数据单选框的状态
    tablechange(selection) {
       if(selection.length == this.data.length){
        this.isALL= true
      }else{
          this.isALL= false
      }

      this.arr = selection;
     
    }

    //批量操作
    // batches() {
    //   if (this.arr.length>0) {
    //     let arr = [];
    //     for (let i = 0; i < this.arr.length; i++) {
    //       arr.push(this.arr[i].activityId);
    //     }
    //     this.arr = arr.toString();
    //      this.getActivityBatch();
    //   this.status = false;
    //   } else {
    //     let arr = [];
    //     for (let i = 0; i < this.arr.length; i++) {
    //       arr.push(this.data[i].activityId);
    //     }
    //     this.arr = arr.toString();
    //     console.log(this.arr);
    //   }
    // },

    // 删除按钮
    // remove(id) {
    //   // console.log(startid);
    //   this.arr = id;
    //   this.batch=1
    //   this.getActivityBatch(1);
    // },
  },

  mounted() {
    this.getActivitypage();
  }
};
</script>
<style lang="scss" scoped>
.wapper {
  .header {
    background: #fff;
    padding: 10px 10px;
    margin-bottom: 20px;
    box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
    border-radius: 12px;
  }
}
.con-top {
  justify-content: space-between;
  padding: 0.2rem 1rem;
}

.con p {
  margin-right: 3rem;
}
.inp {
  display: flex;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
}
.Pack,
.content button {
  margin-right: 1rem;
}
.pages {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
}

.content {
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
  padding: 5px;
}
</style>
