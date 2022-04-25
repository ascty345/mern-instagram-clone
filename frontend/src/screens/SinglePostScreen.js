import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import {
  Card,
  Container,
  Button,
  Form,
  Stack,
  Row,
  ListGroup,
  Col,
  Image,
} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Modal from '../components/Modal'
import {
  listSinglePost,
  likePost,
  unLikePost,
  commentPost,
  deleteComment,
  deletePost,
} from '../actions/postActions'

const SinglePostScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const postSingle = useSelector((state) => state.postSingle)
  const { loading, error, posts, deleteConfirm } = postSingle

  const likePostHandler = (postId) => {
    dispatch(likePost(postId))
  }

  const unLikePostHandler = (postId) => {
    dispatch(unLikePost(postId))
  }

  const deletePostHandler = (postId, photoId) => {
    dispatch(deletePost(postId, photoId))
  }

  const submitCommentHandler = (postId, comment) => {
    dispatch(commentPost(postId, comment))
  }

  const deleteCommentHandler = (postId, commentId) => {
    dispatch(deleteComment(postId, commentId))
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    } else {
      dispatch(listSinglePost(params.id))
    }
  }, [navigate, dispatch, userInfo, params.id])

  return (
    <Container className='my-3'>
      {loading ? (
        <Row className='d-flex justify-content-center'>
          <Loader />
        </Row>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : posts ? (
        posts.map((post) =>
          post.deleted ? (
            deleteConfirm && (
              <Row
                className='mx-auto mt-3'
                key={post._id}
                style={{ maxWidth: '40rem' }}>
                <Message variant='success'>{deleteConfirm}</Message>
              </Row>
            )
          ) : (
            <Card
              className='mx-auto my-3'
              key={post._id}
              style={{ maxWidth: '40rem' }}>
              <Card.Header className='bg-white fw-bold'>
                <Row>
                  <Col>
                    <Link
                      to={
                        post.postedBy._id !== userInfo._id
                          ? `/profile/${post.postedBy._id}`
                          : `/profile`
                      }
                      style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Image
                        className='rounded-circle pull-left me-1'
                        style={{ maxWidth: '3rem' }}
                        variant='top'
                        src={post.postedBy.profilePic.replace(
                          /upload\//g,
                          'upload/c_fill,h_500,w_500/r_max/'
                        )}
                      />
                      {post.postedBy.name}
                    </Link>
                  </Col>
                  {post.postedBy._id === userInfo._id && (
                    <Col className='text-end'>
                      <i
                        onClick={() => {
                          deletePostHandler(
                            post._id,
                            post.photo.substring(
                              post.photo.indexOf('instagram-clone/'),
                              post.photo.indexOf('.jpg')
                            )
                          )
                        }}
                        className='fa-solid fa-trash'
                        style={{ color: 'black' }}
                      />
                    </Col>
                  )}
                </Row>
              </Card.Header>
              <Link to={`/post/${post._id}`}>
                <Card.Img
                  variant='top'
                  src={post.photo.replace(
                    /upload\//g,
                    'upload/c_fit,w_500,h_500/'
                  )}
                />
              </Link>
              <Card.Body>
                {post.likes.filter(
                  (like) => like.user._id.toString() === userInfo._id
                ).length > 0 ? (
                  <i
                    onClick={unLikePostHandler.bind(null, post._id)}
                    className='fa-solid fa-heart'
                    style={{ color: 'red' }}
                  />
                ) : (
                  <i
                    onClick={likePostHandler.bind(null, post._id)}
                    className='fa-regular fa-heart'
                  />
                )}{' '}
                <Modal
                  trigger={
                    <span style={{ cursor: 'pointer' }}>
                      {post.likes.length} likes
                    </span>
                  }>
                  <Card>
                    <Card.Title className='mx-auto bg-white fw-bold'>
                      Likes
                    </Card.Title>
                    <ListGroup className='mb-3 list-group-flush'>
                      {post.likes.map((like) => (
                        <ListGroup.Item key={like._id}>
                          <Link
                            to={`/profile/${like.user._id}`}
                            style={{
                              textDecoration: 'none',
                              color: 'inherit',
                            }}>
                            <Image
                              className='rounded-circle pull-left me-1'
                              style={{ maxWidth: '2rem' }}
                              variant='top'
                              src={like.user.profilePic.replace(
                                /upload\//g,
                                'upload/c_fill,h_500,w_500/r_max/'
                              )}
                            />
                            <span className='fs-9 fw-bold'>
                              {like.user.name}
                            </span>
                          </Link>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                </Modal>
                <Card.Title className='fs-5'>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
                <ListGroup className='mb-3 list-group-flush'>
                  {post.comments.map((comment) => (
                    <ListGroup.Item key={comment._id}>
                      <Row>
                        <Col>
                          <Link
                            to={`/profile/${comment.user._id}`}
                            style={{
                              textDecoration: 'none',
                              color: 'inherit',
                            }}>
                            <Image
                              className='rounded-circle pull-left me-1'
                              style={{ maxWidth: '2rem' }}
                              variant='top'
                              src={comment.user.profilePic.replace(
                                /upload\//g,
                                'upload/c_fill,h_500,w_500/r_max/'
                              )}
                            />
                            <span className='fs-9 fw-bold'>
                              {comment.user.name}:{' '}
                            </span>
                            {comment.comment}
                          </Link>
                        </Col>
                        {comment.user._id === userInfo._id && (
                          <Col className='text-end'>
                            <i
                              onClick={deleteCommentHandler.bind(
                                null,
                                post._id,
                                comment._id
                              )}
                              className='fa-solid fa-eraser'></i>
                          </Col>
                        )}
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault()
                    submitCommentHandler(post._id, e.target[0].value)
                    e.target[0].value = ''
                  }}>
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
          )
        )
      ) : (
        <></>
      )}
    </Container>
  )
}

export default SinglePostScreen
