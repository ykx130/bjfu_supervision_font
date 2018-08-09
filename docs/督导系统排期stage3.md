# 督导系统stage3

## 后端

### 通用数据获取rpc接口

> @zd @yzr

```

query(table_name='', args={})

```
在该接口上封装出业务接口

### 离线计算结果入redis，用于首页dashbord展示和异常(*)

> @ssr @yzr

开一个单独的计算项目， 接收kafka消息进行消费计算 结果入redis， 字段参考首页图片 待定

目前要计算内容:
* 各学院的评价课程数
* 全校督导数
* 已评价课程和未评价课程
* 低分数预警

### 使用代理转发机制对接旧督导系统用户

> @zd

,..略

## 前端

### 问卷系统完全可用(*)

> @yzr @pxj 

* 风格样式统一 @ yzr
* 功能可用 @ yzr
* block类型新增 目前做子标题类型 @pxj

### 用户大事件

> @dq @xzl

* 通过大事件的时间点限定查询form的范围  @dq
* 大事件一些数据汇总界面(依赖用户接口转移完成) @xzl 

### 首页dashbord

> @hmx @xzl


先做一个假数据的首页 

> https://admin.iviewui.com/home 
> https://panjiachen.gitee.io/vue-element-admin/#/dashboard 参考这俩 试试布局 留好接口 

@hmx 负责总布局和数字卡片 

@xzl 负责饼图 线图 柱状图组件开发 和 布局辅助调整
