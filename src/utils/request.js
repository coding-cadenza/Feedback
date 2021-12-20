import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: 'https://ipandai.club', // 在服务器上用这个
  // baseURL: 'http://127.0.0.1:4523/mock/401326/',
  timeout: 5000, // request timeout
  withCredentials: true
})

// // 设置为请求前如果没有cookei.username，那么就跳到登陆界面
service.interceptors.request.use(

  config => {
    const hasusername = store.getters.name
    if (hasusername) {
      return config
    } else {
      router.push('/login')
      return Promise.reject(new Error('Error'))
    }
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// 请求后判断
service.interceptors.response.use(
  response => {
    const res = response.data
    // 如果返回code不是200，
    if (res.code !== 200) {
      // 这里再加一个回到登陆界面
      return Promise.reject(new Error(res.meg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
