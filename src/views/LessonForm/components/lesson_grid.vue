<template>
  <div>
    <div v-if="someLesson" v-for="lesson in someLesson">
      <p>{{ lesson.lesson_name }},{{ lesson.id }},{{ lesson.lesson_class }}班,
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
      <hr />
    </div>
  </div>
</template>

<script>
    export default {
        name: "lesson_grid",
        props: {
          someLesson: Array
        }
    }
</script>

<style scoped>

</style>
