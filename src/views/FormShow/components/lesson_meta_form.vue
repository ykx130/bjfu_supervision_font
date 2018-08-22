<style>
</style>
<template>
  <div>
  </div>

</template>
<script>
  import { getLessons } from '../../../service/api/lesson'
  export default {
    data () {
      return {
        lessons: [],
        lesson: '',
        lesson_attr: '',
        teacher: '',
        lesson_class: '',
        place: '',
        guider: '',
        lesson_val: ''
      }
    },
    props: {
      value: Object,
      input: Function
    },
    mounted () {
      getLessons().then((resp)=>{
        this.lessons = resp.data.lesson
      })
    },
    watch: {
      lesson_val: function() {
        this.lessons.forEach((item)=>{
          if (item.content === self.lesson_val) {
            this.lesson =item.lesson ;
            this.lesson_attr =item.lesson_attr ;
            this.teacher =item.teacher ;
            this.lesson_class =item.class ;
            this.place =item.place ;
            this.guider =item.guider ;
            this.$emit('input', {
              'lesson_val': this.lesson_val,
              'lesson': this.lesson,
              'lesson_attr': this.lesson_attr,
              'teacher': this.teacher,
              'lesson_class': this.lesson_class,
              'place': this.place,
              'guider': this.guider
            })
          }
        });
      }
    }
  }
</script>
