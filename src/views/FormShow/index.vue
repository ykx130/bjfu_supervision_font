<style>
  ul {
    text-align: center;
  }
  ul li {
    list-style: none;
    font-size: 16px;
  }
  ul li label {
    width: 80px;
    display: inline-block;
  }
  ul li select,
  ul li input {
    width: 150px;
    height: 32px;
  }
  ul li {
    margin-top: 20px;
  }
</style>
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
  import { getLessonFormMeta } from '../../service/api/dqs'
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
    mounted () {
        getLessonFormMeta().then((resp)=>{
          this.lessons = resp.data.data
        })
    },
    watch: {
        lesson_val: function() {
          var self = this;
          this.lessons.forEach(function(item){
            if (item.content == self.lesson_val) {
              self.lesson =item.lesson ;
              self.lesson_attr =item.lesson_attr ;
              self.teacher =item.teacher ;
              self.lesson_class =item.class ;
              self.place =item.place ;
              self.guider =item.guider ;
            }
          });
      }
    }
  }
</script>
