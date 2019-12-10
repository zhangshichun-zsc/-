<!--活动反馈列表(志愿者)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con-top bk-szy flex-center-start">
        <p>
          <Icon type="ios-search" size="30" />
          <span>筛选查询</span>
        </p>
        <div class="flex-center-end">
          <div class="Pack">
            <Icon type="ios-arrow-down" />
            <span>收起筛选</span>
          </div>
          <Button size="small" @click="query()">查询结果</Button>
        </div>
      </div>
      <div class="con bk inp flex-center-start">
        <p>
          <span>活动名称:</span>&nbsp;
          <Input size="small" placeholder="活动名称" style="width: 8rem" v-model="querys.activityName"/>
        </p>
        <p>
          <span>所属项目:</span>&nbsp;
          <Select style="width:6rem;" size="small" v-model="querys.categoryId" placement='top'>
            <Option :value="''">全部</Option>
            <Option v-for="item in OptionsList" :value="item.categoryId" :key="item.value">{{ item.name }}</Option>
          </Select>
        </p>
      </div>
    </div>
    <div class="content">
      <div class="con-top bk-szy flex-center-start">
        <p>
          <Icon type="ios-list" size="30" />
          <span>数据列表</span>
        </p>
        <div class="flex-center-end">
          <Select size='small' placeholder="显示条数" @on-change='changeNum'>
              <Option :value="item" v-for='(item,index) in numList' :key="index">{{ item }}</Option>
          </Select>
            <Select size='small' placeholder="排序方式"  @on-change='changeSort'>
            <Option value="create_at desc">升序</Option>
            <Option value="create_at asc">降序</Option>
          </Select>
        </div>
      </div>
      <div class="con">
        <Table ref="selection" border :columns="columns" :data="data" @on-selection-change="tablechange"></Table>
      </div>
      <div class="pages">
        <div class="batch">
          <Button @click="chackall()">
            <Checkbox v-model="status" style="border:0px;">全选</Checkbox>
          </Button>
          <!-- <Select placeholder="批量操作" style="width: 150px" v-model="batch">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px" @click="batches()">确定</Button> -->
        </div>
        <Page :total="dataCount" show-elevator show-total size="small" :page-size="size" @on-change="changepages" />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/request/datatime'
