<template>
  <div>
    <Row>
      <Col :span="8">
        最小长度:
        <InputNumber  v-model="rule.min"></InputNumber>
      </Col>
      <Col :span="8">
      最大长度:
          <InputNumber  v-model="rule.max"></InputNumber>
      </Col>
    </Row>
  </div>
    
</template>

<script>
    export default {
      name: "length",
      props: {
        value: Object
      },
      watch: {
        rule: {
          deep:true,
          handler: function () {
            this.$emit('input', this.rule)
          }
        }
      },
      data: function () {
        return {
          rule: {
            min: 0,
            max: 1000
          }
        }
      },
      mounted: function () {
        this.$emit("input", this.rule)
      }
    }
</script>

<style scoped>

</style>
