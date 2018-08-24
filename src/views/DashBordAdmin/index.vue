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
        <Col span="12"><chart-one></chart-one></Col>
        <Col span="12"><chart-two></chart-two></Col>
      </Row>
      <Row :gutter="10" style="margin-top: 20px;">
        <Col span="12"><chart-three></chart-three></Col>
        <Col span="12"><my-table></my-table></Col>
      </Row>
    </div>
</template>

<script type="text/ecmascript-6">
  import countTo from 'vue-count-to'
  import chartOne from './components/chartOne'
  import chartTwo from './components/chartTwo'
  import chartThree from './components/chartThree'
  import myTable from './components/myTable'

  export default {
    name: "Dashboard",
    components: {
      countTo,
      chartOne,
      chartTwo,
      chartThree,
      myTable
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
        ]
      }
    }
  }
</script>

