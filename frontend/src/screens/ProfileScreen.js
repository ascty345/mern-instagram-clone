import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Card, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listMyPosts } from '../actions/postActions'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const myPosts = useSelector((state) => state.myPosts)
  const { loading, error, posts } = myPosts

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    } else {
      dispatch(listMyPosts())
    }
  }, [dispatch, navigate, userInfo])

  return (
    <Container className='mt-3'>
      <Row>
        <Col xs={3}>
          <Card className='border-0' style={{ maxWidth: '12rem' }}>
            <Card.Img
              className='rounded-circle pull-left'
              variant='top'
              src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
            />
          </Card>
        </Col>
        <Col xs={9}>
          {userInfo && <h1>{userInfo.name}</h1>}
          <div>40 posts 40 followers 40 following</div>
        </Col>
      </Row>
      <hr />
      <Row>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && (
          <Row className='d-flex justify-content-center'>
            <Loader />
          </Row>
        )}
        {posts.map((post) => (
          <Col key={post._id} className='mb-3' xs={12} md={6} lg={4}>
            <Card className='border-0' style={{ maxWidth: '30rem' }}>
              <Card.Img
                variant='top'
                src={post.photo.replace(
                  /upload\//g,
                  'upload/c_crop,w_500,h_500/'
                )}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ProfileScreen
