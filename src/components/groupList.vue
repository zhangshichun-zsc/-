<template>
  <div class="integral">

    <!-- <Modal title="拒绝理由" v-model="modal8" :mask-closable="false">
      <input class='rejbtn' type="textarea" v-model="value" placeholder='请输入原因'>
      <p v-show="isModel" class='tips'>请输入拒绝理由</p>
      <div slot="footer">
        <Button type="text" size="large" @click="modalCancel">取消</Button>
        <Button type="primary" size="large" @click="modalOk">确定</Button>
      </div>
    </Modal> -->

    <Navigation :labels="navigation1"></Navigation>
    <div class="integral-header">
      <div class="flex-center-between integral-top">
        <div>
          <Icon type="ios-search-outline" /><span>筛选查询</span></div>
        <div class="flex-center-end">
          <Button @click="query">查询结果</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>组织名称</span>
          <Input size="small" placeholder="组织名称" class="inpt" v-model="orgName" />
        </div>
        <div class="flex-center-start" v-if='!navigation1.name==="volunteer"'>
          <span>审核状态</span>
          <Select size='small' v-model="orgStatus" class="inpt">
            <Option value="0">全部</Option>
            <Option value="1">待审核</Option>
            <Option value="2">已审核</Option>
            <Option value="3">已拒绝</Option>
          </Select>
        </div>
        <div class="flex-center-start">
          <span>提交日期</span>
          <Row>
            <Col span="10">
            <DatePicker type="date" placeholder="请选择开始时间" v-model="startAt" style="width: 200px"></DatePicker>
            </Col>
            <Col span="4" class="line">
            </Col>
            <Col span="10">
            <DatePicker type="date" placeholder="请选择结束时间" v-model="endAt" style="width: 200px"></DatePicker>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <!-- <Icon type="md-reorder" size='20' />
          <span @click="handleSelectAll(true)">全选</span> -->
          <span v-if='!navigation1.name==="volunteer"'>
            <Button class="table-btn" @click='batchAdopt'>通过</Button>
            <Button class="table-btn" @click="batchRefuse">拒绝</Button>
          </span>
          <Button type="info" style='margin-left: 10px;' ghost @click='jump'>
            {{navigation1.name==="parent"?'家长小组 ':'志愿者团队'}}审批</Button>
        </div>
        <div>

          <Select v-model="size" style="width:120px" placeholder="显示条数" class="space">
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="排序方式" class="space" style="width: 120px;" v-model="sort">
            <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>

      </div>
      <Table ref="selection" border :columns="columns" :data="data" @on-selection-change="handleSelectionChange"></Table>
      <Page :total="dataCount" show-elevator show-total size="small" style="margin: auto" :page-size="size" @on-change="changepages" />
    </div>

  </div>
</template>

