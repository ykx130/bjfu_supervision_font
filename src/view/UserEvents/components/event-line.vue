<template>
  <ul :class="classes">
    <slot></slot>
  </ul>
</template>
<script>
  const prefixCls = 'event-line';
  export default {
    name: 'Timeline',
    props: {
      pending: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-pending`]: this.pending
          }
        ];
      }
    }
  };
</script>
<style lang="less" scoped>
 @import './style.less';
</style>
