<template>
  <div class="page-header-wrapper" :class="{'fixed-height': fixedHeight}">
    <div class="head">
      <div v-if="showBack" class="back-btn" @click="back">
        <img class="back-icon" src="@/assets/images/page-back-icon.svg" />
        <span>返回</span>
      </div>
      <span v-if="title" class="title">{{title}}</span>
      <slot v-else name="title"></slot>
      <slot name="titleSuffix"/>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    // 页面title
    title: {
      type: String
    },
    // 是否展示返回按钮
    showBack: {
      type: Boolean,
      default: false
    },
    // 为true时拦截返回事件并往上层触发tap事件（可用于返回前能够进行其他操作）
    eventIntercept: {
      type: Boolean,
      default: false
    },
    // 是否固定高度
    fixedHeight: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 点击返回按钮
    back() {
      if (this.eventIntercept) {
        this.$emit("tap");
        return false;
      }
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.page-header-wrapper {
  width: 100%;
  height: 100%;
  padding-top: 26px;
  &.fixed-height {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 92px);
    overflow: hidden;
    .head {
      flex-shrink: 0;
      & + * {
        flex: 1;
        overflow: hidden;
      }
    }
  }
  .head {
    padding-bottom: 30px;
    display: flex;
    align-items: center;
    .back-btn {
      background: #ffffff;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      width: 80px;
      font-size: 14px;
      color: #fd585e;
      margin-right: 16px;
      cursor: pointer;
      .back-icon {
        width: 21px;
        height: 21px;
        margin-right: 6px;
      }
    }
    .title {
      font-size: 16px;
      color: #1b2331;
      font-weight: bold;
    }
  }
}
</style>
