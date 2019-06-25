<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'StackedBar',
  props: {
    data: Object,
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
        let yAxisData = Object.keys(this.data)
        let seriesData = Object.values(this.data)
        let series = []
        let legends = Object.keys(this.data[yAxisData[0]])
        legends = legends.reverse()
        legends.forEach((element, index) => {
          let serie = {
            name: '',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            data: []
          }
          serie.name = element
          seriesData.forEach(single_arra => {
            serie.data.push(parseFloat(single_arra[element].toFixed(3)))
          })
          series.push(serie)
        })
        let option = {
          title: {
            text: this.text,
            subtext: this.subtext,
            x: 'center'
          },
          legend: {
            data: this.legends
          },
          yAxis: {
            type: 'category',
            data: yAxisData
          },
          xAxis: {
            type: 'value'
          },
          series: series
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
      let yAxisData = Object.keys(this.data)
      let seriesData = Object.values(this.data)
      let series = []
      let legends = Object.keys(this.data[yAxisData[0]])
      legends = legends.reverse()
      legends.forEach((element, index) => {
        let serie = {
          name: '',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: []
        }
        serie.name = element
        seriesData.forEach(single_arra => {
          serie.data.push(parseFloat(single_arra[element].toFixed(3)))
        })
        series.push(serie)
      })
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        legend: {
          data: this.legends
        },
        yAxis: {
          type: 'category',
          data: yAxisData
        },
        xAxis: {
          type: 'value'
        },
        series: series
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
