import request from '@/utils/request'

export function GetItemById(id) {
  return request({
    url: '/api/feedback/' + id,
    method: 'get'
  })
}

export function UpdateItemById(item) {
  // 创建formData
  var param = new FormData()
  if (item.cap_id !== undefined) {
    param.append('cap_id', item.cap_id)
  }
  if (item.uploadImgList !== undefined) {
    item.uploadImgList.forEach(
      (val, index) => {
        param.append('image_' + (index + 1), val)
      }
    )
  }
  param.append('client_name', item.client_name)
  param.append('client_enterprise', item.client_enterprise)
  param.append('target', item.target)
  param.append('content', item.content)
  param.append('type', item.type)

  return request({
    url: '/api/feedback/' + item.feedback_id,
    method: 'put',
    data: param
  })
}

// 创建新item
export function CreatItem(data) {
  var param = new FormData()

  // 将图片传入
  data.dealImgFileList.forEach(
    (val, index) => {
      param.append('image_' + (index + 1), val)
    }
  )

  // 将其他字段传入
  param.append('client_name', data.client_name)
  param.append('client_enterprise', data.client_enterprise)
  param.append('target', data.target)
  param.append('content', data.content)
  param.append('type', data.type)

  return request({
    url: '/api/feedback',
    contentType: 'multipart/form-data',
    method: 'post',
    data: param
  })
}
