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
              <Input v-model="BasicDate.orgName" style="width: 220px" />
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
              <div
                class="file"
                style="height:150px;"
                @click="
                  () => {
                    if (!BasicDate.orgPicShow) {
                      this.$refs.files.click();
                    }
                  }
                "
              >
                <input
                  style="display:none; width:0; hidht:0;"
                  type="file"
                  accept=".jpg, .JPG, .gif, .GIF, .png, .PNG, .bmp, .BMP"
                  ref="files"
                  @change="uploadFile()"
                  multiple
                />
                <div
                  class="fileContent"
                  :style="
                    BasicDate.orgPicShow
                      ? 'height:150px;width:150px;'
                      : 'height:150px;width:150px;border: 1px dashed #ff565a;'
                  "
                >
                  <Icon
                    v-show="!BasicDate.orgPicShow"
                    type="md-cloud-upload"
                    class="updataimg-icon"
                    :size="20"
                  />
                  <img
                    v-show="BasicDate.orgPicShow"
                    :src="BasicDate.orgPicShow"
                    style="height:150px;width:150px;"
                  />
                  <Icon
                    type="ios-trash"
                    v-if="BasicDate.orgPicShow != null"
                    class="cancel"
                    :size="20"
                    @click="cancelImg()"
                  />
                </div>
              </div>
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
                <div
                  class="middle"
                  v-for="(item, index) in BasicDate.fileList"
                  :key="index"
                >
                  <Icon type="ios-paper-outline" size="100" />
                  <div class="file">
                    <p>
                      <span>{{ item.fileName }}</span>
                      <!-- <span>
                        <a @click="download(item.fileUrlShow)">下载</a>
                      </span> -->
                    </p>
                    <Progress :percent="percent" style="width: 15rem" />
                  </div>
                  <Button
                    shape="circle"
                    icon="md-close"
                    style="margin-top: 0.5rem;"
                    @click="removetext(index)"
                  ></Button>
                </div>
                <div class="middle">
                  <Upload
                    multiple
                    :action="orgimg"
                    :on-success="handleSuccesstext"
                    :default-file-list="BasicDate.fileList"
                    :show-upload-list="false"
                  >
                    <Button icon="ios-cloud-upload-outline">添加附件</Button>
                  </Upload>
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
        <!-- <Button @click="handleSubmit('BasicDate')">保存</Button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { upload, orgimg } from "../../request/http";
import Selsect from "@/components/selsect";
import { formatDate } from "@/request/datatime";
import {
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
        head: "组织详情(会员)"
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
            let del;
            if (params.row.userType != 1) {
              del = "删除";
            }
            return h("div", [
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
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "#FF565A",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.getorgdelete(params.row.orgUserId);
                    }
                  }
                },
                del
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
      province: "",
      county: "",
      city: ""
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
    upload(e) {
      console.log(e);
    },
    onall(e) {
      this.num = e;
      this.navigation1.head = this.list[e] + "(会员)";
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

    //删除
    getorgdelete(id) {
      orgdelete({
        orgUserId: id
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info("删除成功");
          this.getorgmember();
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
        console.log(res);
      });
    },
    //编辑组织资料
    getorgedit() {
      orgedit({
        orgId: this.$route.query.orgId
      }).then(res => {
        if (res.code == 200) {
          this.BasicDate = res.data;
          this.province = res.data.provinceId;
          this.city = res.data.cityId;
          this.county = res.data.districtId;
        } else {
        }
        console.log(res);
      });
    },

    //编辑修改组织
    getorgemod() {
      orgemod({
        orgId: this.$route.query.orgId,
        orgName: this.BasicDate.orgName,
        address: this.BasicDate.address,
        remark: this.BasicDate.remark,
        orgPic: this.BasicDate.orgPic,
        ownerUserName: this.BasicDate.contactUserName,
        ownerUserPhone: this.BasicDate.contactUserPhone,
        description: this.BasicDate.description,
        wx: this.BasicDate.wx,
        fileList: this.BasicDate.fileList,
        provinceId: this.province,
        cityId: this.city,
        districtId: this.county
      }).then(res => {
        if (res.code == 200) {
          this.$Message.success("编辑成功");
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //省市区
    idsactive(res) {
      console.log(res);
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

    //删除附件
    getorgimgdel(e) {
      let removeid = "";
      removeid = this.BasicDate.text;
      orgimgdel({
        path: removeid
      }).then(res => {
        if (res.code == 200) {
          this.$Message.success("删除成功");
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },

    //图片上传
    uploadFile() {
      let file = this.$refs.files.files[0];
      console.log(file);
      const dataForm = new FormData();
      dataForm.append("file", file);
      upload(dataForm).then(res => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          this.BasicDate.orgPicShow = e.target.result;
          this.picUrl = res.data;
        };
      });
    },
    //删除图片
    cancelImg() {
      orgimgdel({ path: this.picUrl }).then(res => {
        if (res.code == 200) {
          this.$Message.success("删除成功");
          this.picUrl = null;
          this.BasicDate.orgPicShow = null;
        } else {
          this.$Message.success(res.msg);
        }
      });
    },

    //上传附件
    handleSuccesstext(res, file) {
      if (res.code == 200) {
        let obj = [{ fileUrl: res.data, fileName: file.name }];
        this.BasicDate.fileList = this.BasicDate.fileList.concat(obj);
        this.$Message.success("上传成功");
        this.percent = 100;
      } else {
        this.percent = 0;
        this.$Message.error(res.msg);
      }
      console.log(res, file.name);
    },

    //删除附件
    removetext(e) {
      this.BasicDate.fileList.splice(e, 1);
      this.BasicDate.text = this.BasicDate.fileList[e].fileUrl;
      this.getorgimgdel(1);
    },

    //下载
    download(e) {
      window.open(e, "_blank");
    },

    // 表单提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (!this.province || !this.city || !this.county)
            return this.$Message.error("请选择地址");
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
  top: 30%;
  transform: translateX(-50%);
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
  height: 150px;
}
</style>
