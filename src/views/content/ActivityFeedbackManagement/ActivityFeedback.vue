<!--活动反馈-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con">
        <div class="title">
          活动反馈
        </div>
        <div v-for="(items, m) in feed" :key="m">
          <div v-for="(item, index) in items" :key="index">
            <div class="ls-item" v-if="index == 0">
              <div class="item-head left">{{ item.postName }}反馈简介</div>
              <div class="item-wap">{{ item.detailText }}</div>
            </div>
            <div class="ls-item" v-else-if="item.typeFlag == 9">
              <span class="left">是否上传图片</span>
              <span class="right">{{
                item.detailText == 1 ? "是" : "否"
              }}</span>
            </div>
            <div class="ls-item" v-else-if="item.typeFlag == 3">
              <span class="left">单选</span>
              <RadioGroup v-model="radioactive">
                <Radio
                  style="font-size: 14px;"
                  v-for="(key, index) in radiolist"
                  disabled
                  :label="key"
                  :key="index"
                ></Radio>
              </RadioGroup>
            </div>
            <div class="ls-item" v-else-if="item.typeFlag == 4">
              <span class="left">多选</span>
              <CheckboxGroup v-model="checkactive">
                <Checkbox
                  disabled
                  v-for="(key, index) in checklist"
                  :key="index"
                  :label="key"
                ></Checkbox>
              </CheckboxGroup>
            </div>
          </div>
        </div>
        <div style="display: flex;justify-content: center;">
          <a
            href="javascript:;"
            class="queryBtn"
            style="margin-top: 10px"
            @click="returnUrl"
            >确定</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "iview/src/components/button/button";
import { getFeedDetail } from "@/request/api";
export default {
  components: { Button },
  data() {
    return {
      navigation1: {
        head: "活动反馈"
      },
      activityId: null,
      isDisb: true,
      answer: ["aa", "ab", "ac", "ad", "ae", "af"],
      sub: ["A", "B", "C", "D", "E", "F"],
      feed: [],
      radioactive: "",
      checkactive: [],
      radiolist: [],
      checklist: []
    };
  },
  computed: {
    sign() {
      return (val, i) => {
        return this.answer.indexOf(i) > -1 && !!val;
      };
    },
    setVal() {
      return val => {
        return val.substr(-1, 1).toUpperCase();
      };
    }
  },
  created() {
    this.activityId = this.$route.query.activityId;
    this.getDetail();
  },
  methods: {
    returnUrl() {
      this.$router.push(
        {
          name: this.$route.query.formURL
        },
        1000
      );
    },
    getDetail() {
      getFeedDetail({ activityId: this.activityId }).then(res => {
        if (res.code == 200) {
          this.feed = res.data;
          let arr1 = [];
          let arr2 = [];
          if (res.data.length == 0) return;
          res.data[1].forEach(item => {
            if (item.typeFlag == 3) {
              // 单选
              this.answer.forEach(key => {
                if (item[key]) {
                  arr1.push(item[key]);
                }
              });
            }
            if (item.typeFlag == 4) {
              // 多选
              this.answer.forEach(key => {
                if (item[key]) {
                  arr2.push(item[key]);
                }
              });
            }
          });
          this.radiolist = arr1;
          this.checklist = arr2;
        } else {
          this.$Message.error(res.msg);
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.con {
  padding: 20px;
  width: 600px;
  margin: 0 auto;
  .title {
    font-size: 16px;
    font-weight: 800;
    text-align: center;
    padding: 10px;
  }
  .ls-item {
    display: flex;
    justify-content: flex-start;

    padding: 10px 0;
    p {
      margin-bottom: 10px;
    }
    .left {
      width: 120px;
      margin-right: 10px;
    }

    .item-head {
      padding: 10px 0;
    }
    .item-wap {
      flex: 1;
      padding: 10px;
      height: 100px;
      border: 1px solid rgba(193, 195, 195, 0.5);
      border-radius: 4px;
    }
  }
}
.content {
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
}
</style>
