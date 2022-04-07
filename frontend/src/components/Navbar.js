import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand as={Link} to='/' className='brand-logo'>
            Instagram
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse
            className='justify-content-end'
            id='basic-navbar-nav'>
            <Nav>
              <Nav.Link as={Link} to='/signin'>
                Sign In
              </Nav.Link>
              <Nav.Link as={Link} to='/signup'>
                Sign Up
              </Nav.Link>
              <Nav.Link as={Link} to='/profile'>
                Profile
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
