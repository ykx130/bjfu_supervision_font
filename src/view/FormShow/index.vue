<template >
  <Card>
    <BackTop></BackTop>
    <div style="overflow: hidden;overflow-x: hidden">
      <!--{{ this.form}}-->
        <h1 style="text-align: center;color: #468847;background-color: #dff0d8;    border-color: #d6e9c6;">{{ form.bind_meta_name }}</h1>
        <br/>
        <div>
          <Lesson v-model="form.meta" ref="lesson_info" @input="Lessonchange" :disabled="form.status==='已完成'"></Lesson>
        </div>
        <br/>
      <Alert type="error" v-html="form.toptip">
      </Alert>
        <divider orientation="left">问卷内容</divider>
        <div>

          <FormShow v-model="form_values" :pages="form.pages" :items="form.values" :disabled="disabled" ref="form_info" @judgePage="judgePage">
            <div slot-scope="Page">
              <div v-show="form.model_lesson.is_model_lesson" v-if="Page.current_page==='评价表正面'">
                <span style="height: 80px;line-height: 80px;margin-left: 20px;font-weight: bold">必填* (备注：该课堂在“好评课堂”入围名单中)</span>
                <FormItem>
                  <Row>
                    <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：是否推荐为好评课?</span>
                  </Row>
                  <Row>
                    <RadioGroup v-model="form.model_lesson.recommend"  >
                      <Radio
                        :label="1"
                        v-bind:style="{ fontSize:'15px',marginLeft:'25px' }"
                        :disabled="form.status==='已完成'"
                      >推荐</Radio>
                      <Radio :label="0"
                             v-bind:style="{ fontSize:'15px',marginLeft:'25px' }"
                             :disabled="form.status==='已完成'"
                      >不推荐</Radio>
                    </RadioGroup>
                  </Row>
                </FormItem>

                <span style="height: 80px;line-height: 80px;margin-left: 20px;font-weight: bold">（若选择为“推荐为好评课堂，请写出推荐理由； 若选择“不推荐”，请写出意见及建议。)</span>

                <FormItem>
                  <Row>
                    <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：结论及意见</span>
                  </Row>
                  <Row>
                    <Input type="textarea"
                           :disabled="form.status==='已完成'"
                           v-model="form.model_lesson.recommend_reason"
                           placeholder="Satisfation about teachers..."
                           v-bind:style="{marginLeft:'25px',width:'65%'}"></Input>
                  </Row>
                </FormItem>
              </div>
              <!--{{ruleValidate}}-->

            </div>
          </FormShow>

      </div>
      <Button type="primary" style="margin-left: 20px" @click="handleSave" :disabled="form.status==='已完成'" v-show="pageshow[0]">保存</Button>
      <Button type="primary" style="margin-left: 20px" @click="handleSubmit" :disabled="disabled" v-show="pageshow[0]">提交</Button>
      <Button type="warning" style="margin-left: 28px" @click="handleCancel">取消</Button>
      <Button style="margin-left: 28px" @click="prePage" v-show="pageshow[0]">
        <Icon type="ios-arrow-back"></Icon>
        上一页
      </Button>
      <Button type="primary"  style="margin-left: 28px" @click="nextPage" v-show="pageshow[1]">
        填写完成请继续填写下一页
        <Icon type="ios-arrow-forward"></Icon>
      </Button>

      <div style="overflow: hidden">
          <div v-if="form.status === '已完成'" class="form-status" style="background-color: #cce5ff"><p> {{ form.status }} </p></div>
          <div v-else class="form-status" style="background-color: #f8d7da"><p> {{ form.status }} </p></div>
        </div>
      </div>
  </Card>
