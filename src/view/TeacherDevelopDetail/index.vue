<template>
  <Card>
    <h1>教师教学发展详情</h1>
    <br>
    <Tabs @on-click="onTypeTabClick">
      <TabPane label="教师教学研修" name="教师教学研修"></TabPane>
      <TabPane label="教师教学发展比赛" name="教师教学发展比赛"></TabPane>
      <TabPane label="教师教学发展交流" name="教师教学发展交流"></TabPane>
      <TabPane label="教师教学发展研究" name="教师教学发展研究"></TabPane>
      <TabPane label="教师教学发展项目" name="教师教学发展项目"></TabPane>
    </Tabs>

    <template v-if="select_tag==='教师教学研修'">
      <TrainActivityTable></TrainActivityTable>
    </template>
    <template v-else-if="select_tag==='教师教学发展比赛'">
      <CompetitionTable></CompetitionTable>
    </template>
    <template v-else-if="select_tag==='教师教学发展交流'">
      <DevelopmentExchangeTable></DevelopmentExchangeTable>
    </template>
    <template v-else-if="select_tag==='教师教学发展研究'">
      <ResearchTable></ResearchTable>
    </template>
    <template v-else-if="select_tag==='教师教学发展项目'">
      <ProjectTable></ProjectTable>
    </template>

<!--    <Tabs type="line" :animated="false" @on-click="onTypeTabClick" >-->
<!--      <TabPane  label="教师教学研修">-->
<!--        <TrainActivityTable></TrainActivityTable>-->
<!--        研修内容</TabPane>-->
<!--      <TabPane  label="教师教学发展比赛">-->
<!--        <CompetitionTable></CompetitionTable>-->
<!--        发展比赛</TabPane>-->
<!--      <TabPane  label="教师教学发展交流">-->
<!--        <DevelopmentExchangeTable></DevelopmentExchangeTable>-->
<!--        发展交流</TabPane>-->
<!--      <TabPane  label="教师教学发展研究">-->
<!--        <ResearchTable></ResearchTable>-->
<!--        发展研究</TabPane>-->
<!--      <TabPane label="教师教学发展项目">-->
<!--        <ProjectTable></ProjectTable>-->
<!--        发展项目</TabPane>-->
<!--    </Tabs>-->
<!--    <TrainActivityTable v-if="select_tag==='研修'"></TrainActivityTable>-->
<!--    <CompetitionTable v-else-if="select_tag==='比赛'"></CompetitionTable>-->
  </Card>
</template>

<script>
import TrainActivityTable from "./components/TrainActivityTable";
import CompetitionTable from "./components/CompetitionTable";
import DevelopmentExchangeTable from "./components/DevelopmentExchangeTable";
import ResearchTable from "./components/ResearchTable";
import ProjectTable from "Views/TeacherDevelopDetail/components/ProjectTable";
// import teacherDevelopmentResearch from 'Views/TeachingDevelopment/components/teacherDevelopmentResearch'
export default {
  components:{ProjectTable, CompetitionTable, TrainActivityTable,DevelopmentExchangeTable,ResearchTable },
  data(){
    return{
      query:{
        activity_type:undefined,
        teacher_name:undefined,
      },
      select_tag:"教师教学研修"

    }

  },
  methods:{
    onTypeTabClick: function (name) {
      // 切换标签触发
      this.select_tag=name

    }
  },

}
</script>

<style scoped>

</style>
