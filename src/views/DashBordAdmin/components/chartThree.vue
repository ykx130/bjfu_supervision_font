<template>
  <Card shadow>
    <chart :options="ring" :style="{width: '500px', height: '300px'}"></chart>
  </Card>
</template>

<script>
    export default {
      name: "chartThree",
      data () {
        return {
          ring: {
            title: {
              text: '环形图',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a}<br/>{b}:{c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
              x: 'left',
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            series: [{
              name: '直接来源',
              type: 'pie',
              center: ['40%', '50%'],
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ],
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  testStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              }
            }]
          }
        }
      }
    }
</script>

