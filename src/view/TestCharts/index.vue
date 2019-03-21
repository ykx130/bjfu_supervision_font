<template>
  <Card>
    <Display :code="code"/>
  </Card>
</template>
<script>
import Display from '@/view/components/display'
import defaultCode from './default-code.js'

export default {
  components: { Display },
  data: function () {
    return {
      code: defaultCode
    }
  }
}
</script>
