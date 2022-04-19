import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import {
  userRegisterReducer,
  userLoginReducer,
  userLoginFollowReducer,
  getOtherUserPostsReducer,
} from './reducers/userReducers'
import {
  postSubmitReducer,
  postListReducer,
  myPostReducer,
} from './reducers/postReducers'

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userLoginFollow: userLoginFollowReducer,
  postSubmit: postSubmitReducer,
  postList: postListReducer,
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

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
