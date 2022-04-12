import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Card, Row, Col, Stack } from 'react-bootstrap'
import { listMyPosts } from '../actions/postActions'

const ProfileScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const { name: userName } = userInfo

  const myPosts = useSelector((state) => state.myPosts)
  const { posts } = myPosts

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
          <h1>{userName}</h1>
          <div>40 posts 40 followers 40 following</div>
        </Col>
      </Row>
      <hr />
      <Row>
        {posts.map((post) => (
          <Col key={post._id} className='mb-3' xs={12} md={6} lg={4}>
            <Card className='border-0' style={{ maxWidth: '30rem' }}>
              <Card.Img variant='top' src={post.photo} />
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ProfileScreen
