<!-- 区域设置(共用) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <span>区域设置</span>
        </div>
        <div class="flex-center-end">
          <Button>恢复默认设置</Button>
        </div>
      </div>
    </div>
    <div class="integral-table">
        <v-distpicker type="mobile" :placeholders="placeholders"></v-distpicker>
        <Button type="success" class="btn">保存</Button>
        <Button class="btn">取消</Button>
    </div>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
export default {
  data() {
    return {
         placeholders: {
              province: '省/自治区/直辖市',
              city: '地级市',
              area: '市辖区/县/县级市'
          },
        navigation1: {
        head: "区域设置(共用)"
      },
      data: [
     
      ]
    };
  },

  components: {
      VDistpicker
  },

  computed: {},

  created() {},

  methods: {
  }
};
</script>
<style lang="scss" scoped>
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  padding: 15px 20px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
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
.integral-table {
  margin-top: 30px;
}
.integral-table .btn{
    margin: 10px;
}
.table-header {
  padding: 5px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}


</style>
