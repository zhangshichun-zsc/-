<!--项目活动统计(会员)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="head flex-center-start">
        <p>
          <span>项目统计报表</span>
        </p>
        <div class="flex-center-between">
          <Button style="margin-right: 5px">导出数据</Button>
          <ButtonGroup style="margin-right: 5px">
            <Button type="primary">最近7天</Button>
            <Button>最近30天</Button>
            <Button>最近90天</Button>
          </ButtonGroup>
          <DatePicker type="daterange" split-panels placeholder="Select date" style="width: 200px"></DatePicker>
        </div>
      </div>
      <div class="data">
        <div class="tj">
          <div>
            <span>项目覆盖</span>&nbsp;
            <span>4</span>
            <span>活动数量</span>&nbsp;
            <span>20</span>
          </div>
          <div>
            <span>营员人次</span>&nbsp;
            <span>4</span>
            <span>家长人次</span>&nbsp;
            <span>20</span>
            <span>工作人员人次</span>&nbsp;
            <span>1500</span>
            <span>志愿者人次</span>&nbsp;
            <span>20</span>
          </div>
        </div>
        <div class="table">
        <Table border :columns="columns" :data="data"></Table>
           <div class="filter">
            <Icon type="md-color-filter" @click="modal1=true"/>
           </div>
           <Modal v-model="modal1" >
             <ul>
               <li>
                 <Checkbox>全选</Checkbox>
               </li>
               <li>
                 <Checkbox>老友陪伴</Checkbox>
               </li>
               <li>
                 <Checkbox>快乐活动营</Checkbox>
               </li>
               <li>
                 <Checkbox>趾印计划</Checkbox>
               </li>
               <li>
                 <Checkbox>招募实习生</Checkbox>
               </li>
             </ul>
          </Modal>
        </div>
      </div>
      <div class="pages">
        <Page :current.sync='page' :total="100" show-elevator show-total size='small'/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        modal1:false,
        navigation1: {
          head: "项目活动统计(会员)"
        },
        data:[],
        columns:[
          {
            title:'项目名称',
            key:'Project',
            align: 'center'
          },{
            title:'活动名称',
            key:'ActivityName',
            align: 'center'
          },{
            title:'活动日期',
            key:'Date',
            align: 'center'
          },{
            title:'活动人员人数',
            key:'ActivityNumber',
            align: 'center'
          },{
            title:'家长人数',
            key:'ParentsNumber',
            align: 'center'
          },{
            title:'志愿者人数',
            key:'VolunteersNumber',
            align: 'center'
          },{
            title:'工作人员人数',
            key:'staffNumber',
            align: 'center'
          }
        ]

      }
    }
  }
</script>

<style scoped>
  html,body{
    margin: auto;
  }
  .main{
    background-color: #ffffff;
    border: 1px solid #E4E4E4;
  }
  .content{
    border: 1px solid #E4E4E4;
    margin: 10px;
  }
  .head{
    background-color: #F3F3F3;
    justify-content: space-between;
    padding: 5px 20px;
  }
  .data{
    padding: 10px 20px;
  }
  .tj{
    width: 100%;
    border-radius: 5px;
    background-color: #C7F7ED;
    color: #138C74;
    font-size: 22px;
    font-weight: 700;
    padding: 20px 10px;
    justify-content: flex-start;
  }
  .tj{
    margin-bottom: 20px;
  }
  .tj div{
    margin:20px 0;
  }
  .tj  div span:nth-child(2n){
    border-right: 1px solid #18BB9B;
    padding: 0 10px 0 0;
  }
  .tj  div span:nth-child(2n-1){
    padding: 0 0 0 10px;
  }
  .pages{
    display: flex;
    justify-content: center;
  }
  .table{
    position: relative;
  }
  .filter{
    position: absolute;
    top: 0.5rem;
    left: 5rem;
  }
  li{
    width: 300px;
    height: 40px;
    line-height: 40px;
    border: 1px solid gray;
    border-top: none;
    margin:0 auto
  }

</style>