</template>
<script>
import { getForm, postForm, putForm } from '../../service/api/dqs'
import Lesson from '@/view/components/form_show/lesson_meta_form.vue'
import FormShow from '@/view/components/form_show/form_show.vue'
import UserMixin from "@/mixins/UserMixin.js";
import { getLesson, updateModelLessonsVote, postModelLessonsVote } from '../../service/api/lesson'
export default {
  components: {
    Lesson, FormShow
  },
  mixins: [UserMixin],
  computed: {
    currentUser: function () {
      return this.$store.getters.userInfo
    },
    lessonInfo: function() {
      return this.$refs.lesson_info;
    },
    formInfo :function () {
      return this.$refs.form_info
    }
  },
  watch: {
    "form.meta":{
      deep: true,
      handler: function () {
        if (
          (this.form.meta.lesson.lesson_model === "推荐为好评课" ||
            this.form.meta.lesson.lesson_model === "待商榷") && (this.form.meta.lesson.guiders.some((element) =>{
            return element["username"] ===this.userInfo.userName;
          })||this.current_role==='管理员'||this.current_role==='小组长')
        ) {
          this.form.model_lesson.is_model_lesson=true;
          this.form.model_lesson.show_recommend = true;
        } else {
          this.form.model_lesson.is_model_lesson=false;
          this.form.model_lesson.show_recommend = false;
          this.form.model_lesson.recommend = undefined;
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
      form_id: undefined,
      form_values: {},
      form: {
        meta: { lesson: {} },
        values: [],
        model_lesson:{}
      },
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
      ruleValidate: {},
      pageshow:[false,true]
    }
  },
  mounted () {
    this.fetchForm()
  },
  methods: {
    Lessonchange(value){
      this.form.meta=value
    },
    formValue2Items () {
      this.form.values.map((item, index) => {
        if (item.type === 'form_item') {
          this.form.values[index].value = this.form_values[item.item_name]
        }
      })
      return this.form.values
    },
    produceFrom (status) {
      let form = {
        status: status,
        meta: this.form.meta,
        values: this.formValue2Items(),
        model_lesson : this.form.model_lesson
      }
      return form
    },
    fetchForm () {
      this.form_id = this.$route.params.id
      getForm(this.form_id).then((newresp) => {
        this.form = newresp.data.form
        if (this.form.status === '已完成') {
          this.disabled = true
        }
        newresp.data.form.values.forEach((item) => {
          // 添加数据
          if (item.type === 'form_item') {
            this.form_values[item.item_name] = item.value
          }
        })
      })
    },
    nextPage:function(){
      this.$refs.form_info.nextPage()
    },
    prePage:function(){
      this.$refs.form_info.prePage()
    },
    judgePage:function(pageShow){
      this.pageshow=pageShow
    },
    back () {
      this.$router.back()
    },
    handleSubmit () {
      this.lessonInfo.validate(valid_lesson => {
          if (valid_lesson) {
            this.formInfo.validate(valid => {
              if (valid) {
                if(this.form.model_lesson.is_model_lesson&&(this.form.model_lesson.recommend===undefined||this.form.model_lesson.recommend_reason==="")){
                    this.$Modal.warning({
                      title:"检查好评课堂问题是否填写完整:",
                      content:"请选择是否推荐为好评课,并填写推荐理由或意见及建议!"
                    });
                  }else{
                    let form = this.produceFrom("已完成");
                    putForm(this.form_id, form).then((resp) => {
                      if (resp.data.code === 200) {
                        this.$Message.success("新建成功！");
                        this.back();
                      }
                    });
                  }
              } else {
                this.$Modal.warning({
                  title:"检查问卷信息是否填写完整",
                  content:"（1）教师授课情况“总体评价”为“非常满意”，需同时满足三个条件：①6个项目中，评价等级为“非常满意”的项目数≥4；②标★项目的评价等级必须为非常满意；③没有项目的评价等级为“存在不足”及以下。\n" +
                    "（2）教师授课情况“总体评价”为“存在明显不足”，需满足的条件：6个项目中，评价等级为“存在明显不足”的项目数≥3。"
                })
              }
            })
          } else {
            this.$Modal.warning({
              title:"检查课程信息是否填写完整",
            });
          }
      });

    },
    handleSave () {
      this.lessonInfo.validate(valid_lesson => {
        if (valid_lesson) {
          let form = this.produceFrom('草稿')
          putForm(this.form_id, form).then((resp) => {
            if (resp.data.code === 200) {
              this.$Message.success({ content: '新建成功' })
              this.back()
            }
          })
        }else {
          this.$Modal.warning({ title:"检查课程信息是否填写完整"});
        }
      });
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

