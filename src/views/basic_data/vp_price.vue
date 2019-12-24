<!-- 会费管理(会员) -->
<template>
  <div class="integral">
      <basicdata :navigation1="navigation1" @query="query"></basicdata>

    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <!-- <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status"></Checkbox>全选
          </Button> -->
          <!-- <span>已选择{{arr.length}}</span> -->
          <Button class="table-btns"  @click="add('formValidate')">{{Newly}}</Button>
          <Modal v-model="modal1" title="新增会费" class="modals"  width="700">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <FormItem label="会费名称:" prop="name">
                <Input v-model.trim="formValidate.name" size="large" style="width: 220px"/>
              </FormItem>
              <FormItem label="金额:" prop="amount">
                <InputNumber :min="0" :max="1000000000"  v-model="formValidate.amount" size="large"  style="width: 220px"></InputNumber> <Button type="error" >元</Button>
              </FormItem>
              <FormItem label="会费期限:" prop="imonth">
                <InputNumber :max="99" :min="1" v-model="formValidate.imonth" size="large"  style="width: 220px;"></InputNumber>
               <Button type="error" >月</Button>
              </FormItem>
              <FormItem label="会员包:" prop="packageFlag">
                <RadioGroup v-model="formValidate.packageFlag" size="large">
                  <Radio label="1">有</Radio>
                  <Radio label="0">无</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="会费详情">
                <wangeditor id="exccccc" :labels="editorContent" @change="btn"></wangeditor>

              </FormItem>
            </Form>
            <div slot="footer">
              <Button type="text" size="large" @click="modalCancel1">取消</Button>
              <Button type="error" size="large" @click="handleSubmit('formValidate')">确定</Button>
            </div>
          </Modal>
        </div>
      </div>
       <Modal v-model="addstate" width="560" class-name="vertical-center-modal">
                <p slot="header" class="flex-center-center" style="color:black">
                  <span>新增确定</span>
                </p>
                <div style="text-align:center;font-size:16px">
                  <p>是否确认新增，新增后上一条有效数据将自动设为无效</p>
                </div>
                <div slot="footer">
                  <Button  @click="modalCancel2">取消</Button>
                  <Button type="error" @click="modalOkdel2">确定</Button>
                </div>
              </Modal>
       <div class="min-height">
        <Table
        ref="selection"
        border
        :columns="columns"
        :data="data"
        @on-selection-change="handleSelectionChange"
      ></Table>
      </div>

      <div class="pages">
        <Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          style="margin: auto"
          :page-size="size"
          @on-change="changepages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import wangeditor from "@/components/wangeditor";
import basicdata from "@/components/basicdata";

import { formatDate } from "@/request/datatime";
import { Costlist, Costadd, Costdels } from "@/request/api";

