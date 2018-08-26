// 动态问卷相关的路由配置

export default[{
  name: "课程",
  path: "/lesson",
  component: resolve => require(['Views/index'], resolve),
  children: [
    {
      name: "课程管理",
      path: "manager", // xzl
      component: resolve => require(['Views/LessonManager/index'], resolve),
    },
    {
      name: "好评课堂",
      path: "good_lesson", // xzl
      component: resolve => require(['Views/FormMetaManager/index'], resolve),
    },
  ]
}]
