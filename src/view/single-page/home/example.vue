<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
import { queryPagedata } from '../../../service/api/page_data'

export default {
  name: 'serviceRequests',
  data () {
    return {
      dom: null,
      units: ['林学院', '水土保持学院', '生物科学与技术学院', '园林学院', '经济管理学院', '工学院',
        '理学院', '信息学院', '人文社会科学学院', '外语学院', '材料科学与技术学院',
        '自然保护区学院', '环境科学与工程学院', '艺术设计学院', '体育教学部', '马克思主义学院']
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    let option = {
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
          data: this.units,
          axisLabel: {
            interval: 0
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '提交数量',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {
            color: '#2d8cf0'
          } },
          data: []
        }
      ]
    }
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
    queryPagedata().then((resp) => {
      for (let u in this.units) {
        option.series[0].data = resp.data.data['sys:form_num'][this.units[u]]
      }
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
