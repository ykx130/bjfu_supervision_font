<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
  import echarts from 'echarts'
  import tdTheme from './theme.json'
  import { on, off } from '@/libs/tools'
  import 'echarts-wordcloud';
  echarts.registerTheme('tdTheme', tdTheme)
  export default {
    name: 'ChartBar',
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
    methods: {
      resize () {
        this.dom.resize()
      }
    },
    mounted () {
      this.$nextTick(() => {
        let data = this.value.map((item)=>{
          return  {
            name: item.word,
            value: item.num
          }
        })
        let option = {
          title: {
            text: this.text,
            subtext: this.subtext,
            x: 'center'
          },
          series: [
            {
              type: 'wordCloud',
              gridSize: 2,
              sizeRange: [12, 50],
              rotationRange: [-90, 90],
              shape: 'circle',
              textStyle: {
                normal: {
                  color: function () {
                    return 'rgb(' + [
                      Math.round(Math.random() * 255),
                      Math.round(Math.random() * 255),
                      Math.round(Math.random() * 255)
                    ].join(',') + ')';
                  }
                },
                emphasis: {
                  shadowBlur: 10,
                  shadowColor: '#333'
                }
              },
              data: data
            }
          ]
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
