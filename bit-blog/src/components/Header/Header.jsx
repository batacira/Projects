import React from 'react';
import {Link} from 'react-router-dom';

import './Header.css';

export const Header = () => {

    return (
        <div className='header'>
            <nav className="nav nav-pills nav-justified">
                <h1>BIT BLOG</h1>
                <p className="nav-link" href="#"><Link to='/'>Home</Link></p>
                <span>|</span>
                <p className="nav-link" href="#"><Link to='/authors'>Authors</Link></p>
                <span>|</span>
                <p className="nav-link" href="#"><Link to='/about'>About</Link></p>
            </nav>
        </div>
    )
}