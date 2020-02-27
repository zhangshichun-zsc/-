<!--组织列表共用-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="basis">
      <div class="content">
        <Form
          ref="formInline"
          :model="formInline"
          inline
          class="forms"
          :label-width="100"
          v-if="Retract == true"
        >
          <FormItem label="组织名称:">
            <Input
              v-model="orgName"
              placeholder="组织名称"
              style="width: 120px"
            />
          </FormItem>
          <FormItem label="组织地址:">
            <Input
              v-model="address"
              placeholder="组织地址"
              style="width: 120px"
            />
          </FormItem>
          <FormItem label="负责人:">
            <Input
              v-model="ownerUserName"
              placeholder="负责人"
              style="width: 120px"
            />
          </FormItem>
          <FormItem
            label="分类:"
            class="types"
            v-if="this.navigation1.id == 100"
            :label-width="60"
          >
            <Select v-model="orgType" style="width:140px" :transfer="true">
              <Option
                v-for="item in typelist"
                :value="item.dicCode"
                :key="item.dicCode"
                >{{ item.dataValue }}</Option
              >
            </Select>
          </FormItem>
          <a
            href="javascript:;"
            style="margin-left:10px"
            class="queryBtn"
            @click="query"
            >查询</a
          >
        </Form>
      </div>
      <div class="tableHerber">
        <div>
          <div class="bk-szy sleft">
            <div class="flex-start">
              <div>
                <Icon type="md-reorder" size="25" /> <span>数据列表</span>
              </div>
              <a
                href="javascript:;"
                class="queryBtn"
                style="margin-left:15px;"
                @click="jump()"
              >
                新建组织</a
              >
            </div>
            <div class="flex-start">
              <div class="flex-center-end">
                <Button disabled class="space" @click="exportData"
                  >导入组织</Button
                >
                <div class="flex-center-end">
                  <Dropdown>
                    <Button disabled class="space" @click="exportData"
                      >导出数据</Button
                    >
                  </Dropdown>
                </div>
                <!-- <Select
                  v-model="size"
                  style="width:80px;margin-right:10px"
                  placeholder="显示条数"
                >
                  <Option
                    v-for="item in Article"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</Option
                  >
                </Select> -->
                <Select
                  placeholder="排序方式"
                  style="width: 80px;"
                  v-model="sort"
                >
                  <Option
                    v-for="item in sorting"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</Option
                  >
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-center-end"></div>

        <Table
          :loading='loading'
          ref="selection"
          border
          :columns="columns"
          :data="data"
          style=" padding: 0 5px;"
          @on-selection-change="handleSelectionChange"
        ></Table>
        <div class="pages">
          <div class="batch">
            
              <Checkbox @on-change='setALL' :value="status" ></Checkbox>全选
         
            <Select
              placeholder="批量操作"
              placement="top"
              style="width: 120px"
              v-model="type"
            >
              <Option
                v-for="item in batchList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
            <a
              class="queryBtn"
              style="margin-left:10px;"
              href="javascript:;"
              @click="batch"
              >确定</a
            >
          </div>
          <Page
            :current.sync='page'
            :total="dataCount"
            show-elevator
            show-total
            placement='top'
            size="small"
             show-sizer
            @on-change="changepages"
            @on-page-size-change='setSize'
          />
        </div>
      </div>
    </div>

    <!-- <Modal
            v-model="modal1"
            title="自定义展示字段"
            @on-ok="ok"
            @on-cancel="cancel"
          >
            <div class="con">
              <p>目前显示字段顺序</p>
              <p>拖拽调整列显示顺序</p>
              <p>
                <span>机构名称</span>
                <span>地址</span>
                <span>负责人</span>
                <span>机构分类</span>
              </p>
              <p>备选字段</p>
              <p>
                <span>基本信息</span>
                <CheckboxGroup v-model="options">
                  <Checkbox label="options1">机构名称</Checkbox>
                  <Checkbox label="options2">地址</Checkbox>
                  <Checkbox label="options3">负责人</Checkbox>
                  <Checkbox label="options4">Logo</Checkbox>
                  <Checkbox label="options5">创建时间</Checkbox>
                  <Checkbox label="options6">省份</Checkbox>
                  <Checkbox label="options7">网站</Checkbox>
                  <Checkbox label="options8">网站</Checkbox>
                </CheckboxGroup>
              </p>
              <a @click="jump1()" style="color: #515a6e;">
                <Icon type="ios-settings-outline" />自定义扩展字段
              </a>
            </div>
          </Modal> -->
  </div>
