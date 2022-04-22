import asyncHandler from 'express-async-handler'
import { cloudinary } from '../config/cloudinary.js'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Post from '../models/postModel.js'

// @desc   Register a new user
// @route  POST /api/users/signup
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const photo = req.file.path

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    profilePic: photo,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      profilePic: user.profilePic,
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
      profilePic: user.profilePic,
      name: user.name,
      email: user.email,
      followers: user.followers,
      following: user.following,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const photo = req.file ? req.file.path : null

  // If user update profile photo Delete the current profilePic from storage
  if (photo) {
    const profilePicId = req.user.profilePic.substring(
      req.user.profilePic.indexOf('instagram-clone/profile/'),
      req.user.profilePic.indexOf('.jpg')
    )
    await cloudinary.uploader.destroy(profilePicId)
  }

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.profilePic = photo || user.profilePic
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      profilePic: updatedUser.profilePic,
      name: updatedUser.name,
      email: updatedUser.email,
      followers: updatedUser.followers,
      following: updatedUser.following,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
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
    res.json({ user, postOfUser })
  } else {
    res.json({
      user,
      postOfUser,
      message: 'This user has not posted anything yet',
    })
  }
})

// @desc   Follow a user
// @route  PUT /api/users/follow
// @access Private

const follow = asyncHandler(async (req, res) => {
  // Check following and follower ID
  const user = await User.findById(req.user._id).select('-password')
  const userToFollow = await User.findById(req.body.userToFollowId).select(
    '-password'
  )
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  if (!userToFollow) {
    res.status(404)
    throw new Error('The user you want to follow not found')
  }
  // Check if the userToUnFollow has already been followed
  if (
    user.following.filter((user) => user.toString() === req.body.userToFollowId)
      .length !== 0
  ) {
    res.status(400)
    throw new Error('User has already been followed')
  }
  //Save the result
  user.following.unshift(req.body.userToFollowId)
  await user.save()
  userToFollow.followers.unshift(req.user.id)
  await userToFollow.save()

  res.json(user)
})

// @desc   UnFollow a user
// @route  PUT /api/users/unfollow
// @access Private

const unfollow = asyncHandler(async (req, res) => {
  // Check following and follower ID
  const user = await User.findById(req.user._id).select('-password')
  const userToUnFollow = await User.findById(req.body.userToUnFollowId).select(
    '-password'
  )
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  if (!userToUnFollow) {
    res.status(404)
    throw new Error('The user you want to unfollow not found')
  }

  // Check if the userToUnFollow has already been followed
  if (
    user.following.filter(
      (user) => user.toString() === req.body.userToUnFollowId
    ).length === 0
  ) {
    res.status(400)
    throw new Error('User has not yet been followed')
  }

  // Get unfollow index
  const unfollowIndex = user.following
    .map((user) => user.toString())
    .indexOf(req.body.userToUnFollowId)

  //Save the result
  user.following.splice(unfollowIndex, 1)
  await user.save()

  // Update the result for the unfollowed person
  await User.findByIdAndUpdate(req.body.userToUnFollowId, {
    $pull: { followers: req.user._id },
  })

  res.json(user)
})

export {
  registerUser,
  authUser,
  updateUserProfile,
  getUserById,
  follow,
  unfollow,
}
