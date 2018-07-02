const state = {
  items: [],
  refresh: 0,
  item: {}
}

const getters = {
  items: state => {
    return state.items
  },
  item: state => {
    return state.item
  },
  refresh: state => {
    return state.refresh
  }
}

const actions = {
  items ({commit}) {
    axios('roles')
      .then(result => commit('ITEMS', result.data.data))
  },
  storeItem ({commit}, item) {
    axios.post(`/roles`, item)
      .then(() => commit('REFRESH'))
  },
  updateItem ({commit}, item) {
    axios.put(`/roles/${item.id}`, item)
      .then(() => commit('REFRESH'))
  },
  getItem ({commit}, id) {
    axios(`/roles/${id}`)
      .then(result => commit('ITEM', result.data.data))
  },
  deleteItem ({commit}, id) {
    axios.delete(`/roles/${id}`)
      .then(() => commit('REFRESH'))
  }
}

const mutations = {
  ITEMS (state, items) {
    state.items = items
  },
  ITEM (state, item) {
    state.item = item
  },
  REFRESH (state) {
    state.refresh = ++state.refresh
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
