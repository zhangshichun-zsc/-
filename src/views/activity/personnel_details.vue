<!--活动人员明细（会员）-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="head">
      <p>5.12"行走在夏日"游园活动</p>
      <span>未开始</span>
    </div>
    <div class="content">
      <ul>
        <li>
          <p>报名</p>
          <table>
            <tr>
              <th>姓名</th>
              <th>手机号码</th>
              <th>报名类型</th>
              <th>报名时间</th>
              <th>报名状态</th>
              <th>几人陪同</th>
              <th>几人乘车</th>
            </tr>
            <tr>
              <td>5</td>
              <td>100</td>
              <td>7</td>
              <td>50</td>
              <td>100</td>
              <td>7</td>
              <td>50</td>
            </tr>
          </table>
        </li>
        <li>
          <p>培训</p>
          <table>
            <tr>
              <th>培训状态</th>
              <th>确认时间</th>
              <th>操作</th>
            </tr>
            <tr>
              <td>100</td>
              <td>7</td>
              <td>50</td>
            </tr>
          </table>
        </li>
        <li>
          <p>签到</p>
          <table>
            <tr>
              <th>签到状态</th>
              <th>签到时间</th>
              <th>签到地点</th>
            </tr>
            <tr>
              <td>100</td>
              <td>7</td>
              <td>50</td>
            </tr>
          </table>
        </li>
        <li>
          <p>反馈</p>
          <table>
            <tr>
              <th>反馈状态</th>
              <th>提交时间</th>
              <th>操作</th>
            </tr>
            <tr>

              <td>100</td>
              <td>7</td>
              <td>50</td>
            </tr>
          </table>
        </li>
        <li>
          <p>匹配关系</p>
          <table>
            <tr>
              <th>匹配人员</th>
              <th>手机号码</th>
              <th>操作</th>
            </tr>
            <tr>
              <td>100</td>
              <td>7</td>
              <td>50</td>
            </tr>
          </table>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      navigation1: {
        head: "活动人员明细(会员)"
      }
    };
  },

  components: {  },

  computed: {},

  created() {},

  methods: {}
};
</script>
<style lang="scss" scoped>
.head {
  height: 70px;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  align-items: flex-start;
  margin-bottom: 20px;
  p {
    margin: 5px 0px;
    font-size: 20px;
    height: 20px;
  }
}
.content {
  padding-left: 40px;
  li{
    margin: 20px 0;
  }
  table {
    border: 1px solid #e4e4e4;
    td,
    th {
      height: 30px;
      border: 1px solid #e4e4e4;
      text-align: center;
      line-height: 30px;
      width: 120px;
    }
    th {
      // font-weight: 700;
      background: #e4e4e4;
    }
    td {
      background: #ffffff;
    }
    // background: #cccccc;
    height: 60px;
  }
}
</style>
