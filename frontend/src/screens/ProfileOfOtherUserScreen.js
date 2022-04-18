import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Card, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOtherUserPosts } from '../actions/userActions'

const ProfileOfOtherUserScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getOtherUserPosts = useSelector((state) => state.getOtherUserPosts)
  const { loading, error, posts } = getOtherUserPosts

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    } else if (userInfo._id === params.id) {
      navigate('/profile')
    } else {
      dispatch(listOtherUserPosts(params.id))
    }
  }, [dispatch, navigate, userInfo, params.id])

  return (
    <Container className='mt-3'>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && (
        <Row className='d-flex justify-content-center'>
          <Loader />
        </Row>
      )}
      {posts.postOfUser && (
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
              {<h1>{posts.user.name}</h1>}
              <div>40 posts 40 followers 40 following</div>
            </Col>
          </Row>
          <hr />
          <Row>
            {posts.postOfUser.map((post) => (
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
        </>
      )}
      {posts.message && (
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
              {<h1>{posts.user.name}</h1>}
              <div>40 posts 40 followers 40 following</div>
            </Col>
          </Row>
          <hr />
          <Row>
            <Message>{posts.message}</Message>
          </Row>
        </>
      )}
    </Container>
  )
}

export default ProfileOfOtherUserScreen
