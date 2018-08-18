// 动态问卷相关的路由配置

export default[{
  name: "课程",
  path: "/lesson",
  component: resolve => require(['Views/index'], resolve),
  children: [
    {
      name: "课程管理",
      path: "star", // xzl
      component: resolve => require(['Views/LessonManager/index'], resolve),
    },
  ]
}]
