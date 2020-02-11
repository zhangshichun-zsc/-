<!--会员等级设置(会员)-->
<template>
  <div>
    <!-- <adress :value="adr" @change="getMap"/> -->
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <!-- Author:Wyatt -->
      <div class="contentBox">
        <div class="leftBox">
          <Icon type="ios-list"/>
          <span>数据列表</span>
        </div>
      </div>
      <table class="level-table">
        <thead>
          <th>等级名称</th>
          <th>积分</th>
          <!-- <th>积分奖励</th> -->
        </thead>
        <tbody>
          <tr v-for="(item,index) in surveyList" :key="index">
            <td>
              <!-- <input maxlength="6" class="inputText" type="text"  v-model="item.levelName" @blur="validateWidth($event)"> -->
              <input maxlength="6" class="inputText" type="text" v-model="item.levelName">
            </td>
            <td>
              <span>满</span>
              <input class="inputNum" type="text" v-model="item.conditionS">
              <span>积分</span>
            </td>
            <!-- <td>
              <span>获得</span>
              <input class="inputNum" type="text" v-model="item.score">
              <span>积分</span>
            </td> -->
          </tr>
        </tbody>
      </table>
      <div class="contentBoxFooter">
        <!-- <button class="insertSetBtn SetBtn" id="insertSetBtn" @click.stop="insertSet()">新增</button> -->
        <!-- <button class="deleteSetBtn SetBtn" id="deleteSetBtn" @click.stop="deleteSet()">删除</button> -->
        <!-- <button class="moveUpTableRow SetBtn" id="moveUpTableRow" @click.stop="moveUpTableRow()">上移</button> -->
        <!-- <button class="moveDownTableRow SetBtn" id="moveDownTableRow" @click.stop="moveDownTableRow()">下移</button> -->
        <button class="saveSetBtn SetBtn" id="saveRuleSet" @click.stop="onSaveLevelData()">保存</button>
      </div>

      <!-- <div class="btn-wrapper">
        <Button type="info" @click="onSaveLevelData">保存</Button>
      </div>-->
    </div>
  </div>
</template>

