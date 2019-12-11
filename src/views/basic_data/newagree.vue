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
        <!-- <DatePicker v-model="formInline.agTime" format="yyyy/MM/dd" type="date" style="width: 200px" @on-change="addForm.Birthday=$event"></DatePicker> -->
           <DatePicker type="date" format="yyyy-MM-dd"  @on-change="handleChange"  v-model="formInline.agTime"  style="width: 200px"></DatePicker>

        <!-- <FormItem prop="endAt">
          <DatePicker
            icon="ios-clock-outline"
            type="date"
            placeholder="请选择时间"
            v-model="formInline.agTime"
            format="yyyy/MM/dd"
          ></DatePicker>
        </FormItem> -->
      </FormItem>
      <FormItem label="广告附件" prop="agFile">
        <p>{{Enclosure}}</p>
        <!-- <Upload
          :action=orgimg
          :before-upload="handleUpload"
          :show-upload-list="false"
        >
          <Button icon="ios-cloud-upload-outline">上传附件</Button>
        </Upload>-->
        <div class="start-wap">
          <!-- v-if="imgUrl == null" -->
          <div
            class="upload"
            @click="
                  () => {
                    this.$refs.files.click();
                  }
                "
          >
            <div class="file">
              <input
                style="display:none; width:0; hidht:0"
                type="file"
                accept=".jpg, .JPG, .gif, .GIF, .png, .PNG, .bmp, .BMP"
                ref="files"
                @change="uploadFile()"
                multiple
              />
              <!-- <Button icon="ios-cloud-upload-outline">上传头像</Button> -->
              <!-- <Icon type="md-cloud-upload" :size="36" color="#2d8cf0" /> -->
              <img
                v-show="this.formInline.agPicA"
                :src="this.formInline.agPicA || null"
                style="height:104px;width:104px;"
              />
              <span>{{formInline.nameA}}</span>
              <div v-show="!this.formInline.agPicA" class="file-text">
                <img src="@/assets/images/fix-img.png" />
              </div>
              <Icon
                type="ios-trash"
                v-show="this.formInline.agPicA !=null"
                class="cancel"
                :size="26"
                @click.stop.prevent="cancelImg()"
              />
            </div>
          </div>
        </div>
      </FormItem>
    </Form>
    <br />
    <Button align="center" type="success" @click="handleSubmit('formInline')">保存</Button>
  </div>
</template>

<script>
import { upload } from "../../request/http";
import { orgimg } from "@/request/http";
import {
  Agreementadd,
  AgreementNewList,
  AgreementList,
  Agreementdet,
  Agreementmodify,
  orgimgdel
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
        agFile: null,
        name: null,
         agPicA: "",
      agPicB: "",
      agPicC: "",

      nameA: "",
      nameB: "",
      nameC: "",
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
      Enclosure: "",

      texturl: "",


      params:''
    };
  },

  components: {},

  computed: {},
  mounted() {
    this.getAgreementNewList();
    this.getAgreementList();
    if (this.$route.query.agreementId) {
      this.navigation1.head = "编辑协议";
      this.getAgreementdet();
    }
    this.orgimg = orgimg;
  },

  created() {},

  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.formInline.agPicA == null) {
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

      let params = {
        sysId: this.sysId,
        // name: this.name,
        targetType: this.targetType,
        typeDicId: this.formInline.typeDicId,
        actTypeDicId: this.actTypeDicId,
        batchId: this.batchId,
        categoryId: this.formInline.categoryId,
        partA: this.formInline.partA,
        partB: this.formInline.partB,

        agTime: this.formInline.agTime,

        agPicA: this.formInline.agPicA,
        agPicB: this.formInline.agPicB,
        agPicC: this.formInline.agPicC,

        nameA: this.formInline.nameA,
        nameB: this.formInline.nameB,
        nameC: this.formInline.nameC,
      }
       this.params = this.util.remove(params);
      Agreementadd(params).then(res => {
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
      let params = {
        agreementId: this.formInline.agreementId,
        typeDicId: this.typeDicId,
        categoryId: this.formInline.categoryId,
        partA: this.formInline.partA,
        partB: this.formInline.partB,
        agTime: this.formInline.agTime,
        // agTime: this.data1,
        // agFile: this.formInline.agFile,
          agPicA: this.formInline.agPicA,
        agPicB: this.formInline.agPicB,
        agPicC: this.formInline.agPicC,

        nameA: this.formInline.nameA,
        nameB: this.formInline.nameB,
        nameC: this.formInline.nameC,
        name: this.formInline.name
      }
       this.params = this.util.remove(params);
      Agreementadd( this.params).then(res => {
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
    handleChange(e){
      let datas =e
      datas = datas + " 00:00:00";
      this.formInline.agTime=datas
      console.log(e)
    },



    //图片上传
    uploadFile() {
      let file = this.$refs.files.files[0];
      console.log(file);
        this.formInline.nameA= file.name;
      const dataForm = new FormData();
      dataForm.append("file", file);
      upload(dataForm).then(res => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          // this.texturl = e.target.result;
          // this.formInline.name = res.data;
          this.formInline.agPicA=file.name;
          this.formInline.agPicA=res.data
        };
      });
    },
    //删除图片
    cancelImg() {
      orgimgdel({ path: this.formInline.agPicA }).then(res => {
        if (res.code == 200) {
          this.$Message.success("删除成功");
          this.formInline.agPicA = null;
          this.formInline.name = null;
        } else {
          this.$Message.success(res.msg);
        }
      });
    },
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
