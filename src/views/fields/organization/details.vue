<!-- 组织详情志愿者 -->
<template>
  <div>
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
          <img :src="arr.orgPic" />
          <span>{{arr.orgName}}</span>
          <span>分类：{{arr.orgTypeText}}</span>
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
            <td>{{arr.address}}</td>
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
            <td>5</td>
            <td>100</td>
            <td>20</td>
            <td>7</td>
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
        <div class="ellipse">
          <span>家长小区</span>
        </div>
      </div>
      <div class="basic">
        <p class="title">基本信息</p>
        <div class="content middle">
          <Form ref="BasicDate" :model="BasicDate" :label-width="120">
            <FormItem label="名称:">
              <Input v-model="BasicDate.Name" style="width: 220px" />
            </FormItem>
            <FormItem label="联系人:">
              <Input v-model="BasicDate.TheContact" placeholder="自动带出" style="width: 220px" />
            </FormItem>
            <FormItem label="地址:">
              <Input v-model="BasicDate.Address" placeholder="点 击 输 入" style="width: 220px" />
            </FormItem>
            <FormItem label="联系方式:">
              <Input v-model="BasicDate.Contact" style="width: 220px" />
            </FormItem>
            <FormItem label="微信公众号:">
              <Input v-model="BasicDate.WeChat_GZH" placeholder="点 击 输 入" style="width: 220px" />
            </FormItem>
            <FormItem label="图片:">
              <div class="flex-start">
                <div style="background-color: #5cb85c;width: 9rem;height: 5rem;"></div>
                <div style="padding-top: 2.5rem;margin-left: 0.5rem;">
                  <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">上传图片</Button>
                  </Upload>
                </div>
              </div>
            </FormItem>
            <FormItem label="详情:">
              <Input
                v-model="BasicDate.Details"
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
              <Progress :percent="percent" style="width: 15rem" />
            </div>
            <Button shape="circle" icon="md-close" style="margin-top: 0.5rem;"></Button>
          </div>
          <div class="middle">
            <Button>添加附件</Button>
          </div>
        </div>
      </div>
      <div class="basic">
        <p class="title">备注</p>
        <div class="content">
          <Input v-model="Note" type="textarea" :autosize="{minRows: 5,maxRows: 8}" />
        </div>
      </div>
      <div class="middle">
        <Button>保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../request/datatime";
import { orgdetails, orgmember, orgdelete } from "../../request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "组织详情(志愿者)"
      },
      columns1: [
        {
          title: "姓名",
          key: "userName"
        },
        {
          title: "手机号",
          key: "tel"
        },
        {
          title: "职位",
          key: "userType"
        },
        {
          title: "人员分类",
          key: "roleNames"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  clssName: "action",
                  style: {
                    color: "green",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: "/user/user_details_hy" });
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
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.getorgdelete(params.row.orgUserId);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      list: ["组织详情", "编辑组织资料"],
      num: 0,
      data1: [],
      sysType: 2,
      page: 1,
      size: 10,
      pageSize: 10,
      dataCount: 0,
      arr: [],
      dataend: null,

      BasicDate: {
        Name: "海淀家长小组",
        TheContact: "",
        Address: "",
        Contact: "",
        WeChat_GZH: "",
        Details: ""
      },
      Note: "",
      percent: 0 // 文件上传进度条
    };
  },
  computed: {},

  created() {},
  mounted() {
    this.getorgdetails();
    this.getorgmember();
  },

  methods: {
    onall(e) {
      this.num = e;
      this.navigation1.head = this.list[e] + "(会员)";
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
    //分页功能
    changepages(index) {
      this.page = index;
      console.log(index);
      this.getorgmember();
    },

    add() {
      if (this.percent >= 100) {
        return false;
      }
      this.percent += 10;
    },
    minus() {
      if (this.percent <= 0) {
        return false;
      }
      this.percent -= 10;
    }
  }
};
</script>
<style lang="scss" scoped>
.details-zhu {
  span {
    display: inline-block;
    height: 30px;
    width: 120px;
    background: #ffffff;
    text-align: center;
    line-height: 30px;
    border: 1px solid #e4e4e4;
    a {
      color: black;
      font-size: 16px;
    }
  }
  .active {
    background: #1abc9c;

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
    // background: #cccccc;
    height: 100px;
    width: 800px;
  }
}

.details-td {
  display: flex;
  // justify-content: space-around;
}
.details-wz {
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: #e4e4e4 1px solid;
  span {
    font-size: 16px;
  }
}
.pages {
  display: flex;
  justify-content: center;
  margin: 10px auto;
}

.group {
  border-top: #e4e4e4 solid 1px;
  border-bottom: #e4e4e4 solid 1px;
  padding: 0.2rem 1rem;
  span:nth-child(2) {
    margin: 0 0.5rem;
  }
  span:nth-child(2),
  .ellipse span {
    font-size: 12px;
  }
}
.main {
  width: 36rem;
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
  padding: 0.5rem 0;
}
.ivu-form-item {
  margin-bottom: 0.5rem;
}
.file p {
  padding: 0.5rem;
}

.ellipse {
  width: 4rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 2px solid #e4e4e4;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
