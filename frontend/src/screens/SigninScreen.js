import React, { useState, useEffect } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const SigninScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const tokenExpired = useSelector((state) => state.tokenExpired)
  const { message: tokenMessage } = tokenExpired

  useEffect(() => {
    if (userInfo) {
      navigate(-1)
    }
  }, [navigate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <Card className='mt-3'>
        <Card.Body>
          <Card.Title className='text-center justify-content-center'>
            {tokenMessage && (
              <Message variant='warning'>{tokenMessage}</Message>
            )}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <h2>Sign In</h2>
          </Card.Title>
          <Form className='mt-3' onSubmit={submitHandler}>
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
            </Form.Group>

            <Form.Group
              className='mb-3'
              controlId='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}>
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
    </FormContainer>
  )
}

export default SigninScreen
