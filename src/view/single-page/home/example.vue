<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
import {queryPagedata} from '../../../service/api/page_data'

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
          name: '人文社会科学学院',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
            color: '#2d8cf0'
          }},
          data: []
        },
        {
          name: '体育教学部',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
            color: '#10A6FF'
          }},
          data: []
        },
        {
          name: '信息学院',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
            color: '#0C17A6'
          }},
          data: []
        },
        {
          name: '园林学院',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
            color: '#5143A6'
          }},
          data: []
        },
        {
          name: '外语学院',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
              color: '#799BA6'
            }},
          data: []
        },
        {
          name: '工学院',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
              color: '#9B88A6'
            }},
          data: []
        },
        {
          name: '材料科学与技术学院',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
              color: '#7D86A6'
            }},
          data: []
        },
        {
          name: '林学院',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
              color: '#89A698'
            }},
          data: []
        },
        {
          name: '水土保持学院',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
              color: '#A6A488'
            }},
          data: []
        },
        {
          name: '环境科学与工程学院',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
              color: '#A68598'
            }},
          data: []
        },
        {
          name: '理学院',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
              color: '#A66172'
            }},
          data: []
        },
        {
          name: '生物科学与技术学院',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
              color: '#A66597'
            }},
          data: []
        },
        {
          name: '经济管理学院',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
              color: '#A69B44'
            }},
          data: []
        },
        {
          name: '自然保护区学院',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
              color: '#A66951'
            }},
          data: []
        },
        {
          name: '艺术设计学院',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
              color: '#24A67A'
            }},
          data: []
        },
        {
          name: '马克思主义学院',
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
      for(let i = 0;i<16;i++){
        option.series[i].data = resp.data.data['sys:form_num'][i];
      }
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
