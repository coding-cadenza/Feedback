import { logout } from '@/api/user'

import Cookies from 'js-cookie'
const getDefaultState = () => {
  return {
    name: '', // 用户名
    avatar: '' // 头像
  }
}
const state = getDefaultState()
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
    // 删除cookie
    var expires = new Date()
    expires.setTime(expires.getTime() - 1)
    document.cookie = 'username=;expires=' + expires.toGMTString()
    document.cookie = 'avatar=;expires=' + expires.toGMTString()
    document.cookie = 'feedback_session=;expires=' + expires.toGMTString()
  },
  GET_NAME: (state) => {
    state.name = Cookies.get('username')
  },
  GET_AVATAR: (state) => {
    state.avatar = Cookies.get('avatar')
  }
}

const actions = {
  // 用户登录的时候，在调用了api后，设置用户名和头像(从cookei获取)
  login({ commit }) {
    return new Promise((resolve) => {
      commit('GET_NAME')
      commit('GET_AVATAR')
      resolve()
    })
  },

  // 用户退出登录时(像后端发送请求，并在这里把用户信息给干掉)
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('RESET_STATE') // 将用户名和头像清空
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 重置信息
  resetUserInfo({ commit }) {
    return new Promise(resolve => {
      commit('RESET_STATE') // 将用户名和头像清空
      resolve()
    })
  },
  getUserInfo({ commit }) {
    return new Promise(resolve => {
      // 获取头像和用户名
      commit('GET_NAME')
      commit('GET_AVATAR')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