import { Activitypage, Activitybatch, getTypeFeed } from '@/request/api'
import { filterNull } from '@/libs/utils'
export default {
  data() {
    return {
      navigation1: {
        head: '活动反馈列表(志愿者)'
      },
      OptionsList: [
      ],
      data: [],
      page: 1, //每页显示多少数据
      size: 10, //数据条数
      dataCount: 10,
      sysType: 2,
      activityName: null,
      categoryId: null,
      sort:null,
      arr: [],
      numList:[10,15,20],
      batch: null,
      status: false,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '活动名称',
          key: 'activityName',
          align: 'center'
        },
        {
          title: '项目名称',
          key: 'categoryName',
          align: 'center'
        },
        {
          title: '反馈人数',
          key: 'feedbackNum',
          align: 'center'
        },
        {
          title: '活动时间',
          key: 'activityTimestamp',
          align: 'center',
          render: (h, params) => {
            return h('div', [h('p', formatDate(params.row.activityTimestamp))])
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'a',
                {
                  clssName: 'action',
                  style: {
                    marginRight: '5px',
                    color: 'green'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'ActivityFeedbackDetails_zyz',
                        query: {
                          activityId: params.row.activityId,
                          name: params.row.activityName
                        }
                      })
                    }
                  }
                },
                '反馈统计'
              ),
              h(
                'a',
                {
                  clssName: 'action',
                  style: {
                    marginRight: '5px',
                    color: 'green'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'ActivityFeedback',
                        query: {
                          activityId: params.row.activityId
                        }
                      })
                    }
                  }
                },
                '查看'
              )
              // h(
              //   "a",
              //   {
              //     style: {
              //       color: "green"
              //     },
              //     on: {
              //       click: () => {
              //         this.remove(params.row.activityId);
              //       }
              //     }
              //   },
              //   "删除"
              // )
            ])
          }
        }
      ],
      // batchList: [{ value: "1", label: "删除" }],
      modalView: false,
      FeedbackDate: {
        FeedbackIntroduction:
          ' 恭喜您已成功参与活动！为了了解您的活动感受，进一步做好今后的活动工作，我们特进行此活动反馈，以便根据您的意见与建议，更加科学地、有针对性地改进课程，更好地满足您的需求。',
        FeedbackSuggestions: '希望此类活动更多些'
      },
      choose1: 'choose-A',
      choose2: 'choose-C',
      querys:{
        activityName:'',
        categoryId:null
      },
      userId:null
    }
  },
  created(){
    this.userId = this.$store.state.userId
    this.getActivitypage()
  },
  methods: {
     getType(){
      getTypeFeed({ sysId:1 }).then(res => {
        this.OptionsList = res.data
      })
    },
    query(){
      this.page = 1
      this.activityName = this.querys.activityName
      this.categoryId = this.querys.categoryId
      this.$Message.success("查询成功")
      this.getActivitypage()
    },
    changeNum(e){
      this.size = e
      this.page = 1
      this.getActivitypage()
    },
    changeSort(e){
      this.sort = e
      this.page = 1
      this.getActivitypage()
    },
    ok() {
      this.$Message.info('添加成功')
    },
    cancel() {
      this.$Message.info('已取消')
    },
    getActivitypage() {
       Activitypage(filterNull({
        activityName:this.activityName,
        categoryId:this.categoryId,
        page: { page: this.page, size: this.size,sort:this.sort },
        sysType: this.sysType,
        userId:this.userId
      })).then(res => {
        if (res.code == 200) {
          this.data = res.data.list
          this.dataCount = res.data.totalSize
        }else{
          this.$Message.error(res.msg)
        }
      })
    },

    //批量操作接口
    // getActivityBatch(){
    //     Activitybatch({
    //      feedbackIds:this.arr,
    //      actFeedbackOprType:this.batch
    //     }).then(res => {
    //     if (res.code == 200) {
    //       this.getActivitypage();
    //     }
    //     console.log(res);
    //   })
    // },

    //分页功能
    changepages(index) {
      this.page = index
      this.getActivitypage()
    },

    //全选按钮
    chackall() {
      this.status = !this.status
      console.log(this.status, this.$refs.selection)
      this.$refs.selection.selectAll(this.status)
    },
    //每条数据单选框的状态
    tablechange(selection) {
      this.arr = selection
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true
      } else {
        this.status = false
      }
    }

    //批量操作
    // batches() {
    //   if (this.arr.length>0) {
    //     let arr = [];
    //     for (let i = 0; i < this.arr.length; i++) {
    //       arr.push(this.arr[i].activityId);
    //     }
    //     this.arr = arr.toString();
    //      this.getActivityBatch();
    //   this.status = false;
    //   } else {
    //     let arr = [];
    //     for (let i = 0; i < this.arr.length; i++) {
    //       arr.push(this.data[i].activityId);
    //     }
    //     this.arr = arr.toString();
    //     console.log(this.arr);
    //   }
    // },

    // 删除按钮
    // remove(id) {
    //   // console.log(startid);
    //   this.arr = id;
    //   this.batch=1
    //   this.getActivityBatch(1);
    // },
  }
}
</script>
<style lang="scss" scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
}

.bk {
  border: 1px solid #e4e4e4;
}
.content {
  margin: 1rem;
}
.con-top {
  background-color: #f3f3f3;
  justify-content: space-between;
  padding: 0.2rem 1rem;
}
.bk-szy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
}
.con p {
  margin-right: 3rem;
}
.inp {
  display: flex;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
}
.Pack,
.content button {
  margin-right: 1rem;
}
.pages {
  display: flex;
  justify-content: center;
  margin: 10px auto;
}
.batch {
  margin-left: 25px;
}
</style>
