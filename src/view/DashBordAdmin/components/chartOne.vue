<template>
  <Card shadow>
    <chart :options="bar" :style="{width: '500px', height: '300px'}"></chart>
  </Card>
</template>

<script>
export default {
  name: 'chartOne',
  data () {
    return {
      bar: {
        title: {
          text: '柱状图',
          x: 'center'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }
  }
}
</script>
