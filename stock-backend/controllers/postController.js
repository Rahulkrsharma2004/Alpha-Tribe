const Post = require('../models/Post');
const Comment = require('../models/Comment');

const createPost = async (req, res) => {
  const { stockSymbol, title, description, tags } = req.body;
  try {
    const newPost = new Post({
      stockSymbol,
      title,
      description,
      tags,
      user: req.user.id,
    });
    const post = await newPost.save();
    res.json({message:"Created Post Succesfully",Post:post});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', ['username', 'profilePicture']);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  deletePost,
};
