<!--<style>-->
  <!--ul {-->
    <!--text-align: center;-->
  <!--}-->
  <!--ul li {-->
    <!--list-style: none;-->
    <!--font-size: 16px;-->
  <!--}-->
  <!--ul li label {-->
    <!--width: 80px;-->
    <!--display: inline-block;-->
  <!--}-->
  <!--ul li select,-->
  <!--ul li input {-->
    <!--width: 150px;-->
    <!--height: 32px;-->
  <!--}-->
  <!--ul li {-->
    <!--margin-top: 20px;-->
  <!--}-->
<!--</style>-->
<template>
  <div id="lesson">
    <ul>
      <li>
        <label>content: </label>
        <select v-model="lesson_val">
          <option v-for="lesson in lessons">{{ lesson.content }}</option>
        </select>
      </li>
      <li>
        <label>lesson: </label>
        <input disabled v-model="lesson">
      </li>
      <li>
        <label>lesson_attr: </label>
        <input disabled v-model="lesson_attr">
      </li>
      <li>
        <label>teacher: </label>
        <input disabled v-model="teacher">
      </li>
      <li>
        <label>class: </label>
        <input disabled v-model="lesson_class">
      </li>
      <li>
        <label>place: </label>
        <input disabled v-model="place">
      </li>
      <li>
        <label>guider: </label>
        <input disabled v-model="guider">
      </li>
    </ul>
  </div>

</template>
<script>
  import { getLessons } from '../../../service/api/dqs'
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
        this.lessons = resp.data.data
        this.lesson_val = this.value.lesson
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
