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
      </div> -->
      <div class="flex-center-start integral-body" v-if="Retract == true">
        <div class="flex-center-start">
          <span>名称:</span>
          <Input
            size="large"
            placeholder="兴趣爱好"
            class="inpt"
            v-model="search.dicName"
          />
        </div>
        <div class="flex-center-start">
          <span>有效状态:</span>
          <Select
            v-model="search.validFlag"
            style="width: 160px;margin-left:20px"
          >
            <Option
              v-for="item in typelist"
              :value="item.value"
              :key="item.value"
              >{{ item.name }}</Option
            >
          </Select>
        </div>
        <div class="flex-center-start">
          <span style="margin-right:20px">创建时间:</span>
           <DatePicker type="daterange" format="yyyy/MM/dd"  @on-change="handleChange" v-model="search.createTimestamp" confirm placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
        </div>
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
        createTimestamp: ""
      },
      Retract: true
    };
  },
  props: ["navigation1"],

  components: {},

  computed: {},

  created() {},

  methods: {

    handleChange(e) {
      let start = e[0];
      let end = e[1];
      if (start && end) {
        if (start === end) {
          start = start + " 00:00:00";
          end = end + " 23:59:59";
        } else {
          start = start + " 00:00:00";
          end = end + " 00:00:00";
        }
      }
       this.search.createTimestamp[0] = start;
       this.search.createTimestamp[1] = end;
    },

    //查询
    query() {
      this.$emit("query", this.search);
    },
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
.search{
  width: 110px;
  height: 32px;
  background: #FF565A;
  border-radius: 15px;
  text-align: center;
  line-height: 16px !important;
  color: white;
}
.integral-header .integral-center {
  margin: 0 20px;
}
.integral-header .integral-body {
  padding: 20px;
  background: #fff;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 200px;
  margin-left: 15px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 20px;
}
.sai {
  color: black;
}
</style>
