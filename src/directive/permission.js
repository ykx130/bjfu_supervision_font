
import store from '@/store'

export default{
  deep: true,
  inserted (el, binding, vnode) {
    const { value } = binding
    const access = store.getters && store.getters.access
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = access.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
