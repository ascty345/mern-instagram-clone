import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Navbar,
  Container,
  Nav,
  Image,
  Form,
  Button,
  ListGroup,
} from 'react-bootstrap'
import Modal from '../components/Modal'
import { Link } from 'react-router-dom'
import { logout, searchForUser } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const [keyword, setKeyword] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userSearch = useSelector((state) => state.userSearch)
  const { users: usersSearched } = userSearch

  const logoutHandler = () => {
    dispatch(logout())
  }

  const searchUserHandler = (e) => {
    e.preventDefault()
    dispatch(searchForUser(keyword))
  }

  return (
    <header>
      <Navbar bg='light' fixed='top'>
        <Container>
          <Navbar.Brand as={Link} to='/' className='brand-logo'>
            Instagram-Clone
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Nav className='justify-content-end' id='basic-navbar-nav'>
            <Nav>
              {userInfo ? (
                <>
                  <Nav.Link as={Link} to='/profile'>
                    <Image
                      className='rounded-circle pull-left me-1'
                      style={{ maxWidth: '2rem' }}
                      variant='top'
                      src={userInfo.profilePic.replace(
                        /upload\//g,
                        'upload/c_fill,h_500,w_500/r_max/'
                      )}
                    />
                  </Nav.Link>
                  <Modal
                    contentStyle={{ minWidth: '20rem' }}
                    trigger={
                      <Nav.Link style={{ cursor: 'pointer' }}>
                        <i className='fa-solid fa-magnifying-glass'></i>
                      </Nav.Link>
                    }>
                    <Form onSubmit={searchUserHandler} className='d-flex'>
                      <Form.Control
                        type='search'
                        placeholder='Search users'
                        className='me-2'
                        aria-label='Search'
                        value={keyword}
                        onChange={(e) => {
                          setKeyword(e.target.value)
                        }}
                      />
                      <Button size='sm' variant='outline-success' type='submit'>
                        Search
                      </Button>
                    </Form>
                    <ListGroup>
                      {usersSearched &&
                        usersSearched.map((user) => (
                          <ListGroup.Item key={user._id}>
                            <Link
                              to={`/profile/${user._id}`}
                              style={{
                                textDecoration: 'none',
                                color: 'inherit',
                              }}>
                              <Image
                                className='rounded-circle pull-left me-1'
                                style={{ maxWidth: '2rem' }}
                                variant='top'
                                src={user.profilePic.replace(
                                  /upload\//g,
                                  'upload/c_fill,h_500,w_500/r_max/'
                                )}
                              />
                              <span className='fs-9 fw-bold'>{user.name}</span>
                            </Link>
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                  </Modal>
                  <Nav.Link as={Link} to='/following'>
                    <i className='fa-solid fa-user-group'></i>
                  </Nav.Link>
                  <Nav.Link as={Link} to='/createPost'>
                    <i className='fa-solid fa-square-plus'></i>
                  </Nav.Link>
                  <Nav.Link onClick={logoutHandler}>
                    <i className='fa-solid fa-arrow-right-from-bracket'></i>
                  </Nav.Link>
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
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
