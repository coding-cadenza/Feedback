import request from '@/utils/request'

export function getList(page) {
  return request({
    url: '/api/feedback/list/' + page,
    method: 'get'
  })
}

export function DeleteById(id) {
  return request({
    url: '/api/feedback/' + id,
    method: 'delete'
  })
}
export function GetLatestItem() {
  return request({
    url: '/api/feedback/latest',
    method: 'get'
  })
}

export function ExportData() {
  return request({
    url: '/api/feedback/csv',
    method: 'get'
  })
}