<script>
import {
  getActiveType,
  getActiveLimit,
  getActiveSign,
  getOrgTeam,
  getOrgId,
  orgimgdel,
  saveActive,
  queryLevelList,
  updateLevel
} from "@/request/api";
import { getAdressId, filterNull } from "@/libs/utils";
import adress from "_c/map";
import { upload } from "@/request/http";
import "@/libs/survey.scss";
import { constants } from "fs";
export default {
  data() {
    return {
      navigation1: {
        head: "会员等级设置(会员)"
      },
      adr: "",
      columns1: [
        {
          title: "等级名称",
          slot: "levelName",
          align: "center"
        },
        {
          title: "积分",
          slot: "conditionS",
          align: "center"
        }
        // ,
        // {
        //   title: "积分奖励",
        //   slot: "score",
        //   align: "center"
        // }
      ],
      surveyList: [],
      selectedIndex: "" // 当前选中行的索引
    };
  },

  components: { adress },

  mounted() {
    this.getLevelList();
  },
  methods: {
    getMap(e) {
      let adr = this.adr;
      this.adr = Object.assign(adr, e);
    },
    // 选中行之后点击新增按钮
    insertSet() {
      console.log("选中行之后点击新增按钮");
      this.surveyList.push({
        levelName: "",
        conditionS: "",
        score: ""
      });
    },
    // 选中行之后点击删除按钮
    deleteSet() {
      var index = this.selectedIndex;

      // 如果未选中,则提示选择
      if (index === "" || index > this.surveyList.length - 1) {
        this.$Message.warning("请选择要被删除的行");
      } else {
        console.log("选中行之后点击删除按钮");
        this.surveyList.splice(index, 1);
      }
    },
    // 选中行之后点击保存按钮
    saveSet() {
      console.log("选中行之后点击保存按钮");
      customizeField({
        pageTable: 1
      }).then(res => {
        if (res.code == 200) {
          let returnStatus = res.result;
          console.log("getCustomizeField", res);
          // 将返回值进行处理,保存到本地
          var temp = {};

          // list(本地缓存),这个是可变的,所有已选择项,初始时是默认项,defaultFlag为1
          var templist = [];

          // toSelectList,这个是固定的,是所有defaultFlag为0
          var temptoSelectList = [];
          // fruit(本地缓存),这个是可变的,,是所有已选项
          // var tempfruit = [];

          for (var item in res.data) {
            // 一般处理
            temp = {
              // width:
              title: res.data[item].columnName,
              key: res.data[item].columnCode,
              isAlternative: res.data[item].defaultFlag == 1 ? false : true,
              align: "center"
            };
            // 如果是活动时间
            if (res.data[item].columnCode == "startTimestamp") {
              temp = {
                title: res.data[item].columnName,
                key: res.data[item].columnCode,
                isAlternative: res.data[item].defaultFlag == 1 ? false : true,
                align: "center",
                render: (h, params) => {
                  return h("div", formatDate(params.row.startTimestamp));
                }
              };
            }
            // 如果是会员报名人数
            if (res.data[item].columnCode == "memberSignUpCount") {
              temp = {
                title: res.data[item].columnName,
                key: res.data[item].columnCode,
                isAlternative: res.data[item].defaultFlag == 1 ? false : true,
                align: "center",
                render: (h, params) => {
                  return h("div", params.row.memberSignUpCount);
                }
              };
            }

            // 如果是群二维码
            if (res.data[item].columnCode == "activityQrCode") {
              temp = {
                title: res.data[item].columnName,
                key: res.data[item].columnCode,
                isAlternative: res.data[item].defaultFlag == 1 ? false : true,
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
            if (res.data[item].columnCode == "statue") {
              temp = {
                title: res.data[item].columnName,
                key: res.data[item].columnCode,
                isAlternative: res.data[item].defaultFlag == 1 ? false : true,
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

            // 如果不存在缓存,则默认加载
            // if (true) {
            // } else {
            // 根据isAlternative值做处理
            if (temp.isAlternative == false) {
              templist.push(temp);
            }
            // }
            // 不管有没有缓存,都需要加载待选择项
            if (temp.isAlternative == true) {
              temptoSelectList.push(temp);
            }
          }

          // 根据缓存值进行处理
          // 如果有缓存值
          if (window.localStorage.getItem("fruit")) {
            this.list = JSON.parse(window.localStorage.getItem("list"));
            this.toSelectList = temptoSelectList;
            this.fruit = JSON.parse(window.localStorage.getItem("fruit"));

            this.columns = columnsFixed.concat(
              JSON.parse(window.localStorage.getItem("list"))
            );
          } else {
            // 如果没有缓存值
            this.list = templist;
            this.toSelectList = temptoSelectList;
            this.fruit = [];

            this.columns = columnsFixed.concat(templist);
          }

          console.log(
            "11111111",
            this.list,
            this.toSelectList,
            this.fruit,
            this.columns
          );
        }
        //  return "success"
      });
    },
    // 点击表格的行,会给该行添加样式
    clickTableRow(index) {
      this.selectedIndex = index;
      // console.log("点击表格的行,会给该行添加样式",index);
    },
    // 点击表格的行后,上移
    moveUpTableRow(index) {
      var index = this.selectedIndex;
      // 如果未选中,则提示选择
      if (index === "" || index > this.surveyList.length - 1) {
        this.$Message.warning("请选择要被移动的行");
      } else {
        // console.log("向上移动的行");
        // console.log("this.surveyList[index]",this.surveyList[index],this.surveyList[index-1]);
        // 如果非顶行,则执行
        if (index > 0) {
          var temp = this.surveyList[index];
          this.surveyList[index] = this.surveyList[index - 1];
          this.surveyList[index - 1] = temp;
          // 修改样式
          this.selectedIndex = index - 1;
          // console.log("this.selectedIndex",this.selectedIndex);
        }
      }
    },
    // 点击表格的行后,下移
    moveDownTableRow(index) {
      var index = this.selectedIndex;
      // 如果未选中,则提示选择
      if (index === "" || index > this.surveyList.length - 1) {
        this.$Message.warning("请选择要被移动的行");
      } else {
        // console.log("向下移动的行");
        console.log(
          "this.surveyList[index],,index,this.surveyList.length",
          this.surveyList[index],
          index,
          this.surveyList.length
        );
        // 如果非顶行,则执行
        if (index < this.surveyList.length - 1) {
          var temp = this.surveyList[index];
          this.surveyList[index] = this.surveyList[index + 1];
          this.surveyList[index + 1] = temp;
          // 修改样式
          this.selectedIndex = index + 1;
          // console.log("this.selectedIndex",this.selectedIndex);
        }
      }
    },
    // 验证是否为数字
    validateNum(e, item) {
      console.log("e.target._value.trim()", isNaN(e.target._value.trim()));
      if (!/^\d+$/.test(e.target._value.trim())) {
        this.$Message.warning("请输入整数");
      }
    },
    // 验证等级名称长度是否超过6个字
    validateWidth(e) {
      console.log(
        "e.target._value.trim()",
        e.target._value.trim(),
        e.target._value.trim().length
      );
      if (e.target._value.trim().length > 6) {
        this.$Message.warning("等级名称长度不要超过6个字");
      }
    },
    // 获取等级列表
    getLevelList() {
      queryLevelList({ typeFlag: 1 }).then(res => {
        console.log("res", res);
        if (res.code == 200) {
          // this.surveyList = res.data
          if (Array.isArray(res.data)) {
            res.data.forEach((item, index) => {
              // this.surveyList.splice(index, 1, item)
              this.$set(this.surveyList, index, item);
            });
          }
        }
      });
    },
    // 保存修改等级
    onSaveLevelData() {
      console.log("this.surveyList", this.surveyList);
      var conditionArr = [];
      for (var item in this.surveyList) {
        // 如果有存在不是一整行都为空的行,报错
        if (
          !(
            (this.surveyList[item].levelName.length == 0 &&
              this.surveyList[item].conditionS.toString().length == 0 
              // &&
              // this.surveyList[item].score.toString().length == 0
              ) ||
            (this.surveyList[item].levelName.length > 0 &&
              this.surveyList[item].conditionS.toString().length > 0 
              // &&
              // this.surveyList[item].score.toString().length > 0
              )
          )
        ) {
          this.$Message.warning("请保证一整行都为空或都不为空");
          return;
        }
        // 如果等级名称长度超过六个字,报错
        if (this.surveyList[item].levelName.length > 6) {
          this.$Message.warning("等级名称长度不要超过6个字");
          return;
        }

        // 如果服务时长或积分奖励有非数字的,报错

        if (
          !/^\d*$/.test(this.surveyList[item].conditionS) 
          // ||
          // !/^\d*$/.test(this.surveyList[item].score
          // )
        ) {
          this.$Message.warning("达成条件或积分奖励应为数字");
          return;
        }
        // 如果conditionS不为空
        if (this.surveyList[item].conditionS.toString().length != 0) {
          conditionArr.push(parseInt(this.surveyList[item].conditionS));
        }
      }
      // console.log("走到这里conditionArr", conditionArr);
      // 判断conditionS不存在重复值
      let nary = conditionArr.slice().sort();
      // console.log("nary",nary)
      for (let i = 0; i < nary.length; i++) {
        // console.log("nary[i]==nary[i+1]",i,i+1,nary[i]==nary[i+1],nary[i],nary[i+1])
        if (nary[i] == nary[i + 1]) {
          this.$Message.warning("达成条件存在重复项");
          return;
        }
      }

      updateLevel({
        list: this.surveyList
      })
        .then(res => {
          // 'updateLevel', res
          if (res.code == 200) {
            this.$Message.success("保存成功");
          } else {
            this.$Message.warning("保存失败");
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
table {
  width: 100%;
  border: 1px solid #dcdee2;
}

th {
  height: 100%;
  width: 33.3%;
  padding: 8px 0;
  background-color: #f8f8f9;
  box-sizing: border-box;
  text-align: left;
  text-overflow: ellipsis;
  vertical-align: middle;
  border-bottom: 1px solid #e8eaec;
  border-right: 1px solid #e8eaec;
  text-align: center;
}

tr > td {
  background-color: #fff;
  transition: background-color 0.2s ease-in-out;
  min-width: 0;
  height: 48px;
  box-sizing: border-box;
  text-align: left;
  text-overflow: ellipsis;
  vertical-align: middle;
  border-bottom: 1px solid #e8eaec;
  border-right: 1px solid #e8eaec;
  text-align: center;
}

tr.active {
  td {
    background-color: #2db7f5;
  }
}

tr > td > input {
  text-align: center;
  margin: 0 10px 0 10px;
  // padding: 5px 0 5px 0;
  padding: 5px 5px 5px 5px;
  outline: none;
}

// tr > td > .inputText {
// width:120px;
// }

tr > td > .inputNum {
  width: 120px;
}

.contentBox {
  width: 100%;
  margin: 10px 0 10px 0;
  text-align: left;
}

.contentBoxFooter {
  width: 100%;
  margin: 10px 0 10px 0;
  text-align: center;
}

.leftBox {
  width: 50%;
  text-align: left;
  display: inline-block;
}
.leftBox > i {
  height: 26px;
  margin: auto 0;
}

.rightBox {
  width: 50%;
  text-align: right;
  display: inline-block;
}
.levelSet {
  border: 2px#ccc solid;
  background: #fff;
  padding: 5px 5px 5px 5px;
}
.SetBtn {
  margin: 10px 0 10px 0;
  padding: 10px;
  border: 2px#ccc solid;
  border-radius: 10px;
  background: #fff;
  margin: 0 10px 0 10px;
  outline: none;
  cursor: pointer;
}
</style>
