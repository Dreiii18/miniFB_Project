import React, { useEffect, useState } from 'react'
import './PostContainer.css'
import Post from './Post'
import Spinner from './Spinner'

function PostContainer({ posts }) {
    if (posts.length === 0) {
        return <Spinner />;
    }

    return (
        <div>
            {posts.map((post) => (
                <Post 
                    key={post.post_ID}
                    object={post}
                />
            ))}

        </div>
    )
}

export default PostContainer