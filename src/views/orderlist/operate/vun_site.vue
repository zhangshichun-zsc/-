<!-- 站内信消息(志愿者) -->
<template>
  <div class="integral">
    <Tophead :navigation1="navigation1" :top="top" @query="query"></Tophead>

    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div class="flex-center-start">
          <Icon type="md-list" />
          <span>数据列表</span>
        </div>
        <div class="flex-center-end" style="padding:10px">
          <Select v-model="size" style="width:120px;margin-right:10px" placeholder="显示条数">
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="排序方式" style="width: 120px;" v-model="sort">
            <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <Table
          ref="selection"
          border
          :columns="columns"
          :data=data
        ></Table>
      <Modal v-model="modal2" title="查看消息">
        <h1 style="text-align: center;">{{obj.title}}</h1>
        <p style="text-align: center;color: #9EA7B4;">{{obj.createAt}}</p>
        <Divider style="margin: 0.5rem 0;" />
        <p>{{obj.content}}</p>
      </Modal>
      <div class="pages">
        <Page
        :current.sync='page'
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
import { messageShort } from "@/request/api";
export default {
  data() {
    return {
      modal2: false,

      navigation1: {
        head: "站内信消息(志愿者)"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "编号",
          key: "msgId",
          width:100,
          align: "center",
          render: (h, params) => {
            let num=(params.index+1)+(this.page-1)*(this.size)
            return h("div",num);
          }
        },
        {
          title: "消息标题",
          key: "title",
          align: "center"
        },
        {
          title: "发布时间",
          key: "createAt",
          width:160,
          align: "center"
        },

        {
          title: "操作",
          width:100,
          key: "action",
          align: "center",
          render: (h, params) => {
            return h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276"
                  },
                  on: {
                    click: () => {
                      this.modal2 = true;
                      this.obj=params.row
                    }
                  }
                },
                "查看"
              );
          }
        }
      ],
      data: [],

      Article: [
        { value: 10, label: 10 },
        { value: 15, label: 15 },
        { value: 20, label: 20 }
      ],
      sorting: [
        { value: "asc", label: "正序" },
        { value: "desc", label: "倒序" }
      ],
      sort: "asc",
      top: [
        { name: "消息标题", type: "input", value: "" },
        { name: "发布时间", type: "date", value: "" }
      ],
      sysId: 2,
      channelFlag: 1,
      page: 1,
      size: 10,
      content: "",
      createAt: "",
      dataCount: 0,
      obj:{},
    };
  },

  components: {},

  computed: {},

  created() {},
  //事件监听
  watch: {
    size: "getmessageShort",
    sort: "getmessageShort"
  },
  mounted() {
    this.getmessageShort();
  },
  methods: {
    //消息短信
    getmessageShort() {
      let params ={
        sysId: this.sysId,
        content:this.content,
        channelFlag: this.channelFlag,
        createAt:this.createAt,
        page: { page: this.page, size: this.size }
      }
      params=this.util.remove(params)
      console.log(params)
      messageShort(params).then(res => {
        if (res.code == 200) {
          this.dataCount = res.data.totalSize;
          this.data = res.data.list;
        }
        console.log(res);
      });
    },
    //分页功能
    changepages(index) {
      this.page = index;
      this.getmessageShort();
    },

    query(e) {
            this.page=1

      this.content = e[0].value;
      this.createAt = e[1].value;
      this.getmessageShort()
    },


  }
};
</script>
<style lang="scss">

.integral-header .integral-top {
  padding: 15px 20px;
  background: white;
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
.table-header {
  padding: 5px 20px;
  background: white;
}
.table-header .table-btn {
  margin-left: 15px;
}
.integral-table .pages {
  padding: 20px;
  background: #fff;
}
.pages {
  text-align: center;
}
.ipt {
  margin-left: 10px;
}
.sdate {
  margin-left: 15px;
}
button {
  margin-right: 0.5rem;
}
</style>
