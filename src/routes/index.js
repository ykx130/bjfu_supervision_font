import dsq from './dsq'
import user from './user'
import actives from './actives'
import lesson from './lesson'

export default [
  {
    name: "首页",
    path: "/",
    component: resolve => require(['Views/index'], resolve),
  },
	...dsq,
  ...user,
  ...actives
]
