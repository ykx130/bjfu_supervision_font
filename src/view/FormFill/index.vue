<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-25 21:05:17
 * @LastEditTime: 2019-10-09 18:52:33
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <BackTop :height="100" >
      <div class="top">返回顶端</div>
    </BackTop>
    <Card>
      <div>
        <h1
          style="text-align: center;color: #468847;background-color: #dff0d8;    border-color: #d6e9c6;"
        >{{ form_meta.name }}</h1>
        <br />
        <!--<divider orientation="left">课程信息</divider>-->
        <div>
          <Lesson v-model="meta" ref="lesson_info"></Lesson>
        </div>
        <br />
        <Alert type="error" v-html="form_meta.toptip">
        </Alert>
        <br />
        <divider orientation="left">问卷内容</divider>
        <FormShow
          class="form_wrapper"
          v-model="form_values"
          :pages="form_meta.pages"
          :items="form_meta.items"
          :disabled="false"
          ref="form_info"
          @judgePage="judgePage"
        >
          <div slot-scope="Page">
            <div v-show="show_recommend" v-if="Page.current_page==='评价表正面'">
            <span
              style="height: 80px;line-height: 80px;margin-left: 20px;font-weight: bold"
            >必填* (备注：该课堂在“好评课堂”可参评名单中)</span>
              <FormItem>
                <Row>
                  <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：是否推荐为好评课?</span>
                </Row>
                <Row>
                  <RadioGroup v-model="recommend_model">
                    <Radio :label="1" v-bind:style="{ fontSize:'15px',marginLeft:'25px' }">推荐</Radio>
                    <Radio :label="0" v-bind:style="{ fontSize:'15px',marginLeft:'25px' }">不推荐</Radio>
                  </RadioGroup>
                </Row>
              </FormItem>

              <span
                style="height: 80px;line-height: 80px;margin-left: 20px;font-weight: bold"
              >（若选择为“推荐为好评课堂，请写出推荐理由； 若选择“不推荐”，请写出意见及建议。)</span>

              <FormItem>
                <Row>
                  <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：结论及意见</span>
                </Row>
                <Row>
                  <Input
                    type="textarea"
                    v-model="recommend_reason"
                    placeholder="Satisfation about teachers..."
                    v-bind:style="{marginLeft:'25px',width:'65%'}"
                  ></Input>
                </Row>
              </FormItem>
            </div>
          </div>
        </FormShow>
        <Button type="primary" style="margin-left: 20px" @click="handleSave" v-show="pageshow[0]">保存</Button>
        <Button type="primary" style="margin-left: 20px" @click="handleSubmit" v-show="pageshow[0]">提交</Button>
        <Button type="warning" style="margin-left: 28px" @click="handleCancel">取消</Button>
        <Button style="margin-left: 28px" @click="prePage" v-show="pageshow[0]">
          <Icon type="ios-arrow-back"></Icon>上一页
        </Button>
        <Button type="primary" style="margin-left: 28px" @click="nextPage" v-show="pageshow[1]">
          填写完成请继续填写下一页
          <Icon type="ios-arrow-forward"></Icon>
        </Button>
        <!--{{ruleValidate}}-->
      </div>

    </Card>
    <ABackTop :height="100" :bottom="80" :right="50" container=".form_wrapper">
      <div class="top">返回顶端</div>
    </ABackTop>
  </div>


</template>
<script>
import { getFormMeta, postForm } from "../../service/api/dqs";
import {
  getLesson,
  updateModelLessonsVote,
  postModelLessonsVote
} from "../../service/api/lesson";
import Lesson from "@/view/components/form_show/lesson_meta_form.vue";
import FormShow from "@/view/components/form_show/form_show.vue";
import UserMixin from "@/mixins/UserMixin.js";
import ABackTop from '../../components/a-back-top'

