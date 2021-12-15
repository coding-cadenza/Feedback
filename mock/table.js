const Mock = require('mockjs')

const data = Mock.mock({
  'items|20': [{
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
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
