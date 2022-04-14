import {
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
  POST_UPLOAD_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_RESET,
  MY_POST_REQUEST,
  MY_POST_SUCCESS,
  MY_POST_FAIL,
  MY_POST_RESET,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIKE_FAIL,
  POST_UNLIKE_REQUEST,
  POST_UNLIKE_SUCCESS,
  POST_UNLIKE_FAIL,
  POST_UPDATE_LIKES,
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
    case POST_UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false,
      }
    case POST_LIST_RESET:
      return { posts: [] }
    default:
      return state
  }
}

export const myPostReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case MY_POST_REQUEST:
      return { loading: true, posts: [] }
    case MY_POST_SUCCESS:
      return { loading: false, posts: action.payload }
    case MY_POST_FAIL:
      return { loading: false, error: action.payload }
    case MY_POST_RESET:
      return { posts: [] }
    default:
      return state
  }
}

export const postLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_LIKE_REQUEST:
      return { loading: true }
    case POST_LIKE_SUCCESS:
      return { loading: false, data: action.payload }
    case POST_LIKE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const postUnLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_UNLIKE_REQUEST:
      return { loading: true }
    case POST_UNLIKE_SUCCESS:
      return { loading: false, data: action.payload }
    case POST_UNLIKE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
