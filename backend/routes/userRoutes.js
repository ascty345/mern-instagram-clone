import express from 'express'
const router = express.Router()
import { protect } from '../middlewares/authMiddleware.js'

import {
  registerUser,
  authUser,
  getUserById,
  follow,
  unfollow,
} from '../controllers/userControllers.js'

router.post('/signup', registerUser)
router.post('/signin', authUser)
router.get('/:id', protect, getUserById)
router.put('/follow', protect, follow)
router.put('/unfollow', protect, unfollow)

export default router
