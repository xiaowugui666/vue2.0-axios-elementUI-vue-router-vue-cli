<template>
  <div class="echarts-component">
    <div class="user-flow-chart">用户流量图</div>
    <el-select v-model="value" size="mini" class="select-time" @change="selectTime">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div id="myChart" :style="{height: '400px'}"></div>
  </div>
</template>

<script>
// 引入基本模板
import echarts from 'echarts/lib/echarts'
// 引入折线图组件
import 'echarts/lib/chart/line'
// 引入提示框和title组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

export default {
  data () {
    return {
      options: [{
        value: '1',
        label: '最近一周'
      }, {
        value: '2',
        label: '最近一月'
      }, {
        value: '3',
        label: '最近一年'
      }, {
        value: '4',
        label: '查看全部'
      }],
      value: '1'
    }
  },
  components: {
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    selectTime (val) {
      console.log(this.value)
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '' },
        tooltip: { trigger: 'axis' },
        legend: {
          data: ['浏览量', '访客数', '商品浏览量', '商品访客数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          // type: 'time',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisPointer: {
            lineStyle: {
              color: '#eee'
            }
          }
        },
        yAxis: { type: 'value' },
        series: [
          {
            name: '浏览量',
            type: 'line',
            // symbol: 'circle', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'emptyCircle'
            // symbolSize: '4',
            // hoverAnimation: false,
            data: [120, 132, 101, 134, 90, 230, 1010]
          },
          {
            name: '访客数',
            type: 'line',
            data: [220, 182, 191, 234, 290, 300, 510]
          },
          {
            name: '商品浏览量',
            type: 'line',
            data: [150, 232, 201, 154, 190, 240, 1410]
          },
          {
            name: '商品访客数',
            type: 'line',
            data: [320, 332, 301, 334, 390, 350, 320]
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="less">
  .echarts-component {
    background: #fff;
    padding-bottom: 20px;
  }
  .select-time {
    position: absolute;
    left: 71px;
    z-index: 11;
    width: 100px;
  }
  .user-flow-chart {
    padding: 20px 0 30px 20px;
    font-size: 14px;
    color: #333;
    &::before {
      content: '';
      display: block;
      float: left;
      margin-top: 3px;
      margin-right: 10px;
      width: 3px;
      height: 14px;
      background: #999;
    }
  }
</style>
<style>
  .el-select-dropdown__item {
    color: #333;
  }
  .el-input__inner {
    color: #333;
    border-color: #d5d5d5;
  }
</style>
