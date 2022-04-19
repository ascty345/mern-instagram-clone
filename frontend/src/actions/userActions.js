import axios from 'axios'
import { MY_POST_RESET, POST_LIST_RESET } from '../constants/postConstants'
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
} from '../constants/userConstants'

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/signup',
      {
        name,
        email,
        password,
      },
      config
    )

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
  dispatch({ type: POST_LIST_RESET })
  dispatch({ type: MY_POST_RESET })
  dispatch({ type: FOLLOW_RESET })
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
