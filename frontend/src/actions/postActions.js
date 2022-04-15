import axios from 'axios'
import {
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
  POST_UPLOAD_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  MY_POST_REQUEST,
  MY_POST_SUCCESS,
  MY_POST_FAIL,
  POST_UPDATE_LIKES,
  POST_ADD_COMMENTS,
  POST_DELETE,
} from '../constants/postConstants'

export const postUpload = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_UPLOAD_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        // 'Content-Type': 'multipart/form-data', //We may not need this!
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/posts/createPost', formData, config)

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

export const listMyPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_POST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/posts/myPosts', config)

    dispatch({ type: MY_POST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: MY_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const likePost = (postId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/posts/${postId}/likePost`,
      {},
      config
    )

    dispatch({
      type: POST_UPDATE_LIKES,
      payload: { postId, likes: data },
    })
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

export const unLikePost = (postId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/posts/${postId}/unLikePost`,
      {},
      config
    )

    dispatch({
      type: POST_UPDATE_LIKES,
      payload: { postId, likes: data },
    })
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

export const commentPost = (postId, comment) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/posts/${postId}/commentPost`,
      { comment },
      config
    )

    dispatch({
      type: POST_ADD_COMMENTS,
      payload: { postId, comments: data },
    })
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

export const deletePost = (postId, photoId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `/api/posts/${postId}/delete`,
      { photoId },
      config
    )

    dispatch({
      type: POST_DELETE,
      payload: { postId, message: data },
    })
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
