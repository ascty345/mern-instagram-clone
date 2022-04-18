import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Post from '../models/postModel.js'

// @desc   Register a new user
// @route  POST /api/users/signup
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc   Auth user & get token
// @route  POST /api/users/signin
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc   Get a user profile by the user's ID
// @route  GET /api/users/:id
// @access Private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  const postOfUser = await Post.find({ postedBy: req.params.id })
    .populate({
      path: 'comments.user',
      select: 'name _id',
    })
    .populate({
      path: 'postedBy',
      select: 'name email',
    })
    .sort({ updatedAt: -1 })

  if (postOfUser.length !== 0) {
    res.json(postOfUser)
  } else {
    res.json({ message: 'This user has not posted anything yet' })
  }
})

export { registerUser, authUser, getUserById }
