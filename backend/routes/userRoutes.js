import express from 'express'
const router = express.Router()
import { registerUser } from '../controllers/userControllers.js'

router.get('/', (req, res) => {
  res.send('hello')
})

router.post('/signup', registerUser)

export default router
