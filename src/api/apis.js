const baseURL = 'api/v1'

// user
export const LOGIN = `${baseURL}/user/login` // post
export const SIGNUP = `${baseURL}/user/signup` // post
export const LOGOUT = `${baseURL}/user/logout` // get
export const ISAUTH = `${baseURL}/user/authenication`
export const CREATEPIN = `${baseURL}/user/pin` // post
export const GETOWNPINS = `${baseURL}/user/pins` // get
export const DELPINBYID = `${baseURL}/user/pin/` // :id  delete

// pins
export const GETPINS = `${baseURL}/pins` // get
export const GETPINBYID = `${baseURL}/pin/` // :id get
export const UPDATEPINBYID = `${baseURL}/pin/` // :id post
