import React from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SigninScreen = () => {
  return (
    <>
      <Card className='mx-auto mt-3' style={{ 'max-width': '50rem' }}>
        <Card.Body>
          <Card.Title className='text-center'>
            <h2>Sign In</h2>
          </Card.Title>
          <Form className='mt-3'>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>

            <Form.Group className='text-center mb-2'>
              <Link to='/signup'>Don't have an account?</Link>
            </Form.Group>

            <Form.Group className='text-center'>
              <Button variant='outline-success' type='submit'>
                Log In
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default SigninScreen
