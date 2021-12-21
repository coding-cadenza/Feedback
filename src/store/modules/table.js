
const state = {
  shosearch: ''
}

const mutations = {
  SHOW_SEARCH: state => {
    state.showsearch = true
  },
  HIDE_SEARCH: state => {
    state.showsearch = false
  }
}

const actions = {

  showsearch({ commit }) {
    return new Promise(resolve => {
      commit('SHOW_SEARCH')
      resolve()
    })
  },
  hidesearch({ commit }) {
    return new Promise(resolve => {
      commit('HIDE_SEARCH')
      resolve()
    }
    )
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

