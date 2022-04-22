import React, { useState, useEffect } from 'react'
import { Card, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import { postUpload } from '../actions/postActions'
import { POST_UPLOAD_RESET } from '../constants/postConstants'

const CreatePostScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const postSubmit = useSelector((state) => state.postSubmit)
  const { loading, error, success } = postSubmit

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    }
    dispatch({ type: POST_UPLOAD_RESET })
  }, [navigate, userInfo, dispatch])

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('body', description)
    formData.append('photo', image)
    dispatch(postUpload(formData))
  }

  return (
    <FormContainer>
      <Card className='mt-3'>
        <Card.Body>
          {error && <Message variant='danger'>{error}</Message>}
          {success && <Message>Post uploaded successfully</Message>}
          {loading && (
            <Row>
              <Col className='d-flex justify-content-center'>
                <Loader className='me-auto' />
              </Col>
            </Row>
          )}
          <Card.Title className='text-center'>
            <h3>Create Post</h3>
          </Card.Title>
          <Form className='mt-3' onSubmit={submitHandler}>
            <Form.Group className='mb-2' controlId='title'>
              <Form.Control
                type='text'
                placeholder='Post Title'
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
            </Form.Group>

            <Form.Group className='mb-2' controlId='description'>
              <Form.Control
                type='text'
                placeholder='Post Description'
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
            </Form.Group>

            <Form.Group className='mb-2' controlId='image'>
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                required
                type='file'
                onChange={(e) => setImage(e.target.files[0])}
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

export default CreatePostScreen
