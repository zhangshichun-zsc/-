<!--资讯分类管理(志愿者)-->
<template>
  <div class="main">
    <Modal
      v-model="modal1">
      <img :src="showImg" alt="" class="showimg"/>
      <span slot="footer"></span>
    </Modal>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con-top flex-center-start">
        <p>
          <Icon type="ios-list" />
          <span>数据列表</span>
        </p>
      </div>
      <Table :loading='loading' ref="selection" border :columns="columns" :data="datas" @on-selection-change="handleSelectionChange"></Table>
      <Modal v-model="modalEditor" title="添加分类">
        <Form class="bd" ref="AddDate" :model="AddData" :rules="ruleValidate"  :label-width="120">
          <FormItem label="类型名称:" prop="name">
            <Input style="width: 10rem" v-model="AddData.name" />
          </FormItem>
          <FormItem label="类型图标:" prop="picPath">
            <UploadImg :full-url.sync="AddData.picPath" :editable="false" :display-width="150" :display-height="150" :max="1" v-model="AddData.pic" placeholder="请上传图标" />
          </FormItem>
          <FormItem label="是否显示:" prop="WhetherShown">
            <i-switch key='forSwitch' v-model="WhetherShown" />
          </FormItem>
          <FormItem></FormItem>
        </Form>

        <div slot="footer">
          <Button type="text" size="large" @click="modalCancel">取消</Button>
          <Button type="primary" size="large" @click="modalOk('AddData')">确定</Button>
        </div>
      </Modal>
      <div class="row">
        <div>
          <Checkbox v-model="status" @on-change='chackall'>全选</Checkbox>
          <Select placeholder="批量操作" style="width: 150px" v-model="types" placement='top'>
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px" @click="batches">确定</Button>
        </div>
        <div><Page
          :current.sync='page'
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          style="margin: auto"
          @on-change="changepages"
        /></div>
      </div>
    </div>
  </div>
</template>

