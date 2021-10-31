import React, { useState, useEffect } from 'react';

import './SingleBlog.css';
import { authorPosts, getAuthor, getSingleBlog } from '../../services/services';
import { Link } from 'react-router-dom';

export const SingleBlog = (props) => {

  let [blog, setBlog] = useState({})
  let [author, setAuthor] = useState({})
  let [posts, setPosts] = useState([])
  let [titles, setTitles] = useState([])

  useEffect(()=>{
    getSingleBlog(props.match.params.id)
      .then(blog => setBlog(blog))

  },[])

  useEffect(() => {
      getAuthor(blog.userId)
        .then(author => {
          setAuthor(author)
        })
  }, [blog])

  useEffect(() => {
   authorPosts(blog.userId)
    .then(posts => {
      setPosts(posts)
    })
  }, [author])

 useEffect(() => {
   let titles = []
  posts.forEach(post => titles.push(post.title));
  setTitles(titles)
 }, [posts])



  return (
    <div>
      <Link to='/'> {'< Back'}</Link>

      <h3>{blog.title}</h3>
      <Link to={`/singleauthor/${author.id}`}>{`Author ${author.name}`}</Link>

      <p>{blog.body}</p>
      <hr></hr>
      <h5>{posts.length - 1} more stories from this author</h5>
      <h6><Link to={`/`}>{titles[0]}</Link> </h6>
      <h6><Link to={`/`}>{titles[1]}</Link></h6>
      <h6><Link to={`/`}>{titles[2]}</Link></h6>

    </div>
  )
}