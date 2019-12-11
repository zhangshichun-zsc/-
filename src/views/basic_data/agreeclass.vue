<!-- 协议分类管理(会员) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div class="flex-center-start">
          <Icon type="md-list" />
          <span>数据列表</span>
        </div>
        <div class="flex-center-end">
          <Button class="table-btn" @click="add">添加</Button>
        </div>
        <Modal v-model="modal1" title="添加分类">
          <Form :model="formItem" ref="formItem" :rules="ruleValidate" :label-width="120">
            <FormItem label="类型名称" prop="name">
              <Input v-model="formItem.name" />
            </FormItem>
            <FormItem label="类型名称" prop="type">
              <Select v-model="formItem.type" style="width:200px">
                <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="分类图标" prop="imgs">
              <div class="start-wap">
              <!-- v-if="formItem.imgs == null" -->
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
                    v-show="formItem.imgs"
                    :src="formItem.imgs || null"
                    style="height:104px;width:104px;"
                  />
                  <div v-show="!formItem.imgs" class="file-text">
                    <img src="@/assets/images/fix-img.png" />
                  </div>
                  <Icon
                    type="ios-trash"
                    v-show="formItem.imgs != null"
                    class="cancel"
                    :size="26"
                    @click.stop="cancelImg()"
                  />
                </div>
              </div>
            </div>
              <!-- <img :src="formItem.imgs" style="width:100px;" />
              <Upload
                :action="orgimg"
                :format="['jpg','jpeg','png']"
                :show-upload-list="false"
                :before-upload="handleBeforeUpload"
              >
                <Button icon="ios-cloud-upload-outline">选择上传图片</Button>
                <p style="color: #666666;font-size: 14px">只能上传jpg/png格式文件，文件不能超过50kb</p>
              </Upload> -->
            </FormItem>
            <FormItem label="是否显示">
              <i-switch v-model="formItem.validadd" />
            </FormItem>
          </Form>
          <div slot="footer">
            <Button type="text" size="large" @click="modalCancel">取消</Button>
            <Button type="primary" size="large" @click="modalOk('formItem')">确定</Button>
          </div>
        </Modal>
      </div>
      <Table border :columns="columns" :data="data"></Table>
      <!-- <div class="pages">
         <Page
          :total="dataCount"
          show-elevator
          show-total
          size="small"
          style="margin: auto"
          :page-size="size"
          @on-change="changepages"
        />

      </div>-->
    </div>
  </div>
</template>

<script>
import { upload } from "../../request/http";

import { orgimg } from "../../request/http";
import {
  Agreementclasslist,
  Agreementclassadd,
  Agreementclassstats,
  orgimgdel
} from "../../request/api";
export default {
  data() {
    return {
      switch1: true,
      navigation1: {
        head: "协议分类管理(会员)"
      },
      formItem: {
        name: "",
        type: "",
        validadd: false,
        imgs: null
      },
      ruleValidate: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型！", trigger: "change" }],

        imgs: [{ required: true, message: "图片不能为空", trigger: "blur" }]
      },
      modal1: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "协议名称",
          key: "dicName"
        },
        {
          title: "类别",
          render: (h, params) => {
            let type = "";
            if (params.row.typeFlag == "16") {
              type = "合作方可签署协议类型";
            } else if (params.row.typeFlag == "47") {
              type = "个人可签署协议类型";
            }
            return h("div", type);
          }
        },
        {
          title: "是否显示",
          key: "status",
          algin: "center",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.validFlag == 1
                },
                on: {
                  input: e => {
                    console.log(e)
                    if (e) {
                      this.valids = 2;
                    } else {
                      this.valids = 3;
                    }
                    this.getAgreementclassstats(params.row.dicId);
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
            return h("div", [
              h(
                "a",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px",
                    color: "red"
                  },
                  on: {
                    click: () => {
                      this.valids = 1;
                      this.getAgreementclassstats(params.row.dicId);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [],
      // dataCount:0,
      // page:1,
      // size:10,
      valids: "",
      orgimg: "",
      type: "",
      list: [
        { name: "个人可签署协议类型", value: "47" },
        { name: "合作方可签署协议类型", value: "16" }
      ],
      file: ""
    };
  },

  components: {},

  computed: {},

  created() {},
  mounted() {
    this.orgimg = orgimg;
    this.getAgreementclasslist();
  },

  methods: {
    //类型列表
    getAgreementclasslist() {
      Agreementclasslist({}).then(res => {
        if (res.code == 200) {
          this.data = res.data;
        }
        console.log(res);
      });
    },

    //类型添加
    getAgreementclassadd() {
      let addtype = "";
      if (this.formItem.validadd) {
        addtype = 1;
      } else {
        addtype = 0;
      }
      Agreementclassadd({
        userId: this.$store.state.userId,
        name: this.formItem.name,
        type: this.formItem.type,
        pic: this.file,
        valid: addtype
      }).then(res => {
        if (res.code == 200) {
          this.modal1=false
          this.getAgreementclasslist();
          this.$Message.info("添加成功");
        } else {
          this.$Message.error(res.msg);
        }
        console.log(res);
      });
    },
    //修改状态
    getAgreementclassstats(ids) {
      ids = Array.of(ids);
      Agreementclassstats({
        userId: this.$store.state.userId,
        dicId: ids,
        valid: this.valids
      }).then(res => {
        if (res.code == 200) {
          this.getAgreementclasslist();
          this.$Message.info("操作成功");

        } else {
          this.getAgreementclasslist();
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
           this.formItem.imgs = e.target.result;
          this.file = res.data;
        };
      });
    },
    //删除图片
    cancelImg() {
      orgimgdel({ path: this.file }).then(res => {
        if (res.code == 200) {
          this.$Message.success("删除成功");
          this.file = null;
           this.formItem.imgs = null;
        } else {
          this.$Message.success(res.msg);
        }
      });
    },
    //添加
    add(){
      this.modal1=true
      this.clear()
    },
    //确认
    modalOk(name) {
      console.log(11)
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getAgreementclassadd();
        } else {
          this.$Message.error("必填项未填!");
        }
      });
    },

    //取消
    modalCancel() {
      this.modal1 = false;
    },
    // //图片上传
    // handleBeforeUpload(file) {
    //   console.log(file);
    //   if (file.type == "image/jpeg") {
    //     this.file = file;
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //       const _base64 = reader.result;
    //       this.formItem.imgs = _base64;
    //       this.picUrl = file.name;
    //     };
    //     return false;
    //   } else {
    //     this.$Message.error("格式不正确！");
    //   }
    // },

    //清除
    clear(){
      this.formItem.name=null
      this.formItem.type=''
      this.formItem.validadd=false,
      this.formItem.imgs=null
      this.file=null
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
.integral-header .integral-center {
  margin: 0 20px;
}
.integral-header .integral-body {
  padding: 20px;
  background: #fff;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 200px;
  margin-left: 15px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 20px;
}
.integral-table {
  margin-top: 30px;
}
.table-header {
  padding: 5px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.table-header .table-btn {
  margin-left: 15px;
}
.integral-table .pages {
  padding: 5px 20px;
  margin-top: 50px;
  background: #fff;
}
.pages {
  text-align: center;
}
.ipt {
  margin-left: 10px;
}
.sdate {
  margin-left: 15px;
}
</style>
