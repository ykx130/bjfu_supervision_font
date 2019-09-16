<template>
  <Modal
    :value="show"
    title="分配督导"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange">
    <Select :value="flat_lessons_guiders"
            multiple
            filterable
            remote
            label-in-value
            :loading="false"
            style="width:260px"
            @on-query-change="onGuiderQueryChange"
            @on-change="onGuiderSelectChange"
            :disabled="guider_disable || disabled"
    >
      <Option v-for="(item,key) in Supervisors" v-if="item.group_name===lesson.group_name" :value="item.username" :key="item.username">{{ "'" + item.user.name + "'" }}</Option>
    </Select>
<!--    v-model="guiders"-->
  </Modal>
</template>

<script>
import { getModelLesson } from '../../../service/api/lesson'
import { updateWithinField } from 'Libs/tools'
import { querySupervisors } from '../../../service/api/user'

export default {
  name: 'LessonGroupAssign',
  props: {
    show: Boolean,
    onCancel: Function,
    onOK: Function,
    lesson_id: Number,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      lesson: {
        id: '',
        group_name: '',
        guiders: []
      },
      guiders: [],
      guider_name_like:'',
      user_name_like: '',
      guider_disable: false,
      select_guider:{},
      Supervisors: {} // 督导
    }
  },

  computed: {
    flat_lessons_guiders: function () {
      return this.lesson.guiders.map((item)=>{
        return item.username
      })
    }
  },
  methods: {
    handleOK: function () {
      // console.log(JSON.stringify(this.Supervisors))

      this.$emit('onOK', this.lesson)
    },
    handleCancel: function () {
      this.$emit('onCancel')
    },
    onShowChange: function (show) {
      if (show) {
        // 显示的时候拉数据
        getModelLesson(this.lesson_id).then((resp) => {
          updateWithinField(this.lesson, resp.data.model_lesson)
        })
        // console.log(this.lesson)
        // console.log(this.Supervisors)
      }
    },
    onGuiderSelectChange: function (value) {
      if (value) {
        this.lesson.guiders = value.map((item)=>{
          return {'name':item.label, 'username': item.value}
        })
      }
    },
    onGuiderQueryChange: function (value) {
      if (!(value.startsWith("'") && value.endsWith("'"))) {
        this.guider_name_like = value
        this.fetchUser()
      }
    },
    fetchUser: function () {
      this.Supervisors = {}
      return querySupervisors({username_like: this.guider_name_like }).then((resp) => {
        resp.data.supervisors.map((item) => {
          this.$set(this.Supervisors, item.username, item)
          console.log(this.Supervisors)
          console.log(this.guider_name_like)

        })
      })

    }
  },
  mounted: function () {
    querySupervisors().then((resp) => {
      this.Supervisors = resp.data.supervisors
    })
  }
}
</script>

<style scoped>

</style>
