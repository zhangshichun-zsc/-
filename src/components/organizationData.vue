<!--组织列表共用-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="basis">
      <div class="content bk">
        <div class="title bk-xia flex-center-between">
          <p>
            <Icon type="ios-search" />
            <span>筛选查询</span>
          </p>
          <div class="flex-center-end">
            <Button class="space" @click="jump()">
              <Icon type="md-person-add" />新建组织
            </Button>
            <Button class="space">导入组织</Button>
            <div class="Pack space" @click="Retractbtn">
              <Icon type="ios-arrow-down" v-if="Retract==true" />
              <Icon type="ios-arrow-up" v-if="Retract==false" />
              <span v-if="Retract==true">
                <a class="sai">收起筛选</a>
              </span>
              <span v-if="Retract==false">
                <a class="sai">启用筛选</a>
              </span>
            </div>
            <ButtonGroup class="space">
              <Button @click="query">查询结果</Button>
              <Button>高级检索</Button>
            </ButtonGroup>
          </div>
        </div>
        <Form ref="formInline" :model="formInline" :label-width="80" inline class="forms" v-if="Retract==true">
          <FormItem label="组织名称:">
            <Input v-model="orgName" size="small" placeholder="组织名称" style="width: 160px" />
          </FormItem>
          <FormItem label="组织地址:">
            <Input v-model="address" size="small" placeholder="组织地址" style="width: 160px" />
          </FormItem>
          <FormItem label="负责人:">
            <Input v-model="ownerUserName" size="small" placeholder="请选择负责人" style="width: 160px" />
          </FormItem>
          <FormItem label="分类:" class="types" v-if="this.navigation1.id==100 || this.navigation1.id==''">
            <Select v-model="orgType" style="width:160px" :transfer="true">
              <Option v-for="item in typelist" :value="item.dataKey" :key="item.dataKey">{{ item.dataValue }}</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div class>
        <div class="title bk-szy flex-center-between">
          <p>
            <Icon type="ios-list" />
            <span>数据列表</span>
          </p>
          <div class="options flex-center-start">
            <Dropdown class="space">
              <Button @click="exportData">导出数据</Button>
            </Dropdown>

            <Select v-model="size" style="width:120px" placeholder="显示条数">
              <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select placeholder="排序方式" style="width: 120px;" v-model="sort">
              <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <!-- <a @click="modal1 = true">
              <Icon type="ios-settings-outline" />
            </a> -->
          </div>
        </div>
        <Table ref="selection" border :columns="columns" :data="data" @on-selection-change="handleSelectionChange"></Table>

        <Modal v-model="modal1" title="自定义展示字段" @on-ok="ok" @on-cancel="cancel">
          <div class="con">
            <p>目前显示字段顺序</p>
            <p>拖拽调整列显示顺序</p>
            <p>
              <span>机构名称</span>
              <span>地址</span>
              <span>负责人</span>
              <span>机构分类</span>
            </p>
            <p>备选字段</p>
            <p>
              <span>基本信息</span>
              <CheckboxGroup v-model="options">
                <Checkbox label="options1">机构名称</Checkbox>
                <Checkbox label="options2">地址</Checkbox>
                <Checkbox label="options3">负责人</Checkbox>
                <Checkbox label="options4">Logo</Checkbox>
                <Checkbox label="options5">创建时间</Checkbox>
                <Checkbox label="options6">省份</Checkbox>
                <Checkbox label="options7">网站</Checkbox>
                <Checkbox label="options8">网站</Checkbox>
              </CheckboxGroup>
            </p>
            <a @click="jump1()" style="color: #515a6e;">
              <Icon type="ios-settings-outline" />自定义扩展字段
            </a>
          </div>
        </Modal>
      </div>
      <div class="pages flex-center-between">
        <div>
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status"></Checkbox>全选
          </Button>
          <Select placeholder="批量操作" style="width: 150px" v-model="type">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button class="space" @click="batch">确定</Button>
        </div>
        <Page :total="dataCount" show-elevator show-total size="small" style="margin: auto" :page-size="size" @on-change="changepages" />
      </div>
    </div>
  </div>
</template>

