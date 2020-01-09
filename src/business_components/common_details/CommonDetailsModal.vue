<template>
  <Modal
    class="common-details-modal"
    :class="{'footer-hide': footerHide}"
    v-model="getValue"
    :title="title"
    :footer-hide="footerHide"
    :width="width"
  >
    <slot></slot>
    <slot name="footer" slot="footer"></slot>
  </Modal>
</template>

<script>
  export default {
    props: {
      width: {
        type: [String, Number],
        default: 520
      },
      value: {
        type: Boolean
      },
      title: {
        type: String
      },
      footerHide: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      getValue: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('input', val);
        }
      }
    }
  }
</script>

<style lang="scss">
  .common-details-modal {

    &.footer-hide {
      .ivu-modal-content {
        padding-bottom: 22px;
      }
    }

    .ivu-modal-mask {
      background: rgba(27, 35, 49, 0.15);
    }

    .ivu-modal-wrap {
      display: flex;
      align-items: center;
      justify-content: center;

      .ivu-modal {
        top: 0;
      }
    }

    .ivu-modal-content {
      background: #FFFFFF;
      border-radius: 12px;
    }

    .ivu-modal-header {
      padding: 22px 30px;
      border-bottom: 0;
    }

    .ivu-modal-header p,
    .ivu-modal-header-inner {
      height: 25px;
      font-size: 18px;
      color: #1B2331;
      line-height: 25px;
    }

    .ivu-modal-body {
      padding: 10px 30px;
    }

    .ivu-modal-footer {
      padding: 22px 30px;
      border-top: 0;
    }

    .ivu-btn-primary {
      background-color: #FD585E !important;
      border-color: #FD585E !important;
    }

    .body-block {
      & + .body-block {
        margin-top: 45px;
      }
    }

    .body-block-item {
      & + .body-block-item {
        margin-top: 30px;
      }

      .body-block-item-photos {
        display: flex;

        .body-block-item-photo {
          flex: 1;

          & + .body-block-item-photo {
            margin-left: 16px;
          }

          img {
            width: 100%;
          }
        }
      }

      .body-block-title {
        height: 20px;
        margin-bottom: 15px;
        font-size: 14px;
        color: #1B2331;
        line-height: 20px;
      }
    }
  }
</style>
