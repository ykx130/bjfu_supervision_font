<template>
  <Card shadow>
    <chart :options="line" :style="{width: '500px', height: '300px'}"></chart>
  </Card>
</template>

<script>
    export default {
      name: "chartTwo",
      data () {
        return {
          line: {
            title: {
              text: '折线图',
              x: 'center'
            },
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
            series: [{
              name: '银行/证券',
              type: 'line',
              stack: '总量',
              data: [257, 358, 278, 234, 290, 330, 310]
            }]
          }
        }
      }
    }
</script>

