<script>
export default {
  props: {
    menus: Array,
    dropdownTextField: String,
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visible: false
    }
  },
  render(h) {
    const link = h(
      'a', {
        staticClass: 'create-btn',
        attrs: { href: '' },
        on: {
          click: (e) => {
            e.preventDefault()
            if (!this.menus) {
              this.$emit('click')
            }
          }
        }
      }, this.text
    )
    const inner = this.menus ? h(
      'Poptip',
      {
        props: {
          placement: 'right',
          value: this.visible
        },
        on: {
          input: (v) => {
            this.visible = v
          }
        }
      },
      [
        link,
        h(
          'div',
          {
            slot: 'content',
            staticClass: 'menus-wrapper'
          },
          this.menus.map((menu, index) => {
            const menuName = this.dropdownTextField ? menu[this.dropdownTextField] : menu
            return h(
              'Option',
              {
                key: index,
                props: {
                  value: menuName
                },
                nativeOn: {
                  click: () => {
                    this.visible = false
                    this.$emit('select', menu)
                  }
                }
              }
            )
          })
        )
      ]
    ) : link
    // const inner = this.dropdowns ? h(
    //   'Dropdown',
    //   {
    //     staticClass: 'dropdown',
    //     props: {
    //       trigger: 'click',
    //       placement: 'right'
    //     }
    //   }, [
    //     link,
    //     h(
    //       'DropdownMenu',
    //       {
    //         slot: 'list'
    //       },
    //       this.dropdowns.map(dropdown => {
    //         return h('DropdownItem',
    //           {
    //             nativeOn: {
    //               click() {
    //                 this.$emit('select', dropdown)
    //               }
    //             }
    //           },
    //           this.dropdownTextField ? dropdown[this.dropdownTextField] : dropdown
    //         )
    //       })
    //     )
    //   ]
    // ) : link
    return h('div', {
      staticClass: 'flex-center-center create-pane'
    }, [inner])
  }
}
</script>

<style lang="scss">
.create-pane {
  padding: 10px 0;
  line-height: 1;
  background: #f0f0f0;
  .create-btn {
    color: #ff565a;
    font-size: 14px;
  }
  .ivu-poptip-body {
    padding: 0;
  }
  .menus-wrapper {
    max-height: 300px;
    overflow: auto;
  }
}
</style>
