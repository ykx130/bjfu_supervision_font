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
            data: yAxisData
          },
          series: [{
            data: seriesData,
            type: 'bar'
          }]
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
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: yAxisData
        },
        series: [{
          data: seriesData,
          type: 'bar'
        }]
      }
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
