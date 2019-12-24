<!--资讯分类管理(会员)-->
<template>
  <div class="main">
    <Modal
      v-model="modal1">
      <img :src="showImg" alt="" class="showimg"/>
    </Modal>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con-top flex-center-start">
        <p>
          <Icon type="ios-list" />
          <span>数据列表</span>
        </p>
        <!-- <div class="but">
          <Button @click="add">添加</Button>
        </div> -->
      </div>
      <Table
        ref="selection"
        border
        :columns="columns"
        :data="datas"
        @on-selection-change="handleSelectionChange"
      ></Table>
      <Modal v-model="modalEditor" title="添加分类">
        <Form
          class="bd"
          ref="AddDate"
          :model="AddData"
          :rules="ruleValidate"
          :show-message="false"
          :label-width="120"
        >
          <FormItem label="类型名称:" prop="name">
            <Input style="width: 10rem" v-model="AddData.name" />
          </FormItem>
          <FormItem label="类型图标:" prop="picPath">
            <div class="start-wap">
              <div class="upload" v-if="AddData.picPath == null">
                <div class="file" @click="()=>{ this.$refs.files.click()}">
                  <input
                    style=" display:none;"
                    type="file"
                    accept=".jpg, .JPG, .gif, .GIF, .png, .PNG, .bmp, .BMP"
                    ref="files"
                    @change="uploadFile()"
                  />
                  <Icon type="md-cloud-upload" :size="36" color="#2d8cf0" />
                </div>
              </div>
              <img class="imgs" style="height:50px;width:50px;" v-if="AddData.picPath != null" :src="AddData.picPath" />
              <Icon
                type="ios-trash"
                v-if="AddData.picPath != null"
                class="cancel"
                :size="26"
                @click="cancelImg()"
              />
            </div>
          </FormItem>
          <FormItem label="是否显示:" prop="WhetherShown">
            <i-switch v-model="WhetherShown" />
          </FormItem>
          <FormItem></FormItem>
        </Form>

        <div slot="footer">
          <Button type="text" size="large" @click="modalCancel">取消</Button>
          <Button type="primary" size="large" @click="modalOk('AddData')">确定</Button>
        </div>
      </Modal>
      <!-- <div class="pages">
        <div class="batch">
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status"></Checkbox>全选
          </Button>
          <Select placeholder="批量操作" style="width: 150px" v-model="types">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px" @click="batch">确定</Button>
        </div>
        <Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          style="margin: auto"
          :page-size="size"
          @on-change="changepages"
        />
      </div> -->
      <div class="row">
        <div>
          <Button @click="chackall()" style="border:0px;">
            <Checkbox v-model="status"></Checkbox>全选
          </Button>
          <Select placeholder="批量操作" style="width: 150px" v-model="batch" placement='top'>
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px" @click="batches()">确定</Button>
        </div>
        <div><Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          :page-size="size"
          @on-change="changepages"
        /></div>
      </div>
    </div>
  </div>
</template>

