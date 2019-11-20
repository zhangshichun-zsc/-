<!--资讯分类管理(志愿者)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con-top bk-szy flex-center-start">
        <p>
          <Icon type="ios-list" size="50"/>
          <span>数据列表</span>
        </p>
        <div class="but">
          <Button @click="modalEditor = true">添加</Button>
        </div>
      </div>
      <Table border :columns="CategoryColumns" :data="CategoryData"></Table>
      <Modal
        v-model="modalEditor"
        title="添加分类"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form class="bd" ref="AddDate" :model="AddData" :rules="ruleValidate" :label-width="100">
          <FormItem label="类型名称:" prop="AlbumName">
            <Input style="width: 10rem" v-model="AddData.AlbumName"></Input>
          </FormItem>
          <FormItem label="分类图标:" prop="AlbumCover">
            <Upload style="color: #9EA7B4;"
                    multiple
                    action="//jsonplaceholder.typicode.com/posts/">
              <Button icon="ios-cloud-upload-outline">选择上传文件</Button>
              <p style="font-size: 14px;">
                <span>只能上传jpg/png格式文件，文件不能超过50kb</span>
              </p>
            </Upload>
          </FormItem>
          <FormItem label="是否显示:" prop="WhetherShown">
            <i-switch v-model="AddData.WhetherShown" @on-change="change" />
          </FormItem>
        </Form>
      </Modal>
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
          head: "资讯分类管理(志愿者)"
        },
        CategoryData: [
          {
            CategoryIcon:'',
            CategoryName:'就业辅导',
            CategoryNumbe:'10',
            CategorySort  :'1'
          }
        ],
        CategoryColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '分类图标',
            key: 'CategoryIcon',
            align: 'center',
            render: (h) => {
              return h('img', {
                attrs: {
                  src: '',
                },
                style: {
                  width:"4rem",
                  height:"4rem"
                }
              });
            }
          },
          {
            title: '分类名称',
            key: 'CategoryName',
            align: 'center'
          },
          {
            title: '分类数量',
            key: 'CategoryNumbe',
            align: 'center'
          },
          {
            title:'是否启用',
            key: "status",
            align: 'center',
            render: (h, params) => {
              return h("div", [h("i-switch")]);
            }
          },
          {
            title: '分类排序',
            key: 'CategorySort',
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
                  MaxfontSize: "16px"
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
                        this.modalEditor = true
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "a",
                  {
                    style: {
                      color: "#1ABD9D"
                    },
                    on: {
                      click: () => {
                        this.$Message.info('你点击了第' + params.index + '列')
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
        modalEditor:false,
        AddData:{
          AlbumName:'',
          WhetherShown:true
        },
        ruleValidate:{
          AlbumName:[
            { required: true, message: '类型名称不能为空', trigger: 'blur' }
          ],
          AlbumCover:[
            { required: true, message: '请选择分类图标', trigger: 'blur' }
          ],
        },
        batchList:[
          {
            value: 'SetHidden',
            label: '设为隐藏'
          },
          {
            value: 'SetDisplay',
            label: '设为显示'
          },
          {
            value: 'delete',
            label: '删除'
          }
        ]
      }
    },
    methods: {
      ok () {
        this.$Message.info('添加成功');
      },
      cancel () {
        this.$Message.info('已取消');
      },
      change (status) {
        this.$Message.info('开关状态：' + status);
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
    margin: 1rem;
  }
  .con-top{
    background-color: #F3F3F3;
    justify-content: space-between;
    padding:0 1rem;
  }
  .bk-szy{
    border-left: 1px solid #E4E4E4;
    border-right: 1px solid #E4E4E4;
    border-top: 1px solid #E4E4E4;
  }
  .pages{
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding: 0.5rem;
  }
  .pages{
    border-left: 1px solid #E4E4E4;
    border-right: 1px solid #E4E4E4;
    border-bottom: 1px solid #E4E4E4;
  }
  .batch{
    margin-left: 0.5rem;
  }
  .ivu-form-item{
    margin-bottom: 0.5rem;
  }
</style>
