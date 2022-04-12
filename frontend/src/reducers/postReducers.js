import {
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
  POST_UPLOAD_FAIL,
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
