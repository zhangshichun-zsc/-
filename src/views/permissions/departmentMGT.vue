<!--部门管理(共用)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con">
        <div class="title bk-szy flex-center-start">
          <p>
            <Icon type="ios-square-outline" />
            <span>数据列表</span>
          </p>
          <div class="but">
            <Button @click="modal1 = true">添加部门</Button>
            <Modal
              v-model="modal1"
              title="添加部门"
              @on-ok="ok"
              @on-cancel="cancel">
              <Form ref="AddDate" :model="AddDate" :rules="ruleValidate" :label-width="150">
                <FormItem label="部门名称:" prop="DepartmentName">
                  <Input style="width: 10rem" v-model="AddDate.DepartmentName"></Input>
                </FormItem>
                <FormItem label="职能描述:" prop="FunctionDescription">
                  <Input style="width: 10rem" v-model="AddDate.FunctionDescription" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="请输入内容"></Input>
                </FormItem>
                <FormItem label="上级部门" prop="SuperiorDepartments">
                  <Select style="width: 10rem" v-model="AddDate.SuperiorDepartments">
                    <Option value="logistics">后勤部</Option>
                    <Option value="financial">财务部</Option>
                    <Option value="administrative">行政部</Option>
                    <Option value="project">项目部</Option>
                  </Select>
                </FormItem>
                <FormItem label="设置负责人:" prop="PersonCharge">
                  <Input @click="modal2 = true" style="width: 10rem" v-model="AddDate.PersonCharge"></Input>
                  <Modal
                    v-model="modal2"
                    title="添加部门"
                   >
             <!--点击input跳转负责人选择-->
                  </Modal>
                </FormItem>
                 <FormItem label="所属项目" prop="ssproject">
                  <Select style="width: 10rem" v-model="AddDate.ssproject">
                    <Option><Checkbox>快乐活动营</Checkbox></Option>
                    <Option><Checkbox>趾印计划</Checkbox></Option>
                    <Option><Checkbox>老友陪伴</Checkbox></Option>
                    <Option><Checkbox>友爱校园行</Checkbox></Option>
                  </Select>
                </FormItem>
              </Form>
            </Modal>
            <Dropdown style="margin-left: 20px">
              <Button>显示条数<Icon type="ios-arrow-down"></Icon></Button>
              <DropdownMenu slot="list">
                <DropdownItem>5</DropdownItem>
                <DropdownItem>10</DropdownItem>
                <DropdownItem>15</DropdownItem>
                <DropdownItem>20</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown style="margin-left: 20px">
              <Button>排序方式<Icon type="ios-arrow-down"></Icon></Button>
              <DropdownMenu slot="list">
                <DropdownItem>5</DropdownItem>
                <DropdownItem>10</DropdownItem>
                <DropdownItem>15</DropdownItem>
                <DropdownItem>20</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <Table border :columns="DepartmentColumns" :data="DepartmentData"></Table>
        <div class="con con-margin">
          <div class="title bk-szy flex-center-start">
            <p>
              <span>成员列表</span>
            </p>
            <div class="but">
              <Button @click="AddMembers()">添加成员</Button>
            </div>
          </div>
        </div>
        <Table border :columns="MembersColumns" :data="MembersData"></Table>
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
        modal2: false,
        navigation1: {
          head: "部门管理(共用)"
        },
        AddDate:{
          DepartmentName:'',
          FunctionDescription:'',
          SuperiorDepartments:'',
          PersonCharge:'',
          ssproject:''
        },
        ruleValidate:{
          DepartmentName:[
            { required: true, message: '部门名称不能为空', trigger: 'blur' }
          ],
          FunctionDescription: [
            { required: true, message: '请输入内容', trigger: 'blur' },
            { type: 'string', min: 10, message: '不能少于10字', trigger: 'blur' }
          ],
          SuperiorDepartments:[
            { required: true, message: '请选择相关部门', trigger: 'change' }
          ],
          PersonCharge:[
            { required: true, message: '请输入负责人姓名', trigger: 'blur' }
          ],
          ssproject:[
            {required: true, message: '请输入所属项目', trigger: 'blur'}
          ]
        },
        DepartmentData:[],
        DepartmentColumns:[
          {
            title:'部门名称',
            key:'DepartmentName',
            align: 'center'
          },{
            title:'职能描述',
            key:'FunctionDescription',
            align: 'center'
          },{
            title:'成员数量',
            key:'NumberMembers',
            align: 'center'
          },{
            title:'负责人',
            key:'head',
            align: 'center'
          },{
            title:'是否启用',
            key: "status",
            align: 'center',
            render: (h, params) => {
              return h("div", [h("i-switch")]);
            }
          },{
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
                        this.modal1 = true
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
                      click: () => {}
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
        MembersData:[],
        MembersColumns:[
          {
            title:'姓名',
            key:'Name',
            align: 'center'
          },{
            title:'邮箱地址',
            key:'EmailAddress',
            align: 'center'
          },{
            title:'联系方式',
            key:'contact',
            align: 'center'
          },{
            title:'角色',
            key:'role',
            align: 'center'
          },{
            title:'所属部门',
            key:'SubDepartmentName',
            align: 'center'
          },{
            title:'是否启用',
            key: "status",
            align: 'center',
            render: (h, params) => {
              return h("div", [h("i-switch")]);
            }
          },
          {
            title:'操作',
            key: "action",
            align: 'center',
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
                        this.$router.push({ name: 'Permissions-SetUp' })
                      }
                    }
                  },
                  "权限设置"
                ),
                h(
                  "a",
                  {
                    clssName: "action",
                    style: {
                      color: "#1ABD9D"
                    },
                    on: {
                      click: () => {
                        this.$router.push({ name: 'Add-members' })
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
                      click: () => {}
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ]



      }
    },
    methods: {
      AddMembers(){
        this.$router.push({ name: 'Add-members' })
      },
      ok () {
        this.$Message.info('添加成功');
      },
      cancel () {
        this.$Message.info('已取消');
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
  .con-margin{
    margin-top: 10px;
  }
  .pages{
    display: flex;
    justify-content: center;
    margin: 10px auto;
  }
</style>
