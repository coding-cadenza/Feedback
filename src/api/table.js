import request from '@/utils/request'

export function getList(feachparams) {
  return request({
    url: '/api/feedback/list/' + feachparams.page,
    method: 'get',
    params: {
      type: feachparams.type,
      content: feachparams.content,
      is_time_sort_asc: feachparams.is_time_sort_asc
    }
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
