import request from '@/utils/request'

export function GetItemById(id) {
  return request({
    url: '/api/feedback/' + id,
    method: 'get'
  })
}

// export function UpdateItemById(id, item) {
//   return request({
//     url: '/api/feedback/' + id,
//     method: 'put',
//     params: {
//         client_name:,
//         client_enterprise:,
//         target:,
//         content:,
//         type:,
//         cap_id:,
//     }
//   })
// }

// 创建新item
export function CreatItem(data) {
  var param = new FormData()

  // 将图片传入
  data.dealImgFileList.forEach(
    (val, index) => {
      param.append('image_' + (index + 1), val.raw)
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
