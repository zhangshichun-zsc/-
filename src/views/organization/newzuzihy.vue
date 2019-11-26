<!-- 新建组织(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="main">
      <div class="basic">
        <p class="title">分类</p>
        <div class="content middle">
          <RadioGroup v-model="orgTypes">
            <Radio :label="item.dataKey" v-for="item in list" :key="item.dataKey">{{item.dataValue}}</Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="basic">
        <p class="title">基本信息</p>
        <div class="content middle">
          <Form
            ref="formValidate"
            :model="formValidate"
            :show-message="false"
            :rules="ruleValidate"
            :label-width="120"
          >
            <FormItem label="名称:" prop="orgName">
              <Input v-model="formValidate.orgName" placeholder="点 击 输 入" style="width: 220px" />
            </FormItem>
            <FormItem label="联系人:" prop="orgName">
              <Input v-model="formValidate.ownerUserName" placeholder="自动带出" style="width: 220px" />
            </FormItem>
            <FormItem label="地址:" prop="address">
              <Select v-model="formValidate.provinceId" style="width:150px">
                <Option
                  v-for="item in provinceList"
                  :value="item.provinceId"
                  :key="item.provinceId"
                >{{ item.provinceName }}</Option>
              </Select>
              <Select v-model="formValidate.cityId" style="width:150px">
                <Option
                  v-for="item in cityList"
                  :value="item.cityId"
                  :key="item.cityId"
                >{{ item.cityName }}</Option>
              </Select>
              <Select v-model="formValidate.districtId" style="width:150px">
                <Option
                  v-for="item in districtList"
                  :value="item.districtId"
                  :key="item.districtId"
                >{{ item.districtName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="联系方式:" prop="orgName">
              <Input v-model="formValidate.ownerUserPhone" style="width: 220px" />
            </FormItem>
            <FormItem label="微信公众号:" prop="wechatOfficeAccount">
              <Input
                v-model="formValidate.wechatOfficeAccount"
                placeholder="点 击 输 入"
                style="width: 220px"
              />
            </FormItem>
            <FormItem label="图片:" prop="orgName">
              <div class="flex-start">
                <img :src="filePath" style="width: 9rem;height: 5rem;" />
                <div style="padding-top: 2.5rem;margin-left: 0.5rem;">
                  <Upload
                    :action=orgimg
                    :on-success="handleSuccessimg"
                  >
                    <Button icon="ios-cloud-upload-outline">上传图片</Button>
                  </Upload>
                </div>
              </div>
            </FormItem>
            <FormItem label="详情:" prop="orgName">
              <Input
                v-model="formValidate.remark"
                type="textarea"
                :autosize="{minRows: 5,maxRows: 8}"
              />
            </FormItem>
          </Form>
        </div>
      </div>
      <div class="basic">
        <p class="title">文件</p>
        <div class="content">
          <div class="middle">
            <Icon type="ios-paper-outline" size="100" />
            <div class="file">
              <p>
                <span>文件名称</span>
              </p>
              <Progress :percent="num" style="width: 15rem" />
            </div>
            <Button shape="circle" icon="md-close" style="margin-top: 0.5rem;"></Button>
          </div>
          <div class="middle">
            <Upload :action=orgimg :on-success="handleSuccess">
              <Button icon="ios-cloud-upload-outline">添加附件</Button>
            </Upload>
          </div>
        </div>
      </div>
      <div class="basic">
        <p class="title">备注</p>
        <div class="content">
          <Input v-model="value" type="textarea" :autosize="{minRows: 5,maxRows: 8}" />
        </div>
      </div>
      <div class="middle">
        <Button @click="handleSubmit('formValidate')">提交</Button>
      </div>
    </div>
  </div>
</template>
<script>
import {orgimg} from '@/request/http'
import {
  orgtype,
  orgadd,
  orgcity,
  orgdistrict,
  orgprovince
} from "@/request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "新建组织(会员)"
      },
      orgTypes: 1,
      defaultList: "",
      num: 0,
      formValidate: {
        address: "",
        contactUserName: "",
        contactUserPhone: "",
        description: "",
        orgName: "",
        orgPicShow: "",
        orgPic: "",
        remark: "",
        wx: "",
        text: "",
        fileList: [],

        ownerUserName: "",
        ownerUserPhone: ""
      },
      ruleValidate: {
        orgName: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur"
          }
        ],
        city: [
          {
            required: true,
            message: "请选择地址",
            trigger: "blur"
            // type:
          }
        ]
      },
      list: [],
      createUserId: 1,
      ownerUserId: "",
      value: "",
      provinceList:[],
      cityList: [],
      districtList: [],
      filePath: null,
      name: null,
      orgimg:''
    };
  },
  methods: {
    //获取组织类型列表
    getorgtype() {
      orgtype({
        sysType: this.$route.query.sysId
      }).then(res => {
        if (res.code == 200) {
          this.list = res.data;
          this.orgimg=orgimg
        }
        console.log(res);
      });
    },
    //增加组织
    getorgadd() {
      orgadd({
        sysId: this.$route.query.sysId,
        orgType: this.orgTypes,
        orgName: this.formValidate.orgName,
        address: this.formValidate.address,
        createUserId: this.createUserId,
        remark: this.formValidate.remark,
        ownerUserName: this.formValidate.ownerUserName,
        ownerUserPhone: this.formValidate.ownerUserPhone
      }).then(res => {
        if (res.code == 200) {
          this.$Message.success(res.msg);
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },
    //获取省
    getorgcity() {
      orgcity({}).then(res => {
        if (res.code == 200) {
          this.provinceList = res.data;
          this.getorgprovince();
        }
        console.log(res);
      });
    },
    //获取市
    getorgprovince() {
      orgprovince({
        provinceId: this.formValidate.provinceId
      }).then(res => {
        if (res.code == 200) {
          this.cityList = res.data;
          this.getorgdistrict();
        }
        console.log(res);
      });
    },
    //获取区
    getorgdistrict() {
      orgdistrict({
        cityId: this.formValidate.cityId
      }).then(res => {
        if (res.code == 200) {
          this.districtList = res.data;
        }
        console.log(res);
      });
    },

    //表单提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getorgadd();
        } else {
          this.$Message.error("必填项未填！");
        }
      });
    },
     //上传图片
    handleSuccessimg(res,file){
      this.name = file.name;
      this.filePath = file.filePath;
      console.log(res, file.name);

    },

    //附件上传
    handleSuccess(res, file) {

    },

  },
  mounted() {
    if (this.$route.query.sysId == "1") {

      this.navigation1.head = "新建组织(会员)";
      this.getorgtype();
    } else if (this.$route.query.sysId == "2") {

      this.navigation1.head = "新建组织(志愿者)";
      this.list = [{ dataKey: 8, dataValue: "志愿者团队" }];
      this.orgTypes = 8;
    }
  }
};
</script>
<style scoped>
.main {
  width: 36rem;
  margin: 0 auto;
}
.basic {
  margin: 0.5rem;
  border: #e4e4e4 solid 1px;
}
.title {
  padding: 0.5rem 1rem;
  background-color: #f2f2f2;
}
.middle {
  display: flex;
  justify-content: center;
}
.content {
  padding: 0.5rem 1rem;
}
.ivu-form-item {
  margin-bottom: 0.5rem;
}
.file p {
  padding: 0.5rem;
}
.middle {
  display: flex;
  justify-content: center;
}
</style>
