export default {
  methods: {
    showTitle (item) {
      return  item.name
    },
    hasChildren (item) {
      if (item.children && item.children.length !== 0){
        for (let c in item.children) {
          if (item.children[c].meta){
            if(item.children[c].meta.visible){
              console.log("router is true", item.name)
              return true
            }
          }
        }
        console.log("router is false", item.name)
        return false
      }}
  }
}
