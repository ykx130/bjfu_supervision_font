<template>
  <div >
    <Input @on-focus="show_drop = true" v-model="value" @change="handleInputChange"></Input>
    <div class="teacher_selector" :transfer="true" v-show="show_drop">
      <div>
        <Row>
          <Col :span="18">
            <div class="section_title">教师名字</div>
            <div class="name_content">
              <div v-if="!letter_names_list.length">
                {{empty_text}}
              </div>
              <Row v-for="item in letter_names_list">
                <ul>
                  <label>{{item.ckey}}</label>
                  <li v-for="name in item.names" @click="handleNameSelect(name)" style="list-style: none">{{ name }}
                  </li>
                </ul>
              </Row>
            </div>
          </Col>
          <Col :span="6">
            <div class="section_title">学院</div>
            <ul>
              <template v-for="unit in unit_list">
                <li @click="select_unit = unit" v-if="select_unit === unit" class="underline selected_item"
                    style="list-style: none;line-height: 25px">
                  {{unit}}
                </li>
                <li @click="select_unit = unit" v-else class="underline " style="list-style: none;line-height: 25px">
                  {{unit}}
                </li>
              </template>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button @click="show_drop = false">取消</Button>
          </Col>
        </Row>
      </div>
    </div>
  </div>

</template>

<script>
import Drop from 'iview/src/components/select/dropdown'
import { UNIT_LIST } from '@/service/const/index'
import { queryLessonTeacherName } from '@/service/api/lesson.js'
import pinyin from 'pinyin'

export default {
  name: 'teacher_selector',
  components: { Drop },
  props: {
    empty_text: {
      type: String,
      default: '暂无数据',
    },
    term: {type:String, default: ''},
  },
  data () {
    return {
      unit_list: UNIT_LIST,
      show_drop: false,
      select_unit: undefined,
      value: '',
      teacher_names: []
    }
  },
  watch: {
    select_unit: function () {
      this.fetchUserAndLetter()
    },
    term:  function () {
        this.fetchUserAndLetter()
    }
  },
  computed: {
    letter_names_list: function () {
      let letter_names = []
      let res = {}
      // 分割
      this.teacher_names.forEach((item, index) => {
        let py = pinyin(item, {
            style: pinyin.STYLE_FIRST_LETTER
          }
        )
        let ckey = '#'
        if (py.length) {
          if (py[0].length) {
            ckey = (py[0][0][0]).toUpperCase()
          }
        }
        if (!res.hasOwnProperty(ckey)) {
          res[ckey] = []
        }
        res[ckey].push(item)
      })

      Object.keys(res).forEach((key) => {
        letter_names.push({
          'ckey': key,
          'names': res[key]
        })
      })
      return letter_names
    }
  },
  methods: {
    handleInputChange (value) {
      this.$emit('input', value)
    },
    handleNameSelect (name) {
      this.value = name
      this.show_drop = false
      this.$emit('input', this.value)
    },
    getUsersData () {
      return queryLessonTeacherName({
        lesson_teacher_unit: this.select_unit,
        term: this.term
      }).then((resp) => {
        this.teacher_names = resp.data.teacher_names
      })
    },
    fetchUserAndLetter () {
      return this.getUsersData()
    }
  },
  created () {
    this.select_unit = this.unit_list[0]
    this.fetchUserAndLetter()
  }

}
</script>

<style lang="scss" scoped>
  .teacher_selector {
    position: absolute;
    height: 500px ;
    width: 500px;
    box-shadow: 0 0 4px 0 rgba(117, 117, 117, 0.5);
    border-radius: 2px;
    padding: 20px 21px;
    z-index: 10000;
    background-color: #fff;
  }

  .name_content {
    overflow: scroll;
    overflow-y: auto;
    overflow-x: hidden;
    height: 400px;
    padding: 10px 13px 0 13px;
    label {
      display: block;
      margin-bottom: 5px !important;
      font-size: 20px !important;
      margin-left: 0 !important;
      color: #5f5f5f !important;
      margin-top: 5px;
    }
    li {
      padding: 6px 0 6px;
      float: left;
      text-align: left;
      font-size: 14px;
      min-width: 56px;
      margin-right: 24px;
      cursor: pointer;
      list-style: none;
    }
  }

  .underline:hover {
    background-color: #f3f3f3;
  }

  .section_title {
    color: #348EED;
    font-weight: bold;
    font-size: large;
  }

  .selected_item {
    color: #348EED;
  }

</style>
