import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { createPost } from '../controllers/postControllers.js'

const router = express.Router()

router.post('/createpost', protect, createPost)

export default router
