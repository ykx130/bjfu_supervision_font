<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'BarLandscape',
  props: {
    value: Object,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null
    }
  },
  watch: {
    value: {
      deep: true,
      handler: function () {
        let yAxisData = Object.keys(this.value)
        let seriesData = Object.values(this.value)
        let option = {
          title: {
            text: this.text,
            subtext: this.subtext,
            x: 'center'
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: yAxisData,
            splitLine: {
              show: false
            }
          },
          series: [{
            data: seriesData,
            type: 'bar'
          }],
          color: ['#5b9bd5', '#ed7d31', '#a5a5a5', '#ffc000', '#ff0000']
        }
        this.dom.setOption(option)
      }
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    this.$nextTick(() => {
      let yAxisData = Object.keys(this.value)
      let seriesData = Object.values(this.value)
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        grid: {
          left: 100
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: yAxisData,
          splitLine: {
            show: false
          }
        },
        series: [{
          data: seriesData,
          type: 'bar',
          barWidth: 10,
          barGap: '200%'
        }],
        color: ['#5b9bd5', '#ed7d31', '#a5a5a5', '#ffc000', '#ff0000']
      }
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
