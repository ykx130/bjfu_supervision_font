<template>
    <div>
      <p>{{ lesson.lesson_name }}</p>
      <p> 教师: {{lesson.teacher}}</p>
      <p> 周次: {{lesson.week}}</p>
      <p> 班级: {{lesson.lesson_class}}</p>
    </div>
</template>

<script>
    export default {
        name: "lesson_grid",
        props: {
          lesson:Object
        },

    }
</script>

<style scoped>

</style>
