<!--志愿者活动管理(会员)-->

<template>
  <div class="integral">
     <Modal
      v-model="modal4">
      <p class="head">会员二维码</p>
      <div class="start-wap">
        <div class="upload shae" v-if='memQrCodeShow == null'>
            <div class="file " @click="()=>{ this.$refs.filess.click()}">
              <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="filess" @change="uploadFile(0,$event)">
              <Icon type="md-cloud-upload" :size='36' color="#FF565A"/>
            </div>
        </div>
        <img class="imgss" v-else :src="memQrCodeShow"/>
        <Icon type="ios-trash" v-if='memQrCodeShow !== null' class="cancel" @click="cancelImg(0)" color='#FF565A' size='28'/>
      </div>
      <p class="head">志愿者二维码</p>
      <div class="start-wap">
        <div class="upload shae" v-if='voluQrCodeShow == null'>
            <div class="file " @click="()=>{ this.$refs.files.click()}">
              <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="files" @change="uploadFile(1,$event)">
              <Icon type="md-cloud-upload" :size='36' color="#FF565A"/>
            </div>
        </div>
        <img class="imgss" v-else :src="voluQrCodeShow"/>
        <Icon type="ios-trash" v-if='voluQrCodeShow !== null' class="cancel" @click="cancelImg(1)" color='#FF565A' size='28'/>
      </div>
      <div slot="footer">
        <Button type="error" size="large" @click="updateQrcodeEvent">确定</Button>
      </div>
    </Modal>
    <Modal v-model="modal5" title="取消理由"  @on-cancel='cancel'>
      <i-input placeholder="请输入取消理由" v-model="text" type="textarea" :row='4'/>
      <div slot="footer">
        <Button type="error" size="large" @click="modalOk">确定</Button>
      </div>
    </Modal>
    <Navigation :labels="navigation1"></Navigation>
    <div class="integral-header">
      <div class="flex-between integral-body">
        <div class="flex-start">
          <div class="flex-center-start">
            <span>活动名称:</span>
            <Input size="large" placeholder="活动名称" class="inpt" v-model="query.name" />
          </div>
          <div class="flex-center-start">
            <span>活动状态:</span>
            <Select v-model="query.state" size='large' class="inpt">
              <Option v-for="item in activeState" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </div>
          <div class="flex-center-start">
            <span>活动日期:</span>
            <div>
              <Date-picker
               size="large"
                type="date"
                placeholder="选择日期"
                class="inpt"
                @on-change="handleChange('startT',$event)"
              ></Date-picker>
              <i style="margin:0 10px;">~</i>
              <Date-picker
              type="date"
              size="large"
              placeholder="选择日期"
                class="inpt"
                @on-change="handleChange('endT',$event)"
              ></Date-picker>
            </div>
          </div>
        </div>
         <Button class="button-red" @click="result" >查询</Button>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-between">
        <Button @click="chackall()" style="border:0px;">
          <Checkbox v-model="status">全选</Checkbox>
        </Button>
       <div>
          <Button class="table-btn">导出</Button>
          <Button class="table-btn"  @click="exportData(1)">导出受益方签到表</Button>
          <Button class="table-btn"  @click="exportData(2)">导出志愿者签到表</Button>
          <!-- <Button class="table-btn" @click="addaction">添加活动</Button> -->
          <Select size="large" v-model="size"  style="width:150px" placeholder="显示条数" class="table-btn">
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select size="large" placeholder="排序方式" class="table-btn" style="width: 150px;" v-model="sort">
            <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <div class="table">
        <Table
          ref="selection"
          border
          :columns="columns"
          :data="datax"
          @on-selection-change="handleSelectionChange"
        ></Table>
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
      <Page
        :total="dataCount"
        show-elevator
        show-total
        size="small"
        class="pages"
        :page-size="size"
        @on-change="changepages"
      />
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../request/datatime";
import {
  activeManager,
  activeAddManager,
  activecancel,
  activeclose,
  activeset,
  activedown,
  updateQrCode,
  orgimgdel
} from "../../request/api";
import { upload }from '@/request/http'
import { SERVER_URl } from '@/request/http.js'
import { constants } from 'fs';
export default {
  inject: ['reload'],
  data() {
    return {
      status: false,
      modal1: false,
      modal2: false,
      modal3: false,
      modal4:false,
      memQrCode: null,
      voluQrCode: null,
      memQrCodeShow: null,
      voluQrCodeShow: null,
      fruit: ["苹果"],
      navigation1: {
        head: "活动管理(会员)"
      },
      columns: [
        {
          type: "selection",
          width: 80,
          align: "center"
        },
        {
          width: 300,
          key: "action",
          renderHeader:(h,params)=>{
            return h('div',[
              h('span','操作'),
              h('Icon',{
                props:{
                  type:'ios-settings-outline'
                },
                style:{
                  marginLeft:'5px'
                },
                on:{
                  click:()=>{
                    this.$Message.info("此功能暂未开放")
                    // this.modal3=true
                  }
                }
              })
            ])
          },
          align: "center",
          render: (h, params) => {
            let signup = "关闭报名";
            if (params.row.statusText == "13") {
              signup = "开启报名";
            }
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#FF565A",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "editing",
                        query: { id: params.row.acitvityId,type:2 }
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "10px",
                    marginLeft: "10px",
                    color: "#FF565A",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "profile",
                        query: { acitvityId: params.row.acitvityId,activityName: params.row.activityName,sysId:1 }
                      });
                    }
                  }
                },
                "概况"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "10px",
                    color: "#FF565A",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: "activity_share" });
                    }
                  }
                },
                "分享"
              ),
              h(
                "Dropdown",
                {
                  props: {
                    transfer: true
                  }
                },
                [
                  h(
                    "a",
                    {
                      style: {
                        color: "#FF565A"
                      }
                    },
                    "更多操作"
                  ),
                  h(
                    "DropdownMenu",
                    {
                      slot: "list"
                    },
                    [
                      h(
                        "DropdownItem",
                        {
                          nativeOn: {
                            click: name => {
                              this.modal5 = true;
                              this.activityId = params.row.acitvityId;
                            }
                          }
                        },
                        "取消"
                      ),
                      h(
                        "DropdownItem",
                        {
                          nativeOn: {
                            click: name => {
                              if (signup == "关闭报名") {
                                this.types = 1;
                                this.getactiveclose(params.row.acitvityId);
                              } else {
                                this.types = 2;
                                this.getactiveclose(params.row.acitvityId);
                              }
                            }
                          }
                        },
                        signup
                      ),
                      h(
                        "DropdownItem",
                        {
                          nativeOn: {
                            click: name => {
                              let status = this.activeState[Number(params.row.statusText)].name
                              if(status=="已结束"){
                                this.$router.push({
                                  name: "summarize",
                                  query: { acitvityId: params.row.acitvityId,activityName:params.row.activityName }
                                });
                              }else{
                                this.$Message.warning("只有已结束的活动才可进行活动总结");
                              }
                            }
                          }
                        },
                        "活动总结"
                      ),
                      h(
                        "DropdownItem",
                        {
                          nativeOn: {
                            click: name => {
                              this.getactiveset(params.row.acitvityId);
                            }
                          }
                        },
                        "设为新活动模板"
                      )
                    ]
                  )
                ]
              )
            ]);
          }
        },
        {
          title: "活动名称",
          key: "activityName",
          align: "center",
          width:500,
          ellipsis: true,
          tooltip: true,
        },
        {
          title: "立项名称",
          key: "batchName",
          align: "center",
          width: 300,
          ellipsis: true,
          tooltip: true,
        },
        {
          title: "项目名称",
          key: "categoryName",
          align: "center",
          width:250,
        },
        {
          title: "活动时间",
          key: "startTimestamp",
          align: "center",
          width:300,
          render: (h, params) => {
            return h("div", formatDate(params.row.startTimestamp));
          }
        },
        {
          title: "活动类型",
          width:200,
          key: "activityType",
          align: "center"
        },
        {
          title: "状态",
          width:200,
          key: "statusText",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              this.activeState[~~params.row.statusText].name
            );
          }
        },
        {
          title: "活动分类",
          width:200,
          key: "activityClass",
          align: "center"
        },
        {
          title: "会员报名人数",
          width:180,
          key: "memberSignUpCount",
          align: "center",
        },
        {
          title: "志愿者报名人数",
          width:160,
          key: "volunteerSignUpCount",
          align: "center"
        },
        {
          title: "其他角色报名人数",
          width:180,
          key: "otherSignUpCount",
          align: "center"
        },
        {
          title: "群二维码",
          width: 150,
          key: "activityQrCode",
          align: "center",
          render: (h,params) => {
            return h("Icon", {
              props: {
                type: 'md-images',
              },
              on: {
                click: () => {
                  this.modal4 = true
                  this.memQrCode = params.row.memQrCode || null
                  this.voluQrCode = params.row.voluQrCode || null 
                  this.activityId = params.row.acitvityId
                  this.memQrCodeShow = params.row.memQrCodeShow || null
                  this.voluQrCodeShow = params.row.voluQrCodeShow || null
                }
              }
            })
          }
        },
        {
          title: "是否上架",
          width:140,
          key: "statue",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: ~~params.row.statusText !== 10,
                  disabled: params.row.statusText!="10"?false: true
                },
                'on':{
                  'on-change': e => {
                    if (params.row.statusText == "10") {

                    } else {
                      this.activityId = params.row.acitvityId
                      this.addstate = true
                      this.index = params.index
                    }
                  }
                }
              })
            ]);
          }
        }
      ],
      Article: [
        { value: 10, label: 10 },
        { value: 15, label: 15 },
        { value: 20, label: 20 }
      ],
      sorting: [
        { value: "asc", label: "正序" },
        { value: "desc", label: "倒序" }
      ],
      sort: "asc",
      datax: [],
      sysType: 1,
      page: 1,
      size: 10,
      dataCount: 0,
      name: "",
      state: "",
      startT: "",
      endT: "",
      arr: [],
      activeList: [],
      activityId: "",
      text: "",
      types: "",
      modal5: false,
      addstate:false,
      index: -1,
      query:{
        state:'',
        name:'',
        startT:'',
        endT:''
      },
      activeState: this.$store.state.activeState
    };
  },
  components: {},

  computed: {},

  created() {},
  mounted() {
    this.getactiveManager();
  },
  //事件监听
  watch: {
    size: "getactiveManager",
    sort: "getactiveManager"
  },

  methods: {
    updateQrcodeEvent(){
      updateQrCode({activityId:this.activityId,memQrCode:this.memQrCode,voluQrCode:this.voluQrCode}).then(res => {
        if(res.code == 200){
           this.modal4 = false
          this.$Message.success('修改成功')
          this.getactiveManager()
        }else{
          this.$Message.error(res.msg)
        }
      })
    },
    uploadFile (i,e) {
      let file = e.target.files[0]
      const dataForm = new FormData()
      dataForm.append('file', file)
      upload(dataForm).then(res => {
        if(res.code == 200){
          var reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            if(i === 0){
              this.memQrCodeShow = e.target.result
              this.memQrCode = res.data
            }else{
              this.voluQrCodeShow = e.target.result
              this.voluQrCode = res.data
            }
          }
        }else{
          this.$Message.warning(res.msg)
        }
      })

    },
    cancelImg(i){
      let path = i == 0?this.memQrCode:this.voluQrCode
      orgimgdel({path}).then(res => {
        if(res.code == 200){
            if(i === 0){
              this.memQrCodeShow =  null
              this.memQrCode =  null
            }else{
              this.voluQrCodeShow = null
              this.voluQrCode = null
            }
          this.$Message.success('删除成功')
        }else{
            this.$Message.warning(res.msg)
        }
      })
    },
    changeSwitch(e){
      if(params.row.statusText !== "10"){
        this.activityId = params.row.acitvityId
        this.addstate = true
        this.index = params.index
      }
    },
    //列表和分页
    getactiveManager() {
      activeManager({
        page: {
          page: this.page,
          size: this.size,
          sort: "createAt" + " " + this.sort
        },
        name: this.name,
        sysType: this.sysType,
        activityStatus: this.state,
        activityTimestampFrom: this.startT,
        activityTimestampTo: this.endT
      }).then(res => {
        this.$refs.selection.selectAll(false);
        if (res.code == 200) {
          this.dataCount = res.data.totalSize;
          this.datax = res.data.list;
        }
      });
    },

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
          this.$Message.info("取消成功");
        }else{
          this.$Message.error(res.msg)
        }
      });
    },
    //关闭
    getactiveclose(ids) {
      activeclose({
        userId: this.$store.state.userId,
        activityId: ids,
        type: this.types,
        channel: 2
      }).then(res => {
         if(res.code==200){
          this.$Message.info('关闭成功')
        }else{
          this.$Message.error(res.msg)
        }
      });
    },
    // 设置模板
    getactiveset(ids) {
      activeset({
        activityId: ids
      }).then(res => {
        if(res.code==200){
          this.$Message.info('设置成功')
        }else{
          this.$Message.error(res.msg)
        }
      });
    },
    // 活动下架
    getactivedown(ids) {
      ids = Array.of(ids);
      activedown({
        activityId: ids
      }).then(res => {
         if(res.code==200){
           this.addstate=false
          this.getactiveManager()
          this.$Message.info('下架成功')
        }else{
          this.$Message.error(res.msg)
        }
      });
    },

    //拒绝理由
    modalOk() {
      this.getactivecancel();
    },
    cancel() {
      this.modal5 = false;
    },

    //取消
    modalCancel(){
      this.datax=[]
      this.getactiveManager()
      // this.$set(this.datax[this.index],"statusText",1)
      this.addstate=false
    },

    //确定
    modalOkdel(){
      this.getactivedown(this.activityId)
    },

    //选择内容
    handleSelectionChange(val) {
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true;
      } else {
        this.status = false;
      }
      this.arr = val.map(v=> {
        return {activityId:v.acitvityId,activityName:v.activityName}
      })
    },

    //分页功能
    changepages(index) {
      this.page = index;
      this.getactiveManager();
    },

    //查询
    result() {
      if(!!this.query.startT&&!!this.query.endT){
        if(new Date(this.query.startT).getTime()>new Date(this.query.endT).getTime()){
          this.$Message.info('开始时间应该小于结束时间')
          return
        }else if(new Date(this.query.startT).getTime() == new Date(this.query.endT).getTime()){
          this.startT = new Date(this.query.startT + " 00:00:00").getTime()
          this.endT = new Date(this.query.endT + " 23:59:59").getTime()
        }else{
          this.startT = new Date(this.query.startT).getTime()
          this.endT = new Date(this.query.endT).getTime()
        }
      }else if((!!this.query.startT&&!this.query.endT)||(!!this.query.endT&&!this.query.startT)){
        this.$Message.warning("时间段缺少")
        return
      }else{
        this.startT = ''
        this.endT = ''
      }
      this.name = this.query.name
      this.state = this.query.state
      this.page = 1
      this.getactiveManager();
    },

    addaction() {
      this.$router.push({ name: "approval" });
    },
    exportData(i) {
      if(this.arr.length == 0){
        this.$Message.error("没有选择")
        return
      }
      for(let item of this.arr){
         window.open(`${SERVER_URl}/activity-manage/export?activityId=${item.activityId}&userType=${i}&activityName=
         ${item.activityName}`)
      }
    },
    //全选按钮
    chackall() {
      this.status = !this.status;
      this.$refs.selection.selectAll(this.status);
    }
  }
};
</script>
<style lang="scss" scoped>
.head{
  padding: 20px;
  text-align: center;
  font-size: 20px;
  font-weight: bold; 
}
  .start-wap{
    position: relative;
    margin: 0 auto;
    height: 150px;
    width: 150px;
    .imgss{
      width: 100%;
      height: 100%;
    }
    .upload{
      width: 100%;
      height: 100%;
    }
    .cancel{
      position: absolute;
      top: 0px;
      right: -30px;
      z-index: 10;
    }
    .upload .file{
      width: 100%;
      height: 100%;
      border: 1px dashed #FF565A;
      text-align: center;
      padding: 20px 0;
    }
    .upload .file input{
      display: none;
    }
    .shae{
      height: 150px;
      width: 150px;
    }
  }
.btn{
  background: #FF565A !important;
  color: #fff !important;
  border-color:#FF565A !important;
  font-size: 16px;
}
.showimg{
   width: 200px;
   height: 200px;
}
.integral-header{
  padding: 20px;
  border-radius: 20px;
  background: #fff;
  font-size: 16px;
  margin-bottom: 20px;
}
.integral-header .integral-top {
  padding: 10px;
  background: white;
}
.integral-header .integral-center {
  margin: 0 20px;
}
.integral-header .integral-body .flex-center-start  span{
  margin-right: 15px;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 180px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 40px;
}

.table-header {
  padding: 10px 20px;
  background: white;
}
.table-header .table-btn {
  margin-left: 15px;
  font-size: 16px;
}
.flex-data {
  display: flex;
}
.integral-table {
  padding: 20px 10px;
  background: #fff;
  border-radius: 20px;
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
.pages{
  text-align: center;
  padding: 20px 0;
  background-color: white;
}
</style>
