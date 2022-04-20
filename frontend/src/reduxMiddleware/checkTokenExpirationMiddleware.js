import jwt_decode from 'jwt-decode'
import { logout } from '../actions/userActions'

// Check for token expiration date
const checkTokenExpirationMiddleware = (store) => (next) => (action) => {
  const token =
    JSON.parse(localStorage.getItem('userInfo')) &&
    JSON.parse(localStorage.getItem('userInfo'))['token']
  if (token && jwt_decode(token).exp < Date.now() / 1000) {
    store.dispatch(logout())
    next(action)
  }
  // console.log(jwt_decode(token).exp, Date.now() / 1000)
  next(action)
}

export { checkTokenExpirationMiddleware }
