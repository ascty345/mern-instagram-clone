import React, { useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  ListGroup,
  Image,
} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Modal from '../components/Modal'
import {
  listOtherUserPosts,
  followUser,
  unfollowUser,
} from '../actions/userActions'

const ProfileOfOtherUserScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getOtherUserPosts = useSelector((state) => state.getOtherUserPosts)
  const { loading, error, info } = getOtherUserPosts

  const followList = useSelector((state) => state.userLoginFollow)

  const followHandler = (userFollowedId) => {
    dispatch(followUser(userFollowedId))
  }

  const unfollowHandler = (userUnFollowedId) => {
    dispatch(unfollowUser(userUnFollowedId))
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    } else if (userInfo._id === params.id) {
      navigate('/profile')
    } else {
      dispatch(listOtherUserPosts(params.id))
    }
  }, [dispatch, navigate, userInfo, params.id, followList])

  return (
    <Container className='mt-3'>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && (
        <Row className='d-flex justify-content-center'>
          <Loader />
        </Row>
      )}

      {info.user && info.postOfUser && (
        <>
          <Row>
            <Col xs={3}>
              <Card className='border-0' style={{ maxWidth: '12rem' }}>
                <Card.Img
                  className='img-thumbnail rounded-circle pull-left'
                  variant='top'
                  src={info.user.profilePic.replace(
                    /upload\//g,
                    'upload/c_fill,h_500,w_500/r_max/'
                  )}
                />
              </Card>
            </Col>
            <Col xs={9}>
              <h1>{info.user.name}</h1>
              <div>
                {info.postOfUser.length} posts {`  `}
                <Modal
                  trigger={
                    <span style={{ cursor: 'pointer' }}>
                      {info.user.followers.length} followers {`  `}
                    </span>
                  }>
                  <Card>
                    <Card.Title className='mx-auto bg-white fw-bold'>
                      Followers
                    </Card.Title>
                    <ListGroup className='mb-3 list-group-flush'>
                      {info.user.followers.map((follower) => (
                        <ListGroup.Item key={follower._id}>
                          <Link
                            to={`/profile/${follower._id}`}
                            style={{
                              textDecoration: 'none',
                              color: 'inherit',
                            }}>
                            <Image
                              className='rounded-circle pull-left me-1'
                              style={{ maxWidth: '2rem' }}
                              variant='top'
                              src={follower.profilePic.replace(
                                /upload\//g,
                                'upload/c_fill,h_500,w_500/r_max/'
                              )}
                            />
                            <span className='fs-9 fw-bold'>
                              {follower.name}
                            </span>
                          </Link>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                </Modal>{' '}
                <Modal
                  trigger={
                    <span style={{ cursor: 'pointer' }}>
                      {info.user.following.length} following
                    </span>
                  }>
                  <Card>
                    <Card.Title className='mx-auto bg-white fw-bold'>
                      Following
                    </Card.Title>
                    <ListGroup className='mb-3 list-group-flush'>
                      {info.user.following.map((following) => (
                        <ListGroup.Item key={following._id}>
                          <Link
                            to={`/profile/${following._id}`}
                            style={{
                              textDecoration: 'none',
                              color: 'inherit',
                            }}>
                            <Image
                              className='rounded-circle pull-left me-1'
                              style={{ maxWidth: '2rem' }}
                              variant='top'
                              src={following.profilePic.replace(
                                /upload\//g,
                                'upload/c_fill,h_500,w_500/r_max/'
                              )}
                            />
                            <span className='fs-9 fw-bold'>
                              {following.name}
                            </span>
                          </Link>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                </Modal>
              </div>
              {info.user.followers.filter(
                (follower) => follower._id.toString() === userInfo._id
              ).length === 0 ? (
                <Button
                  onClick={followHandler.bind(null, params.id)}
                  className='ml-0 mt-2'
                  variant='light'>
                  Follow
                </Button>
              ) : (
                <Button
                  onClick={unfollowHandler.bind(null, params.id)}
                  className='ml-0 mt-2'
                  variant='danger'>
                  Unfollow
                </Button>
              )}
            </Col>
          </Row>
          <hr />
        </>
      )}

      {info.postOfUser && (
        <>
          <Row>
            {info.postOfUser.map((post) => (
              <Col key={post._id} className='mb-3' xs={12} md={6} lg={4}>
                <Link to={`/post/${post._id}`}>
                  <Card className='border-0' style={{ maxWidth: '30rem' }}>
                    <Card.Img
                      variant='top'
                      src={post.photo.replace(
                        /upload\//g,
                        'upload/c_fill,w_500,h_500/'
                      )}
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </>
      )}

      {info.message && (
        <>
          <Row>
            <Message>{info.message}</Message>
          </Row>
        </>
      )}
    </Container>
  )
}

export default ProfileOfOtherUserScreen
