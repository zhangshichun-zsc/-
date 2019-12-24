<!-- 短信消息(志愿者) -->
<template>
  <div class="integral">
    <Tophead :navigation1="navigation1" :top="top" @query="query"></Tophead>

    <div class="integral-table">
      <div class="table-header flex-between"style="padding:10px">
        <div>
          <Icon type="ios-list" size="30" />
          <span>数据列表</span>
        </div>
        <div class="flex-center-end" >
          <Select v-model="size" style="width:100px;margin-right:10px" placeholder="显示条数">
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="排序方式" style="width: 100px;" v-model="sort">
            <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>

      <div style="padding: 0.5rem 0;" v-for="(item,index) in list" :key="index">
        <div style="border: #E4E4E4 1px solid;margin:0 10px">
          <div
            class="flex-center-between"
            style="padding: 0.2rem 0"
          >
            <div class="text1">
              <p>
                <span class="black">发送对象：{{item.userName}}</span>
                <span>发送时间：{{item.createAt}}</span>
              </p>
            </div>
          </div>
          <div class="text2">
            <p>{{item.content}}</p>
          </div>
        </div>
      </div>

      <div class="pages flex-center-between">
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
import { messageShort } from "@/request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "短信消息(志愿者)"
      },
      // columns: [
      //   {
      //     title: "发布人员",
      //     key: "publisher",

      //     render: (h, params) => {
      //       return h("div", "admin");
      //     }
      //   },
      //   {
      //     title: "发布时间",
      //     key: "publishtime",

      //     render: (h, params) => {
      //       return h("div", "2019-08-02");
      //     }
      //   },
      //   {
      //     title: "接收对象",
      //     key: "object",

      //     render: (h, params) => {
      //       return h("div", "200人");
      //     }
      //   },
      //   {
      //     title: "操作",
      //     key: "delete",

      //     render: (h, params) => {
      //       return h("a", "删除");
      //     }
      //   },
      //   {
      //     title: "消息提示",
      //     key: "tip",

      //     render: (h, params) => {
      //       return h("div", "你的会员已到期，请充值");
      //     }
      //   }
      // ],
      data: [],

      sysId: 2,
      channelFlag: 2,
      page: 1,
      size: 10,
      content: "",
      createAt: "",
      dataCount: 0,
      list: [],
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
      top: [
        { name: "关键词:", type: "input", value: "" },
        { name: "发布时间:", type: "date", value: "" }
      ]
    };
  },
  //事件监听
  watch: {
    size: "getmessageShort",
    sort: "getmessageShort"
  },

  components: {},
  computed: {},
  created() {},
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
        page: { page: this.page, size: this.size,sort:this.sort }
      }
      params=this.util.remove(params)
      console.log(params)
      messageShort(params).then(res => {
        if (res.code == 200) {
          this.dataCount = res.data.totalSize;
          this.list = res.data.list;
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
      if(e[1].value!=''){
        this.createAt = e[1].value.getTime();
        this.createAt=this.util.formatDate(this.createAt)
      }
      this.getmessageShort()
    }
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
  border-radius:  10px 10px 0 0;
}
.table-header .table-btn {
  margin-right: 15px;
}
.integral-table{
  background-color: #fff;
}
.integral-table .pages {
  padding: 20px;
  background: #fff;
  border-radius: 0 0 10px 10px;
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

.text2 {
  font-size: 16px;
}
.text1 {
  display: flex;
  padding: 10px 0;
  font-size: 16px;
  border-bottom: 1px solid #ddd
}
.text1 p {
  margin: 0 0.2rem;
}
.black {
  margin-right: 20px;
  color: black;
  padding-left: 15px;
}
.text2 {
  padding: 0.5rem 1rem;
  height: 5rem;
}
</style>
