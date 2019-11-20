<!--志愿者等级设置（志愿者）-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="main">
      <div class="constant bk">
        <div class="constant-title flex-center-between">
          <div class="flex-start">
            <Icon type="md-reorder" size="20" />
            <p>数据列表</p>
          </div>
          <div>
            <Button size="small" @click="jump1()">积分规则设置</Button>
            <Button size="small" @click="jump2()">添加</Button>
          </div>
        </div>
        <Table
          ref="selection"
          border
          :columns="columns"
          :data="data"
          @on-selection-change="handleSelectionChange"
        ></Table>
      </div>
    </div>
  </div>
</template>

<script>
import { Gradepage } from "../../../request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "志愿者等级设置（志愿者）"
      },
      data: [],
      columns: [
        {
          title: "等级名称",
          key: "levelName",
          align: "center"
        },
        {
          title: "默认等级",
          key: "defaultLevel",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.defaultFlag == 1
                },
                on: {
                  input: e => {
                    console.log(e)
                    // this.getAddressDel(params.row.informationId, e);
                  }
                }
              })
            ]);
          }
        },
        {
          title: "积分满足点",
          key: "target",
          align: "center"
        },
        {
          title: "反馈奖励",
          key: "feedScore",
          align: "center"
        },
        {
          title: "评价奖励",
          key: "evaScore",
          align: "center"
        },
        {
          title: "备注",
          key: "remarks",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-around",
                  MaxfontSize: "16px"
                }
              },
              [
                h(
                  "a",
                  {
                    clssName: "action",
                    style: {
                      color: "#1ABD9D"
                    },
                    on: {
                      click: () => {
                        this.$router.push({ name: "Add_volunteer_type" });
                      }
                    }
                  },
                  "编辑"
                )
              ]
            );
          }
        }
      ],
      sysType: 2
    };
  },
  mounted() {
    this.getGradepage();
  },
  methods: {
    //等级管理--获取等级列表
    getGradepage() {
      Gradepage({
        sysType: this.sysType
      }).then(res => {
        console.log(res);
        if(res.code==200){
          this.data=res.data
        }
      });
    },

    //选择内容
    handleSelectionChange(val) {
      console.log(val);
      this.arr = val;
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.statuss = true;
      } else {
        this.statuss = false;
      }
    },

    jump1() {
      this.$router.push({ name: "integral_set" });
    },
    jump2() {
      this.$router.push({ name: "Add_volunteer_type" });
    }
  }
};
</script>

<style scoped>
.main {
  width: 50rem;
  margin: 0 auto;
}
.constant {
  margin-top: 1rem;
}
.bk {
  border: 1px solid #e4e4e4;
}
.constant-title {
  padding: 0.2rem;
  background-color: #f3f3f3;
  border-bottom: 1px solid #e4e4e4;
}
.constant-title button {
  margin: 0.2rem;
}
</style>
