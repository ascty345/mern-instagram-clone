import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Container, Button, Form, Stack, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listPost } from '../actions/postActions'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const [message, setMessage] = useState(null)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const postList = useSelector((state) => state.postList)
  const { loading, error, posts } = postList

  useEffect(() => {
    if (!userInfo) {
      setMessage('Please log in to see the posts')
    } else {
      dispatch(listPost())
    }
  }, [dispatch, userInfo])

  return (
    <Container className='my-3'>
      {message ? (
        <Message variant='warning'>{message}</Message>
      ) : loading ? (
        <Row className='d-flex justify-content-center'>
          <Loader />
        </Row>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        posts.map((post) => (
          <Card
            className='mx-auto my-3'
            key={post._id}
            style={{ maxWidth: '40rem' }}>
            <Card.Header className='bg-white fw-bold'>
              {post.postedBy.name}
            </Card.Header>
            <Card.Img
              variant='top'
              src={post.photo.replace(
                /upload\//g,
                'upload/c_crop,w_1000,h_1000/'
              )}
            />
            <Card.Body>
              <i className='fa-solid fa-heart' style={{ color: 'red' }}></i>
              <Card.Title className='fs-5'>{post.title}</Card.Title>
              <Card.Text>{post.body}</Card.Text>
              <Form>
                <Form.Group controlId='comment'>
                  <Stack direction='horizontal' gap={3}>
                    <Form.Control
                      className='border-0'
                      placeholder='Enter your comment here'
                    />
                    <Button
                      className='btn bg-transparent'
                      variant='light'
                      type='submit'>
                      {' '}
                      <i className='fa-regular fa-paper-plane'></i>
                    </Button>
                  </Stack>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  )
}

export default HomeScreen
