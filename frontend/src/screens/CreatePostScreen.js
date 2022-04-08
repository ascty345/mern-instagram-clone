import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const CreatePostScreen = () => {
  return (
    <FormContainer>
      <Card className='mt-3'>
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
    </FormContainer>
  )
}

export default CreatePostScreen
