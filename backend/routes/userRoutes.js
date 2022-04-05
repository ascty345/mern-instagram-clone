import express from 'express'
const router = express.Router()
import { registerUser, authUser } from '../controllers/userControllers.js'

router.post('/signup', registerUser)
router.post('/signin', authUser)

export default router
