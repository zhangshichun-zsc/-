<!--组织列表共用-->
<template>
  <div class="main">
    <Modal
      draggable
      ok-text="导出字段"
      @on-ok="changeTableTitle()"
      v-model="modelCustomizeDialog"
      title="自定义展示字段"
    >
      <div class="popup">
        <p class="popup-head">
          <span>目前导出字段顺序</span>
          <span class="popup-head-tit">拖拽调整列显示顺序</span>
        </p>
        <div class="popup-content">
          <p>
            <draggable
              v-model="list"
              :disabled="!enabled"
              class="list-group"
              ghost-class="ghost"
              :move="checkMove"
              @start="dragging = true"
              @end="dragging = false"
            >
              <span
                :class="['list-group-item',{myclassA:element.isAlternative==true}]"
                v-for="element in list"
                :key="element.title"
              >
                {{ element.title }}
                <Icon
                  type="ios-close-circle-outline close-icon"
                  v-if="element.isAlternative==true"
                  @click.stop="removeThisField(element)"
                />
              </span>
            </draggable>
          </p>
        </div>
        <div class="bft">
          <p>备选字段</p>
          <div class="bft-tab">
            <CheckboxGroup v-model="fruit">
              <Checkbox
                @change.native="clickCheckboxChange(item)"
                v-for="item in toSelectList"
                :label="item.key"
                v-bind:key="item.key"
              >{{item.title}}</Checkbox>
            </CheckboxGroup>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { formatDate } from "@/request/datatime";
import {
  activeManager,
  activeAddManager,
  customDataAPI,
  customizeField
} from "@/request/api";
import draggable from "vuedraggable";
import { constants } from "fs";

