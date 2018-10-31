<template>
    <Card style="height: 160px">
      <Row type="flex" justify="center" align="middle">
        <Col :span="6" offset="1"><font_image :size="16" :text="meta.name.substring(0,2)"></font_image></Col>
        <Col :span="16"><p class="meta-name">{{ meta.name }}</p></Col>
      </Row>
      <Row>
        <Col :span="24" style="text-align: left; padding-left: 32%"><p class="normal_font">版本： {{meta.version}} </p></Col>
        <Col :span="24" style="text-align: left; padding-left: 32%"><p class="normal_font">创建日期： {{meta.meta.created_at}} </p></Col>
      </Row>
    </Card>
</template>

<script>
import font_image from './font_image'
export default {
  name: 'form_card',
  components: { font_image },
  props: {
    meta: Object
  }
}
</script>

<style scoped>

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
