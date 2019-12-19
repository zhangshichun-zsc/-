<!-- 站内信消息(会员) -->
<template>
  <div class="integral">
    <Tophead :navigation1="navigation1" :top="top" @query="query"></Tophead>

    <div class="integral-table">
      <div class="table-header flex-between" style="padding:10px">
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
      <Table
          ref="selection"
          border
          :columns="columns"
          :data=data
        ></Table>
      <Modal v-model="modal2" title="查看消息">
        <h1 style="text-align: center;font-size:16px">{{obj.title}}</h1>
        <p style="text-align: center;color: #9EA7B4;font-size:14px">{{obj.createAt}}</p>
        <Divider style="margin: 0.5rem 0;" />
        <p style="font-size:12px;">{{obj.content}}</p>
        <div slot="footer"></div>
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
import { messageShort} from "@/request/api";
export default {
  data() {
    return {
      modal2: false,

      navigation1: {
        head: "站内信消息(会员)"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "编号",
          key: "id",
          width:140,
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
           align: "center",
           width:260
        },

        {
          title: "操作",
          key: "action",
          width:200,
          align: "center",
          render: (h, params) => {
            return h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#FF566A"
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
        { value: "create_at asc", label: "正序" },
        { value: "create_at desc", label: "倒序" }
      ],
      sort: "create_at desc",
      top: [
        { name: "消息标题", type: "input", value: "" },
        { name: "发布时间", type: "date", value: "" }
      ],
      sysId: 1,
      channelFlag: 1,
      page: 1,
      size: 10,
      content: "",
      createAt: "",
      dataCount: 0,
      obj:{}
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
        page: { page: this.page, size: this.size,sort:this.sort}
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
       if(e[1].value!=''){
        this.createAt = e[1].value.getTime();
        this.createAt=this.util.formatDate(this.createAt)
      }

      this.getmessageShort()
    },

    screen() {
      this.$router.push({ name: "vp_screen" });
    }
  }
};
</script>
<style lang="scss">
.integral-header .integral-top {
  padding: 15px 20px;
  margin-top: 0;
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
  background-color: #fff !important;
  border-radius:10px 10px 0 0;

}
.table-header .table-btn {
  margin-left: 15px;
}
.pages {
  text-align: center;
  background: #fff;
}
.integral-table .pages{
  padding: 20px;
  border-radius: 0 0 10px 10px;
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
