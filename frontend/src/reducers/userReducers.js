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
  FOLLOW_A_USER,
  UNFOLLOW_A_USER,
  FOLLOW_REQUEST_SUCESS,
  FOLLOW_REQUEST_FAIL,
  FOLLOW_RESET,
  TOKEN_EXPIRED,
  TOKEN_EXPIRED_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_REGISTER_RESET,
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  USER_SEARCH_FAIL,
  USER_SEARCH_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from '../constants/userConstants'

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
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
      return {
        loading: false,
        userInfo: action.payload,
      }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return { userInfo: null }
    default:
      return state
  }
}

export const userSearchReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_SEARCH_REQUEST:
      return { loading: true, users: [] }
    case USER_SEARCH_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      }
    case USER_SEARCH_FAIL:
      return { loading: false, error: action.payload, users: [] }
    case USER_SEARCH_RESET:
      return { users: [] }
    default:
      return state
  }
}

export const userLoginFollowReducer = (
  state = { followers: [], following: [] },
  action
) => {
  switch (action.type) {
    case FOLLOW_A_USER:
      return { loading: true, ...state }
    case UNFOLLOW_A_USER:
      return { loading: true, ...state }
    case FOLLOW_REQUEST_SUCESS:
      return {
        loading: false,
        followers: action.payload.followers,
        following: action.payload.following,
      }
    case FOLLOW_REQUEST_FAIL:
      return {
        loading: false,
        ...state,
        error: action.payload,
      }
    case FOLLOW_RESET:
      return { followers: [], following: [] }
    default:
      return state
  }
}

export const getOtherUserPostsReducer = (state = { info: [] }, action) => {
  switch (action.type) {
    case GET_OTHER_USER_POSTS_REQUEST:
      return { loading: true, info: [] }
    case GET_OTHER_USER_POSTS_SUCCESS:
      return { loading: false, info: action.payload }
    case GET_OTHER_USER_POSTS_FAIL:
      return { loading: false, info: [], error: action.payload }
    default:
      return state
  }
}
export const tokenExpiredReducer = (state = {}, action) => {
  switch (action.type) {
    case TOKEN_EXPIRED:
      return { message: 'Your session has expired, please login again' }
    case TOKEN_EXPIRED_RESET:
      return {}
    default:
      return state
  }
}
