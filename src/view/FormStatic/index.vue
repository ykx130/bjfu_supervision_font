<template>
  <Card>
  <Row>
    <Col span="24" v-for="option in options">
        <div align="center">
          <ChartBar style="height: 260px;" :value="option.data" :text="option.title"></ChartBar>
        </div>
    </Col>
  </Row>
  </Card>

</template>
<script>
import { getGraph } from '../../service/api/dqs'
import { ChartBar } from '_c/charts'
export default {
  components: {ChartBar},
  data () {
    return {
      options: [],
      data: []
    }
  },
  mounted () {
    getGraph().then((resp) => {
      this.data = resp.data.item_map
      this.options = this.data.map(function (item) {
        let graphItem = {
          data: {}
        }
        for (let index in item.point) {
          graphItem.data[item.point[index].option.value] = item.point[index].num
        }
        graphItem.title = item.item_name
        return graphItem
      })
    })
  }
}
</script>

<style scoped>

</style>
