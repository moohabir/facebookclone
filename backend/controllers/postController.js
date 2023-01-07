const asyncHandler = require('express-async-handler');

const Post = require('../models/postModel');
const User = require('../models/userModel');

// Get posts

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id });

  res.status(200).json(posts);
});

// Create post

const CreatePost = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const post = await Post.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(post);
});

//  Update post

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Goal not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedPost = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Goal not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the goal user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await post.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPosts,
  CreatePost,
  updatePost,
  deletePost,
};