<script>
import {
  orgpage,
  orgSetStatus,
  queryVouluteerOrgList,
  modifyOrgMsg,
  orgSetGroup
} from '../request/api'
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      modal8: false,
      value: '',
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '组织名称',
          key: 'orgName',
          align: 'center'
        },
        {
          title: '组织分类',
          key: 'orgType',
          align: 'center',
          render: (h, params) => {
            let orgType = params.row.orgType
            let type = {
              1: '机构',
              2: '家长小组',
              3: '志愿者小组'
            }

            return h('span', type[orgType])
          }
        },
        {
          title: '组织地址',
          key: 'address',
          align: 'center',
          render: (h, params) => {
            let address = params.row
            return h('span', address.provinceName + address.cityName + address.districtName)
          }
        },
        {
          title: '负责人',
          key: 'userName',
          align: 'center'
        },
        {
          title: '人数',
          key: 'num',
          align: 'center'
        },
        {
          title: '提交时间',
          key: 'createAt',
          align: 'center'
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            let validFlag = params.row.validFlag
            let state = {
              0: '无效',
              1: '有效'
            }
            return h(
              'span',
              {
                style: {
                  color: 'green',
                  cursor: 'pointer'
                }
              },
              state[validFlag]
            )
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            let validFlag = params.row.validFlag
            let state = {
              0: '无效',
              1: '有效'
            }

            return h('div', [
              h(
                'span',
                {
                  clssName: 'action',
                  style: {
                    color: 'green',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      let address = params.row
                      localStorage.setItem(
                        'city',
                        address.provinceName + address.cityName + address.districtName
                      )
                      setTimeout(res => {
                        this.$router.push({
                          path: '/organization/editDetail',
                          query: {
                            orgId: params.row.orgId,
                            head: this.navigation1.name
                          }
                        })
                      }, 100)
                    }
                  }
                },
                '查看'
              ),
              h(
                'a',
                {
                  style: {
                    marginRight: '5px',
                    marginLeft: '5px',
                    color: 'green',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.setModifyOrgMsg({
                        validFlag: params.row.validFlag == 1 ? '0' : '1',
                        orgId: params.row.orgId
                      })
                    }
                  }
                },
                `设为${validFlag == 1 ? '无效' : '有效'}`
              )
            ])
          }
        }
      ],
      data: [],
      Article: [
        { value: 10, label: '显示10条' },
        { value: 15, label: '显示15条' },
        { value: 20, label: '显示20条' }
      ],
      sorting: [
        { value: 'create_at asc', label: '正序' },
        { value: 'create_at desc', label: '倒序' }
      ],
      sort: 'create_at desc',
      page: 1,
      size: 10,
      dataCount: 0,
      arr: [],
      orgStatus: '0',
      orgName: '',
      address: '',
      ownerUserName: '',
      startAt: '',
      endAt: '',
      auditId: '',
      isModel: false
    }
  },
  props: ['index', 'navigation1'],
  created() {
    this.getorgpage()
  },
  watch: {
    sort(newVlue) {
      this.getorgpage()
    }
  },
  methods: {
    //标签分页
    getorgpage() {
      let fromobj = this.util.remove({
        page: {
          page: this.page,
          size: this.size,
          sort: this.sort
        },

        orgName: this.orgName,
        status: this.orgStatus == 0 ? '' : this.orgStatus,
        startAt: this.startAt ? this.startAt.getTime() : '',
        endAt: this.endAt ? this.endAt.getTime() : ''
      })
      if (this.$props.navigation1.name === 'parent') {
        orgpage(fromobj).then(res => {
          if (res.code == 200) {
            this.dataCount = res.data.totalSize
            this.data = res.data.list
          }
        })
      } else {
        queryVouluteerOrgList(fromobj).then(res => {
          if (res.code == 200) {
            this.dataCount = res.data.totalSize
            this.data = res.data.list
          }
        })
      }
    },
    // 家长小组审核
    setOrg(flag, obj) {
      //  flag true 通过 false 拒绝  , obj {ids: id , status : 状态(2,通过,3 拒绝) ,  refReason: 拒绝的利用}
      if (this.navigation1.name === 'parent') {
        let fn = null
        if (flag) {
          fn = orgSetStatus({
            ids: this.auditId,
            status: 3,
            refReason: this.value
          })
        } else {
          fn = orgSetStatus({
            ids: this.auditId,
            status: 2
          })
        }
        fn.then(res => {
          if (res.code == 200) {
            if (flag) {
              this.removeaudutId()
              this.getorgpage()
              this.$Message.info('拒绝成功')
            } else {
              this.removeaudutId()
              this.getorgpage()
              this.$Message.info('通过成功')
            }
          } else {
            if (flag) {
              this.removeaudutId()
              this.$Message.error({
                background: true,
                content: '拒绝失败,请联系管理员'
              })
            } else {
              this.removeaudutId()
              this.$Message.error({
                background: true,
                content: '审批失败,请联系管理员'
              })
            }
          }
        })
      }
    },
    setModifyOrgMsg(params) {
      if (this.navigation1.head === 'parent') {
        console.log('掉用了家长小组的接口')
        // 家长小组修改 无效，有效
        orgSetGroup(params).then(res => {
          if (res.code === 200) {
            this.$Message.success('修改成功')
            this.getorgpage()
          } else {
            this.$Message.error('修改失败')
          }
        })
      } else {
        modifyOrgMsg(params).then(res => {
          if (res.code === 200) {
            this.$Message.success('修改成功')
            this.getorgpage()
          } else {
            this.$Message.error('修改失败')
          }
        })
      }
    },

    //查询结果
    query() {
      this.getorgpage()
    },
    //全选按钮
    chackall() {
      // this.status = !this.status
      // this.$refs.selection.selectAll(this.status)
    },
    // 批量通过
    batchAdopt(params) {
      if (this.arr.length > 0) {
        if (typeof params === 'number') {
          this.auditId = params
          this.setOrg(0)
        } else {
          this.auditId = this.reject()
          this.setOrg(0)
        }
      } else {
        this.$Message.error({
          background: true,
          content: '请至少选择一项'
        })
      }
    },
    // 批量拒绝
    batchRefuse(params) {
      if (this.arr.length > 0) {
        if (this.auditId) {
          this.setOrg(1)
        } else {
          this.showModal(this.reject())
        }
      } else {
        this.$Message.error({
          background: true,
          content: '请至少选择一项'
        })
      }
    },
    // 剔除已经操作过的数据
    reject() {
      // state 当前状态  通过  返回 排除 通过的
      let ids = []
      let list = this.data
      let arr = this.arr.split(',').map(item => {
        return list.filter(info => {
          return item == info.auditId
        })
      })
      arr.flat(Infinity).forEach(item => {
        if (item.status == 1) {
          ids.push(item.auditId)
        }
      })
      return ids.join(',')
    },
    // 显示模态框
    showModal(auditId) {
      this.auditId = auditId
      this.modal8 = true
    },
    // 关闭按钮
    modalCancel() {
      this.removeaudutId()
    },

    // 确定按钮
    modalOk() {
      if (this.value.length > 0) {
        this.isModel = false
        this.batchRefuse()
      } else {
        this.isModel = true
      }
    },
    // 去掉 value, id 值
    removeaudutId() {
      this.value = ''
      this.auditId = ''
      this.modal8 = false
      this.isModel = false
    },
    //分页功能
    changepages(index) {
      this.page = index
      console.log(index)
      this.getorgpage()
    },
    //选择内容
    handleSelectionChange(val) {
      this.arr = val

      let arr = []
      for (let i = 0; i < this.arr.length; i++) {
        arr.push(this.arr[i].auditId)
      }
      this.arr = arr.toString()
    },

    handleSelectAll(status) {
      this.$refs.selection.selectAll(status)
    },
    jump() {
      this.$router.push({
        name: 'teamApproval',
        query: {
          head: this.navigation1.name
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  margin-top: 15px;
  padding: 15px;
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
  width: 200px;
  margin-left: 15px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 20px;
}
.integral-table {
  margin-top: 30px;
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

.rejbtn {
  width: 100%;
  height: 8vh;
  padding: 0 1vw;
}
.tips {
  text-align: center;
  color: red;
}
</style>
