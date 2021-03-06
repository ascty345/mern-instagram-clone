import express from 'express'
import multer from 'multer'
import { protect } from '../middlewares/authMiddleware.js'
import {
  createPost,
  getAllPosts,
  getSinglePost,
  getFollowingPosts,
  getMyPosts,
  likePost,
  unLikePost,
  commentPost,
  commentDelete,
  deletePost,
} from '../controllers/postControllers.js'
import { postStorage } from '../config/cloudinary.js'

const router = express.Router()
const upload = multer({ storage: postStorage })

router.post('/createPost', protect, upload.single('photo'), createPost)
router.get('/allPosts', protect, getAllPosts)
router.get('/singlePost/:id', protect, getSinglePost)
router.get('/following', protect, getFollowingPosts)
router.get('/myPosts', protect, getMyPosts)
router.put('/:id/likePost', protect, likePost)
router.put('/:id/unLikePost', protect, unLikePost)
router.put('/:id/commentPost', protect, commentPost)
router.put('/:postId/:commentId/commentDelete', protect, commentDelete)
router.post('/:id/delete', protect, deletePost) // Delete post

export default router
