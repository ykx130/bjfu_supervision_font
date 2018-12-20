<template>
  <Modal
    :value="show"
    title="新增"
    @on-ok="handleSubmit('event')"
    @on-cancel="handleCancel">
  <Form :model="event" ref="event">
    <Row>
      <Col span="10">
        <FormItem label="事件名称" prop="name">
          <Input v-model="event.name"></Input>
        </FormItem>
      </Col>
      <Col span="10">
        <FormItem label="发生时间" prop="timestamp">
          <DatePicker type="date" placeholder="Select time" style="width: 168px" :value="event.timestamp" format="yyyy-MM-dd" @onChnage="onTimeStampChange"></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col>
        <FormItem label="事件详情" prop="detail">
          <Input v-model="event.detail"></Input>
        </FormItem>
      </Col>
    </Row>
  </Form>
  </Modal>
</template>

<script>
import {dateToString} from 'Libs/tools'
export default {
  name: 'UserAddModal',
  props: {
    show: Boolean,
    onCancel: Function,
    onOK: Function,
    username: String,
  },
  watch:{
    username: function (val) {
      this.event.username = val
    }
  },
  data: function () {
    return {
      event: {
        name: null,
        timestamp: null,
        detail: null,
        username: null,
      },
    }
  },
  mounted: function () {
  },
  methods: {
    onTimeStampChange:function(val){
      this.event.timestamp = dateToString(val,'yyyy-MM-dd')
    },
    handleCancel: function () {
      this.$emit('onCancel')
    },
    handleSubmit (name) {
      this.$emit('onOK', {
        ...this.event
    })
  }
  }
}
</script>

<style scoped>

</style>
