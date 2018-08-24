<template>
    <div>
      <Row :gutter="20">
        <Col span="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;">
          <Card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
            <p slot="title">{{infor.title}}</p>
            <countTo :endVal="infor.count"></countTo>
          </Card>
        </Col>
      </Row>
      <Row :gutter="10" style="margin-top: 20px;">
        <Col span="12">
          <Card shadow>
            <div class="chart" ref="chartOne" :style="{width: '500px', height: '300px'}"></div>
          </Card>
        </Col>
        <Col span="12">
          <Card shadow>
            <div class="chart" ref="chartTwo" :style="{width: '500px', height: '300px'}"></div>
          </Card>
        </Col>
      </Row>
      <Row :gutter="10" style="margin-top: 20px;">
        <Col span="12">
          <Card shadow>
            <div class="chart" ref="chartThree" :style="{width: '500px', height: '300px'}"></div>
          </Card>
        </Col>
        <Col span="12">
          <Card shadow>
            <Table stripe :columns="column" :data="person"></Table>
          </Card>
        </Col>
      </Row>
    </div>
</template>

<script type="text/ecmascript-6">
  import countTo from 'vue-count-to'

  let echarts = require('echarts/lib/echarts');
  require('echarts/lib/chart/bar');
  require('echarts/lib/chart/pie');
  require('echarts/lib/chart/line');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');


  export default {
    name: "Dashboard",
    components: {
      countTo
    },
    data() {
          return {
            inforCardData: [
              {title: '新增用户', icon: 'md-person-add', count: 803, color: '#2d8cf0'},
              {title: '累计点击', icon: 'md-locate', count: 23432, color: '#19be6b'},
              {title: '新增问答', icon: 'md-help-circle', count: 142, color: '#ff9900'},
              {title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14'},
              {title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB'},
              {title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4'}
            ],
            column: [
              {
                title: 'Name',
                key: 'name'
              },
              {
                title: 'Age',
                key: 'age'
              },
              {
                title: 'Address',
                key: 'address'
              }
            ],

            person: [
              {
                name: 'John Brown',
                age: 18,
                address: 'New York No. 1 Lake Park',
                date: '2016-10-03'
              },
              {
                name: 'Jim Green',
                age: 24,
                address: 'London No. 1 Lake Park',
                date: '2016-10-01'
              },
              {
                name: 'Joe Black',
                age: 30,
                address: 'Sydney No. 1 Lake Park',
                date: '2016-10-02'
              },
              {
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park',
                date: '2016-10-04'
              }
            ],

            bar: {
              title: {
                text: '柱状图',
                x: 'center'
              },
              tooltip: {},
              xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
              },
              yAxis: {},
              series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
              }]
            },

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
            },

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
        },
        mounted() {
          this.createChartOne();
          this.createChartTwo();
          this.createChartThree()
        },
        methods: {
          createChartOne() {
            let chartOne = echarts.init(this.$refs.chartOne);
            chartOne.setOption(this.bar)
          },
          createChartTwo() {
            let chartTwo = echarts.init(this.$refs.chartTwo);
            chartTwo.setOption(this.line)
          },
          createChartThree() {
            let chartThree = echarts.init(this.$refs.chartThree);
            chartThree.setOption(this.ring)
          }
        }
      }
</script>

