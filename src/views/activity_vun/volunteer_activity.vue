<!--志愿者活动管理(会员)-->
<template>
  <div class="integral">
    <!-- <customizeDialog ref="son" v-on:fun="changeColumn" :labels="navigationName"></customizeDialog> -->
    <Modal v-model="addstate" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <span>下架确定</span>
      </p>
      <div style="text-align:center">
        <p>是否确认下架，下架后无法上架</p>
      </div>
      <div slot="footer">
        <Button type="error" @click="modalCancel">取消</Button>
        <Button type="success" @click="modalOkdel">确定</Button>
      </div>
    </Modal>
    <Modal v-model="modal5" title="取消理由" @on-cancel='cancel'>
      <i-input placeholder="请输入取消理由" v-model="text" type="textarea" :row='4' />
      <div slot="footer">
        <Button type="error" size="large" @click="modalOk">确定</Button>
      </div>
    </Modal>
    <Navigation :labels="navigation1"></Navigation>
    <div class="wap">
      <div class="integral-header">
        <div class="flex-center-start integral-body">
          <div class="flex-center-start">
            <span class="names">活动名称:</span>
            <Input size="large" placeholder="活动名称" class="inpt" v-model="query.name" />
          </div>
          <div class="flex-center-start">
            <span class="names">活动状态:</span>
            <Select v-model="query.status" size='large' class="inpt">
              <Option v-for="item in activeState" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </div>
          <div class="flex-center-start">
            <span class="names">活动日期:</span>
            <div>
              <Date-picker type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width: 200px" @on-change="handleChange('startT',$event)"></Date-picker>
              <span>~</span>
              <Date-picker type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width: 200px" @on-change="handleChange('endT',$event)"></Date-picker>
            </div>
          </div>
          <div class="flex-center-start">
            <Button class="button-red" @click="result">查询</Button>
          </div>
        </div>
      </div>
      <div class="integral-table">
        <div class="table-header flex-between">
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="state">全选</Checkbox>
          </Button>
          <div>
            <Button class="table-btn" @click="exportData" disabled>导出</Button>
            <!-- <Button class="table-btn" @click="modal1 = true">导出受益方签到表</Button> -->
            <!-- <Button class="table-btn" @click="modal1 = true">导出志愿者签到表</Button> -->
            <Button class="table-btn" @click="draft">草稿箱</Button>
            <Button class="table-btn" @click="addaction">添加活动</Button>
            <Select v-model="size" class="table-btn" style="width: 150px;" placeholder="显示条数" size="large">
              <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select placeholder="排序方式" class="table-btn" style="width: 150px;" v-model="sort" size="large">
              <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        <div class="table">
          <Table ref="selection" border :columns="columns" :data="datax" @on-selection-change="handleSelectionChange"></Table>
          <Modal draggable ok-text="导出" v-model="modal3" title="自定义展示字段">
            <div class="popup">
              <p class="popup-head">
                <span>目前导出字段顺序</span>
                <span class="popup-head-tit">拖拽调整列显示顺序</span>
              </p>
              <div class="popup-content">
                <p>
                  <span>序号</span>
                  <span>姓名</span>
                  <span>性别</span>
                  <span>手机号码</span>
                  <span>身份证号</span>
                  <span>年龄</span>
                  <span>孩子姓名</span>
                </p>
                <p>
                  <span>孩子性别</span>
                  <span>孩子年龄</span>
                  <span>签名（孩子）</span>
                  <span>签名(家长)</span>
                  <span>障碍类型</span>
                </p>
              </div>
              <div class="bft">
                <p>备选字段</p>
                <div class="bft-tab">
                  <CheckboxGroup v-model="fruit">
                    <Checkbox label="香蕉">序号</Checkbox>
                    <Checkbox label="苹果">姓名</Checkbox>
                    <Checkbox label="西瓜">障碍类型</Checkbox>
                  </CheckboxGroup>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <Page :total="dataCount" show-elevator show-total class="pages" size="small" style="margin: auto" :page-size="size" @on-change="changepages" />
      </div>
    </div>
  </div>