<script>
import { myBrowser } from '../request/Browser'
import { orgpage, orgtype, orgbatch } from '../request/api'
export default {
  data() {
    return {
      formInline: {
        OrganizationName: '',
        GroupAddress: '',
        head: '',
        classifications: ''
      },
      modal1: false,
      data: [],
      typelist: [],
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
            return h(
              'span',
              params.row.provinceName + params.row.cityName + params.row.districtName
            )
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
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            let status = ''
            if (params.row.validFlag == '1') {
              status = '停用'
            } else {
              status = '启用'
            }
            return h('div', [
              h(
                'a',
                {
                  clssName: 'action',
                  style: {
                    color: 'green'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'detailshy',
                        query: { orgId: params.row.orgId }
                      })
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
                    color: 'green'
                  },
                  on: {
                    click: () => {
                      if (params.row.validFlag == '1') {
                        this.types = 2
                      } else {
                        this.types = 1
                      }
                      this.arr = Array.of(params.row.orgId)
                      this.getorgbatch()
                    }
                  }
                },
                status
              )
            ])
          }
        }
      ],
      Article: [{ value: 10, label: 10 }, { value: 15, label: 15 }, { value: 20, label: 20 }],
      sorting: [{ value: 'asc', label: '正序' }, { value: 'desc', label: '倒序' }],
      sort: 'asc',
      batchList: [
        { value: '1', label: '启用' },
        { value: '2', label: '停用' },
        { value: '3', label: '删除' }
      ],
      options: ['options1', 'options2', 'options8'],
      sysType: '1',
      orgName: '',
      address: '',
      ownerUserName: '',
      orgType: '',
      page: 1,
      size: 10,
      dataCount: 0,
      arr: [],
      status: false,
      Retract: true,
      type: '',
      userId: 1,
      arrs: [],
      types: ''
    }
  },

  methods: {
    //类型
    getorgtype() {
      orgtype({
        sysType: this.sysType
      }).then(res => {
        if (res.code == 200) {
          this.typelist = res.data
        }
        console.log(res)
      })
    },
    //批量操作
    getorgbatch() {
      orgbatch({
        orgId: this.arr,
        userId: this.userId,
        type: this.types
      }).then(res => {
        if (res.code == 200) {
          this.getorgpage()
          this.$Message.info('操作成功')
          this.$refs.selection.selectAll(false)
        } else {
          this.$Message.error(res.msg)
        }
        console.log(res)
      })
    },

    //标签分页
    getorgpage() {
      orgpage({
        page: {
          page: this.page,
          size: this.size,
          sort: 'createAt' + ' ' + this.sort
        },
        sysType: this.sysType,
        orgName: this.orgName,
        address: this.address,
        ownerUserName: this.ownerUserName,
        orgType: this.orgType
      }).then(res => {
        if (res.code == 200) {
          this.dataCount = res.data.totalSize
          this.data = res.data.list
        }
        console.log(res)
      })
    },

    //收起筛选
    Retractbtn() {
      this.Retract = !this.Retract
      console.log(11)
    },
    //查询结果
    query() {
      console.log(this.size)
      this.getorgpage()
    },
    //全选按钮
    chackall() {
      this.status = !this.status
      this.$refs.selection.selectAll(this.status)
    },
    //批量操作
    batch() {
      if (this.arr == '') {
        this.$Message.error('至少选择一个')
      } else if (this.type == '') {
        this.$Message.error('请先选择操作类型')
      } else {
        this.types = this.type
        this.arr = this.arrs.map(item => {
          return item.orgId
        })
        this.getorgbatch()
      }
    },

    //分页功能
    changepages(index) {
      this.page = index
      this.getorgpage()
    },
    //选择内容
    handleSelectionChange(val) {
      this.arrs = val
      if ((val.length == this.dataCount && this.dataCount != 0) || val.length == this.size) {
        this.status = true
      } else {
        this.status = false
      }
      this.arr = val.map(item => {
        return item.orgId
      })
      console.log(this.arr)
    },

    //导出数据
    exportData() {
      if (this.arrs.length == 0) {
        this.arrs = this.data
      }
      this.$refs.selection.exportCsv({
        filename: this.navigation1.head,
        columns: this.columns.filter((col, index) => index > 0),
        data: this.arrs
      })
    },

    //新建组织
    jump() {
      this.$router.push({ name: 'newzuzihy', query: { sysId: this.sysType } })
    },
    ok() {
      this.$Message.info('Clicked ok')
    },
    cancel() {
      this.$Message.info('Clicked cancel')
    },
    jump1() {
      this.$router.push({ name: 'OrganizationFields_hy' })
    }
  },

  //事件监听
  watch: {
    size: 'getorgpage',
    sort: 'getorgpage'
  },
  props: ['navigation1'],
  mounted() {
    if (this.navigation1.id == '') {
      this.sysType = 2
      this.getorgpage()
      this.getorgtype()
    } else if (this.navigation1.id == 100) {
      this.sysType = 1
      this.getorgpage()
      this.getorgtype()
    } else {
      this.sysType = 1
      this.orgType = this.navigation1.id
      this.getorgpage()
    }
  }
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
.basis {
  margin: 0.5rem;
}
.content {
  margin-bottom: 0.5rem;
}
.bk {
  border: 1px solid #e4e4e4;
}
.bk-szy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
}
.bk-xia {
  border-bottom: 1px solid #e4e4e4;
}
.title {
  background-color: #f3f3f3;
  padding: 0.2rem 0.5rem;
}
.Pack,
.space {
  margin: 0 0.2rem;
}
.pages {
  margin: 0.5rem;
}
.ivu-form-item {
  margin-bottom: 0;
}
.con p:nth-child(1n + 2) {
  display: table;
  margin-bottom: 0.3rem;
}
.con p:nth-child(2) {
  border: 1px solid;
}
.con p:nth-child(3) span {
  border: 1px dashed;
  padding: 0.1rem;
  margin-right: 0.2rem;
}
.con p:nth-last-child(1) {
  background-color: #f2f2f2;
  padding: 0.2rem;
}
.forms {
  margin: 20px 0;
  display: flex;
}
.forms {
  width: 80px;
}
.ivu-form-item-content {
  margin-left: 80px;
}
.sai {
  color: black;
}
</style>
