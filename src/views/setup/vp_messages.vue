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
      <Table border :columns="columns" :data="data"></Table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
       navigation1: {
        head: "消息提醒(会员)",
      },
      columns: [
        {
          title: "消息类型",
          key: "newclass",
          align: "center",
          render:(h,params)=>{
              return h("div", '活动报名成功场景');
          }
        },
        {
          title: "发送对象",
          key: "object",
          align: "center",
           render:(h,params)=>{
              return h("div", '活动申请人');
          }
        },
        {
          title: "抄送对象",
          key: "cc",
          align: "center",
            render: (h, params) => {
            return h("div", '');
          }
        },
        {
          title: "站内消息",
          key: "sitemessage",
          align: "center",
          render:(h,params) =>{
              return h('div',[
                  h(
                "checkbox",
                {
                  clssName: "action",
                  style: {
                    color: "gray",
                    margin:"5px",
                  }
                },
                "是否发送"
              ),
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ name: 'vp_editsite' })
                    }
                  }
                },
             "编辑内容"
              ),
            ])
          }
        },
        {
          title: "手机短信",
          key: "phone",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "checkbox",
                {
                  clssName: "action",
                  style: {
                    color: "gray",
                    margin:"5px",
                  }
                },
                "是否发送"
              ),
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ name: 'vp_editphone' })
                    }
                  }
                },
                "编辑内容"
              ),
            ]);
          }
        },
        {
          title: "微信消息推送",
          key: "wechat",
          align: "center",
          render: (h, params) => {
            return h("div", [
                h(
                "checkbox",
                {
                  clssName: "action",
                  style: {
                    color: "gray",
                    margin:"5px",
                  }
                },
                "是否发送"
              ),
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ name: 'vp_editwechat' })
                    }
                  }
                },
                "编辑内容"
              ),
            ]);
          }
        }
      ],
      data: []
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {
    ok() {
      this.$Message.info("新增成功");
    },
    cancel() {
      this.$Message.info("新增失败");
    }
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
