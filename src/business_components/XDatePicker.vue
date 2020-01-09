<script>
export default {
  methods: {
    onChange(formatedDate, date) {
      if (this.$attrs.type === 'datetime' || this.$attrs.type === 'datetimerange')
      this.$refs.picker.onSelectionModeChange('time')
      this.$emit('on-change', formatedDate, date)
    }
  },
  render(h) {
    return h('DatePicker', {
      staticClass: 'x-date-picker',
      props: this.$attrs,
      ref: 'picker',
      on: {
        ...this.$listeners,
        'on-change': this.onChange
      }
    })
  }
}
</script>
<style lang="scss">
.x-date-picker {
  .ivu-picker-panel-content .ivu-picker-panel-content .ivu-time-picker-cells-list ul {
    padding-bottom: 0;
  }
}
</style>
