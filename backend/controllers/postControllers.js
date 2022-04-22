import asyncHandler from 'express-async-handler'
import { cloudinary } from '../config/cloudinary.js'
import Post from '../models/postModel.js'

// @desc   Create a new post
// @route  POST /api/posts/createPost
// @access Private

const createPost = asyncHandler(async (req, res) => {
  const { title, body } = req.body
  const photo = req.file.path

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
// @access Private

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .populate({
      path: 'comments.user',
      select: 'name _id',
    })
    .populate({
      path: 'postedBy',
      select: 'name profilePic email',
    })
    .sort({ updatedAt: -1 })
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

// @desc   Fetch following posts
// @route  GET /api/posts/following
// @access Private

const getFollowingPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ postedBy: { $in: req.user.following } })
    .populate({
      path: 'comments.user',
      select: 'name _id',
    })
    .populate({
      path: 'postedBy',
      select: 'name email',
    })
    .sort({ updatedAt: -1 })
  res.json(posts)
})

// @desc   Like a post
// @route  PUT /api/posts/:id/likePost
// @access Private

const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  // Check if the post has already been liked
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
  ) {
    res.status(400)
    throw new Error('You already liked the post')
  }

  post.likes.unshift({ user: req.user.id })

  await post.save()
  res.json(post.likes)
})

// @desc   unLike a post
// @route  PUT /api/posts/:id/unLikePost
// @access Private

const unLikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  // Check if the post has already been liked
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length ===
    0
  ) {
    res.status(400)
    throw new Error('Post has not yet been liked')
  }
  // Get remove index
  const removeIndex = post.likes
    .map((like) => like.user.toString())
    .indexOf(req.user.id)

  post.likes.splice(removeIndex, 1)

  await post.save()
  res.json(post.likes)
})

// @desc   Comment a post
// @route  PUT /api/posts/:id/commentPost
// @access Private

const commentPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  post.comments.unshift({ user: req.user.id, comment: req.body.comment })

  await post.save()

  const commentedPost = await Post.findById(req.params.id).populate({
    path: 'comments.user',
    select: 'name _id',
  })
  res.json(commentedPost.comments)
})

// @desc   Delete a post
// @route  POST /api/posts/:id/delete
// @access Private

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(404)
    throw new Error('Post not found')
  }

  //Check user
  if (post.postedBy.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error('User not authorized')
  }

  // console.log(req.body.photoId)
  await cloudinary.uploader.destroy(req.body.photoId)
  await post.remove()

  res.json('Post removed')
})

export {
  createPost,
  getAllPosts,
  getMyPosts,
  getFollowingPosts,
  likePost,
  unLikePost,
  commentPost,
  deletePost,
}
