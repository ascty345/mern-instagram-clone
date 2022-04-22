import jwt_decode from 'jwt-decode'
import { logout } from '../actions/userActions'
import { TOKEN_EXPIRED } from '../constants/userConstants'

// Check for token expiration date
const checkTokenExpirationMiddleware = (store) => (next) => (action) => {
  const token =
    JSON.parse(localStorage.getItem('userInfo')) &&
    JSON.parse(localStorage.getItem('userInfo'))['token']
  if (token && jwt_decode(token).exp < Date.now() / 1000) {
    store.dispatch(logout())
    store.dispatch({ type: TOKEN_EXPIRED }) // send a message if token expired
  }
  next(action)
}

export { checkTokenExpirationMiddleware }
