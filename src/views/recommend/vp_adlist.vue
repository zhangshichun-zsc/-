<!-- 广告列表(志愿者) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <!-- <div class="flex-center-between integral-top">
        <div>
          <Icon type="ios-search-outline" />
          <span>筛选查询</span>
        </div>
        <div class="flex-center-end">
          <div class="integral-center">
            <Icon type="ios-arrow-down" />
            <span>收起筛选</span>
          </div>

        </div>
      </div> -->
      <Modal
      v-model="modal1">
      <img :src="showImg" alt="" class="showimg"/>
      <span slot="footer"></span>
    </Modal>
      <div class="flex-center-start integral-body cnm cnmd">
        <div class="flex-center-start">
          <span style="width:80px">广告名称:</span>
          <Input size="large" placeholder="广告名称" class="inpt" v-model="title" />
        </div>
        <div class="flex-center-start">
          <span style="width:80px">广告位置:</span>
          <Select style="width:200px" placeholder="全部" class="inpt" v-model="location">
            <Option
              v-for="item in locations"
              :value="item.dicCode"
              :key="item.dicCode"
            >{{ item.dataValue }}</Option>
          </Select>
        </div>
        <div class="flex-center-start">
          <span style="width:80px">到期时间:</span>
          <Select style="width:200px" placeholder="全部" class="inpt" v-model="time">
            <Option v-for="item in timeLists" :value="item.time" :key="item.time">{{ item.label }}</Option>
          </Select>
        </div>
        <Button class="search" @click="result">查询</Button>
          <Button  class="table-btns" @click="add">添加广告</Button>
      </div>
    </div>

    <div class="integral-table">
      <div class="table-header flex-between">
        <div class="flex-center-start">
          <Icon type="md-list" />
          <span>数据列表</span>
        </div>

          <div>
             <Select v-model="size" style="width:120px;margin-right:5px" placeholder="显示条数" class="space">
        <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
            <Select placeholder="排序方式" class="space" style="width: 120px;" v-model="sort">
              <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>

        </div>
      </div>
      <Table
        ref="selection"
        border
        :columns="columns"
        :data="data"
        @on-selection-change="tablechange"
      ></Table>
      <!-- <div class="batch">
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status">全选</Checkbox>
          </Button>
          <Select placeholder="批量操作" style="width: 150px" v-model="batch">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px" @click="batches()">确定</Button>
        </div>

      <div class="pages flex-center-between cnm">

        <Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          style="margin: auto"
          :page-size="size"
          @on-change="changepages"
        />
      </div> --> 
      <div class="row">
        <div>
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status">全选</Checkbox>
          </Button>
          <Select placeholder="批量操作" style="width: 150px" v-model="batch" placement='top'>
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px" @click="batches()">确定</Button>
        </div>
        <div style="margin-right:20px;">
          <Page
          :.sync='page'
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          :page-size="size"
          @on-change="changepages"
        /></div>
      </div>
      <Modal v-model="isDelete" @on-ok='deleteAdd()'>
        <div>是否删除该广告</div>
      </Modal>
    </div>
  </div>

</template>

