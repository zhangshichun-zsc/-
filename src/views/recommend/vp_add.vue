<!-- 添加广告(会员) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <Icon type="ios-search-outline" />
          <span>添加广告</span>
        </div>
        <div>
          <Button size="small">
            <Icon type="md-refresh" size="10" />刷新
          </Button>
          <Button @click="history" size="small">
            <Icon type="ios-arrow-back" size="10" />返回
          </Button>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="广告名称" prop="title">
          <Input v-model="formValidate.title" placeholder="广告名称" style="width:300px"></Input>
          <span
            style="color: #9EA7B4;font-size: 12px;margin-left: 0.5rem;"
          >广告名称只是作为辨别多个广告条目之用，并不显示在广告中</span>
        </FormItem>
        <FormItem label="广告位置" prop="location">
          <Select v-model="formValidate.location" placeholder="Select your city" style="width:300px">
                <Option value="1">会员首页轮播</Option>
                <Option value="2">志愿者首页轮播</Option>

            </Select>
        </FormItem>

        </FormItem>
        <FormItem label="开始时间" prop="startAt">
          <FormItem prop="startAt">
            <DatePicker
              icon="ios-clock-outline"
              type="date"
              placeholder="请选择时间"
              v-model="formValidate.startAt"
            ></DatePicker>
          </FormItem>
        </FormItem>
        <FormItem label="结束时间" prop="endAt">
          <FormItem prop="endAt">
            <DatePicker
              icon="ios-clock-outline"
              type="date"
              placeholder="请选择时间"
              v-model="formValidate.endAt"
            ></DatePicker>
          </FormItem>
        </FormItem>
        <FormItem label="上线/下线" prop="status">
          <RadioGroup v-model="formValidate.status">
            <Radio label="1">上线</Radio>
            <Radio label="0">下线</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="广告图片" prop="AdvertisingImages">
          <Upload action="//jsonplaceholder.typicode.com/posts/" :format="['jpg','png']" :max-size="50" :before-upload="handleUpload" :on-remove="remove">
            <Button icon="ios-cloud-upload-outline">选择上传图片</Button>
            <span
              style="color: #9EA7B4;font-size: 12px;margin-left: 0.5rem;"
            >只能上传jpg/png格式文件，文件不能超过50kb</span>
          </Upload>
        </FormItem>
        <FormItem label="广告链接" prop="linkUrl">
          <Input v-model="formValidate.linkUrl"></Input>
        </FormItem>
        <FormItem label="广告备注">
          <Input
            v-model="formValidate.remark"
            type="textarea"
            :autosize="{minRows: 5,maxRows: 5}"
            placeholder="请输入内容···"
          ></Input>
        </FormItem>
        <FormItem>
          <Button type="success" @click="handleSubmit('formValidate')">提交</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import  axios from 'axios';
import {date1} from '../../request/datatime'
import { AddAdvertising,AdvertisingList,AdvertisingDetails } from "../../request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "添加广告(会员)"
      },
      citys:[],
      data1:'',
      data2:'',
      picUrl:'',
      formValidate: {
        title: "",
        location: '1',
        status: '1',
        startAt: '',
        endAt: '',
        remark: "",
        linkUrl: "",
      },
      ruleValidate: {

        title: [
          { required: true, message: "广告名称不能为空", trigger: "blur" }
        ],
        linkUrl: [
          { required: true, message: "广告链接不能为空", trigger: "blur" }
        ],
        location: [
          { required: true, message: "广告位置不能为空", trigger: "change" }
        ],
        status: [
          { required: true, message: "请选择其中一个", trigger: "change" }
        ],
        startAt: [
          {
            required: true,
            type: "date",
            message: "开始日期不能为空",
            trigger: "change"
          }
        ],
        endAt: [
          {
            required: true,
            type: "date",
            message: "结束日期不能为空",
            trigger: "change"
          }
        ]
      },
      data: [],
      sysid:1
    };
  },
  mounted(){
    this.getAdvertisingList()
    console.log(this.$route.query.contentId)
    if(this.$route.query.contentId){
      this.getAdvertisingDetails()
    }

  },

  components: {},

  computed: {},

  created() {},

  methods: {
    //列表
    getAdvertisingList(){
      AdvertisingList().then(res=>{
        if(res.code==200){
          this.citys=res.data
        }
        console.log(res)
      })
    },
    //添加广告

    getadd(){
      this.data1 = this.formValidate.startAt.getTime()
      this.data2 = this.formValidate.endAt.getTime()
      AddAdvertising({
        sysId:this.sysid,
         title:this.formValidate.title,
        location:this.formValidate.location,
        startAt:this.data1,
        endAt:this.data2,
        status:this.formValidate.status,
        picUrl:this.picUrl,
        linkUrl:this.formValidate.linkUrl,
        remark:this.formValidate.remark,
        contentId:this.$route.query.contentId
      }).then(res=>{
        if(res.code==200){
         this.$Message.success("提交成功!");
         this.$router.push({ name: 'vp_adlist' })
  }
        console.log(res)
      }).catch(res=>{
        console.log(res)
      })
    },

    //广告详情
    getAdvertisingDetails(){
      AdvertisingDetails({
        contentId:this.$route.query.contentId
      }).then(res=>{
        console.log(res)
        let list = res.data
        this.formValidate.title=list.title,
        this.formValidate.location=list.location,
        this.formValidate.startAt = date1('Y-m-d',this.startAt)
        this.formValidate.endAt = date1('Y-m-d',this.endAt)
        this.formValidate.status = list.status,
        this.formValidate.picUrl = list.picUrl,
        this.formValidate.linkUrl = list.linkUrl,
        this.formValidate.remark = list.remark
      })
    },



    handleSubmit(name) {
      if(this.formValidate.startAt<this.formValidate.endAt){
      console.log()
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.getAddAdvertising()
          this.getadd()
          console.log(this.formValidate)
        } else {
           console.log(this.formValidate)
          this.$Message.error("提交失败！");
        }
      });
      }else{
        this.$Message.info('日期结束时间不正确')
      }
    },
    //图片上传
    handleUpload(file){
      // this.picUrl=file.name
      this.formValidate.picUrl = '11'
      console.log(file,this.picUrl)
    },
    remove(file){
      console.log(file)
    },

    history() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  padding: 15px 20px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
}

.integral-table {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.table-header {
  padding: 5px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
</style>
