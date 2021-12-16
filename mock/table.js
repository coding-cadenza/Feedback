const Mock = require('mockjs')

const data = Mock.mock({
  'items|40': [{
    feedback_id: '@id',
    input_time: '@datetime',
    type: '1',
    client_name: '王志辰',
    client_enterprise: '夜莺科技',
    target: '微伴助手',
    content: '真的好用',
    operator: 'name',
    captures: [
      'aute ex dolor',
      'sunt cupidatat anim amet velit',
      'voluptate ut',
      'in aute proident nulla mollit'
    ]
  }]
})

module.exports = [
  {
    url: '/ap/list/1',
    type: 'get',
    response: config => {
      const items = data.items
      return {

        data: {
          code: 200,
          count: items.length,
          items: items
        }
      }
    }
  }
]
