<template>
  <Card>
    <div>
      <h1 style="text-align: center;color: #468847;background-color: #dff0d8;    border-color: #d6e9c6;">{{ form_meta.name }}</h1>
      <br/>
      <!--<divider orientation="left">课程信息</divider>-->
      <div>
        <Lesson v-model="meta"></Lesson>
      </div>
      <br/>
      <Alert type="error">
        <strong>注：</strong><br>
        （1）“教师授课情况总体评价”为“非常满意”，需满足如下条件：8项评价中，非常满意≥5，其中标★项目评价必须为非常满意；且没有“存在不足”及以下。<br>
        （2）“教师授课情况总体评价”为“存在明显不足”，需满足如下条件：8项评价中，存在明显不足≥3。
      </Alert>
      <br/>
      <divider orientation="left">问卷内容</divider>
      <FormShow v-model="form_values" :items="form_meta.items" :disabled="false" ref="ruleform" :ruleValidate="ruleValidate">
        <FormItem label="是否推荐为好评课" v-show="show_recommend" v-bind:style="{marginLeft:'25px',fontSize:'15px' }">
          <RadioGroup v-model="recommend_model">
            <Radio label="推荐" :value="1" :disabled="false"></Radio>
            <Radio label="不推荐" :value="0" :disabled="false"></Radio>
          </RadioGroup>
        </FormItem>
      </FormShow>

      <!--{{ruleValidate}}-->
          <Button type="primary" style="margin-left: 20px" @click="handleSave">保存</Button>
          <Button type="primary" style="margin-left: 20px" @click="handleSubmit">提交</Button>
          <Button type="warning" style="margin-left: 28px" @click="handleCancel">取消</Button>
        </div>
  </Card>

</template>
<script>
import { getFormMeta, postForm } from '../../service/api/dqs'
import { getLesson, updateModelLessonsVote, getModelLessonsVote } from '../../service/api/lesson'
import Lesson from '@/view/components/form_show/lesson_meta_form.vue'
import FormShow from '@/view/components/form_show/form_show.vue'

export default {
  components: {
    Lesson, FormShow
  },
  name: 'FormFill',
  watch: {
    'meta.lesson': {
      deep: true,
      handler: function () {
        if (this.meta.lesson.lesson_model === '推荐课') {
          this.show_recommend = true
        } else {
          this.show_recommend = false
          this.recommend_model = 0
        }
      },
      immediate: true
    }
  },
  computed: {
    currentUser: function () {
      return this.$store.getters.userInfo
    }
  },
  data () {
    return {
      model_lesson: {
        id: '',
        vote: ''
      },
      form_meta: {
        _id: undefined,
        items: []
      },
      form_values: {},
      meta: { lesson: {} },
      recommend_model: 0,
      show_recommend: false,
      formValidate: {
        radio: '',
        checkbox: '',
        raw_text: ''
      },
      defaultValidateRules: {
        radio: [
          { required: false }
        ],
        checkbox: [
          { required: false }
        ],
        raw_text: [
          { required: false }
        ]
      },
      ruleValidate: {

      }
    }
  },
  mounted () {
    this.fetchFormMeta()
  },
  methods: {
    fetchFormMeta () {
      let args = this.$route.params

      return getFormMeta(args).then((resp) => {
        this.form_meta = resp.data.form_meta
        this.form_meta.items.forEach((item) => {
          // 添加数据
          this.form_values[item.item_name] = item
        })
      })
    },
    back () {
      if (this.currentUser.role_names.includes('管理员')) {
        this.$router.push({ name: '问卷管理' })
      } else {
        this.$router.push({ name: '督导端' })
      }
    },
    handleSubmit () {
      this.meta.lesson.lesson_model = this.recommend_model
      if (this.meta.guider === '' || this.meta.lesson.lesson_name === '' ||
        this.meta.lesson.lesson_date === '' || this.meta.lesson.lesson_times === '') {
        this.$Message.error('请填写完整课程信息！')
      } else {
        this.$refs.ruleform.validate((valid) => {
          if (valid) {
            let form = {
              bind_meta_id: this.form_meta._id,
              bind_meta_name: this.form_meta.name,
              bind_meta_version: this.form_meta.version,
              meta: this.meta,
              status: '已完成',
              values: Object.values(this.form_values)
            }
            if (this.recommend_model) {
              console.log('好评可 提及哦啊')
              this.model_lesson.id = this.meta.lesson.lesson_id
              getModelLessonsVote(this.model_lesson).then((resp) => {})
            }
            postForm(form).then((resp) => {
              if (resp.data.code === 200) {
                this.$Message.success({ content: '保存成功' })
                this.back()
              }
            })
            this.$Message.success('添加成功！')
          } else {
            this.$Message.error('请填写完整信息！')
          }
        })
      }
    },

    handleSave () {
      let form = {
        bind_meta_id: this.form_meta._id,
        bind_meta_name: this.form_meta.name,
        bind_meta_version: this.form_meta.version,
        meta: this.meta,
        status: '草稿',
        values: Object.values(this.form_values)
      }
      postForm(form).then((resp) => {
        if (resp.data.code === 200) {
          this.$Message.success({ content: '保存成功' })
          this.back()
        }
      })
    },
    handleCancel () {
      this.back()
    }
  }
}
</script>

<style lang="less">

</style>
