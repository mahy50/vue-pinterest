import * as types from './types'

export default {
  [types.LOGOUT]: (state, data) => {
    state.user = null
  },
  [types.UPDATEUSER]: (state, data) => {
    state.user = Object.assign({}, data)
  },
  [types.UPDATEPINS]: (state, data) => {
    state.pins = [...state.pins, ...data]
  },
  [types.SEARCHPINS]: (state, data) => {
    state.pins = [...data]
  },
  [types.UPDATEPAGENUM]: (state, data) => {
    state.page = data
  }
}