export default {
  components: { draggable },
  data() {
    return {
      enabled: true,
      columns: [],
      columnsFixed: [],

      // 1：官方活动-活动管理；activity/manager
      columnsFixed1: [
        {
          type: "selection",
          width: 80,
          align: "center"
        },
        {
          width: 300,
          key: "action",
          renderHeader: (h, params) => {
            return h("div", [
              h("span", "操作"),
              h("Icon", {
                props: {
                  type: "ios-settings-outline"
                },
                style: {
                  marginLeft: "5px"
                },
                on: {
                  click: () => {
                    // this.$Message.info("此功能暂未开放")
                    // 自定义弹窗-Wyatt
                    console.log("custom", this.$refs);
                    this.modelCustomizeDialog = true;
                  }
                }
              })
            ]);
          },
          align: "center",
          render: (h, params) => {
            let signup = "关闭报名";
            if (params.row.statusText == "13") {
              signup = "开启报名";
            }
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#FF565A",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "editing",
                        query: { id: params.row.acitvityId, type: 2 }
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "10px",
                    marginLeft: "10px",
                    color: "#FF565A",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "profile",
                        query: {
                          acitvityId: params.row.acitvityId,
                          activityName: params.row.activityName,
                          sysId: 1
                        }
                      });
                    }
                  }
                },
                "概况"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "10px",
                    color: "#FF565A",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: "activity_share" });
                    }
                  }
                },
                "分享"
              ),
              h(
                "Dropdown",
                {
                  props: {
                    transfer: true
                  }
                },
                [
                  h(
                    "a",
                    {
                      style: {
                        color: "#FF565A"
                      }
                    },
                    "更多操作"
                  ),
                  h(
                    "DropdownMenu",
                    {
                      slot: "list"
                    },
                    [
                      h(
                        "DropdownItem",
                        {
                          nativeOn: {
                            click: name => {
                              this.modal5 = true;
                              this.activityId = params.row.acitvityId;
                            }
                          }
                        },
                        "取消"
                      ),
                      h(
                        "DropdownItem",
                        {
                          nativeOn: {
                            click: name => {
                              if (signup == "关闭报名") {
                                this.types = 1;
                                this.getactiveclose(params.row.acitvityId);
                              } else {
                                this.types = 2;
                                this.getactiveclose(params.row.acitvityId);
                              }
                            }
                          }
                        },
                        signup
                      ),
                      h(
                        "DropdownItem",
                        {
                          nativeOn: {
                            click: name => {
                              let status = this.activeState[
                                Number(params.row.statusText)
                              ].name;
                              if (status == "已结束") {
                                this.$router.push({
                                  name: "summarize",
                                  query: {
                                    acitvityId: params.row.acitvityId,
                                    activityName: params.row.activityName
                                  }
                                });
                              } else {
                                this.$Message.warning(
                                  "只有已结束的活动才可进行活动总结"
                                );
                              }
                            }
                          }
                        },
                        "活动总结"
                      ),
                      h(
                        "DropdownItem",
                        {
                          nativeOn: {
                            click: name => {
                              this.getactiveset(params.row.acitvityId);
                            }
                          }
                        },
                        "设为新活动模板"
                      )
                    ]
                  )
                ]
              )
            ]);
          }
        }
      ],

      // 2：非官方活动-活动管理；activity_vun/volunteer_activity
      columnsFixed2: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          width: 350,
          key: "action",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h("span", "操作"),
              h("Icon", {
                props: {
                  type: "ios-settings-outline"
                },
                style: {
                  marginLeft: "5px"
                },
                on: {
                  click: () => {
                    this.$Message.info("此功能暂未开放");
                    // this.modal3=true
                  }
                }
              })
            ]);
          },
          render: (h, params) => {
            let signup = "关闭报名";
            if (params.row.status == "13") {
              signup = "开启报名";
            }
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#FF565A",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      console.log(params.row.activityId);
                      if (
                        params.row.status == 1 ||
                        params.row.status == 2 ||
                        params.row.status == 3 ||
                        params.row.status == 4
                      ) {
                        this.$router.push({
                          name: "volunteer_issue",
                          query: {
                            activityId: params.row.activityId,
                            isEdit: 1,
                            status: params.row.status
                          }
                        });
                      } else {
                        this.$Message.warning("该活动状态不可编辑");
                      }
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "10px",
                    marginLeft: "10px",
                    color: "#FF565A",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "profile",
                        query: {
                          acitvityId: params.row.activityId,
                          activityName: params.row.name,
                          sysId: 2
                        }
                      });
                    }
                  }
                },
                "概况"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "10px",
                    marginLeft: "10px",
                    color: "#FF565A",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: "activity_share" });
                    }
                  }
                },
                "分享"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "10px",
                    marginLeft: "10px",
                    color: "#FF565A",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "volunteer_issue",
                        query: { activityId: params.row.activityId, isEdit: 4 }
                      });
                    }
                  }
                },
                "复制"
              ),
              h(
                "Dropdown",
                {
                  props: {
                    transfer: true
                  }
                },
                [
                  h(
                    "a",
                    {
                      style: {
                        color: "#FF565A"
                      }
                    },
                    "更多操作"
                  ),
                  h(
                    "DropdownMenu",
                    {
                      slot: "list"
                    },
                    [
                      h(
                        "DropdownItem",
                        {
                          nativeOn: {
                            click: name => {
                              this.modal5 = true;
                              this.activityId = params.row.activityId;
                            }
                          }
                        },
                        "取消"
                      ),
                      h(
                        "DropdownItem",
                        {
                          nativeOn: {
                            click: name => {
                              if (signup == "关闭报名") {
                                this.types = 1;
                                this.getactiveclose(params.row.activityId);
                              } else {
                                this.types = 2;
                                this.getactiveclose(params.row.activityId);
                              }
                            }
                          }
                        },
                        signup
                      )
                    ]
                  )
                ]
              )
            ]);
          }
        }
      ],

      // 3：用户-用户列表（会）user/all_member_hy
      columnsFixed3: [ {
          type: "selection",
          width: 60,
          align: "center"
        },{
          title: "操作",
          key: "action",
          width: 140,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  clssName: "action",
                  style: {
                    color: "#FD585E"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "user_details_hy",
                        query: { userId: params.row.userId }
                      });
                    }
                  }
                },
                "查看"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "5px",
                    marginLeft: "10px",
                    color: "#FD585E"
                  },
                  on: {
                    click: () => {
                      this.modaQR = true;
                      this.QRCode = params.row.qrCodePath;
                    }
                  }
                },
                "二维码"
              )
            ]);
          }
        }],

      // 4：用户-用户列表（志）user/all_member_zyz

      columnsFixed4: [{
          type: "selection",
          width: 60,
          align: "center"
        }, {
          title: '操作',
          key: 'action',
          width: 160,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'a',
                {
                  clssName: 'action',
                  style: {
                    color: '#FD585E'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'user_details_zyz',
                        query: { userId: params.row.userId }
                      })
                    }
                  }
                },
                '查看'
              ),
              h(
                'a',
                {
                  style: {
                    marginRight: '5px',
                    marginLeft: '5px',

                    color: '#FD585E'
                  },
                  on: {
                    click: () => {
                      this.modaQR = true
                      this.QRCode = params.row.qrCodePath
                    }
                  }
                },
                '二维码'
              )
              // h(
              //   "span",
              //   {
              //     style: {
              //       color: "green"
              //     },
              //     on: {
              //       click: () => {
              //         this.remove(params.row.userId, 2);
              //       }
              //     }
              //   },
              //   "删除"
              // )
            ])
          }
        }],

      modelCustomizeDialog: false,
      list: [],
      toSelectList: [],
      fruit: []
    };
  },

  props: {
    // 之后根据实际来定义
    labels: Object,
    required: true
  },

  methods: {
    // 类型
    getorgtype() {
      orgtype({
        // sysType: this.sysType
        sysType: this.sysType
      }).then(res => {
        if (res.code == 200) {
          this.typelist = res.data;
        }
        console.log(res);
      });
    },
    // 拖拽顺序
    checkMove: function(e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    },

    // 点击checkbox触发动作
    clickCheckboxChange(item) {
      // 判断是否为勾选操作
      // if(this.fruit.indexOf(item.id)>-1){
      if (this.fruit.indexOf(item.key) > -1) {
        // 勾选动作
        this.list.push(item);
      } else {
        // 取消勾选动作
        for (var i = 0; i < this.list.length; i++) {
          // 　　if (item.id==this.list[i].id) {
          if (item.key == this.list[i].key) {
            this.list.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
            i--; // 如果不减，将漏掉一个元素
          }
        }
      }

      console.log("this.fruit", this.fruit);
      console.log("this.list", this.list);
    },

    // // 点击导出按钮的操作:
    changeTableTitle() {
      // // 处理选中的列表
      console.log("this.list", this.list);
      // 将原来的列表,先进行删除
      this.columns.splice(2);
      // 添加新的列表
      console.log("this.columns", this.columns);
      for (var i = 0; i < this.list.length; i++) {
        // ----
        // 封装为用于字段显示的对象
        var temp = this.returnColumnTemp(this.list[i]);

        // ---结束

        this.columns.push(temp);
      }

      // 存储到本地localstorage
      window.localStorage.setItem(
        this.labels.head + "list",
        JSON.stringify(this.list)
      );
      // window.localStorage.setItem(this.labels.head+"list", JSON.stringify(this.columns));
      window.localStorage.setItem(
        this.labels.head + "fruit",
        JSON.stringify(this.fruit)
      );

      this.changeParent(this.columns);
    },

    // 封装方法,,将字段封装为用于显示的字段值对象,返回temp
    returnColumnTemp(list) {
      // 一般处理
      var temp = {
        width: 150,
        title: list.title,
        key: list.key,
        isAlternative: list.defaultFlag == 1 ? false : true,
        align: "center"
      };
      // 如果是活动时间
      if (list.key == "startTimestamp" && this.labels.pageTable == "1") {
        temp = {
          width: 300,
          title: list.title,
          key: list.key,
          isAlternative: list.defaultFlag == 1 ? false : true,
          align: "center",
          render: (h, params) => {
            return h("div", formatDate(params.row.startTimestamp));
            // return h("div", formatDate(1580659200000));
            // return h("div", 'test2');
          }
        };
      }
      // 如果是会员报名人数
      if (list.key == "memberSignUpCount") {
        temp = {
          width: 300,
          title: list.title,
          key: list.key,
          isAlternative: list.defaultFlag == 1 ? false : true,
          align: "center",
          render: (h, params) => {
            return h("div", params.row.memberSignUpCount);
          }
        };
      }

      // 如果是群二维码
      if (list.key == "activityQrCode") {
        temp = {
          width: 300,
          title: list.title,
          key: list.key,
          isAlternative: list.defaultFlag == 1 ? false : true,
          align: "center",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.activityQrCode
              },
              style: {
                width: "4rem",
                height: "4rem"
              }
            });
          }
        };
      }

      // 如果是上架/下架
      if (list.key == "statue") {
        temp = {
          width: 300,
          title: list.title,
          key: list.key,
          isAlternative: list.defaultFlag == 1 ? false : true,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.activityQrCode == 1
                },
                on: {
                  input: e => {}
                }
              })
            ]);
          }
        };
      }

      return temp;
    },

    // 修改父组件的值
    changeParent(list) {
      this.$emit("fun", list);
    },

    // 点击字段右上角的删除按钮
    removeThisField(item) {
      // 点击删除后,该字段从list中删除
      console.log("test close", item.key);
      for (var i = 0; i < this.list.length; i++) {
        if (item.key == this.list[i].key) {
          this.list.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
          i--; // 如果不减，将漏掉一个元素
        }
      }
      // 对应的复选框取消勾选状态 ,,从fruit中删除
      for (var i = 0; i < this.fruit.length; i++) {
        if (item.key == this.fruit[i]) {
          this.fruit.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
          i--; // 如果不减，将漏掉一个元素
        }
      }
    },

    // 将数据格式进行处理,替换对象数组的key值
    changeDataKey(data) {
      // var data = res.data;
      var data = data;
      var keyMap = { columnName: "title", columnCode: "key" };
      console.log("Object.keys(data)", Object.keys(data), data);
      let objs = data.map(item => {
        return Object.keys(item).reduce((newData, key) => {
          let newKey = keyMap[key] || key;
          newData[newKey] = item[key];
          return newData;
        }, {});
      });
      return objs;
    },
    // 请求自定义字段
    getCustomizeField() {
      customizeField({
        pageTable: this.labels.pageTable
      }).then(res => {
        if (res.code == 200) {
          let returnStatus = res.result;
          console.log("res.data,res.data", res.data);

          // 将数据格式进行处理,替换对象数组的key值
          let objs = this.changeDataKey(res.data);

          // --------以下都是无缓存的处理方式----------
          // 将objs进行处理,保存到本地
          var temp = {};
          // list(本地缓存),这个是可变的,所有已选择项,初始时是默认项,defaultFlag为1
          var templist = [];
          // toSelectList,这个是固定的,是所有defaultFlag为0
          var temptoSelectList = [];
          // fruit(本地缓存),这个是可变的,,是所有已选项
          // var tempfruit = [];

          for (var item in objs) {
            // 在最开始时,筛选数据,只包含该页面的字段
            if (objs[item].pageTable != this.labels.pageTable) {
              break;
            }

            // 封装为用于字段显示的对象
            // 将数据对象的key进行替换处理
            var temp = this.returnColumnTemp(objs[item]);

            // 根据isAlternative值做处理
            if (temp.isAlternative == false) {
              templist.push(temp);
              // 最后形成的templist是所有被设置为默认显示的字段集合
            }
            if (temp.isAlternative == true) {
              temptoSelectList.push(temp);
              // 最后形成的temptoSelectList是所有的备选项
            }
          }

          // 根据缓存值进行处理
          // 如果有缓存值
          if (window.localStorage.getItem(this.labels.head + "fruit")) {
            // 这样返回的key是不包含render的
            var localList = JSON.parse(
              window.localStorage.getItem(this.labels.head + "list")
            );

            this.list = localList;

            var xx = [];
            for (var i = 0; i < this.list.length; i++) {
              // ----
              // 封装为用于字段显示的对象
              var temp = this.returnColumnTemp(this.list[i]);
              xx.push(temp);
            }
            this.toSelectList = temptoSelectList;
            this.fruit = JSON.parse(
              window.localStorage.getItem(this.labels.head + "fruit")
            );
            this.columns = this.columnsFixed.concat(xx);
          } else {
            // 如果没有缓存值
            this.list = templist;
            this.toSelectList = temptoSelectList;
            this.fruit = [];

            this.columns = this.columnsFixed.concat(templist);
          }
          // 设置父组件的值
          this.changeParent(this.columns);
        }
      });
    },

    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, " ");
    }
  },

  // 事件监听
  watch: {},

  mounted() {
    this.getCustomizeField();

    // 根据不同的页面设置操作栏
    if (this.labels.pageTable == "1") {
      // 1：官方活动-活动管理；activity/manager
      this.columnsFixed = this.columnsFixed1;
    } else if (this.labels.pageTable == "2") {
      // 2：非官方活动-活动管理；activity_vun/volunteer_activity
      this.columnsFixed = this.columnsFixed2;
    } else if (this.labels.pageTable == "3") {
      // 3：用户-用户列表（会）user/all_member_hy
      this.columnsFixed = this.columnsFixed3;
    } else if (this.labels.pageTable == "4") {
      // 4：用户-用户列表（志）user/all_member_zyz
      this.columnsFixed = this.columnsFixed4;
    }


  }
};
</script>
<style lang="scss" scoped>
.integral-header {
  border: 1px solid #eee;
  margin-top: 20px;
}
.integral-header .integral-top {
  padding: 10px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
}
.integral-header .integral-center {
  margin: 0 20px;
}
.integral-header .integral-body {
  padding: 0 20px;
  background: #fff;
  justify-content: flex-start;
  height: 50px;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 200px;
  margin-left: 10px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 40px;
}
// .integral-table {
//   margin-top: 30px;
// }
.table-header {
  padding: 10px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.table-header .table-btn {
  margin-left: 15px;
}
.flex-data {
  display: flex;
}
.integral-table {
  position: relative;
}
.popup {
  background: #ffffff;
  .popup-head {
    height: 20px;
    line-height: 20px;
    margin-bottom: 10px;
    .popup-head-tit {
      display: inline-block;
      // width: 140px;
      border: black solid 1px;
      padding: 0 5px;
      margin-left: 20px;
    }
  }
  .popup-content {
    margin-bottom: 20px;
    p {
      span {
        display: inline-block;
        padding: 0 8px;
        line-height: 20px;
        font-size: 14px;
        border: black 1px dashed;
        margin: 5px;
      }
    }
  }
  .bft {
    .bft-tab {
      padding: 15px;
      background: #e4e4e4;
      height: 150px;
    }
  }
}
ul {
  margin: 10px 30%;
}
li {
  width: 160px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid gray;
  margin-top: -1px;
}
.set {
  position: absolute;
  left: 180px;
  top: 70px;
  cursor: pointer;
}

.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.myclassA {
  // background: #ff0000;
  position: relative;
  .close-icon {
    color: #333;
    position: absolute;
    right: -10px;
    top: -10px;
    cursor: pointer;
  }
}
</style>
