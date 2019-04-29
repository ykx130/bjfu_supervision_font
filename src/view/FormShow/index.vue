<template>
  <Card>
      <div style="overflow: hidden;overflow-x: hidden">
        <!--{{ this.form}}-->
        <h1 style="text-align: center;color: #468847;background-color: #dff0d8;    border-color: #d6e9c6;">{{ form.bind_meta_name }}</h1>
        <br/>
        <div>
          <Lesson v-model="form.meta" :disabled="true"></Lesson>
        </div>
        <br/>
        <Alert type="error">
          <strong>注：</strong><br>
          （1）“教师授课情况总体评价”为“非常满意”，需满足如下条件：8项评价中，非常满意≥5，其中标★项目评价必须为非常满意；且没有“存在不足”及以下。<br>
          （2）“教师授课情况总体评价”为“存在明显不足”，需满足如下条件：8项评价中，存在明显不足≥3。
        </Alert>
        <divider orientation="left">问卷内容</divider>
        <div>

          <FormShow v-model="form_values" :items="form.values" :disabled="disabled" ref="ruleform">
            <FormItem label="是否推荐为好评课" v-show="show_recommend" v-bind:style="{marginLeft:'25px',fontSize:'15px' }" >
              <RadioGroup v-model="recommend_model" >
                <Radio label="推荐" :value="1" :disabled="disabled"></Radio>
                <Radio label="不推荐" :value="0" :disabled="disabled"></Radio>
              </RadioGroup>
            </FormItem>
          </FormShow>
          <!--{{ruleValidate}}-->
        <Button type="primary" style="margin-left: 20px" @click="handleSave" :disabled="disabled">保存</Button>
        <Button type="primary" style="margin-left: 20px" @click="handleSubmit" :disabled="disabled">提交</Button>
        <Button type="warning" style="margin-left: 28px" @click="handleCancel">取消</Button>
      </div>
        <div style="overflow: hidden">
          <div v-if="form.status === '已完成'" class="form-status" style="background-color: #cce5ff"><p> {{ form.status }} </p></div>
          <div v-else class="form-status" style="background-color: #f8d7da"><p> {{ form.status }} </p></div>
        </div>
      </div>
  </Card>
</template>
<script>
import { getForm, postForm } from '../../service/api/dqs'
import Lesson from '@/view/components/form_show/lesson_meta_form.vue'
import FormShow from '@/view/components/form_show/form_show.vue'
import { getLesson, updateModelLessonsVote, getModelLessonsVote } from '../../service/api/lesson'
export default {
  components: {
    Lesson, FormShow
  },
  computed: {
    currentUser: function () {
      return this.$store.getters.userInfo
    }
  },
  watch: {
    'meta.lesson': {
      deep: true,
      handler: function () {
        if (this.meta.lesson.lesson_model !== '') {
          this.show_recommend = true
        } else {
          this.show_recommend = false
          this.recommend_model = 0
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      model_lesson: {
        id: '',
        vote: ''
      },
      form_values: {},
      form: {
        meta: { lesson: {} },
        values: []
      },
      recommend_model: 0,
      show_recommend: false,
      disabled: false,
      meta: { lesson: {} },
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
      ruleValidate: {}
    }
  },
  mounted () {
    this.fetchForm()
  },
  methods: {
    fetchForm () {
      let id = this.$route.params.id
      getForm(id).then((newresp) => {
        this.form = newresp.data.form
        if (this.form.status === '已完成') {
          this.disabled = true
        }
        this.form.values.forEach((item) => {
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
      debugger
      if (this.meta.guider === '' || this.meta.lesson.lesson_name === '' ||
          this.meta.lesson.lesson_date === '' || this.meta.lesson.lesson_times === '') {
        this.$Message.error('请填写完成课程信息！')
      } else {
        this.$refs.ruleform.validate((valid) => {
          if (valid) {
            let form = {
              status: '已完成',
              values: Object.values(this.form_values)
            }
            if (this.recommend_model) {
              this.model_lesson.id = this.meta.lesson.lesson_id
              getModelLessonsVote(this.model_lesson)
            }
            postForm(form).then((resp) => {
              if (resp.data.code === 200) {
                this.$Message.success({ content: '新建成功' })
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
        status: '草稿',
        values: Object.values(this.form_values)
      }
      postForm(form).then((resp) => {
        if (resp.data.code === 200) {
          this.$Message.success({ content: '新建成功' })
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
<style>
  .form-status{
    display: inline-block;
    position: absolute;
    text-align: center;
    right: -7%;
    top: 87%;
    width: 21%;
    transform: rotate(-50deg);
    border-radius: 3px;
    font-size: 30px;
    padding: 2px;
    text-overflow:ellipsis; white-space:nowrap;
    overflow: hidden;
    opacity:0.5;
  }
</style>
