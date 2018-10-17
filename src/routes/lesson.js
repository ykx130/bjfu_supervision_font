// 动态问卷相关的路由配置

export default[{
  name: "课程",
  path: "/lesson",
  component: resolve => require(['Views/index'], resolve),
  children: [
    {
      name: "课程管理",
      path: "manager", // xzl
      meta: {
        visible: true
      },
      component: resolve => require(['Views/LessonManager/index'], resolve),
    },
    {
      name: "好评课堂",
      path: "good_lesson", // xzl
      meta: {
        visible: true
      },
      component: resolve => require(['Views/FormMetaManager/index'], resolve),
    },
    {
      name: "关注课程",
      path: "notice_lesson", // xzl
      meta: {
        visible: true
      },
      component: resolve => require(['Views/LessonNoticeManager/index'], resolve),
    },
    {
      name: "课程表",
      path: "lesson_form", // xzl
      meta: {
        visible: true
      },
      component: resolve => require(['Views/LessonForm/index'], resolve),
    },
  ]
}]
