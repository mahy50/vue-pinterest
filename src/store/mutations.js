import * as types from './types'

export default {
  [types.LOGIN]: (state, data) => {
    state.user = Object.assign({}, data)
  },
  [types.LOGOUT]: (state, data) => {
    state.user = null
  },
  [types.USERUPDATE]: (state, data) => {
    state.user = Object.assign({}, data)
  }
}
