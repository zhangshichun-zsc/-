<!-- 新建协议（会员） -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <span>新建协议</span>
        </div>
      </div>
    </div>
    <div class="integral-table"></div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem label="甲方" prop="partA">
        <Input v-model="formInline.partA" placeholder="广告名称" style="width:300px"></Input>
      </FormItem>
      <FormItem label="乙方" prop="partB">
        <Input v-model="formInline.partB" placeholder="广告名称" style="width:300px"></Input>
      </FormItem>
      <FormItem label="协议分类" prop="typeDicId">
        <Select v-model="formInline.typeDicId" placeholder="Select your city" style="width:300px">
          <Option
            v-for="item in locations"
            :value="item.dataKey"
            :key="item.dataValue"
          >{{ item.dataValue }}</Option>
        </Select>
      </FormItem>
      <FormItem label="所属项目" prop="categoryId">
        <Select v-model="formInline.categoryId" placeholder="Select your city" style="width:300px">
          <Option v-for="item in typeList" :value="item.categoryId" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>

      <FormItem label="协议时间" prop="agTime">
        <FormItem prop="endAt">
          <DatePicker
            icon="ios-clock-outline"
            type="date"
            placeholder="请选择时间"
            v-model="formInline.agTime"
          ></DatePicker>
        </FormItem>
      </FormItem>
      <FormItem label="广告附件" prop="agFile">
        <p>{{Enclosure}}</p>
        <Upload
          :action="orgimg"
          :before-upload="handleUpload"
          :show-upload-list="false"
        >
          <Button icon="ios-cloud-upload-outline">上传附件</Button>
        </Upload>
      </FormItem>
    </Form>
    <br />
    <Button align="center" type="success" @click="handleSubmit('formInline')">保存</Button>
  </div>
</template>

<script>
import { orgimg } from "@/request/http";
import {
  Agreementadd,
  AgreementNewList,
  AgreementList,
  Agreementdet,
  Agreementmodify
} from "@/request/api";
import { date1 } from "@/request/datatime";
export default {
  data() {
    return {
      navigation1: {
        head: "新建协议（会员）"
      },
      typeList: [],
      locations: [],
      formInline: {
        partA: "",
        partB: "",
        typeDicId: "",
        agTime: "",
        categoryId: "",
        agFile: ""
      },
      ruleInline: {
        partA: [
          { required: true, message: "甲方名称不能为空", trigger: "blur" }
        ],
        partB: [
          { required: true, message: "乙方名称不能为空", trigger: "blur" }
        ],
        typeDicId: [
          {
            required: true,
            message: "请选择所属协议分类",
            trigger: "change",
            type: "number"
          }
        ],
        categoryId: [
          {
            required: true,
            message: "请选择所属项目类型",
            trigger: "change",
            type: "number"
          }
        ],

        agTime: [
          {
            required: true,
            type: "date",
            message: "开始日期不能为空",
            trigger: "change"
          }
        ]
      },
      sysId: 1,
      data1: "",

      orgimg: "",
      Enclosure:''
    };
  },

  components: {},

  computed: {},
  mounted() {
    this.getAgreementNewList();
    this.getAgreementList();
    if (this.$route.query.agreementId) {
      this.navigation1.head='编辑协议'
      this.getAgreementdet();
    }
    this.orgimg = orgimg;
  },

  created() {

  },

  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if ((this.file =='')) {
            this.$Message.error("请上传附件");
          } else {
            if (this.$route.query.agreementId) {
              this.getAgreementmodify();
            } else {
              this.getAgreementadd();
            }
          }
        } else {
          this.$Message.error("提交失败！");
        }
      });
    },

    //协议分页列表
    getAgreementList() {
      AgreementList({}).then(res => {
        console.log(res);
        if (res.code == 200) {
          // res.data.unshift({ dataKey: "", dataValue: "全部" });
          this.locations = res.data;
        }
      });
    },

    //列表
    getAgreementNewList() {
      AgreementNewList({
        sysType: this.sysType
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.typeList = res.data;
        }
      });
    },

    //新增协议
    getAgreementadd() {
      console.log(this.sysId);
      this.data1 = this.formInline.agTime.getTime();
      Agreementadd({
        sysId: this.sysId,
        name: this.name,
        targetType: this.targetType,
        typeDicId: this.formInline.typeDicId,
        actTypeDicId: this.actTypeDicId,
        batchId: this.batchId,
        categoryId: this.formInline.categoryId,
        partA: this.formInline.partA,
        partB: this.formInline.partB,
        agPic: this.agPic,
        agTime: this.data1,
        agFile: this.formInline.agFile,
        sort: this.sort
      }).then(res => {
        if (res.code == 200) {
          this.$Message.success("添加成功!");
          this.$router.push({
            name: "agreelist"
          });
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //详情接口
    getAgreementdet() {
      Agreementdet({
        agreementId: this.$route.query.agreementId
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.formInline = res.data;
          this.formInline.agTime = date1("Y-m-d", res.data.agreementTimestamp);
        }
      });
    },

    //修改接口
    getAgreementmodify() {
      this.data1 = this.formInline.agTime.getTime();
      Agreementmodify({
        agreementId: this.formInline.agreementId,
        typeDicId: this.typeDicId,
        categoryId: this.formInline.categoryId,
        partA: this.formInline.partA,
        partB: this.formInline.partB,
        agTime: this.data1,
        agFile: this.formInline.agFile
      }).then(res => {
        if (res.code == 200) {
          this.$Message.success("编辑成功!");
          this.$router.push({
            name: "agreelist"
          });
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //图片上传
    handleUpload(file) {
      this.Enclosure=file.name
      console.log(file);
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
