督导系统stage2

## from管理 

@xzl

对form管理 支持对meta的数据检索

## form填写

@ hmx

生成的表单填写，生成form对象 form对象

```

{
  "meta_table_id": 就是展示的表的id，
  "meta": 从@dq的lesson_meta_form.vue获取，
  "values": [{根据表单填写的值生成}]
}

```

## lesson api开发
@ ssr

根据数据表开发lesson 的获取 API， 无增删改

## 自定义业务组件对form的meta组件开发

> src/views/FormShow/componentlesson_meta_form.vue

@dq

增加部分用于业务的meta， 写在form里, 选项从后端的lesson 的 api获取

```
"meta":{
	"content": "课程内容",
    "lesson": "课程名字",
    "lesson_attr": "课程属性",
    "teacher": "",
    "class": "",
    "place": ""
}
```
## 用户关键事件后台

@ zd 

```
{
	"id": 1,
    "name": "李巨虎",
    ""
}
```

## item加权

每个问题可以有个权重 
@ pxj @hmx

从数据层面看

form_meta:

```

  {
    "item_id": 2,
    "item_name": "teach_staisfiy",
    "item_type": "radio_options",
    "extra": "教师满意度",
    "type": "form_item",
    "payload": {
      "options": [{
        "label": "满意",
        "value": "yes"
      }, {
        "label": "不满意",
        "value": "no"
      }],
      "weight": 0.8
    }

  }
```

form

```

  "values" [
 {
 	      "item_id": "1",
         "item_type": "radio_option",
         "item_name": "satisfy",
         "value": "满意"，
         "weight": 0.8
 }
]
```

落实到界面上:

form_meta_editor的时候， @pxj的增加个输入框输入权重，
@hmx展示的时候展示这个权重，生成form数据的时候附加上这个权重

