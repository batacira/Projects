import React, { useEffect, useState } from 'react';
import { authorPosts } from '../../services/services';
import './Posts.css';

export const Posts = ({id}) => {

    let [posts, setPosts] = useState([]);
    let [postsLength, setPostsLength] = useState(0)

    useEffect(() => {
        authorPosts(id)
        .then(authorPosts => setPosts(authorPosts))
    }, [])

    useEffect(() => {
        setPostsLength(posts.length)
    }, [posts])

    return (
        <span> - ({postsLength} posts)</span>
    )
}