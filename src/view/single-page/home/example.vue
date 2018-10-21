<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'serviceRequests',
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        top: '3%',
        left: '1.2%',
        right: '1%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '园林学院',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
            color: '#2d8cf0'
          }},
          data: [12, 13, 11, 13, 9, 23, 20]
        },
        {
          name: '信息学院',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
            color: '#10A6FF'
          }},
          data: [27, 38, 28, 24, 90, 30, 30]
        },
        {
          name: '材料学院',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
            color: '#0C17A6'
          }},
          data: [39, 28, 34, 29, 30, 48, 38]
        },
        {
          name: '外语学院',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
            color: '#4608A6'
          }},
          data: [30, 32, 31, 34, 30, 30, 30]
        },
        {
          name: '林学院',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: {normal: {
            color: '#398DBF'
          }},
          data: [80, 65, 56, 75, 82, 24, 58]
        }
      ]
    }
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
