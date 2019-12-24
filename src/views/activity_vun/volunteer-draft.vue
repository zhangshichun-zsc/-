<!--志愿者活动管理(会员)-->

<template>
  <div class="integral">
     <Modal
      v-model="modal4">
      <img :src="showImg" alt="" class="showimg"/>
    </Modal>
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
          @on-selection-change="handleSelectionChange"
        ></Table>
          <Modal draggable ok-text="导出" v-model="modal3" title="自定义展示字段">
            <div class="popup">
              <p class="popup-head">
                <span>目前导出字段顺序</span>
                <span class="popup-head-tit">拖拽调整列显示顺序</span>
              </p>
              <div class="popup-content">
                <p>
                  <span>序号</span>
                  <span>姓名</span>
                  <span>性别</span>
                  <span>手机号码</span>
                  <span>身份证号</span>
                  <span>年龄</span>
                  <span>孩子姓名</span>
                </p>
                <p>
                  <span>孩子性别</span>
                  <span>孩子年龄</span>
                  <span>签名（孩子）</span>
                  <span>签名(家长)</span>
                  <span>障碍类型</span>
                </p>
              </div>
              <div class="bft">
                <p>备选字段</p>
                <div class="bft-tab">
                  <CheckboxGroup v-model="fruit">
                    <Checkbox label="香蕉">序号</Checkbox>
                    <Checkbox label="苹果">姓名</Checkbox>
                    <Checkbox label="西瓜">障碍类型</Checkbox>
                  </CheckboxGroup>
                </div>
              </div>
            </div>
          </Modal>

      </div>
      <Modal v-model="addstate" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <span>下架确定</span>
        </p>
        <div style="text-align:center">
          <p>是否确认下架，下架后无法上架</p>
        </div>
        <div slot="footer">
          <Button type="error" @click="modalCancel">取消</Button>
          <Button type="success" @click="modalOkdel">确定</Button>
        </div>
      </Modal>
      <Page
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
 getDraft
} from "../../request/api";
import { SERVER_URl } from '@/request/http.js'
import { constants } from 'fs';
export default {
  inject: ['reload'],
  data() {
    return {
      navigation1: {
        head: "活动管理(会员)"
      },
      columns: [
        {
          title: "活动名称",
          key: "activityName",
          align: "center",
          width:500,
          ellipsis: true,
          tooltip: true,
        },
        {
          title: "提交时间",
          key: "startTimestamp",
          align: "center",
          width:300,
          render: (h, params) => {
            return h("div", formatDate(params.row.startTimestamp));
          }
        },
        {
          title: "活动类型",
          width:200,
          key: "activityType",
          align: "center"
        },
        {
          title: "创建人",
          width:180,
          key: "otherSignUpCount",
          align: "center"
        },
         {
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
                        path: "editing",
                        query: { id: params.row.acitvityId }
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "10px",
                    marginLeft: "10px",
                    color: "#FF565A",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "profile",
                        query: { acitvityId: params.row.acitvityId,activityName: params.row.activityName }
                      });
                    }
                  }
                },
                "概况"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "10px",
                    color: "#FF565A",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: "activity_share" });
                    }
                  }
                },
                "发布"
              )
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
