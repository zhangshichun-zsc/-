<!--志愿者服务统计(共用)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="head flex-center-start">
        <p>
          <span>志愿者服务统计报表</span>
        </p>
        <div class="flex-center-between">
          <Input placeholder="按志愿者团队搜索" clearable style="width: 200px;margin-right:5px;" />
          <DatePicker type="daterange" split-panels placeholder="Select date" style="width: 200px"></DatePicker>
        </div>
      </div>
      <div class="data">
        <div class="data-content">
          <div class="tj">
            <p>
              <span>总服务时长</span>&nbsp;
              <span>2150小时</span>
            </p>
            <p>
              <span>总活动次数</span>&nbsp;
              <span>62次</span>
            </p>
            <p>
              <span>总志愿人次</span>&nbsp;
              <span>207次</span>
            </p>
            <p>
              <span>总收益人次</span>&nbsp;
              <span>183次</span>
            </p>
          </div>
          <div class="WaveChart">
            <h2 style="width:300px;">活动评率波线图</h2>
            <Tabs size="small">
              <TabPane label="活动数">
                <div id="main" style="width: 600px;height:400px;"></div>
              </TabPane>
              <TabPane label="志愿者人数">
                <div id="main1" style="width: 600px;height:400px;"></div>
              </TabPane>
              <TabPane label="受益人数">
                <div id="main2" style="width: 600px;height:400px;"></div>
              </TabPane>
            </Tabs>
          </div>
          <div class="table">
            <div class="table-type">
              <h2>志愿者活动类型</h2>
              <Table border :columns="ColumnsType" :data="DataType"></Table>
            </div>
            <div class="table-length">
              <h2>志愿者服务时长</h2>
              <Table border :columns="ColumnsLength" :data="DataLength"></Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      navigation1: {
        head: '志愿者服务统计(共用)'
      },
      DataType: [
        // {
        //   Ranking:'1',
        //   Type:'快乐活动营',
        // },
        // {
        //   Ranking:'2',
        //   Type:'家长赋能',
        // },
        // {
        //   Ranking:'3',
        //   Type:'支持性就业',
        // },
        // {
        //   Ranking:'4',
        //   Type:'趾印计划',
        // },
        // {
        //   Ranking:'5',
        //   Type:'招募实习生',
        // },
        // {
        //   Ranking:'6',
        //   Type:'老友陪伴',
        // },
        // {
        //   Ranking:'7',
        //   Type:'自倡导',
        // },
      ],
      ColumnsType: [
        {
          title: '排名',
          key: 'Ranking',
          align: 'center'
        },
        {
          title: '活动类型',
          key: 'Type',
          align: 'center'
        },
        {
          title: '活动次数',
          key: 'Number',
          align: 'center',
          render: (h, params) => {
            return h('div', '1000')
          }
        },
        {
          title: '百分比',
          key: 'Absolutely',
          align: 'center',
          render: (h, params) => {
            return h('div', '10%')
          }
        },
        {
          title: '志愿者人次',
          key: 'VolunteersNumber',
          align: 'center',
          render: (h, params) => {
            return h('div', '1000')
          }
        }
      ],
      DataLength: [],
      ColumnsLength: [
        {
          title: '排名',
          key: 'Ranking',
          align: 'center'
        },
        {
          title: '志愿者姓名',
          key: 'VolunteersName',
          align: 'center',
          width: '120px'
        },
        {
          title: '活动次数',
          key: 'Number',
          align: 'center',
          render: (h, params) => {
            return h('div', '1000')
          }
        },
        {
          title: '服务时长',
          key: 'ServiceTime',
          align: 'center',
          render: (h, params) => {
            return h('div', '1000')
          }
        }
      ]
    }
  },
  mounted() {
    var myChart = echarts.init(document.getElementById('main'))
    var myChart1 = echarts.init(document.getElementById('main1'))
    var myChart2 = echarts.init(document.getElementById('main2'))
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
          data: [40, 30, 50, 10, 20, 40, 10, 20, 25, 30, 0, 0],
          markPoint: {
            data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]
          }
        }
      ]
    }
    var option1 = {
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
          data: [40, 30, 50, 10, 20, 40, 10, 20, 25, 30, 0, 0],
          markPoint: {
            data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]
          }
        }
      ]
    }
    var option2 = {
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
          data: [40, 30, 50, 10, 20, 40, 10, 20, 25, 30, 0, 0],
          markPoint: {
            data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]
          }
        }
      ]
    }
    myChart.setOption(option)
    myChart1.setOption(option1)
    myChart2.setOption(option2)
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
.data {
  padding: 10px 20px;
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
  justify-content: flex-start;
}
.tj {
  margin-bottom: 20px;
}
.tj p {
  padding: 0 50px;
}
.tj p:nth-child(1n + 2) {
  border-left: 1px solid #18bb9b;
}
h2 {
  font-weight: 700;
  margin-bottom: 10px;
}
.WaveChart {
  display: flex;
}
.WaveChart,
.table {
  padding: 20px;
}
.table {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
.table-type {
  width: 55%;
}
.table-length {
  width: 40%;
}
</style>
