<!-- 新建组织(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="main">
      <div class="basic">
        <p class="title">分类</p>
        <div class="content middle">
          <RadioGroup v-model="orgTypes">
            <Radio :label="item.dicCode" v-for="item in list" :key="item.dicCode">{{item.dataValue}}</Radio>
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
               <Selsect :arr='[province,city,county,]' @change='selbtn'></Selsect>
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
            <FormItem label="图片:" prop="imgUrl">
              <div class="start-wap">
          <div class="upload" v-if="formValidate.imgUrl == null" @click="()=>{ this.$refs.files.click()}">
            <div class="file">
              <input
                style=" display:none;"
                type="file"
                accept=".jpg, .JPG, .gif, .GIF, .png, .PNG, .bmp, .BMP"
                ref="files"
                @change="uploadFile()"
                multiple
              />
              <Button icon="ios-cloud-upload-outline">上传图片</Button>
              <!-- <Icon type="md-cloud-upload" :size="36" color="#2d8cf0" /> -->
            </div>
          </div>

          <img :src="formValidate.imgUrl" style="height:150px;width:150px;" />
          <Icon
            type="ios-trash"
            v-if="formValidate.imgUrl!= null"
            class="cancel"
            :size="26"
            @click="cancelImg()"
          />
        </div>

            </FormItem>
            <FormItem label="详情:" prop="orgName">
              <Input
                v-model="formValidate.description"
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
import Selsect from '@/components/selsect'
import { upload } from "../../request/http";
import {orgimg} from '@/request/http'
import {
  orgtype,
  orgadd,
  orgcity,
  orgdistrict,
  orgprovince,
  orgimgdel
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
        picUrl:null,
        ownerUserName: "",
        ownerUserPhone: "",
        imgUrl:null,
        description:'',
        province:'',
        city:'',
        county:'',

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
        ],
        imgUrl:[  {
            required: true,
            message: "图片不能为空",
            trigger: "blur"

          }]
      },
      list: [],
      ownerUserId: "",
      value: "",
      provinceList:[],
      cityList: [],
      districtList: [],

      name: null,
      orgimg:'',
      types:[],

        province:'',
        city:'',
        county:'',
        file:''

    };
  },
  components: { Selsect },
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
        provinceId:this.formValidate.provinceId,
        cityId: this.cityId,
        districtId:this.districtId,
        createUserId: this.$store.state.userId,
        wechatOfficeAccount:this.formValidate.wechatOfficeAccount,
        remark: this.value,
        ownerUserName: this.formValidate.ownerUserName,
        ownerUserPhone: this.formValidate.ownerUserPhone,
        orgPic:this.formValidate.orgPic,
        file:this.file,
        description:this.formValidate.description
      }).then(res => {
        if (res.code == 200) {
          this.$Message.success(res.msg);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    //省市区
    selbtn(e){
      this.formValidate.provinceId=e[0];
      this.cityId=e[1];
      this.districtId=e[2];
    },

    //图片上传
    uploadFile() {
      let file = this.$refs.files.files[0];
      const dataForm = new FormData();
      dataForm.append("file", file);
      upload(dataForm).then(res => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          this.formValidate.imgUrl = e.target.result;
          this.formValidate.picUrl = res.data;
        };
      });
    },
    //删除图片
    cancelImg() {
      orgimgdel({ path: this.formValidate.picUrl }).then(res => {
        if (res.code == 200) {
          this.$Message.success("删除成功");
          this.formValidate.picUrl = null;
          this.formValidate.imgUrl = null;
        } else {
          this.$Message.success(res.msg);
        }
      });
    },

    //表单提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getorgadd();
        } else {
          console.log(this.formValidate.provinceId)
          this.$Message.error("必填项未填！");
        }
      });
    },

    //附件上传
    handleSuccess(res, file) {
      this.file=res.data
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
