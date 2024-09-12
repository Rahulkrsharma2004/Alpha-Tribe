const express = require('express');
const router = express.Router();
const { addComment, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/:postId', authMiddleware, addComment);
router.delete('/:commentId', authMiddleware, deleteComment);

module.exports = router;
