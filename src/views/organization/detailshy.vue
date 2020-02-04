<!-- 组织详情会员 -->
<template>
  <div style="padding-top: 20px">
    <!-- <Navigation :labels="navigation1"></Navigation> -->
    <div class="details-zhu">
      <span
        v-for="(item, index) in list"
        :key="index"
        :class="{ active: num == index }"
        @click="onall(index)"
      >
        <a>{{ item }}</a>
      </span>
    </div>
    <div class="details-info">
      <p class="title">{{ navigation1.head }}</p>
      <div class="header">
        <img
          :src="arr.orgPicPath"
          style="height:80px;width:80px; margin-top: 5px;"
        />
        <p>
          组织名称：
          <span class="name">{{ arr.orgName }}</span>
        </p>
        <p>
          分类：
          <span class="type">{{ arr.orgTypeText }}</span>
        </p>
      </div>
    </div>
    <div v-if="num == 0">
      <div class="details-td">
        <p class="details-tj">
          <Icon style="color:#FF565A;" type="md-bookmark" />
          <span>组织信息</span>
        </p>
        <table>
          <tr>
            <th>名称</th>
            <td>{{ arr.orgName }}</td>
            <th>微信公众号</th>
            <td>{{ arr.wechatOfficeAccount }}</td>
          </tr>
          <tr>
            <th>负责人</th>
            <td>{{ arr.ownerUserName }}</td>
            <th>城市</th>
            <td>{{ arr.cityName }}</td>
          </tr>
          <tr>
            <th>联系方式</th>
            <td>{{ arr.ownerUserPhone }}</td>
            <th>成立时间</th>
            <td>{{ arr.createTimestamp }}</td>
          </tr>
        </table>
      </div>
      <div class="details-tjxx">
        <p class="details-tj">
          <Icon style="color:#FF565A;" type="md-bookmark" />
          <span>统计信息</span>
        </p>
        <table>
          <tr>
            <th>活动立项数量</th>
            <th>活动受益孩子</th>
            <th>活动受益家长</th>
            <th>成员数量</th>
          </tr>
          <tr>
            <td>{{ statistics.batchCount }}</td>
            <td>{{ statistics.actChildCount }}</td>
            <td>{{ statistics.actMemCount }}</td>
            <td>{{ statistics.orgUserCount }}</td>
          </tr>
        </table>
      </div>
      <div class="tableList">
        <p class="details-tj" style="margin-bottom:10px;">
          <Icon style="color:#FF565A;" type="md-bookmark" />
          <span>组织成员</span>
        </p>
        <i-table border :columns="columns1" :data="data1"></i-table>
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

    <div
      v-if="num == 1"
      style="background:#fff;margin-top: 20px;box-shadow: 0 3px 4px 0 rgba(188,188,188,0.21); border-radius: 12px;"
    >
      <div class="basic">
        <p
          class="title"
          style="padding-top:20px;
                 text-align: center;
                 font-weight: 800;"
        >
          基本信息
        </p>
        <div class="content middle">
          <Form
            ref="BasicDate"
            :model="BasicDate"
            :rules="ruleValidate"
            :label-width="120"
            :show-message="false"
          >
            <FormItem label="名称:" prop="orgName">
              <Input
                disabled
                v-model="BasicDate.orgName"
                style="width: 220px"
              />
            </FormItem>
            <FormItem label="联系人:" prop="orgName">
              <Input
                v-model="BasicDate.contactUserName"
                placeholder="自动带出"
                style="width: 220px"
              />
            </FormItem>
            <FormItem label="地址:">
              <Selsect
                :disabled_s="true"
                :arr="[province, city, county]"
                @change="idsactive"
              ></Selsect>
            </FormItem>
            <FormItem label="联系方式:" prop="orgName">
              <Input
                v-model="BasicDate.contactUserPhone"
                style="width: 220px"
              />
            </FormItem>
            <FormItem label="微信公众号:">
              <Input
                v-model="BasicDate.wx"
                placeholder="点 击 输 入"
                style="width: 220px"
              />
            </FormItem>
            <FormItem label="图片:" prop="orgPicShow">
              <!-- :picMap="picMap" -->
              <UploadImg
                :max="1"
                v-model="BasicDate.picUrl"
                :full-url.sync="picMap"
                :display-width="120"
                :crop-width="120"
                :crop-height="120"
              ></UploadImg>
            </FormItem>
            <FormItem label="详情:" prop="orgName">
              <Input
                v-model="BasicDate.description"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 8 }"
              />
            </FormItem>

            <FormItem label="附件:">
              <div class="content">
                <div class="">
                  <div class="fil_txt" v-if="formInline.nameA != null">
                    <div class="fil-itme">
                      <p>{{ formInline.nameA }}</p>
                      <Icon
                        type="ios-trash"
                        class="cancel-txt"
                        size="24"
                        color="#FF565A"
                        @click="canceltxt(formInline.agPicA, formInline.nameA)"
                      />
                      <a
                        v-if="formInline.fileUrlShowA"
                        class="download"
                        @click="download(formInline.fileUrlShowA)"
                        >下载</a
                      >
                    </div>
                    <Progress
                      stroke-color="#FF565A"
                      v-if="!formInline.flagA"
                      :percent="numA"
                    />
                  </div>
                  <div class="fil_txt" v-if="formInline.nameB != null">
                    <div class="fil-itme">
                      <p>{{ formInline.nameB }}</p>
                      <Icon
                        type="ios-trash"
                        class="cancel-txt"
                        size="24"
                        color="#FF565A"
                        @click="canceltxt(formInline.agPicB, formInline.nameB)"
                      />
                      <a
                        v-if="formInline.fileUrlShowB"
                        class="download"
                        @click="download(formInline.fileUrlShowB)"
                        >下载</a
                      >
                    </div>
                    <Progress
                      stroke-color="#FF565A"
                      v-if="!formInline.flagB"
                      :percent="numB"
                    />
                  </div>
                  <div class="fil_txt" v-if="formInline.nameC != null">
                    <div class="fil-itme">
                      <p>{{ formInline.nameC }}</p>
                      <Icon
                        type="ios-trash"
                        class="cancel-txt"
                        size="24"
                        color="#FF565A"
                        @click="canceltxt(formInline.agPicC, formInline.nameC)"
                      />
                      <a
                        v-if="formInline.fileUrlShowC"
                        class="download"
                        @click="download(formInline.fileUrlShowC)"
                        >下载</a
                      >
                    </div>
                    <Progress
                      stroke-color="#FF565A"
                      v-if="!formInline.flagC"
                      :percent="numC"
                    />
                  </div>
                  <div class="middle">
                    <div class="start-wap">
                      <div
                        class="upload"
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
              </div>
            </FormItem>

            <FormItem label="备注:">
              <div class="content">
                <Input
                  v-model="BasicDate.remark"
                  type="textarea"
                  :autosize="{ minRows: 5, maxRows: 8 }"
                />
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
      <div class="middle">
        <a
          href="javascript:;"
          class="queryBtn"
          @click="handleSubmit('BasicDate')"
          >保存</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { upload, orgimg } from "../../request/http";
