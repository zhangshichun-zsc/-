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
            <Button @click="add">添加部门</Button>
            <Modal v-model="modal1" :title=text>
              <Form ref="AddDate" :model="AddDate" :rules="ruleValidate" :label-width="150">
                <FormItem label="部门名称:" prop="deptName">
                  <Input style="width: 10rem" v-model="AddDate.deptName" />
                </FormItem>
                <FormItem label="职能描述:" prop="description">
                  <Input style="width: 10rem" v-model="AddDate.description" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="请输入内容" />
                </FormItem>
                <FormItem label="上级部门" prop="parentId">
                  <Select v-model="AddDate.parentId" style="width:200px">
                    <Option v-for="item in deplist" :value="item.deptId" :key="item.deptId">{{ item.deptName }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="设置负责人:" prop="leader">
                  <Input  style="width: 10rem" v-model="AddDate.leader" />

                </FormItem>
                <FormItem label="活动类型" prop="ssproject">
                  <Select style="width: 10rem" v-model="AddDate.ssproject"></Select>
                </FormItem>
              </Form>
              <div slot="footer">
                <!-- <Button type="text" size="large" @click="modalCancel">取消</Button> -->
                <Button type="primary" size="large" @click="modalOk('AddDate')">确定</Button>
              </div>
            </Modal>
            <Select v-model="size" style="width:120px" placeholder="显示条数">
              <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select placeholder="排序方式" style="width: 120px;" v-model="sort">
              <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        <Table border :columns="columns1" :data="data1"></Table>
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
        <Table border :columns="columns2" :data="data2"></Table>
      </div>
      <div class="pages">
        <Page :total="dataCount" show-elevator show-total size="small" style="margin: auto" :page-size="size" @on-change="changepages" />
      </div>
    </div>
  </div>
</template>

<script>
import expandRow from '@/components/table-expand.vue'
import {
  departmentlist,
  departmentsub,
  departmentStatu,
  departmentmember,
  departmentedit,
  departmentadd,
  departmentStatus,
  departmentSup,
  departmentall,
  departtype
} from '@/request/api'
export default {
  data() {
    return {
      modal1: false,

      navigation1: {
        head: '部门管理(共用)'
      },
      AddDate: {
        deptName: '',
        description: '',
        parentId: '',
        leader: '',
        ssproject: ''
      },
      ruleValidate: {
        deptName: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { type: 'string', min: 10, message: '不能少于10字', trigger: 'blur' }
        ],
        // parentId: [
        //   {
        //     required: true,
        //     message: "请选择相关部门",
        //     trigger: "change",
        //     type: "number"
        //   }
        // ],
        leader: [
          { required: true, message: "请输入负责人姓名", trigger: "blur" }
        ],
        ssproject: [
          { required: true, message: "请输入活动类型", trigger: "blur" }
        ]
      },
      rpw:null,
      data1: [],
      columns1: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
              // let data = this.getdepartmentsub(params.row.deptId);
            return <expandRow row={params.row} dom={<expandRow row={this.rpw}/>} onChanges={(e)=>{this.rpw = e; console.log(this.rpw)}}></expandRow>
          }
        },
        {
          title: '部门名称',
          key: 'deptName',
          align: 'center',
          render: (h, params) => {
            return h(
              'span',
              {
                // style: {
                //   color: 'blue',
                //   cursor: 'pointer'
                // },
                on: {
                  click: () => {
                    this.deptId = params.row.deptId
                    this.getdepartmentmember()
                  }
                }
              },
              params.row.deptName
            )
          }
        },
        {
          title: '职能描述',
          key: 'description',
          align: 'center'
        },
        {
          title: '成员数量',
          key: 'sum',
          align: 'center'
        },
        {
          title: '负责人',
          key: 'leader',
          align: 'center'
        },
        {
          title: '是否启用',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('i-switch', {
                props: {
                  value: params.row.validFlag == 1
                },
                on: {
                  input: e => {
                    this.getdepartmentStatu(params.row.deptId, e)
                  }
                }
              })
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h(
              'div',
              {
                style: {
                  display: 'flex',
                  justifyContent: 'space-around',
                  MaxfontSize: '16px'
                }
              },
              [
                h(
                  'a',
                  {
                    clssName: 'action',
                    style: {
                      color: '#1ABD9D'
                    },
                    on: {
                      click: () => {
                        this.modal1 = true
                        this.text='编辑成员'
                        this.getdepartmentSup();
                        this.AddDate = params.row
                        this.AddDate.parentId = params.row.parentId
                      }
                    }
                  },
                  '编辑'
                )

              ]
            )
          }
        }
      ],
      data2: [],
      columns2: [
        {
          title: '姓名',
          key: 'userName',
          align: 'center'
        },
        {
          title: '邮箱地址',
          key: 'email',
          align: 'center'
        },
        {
          title: '联系方式',
          key: 'tel',
          align: 'center'
        },
        {
          title: '角色',
          key: 'sysRoleNames',
          align: 'center'
        },
        {
          title: '所属部门',
          key: 'deptNames',
          align: 'center'
        },
        {
          title: '是否启用',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('i-switch', {
                props: {
                  value: params.row.validFag == 1
                },
                on: {
                  input: e => {
                    console.log(e)
                    this.getdepartmentStatus(params.row.userId, e)
                  }
                }
              })
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h(
              'div',
              {
                style: {
                  display: 'flex',
                  justifyContent: 'space-around',
                  MaxfontSize: '16px'
                }
              },
              [
                h(
                  'a',
                  {
                    clssName: 'action',
                    style: {
                      color: '#1ABD9D'
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: 'function',
                          query: {
                            sysRoleName: params.row.userName,
                            sysRoleId: params.row.deptUserId,
                            status: 1
                          }
                        })
                      }
                    }
                  },
                  '权限设置'
                ),
                h(
                  'a',
                  {
                    clssName: 'action',
                    style: {
                      color: '#1ABD9D'
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: 'Add-members',
                          query: {
                            userId: params.row.userId,
                            name: params.row.userName,
                            deptId: this.deptId,
                            states: 1
                          }
                        })
                      }
                    }
                  },
                  '编辑'
                )
              ]
            )
          }
        }
      ],
      depId: '',
      validFlag: '',
      page: 1,
      size: 10,
      deplist: [],
      Article: [{ value: 10, label: 10 }, { value: 15, label: 15 }, { value: 20, label: 20 }],
      sorting: [{ value: 'asc', label: '正序' }, { value: 'desc', label: '倒序' }],
      sort: 'asc',
      dataCount: 0,
      status: '',
      text:''
      // obj:''
    }
  },
  //事件监听
  watch: {
    size: 'getdepartmentmember',
    sort: 'getdepartmentmember'
  },
  mounted() {
    this.getdepartmentlist()
    this.getdeparttype()
  },
  methods: {
    changeData(e){
      console.log(e)
    },
    // 部门列表
    getdepartmentlist() {
      departmentlist({
        parentId: 0
      }).then(res => {
        if (res.code == 200) {
          this.data1 = res.data
        } else {
          this.$Message.error(res.msg)
        }
        console.log(res)
      })
    },

    //查询分类
    getdeparttype(){
      departtype({

      }).then(res=>{
        console.log(res)
      })
    },

    // 修改启用状态
    getdepartmentStatu(id, e) {
      if (e == true) {
        this.validFlag = 1
      } else {
        this.validFlag = 0
      }
      departmentStatu({
        depId: id,
        validFlag: this.validFlag
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info('操作成功')
        } else {
          this.getdepartmentmember()
          this.$Message.error(res.msg)
        }
      })
    },
    // 查询部门成员
    getdepartmentmember() {
      departmentmember({
        page: { page: this.page, size: this.size },
        depId: this.deptId,
        sort: ''
      }).then(res => {
        if (res.code == 200) {
          this.data2 = res.data.list
          this.dataCount = res.data.totalSize
          this.$Message.info('查询成功')
        } else {
          this.$Message.error(res.msg)
        }
        console.log(res)
      })
    },
    // 部门列表编辑
    getdepartmentedit() {
      departmentedit({
        deptId:this.AddDate.parentId,
        deptName:this.AddDate.deptName,
        description:this.AddDate.description,
        leader:this.AddDate.leader,
        dicIds:this.dicIds
      }).then(res => {
        if (res.code == 200) {

        }
        console.log(res)
      })
    },
    // 部门列表添加
    getdepartmentadd() {
      departmentadd({
        deptName: this.AddDate.deptName,
        description: this.AddDate.description,
        parentId: this.AddDate.parentId,
        leader: this.AddDate.leader
      }).then(res => {
        if (res.code == 200) {
          this.getdepartmentlist()
          this.modal1 = false
          this.$Message.info('添加成功')
        } else {
          this.$Message.error(res.msg)
        }
        console.log(res)
      })
    },
    // 部门成员-修改启用状态
    getdepartmentStatus(id, e) {
      if (e == true) {
        this.status = 1
      } else {
        this.status = 0
      }
      departmentStatus({
        deptUserId: id,
        validFlag: this.status
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info('操作成功')
        } else {
          this.$Message.info(res.msg)
          this.getdepartmentmember()
        }
        console.log(res)
      })
    },
    // 查询所有上级部门名称
    getdepartmentSup() {
      departmentSup({
        parentId: this.AddDate.parentId
      }).then(res => {
        if (res.code == 200) {
          this.deplist = res.data
        }
        console.log(res)
      })
    },
    // 查询所有部门名称
    getdepartmentall() {
      departmentall({}).then(res => {
        if (res.code == 200) {
          this.deplist = res.data
        }
        console.log(res)
      })
    },

    //清除input
    clear() {
      ;(this.AddDate.deptName = ''),
        (this.AddDate.description = ''),
        (this.AddDate.parentId = ''),
        (this.AddDate.leader = '')
    },
    //分页功能
    changepages(index) {
      this.page = index
      this.getdepartmentmember()
    },
    //添加部门
    add() {
      this.text='添加成员'
      this.modal1 = true
      this.clear()
      this.getdepartmentall()
    },
    //modalOk
    modalOk(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getdepartmentadd()
        } else {
          this.$Message.error('必填项未填!')
        }
      })
    },

    //添加成员
    AddMembers() {

      this.$router.push({ name: 'Add-members', query: { states: 1 } })
    }
  },
  components: { expandRow }
}
</script>

<style scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
}
.content {
  margin: 10px;
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
.con-margin {
  margin-top: 10px;
}
.pages {
  display: flex;
  justify-content: center;
  margin: 10px auto;
}
tr td.ivu-table-expanded-cell {
  padding: 0 !important;
}
td.ivu-table-expanded-cell {
  padding: 0;
}
</style>
