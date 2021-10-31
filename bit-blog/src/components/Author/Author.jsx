import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authorPosts } from '../../services/services';
import { Posts } from '../Posts/Posts';

import './Author.css';

export const Author = ({author}) => {

    return (
        <div className='author'>
            <Link to={`/singleauthor/${author.id}`}>
            <h5>{author.name} <Posts id={author.id}/></h5>
            <hr/>
            </Link>
        </div>
    )
}