import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

import './SingleAuthor.css';
import { getAuthor } from '../../services/services';


export const SingleAuthor = (props) => {

    let [author, setAuthor] = useState({})

    useEffect(() => {
        getAuthor(props.match.params.id)
          .then(author => {
            setAuthor(author)
          })
    }, [])


    if (author.address) {
        return (
            <div className='singleauthor'>
                <div className='headline'>
                    <Link to='/authors'>{`<`}All Authors</Link>
                    <h2>Single Author</h2>
                </div>
                <div className='basicdata'>
                    <img src='https://hennesseyonline.com/wp-content/uploads/2015/05/staff-placeholder-male.jpg' alt='Profile image'/>
                    <div className='data'>
                        <h3>{author.name}</h3>
                        <p>User name: {author.username}</p>
                        <p>Email: {author.email}</p>
                        <p>Phone: {author.phone}</p>
                    </div>
                </div>
                <div className='place'>
                    <div className='adressdata'>
                        <h3>Address</h3>
                        <p>Street: {author.address.street}</p>
                        <p>City: {author.address.city}</p>
                        <p>zipcode: {author.address.zipcode}</p>
                    </div>
                    <div className='map'>
                        <iframe
                            width="100%"
                            height="100%"
                            scrolling="no"
                            marginHeight="0"
                            marginWidth="0"
                            title={author.address.city}
                            frameBorder="0"
                            style={{ border: 0 }}
                            src={`https://maps.google.com/maps?q=${author.address.geo.lat},${author.address.geo.lng}&z=15&output=embed`}
                        />
                    </div>
                </div>
                <div className='company'>
                    <h3>Company</h3>
                    <p>name: {author.company.name}</p>
                    <p>slogan: {author.company.catchPhrase}</p>
                </div>
            </div>
        )
    
    } else {
        return (
            <div>Page is loading...</div>
        )
    }

}