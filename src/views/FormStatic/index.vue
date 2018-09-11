<template>
  <div>
    <div v-for="option in options" style="float: left">
      <chart :options="option" :style="{width: '500px', height: '300px'}"></chart>
    </div>
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
          options: [],
          data: []
        }
      },
      mounted() {
        getGraph().then((resp) => {
          this.data = resp.data.item_map;
          this.options = this.data.map(function (item) {
            let graphItem = {
              title: {
                text: '',
                x: 'center'
              },
              color: '#4cabce',
              tooltip: {},
              xAxis: {
                data: []
              },
              yAxis: {},
              series: [{
                name: '人数',
                type: 'bar',
                data: []
              }]
            };
            graphItem.title.text = item.item_name;
            for (var index in item.point)
            {
              graphItem.xAxis.data.push(item.point[index].option.value);
              graphItem.series[0].data.push(item.point[index].num);
            }
            return graphItem;
            });
        });
      }
    }
</script>

<style scoped>

</style>
