<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-24 16:58:48
 * @LastEditTime: 2019-09-24 18:42:26
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div v-if="someLesson" v-for="lesson in someLesson">
      <p>
        {{ lesson.lesson_name }},{{ lesson.lesson_class }}班,{{ lesson.lesson_room.toString()}},
        <span>{{ getLessonWeekShow(lesson.lesson_week)}}</span>周
      </p>
      <Button type="text" @click="judge(lesson.lesson_id, lesson.term)" style="color: #348EED">评价</Button>
      <span>-------</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lesson_grid',
  props: {
    someLesson: Array
  },

  watch: {
    someLesson: {
      deep: true,
      // handler: function () {
      //   this.updateGrid()
      // }
    }
  },

  data: function () {
    return {
      weeks: {}
    }
  },

  // mounted: function () {
  //   this.updateGrid()
  // },
  methods: {
    judge: function (lesson_id, term) {
      this.$router.push({
        name: 'guider_form_choose',
        query: {
          lesson_id: lesson_id,
          term: this.$route.query.term
        }
      })
    },
    getLessonWeekShow: function (weeks) {
      // 获取一个周列表的显示
      let res = ''
      let pre = []
      for (let idx in weeks) {
        if (pre.length) {
          if (parseInt(weeks[idx]) !== parseInt(pre[pre.length - 1]) + 1) {
            if (pre.length === 1) {
              res = res + pre[0] + ','
            } else {
              res = res + pre[0] + '-' + pre[pre.length - 1] + ','
            }
            pre = []
          }
          pre.push(weeks[idx])
        } else {
          pre.push(weeks[idx])
        }
      }
      if (pre.length) {
        if (pre.length === 1) {
          res = res + pre[0] + ','
        } else {
          res = res + pre[0] + '-' + pre[pre.length - 1] + ','
        }
      }
      return res
    }
  }
}
</script>

<style scoped>
</style>
