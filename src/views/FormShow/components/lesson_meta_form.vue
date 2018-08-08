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
        <input disabled v-model="form.meta.content">
      </li>
      <li>
        <label>lesson: </label>
        <input disabled v-model="form.meta.lesson">
      </li>
      <li>
        <label>lesson_attr: </label>
        <input disabled v-model="form.meta.lesson_attr">
      </li>
      <li>
        <label>teacher: </label>
        <input disabled v-model="form.meta.teacher">
      </li>
      <li>
        <label>class: </label>
        <input disabled v-model="form.meta.class">
      </li>
      <li>
        <label>place: </label>
        <input disabled v-model="form.meta.place">
      </li>
      <li>
        <label>guider: </label>
        <input disabled v-model="form.meta.guider">
      </li>
    </ul>
  </div>

</template>
<script>
  import { getLessons,getForm } from '../../../service/api/dqs'
  export default {
    data () {
      return {
        form:{
          meta_table_id:"",
          meta:{},
          values:[]
        },
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
      getLessons().then((resp)=>{
        this.lessons = resp.data.data
      });
      let id=this.$route.params.id;
      getForm(id).then((resp)=>{
        this.form=resp.data.form
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
