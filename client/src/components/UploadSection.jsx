import React, { useRef, useState } from 'react'
import './UploadSection.css'
import { Avatar, Paper } from '@mui/material'
import live from '../../images/video.png'
import image from '../../images/image.png'
import feeling from '../../images/feelings.png'
import { Modal } from 'bootstrap'

function UploadSection({ onNewPost }) {
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostImage, setNewPostImage] = useState(null);
    const [isPosting, setIsPosting] = useState(false);
    const [error, setError] = useState('');
    const userData = JSON.parse(localStorage.getItem('userData'));
    const username = userData.username;
    const profilePicture = userData.profilePicture;
    const modalRef = useRef(null);

    function handleNewPostContent(e) {
        setNewPostContent(e.target.value);
    } 
    
    function handleNewPostImage(e) {
        const file = e.target.files[0];
        if (file && (file.type.includes('image') || file.type.includes('video'))) {
            setNewPostImage(file);
        } else {
            setError('Please select an image or video file');
        }
    }
    
    // create new post
    async function handleCreatePost(e) {
        e.preventDefault();

        if ((!newPostContent && !newPostImage) || isPosting) {
            setError('Content cannot be empty');
            return;
        }

        setError('');
        setIsPosting(true);

        const token = localStorage.getItem('authToken');

        const formData = new FormData();
        formData.append('content', newPostContent);
        if (newPostImage) {
            formData.append('postImage', newPostImage);
        }

        try {
            const response = await fetch('http://localhost:3500/posts/create', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const createdPost = await response.json();

            if (response.ok) {
                const newPost = {
                    post_ID: createdPost._id,
                    user_ID: createdPost.author._id,
                    user_img: createdPost.author.profilePicture || '',
                    user_name: createdPost.author.username,
                    description: createdPost.content,
                    post_img: createdPost.postImage ? `http://localhost:3500/${createdPost.postImage}` : '',
                    like: createdPost.likes,
                };
                onNewPost(newPost);
                setNewPostContent('');
                setNewPostImage(null);
                setError('');
                const modalInstance = Modal.getInstance(modalRef.current) || new Modal(modalRef.current);
                modalInstance.hide();
            } else {
                setError(createdPost.message || 'Error creating post');
            }
        } catch (error) {
            console.error('Error creating post: ', error);
            setError('Error creating post');
        } finally {
            setIsPosting(false);
        }
    }
    return (
        <div>
            {/* POPOUT */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef} data-bs-backdrop="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-center w-100" id="exampleModalLabel">Create post</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='upload_top d-flex align-items-center'>
                                <div>
                                    <Avatar 
                                        className='upload_img' 
                                        src={profilePicture}/>
                                </div>
                                <div className='p-3'>
                                    {username}
                                </div>
                            </div>
                            <div>
                                <input 
                                    type="text" 
                                    className='form-control mt-2 mb-2 border-0' 
                                    placeholder="What's on your mind?"
                                    value={newPostContent}
                                    onChange={handleNewPostContent}
                                />
                            </div>
                            <div className='upload-grid-container border p-2'>
                                <div className='text-start w-100'>
                                    Add to your post
                                </div>
                                <div className='file-input-container'>
                                    <input 
                                        type="file" 
                                        className='form-control-file'
                                        id="fileInput" 
                                        onChange={handleNewPostImage}
                                    />
                                </div>
                            </div>
                            {/* Preview the image */}
                            {newPostImage && (
                                <div className="mt-2">
                                    <img 
                                        src={URL.createObjectURL(newPostImage)} 
                                        alt="Preview" 
                                        className='img-fluid'
                                    />
                                </div>
                            )}
                            {error && 
                                <div className='error-message text-danger mt-2'>{error}</div>
                            }
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-primary w-100"
                                onClick={handleCreatePost}
                                disabled={isPosting}
                            >{isPosting ? 'Posting...' : 'Post'}</button>
                        </div>
                    </div>
                </div>
            </div>

            <Paper className='upload_container' >
                <div className='upload_top'>
                    <div>
                        <Avatar 
                            className='upload_img' 
                            src={profilePicture}/>
                    </div>
                    <div>
                        <input 
                            type="text" 
                            className='upload_box' 
                            placeholder="What's on your mind?"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal"
                        />
                    </div>
                </div>

                <div className='upload_bottom'>
                    <div className='upload_tab'>
                        <img src={live} width='35px' />
                        <div className='upload_text'>Live Video</div>
                    </div>
                    <div className='upload_tab'>
                        <img 
                            src={image} 
                            width='35px' 
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal"
                        />
                        <div 
                            className='upload_text'
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal"
                        >Photo/Video</div>
                    </div>
                    <div className='upload_tab'>
                        <img src={feeling} width='35px' />
                        <div className='upload_text'>Feeling/Activity</div>
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default UploadSection