<template>
  <div style="text-align: center; width: 600px">
    <!-- Whole -->
    <h1>Form Editor</h1>
    <div>
      <!-- Form head -->
      <div>
        <h1>Name: </h1>
        <Input v-model="item_type_name"
               placeholder="Can't assign to none string..."
               style="width: 400px">

        </Input>
        <br>
        <h1>Signal: </h1>
        <Input v-model="item_type_id"
               placeholder="Can't assign to none string..."
               style="width: 400px">

        </Input>
      </div>
      <!-- head End -->

      <!-- Form floater -->
      <div>

        <p>Here add a item</p>
        <Row>
          <Button type="primary"
                  @click="addFloater">Click to add floater</Button>
        </Row>

        <div style="float: right">
          <Row>
            <Button type="primary"
                    @click="addFloater"
                    style="width: 100px">Add</Button>
          </Row>
          <Row>
            <Button type="primary"
                    @click="addFloater"
                    style="width: 100px">Edit</Button>
          </Row>
          <Row>
            <Button type="primary"
                    @click="addFloater"
                    style="width: 100px">Delete</Button>
          </Row>
        </div>

      </div>
      <!-- floater End -->
    </div>
  </div>
</template>

<script>
  // import
  export default {
    data() {
      return {
        item_type_name: 'name',
        item_type_id: 'signal'

      }
    },
    methods: {
      addFloater() {
        this.$Message.info('Adjusting button')
      }
    }
  }
</script>
