<template>
  <Upload ref="uploader" :action="fileUploadUrl"
    :default-file-list="defaultList"
    :before-upload="beforeUpload"
    :on-success="onUploaded"
    :on-remove="onRemove">
    <Button icon="ios-cloud-upload-outline">点击上传</Button>
  </Upload>
</template>

<script>
import { getFileUploadUrl } from '@/request/http'
export default {
  props: {
    value: String,
    // 是否是单文件上传
    single: {
      type: Boolean,
      default: true
    },
    // 同upload的default-file-list
    defaultList: {
      type: Array
    }
  },
  data() {
    return {
      // 文件上传地址
      fileUploadUrl: getFileUploadUrl(),
      uploadedList: []
    }
  },
  methods: {
    beforeUpload() {
      if (this.single) {
        this.$refs.uploader.clearFiles()
      }
    },
    onUploaded(resp, file) {
      if (resp.code === 200) {
        this.uploadedList.push(file)
        this.$emit('uploaded', {
          path: resp.data,
          name: file.name
        })
      } else {
        if (this.single) {
          this.$refs.uploader.clearFiles()
        }
      }
    },
    onRemove(file) {
      const index = this.uploadedList.indexOf(file)
      this.uploadedList.splice(index, 1)
      this.$emit('remove', index)
    }
  }
}
</script>

<style>

</style>
