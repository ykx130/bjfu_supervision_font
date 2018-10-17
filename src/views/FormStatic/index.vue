<template>
  <Card>

  <Row>
    <Col span="24" v-for="option in options">
        <div align="center">
          <p slot="title">
            <Icon type="ios-analytics-outline" />
            {{ option.title.text }}
          </p>
          <chart :options="option" :style="{width: '560px', height: '300px', marginLeft: '20px'}"></chart>
        </div>
    </Col>
  </Row>
  </Card>

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
                show: false
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
