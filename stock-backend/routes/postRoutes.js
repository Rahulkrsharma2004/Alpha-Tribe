const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPost, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
