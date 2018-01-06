import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  user: null,
  pins: [],
  ownPins: [],
  page: 1,
  text: '',
  pageSize: 2
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
