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

  const userLoginFollow = useSelector((state) => state.userLoginFollow)
  const { followers, following } = userLoginFollow

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    } else {
      dispatch(listMyPosts())
    }
  }, [dispatch, navigate, userInfo])

  return (
    <Container className='mt-3'>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && (
        <Row className='d-flex justify-content-center'>
          <Loader />
        </Row>
      )}
      {userInfo && posts && (
        <>
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
              <h1>{userInfo.name}</h1>
              <div>
                {posts.length} posts {followers.length} followers{' '}
                {following.length} following
              </div>
            </Col>
          </Row>
          <hr />
        </>
      )}
      {posts && (
        <Row>
          {posts.map((post) => (
            <Col key={post._id} className='mb-3' xs={12} md={6} lg={4}>
              <Card className='border-0' style={{ maxWidth: '30rem' }}>
                <Card.Img
                  variant='top'
                  src={post.photo.replace(
                    /upload\//g,
                    'upload/c_fit,w_500,h_500/'
                  )}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default ProfileScreen
