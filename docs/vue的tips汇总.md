## vue tips

## iview 处理层级的table渲染
数据格式如下

```js

        peoples: [{
          name: "su",
          data: {
            age:"12"
          }
        }]

```

怎么 让name和age展示在table里？

查看iview文档 看到 table 的columns提供了render这个属性 vue render介绍 https://cn.vuejs.org/v2/guide/render-function.html#%E5%9F%BA%E7%A1%80


这个可以这么写


```js

        columns1: [
          {
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Age',
            render: function (h,params) {
              return (<span>{params.row.data.age}</span>)
            }
          }
        ]
```

> 注意和一下og的dev并且执行npm install


```js
            render: function (h,params) {
              return (<span>{params.row.data.age}</span>)
            }
```

这个是什么？这个是jsx 一种可以直接在js里写html代码的技术https://cn.vuejs.org/v2/guide/render-function.html#JSX 教程在这里，通过对编译器 Babel 设置可以让vue支持这种写法

