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
