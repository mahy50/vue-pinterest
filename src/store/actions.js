import * as types from './types'
import * as apis from './../api/apis'
import axios from 'axios'
export default {
  [types.GETPINS]: ({commit, state}) => {
    return axios.get(apis.GETPINS, {
      params: {
        page: state.page,
        pageSize: state.pageSize
      }
    }).then(res => {
      if (res.data.status === 0) {
        if (res.data.result.length < state.pageSize || res.data.result.length === 0) {
          commit(types.UPDATEPINS, res.data.result)
          return false
        }
        commit(types.UPDATEPAGENUM, ++state.page)
        commit(types.UPDATEPINS, res.data.result)
        return true
      }
    })
  },
  [types.FETCHPINBYID]: ({commit, state}, id) => {
    return axios.get(apis.FETCHPINBYID + id).then(res => {
      if (res.data.status === 0) {
        return res.data.result
      }
    })
  },
  [types.LOGIN]: ({commit, state}, params) => {
    return axios.post(apis.LOGIN, params).then(res => {
      if (res.data.status === 0) {
        commit(types.UPDATEUSER, res.data.result)
      }
    })
  },
  [types.SIGNUP]: ({commit, state}, params) => {
    return axios.post(apis.SIGNUP, params).then(res => {
      if (res.data.status === 0) {
        commit(types.UPDATEUSER, res.data.result)
      }
    })
  },
  [types.LOGOUT]: ({commit, state}) => {
    return axios.get(apis.LOGOUT).then(res => {
      if (res.data.status === 0) {
        commit(types.LOGOUT)
      }
    })
  },
  [types.ISAUTH]: ({commit, state}) => {
    return axios.get(apis.ISAUTH).then(res => {
      if (res.data.status === 0) {
        commit(types.UPDATEUSER, res.data.result)
        return true
      }
      return false
    })
  },
  [types.UPLOADFILE]: ({commit, state}, params) => {
    return axios.post(apis.UPLOADFILE, params).then(res => {
      if (res.data.status === 0) {
        return true
      } else {
        return false
      }
    })
  },
  [types.GETOWNPINS]: ({commit, state}) => {
    return axios.get(apis.GETOWNPINS).then(res => {
      if (res.data.status === 0) {
        state.ownPins = res.data.result
      }
    })
  },
  [types.DELPINBYID]: ({commit, state}, id) => {
    return axios.delete(apis.DELPINBYID + '/' + id).then(res => {
      if (res.data.status === 0) {
        return true
      } else {
        return false
      }
    })
  },
  [types.UPDATEPINBYID]: ({commit, state}, data) => {
    const { id, title, url, description } = data
    return axios.post(apis.UPDATEPINBYID + '/' + id, {
      title,
      url,
      description
    }).then(res => {
      if (res.data.status === 0) {
        return true
      } else {
        return false
      }
    })
  },
  [types.SEARCHPINS]: ({commit, state}, search) => {
    return axios.get(apis.SEARCHPINS, {
      params: {
        text: search
      }
    }).then(res => {
      if (res.data.status === 0) {
        return true
      } else {
        return false
      }
    })
  }
}
