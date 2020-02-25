<!--志愿者活动管理(会员)-->

<template>
  <div class="integral">
    <Navigation :labels="navigation1"></Navigation>
    <div class="integral-table">
      <div class="table-header flex-between">
       <div>
          <Select size="large" v-model="size"  style="width:150px" placeholder="显示条数" class="table-btn">
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <div class="table">
        <Table
          ref="selection"
          border
          :columns="columns"
          :data="datax"
        ></Table>

      </div>
      <Page
        :current.sync='page'
        :total="dataCount"
        show-elevator
        show-total
        size="small"
        class="pages"
        :page-size="size"
        @on-change="changepages"
      />
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../request/datatime";
import {
 getDraft,
 validVun
} from "../../request/api";
import { SERVER_URl } from '@/request/http.js'
import { constants } from 'fs';
export default {
  inject: ['reload'],
  data() {
    return {
      navigation1: {
        head: "草稿箱(志愿者)"
      },
      columns: [
        {
          title: "活动名称",
          key: "activityName",
          align: "center",
          width:700,
          ellipsis: true,
          tooltip: true,
        },
        {
          title: "提交时间",
          key: "createAt",
          align: "center",
          width:300,
        },
        {
          title: "活动类型",
          width:300,
          key: "typeDicName",
          align: "center"
        },
        {
          title: "创建人",
          width:200,
          key: "createUserName",
          align: "center"
        },
         {
          title: "操作人",
          width: 300,
          key: "action",
          align: "center",
          render: (h, params) => {
            let signup = "关闭报名";
            if (params.row.statusText == "13") {
              signup = "开启报名";
            }
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#FF565A",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "volunteer_issue",
                        query: { activityId: params.row.activityId,isEdit:3 }
                      });
                    }
                  }
                },
                "编辑"
              ),
               h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#FF566A",
                    cursor: "pointer",
                    marginLeft:"10px"
                  },
                  on: {
                    click: () => {
                       this.$Modal.confirm({
                        title: '提示',
                        content: `是否确认删除？`,
                        onOk: () => {
                          this.validVun({
                            activityId: params.row.activityId,
                            valid:'0'
                            // 0 删除 1恢复
                          })
                         
                          }
                      })

                    }
                  }
                },
                "删除"
              ),
            ]);
          }
        },
      ],
      datax: [],
      page: 1,
      size: 10,
      dataCount: 0,
      Article: [
        { value: 10, label: 10 },
        { value: 15, label: 15 },
        { value: 20, label: 20 }
      ],
    };
  },
  components: {},

  computed: {},

  created() {
     this.getactiveManager();
  },
  //事件监听
  watch: {
    size: "getactiveManager",
  },

  methods: {
    //列表和分页
    getactiveManager() {
      getDraft({
        page: {
          page: this.page,
          size: this.size,
        },
        status: 8,
        userId:this.$store.state.userId
      }).then(res => {
        this.$refs.selection.selectAll(false);
        if (res.code == 200) {
          this.dataCount = res.data.totalSize;
          this.datax = res.data.list;
        }
      });
    },
    validVun(obj){
      validVun(obj)
      .then(res=>{
        this.$Message.success('删除成功！')
         // TODO 重新拉取数据
        this.getactiveManager()
      }) 
    },
    changepages(e){
      this.page = e
      this.getactiveManager()
    }
  }
};
</script>
<style lang="scss" scoped>
.btn{
  background: #FF565A !important;
  color: #fff !important;
  border-color:#FF565A !important;
  font-size: 16px;
}
.showimg{
    width: 100%;
    height: auto;
}
.integral-header{
  padding: 20px;
  border-radius: 20px;
  background: #fff;
  font-size: 16px;
  margin-bottom: 20px;
}
.integral-header .integral-top {
  padding: 10px;
  background: white;
}
.integral-header .integral-center {
  margin: 0 20px;
}
.integral-header .integral-body .flex-center-start  span{
  margin-right: 15px;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 180px;
  margin-left: 10px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 40px;
}

.table-header {
  padding: 10px 20px;
  background: white;
}
.table-header .table-btn {
  margin-left: 15px;
  font-size: 16px;
}
.flex-data {
  display: flex;
}
.integral-table {
  padding: 20px 10px;
  background: #fff;
  border-radius: 20px;
}
.popup {
  background: #ffffff;
  .popup-head {
    height: 20px;
    line-height: 20px;
    margin-bottom: 10px;
    .popup-head-tit {
      display: inline-block;
      // width: 140px;
      border: black solid 1px;
      padding: 0 5px;
      margin-left: 20px;
    }
  }
  .popup-content {
    margin-bottom: 20px;
    p {
      span {
        display: inline-block;
        padding: 0 8px;
        line-height: 20px;
        font-size: 14px;
        border: black 1px dashed;
        margin: 5px;
      }
    }
  }
  .bft {
    .bft-tab {
      padding: 15px;
      background: #e4e4e4;
      height: 150px;
    }
  }
}
.pages{
  text-align: center;
  padding: 20px 0;
  background-color: white;
}
</style>
