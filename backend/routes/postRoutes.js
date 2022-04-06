import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { createPost, getAllPosts } from '../controllers/postControllers.js'

const router = express.Router()

router.post('/createPost', protect, createPost)
router.get('/allPosts', getAllPosts)

export default router
