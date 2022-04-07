import React from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'

const ProfileScreen = () => {
  return (
    <Container className='mt-3'>
      <Row>
        <Col xs={3}>
          <Card className='border-0' style={{ 'max-width': '12rem' }}>
            <Card.Img
              float
              fluid
              className='rounded-circle pull-left'
              variant='top'
              src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
            />
          </Card>
        </Col>
        <Col xs={9}>
          <h1>Title</h1>
          <div>40 posts 40 followers 40 following</div>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col className='mb-3' xs={12} md={6} lg={4}>
          <Card className='border-0' style={{ 'min-width': '20rem' }}>
            <Card.Img
              fluid
              variant='top'
              src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
            />
          </Card>
        </Col>
        <Col className='mb-3' xs={12} md={6} lg={4}>
          <Card className='border-0' style={{ 'min-width': '20rem' }}>
            <Card.Img
              fluid
              variant='top'
              src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
            />
          </Card>
        </Col>
        <Col className='mb-3' xs={12} md={6} lg={4}>
          <Card className='border-0' style={{ 'min-width': '20rem' }}>
            <Card.Img
              fluid
              variant='top'
              src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
            />
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileScreen
