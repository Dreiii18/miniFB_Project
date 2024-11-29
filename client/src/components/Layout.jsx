import React, { useEffect, useState } from 'react'
import "./Layout.css"
import Grid from '@mui/material/Grid2';
import LeftPanel from './LeftPanel';
import UploadSection from './UploadSection';
import PostContainer from './PostContainer';
import RightPanel from './RightPanel';

function Layout() {
    const [posts, setPosts] = useState([]);

    // get all posts initially
    useEffect(() => {
        const getData = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await fetch('http://localhost:3500/posts', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const posts = await response.json();

                const mappedPosts = posts.map((post) => ({
                    post_ID: post._id,
                    user_ID: post.author._id,
                    user_img: post.author.profilePicture || '',
                    user_name: post.author.username,
                    description: post.content,
                    post_img: post.postImage ? `http://localhost:3500/${post.postImage}` : '',
                    like: post.likes,
                    likedBy: post.likedBy || [],
                    comments: post.comments
                }));

                setPosts(mappedPosts);
            } catch (error) {
                console.error('Error fetching posts: ', error);
            }
        };

        getData();
    }, []);

    // Function to handle new post creation
    function handleNewPost(newPost)  {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    return (
        <div className='mainpage_container'>
            <Grid container sx={{ height: '100vh' }}>
                <Grid size="grow" className="leftContainer">
                    <LeftPanel />
                </Grid>
                <Grid size={6} className="middleContainer">
                    <UploadSection onNewPost={handleNewPost}/>
                    <PostContainer posts={posts}/>
                </Grid>
                <Grid size="grow">
                    <RightPanel />
                </Grid>
            </Grid>
        </div>
    )
}

export default Layout