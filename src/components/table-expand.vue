
<template>
  <!-- <div> -->
  <Table border :columns="columns1" :data="data" :show-header="false"></Table>
  <!-- <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">Job:</span>
        <span class="expand-value">{{ row.deptName }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">Interest:</span>
        <span class="expand-value">{{ row.deptName }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">Birthday:</span>
        <span class="expand-value">{{ row.deptName }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <span class="expand-key">Favorite book:</span>
        <span class="expand-value">《{{ row.deptName }}》</span>
      </Col>
      <Col span="8">
        <span class="expand-key">Favorite movie:</span>
        <span class="expand-value">{{ row.deptName }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">Favorite music:</span>
        <span class="expand-value">{{ row.deptName }}</span>
      </Col>
  </Row>-->
  <!-- </div> -->
</template>
<script>
import { departmentsub,departmentStatu} from "@/request/api";
export default {
  data() {
    return {
      columns1: [
        {
          type: "expand",
          width: 50,
          render: (h, params)=>{
            return (this.dom)
          }
        },
        {
          title: "部门名称",
          key: "deptName",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {
                // style: {
                //   color: 'blue',
                //   cursor: 'pointer'
                // },
                on: {
                  click: () => {
                    this.deptId = params.row.deptId;
                    this.getdepartmentmember();
                  }
                }
              },
              params.row.deptName
            );
          }
        },
        {
          title: "职能描述",
          key: "description",
          align: "center"
        },
        {
          title: "成员数量",
          key: "sum",
          align: "center"
        },
        {
          title: "负责人",
          key: "leader",
          align: "center"
        },
        {
          title: "是否启用",
          key: "status",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.validFlag == 1
                },
                on: {
                  input: e => {

                    this.getdepartmentStatu(params.row.deptId, e);
                  }
                }
              })
            ]);
          }
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
                        this.modal1 = true;
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "a",
                  {
                    style: {
                      color: "#1ABD9D"
                    },
                    on: {
                      click: () => {}
                    }
                  },
                  "删除"
                )
              ]
            );
          }
        }
      ],
      data: [],
      ids:'',
      validFlag:''
    };
  },
  props: ["row","dom"],
  mounted() {
    console.log
    this.getdepartmentsub();
    console.log(this.row.deptId);
  },
  methods: {
    // 查询下级部门
    getdepartmentsub() {
      this.ids=this.row.deptId
      departmentsub({
        depId: this.row.deptId
      }).then(res => {
        if (res.code == 200) {
          this.data=res.data
        }
        console.log(res);
      });
    },
     // 修改启用状态
    getdepartmentStatu(id, e) {
      if (e == true) {
        this.validFlag = 1;
      } else {
        this.validFlag = 0;
      }
      departmentStatu({
        depId: id,
        validFlag: this.validFlag
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info("操作成功");
        } else {
          this.getdepartmentlist();
          this.$Message.error(res.msg);
        }
      });
    },
  }
};
</script>
<style scoped>
/* .expand-row {
  margin-bottom: 16px;
} */
.ivu-table-expanded-cell {
  padding: 0 !important;
}
td.ivu-table-expanded-cell{padding:0;}
</style>
