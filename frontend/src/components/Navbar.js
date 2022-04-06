import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <div className='nav-wrapper white'>
        <Link to='/' className='brand-logo left black-text'>
          Logo
        </Link>
        <ul id='nav-mobile' className='right'>
          <li>
            <Link to='/signin' className='black-text'>
              Signin
            </Link>
          </li>
          <li>
            <Link to='/signup' className='black-text'>
              Signup
            </Link>
          </li>
          <li>
            <Link to='/profile' className='black-text'>
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
