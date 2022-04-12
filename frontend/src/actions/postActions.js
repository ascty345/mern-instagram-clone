import axios from 'axios'
import {
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
  POST_UPLOAD_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
} from '../constants/postConstants'

export const postUpload = (post) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_UPLOAD_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/posts/createPost', post, config)

    dispatch({
      type: POST_UPLOAD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_UPLOAD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listPost = () => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/posts/allPosts', config)

    dispatch({ type: POST_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