</template>

<script>
import customizeDialog from "../survey/commonComponent/customizeDialog";
import { formatDate } from '@/request/datatime'
import { actManager, activedown, activecancel, activeclose } from '../../request/api'
import { SERVER_URl } from '@/request/http.js'
import { filterNull } from '@/libs/utils'
export default {
   
  data() {
    return {
      navigationName: {
        head: 'activity_vun/volunteer_activity_',
        pageTable: '2'
      },
      addstate: false,
      state: false,
      modal1: false,
      modal2: false,
      modal3: false,
      modal5: false,
      fruit: ['苹果'],
      navigation1: {
        head: '志愿者活动管理(志愿者)'
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          width: 350,
          key: 'action',
          align: 'center',
          renderHeader: (h, params) => {
            return h('div', [
              h('span', '操作'),
              h('Icon', {
                props: {
                  type: 'ios-settings-outline'
                },
                style: {
                  marginLeft: '5px'
                },
                on: {
                  click: () => {
                    this.$Message.info('此功能暂未开放')
                    // this.modal3=true
                  }
                }
              })
            ])
          },
          render: (h, params) => {
            let signup = '关闭报名'
            if (params.row.statusText == '关闭报名') {
              signup = '开启报名'
            }
            return h('div', [
              h(
                'a',
                {
                  clssName: 'action',
                  style: {
                    color: '#FF565A',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                     
                     let arr =[
                       "待招募",
                       "待审核", 
                     ]
                     let arr2 =[
                       "招募中",
                       "待开始"
                     ]
                      let status = null
                      let statusText = params.row.statusText
                      if( arr.includes(statusText)){
                        status = 1
                      }else if(arr2.includes(statusText)) {
                        status = 3
                      }
                      if (status ) {
                        this.$router.push({
                          name: 'volunteer_issue',
                          query: {
                            activityId: params.row.activityId,
                            isEdit: 1,// 所有可修改
                            status: status
                          }
                        })
                      } else {
                        this.$Message.warning('该活动状态不可编辑')
                      }
                    }
                  }
                },
                '编辑'
              ),
              h(
                'a',
                {
                  style: {
                    marginRight: '10px',
                    marginLeft: '10px',
                    color: '#FF565A',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'profile',
                        query: {
                          acitvityId: params.row.activityId,
                          activityName: params.row.name,
                          sysId: 2
                        }
                      })
                    }
                  }
                },
                '概况'
              ),
              h(
                'a',
                {
                  style: {
                    marginRight: '10px',
                    marginLeft: '10px',
                    color: '#FF565A',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: 'activity_share' })
                    }
                  }
                },
                '分享'
              ),
              h(
                'a',
                {
                  style: {
                    marginRight: '10px',
                    marginLeft: '10px',
                    color: '#FF565A',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: 'volunteer_issue',
                        query: { activityId: params.row.activityId, isEdit: 4 }
                      })
                    }
                  }
                },
                '复制'
              ),
              h(
                'Dropdown',
                {
                  props: {
                    transfer: true
                  }
                },
                [
                  h(
                    'a',
                    {
                      style: {
                        color: '#FF565A'
                      }
                    },
                    '更多操作'
                  ),
                  h(
                    'DropdownMenu',
                    {
                      slot: 'list'
                    },
                    [
                      h(
                        'DropdownItem',
                        {
                          nativeOn: {
                            click: name => {
                              this.modal5 = true
                              this.activityId = params.row.activityId
                            }
                          }
                        },
                        '取消'
                      ),
                      h(
                        'DropdownItem',
                        {
                          nativeOn: {
                            click: name => {
                              if (signup == '关闭报名') {
                                this.types = 1
                                this.getactiveclose(params.row.activityId)
                              } else {
                                this.types = 2
                                this.getactiveclose(params.row.activityId)
                              }
                            }
                          }
                        },
                        signup
                      )
                    ]
                  )
                ]
              )
            ])
          }
        },
        {
          title: '活动名称',
          key: 'activityName',
          align: 'center',
          width: 300
        },
        {
          title: '活动时间',
          key: 'startTime',
          align: 'center',
          width: 240,
            render: (h, params) => {
            return h('div', params.row.startTimestamp + '  /  ' + params.row.endAt )
          }
        },
        {
          title: '活动类型',
          key: 'activityType',
          align: 'center',
          width: 200,
        },
        {
          title: '状态',
          key: 'statusText',
          align: 'center',
          width: 200,
          render: (h, params) => {
            return h('div', params.row.statusText )
            // this.activeState[~~params.row.status].name
          }
        },
        {
          title: '是否显示主办方小站',
          key: 'isShowHolder',
          align: 'center',
          width: 200,
          render: (h, params) => {
            return h('div', params.row.isShowHolder == 1 ? '是' : '否')
          }
        },
        {
          title: '志愿者报名人数',
          key: 'volunteerSignUpCount',
          align: 'center',
          width: 200
        },
        {
          title: '是否上架',
          key: 'statusText',
          align: 'center',
          width: 240,
          render: (h, params) => {
            return h('div', [
              h('i-switch', {
                props: {
                  value: params.row.statusText !== '下架',
                  disabled: params.row.statusText == '下架' ? true : false
                },
                on: {
                  'on-change': e => {
                    this.activityId = params.row.activityId
                    this.addstate = true
                    this.index = params.index
                  }
                }
              })
            ])
          }
        }
      ],
      Article: [
        { value: 10, label: 10 },
        { value: 15, label: 15 },
        { value: 20, label: 20 }
      ],
      sorting: [
        { value: 'asc', label: '正序' },
        { value: 'desc', label: '倒序' }
      ],
      sort: 'desc',
      datax: [],
      sysType: 1,
      page: 1,
      size: 10,
      dataCount: 0,
      name: '',
      arr: [],
      status: '1,2,3,4,5,6,7,9,10,11,13',
      startT: '',
      endT: '',
      query: {
        status: '1,2,3,4,5,6,7,9,10,11,13',
        name: '',
        startT: '',
        endT: ''
      },
      activeState: this.$store.state.activeState,
      activityId: null,
      text: ''
    }
  },
  components: { customizeDialog },
  computed: {},

  created() {},
  mounted() {
    this.getactiveManager()
  },
  //事件监听
  watch: {
    size: 'getactiveManager',
    sort: 'getactiveManager'
  },

  methods: {
    //取消
    getactivecancel() {
      activecancel({
        userId: this.$store.state.userId,
        activityId: this.activityId,
        text: this.text,
        channel: 2
      }).then(res => {
        if (res.code == 200) {
          this.modal5 = false
          this.text = ''
          this.getactiveManager()
          this.$Message.info('取消成功')
        } else {
          this.$Message.error(res.msg)
        }
        console.log(res)
      })
    },
    //关闭
    getactiveclose(ids) {
      activeclose({
        userId: this.$store.state.userId,
        activityId: ids,
        type: this.types,
        channel: 2
      }).then(res => {
        if (res.code == 200) {
          if(this.types == 1){
             this.$Message.info('关闭成功')
          }else{
            this.$Message.info('开启成功')
          }
         this.getactiveManager()
        } else {
          this.$Message.error(res.msg)
        }
        console.log(res)
      })
    },
    //拒绝理由
    modalOk() {
      this.getactivecancel()
    },
    cancel() {
      this.modal5 = false
    },
    // 活动下架
    getactivedown(ids) {
      ids = Array.of(ids)
      activedown({
        activityId: ids
      }).then(res => {
        if (res.code == 200) {
          this.addstate = false
          this.getactiveManager()
          this.$Message.info('下架成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    //取消
    modalCancel() {
      this.datax = []
      this.getactiveManager()
      this.addstate = false
    },

    //确定
    modalOkdel() {
      this.getactivedown(this.activityId)
    },
    handleChange(name, e) {
      this.query[name] = e
    },
    //列表和分页
    getactiveManager() {
      actManager(
        filterNull({
          name: this.name,
          status: this.status,
          startT: this.startT,
          endT: this.endT,
          sysType: 2,
          page: {
            page: this.page,
            size: this.size,
            sort: 'createAt' + ' ' + this.sort
          }
        })
      ).then(res => {
        this.$refs.selection.selectAll(false)
        if (res.code == 200) {
          this.dataCount = res.data.totalSize
          this.datax = res.data.list
        }
      })
    },

    //选择内容
    handleSelectionChange(val) {
      this.arr = val
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.state = true
      } else {
        this.state = false
      }
      this.arr = val.map(v => {
        return { activityId: v.acitvityId, activityName: v.activityName }
      })
    },

    //分页功能
    changepages(index) {
      this.page = index
      this.getactiveManager()
    },

    //查询
    result(e) {
      if (!!this.query.startT && !!this.query.endT) {
        if (new Date(this.query.startT).getTime() > new Date(this.query.endT).getTime()) {
          this.$Message.info('开始时间应该小于结束时间')
          return
        } else if (new Date(this.query.startT).getTime() == new Date(this.query.endT).getTime()) {
          this.startT = this.query.startT + ' 00:00:00'
          this.endT = this.query.endT + ' 23:59:59'
        } else {
           this.startT = this.query.startT + ' 00:00:00'
          this.endT = this.query.endT + ' 23:59:59'
        }
      } else if (
        (!!this.query.startT && !this.query.endT) ||
        (!!this.query.endT && !this.query.startT)
      ) {
        this.$Message.warning('时间段缺少')
        return
      } else {
        this.startT = ''
        this.endT = ''
      }
      this.name = this.query.name
      this.status = this.query.status
      this.page = 1
      this.getactiveManager()
    },

    addaction() {
      this.$router.push({ name: 'volunteer_issue' })
    },
    draft() {
      this.$router.push({ name: 'volunteer-draft' })
    },

    //导出数据
    exportData() {
      for (let item of this.arr) {
        window.open(`${SERVER_URl}/activity-manage/export?activityId=${item.activityId}&userType=2&activityName=
        ${item.activityName}`)
      }
    },

    //全选按钮
    chackall(e) {
      this.state = !this.state
      this.$refs.selection.selectAll(this.state)
    },
    changeColumn(data){
      this.columns=data; 
    }
  }
}
</script>
<style lang="scss" scoped>
.wap {
  padding: 20px 0;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
}
.integral-header .integral-top {
  padding: 10px;
  background: white;
}
.integral-header .integral-center {
  margin: 0 20px;
}
.integral-header .integral-body {
  padding: 0 20px;
  background: #fff;
  justify-content: flex-start;
  height: 50px;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 160px;
  margin-left: 10px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 40px;
}
.integral-header span {
  margin: 0 10px;
}
.names {
  margin-right: 10px;
}
.table-header {
  padding: 20px;
  background: white;
}
.table-header .table-btn {
  margin-left: 15px;
  font-size: 16px;
}
.flex-data {
  display: flex;
}
.pages {
  text-align: center;
}
.popup {
  background: #ffffff;
  .popup-head {
    height: 20px;
    line-height: 20px;
    margin-bottom: 10px;
    .popup-head-tit {
      display: inline-block;
      // width: 140px;
      border: black solid 1px;
      padding: 0 5px;
      margin-left: 20px;
    }
  }
  .popup-content {
    margin-bottom: 20px;
    p {
      span {
        display: inline-block;
        padding: 0 8px;
        line-height: 20px;
        font-size: 14px;
        border: black 1px dashed;
        margin: 5px;
      }
    }
  }
  .bft {
    .bft-tab {
      padding: 15px;
      background: #e4e4e4;
      height: 150px;
    }
  }
}
.table {
  position: relative;
}

.pages {
  padding: 10px 0 20px;
  text-align: center;
  background-color: #fff;
}
</style>
