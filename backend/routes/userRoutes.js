import express from 'express'
import multer from 'multer'
import { protect } from '../middlewares/authMiddleware.js'

import {
  registerUser,
  updateUserProfile,
  authUser,
  getUserById,
  follow,
  unfollow,
  searchUsers,
} from '../controllers/userControllers.js'
import { profileStorage } from '../config/cloudinary.js'

const router = express.Router()
const upload = multer({ storage: profileStorage })

router.post('/signup', upload.single('photo'), registerUser)
router.put('/profile', protect, upload.single('photo'), updateUserProfile)
router.post('/signin', authUser)
router.get('/:id', protect, getUserById)
router.put('/follow', protect, follow)
router.put('/unfollow', protect, unfollow)
router.post('/searchUsers', protect, searchUsers)

export default router
