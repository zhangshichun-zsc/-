<!--消息提醒(会员) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <span>消息提醒</span>
        </div>
      </div>
    </div>
    <div class="integral-table">

      <Table
          ref="selection"
          border
          :columns="columns"
          :data="data"
        ></Table>

         <Modal v-model="modal2" title="查看消息">
        <h1 style="text-align: center;">{{obj.title}}</h1>
        <p style="text-align: center;color: #9EA7B4;">{{obj.name}}</p>
        <Divider style="margin: 0.5rem 0;" />
        <p>{{obj.comments}}</p>
      </Modal>
      <Page
          :current='page'
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
</template>

<script>
import {messageremind,messagerestats} from '@/request/api'
export default {
  data() {
    return {
      columns: [
        {
          title: "消息模板",
          key: "title",
          align: "center",
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
                    this.getmessagerestats(params.row.msgMouldId, e);
                  }
                }
              })
            ]);
          }
        },
        {
          title: "操作",
          key: "wechat",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
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
       page: 1,
      size: 10,
      dataCount: 0,
      // sysId:2,
      // channelFlag:2,
      modal2:false,
      obj:{},
      validFlag:''
    };
  },
  props: ["navigation1"],
  components: {},

  computed: {},

  created() {},
  mounted(){
    this.getmessageremind()
  },

  methods: {
    //消息提醒
    getmessageremind(){
      messageremind({
        sysId:this.navigation1.sysId,
        channelFlag:this.navigation1.channelFlag,
        page:{page:this.page,size:this.size}
      }).then(res=>{
        if(res.code==200){
          this.data=res.data.list;
          this.dataCount = res.data.totalSize;
        }
        console.log(res)
      })
    },

    //修改状态
    getmessagerestats(id,e){
      if(e){
        this.validFlag=1
      }else{
        this.validFlag=0
      }
      messagerestats({
        ids:id,
        validFlag:this.validFlag
      }).then(res=>{
        if(res.code==200){
          this.$Message.info('操作成功')
        }else{
          this.getmessageremind()
          this.$Message.error(res.msg)
        }
        console.log(res)
      })
    },
    //分页功能
    changepages(index) {
      this.page = index;
      this.getmessageremind();
    },
  }
};
</script>
<style lang="scss" scoped>
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  padding: 15px 20px;
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
  padding: 5px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.table-header .table-btn {
  margin-left: 15px;
}
.integral-table .pages {
  padding: 5px 20px;
  margin-top: 50px;
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
</style>
