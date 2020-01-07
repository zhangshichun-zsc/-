<template>
  <div class="upload-box">
    <div class="upload-list-box">
      <Upload
        v-show="effectiveImgUnm < max"
        ref="uploadImg"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :format="['jpg', 'JPG', 'gif', 'GIF', 'png', 'PNG', 'bmp', 'BMP']"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        action="/pic/upload"
        multiple
        type="drag"
        class="img-box"
        :style="{
          width: dispalySize.width,
          height: dispalySize.height,
          lineHeight: dispalySize.height
        }"
      >
        <div class="upload-tip">
          <Icon type="md-cloud-upload" size="40"></Icon>
          <div v-if="cropWidth && cropHeight" class="size-tip">
            {{ cropWidth }} * {{ cropHeight }}
          </div>
        </div>
      </Upload>
      <div
        class="upload-list-item img-box"
        v-bind:key="index"
        v-for="(item, index) in imgList"
        v-show="item.status !== 'remove'"
        :style="{
          width: dispalySize.width,
          height: dispalySize.height
        }"
      >
        <template v-if="item.status === 'finished'">
          <img :src="item.previewUrl" />
          <div class="upload-list-item-cover" v-if="disabled ? false : true">
            <Icon
              type="ios-eye-outline"
              @click.native="handleView(item.previewUrl)"
            ></Icon>
            <Icon
              type="ios-trash-outline"
              @click.native="handleRemove(item.url)"
            ></Icon>
          </div>
        </template>
        <template v-if="item.status === 'uploading' || item.status === 'start'">
          <Progress :percent="item.progress" hide-info></Progress>
        </template>
      </div>
    </div>
    <div>
      <Modal title="查看图片" v-model="visible">
        <img :src="previewImg" v-if="visible" style="width: 100%" />
      </Modal>
      <CommonDetailsModal
        v-model="imageEditVisible"
        title="图片编辑"
        footerHide
        width="800"
      >
        <EditImg
          :url="editUrl"
          :imgName="imgName"
          :type="type"
          :cropWidth="cropWidth"
          :cropHeight="cropHeight"
          :ratio="ratio"
          @change="uploadStart"
          :resizable="resizable"
        >
        </EditImg>
      </CommonDetailsModal>
    </div>
  </div>
</template>
<script>
import router from "@/router/index";
import { upload } from "@/request/http";
import { uploadMixin } from "./mixins";