<script>
import { upload } from '@/request/http'
import {
  inquirytype,
  inquirybatch,
  inquirydel,
  inquiryedit,
  inquiryadd,
  orgimgdel
} from '@/request/api'
export default {
  data() {
    return {
      navigation1: {
        head: '资讯分类管理(志愿者)'
      },
      datas: [],
      modal1:false,
      showImg: '',
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '分类图标',
          key: 'CategoryIcon',
          align: 'center',
          render: (h,params) => {
            return h("Icon", {
              props: {
                type: 'md-images',
              },
              on: {
                click: () => {
                  this.modal1 = true
                  this.showImg = params.row.picPath
                }
              }
            })
          }
        },
        {
          title: '分类名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '分类数量',
          key: 'amount',
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
                  value: params.row.validFlag == 1,
                  key: params.row.dicId
                },
                on: {
                  input: e => {
                    if (e) {
                      this.validFlag = 1
                    } else {
                      this.validFlag = 0
                    }
                    this.ids = params.row.dicId
                    this.getinquirybatch()
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
                      color: '#FF565A'
                    },
                    on: {
                      click: () => {
                        this.batchss = 1
                        this.modalEditor = true
                        this.AddData = params.row
                        if (params.row.validFlag == 1) {
                          this.WhetherShown = true
                        } else {
                          this.WhetherShown = false
                        }
                      }
                    }
                  },
                  '编辑'
                ),
 
              ]
            )
          }
        }
      ],
      modalEditor: false,
      WhetherShown: true,
      AddData: {
        name: '',
        picPath: null
      },
      ruleValidate: {
        name: [{ required: true, message: '', trigger: 'blur' }],
        picPath: [{ required: true, message: '请选择分类图标', trigger: 'blur' }]
      },
      batchList: [
        {
          value: 0,
          label: '停用'
        },
        {
          value: 1,
          label: '启用'
        },
       
      ],
      loading:false,
      page: 1,
      size: 10,
      dataCount: 0,
      status: false,
      sysId: 2,
      arr: '',
      ids: '',
      validFlag: '',
      types: "",
      batchss: '',
      file: ''
    }
  },
  mounted() {
    this.getinquirytype()
  },
  methods: {
    //资讯分类管理列表
    getinquirytype() {
      this.loading = true
      this.data=[]
      inquirytype({
        sysId: this.sysId,
        page: { page: this.page, size: this.size }
      }).then(res => {
        if (res.code == 200) {
          this.datas =[...res.data.list]
          this.dataCount = res.data.totalSize
          this.status = false
        }
         this.loading = false
      })
    },

    //批量操作启用
    getinquirybatch() {
      console.log(this.ids)
      inquirybatch({
        userId: this.$store.state.userId,
        ids: this.ids,
        validFlag: this.validFlag
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info('操作成功')
          this.getinquirytype()
        }
        console.log(res)
      })
    },
    //删除
    getinquirydel() {
      inquirydel({
        ids: this.ids,
        userId: this.$store.state.userId
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info('删除成功')
          this.getinquirytype()
        } else {
          this.$Message.error(res.msg)
        }
        console.log(res)
      })
    },

    //编辑
    getinquiryedit() {
      console.log(this.AddData.validFlag)
      inquiryedit({
        sysId: this.sysId,
        dicId: this.AddData.dicId,
        pic: this.AddData.pic,
        validFlag: this.AddData.validFlag,
        name: this.AddData.name,
        userId: this.$store.state.userId
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info(res.msg)
          this.modalEditor = false
          this.getinquirytype()
        } else {
          this.getinquirytype()
          this.$Message.error(res.msg)
        }
        this.modalEditor = false
        console.log(res)
      })
    },

    //添加
    getinquiryadd() {
      inquiryadd({
        userId: this.$store.state.userId,
        sysId: this.sysId,
        dicName: this.AddData.name,
        dicPicture: this.AddData.pic,
        validFlag: this.AddData.validFlag
      }).then(res => {
        if (res.code == 200) {
          this.modalEditor = false
          this.$Message.info(res.msg)
          this.getinquirytype()
        } else if (res.code == 500) {
          this.$Message.error('类型已存在')
        }
        console.log(res)
      })
    },
    // 批量操作

    //图片上传
    uploadFile() {
      let file = this.$refs.files.files[0]
      console.log(file)
      const dataForm = new FormData()
      dataForm.append('file', file)
      upload(dataForm).then(res => {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = e => {
          this.AddData.picPath = e.target.result
          this.AddData.pic = res.data
          console.log(this.AddData.picPath, this.AddData.pic)
        }
      })
    },
    //删除图片
    cancelImg() {
      orgimgdel({ path: this.AddData.pic }).then(res => {
        if (res.code == 200) {
          this.$Message.success('删除成功')
          this.AddData.pic = null
          this.AddData.picPath = null
        } else {
          this.$Message.success(res.msg)
        }
      })
    },

    //批量操作
    batches() {
      if (this.arr == '') {
        this.$Message.error('至少选择一个')
      } else if (this.type == '') {
        this.$Message.error('请先选择操作类型')
      } else {
        this.validFlag = this.types
        // 处理 当前的辣鸡代码
        let arr = []
         this.arr.forEach(item => {
            if(item.validFlag !=  this.types){
              arr.push(item.dicId)
            } 
          })
          if(arr.length==0){
            this.$Message.error('选中的分类无需此操作')
            return
          }
          this.ids = arr.toString()
        if (this.types == 0 || this.types == 1) {
          this.getinquirybatch()
        } else if (this.types == 2) {
          this.getinquirydel()
        }
        console.log(this.ids)
      }
    },

    modalOk() {
      if (this.batchss == 1) {
        this.gets(this.getinquiryedit)
      } else {
        this.gets(this.getinquiryadd)
      }
    },
    modalCancel() {
      this.getinquirytype()
      this.clear()
      this.modalEditor = false
    },

    //添加
    add() {
      this.batchss = 2
      this.clear()
      this.modalEditor = true
    },

    //改变状态
    change(status) {
      if (status == true) {
        this.AddData.validFlag = 1
      } else {
        this.AddData.validFlag = 0
      }
    },

    //分页功能
    changepages(index) {
      this.page = index
      this.getinquirytype()
    },

    //每条数据单选框的状态
    handleSelectionChange(val) {
      this.arr = val
      console.log(this.arr)
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true
      } else {
        this.status = false
      }
    },

    //全选按钮
    chackall(v) {
      this.$refs.selection.selectAll(v)
    },

    //清楚
    clear() {
      ;(this.AddData.name = ''), (this.AddData.pic = ''), (this.WhetherShown = false)
      this.AddData.picPath = null
    },
    //添加
    gets(e) {
      if (this.AddData.name == '' || this.AddData.picPath == null) {
        this.$Message.error('有必填项未填')
      } else {
        if (this.WhetherShown == true) {
          this.AddData.validFlag = 1
        } else {
          this.AddData.validFlag = 0
        }
        e()
      }
    }
  }
}
</script>
<style scoped>
.showimg{
  width: 100%;
  height: auto;
}
html,
body {
  margin: auto;
}
.main {
}
.content {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}
.con-top {
  background-color: #fff;
  justify-content: space-between;
  margin-bottom: 20px;
}
.row{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}
.bk-szy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
}
.pages {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 0.5rem;
}
.pages {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
}
.batch {
  margin-left: 0.5rem;
}
.ivu-form-item {
  margin-bottom: 0.5rem;
}
</style>
