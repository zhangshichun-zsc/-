<!--登录日志(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="main">
      <ButtonGroup>
        <Button @click="userDetaile()">用户详情</Button>
        <Button @click="Editor()">编辑资料</Button>
        <Button type="success">登录日志</Button>
      </ButtonGroup>
      <div class="constant">
        <div class="constant-title flex-center-start">
          <Icon type="md-reorder" size='20'/>
          <p>数据列表</p>
        </div>
        <Table border :columns="columns" :data="data"></Table>
        <div class="pages">
          <Page :total="dataCount" show-elevator show-total size='small':page-size="pageSize" @on-change="changepages"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { date1 } from "../../request/datatime";
import {Userhistory} from '../../request/api'
  export default {
    data () {
      return {
        navigation1: {
          head: "登录日志(会员)"
        },
        columns: [
          {
            title: '时间',
            key: 'createAt',
            render: (h, params) => {
            return h("div", [
              h("p",date1("Y-m-dH:i:s", params.row.startAt)),
            ]);
          }
          },
          {
            title: 'IP',
            key: 'ipAddr'
          },
          {
            title: '地区',
            key: 'address'
          },
          {
            title: '登录方式',
            key: 'typeFlag'
          }
        ],
        data: [],
        page: 1,
        size: 6,
        pageSize: 6,
        dataCount: 0,
        userId: 2,
        sysType: 1,
      }
    },
    methods: {
      userDetaile(){
        this.$router.push({ name: 'user_details_hy' })
      },
      Editor(){
        this.$router.push({ name: 'Edit_data_hy' })
      },

        //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.gethistory();
    },
    
        //列表数据
    gethistory(){
      Userhistory({
        page: { page: this.page, size: this.size },
        sysType: this.sysType,
        userId:this.userId
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.data = res.data.list;
          this.page = res.data.pageNum;
          this.dataCount = res.data.totalSize;
          this.size=res.data.pageSize
          // if (e == 1) {
          // } else if (e == 2) {
          //   this.$Message.info("操作成功");
          // } else if (e == 3) {
          //   this.$Message.info("查询成功");
          // } else {
          // }
          // this.$Message.info("操作成功");
        }
      });
    }
    },
    mounted(){
      this.gethistory()
    }
  }
</script>

<style lang="scss" scoped>
  .main{
    width: 50rem;
    margin: 0 auto;
  }
  .constant-title{
    border-top: 1px solid #e4e4e4;
    border-left: 1px solid #e4e4e4;
    border-right: 1px solid #e4e4e4;
    padding: 0.5rem;
    background-color: #F3F3F3;
  }
  .pages{
    border-left: 1px solid #e4e4e4;
    border-right: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding: 0.2rem 0;
  }
</style>
