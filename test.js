let items =
[
  {
    'item_name': 'sub_title_block_start',
    'item_type': 'sub_title_block',
    'extra': null,
    'type': 'block_item',
    'payload': {
      'title': '总体满意度'
    }
  },
  {
    'item_name': '教师满意度',
    'item_type': 'radio_option',
    'extra': null,
    'type': 'form_item',
    'payload': {
      'options': [
        {
          'label': '满意',
          'value': '满意'
        },
        {
          'label': '不满意',
          'value': '不满意'
        }
      ]
    },
    'weight': '0.5'
  },
  {
    'item_name': '满意度评价',
    'item_type': 'raw_text',
    'extra': null,
    'type': 'form_item',
    'payload': {
      'options': []
    }
  },
  {
    'item_name': 'sub_title_block_end',
    'item_type': 'sub_title_block',
    'extra': null,
    'type': 'block_item',
    'payload': {
      'options': []
    }
  },
  {
    'item_name': 'sub_title_block_start',
    'item_type': 'sub_title_block',
    'extra': null,
    'type': 'block_item',
    'payload': {
      'title': '教师听课情况'
    }
  },
  {
    'item_name': '教师讲课情况',
    'item_type': 'radio_option',
    'extra': null,
    'type': 'form_item',
    'payload': {
      'options': [
        {
          'label': '不错',
          'value': '不错'
        },
        {
          'label': '一般',
          'value': '一般'
        },
        {
          'label': '不好',
          'value': '不好'
        },
        {
          'label': '非常棒',
          'value': '非常棒'
        }
      ]
    },
    'weight': '0.5'
  },
  {
    'item_name': 'sub_title_block_start',
    'item_type': 'sub_title_block',
    'extra': null,
    'type': 'block_item',
    'payload': {
      'title': '教师板书情况'
    }
  },
  {
    'item_name': '板书总体评价',
    'item_type': 'raw_text',
    'extra': null,
    'type': 'form_item',
    'payload': {
      'options': []
    }
  },
  {
    'item_name': 'sub_title_block_end',
    'item_type': 'sub_title_block',
    'extra': null,
    'type': 'block_item',
    'payload': {
      'options': []
    }
  },
  {
    'item_name': 'sub_title_block_end',
    'item_type': 'sub_title_block',
    'extra': null,
    'type': 'block_item',
    'payload': {
      'options': []
    }
  }
]

function build (items) {
  let stack = []
  let cur = {
    item_name: 'root',
    items: []
  }

  for (let i in items) {
    if (items[i].type === 'block_item') {
      // 处理块样式
      if (items[i].item_name.endsWith('_start')) {
        //
        stack.push({
          ...items[i]
        })
        cur.items.push({
          ...items[i],
          pre: cur,
          items: []
        })
        cur = cur.items[cur.items.length - 1]
      } else {
        stack.pop()
        cur = cur.pre
      }
    } else {
      // 处理问题项目
      cur.items.push({
        ...items[i]
      })
    }
  }
  return cur
}

let cur = build(items)
console.log(cur)

function parser (cur) {
  let res = []
  for (let i in cur.items) {
    if (cur.items[i].type === 'block_item') {
      res.push({ ...cur.items[i], pre: undefined })
      res = res.concat(parser(cur.items[i]))
      res.push({
        'item_name': 'sub_title_block_end',
        'item_type': 'sub_title_block',
        'extra': null,
        'type': 'block_item',
        'payload': {
          'options': []
        }
      })
    } else {
      res.push(cur.items[i])
    }
  }

  return res
}

parser(cur)
