import axios from 'axios'
import {
  FOLLOWING_POST_LIST_RESET,
  MY_POST_RESET,
  POST_LIST_RESET,
  SINGLE_POST_LIST_RESET,
} from '../constants/postConstants'
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  GET_OTHER_USER_POSTS_REQUEST,
  GET_OTHER_USER_POSTS_FAIL,
  GET_OTHER_USER_POSTS_SUCCESS,
  FOLLOW_A_USER,
  FOLLOW_RESET,
  FOLLOW_REQUEST_SUCESS,
  FOLLOW_REQUEST_FAIL,
  UNFOLLOW_A_USER,
  TOKEN_EXPIRED_RESET,
  USER_REGISTER_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  USER_SEARCH_FAIL,
  USER_SEARCH_RESET,
} from '../constants/userConstants'

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post('/api/users/signup', formData, config)

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const userUpdateAction = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put('/api/users/profile', formData, config)

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const searchForUser = (name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_SEARCH_REQUEST,
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

    const { data } = await axios.post(
      '/api/users/searchUsers',
      { name },
      config
    )

    dispatch({
      type: USER_SEARCH_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/signin',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    dispatch({
      type: FOLLOW_REQUEST_SUCESS,
      payload: {
        followers: data.followers,
        following: data.following,
      },
    })

    dispatch({ type: TOKEN_EXPIRED_RESET })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_REGISTER_RESET })
  dispatch({ type: POST_LIST_RESET })
  dispatch({ type: SINGLE_POST_LIST_RESET })
  dispatch({ type: FOLLOWING_POST_LIST_RESET })
  dispatch({ type: MY_POST_RESET })
  dispatch({ type: FOLLOW_RESET })
  dispatch({ type: USER_SEARCH_RESET })
}

export const listOtherUserPosts = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_OTHER_USER_POSTS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${userId}`, config)

    dispatch({ type: GET_OTHER_USER_POSTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_OTHER_USER_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const followUser = (userToFollowId) => async (dispatch, getState) => {
  try {
    dispatch({ type: FOLLOW_A_USER })

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
      `/api/users/follow`,
      { userToFollowId },
      config
    )

    dispatch({ type: FOLLOW_REQUEST_SUCESS, payload: data })

    //Change userInfo in local storage
    const userInfoInStorage = JSON.parse(localStorage.getItem('userInfo'))
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        ...userInfoInStorage,
        followers: data.followers,
        following: data.following,
      })
    )
  } catch (error) {
    dispatch({
      type: FOLLOW_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const unfollowUser =
  (userToUnFollowId) => async (dispatch, getState) => {
    try {
      dispatch({ type: UNFOLLOW_A_USER })

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
        `/api/users/unfollow`,
        { userToUnFollowId },
        config
      )

      dispatch({ type: FOLLOW_REQUEST_SUCESS, payload: data })

      //Change userInfo in local storage
      const userInfoInStorage = JSON.parse(localStorage.getItem('userInfo'))
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          ...userInfoInStorage,
          followers: data.followers,
          following: data.following,
        })
      )
    } catch (error) {
      dispatch({
        type: FOLLOW_REQUEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
