import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import { postUpload } from '../actions/postActions'
import { POST_UPLOAD_FAIL } from '../constants/postConstants'

const CreatePostScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [file, setFile] = useState(null)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const postSubmit = useSelector((state) => state.postSubmit)
  const { loading, error, success } = postSubmit

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    }
  }, [navigate, userInfo])

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0]
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'instagram-clone')

      const {
        data: { secure_url: imageUrl },
      } = await axios.post(
        'https://api.cloudinary.com/v1_1/doop2lt0g/image/upload',
        formData
      )

      setImage(imageUrl)
    } catch (error) {
      dispatch({
        type: POST_UPLOAD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(postUpload({ title, body: description, photo: image }))
  }

  return (
    <FormContainer>
      <Card className='mt-3'>
        <Card.Body>
          {error && <Message variant='danger'>{error}</Message>}
          {success && (
            <Message variant='success'>Post uploaded successfully</Message>
          )}
          {loading && <Loader />}
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
              <Form.Control type='file' onChange={fileChangeHandler} />
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
