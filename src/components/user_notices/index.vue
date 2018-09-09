<template>
  <div @click="showNotice">
    <Badge :count="notices_count" :offset="[15, 0]">
      <Icon  type="ios-notifications-outline" size="27" ></Icon>
    </Badge>
  </div>
</template>

<script>
  import { getNoticesNum, getLatestNotices } from "../../service/api/notices"

  export default {
        name: "user_notices",
        data: function () {
          return {
            notices_count: 0
          }
        },
        mounted: function () {
          getNoticesNum().then((resp)=>{
            this.notices_count = resp.data.total
          })
        },
        methods: {
          showNotice: function () {
             getLatestNotices().then((resp)=>{
               if (this.notices_count >0 ){
                 this.$Modal.info({
                   title: resp.data.notice.title,
                   content: resp.data.notice.body
                 });
               }
             })
          }
        }
    }
</script>

<style scoped>

</style>
