<!--活动管理(会员)-->
<template>
  <div class="integral">
    <Tophead :navigation1=navigation1 :top=top @query="query"></Tophead>
    <div class="integral-table">
      <div class="table">
        <Table ref="selection" border :columns="columns" :data="datax"></Table>
        <div class="set">
          <Icon type="ios-settings-outline" @click="modal1 = true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { draftDetail, validVip } from '@/request/api'
export default {
  data() {
    return {
      single1: false,
      modal1: false,
      fruit: ['苹果'],
      navigation1: {
        head: '草稿箱(会员)'
      },
      columns: [
        {
          title: '立项名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '项目预算',
          key: 'budget',
          align: 'center'
        },
        {
          title: '创建人',
          key: 'userName',
          align: 'center'
        },
        {
          title: '身份',
          key: 'orgType',
          align: 'center'
        },
        {
          title: '活动所属项目',
          key: 'categoryName',
          align: 'center'
        },
        {
          title: '小组归属',
          key: 'orgName',
          align: 'center'
        },
        {
          width: 200,
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'a',
                {
                  clssName: 'action',
                  style: {
                    color: '#FF566A',
                    cursor: 'pointer',
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: 'approval',
                        query: { batchId: params.row.batchId }
                      })
                    }
                  }
                },
                '编辑'
              ),
              h(
                'a',
                {
                  clssName: 'action',
                  style: {
                    color: '#FF566A',
                    cursor: 'pointer',
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '提示',
                        content: `是否确认删除？`,
                        onOk: () => {
                          this.validVip({
                            batchId: params.row.batchId,
                            valid: '0'
                          })
                        }
                      })
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      datax: [],
      top: [{ name: '立项名称', type: 'input', value: '' }],
      arrs: ''
    }
  },
  components: {},

  computed: {},

  created() {
    this.getDraftList()
  },

  methods: {
    getDraftList() {
      draftDetail({
        userId: this.$store.state.userId,
        name: this.name
      }).then(res => {
        this.datax = res.data
      })
    },
    query(e) {
      this.name = e[0].value
      this.getDraftList()
    },
    addaction() {
      this.$router.push({ name: 'approval' })
    },
    //导出数据
    exportData() {
      if (this.arrs.length == 0) {
        this.arrs = this.datax
      }
      this.$refs.selection.exportCsv({
        filename: this.navigation1.head,
        columns: this.columns.filter((col, index) => index > 0),
        data: this.datax
      })
    },
    validVip(obj) {
      validVip(obj).then(res => {
         this.$Message.success('删除成功！')
        // TODO 重新拉取数据
        this.getDraftList()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.integral-header {
  border: 1px solid #eee;
  // font-size: 14px;
  margin-top: 20px;
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
  padding: 0 20px;
  background: #fff;
  justify-content: flex-start;
  height: 50px;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 200px;
  margin-left: 10px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 40px;
}
.integral-table {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
}
.table-header {
  padding: 10px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.table-header .table-btn {
  margin-left: 15px;
}
.flex-data {
  display: flex;
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
.set {
  position: absolute;
  top: 12px;
  right: 50px;
}
</style>
