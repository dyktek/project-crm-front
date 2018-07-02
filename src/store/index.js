import Vue from 'vue'
import Vuex from 'vuex'
import roles from './modules/roles'
import auth from './modules/auth'
import event from './modules/event'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dayIterator: 1
  },
  modules: {
    roles,
    auth,
    event
  }
})
