<!--常用报名项管理(会员)-->
<template>
  <div class="integral">
    <Navigation :labels="navigation1"></Navigation>
    <div class="integral-header">
      <div class="flex-center-between integral-top">
        <div>
          <Icon type="ios-search-outline" />
          <span>筛选查询</span>
        </div>
        <div class="flex-center-end">
          <Button>收起筛选</Button>
          <Button>查询结果</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>名称</span>
          <Input size="small" placeholder="组织名称" class="inpt" />
        </div>
        <div class="flex-center-start">
          <span>有效状态</span>
          <Select size="small" class="inpt">
            <Option value="1">1</Option>
            <Option value="1">1</Option>
          </Select>
        </div>
        <div class="flex-center-start">
          <span>创建时间</span>
          <row>
            <i-col span="12" class="inpt">
              <Date-picker
                type="daterange"
                placement="bottom-end"
                placeholder="选择日期"
                style="width: 200px"
              ></Date-picker>
            </i-col>
          </row>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <Icon type="md-reorder" size="20" />
          <span @click="handleSelectAll(true)">全选</span>
          <Button class="table-btn" @click="modal1=true">新增常用报名项</Button>
          <Modal v-model="modal1" title="新增常用报名项">
               <Form :label-width="60"  ref="formValidate" :model="formValidate" :rules="ruleValidate">
                 <FormItem label="内容" prop="content">
                    <Tabs type="line" value="name1" v-model="formValidate.content" size="small">
                       <TabPane label="单选题" name="name1">
                          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160">
                             <FormItem label="常用报名项名称：" prop="name">
                                 <Input v-model="formValidate.name" placeholder="请输入标题" style="width:200px"></Input>
                             </FormItem>
                             <FormItem style="margin:10px 0 0 160px">
                                   <Radio><Input placeholder="输入选项1"></Input></Radio>
                             </FormItem>
                             <FormItem style="margin:10px 0 0 160px">
                                   <Radio><Input placeholder="输入选项2"></Input></Radio>
                                   <div class="jia">+</div>
                             </FormItem>
                           </Form>  
                       </TabPane>
                       <TabPane label="多选题" name="name2">
                         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160">
                             <FormItem label="常用报名项名称：" prop="name">
                                 <Input v-model="formValidate.name" placeholder="请输入标题" style="width:200px"></Input>
                             </FormItem>
                             <FormItem style="margin:10px 0 0 160px">
                                   <Checkbox style="display:flex;align-items:center;"><Input placeholder="输入选项1" style="margin-left:10px;"></Input></Checkbox>
                             </FormItem>
                             <FormItem style="margin:10px 0 0 160px">
                                   <Checkbox style="display:flex;align-items:center;"><Input placeholder="输入选项2" style="margin-left:10px"></Input></Checkbox>
                                   <div class="jia">+</div>
                             </FormItem>
                           </Form>  
                       </TabPane>
                       <TabPane label="单行文本" name="name3">
                           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160">
                             <FormItem label="常用报名项名称：" prop="name">
                                 <Input v-model="formValidate.name" placeholder="请输入单行文本标题" style="width:200px"></Input>
                             </FormItem>
                           </Form>  
                       </TabPane>
                       <TabPane label="多行文本" name="name4">
                           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160">
                             <FormItem label="常用报名项名称：" prop="name">
                                 <Input v-model="formValidate.name" placeholder="请输入多行文本标题" style="width:200px"></Input>
                             </FormItem>
                           </Form>  
                       </TabPane>
                    </Tabs>
                 </FormItem>
              </Form>                   
        </Modal>
        </div>
      </div>
    </div>
    <Table border :columns="columns" :data="datax"></Table>
      <div class="pages">
        <span>共10页/100条数据</span>
         <Page :total="100" show-elevator></Page>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
          formValidate: {
                    content:'',
                    name:''
                },
                ruleValidate: {
                    content: [
                        { required: true, message: '', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ],
                },
      value: "",
      modal1:false,
      navigation1: {
        head: "常用报名项管理(会员)"
      },

      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "报名项名称",
          key: "name",
          align: "center"
        },
        {
          title: "格式",
          key: "designation",
          align: "center"
        },
        {
          title: "创建时间",
          key: "project",
          align: "center"
        },
        {
          title: "创建人",
          key: "userstype",
          align: "center"
        },
        {
          title: "有效状态",
          key: "rule",
          align: "center",
           render: (h, params) => {
            return h('div', [
              h('i-switch')
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('a', {
                clssName: 'action',
                style: {
                  color: 'green'
                },
                on: {
                  click: () => {
                    this.modal1=true
                  }
                }
              }, '编辑'),
              h('a', {
                style: {
                  marginRight: '5px',
                  marginLeft: '5px',
                  color: 'green'
                }
              }, '删除')
            ])
          }
        }
      ],
      datax: [
        {
          name: "受益方",
          designation: "帆帆",
          project: 1800000000,
          time: "受益方",
          types: "帆帆",
          userstype: "2019-10-01",
          number: 100,
          apply: "+800",
          rule: "待审核"
        },
        {
          name: "受益方",
          designation: "帆帆",
          project: 1800000000,
          time: "受益方",
          types: "帆帆",
          userstype: "2019-10-01",
          number: 100,
          apply: "+800",
          rule: "待审核"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  padding: 10px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
}
.integral-header .integral-center {
  margin: 0 20px;
}
.integral-header .integral-body {
  padding: 20px;
  background: #fff;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 160px;
  margin-left: 15px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 20px;
}

.table-header {
  padding: 10px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.table-header .table-btn {
  margin-left: 15px;
}
.line {
  width: 20px;
  border: 1px solid;
  margin: 12px 5px 0 20px;
}
.flex-center-end {
  button {
    margin-right: 10px;
  }
}
.flex-center-start {
  height: 50px;
}
.pages{
display: flex;
justify-content: center;
border-bottom: #e4e4e4 1px solid;
height: 50px;
align-items: center;
span{
  margin-right: 10px;
}
}

// 第二步
.content {
  background: #f3f3f3;
  border-top: #e4e4e4 solid 1px;
  margin-top: 20px;
  .content-activity {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
  }
  .select {
    display: flex;
    background: #ffffff;
    height: 80px;
    align-items: center;
    .select-template {
      margin: 0 50px;
    }
  }
  .activitives {
    background: #ffffff;
    margin-bottom: 40px;
    // height: 900px;
    .activitives-top {
      height: 40px;
      margin-top: 40px;
      background: #ffffff;
      span {
        width: 140px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: #008e40;
        color: #ffffff;
        font-size: 14px;
        display: inline-block;
      }
    }
  }
  .main1 {
    padding: 0 50px;
    background: #ffffff;
    ul {
      padding: 20px 0;
      li {
        margin-bottom: 20px;
        // height: 40px;
        display: flex;
        align-items: center;
        .same_style {
          margin-right: 70px;
        }
        .style-no {
          margin-right: 55px;
        }
        .imgs{
          width: 400px;
          height: 200px;
          background: #797979;
        }
      }
      .imges{
        align-items: flex-start
      }
      .linkman {
        display: flex;
        height: 80px;
        align-items: flex-start;
      }
      .staff {
        p {
          margin-bottom: 20px;
          .same-staff {
            margin-right: 20px;
          }
          .relation {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
.details,
.recruit,
.material {
  background: #ffffff;
  margin-bottom: 40px;
  .details-head,
  .recruit-head,
  .material-head {
    height: 40px;
    background: #ffffff;
    span {
      width: 140px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: #008e40;
      color: #ffffff;
      font-size: 14px;
      display: inline-block;
    }
  }
  .recruitment {
    padding: 5px 50px;
    // height: 160px;
    p {
      padding: 0 50px;
      height: 40px;
      width: 700px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #e4e4e4;
      margin: 20px 0;
      line-height: 40px;
      .ivu-input-default {
        border: 0;
      }
    }
    h2,
    .added {
      text-align: center !important;
      height: 40px;
      line-height: 40px;
      border: 0;
      width: 700px;
      a {
        color: #008e40;
      }
    }
  }
}
.issue {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 14px;
  background: #ffffff;
  height: 50px;
}
.button-food {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  .ivu-btn-default {
    height: 40px;
    width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: #ffffff;
    border: 1px solid #797979;
    margin-right: 10px;
    // color: #f3f3f3;/
  }
}
.jia{
  width: 48px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  border: 1px solid black;
  margin:10px 0 0 20px;
  font-size: 20px;
}
</style>
