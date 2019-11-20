export const tablepage = {
  date() {
    return {

    }
  },
  methods: {
    // //获取选中数据
    // handleSelectionChange(val) {
    //   console.log(val);
    //   this.arr = val;
    //   if (
    //     (this.arr.length == this.dataCount && this.dataCount != 0) ||
    //     this.arr.length == this.size
    //   ) {
    //     this.status = true;
    //   } else {
    //     this.status = false;
    //   }
    //   this.arr = this.arr.map(item => {
    //     return item.orgId;
    //   });
    // },

    //  //全选按钮
    //  chackall() {
    //   this.status = !this.status;
    //   this.$refs.selection.selectAll(this.status);
    // },
    // //收起筛选
    // Retractbtn() {
    //   this.Retract = !this.Retract;
    //   console.log(11);
    // },

    //导出数据
    exportData() {
      if (this.arrs.length == 0) {
        this.arrs = this.data
      }
      this.$refs.selection.exportCsv({
        filename: this.navigation1.head,
        columns: this.columns.filter((col, index) => index > 0),
        data: this.arrs
      });
    },

    //防止表单提交
    debounce(func, wait) {
      let timeout;
      return function () {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(context, args)
        }, wait);
      }
    }
  },
  //事件监听
  watch: {
    size: "getorgpage",
    sort: "getorgpage"
  },
}