<script>
import { upload, orgimg } from "@/request/http";
import {
  inquirytype,
  inquirybatch,
  inquirydel,
  inquiryedit,
  inquiryadd,
  orgimgdel
} from "@/request/api";
import { constants } from 'fs';
export default {
  data() {
    return {
      navigation1: {
        head: "资讯分类管理(会员)"
      },
      modal1:false,
      showImg: '',
      datas: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "分类图标",
          key: "CategoryIcon",
          align: "center",
          render: (h,params) => {
            return h("Icon", {
              props: {
                type: 'md-images',
              },
              on: {
                click: () => {
                  this.modal1 = true
                  this.showImg = params.row.picPath
                }
              }
            });
          }
        },
        {
          title: "分类名称",
          key: "name",
          align: "center"
        },
        {
          title: "分类数量",
          key: "amount",
          align: "center"
        },
        {
          title: "是否启用",
          key: "status",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.validFlag == 1
                },
                on: {
                  input: e => {
                    if (e) {
                      this.validFlag = 1;
                    } else {
                      this.validFlag = 0;
                    }
                    this.ids = params.row.dicId;
                    this.getinquirybatch();
                  }
                }
              })
            ]);
          }
        },

        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-around",
                  MaxfontSize: "16px"
                }
              },
              [
                h(
                  "a",
                  {
                    clssName: "action",
                    style: {
                      color: "#FF565A"
                    },
                    on: {
                      click: () => {
                        this.batchss = 1;
                        this.modalEditor = true;
                        this.AddData = params.row;
                        // console.log(this.AddData)
                        if (params.row.validFlag == 1) {
                          this.WhetherShown = true;
                        } else {
                          this.WhetherShown = false;
                        }
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "a",
                  {
                    style: {
                      color: "#FF565A"
                    },
                    on: {
                      click: () => {
                        this.ids = params.row.dicId;
                        this.getinquirydel();
                      }
                    }
                  },
                  "删除"
                )
              ]
            );
          }
        }
      ],
      modalEditor: false,
      WhetherShown: true,
      AddData: {
        name: "",
        picPath: null
      },
      ruleValidate: {
        name: [{ required: true, message: "", trigger: "blur" }],
        picPath: [{ required: true, message: "请选择分类图标", trigger: "blur" }]
      },
      batchList: [
        {
          value: "0",
          label: "设为隐藏"
        },
        {
          value: "1",
          label: "设为显示"
        },
        {
          value: "2",
          label: "删除"
        }
      ],

      page: 1,
      size: 10,
      dataCount: 0,
      status: false,
      sysId: 1,
      arr: "",
      orgimg: "",
      ids: "",
      validFlag: "",
      types: "",
      batchss: "",
      file: ""
    };
  },
  mounted() {
    this.orgimg = orgimg;
    this.getinquirytype();
  },
  methods: {
    //资讯分类管理列表
    getinquirytype() {
      inquirytype({
        sysId: this.sysId,
        page: { page: this.page, size: this.size }
      }).then(res => {
        if (res.code == 200) {
          this.datas = res.data.list;
          this.dataCount = res.data.totalSize;
          this.status = false;
        }else{
          this.$Message.error(res.msg)
        }
      });
    },

    //批量操作启用
    getinquirybatch() {
      inquirybatch({
        userId: this.$store.state.userId,
        ids: this.ids,
        validFlag: this.validFlag
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info("操作成功");
          this.getinquirytype();
        }
      });
    },
    //删除
    getinquirydel() {
      inquirydel({
        ids: this.ids,
        userId: this.$store.state.userId
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info("删除成功");
          this.getinquirytype();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },

    //编辑
    getinquiryedit() {
      console.log(this.AddData.validFlag);
      inquiryedit({
        sysId: this.sysId,
        dicId: this.AddData.dicId,
        pic: this.AddData.pic,
        validFlag: this.AddData.validFlag,
        name: this.AddData.name,
        userId: this.$store.state.userId
      }).then(res => {
        if (res.code == 200) {
          this.$Message.info(res.msg);
          this.modalEditor = false;
          this.getinquirytype();
        } else if (res.code == 500) {
          this.$Message.error("类型已存在");
        }
        console.log(res);
      });
    },

    //添加
    getinquiryadd() {
      inquiryadd({
        userId: this.$store.state.userId,
        sysId: this.sysId,
        dicName: this.AddData.name,
        dicPicture: this.AddData.pic,
        validFlag: this.AddData.validFlag
      }).then(res => {
        if (res.code == 200) {
          this.modalEditor = false;
          this.$Message.info(res.msg);
          this.getinquirytype();
        } else if (res.code == 500) {
          this.$Message.error("类型已存在");
        }
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
          this.AddData.picPath = e.target.result;
          this.AddData.pic = res.data;
          console.log(this.AddData.picPath,this.AddData.pic)
        };
      });
    },
    //删除图片
    cancelImg() {
      orgimgdel({ path: this.AddData.pic }).then(res => {
        if (res.code == 200) {
          this.$Message.success("删除成功");
          this.AddData.pic = null;
          this.AddData.picPath = null;
        } else {
          this.$Message.success(res.msg);
        }
      });
    },

    //批量操作
    batch() {
      if (this.arr == "") {
        this.$Message.error("至少选择一个");
      } else if (this.type == "") {
        this.$Message.error("请先选择操作类型");
      } else {
        this.validFlag = this.types;
        this.ids = this.arr
          .map(item => {
            return item.dicId;
          })
          .toString();
        if (this.types == 0 || this.types == 1) {
          this.getinquirybatch();
        } else if (this.types == 2) {
          this.getinquirydel();
        }
      }
    },

    modalOk() {
      if (this.batchss == 1) {
        this.gets(this.getinquiryedit);
      } else {
        this.gets(this.getinquiryadd);
      }
    },
    modalCancel() {
      this.getinquirytype();
      this.clear();
      this.modalEditor = false;
    },

    //添加
    add() {
      this.batchss = 2;
      this.clear();
      this.modalEditor = true;
    },

    //改变状态
    change(status) {
      if (status == true) {
        this.AddData.validFlag = 1;
      } else {
        this.AddData.validFlag = 0;
      }
    },

    //分页功能
    changepages(index) {
      this.page = index;
      this.getinquirytype();
    },

    //每条数据单选框的状态
    handleSelectionChange(val) {
      this.arr = val;
      if (
        (this.arr.length == this.dataCount && this.dataCount != 0) ||
        this.arr.length == this.size
      ) {
        this.status = true;
      } else {
        this.status = false;
      }
    },

    //全选按钮
    chackall() {
      this.status = !this.status;
      this.$refs.selection.selectAll(this.status);
    },

    //清楚
    clear() {
      (this.AddData.name = ""),
        (this.AddData.pic = ""),
        (this.WhetherShown = false);
      this.AddData.picPath = null;
    },
    //添加
    gets(e) {
      if (this.AddData.name == ""||this.AddData.picPath==null) {
        this.$Message.error("有必填项未填");
      } else {
        if (this.WhetherShown == true) {
          this.AddData.validFlag = 1;
        } else {
          this.AddData.validFlag = 0;
        }
        e();
      }
    }
  }
};
</script>
<style scoped>
.showimg{
  width: 100%;
  height: auto;
}
html,
body {
  margin: auto;
}
.main {
}
.content {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}
.con-top {
  background-color: #fff;
  justify-content: space-between;
  margin-bottom: 20px;
}
.row{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}
.bk-szy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
}
.pages {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 0.5rem;
}
.pages {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
}
.batch {
  margin-left: 0.5rem;
}
.ivu-form-item {
  margin-bottom: 0.5rem;
}
</style>
