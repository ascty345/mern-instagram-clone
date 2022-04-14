import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import {
  createPost,
  getAllPosts,
  getMyPosts,
  likePost,
  unLikePost,
} from '../controllers/postControllers.js'

const router = express.Router()

router.post('/createPost', protect, createPost)
router.get('/allPosts', protect, getAllPosts)
router.get('/myPosts', protect, getMyPosts)
router.put('/:id/likePost', protect, likePost)
router.put('/:id/unLikePost', protect, unLikePost)

export default router
