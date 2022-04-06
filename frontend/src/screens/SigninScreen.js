import React from 'react'
import { Link } from 'react-router-dom'

const SigninScreen = () => {
  return (
    <div className='row'>
      <div className='card col s6 offset-s3'>
        <h2 className='center-align'>Instagram</h2>
        <div className='row'>
          <form className='col s12'>
            <div className='row'>
              <div className='input-field col s12'>
                <input id='email' type='email' placeholder='Enter your email' />
              </div>
              <div className='input-field col s12'>
                <input
                  id='password'
                  type='password'
                  placeholder='Enter your password'
                />
              </div>
            </div>
            <div className='row center-align'>
              <button
                className='btn  green darken-2'
                type='submit'
                name='action'>
                Login
              </button>
            </div>
            <h5 className='row center-align'>
              <Link to='/signup' className='black-text'>
                Don't have an account?
              </Link>
            </h5>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SigninScreen
