<!-- 受益家长统计(会员)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="head flex-center-start">
        <p>
          <span>受益家长统计报表</span>
        </p>
        <div class="but">
          <Button>导出数据</Button>
          <Button>下载图表</Button>
          <DatePicker type="daterange" split-panels placeholder="Select date" style="width: 200px"></DatePicker>
        </div>
      </div>
      <div class="data">
        <div class="data-content">
          <div class="data-left">
            <div class="ss">
              <Input size="large" placeholder="搜索受益人" style="margin-right: 5px" />
              <Button>搜索</Button>
            </div>
            <div class="personnel">
              <p>
                <span>共105人</span>
              </p>
              <ul>
                <li>王强</li>
                <li>张青青</li>
                <li>郭晓晓</li>
                <li>朱星杰</li>
                <li>蔡蔡</li>
                <li>李丽</li>
              </ul>
            </div>
          </div>
          <div class="data-right">
            <div class="tj">
              <p>
                <span>活动参与次数</span>&nbsp;
                <span>53</span>
              </p>
              <p>
                <span>|</span>
              </p>
              <p>
                <span>活动类型</span>&nbsp;
                <span>6</span>
              </p>
            </div>
            <div class="chart">
              <div class="chart-statistical">
                <h2>参与活动次数统计</h2>
                <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
                <div id="main" style="width: 600px;height:400px;"></div>
              </div>
              <div class="chart-type">
                <h2>活动参与类型分布</h2>
                <div id="main1" style="width: 600px;height:400px;"></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
//1、导入 echarts
import echarts from 'echarts'
export default {
  data() {
    return {
      navigation1: {
        head: '受益家长统计(会员)'
      }
    }
  },
  // 此时页面上的元素以及渲染完毕
  mounted() {
    // 3 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    var myChart1 = echarts.init(document.getElementById('main1'))
    //4 准备数据和配置项
    // 指定图表的配置项和数据
    var option = {
      tooltip: {
        trigger: 'axis'
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ]
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: '{value} '
          }
        }
      ],
      series: [
        {
          name: '人数',
          type: 'line',
          data: [60, 80, 45, 10, 20, 50, 55, 20, 50, 30, 0, 0],
          markPoint: {
            data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]
          },
          markLine: {
            data: [{ type: 'average', name: '平均值' }]
          }
        }
      ]
    }
    var option1 = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        data: ['快乐活动营', '老友陪伴', '自倡导', '趾印计划', '智库', '家长赋能']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          data: [
            { value: 235, name: '快乐活动营' },
            { value: 274, name: '老友陪伴' },
            { value: 310, name: '自倡导' },
            { value: 335, name: '趾印计划' },
            { value: 400, name: '智库' },
            { value: 240, name: '家长赋能' }
          ]
        }
      ]
    }
    //5、展示数据
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
    myChart1.setOption(option1)
  }
}
</script>

<style scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
}
.content {
  border: 1px solid #e4e4e4;
  margin: 10px;
}
.head {
  background-color: #f3f3f3;
  justify-content: space-between;
  padding: 5px 20px;
}
.but button {
  margin-right: 5px;
}
.data {
  padding: 10px 20px;
}
.data-content {
  display: flex;
  justify-content: space-between;
}
.data-left {
  background-color: #f2f2f2;
  width: 25%;
}
.ss {
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  justify-content: space-between;
  padding: 5px;
}
.data-right {
  width: 74%;
}
.tj {
  width: 100%;
  border-radius: 5px;
  background-color: #c7f7ed;
  color: #138c74;
  font-size: 14px;
  font-weight: 700;
  padding: 20px 10px;
  display: flex;
  justify-content: space-around;
}
.tj {
  margin-bottom: 20px;
}
.tj p {
  padding: 0 15px;
}
.personnel {
  display: flow;
}
.personnel p {
  margin-bottom: 10px;
}
.personnel p span {
  float: right;
}
.personnel p,
.personnel li {
  padding: 10px 15px;
}
.personnel li {
  width: 100%;
}
.personnel li:hover {
  background-color: #c7f7ed;
  transition: all 0.2s;
}
.chart h2 {
  font-weight: 700;
  margin-bottom: 10px;
}
</style>
