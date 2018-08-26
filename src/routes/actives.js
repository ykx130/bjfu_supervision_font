// 动态问卷相关的路由配置

export default[
  {
  name: "活动",
  path: "/active",
  component: resolve => require(['Views/index'], resolve),
  children: [
    {
      name: "教学辅导",
      path: "help", // xzl
      // component: resolve => require(['Views/FormMetaManager/index'], resolve),
      component: resolve => require(['Views/ActiveManager/index'], resolve),
    },
    {
      name: "好评课堂",
      path: "good_lesson", // xzl
      component: resolve => require(['Views/FormMetaManager/index'], resolve),
    },
    {
      path:'/active/:id',
      component:resolve => require(['Views/ActiveDetail/index'], resolve),
    }
  ]},

  ]
