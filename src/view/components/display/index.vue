<template>
  <div ref="display" id="my-display"></div>
</template>
<script>
import Vue from 'vue'
export default {
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  watch: {
    code: function () {
      this.destroyCode()

      this.renderCode()
    }
  },
  data () {
    return {
      id: '',
      html: '',
      js: '',
      css: ''
    }
  },
  methods: {
    getSource (source, type) {
      const regex = new RegExp(`<${type}[^>]*>`)
      let openingTag = source.match(regex)

      if (!openingTag) return ''
      else openingTag = openingTag[0]

      return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`))
    },
    splitCode () {
      const script = this.getSource(this.code, 'script').replace(/export default/, 'return ')
      const style = this.getSource(this.code, 'style')
      const template = '<div id="app_display" style="height: 100%;width: 100%;">' + this.getSource(this.code, 'template') + '</div>'

      this.js = script
      this.css = style
      this.html = template
    },
    renderCode () {
      this.splitCode()

      if (this.html !== '' && this.js !== '') {
        const parseStrToFunc = new Function(this.js)()

        parseStrToFunc.template = this.html
        const Component = Vue.extend(parseStrToFunc)
        this.component = new Component().$mount()
        this.$refs.display.appendChild(this.component.$el)

        if (this.css !== '') {
          const style = document.createElement('style')
          style.type = 'text/css'
          style.id = this.id
          style.innerHTML = this.css
          document.getElementsByTagName('head')[0].appendChild(style)
        }
      }
    },
    destroyCode () {
      const $target = document.getElementById(this.id)
      if ($target) {
        $target.parentNode.removeChild($target)
      }

      if (this.component) {
        this.$refs.display.removeChild(this.component.$el)
        this.component.$destroy()
        this.component = null
      }
    },
    random_str (len = 32) {
      const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
      const maxPos = $chars.length
      let str = ''
      for (let i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return str
    }
  },
  created () {
    this.id = this.random_str()
  },
  mounted () {
    this.renderCode()
  },
  beforeDestroy () {
    this.destroyCode()
  }
}
</script>
