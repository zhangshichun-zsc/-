<!--系统信息-->
<template>
  <div class="less">
    <Navigation :labels="navigation1"></Navigation>
    <p class="xt-xx">系统信息</p>
    <div class="xt-nr">
      <table>
        <tr>
          <th>服务器操作系统：</th>
          <td></td>
          <th>Web服务器：</th>
          <td></td>
        </tr>
        <tr>
          <th>PHP版本:</th>
          <td></td>
          <th>MySQL版本：</th>
          <td></td>
        </tr>
        <tr>
          <th>安全模式:</th>
          <td></td>
          <th>安全模式GID：</th>
          <td></td>
        </tr>
        <tr>
          <th>Socket支持：</th>
          <td></td>
          <th>时区设置：</th>
          <td></td>
        </tr>
         <tr>
          <th>GD版本：</th>
          <td></td>
          <th>Zlib支持：</th>
          <td></td>
        </tr>
        <tr>
          <th>IP库版本：</th>
          <td></td>
          <th>文件上传的最大大小：</th>
          <td></td>
        </tr>
        <tr>
          <th>程序版本：</th>
          <td></td>
          <th>安装日期：</th>
          <td></td>
        </tr>
        <tr>
          <th>编码：</th>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigation1: {
        head: "系统信息"
      },

    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {}
};
</script>
<style lang="scss" scoped>
.xt-xx {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  background: #f3f3f3;
  border: #e4e4e4 solid 1px;
  margin-top: 20px;
}
.xt-nr {
  height: 400px;
  background: #ffffff;
  border-bottom: #e4e4e4 solid 1px;
  display: flex;
  justify-content: center;
  padding-top: 30px;
  table {
    border: 1px solid #e4e4e4;
    td{
      width: 200px;
       height: 40px;
      border: 1px solid #e4e4e4;
      text-align: center;
      line-height: 40px;
    }
    th {
      width: 300px;
      height: 40px;
      border: 1px solid #e4e4e4;
      text-align:left;
      line-height: 40px;
      padding-left: 30px;
    }
    td {
      background: #ffffff;
      padding-left: 30px;
      text-align: left;
    }
    // background: #cccccc;
    // height: 200px;
    // width: 800px;
  }
}

</style>
