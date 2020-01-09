<script>
import { throttle } from "@/libs/utils";

export default {
  props: {
    // 标题
    title: String,
    // 筛选条件，目前支持常用的form表单类型
    filters: {
      type: Array,
      default: () => [],
      validator(v) {
        // filter 可选值
        // type 类型
        // label 查询标题
        // value 对应filterModel中的key
        // ruleKey 对应filterRules中的key，同FormItem的prop
        // props 搜索项的其余props
        // attrs 搜索项的其余attrs
        return v.every(filter => {
          return (
            "type" in filter &&
            [
              "input",
              "select",
              "datePicker",
              "xDatePicker",
              "timePicker",
              "cascader",
              "inputNumber"
            ].includes(filter.type) &&
            "label" in filter &&
            "value" in filter
          );
        });
      }
    },
    // 筛选条件对应的字段，值参考form的model
    filterModel: {
      type: Object,
      required: true
    },
    // 筛选条件对应的字段的校验规则，值参考form的rules
    filterRules: {
      type: Object
    },
    // 同Table的columns
    columns: {
      type: Array,
      required: true
    },
    // 表格数据
    dataSource: {
      type: Array,
      default: () => []
    },
    // 默认排序字段，显示于表头上
    defaultSortKey: String,
    // 默认排序方式，显示于表头上
    defaultSortOrder: String,
    // 排序数组，显示于toolbox上
    sortList: {
      type: Array,
      default: () => {
        return [
          { value: 'create_at', label: '创建时间' }
        ]
      }
    },
    // 加载中
    loading: {
      type: Boolean
    },
    // 分页
    showPagination: {
      type: Boolean,
      default: true
    },
    // 数据总量
    total: {
      type: Number
    },
    // 是否显示全选
    showSelection: {
      type: Boolean,
      default: true
    },
    // 是否固定选择列
    fixSelection: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      selections: [],
      tableHeight: 0,
      sortKey: this.defaultSortKey || "",
      sortOrder: this.defaultSortOrder || ""
    };
  },
  computed: {
    tableColumns() {
      return this.columns.map(col => {
        if ("sortable" in col) {
          if (col.key === this.sortKey) {
            return {
              ...col,
              sortType: this.sortOrder
            };
          }
          return col;
        }
        return col;
      });
    }
  },
  watch: {
    dataSource() {
      this.setSelections([])
    }
  },
  methods: {
    // props验证
    validateProps() {
      if (this.filters.length) {
        if (!this.filterModel) {
          throw new Error("设置filters时必须设置对应的filterModel");
        }
        this.filters.forEach(filter => {
          if (!filter.value in this.filterModel) {
            throw new Error(
              `请为filters里的每个value设置对应的model，当前${filter.value}为设置对应的model`
            );
          }
        });
      }
    },
    // 清空选择
    setSelections(e) {
      this.selections = e;
      this.$emit("on-selection-change", e);
    },
    // 清空状态
    reset() {
      this.setSelections([]);
      this.currentPage = 1;
    },
    // 搜索条件
    renderFilter(h) {
      return h(
        "Form",
        {
          staticClass: "list-filters",
          props: {
            model: this.filterModel,
            rules: this.filterRules,
            inline: true,
            labelPosition: "left"
          },
          ref: "searchForm"
        },
        [
          ...this.filters.map(filter => {
            return h(
              "FormItem",
              {
                props: {
                  label: filter.label,
                  prop: filter.ruleKey
                }
              },
              [
                h(
                  filter.type[0].toUpperCase() + filter.type.substr(1),
                  {
                    props: {
                      value: this.filterModel[filter.value],
                      ...filter.props
                    },
                    attrs: filter.attrs,
                    on: {
                      input: v => {
                        // const model = JSON.parse(JSON.stringify(this.filterModel))
                        this.filterModel[filter.value] = v;
                        this.$emit("update:filterModel", this.filterModel);
                      }
                    }
                  },
                  [this.$slots[`filter_${filter.value}`]]
                )
              ]
            );
          }),
          h("FormItem", {}, [
            h(
              "Button",
              {
                staticClass: "search-btn",
                props: {
                  shape: "circle",
                  icon: "ios-search",
                  type: 'primary'
                },
                on: {
                  click: () => {
                    this.reset();
                    this.doSearch();
                  }
                }
              },
              "查询"
            )
          ])
        ]
      );
    },
    // 工具栏
    renderToolbar(h) {
      const toolbarRight = [this.$slots.toolbarRight]
      // 工具栏排序
      if (this.sortList && this.sortList.length) {
        toolbarRight.push(h(
          'Dropdown',
          { props: { trigger: 'click' } },
          [
            h('Button', { props: { icon: 'md-funnel' } }, '排序方式'),
            h('DropdownMenu', { slot: 'list' },
              this.sortList.reduce((arr, sort, index) => {
                arr.push(
                  h('DropdownItem',
                  {
                    props: {
                      key: index + '_asc',
                      selected: this.sortKey === sort.value && this.sortOrder === 'asc'
                    },
                    nativeOn: {
                      click: () => {
                        this.sortBy(sort.value, 'asc')
                      }
                    }
                  },
                  `${sort.label}正序`
                  )
                )
                arr.push(
                  h('DropdownItem', {
                    props: {
                      key: index + '_desc',
                      selected: this.sortKey === sort.value && this.sortOrder === 'desc'
                    },
                    nativeOn: {
                      click: () => {
                        this.sortBy(sort.value, 'desc')
                      }
                    }
                  },
                  `${sort.label}倒序`
                  )
                )
                return arr
              }, [])
            )
          ]
        ))
      }
      const content = [
        this.$slots.toolbarLeft,
        h(
          "div",
          {
            style: {
              marginLeft: "auto"
            }
          },
          toolbarRight
        )
      ]
      // 全选状态
      if (this.showSelection) {
        content.unshift(
          h("div", { staticClass: "selection-counts mr-24" }, [
            "已选择",
            h("span", `（${this.selections.length}）`)
          ])
        )
      }
      return h(
        "div",
        {
          staticClass: "list-toolbar flex-center-start"
        }, content
      );
    },
    // 表格
    renderTable(h) {
      return h("Table", {
        staticClass: "list-table",
        props: {
          border: true,
          // 多选
          columns: this.showSelection
            ? [
                {
                  type: "selection",
                  width: 60,
                  align: "center",
                  fixed: this.fixSelection ? 'left' : ''
                },
                ...this.tableColumns
              ]
            : this.tableColumns,
          data: this.dataSource,
          // stripe: true,
          loading: this.loading,
          height: this.tableHeight
        },
        ref: "table",
        on: {
          ...this.$listeners,
          // 排序
          "on-sort-change": e => {
            this.$emit("on-sort-change", e);
            // 重置
            this.reset();
            // 搜索
            this.sortKey = e.key;
            this.sortOrder = e.order;
            this.doSearch();
          },
          // 分页
          "on-selection-change": e => {
            this.setSelections(e);
          }
        }
      });
    },
    // 分页
    renderPagination(h) {
      return h(
        "div",
        {
          staticClass: "list-pagination flex-center-end"
        },
        [
          h("Page", {
            props: {
              current: this.currentPage,
              total: this.total,
              pageSize: this.pageSize,
              showSizer: true,
              showTotal: true,
              pageSizeOpts: [10, 20, 50, 100],
              placement: "top"
            },
            on: {
              "update:current": v => {
                this.currentPage = v;
                // 清空选择
                this.setSelections([]);
                this.doSearch();
              }
            }
          })
        ]
      );
    },
    // 执行搜索
    doSearch() {
      let promise;
      if (this.filterRules && Object.keys(this.filterRules).length) {
        promise = this.$refs.searchForm.validate();
      } else {
        promise = Promise.resolve(true);
      }
      promise
        .then(valid => {
          if (valid) {
            const _params = {
              ...this.filterModel,
              pageSize: this.pageSize,
              currentPage: this.currentPage,
              sortKey: this.sortKey,
              sortOrder: this.sortOrder,
              sort: this.sortKey ? `${this.sortKey} ${this.sortOrder}` : ''
            };
            this.$emit("search", _params);
          }
        })
        .catch(() => {});
    },
    // 排序
    sortBy(sortKey, sortOrder) {
      this.sortKey = sortKey
      this.sortOrder = sortOrder
      this.doSearch()
    },
    // 窗口大小改变事件
    onWindowResize: throttle(function() {
      this.tableHeight = this.$refs.table.$el.offsetHeight;
    }, 100)
  },
  created() {
    this.validateProps();
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onWindowResize);
      this.onWindowResize();
      this.doSearch();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);
  },
  render(h) {
    const body = [];
    // 标题
    if (this.title) {
      body.push(h("div", { staticClass: "title" }, this.$props.title));
    }
    // 筛选条件
    if (this.filters.length) {
      body.push(this.renderFilter(h));
    }
    // 工具栏
    if (
      this.showSelection ||
      this.$slots.toolbarLeft ||
      this.$slots.toolbarRight ||
      (this.sortList && this.sortList.length)
    ) {
      body.push(this.renderToolbar(h));
    }
    // 表格
    body.push(this.renderTable(h));
    // 分页
    if (this.showPagination) {
      body.push(this.renderPagination(h));
    }
    return h(
      "div",
      {
        staticClass: "b-common-list card"
      },
      body
    );
  }
};
</script>

<style lang="scss">
.b-common-list {
  display: flex;
  flex-direction: column;
  .ivu-btn .ivu-icon {
    transform: scale(1.3);
  }
  > .title {
    margin-bottom: 24px;
    font-size: 18px;
    font-weight: bold;
    flex-shrink: 0;
  }
  > .list-filters.ivu-form {
    flex-shrink: 0;
    .ivu-form-item {
      display: inline-flex;
      align-items: center;
      & + .ivu-form-item {
        margin-left: 32px;
      }
      > .ivu-form-item-content {
        min-width: 160px;
      }
    }
    .search-btn {
      width: 110px;
    }
  }
  > .list-toolbar {
    flex-shrink: 0;
    margin-bottom: 20px;
    .selection-counts {
      font-size: 14px;
      span {
        font-weight: bold;
      }
    }
  }
  > .list-table {
    flex: 1;
    > .ivu-table {
      .ivu-btn-small {
        font-size: 16px;
        & + .ivu-btn-small {
          margin-left: 12px;
        }
      }
    }
    .ivu-table-sort i.on {
      color: #333;
    }
  }
  > .list-pagination {
    flex-shrink: 0;
    margin-top: 20px;
  }
}
</style>
