<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'BarPortrait',
  props: {
    value: Array,
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
        let xAxisData = []
        let seriesData = []
        this.value.map((item) => {
          xAxisData.push(item.name)
          seriesData.push(item.value)
        })
        let option = {
          title: {
            text: this.text,
            subtext: this.subtext,
            x: 'center'
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            min: 85,
            max: 100,
            interval: 5
          },
          series: [{
            data: seriesData,
            type: 'bar',
            barWidth: 40

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
      let xAxisData = []
      let seriesData = []
      this.value.map((item) => {
        xAxisData.push(item.name)
        seriesData.push(item.value)
      })
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          min: 85,
          max: 100,
          interval: 5
        },
        series: [{
          data: seriesData,
          type: 'bar',
          barWidth: 40
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
