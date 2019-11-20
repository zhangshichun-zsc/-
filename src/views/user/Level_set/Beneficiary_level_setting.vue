<!--受益方等级设置（会员）-->
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
        <Table border :columns="columns" :data="data"></Table>
      </div>
    </div>
  </div>
</template>

<script>
import { Gradepage,Grademodifydefault } from "../../../request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "受益方等级设置（会员）"
      },
      data: [],
      page:1,
      size:10,
      levelId: "",
      levelName: "",
      target: "",
      feedScore: "",
      evaScore: "",
      remarks: "",
      defaultFlag:'',
      status:'',
      columns: [
        {
          title: "等级名称",
          key: "levelName",
          align: "center"
        },
        {
          title: "默认等级",
          key: "defaultFlag",
          align: "center",
          render: (h, params) => {
            return h("div", [h("i-switch",
            {
               props: {
                  value: params.row.defaultFlag == 0
                },
                  on: {
                  input: e => {
                   this.getGrademodifydefault(e)
                  }
                }
            }
            )]);
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
                        this.$router.push({ name: "Add_benefit_type" });
                      }
                    }
                  },
                  "编辑"
                )
              ]
            );
          }
        }
      ]
    };
  },
  methods: {
    jump1() {
      this.$router.push({ name: "integral_set" });
    },
    jump2() {
      this.$router.push({ name: "Add_benefit_type" });
    },
    //列表数据 
    getGradepage() {
      Gradepage({
        sysType: 1
      }).then(res => {
        if (res.code == 200) {
          this.data = res.data;
        }
        console.log(res);
      });
    },
    //修改默认等级
    getGrademodifydefault(e){
      if(e){
        this.levelId=1
      }else{
        this.levelId=1
      }
      Grademodifydefault({
        levelId:this.levelId,
        defaultFlag:1
      }).then(res => {
        if (res.code == 200) {
        }
        console.log(res);
      });
    }
  },
  mounted() {
    this.getGradepage()
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
