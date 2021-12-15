import { logout } from '@/api/user'
import { resetRouter } from '@/router'
import Cookies from 'js-cookie'
const getDefaultState = () => {
  return {
    name: '岑锦锋', // 用户名
    avatar: 'dsad' // 头像
  }
}
const state = getDefaultState()
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  GET_NAME: (state, name) => {
    state.name = Cookies.get('username')
  },
  GET_AVATAR: (state, avatar) => {
    state.avatar = Cookies.get('avatar')
  },
  SET_COOKEI: (state) => {
    Cookies.set('username', '岑锦锋', { path: '/' })
  }
}

const actions = {
  // 用户登录的时候，在调用了api后，设置用户名和头像(从cookei获取)
  login({ commit }) {
    return new Promise((resolve, reject) => {
      commit('GET_NAME')
      commit('GET_AVATAR')
      resolve()
    })
  },

  // 用户退出登录时(像后端发送请求，并在这里把用户信息给干掉)
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout.then(() => {
        commit('RESET_STATE') // 将用户名和头像清空
        resetRouter() // 重置路由
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 重置信息
  resetUserInfo({ commit, state }) {
    commit('RESET_STATE') // 将用户名和头像清空
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions

}

