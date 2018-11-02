<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "required",
        props: {
          value: Object
        },
        data: function () {
          return {
            rule: {
              required: true
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
