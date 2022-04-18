import express from 'express'
const router = express.Router()
import { protect } from '../middlewares/authMiddleware.js'

import {
  registerUser,
  authUser,
  getUserById,
} from '../controllers/userControllers.js'

router.post('/signup', registerUser)
router.post('/signin', authUser)
router.get('/:id', protect, getUserById)

export default router
