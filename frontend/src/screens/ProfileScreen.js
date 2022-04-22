import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Card, Row, Col, Image, Button } from 'react-bootstrap'
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
                <Image
                  className='img-thumbnail rounded-circle z-depth-2 pull-left'
                  variant='top'
                  src={userInfo.profilePic.replace(
                    /upload\//g,
                    'upload/c_fill,h_500,w_500/r_max/'
                  )}
                />
              </Card>
            </Col>
            <Col xs={9}>
              <h1>{userInfo.name}</h1>
              <div>
                {posts.length} posts {followers.length} followers{' '}
                {following.length} following
              </div>
              <Link to='settings'>
                <Button className='ml-0 mt-2' variant='light'>
                  Settings
                </Button>
              </Link>
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
                    'upload/c_fill,w_500,h_500/'
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
