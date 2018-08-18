export default {
  methods: {
    showTitle (item) {
      return  item.name
    },
    showChildren (item) {
      if (item.children && item.children.length !== 0){
        for (let c in item.children) {
          if (item.children[c].name){
            return true
          }
        }
        return false
      }
    }
  }
}
