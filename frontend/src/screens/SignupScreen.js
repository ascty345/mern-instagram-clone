import React, { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const SignupScreen = () => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <Card className='mt-3'>
        <Card.Body>
          <Card.Title className='text-center'>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <h2>Sign Up</h2>
          </Card.Title>
          <Form className='mt-3' onSubmit={submitHandler}>
            <Form.Group className='mb-1' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Your Name'
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className='mb-1' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='confirmPassword'>
              <Form.Control
                type='password'
                placeholder='Confirm Your Password'
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              />
            </Form.Group>

            <Form.Group className='text-center mb-2'>
              <Link to='/signin'>Already have an account?</Link>
            </Form.Group>

            <Form.Group className='text-center'>
              <Button variant='outline-success' type='submit'>
                Sign Up
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </FormContainer>
  )
}

export default SignupScreen
