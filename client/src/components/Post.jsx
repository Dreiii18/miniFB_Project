import React, { useState } from 'react'
import './PostContainer.css'
import { Paper, Avatar } from '@mui/material'   
import like from '../../images/like.png'
import likeButton from '../../images/likebutton.png'
import commentButton from '../../images/comment.png'
import shareButton from '../../images/share.png'

function Post(props) {
    const account = JSON.parse(localStorage.getItem('userData'));
    const token = localStorage.getItem('authToken');

    const [liked, setLiked] = useState(props.object.likedBy?.includes(account.userId) || false);
    const [likeCount, setLikeCount] = useState(props.object.like);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState(props.object.comments || []);

    async function handleLike() {
        try {
            const response = await fetch(`http://localhost:3500/posts/${props.object.post_ID}/like`, {
                method: 'PUT',
                headers: {
                    'Authorization' : `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                const error = await response.text();
                console.error('Error liking the post: ', error.message);
                return;
            }

            const { post, hasLiked, message } = await response.json();
            setLikeCount(post.likes);
            setLiked(!hasLiked);
            // console.log(message); for debugging
        } catch (error) {
            console.error('Error liking the post: ', error);
        }
    }

    function handleCommentChange(e) {
        setCommentText(e.target.value);
    }

    async function handleCommentSubmit(e) {
        if (e.key === 'Enter' && commentText.trim() !== '') {
            try {
                const response = await fetch(`http://localhost:3500/posts/${props.object.post_ID}/comment`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({
                        user: account.userId,
                        username: account.username,
                        text: commentText,
                    })
                });
    
                const updatedPost = await response.json();
                setComments(updatedPost.comments);
                setCommentText('');
            } catch (error) {
                console.error('Error commenting on the post: ', error);
            }
        }
    }

    async function handleRemoveComment(commentId) {
        try {
            const response = await fetch(`http://localhost:3500/posts/${props.object.post_ID}/comment/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                const error = await response.text();
                console.error('Error removing comment: ', error.message);
                return;
            }

            const updatedPost = await response.json();
            // setComments(updatedPost.comments);
            setComments((prevComments) => prevComments.filter(comment => comment._id !== commentId));
        } catch (error) {
            console.error('Error removing comment: ', error);
        }
    }

    return (
        <div>
            <Paper className='post_container'>
                {/* HEADER */}
                <div className='post_header'>
                    <div className='post_header_img'>
                        <Avatar className='post_img' src={props.object.user_img} />
                    </div>
                    <div className='post_header_text'> 
                        {props.object.user_name}
                    </div>
                </div>

                {/*  DESCRIPTION*/}
                <div className='post_description'>
                    {props.object.description}
                </div>

                {/* IMAGE */}
                <div className='post_image'>
                    {props.object.post_img ? (
                        <img src={props.object.post_img} width='600px' />
                    ) : (
                        <span></span>
                    )}
                </div>

                {/* LIKE COUNT */}
                <div className='post_likeCountContainer px-3'>
                    <div className='post_like'>
                        <img src={like} className='post_LikeImg' />
                    </div>
                    <div className='post_likeCount'>
                        {likeCount}
                    </div>
                </div>

                {/* LIKE AND SHARE BOX */}
                <div className='post_likeShare'>
                    <div className='post_tab' onClick={handleLike}>
                        <div className='post_tabFirst'>
                            <img 
                                src={likeButton} 
                                className='post_tabImg'
                            />
                        </div>
                        <div className={`post_tabText ${liked ? 'liked' : ''}`}>
                            Like
                        </div>
                    </div>
                    <div className='post_tab'>
                        <div className='post_tabFirst'>
                            <img src={commentButton} className='post_tabImg' />
                        </div>
                        <div className='post_tabText'>
                            Comment
                        </div>
                    </div>
                    <div className='post_tab'>
                        <div className='post_tabFirst'>
                            <img src={shareButton} className='post_tabImg' />
                        </div>
                        <div className='post_tabText'>
                            Share
                        </div>
                    </div>
                </div>

                {/* COMMENT AREA */}
                <div className='post_comment'>
                    <div className='upload_top'>
                        <div>
                            <Avatar className='upload_img' src={account.profilePicture}/>
                        </div>
                        <div>
                            <input 
                                type="text" 
                                className='upload_box' 
                                placeholder="Write a comment"
                                value={commentText}
                                onChange={handleCommentChange}
                                onKeyDown={handleCommentSubmit}
                            />
                        </div>
                    </div>

                    {/* display comments */}
                    <div className="comments_list">
                        {comments?.length > 0 ? (
                            comments.map(comment => (
                                <div key={comment._id} className="comment">
                                    <Avatar className='comment_avatar' src={account.profilePicture}/>
                                    <div className="comment_content p-2">
                                        <strong>{comment.username}</strong>
                                        <p>{comment.text}</p>
                                    </div>
                                    {comment.user === account.userId && (
                                        <button 
                                            className='btn btn-danger'
                                            onClick={() => handleRemoveComment(comment._id)}
                                        >Remove</button>
                                    )}
                                </div>
                            ))
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default Post