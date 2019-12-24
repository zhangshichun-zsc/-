<!-- 协议分类管理(会员) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <!-- <div class="flex-center-start">
          <Icon type="md-list" />
          <span>数据列表</span>
        </div> -->
        <div class="flex-center-end">
          <Button class="table-btns" @click="add">添加</Button>
        </div>
        <Modal v-model="modal1" title="添加分类" class-name="vertical-center-modal">
          <Form :model="formItem" ref="formItem" :rules="ruleValidate" :label-width="120">
            <FormItem label="类型名称:" prop="name" >
              <Input v-model="formItem.name"  style="width:200px"/>
            </FormItem>
            <FormItem label="类型:" prop="type">
              <Select v-model="formItem.type" style="width:200px">
                <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="分类图标:" prop="imgs">
              <div class="start-wap">
                <div class="upload" v-if="formItem.imgs == null">
                  <div class="file" @click="()=>{ this.$refs.files.click()}">
                    <input
                      type="file"
                      style="display:none;"
                      accept=".jpg, .JPG, .gif, .GIF, .png, .PNG, .bmp, .BMP"
                      ref="files"
                      @change="uploadFile()"
                      multiple
                    />
                    <Icon type="md-cloud-upload" :size="36" color='#FF565A' />
                  </div>
                </div>
                <img class="imgs" v-else :src="formItem.imgs" style="width:100px;height:100px"/>
                <Icon
                  type="ios-trash"
                  v-if="formItem.imgs !== null"
                  class="cancel"
                  color='#FF565A'
                  :size="26"
                  @click="cancelImg()"
                />
              </div>
            </FormItem>
            <FormItem label="是否显示:">
              <i-switch v-model="formItem.validadd" />
            </FormItem>
          </Form>
          <div slot="footer">
            <Button type="text" size="large" @click="modalCancel">取消</Button>
            <Button type="error" size="large" @click="modalOk('formItem')">确定</Button>
          </div>
        </Modal>
      </div>
      <div class="min-height">
         <Table border :columns="columns" :data="data"></Table>
      </div>

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
          align: "center",

        },
        {
          title: "协议名称",
          key: "dicName",
          align: "center",

        },
        {
          title: "类别",
          align: "center",

          render: (h, params) => {
            let type = "";
            if (params.row.typeFlag == "16") {
              type = "组织方可签署协议类型";
            } else if (params.row.typeFlag == "47") {
              type = "非组织方可签署协议类型";
            }
            return h("div", type);
          }
        },
        {
          title: "是否显示",
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
                    console.log(e);
                    if (e) {
                      this.valids = 2;
                    } else {
                      this.valids = 1;
                    }
                    this.getAgreementclassstats(params.row.dicId);
                  }
                }
              })
            ]);
          }
        },
        // {
        //   title: "操作",
        //   key: "action",
        //   align: "center",

        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "a",
        //         {
        //           style: {
        //             marginRight: "5px",
        //             marginLeft: "5px",
        //             color: "red"
        //           },
        //           on: {
        //             click: () => {
        //               this.valids = 3;
        //               this.getAgreementclassstats(params.row.dicId);
        //             }
        //           }
        //         },
        //         "删除"
        //       )
        //     ]);
        //   }
        // }
      ],
      data: [],
      // dataCount:0,
      // page:1,
      // size:10,
      valids: "",
      orgimg: "",
      type: "",
      list: [
        { name: "非组织方可签署协议类型", value: "47" },
        { name: "组织方可签署协议类型", value: "16" }
      ],
      file: ""
    };
  },

  components: {},

  computed: {},

  created() {},
  mounted() {

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
          this.modal1 = false;
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
    add() {
      this.modal1 = true;
      this.clear();
    },
    //确认
    modalOk(name) {
      console.log(11);
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


    //清除
    clear() {
      this.formItem.name = null;
      this.formItem.type = "";
      (this.formItem.validadd = false), (this.formItem.imgs = null);
      this.file = null;
    }
  }
};
</script>
<style lang="scss" scoped>
 .start-wap{
    position: relative;
    height: 150px;
    width: 300px;
    .upload{
      width: 100%;
      height: 100%;
    }
    .cancel{
      position: absolute;
      top: 0px;
      right: 0px;
      z-index: 10;
    }
    .upload .file{
      width: 100%;
      height: 100%;
      border: 1px dashed #FF565A;
      text-align: center;
      padding: 20px 0;
    }
    // .upload .file:hover{
    //   border: 1px dashed #FF565A;
    // }
    // .upload .file:hover .ivu-icon{
    //   color: #FF565A !important;
    // }
    .upload .file input{
      display: none;
    }
    .shae{
      height: 150px;
      width: 150px;
    }
  }
  .integral-table{
    min-height: 500px;
    background: #fff;
     border-radius: 0 0 10px 10px;
  }
  .table-header{
    border-radius: 10px;
  }

</style>
