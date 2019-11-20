<!-- 协议管理(会员)-->
<template>
  <div class="integral">
    <tophead :navigation1="navigation1" :top="top" @query="query"></tophead>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div class="flex-center-start">
          <Icon type="md-list" />
          <span>数据列表</span>
        </div>
        <div class="flex-center-end">
          <Button size="small" @click="newagree">新建协议</Button>
          <Button size="small" @click="newclass">分类管理</Button>
           <Select v-model="size" style="width:120px" placeholder="显示条数" class="space">
              <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select placeholder="排序方式" class="space" style="width: 120px;" v-model="sort">
              <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
      </div>
      <Table border :columns="columns" :data="data"></Table>
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
import {date1} from '../../request/datatime'
import tophead from "../../components/tophead";
import {
  Agreementpage,
  Agreementdel,
  Agreementadd,
  AgreementList
} from "../../request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "协议管理(会员)"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "甲方",
          key: "partA",
          align: "center",

        },
        {
          title: "乙方",
          key: "partB",
          align: "center"
        },
        {
          title: "协议分类",
          key: "agreementTypeText",
          align: "center"
        },
        {
          title: "所属项目",
          key: "categoryName",
          align: "center",

        },
        {
          title: "协议时间",

          align: "center",
          render: (h, params) => {
            return h("div",date1('Y-m-d',params.row.agreementTimestamp) );
          }
        },
        {
          title: "相关",
          key: "agFile",
          width: "100px",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "red"
                  },
                  on: {
                    click: () => {
                      //   this.$router.push({ name: 'vp_edquestion' })
                    }
                  }
                },
                "附件"
              )
            ]);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276"
                  },
                  on: {
                    click: () => {
                      //   this.$router.push({ name: 'vp_edquestion' })
                    }
                  }
                },
                "上传附件"
              ),
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#097276",
                    padding: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ name: "newagree",query: {
                          agreementId: params.row.agreementId
                        }});
                    }
                  }
                },
                "详情"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "red"
                  },
                  on: {
                    click: () => {
                      this.delete(params.row.agreementId)
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [],
      page: 1, //每页显示多少数据
      size: 10, //数据条数
      dataCount: 0,
      pageSize: 10,
      agreementId:'',
      sysType:1,
      agreementObject:'',
      agreementType:'',
      top: [
        { name: "甲乙方", type: "input", value: "" },
        {
          name: "协议分类",
          type: "select",
          list: [],
          value: ""
        }
      ],
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
    };
  },

  components: { tophead },

  computed: {},

  created() {
    this.getAgreementList()
    this.getAgreementpage()
  },
  //事件监听
  watch: {
    size: "getAgreementpage",
    sort: "getAgreementpage"
  },

  methods: {
    //协议分页
    getAgreementpage() {
      Agreementpage({
        page:{ page: this.page, size: this.size, sort: "createAt" + " " + this.sort},
        sysType: this.sysType,
        agreementObject: this.agreementObject,
        agreementType: this.agreementType
      }).then(res => {
        console.log(res);
        if(res.code==200){
          this.data=res.data.list
          this.dataCount = res.data.totalSize;
        }

      });
    },
    //删除协议
    getAgreementdel() {
      Agreementdel({
        agreementId: this.agreementId
      }).then(res => {
        if(res.code==200){
          this.getAgreementpage()
          this.$Message.info(res.msg);
        }
        console.log(res);
      });
    },

    //协议分页列表
    getAgreementList() {
      AgreementList({
      }).then(res => {
        console.log(res);
        if(res.code==200){
          res.data.unshift({dataKey:'0',dataValue:'全部'})
          this.top[1].list=res.data
        }
      });
    },

    //查询
    query(e){
      this.agreementObject=e[0].value
      if(e[1].value==0){
        this.agreementType=''
      }else{
        this.agreementType=e[1].value
      }
      this.getAgreementpage()
      console.log(e)
    },

    newagree() {
      this.$router.push({ name: "newagree" });
    },
    newclass() {
      this.$router.push({ name: "agreeclass" });
    },
    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getAgreementpage();
    },
    //删除
    delete(e){
      this.agreementId=e
      this.getAgreementdel()
    },

    //查看
    See(){
      this.getAgreementpage();
    }
  },
  mounted(){

  }
};
</script>
<style lang="scss">
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
button {
  margin-right: 0.5rem;
}
</style>
