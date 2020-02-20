<!-- 新建协议（会员） -->
<template>
  <div class="integral">
    <Navigation :labels="navigation1"></Navigation>
    <div class="xieyi">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="120">
        <FormItem label="甲方:" prop="partA">
          <!-- <Select v-model="formInline.partA" @change="jia(e)" filterable>
                <Option v-for="item in list"  :value="item.orgId" :key="item.orgId">{{ item.orgName }}</Option>
          </Select>-->
          <Select
            ref="select1"
            v-model="formInline.partA"
            filterable
            remote
            size="large"
            placeholder="甲方名称"
            style="width:300px"
            :remote-method="remoteMethod1"
            :loading="loading1"
            class="selec"
          >
            <Option
              v-for="(option, index) in options1"
              :value="option.orgName"
              :key="index"
            >{{option.orgName}}</Option>
          </Select>
          <!-- <Input v-model.trim="formInline.partA" placeholder="甲方名称" style="width:300px" @on-change="jia" /> -->
        </FormItem>
        <FormItem label="乙方:" prop="partB">
          <Select
            v-model="formInline.partB"
            filterable
            remote
            placeholder="乙方名称"
            style="width:300px"
            :remote-method="remoteMethod2"
            :loading="loading2"
            class="selec"
          >
            <Option
              v-for="(option, index) in options2"
              :value="option.orgName"
              :key="index"
            >{{option.orgName}}</Option>
          </Select>
          <!-- <Input v-model.trim="formInline.partB" placeholder="乙方名称" style="width:300px" /> -->
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
        <FormItem label="活动类型:" prop="actTypeDicId">
          <Select
            v-model="formInline.actTypeDicId"
            placeholder="请选择活动类型"
            style="width:300px"
            multiple
          >
            <Option
              v-for="item in typeList"
              :value="item.dicId"
              :key="item.dicId"
            >{{ item.dicName }}</Option>
          </Select>
        </FormItem>

        <FormItem label="协议时间:" prop="agTime">
          <!-- <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="Select date and time(Excluding seconds)" style="width: 200px"></DatePicker> -->
          <!-- <DatePicker type="datetime" format="yyyy-MM-dd HH:mm"   @on-change="handleChange"  v-model="formInline.agTime"  placeholder="请选择协议时间" style="width: 300px"></DatePicker> -->
          <DatePicker
            type="datetime"
            placeholder="请选择协议时间"
            v-model="formInline.agTime"
            format="yyyy-MM-dd HH:mm:ss"
            @on-change="handleChange"
            style="width: 300px"
          ></DatePicker>
        </FormItem>
        <FormItem label="附件:" prop="agFile">
          <div class="flex-wrap-center">
            <p class="imgs" v-if="Boolean(formInline.nameA)">
              <span>{{formInline.nameA}}</span>
              <a>
                <Icon
                  type="ios-trash"
                  class="cancel"
                  size="24"
                  color="#FF565A"
                  @click="cancelImg(formInline.agPicA,formInline.nameA)"
                />
              </a>
            </p>
            <p class="imgs" v-if="Boolean(formInline.nameB)">
              <span>{{formInline.nameB}}</span>
              <a>
                <Icon
                  type="ios-trash"
                  class="cancel"
                  size="24"
                  color="#FF565A"
                  @click="cancelImg(formInline.agPicB,formInline.nameB)"
                />
              </a>
            </p>
            <p class="imgs" v-if="Boolean(formInline.nameC)">
              <span>{{formInline.nameC}}</span>
              <a>
                <Icon
                  type="ios-trash"
                  class="cancel"
                  size="24"
                  color="#FF565A"
                  @click="cancelImg(formInline.agPicC,formInline.nameC)"
                />
              </a>
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
                <a>
                  <Icon type="md-cloud-upload" :size="40" color="#FF565A" />
                </a>
              </div>
            </div>

            <!-- <img class="imgs" v-else :src="texturl" style="width:100px;height:100px"/> -->
          </div>
        </FormItem>
        <div class="centers">
          <Button
            align="center"
            class="button-red"
            @click="handleSubmit('formInline')"
            :loading="loading"
          >保存</Button>
        </div>
      </Form>
      <br />
    </div>
  </div>
