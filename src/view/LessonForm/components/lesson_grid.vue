<template>
  <div>
    <div v-if="someLesson" v-for="lesson in someLesson">
      <p>{{ lesson.lesson_name }},{{ lesson.lesson_class }}班,
        <span v-for="(value, index) in lesson.week" v-if="index % 2 === 0">
          <span v-if="index !== lesson.week.length - 2">
            <span v-if="lesson.week[index] === lesson.week[index + 1]">
              {{ lesson.week[index] }},
            </span>
            <span v-else>
              {{ lesson.week[index] }}-{{ lesson.week[index + 1] }},
            </span>
          </span>
          <span v-if="index === lesson.week.length-2">
            <span v-if="lesson.week[index] === lesson.week[index + 1]">
              {{ lesson.week[index] }}
            </span>
            <span v-else>
              {{ lesson.week[index] }}-{{ lesson.week[index + 1] }}
            </span>
          </span>
        </span>周</p>
      <Button type="text" @click="judge(lesson.id)" style="color: #348EED">评价</Button>
      <span>-------</span>
    </div>
  </div>
</template>

<script>
    export default {
      name: "lesson_grid",
      props: {
        someLesson: Array
      },
      mounted: function () {
        let week = [];
        this.someLesson.forEach((lesson) => {
          if (lesson.lesson_week.length === 1) {
            week.push(lesson.lesson_week[0]);
            week.push(lesson.lesson_week[0]);  //推两个进去
          }
          if (lesson.lesson_week.length > 1) {
            week.push(lesson.lesson_week[0]);
            for (let index = 1; index < lesson.lesson_week.length; index++) {
              if (lesson.lesson_week[index] - lesson.lesson_week[index - 1] !== 1) {
                week.push(lesson.lesson_week[index - 1]);
                week.push(lesson.lesson_week[index]);
              }
            }
            week.push(lesson.lesson_week[lesson.lesson_week.length - 1]);
          }
          lesson.week = week.concat();
          week = [];
        });
      },
      methods:{
        judge: function (lesson_id) {
          this.$router.push({
            name: 'lesson_form',
            query: {
              'lesson_id': lesson_id
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
