const path = require('path');
const Post = require('../models/Post')
const Account = require('../models/Account');

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username profilePicture')
            .sort({
                createdAt: -1
            });

        const postsWithFullImagePaths = posts.map(post => {
            return {
                ...post.toObject(),
                // postImage: post.postImage ? `uploads/${post.postImage.split('/').pop()}` : null
                postImage: post.postImage ? `uploads/${path.basename(post.postImage)}` : null
            };
        });

        res.status(200).json(postsWithFullImagePaths);
    } catch (error) {  
        res.status(500).json({
            message: error.message
        })
    }
}

const createPost = async (req, res) => {
    const { content } = req.body;
    const postImage = req.file ? req.file.path : null;
    const author = req.account._id;

    try {
        const newPost = new Post({
            content,
            postImage,
            author
        })

        await newPost.save();
        const populatedPost = await Post.findById(newPost._id).populate('author', 'username profilePicture');
        const formattedPost = {
            ...populatedPost.toObject(),
            // postImage: populatedPost.postImage ? `uploads/${populatedPost.postImage.split('/').pop()}` : null,
            postImage: populatedPost.postImage ? `uploads/${path.basename(populatedPost.postImage)}` : null,
        }
        res.status(201).json(formattedPost);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const likePost = async (req, res) => {
    const { postId } = req.params;
    const accountId = req.account._id;

    try {
        // find post
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        // check if user has already liked the post
        const hasLiked = post.likedBy.includes(accountId);

        if (hasLiked) {
            post.likedBy = post.likedBy.filter(id => id.toString() !== accountId.toString());
            post.likes -= 1;
        } else {
            post.likedBy.push(accountId);
            post.likes += 1;
        }


        await post.save();
        res.status(200).json({
            message: hasLiked ? 'Post unliked' : 'Post liked',
            hasLiked: hasLiked,
            post
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const commentPost = async (req, res) => {
    const { postId } = req.params;
    const { username, text } = req.body;
    const accountId = req.account._id;

    try {
        // find post
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        post.comments.push({
            user: accountId,
            username,
            text,
            timestamp: Date.now()
        });
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const removeComment = async (req, res) => {
    const { postId , commentId } = req.params;
    const accountId = req.account._id;

    try {
        // find post
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        // find comment
        const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);

        if (commentIndex === -1) {
            return res.status(404).json({
                message: 'Comment not found'
            });
        }

        // check if user is the author of the comment
        if (post.comments[commentIndex].user.toString() !== accountId.toString()) {
            return res.status(403).json({
                message: 'You are not authorized to delete this comment'
            });
        }

        post.comments.splice(commentIndex, 1);
        await post.save();

        res.status(200).json({
            message: 'Comment deleted successfully',
            post: post
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
module.exports = { getPosts, createPost, likePost, commentPost, removeComment };