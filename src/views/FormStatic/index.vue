<template>
  <div>
    <h1>问卷数据统计</h1>
      <div id='0' style="float:left;" :style="{width: '360px', height: '300px'}"></div>
      <div id='1' style="float:left;" :style="{width: '360px', height: '300px'}"></div>
  </div>
</template>
<script>
    import echarts from 'echarts'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/component/tooltip'
    import { getGraph } from '../../service/api/dqs'
    export default {
      data() {
        return {
        }
      },
      mounted() {
        getGraph().then((resp) => {
          this.data = resp.data.item_map;
          for (var index in this.data) {
            this.drawBar(this.data[index], index);
          }
        });
      },
      methods: {
        drawBar(item, divID) {
          let myChart = echarts.init(document.getElementById(divID));
          var xdata = [];
          var ydata = [];
          for (var index in item.point) {
            xdata.push(item.point[index].option.value);
            ydata.push(item.point[index].num);
          }
          myChart.setOption({
            title: {text: item.item_name},
            color: '#4cabce',
            tooltip: {},
            xAxis: {
              type: 'category',
              data: xdata
            },
            yAxis: {
              type: 'value',
            },
            series: [{
              name: '人数',
              type: 'bar',
              data: ydata
            }]
          });
        }
      }
    }
</script>

<style scoped>

</style>
