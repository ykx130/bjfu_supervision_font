<template>
  <Card>
    <Row type="flex" justify="center" align="middle">
      <Col :span="6" offset="1"><my_font_image :size="40" :text="meta.bind_meta_name.substring(0,2)"></my_font_image></Col>
      <Col :span="16"><p class="meta-name">{{ meta.bind_meta_name }}</p></Col>
    </Row>
    <Row>
      <Col :span="24" style="text-align: center"><p class="normal_font">版本： {{meta.bind_meta_version}} </p></Col>
      <Col :span="24" style="text-align: center"><p class="normal_font">状态： {{meta.status}} </p></Col>
    </Row>
  </Card>
</template>

<script>
import my_font_image from './my_font_image'
export default {
  name: 'form_card',
  components: { my_font_image },
  props: {
    meta: Object
  }
}
</script>

<style scoped>
  .meta-name{
  font-size: 1.4em;
  font-weight: bolder;
  }
  .normal_font{
    font-size: 1.3em;
    font-weight: normal;
  }
</style>
