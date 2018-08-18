# 督导stage4

## 教师 教学负责人 用户管理
@dq

http://101.200.52.233:8000/SupervisorInfo
http://101.200.52.233:8000/UnitUserManage
http://101.200.52.233:8000/teacherManage

/user/ 里所有的组件

* users:

```json
{ 
     "id",
	"username", //用于登陆
    ... // 普通的展示
    "start_time",
    "end_time",
    "state": 在职 退休,
    "work_state": 兼职，专职
    "prorank": 教授副教授
}
```

* roles:

```json
{
	"name", 
    "permissons":["A", "B"],
    "term":""
}
```

* user_role:

```json
{
	"user_id",
    "role_id",
    "group":组名称
}
```

## 活动
@ pxj
/actives 所有组件

http://101.200.52.233:8000/activity/modify

## 统计
@hmx @xzl @suchnag @yzr

http://101.200.52.233:8000/TheoryStatistics

## 课程 
@hmx
/lesson下路由  
http://101.200.52.233:8000/NecessaryTask

```json
{
....
 "lesson_state", //评价状态
 "lesson_level", // 评价等级
 "lesson_type", // 课程类型
 "assing_group", // 分配组
 "attion_reanson", // 关注原因
 "is_good", //好评课
}
```

## curd组件思路
一个列表页加一个弹窗组成

弹窗
```
props: {
          show: Boolean,
          onCancel:Function,
          onOK: Function,
          username:""
        },
```


## 问卷相关
@suchang @yzr
