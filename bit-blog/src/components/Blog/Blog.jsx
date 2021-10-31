import React from 'react';
import {Link} from 'react-router-dom';

import './Blog.css';

export const Blog = ({blog}) => {

    return (
        <div className='post'>
            
            <Link to={`/posts/${blog.id}`}>
                <h5>{blog.title}</h5>
                <p>{blog.body}</p>
            </Link>
        </div>
    )
}