import jwt from 'jsonwebtoken'
import publicKey from './../../jwt/public'

const state = {
  logged: false
}

const getters = {
  logged: state => {
    return state.logged
  }
}

const actions = {
  login ({commit}, loginData) {
    axios.post('login', loginData)
      .then(result => {
        // console.log(result.data.access_token)
        jwt.verify(result.data.access_token, publicKey, error => {
          if(!error) {
            localStorage.setItem('token', result.data.access_token)
            commit('LOGGED')
          }
        })
      })
  }
}

const mutations = {
  LOGGED (state) {
    state.logged = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}