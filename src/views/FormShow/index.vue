<template>
  <div>
    <h1 v-model="form_meta.meta.table_name" style="text-align: center">{{ form_meta.meta.table_name }}</h1>
    <br>
    <div>
      <div v-model="form_meta.meta.created_at" v-bind:style="{ fontSize:'15px',float:'left',width:'33%' }">创建时间：{{ form_meta.meta.created_at }}</div>
      <div v-model="form_meta.meta.created_by" v-bind:style="{ fontSize:'15px',float:'left',width:'33%' }">创建人：{{ form_meta.meta.created_by }}</div>
      <div v-model="form_meta.meta.version" v-bind:style="{ fontSize:'15px',float:'left',width:'33%' }">版本号：{{ form_meta.meta.version }}</div>
    </div>
  </div>
</template>
<script>
  import { getFormMeta } from "../../service/api/dqs";

  export default {
    data () {
      return {
        form_meta: {
          id:"",
          identity:"",
          meta:{
            table_name:"",
            version:"",
            created_at:"",
            updated_at:"",
            created_by:""
          },
          item:[
            {
              item_id:"",
              item_name:"",
              item_type:"",
              extra:"",
              type:"",
              payload:{
                options:[]
              }
            }
          ]
        }
      }
    },
    mounted() {
      getFormMeta(1).then((resp)=>{console.log(resp)})
    }
  }
</script>

