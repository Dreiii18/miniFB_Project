const express = require('express');
const { getPosts, createPost, likePost, commentPost, removeComment } = require('../controllers/postController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');

// get all posts
router.get('/',authMiddleware, getPosts);

// create post
router.post('/create', authMiddleware, upload.single('postImage'), createPost);

// like a post
router.put('/:postId/like', authMiddleware, likePost);

// comment to post
router.post('/:postId/comment', authMiddleware, commentPost);

// remove comment
router.delete('/:postId/comment/:commentId', authMiddleware, removeComment);
module.exports = router;