import Selsect from "@/components/selsect";
import { formatDate } from "@/request/datatime";
import {
  deleteFile,
  orgdetails,
  orgmember,
  orgdelete,
  orgdetestat,
  orgedit,
  orgemod,
  orgimgdel
} from "@/request/api";
export default {
  data() {
    return {
      navigation1: {
        head:
          this.$route.query.status == 1 ? "组织详情(志愿者)" : "组织详情(会员)"
      },
      citysData: [],
      columns1: [
        {
          title: "姓名",
          key: "userName",
          align: "center",
          size: 40
        },
        {
          title: "手机号",
          key: "tel",
          align: "center",
          width: 140
        },
        {
          title: "职位",
          key: "roleNames",
          align: "center"
        },
        {
          title: "人员分类",
          key: "userType",
          align: "center",
          width: 140,
          render: (h, params) => {
            let typelist = [
              { name: "负责人", type: "1" },
              { name: "管理人员", type: "2" },
              { name: "普通人员", type: "3" }
            ];
            return h("div", typelist[Number(params.row.userType) - 1].name);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 140,
          render: (h, params) => {
            return h("a", [
              h(
                "span",
                {
                  clssName: "action",
                  style: {
                    color: "#FF565A",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/user/user_details_hy",
                        query: { userId: params.row.userId }
                      });
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      list: ["组织详情", "编辑组织资料"],
      num: 0,
      data1: [],
      sysType: 1,
      page: 1,
      size: 10,
      dataCount: 0,
      arr: [],
      //  附件
      formInline: {
        fileUrlShowA: null,
        fileUrlShowB: null,
        fileUrlShowC: null,
        flagA: false,
        flagB: false,
        flagC: false,
        agPicA: null,
        agPicB: null,
        agPicC: null,
        nameA: null,
        nameB: null,
        nameC: null
      },
      numA: 0,
      numB: 0,
      numC: 0,
      ruleValidate: {
        orgName: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur"
          }
        ],
        orgPicShow: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: "blur"
          }
        ]
      },
      BasicDate: {
        address: "",
        contactUserName: "",
        contactUserPhone: "",
        description: "",
        orgName: "",
        orgPicShow: "",
        orgPic: "",
        picUrl: '',
        remark: "",
        wx: "",
        text: "",
        fileList: []
      },
      text: "",
      textList: [
        {
          name: "",
          url: ""
        }
      ],
      orgimg: "",
      percent: 0, // 文件上传进度条
      statistics: [],
      province: "0",
      county: "0",
      city: "0",
      picMap: ''
    };
  },
  computed: {},
  components: { Selsect },
  created() {},
  mounted() {
    this.getorgdetestat();
    this.getorgdetails();
    this.getorgmember();
  },

  methods: {
    onall(e) {
      let str = this.$route.query.status === 1 ? "(志愿者)" : "(会员)";
      this.num = e;
      this.navigation1.head = this.list[e] + str;
      console.log(e);
      if (e == 1) {
        this.getorgedit();
        this.orgimg = orgimg;
      }
    },
    // 获取组织详情
    getorgdetails() {
      orgdetails({
        orgId: this.$route.query.orgId
      }).then(res => {
        if (res.code == 200) {
          this.arr = res.data;

          this.arr.createTimestamp = this.util.formatDateYMD(
            res.data.createTimestamp
          );
        }
        console.log(res.data);
      });
    },

    //统计信息
    getorgdetestat() {
      orgdetestat({
        orgId: this.$route.query.orgId
      }).then(res => {
        if (res.code == 200) {
          this.statistics = res.data;
        }
        console.log(res);
      });
    },

    // 组织成员分页
    getorgmember() {
      orgmember({
        orgId: this.$route.query.orgId,
        page: { page: this.page, size: this.size }
      }).then(res => {
        if (res.code == 200) {
          this.dataCount = res.data.totalSize;
          this.data1 = res.data.list;
        }
      });
    },
    //编辑组织资料
    getorgedit() {
      orgedit({
        orgId: this.$route.query.orgId
      }).then(res => {
        console.log(res);

        if (res.code == 200) {
          this.BasicDate = { ...res.data, picUrl: res.data.orgPic };
          this.province = res.data.provinceId;
          this.city = res.data.cityId;
          this.county = res.data.districtId;
          this.picMap = res.data.orgPicShow;
      
          if (res.data.fileList && res.data.fileList.length > 0) {
            let arr = [];

            res.data.fileList.forEach((item, index) => {
              if (index == 0) {
                this.formInline.nameA = item.fileName;
                this.formInline.agPicA = item.fileUrl;
                this.formInline.fileUrlShowA = item.fileUrlShow;
                this.formInline.flagA = true;
              }
              if (index == 1) {
                this.formInline.nameB = item.fileName;
                this.formInline.fileUrlShowB = item.fileUrlShow;
                this.formInline.flagB = true;
                this.formInline.agPicB = item.fileUrl;
              }
              if (index == 2) {
                this.formInline.nameC = item.fileName;
                this.formInline.fileUrlShowC = item.fileUrlShow;
                this.formInline.flagC = true;
                this.formInline.agPicC = item.fileUrl;
              }
            });
          }
        } else {
        }
      });
    },

    //编辑修改组织
    getorgemod() {
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
        orgId: this.$route.query.orgId,
        orgName: this.BasicDate.orgName,
        address: this.BasicDate.address,
        remark: this.BasicDate.remark,
        orgPic: this.picUrl ? this.picUrl : this.BasicDate.orgPic,
        ownerUserName: this.BasicDate.contactUserName,
        ownerUserPhone: this.BasicDate.contactUserPhone,
        description: this.BasicDate.description,
        wx: this.BasicDate.wx,
        provinceId: this.province,
        cityId: this.city,
        districtId: this.county,
        fileList: file.toString() === "" ? "" : file.toString()
      };
      console.log(obj);

      // orgemod(obj).then(res => {
      //   if (res.code == 200) {
      //     this.$Message.success("编辑成功");
      //   } else {
      //     this.$Message.error(res.msg);
      //   }
      //   console.log(res);
      // });
    },

    //省市区
    idsactive(res) {
      if (res[0]) {
        this.province = res[0];
      }
      if (res[1]) {
        this.city = res[1];
      }
      if (res[2]) {
        this.county = res[2];
      }
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
      upload(dataForm).then(res => {
        if (res.code === 200) {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = e => {
            this.texturl = e.target.result;
            // this.formInline.agPicA = res.data;
            if (this.formInline.agPicA == null) {
              this.formInline.agPicA = res.data;

              this.numA = 100;

              return;
            } else if (this.formInline.agPicB == null) {
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
      });
    },
    // 删除附件
    canceltxt(pic, name) {
      deleteFile({ fileUrl: pic }).then(res => {
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

    //下载
    download(e) {
      window.open(e);
    },

    // 表单提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getorgemod();
        } else {
          this.$Message.error("必填项未填!");
        }
      });
    },

    //分页功能
    changepages(index) {
      this.page = index;
      this.getorgmember();
    }
  }
};
</script>
<style lang="scss" scoped>
.details-zhu {
  span {
    display: inline-block;
    text-align: center;
    color: #8e9192;

    padding: 0 20px;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    margin: 0 5px;
    a {
      color: black;
      font-size: 16px;
    }
  }
  .active {
    background: #ffffff;
    border-radius: 20px;
    color: #1b2331;
  }
}
.details-tj {
  font-size: 16px;
  padding-left: 20px;
}
.ivu-table-header tr th {
  text-align: center;
  font-weight: 700;
}
.ivu-table-cell {
  text-align: center;
}
.details-tjxx,
.details-td {
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
  padding: 20px 0;
  margin-bottom: 20px;
  table {
    border: 1px solid #e4e4e4;
    margin: 0 auto;
    td,
    th {
      height: 40px;
      border: 1px solid #e4e4e4;
      text-align: center;
      line-height: 40px;
    }
    th {
      font-weight: 700;
    }
    td {
      background: #ffffff;
    }
    height: 100px;
    width: 800px;
  }
}

.details-td {
  margin-top: 20px;
}
.fenlei {
  margin: 10rpx 0;
}
.details-wz {
  width: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 16px;
  }
}
.pages {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.group {
  padding: 20px;
  span:nth-child(2) {
    margin: 0 0.5rem;
    font-size: 12px;
  }
}
.btns {
  width: 140px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 30px;
  color: white;
  background-color: #fd585e;
}
.main {
  width: 36rem;
}
.basic {
  margin: 0 auto;
  width: 500px;
}

.middle {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
}
.content {
  padding: 0.5rem 0;
}
.ivu-form-item {
  margin-bottom: 0.5rem;
}
.file p {
  padding: 0.5rem;
}
.details-info {
  margin-top: 20px;
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
  height: 162px;
  padding: 20px 30px;
  .title {
    padding: 0;
    font-weight: 800;
    font-size: 18px;
    color: #1b2331;
  }
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .name {
      font-size: 18px;
      color: #1b2331;
      font-weight: 800;
    }
    .type {
      background: #fef4f5;
      border-radius: 15px;
      line-height: 40px;
      padding: 10px 19px;
      font-size: 14px;
      color: #fd585e;
    }
  }
}
.tableList {
  padding: 20px 5px;
  background: #fff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
}
.fileContent {
  position: absolute;

  top: 0;
  left: 0;
}
.updataimg-icon {
  color: #ff565a;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.cancel {
  position: absolute;
  top: 10px;
  right: -35px;
  z-index: 2;
  color: #ff565a;
}

.upload {
  position: relative;
}

.download {
  font-size: 15px;
  color: #ff565a;
  margin-left: 15px;
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