</template>

<script>
import { upload } from "../../request/http";
import {
  Agreementadd,
  AgreementList,
  Agreementdet,
  Agreementmodify,
  orgimgdel,
  Offactivities
} from "@/request/api";
import { date1 } from "@/request/datatime";
import { newAgreement, Agreementtype } from "@/request/api";
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
        actTypeDicId: "",
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
          { required: true, message: "甲方名称不能为空", trigger: "change" }
        ],
        partB: [
          { required: true, message: "乙方名称不能为空", trigger: "change" }
        ],
        typeDicId: [
          {
            required: true,
            message: "请选择所属协议分类",
            trigger: "change",
            type: "number"
          }
        ],
        actTypeDicId: [
          {
            required: true,
            message: "请选择活动类型",
            trigger: "change",
            type: "array"
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

      Enclosure: "",

      texturl: null,

      params: "",
      Times: "",
      agreementId: this.$route.query.agreementId,

      model13: "",
      loading1: false,
      options1: [],
      list: [],
      orgType: 1,

      loading2: false,
      options2: [],
      list2: [],
      orgTypes: "2,3",

      nameaID: null,
      namebID: null,
      loading: false
    };
  },

  components: {},

  computed: {},
  mounted() {
    this.getAgreementtype();
    this.getAgreementList();
    if (this.agreementId != null) {
      this.navigation1.head = "编辑协议";
      this.getAgreementdet();
    }
  },

  created() {},

  methods: {
    jia(e) {
      // console.log(e)
      // console.log(e,this.options1,this.formInline.partA,this.list)
      // this.getnewAgreement()
    },

    //甲方名称
    getnewAgreement(e) {
      let params = {
        orgType: this.orgType,
        orgName: e
      };
      newAgreement(params).then(res => {
        if (res.code == 200) {
          this.list = res.data;
          // console.log(this)
        }
        // console.log(res);
      });
    },

    //活动类型
    getAgreementtype() {
      Agreementtype({
        typeFlag: 8
      }).then(res => {
        if (res.code == 200) {
          this.typeList = res.data;
        }
        // console.log(res);
      });
    },

    //输入框检索
    remoteMethod1(query) {
      if (query !== "") {
        this.loading1 = true;
        let params = {
          orgType: this.orgType,
          orgName: query
        };
        newAgreement(params).then(res => {
          if (res.code == 200) {
            this.list = res.data;
            setTimeout(() => {
              this.loading1 = false;
              const list = this.list.map(item => {
                return {
                  orgId: item.orgId,
                  orgName: item.orgName
                };
              });
              this.options1 = list.filter(
                item =>
                  item.orgName.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            }, 300);
          }
        });
      } else {
        this.options1 = [];
      }
    },
    //乙方
    remoteMethod2(query) {
      if (query !== "") {
        this.loading2 = true;
        let params = {
          orgType: this.orgTypes,
          orgName: query
        };
        newAgreement(params).then(res => {
          if (res.code == 200) {
            this.list2 = res.data;
            setTimeout(() => {
              this.loading2 = false;
              const list = this.list2.map(item => {
                return {
                  orgId: item.orgId,
                  orgName: item.orgName
                };
              });
              this.options2 = list.filter(
                item =>
                  item.orgName.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            }, 300);
          }
        });
      } else {
        this.options2 = [];
      }
    },

    handleSubmit(name) {
      // console.log(this.formInline.actTypeDicId)
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.agreementId != null) {
            this.getAgreementmodify();
          } else {
            this.getAgreementadd();
          }
        } else {
          this.$Message.error("提交失败！");
        }
      });
    },

    //协议分页列表
    getAgreementList() {
      AgreementList({
        sysType:1
      }).then(res => {
        if (res.code == 200) {
          this.locations = res.data;
        }
      });
    },

    //新增协议
    getAgreementadd() {
      let name = this.locations.find(item => {
        return item.dataKey == this.formInline.typeDicId;
      });
      this.nameaID = this.list.find(item => {
        return item.orgName == this.formInline.partA;
      });
      this.namebID = this.list2.find(item => {
        return item.orgName == this.formInline.partB;
      });
      let actTypeDicId = this.formInline.actTypeDicId.toString();
      let params = {
        sysId: this.sysId,
        targetType: this.targetType,
        typeDicId: this.formInline.typeDicId,
        typeDicName: name.dataValue,
        actTypeDicId: this.actTypeDicId,
        batchId: this.batchId,
        actTypeDicId: actTypeDicId,
        partA: this.nameaID.orgId,
        partB: this.namebID.orgId,
        agTime: this.Times,
        agPicA: this.formInline.agPicA,
        agPicB: this.formInline.agPicB,
        agPicC: this.formInline.agPicC,
        nameA: this.formInline.nameA,
        nameB: this.formInline.nameB,
        nameC: this.formInline.nameC
      };

      Agreementadd(this.util.remove(params)).then(res => {
        //防止重复提交
        setTimeout(() => {
          this.loading = false;
        }, 800);
        console.log(11);
        if (res.code == 200) {
          this.$Message.success("添加成功!");
          this.$router.push({
            name: "agreelist"
          });
        } else {
          this.$Message.error(res.msg);
        }
      });
    },

    //详情接口
    getAgreementdet() {
      Agreementdet({
        agreementId: this.agreementId
      }).then(res => {
        if (res.code == 200) {
          let list = res.data;
          this.formInline = list;
          this.formInline.partA = list.orgNameA;
          this.formInline.partB = list.orgNameB;
          this.nameaID = list.partA;
          this.namebID = list.partB;
          this.formInline.actTypeDicId = list.actTypeDicId
            .split(",")
            .map(item => {
              return Number(item);
            });
          console.log(this.formInline.actTypeDicId);
        }
      });
    },

    //修改接口
    getAgreementmodify() {
      let name = this.locations.find(item => {
        return item.dataKey == this.formInline.typeDicId;
      });
      this.nameaID = this.list.find(item => {
        return item.orgName == this.formInline.partA;
      });
      this.namebID = this.list2.find(item => {
        return item.orgName == this.formInline.partB;
      });
      this.formInline.agTime = this.Times;
      let actTypeDicId = this.formInline.actTypeDicId.toString();
      let params = {
        agreementId: this.agreementId,
        typeDicId: this.formInline.typeDicId,
        actTypeDicId: actTypeDicId,
        partA: this.nameaID.orgId,
        partB: this.namebID.orgId,
        typeDicName: name.dataValue,
        agTime: this.formInline.agTime,
        agPicA: this.formInline.agPicA,
        agPicB: this.formInline.agPicB,
        agPicC: this.formInline.agPicC,

        nameA: this.formInline.nameA,
        nameB: this.formInline.nameB,
        nameC: this.formInline.nameC
      };
      this.params = this.util.remove(params);
      Agreementadd(this.params).then(res => {
        //防止重复提交
        setTimeout(() => {
          this.loading = false;
        }, 800);
        if (res.code == 200) {
          this.$Message.success("编辑成功!");
          this.$router.push({
            name: "agreelist"
          });
        } else {
          this.$Message.error(res.msg);
        }
        // console.log(res);
      });
    },
    handleChange(e) {
      this.Times = e;
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
    // border: 1px dashed #dcdee2;
    text-align: center;
    padding: 20px 0;
  }
  .upload .file:hover {
    // border: 1px  #ff565a;
  }
  .upload .file input {
    display: none;
  }
  .shae {
    height: 150px;
    width: 150px;
  }
}
// .ivu-select-input {
//  font-size: 18px !important;
// }
.ivu-select-large .ivu-select-input {
  font-size: 18px !important;
}

// .ivu-select-dropdown-list {
//   li {
//     font-size: 16px !important;
//   }
// }

.selec .ivu-select-selection input {
  font-size: 16px !important;
}
</style>
