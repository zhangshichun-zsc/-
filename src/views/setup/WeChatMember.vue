<!--微信消息提醒(会员) -->
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

        <p v-for="(item,index) in obj" :key="index">{{item.pName}}</p>
      </Modal>
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
</template>

<script>
import {WeChatmessage,WeChatmessagestats,WeChatmessageSee} from '@/request/api'
export default {
  data() {
    return {
       navigation1: {
        head: "微信消息提醒(会员)",

      },
      columns: [
        {
          title: "消息模板",
          key: "tName",
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
                    this.getWeChatmessagestats(params.row.sMsgId, e);
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

                      this.getWeChatmessageSee(params.row.sMsgId)

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
      sysId:2,
      modal2:false,
      obj:[],
      validFlag:''
    };
  },
  components: {},

  computed: {},

  created() {},
  mounted(){
    this.getWeChatmessage()
  },

  methods: {
    //提醒
    getWeChatmessage(){
      WeChatmessage({
        sysId:this.sysId,
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
    getWeChatmessagestats(id,e){
      if(e){
        this.validFlag=1
      }else{
        this.validFlag=0
      }
      WeChatmessagestats({
        ids:id,
        validFlag:this.validFlag
      }).then(res=>{
        if(res.code==200){
          this.$Message.info('操作成功')
        }else{
          this.getWeChatmessage()
          this.$Message.error(res.msg)
        }
        console.log(res)
      })
    },

    //查看
    getWeChatmessageSee(ids){
      WeChatmessageSee({
        ssmId:ids
      }).then(res=>{
        if(res.code==200){
           this.modal2 = true;
           this.obj=res.data
        }else{
          this.$Message.error(res.msg)
        }
      })
    },
    //分页功能
    changepages(index) {
      this.page = index;
      this.getWeChatmessage();
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
