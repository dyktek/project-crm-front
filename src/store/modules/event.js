const state = {
  events: [],
  refresh_2: 0,
  event: {}
}

const getters = {
  events: state => {
    return state.events
  },
  event: state => {
    return state.event
  },
  refresh_2: state => {
    return state.refresh_2
  }
}

const actions = {
  events ({commit}, date) {
    axios(`events?start_date=${date.start_date}&end_date=${date.end_date}`)
      .then(result => commit('EVENTS', result.data))
  },
  storeEvent ({commit}, event) {
    axios.post(`/events`, event)
      .then(() => commit('REFRESH_2'))
  },
  updateEvent ({commit}, event) {
    axios.put(`/events/${event.id}`, event)
      .then(() => commit('REFRESH_2'))
  },
  getEvent ({commit}, id) {
    axios(`/events/${id}`)
      .then(result => commit('EVENT', result.data.data))
  },
  deleteEvent ({commit}, id) {
    axios.delete(`/events/${id}`)
      .then(() => commit('REFRESH_2'))
  }
}

const mutations = {
  EVENTS (state, events) {
    state.events = events
  },
  EVENT (state, event) {
    state.event = event
  },
  REFRESH_2 (state) {
    state.refresh_2 = ++state.refresh_2
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
