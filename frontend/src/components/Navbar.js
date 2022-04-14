import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='light' expand='lg' fixed='top'>
        <Container>
          <Navbar.Brand as={Link} to='/' className='brand-logo'>
            Instagram
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse
            className='justify-content-end'
            id='basic-navbar-nav'>
            <Nav>
              {userInfo ? (
                <>
                  <Nav.Link as={Link} to='/profile'>
                    {userInfo.name}
                  </Nav.Link>
                  <Nav.Link as={Link} to='/createPost'>
                    Create Post
                  </Nav.Link>
                  <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to='/signin'>
                    Sign In
                  </Nav.Link>
                  <Nav.Link as={Link} to='/signup'>
                    Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
