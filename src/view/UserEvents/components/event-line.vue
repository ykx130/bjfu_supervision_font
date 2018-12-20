<template>
  <ul class="time-horizontal">
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
      classes() {
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
<style lang="less">

  /*横向时间轴*/
  .time-horizontal {
    list-style-type: none;
    border-top: 1px solid #707070;
    max-width: 800px;
    padding: 0px;
    margin: 0px;
  }

  .time-horizontal li {
    float: left;
    position: relative;
    text-align: center;
    width: 25%;
    padding-top: 10px;
  }

  .time-horizontal li b:before {
    content: '';
    position: absolute;
    top: -10px;
    left: 47%;
    width: 12px;
    height: 12px;
    border: 2px solid #4c4c4c;
    border-radius: 8px;
    background: #4c4c4c;
  }
  /*纵向时间轴*/
</style>