export default {
  mixins: [uploadMixin],
  props: {
    // 可上传最大值
    max: {
      type: Number,
      default: 99
    },
    // 图片上传路径
    uploadUrl: {
      type: String,
      default: "/pic/upload"
    },
    // 上传图片路径，当max为1时返回单个图片路径字符串，大于1时返回图片数组
    value: {
      type: Array
    },
    // 映射图片真实路径，有默认图片时必传
    picMap: {
      type: Object
    },
    // 图片是否可编辑
    editable: {
      type: Boolean,
      default: true
    },
    // 图片显示宽高
    displayWidth: {
      type: Number
    },
    displayHeight: {
      type: Number
    },
    // // 禁用编辑
    disabled: {
      type: Boolean
    }
  },
  data() {
    return {
      imageEditVisible: false,
      imgName: "",
      visible: false,
      previewImg: "",
      uploadList: [],
      editUrl: "",
      imgName: "",
      type: ""
    };
  },
  computed: {
    // 显示的图片的宽高
    dispalySize() {
      let width = this.displayWidth;
      let height = this.displayHeight;
      // 有设置裁减值
      if (this.cropHeight && this.cropWidth) {
        if (!width && this.displayHeight) {
          // 根据高度去算显示宽度
          width = Math.round(
            (this.displayHeight * this.cropWidth) / this.cropHeight
          );
        }
        if (!height && this.displayWidth) {
          // 根据宽度去算显示高度
          height = Math.round(
            (this.displayWidth * this.cropHeight) / this.cropWidth
          );
        }
      }
      return { width: `${width}px`, height: `${height}px` };
    },
    // 当前上传完成和正在上传的图片个数
    effectiveImgUnm: function() {
      return this.imgList.reduce((num, item) => {
        if (item.status !== "remove") {
          num++;
          return num;
        }
        return num;
      }, 0);
    },
    imgList: function() {
      const list = this.uploadList;
      const imgs = list.map(item => item.url);
      if (!this.value) return list;
      if (Array.isArray(this.value)) {
        this.value.forEach(item => {
          // 当图片在picMap中找到时代表图片从外部传入，且list中不存在时pus到list中
          if (this.picMap[item] && imgs.indexOf(item) === -1) {
            list.push({
              previewUrl: this.picMap[item],
              url: item,
              status: "finished"
            });
          }
        });
        return list;
      } else {
        // 当图片在picMap中找到时代表图片从外部传入，且list中不存在时pus到list中
        if (this.picMap[this.value] > -1 && imgs.indexOf(item) === -1) {
          list.push({
            previewUrl: this.picMap[this.value],
            url: this.value,
            status: "finished"
          });
        }
        return list;
      }
    }
  },
  methods: {
    handleView(url) {
      // 图片预览
      this.previewImg = url;
      this.visible = true;
    },
    handleRemove(url) {
      // 删除图片
      this.imgList.forEach(item => {
        if (item.url === url) {
          item.status = "remove";
          const index = this.value.indexOf(url);
          let value = this.value;
          value.splice(index, 1);
          this.$emit("input", value);
        }
      });
    },
    // 上传成功（未用到）
    handleSuccess(res, file, fileList) {
      // token失效
      // if (res.code === 107 || res.code === 105) {
      //   router.currentRoute.path != "/login" &&
      //     router.replace({
      //       path: "/login",
      //       query: {
      //         redirect: router.currentRoute.path
      //       }
      //     })
      //   return false
      // }
      // file.url = res.data
      // file.name = res.data
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 jpg 或 png 格式的图片。"
      });
    },
    handleMaxSize(file) {
      // this.$Notice.warning({
      //   title: "超出文件大小限制",
      //   desc: "文件 " + file.name + " 太大，不能超过 2M。"
      // })
    },
    handleBeforeUpload(file) {
      return new Promise(async () => {
        const check = this.effectiveImgUnm < this.max;
        if (!check) {
          this.$Notice.warning({
            desc: `最多只能上传 ${this.max} 张图片。`
          });
          return check;
        }
        // 图片无需上传前修改修改
        if (!this.editable) {
          this.uploadStart(file);
          return false;
        }
        this.imgName = file.name;
        this.type = file.type;
        // 去编辑图片
        const base = await this.fileToBase(file);
        this.editUrl = base.target.result;
        const oImg = new Image();
        oImg.src = this.editUrl;
        oImg.onload = () => {
          const width = oImg.width;
          const height = oImg.height;
          if (
            this.cropWidth &&
            this.cropHeight &&
            (this.cropWidth > width || this.cropHeight > height)
          ) {
            this.$Notice.warning({
              title: "文件选择错误",
              desc: `所选图片宽高尺寸不符，尺寸至少需${this.cropWidth}*${this.cropHeight}`
            });
            return false;
          }
          this.imageEditVisible = true;
        };
      });
    },
    async uploadStart(file) {
      this.imageEditVisible = false;
      // 构造所上传图片信息
      const fileInfo = {};
      fileInfo.status = "start";
      fileInfo.progress = 0;
      try {
        this.uploadList.push(fileInfo);
        const dataForm = new FormData();
        dataForm.append("file", file);
        // 上传图片
        const res = await upload(dataForm, this.uploadUrl, e => {
          // 图片上传进度监控
          const progress = ((e.loaded / e.total) * 100) | 0;
          fileInfo.status = "uploading";
          fileInfo.progress = progress;
        });
        // 转为base64设置图片预览url
        const base = await this.fileToBase(file);
        fileInfo.previewUrl = base.target.result;
        // 当上传失败时图片直接置为删除状态
        if (res.code === 200) {
          fileInfo.url = res.data;
          fileInfo.status = "finished";
          let value = this.value || [];
          value.push(res.data);
          this.$emit("input", value);
        } else {
          fileInfo.status = "remove";
        }
      } catch (err) {
        fileInfo.status = "remove";
        this.$Notice.warning({
          title: "上传失败，文件超出大小或网络原因"
        });
      }
    },
    fileToBase(file) {
      return new Promise(resolve => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          resolve(e);
        };
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.upload-box {
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  .upload-list-box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .img-box {
    display: inline-block;
    // width: 104px;
    // height: 104px;
    // line-height: 104px;

    // margin-right: 16px;
    margin: 0 auto;
    margin-bottom: 16px;

    .ivu-upload {
      height: 100%;
    }
    .upload-tip {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }
    .size-tip {
      margin-top: 8px;
      color: #dcdee2;
    }
    .ivu-icon {
      color: #dcdee2;
      transition: color 0.3s;
    }
    &:hover {
      .size-tip,
      .ivu-icon {
        color: #ff565a;
      }
    }
  }
  .upload-list-item {
    text-align: center;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    border: 1px solid rgba(193, 195, 195, 1);
  }
  .upload-list-item img {
    width: 100%;
    height: 100%;
  }
  .upload-list-item-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
  }
  .upload-list-item:hover .upload-list-item-cover {
    display: flex;
  }
  .upload-list-item-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
}
</style>
