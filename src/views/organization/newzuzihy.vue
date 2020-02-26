<!-- 新建组织(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="main">
      <div class="basic" v-if="orgTypes != 9">
        <p class="title">分类</p>
        <div class="content middle">
          <RadioGroup v-model="orgTypes">
            <Radio
              style="font-size: 12px;"
              :label="item.dicCode"
              v-for="item in list"
              :key="item.dicCode"
              >{{ item.dataValue }}</Radio
            >
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
              <Input
                v-model="formValidate.orgName"
                placeholder="点 击 输 入"
                style="width: 220px"
              />
            </FormItem>
            <FormItem label="联系人:" prop="contactUserName">
              <Input
                v-model="formValidate.contactUserName"
                placeholder="自动带出"
                style="width: 220px"
              />
            </FormItem>
            <FormItem label="联系方式:" prop="contactUserPhone">
              <Input
                v-model="formValidate.contactUserPhone"
                style="width: 220px"
              />
            </FormItem>
            <FormItem label="地址:">
              <Selsect
                :arr="[province, city, county]"
                @change="selbtn"
              ></Selsect>
            </FormItem>
            <FormItem label="微信公众号:" prop="wechatOfficeAccount">
              <Input
                v-model="formValidate.wechatOfficeAccount"
                placeholder="点 击 输 入"
                style="width: 220px"
              />
            </FormItem>
            <FormItem label="图片:" prop="picUrl">
              <!-- :picMap="picMap" -->
              <UploadImg
                :full-url.sync="picMap"
                :max="1"
                v-model="formValidate.picUrl"
                :display-width="220"
                :crop-width="750"
                :crop-height="320"
              ></UploadImg>
            </FormItem>
            <FormItem label="详情:" prop="description">
              <Input
                v-model="formValidate.description"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 8 }"
              />
            </FormItem>

            <FormItem label="附件:">
              <div class="content">
                <div>
                  <div class="fil_txt" v-if="formInline.nameA != null">
                    <div class="fil-itme">
                      <p>{{ formInline.nameA }}</p>
                      <Icon
                        type="ios-trash"
                        class="cancel"
                        size="20"
                        color="#FF565A"
                        @click="canceltxt(formInline.agPicA, formInline.nameA)"
                      />
                    </div>
                    <!--    :hide-info="true" -->
                    <Progress stroke-color="#FF565A" :percent="numA" />
                  </div>
                  <div class="fil_txt" v-if="formInline.nameB != null">
                    <div class="fil-itme">
                      <p>{{ formInline.nameB }}</p>
                      <Icon
                        type="ios-trash"
                        class="cancel"
                        size="24"
                        color="#FF565A"
                        @click="canceltxt(formInline.agPicB, formInline.nameB)"
                      />
                    </div>
                    <Progress stroke-color="#FF565A" :percent="numB" />
                  </div>
                  <div class="fil_txt" v-if="formInline.nameC != null">
                    <div class="fil-itme">
                      <p>{{ formInline.nameC }}</p>

                      <Icon
                        type="ios-trash"
                        class="cancel"
                        size="24"
                        color="#FF565A"
                        @click="canceltxt(formInline.agPicC, formInline.nameC)"
                      />
                    </div>
                    <Progress stroke-color="#FF565A" :percent="numC" />
                  </div>
                </div>
                <div class="middle">
                  <div class="start-wap">
                    <div
                      class="upload"
                      v-if="formValidate.texturl == null"
                      @click="
                        () => {
                          this.$refs.filess.click();
                        }
                      "
                    >
                      <div class="file">
                        <input
                          style=" display:none;"
                          type="file"
                          accept=".txt, .zip, .doc, .ppt, .xls, .pdf, .docx, .xlsx"
                          ref="filess"
                          @change="uploadFiles($event)"
                          multiple
                        />
                        <Icon
                          type="md-cloud-upload"
                          :size="20"
                          color="#FF565A"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FormItem>

            <FormItem label="备注:">
              <Input
                v-model="value"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 8 }"
              />
            </FormItem>

            <FormItem label="">
              <a
                href="javascript:;"
                class="queryBtn"
                @click="handleSubmit('formValidate')"
                >提交</a
              >
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Selsect from "@/components/selsect";
import { uploadFile } from "../../request/http";
import { queryUserDetail } from "../../request/api";
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
      numA: 0,
      numB: 0,
      numC: 0,
      formValidate: {
        address: "",
        contactUserName: "",
        contactUserPhone: "",
        wechatOfficeAccount: "",
        description: "",
        orgName: "",
        orgPicShow: "",
        orgPic: "",
        remark: "",
        wx: "",
        text: "",
        fileList: [],
        picUrl: '',
        description: "",
        province: "",
        city: "",
        county: "",
        provinceId: 1
      },
      ruleValidate: {
        orgName: [
          { required: true, message: "团队名称不能为空", trigger: "blur" }
        ],
        contactUserName: [
          { required: true, message: "联系人不能为空", trigger: "blur" }
        ],
        picUrl: [
          {
            required: true,
            message: "图片不能为空",
            trigger: "blur",
            type: "string"
          }
        ],
        contactUserPhone: [
          { required: true, message: "联系电话不能为空", trigger: "blur" }
        ],
        description: [
          { required: true, message: "详情不能为空", trigger: "blur" }
        ]
      },
      list: [],
      ownerUserId: "",
      value: "",
      provinceList: [],
      cityList: [],
      districtList: [],
      name: null,
      orgimg: "",
      types: [],
      province: "",
      city: "",
      county: "",
      file: "",
      cityId: 1,
      districtId: 1,
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
      picMap: ''
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
          this.list = res.data.filter(res => {
            return res.dataKey != 448;
          });
        }
      });
    },

    //  获取当前账号的 姓名和手机号
    getUserInfo() {
      let userId = this.$store.state.userId;
      if (!userId) {
        this.$router.push({ name: "login" });
      }
      queryUserDetail({ userId: userId }).then(res => {
        this.formValidate.contactUserName = res.data.userName;
        this.formValidate.contactUserPhone = res.data.tel;
      });
    },
    //增加组织
    getorgadd() {
      let file = [];
      let str = this.formInline;
      if (str.agPicA) {
        file.push(str.agPicA + "/" + str.nameA);
      }
      if (str.agPicB) {
        file.push(str.agPicB + "/" + str.nameB);
      }
      if (str.agPicC) {
        file.push(str.agPicC + "/" + str.nameC);
      }
      let obj = {
        sysId: this.$route.query.sysId,
        orgType: this.orgTypes,
        orgName: this.formValidate.orgName,
        provinceId: this.formValidate.provinceId,
        cityId: this.cityId,
        districtId: this.districtId,
        createUserId: this.$store.state.userId,
        wechatOfficeAccount: this.formValidate.wechatOfficeAccount,
        remark: this.value,
        contactUserName: this.formValidate.contactUserName,
        contactUserPhone: this.formValidate.contactUserPhone,
        orgPic: this.formValidate.picUrl.toString(),
        file: file.toString(),
        description: this.formValidate.description
      };
      orgadd(obj).then(res => {
        if (res.code == 200) {
          this.$router.back();
          this.$Message.success(res.msg);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    //省市区
    selbtn(e) {
      this.formValidate.provinceId = e[0];
      this.cityId = e[1];
      this.districtId = e[2];
    },

    // 删除附件
    canceltxt(pic, name) {
      orgimgdel({ path: pic }).then(res => {
        if (res.code == 200) {
          this.$Message.success("删除成功");
          if (name == this.formInline.nameA) {
            (this.formInline.nameA = null), (this.formInline.agPicA = null);
            this.numA = 0;
            return;
          } else if (name == this.formInline.nameB) {
            (this.formInline.nameB = null), (this.formInline.agPicB = null);
            this.numB = 0;
            return;
          } else if ((name = this.formInline.nameC)) {
            (this.formInline.nameC = null), (this.formInline.agPicC = null);
            this.numC = 0;
            return;
          }
          this.texturl = null;
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
          this.$Message.error("必填项未填！");
        }
      });
    },

    //附件上传
    uploadFiles() {
      let file = this.$refs.filess.files[0];
      if (!file) return;
      if (this.formInline.nameA == null) {
        this.formInline.nameA = file.name;
      } else if (this.formInline.nameB == null) {
        this.formInline.nameB = file.name;
      } else if (this.formInline.nameC == null) {
        this.formInline.nameC = file.name;
      }
      let dataForm = new FormData();
      dataForm.append("file", file);
      console.log(this.formInline)
      uploadFile(dataForm).then(res => {
        if (res.code === 200) {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = e => {
            this.texturl = e.target.result;
            if (this.formInline.agPicA == null ) {
              this.formInline.agPicA = res.data;
              this.numA = 100;
              return;
            } else if (this.formInline.agPicB == null ) {
              this.formInline.agPicB = res.data;
              this.numB = 100;
              return;
            } else if (this.formInline.agPicC == null) {
              this.formInline.agPicC = res.data;
              this.numC = 100;
              return;
            } else {
              this.$Message.error("最多上传三个附件!");
            }
          };
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  mounted() {
    this.getUserInfo();
    if (this.$route.query.sysId == "1") {
      this.navigation1.head = "新建组织(会员)";
      this.getorgtype();
    } else if (this.$route.query.sysId == "2") {
      this.navigation1.head = "新建组织(志愿者)";
      this.list = [{ dataKey: 332, dataValue: "志愿者团队", dicCode: 3 }];
      this.orgTypes = 3;
    } else if (this.$route.query.sysId == "3") {
      this.navigation1.head = "新增基金";
      this.list = [{ dataKey: 448, dataValue: "基金", dicCode: 9 }];
      this.orgTypes = 9;
    }
  }
};
</script>
<style scoped>
.main {
  background-color: #fff;
  padding: 15px 0;
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
}
.basic {
  width: 800px;
  margin: 0 auto;
}
.title {
  padding: 0.5rem 1rem;
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
.scimg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.delimg {
  position: absolute;
  right: -70px;
  top: 5px;
}
.start-waps {
  position: relative;
  width: 150px;
  height: 150px;
}
.file p {
  padding: 0.5rem;
}
.middle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
}

.fil-itme {
  display: flex;
  justify-content: space-between;
}

.fil-itme p {
  display: block;
  font-size: 16px;
  line-height: 1.4;
  width: 10rem;
}
.fil_txt {
  margin-bottom: 15px;
}
</style>
