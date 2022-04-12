import {
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
  POST_UPLOAD_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_RESET,
} from '../constants/postConstants'

export const postSubmitReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_UPLOAD_REQUEST:
      return { loading: true }
    case POST_UPLOAD_SUCCESS:
      return { loading: false, postInfo: action.payload, success: true }
    case POST_UPLOAD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true, posts: [] }
    case POST_LIST_SUCCESS:
      return { loading: false, posts: action.payload }
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload }
    case POST_LIST_RESET:
      return { posts: [] }
    default:
      return state
  }
}
