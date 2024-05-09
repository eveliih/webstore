import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import storageService from '../services/storage'
import { notify } from './notificationReducer'

const initialState = null

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear() {
      return initialState
    }
  },
})

export const { set, clear } = slice.actions

export const registerUser = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.register(credentials)
      dispatch(notify('Account created successfully! You can now log in.'))
    } catch (e) {
      console.log("registeruser error")
      dispatch(notify('username already taken', 'error'))
    }
  }

}

export const loginUser = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      storageService.saveUser(user)
      dispatch(set(user))
      dispatch(notify('welcome!'))
    } catch (e) {
      console.log("loginuser error", e)
      dispatch(notify('wrong username or password', 'error'))
    }
  }
}

export const initUser = () => {
  return async dispatch => {
    const user = storageService.loadUser()
    dispatch(set(user))
  }
}

export const clearUser = () => {
  return async dispatch => {
    storageService.removeUser()
    dispatch(clear())
  }
}


export default slice.reducer