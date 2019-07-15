<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'StackedBarPortrait',
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
        let xAxisData = Object.keys(this.data)
        let seriesData = Object.values(this.data)
        let series = []
        let legends = Object.keys(this.data[xAxisData[0]])
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
            serie.data.push(single_arra[element])
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
          xAxis: {
            type: 'category',
            data: xAxisData,
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value'
          },
          series: series,
          color: ['#5b9bd5', '#ed7d31', '#a5a5a5', '#ffc000', '#ff0000'],
          textStyle: {
            color: '#fff'
          }
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
      let xAxisData = Object.keys(this.data)
      let seriesData = Object.values(this.data)
      let series = []
      let legends = Object.keys(this.data[xAxisData[0]])
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
          serie.data.push(single_arra[element])
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
        xAxis: {
          type: 'category',
          data: xAxisData,
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value'
        },
        series: series,
        color: ['#5b9bd5', '#ed7d31', '#a5a5a5', '#ffc000', '#ff0000'],
        textStyle: {
          color: '#fff'
        }
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
