import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import {
  Card,
  Container,
  Button,
  Form,
  Stack,
  Row,
  ListGroup,
  Col,
} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  followingListPost,
  likePost,
  unLikePost,
  commentPost,
  deletePost,
} from '../actions/postActions'

const PostsOfFollowingScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const followingPostList = useSelector((state) => state.followingPostList)
  const { loading, error, posts, deleteConfirm } = followingPostList

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

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    } else {
      dispatch(followingListPost())
    }
  }, [navigate, dispatch, userInfo])

  return (
    <Container className='my-3'>
      {loading ? (
        <Row className='d-flex justify-content-center'>
          <Loader />
        </Row>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
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
              <Card.Img
                variant='top'
                src={post.photo.replace(
                  /upload\//g,
                  'upload/c_fit,w_500,h_500/'
                )}
              />
              <Card.Body>
                {post.likes.filter(
                  (like) => like.user.toString() === userInfo._id
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
                {post.likes.length} likes
                <Card.Title className='fs-5'>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
                <ListGroup className='mb-3 list-group-flush'>
                  {post.comments.map((comment) => (
                    <ListGroup.Item key={comment._id}>
                      <span className='fs-9 fw-bold'>
                        {comment.user.name}:{' '}
                      </span>
                      {comment.comment}
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
      )}
    </Container>
  )
}

export default PostsOfFollowingScreen