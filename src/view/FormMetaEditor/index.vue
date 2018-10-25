<template>
  <!--whole form meta editor begin-->
  <Card>
    <MetaEditor v-model="this.form_meta" @onSubmitClick="handleSubmit"></MetaEditor>
  </Card>

  <!--whole form meta editor end-->
</template>

<script>
  import {
    putFormMeta,
    getFormMeta,
    postFormMeta
  } from '../../service/api/dqs'
  import MetaEditor from 'Views/components/meta_editor'
  export default {
    name: 'form_meta_editor',
    components: {
      MetaEditor
    },
    data () {
      return {
        form_meta: {
          meta:{},
          items:[]
        }
      }
    },
    mounted: function () {
      const args = this.$route.params;
      if (args.name) {
        getFormMeta(args).then((response) => {
          this.form_meta = response.data.form_meta;
        })
      }
    },
    methods: {
      handleSubmit: function () {
        postFormMeta(this.form_meta).then(function (response) {
          console.log(response)
        })
          .catch(function (error) {
            console.log(error)
          })
        this.$Message.info('Items created!')
      }
    }
  }

</script>

<style scoped lang="less">

</style>
