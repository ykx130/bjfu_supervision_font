// 动态问卷相关的路由配置

export default [{
  name: "问卷",
  path: "/",
  component: resolve => require(['Views/index'], resolve),
  children: [
    {
      name: "问卷结构管理",
      path: "/meta_manager", // xzl
      component: resolve => require(['Views/FormMetaManager/index'], resolve),
    },
    {
      name: "问卷结构编辑",
      path: "/meta_editor", // yzr
      component: resolve => require(['Views/FormMetaEditor/index'], resolve),
    },
    {
      name: "问卷填写",
      path: "/form_show", // hmy
      component: resolve => require(['Views/FormShow/index'], resolve),
    },
    {
      name: "问卷管理",
      path: "/form_manager",
      component: resolve => require(['Views/FormManager/index'], resolve),
    }
  ]
}]
