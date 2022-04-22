import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { checkTokenExpirationMiddleware } from './reduxMiddleware/checkTokenExpirationMiddleware'
import { composeWithDevTools } from '@redux-devtools/extension'
import {
  userRegisterReducer,
  userLoginReducer,
  userLoginFollowReducer,
  tokenExpiredReducer,
  getOtherUserPostsReducer,
} from './reducers/userReducers'
import {
  postSubmitReducer,
  postListReducer,
  followingPostListReducer,
  myPostReducer,
} from './reducers/postReducers'

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userLoginFollow: userLoginFollowReducer,
  tokenExpired: tokenExpiredReducer,
  postSubmit: postSubmitReducer,
  postList: postListReducer,
  followingPostList: followingPostListReducer,
  myPosts: myPostReducer,
  getOtherUserPosts: getOtherUserPostsReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userLoginFollow: {
    followers: userInfoFromStorage ? userInfoFromStorage.followers : [],
    following: userInfoFromStorage ? userInfoFromStorage.following : [],
  },
}

const middleware = [thunk, checkTokenExpirationMiddleware]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
