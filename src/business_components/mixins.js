export const uploadMixin = {
  props: {
    // 所截取图片比例，设置cropWidth和cropHeight时此值无效
    ratio: {
      type: Number,
      default: 16 / 9
    },
    // 图片编辑选中框宽高,即所需要截取的宽高
    cropWidth: {
      type: Number
    },
    cropHeight: {
      type: Number
    },
    // 是否可修改宽高比例
    resizable: {
      type: Boolean
    }
  }
}
