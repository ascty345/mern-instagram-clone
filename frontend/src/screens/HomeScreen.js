import React from 'react'
import { Card, Container, Button, Form, Stack } from 'react-bootstrap'

const HomeScreen = () => {
  return (
    <Container>
      <Card className='mx-auto my-3' style={{ maxWidth: '40rem' }}>
        <Card.Header className='bg-white fw-bold'>Username</Card.Header>
        <Card.Img
          variant='top'
          src='https://images.unsplash.com/photo-1649260694273-d67c8782e6f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
        />
        <Card.Body>
          <i className='fa-solid fa-heart' style={{ color: 'red' }}></i>
          <Card.Title className='fs-5'>Image title</Card.Title>
          <Card.Text>Image Description</Card.Text>
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
    </Container>
  )
}

export default HomeScreen
