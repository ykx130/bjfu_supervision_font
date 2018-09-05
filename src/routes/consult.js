// 动态问卷相关的路由配置

export default[
  {
    name: "咨询",
    path: "/consult",
    component: resolve => require(['Views/index'], resolve),
    children: [
      {
        name: "咨询管理",
        path: "manager", // xzl
        // component: resolve => require(['Views/FormMetaManager/index'], resolve),
        component: resolve => require(['Views/ConsultManager/index'], resolve),
      },
      {
        name: "咨询类型管理",
        path: "type", // xzl
        component: resolve => require(['Views/ConsultType/index'], resolve),
      },
      {
        name: "咨询申请",
        path: "apply", // xzl
        component: resolve => require(['Views/ConsultApply/index'], resolve),
      },
    ]},

]
