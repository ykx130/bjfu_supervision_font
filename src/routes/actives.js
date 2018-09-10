// 动态问卷相关的路由配置

export default[
  {
  name: "活动",
  path: "/active",
    component: resolve => require(['Views/index'], resolve),
    children: [
    {
      name: "教学辅导",
      path: "manager", // xzl
      component: resolve => require(['Views/ActiveManager/index'], resolve),
      meta: {
        visible: true
      },
      children: [{
        path:':id',
        component:resolve => require(['Views/ActiveDetail/index'], resolve),
      }]
      // component: resolve => require(['Views/FormMetaManager/index'], resolve),
    },
    {
      name: "报名中心",
      path:'/attend',
      meta: {
        visible: true
      },
      component:resolve => require(['Views/ActiveAttend/index'], resolve),
    }
  ]},

  ]
