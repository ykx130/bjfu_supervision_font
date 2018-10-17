import dsq from './dsq'
import user from './user'
import actives from './actives'
import lesson from './lesson'
import consult from './consult'

export default [
  {
    name: "首页",
    path: "/",
    meta: {
      visible: true
    },
    component: resolve => require(['Views/index'], resolve),
    children: [
      {
        path: "DashBordAdmin", // xzl
        component: resolve => require(['Views/DashBordAdmin/index'], resolve),
      }
    ]
  },
  {
    path: "/login", // xzl
    component: resolve => require(['Views/LoginPage/index'], resolve),
  },
  ...dsq,
  ...user,
  ...actives,
  ...lesson,
  ...consult
]
