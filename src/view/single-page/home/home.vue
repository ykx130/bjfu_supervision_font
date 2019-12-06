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
         <LessonTable style="height: 300px; overflow: hidden"/>
        </Card>
      </i-col>

    </Row>
    <Row>
      <Card shadow>
        <ChartBar style="height: 360px;" :value="barData" :text="'各学院评价情况'"/>
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
import {queryPagedata} from '../../../service/api/page_data'

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
        { title: '在职督导', icon: 'md-person-add', count: 0, color: '#2d8cf0' },
        { title: '提交评价表', icon: 'md-locate', count: 0, color: '#19be6b' },
        { title: '待提评价表', icon: 'md-help-circle', count: 0, color: '#ff9900' },
        { title: '关注课程总数', icon: 'md-share', count: 0, color: '#ed3f14' },
      ],
      pieData: [

      ],
      barData: {}
    }
  },
  mounted: function () {
    queryPagedata().then((resp) => {
      var formsumsort = Object.keys(resp.data.data['sys:form_num']).sort(function(a,b){ return resp.data.data['sys:form_num'][b]-resp.data.data['sys:form_num'][a]; });
      var form_sum={};
      for(var key in formsumsort){
        form_sum[formsumsort[key]]=resp.data.data['sys:form_num'][formsumsort[key]]
      }
      this.inforCardData[0].count = resp.data.data['sys:guider_num'];
      this.inforCardData[1].count = resp.data.data['sys:submitted_form'];
      this.inforCardData[2].count = resp.data.data['sys:wait_submitted_form'];
      this.inforCardData[3].count = resp.data.data['sys:notice_lesson_num'];
      this.barData =form_sum
      // this.barData = resp.data.data['sys:form_num']
      this.pieData= [{name:'总体一般', value: resp.data.data['sys:form_just_num']},
        {name:'总体好评', value: resp.data.data['sys:form_statisfy_num']},
        {name:'总体较差', value: resp.data.data['sys:form_unsatisfy_num']}]
    })
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
