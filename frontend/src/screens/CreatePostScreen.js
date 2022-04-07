import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

const CreatePostScreen = () => {
  return (
    <>
      <Card className='mx-auto mt-3' style={{ 'max-width': '50rem' }}>
        <Card.Body>
          <Card.Title className='text-center'>
            <h3>Create Post</h3>
          </Card.Title>
          <Form className='mt-3'>
            <Form.Group className='mb-2' controlId='title'>
              <Form.Control type='text' placeholder='Post Title' />
            </Form.Group>

            <Form.Group className='mb-2' controlId='description'>
              <Form.Control type='text' placeholder='Post Description' />
            </Form.Group>

            <Form.Group className='mb-2' controlId='file'>
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type='file' />
            </Form.Group>

            <Form.Group className='text-center'>
              <Button variant='outline-success' type='submit'>
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default CreatePostScreen
