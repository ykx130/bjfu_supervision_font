// 动态问卷相关的路由配置

export default[{
  name: "用户",
  path: "/user",
  component: resolve => require(['Views/index'], resolve),
  children: [
    {
      name: "督导管理",
      path: "guiders", // xzl
      component: resolve => require(['Views/UserManager/index'], resolve),
    },
    {
      name: "教师管理",
      path: "teachers", // xzl
      component: resolve => require(['Views/UserSuperManager/index'], resolve),
    },
    {
      name: "学院负责人",
      path: "supers", // xzl
      component: resolve => require(['Views/UserTeacherManagerList/index'], resolve),
    },
  ]
}]
