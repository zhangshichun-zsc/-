<!-- 组织详情会员 -->
<template>
  <div style="background:white;">
    <Navigation :labels="navigation1"></Navigation>
    <div class="details-zhu">
      <span
        v-for="(item,index) in list"
        :key="index"
        :class="{active:num==index}"
        @click="onall(index)"
      >
        <a>{{item}}</a>
      </span>
    </div>
    <div v-if="num==0">
      <div class="details-td">
        <div class="details-wz">
          <img :src="arr.orgPicPath" style="height:100px;width:100px;margin-right:10px;" />
          <div>
          <div>{{arr.orgName}}</div>
          <div class="fenlei">分类：{{arr.orgTypeText}}</div>
          </div>
        </div>
        <table>
          <tr>
            <th>名称</th>
            <td>{{arr.orgName}}</td>
            <th>微信公众号</th>
            <td>{{arr.wechatOfficeAccount}}</td>
          </tr>
          <tr>
            <th>负责人</th>
            <td>{{arr.ownerUserName}}</td>
            <th>城市</th>
            <td>{{arr.cityName}}</td>
          </tr>
          <tr>
            <th>联系方式</th>
            <td>{{arr.ownerUserPhone}}</td>
            <th>成立时间</th>
            <td>{{arr.createTimestamp}}</td>
          </tr>
        </table>
      </div>
      <div class="details-tjxx">
        <p class="details-tj">
          <Icon type="md-bookmark" />
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
            <td>{{statistics.batchCount}}</td>
            <td>{{statistics.actChildCount}}</td>
            <td>{{statistics.actMemCount}}</td>
            <td>{{statistics.orgUserCount}}</td>
          </tr>
        </table>
      </div>
      <p class="details-tj">
        <Icon type="md-bookmark" />
        <span>组织成员</span>
      </p>
      <i-table border :columns="columns1" :data="data1"></i-table>
      <div class="pages">
        <Page
        :current='page'
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

    <div v-if="num==1">
      <div class="group flex-center-start">
        <span>丰台家长小区</span>
        <span>分类</span>
        <div class="btns">
          <span>家长小区</span>
        </div>
      </div>
      <div class="basic">
        <p class="title">基本信息</p>
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
              <Input v-model="BasicDate.contactUserName" placeholder="自动带出" style="width: 220px" />
            </FormItem>
            <FormItem label="地址:" prop="citys">
              <Selsect :arr="[province,city,county,]" @change="selbtn"></Selsect>
            </FormItem>
            <FormItem label="联系方式:" prop="orgName">
              <Input v-model="BasicDate.contactUserPhone" style="width: 220px" />
            </FormItem>
            <FormItem label="微信公众号:">
              <Input v-model="BasicDate.wx" placeholder="点 击 输 入" style="width: 220px" />
            </FormItem>
            <FormItem label="图片:" prop="orgPicShow">
              <div class="start-wap">
                <div
                  class="upload"
                  v-if="BasicDate.orgPicShow == null"
                  @click="()=>{ this.$refs.files.click()}"
                >
                  <div class="file">
                    <input
                      style=" display:none;"
                      type="file"
                      accept=".jpg, .JPG, .gif, .GIF, .png, .PNG, .bmp, .BMP"
                      ref="files"
                      @change="uploadFile()"
                      multiple
                    />
                    <Button icon="ios-cloud-upload-outline" style="margin-bottom:10px">上传图片</Button>
                    <!-- <Icon type="md-cloud-upload" :size="36" color="#2d8cf0" /> -->
                  </div>
                </div>

                <img :src="BasicDate.orgPicShow" style="height:150px;width:150px;" />
                <Icon
                  type="ios-trash"
                  v-if="BasicDate.orgPicShow != null"
                  class="cancel"
                  :size="26"
                  @click="cancelImg()"
                />
              </div>
            </FormItem>
            <FormItem label="详情:" prop="orgName">
              <Input
                v-model="BasicDate.description"
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
          <div class="middle" v-for="(item,index) in BasicDate.fileList" :key="index">
            <Icon type="ios-paper-outline" size="100" />
            <div class="file">
              <p>
                <span>{{item.fileName}}</span>
                <span>
                  <a @click="download(item.fileUrlShow)">下载</a>
                </span>
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
      </div>
      <div class="basic">
        <p class="title">备注</p>
        <div class="content">
          <Input v-model="BasicDate.remark" type="textarea" :autosize="{minRows: 5,maxRows: 8}" />
        </div>
      </div>
      <div class="middle">
        <Button @click="handleSubmit('BasicDate')">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>

import { upload,orgimg } from "../../request/http";
import Selsect from "@/components/selsect";
import { formatDate } from "@/request/datatime";
import {
  orgdetails,
  orgmember,
  orgdelete,
  orgdetestat,
  orgedit,
  orgemod,
  orgimgdel,

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
          align:'center',
          size:40
        },
        {
          title: "手机号",
          key: "tel",
          align:'center',
          width:140
        },
        {
          title: "职位",
          key: "roleNames",
          align:'center'
        },
        {
          title: "人员分类",
          key: "userType",
          align:'center',
          width:140,
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
          width:80,
          render: (h, params) => {
            let del
            if(params.row.userType!=1){
              del='删除'
            }
            return h("div", [
              h(
                "span",
                {
                  clssName: "action",
                  style: {
                    color: "green",
                    cursor: "pointer",
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
                    color: "green",
                    cursor: "pointer",
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
        citys: [
          {
            required: true,
            message: "请选择地址",
            trigger: "blur"
            // type:
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
      city:""
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
          this.arr.createTimestamp = formatDate(res.data.createTimestamp);
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
          console.log(this.BasicDate.fileList);
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
        provinceId: this.BasicDate.provinceId,
        cityId: this.BasicDate.cityId,
        districtId: this.BasicDate.districtId
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
    selbtn(e) {
      console.log(e);
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


    city() {
      this.getorgcity();
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
        console.log(obj)
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
      location.href = e;
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
    height: 50px;
    width: 160px;
    background: #ffffff;
    text-align: center;
    line-height: 50px;
    border: 1px solid #e4e4e4;
    margin-left: -1rpx;
    a {
      color: black;
      font-size: 16px;
    }
  }
  .active {
    background: #FD585E ;

    a {
      color: #ffffff;
    }
  }
}
.details-tj {
  height: 70px;
  line-height: 70px;
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
  table {
    border: 1px solid #e4e4e4;
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
  display: flex;
}
.fenlei{
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
  margin: 10px auto;
  padding: 20px 0;
}

.group {
  padding: 20px;
  span:nth-child(2) {
    margin: 0 0.5rem;
    font-size: 12px;
  }
}
.btns{
  width: 140px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 30px;
  color: white;
  background-color: #FD585E;
}
.main {
  width: 36rem;
}
.basic {
  margin: 0.5rem;
}
.title {
  padding: 0.5rem 1rem
}
.middle {
  display: flex;
  justify-content: center;
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

</style>
