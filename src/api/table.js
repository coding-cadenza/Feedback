import request from '@/utils/request'

export function getList(page) {
  return request({
    url: '/api/feedback/list/' + page,
    method: 'get'
  })
}

export function DeleteById(id) {
  return request({
    url: '/api/feedback/{id}' + id,
    method: 'get'
  }).then(res => {

  })
}
