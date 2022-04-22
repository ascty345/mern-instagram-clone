import React, { useState, useEffect } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { userUpdateAction } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserUpdateScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [name, setName] = useState(userInfo.name)
  const [email, setEmail] = useState(userInfo.email)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState(null)

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading, error, success } = userUpdate

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    }
    if (success) {
      setMessage('Updated Successfully')
    }
    dispatch({ type: USER_UPDATE_RESET })
  }, [navigate, userInfo, success, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      password && formData.append('password', password)
      image && formData.append('photo', image)
      dispatch(userUpdateAction(formData))
    }
  }

  return (
    <FormContainer>
      <Card className='mt-3'>
        <Card.Body>
          <Card.Title className='text-center justify-content-center'>
            {message && <Message variant='success'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <h2>Update Your Information</h2>
          </Card.Title>
          <Form className='mt-3' onSubmit={submitHandler}>
            <Form.Group className='mb-2' controlId='image'>
              <Form.Label>Change Profile Picture</Form.Label>
              <Form.Control
                type='file'
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

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
              <Form.Label>Change Your Password</Form.Label>
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

            <Form.Group className='text-center'>
              <Button variant='outline-success' type='submit'>
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </FormContainer>
  )
}

export default UserUpdateScreen
