<!--操作日志(共用)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div  class="con top bk">
        <div class="title bk-xia flex-center-start">
          <p>
            <Icon type="ios-search" />
            <span>筛选查询</span>
          </p>
          <div class="flex-center-end">
            <div class="Pack">
              <Icon type="ios-arrow-down"/>
              <span>收起筛选</span>
            </div>
            <Button>查询结果</Button>
          </div>
        </div>
        <div class="con sx-con flex-center-start">
          <div class="options flex-center-start">
            <p>
              <span>操作人员:</span>
            </p>
            <Select style="width:200px">
              <Option v-for="item in operatorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="options flex-center-start">
            <p>
              <span>操作日期:</span>
            </p>
            <DatePicker type="date" placeholder="请选择日期" style="width: 200px"></DatePicker>
          </div>
        </div>
      </div>
      <div class="con">
        <div class="title bk-szy flex-center-start">
          <p>
            <Icon type="ios-list" />
            <span>数据列表</span>
          </p>
          <div class="but flex-center-start">
            <div class="options flex-center-start">
              <p>
                <span>清除日志:</span>
              </p>
              <Select placeholder="选择清除的日期" style="width: 150px">
                <Option v-for="item in worldList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button>确定</Button>
            </div>
            <Select placeholder="显示条数" style="width: 100px">
            </Select>
          </div>
        </div>
        <Table border :columns="columns" :data="data"></Table>
      </div>
      <div class="pages">
        <div class="batch">
          <Checkbox>全选</Checkbox>
          <Select placeholder="批量操作" style="width: 150px">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px">确定</Button>
        </div>
        <Page :total="100" show-elevator show-total size='small' style="margin: auto"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        navigation1: {
          head: "操作日志(共用)"
        },
        operatorList:[

        ],
        worldList:[
          {
            value: 'A week',
            label: '一周之前'
          },
          {
            value: 'A month',
            label: '一个月之前'
          },
          {
            value: 'Three months',
            label: '三个月之前'
          },
          {
            value: 'Half a year',
            label: '半年之前'
          },
          {
            value: 'A year',
            label: '一年之前'
          }
        ],
        numberList:[
          {
            value: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          },
          {
            value: 'Ottawa',
            label: 'Ottawa'
          }
        ],
        data: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '操作者',
            key: 'operator',
            align: 'center'
          },
          {
            title: '操作日期',
            key: 'OperationDate',
            align: 'center'
          },
          {
            title: 'IP地址',
            key: 'IPaddress',
            align: 'center'
          },
          {
            title: '操作记录',
            key: 'OperationRecords',
            align: 'center'
          }
        ],
        batchList:[
          {
            value: 'remove',
            label: '清除'
          }
        ]
      }
    },
  }

</script>
<style lang="scss" scoped>
  html,body{
    margin: auto;
  }
  .main{
    background-color: #ffffff;
    border: 1px solid #E4E4E4;
  }
  .content{
    margin: 10px;
  }
  .top{
    margin-bottom: 20px;
  }
  .bk{
    border: 1px solid #E4E4E4;
  }
  .bk-xia{
    border-bottom: 1px solid #E4E4E4;
  }
  .bk-szy{
    border-left: 1px solid #E4E4E4;
    border-right: 1px solid #E4E4E4;
    border-top: 1px solid #E4E4E4;
  }
  .title{
    background-color: #F3F3F3;
    justify-content: space-between;
    padding: 5px 20px;
  }
  .Pack,
  .but Button{
    margin-right: 5px;
  }
  .sx-con{
    display: flex;
    justify-content: flex-start;
    padding: 10px 20px;
  }
  .options{
    margin-right: 30px;
  }
  .options p{
    margin-right: 5px;
  }
  .pages{
    display: flex;
    justify-content: center;
    margin: 10px auto;
  }
  .batch{
    margin-left: 25px;
  }
</style>
