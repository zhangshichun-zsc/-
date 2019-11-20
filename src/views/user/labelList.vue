<!-- 标签列表 -->
<template>
  <div class="integral">
    <Navigation :labels="navigation1"></Navigation>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <Icon type="md-reorder" size="20" />
          <span>数据列表</span>
        </div>
        <div>
          <Button class="table-btn">添加</Button>
        </div>
      </div>

      <Table
        ref="selection"
        border
        :columns="columns"
        :data="listMsg"
        @on-selection-change="tablechange"
      ></Table>
      <div class="pages flex-center-between">
        <div class="batch">
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status">全选</Checkbox>
          </Button>
          <Select placeholder="批量操作" style="width: 150px" v-model="batch">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px" @click="batches()">确定</Button>
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
    <Modal v-model="isShow" title="添加标签类型">
      <Form>
        <FormItem label="*标签名称">
          <Input></Input>
        </FormItem>
        <FormItem label="自动打标签条件" class="con">
          <div class="item">
            <div class="type">用户分类</div>
            <Select class="sel"></Select>
          </div>
          <div class="item">
            <div class="type">类型</div>
            <Select class="sel2"></Select>
            <Select class="sel2"></Select>
            <Select class="sel2"></Select>
            <Input class="input"></Input>
          </div>
          <div class="item">
            <div>时间范围</div>
            <RadioGroup class="radio">
              <Radio label="应用于所有历史记录"></Radio>
              <Radio>
                动态更新过去
                <Input class="inp"></Input>小时记录
              </Radio>
              <Radio label="应用于所选时间段"></Radio>
            </RadioGroup>
          </div>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { Labelpage, Labeldel, Labeladd } from "../../request/api";
export default {
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
          key: "num",
          align: "center"
        },
        {
          title: "自动打标签条件",
          key: "condition",
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
                      this.isShow = true;
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
                      this.del(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      batchList: [{ value: "1", label: "删除" }],
      listMsg: [
        {
          name: "立项达人",
          num: "10000",
          condition: "累积成功立项:10"
        }
      ],
      isShow: false,
      page: 1,
      size: 10,
      pageSize: 10,
      dataCount: 0,
      status: false,
      batch: "",
      sysType: 1,
      arr: []
    };
  },
  mounted() {
    this.getLabelpage();
  },
  methods: {
    // Labelpage,Labeldel,Labeladd
    getLabelpage() {
      Labelpage({
        page: { page: this.page, size: this.size },
        sysType: this.sysType
      }).then(res => {
        if(res.code==200){
          his.data = res.data.list;
          this.page = res.data.pageNum;
          this.dataCount = res.data.totalSize;
        }
        console.log(res);
      });
    },
    getLabeldel() {
      Labeldel({
        sysType: this.sysType
      }).then(res => {
        console.log(res);
      });
    },
    getLabeladd() {
      Labeladd({
        name: this.name,
        sysType: this.sysType
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
      console.log(this.arr.length,this.dataCount,this.size)
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true;
      } else {
        this.status = false;
      }
    },

    //全选按钮
    chackall() {
      this.status = !this.status;
      this.$refs.selection.selectAll(this.status);
    },
    del() {}
  }
};
</script>

<style scoped>
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  padding: 20px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
}
.integral-header .integral-center {
  margin: 0 20px;
}
.integral-header .integral-body {
  padding: 20px;
  background: #fff;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 200px;
  margin-left: 15px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 20px;
}
.integral-table {
  margin-top: 30px;
}
.table-header {
  padding: 10px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.table-header .table-btn {
  margin-left: 15px;
}
.ivu-form-item {
  display: flex;
}
.item {
  width: 380px;
  display: flex;
}
.item .type {
  flex: 1;
}
.item .sel {
  flex: 4;
}
.item .sel2 {
  flex: 1;
}
.item .input {
  flex: 1;
}
.item .inp {
  width: 20%;
}
.item .radio {
  display: flex;
  flex-direction: column;
  margin-left: 27px;
}
.pages {
  padding: 5px 20px;
  margin-top: 50px;
  background: #fff;
  text-align: center;
}
</style>
