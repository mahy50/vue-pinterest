import * as types from './types'
import * as apis from './../api/apis'
import axios from 'axios'
export default {
  [types.GETPINS]: ({commit, state}) => {
    return axios
      .get(apis.GETPINS, {
        params: {
          page: state.page,
          pageSize: state.pageSize,
          text: state.text || ''
        }
      })
      .then(res => {
        if (res.data.length < state.pageSize || res.data.length === 0) {
          commit(types.UPDATEPINS, res.data)
          return false
        }
        commit(types.UPDATEPAGENUM, ++state.page)
        commit(types.UPDATEPINS, res.data)
        return true
      })
  },
  [types.GETPINBYID]: ({commit, state}, id) => {
    return axios
      .get(apis.GETPINBYID + id)
      .then(res => {
        return res.data
      })
  },
  [types.LOGIN]: ({commit, state}, params) => {
    return axios
      .post(apis.LOGIN, params)
      .then(res => {
        commit(types.UPDATEUSER, res.data)
      })
  },
  [types.SIGNUP]: ({commit, state}, params) => {
    return axios
      .post(apis.SIGNUP, params)
      .then(res => {
        commit(types.UPDATEUSER, res.data)
      })
  },
  [types.LOGOUT]: ({commit, state}) => {
    return axios
      .get(apis.LOGOUT)
      .then(res => {
        commit(types.LOGOUT)
      })
  },
  [types.ISAUTH]: ({commit, state}) => {
    return axios
      .get(apis.ISAUTH)
      .then(res => {
        commit(types.UPDATEUSER, res.data)
        return true
      }, () => false)
  },
  [types.CREATEPIN]: ({commit, state}, params) => {
    return axios
      .post(apis.CREATEPIN, params)
      .then(() => true)
  },
  [types.GETOWNPINS]: ({commit, state}) => {
    return axios
      .get(apis.GETOWNPINS)
      .then(res => {
        state.ownPins = res.data
      })
  },
  [types.DELPINBYID]: ({commit, state}, id) => {
    return axios
      .delete(apis.DELPINBYID + '/' + id)
  },
  [types.UPDATEPINBYID]: ({commit, state}, data) => {
    const {id, title, url, description} = data
    return axios
      .post(apis.UPDATEPINBYID + '/' + id, {title, url, description})
  }
}
