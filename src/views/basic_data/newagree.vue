<!-- 新建协议（会员） -->
<template>
  <div class="integral">
    <Navigation :labels="navigation1"></Navigation>
    <div class="xieyi">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="120">
        <FormItem label="甲方:" prop="partA">
          <!-- <Select
            v-model="model13"
            filterable
            remote
            size="large"
            style="width:300px"
            placeholder="甲方名称"
            :remote-method="remoteMethod1"
            :loading="loading1"
          >
            <Option
              v-for="(option, index) in options1"
              :value="option.value"
              :key="index"
            >{{option.label}}</Option>
          </Select> -->
          <Input v-model.trim="formInline.partA" placeholder="甲方名称" style="width:300px" />
        </FormItem>
        <FormItem label="乙方:" prop="partB">
          <Input v-model.trim="formInline.partB" placeholder="乙方名称" style="width:300px" />
        </FormItem>
        <FormItem label="协议分类:" prop="typeDicId">
          <Select v-model="formInline.typeDicId" placeholder="请选择分类" style="width:300px">
            <Option
              v-for="item in locations"
              :value="item.dataKey"
              :key="item.dataValue"
            >{{ item.dataValue }}</Option>
          </Select>
        </FormItem>
        <FormItem label="活动类型:" prop="categoryId">
          <Select v-model="formInline.categoryId" placeholder="请选择活动类型" style="width:300px">
            <Option
              v-for="item in typeList"
              :value="item.categoryId"
              :key="item.name"
            >{{ item.name }}</Option>
          </Select>
        </FormItem>

        <FormItem label="协议时间:" prop="agTime">
          <DatePicker
            type="date"
            placeholder="请选择协议时间"
            v-model="formInline.agTime"
            format="yyyy-MM-dd"
            @on-change="handleChange"
            style="width: 300px"
          ></DatePicker>
        </FormItem>
        <FormItem label="附件:" prop="agFile">
          <div class="flex-wrap-center">
            <p class="imgs" v-if="Boolean(formInline.nameA)">
              <span>{{formInline.nameA}}</span>
              <Icon
                type="ios-trash"
                class="cancel"
                size="24"
                color="#FF565A"
                @click="cancelImg(formInline.agPicA,formInline.nameA)"
              />
            </p>
            <p class="imgs" v-if="Boolean(formInline.nameB)">
              <span>{{formInline.nameB}}</span>
              <Icon
                type="ios-trash"
                class="cancel"
                size="24"
                color="#FF565A"
                @click="cancelImg(formInline.agPicB,formInline.nameB)"
              />
            </p>
            <p class="imgs" v-if="Boolean(formInline.nameC)">
              <span>{{formInline.nameC}}</span>
              <Icon
                type="ios-trash"
                class="cancel"
                size="24"
                color="#FF565A"
                @click="cancelImg(formInline.agPicC,formInline.nameC)"
              />
            </p>
          </div>
          <div class="start-wap">
            <div class="upload">
              <div class="file" @click="()=>{ this.$refs.files.click()}">
                <input
                  type="file"
                  style="display:none;"
                  accept=".txt, .zip, .doc, .ppt, .xls, .pdf, .docx, .xlsx"
                  ref="files"
                  @change="uploadFile()"
                  multiple
                />
                <Icon type="md-cloud-upload" :size="50" color="#FF565A" />
              </div>
            </div>

            <!-- <img class="imgs" v-else :src="texturl" style="width:100px;height:100px"/> -->
          </div>
        </FormItem>
        <div class="centers">
          <Button align="center" class="button-red" @click="handleSubmit('formInline')">保存</Button>
        </div>
      </Form>
      <br />
    </div>
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
  orgimgdel,
  Offactivities
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
        agPicA: null,
        agPicB: null,
        agPicC: null,

        nameA: null,
        nameB: null,
        nameC: null
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

      texturl: null,

      params: "",
      Times: "",
      agreementId: this.$route.query.agreementId,

      model13: "",
      loading1: false,
      options1: [],
      list: ["ab", "ac"]
    };
  },

  components: {},

  computed: {},
  mounted() {
    this.getAgreementNewList();
    this.getAgreementList();
    if (this.agreementId != null) {
      this.navigation1.head = "编辑协议";
      this.getAgreementdet();
    }
    this.orgimg = orgimg;
  },

  created() {},

  methods: {
    // // -获取官方活动分页
    // getOffactivities() {
    //   Offactivities({
    //     page: { page: this.page, size: this.size },
    //     dicName: '',
    //     validFlag: 1,
    //     createTimestamp: ''
    //   }).then(res => {
    //     if (res.code == 200) {
    //       this.data = res.data.list;
    //     } else {
    //       this.$Message.error(res.msg);
    //     }
    //
    //   });
    // },



    //输入框检索
    remoteMethod1(query) {
      if (query !== "") {
        this.loading1 = true;
        setTimeout(() => {
          this.loading1 = false;
          const list = this.list.map(item => {
            return {
              value: item,
              label: item
            };
          });
          this.options1 = list.filter(
            item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }, 200);
      } else {
        this.options1 = [];
      }
    },

    handleSubmit(name) {
      console.log(this.model13, this.options1, this.list);

      this.$refs[name].validate(valid => {
        if (valid) {
          if (Boolean(this.formInline.agPicA) == false) {
            this.$Message.error("请上传附件");
          } else {
            if (this.agreementId != null) {
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
        agTime: this.Times,

        agPicA: this.formInline.agPicA,
        agPicB: this.formInline.agPicB,
        agPicC: this.formInline.agPicC,

        nameA: this.formInline.nameA,
        nameB: this.formInline.nameB,
        nameC: this.formInline.nameC
      };
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
        agreementId: this.agreementId
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.formInline = res.data;
          this.formInline.agTime = this.util.formatDate(
            res.data.agreementTimestamp
          );
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
        agTime: this.Times,
        // agTime: this.data1,
        // agFile: this.formInline.agFile,
        agPicA: this.formInline.agPicA,
        agPicB: this.formInline.agPicB,
        agPicC: this.formInline.agPicC,

        nameA: this.formInline.nameA,
        nameB: this.formInline.nameB,
        nameC: this.formInline.nameC
        // name: this.formInline.name
      };
      this.params = this.util.remove(params);
      Agreementadd(this.params).then(res => {
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
    handleChange(e) {
      if (e != "") {
        let datas = e;
        datas = datas.split("")[0] + " 00:00:00";
        this.Times = datas;
      }
    },

    //图片上传
    uploadFile() {
      let file = this.$refs.files.files[0];
      if (Boolean(this.formInline.nameA) == false) {
        this.formInline.nameA = file.name;
      } else if (Boolean(this.formInline.nameB) == false) {
        this.formInline.nameB = file.name;
      } else if (Boolean(this.formInline.nameC) == false) {
        this.formInline.nameC = file.name;
      }
      let dataForm = new FormData();
      dataForm.append("file", file);
      upload(dataForm).then(res => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          this.texturl = e.target.result;

          if (Boolean(this.formInline.agPicA) == false) {
            this.formInline.agPicA = res.data;
            return;
          } else if (Boolean(this.formInline.agPicB) == false) {
            this.formInline.agPicB = res.data;
            return;
          } else if (Boolean(this.formInline.agPicC) == false) {
            this.formInline.agPicC = res.data;
            return;
          } else {
            this.$Message.error("最多上传三个附件!");
          }
        };
      });
    },
    //删除图片
    cancelImg(pic, name) {
      orgimgdel({ path: pic }).then(res => {
        if (res.code == 200) {
          this.$Message.success("删除成功");
          if (name == this.formInline.nameA) {
            (this.formInline.nameA = null), (this.formInline.agPicA = null);
            return;
          } else if (name == this.formInline.nameB) {
            (this.formInline.nameB = null), (this.formInline.agPicB = null);
            return;
          } else if ((name = this.formInline.nameC)) {
            (this.formInline.nameC = null), (this.formInline.agPicC = null);
            return;
          }
          this.texturl = null;
        } else {
          this.$Message.success(res.msg);
        }
      });
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
.xieyi {
  border-radius: 10px;
  padding-top: 50px;
  padding-left: 50px;
  background: #ffffff;
  min-height: 800px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.centers {
  margin-top: 30px;
  padding-left: 140px;
}
.start-wap {
  height: 200px;
}
.imgs {
  display: flex;
  width: 500px;
  span {
    display: block;

    font-size: 18px;
  }
}
.start-wap {
  position: relative;
  height: 150px;
  width: 300px;
  .upload {
    width: 100%;
    height: 100%;
  }
  .cancel {
    position: absolute;
    top: 10px;
    right: -30px;
    z-index: 10;
  }
  .upload .file {
    width: 100%;
    height: 100%;
    border: 1px dashed #dcdee2;
    text-align: center;
    padding: 20px 0;
  }
  .upload .file:hover {
    border: 1px dashed #ff565a;
  }
  .upload .file input {
    display: none;
  }
  .shae {
    height: 150px;
    width: 150px;
  }
}
.ivu-select-input {
  font-size: 16px;
}

.ivu-select-dropdown-list {
  li {
    font-size: 16px !important;
  }
}
</style>
