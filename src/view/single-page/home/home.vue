<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="6" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="评价情况分布"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow >
         <LessonTable style="height: 300px; overflow: scroll"/>
        </Card>
      </i-col>

    </Row>
    <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import LessonTable from './lesson_table'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example,
    LessonTable
  },
  data () {
    return {
      inforCardData: [
        { title: '在职督导', icon: 'md-person-add', count: 32, color: '#2d8cf0' },
        { title: '提交问卷', icon: 'md-locate', count: 12, color: '#19be6b' },
        { title: '待提交问卷', icon: 'md-help-circle', count: 32, color: '#ff9900' },
        { title: '关注课程总数', icon: 'md-share', count: 43, color: '#ed3f14' },
      ],
      pieData: [
        {value: 12, name: '总体好评'},
        {value: 32, name: '总体一般'},
      ],
      barData: {
        Mon: 1,
        Tue: 4,
        Wed: 4,
        Thu: 3,
        Fri: 6,
        Sat: 1,
        Sun: 4
      }
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