export default {
  name: "editor",
  data() {
    return {
      editorContent: "",
      Newly: "新增会费",
      formValidate: {
        name: null,
        imonth: null,
        amount: null,
        packageFlag: "1"
      },
      ruleValidate: {
        name: [
          { required: true, message: "会费名称不能为空", trigger: "blur" }
        ],
        packageFlag:[{
          required: true,  trigger: "change"
        }],
        amount: [
          {
            required: true,
            message: "输入格式不正确",
            trigger: "blur",
            pattern: /^[a-z0-9]+$/,
            type: "number"
            // transform(value) {
            //   return Number(value);
            // }
          }
        ],
        imonth: [
          {
            required: true,
            message: "输入格式不正确",
            trigger: "blur",
            type: "number",
            pattern: /^[a-z0-9]+$/,
            transform(value) {
              return Number(value);
            }
          }
        ]
      },
      navigation1: {
        head: "会费管理(会员)"
      },
      modal1: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "名称",
          key: "name",
          align: "center",
          width:350,
        },
        {
          title: "会费期限",
          key: "imonth",
          align: "center",
          width:200,
          render:(h,params)=>{
            // let imonths

            // if(params.row.imonth>12){
            //   let year = Math.floor(params.row.imonth/12)
            //   let imonth =params.row.imonth%12
            //   console.log(year,imonth)
            //   imonths=year+'年'+imonth+'月'

            // }else{
            //   imonths=params.row.imonth+'月'

            // }
            return h('p',params.row.imonth+'月')
          }
        },
        {
          title: "金额/(元)",
          key: "amount",
          align: "center",
           width:200,
            render:(h,params)=>{
              return h('p',params.row.amount.toFixed(2))
            }
        },
        {
          title: "会员包",
          key: "packageFlagText",
          align: "center",
           width:240,
        },
        {
          title: "创建时间",
          key: "createAt",
          align: "center",
          width:240,
        },
        {
          title: "有效状态",
          key: "status",
          align: "center",
          width:180,
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.validFlag == 1
                },
                on: {
                  input: e => {
                    console.log(e);
                    this.duesId=params.row.duesId
                    if(e){
                      this.validFlags=1
                      this.getCostadd(2)
                    }else{
                      this.validFlags=0
                      this.getCostadd(2)
                    }
                  }
                }
              })
            ]);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width:180,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: params.row.validFlag==1?"red":'#ccc'
                  },
                  on: {
                    click: () => {
                      if(params.row.validFlag==0){
                        return
                      }else{
                        this.modal1 = true;
                        this.duesId=params.row.duesId
                        this.getCostdels()
                      }

                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      data: [],
      costtype: [
        { label: "全部", value: "" },
        { label: "有效", value: "1" },
        { label: "无效", value: "0" }
      ],
      page: 1,
      size: 10,
      pageSize: 10,
      dataCount: 0,

      name: "",
      createTimeStamp: "",
      datas: "",
      status: false,
      statues: "",
      duesId: '',
      arr: [],

      startAt: "",
      endAt: "",
      editorContent: "",
      name: "",
      validFlag: "",
      names: "",
      amount: "",
      detail: "",
      list: "",
      validFlags:'',

      addstate:false,

    };
  },
  components: { basicdata, wangeditor },

  computed: {},

  created() {},

  mounted() {
    this.getCostlist();
  },
  methods: {
    //分页
    getCostlist() {
      let params = {
        page: {
          page: this.page,
          size: this.size
        },
        name: this.name,
        validFlag: this.statues,
        startAt: this.startAt,
        endAt: this.endAt
      };
      this.params = this.util.remove(params);
      Costlist(this.params).then(res => {
        if (res.code == 200) {
          this.data = res.data.list;
          this.dataCount = res.data.totalSize;
        }
        console.log(res);
      });
    },

    //增加修改
    getCostadd(e) {
      if (e==0) {  //编辑
        this.list = [{
          duesId: this.duesId,
          validFlag: this.formValidate.validFlag,
          name: this.formValidate.name,
          amount: this.formValidate.amount,
          imonth:this.formValidate.imonth,
          detail: this.editorContent,
          packageFlag:this.formValidate.packageFlag
        }];
      }else if(e==1){ //新增
        this.list = [{
          validFlag: this.formValidate.validFlag,
          sysId:1,
          name: this.formValidate.name,
          amount: this.formValidate.amount,
          imonth:this.formValidate.imonth,
          detail: this.editorContent,
          packageFlag:this.formValidate.packageFlag
        }];
      }else if(e==2){
        this.list =[{
          duesId:this.duesId,
          validFlag:this.validFlags
        }]
      }
      this.list = this.util.remove(this.list);
      Costadd({
        list: this.list
      }).then(res => {
        if(res.code==200){
          if(e==0){
            this.modal1=false
            this.$Message.info('添加成功')
             this.getCostlist()
          }else if(e==1){
            this.modal1=false
            this.$Message.info('修改成功')
             this.getCostlist()
          }else if(e==2){
            this.$Message.info('操作成功')
          }

        }

        console.log(res);
      });
    },

    //详情
    getCostdels() {
      Costdels({ duesId: this.duesId }).then(res => {
        if(res.code==200){
          this.formValidate=res.data
          this.editorContent=res.data.detail
        }
        console.log(res);
      });
    },

    //取消框
    modalCancel2(){
      this.addstate=false
    },
    //确认框
    modalOkdel2(){
      this.modal1=true
      this.addstate=false
    },

    //取消
    modalCancel1() {
      this.modal1 = false;
    },
    //确定
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if(this.duesId==''){//新增
            this.getCostadd(1)
          }else{            //编辑
            this.getCostadd(0)
          }
        } else {
          this.$Message.error("必填项为空！");
        }
      });
    },

    //富文本
    btn(e) {
      this.editorContent = e;
    },

    //查询
    query(e) {
      this.data=[]
      this.page = 1;
       this.statues = e.validFlag;
      this.name = e.dicName;
      this.startAt = e.createTimestamp[0];
      this.endAt = e.createTimestamp[1];

      this.getCostlist();
    },

    //分页功能
    changepages(index) {
      this.page = index;
      this.getCostlist();
    },
    // //全选按钮
    // chackall() {
    //   console.log(this.status);
    //   this.status = !this.status;
    //   this.$refs.selection.selectAll(this.status);
    // },
    //选择内容
    handleSelectionChange(val) {
      this.arr = val;
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true;
      } else {
        this.status = false;
      }
    },

    //编辑
    edit(e) {
      this.duesId = e;
    },
    //新增
    add(name) {
      this.duesId=''
      this.editorContent = "";
      this.$refs[name].resetFields();
      this.addstate = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.modals{
  height: 500px;
}
.w-e-text{
  font-size: 16px !important;
}
#text-elem3472466774465377{
  font-size: 16px !important;
}

</style>