<script>
import { formatDates } from "../../request/datatime";
import {
  AdvertisingList,
  AdvertisingDetails,
  AdvertisingBatch,
  AdvertisingPage,
  AdvertisingRoof
} from "../../request/api";
export default {
  data() {
    return {
      model1: "",
      locations: [],
      timeLists: [
         {
          label:'全部',
          time:0
        },
        {

          label: "一天内",
          time: 86400001
        },
        {

          label: "三天内",
          time: 259200001
        },
        {

          label: "一周内",
          time: 604700000
        }
      ],

      navigation1: {
        head: "广告列表"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "广告名称",
          key: "title",
          align: "center",
          width: 220,

        },
        {
          title: "广告位置",
          key: "locationText",
          align: "center",
           width: 220,
        },
        {
          title: "广告图片",
          key: "picUrl",
          align: "center",
           width: 180,
          render: (h,params) => {
             return h("Icon", {
              props: {
                type: 'md-images',
              },
              on: {
                click: () => {
                  this.modal1 = true
                  this.showImg = params.row.picUrl
                }
              }
            });

          }
        },
        {
          title: "起止时间",
          key: "time",
          align: "center",
          width:340,
          render: (h, params) => {
            return h("div",
              formatDates(params.row.startAt)+'~'+formatDates(params.row.endAt),

            );
          }
        },
        {
          title: "上线",
          key: "online",
          align: "center",
          width:180,
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.status == 1
                },
                on: {
                  input: e => {
                    if (e == false) {
                      this.getAdvertisingRoof(params.row.contentId,0,3);
                    } else if (e == true) {
                      this.getAdvertisingRoof(params.row.contentId,1,3);
                    }
                  }
                }
              })
            ]);
          }
        },
        {
          title: "点击次数",
          key: "clickCount",
          align: "center",
          width:160
        },
        {
          title: "操作",
          key: "action",
          align: "center",
           width:255,
          render: (h, params) => {
            let Roof='置顶'
            if(params.row.topFlag==1){
              Roof='取消置顶'
            }
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#FF566A"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "vp_add",
                        query: {
                          contentId: params.row.contentId
                        }
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
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "#FF566A"
                  },
                  on: {
                    click: () => {
                      if(params.row.topFlag==1){
                        this.getAdvertisingRoof(params.row.contentId,0,1);
                      }else{
                        this.getAdvertisingRoof(params.row.contentId,1,1);
                      }
                    }
                  }
                },
                Roof
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "#FF566A"
                  },
                  on: {
                    click: () => {
                      this.isDelete = true
                      this.deleteId = params.row.contentId
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
      batchList: [
        { value: "1", label: "删除" },
        { value: "2", label: "上线" },
        { value: "3", label: "下线" },
        { value: "4", label: "置顶" },
        { value: "5", label: "取消置顶" }
      ],
       Article: [{ value: 10,label: 10 },{ value: 15,label: 15 },{ value: 20,label: 20 }],
      sorting: [{ value: "asc", label: "正序" },{ value: "desc", label: "倒序" }],
      sort:"asc",
      page: 1,
      size: 10,
      dataCount: 0,
      title: "",
      sysType: 1,
      location: "",
      endTimeStamp: "",
      time: 0,
      status: false,
      arr: [],
      batch: null,
      modal1:false,
      showImg:'',
      isDelete:false,
      deleteId:''
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {

    add() {
      this.$router.push({ name: "vp_add" });
    },
    deleteAdd(){
      this.getAdvertisingRoof(this.deleteId, 0,2)
    },
    //列表
    getAdvertisingList() {
      AdvertisingList({
        sysType:this.sysType
      }).then(res => {
        if (res.code == 200) {
          this.locations = res.data;
        }
        console.log(res);
      });
    },
    //分页功能
    changepages(index) {
      this.page = index;
      this.getAddressList();
    },
    //列表数据
    getAdvertisingPage() {
      if(this.time==0){
        this.endTimeStamp=''
      }else{
        this.endTimeStamp = this.time + new Date().getTime();
      }
      AdvertisingPage({
        page: { page: this.page, size: this.size,sort: "createAt" + " " + this.sort },
        title: this.title,
        sysType: this.sysType,
        location: this.location,
        endTimeStamp: this.endTimeStamp
      }).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.data = res.data.list;
          this.dataCount = res.data.totalSize;
        }
      });
    },
    //批量操作接口
    getAdvertisingBatch() {
      AdvertisingBatch({
        contentIds: this.arr,
        adContentOprType: this.batch
      }).then(res => {
        if (res.code == 200) {
          this.getAdvertisingPage();
        }
        console.log(res);
      });
    },

    //置顶
    getAdvertisingRoof(ids,flag,type){
      AdvertisingRoof({
        contentId:ids,
        topFlag:flag,
        type:type
      }).then(res=>{
        if(res.code==200){
           this.getAdvertisingPage();
        }
        console.log(res)
      })
    },



    //每条数据单选框的状态
    tablechange(selection) {
      this.arr = selection;
      if (this.arr.length == this.dataCount&&this.dataCount!=0||this.arr.length==this.size) {
        this.status = true;
      } else {
        this.status = false;
      }
    },

    //全选按钮
    chackall() {
      this.status = !this.status;
      this.$refs.selection.selectAll(this.status);
    },

     //批量操作
    batches() {
      if (this.arr== "") {
        this.$Message.error("至少选择一个");
      } else if (this.batch == "") {
        this.$Message.error("请选择操作类型");
      } else {
        this.arr = this.arr
          .map(item => {
            return item.contentId;
          })
          .toString();
        this.getAdvertisingBatch();
        this.status = false;
      }
    },



    //查询
    result() {
      this.page=1
      this.getAdvertisingPage();
    }
  },
    //事件监听
  watch:{
    'size':'getAdvertisingPage',
    'sort':'getAdvertisingPage'

  },
  mounted() {
    this.getAdvertisingList();
    this.getAdvertisingPage();
  }
};
</script>
<style lang="scss" scoped>

.integral-header .integral-top {
  padding: 15px 20px;
  background: rgb(228, 228, 228);

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

}
.integral-header .integral-body .flex-center-start {
  margin-right: 20px;
}

.table-header {
  height: 50px;
  padding: 5px 20px;
  background: #ffffff;
  border: 0px solid #eee;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.table-header .table-btn {
  margin-right: 15px;
}
 .pages {
  padding: 30px 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  background: #fff;
    text-align: center;
}

.ipt {
  margin-left: 10px;
}
.sdate {
  margin-left: 15px;
}
.showimg{
    width: 100%;
    height: auto;
}

.name {
  span {
    display: block;
    width: 100px;
  }
  .inpt {
    margin-right: 30px;
  }
}

.batch{
  background: #ffff;
    padding: 30px 0;
}
.cnmd{
  margin-bottom: 20px;
}
.cnm{
  border-radius: 10px;
}
.row{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.space{
  margin-left: 10px
}
</style>
