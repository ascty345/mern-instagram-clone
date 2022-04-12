import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'

// @desc   Create a new post
// @route  POST /api/posts/createPost
// @access Private

const createPost = asyncHandler(async (req, res) => {
  const { title, body, photo } = req.body

  if (!title || !body || !photo) {
    res.status(422)
    throw new Error('Please add all the fields')
  }

  const post = new Post({
    title,
    body,
    photo,
    postedBy: req.user._id,
  })

  const createdPost = await post.save()
  res.status(201).json(createdPost)
})

// @desc   Fetch all posts
// @route  GET /api/posts/allPosts
// @access Public

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate({
    path: 'postedBy',
    select: 'name email -_id',
  })
  res.json(posts)
})

// @desc   Get logged in user post
// @route  GET /api/posts/myPosts
// @access Private

const getMyPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ postedBy: req.user._id }).populate({
    path: 'postedBy',
    select: 'name email -_id',
  })
  res.json(posts)
})

export { createPost, getAllPosts, getMyPosts }