export default {
  components: {
    Lesson,
    FormShow,
    ABackTop
  },
  mixins: [UserMixin],
  name: "FormFill",
  watch: {
    "meta.lesson": {
      deep: true,
      handler: function() {
        if (
          (this.meta.lesson.lesson_model === "推荐为好评课" ||
            this.meta.lesson.lesson_model === "待商榷") && this.meta.lesson.guiders.some((element) =>{
            return element["username"] ===this.userInfo.userName;
          })
        ) {
          this.show_recommend = true;
        } else {
          this.show_recommend = false;
          this.recommend_model = 0;
        }
      },
      immediate: true
    }
  },
  computed: {
    currentUser: function() {
      return this.$store.getters.userInfo;
    },
    lessonInfo: function() {
      return this.$refs.lesson_info;
    },
    formInfo: function() {
      return this.$refs.form_info;
    }
  },
  data() {
    return {
      form_meta: {
        _id: undefined,
        items: []
      },
      form_values: {},
      meta: { lesson: {} },
      recommend_model: 0,
      recommend_reason: "",
      show_recommend: false,
      pageshow: [false, true]
    };
  },
  mounted() {
    this.fetchFormMeta();
  },
  methods: {
    formValue2Items() {
      this.form_meta.items.map((item, index) => {
        if (item.type === "form_item") {
          this.form_meta.items[index].value = this.form_values[item.item_name];
        }
      });
      return this.form_meta.items;
    },
    nextPage: function() {
      this.$refs.form_info.nextPage();
    },
    prePage: function() {
      this.$refs.form_info.prePage();
    },
    judgePage: function(pageShow) {
      this.pageshow = pageShow;
    },

    fetchFormMeta() {
      let args = this.$route.params;

      return getFormMeta(args).then(resp => {
        resp.data.form_meta.items.forEach(item => {
          // 添加数据
          if (item.type === "form_item") {
            if (item.item_type === "checkbox_option") {
              this.form_values[item.item_name] = [];
            } else {
              this.form_values[item.item_name] = "";
            }
          }
        });
        this.form_meta = resp.data.form_meta;
      });
    },
    back() {
      this.$router.push({ name: "督导我的提交" });
    },

    produceFrom(status) {
      let form = {
        bind_meta_id: this.form_meta._id,
        bind_meta_name: this.form_meta.name,
        bind_meta_version: this.form_meta.version,
        meta: this.meta,
        status: status,
        toptip:this.form_meta.toptip,
        pages: this.form_meta.pages,
        values: this.formValue2Items()
      };
      form["model_lesson"] = {
        recommend: this.recommend_model,
        recommend_reason: this.recommend_reason,
        is_model_lesson: this.show_recommend
      };
      return form;
    },

    handleSubmit() {
      this.lessonInfo.validate(valid_lesson => {
        if (valid_lesson) {
          this.formInfo.validate(valid => {
            console.log(this.form_values);
            if (valid) {
              let form = this.produceFrom("已完成");
              if (this.show_recommend) {
                postModelLessonsVote({ lesson_id: form.meta.lesson.lesson_id });
              }
              postForm(form).then(resp => {
                if (resp.data.code === 200) {
                  this.$Message.success("添加成功！");
                  this.back();
                }
              });
            } else {
              this.$Modal.warning({
                title:"检查问卷信息是否填写完整",
                content:"（1）教师授课情况“总体评价”为“非常满意”，需同时满足三个条件：①6个项目中，评价等级为“非常满意”的项目数≥4；②标★项目的评价等级必须为非常满意；③没有项目的评价等级为“存在不足”及以下。\n" +
                  "（2）教师授课情况“总体评价”为“存在明显不足”，需满足的条件：6个项目中，评价等级为“存在明显不足”的项目数≥3。"
              });
            }
          });
        } else {
          this.$Modal.warning({
            title:"检查课程信息是否填写完整",

          });
        }
      });
    },

    handleSave() {
      this.lessonInfo.validate(valid_lesson => {
        if (valid_lesson) {
          let form = this.produceFrom("草稿");
          postForm(form).then(resp => {
            if (resp.data.code === 200) {
              this.$Message.success({ content: "保存成功" });
              this.back();
            }
          });
        } else {
          this.$Modal.warning({ title:"检查课程信息是否填写完整"});
        }
      });
    },
    handleCancel() {
      this.back();
    }
  }
};
</script>

<style lang="less">
  .top{
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
  }
</style>
