<!--数据库管理(共用)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con">
        <div class="title bk-szy flex-center-start">
          <p>
            <Icon type="ios-list" />
            <span>数据列表</span>
          </p>
          <div class="but">
            <Button>开始备份</Button>
          </div>
        </div>
        <Table border :columns="DackupColumns" :data="DackupData"></Table>
      </div>
      <div class="pages">
        <Page :total="100" show-elevator show-total size='small' style="margin: auto"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        modal1: false,
        navigation1: {
          head: "数据库管理(共用)"
        },
        DackupData:[],
        DackupColumns:[
          {
            title:'备份文件名',
            key:'BackupName',
            align: 'center'
          },{
            title:'版本号',
            key:'VersionNumber',
            align: 'center'
          },{
            title:'大小(字节)',
            key:'SizeByte',
            align: 'center'
          },{
            title:'备份时间',
            key:'BackupTime',
            align: 'center'
          },
          {
            title:'操作',
            key: "action",
            align: "center",
            render: (h, params) => {
              return h("div",{
                style:{
                  display: "flex",
                  justifyContent:'space-around',
                  fontSize: "16px"
                }
              }, [
                h(
                  "a",
                  {
                    clssName: "action",
                    style: {
                      color: "#1ABD9D"
                    },
                    on: {
                      click: () => {
                        this.modal2 = true
                      }
                    }
                  },
                  "恢复"
                ),
                h(
                  "a",
                  {
                    style: {
                      color: "#1ABD9D"
                    },
                    on: {
                      click: () => {}
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
      }
    },
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
    margin: 10px;
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
  .but Input{
    width: 100px;
  }
  .pages{
    display: flex;
    justify-content: center;
    margin: 10px auto;
  }
</style>
