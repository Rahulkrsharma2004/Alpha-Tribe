const Comment = require('../models/Comment');

const addComment = async (req, res) => {
  const { comment } = req.body;
  try {
    const newComment = new Comment({
      post: req.params.postId,
      user: req.user.id,
      comment,
    });
    const commentDoc = await newComment.save();
    res.json({message:"Comment Succesfully",comments:commentDoc});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await comment.deleteOne({_id:req.param.id});
    res.json({ msg: 'Comment removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  addComment,
  deleteComment,
};
