// 动态问卷相关的路由配置
import Main from 'Views/index'

export default[{
  name: "问卷",
  path: "/dqs",
  component: resolve => require(['Views/index'], resolve),
  children: [
    {
      name: "问卷结构管理",
      path: "meta_manager", // xzl
      meta: {
        visible: true
      },
      component: resolve => require(['Views/FormMetaManager/index'], resolve),
    },
    {
      path: "meta_editor", // yzr
      name: "问卷结构编辑",
      meta: {
        visible: true
      },
      component: resolve => require(['Views/FormMetaCreater/index'], resolve),
    },
    {
      path: "meta_editor/:name/:version", // yzr
      component: resolve => require(['Views/FormMetaEditor/index'], resolve)
    },
    {
      path: "form_fill/:name/:version", // 问卷填写
      component: resolve => require(['Views/FormFill/index'], resolve),
    },
    {
      path: "form_show/:id", // hmx问卷查看
      component: resolve => require(['Views/FormShow/index'], resolve),
    },
    {
      name: "问卷管理",
      path: "form_manager", // xzl
      meta: {
        visible: true
      },
      component: resolve => require(['Views/FormManager/index'], resolve),
    },
    {
      name: "各组评价情况查看",
      path: "lesson_records", // xzl
      meta: {
        visible: true
      },
      component: resolve => require(['Views/GroupLessonList/index'], resolve),
    },
    {
      name: "问卷数据分析",
      path: "form_sa", // xzl
      meta: {
        visible: true
      },
      component: resolve => require(['Views/FormStatic/index'], resolve),
    },
  ]
}]
