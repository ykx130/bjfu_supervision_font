<template>
  <Card style="height: 160px">
    <Row class="form-status" :style="{background: statusColor(meta.status)}">
      <Col :span="24" style="text-align: center"><p class="normal_font">{{meta.status}} </p></Col>
    </Row>
    <Row type="flex" justify="center" align="middle">
      <Col :span="6" offset="1"><my_font_image :size="16" :text="meta.bind_meta_name.substring(0,2)"></my_font_image></Col>
      <Col :span="16"><p class="meta-name">{{ meta.bind_meta_name }}</p></Col>
    </Row>
    <Row>
      <Col :span="24"  style="text-align: left; padding-left: 32%"><p class="normal_font">版本： {{meta.bind_meta_version}} </p></Col>
    </Row>
    <Row type="flex" align="middle" class="edit form-list-btn">
      <Col :span="12"><a class="normal_font" @click="handleChangeClick">修改</a></Col>
      <Col :span="12"><a class="normal_font" @click="handleChangeWatch">查看</a></Col>
    </Row>
  </Card>
</template>

<script>
import my_font_image from './my_font_image'
export default {
  name: 'form_card',
  components: { my_font_image },
  props: {
    meta: Object,
    id: String
  },
  methods: {
    statusColor: function (status) {
      if (status == '草稿') {
        return 'rgba(183, 176, 176, 0.7)'
      } else if (status == '待提交') {
        return 'rgba(239, 234, 64, 0.7)'
      } else if (status == '已完成') {
        return 'rgba(89, 220, 154, 0.7)'
      }
    },
    handleChangeClick: function () {
     this.$router.push({path:`/_guider/judge/form_show/${this.meta._id}`})
    },
    handleChangeWatch: function () {
      this.$router.push({path:`/_guider/judge/form_show/${this.meta._id}`})
    }
  }
}
</script>

<style scoped>
  .form-status {
    position: absolute;
    right: 0;
    top: 0;
    width: 20%;
    transform: rotate(45deg);
    border-radius: 4px;
    padding: 2px;
  }
  .form-status div p {
    color: #fff;
    font-size: 1em;
  }
  .edit{
    background: #F7F9FA;
    text-align: center;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #e8e8e8;
  }
  .form-list-btn {
    position: absolute;
    height: 37px;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .form-list-btn div {
    cursor: pointer;
  }
  .form-list-btn div + div {
    border-left: 1px solid #e8e8e8;
  }
  .form-list-btn div a {
    transition: color .3s;
    letter-spacing: 2px;
    font-size: 1em;
  }
  .form-list-btn div a:hover{
    color: #1890ff;
  }
  .meta-name{
    font-size: 1.3em;
    font-weight: bolder;
  }
  .normal_font{
    font-size: 1.1em;
    font-weight: normal;
    color: #8C8C8C
  }
</style>
