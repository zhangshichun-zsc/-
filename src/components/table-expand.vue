<template>
  <div>
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
    <Modal v-model="modal1" title="编辑部门">
      <Form
        ref="AddDate"
        :model="AddDate"
        :rules="ruleValidate"
        :label-width="150"
      >
        <FormItem label="部门名称:" prop="deptName">
          <Input style="width: 10rem" v-model="AddDate.deptName" />
        </FormItem>
        <FormItem label="职能描述:" prop="description">
          <Input
            style="width: 10rem"
            v-model="AddDate.description"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 5 }"
            placeholder="请输入内容"
          />
        </FormItem>
        <FormItem label="上级部门" prop="parentId">
          <Select disabled v-model="AddDate.parentId" style="width: 10rem">
            <Option
              v-for="item in deplist"
              :value="item.deptId"
              :key="item.deptId"
              >{{ item.deptName }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="设置负责人:" prop="leader">
          <Input style="width: 10rem" v-model="AddDate.leader" />
        </FormItem>
        <FormItem label="活动类型" prop="ssproject">
          <Select multiple style="width: 10rem" v-model="AddDate.ssproject">
            <Option
              v-for="item in activityType"
              :value="item.dicId"
              :key="item.dicId"
              >{{ item.dicName }}</Option
            >
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <!-- <Button type="text" size="large" @click="modalCancel">取消</Button> -->
        <Button type="primary" size="large" @click="modalOk('AddDate')"
          >确定</Button
        >
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  departmentsub,
  departmentStatu,
  departmentmember,
  departmentSup,
  getParentIdName,
  departmentedit,
  editfindDicName
} from "@/request/api";
export default {
  data() {
    return {
      columns1: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            this.$emit("changes", params.row);
            return this.dom;
          }
        },
        {
          title: "部门名称",
          key: "deptName",
          align: "center",
          render: (h, params) => {
            return h(
              "a",
              {
                style: {
                  color: "#000"
                },
                on: {
                  click: () => {
                    this.deptId = params.row.deptId;

                    this.getdepartmentmember(params.row.deptId); // TODO 点击活动当前部门的成员
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
                        console.log(params.row);
                        this.modal1 = true;
                        this.deptId = params.row.deptId;
                        this.AddDate.deptName = params.row.deptName;
                        this.AddDate.leader = params.row.leader;
                        this.AddDate.description = params.row.description;
                        this.AddDate.parentId = params.row.parentId;
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
      modal1: false,
      AddDate: {
        deptName: "",
        description: "",
        parentId: "",
        leader: "",
        ssproject: "" // 用户选择的活动类型
      },
      ruleValidate: {
        deptName: [
          { required: true, message: "部门名称不能为空", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { type: "string", min: 10, message: "不能少于10字", trigger: "blur" }
        ],
        parentId: [
          {
            required: true,
            message: "请选择相关部门",
            trigger: "change",
            type: "number"
          }
        ],
        leader: [
          { required: true, message: "请输入负责人姓名", trigger: "blur" }
        ]
      },
      data: [],
      ids: "",
      validFlag: "",
      deptId: "",
      deplist: [],
      throttleFlag: true,
      throttleFlag_two: true
    };
  },
  props: ["row", "dom"],
  watch: {
    row(val) {
      console.log(val);
      this.getdepartmentsub(val);
    },
    modal1(val) {
      if (val === true) {
        // this.getdepartmentSup();
        this.getParentIdName();
        console.log(this.deptId);

        this.getName(this.deptId);
      }
    }
  },
  computed: {
    activityType() {
      return this.$store.state.activityType;
    }
  },
  mounted() {
    if (!this.row) return;
    this.getdepartmentsub(this.row);
  },
  methods: {
    // 查询下级部门
    getdepartmentsub(val) {
      if (!this.throttleFlag_two) return;
      this.throttleFlag_two = false;
      this.ids = val.deptId;
      departmentsub({
        depId: this.ids
      }).then(res => {
        if (res.code == 200) {
          this.data = res.data;
        }
        this.throttleFlag_two = true;
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

    // 查询 当前部门下的成员
    getdepartmentmember() {
      if (!this.throttleFlag) return;
      this.throttleFlag = false;
      let page = {
        page: this.$store.state.MGTpage.page,
        size: this.$store.state.MGTpage.size
      };

      departmentmember({
        page,
        depId: this.deptId,
        sort: ""
      }).then(res => {
        if (res.code == 200) {
          // ! 将数据保存到vuex
          this.$store.commit("updateList", {
            list: res.data.list,
            count: res.data.totalSize
          });
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
        this.throttleFlag = true;
      });
    },
    // 获取当前部门的直属上级部门
    getParentIdName() {
      getParentIdName({ deptId: this.deptId }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.deplist = [
            { deptId: res.data.deptId, deptName: res.data.deptName }
          ];
          this.AddDate.parentId = res.data.deptId;
        }
      });
    },
    // 部门 编辑
    getdepartmentedit() {
      departmentedit({
        deptId: this.deptId,
        deptName: this.AddDate.deptName,
        description: this.AddDate.description,
        leader: this.AddDate.leader,
        dicIds: this.AddDate.ssproject.toString()
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info("修改成功!");
          this.modal1 = false;
          this.AddDate = {
            deptName: "",
            description: "",
            parentId: "",
            leader: "",
            ssproject: ""
          };
        } else {
          this.$Message.error("修改失败!");
          this.modal1 = false;
        }
        console.log(res);
      });
    },
    // 获取当前部门的活动类型
    getName(deptId) {
      editfindDicName({ deptId: deptId }).then(res => {
        let arr = res.data.map(item => {
          return item.dicId;
        });
        this.AddDate.ssproject = arr;
      });
    },

    modalOk(name) {
      this.$refs.AddDate.validate(valid => {
        if (valid) {
          this.getdepartmentedit();
        } else {
          this.$Message.error("必填项未填!");
        }
      });
    }
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
td.ivu-table-expanded-cell {
  padding: 0 !important;
}
</style>