</template>

<script>
import { myBrowser } from "../request/Browser";
import { orgpage, orgtype, orgbatch } from "../request/api";
export default {
  data() {
    return {
      loading:false,
      formInline: {
        OrganizationName: "",
        GroupAddress: "",
        head: "",
        classifications: ""
      },
      modal1: false,
      data: [],
      typelist: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "组织名称",
          key: "orgName",
          align: "center",
          width: 400
        },
        {
          title: "组织分类",
          key: "orgType",
          width: 200,
          align: "center"
        },
        {
          title: "组织地址",
          key: "address",
          align: "center",
          width: 400,
          render: (h, params) => {
            let provinceName = params.row.provinceName
              ? params.row.provinceName
              : "";
            let cityName = params.row.cityName ? params.row.cityName : "";
            let districtName = params.row.districtName
              ? params.row.districtName
              : "";
            return h("span", provinceName + cityName + districtName);
          }
        },
        {
          title: "创建时间",
          key: "createAt",
          width: 200,
          align: "center"
        },
        {
          title: "负责人",
          key: "userName",
          align: "center",
          width: 220
        },
        {
          title: "人数",
          key: "num",
          width: 120,
          align: "center"
        },
        {
          title: "是否启用",
          key: "validFlag",
          align: "center",
          width: 120,
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.validFlag == 1
                },
                style: {
                  margin: "0 auto",
                  "text-align": "center"
                },
                on: {
                  input: e => {
                    if (params.row.validFlag == "1") {
                      this.types = 2;
                    } else {
                      this.types = 1;
                    }
                    this.arr = Array.of(params.row.orgId);
                    this.getorgbatch();
                  }
                }
              })
            ]);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 160,
          align: "center",
          render: (h, params) => {
            let status = "";
            if (params.row.validFlag == "1") {
              status = "停用";
            } else {
              status = "启用";
            }
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#FF565A "
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "detailshy",
                        query: {
                          orgId: params.row.orgId,
                          status:
                            this.navigation1.head === "组织列表(志愿者)"
                              ? "1"
                              : "0"
                        }
                      });
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      Article: [
        { value: 10, label: 10 },
        { value: 15, label: 15 },
        { value: 20, label: 20 }
      ],
      sorting: [
        { value: "create_at asc", label: "正序" },
        { value: "create_at desc", label: "倒序" }
      ],
      sort: "create_at desc",
      batchList: [
        { value: "1", label: "启用" },
        { value: "2", label: "停用" }
        // { value: "3", label: "删除" }
      ],
      options: ["options1", "options2", "options8"],
      sysType: "1",
      orgName: "",
      address: "",
      ownerUserName: "",
      orgType: 0,
      page: 1,
      size: 10,
      dataCount: 0,
      arr: [],
      status: false,
      Retract: true,
      type: "",
      userId: 1,
      arrs: [],
      types: ""
    };
  },

  methods: {
    //类型
    getorgtype() {
      orgtype({
        sysType: this.sysType
      }).then(res => {
        if (res.code == 200) {
          this.typelist = [
            { dataKey: 0, dataValue: "全部", dicCode: 0 },
            ...res.data
          ];
        }
        console.log(res);
      });
    },
    //批量操作
    getorgbatch() {
      // （1启用  2停用  3删除
      orgbatch({
        orgId: this.arr,
        userId: this.userId,
        type: this.type
      }).then(res => {
        if (res.code == 200) {
          this.getorgpage();
          this.$Message.info("操作成功");
         
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //标签分页
    getorgpage() {
      this.loading = true
       this.data =[]
      let orgTypes;
      if (this.orgType == 0) {
        orgTypes = "";
      } else {
        orgTypes = this.orgType;
      }

      orgpage({
        page: {
          page: this.page,
          size: this.size,
          sort: this.sort
        },
        sysType: this.navigation1.id == 100 ? "1,3" : 2,
        orgName: this.orgName,
        address: this.address,
        ownerUserName: this.ownerUserName,
        orgType: orgTypes
      }).then(res => {
        if (res.code == 200) {
          this.dataCount = res.data.totalSize;
          this.data = [...res.data.list];
        }
       this.loading = false
      });
    },

    //收起筛选
    Retractbtn() {
      this.Retract = !this.Retract;
    },
    //查询结果
    query() {
      this.page = 1;
      this.getorgpage();
    },
  
    //批量操作
    batch() {
      if (!this.arrs.length) {
        this.$Message.error("至少选择一个");
      } else if (this.type == "") {
        this.$Message.error("请先选择操作类型");
      } else {
       
        
  
        let typeFlag= this.type==2?0:this.type
        console.log(typeFlag);
        
        let userList = this.arrs
        let arr = []
        userList.forEach(item=>{
          if(item.validFlag != typeFlag){
            arr.push(item.orgId)
          }
        })
        console.log(arr);
        
        if(arr.length !=0){
           this.arr = arr
           this.getorgbatch();
        }else{
           this.$Message.info("当前选中的组织无需此操作");
           return
        }
       
      }
    },

    //分页功能
    changepages(index) {
      this.page = index;
      this.getorgpage();
    },
     setALL(v){
      this.$refs.selection.selectAll(v);
    },
    setSize(n){
      this.size = n
      this.getorgpage();
    },
    //选择内容
    handleSelectionChange(val) {
      this.arrs = val;
      if (val.length == this.size) {
        this.status = true;
      } else {
        this.status = false;
      }
    },

    //导出数据
    exportData() {
      this.$Message.error("此功能暂未开放！");

    },

    //新建组织
    jump() {
      this.$router.push({ name: "newzuzihy", query: { sysId: this.sysType } });
    },
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    jump1() {
      this.$router.push({ name: "OrganizationFields_hy" });
    }
  },

  //事件监听
  watch: {
    sort: "getorgpage"
  },
  props: ["navigation1"],
  mounted() {
    console.log(this.navigation1.id);

    if (this.navigation1.id == "") {
      this.sysType = 2;
      this.getorgpage();
    } else if (this.navigation1.id == 100) {
      this.sysType = 1;
      this.getorgpage();
      this.getorgtype();
    } else {
      this.sysType = 1;
      this.orgType = this.navigation1.id;
      this.getorgpage();
    }
  }
};
</script>
<style scoped>
html,
body {
  margin: auto;
}

.padd {
  padding: 10px 0 0 50px;
}

.content {
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
  padding: 0 5px;
}
.sleft {
  margin-left: 5px;
}
.bk-szy {
  display: flex;
  align-items: center;
  padding: 15px 30px;
  justify-content: space-between;
}
.title {
  padding: 0.2rem 0.5rem;
}
.Pack {
  margin: 0 0.4rem;
}
.space {
  margin-right: 10px;
  font-size: 15px;
}

.pages {
  padding: 20px 30px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ivu-form-item {
  margin-bottom: 0;
}
.con p:nth-child(1n + 2) {
  display: table;
  margin-bottom: 0.3rem;
}
.con p:nth-child(2) {
  border: 1px solid;
}
.con p:nth-child(3) span {
  border: 1px dashed;
  padding: 0.1rem;
  margin-right: 0.2rem;
}
.con p:nth-last-child(1) {
  background-color: #f2f2f2;
  padding: 0.2rem;
}
.forms {
  padding: 15px;
  display: flex;
}

.ivu-form-item-content {
  margin-left: 80px;
}
.sai {
  color: black;
}

.search {
  width: 110px;
  height: 32px;
  background: #ff565a;
  border-radius: 15px;
  text-align: center;
  line-height: 16px !important;
  font-size: 16px;
  color: white;
}
.tableHerber {
  margin-top: 20px;
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
}
</style>
