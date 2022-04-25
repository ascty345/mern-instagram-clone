import {
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
  POST_UPLOAD_FAIL,
  POST_UPLOAD_RESET,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_RESET,
  MY_POST_REQUEST,
  MY_POST_SUCCESS,
  MY_POST_FAIL,
  MY_POST_RESET,
  POST_UPDATE_LIKES,
  POST_UPDATE_COMMENTS,
  POST_DELETE,
  FOLLOWING_POST_LIST_REQUEST,
  FOLLOWING_POST_LIST_SUCCESS,
  FOLLOWING_POST_LIST_FAIL,
  FOLLOWING_POST_LIST_RESET,
  SINGLE_POST_LIST_REQUEST,
  SINGLE_POST_LIST_SUCCESS,
  SINGLE_POST_LIST_FAIL,
  SINGLE_POST_LIST_RESET,
} from '../constants/postConstants'

export const postSubmitReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_UPLOAD_REQUEST:
      return { loading: true }
    case POST_UPLOAD_SUCCESS:
      return { loading: false, postInfo: action.payload, success: true }
    case POST_UPLOAD_FAIL:
      return { loading: false, error: action.payload }
    case POST_UPLOAD_RESET:
      return {}
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
    case POST_UPDATE_COMMENTS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? { ...post, comments: action.payload.comments }
            : post
        ),
        loading: false,
      }
    case POST_DELETE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId ? { ...post, deleted: true } : post
        ),
        deleteConfirm: action.payload.message,
        loading: false,
      }
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload }
    case POST_LIST_RESET:
      return { posts: [] }
    default:
      return state
  }
}

export const followingPostListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case FOLLOWING_POST_LIST_REQUEST:
      return { loading: true, posts: [] }
    case FOLLOWING_POST_LIST_SUCCESS:
      return { loading: false, posts: action.payload }
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
    case POST_UPDATE_COMMENTS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? { ...post, comments: action.payload.comments }
            : post
        ),
        loading: false,
      }
    case POST_DELETE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId ? { ...post, deleted: true } : post
        ),
        deleteConfirm: action.payload.message,
        loading: false,
      }
    case FOLLOWING_POST_LIST_FAIL:
      return { loading: false, error: action.payload }
    case FOLLOWING_POST_LIST_RESET:
      return { posts: [] }
    default:
      return state
  }
}

export const postSingleReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case SINGLE_POST_LIST_REQUEST:
      return { loading: true, posts: [] }
    case SINGLE_POST_LIST_SUCCESS:
      return { loading: false, posts: [action.payload] }
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
    case POST_UPDATE_COMMENTS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? { ...post, comments: action.payload.comments }
            : post
        ),
        loading: false,
      }
    case POST_DELETE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId ? { ...post, deleted: true } : post
        ),
        deleteConfirm: action.payload.message,
        loading: false,
      }
    case SINGLE_POST_LIST_FAIL:
      return { loading: false, error: action.payload }
    case SINGLE_POST_LIST_RESET:
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
