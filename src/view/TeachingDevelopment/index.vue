<template>
  <div>
    <Card>
      <Tabs @on-click="onTypeTabClick">
        <TabPane label="教师教学发展比赛" name="教师教学发展比赛"></TabPane>
        <TabPane label="教师教学发展交流" name="教师教学发展交流"></TabPane>
        <TabPane label="教师教学发展研究" name="教师教学发展研究"></TabPane>
        <TabPane label="教师教学发展项目" name="教师教学发展项目"></TabPane>
      </Tabs>

      <template v-if="select_tag==='教师教学发展比赛'">
        <teacher-development-competition/>
      </template>
      <template v-else-if="select_tag==='教师教学发展交流'">
        <teacher-development-exchange/>
      </template>
      <template v-else-if="select_tag==='教师教学发展研究'">
        <teacher-development-research/>
      </template>
      <template v-else-if="select_tag==='教师教学发展项目'">
        <teacher-development-project/>
      </template>
    </Card>
  </div>
</template>

<script>
import teacherDevelopmentCompetition from 'Views/TeachingDevelopment/components/teacherDevelopmentCompetition'
import teacherDevelopmentExchange from 'Views/TeachingDevelopment/components/teacherDevelopmentExchange'
import teacherDevelopmentResearch from 'Views/TeachingDevelopment/components/teacherDevelopmentResearch'
import teacherDevelopmentProject from 'Views/TeachingDevelopment/components/teacherDevelopmentProject'
export default {
  name: 'index',
  components: {
    teacherDevelopmentCompetition,
    teacherDevelopmentExchange,
    teacherDevelopmentResearch,
    teacherDevelopmentProject
  },
  data: function () {
    return {
      select_tag: '教师教学发展比赛'
    }
  },
  computed: {
    currentPath: function () {
      return this.$route.path
    }
  },
  methods: {
    onTypeTabClick (value) {
      this.select_tag = value
    }
  }
}
</script>

<style scoped>

</style>
