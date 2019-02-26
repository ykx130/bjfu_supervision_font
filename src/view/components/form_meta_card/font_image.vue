<template>
  <div :style="{background: randomHexColor()}" class="font-image">
    <p :style="{fontSize:size+'px'}">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'font_image',
  props: {
    text: String,
    size: Number
  },
  methods: {
    randomHexColor: function () { // 随机生成十六进制颜色
      return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)
    }
  }
}
</script>

<style scoped>
.font-image{
  color: #fbf4ff;
  border:1px solid;
  border-radius: 50%;
  height: 48px;
  width: 48px;
  line-height: 48px;
  text-align: center;
}
</style>
