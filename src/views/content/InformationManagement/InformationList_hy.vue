<!--资讯列表(会员)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con top bk">
        <div class="title bk-xia flex-center-start">
          <p>
            <Icon type="ios-search" />
            <span>筛选查询</span>
          </p>
          <div class="flex-center-end">
            <div class="Pack">
              <Icon type="ios-arrow-down" />
              <span>收起筛选</span>
            </div>
            <Button @click="query()">查询结果</Button>
          </div>
        </div>
        <div class="con inp flex-center-start">
          <p>
            <span>资讯标题:</span>&nbsp;
            <Input size="large" placeholder="标题关键字" style="width: 200px" v-model="title" />
          </p>
          <p>
            <span>资讯分类:</span>&nbsp;
            <Select style="width:200px" placeholder="全部" v-model="infomationType">
              <Option
                v-for="item in type"
                :value="item.dataKey"
                :key="item.dataValue"
              >{{ item.dataValue }}</Option>
            </Select>
          </p>

        </div>
      </div>
      <div class="con">
        <div class="title bk-szy flex-center-start">
          <p>
            <Icon type="ios-list" />
            <span>数据列表</span>
          </p>
          <div class="but">
            <Button @click="addBut()">新增</Button>
            <Button @click="MgtBut()">分类管理</Button>
           <Select v-model="size" style="width:120px" placeholder="显示条数" class="space">
              <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select placeholder="排序方式" class="space" style="width: 120px;" v-model="sort">
              <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        <Table ref="selection" border :columns="columns" :data="data" @on-selection-change="handleSelectionChange"></Table>
      </div>
      <div class="pages">
        <div class="batch">
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status"></Checkbox>全选
          </Button>
          <Select placeholder="批量操作" style="width: 150px" v-model="batch">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px" @click="batches()">确定</Button>
        </div>
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
import {formatDate} from '@/request/datatime'
import { AddressList, AddressType, AddressDel } from "@/request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "资讯管理(会员)"
      },
      data: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "封面图片",
          key: "coverImg",
          align: "center",
          render: (h,params) => {
            return h("img", {
              attrs: {
                src: params.row.coverImgPath
              },
              style: {
                width: "4rem",
                height: "4rem"
              }
            });
          }
        },
        {
          title: "标题",
          key: "title",
          align: "center"
        },
        {
          title: "展示窗口",
          key: "showLocationText",
          align: "center"
        },
        {
          title: "分类",
          key: "informationTypeText",
          align: "center"
        },
        {
          title: "热门",
          key: "status",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.hotFlag == 1
                },
                on: {
                  input: e => {
                    console.log(e)
                    this.getAddressDel(params.row.informationId, e);
                  }
                }
              })
            ]);
          }
        },
        {
          title: "资讯所属",
          key: "informationOwner",
          align: "center"
        },
        {
          title: "发布时间",
          key: "releaseTimestamp",
          align: "center",
          render:(h,params)=>{
              return h("div",formatDate(params.row.releaseTimestamp))
          }
        },
        {
          title: "相关",
          // key: "collectionNum",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "p",

                ("收藏:"+params.row.collectNum)
              ),
              h(
                "p",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                  },
                },
                ("阅读:"+0)
              ),
              h(
                "p",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                  },
                },
                ("评论:"+'0')
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
                "span",
                {
                  clssName: "action",
                  style: {
                    color: "green"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "InformationDetails_hy",
                        query: {
                          informationId: this.data[params.index].informationId
                        }
                      });
                    }
                  }
                },
                "查看"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "green"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.informationId);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
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

      batchList: [
        { value: "2", label: "设为推荐" },
        { value: "3", label: "取消推荐" },
        { value: "4", label: "设为隐藏" },
        { value: "5", label: "设为显示" },
        { value: "1", label: "删除" }
      ],
      page: 1,
      size: 10,
      dataCount: 0,

      title: null,
      infomationType: '',
      type: [],
      sysType: 1,
      informationId: null,
      status: false,
      list: [],
      batch: null,
      informationIds: "",
      arr:[],

    };
  },
  //事件监听
  watch: {
    size: "getAddressList",
    sort: "getAddressList"
  },
  methods: {
    addBut() {
      this.$router.push({ name: "NewInformation_hy" });
    },
    MgtBut() {
      this.$router.push({ name: "InformationClassification_hy" });
    },

    //全选按钮
    chackall() {
      this.status = !this.status;
      console.log(this.status);
      this.$refs.selection.selectAll(this.status);
    },

    // 查询结果按钮
    query() {
      this.getAddressList();
    },

    // 质询列表
    getAddressList() {


      AddressList({
        sysType: this.sysType,
        title: this.title,
        infomationType: this.infomationType,
        page: { page: this.page, size: this.size, sort: "createAt" + " " + this.sort}
      }).then(res => {
        if (res.code == 200) {
          this.data = res.data.list;
          this.dataCount = res.data.totalSize;
        }else{
          this.$Message.error(res.msg)
        }
      });
    },

    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getAddressList();
    },
    // 质询类型
    getAddressType() {
      AddressType({}).then(res => {
        console.log(res);
        if(res.code==200){

          this.type = res.data;
          // this.type=unshift({dataKey:-1,dataValue:'全部'})
        }
      });
    },


    //每条数据单选框的状态
    handleSelectionChange(val){
      this.arr=val
      console.log(this.arr)
      if (this.arr.length == this.dataCount&&this.dataCount!=0||this.arr.length==this.size) {
        this.status = true;
      } else {
        this.status = false;
      }
        this.arr=val.map(item=>{
          return item.informationId
        }).toString()
        console.log(this.arr)
    },

    //是否热门
    getAddressDel(index, del) {
      if (del == false) {
        this.batch = 6;
      } else {
        this.batch = 7;
      }
      console.log(index, del, this.batch);
      AddressDel({
        informationIds: index,
        informationOprType: this.batch
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info("操作成功");
        }
        console.log(res);
      });
    },

    // 删除按钮
    remove(id) {
      console.log(id);
      AddressDel({
        informationIds: id,
        informationOprType: 5
      }).then(res => {
        if (res.code == 200) {
          this.getAddressList();
          this.$Message.info("删除成功");
        }
        console.log(res);
      });
    },

     //批量操作
    batches() {
      if (this.arr.length == 0) {
        this.$Message.error("请至少选择一个");
      } else {
        //操作接口
        AddressDel({
          informationIds: this.arr,
          informationOprType: this.batch
        }).then(res => {
          if (res.code == 200) {
            console.log(this.arr);
            this.getAddressList();
            this.$Message.info(res.msg);
            this.status = false;
            this.$refs.selection.selectAll(this.status);
          }
          console.log(res);
        });
      }
    }
  },
  mounted() {
    this.getAddressType();
    this.getAddressList();
  }
};
</script>
<style lang="scss" scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
  border: 1px solid #e4e4e4;
}
.content {
  margin: 10px;
}
.top {
  margin-bottom: 20px;
}
.bk {
  border: 1px solid #e4e4e4;
}
.bk-xia {
  border-bottom: 1px solid #e4e4e4;
}
.bk-szy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
}
.title {
  background-color: #f3f3f3;
  justify-content: space-between;
  padding: 5px 20px;
}
.con p {
  margin-right: 1rem;
}
.Pack,
.but button {
  margin-right: 5px;
}
.inp {
  display: flex;
  justify-content: flex-start;
  padding: 10px 20px;
}
.pages {
  display: flex;
  justify-content: center;
  margin: 10px auto;
}
</style>
