import React, { useEffect, useState } from 'react';
import {getData} from '../../services/services';
import {Blog} from '../Blog/Blog';

import './Home.css';

export const Home = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(()=>{
        getData()
            .then(
                response => setBlogs(response)
            )
    },[])

    return (
        <div>
            <h5>POSTS</h5>
            {blogs.map((blog, index) => <Blog blog={blog} key={index} />)}
        </div>
    )
}
