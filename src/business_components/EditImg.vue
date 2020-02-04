<template>
  <div class="xcx-edit-img">
    <Row>
      <Col span="18">
        <div class="cropper-box">
          <vue-cropper
            ref="cropper"
            :aspectRatio="ratio"
            :src="url"
            preview=".xcx-edit-img-preview"
            :crop="crop"
            :ready="ready"
            :viewMode="1"
            :cropBoxResizable="cropResizable"
            :dragMode="cropResizable?'crop':'move'"
            style="max-height: 360px"
          />
        </div>
        <div class="actions-box">
          <!-- 切换鼠标拖动图片或者拉取绘制框 -->
          <!-- <Tooltip content="鼠标拖动模式">
            <ButtonGroup class="actions-item">
              <Button type="primary" icon="md-move" @click.prevent="setDragMode('move')"></Button>
              <Button type="primary" icon="md-crop" @click.prevent="setDragMode('crop')"></Button>
            </ButtonGroup>
          </Tooltip> -->
          <!-- 放大缩小图片 -->
          <ButtonGroup class="actions-item">
            <Button size="large" type="primary" @click.prevent="zoom(0.1)">放大</Button>
            <Button size="large" type="primary" @click.prevent="zoom(-0.1)">缩小</Button>
          </ButtonGroup>
          <!-- 上下左右调整图片 -->
          <ButtonGroup class="actions-item">
            <Button size="large" type="primary" @click.prevent="move(-10, 0)">左移</Button>
            <Button size="large" type="primary" @click.prevent="move(10, 0)">右移</Button>
            <Button size="large" type="primary" @click.prevent="move(0, -10)">上移</Button>
            <Button size="large" type="primary" @click.prevent="move(0, 10)">下移</Button>
          </ButtonGroup>
          <!-- 旋转图片 -->
          <ButtonGroup class="actions-item">
            <Button size="large" class="icon-rotate" type="primary" @click.prevent="rotate(-90)">左旋转</Button>
            <Button size="large" type="primary" @click.prevent="rotate(90)">右旋转</Button>
          </ButtonGroup>
          <!-- 镜像翻转 -->
          <ButtonGroup class="actions-item">
            <Button size="large" type="primary" @click.prevent="flipX">左右镜像</Button>
            <Button size="large" class="icon-rotate" type="primary" @click.prevent="flipY">上下镜像</Button>
          </ButtonGroup>
          <!-- 重置 -->
          <ButtonGroup class="actions-item">
            <Button size="large" type="primary" @click.prevent="reset">重置</Button>
          </ButtonGroup>
          <!-- 重新选择 -->
          <!-- <Upload class="actions-item" action="/" :before-upload="beforeUpload">
              <Button type="primary" icon="ios-cloud-upload-outline">重新选择</Button>
          </Upload> -->
        </div>
      </Col>
      <Col span="6">
        <div class="img-preview-box">
          <div class="xcx-edit-img-preview" />
        </div>
      </Col>
    </Row>
    <div class="flex-end">
      <Button
        :loading="loading"
        class="btn-primary"
        shape="circle"
        @click="editFinsh"
      >裁剪完成</Button>
    </div>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import { uploadMixin } from './mixins'

export default {
  mixins: [uploadMixin],
  components: {
    VueCropper,
  },
  props: {
    // 所编辑图片地址
    url: {
      type: String,
      required: true
    },
    // 所保存图片名称
    imgName: {
      type: [String, Number],
      default: Date.now()
    },
    // 所保存图片类型
    type: {
      type: String,
      default: 'image/jpeg'
    }
  },
  watch: {
    url(v) {
      if(v){
        this.$nextTick(() => {
          this.$refs.cropper.replace(this.url, false)
        })
      }
    }
  },
  data() {
    return {
      cropImg: '',
      data: null,
      options: {},
      loading: false
    };
  },
  computed: {
    // 裁剪框是否可调整大小，可根据业务自由调整
    cropResizable: function () {
      if (this.resizable !== undefined) {
        return this.resizable
      }
      return !(this.cropWidth && this.cropHeight)
    }
  },
  methods: {
    beforeUpload() {
      return false
    },
    ready(e) {
      // 当设置了裁剪大小宽高后，重新设置crop大小及比例
      if(this.cropWidth && this.cropHeight){
        const data = this.$refs.cropper.getCanvasData()
        this.$refs.cropper.setAspectRatio(this.cropWidth/this.cropHeight)
        const sizeRatio = data.width / data.naturalWidth
        this.$refs.cropper.setCropBoxData({ width: this.cropWidth * sizeRatio, height: this.cropHeight * sizeRatio });
      }
    },
    crop(e) {
      this.options = e.detail
    },
    // 切换拖动模式
    setDragMode(mode) {
      this.$refs.cropper.setDragMode(mode)
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    // 镜像翻转
    flipX() {
      const X = this.options.scaleX || -1
      this.$refs.cropper.cropper.scaleX(-X)
    },
    flipY() {
      const Y = this.options.scaleY || -1
      this.$refs.cropper.cropper.scaleY(-Y)
    },
    // 移动
    move(offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY);
    },
    // 重置
    reset() {
      const { width, height } = this.$refs.cropper.getCropBoxData()
      this.$refs.cropper.reset();
      this.$refs.cropper.setCropBoxData({ width, height });
    },
    // 旋转
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },
    // 缩放
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
    },
    editFinsh() {
      this.loading = true
      const data = {}
      if (this.cropWidth) data.width = this.cropWidth
      if (this.cropHeight) data.height = this.cropHeight
      this.$refs.cropper.getCroppedCanvas(data).toBlob(blob => {
        const file = new File([blob], this.imgName, { type: this.type, lastModified: Date.now() });
        this.$emit('change', file)
        this.loading = false
      })
    }
  },
  mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.actions-box {
  margin-top: 16px;
  .actions-item{
    margin-right: 20px;
    margin-bottom: 8px;
    .icon-rotate{
      .ivu-icon{
        transform: rotate(90deg)!important;
      }
    }
  }
}
.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}
.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}
.cropped-image img {
  max-width: 100%;
}
.cropper-box{
  width: 100%;
  max-height: 600px;
}
.img-preview-box{
  margin-left: 32px;
  .xcx-edit-img-preview{
    width: 100%;
    height: 400px;
    overflow: hidden;
    img{
      max-width: 100%;
    }
  }
}
.flex-end{
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
  .btn-primary{
    width: 110px;
    padding: 0;
    border: 1px solid #FF565A !important;
    color: #FFF !important;
    line-height: 30px;
    background: #FF565A !important;
    border-radius: 15px;
  }
}
</style>
