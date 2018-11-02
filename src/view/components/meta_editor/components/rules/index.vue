<template>
  <div>
    <Row>
      <template v-for="rule in rules">
        <Col :span="24">
          <div>
            <span>{{ RuleMap[rule.type] }}:<i-switch  v-model="rule.enable"></i-switch> </span>
            <required v-model="rule.value" v-if="rule.type === 'required'"></required>
            <length v-model="rule.value" v-else-if="rule.type === 'length'"></length>
          </div>
        </Col>
      </template>
    </Row>
  </div>
</template>

<script>
  import length from './length'
  import required from './required'

  export default {
    name: "rules",
    components: {
      length,
      required
    },
    props: {
      value: {type: Array, default: []},
      types: Array
    },
    watch: {
      rules: {
        deep: true,
        handler: function () {
          let res = []
          for (let r in this.rules){
            if (this.rules[r].enable === true){
              res.push({
                type: this.rules[r].type,
                ...this.rules[r].value
              })
            }
          }
          this.$emit("input", res)
        }
      }
    },
    data: function () {
      return {
        rules: [],
        RuleMap: {
          'required': "必须项校验",
          'length': "长度校验"
        }
      }
    },
    mounted: function () {
      this.rules = this.types.map((item) => {
        return {
          enable: false,
          type: item,
          value: {}
        }
      })
    },

  }
</script>

<style scoped>

</style>
