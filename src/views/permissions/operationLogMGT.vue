<!--操作日志(共用)-->
<template>
  <div class="main">
    <Tophead :navigation1="navigation1" :top="top" @query="querys"></Tophead>
    <div class="content">
      <div class="con">
        <div class="title bk-szy flex-center-start">
          <p>
            <Icon type="ios-list" />
            <span>数据列表</span>
          </p>
          <div class="but flex-center-start">
            <!-- <div class="options flex-center-start">
              <p>
                <span>清除日志:</span>
              </p>
              <Select placeholder="选择清除的日期" style="width: 150px" v-model="statusTime">
                <Option
                  v-for="item in worldList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
              <Button @click="Determine">确定</Button>
            </div> -->
            <Select v-model="size" style="width:120px" placeholder="显示条数" class="space">
              <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        <Table
          ref="selection"
          border
          :columns="columns"
          :data="data"
          @on-selection-change="handleSelectionChange"
        ></Table>
        <div class="batch">
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status"></Checkbox>全选
          </Button>
          <!-- <Select placeholder="批量操作" style="width: 150px">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select> -->
          <Button style="margin-left: 10px" @click="batch">批量删除</Button>
        </div>
      </div>
       <Modal v-model="addstate" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                  <span>删除确定</span>
                </p>
                <div style="text-align:center">
                  <p>请确认是否要删除此数据</p>
                </div>
                <div slot="footer">
                  <Button type="error" @click="modalCancel">取消</Button>
                  <Button type="success" @click="modalOkdel">确定</Button>
                </div>
              </Modal>
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
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/request/datatime";
import { Journallist, Journaldel } from "@/request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "操作日志(共用)"
      },
      operatorList: [],
      worldList: [
        {
          value: "1",
          label: "一周之前"
        },
        {
          value: "2",
          label: "一个月之前"
        },
        {
          value: "3",
          label: "三个月之前"
        },
        {
          value: "4",
          label: "半年之前"
        }
      ],
      data: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "操作者",
          key: "userName",
          align: "center"
        },
        {
          title: "操作日期",
          key: "visitTime",
          align: "center",
          render: (h, params) => {
            return h("div", formatDate(params.row.visitTime));
          }
        },
        {
          title: "IP地址",
          key: "ipAddr",
          align: "center"
        },
        {
          title: "操作记录",
          key: "url",
          align: "center"
        }
      ],
      batchList: [
        {
          value: "remove",
          label: "清除"
        }
      ],
      top: [
        { name: "操作人员", type: "input", value: "" },
        { name: "操作日期", type: "date", value: "" }
      ],
      Article: [
        { value: 10, label: 10 },
        { value: 15, label: 15 },
        { value: 20, label: 20 }
      ],
      page: 1,
      size: 10,
      userName: "",
      visitTime: "",
      dataCount: 0,
      arr: [],
      status: false,
      statusTime:'',
      addstate:false
    };
  },
  //事件监听
  watch: {
    size: "getJournallist"
  },
  mounted() {
    this.getJournallist();
  },
  methods: {
    //日志列表
    getJournallist() {
      Journallist({
        userName: this.userName,
        visitTime: this.visitTime,
        page: { page: this.page, size: this.size }
      }).then(res => {
        if (res.code == 200) {
          this.data = res.data.list;
          this.dataCount = res.data.totalSize;
        }
        console.log(res);
      });
    },

    //删除日志信息
    getJournaldel() {
      Journaldel({
        sysLogIds: this.arr,
        statusTime: this.statusTime
      }).then(res => {
        if (res.code == 200) {
          this.getJournallist()
          this.$Message.info("删除成功");
          this.$refs.selection.selectAll(false);
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },
    //确定
    Determine() {
      console.log(11)
      this.getJournaldel();
    },

    //选择内容
    handleSelectionChange(val) {
      this.arr=val
      if (
        (val.length == this.dataCount && this.dataCount != 0) ||
        val.length == this.size
      ) {
        this.status = true;
      } else {
        this.status = false;
      }

      console.log(this.arr)
    },
    //批量操作
    batch() {
       this.arr = this.arr.map(item => {
          return item.sysLogId;
        }).toString();
         if (this.arr.length == 0) {
        this.$Message.error("至少选择一个");
      } else if (this.type == "") {
        this.$Message.error("请先选择操作类型");
      } else {
         this.addstate=true


      }


    },
    modalCancel(){
      this.addstate=false
    },

    //删除确定
    modalOkdel(){
      this.statusTime=''
      this.getJournaldel();

    },
    //全选按钮
    chackall() {
      this.status = !this.status;
      this.$refs.selection.selectAll(this.status);
    },

    //分页功能
    changepages(index) {
      this.page = index;
      this.getJournallist();
    },
    //查询
    querys(e) {
      this.userName = e[0].value;
      // this.visitTime=e[1].value
      if (e[1].value != "") {
        this.visitTime = e[1].value.getTime();
      }
      this.getJournallist();
    }
  }
};
</script>
<style lang="scss" scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
  border: 1px solid #e4e4e4;
}
.content {
  margin: 10px;
}
.top {
  margin-bottom: 20px;
}
.bk {
  border: 1px solid #e4e4e4;
}
.bk-xia {
  border-bottom: 1px solid #e4e4e4;
}
.bk-szy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
}
.title {
  background-color: #f3f3f3;
  justify-content: space-between;
  padding: 5px 20px;
}
.Pack,
.but button {
  margin-right: 5px;
}
.sx-con {
  display: flex;
  justify-content: flex-start;
  padding: 10px 20px;
}
.options {
  margin-right: 30px;
}
.options p {
  margin-right: 5px;
}
.pages {
  display: flex;
  justify-content: center;
  margin: 10px auto;
}
.batch {
  margin-left: 25px;
}
</style>
