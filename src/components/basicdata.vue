<!-- 基础资料(共用) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <!-- <div class="flex-center-between integral-top">
        <div>
          <span>筛选查询</span>
        </div>
        <div class="flex-center-end">
          <div class="integral-center" @click="Retractbtn">
            <Icon type="ios-arrow-down" v-if="Retract == true" />
            <Icon type="ios-arrow-up" v-if="Retract == false" />
            <span v-if="Retract == true">
              <a class="sai">收起筛选</a>
            </span>
            <span v-if="Retract == false">
              <a class="sai">启用筛选</a>
            </span>
          </div>
        </div>
      </div>-->
      <div class="flex-center-start integral-body" v-if="Retract == true">
        <div class="flex-center-start">
          <span>名称:</span>
          <Input size="large" placeholder="请输入名称" class="inpt" v-model="search.dicName" />
        </div>
        <div class="flex-center-start">
          <span>有效状态:</span>
          <Select v-model="search.validFlag" class="inpt" >
            <Option v-for="item in typelist" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="flex-center-start">
          <span>创建时间/时间段:</span>
          <DatePicker
           class="inpt"
            style="width: 180px"
            :options="set"
            type="date"
            @on-change="startTimeChange"
            placeholder="请选择开始时间"
            v-model="search.createTimestamp[0]"
          ></DatePicker>
          <span class="po">~</span>
          <DatePicker
            style="width: 180px"
            :options="end"
            type="date"
            @on-change="endTimeChange"
            placeholder="请选择结束时间"
            v-model="search.createTimestamp[1]"
          ></DatePicker>
        </div>
        <!-- <div class="flex-center-start">
          <span style="margin-right:20px">创建时间:</span>
           <DatePicker type="daterange" format="yyyy/MM/dd"  @on-change="handleChange" v-model="search.createTimestamp" confirm placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
        </div>-->
        <div class="flex-center-start">
          <Button class="search" @click="query">查询</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typelist: [
        {
          value: "",
          name: "全部"
        },
        {
          value: "1",
          name: "有效"
        },
        {
          value: "0",
          name: "无效"
        }
      ],
      search: {
        dicName: "",
        validFlag: "",
        createTimestamp: ["", ""]
      },
      Retract: true,
      set: {},
      end: {}
    };
  },
  props: ["navigation1"],

  components: {},

  computed: {},

  created() {},

  methods: {
    startTimeChange(e) {
      this.search.createTimestamp[0] = e;
      // if(this.search.createTimestamp[1]==''){
      //   return
      // }
      // this.end = {
      //   disabledDate: date => {
      //     let startTime =
      //       this.search.createTimestamp[0] != ""
      //         ? new Date(this.search.createTimestamp[0]).valueOf() -
      //           1 * 24 * 60 * 60 * 1000
      //         : "";
      //     // console.log(startTime)
      //     return date && date.valueOf() < startTime;
      //   }
      // };
      console.log(e);
    },

    endTimeChange(e) {
      this.search.createTimestamp[1] = e;
      // let endTime =
      //   this.search.createTimestamp[1] != ""
      //     ? new Date(this.search.createTimestamp[1]).valueOf()
      //     : "";
      // this.set = {
      //   disabledDate(date) {
      //     return date && date.valueOf() > endTime;
      //   }
      // };
      console.log(e);
    },


    //查询
    query() {
      if (this.search.createTimestamp[0] && this.search.createTimestamp[1]) {
        if (this.search.createTimestamp[0] < this.search.createTimestamp[1]) {
          this.search.createTimestamp[0] =
            this.search.createTimestamp[0] + " 00:00:00";
          this.search.createTimestamp[1] =
            this.search.createTimestamp[1] + " 23:59:59";
        } else {
          this.search.createTimestamp=["", ""]
          this.$Message.error('时间选择错误请重新选择')
        }
      }
      console.log(this.search);
      this.$emit("query", this.search);
    }
    // //收起筛选
    // Retractbtn() {
    //   this.Retract = !this.Retract;
    //   console.log(11);
    // }
  }
};
</script>
<style lang="scss" scoped>
.integral-header .integral-top {
  padding: 15px 20px;
  background: white;
}
.search {
  width: 110px;
  height: 32px;
  background: #ff565a;
  border-radius: 15px;
  text-align: center;
  line-height: 16px !important;
  color: white;
}
.integral-header .integral-center {
  margin: 0 20px;
}
.integral-header .integral-body {
  padding: 30px;
  background: #fff;
  // padding-top: 40px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 200px;
  margin-left: 10px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 20px;
}
.sai {
  color: black;
}
.po{
  padding:0 10px;
}
</style>
