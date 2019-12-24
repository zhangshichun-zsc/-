<!--资讯列表(会员)-->
<template>
  <div class="main">
    <Modal
      v-model="modal1">
      <img :src="showImg" alt="" class="showimg"/>
    </Modal>
    <Navigation :labels="navigation1"></Navigation>
    <div class="top flex-center-start">
      <div class="flex-center-start">
        <p style="margin-right:20px;">
          <span>资讯标题:</span>&nbsp;
          <Input size="large" placeholder="标题关键字" style="width: 200px" v-model="querys.title" />
        </p>
        <p>
          <span>资讯分类:</span>&nbsp;
          <Select style="width:200px" placeholder="全部" v-model="querys.infomationType">
            <Option :value="''">全部</Option>
            <Option
              v-for="item in type"
              :value="item.dataKey"
              :key="item.dataValue"
            >{{ item.dataValue }}</Option>
          </Select>
        </p>

      </div>
        <Button @click="query()" shape="circle" size='large' class="table-btns">查询</Button>
    </div>
    <div class="content">
      <div class="con">
        <div class="title flex-center-start">
          <p>
            <Icon type="ios-list" />
            <span>数据列表</span>
          </p>
          <div class="but">
            <Button @click="addBut()">新增</Button>
            <Button @click="MgtBut()">分类管理</Button>
           <Select v-model="size" style="width:120px;margin-right:5px;" placeholder="显示条数" class="space">
              <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select placeholder="排序方式" class="space" style="width: 120px;" v-model="sort">
              <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
      </div>
      <Table ref="selection" border :columns="columns" :data="data" @on-selection-change="handleSelectionChange"></Table>
      <div class="row">
        <div>
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status"></Checkbox>全选
          </Button>
          <Select placeholder="批量操作" style="width: 150px" v-model="batch">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px" @click="batches()">确定</Button>
        </div>
        <div><Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          style="margin: auto"
          :page-size="size"
          @on-change="changepages"
        /></div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from '@/request/datatime'
import { AddressList, AddressType, AddressDel } from "@/request/api";
import { filterNull } from '@/libs/utils'
export default {
  data() {
    return {
      navigation1: {
        head: "资讯管理(会员)"
      },
      modal1:false,
      showImg:'',
      data: [],
      columns: [
        {
          type: "selection",
          width: 100,
          align: "center",
        },
        {
          title: "图片",
          key: "coverImg",
          width: 120,
          align: "center",
          render: (h,params) => {
            return h("Icon", {
              props: {
                type: 'md-images',
              },
              on: {
                click: () => {
                  this.modal1 = true
                  this.showImg = params.row.coverImgPath
                }
              }
            });
          }
        },
        {
          title: "标题",
          key: "title",
          width: 600,
          ellipsis: true,
          tooltip: true,
          align: "center"
        },
        {
          title: "展示窗口",
          key: "showLocationText",
          width: 300,
          align: "center"
        },
        {
          title: "分类",
          key: "informationTypeText",
          width: 300,
          align: "center"
        },
        {
          title: "热门",
          key: "status",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  trueValue: 1,
                  falseValue: 0,
                  value: ~~params.row.hotFlag
                },
                on: {
                  "on-change": e => {
                    this.getAddressDel(params.row.informationId, e);
                  }
                }
              })
            ]);
          }
        },
        {
          title: "上线",
          key: "status",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  trueValue: 1,
                  falseValue: 0,
                  value: ~~params.row.isOnline 
                },
                on: {
                  "on-change": e => {
                    this.getHot(params.row.informationId, e);
                  }
                }
              })
            ]);
          }
        },
        {
          title: "资讯所属",
          width: 200,
          key: "informationOwner",
          align: "center"
        },
        {
          title: "发布时间",
          key: "releaseTimestamp",
          width: 300,
          align: "center",
          render:(h,params)=>{
              return h("div",formatDate(params.row.releaseTimestamp))
          }
        },
        {
          title: "相关",
          align: "center",
          width: 300,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                 {
                  style: {
                    marginRight: "5px",
                  },
                },
                ("收藏:"+(params.row.collectionNum))
              ),
              h(
                "span",
                ("阅读:"+params.row.readNum)
              ),
            ])
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width:250,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  clssName: "action",
                  style: {
                    color: "#FF566A"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "NewInformation_hy",
                        query: {
                          informationId: params.row.informationId,
                        }
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "#FF566A"
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
        { value: "5", label: "取消上线" },
        { value: "4", label: "设置上线" },
        { value: "3", label: "取消热门" },
        { value: "2", label: "设置热门" },
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
      querys:{
        title:'',
        infomationType:''
      }
    };
  },
  //事件监听
  watch: {
    'size':()=>{
      this.getAddressList()
    },
    'sort':()=>{
      this.getAddressList()
    },
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
      this.page = 1
      this.title = this.querys.title
      this.infomationType = this.querys.infomationType
      this.$Message.success("查询成功")
      this.getAddressList();
    },

    // 质询列表
    getAddressList() {
      AddressList(filterNull({
        sysType: this.sysType,
        title: this.title,
        infomationType: this.infomationType,
        page: { page: this.page, size: this.size, sort: "createAt" + " " + this.sort}
      })).then(res => {
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
      this.getAddressList();
    },
    // 质询类型
    getAddressType() {
      AddressType({}).then(res => {
        console.log(res);
        if(res.code==200){
          this.type = res.data;
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
        this.batch = 3;
      } else {
        this.batch = 2;
      }
      AddressDel({
        informationIds: index,
        type: this.batch
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info("操作成功");
        }
      })
    },
    //是否热门
    getHot(index, del) {
      if (del == false) {
        this.batch = 5;
      } else {
        this.batch = 4;
      }
      AddressDel({
        informationIds: index,
        type: this.batch
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info("操作成功");
        }
      })
    },

    // 删除按钮
    remove(id) {
      AddressDel({
        informationIds: id,
        type: 1
      }).then(res => {
        if (res.code == 200) {
          this.getAddressList();
          this.$Message.info("删除成功");
        }
      })
    },

     //批量操作
    batches() {
      if (this.arr.length == 0) {
        this.$Message.error("请至少选择一个");
      } else {
        //操作接口
        AddressDel({
          informationIds: this.arr,
          type: this.batch
        }).then(res => {
          if (res.code == 200) {
            this.getAddressList();
            this.$Message.info(res.msg);
            this.status = false;
            this.$refs.selection.selectAll(this.status);
          }
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
.showimg{
    width: 100%;
    height: auto;
}
.content{
  .btn{
    background: #FF565A !important;
    color: #fff !important;
    border-color:none !important;
  }
  .btn:hover{
    border:1px solid #FF565A !important;
    color: #FF565A !important;
    background: #fff !important;
  }
}
html,
body {
  margin: auto;
}
.main {

}
.content {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
}
.top {
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
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
  justify-content: space-between;
  margin-bottom: 20px;
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
.row{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
</style>
