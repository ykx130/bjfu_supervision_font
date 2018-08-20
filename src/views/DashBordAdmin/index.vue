<template>
  <div>
    <h1>首页大图</h1>
    <Row :gutter="20" style="padding: 20px">
      <Col span="4" v-for="(infor,i) in inforCardData" :key="'infor-${i}'" style="height: 120px;">
        <Card :bordered="true" :color="infor.color">
          <p slot="title">{{infor.title}}</p>
          <countTo :endVal="infor.count"></countTo>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import countTo from 'vue-count-to'

  export default {
    components:{
      countTo
    },
    data() {
      return {
        inforCardData: [
          { title: '新增用户', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
          { title: '累计点击', icon: 'md-locate', count: 23432, color: '#19be6b' },
          { title: '新增问答', icon: 'md-help-circle', count: 142, color: '#ff9900' },
          { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
          { title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
          { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
        ],
      }
    }
    }
</script>

<style scoped>

</style>
