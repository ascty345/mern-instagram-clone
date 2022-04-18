import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  GET_OTHER_USER_POSTS_REQUEST,
  GET_OTHER_USER_POSTS_SUCCESS,
  GET_OTHER_USER_POSTS_FAIL,
} from '../constants/userConstants'

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userLoginReducer = (state = { userInfo: null }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return { userInfo: null }
    default:
      return state
  }
}

export const getOtherUserPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_OTHER_USER_POSTS_REQUEST:
      return { loading: true, posts: [] }
    case GET_OTHER_USER_POSTS_SUCCESS:
      return { loading: false, posts: action.payload }
    case GET_OTHER_USER_POSTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
