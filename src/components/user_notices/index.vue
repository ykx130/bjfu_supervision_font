<template>
  <div @click="showNotice">
    <Badge :count="notices_count" :offset="[15, 0]">
      <Icon  type="ios-notifications-outline" size="26" ></Icon>
    </Badge>
  </div>
</template>

<script>
import { getNoticesNum, getLatestNotices } from '../../service/api/notices'

export default {
  name: 'user_notices',
  data: function () {
    return {
      notices_count: 0,
      notice_timer: undefined
    }
  },
  mounted: function () {
    this.refreshNotce()
    this.notice_timer = setInterval(this.refreshNotce, 10000)
  },
  beforeDestroy: function () {
    clearInterval(this.notice_timer)
  },
  methods: {
    refreshNotce: function () {
      getNoticesNum().then((resp) => {
        this.notices_count = resp.data.total
      })
    },
    showNotice: function () {
      getLatestNotices().then((resp) => {
        if (this.notices_count > 0) {
          this.$Modal.info({
            title: resp.data.notice.title,
            content: resp.data.notice.body
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
