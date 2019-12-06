<!--人气推荐(志愿者)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>

    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <span>
            <Icon type="navicon-round" />数据列表
          </span>
           <Button class="table-btn" @click="choice">选择活动</Button>
        </div>
        <div>

          <Modal v-model="modal1" title="选择活动">
            <div class="action">
              <Input placeholder="活动名称搜索" v-model="name" style="width:300px;border-radius:0"></Input>
              <Button style="background:#ccc;border-radius:0 " @click="choice">
                <Icon type="ios-search" size="20" />
              </Button>
            </div>
            <Table
              ref="selection"
              border
              :columns="columns1"
              :data="data"
              @on-selection-change="handleSelectionChange"
            ></Table>
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
            <div slot="footer">
              <Button type="text" size="large" @click="modalOk(0)">取消</Button>
              <Button type="primary" size="large" @click="modalOk(1)">确定</Button>
            </div>
          </Modal>
        </div>
      </div>
      <Table border :columns="columns" :data="datax"></Table>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/request/datatime";
import {
  Popularitylist,
  PopularityChoice,
  Popoperation,
  PopRoof,
  Popdelete
} from "@/request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "人气推荐(志愿者)"
      },
      modal1: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "活动名称",
          key: "name",
          align: "center"
        },
        {
          title: "排序",
          key: "sort",
          align: "center"
        },
        {
          title: "状态",
          key: "apply",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  clssName: "action",
                  style: {
                    color: "green",
                    margin: "5px"
                  }
                },
                this.statlist[params.row.status]
              )
            ]);
          }
        },
        {
          title: "操作",
          key: "rule",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "md-arrow-up"
                },
                style: {
                  cursor: "pointer",
                  marginRight: "5px",
                  fontSize: "18px"
                },
                on: {
                  click: () => {
                    if (params.index == 0) {
                      this.$Message.error("操作错误");
                    } else {
                      this.act1Id=this.datax[(params.index)-1].activityId
                      this.act2Id=params.row.activityId
                      this.getPopRoof();
                    }
                  }
                }
              }),
              h("Icon", {
                props: {
                  type: "md-arrow-down"
                },
                style: {
                  cursor: "pointer",
                  marginRight: "5px",
                  fontSize: "18px"
                },
                on: {
                  click: () => {
                    if (params.index == this.data.length) {
                      this.$Message.error("操作错误");
                    } else {
                      this.act1Id=params.row.activityId
                      this.act2Id=this.datax[(params.index)+1].activityId
                      this.getPopRoof();
                    }
                  }
                }
              }),
              h(
                "span",
                {
                  style: {
                    color: "green"
                  },
                  on: {
                    click: () => {
                       this.getPopdelete(params.row.activityId)
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      columns1: [
        {
          title: "活动名称",
          key: "name",
          align: "center"
        },
        {
          title: "活动日期",
          key: "actiondate",
          align: "center",
          render: (h, params) => {
            return h("div", formatDate(params.row.startAt));
          }
        },
        {
          type: "selection",
          width: 60,
          align: "center"
        }
      ],
      datax: [],
      data: [],
      sysId: 2,
      statlist: [
        "",
        "待审核",
        "待招募",
        "招募中",
        "待开始",
        "进行中",
        "已结束",
        "已取消",
        " 草稿箱",
        "审核不通过",
        "下架",
        "待发布",
        "模板",
        " 关闭报名"
      ],

      page: 1,
      size: 10,
      name: "",
      dataCount: 0,
      arr: [],
      act1Id: "",
      act2Id: ""
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {
    //人气推荐列表
    getPopularitylist() {
      Popularitylist({
        sysId: this.sysId
      }).then(res => {
        if (res.code == 200) {
          this.datax = res.data;
        }else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //选择活动
    getPopularityChoice() {
      PopularityChoice({
        sysId: this.sysId,
        name: this.name,
        page: { page: this.pag, size: this.size }
      }).then(res => {
        if (res.code == 200) {
          this.data = res.data.list;
          this.dataCount = res.data.totalSize;
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //选择活动操作
    getPopoperation() {
      Popoperation({
        sysId: this.sysId,
        ids: this.arr
      }).then(res => {
        if (res.code == 200) {
          this.modal1=false
          this.getPopularitylist()
        } else {

          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //置顶
    getPopRoof() {
      PopRoof({
        act1Id: this.act1Id,
        act2Id: this.act2Id
      }).then(res => {
        if (res.code == 200) {
          this.getPopularitylist()
          this.$Message.info("操作成功");
        }else{
          this.$Message.error(res.msg);

        }
        console.log(res);
      });
    },

    //删除
    getPopdelete(id){
      Popdelete({
        activityId:id
      }).then(res=>{
        if(res.code==200){
          this.$Message.info("删除成功")
          this.getPopularitylist()
        }else{
          this.$Message.error(res.msg)
        }
        console.log(res)
      })
    },

    modalOk(e){
      if(e==0){
        this.modal1=false
      }else if(e==1){
        this.getPopoperation()
      }
    },

    handleSelectionChange(val) {
      this.arr = val.map(item => {
        return item.activityId;
      });
      console.log(this.arr);
    },

    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getPopularityChoice();
    },

    //弹出框
    choice() {
       this.page=1

      this.modal1 = true;
      this.getPopularityChoice();
    }
  },
  mounted() {
    this.getPopularitylist();
  }
};
</script>
<style lang="scss" scoped>
.integral-top {
  height: 50px;
  border: 1px solid #e4e4e4;
  margin-top: 20px;
}
.name {
  height: 60px;
  display: flex;
  align-items: center;
  background: #ffffff;
  span {
    margin-left: 35px;
    margin-right: 10px;
  }
}
.integral-table {
  .table-header {
    height: 50px;
    .table-btn {
      margin: 0 10px;
    }
  }
}
.pages {
  text-align: center;
}
.action {
  margin-bottom: 10px;
}
</style>
