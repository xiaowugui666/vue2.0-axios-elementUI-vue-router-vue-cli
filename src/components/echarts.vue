<template>
  <div class="echarts-component">
    <div class="user-flow-chart">用户流量图</div>
    <el-select v-model="value" size="mini" class="select-time" @change="tableDataChange">
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
import {tableData, endBegins} from '../axios/api'

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
        label: '最近三个月'
      }, {
        value: '4',
        label: '最近半年'
      }],
      value: '1',
      // options数据，获取表格数据参数
      endBeginData: {},
      // echarts表格数组
      mpaPv: [],
      mpaUv: [],
      goodsPv: [],
      date: []
    }
  },
  components: {
  },
  mounted () {
    endBegins().then(res => {
      this.endBeginData = res.data
      let begin = res.data.week.begin_at
      let end = res.data.week.end_at
      this.getTableData(begin, end, 1)
    })
  },
  methods: {
    // 获取表格数据,渲染表格
    getTableData (begin, end, type) {
      tableData({
        begin_at: begin,
        end_at: end,
        type: type
      }).then(res => {
        if (res.data.stat_mpa.length > 0) {
          // 浏览量 pv
          let tempArr = res.data.stat_mpa
          for (let i = 0, len = tempArr.length; i < len; i++) {
            let newArray = tempArr[i].begin_at.split(' ')
            this.date.push(newArray[0])
            this.mpaPv.push(tempArr[i].pv)
            this.mpaUv.push(tempArr[i].uv)
          }
        } else if (res.data.stat_goods.length > 0) {
          // 商品浏览量
          let tempArr = res.data.stat_goods
          for (let i = 0, len = tempArr.length; i < len; i++) {
            let newArray = tempArr[i].begin_at.split(' ')
            this.date.push(newArray[0])
            this.goodsPv.push(tempArr[i].pv)
          }
        }
        this.drawLine()
      })
    },
    // 选择框值改变
    tableDataChange (value) {
      this.date = []
      this.mpaPv = []
      this.mpaUv = []
      this.goodsPv = []
      endBegins().then(res => {
        if (value == 1) {
          this.endBeginData = res.data
          let begin = res.data.week.begin_at
          let end = res.data.week.end_at
          this.getTableData(begin, end, 1)
        } else if (value == 2) {
          this.endBeginData = res.data
          let begin = res.data.month.begin_at
          let end = res.data.month.end_at
          this.getTableData(begin, end, 1)
        } else if (value == 3) {
          this.endBeginData = res.data
          let begin = res.data.threeMonth.begin_at
          let end = res.data.year.end_at
          this.getTableData(begin, end, 2)
        } else if (value == 4) {
          this.endBeginData = res.data
          let begin = res.data.sixMonth.begin_at
          let end = res.data.sixMonth.end_at
          this.getTableData(begin, end, 2)
        }
      })
    },
    // echarts绘制图表
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '' },
        tooltip: { trigger: 'axis' },
        legend: {
          data: ['浏览量', '访客数', '商品浏览量']
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
          data: this.date,
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
            data: this.mpaPv
          },
          // {
          //   name: '访客数',
          //   type: 'line',
          //   data: this.mpaUv
          // },
          {
            name: '商品浏览量',
            type: 'line',
            data: this.goodsPv
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
    position: relative;
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
